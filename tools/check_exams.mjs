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

const EXAMS = ['chu2','chu2_a1','chu2_2','chu2_3','chu3_1','chu3_2','chu3_3','chu3_4','m332','mock332','c2u1','c2u2','c3u1','c3u2',
  'okayama1','okayama2','okayama3','okayama4','okayama5','okayama6','okayama7','okayama8','okayama9','okayama10'];
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

// 話者連続：passage/script 内で同じ話者の <span class="who"> が2回続いていないか（QAで頻発した不具合）
function speakerContinuity(id, EXAM){
  (EXAM.sections||[]).forEach(s=>{
    (s.groups||[]).forEach(g=>{
      [g.passage, g.script].forEach(html=>{
        if(!html) return;
        const sp = [...String(html).matchAll(/<span class="who"[^>]*>([^<]+?)<\/span>/g)]
          .map(m=>m[1].replace(/[:：]/g,'').replace(/\s+/g,'').trim()).filter(Boolean);
        for(let i=1;i<sp.length;i++){
          if(sp[i]===sp[i-1]) fail(id, `話者連続「${sp[i]}」が2回続く（passage/script）`);
        }
      });
    });
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
  speakerContinuity(id, EXAM);
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
  // 答えバレ：英単語の答え(2文字以上のトークン)が訳の中に露出していないか（和→英テストの抜け穴）
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const reveal = WORDS.filter(x=>{
    const word=String(x.w||'');
    return word.split(/\s+/).filter(t=>t.length>=2).some(t=> new RegExp('(^|[^A-Za-z])'+esc(t)+'([^A-Za-z]|$)','i').test(x.j||''));
  });
  if(reveal.length) fail('words', `答えバレ（英単語が訳に露出）: ${reveal.map(x=>x.id+':'+x.w).join(', ')}`);
  if(!rel.length && !empty.length && !reveal.length) pass('words', `${WORDS.length}語・相対参照/空訳/答えバレ なし`);
}

// 県立入試スタイル(okayama*)の横断重複：並べかえ答・抜き出し答・長い選択肢が2本以上で一致しないか
function okayamaDupCheck(){
  const set = EXAMS.filter(id=>/^okayama\d+$/.test(id));
  if(set.length<2) return;
  const strip = s => String(s==null?'':s).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
  const norm  = s => strip(s).toLowerCase().replace(/[.,!?;:"'’“”]/g,'').replace(/\s+/g,' ').trim();
  const map = {};
  const addS = (str,id,min)=>{ const k=norm(str); if(k.length<min) return; (map[k]=map[k]||{ids:new Set(),raw:strip(str)}).ids.add(id); };
  for(const id of set){
    const w={}; try{ new Function('window', r(`mogi/data/${id}.js`))(w); }catch(e){ continue; }
    itemsOf(w.EXAM).forEach(it=>{
      if(it.type==='wordorder') addS(it.answer,id,8);
      else if(it.type==='fill') addS((it.answers&&it.answers[0])||'',id,6);
      else if(it.type==='mcq'||it.type==='mcqMulti'||it.type==='bankpick') (it.choices||it.bank||[]).forEach(c=>addS(c,id,14));
    });
  }
  const dups = Object.values(map).filter(o=>o.ids.size>=2);
  if(dups.length) dups.forEach(o=> fail('okayama-dup', `重複「${o.raw}」 in [${[...o.ids].sort().join(', ')}]`));
  else pass('okayama', `${set.length}本クロス重複なし（並べかえ/抜き出し/長い選択肢）`);
}

console.log('— 模試データ 自動採点＆構造チェック —');
for(const id of EXAMS){ try{ gradeExam(id); }catch(e){ fail(id, `例外: ${e.message}`); } }
console.log('— 単語データ —');
checkWords();
console.log('— 県立入試スタイルの横断重複 —');
okayamaDupCheck();
console.log('— 活用編（動詞の変化形／形容詞の比較） —');
checkKatsuyo();
console.log(fails ? `\n✗ ${fails} 件の問題が見つかりました` : '\n✓ ALL PASS（全模試100点・構造OK・話者連続OK・okayama横断重複なし・単語サニティOK・活用編OK）');
process.exit(fails ? 1 : 0);

// 活用編：150+50=200パターン・1パターン3疑似単語（原形→slot0/1/2）・id/kid重複なし・英字妥当性
function checkKatsuyo(){
  let w;
  try { w = {}; new Function('window', r('words/data/katsuyo.js'))(w); }
  catch(e){ fail('katsuyo', `katsuyo.js が壊れています: ${e.message}`); return; }
  const KW = w.KATSUYO_WORDS || [], META = w.KATSUYO_META || {};
  if (KW.length !== 600) { fail('katsuyo', `疑似単語エントリ数が600でない: ${KW.length}`); return; }
  if (META.maxScore !== 600 || META.patternCount !== 200) fail('katsuyo', `META不整合: ${JSON.stringify(META)}`);
  const ids = new Set(KW.map(e=>e.id));
  if (ids.size !== KW.length) fail('katsuyo', `idが重複している (${ids.size}/${KW.length})`);
  const byKid = {};
  KW.forEach(e => (byKid[e.kid] = byKid[e.kid] || []).push(e));
  const kids = Object.keys(byKid);
  if (kids.length !== 200) fail('katsuyo', `パターン数(kid)が200でない: ${kids.length}`);
  let badGroup = 0;
  kids.forEach(k => { const slots = byKid[k].map(e=>e.slot).sort().join(','); if (byKid[k].length !== 3 || slots !== '0,1,2') badGroup++; });
  if (badGroup) fail('katsuyo', `原形/過去形(比較級)/過去分詞形(最上級)の3点セットが崩れているパターン: ${badGroup}件`);
  const verbN = KW.filter(e=>e.p==='動詞の活用').length, adjN = KW.filter(e=>e.p==='形容詞の比較').length;
  if (verbN !== 450) fail('katsuyo', `動詞の活用エントリ数が450でない: ${verbN}`);
  if (adjN !== 150) fail('katsuyo', `形容詞の比較エントリ数が150でない: ${adjN}`);
  const badWord = KW.filter(e => !/^[A-Za-z][A-Za-z ]*$/.test(e.w));
  if (badWord.length) fail('katsuyo', `英字以外を含む答え: ${badWord.map(x=>x.id+':'+x.w).join(', ')}`);
  const emptyJp = KW.filter(e => e.slot===0 && !String(e.j||'').trim());
  if (emptyJp.length) fail('katsuyo', `意味が空: ${emptyJp.map(x=>x.id).join(', ')}`);
  // words.js（基本編/拡張編）とidが衝突しないこと（別id空間・別ストア共存の前提）
  let wj; try { wj = {}; new Function('window', r('words/data/words.js'))(wj); } catch(e){ wj = {WORDS:[]}; }
  const wordIds = new Set((wj.WORDS||[]).map(x=>String(x.id)));
  const collide = KW.filter(e => wordIds.has(String(e.id)));
  if (collide.length) fail('katsuyo', `words.js の id と衝突: ${collide.map(x=>x.id).join(', ')}`);
  if (!fails) pass('katsuyo', `動詞150×3=450／形容詞50×3=150／計200パターン・600点・id/kid重複なし・words.jsと非衝突`);
}
