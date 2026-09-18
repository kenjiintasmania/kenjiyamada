/* tools/answer_sheet.mjs ─ 模試の「解答欄に書く語」と、その類語のプリント仕様を作る
 *
 * 使い方:
 *   node tools/answer_sheet.mjs chu3_341 chu3_342 --title "中3 第4回" --name 中3第4回 > /tmp/spec.json
 *   python3 tools/make_print.py /tmp/spec.json out --answers
 *
 * なぜ本文の全語ではないのか:
 *   本文に出る語は400以上あり、紙にすると25枚になる。対策としてほしいのは
 *   **生徒が自分で書かされる語**＝空所補充の答えと、そこで取りちがえやすい類語。
 *   並べかえは語が問題用紙に並んでいる（＝つづりを思い出す必要がない）ので、
 *   なぞり書きの対象からは外し、一覧にだけ載せる。
 *
 * 材料:
 *   ・答え      … mogi/data/<id>.js の type:"fill" の answers と type:"wordorder" の answer
 *   ・訳        … words/data/words.js → tools/extra_gloss.json の順に引く
 *   ・活用      … words/data/katsuyo.js（bought なら buy — bought — bought）
 *   ・類語      … tools/kingo.json（手で書く。先生が足し引きしてよい）
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(resolve(ROOT, p), "utf8");
const load = (p) => { const g = {}; new Function("window", read(p))(g); return g; };

const WJ = {}; new Function("window", read("assets/wordjudge.js"))(WJ);
const WORDS = load("words/data/words.js").WORDS;
WJ.WORDS = WORDS; WJ.WordJudge.buildHints(WORDS);
const KATSUYO = load("words/data/katsuyo.js").KATSUYO_WORDS || [];
const EXTRA = JSON.parse(read("tools/extra_gloss.json"));
const KINGO = JSON.parse(read("tools/kingo.json"));

const idx = {};
WORDS.forEach((w) => { const k = String(w.w).toLowerCase(); if (!idx[k]) idx[k] = w; });
/* 活用編は kid ごとに 原形/過去形/過去分詞 の3行。どの形から引いても3つ返す。 */
const kid = {}; KATSUYO.forEach((k) => { (kid[k.kid] = kid[k.kid] || [])[k.slot] = k; });
const conj = {};
Object.values(kid).forEach((g) => {
  if (!g[0] || g[0].p !== "動詞の活用") return;
  const forms = g.map((x) => x && x.w);
  g.forEach((x) => { if (x) conj[String(x.w).toLowerCase()] = forms; });
});
/* 答えの中の、覚える必要のない語（問題文にも解答欄にも必ず出る機能語） */
const STOP = new Set(["i","you","we","he","she","it","they","the","a","an","to","one",
  "our","us","them","his","her","and","of","in","on","at","how","who","what","that"]);

function baseOf(tok) {
  const s = tok.toLowerCase();
  if (idx[s]) return { w: idx[s], form: null };
  if (conj[s]) {
    const b = conj[s][0], slot = conj[s].indexOf(conj[s].find((f) => String(f).toLowerCase() === s));
    if (idx[String(b).toLowerCase()])
      return { w: idx[String(b).toLowerCase()], form: ["", "の過去形", "の過去分詞"][slot] || "" };
  }
  const c = [];
  if (/ies$/.test(s)) c.push(s.slice(0, -3) + "y");
  if (/(ches|shes|sses|xes|oes)$/.test(s)) c.push(s.slice(0, -2));
  if (/s$/.test(s) && !/ss$/.test(s)) c.push(s.slice(0, -1));
  if (/ed$/.test(s)) { c.push(s.slice(0, -2), s.slice(0, -1)); if (/ied$/.test(s)) c.push(s.slice(0, -3) + "y"); }
  for (const x of c) if (idx[x]) return { w: idx[x], form: /ed$/.test(s) ? "の過去形" : "の複数形" };
  for (const x of [s].concat(c)) if (EXTRA[x]) return { w: { w: x, j: EXTRA[x], id: null }, form: x === s ? null : (/ed$/.test(s) ? "の過去形" : "の複数形") };
  return null;
}
/* 出題どおりの形＋その意味。bought なら「buyの過去形・…を買う」 */
function glossOf(tok) {
  const b = baseOf(tok);
  if (!b) return null;
  const base = b.w.w, ja = b.w.j;
  const head = b.form ? `${base}${b.form}・` : "";
  return { en: tok, ja: head + ja, base,
           conj: conj[String(base).toLowerCase()] ? conj[String(base).toLowerCase()].join(" — ") : "",
           jaTest: b.w.id != null && !b.form ? WJ.WordJudge.promptOf(b.w) : head + ja };
}

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf("--" + k); return i >= 0 ? argv[i + 1] : d; };
const ids = argv.filter((a, i) => !a.startsWith("--") && !String(argv[i - 1] || "").startsWith("--"));
if (!ids.length) { console.error("模試のIDを渡してください（例: chu3_341 chu3_342）"); process.exit(1); }

