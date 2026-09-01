/* tools/make_handoff.mjs ─ 差分伝達用データ一式（情報システム事業者向け）を作る
   使い方: node tools/make_handoff.mjs [出力先ディレクトリ]

   ・画面・教材データ・受け口(GAS)・品質ゲートを1つのフォルダにまとめる。
   ・★稼働中の送信先URLとスプレッドシートIDは、すべて空にして出す。
     受け口に認証が無いため、URLを知っていれば誰でも書き込めるから（仕様書 §7）。
   ・列定義は score_gas.gs から機械生成する（手書きだと必ず実物とずれる）。
   ・探究モード側（aimode/）は別スレッドの所有物なので含めない。 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const VER  = "1.0";
const NAME = `英語学習アプリ_インターフェース_v${VER}`;
const OUT  = path.join(process.argv[2] || path.join(ROOT, "out"), NAME);

/* ---- 同梱するもの / しないもの ---- */
const INCLUDE = [
  "index.html", "assets", "words", "mogi", "eiken", "me",
  "challenge", "dojo", "jigaku", "listening", "admin", "trial"
];
const SKIP_DIR = new Set(["node_modules", ".git", "source"]);   // words/data/source は先生の元資料なので外す

/* ---- 署名 ----
   氏名・所属は git に入れない（著者決定 2026-08-01「個人情報は git を経由しない」）。
   出す前に tools/handoff_author.txt を置くと、その中身がそのまま「連絡」欄になる。
   置かなければ空欄のまま出るので、渡す前に手で書き足すこと。 */
const AUTHOR_FILE = path.join(ROOT, "tools", "handoff_author.txt");
const AUTHOR = fs.existsSync(AUTHOR_FILE)
  ? fs.readFileSync(AUTHOR_FILE, "utf8").trim()
  : "（氏名・所属・連絡先をここに記入してください）";

/* ---- 伏せるもの（稼働中の送信先・シートID） ---- */
const REDACT = [
  [/https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec/g, ""],
  [/var SPREADSHEET_ID = "[^"]*";/g, 'var SPREADSHEET_ID = "";'],
  [/var TRIAL_SPREADSHEET_ID = "[^"]*";/g, 'var TRIAL_SPREADSHEET_ID = "";'],
  [/var STUDENT_SPREADSHEET_ID = "[^"]*";/g, 'var STUDENT_SPREADSHEET_ID = "";']
];
let redactCount = 0;
function scrub(text){
  let t = text;
  for(const [re, to] of REDACT){
    t = t.replace(re, (m)=>{ redactCount++; return to; });
  }
  return t;
}
const TEXT = new Set([".html",".js",".gs",".mjs",".json",".md",".css",".csv",".txt"]);

function copyTree(src, dst){
  const st = fs.statSync(src);
  if(st.isDirectory()){
    if(SKIP_DIR.has(path.basename(src))) return;
    fs.mkdirSync(dst, {recursive:true});
    for(const e of fs.readdirSync(src)) copyTree(path.join(src,e), path.join(dst,e));
    return;
  }
  fs.mkdirSync(path.dirname(dst), {recursive:true});
  if(TEXT.has(path.extname(src))) fs.writeFileSync(dst, scrub(fs.readFileSync(src,"utf8")));
  else fs.copyFileSync(src, dst);
}

/* ---- score_gas.gs から列定義を読む（手書きしない） ---- */
function readGas(){
  const src = fs.readFileSync(path.join(ROOT,"tools/score_gas.gs"), "utf8");
  const w = {};
  // SUMMARY_COLS と各 header 配列だけを安全に評価する
  const cols = src.match(/var SUMMARY_COLS = (\[[\s\S]*?\n\]);/);
  w.SUMMARY_COLS = cols ? Function('"use strict";return '+cols[1])() : [];
  const ver = src.match(/var GAS_VERSION = "([^"]*)"/);
  w.ver = ver ? ver[1] : "?";
  const grab = (fn) => {
    const i = src.indexOf("function "+fn);
    if(i<0) return [];
    const m = src.slice(i, i+1600).match(/var header = (\[[\s\S]*?\]);/);
    return m ? Function('"use strict";return '+m[1])() : [];
  };
  w.eiken  = grab("handleEiken");
  w.jigaku = grab("handleJigaku");
  const ul = src.match(/getSheet\(UNIT_LOG, (\[[^\]]*\])\)/);
  w.unitlog = ul ? Function('"use strict";return '+ul[1])() : [];
  const us = src.match(/getSheet\(UNIT_SHEET, (\[[^\]]*\])\)/);
  w.unit = us ? Function('"use strict";return '+us[1])() : [];
  return w;
}
const G = readGas();
const tbl = (arr)=> "| " + arr.map((h,i)=>`${i+1}. ${h}`).join(" | ") + " |";

