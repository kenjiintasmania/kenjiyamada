// tools/make_trial_gas.mjs ─ 試用版GAS（score_gas_trial.gs）を score_gas.gs から生成する
// 使い方: node tools/make_trial_gas.mjs
// 目的  : 実証（外部での実地検証）用に、生徒用とは別のスプレッドシートへ書くGASを作る。
//         手で二重管理すると本体の更新に追随できないので、常に本体から機械生成する。
// 変更点: ①書き込み先IDを空にする ②生徒用IDへの書き込みを構造的に禁止する
//         ③版・PINを分ける ④疎通確認用の action:"ping" を足す
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(ROOT, 'tools/score_gas.gs');
const OUT = resolve(ROOT, 'tools/score_gas_trial.gs');

let s = readFileSync(SRC, 'utf8');
const PROD_ID = (s.match(/var SPREADSHEET_ID = "([^"]+)"/) || [])[1];
if (!PROD_ID) { console.error('✗ score_gas.gs から SPREADSHEET_ID を取得できませんでした'); process.exit(1); }

const must = (before, after, label) => {
  if (!s.includes(before)) { console.error(`✗ 置換対象が見つかりません: ${label}`); process.exit(1); }
  s = s.replace(before, after);
};

// ① ヘッダ差し替え（先頭のコメントブロックを実証用の手順に）
const headEnd = s.indexOf('****/') + 5;
s = `/****************************************************************************
 * score_gas_trial.gs — 【試用版・実証用】成績受信スクリプト（Google Apps Script）
 *
 *   ★このファイルは tools/score_gas.gs から自動生成しています。
 *     直接編集せず、本体を直してから  node tools/make_trial_gas.mjs  で作り直してください。
 *     （ただし下の TRIAL_SPREADSHEET_ID と TEACHER_PIN は貼り替えて使います）
 *
 * 生徒用との違いは3つだけです：
 *   ・書き込み先が「実証用スプレッドシート」（生徒用IDは書き込み禁止＝安全弁つき）
 *   ・版が trial-… なので /admin の表示で取り違えない
 *   ・疎通確認用の ping に応答する（trial/ の「接続テスト」ボタンが使います）
 *
 * 先生の手順（詳しくは trial/SETUP.md）：
 *   1. 実証用の空スプレッドシートを新規作成し、URL の /d/【ここ】/edit をコピー。
 *   2. ［拡張機能］→［Apps Script］を開き、このファイルの全文を貼り付け。
 *   3. 下の TRIAL_SPREADSHEET_ID にコピーしたIDを貼る（TEACHER_PIN も変える）。
 *   4. ［デプロイ］→［新しいデプロイ］→ 種類「ウェブアプリ」
 *      アクセスできるユーザー＝「全員」でデプロイし、/exec のURLをコピー。
 *   5. そのURLを assets/site.js の TRIAL_GAS（summary と eiken の両方）に貼る。
 ****************************************************************************/
` + s.slice(headEnd);

// ② 書き込み先：空にして、生徒用IDが入ったら止める安全弁を追加
must(
  `var SPREADSHEET_ID = "${PROD_ID}";`,
  `/* ★実証用スプレッドシートのIDをここに貼る（生徒用とは必ず別のブック）。
 *   シートのURL: https://docs.google.com/spreadsheets/d/【この部分がID】/edit         */
var TRIAL_SPREADSHEET_ID = "";

/* 生徒用ブックのID。ここへの書き込みは禁止する（取り違え防止の安全弁）。 */
var STUDENT_SPREADSHEET_ID = "${PROD_ID}";

var SPREADSHEET_ID = TRIAL_SPREADSHEET_ID;`,
  'SPREADSHEET_ID');

must(
  `function getSS(){
  if (SPREADSHEET_ID) return SpreadsheetApp.openById(SPREADSHEET_ID);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error("スプレッドシートが見つかりません。SPREADSHEET_ID にシートIDを貼ってください。");
  return ss;
}`,
  `function getSS(){
  // 安全弁1：未設定なら、紐づいたブックへ勝手に書かずに止める。
  //   （getActiveSpreadsheet() に落ちると、コピー元＝生徒用ブックに書く事故が起こりうる）
  if (!TRIAL_SPREADSHEET_ID)
    throw new Error("実証用スプレッドシートIDが未設定です。TRIAL_SPREADSHEET_ID に実証用ブックのIDを貼ってください。");
  // 安全弁2：生徒用ブックと同じIDなら、絶対に書かない。
  if (TRIAL_SPREADSHEET_ID === STUDENT_SPREADSHEET_ID)
    throw new Error("実証用IDが生徒用ブックと同じです。実証は必ず別ブックに分けてください。");
  return SpreadsheetApp.openById(TRIAL_SPREADSHEET_ID);
}`,
  'getSS');

// ③ 版とPINを分ける
const ver = (s.match(/var GAS_VERSION = "([^"]+)"/) || [])[1] || '0';
must(`var GAS_VERSION = "${ver}";`,
     `var GAS_VERSION = "trial-${ver}";   // 実証版であることが /admin 上部で分かるようにする`,
     'GAS_VERSION');
must(`var TEACHER_PIN = "PIN";`,
     `var TEACHER_PIN = "TRIALPIN";   // ★実証用の合言葉。生徒用とは別の値にしてください`,
     'TEACHER_PIN');

// ④ 疎通確認（trial/ の「接続テスト」用）。シートには何も書かない。
must(
  `    if (data.action === "status"){`,
  `    if (data.action === "ping"){
      // 接続テスト：書き込みは一切せず、設定の妥当性だけを返す。
      var ready = !!TRIAL_SPREADSHEET_ID && TRIAL_SPREADSHEET_ID !== STUDENT_SPREADSHEET_ID;
      var name = "";
      if (ready){ try { name = SpreadsheetApp.openById(TRIAL_SPREADSHEET_ID).getName(); }
                  catch(e2){ ready = false; name = "開けません: " + String(e2); } }
      return json({result: ready ? "ok" : "error", ver:GAS_VERSION, trial:true,
                   sheet:name, message: ready ? "実証用シートに接続できました" :
                   "TRIAL_SPREADSHEET_ID を確認してください（未設定／生徒用と同じ／権限なし）"});
    }
    if (data.action === "status"){`,
  'ping');

writeFileSync(OUT, s);
console.log(`✓ 生成: tools/score_gas_trial.gs（${s.split('\n').length} 行）`);
console.log(`  生徒用ID ${PROD_ID.slice(0, 12)}… への書き込みは安全弁でブロックされます`);
