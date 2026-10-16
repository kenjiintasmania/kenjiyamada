// tools/lib/eiken_bank.mjs ─ 英検アプリの問題データを Node から読む（検査・集計用）
//   index.html の中の BANK/MORE…/PASSAGES/FULL_PLAN と、data/bank2.js の増量ぶんを、画面と同じ順で連結して返す。
//   画面と同じコードを動かす（写しを持たない）ので、HTML 側の merge を変えたらここも同じ結果になる。
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import vm from 'node:vm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

export function loadEikenBank() {
  const html = readFileSync(resolve(ROOT, 'eiken/index.html'), 'utf8');
  const start = html.indexOf('var APP_VER');
  const end = html.indexOf('function recommendGenre');
  if (start < 0 || end < 0) throw new Error('eiken/index.html のデータ部分が見つかりません（var APP_VER 〜 function recommendGenre）');
  const win = {};
  const b2 = resolve(ROOT, 'eiken/data/bank2.js');
  if (existsSync(b2)) new Function('window', readFileSync(b2, 'utf8'))(win);
  const ctx = { console, JSON, Math, Date, Object, Array, String, Number, RegExp,
    window: win, document: {}, localStorage: { getItem() { return null; }, setItem() {} } };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  const body = html.slice(start, end) +
    '\n;globalThis.__out={BANK:BANK, PASSAGES:(typeof PASSAGES!=="undefined"?PASSAGES:{}), GENRES:GENRES, GRADES:GRADES, ' +
    'FULL_PLAN:(typeof FULL_PLAN!=="undefined"?FULL_PLAN:{}), QUICK_N:(typeof QUICK_N!=="undefined"?QUICK_N:8)};';
  vm.runInContext('(function(){' + body + '\n})();', ctx);
  return ctx.__out;
}

export function countBank(BANK) {
  const out = {}; let total = 0;
  for (const g of Object.keys(BANK)) {
    out[g] = {}; for (const ge of Object.keys(BANK[g])) { out[g][ge] = BANK[g][ge].length; total += BANK[g][ge].length; }
  }
  return { byGrade: out, total };
}
