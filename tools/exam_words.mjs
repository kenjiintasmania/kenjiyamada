/* tools/exam_words.mjs ─ 模試の本文に出てくる単語を拾って、印刷用の仕様(JSON)にする
 *
 * 使い方:
 *   node tools/exam_words.mjs chu3_341 chu3_342 --title "中3 第4回" --name 中3第4回 > /tmp/spec.json
 *   python3 tools/make_print.py /tmp/spec.json out --trace
 *
 * なにをしているか:
 *   ・mogi/data/<id>.js を読んで **値の文字列だけ** を集める（キー名やHTMLタグは拾わない）
 *   ・活用形を原形に寄せて words/data/words.js の2000語と突きあわせる
 *     （grew→grow、potatoes→potato。合わない語は tools/extra_gloss.json で訳を足す）
 *   ・むずかしい順に4つの見出しへ分ける。2000語リストは 基本編435 → 拡張編（重要度順）
 *     という並びなので、**idが大きいほど見なれない語**という目安になる
 *   ・テスト面の訳には assets/wordjudge.js の手がかりを付ける
 *     （「話す」だけだと talk / speak / tell のどれを書けばよいか決まらないため。アプリと同じ）
 *
 * 固有名詞（Yamabe、Rina…）は2000語にもextra_glossにも無いので自然に落ちる。
 * 訳の無い語があれば標準エラーに出すので、extra_gloss.json に足すこと。
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
const EXTRA = JSON.parse(read("tools/extra_gloss.json"));

const idx = {};
WORDS.forEach((w) => { const k = String(w.w).toLowerCase(); if (!idx[k]) idx[k] = w; });

/* 不規則な変化は表で持つ。ここに無いものは下のルールで原形へ寄せる。 */
const IRR = {
  was:"be",were:"be",is:"be",am:"be",are:"be",been:"be",went:"go",gone:"go",had:"have",has:"have",
  did:"do",does:"do",done:"do",said:"say",made:"make",took:"take",got:"get",came:"come",saw:"see",
  knew:"know",thought:"think",told:"tell",gave:"give",found:"find",felt:"feel",left:"leave",
  kept:"keep",began:"begin",grew:"grow",grown:"grow",bought:"buy",brought:"bring",taught:"teach",
  caught:"catch",built:"build",sold:"sell",ate:"eat",eaten:"eat",wrote:"write",written:"write",
  spoke:"speak",broke:"break",broken:"break",chose:"choose",ran:"run",sat:"sit",stood:"stand",
  lost:"lose",met:"meet",paid:"pay",heard:"hear",held:"hold",sent:"send",spent:"spend",won:"win",
  forgot:"forget",forgotten:"forget",woke:"wake",woken:"wake",slept:"sleep",understood:"understand",
  became:"become",drew:"draw",drawn:"draw",flew:"fly",flown:"fly",rode:"ride",ridden:"ride",
  rang:"ring",rung:"ring",sang:"sing",sung:"sing",swam:"swim",threw:"throw",wore:"wear",worn:"wear",
  lent:"lend",meant:"mean",rose:"rise",shone:"shine",shown:"show",stolen:"steal",taken:"take",
  given:"give",known:"know",seen:"see",driven:"drive",drove:"drive",
  children:"child",men:"man",women:"woman",feet:"foot",teeth:"tooth",
  better:"good",best:"good",worse:"bad",worst:"bad"
};
/* 出題データそのものの語彙（type:"mcq" などの値）。本文の英語ではないので数えない。 */
const SKIP = new Set(["mcq","mcqmulti","wordorder","th","td","tr","br","span","div"]);
function forms(tok) {
  const s = tok.toLowerCase(), c = [s];
  // café → cafe。アクセント記号を外した形でも引けるようにする
  const flat = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (flat !== s) c.push(flat);
  if (IRR[s]) c.push(IRR[s]);
  if (/ies$/.test(s)) c.push(s.slice(0, -3) + "y");
  if (/(ches|shes|sses|xes|oes)$/.test(s)) c.push(s.slice(0, -2));
  if (/s$/.test(s) && !/ss$/.test(s)) c.push(s.slice(0, -1));
  if (/ing$/.test(s)) { c.push(s.slice(0, -3), s.slice(0, -3) + "e");
    if (/(.)\1ing$/.test(s)) c.push(s.slice(0, -4)); }
  if (/ed$/.test(s)) { c.push(s.slice(0, -2), s.slice(0, -1));
    if (/(.)\1ed$/.test(s)) c.push(s.slice(0, -3));
    if (/ied$/.test(s)) c.push(s.slice(0, -3) + "y"); }
  if (/er$/.test(s)) c.push(s.slice(0, -2), s.slice(0, -1));
  if (/est$/.test(s)) c.push(s.slice(0, -3), s.slice(0, -2));
  return c;
}