const qs = [];
ids.forEach((id) => {
  const EX = load(`mogi/data/${id}.js`).EXAM;
  const walk = (o, sec) => {
    if (!o || typeof o !== "object") return;
    if (Array.isArray(o)) return o.forEach((x) => walk(x, sec));
    const s = o.no ? "大問" + o.no : sec;
    if (o.type === "fill" && o.answers) qs.push({ id, sec: s, q: o.label || "", ans: o.answers[0], kind: "空所" });
    if (o.type === "wordorder" && o.answer) qs.push({ id, sec: s, q: o.label || "", ans: o.answer, kind: "並べかえ" });
    Object.values(o).forEach((x) => walk(x, s));
  };
  walk(EX, "");
});

/* なぞり書きの対象は「空所補充」だけ。並べかえは語が問題に並んでいるため。 */
const core = [], seen = new Set(), noGloss = [];
qs.filter((q) => q.kind === "空所").forEach((q) => {
  String(q.ans).split(/\s+/).forEach((t) => {
    const tok = t.replace(/[^A-Za-z'’-]/g, "");
    if (!tok || STOP.has(tok.toLowerCase()) || seen.has(tok.toLowerCase())) return;
    seen.add(tok.toLowerCase());
    const g = glossOf(tok);
    if (!g) { noGloss.push(tok); return; }
    core.push(g);
  });
});
/* 類語。すでに解答欄の語として出したものは重ねない。 */
const kin = [], kseen = new Set(seen);
core.forEach((g) => {
  (KINGO[g.base] || KINGO[g.en] || []).forEach((k) => {
    if (kseen.has(k.toLowerCase())) return;
    kseen.add(k.toLowerCase());
    const x = glossOf(k);
    if (!x) { noGloss.push(k); return; }
    kin.push(x);
  });
});

const abc = (a, b) => a.en.toLowerCase().localeCompare(b.en.toLowerCase());
const spec = {
  name: opt("name", ids.join("_")),
  title: opt("title", ids.join("・")),
  wordSections: [
    { title: "① 解答欄に書く語", sub: "空所補充の答えそのもの。ここは書けないと点にならない。", rows: [...core].sort(abc) },
    { title: "② その類語・いっしょに覚える語", sub: "取りちがえやすい語と、対になる語。", rows: [...kin].sort(abc) }
  ].filter((s) => s.rows.length),
  answerList: qs.map((q) => ({ ...q, kingo: q.kind === "空所"
    ? [...new Set(String(q.ans).split(/\s+/).flatMap((t) => {
        const tok = t.replace(/[^A-Za-z'’-]/g, "").toLowerCase();
        const g = tok && !STOP.has(tok) ? glossOf(tok) : null;
        return g ? (KINGO[g.base] || []) : []; }))].join("  ")
    : "" })),
  conjugations: core.filter((g) => g.conj).map((g) => ({ en: g.conj, ja: g.ja })),
  idioms: [], drills: [], dictation: []
};
console.log(JSON.stringify(spec, null, 1));
console.error(`設問 ${qs.length}（空所 ${qs.filter(q=>q.kind==="空所").length}／並べかえ ${qs.filter(q=>q.kind==="並べかえ").length}）`);
console.error(`解答欄に書く語 ${core.length}／類語 ${kin.length}`);
if (noGloss.length) console.error("訳が引けない語（extra_gloss.json か kingo.json を直す）: " + [...new Set(noGloss)].join(" "));
