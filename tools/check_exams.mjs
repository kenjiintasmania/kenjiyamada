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

const EXAMS = ['chu2','chu2_a1','chu2_2','chu2_3','chu2_231','chu3_1','chu3_2','chu3_3','chu3_4','m332','mock332','c2u1','c2u2','c2u3','c3u1','c3u2','c3u3','c3u4','c3u5','c3u6','c3u7','c3u8','c3u9',
  'okayama1','okayama2','okayama3','okayama4','okayama5','okayama6','okayama7','okayama8','okayama9','okayama10',
  'chu3_341','chu3_342','chu3_351','chu3_352',
  'fukuoka1','fukuoka2','fukuoka3','fukuoka4','fukuoka5','fukuoka6','fukuoka7','fukuoka8','fukuoka9','fukuoka10'];
/* 引数にIDを並べると、そのIDだけを（まだ EXAMS に登録していないファイルでも）検査する。
   例: node tools/check_exams.mjs fukuoka2 c3u5
   作問中に自分の1本だけを何度も回すため。横断重複は登録ずみの新作ぶんとも突き合わせる。
   単語・活用編の検査は飛ばす（そこは変えないので）。 */
const ONLY = process.argv.slice(2).filter(a => /^[a-z0-9_]+$/.test(a));
const RUN = ONLY.length ? ONLY : EXAMS;
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
      // answer に同じ語が2回出ると、出現位置から順番を決められない（カッコの外の語を先に拾う）。
      // そういう設問は data 側に order:[...] を持たせて、正解の順番を明示すること。
      if(!it.order){
        const hits = (t) => { const tw=normSpell(t).split(" "); let n=0;
          for(let i=0;i+tw.length<=aw.length;i++){ let m=1; for(let j=0;j<tw.length;j++) if(aw[i+j]!==tw[j]){m=0;break;} if(m) n++; } return n; };
        const dup = it.words.filter(t=>hits(t)>1);
        if(dup.length) fail(id, `${w} 「${dup.join('／')}」が answer に2回出るので順番が決まらない（order:[...] を持たせること）`);
      }
      if(it.order){
        if(it.order.length!==it.words.length) fail(id, `${w} order の語数が words と合わない`);
        else if([...it.order].sort().join("|")!==[...it.words].sort().join("|")) fail(id, `${w} order と words の中身がちがう`);
      }
    }
  });
}

// リスニング「メモ」提示ルール（2026-07改訂）：メモは（　）穴埋め形式で提示し、
// fill の答えがメモ本文に書かれていてはならない（答えバレ禁止）。
// 既存ファイルは据え置き（先生指示「今あるぶんはOK」）→ GRANDFATHER に列挙。新作から強制。
const MEMO_GRANDFATHER = new Set(['chu2','chu2_2','chu2_3','chu2_a1','c2u1','c2u2','mock332','okayama6']);
function memoFormat(id, EXAM){
  if(MEMO_GRANDFATHER.has(id)) return;
  (EXAM.sections||[]).forEach(s=>{
    if(!(s.groups||[]).some(g=>g.script)) return;          // リスニング大問だけ対象
    (s.groups||[]).forEach(g=>{
      const pas = String(g.passage||'');
      if(!/メモ/.test(pas)) return;
      if(!/（\s*[あ-んア-ン①-⑩a-zA-Z]?\s*）|（　/.test(pas))
        fail(id, 'リスニングのメモが（　）穴埋め形式になっていない');
      (g.items||[]).forEach(it=>(it.answers||[]).forEach(a=>{
        if(a && pas.toLowerCase().includes(String(a).toLowerCase()))
          fail(id, `メモ本文に答え「${a}」が書かれている（答えバレ）`);
      }));
    });
  });
}

/* 答えバレ（2026-09-29 先生指示「リスニングの答えが資料にまるまる載ってるなどのミス」）。
   メモ以外の資料（passage/flyer）にも広げる：
   ① リスニング大問の資料に、fill の答えがそのまま書かれていない
   ② リスニング大問の資料に、mcq の正解の選択肢だけがそのまま書かれていない
      （表から選ぶ型＝全選択肢が資料にある のは設計どおりなので通す）
   ③ どの大問でも、設問文（stem）に fill の答えがそのまま書かれていない
   既存ファイルで引っかかったものは据え置き（LEAK_GRANDFATHER）。新作には足さないこと。 */