/* ---- 出力 ---- */
fs.rmSync(OUT, {recursive:true, force:true});
fs.mkdirSync(OUT, {recursive:true});
for(const e of INCLUDE) copyTree(path.join(ROOT,e), path.join(OUT,"app",e));
fs.mkdirSync(path.join(OUT,"server"), {recursive:true});
for(const f of ["score_gas.gs","score_gas_trial.gs"])
  fs.writeFileSync(path.join(OUT,"server",f), scrub(fs.readFileSync(path.join(ROOT,"tools",f),"utf8")));
fs.mkdirSync(path.join(OUT,"tools"), {recursive:true});
for(const f of ["check_exams.mjs","make_paper.py"])
  fs.writeFileSync(path.join(OUT,"tools",f), scrub(fs.readFileSync(path.join(ROOT,"tools",f),"utf8")));
fs.writeFileSync(path.join(OUT,"tools","package.json"),
  JSON.stringify({name:"eigo-app-check", private:true, type:"module",
    scripts:{check:"node check_exams.mjs"}}, null, 2));

fs.writeFileSync(path.join(OUT,"0_はじめに.md"), doc0());
fs.writeFileSync(path.join(OUT,"1_インターフェース仕様.md"), doc1());
fs.writeFileSync(path.join(OUT,"2_デプロイ手順とデータ仕様.md"), doc2());

/* ---- 検算：伏せ漏れが無いか ---- */
let leak = [];
(function walk(d){
  for(const e of fs.readdirSync(d)){
    const p=path.join(d,e), st=fs.statSync(p);
    if(st.isDirectory()){ walk(p); continue; }
    if(!TEXT.has(path.extname(p))) continue;
    const t=fs.readFileSync(p,"utf8");
    if(/AKfycb[A-Za-z0-9_-]{10}/.test(t) || /1x3jpH6/.test(t)) leak.push(path.relative(OUT,p));
  }
})(OUT);

const count = (function c(d){ let n=0; for(const e of fs.readdirSync(d)){
  const p=path.join(d,e); n += fs.statSync(p).isDirectory()? c(p) : 1; } return n; })(OUT);
console.log(`✓ ${OUT}`);
console.log(`  ファイル ${count} 個／伏せた箇所 ${redactCount} か所／GAS版 ${G.ver}`);
console.log(leak.length ? ("✗ 伏せ漏れ: "+leak.join(", ")) : "✓ 稼働中のURL・シートIDは残っていない");
if(leak.length) process.exit(1);

