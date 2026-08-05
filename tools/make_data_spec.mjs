// tools/make_data_spec.mjs ─ 「送信されるデータ一式」の仕様書を実コードから生成する
// 使い方: node tools/make_data_spec.mjs
// 目的  : 外部（麻生情報システム等）への説明資料は、手書きだと実装とズレる。
//         送信側（各HTML）と受信側（score_gas.gs）の実体から機械生成し、
//         payloadキーと列定義の対応も検算した上で trial/DATA.md を出力する。
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const r = (p) => readFileSync(resolve(ROOT, p), 'utf8');

const gas = r('tools/score_gas.gs');
const me = r('me/index.html');
const eiken = r('eiken/index.html');
const mogi = r('mogi/exam.html');

const die = (m) => { console.error('✗ ' + m); process.exit(1); };

/* ---------- 受信側：成績まとめの列定義 ---------- */
const colsSrc = gas.match(/var SUMMARY_COLS = \[([\s\S]*?)\n\];/);
if (!colsSrc) die('SUMMARY_COLS を取得できません');
const COLS = [...colsSrc[1].matchAll(/\{key:"([^"]+)",\s*head:"([^"]+)",\s*max:(true|false)\}/g)]
  .map(m => ({ key: m[1], head: m[2], max: m[3] === 'true' }));
if (COLS.length < 40) die(`SUMMARY_COLS の抽出数が少なすぎます (${COLS.length})`);