const LEAK_GRANDFATHER = new Set(['mock332','okayama6']);   // 完成メモ型（MEMO_GRANDFATHER と同じ据え置き）
function leakCheck(id, EXAM){
  if(LEAK_GRANDFATHER.has(id)) return;
  const strip = s => String(s==null?'':s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  const norm  = s => strip(s).toLowerCase().replace(/[.,!?;:"'’“”]/g,'').replace(/\s+/g,' ').trim();
  const has = (hay, needle) => { const n=norm(needle); return n.length>=3 && norm(hay).includes(n); };
  (EXAM.sections||[]).forEach(sec=>{
    const listening = (sec.groups||[]).some(g=>g.script);
    (sec.groups||[]).forEach(g=>{
      const material = String(g.passage||'') + ' ' + String(g.flyer||'');
      (g.items||[]).forEach(it=>{
        if(it.type==='fill'){
          (it.answers||[]).forEach(a=>{
            if(listening && has(material, a)) fail(id, `大問${sec.no} ${it.label||''} リスニングの資料に答え「${a}」がそのまま載っている`);
            if(has(it.stem||'', a) && !/抜き出し|最も適当な形に変えて/.test(String(it.stem||'')))
              fail(id, `大問${sec.no} ${it.label||''} 設問文に答え「${a}」がそのまま書かれている`);
          });
        }
        if(listening && (it.type==='mcq') && Array.isArray(it.choices) && typeof it.answer==='number'){
          const ch = it.choices.map(c=>strip(c));
          const inMat = ch.map(c=>/[a-zA-Z]{3,}/.test(c) && has(material, c));
          if(inMat[it.answer] && !inMat.every(Boolean))
            fail(id, `大問${sec.no} ${it.label||''} リスニングの資料に正解の選択肢「${ch[it.answer]}」だけがそのまま載っている`);
        }
      });
    });
  });
}

/* 「下線部の内容になるように…」と書いてあるのに、その大問の本文に <u> が無い設問。
   生徒はどこを言いかえるのか分からないまま抜き出すことになる。10本で起きていた。 */
function underlineRef(id, EXAM){
  (EXAM.sections||[]).forEach(sec=>{
    const groups = sec.groups||[];
    const hasU = groups.some(g=>/<u>/.test(String(g.passage||'')+String(g.script||'')));
    const needs = groups.some(g=>(g.items||[]).some(it=>/下線部/.test(String(it.stem||''))));
    if(needs && !hasU) fail(id, `大問${sec.no} 設問が「下線部」を指しているのに本文に <u> が無い`);
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

/* コース制（中2の大問6 X/Y）は、選ばれたコースの設問しか grade() が呼ばれない。
   既定のまま採点すると Xコースしか通らないので、コースの数だけ採点しなおす。 */
function courseCount(EXAM){
  return Math.max(1, ...(EXAM.sections||[]).map(s=>(s.courses||[]).length||1));
}
function sumPtFor(EXAM, ci){
  return (EXAM.sections||[]).reduce((a,sec)=>{
    if(sec.courses && sec.courses.length){
      const c = sec.courses[Math.min(ci, sec.courses.length-1)];
      return a + (c.items||[]).reduce((x,it)=>x+(Number(it.pt)||0),0);
    }
    return a + (sec.groups||[]).reduce((x,g)=>x+(g.items||[]).reduce((y,it)=>y+(Number(it.pt)||0),0), 0);
  }, 0);
}

function gradeExam(id, ci=0, label=''){
  const dom = new JSDOM(`<!doctype html><div id=quiz></div><div class="scorebar" id=scorebar><span class=big id=scoretext></span><span class=msg></span></div><div class="scorebar" id=scorebar_b><span class=big></span><span class=msg></span></div><span id=totalpts></span>`, { url:'http://localhost' });
  const w = dom.window; w.scrollTo=()=>{}; w.Element.prototype.scrollIntoView=()=>{};
  new Function('window','document', ENGINE)(w, w.document);
  new Function('window', r(`mogi/data/${id}.js`))(w);
  w.EXAM.id = id;
  const EXAM = w.EXAM;
  structuralChecks(id, EXAM);
  speakerContinuity(id, EXAM);
  underlineRef(id, EXAM);
  memoFormat(id, EXAM);
  leakCheck(id, EXAM);
  w.MockExam.render(EXAM, w.document.getElementById('quiz'));
  // 採点するコースを選びなおす（既定は先頭＝Xコースだけ）
  (EXAM.sections||[]).forEach(sec=>{
    if(!(sec.courses && sec.courses.length)) return;
    const pick = Math.min(ci, sec.courses.length-1);
    [...w.document.querySelectorAll(`input[name="course_${sec.no}"]`)].forEach((r,i)=>{ r.checked = (i===pick); });
  });
  const items = itemsOf(EXAM);
  const qs = [...w.document.querySelectorAll('#quiz .q')];
  items.forEach((it,i)=>{ const q = qs[i]; if(!q) return;
    if(it.type==='mcq' || it.type==='mcqMulti'){ const a=Array.isArray(it.answer)?it.answer:[it.answer]; const inp=[...q.querySelectorAll('.choices input')]; a.forEach(x=>{ if(inp[x]) inp[x].checked=true; }); }
    else if(it.type==='bankpick'){ const inp=[...q.querySelectorAll('.choices input')]; if(inp[it.answer]) inp[it.answer].checked=true; }
    else if(it.type==='fill'){ const el=q.querySelector('input'); if(el) el.value=(it.answers&&it.answers[0])||''; }
    else if(it.type==='wordorder'){ (it.order || orderTokens(it.words,it.answer)).forEach(t=>{ const c=[...q.querySelectorAll('.wo-bank .wo-chip')].find(ch=>ch.textContent.trim()===t); if(c) c.click(); }); }
  });
  w.MockExam.gradeAll('bottom');
  const top = w.document.getElementById('scoretext').textContent;
  const bot = w.document.getElementById('scorebar_b').querySelector('.big').textContent;
  // 満点は県によって違う（岡山100点／福岡60点）。データが fullMarks を持てばそれ、無ければ100。
  // あわせて「配点の合計＝満点」も見る。合計がずれても100点で通ってしまう穴があったため。
  const full = (typeof EXAM.fullMarks === 'number') ? EXAM.fullMarks : 100;
  // コース制（中2のX/Y）は、いま採点しているコースぶんだけ数える
  const sumPt = sumPtFor(EXAM, ci);
  const tag = label ? `${id}${label}` : id;
  if(sumPt !== full) fail(tag, `配点の合計が満点と合わない (合計${sumPt} / 満点${full})`);
  const want = `${full} / ${full}`;
  if(top!==want || bot!==want) fail(tag, `満点で採点されない (top=${top} / bot=${bot} / 満点${full})`);
  else if(sumPt===full) pass(tag, `${full}/${full} (${items.length}問)`);
  return courseCount(EXAM);
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

// 新規創作ぶんの横断重複：並べかえ答・抜き出し答・長い選択肢が2本以上で一致しないか。
// 対象は okayama*（県立入試スタイル）と、同じ型で書き下ろした chu3_34x・c3u3/c3u4。
// 既存の chu2*/chu3_1〜4 等は正進社の過去問ベースで言い回しが元から近いので含めない。
const NEW_STYLE = /^(okayama\d+|fukuoka\d+|chu3_3[45]\d|c3u[3-9])$/;
function okayamaDupCheck(){
  const set = [...new Set([...EXAMS, ...ONLY])].filter(id=>NEW_STYLE.test(id));
  if(set.length<2) return;
  const strip = s => String(s==null?'':s).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
  const norm  = s => strip(s).toLowerCase().replace(/[.,!?;:"'’“”]/g,'').replace(/\s+/g,' ').trim();
  const map = {};
  // 「Saturday, 9:00 a.m.」のような曜日＋時刻だけの選択肢は中身ではないので、本をまたいで同じでもよい
  const TIMEONLY = /^[a-z]+day \d{1,4} ?[ap]m$/;   // norm() のあとの形（「saturday 900 am」）で見る
  const addS = (str,id,min)=>{ const k=norm(str); if(k.length<min || TIMEONLY.test(k)) return; (map[k]=map[k]||{ids:new Set(),raw:strip(str)}).ids.add(id); };
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
  else pass('新作', `${set.length}本クロス重複なし（並べかえ/抜き出し/長い選択肢）`);
}

console.log('— 模試データ 自動採点＆構造チェック —');
for(const id of RUN){
  try{
    const n = gradeExam(id);
    // コースがあるなら、残りのコースも同じように満点で解けるか見る
    for(let ci=1; ci<n; ci++) gradeExam(id, ci, `(${ci+1}コース目)`);
  }catch(e){ fail(id, `例外: ${e.message}`); }
}

/* ---------- 単語の判定と「同じ訳」の見分け ----------
   ① 2000語のどれもが「答えを打てば○になる」こと。
      challenge/ が判定を写し持っていたせいで、there is［are］や cheer ... up のような
      書きかたの27語が、あちらでは誰が何を打っても不正解になっていた（2026-09に発見）。
   ② 同じ訳・同じ品詞の語が2つ以上あるなら、必ず見分けがつくこと。
      手がかり（「wではじまる」）がつくか、つかないならおたがいの綴りを正解にするか。
      どちらも無いと、生徒は当てずっぽうでしか答えられない。
   ③ 判定の写しを作らないこと。写しは必ず古くなる（このリポジトリで3回起きている）。 */
function checkJudge(){
  const g = {};
  new Function('window', readFileSync(resolve(ROOT,'assets/wordjudge.js'),'utf8'))(g);
  new Function('window', readFileSync(resolve(ROOT,'words/data/words.js'),'utf8'))(g);
  const J = g.WordJudge, W = g.WORDS;
  J.buildHints(W);

  const dead = W.filter(w => !Object.keys(J.acceptable(w).set).some(c => J.judge(c, w)));
  if (dead.length) fail('words', `答えを打っても○にならない語 ${dead.length}語: ${dead.slice(0,6).map(x=>x.w).join(', ')}`);
  else pass('judge', `${W.length}語すべて、答えを打てば○になる`);

  /* 訳の文字列が同じものだけ見ていては足りない（最初そうして「話す」を取りこぼした）。
     訳を意味に割り、Aの意味をぜんぶ含む同じ品詞の語＝その出題の答えになりうる語 とみなす。 */
  const S = {}; W.forEach(w => { S[w.id] = J.senses(w.j); });
  const byPos = {};
  W.forEach(w => { const m = byPos[w.p] = byPos[w.p] || {};
    S[w.id].forEach(t => { (m[t] = m[t] || []).push(w); }); });
  const rivalsOf = (a) => {
    const sa = S[a.id]; if (!sa.length) return [];
    return ((byPos[a.p] || {})[sa[0]] || [])
      .filter(b => b.id !== a.id && sa.every(t => S[b.id].indexOf(t) >= 0));
  };
  const bad = []; let amb = 0;
  W.forEach(a => {
    const rv = rivalsOf(a); if (!rv.length) return;
    amb++;
    const h = J.hintOf(a);
    // 手がかりが、相手のだれとも同じでないこと（同じなら見分けられていない）
    const distinct = h && rv.every(b => J.hintOf(b) !== h);
    const twinned = J.twinsOf(a).length === rv.length;
    if (!distinct && !twinned)
      bad.push(`${a.w}「${a.j}」↔ ${rv.map(b=>b.w).join('/')}`);
  });
  if (bad.length) fail('words', `同じ意味なのに見分けがつかない ${bad.length}語: ${bad.slice(0,4).join('、')}`);
  else pass('judge', `意味がかぶる ${amb}語は、手がかりか別解で必ず見分けがつく`);

  /* 先生の報告そのものを名指しで見張る（2026-09）。訳の完全一致だけを見ていたころは、
     「話す」と「話す、教える、伝える」が別ものになり、ここが素通りしていた。 */
  const SAY = ['talk', 'speak', 'tell'];
  const hs = SAY.map(x => { const w = W.find(y => y.w === x); return w ? (J.hintOf(w) || '(手がかりなし)') : '(語がない)'; });
  if (new Set(hs).size !== hs.length)
    fail('words', `「話す」の3語を見分けられません: ${SAY.map((x,i)=>x+'='+hs[i]).join(', ')}`);
  else pass('judge', `「話す」は ${SAY.map((x,i)=>x+'→'+hs[i]).join('／')}`);

  /* 正規化の中身（カーリー引用符の変換表）は本物にしか無い印。
     これを持っている画面は、委譲ではなく自前で判定している＝いずれ食いちがう。 */
  const COPY = ['challenge/index.html', 'words/js/app.js', 'mastery/mastery.js', 'mastery/gram.js'];
  const copied = COPY.filter(f => {
    const t = readFileSync(resolve(ROOT, f), 'utf8');
    return /\u2018\u2019\u02bc\u2032/.test(t) && !/WordJudge/.test(t);
  });
  const uses = COPY.filter(f => /WordJudge/.test(readFileSync(resolve(ROOT, f), 'utf8')));
  if (copied.length) fail('words', `判定を写し持っている画面: ${copied.join(', ')}（assets/wordjudge.js を読むこと）`);
  else pass('judge', `判定は assets/wordjudge.js 1本（${uses.length}画面がここを読んでいる）`);
}

if(!ONLY.length){
  console.log('— 単語データ —');
  checkWords();
  console.log('— 単語の判定・同じ訳の見分け —');
  checkJudge();
}
console.log('— 新規創作ぶんの横断重複 —');
okayamaDupCheck();
if(!ONLY.length){
  console.log('— 活用編（動詞の変化形／形容詞の比較） —');
  checkKatsuyo();
}
console.log(fails ? `\n✗ ${fails} 件の問題が見つかりました` : '\n✓ ALL PASS（全模試が満点どおり・構造OK・話者連続OK・okayama横断重複なし・単語サニティOK・活用編OK）');
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