/* ===================== 文書 ===================== */
function doc0(){ return `# 英語学習アプリ ― インターフェース一式 v${VER}

情報システム事業者向け。**${new Date().toISOString().slice(0,10)}時点**の内容です。

---

## どこから読むか

| 順 | ファイル | 何が書いてあるか |
|----|----------|------------------|
| 1 | \`1_インターフェース仕様.md\` | **これが本体。** 送信の契約・データモデル・採点がどこで行われるか・**移行時の不変条件8つ** |
| 2 | \`2_デプロイ手順とデータ仕様.md\` | いまの受け口（Google Apps Script）の立て方と、7タブの列定義 |
| 3 | \`app/\` | 画面一式。単一HTML・依存ゼロ・ビルド不要 |
| 4 | \`server/score_gas.gs\` | いまの受け口の全文（版 ${G.ver}） |
| 5 | \`tools/\` | 品質ゲート（\`check_exams.mjs\`）と紙テスト生成器 |

**\`1_インターフェース仕様.md\` の §6（移行時の不変条件）だけは、必ずお読みください。**
実装は置き換えていただいて構いませんが、そこが崩れると採点が信用できなくなります。

---

## これは何か

中学校英語科の学習アプリです。**探究モード（別途お渡ししている \`log_gas.gs\` の一式）とは別系統**で、
コードもデプロイも分かれています。ただし**書込先のスプレッドシートは同じブック**で、
\`score_gas.gs\` の「相関」タブが両者を**学年＋番号**で突合します。

| | 探究モード（別一式） | この一式（英語学習アプリ） |
|---|---|---|
| 中身 | AIとの対話そのものを記録する | 単語・模試・英検・自学の**学習と採点** |
| 受け口 | \`log_gas.gs\` | \`score_gas.gs\` |
| タブ | AIログ／カルテ／英語カルテ／発表カルテ | 成績まとめ／英検テスト履歴／単元管理／単元テスト記録／自学ログ／設定／相関 |
| 採点 | しない（記録と再計算のみ） | **する。ただし全てアプリ側で。AIには一切させない** |

---

## 画面の構成

| 画面 | 何をするか | 記録 |
|---|---|---|
| \`words/\` | 単語2000語＋活用編600点。品詞別に打ち込む | 端末 → マイページ経由で送信 |
| \`mogi/\` | 模擬テスト（中2・中3・岡山県スタイル10本）。全自動採点 | 端末＋単元テストは即時送信 |
| \`eiken/\` | 英検7〜2級のドリルと判定テスト | 1回ごとに送信 |
| \`me/\` | マイページ。3アプリの記録をまとめて先生に送る | 送信の起点 |
| \`jigaku/\` | 自学マイページ（単語・文法・本文の3レーン）。**AIに出題させ、アプリが再採点** | 1回ごとに送信 |
| \`dojo/\` | 読解道場。テク→ドリル→県模試の3層 | 端末のみ |
| \`listening/\` | 音の道場（疑似リスニング・スピーキング） | 端末のみ |
| \`challenge/\` | 挑戦モード（単語50問・並べ替え英作文） | 端末のみ |
| \`admin/\` | 先生用。単元テストのゲート開閉・学習方針・相関タブ生成 | PIN必須 |
| \`trial/\` | 実証用の入口。**送信先を生徒用と分離する** | — |

---

## ⚠️ 送信先URLについて

**\`app/\` と \`server/\` の稼働中URL・スプレッドシートIDは、すべて空にしてあります。**

\`\`\`js
var SUMMARY_GAS_URL = "";
var SPREADSHEET_ID  = "";
\`\`\`

**ご自分でデプロイした \`/exec\` URL とシートIDを入れてください。**
空のままでも画面はすべて動きます（端末内の記録のみ・送信なし）。

いまの受け口は**認証がありません**（\`1_インターフェース仕様.md\` §7）。
URLを知っていれば誰でも書き込めるため、**学校で稼働中の送信先はこの一式に含めていません。**

---

## 動作確認（10分）

1. \`2_デプロイ手順とデータ仕様.md\` §1 の手順で、受け口を1つ立てる
2. \`/exec\` をブラウザで開き \`{"result":"ok", ... "ver":"${G.ver}"}\` を確認
3. \`app/me/index.html\` と \`app/jigaku/index.html\` の \`GAS_URL\` に、その \`/exec\` を貼る
4. \`app/index.html\` をブラウザで開く（**\`file://\` で直接開いても動きます**）
5. 単語アプリで数語クリア → マイページで学年・番号を入れて「先生に送信」
6. **「成績まとめ」タブに1行増える**
7. \`cd tools && npm run check\` → \`✓ ALL PASS\` を確認（全模試が実エンジンで100点になる）

7まで通れば、契約どおりに動いています。

---

## ご検討いただきたいこと

\`1_インターフェース仕様.md\` §8 に6点あります。とくに次の2つが先だと考えています。

1. **認証。** いまは無し。探究モード側と同じ課題です
2. **氏名。** この系統は**氏名を持ちます**（探究モード側は持ちません）。
   先生の成績簿として使うためですが、事業者側で扱うなら設計判断が要ります

---

## 連絡

${AUTHOR}
`; }