/* ---------- 送信側：マイページ buildPayload のキー ---------- */
const bp = me.match(/function buildPayload\(\)\{([\s\S]*?)\n  \}/);
if (!bp) die('buildPayload を取得できません');
const meKeys = [...bp[1].matchAll(/(?:^|[{,\s])([a-z_][a-zA-Z_0-9]*)\s*:/gm)].map(m => m[1]);
const meSet = [...new Set(meKeys)];

/* ---------- タブ名 ---------- */
const sheetName = (v) => (gas.match(new RegExp(`var ${v}\\s*=\\s*"([^"]+)"`)) || [])[1] || '?';
const TAB = {
  summary: sheetName('SUMMARY_SHEET'), eiken: sheetName('EIKEN_SHEET'),
  unitLog: sheetName('UNIT_LOG'), unit: sheetName('UNIT_SHEET'),
};

/* ---------- 受信側：英検・単元テストの列 ---------- */
const headerOf = (fn) => {
  const body = gas.match(new RegExp(`function ${fn}\\(d\\)\\{([\\s\\S]*?)\\n\\}`));
  if (!body) die(`${fn} を取得できません`);
  const h = body[1].match(/\[((?:\s*"[^"]+",?)+)\]/);
  if (!h) die(`${fn} のヘッダ配列を取得できません`);
  return [...h[1].matchAll(/"([^"]+)"/g)].map(m => m[1]);
};
const EIKEN_HEAD = headerOf('handleEiken');
const UNIT_HEAD = (gas.match(/getSheet\(UNIT_LOG,\s*\[([^\]]+)\]/) || [])[1];
if (!UNIT_HEAD) die('単元テスト記録のヘッダを取得できません');
const UNIT_COLS = [...UNIT_HEAD.matchAll(/"([^"]+)"/g)].map(m => m[1]);

/* ---------- 受信側が実際に書き込んでいるキー ----------
 * appendRow の中の d.xxx を拾うだけでは足りない。単元テストは
 *   var cls = String(d.cls||"").trim();  →  appendRow([..., cls, ...])
 * のように一度変数へ受けるため、別名も解決しないと「記録されない」と誤判定する。 */
const writtenKeys = (fnName) => {
  const fn = gas.match(new RegExp(`function ${fnName}\\(d\\)\\{([\\s\\S]*?)\\n\\}`));
  if (!fn) die(`${fnName} を取得できません`);
  const body = fn[1];
  const row = body.match(/appendRow\(\[([\s\S]*?)\]\)/);
  if (!row) die(`${fnName} の appendRow を取得できません`);
  const keys = new Set([...row[1].matchAll(/\bd\.([a-zA-Z_0-9]+)/g)].map(m => m[1]));
  // 別名（var X = … d.Y …）を解決して、appendRow に X が出てくれば Y も記録済みとみなす
  for (const m of body.matchAll(/\b([a-zA-Z_$][\w$]*)\s*=\s*[^;,]*?\bd\.([a-zA-Z_0-9]+)/g)) {
    const [, alias, key] = m;
    if (new RegExp(`(^|[\\[,\\s])${alias}([,\\s\\]]|$)`).test(row[1])) keys.add(key);
  }
  return keys;
};
const EIKEN_WRITTEN = writtenKeys('handleEiken');
const UNIT_WRITTEN = writtenKeys('handleUnitTest');

/* ---------- 送信側：英検・単元テストのキー ---------- */
const eikenPayload = eiken.match(/var payload=\{([\s\S]*?)\};/);
if (!eikenPayload) die('英検の payload を取得できません');
const eikenKeys = [...new Set([...eikenPayload[1].matchAll(/([a-z_][a-zA-Z_0-9]*)\s*:/g)].map(m => m[1]))];
const unitPayload = mogi.match(/post\(\{kind:"unittest"([\s\S]*?)\}\)/);
if (!unitPayload) die('単元テストの payload を取得できません');
const unitKeys = ['kind', ...new Set([...unitPayload[1].matchAll(/([a-z_][a-zA-Z_0-9]*)\s*:/g)].map(m => m[1]))];

/* ---------- 検算：payloadキーと列定義の対応 ---------- */
const META = ['kind', 'ver', 'site'];               // 列を持たない制御用フィールド
const colKeys = new Set(COLS.map(c => c.key));
const unmapped = meSet.filter(k => !colKeys.has(k) && !META.includes(k));
const missing = COLS.map(c => c.key).filter(k => k !== '_ts' && !meSet.includes(k));
if (unmapped.length) die(`列のない送信キーがあります: ${unmapped.join(', ')}`);
if (missing.length) die(`送られない列があります: ${missing.join(', ')}`);

/* ---------- 出力 ---------- */
const esc = (s) => String(s).replace(/\|/g, '\\|');
const rows = (a) => a.join('\n');
const GROUPS = [
  ['本人の識別', /^(cls|num|name)$/],
  ['単語アプリ', /^w_/],
  ['模擬テスト', /^m_/],
  ['英検アプリ', /^e_/],
  ['習熟度 単語テスト', /^sv_/],
];

let md = `# 送信されるデータ一式（英語学習アプリ）

このファイルは **実コードから自動生成** しています（\`node tools/make_data_spec.mjs\`）。
手書きの説明とズレないよう、送信側（各HTML）と受信側（\`tools/score_gas.gs\`）の実体から
項目を抽出し、送信キーと列定義の対応を検算した上で出力しています。

- 生徒用の届き先：生徒用スプレッドシート
- 実証（試用版）の届き先：実証用スプレッドシート（\`?site=aso\` のときのみ・別ブック）
- どちらも**同じアプリ・同じ項目**を送ります。違うのは届き先だけです。

---

## 0. 送信の全体像

| # | いつ送るか | 送る画面 | 届き先タブ | 送り方 |
|---|---|---|---|---|
| 1 | マイページで「先生に送信」を押したとき（学年・番号が入っていれば自動送信も） | \`me/\` | ${TAB.summary} | 1人1行を上書き更新 |
| 2 | 英検アプリで判定テストを終えて送信したとき | \`eiken/\` | ${TAB.eiken} | 1回ごとに1行追記 |
| 3 | 模試の単元テストを提出したとき（先生が受付を開けている間のみ） | \`mogi/exam.html\` | ${TAB.unitLog} | 1回ごとに1行追記 |

これ以外の操作（単語アプリ・読解道場・挑戦モード・入試模試の自己採点など）は
**通信しません**。記録は端末内（localStorage）に留まります。

送信はすべて HTTPS の POST（JSON）で、宛先は Google Apps Script のウェブアプリ1本のみです。
第三者のサーバー・解析ツール・広告タグは使っていません。

---

## 1. ${TAB.summary}（マイページからの集約・1人1行）

送信キー ${meSet.length} 個（うち \`kind\`・\`ver\` は制御用）→ 列 ${COLS.length} 個。
先頭の \`更新日時\` だけはアプリが送らず、受信時にサーバー側で付けます。
「最大値」の列は、これまでの最高値を保持します（記録は下がりません）。

| 列（見出し） | 送信キー | 保持 | 内容 |
|---|---|---|---|
`;

const DESC = {
  _ts: '受信した日時（**サーバー側で付与**。アプリは送りません）',
  cls: '学年（1〜3）。生徒が入力', num: '出席番号。半角数字のみ', name: '名前。**任意**（空でも送信できる）',
  w_all: '打ち込めた単語の合計', w_goal: '目標語数（2000固定）', w_basic: '基本編で打ち込めた数',
  w_ext: '拡張編で打ち込めた数', w_g1: '1年の語', w_g2: '2年の語', w_g3: '3年の語',
  w_katsuyo: '活用編の得点（動詞150×3＋形容詞50×3＝600点満点）',
  m_best: '模試の最高点', m_done: '模試に挑戦した回数',
  e_full: '英検レベルの座標（0〜8）・本番モード', e_full_label: 'レベルの目安ラベル',
  e_quick: '同・クイックモード', e_avg: '平均レベル',
  e_recent_grade: '直近に受けた級', e_recent_pct: '直近の正答率', e_recent_pass: '直近の合否',
};
for (const c of COLS) {
  const d = DESC[c.key] || (/^m_/.test(c.key) ? '各回のベスト（100点満点）'
    : /^sv_.*_n$/.test(c.key) ? '挑戦回数'
    : /^sv_/.test(c.key) ? '正式点（80%以上のときだけ入る）' : '');
  md += `| ${esc(c.head)} | \`${c.key}\` | ${c.max ? '最大値' : '最新'} | ${d} |\n`;
}

md += `
> 補足：習熟度単語テストは **80%以上のときだけ点数を送り**、それ未満は空欄です（回数は常に送ります）。
> 何度でも挑戦してよい設計にするための仕様で、「低い点を記録に残さない」ことを意図しています。

---

## 2. ${TAB.eiken}（英検アプリ・1回ごと）

送信キー：${eikenKeys.map(k => '`' + k + '`').join('、')}
${(() => {
  const unused = eikenKeys.filter(k => !EIKEN_WRITTEN.has(k) && k !== 'site');
  return unused.length
    ? `\n> このうち ${unused.map(k => '`' + k + '`').join('、')} は**シートに記録されません**（旧版の名残で、受信側が読み捨てています）。`
    : '';
})()}

| 列（見出し） | 内容 |
|---|---|
${rows(EIKEN_HEAD.map(h => `| ${esc(h)} | ${({
  '日時': '受信した日時（サーバー側で付与）', '学年': '生徒が入力', '番号': '生徒が入力',
  '名前': '任意', '版': 'アプリの版（例：v0.25）', '級': '受けた級', 'モード': 'クイック／フル',
  '得点': '正解数', '満点': '問題数', '正答率': '％', '合否': '合格／不合格',
})[h] || ''} |`))}

---

## 3. ${TAB.unitLog}（模試の単元テスト・1回ごと）

送信キー：${unitKeys.map(k => '`' + k + '`').join('、')}
${(() => {
  const ctl = ['kind', 'exam', 'session'];   // 記録ではなく受付制御に使う
  const unused = unitKeys.filter(k => !UNIT_WRITTEN.has(k) && !ctl.includes(k) && k !== 'site');
  return unused.length
    ? `\n> このうち ${unused.map(k => '`' + k + '`').join('、')} は**シートに記録されません**。`
    : `\n> \`kind\`・\`exam\`・\`session\` は受付の照合に使い、\`exam\`・\`session\` は列としても残ります。`;
})()}

| 列（見出し） | 内容 |
|---|---|
${rows(UNIT_COLS.map(h => `| ${esc(h)} | ${({
  '提出日時': '受信した日時（サーバー側で付与）', 'セッション': '先生が受付を開けた回の識別子',
  '試験': '単元テストのID', '学年': '生徒が入力', '番号': '生徒が入力', '名前': '任意',
  '得点': '素点', '満点': '配点合計', '正答率(%)': '％', '版': 'アプリの版',
})[h] || ''} |`))}

同じ受付回・同じ生徒からの2回目の提出は受け付けません（1回だけ）。

---

## 4. 先生の操作で送るもの（生徒のデータではありません）

先生用コンソール \`/admin/\` からは、次の操作だけを送ります。いずれも合言葉（PIN）が必要です。

| action | 用途 |
|---|---|
| \`status\` | 単元テストの受付状態を見る |
| \`gate\` | 受付を開く／閉じる |
| \`policy\` / \`setpolicy\` | 学習方針コメントの取得・設定 |
| \`buildcorr\` | AI活用レベルと成績の相関タブを作る |

実証用セットの \`trial/\` には接続確認用の \`ping\` があります。これは**シートに一切書き込みません**。

---

## 5. 送らないもの（端末内に留まるもの）

| 記録 | 保存先キー | 送信 |
|---|---|---|
| 単語アプリのクリア状況 | \`tango_v1\` / \`tango_v2\` | しない（集計した数だけが上の「単語_〜」に入る） |
| 読解道場の修了・ベスト | \`dojo_v1\` | **しない**（第2弾で検討） |
| 挑戦モードの自己ベスト | \`challenge_v1\` | **しない**（練習専用のため） |
| 入試模試・模試の答案そのもの | — | しない（点数のみ） |
| 学年・番号・名前の入力値 | \`mado_year\` / \`mado_num\` / \`mado_name\` | 送信時のみ同送 |

そのほか、次のものは**一切扱いません**。

- 氏名の必須化（名前欄は任意。空のまま送信できます）
- メールアドレス・アカウント情報（アプリはログイン不要で、取得する手段を持ちません）
- 位置情報・端末識別子・生体・感情・カメラ・マイクの情報
- Cookie・広告タグ・アクセス解析（第三者サービスへの通信は一切ありません。
  アプリが通信する先は、上記の Google Apps Script のウェブアプリ **1本だけ** です）
- 答案の本文や自由記述（送るのは点数・回数・レベルの数値のみ）

なお、通信そのものは Google のインフラを経由するため、Google 側では一般的な
アクセスログ（接続元IP等）が発生し得ます。**スプレッドシートに記録されるのは
上記の表の列だけ**で、IPアドレスや端末情報は列として残りません。

記録は端末（ブラウザ）ごとに保存されるため、別の端末には持ち越されません。

---

## 6. 実証（試用版）での違い

| | 生徒用 | 実証用（\`?site=aso\`） |
|---|---|---|
| アプリ | 同一 | 同一 |
| 送る項目 | 上記のとおり | **同一**（\`site:"aso"\` が1つ増えるだけ） |
| 届き先 | 生徒用スプレッドシート | 実証用スプレッドシート（別ブック） |
| 画面表示 | 通常 | 上部に 🧪 の帯 |

実証モードで送信先が未設定のときは、生徒用に落ちるのではなく**送信そのものを止めます**。
受信側にも安全弁があり、書き込み先が未設定または生徒用ブックと同じIDのときは書き込みません。
`;

writeFileSync(resolve(ROOT, 'trial/DATA.md'), md);
console.log('✓ 生成: trial/DATA.md');
console.log(`  成績まとめ ${COLS.length}列 / 送信キー ${meSet.length}個 … 対応OK（未対応・欠落なし）`);
console.log(`  ${TAB.eiken} ${EIKEN_HEAD.length}列 / ${TAB.unitLog} ${UNIT_COLS.length}列`);
