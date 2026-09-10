/* tools/extract_exam_words.mjs ─ 模試の英文から、紙の単語集にのせる語を拾う
   使い方: node tools/extract_exam_words.mjs <出力JSON> <模試id...>
     例) node tools/extract_exam_words.mjs out/print/wordrows.json chu3_341 chu3_342
   words/data/words.js（2000語）と突き合わせて 中1/中2/中3 に仕分けし、
   リストに無い語（＝本番で語注が付くかもしれない語）を unknown に集める。
   語形は中学レベルの規則変化＋よく出る不規則だけならす（完全な原形化はしない）。 */
import {readFileSync,writeFileSync} from "node:fs";
const W={}; new Function("window",readFileSync("words/data/words.js","utf8"))(W);
const WORDS=W.WORDS;
const byW=new Map(); WORDS.forEach(x=>{ const k=x.w.toLowerCase(); if(!byW.has(k)) byW.set(k,x); });

/* 模試2本から英語だけを抜き出す。HTMLタグ・日本語・選択肢の記号は落とす。 */
function englishOf(id){
  const w={}; new Function("window",readFileSync(`mogi/data/${id}.js`,"utf8"))(w);
  const out=[];
  const eat=s=>{ if(typeof s==="string") out.push(s.replace(/<[^>]*>/g," ")); };
  (w.EXAM.sections||[]).forEach(sec=>{
    (sec.groups||[]).forEach(g=>{ eat(g.passage); eat(g.script); eat(g.intro); eat(g.note);
      (g.items||[]).forEach(it=>{ (it.choices||[]).forEach(eat); eat(it.answer); (it.answers||[]).forEach(eat);
        (it.words||[]).forEach(eat); eat(it.model); });
    });
  });
  return out.join(" ");
}
const OUT = process.argv[2] || "out/print/wordrows.json";
const IDS = process.argv.slice(3);
if(!IDS.length){ console.error("模試idを1つ以上わたしてください（例: chu3_341 chu3_342）"); process.exit(1); }
const text = IDS.map(englishOf).join(" ");

/* 語形をならす。中学レベルなので、規則変化＋よく出る不規則だけ手当てする。 */
const IRR={was:"be",were:"be",is:"be",are:"be",am:"be",been:"be",being:"be",
 had:"have",has:"have",went:"go",gone:"go",came:"come",got:"get",gotten:"get",
 said:"say",made:"make",took:"take",taken:"take",saw:"see",seen:"see",bought:"buy",
 brought:"bring",thought:"think",told:"tell",found:"find",gave:"give",given:"give",
 knew:"know",known:"know",began:"begin",begun:"begin",grew:"grow",grown:"grow",
 wrote:"write",written:"write",read:"read",ran:"run",sold:"sell",left:"leave",
 felt:"feel",kept:"keep",met:"meet",put:"put",heard:"hear",held:"hold",lost:"lose",
 spoke:"speak",spoken:"speak",stood:"stand",understood:"understand",wore:"wear",
 children:"child",people:"people",men:"man",women:"woman",feet:"foot",leaves:"leaf",
 better:"good",best:"good",worse:"bad",worst:"bad",more:"many",most:"many",
 did:"do",does:"do",done:"do"};
function lemmas(t){
  const set=new Set([t]);
  if(IRR[t]) set.add(IRR[t]);
  if(/ies$/.test(t)) set.add(t.slice(0,-3)+"y");
  if(/(ches|shes|sses|xes|oes)$/.test(t)) set.add(t.slice(0,-2));
  if(/s$/.test(t)&&!/ss$/.test(t)) set.add(t.slice(0,-1));
  if(/ied$/.test(t)) set.add(t.slice(0,-3)+"y");
  if(/ed$/.test(t)){ set.add(t.slice(0,-2)); set.add(t.slice(0,-1));
    if(/([bdgklmnprt])\1ed$/.test(t)) set.add(t.slice(0,-3)); }
  if(/ing$/.test(t)){ const b=t.slice(0,-3); set.add(b); set.add(b+"e");
    if(/([bdgklmnprt])\1$/.test(b)) set.add(b.slice(0,-1)); }
  if(/er$/.test(t)) set.add(t.slice(0,-2));
  if(/est$/.test(t)){ set.add(t.slice(0,-3)); set.add(t.slice(0,-2)); }
  if(/ily$/.test(t)) set.add(t.slice(0,-3)+"y");
  if(/ly$/.test(t)) set.add(t.slice(0,-2));
  return [...set];
}

const seen=new Map();   // 見出し語 → {entry, 出現形}
const unknown=new Map();
for(const raw of text.split(/[^A-Za-z'’]+/)){
  const t=raw.toLowerCase().replace(/[’']s$/,"");
  if(t.length<2) continue;
  let hit=null;
  for(const l of lemmas(t)){ if(byW.has(l)){ hit=byW.get(l); break; } }
  if(hit){ if(!seen.has(hit.w)) seen.set(hit.w,hit); }
  else unknown.set(t,(unknown.get(t)||0)+1);
}
const rows=[...seen.values()];
const byG=g=>rows.filter(x=>x.g===g).sort((a,b)=>a.w.localeCompare(b.w)).map(x=>({en:x.w,ja:x.j}));
console.log(IDS.join("+"), "／拾えた語", rows.length, "／中1", byG(1).length, "中2", byG(2).length, "中3", byG(3).length);
console.log("2000語に無い語（＝語注か固有名詞）:", [...unknown.keys()].sort().join(" "));
writeFileSync(OUT,
  JSON.stringify({g1:byG(1),g2:byG(2),g3:byG(3),unknown:[...unknown.keys()].sort()},null,1));