function doc1(){
const maxCols = G.SUMMARY_COLS.filter(c=>c.max).length;
return `# インターフェース仕様 v${VER} — 情報システム事業者向け

対象＝英語学習アプリ（\`score_gas.gs\` 系統）。探究モード（\`log_gas.gs\` 系統）は別一式です。

---

## §1 全体像

\`\`\`
[生徒の端末] 学習面（words / mogi / eiken / jigaku / dojo / listening / challenge）
      │  記録は localStorage（端末内）
      ▼
[マイページ me/] 3アプリの記録を1つのペイロードにまとめる
      │  HTTP POST（text/plain）
      ▼
[受け口 score_gas.gs] ──▶ スプレッドシート（7タブ）
      ▲
      └── 単元テスト・英検・自学は、マイページを経由せず各画面から直接送る
\`\`\`

**採点はすべて端末側で終わっています。** 受け口がするのは、届いた値を
「最大値を保つ列」と「最新で上書きする列」に振り分けて1人1行に合成することだけです。

---

## §2 送信インターフェース（HTTP契約）

### 2.1 リクエスト

\`\`\`
POST <デプロイURL>/exec
Content-Type: text/plain;charset=utf-8
本文: JSON文字列
\`\`\`

**\`text/plain\` を使うのは、ブラウザの事前検査（preflight）を起こさないためです。**
\`application/json\` にすると OPTIONS が飛び、Apps Script はそれに応答できません。
移行先でも、この点だけは同じ配慮が要ります（または CORS を正しく返してください）。

一部の画面（\`admin/\`）は隠しフォーム→隠し iframe への POST も使います。
これは応答を読めない代わりに、CORS に一切依存しない経路です。

### 2.2 レスポンス

\`\`\`json
{"result":"ok","ver":"${G.ver}"}
{"result":"error","message":"…","ver":"${G.ver}"}
\`\`\`

\`ver\` は**必ず返してください。** アプリ側は送信の前に \`action:"policy"\` を投げて
\`ver\` を読み、**受け口が新しい種別に対応しているかを確かめてから本送信します。**
これが無いと、古い受け口が未知の種別を別のタブへ書き込みます（実際に起きた事故です）。

### 2.3 死活確認（GET）

\`\`\`
GET <デプロイURL>/exec  →  {"result":"ok","message":"score_gas alive","ver":"${G.ver}"}
\`\`\`

---

## §3 ペイロード定義（4種＋操作系）

| 種別 | 送る画面 | 行き先タブ | 方式 |
|---|---|---|---|
| \`kind:"summary"\` | \`me/\` マイページ | 成績まとめ | **upsert（1人1行）** |
| （\`kind\` 無し） | \`eiken/\` | 英検テスト履歴 | append |
| \`kind:"unittest"\` | \`mogi/exam.html\` | 単元テスト記録／単元管理 | append（同一提出は拒否） |
| \`kind:"jigaku"\` | \`jigaku/\`（3レーン） | 自学ログ | append |

操作系（\`admin/\` から・PIN必須）：\`action:"status"\` / \`"gate"\` / \`"policy"\` / \`"setpolicy"\` / \`"buildcorr"\`

### 3.1 \`kind:"summary"\`（成績まとめ）

キーは \`SUMMARY_COLS\`（${G.SUMMARY_COLS.length}列）と1対1です。**ここに列を足せば集約に乗ります。**
うち **${maxCols}列が \`max:true\`**＝これまでの最大値を保ちます（記録は下がらない）。
残りは最新で上書き。ただし**今回が空なら従来値を残す**（消さない）。

### 3.2 \`kind:"unittest"\`（単元テスト）

先生が \`admin/\` でゲートを開けている間だけ受け付けます。
\`セッション+試験+学年+番号\` が同じ行が既にあれば**拒否**します（二重提出の防止）。

### 3.3 \`kind:"jigaku"\`（自学ログ）

\`lane\` が「単語」「文法」「本文」のどれかで、意味が変わります。§5.3 を参照。

---

## §4 データモデル（7タブ）

| タブ | 役割 | 主キー | 方式 |
|---|---|---|---|
| 成績まとめ | 1人1行の集約（${G.SUMMARY_COLS.length}列） | 学年+番号 | upsert |
| 英検テスト履歴 | 1回1行 | — | append |
| 単元管理 | ゲートの開閉状態 | 試験ID | 上書き |
| 単元テスト記録 | 提出を1回ずつ | セッション+試験+学年+番号 | append（重複拒否） |
| 自学ログ | 自学の1回ごと | — | append |
| 設定 | 学習方針コード | — | 上書き |
| 相関 | 成績まとめ×AImodeログの結合 | 学年+番号 | 押すたび再生成 |

### 主キーが無いことについて

append のタブに主キーはありません。**同じ生徒が同じ内容を2回送れば2行入ります。**
これは意図的で、「いつ何回やったか」も記録の一部だからです。
ただし単元テストだけは評価に直結するため、重複を拒否します。

### 生徒の識別

**学年＋出席番号**です。氏名の列も持ち、送られてくれば書きます。

**探究モード側（\`log_gas.gs\`）は氏名を持ちません。** この系統だけが持ちます。
先生の成績簿として使うためですが、事業者側で扱うなら §8 の判断が要ります。

---

## §5 採点はどこで行われるか

**全部、端末（ブラウザ）の中です。受け口は採点しません。**

### 5.1 模試・単語・英検

出題データに正解が入っており、アプリが照合します。
\`tools/check_exams.mjs\` が**全模試を実エンジンで解いて100点になるか**を検査します。
出題と採点がずれていれば、ここで落ちます。

### 5.2 自学レーン（★この系統の設計の核）

自学は「生徒が外部のAIに出題させ、自分で答え、結果をアプリに貼る」形です。
**AIが付けた○×は一切見ません。** 貼られた「わたしの答え」と「正解」の文字列一致だけで再計算します。

＝AIに「全問正解にして」と言っても点は動きません。

さらに**AIが正解として返した語が、生徒の持ってきたデータに実在するか**を検算します。
単語レーンは生徒の単語リストと、本文レーンは生徒が打ち込んだ本文と突合し、
外れた語を警告します（止めはしません）。

判定は用途で分けています。ここを一律にすると誤ります。

| | 判定 |
|---|---|
| 選択問題 | 一致のみ。選択肢はどれも別の語なので、1文字ちがいを「つづりミス」と見ない |
| 並べかえ | 完答のみ（業者テストの慣例に合わせた） |
| 訳から再生・抜き書き | つづりミスは −1 |
| 列挙 | 集合で比べ、合った数で按分。よけいに挙げた分は減点しない |

### 5.3 自学ログのレーン別の意味

| lane | 数字の意味 | 相関タブへの出方 |
|---|---|---|
| 単語 | その回の正答数。**「クリアした語」列に正解語を保持** | ユニットごとに**語の実数**（重複を数えない）を \`自学_U3\` 等に |
| 文法 | その回の得点／満点 | その項目の**最高正答率**を \`文法_現在完了形\` 等に |
| 本文 | 同上。加えて \`強調数\`／\`的中数\` | \`本文_Unit 3-1\` 等に |

**単語だけ語数集計、他はレーン別の列です。** 混ぜると項目名が「その他」に落ちて数字が汚れます。

---

## §6 移行時の不変条件（★この文書の本体）

実装を置き換えても、**次の8つは成立している必要があります。**
方針表明ではなく、**採点が信用に足るための前提条件**です。

| # | 不変条件 | 破ると何が起きるか |
|---|---|---|
| **INV-1** | **採点をAIにさせない。** 生成AIの出力を点に変換する経路を作らない | 「全問正解にして」で点が動く。装置の存在理由が消える |
| **INV-2** | **出題の根拠は、生徒が持ってきたデータに限る。** 教科書名・単元名からAIに推測させない | 教科書は学年・地域で変わる。単元名は根拠にならない（実際にずれた） |
| **INV-3** | **\`max\` 列を下げない。** 記録は下がらない | 一度出した最高記録が消えると、生徒は挑戦しなくなる |
| **INV-4** | **送信前に受け口の版を確かめる。** 未知の種別を既存タブへ書かない | 古い受け口が自学の記録を英検タブへ書いた（実際の事故） |
| **INV-5** | **実証と本番の送信先を分離し、未設定なら送信を止める** | 実証データが生徒の成績簿に混ざる。**フェイルオープンにしない** |
| **INV-6** | **式としきい値を画面に出す** | 検分できない数字は権威にしかならない |
| **INV-7** | **出題データは品質ゲートを通ったものだけ公開する** | 出題と採点がずれた模試が配られる（\`check_exams.mjs\` が実際にバグを検出してきた） |
| **INV-8** | **端末に出た数字と、表の数字を一致させる。** サーバで再計算・改変しない | 検分が成立しない |

**INV-1 と INV-2 が最重要です。**
この2つが、生成AIを使いながら「AIに評価させない」ための仕掛けです。ここを外すと、
ただのAI採点アプリになります。それなら既存の製品のほうが優れています。

**INV-5 について。** 実証用の送信先が未設定のとき、\`assets/site.js\` は空文字を返し、
**送信そのものを止めます。** 「未設定なら本番へ」ではありません。
足すときは、この向きを変えないでください。

---

## §7 いまの実装の限界（正直に）

事業者側で埋めていただく前提の穴です。**隠しません。**

| 項目 | 現状 |
|---|---|
| 認証 | **無し。** URLを知っていれば誰でも書き込める |
| 識別子 | 学年＋出席番号＋**氏名**。匿名ではない |
| 改ざん | 端末の localStorage は生徒が編集できる。送信内容も同様 |
| 同時実行 | \`LockService\` で直列化しているが、Apps Script の実行時間上限がある |
| 規模 | 1校・1学年規模。スプレッドシートの行数上限と実行時間が先に来る |
| 相関タブ | 押すたび全再生成。人数が増えると遅くなる |
| 紙テスト | \`make_paper.py\` は DOCX を出すだけ。採点は人が行う |
| オフライン | 端末内の記録は動くが、送信は不可。再送の仕組みは無い |

---

## §8 事業者に判断していただきたいこと

1. **認証。** 探究モード側と共通の課題です
2. **氏名。** この系統は氏名を持ちます。学級内では番号から本人をたどれるので、
   **氏名を落としても匿名にはなりません**（仮名化）。どこまで持つか
3. **改ざん耐性。** 端末側の記録を信用しない設計にするか、するとしたら何を根拠にするか
4. **規模。** スプレッドシートを外すなら、7タブの意味づけ（§4）をどう写すか
5. **相関タブ。** 探究モード側と結合する唯一の場所です。ここをどう持つか
6. **品質ゲート。** \`check_exams.mjs\` を CI に載せるかどうか。**出題と採点の整合はここでしか担保していません**

---

## §9 付録：最小の受け口（擬似コード）

\`\`\`
POST /exec  body=<JSON文字列>
  d = parse(body)
  if d.action == "policy": return {result:"ok", policy:…, ver:VER}
  if d.kind == "unittest":  append(単元テスト記録, d)   # 同一提出は拒否
  if d.kind == "jigaku":    append(自学ログ, d)
  if d.kind == "summary":   upsert(成績まとめ, key=(学年,番号), d)  # max列は下げない
  if d.kind:                return {result:"error", message:"未知の kind"}
  append(英検テスト履歴, d)                                # kind 無し＝英検
  return {result:"ok", ver:VER}
\`\`\`

**\`ver\` を返すことと、未知の \`kind\` をエラーにすることの2つだけは、必ず写してください。**
この2つが INV-4 の実体です。
`; }

