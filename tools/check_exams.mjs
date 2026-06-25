// tools/check_exams.mjs ─ 模試データの自動採点＆構造チェック（CI/ローカル/自動スレ共通の品質ゲート）
// 使い方: npm install && npm run check     （または NODE_PATH=… node tools/check_exams.mjs）
// 役割:
//   1) 全模試データを実エンジンで「全問正解→100点」になるか採点（出題/採点の整合）
//   2) 設問の構造チェック（mcq/bankpickのanswer索引、wordorderの語＝answerトークン一致 等）
//   3) 単語データのサニティ（相対参照の訳「↑の複数」等・空訳・件数）
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const r = (p) => readFileSync(resolve(ROOT, p), 'utf8');

const EXAMS = ['chu2','chu2_2','chu2_3','chu3_1','chu3_2','chu3_3','chu3_4','c2u1','c2u2','c3u1','c3u2'];
const ENGINE = r('mogi/assets/engine.js');

let fails = 0;
const fail = (id, msg) => { fails++; console.log(`  ✗ [${id}] ${msg}`); };
const pass = (id, msg) => console.log(`  ✓ ${String(id).padEnd(7)} ${msg}`);

// engineと同じ正規化規則で正解を埋める
function normSpell(x){return (x||"").toLowerCase().trim().replace(/[.,!?;:"'’“”]/g,"").replace(/[-_/]/g," ").replace(/\s+/g," ").trim();}
function orderTokens(words, answer){
  const aw = normSpell(answer).split(" ");
  const pos = (t) => { const tw = normSpell(t).split(" ");
    for(let i=0;i+tw.length<=aw.length;i++){ let m=1; for(let j=0;j<tw.length;j++) if(aw[i+j]!==tw[j]){m=0;break;} if(m) return i; } return 999; };
  return words.map((w,i)=>({w,i,p:pos(w)})).sort((a,b)=>(a.p-b.p)||(a.i-b.i)).map(o=>o.w);
}
function itemsOf(EXAM){
  const items = [];
  EXAM.sections.forEach(s=>{
    if(s.courses) s.courses.forEach(c=>c.items.forEach(it=>items.push(it)));
    else (s.groups||[]).forEach(g=>(g.items||[]).forEach(it=>items.push(it)));
  });
  return items;
}

function structuralChecks(id, EXAM){
  itemsOf(EXAM).forEach((it,idx)=>{
    const w = `設問#${idx+1}(${it.type})`;
    if(it.type==='mcq' || it.type==='bankpick'){
      const arr = it.choices || it.bank || [];
      if(typeof it.answer!=='number' || it.answer<0 || it.answer>=arr.length) fail(id, `${w} answer索引が範囲外 (${it.answer}/${arr.length})`);
    } else if(it.type==='mcqMulti'){
      const arr = it.choices||[];
      (Array.isArray(it.answer)?it.answer:[]).forEach(a=>{ if(a<0||a>=arr.length) fail(id, `${w} answer索引が範囲外 (${a})`); });
    } else if(it.type==='fill'){
      if(!Array.isArray(it.answers) || !it.answers.length) fail(id, `${w} answers が空`);
    } else if(it.type==='wordorder'){
      // 並べかえ：各語が answer 内に見つかること（中2大問6の部分並べかえ＝語群がanswerの部分集合でもOK）
      const aw = normSpell(it.answer).split(" ");
      const posOf = (t) => { const tw=normSpell(t).split(" ");
        for(let i=0;i+tw.length<=aw.length;i++){ let m=1; for(let j=0;j<tw.length;j++) if(aw[i+j]!==tw[j]){m=0;break;} if(m) return i; } return -1; };
      it.words.forEach(word=>{ if(posOf(word)<0) fail(id, `${w} 並べかえ語「${word}」が answer に見つからない`); });
    }
  });
}

function gradeExam(id){
  const dom = new JSDOM(`<!doctype html><div id=quiz></div><div class="scorebar" id=scorebar><span class=big id=scoretext></span><span class=msg></span></div><div class="scorebar" id=scorebar_b><span class=big></span><span class=msg></span></div><span id=totalpts></span>`, { url:'http://localhost' });
  const w = dom.window; w.scrollTo=()=>{}; w.Element.prototype.scrollIntoView=()=>{};
  new Function('window','document', ENGINE)(w, w.document);
  new Function('window', r(`mogi/data/${id}.js`))(w);
  w.EXAM.id = id;
  const EXAM = w.EXAM;
  structuralChecks(id, EXAM);
  w.MockExam.render(EXAM, w.document.getElementById('quiz'));
  const items = itemsOf(EXAM);
  const qs = [...w.document.querySelectorAll('#quiz .q')];
  items.forEach((it,i)=>{ const q = qs[i]; if(!q) return;
    if(it.type==='mcq' || it.type==='mcqMulti'){ const a=Array.isArray(it.answer)?it.answer:[it.answer]; const inp=[...q.querySelectorAll('.choices input')]; a.forEach(x=>{ if(inp[x]) inp[x].checked=true; }); }
    else if(it.type==='bankpick'){ const inp=[...q.querySelectorAll('.choices input')]; if(inp[it.answer]) inp[it.answer].checked=true; }
    else if(it.type==='fill'){ const el=q.querySelector('input'); if(el) el.value=(it.answers&&it.answers[0])||''; }
    else if(it.type==='wordorder'){ orderTokens(it.words,it.answer).forEach(t=>{ const c=[...q.querySelectorAll('.wo-bank .wo-chip')].find(ch=>ch.textContent.trim()===t); if(c) c.click(); }); }
  });
  w.MockExam.gradeAll('bottom');
  const top = w.document.getElementById('scoretext').textContent;
  const bot = w.document.getElementById('scorebar_b').querySelector('.big').textContent;
  if(top!=='100 / 100' || bot!=='100 / 100') fail(id, `満点で採点されない (top=${top} / bot=${bot})`);
  else pass(id, `100/100 (${items.length}問)`);
}

function checkWords(){
  const w = {};
  try { new Function('window', r('words/data/words.js'))(w); }
  catch(e){ fail('words', `words.js が壊れています: ${e.message}`); return; }
  const WORDS = w.WORDS || [];
  if(!WORDS.length){ fail('words','WORDS が空'); return; }
  const rel = WORDS.filter(x=>/↑|同上|同左|上の語|前の語|次の語/.test(x.j||''));
  if(rel.length) fail('words', `相対参照の訳（ランダムで意味不明）: ${rel.map(x=>x.id+':'+x.w).join(', ')}`);
  const empty = WORDS.filter(x=>!x.j || !String(x.j).trim());
  if(empty.length) fail('words', `訳が空: ${empty.map(x=>x.id+':'+x.w).join(', ')}`);
  if(!rel.length && !empty.length) pass('words', `${WORDS.length}語・相対参照/空訳なし`);
}

console.log('— 模試データ 自動採点＆構造チェック —');
for(const id of EXAMS){ try{ gradeExam(id); }catch(e){ fail(id, `例外: ${e.message}`); } }
console.log('— 単語データ —');
checkWords();
console.log(fails ? `\n✗ ${fails} 件の問題が見つかりました` : '\n✓ ALL PASS（全模試100点・構造OK・単語サニティOK）');
process.exit(fails ? 1 : 0);
