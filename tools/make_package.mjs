// tools/make_package.mjs ─ 情報システム事業者向け「インターフェース一式」を out/ に作る
// 使い方: node tools/make_package.mjs            （既定：version 1.2・基準コミット bb1a4a0＝v1.1 切り出し時点）
//         node tools/make_package.mjs --version 1.3 --since <commit>
// 出力  : out/英語学習アプリ_インターフェース_v<版>/ と同名の .zip
// 中身  : 0〜4 の説明書（tools/package/*.md に生成値を埋める）／app/（画面一式＋tools）／server/／
//         patch/（基準コミット以降に変わったファイルだけ・同じ階層）
// ★送信先URL（script.google.com）とスプレッドシートIDは、すべて空にして出す。
//   学校で稼働中の送信先は一式に含めない（受け口に認証が無いため）。
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join, relative } from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const VERSION = opt('--version', '1.2');
const BASE = opt('--since', 'bb1a4a0');
const DATE = new Date().toISOString().slice(0, 10);
const NAME = `英語学習アプリ_インターフェース_v${VERSION}`;
const OUT = resolve(ROOT, 'out', NAME);
const r = (p) => readFileSync(resolve(ROOT, p), 'utf8');
const sh = (c) => execSync(c, { cwd: ROOT, encoding: 'utf8' });

/* ---------- 一式に入れるもの ---------- */
const APP_DIRS = ['words', 'mogi', 'eiken', 'me', 'jigaku', 'gojun', 'dojo', 'listening', 'challenge', 'admin', 'trial', 'mastery', 'assets'];
const APP_FILES = ['index.html', 'package.json', 'package-lock.json'];
const TOOLS = ['check_exams.mjs', 'check_gas_contract.mjs', 'make_trial_gas.mjs', 'make_data_spec.mjs', 'make_check_page.mjs',
               'make_paper.py', 'score_gas.gs', 'score_gas_trial.gs'];
const TOOL_DIRS = ['tests'];
const TOOL_DOCS = [['factory/inputs/authoring_rules.md', 'tools/authoring_rules.md']];
const SKIP = /(^|\/)(node_modules|__pycache__|shots)(\/|$)|\.pyc$|\.DS_Store$/;

/* ---------- 生きている送信先を消す ---------- */
const gas = r('tools/score_gas.gs');
const SHEET_ID = (gas.match(/var SPREADSHEET_ID = "([^"]+)"/) || [])[1] || '';
const SECRETS = [SHEET_ID].filter(Boolean);
function sanitize(text) {
  let t = text.replace(/https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec/g, '');
  for (const s of SECRETS) t = t.split(s).join('');
  return t;
}
const TEXT = /\.(html|js|mjs|gs|md|json|py|css|txt)$/;
function copyFile(src, dst) {
  mkdirSync(dirname(dst), { recursive: true });
  if (TEXT.test(src)) writeFileSync(dst, sanitize(readFileSync(src, 'utf8')));
  else cpSync(src, dst);
}
function copyTree(srcDir, dstDir) {
  for (const name of readdirSync(srcDir)) {
    const s = join(srcDir, name), rel = relative(ROOT, s);
    if (SKIP.test(rel)) continue;
    if (statSync(s).isDirectory()) copyTree(s, join(dstDir, name));
    else copyFile(s, join(dstDir, name));
  }
}

