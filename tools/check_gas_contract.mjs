// tools/check_gas_contract.mjs ─ アプリと GAS の「約束ごと」が食いちがっていないか見る
// 使い方: node tools/check_gas_contract.mjs      （npm run check から呼ばれる）
//
// なぜ要るか:
//   GAS は手で貼って再デプロイする。アプリ側だけ直して GAS を直し忘れても、
//   送信も採点も成功したように見えて、列が空のまま／単元テストが開かないまま になる。
//   画面にもログにも出ないので、気づくのは何週間もあとの「あれ、点が入ってない」になる。
//   ここで、両者がそろっていないと落とす。
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const r = (p) => readFileSync(resolve(ROOT, p), 'utf8');

let fails = 0;
const fail = (m) => { fails++; console.log('  ✗ [gas] ' + m); };
const pass = (m) => console.log('  ✓ gas     ' + m);

const gas  = r('tools/score_gas.gs');
const me   = r('me/index.html');
const exam = r('mogi/exam.html');

/* ---------- ① 版番号：アプリ側の下限が、いまの GAS を超えていないか ---------- */
const ver = Number((gas.match(/GAS_VERSION\s*=\s*"jigaku-(\d+)"/) || [])[1]);
if (!ver) fail('score_gas.gs の GAS_VERSION を読めません');

// 自学の各レーンは「この版以上でないと送らない」下限を持つ。GAS より先に行くと送信が止まる。
const FLOORS = ['jigaku/index.html', 'jigaku/bunpo.js', 'gojun/gojun.js', 'jigaku/honbun.js'];
FLOORS.forEach(f => {
  const m = r(f).match(/Number\(vn\)\s*<\s*(\d+)/);
  if (!m) return fail(`${f} に版の下限（Number(vn) < N）が見あたりません`);
  if (Number(m[1]) > ver) fail(`${f} の下限 ${m[1]} が GAS_VERSION(${ver}) より先に行っています`);
});
const adminNeed = Number((r('admin/index.html').match(/ADMIN_NEED\s*=\s*(\d+)/) || [])[1]);
if (adminNeed !== ver) fail(`/admin の ADMIN_NEED(${adminNeed}) と GAS_VERSION(${ver}) がちがいます`);
if (!fails) pass(`版 jigaku-${ver}／各レーンの下限と /admin の想定がそろっている`);