function doc2(){ return `# デプロイ手順とデータ仕様（score_gas.gs ${G.ver}）

---

## §1 手順（10分）

1. Google ドライブで**空のスプレッドシート**を作る。URL の \`/d/【ここ】/edit\` がシートID
2. ［拡張機能］→［Apps Script］を開き、\`server/score_gas.gs\` の**全文**を貼る
3. 冒頭の2か所を埋める

\`\`\`js
var SPREADSHEET_ID = "【手順1のシートID】";
var TEACHER_PIN    = "【先生だけが知る合言葉】";
\`\`\`

4. ［デプロイ］→［新しいデプロイ］→ 種類「ウェブアプリ」

| 項目 | 設定 |
|---|---|
| 次のユーザーとして実行 | 自分 |
| アクセスできるユーザー | **全員** |

5. 出てきた \`/exec\` を、\`app/\` 各画面の \`GAS_URL\` に貼る

**タブは作らなくて構いません。** 初回の送信時に自動で作られます。

---

## §2 ★最重要★ URL を変えてはいけない

**［新しいデプロイ］を選ぶと別のURLができます。** アプリは古いURLを見たままになります。
2回目以降は必ず **［デプロイを管理］→ 鉛筆 → バージョン「新バージョン」→ デプロイ**。

デプロイが複数あるとき、**名前ではなくURLで見分けてください。** 実際に取り違えた事例があります。

---

## §3 確認

\`/exec\` を**シークレットウィンドウで**開く（通常のウィンドウでは自分がログイン済みなので、
公開設定が「自分のみ」でも見えてしまいます）。

- \`{"result":"ok","message":"score_gas alive","ver":"${G.ver}"}\` が出る → 公開設定OK
- ログイン画面・「承認が必要です」→ アクセスできるユーザーが「全員」になっていない

**403 はコードの誤りでは出ません。ほぼ必ず公開設定です。**

---

## §4 データ仕様（7タブ）

### 成績まとめ（${G.SUMMARY_COLS.length}列・1人1行）

\`SUMMARY_COLS\` が単一の真実です。\`max:true\` の列は**これまでの最大値**を保ち、
それ以外は最新で上書き（ただし今回が空なら従来値を残す）。

| # | 見出し | キー | 方式 |
|---|---|---|---|
${G.SUMMARY_COLS.map((c,i)=>`| ${i+1} | ${c.head} | \`${c.key}\` | ${c.max?"最大値を保つ":"最新で上書き"} |`).join("\n")}

