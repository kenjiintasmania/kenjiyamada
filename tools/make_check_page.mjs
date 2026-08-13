// tools/make_check_page.mjs ─ AIS（麻生情報システム）の実地検証用チェックリストを生成する
// 使い方: node tools/make_check_page.mjs
// 目的  : 検証担当者が「全ページを漏れなく踏んで、何を見ればよいか」が分かる一覧を作る。
//         URLはすべて実証モード（?site=aso）付き＝記録は実証用スプレッドシートにだけ入る。
//         ページ一覧・模試IDはリポジトリの実体から拾うので、増減しても作り直せば追随する。
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const r = (p) => readFileSync(resolve(ROOT, p), 'utf8');
const SITE = 'https://kenjiintasmania.github.io/kenjiyamada';
const die = (m) => { console.error('✗ ' + m); process.exit(1); };

/* ---------- 模試ID（exam.html の meta から） ---------- */
const metaSrc = r('mogi/exam.html').match(/const meta=\{([\s\S]*?)\n  \};/);
if (!metaSrc) die('exam.html の meta を取得できません');
const EXAMS = [...metaSrc[1].matchAll(/^\s*([a-z0-9_]+):\s*\{([^\n]*)/gm)].map(m => {
  const title = (m[2].match(/title:\s*'([^']*)'/) || m[2].match(/title:\s*"([^"]*)"/) || [])[1] || m[1];
  return { id: m[1], unit: /unit:\s*true/.test(m[2]), title: title.replace(/<[^>]+>/g, '').trim() };
});
if (EXAMS.length !== 24) die(`模試の件数が想定外です (${EXAMS.length})`);

/* ---------- 収録数（実データから数える） ---------- */
const count = {};
{ const w = {}; new Function('window', r('words/data/words.js'))(w);
  count.words = w.WORDS.length; count.wBasic = w.WORD_META.basicCount; count.wExt = w.WORD_META.extendedCount; }
{ const w = {}; new Function('window', r('dojo/data/tech.js'))(w);
  const s1 = {}; new Function('window', r('dojo/data/drill_s1.js'))(s1);
  const s3 = {}; new Function('window', r('dojo/data/drill_s3.js'))(s3);
  count.tech = w.DOJO_TECHS.length; count.s1 = s1.DOJO_S1.items.length; count.s3 = s3.DOJO_S3.items.length; }
{ const w = {}; new Function('window', r('challenge/data/compose.js'))(w);
  const k = Object.keys(w).find(x => Array.isArray(w[x]));
  count.compose = k ? w[k].length : 0; }

/* ---------- ページ一覧 ---------- */
const P = (path, name, what, check) => ({ path, name, what, check });
const PAGES = [
  ['index.html', 'トップ', '6つの入口。ここから各アプリへ',
   '🧪の帯が出る／リンクが正しく開く'],
  ['words/index.html', `単語アプリ（全${count.words}語）`,
   `基本編${count.wBasic}語・拡張編${count.wExt}語・活用編600点。品詞や学年で選んで打ち込む`,
   '数問クリアして進捗％が増える／リロードしても残る'],
  ['mogi/index.html', '模擬テスト 一覧', '中2・中3の入口', '各回へのリンクが開く'],
  ['mogi/chu2.html', '模擬テスト 中2', '中2の回を選ぶ', '一覧が出る'],
  ['mogi/chu3.html', '模擬テスト 中3', '中3の回を選ぶ', '一覧が出る'],
  ['mogi/okayama.html', '入試模試 一覧（岡山県スタイル）', '全10パターンの入口', '10本ぶん並ぶ'],
  ['mogi/vocab_chu2.html', '習熟度単語テスト 中2', '答えの単語だけを確認するテスト', '採点される'],
  ['mogi/vocab_chu3_2.html', '習熟度単語テスト 中3第2回', '同上', '採点される'],
  ['mogi/vocab_chu3_3.html', '習熟度単語テスト 中3第3回', '同上', '採点される'],
  ['eiken/index.html', '英検アプリ（7〜2級・全413問）',
   '級を選ぶ→ジャンル訓練→判定テスト。結果を送信できる',
   '判定テストを1回終えて「先生に送信」→ 実証シートの「英検テスト履歴」に1行増える'],
  ['challenge/index.html', `挑戦モード（並べ替え英作文${count.compose}問ほか）`,
   '単語50問・並べ替え英作文・英検二次プロンプト。記録は残さない練習専用',
   '自動採点される／送信は発生しない'],
  ['dojo/index.html', `読解道場（テク${count.tech}枚・S1 ${count.s1}問・S3 ${count.s3}問）`,
   'テクカード→種目ドリル→県模試。全自動採点',
   '誤答すると根拠とワナが出る／送信は発生しない'],
  ['me/index.html', 'マイページ（送信の出口）',
   '3アプリの記録を集約し、先生のスプレッドシートへ送信する唯一の画面',
   '学年・番号を入れる→自動送信→実証シートの「成績まとめ」に1行増える'],
  ['admin/index.html', '先生用コンソール',
   '単元テストの受付開閉・学習方針の設定（PIN必要）',
   '版表示が trial- で始まる＝実証シート側を見ている'],
  ['trial/index.html', '実証用セットの入口',
   '状態表示・接続テスト・通常モードへの復帰',
   '「設定ずみ」と表示／接続テストが ✓'],
].map(a => P(...a));

const withSite = (p) => `${SITE}/${p}${p.includes('?') ? '&' : '?'}site=aso`;

/* ---------- 出力（HTML：クリックして踏める・チェック状態は端末に保存） ---------- */
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const row = (id, url, name, what, check) =>
  `<tr><td><input type="checkbox" data-k="${esc(id)}"></td>` +
  `<td><a href="${esc(url)}" target="_blank" rel="noopener">${esc(name)}</a>` +
  `<div class="u">${esc(url)}</div></td>` +
  `<td>${esc(what)}</td><td>${esc(check)}</td></tr>`;

const examRows = EXAMS.map(e => {
  const url = withSite(`mogi/exam.html?id=${e.id}`);
  const what = e.unit ? '単元テスト（先生が受付を開けた時だけ解答・提出できる）' : '100点満点・1タップ自動採点';
  const check = e.unit ? '受付前はロック表示／提出すると「単元テスト記録」に1行増える'
                       : '「採点する」で点数が出る／送信は発生しない';
  return row('exam_' + e.id, url, `${e.title}（id=${e.id}）`, what, check);
}).join('\n');

const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>実地検証チェックリスト｜英語学習アプリ</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='88'>📋</text></svg>">
<!-- tools/make_check_page.mjs が生成。手で編集せず、スクリプトを直して作り直すこと。 -->
<style>
  :root{--ink:#1f2430;--gray:#5a6473;--line:#e6e0d4;--dark:#2d2438;--purple:#7a4fd0;--ok:#2c7a52}
  *{box-sizing:border-box}
  body{margin:0;background:#fbf9f4;color:var(--ink);line-height:1.6;
       font-family:'游ゴシック','Yu Gothic',sans-serif;padding:0 0 60px}
  .hero{background:var(--dark);color:#fff;padding:24px 0 20px}
  .wrap{max-width:1080px;margin:0 auto;padding:0 16px}
  .hero h1{margin:0;font-size:23px}
  .hero p{margin:6px 0 0;font-size:13px;color:#d8d2c4}
  .tag{display:inline-block;font-size:11.5px;font-weight:bold;background:#b45309;color:#fff;
       border-radius:999px;padding:3px 12px;margin-bottom:8px}
  .card{background:#fff;border:2px solid var(--line);border-radius:14px;padding:14px 16px;margin:16px 0}
  h2{font-size:16px;margin:0 0 8px}
  table{border-collapse:collapse;width:100%;font-size:13px}
  th,td{border-bottom:1px solid var(--line);padding:7px 8px;text-align:left;vertical-align:top}
  th{background:#f4f1ea;font-size:12.5px;white-space:nowrap}
  td:first-child{width:34px;text-align:center}
  td a{color:var(--purple);font-weight:bold;text-decoration:none}
  td a:hover{text-decoration:underline}
  .u{font-size:10.5px;color:#9aa3b2;word-break:break-all;margin-top:2px}
  input[type=checkbox]{width:17px;height:17px;cursor:pointer}
  tr.done{background:#f2faf5}
  .note{font-size:12.5px;color:var(--gray)}
  ol{padding-left:20px;font-size:13.5px} ol li{margin:4px 0}
  .prog{font-weight:bold;color:var(--ok)}
  code{background:#f1eee7;border-radius:4px;padding:1px 6px;font-size:12px}
  footer{text-align:center;color:#9aa3b2;font-size:12px;margin-top:24px}
</style>
</head>
<body>
<div class="hero"><div class="wrap">
  <span class="tag">実地検証用</span>
  <h1>英語学習アプリ ― 実地検証チェックリスト</h1>
  <p>すべてのURLに <code style="background:#4a4058;color:#fff">?site=aso</code> が付いています。ここから開く限り、記録は<b>実証用スプレッドシート</b>にだけ入り、生徒用には入りません。</p>
</div></div>

<div class="wrap">

  <div class="card">
    <h2>はじめに（検証担当の方へ）</h2>
    <ol>
      <li>下のリンクは<b>すべて新しいタブ</b>で開きます。画面上部に 🧪 の帯が出ていれば実証モードです</li>
      <li>チェック欄はこの端末に保存されます（複数人で分担するときは各自の端末で）</li>
      <li>記録が実際に送られるのは<b>マイページ・英検の結果送信・単元テストの提出</b>の3つだけです</li>
      <li>送信される項目の一覧は <a href="https://github.com/kenjiintasmania/kenjiyamada/blob/master/trial/DATA.md" target="_blank" rel="noopener">DATA.md</a> にあります</li>
    </ol>
    <p class="note">進捗：<span class="prog" id="prog">0 / 0</span>　<button id="reset" style="font:inherit;font-size:12px;padding:3px 10px;border-radius:8px;border:1px solid #d8d2c4;background:#fff;cursor:pointer">チェックを消す</button></p>
  </div>

  <div class="card">
    <h2>① 画面（アプリ本体）</h2>
    <table><thead><tr><th>済</th><th>ページ / URL</th><th>何をする画面か</th><th>確認すること</th></tr></thead>
    <tbody>
${PAGES.map(p => row(p.path, withSite(p.path), p.name, p.what, p.check)).join('\n')}
    </tbody></table>
  </div>

  <div class="card">
    <h2>② 模擬テスト 各回（全${EXAMS.length}本）</h2>
    <p class="note">うち末尾4本（id が c2u1／c2u2／c3u1／c3u2）は<b>単元テスト</b>で、先生用コンソールで受付を開けている間だけ解答・提出できます。</p>
    <table><thead><tr><th>済</th><th>回 / URL</th><th>形式</th><th>確認すること</th></tr></thead>
    <tbody>
${examRows}
    </tbody></table>
  </div>

  <div class="card">
    <h2>③ 届き先の確認（記録が入ったか）</h2>
    <ol>
      <li><b>実証用スプレッドシート</b>に「成績まとめ」「英検テスト履歴」「単元テスト記録」タブができ、行が増えること</li>
      <li><b>生徒用スプレッドシート</b>に行が<b>増えていない</b>こと ← 分離の検証</li>
      <li>マイページで送信した内容と、シートの列の値が一致すること（対応表は DATA.md）</li>
    </ol>
  </div>

  <div class="card">
    <h2>④ 環境・前提</h2>
    <table>
      <tr><th>公開方式</th><td>静的HTML（GitHub Pages）。サーバー側の処理なし・インストール不要・アカウント不要</td></tr>
      <tr><th>動作環境</th><td>Chrome / Edge / Safari の現行版。GIGA端末（Chromebook）はURLを開くだけ</td></tr>
      <tr><th>通信</th><td>記録送信時のみ。宛先は Google Apps Script のウェブアプリ1本。第三者サービスへの通信なし</td></tr>
      <tr><th>保存</th><td>学習状況は端末内（localStorage）。端末をまたいで共有されない</td></tr>
      <tr><th>収録数</th><td>単語${count.words}語（基本${count.wBasic}／拡張${count.wExt}）＋活用600点・模試${EXAMS.length}本（各100点）・英検413問・読解道場テク${count.tech}枚＋ドリル${count.s1 + count.s3}問・並べ替え英作文${count.compose}問</td></tr>
      <tr><th>実証モードの解除</th><td>画面上部の帯の「通常モードにもどす」。60日で自動失効</td></tr>
    </table>
  </div>

  <footer>英語学習アプリ ／ 実地検証チェックリスト（実証モード・記録は実証用シートにのみ届きます）</footer>
</div>

<script>
(function(){
  "use strict";
  var K="ais_check_v1", boxes=[].slice.call(document.querySelectorAll("input[type=checkbox]"));
  function load(){ try{ return JSON.parse(localStorage.getItem(K)||"{}"); }catch(e){ return {}; } }
  function save(s){ try{ localStorage.setItem(K, JSON.stringify(s)); }catch(e){} }
  function prog(){
    var n=boxes.filter(function(b){return b.checked;}).length;
    document.getElementById("prog").textContent = n+" / "+boxes.length;
  }
  var st=load();
  boxes.forEach(function(b){
    var k=b.getAttribute("data-k");
    b.checked=!!st[k]; b.closest("tr").classList.toggle("done", b.checked);
    b.addEventListener("change",function(){
      st[k]=b.checked; save(st);
      b.closest("tr").classList.toggle("done", b.checked); prog();
    });
  });
  prog();
  document.getElementById("reset").addEventListener("click",function(){
    save({}); boxes.forEach(function(b){ b.checked=false; b.closest("tr").classList.remove("done"); }); prog();
  });
})();
</script>
</body>
</html>
`;

writeFileSync(resolve(ROOT, 'trial/check.html'), html);
const total = PAGES.length + EXAMS.length;
console.log('✓ 生成: trial/check.html');
console.log(`  画面 ${PAGES.length} 件 ＋ 模試 ${EXAMS.length} 本 ＝ チェック項目 ${total} 件`);
console.log(`  収録数：単語${count.words}／道場テク${count.tech}・S1 ${count.s1}・S3 ${count.s3}／並べ替え${count.compose}`);