/* ---------- ② 成績まとめ：GAS の列 ↔ マイページが送るキー ---------- */
const cols = [...gas.matchAll(/\{key:"([a-z0-9_]+)",\s*head:"([^"]+)"/g)].map(m => ({ key: m[1], head: m[2] }));
if (cols.length < 40) fail(`SUMMARY_COLS を読めません（${cols.length}列）`);
const bp = me.indexOf('function buildPayload');
const payload = me.slice(bp, me.indexOf('\n  }', bp));
const sent = new Set([...payload.matchAll(/([a-z0-9_]+)\s*:/g)].map(m => m[1]));
const BUILT_BY_GAS = new Set(['_ts']);                // 更新日時は handleSummary が入れる（送らない）
const orphan = cols.map(c => c.key).filter(k => !sent.has(k) && !BUILT_BY_GAS.has(k));
if (orphan.length) fail(`GAS に列があるのにマイページが送っていません: ${orphan.join(', ')}`);
else pass(`成績まとめ ${cols.length}列すべてに送信キーがある`);

/* ---------- ③ 単元テスト：画面の unit:true ↔ GAS の UNIT_EXAMS ---------- */
const metaBlk = (exam.match(/const meta=\{([\s\S]*?)\n  \};/) || [])[1] || '';
const entries = [...metaBlk.matchAll(/^\s*([a-z0-9_]+):\s*\{([^\n]*)/gm)];
const units = entries.filter(m => /unit:\s*true/.test(m[2])).map(m => m[1]);
const gasUnits = [...gas.matchAll(/"(c[23]u\d)":/g)].map(m => m[1]);
const noGate = units.filter(u => !gasUnits.includes(u));
const ghost  = gasUnits.filter(u => !units.includes(u));
if (noGate.length) fail(`GAS の UNIT_EXAMS に無いので受付を開けません: ${noGate.join(', ')}`);
if (ghost.length)  fail(`画面に無いのに GAS にだけある単元テスト: ${ghost.join(', ')}`);
if (!noGate.length && !ghost.length) pass(`単元テスト ${units.length}本が画面と GAS でそろっている`);

/* ---------- ④ 模試：画面 ↔ マイページの集計 ↔ GAS の列 ---------- */
const mocks = entries.filter(m => !/unit:\s*true/.test(m[2])).map(m => m[1]);
const MOGI = [...me.matchAll(/\["([a-z0-9_]+)","[^"]*"\]/g)].map(m => m[1]);
const notCounted = mocks.filter(id => !MOGI.includes(id));
if (notCounted.length) fail(`マイページの集計に入っていない模試: ${notCounted.join(', ')}`);
const mCols = cols.filter(c => /^m_/.test(c.key) && !['m_best', 'm_done'].includes(c.key));
if (mCols.length !== mocks.length)
  fail(`模試の列数(${mCols.length})と模試の本数(${mocks.length})が合いません`);
if (!notCounted.length && mCols.length === mocks.length)
  pass(`模試 ${mocks.length}本が 画面・マイページ・GAS の3か所そろっている`);

/* ---------- ⑤ 送信先URL：生徒用と実証用が取りちがえられていないか ---------- */
const url = (t) => [...String(t).matchAll(/AKfycb[A-Za-z0-9_-]+/g)].map(m => m[0]);
const TRIAL = url(r('assets/site.js'));
const LIVE  = url(r('me/index.html'))[0];
/* 事業者へお渡しする一式では、稼働中のURLを伏せてある（make_handoff の scrub）。
   その状態でこの節を回すと「URLが無い」で必ず落ちるので、伏せてあるときは飛ばす。 */
const REDACTED = !LIVE && !TRIAL.length;
if (REDACTED) console.log('  ⓘ gas     送信先URLは伏せられているため、この節は飛ばしました');
else if (!LIVE) fail('me/index.html に生徒用の送信先がありません');
if (!REDACTED) ['mogi/exam.html', 'jigaku/index.html', 'jigaku/bunpo.js', 'jigaku/honbun.js',
 'gojun/gojun.js', 'admin/index.html'].forEach(f => {
  const u = url(r(f));
  if (!u.length) return;
  if (u.some(x => x !== LIVE)) fail(`${f} が マイページと違う送信先を持っています: ${u.join(', ')}`);
  if (u.some(x => TRIAL.includes(x))) fail(`${f} に実証用URLが混ざっています`);
});
// 英検だけは昔から別デプロイ。実証用が混ざっていないことと、1本だけであることを見る。
const eiken = REDACTED ? [] : url(r('eiken/index.html'));
if (!REDACTED && eiken.length !== 1) fail(`eiken/index.html の送信先が1本ではありません（${eiken.length}本）`);
if (eiken.some(x => TRIAL.includes(x))) fail('eiken/index.html に実証用URLが混ざっています');
if (!fails && !REDACTED) {
  pass('送信先URL：生徒用と実証用が分かれている');
  if (eiken[0] !== LIVE)
    console.log('  ⓘ gas     英検だけ別デプロイ（…' + eiken[0].slice(-6) + '）。/admin の版表示は ' +
                '…' + LIVE.slice(-6) + ' のぶんなので、score_gas.gs を貼ったら' +
                '〔デプロイを管理〕で両方に新バージョンを当てること。');
}

console.log(fails ? `\n✗ GASとの食いちがい ${fails} 件` : '\n✓ アプリと GAS の約束ごとは一致しています');
process.exit(fails ? 1 : 0);