**固定列の右**に、自学ログから作られる列が並びます（\`自学_U3\` \`文法_現在完了形\` \`本文_Unit 3-1\` など）。
これは送信のたびに**まるごと作り直されます。手で書いた数字は消えます。**

### 英検テスト履歴（${G.eiken.length}列）

${tbl(G.eiken)}

### 単元管理（${G.unit.length}列）

${tbl(G.unit)}

### 単元テスト記録（${G.unitlog.length}列）

${tbl(G.unitlog)}

### 自学ログ（${G.jigaku.length}列）

${tbl(G.jigaku)}

\`レーン\` が「単語」のときだけ \`クリアした語\` に正解語が入り、ユニット別の語数集計に使われます。
「文法」「本文」は正答率で別の列に出ます（仕様書 §5.3）。

### 設定（2列）

A2=項目／B2=値。学習方針コードを保持します。

### 相関（生成物）

「成績まとめ」×「AImodeログ」を**学年＋番号**で結合します。押すたび再生成。
AImodeログ側のタブ名には依存せず、**列見出し「AI活用レベル(推定)」の有無**で検出します
（改名・二重タブでも追従するため）。

---

## §5 実際に書かれる1行（自学ログ・単語レーン）

\`\`\`
2026/08/26 10:12 | 1 | 1 | （氏名） | 単語 | Unit 3-1 | 打ち込み | 12 | 12 | 10 | 83 | v3 | 0 | chopstick | career, own, note | |
\`\`\`

\`まちがえた語\` と \`クリアした語\` が**両方**あります。
片方だけでは「何ができて何ができないか」が復元できません。

---

## §6 切り戻し

デプロイの版を1つ戻すだけです（［デプロイを管理］→ バージョンを前の番号に）。
**タブとデータはそのまま残ります。** 列を増やす変更を戻す場合、
増えた列は残りますが、旧版は書き込まないので空欄になるだけです。

---

## §7 影響範囲

\`score_gas.gs\` を差し替えると、**送信を行う全画面**（マイページ・英検・単元テスト・自学の3レーン・先生用コンソール）が
同時に新しい版を見ます。段階的な移行はできません。
版を上げるときは、アプリ側の \`action:"policy"\` による版チェック（仕様書 §2.2）が
安全弁として働きます。
`; }