/* 出題データを歩いて「値の文字列」だけ集める。キー名（stem/choices…）は拾わない。 */
function texts(o, out = []) {
  if (o == null) return out;
  if (typeof o === "string") { out.push(o); return out; }
  if (typeof o === "object") { Object.values(o).forEach((x) => texts(x, out)); return out; }
  return out;
}

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf("--" + k); return i >= 0 ? argv[i + 1] : d; };
const ids = argv.filter((a) => !a.startsWith("--") && argv[argv.indexOf(a) - 1] !== "--title"
                                                  && argv[argv.indexOf(a) - 1] !== "--name");
if (!ids.length) { console.error("模試のIDを渡してください（例: chu3_341 chu3_342）"); process.exit(1); }

const found = new Map(), extra = new Map(), noGloss = new Map();
ids.forEach((id) => {
  const EX = load(`mogi/data/${id}.js`).EXAM;
  texts(EX).forEach((s) => {
    const plain = String(s).replace(/<[^>]*>/g, " ");
    (plain.match(/[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’-]*/g) || []).forEach((tok) => {
      if (tok.length < 2 || /['’]/.test(tok)) return;          // I'm などの短縮形は語として扱わない
      if (SKIP.has(tok.toLowerCase())) return;
      let hit = null;
      for (const f of forms(tok)) if (idx[f]) { hit = idx[f]; break; }
      if (hit) { if (!found.has(hit.id)) found.set(hit.id, hit); return; }
      for (const f of forms(tok)) if (EXTRA[f]) { extra.set(f, EXTRA[f]); return; }
      if (tok === tok.toLowerCase()) noGloss.set(tok, (noGloss.get(tok) || 0) + 1);
    });
  });
});

const row = (en, ja, jaTest) => ({ en, ja, jaTest: jaTest || ja });
const abc = (a, b) => a.en.toLowerCase().localeCompare(b.en.toLowerCase());
const band = (lo, hi) => [...found.values()].filter((w) => w.id >= lo && w.id <= hi)
  .map((w) => row(w.w, w.j, WJ.WordJudge.promptOf(w))).sort(abc);

const sections = [
  { title: "① この模試だけに出る語", rows: [...extra.entries()].map(([en, ja]) => row(en, ja)).sort(abc) },
  { title: "② むずかしい語",        rows: band(1001, 2000) },
  { title: "③ 押さえたい語",        rows: band(436, 1000) },
  { title: "④ 基本の語",            rows: band(1, 435) }
].filter((s) => s.rows.length);

const spec = {
  name: opt("name", ids.join("_")),
  title: opt("title", ids.join("・")),
  wordSections: sections, idioms: [], drills: [], dictation: []
};
console.log(JSON.stringify(spec, null, 1));

const total = sections.reduce((n, s) => n + s.rows.length, 0);
console.error(`拾った語 ${total}（${sections.map((s) => s.title + " " + s.rows.length).join("／")}）`);
if (noGloss.size)
  console.error("訳がない語（固有名詞ならそのままでよい／必要なら tools/extra_gloss.json へ）: "
    + [...noGloss.keys()].sort().join(" "));
