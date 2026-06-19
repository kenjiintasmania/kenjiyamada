// jsdom スモークテスト（ブラウザなしでDOMフローを検証）
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const wordsJs = fs.readFileSync(path.join(root, "data", "words.js"), "utf8");
const appJs = fs.readFileSync(path.join(root, "js", "app.js"), "utf8");

const dom = new JSDOM(html, { runScripts: "outside-only", pretendToBeVisual: true, url: "http://localhost/" });
const { window } = dom;
const { document } = window;

// localStorage polyfill
let LS = {};
window.localStorage = {
  getItem: k => (k in LS ? LS[k] : null),
  setItem: (k, v) => { LS[k] = String(v); },
  removeItem: k => { delete LS[k]; },
};
window.confirm = () => true;
window.scrollTo = () => {};

let failures = 0;
function ok(cond, msg) { console.log((cond ? "  ✓ " : "  ✗ FAIL ") + msg); if (!cond) failures++; }
function fire(el, type) { el.dispatchEvent(new window.Event(type, { bubbles: true })); }
function click(el) {
  // jsdom Event needs target.closest; use MouseEvent
  const ev = new window.MouseEvent("click", { bubbles: true });
  el.dispatchEvent(ev);
}

// run app scripts in window context
window.eval(wordsJs);
window.eval(appJs);

console.log("== データ ==");
ok(window.WORDS.length === 2000, "総語数 2000 (=" + window.WORDS.length + ")");
ok(window.WORD_META.basicCount + window.WORD_META.extendedCount === 2000, "基本+拡張=2000");
const posSet = new Set(window.WORDS.map(w => w.p));
ok(posSet.has("代名詞") && posSet.has("疑問詞"), "代名詞と疑問詞が分離");
// 疑問詞が代名詞/副詞に混入していないか
const interrog = new Set(["what","who","whom","whose","which","where","when","why","how"]);
const leak = window.WORDS.filter(w => interrog.has(w.w.toLowerCase()) && w.p !== "疑問詞");
ok(leak.length === 0, "疑問詞リーク無し (" + leak.map(w=>w.w+":"+w.p).join(",") + ")");

console.log("== 画面遷移 ==");
ok(!document.getElementById("screen-home").classList.contains("hidden"), "起動時ホーム表示");
// 基本編クリック
click(document.querySelector('.mode-card[data-mode="b"]'));
ok(!document.getElementById("screen-cats").classList.contains("hidden"), "モード→カテゴリ表示");
const tiles = document.querySelectorAll(".cat-tile");
ok(tiles.length >= 5, "品詞タイル表示 (" + tiles.length + "個)");

console.log("== 学習フロー（代名詞） ==");
// 代名詞タイルを探してクリック
let pron = Array.from(tiles).find(t => t.getAttribute("data-pos") === "代名詞");
click(pron);
ok(!document.getElementById("screen-study").classList.contains("hidden"), "学習画面へ");
const front1 = document.getElementById("cardFront").textContent;
ok(front1.length > 0, "おもて面表示: " + front1);
// 答えを見る
click(document.getElementById("card"));
ok(!document.getElementById("cardBack").classList.contains("hidden"), "答え表示");
ok(document.getElementById("revealActions").classList.contains("hidden") === false, "クリア/まだボタン表示");
const backTxt = document.querySelector("#cardBack .ans").textContent;
ok(backTxt.length > 0, "答え内容: " + backTxt);

// クリアを数回押して進める
console.log("== クリアフラグ ==");
let beforeCleared = Object.keys(JSON.parse(window.localStorage.getItem("tango_v1")||'{"cleared":{}}').cleared).length;
click(document.getElementById("clearBtn"));
let afterCleared = Object.keys(JSON.parse(window.localStorage.getItem("tango_v1")).cleared).length;
ok(afterCleared === beforeCleared + 1, "クリアで保存(+1): " + beforeCleared + "→" + afterCleared);

// 残りをすべてクリアして完了画面へ
let guard = 0;
while (document.getElementById("screen-study").classList.contains("hidden") === false && guard < 100) {
  if (document.getElementById("cardBack").classList.contains("hidden")) click(document.getElementById("card"));
  click(document.getElementById("clearBtn"));
  guard++;
}
ok(!document.getElementById("screen-done").classList.contains("hidden"), "完了画面へ到達 (" + guard + "枚)");

console.log("== シャッフル & 再挑戦 ==");
// 戻る→カテゴリ
click(document.getElementById("doneBackBtn"));
ok(!document.getElementById("screen-cats").classList.contains("hidden"), "カテゴリに戻る");
// シャッフル
click(document.querySelector('.special-tile[data-special="shuffle"]'));
ok(!document.getElementById("screen-study").classList.contains("hidden"), "シャッフル開始");
// 再挑戦（クリア済みがあるはず）
// 一旦戻る
const back = document.getElementById("backBtn");
click(back);
click(document.querySelector('.special-tile[data-special="retry"]'));
ok(!document.getElementById("screen-study").classList.contains("hidden"), "再挑戦開始（クリア済み復習）");

console.log("== 設定 ==");
click(document.getElementById("topRight"));
ok(!document.getElementById("modal").classList.contains("hidden"), "設定モーダル表示");
// 向き変更
let segBtn = document.querySelector('[data-seg="dir"] button[data-val="e2j"]');
click(segBtn);
let st = JSON.parse(window.localStorage.getItem("tango_v1")).settings;
ok(st.dir === "e2j", "出題の向き保存: " + st.dir);

console.log("\n" + (failures === 0 ? "✅ 全テスト通過" : "❌ 失敗 " + failures + " 件"));
process.exit(failures ? 1 : 0);