/* ---------- 生成値 ---------- */
const COLS = [...gas.matchAll(/\{key:"([a-z0-9_]+)",\s*head:"([^"]+)",\s*max:(true|false)\}/g)].map(m => ({ key: m[1], head: m[2], max: m[3] === 'true' }));
const GASVER = (gas.match(/var GAS_VERSION = "([^"]+)"/) || [])[1];
const UNIT_N = (gas.match(/var UNIT_EXAMS = \{([\s\S]*?)\};/)[1].match(/"c[23]u\d+":/g) || []).length;
const hdr = (fn) => { const m = gas.match(new RegExp(`function ${fn}\\(\\)\\{[\\s\\S]*?return \\[([\\s\\S]*?)\\];`)); return m ? [...m[1].matchAll(/"([^"]+)"/g)].map(x => x[1]) : []; };
const UNIT_HEADER = [...(gas.match(/var UNIT_HEADER = \[([^\]]*)\]/) || ['', ''])[1].matchAll(/"([^"]+)"/g)].map(x => x[1]);
const MASTERY_HEADER = hdr('masteryHeader'), BOARD_HEADER = hdr('masteryBoardHeader');
const metaSrc = r('mogi/exam.html').match(/const meta=\{([\s\S]*?)\n  \};/)[1];
const MOCK_N = [...metaSrc.matchAll(/^\s*([a-z0-9_]+):\s*\{([^\n]*)/gm)].filter(m => !/unit:\s*true/.test(m[2])).length;
const headerRow = (h) => `| ${h.map((x, i) => `${i + 1}. ${x}`).join(' | ')} |`;
const summaryTable = ['| # | 見出し | キー | 方式 |', '|---|---|---|---|',
  ...COLS.map((c, i) => `| ${i + 1} | ${c.head} | \`${c.key}\` | ${c.key === '_ts' ? '受信時に付与' : /^mt/.test(c.key) ? '受け口が計算（🏅で作りなおし）' : c.max ? '最大値を保つ' : '最新で上書き'} |`)].join('\n');

/* ---------- 差分（基準コミット以降） ---------- */
const WATCH = [...APP_DIRS, ...APP_FILES, ...TOOLS.map(t => 'tools/' + t), ...TOOL_DIRS.map(d => 'tools/' + d), 'factory/inputs/authoring_rules.md'];
const HEAD = sh('git rev-parse --short HEAD').trim();
const diff = sh(`git diff --name-status ${BASE}..HEAD -- ${WATCH.map(w => `"${w}"`).join(' ')}`).trim().split('\n').filter(Boolean)
  .map(l => { const [st, ...p] = l.split('\t'); return { st: st[0], path: p[p.length - 1] }; });
const toPkg = (p) => p === 'factory/inputs/authoring_rules.md' ? 'app/tools/authoring_rules.md' : p.startsWith('tools/') ? 'app/' + p : 'app/' + p;

/* ---------- 書き出し ---------- */
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const d of APP_DIRS) copyTree(resolve(ROOT, d), join(OUT, 'app', d));
for (const f of APP_FILES) if (existsSync(resolve(ROOT, f))) copyFile(resolve(ROOT, f), join(OUT, 'app', f));
for (const t of TOOLS) copyFile(resolve(ROOT, 'tools', t), join(OUT, 'app', 'tools', t));
for (const d of TOOL_DIRS) copyTree(resolve(ROOT, 'tools', d), join(OUT, 'app', 'tools', d));
for (const [src, dst] of TOOL_DOCS) copyFile(resolve(ROOT, src), join(OUT, 'app', dst));
copyFile(resolve(ROOT, 'tools/score_gas.gs'), join(OUT, 'server', 'score_gas.gs'));
copyFile(resolve(ROOT, 'tools/score_gas_trial.gs'), join(OUT, 'server', 'score_gas_trial.gs'));
// patch/：追加・変更ぶんだけ
for (const d of diff) {
  if (d.st === 'D') continue;
  const src = resolve(ROOT, d.path); if (!existsSync(src)) continue;
  copyFile(src, join(OUT, 'patch', toPkg(d.path)));
  if (d.path === 'tools/score_gas.gs') copyFile(src, join(OUT, 'patch', 'server', 'score_gas.gs'));
  if (d.path === 'tools/score_gas_trial.gs') copyFile(src, join(OUT, 'patch', 'server', 'score_gas_trial.gs'));
}
const label = { A: '追加', M: '変更', D: '削除', R: '移動' };
const patchList = ['| 区分 | ファイル（一式での位置） |', '|---|---|',
  ...diff.sort((a, b) => toPkg(a.path).localeCompare(toPkg(b.path))).map(d => `| ${label[d.st] || d.st} | \`${toPkg(d.path)}\` |`)].join('\n');

// 説明書：テンプレートに生成値を埋める
const fill = (s) => s.replace(/<<VERSION>>/g, VERSION).replace(/<<DATE>>/g, DATE).replace(/<<GASVER>>/g, GASVER)
  .replace(/<<SUMMARY_N>>/g, String(COLS.length)).replace(/<<SUMMARY_MAX_N>>/g, String(COLS.filter(c => c.max).length))
  .replace(/<<UNIT_N>>/g, String(UNIT_N)).replace(/<<MOCK_N>>/g, String(MOCK_N))
  .replace(/<<SUMMARY_TABLE>>/g, summaryTable).replace(/<<UNIT_HEADER>>/g, headerRow(UNIT_HEADER))
  .replace(/<<MASTERY_HEADER>>/g, headerRow(MASTERY_HEADER)).replace(/<<BOARD_HEADER>>/g, headerRow(BOARD_HEADER))
  .replace(/<<BASE>>/g, BASE).replace(/<<HEAD>>/g, HEAD).replace(/<<PATCH_LIST>>/g, patchList);
for (const f of readdirSync(resolve(ROOT, 'tools/package'))) {
  const out = fill(sanitize(r('tools/package/' + f)));
  const left = out.match(/<<[A-Z_]+>>/g);
  if (left) { console.error('✗ 未置換のプレースホルダ:', f, left.join(' ')); process.exit(1); }
  writeFileSync(join(OUT, f), out);
}

/* ---------- 検算：生きている送信先が残っていないか ---------- */
let leaks = 0;
(function walk(dir) { for (const n of readdirSync(dir)) { const p = join(dir, n);
  if (statSync(p).isDirectory()) walk(p);
  else if (TEXT.test(p)) { const t = readFileSync(p, 'utf8');
    if (/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]{20,}/.test(t) || SECRETS.some(s => t.includes(s))) { leaks++; console.error('✗ 送信先が残っています:', relative(OUT, p)); } } } })(OUT);
if (leaks) process.exit(1);

/* ---------- zip ---------- */
const zip = resolve(ROOT, 'out', NAME + '.zip');
rmSync(zip, { force: true });
execSync(`cd "${resolve(ROOT, 'out')}" && zip -qr "${NAME}.zip" "${NAME}"`);
console.log(`✓ ${relative(ROOT, OUT)}（app ${APP_DIRS.length}ディレクトリ・patch ${diff.filter(d => d.st !== 'D').length}ファイル・削除 ${diff.filter(d => d.st === 'D').length}）`);
console.log(`✓ ${relative(ROOT, zip)}  ${(statSync(zip).size / 1024 / 1024).toFixed(1)} MB`);
