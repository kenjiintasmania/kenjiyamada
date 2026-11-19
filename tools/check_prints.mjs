// tools/check_prints.mjs ─ 印刷プリント（mogi/print/*.html）の「答えがそのまま見えていないか」検査
// 使い方: node tools/check_prints.mjs          … 検査だけ（npm run check に入っている）
//         node tools/check_prints.mjs --fix    … 並べかえの語群を並べなおして書きもどす
// なぜ: 2026-11-16 先生指摘「並べ替え作文がランダム化されてなくて、最初から正答順だった」。
//       プリントの並べかえは <span class="br">a / b / c / d</span>、答えは解答ページ「オモテ 2」の <ol> に同じ順で並ぶ。
// 見るもの:
//   ① 語群が答えの順（3語以上つづけて答えの順）になっていない
//   ② 語群の語が、答えの文の中にぜんぶある（語群と解答の食いちがい）
//   ③ 生徒用ページ（オモテ・ウラ）に、解答ページの英文がそのまま載っていない
//   ④ 作り手向けの注記（先生用・配らない・ねらい… など）が紙に出ていない。解答ページも生徒に配る。
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = resolve(ROOT, 'mogi/print');
const FIX = process.argv.includes('--fix');
const strip = s => String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const norm = s => strip(s).toLowerCase().replace(/[.,!?;:"“”]/g,'').replace(/[’]/g,"'").replace(/\s+/g,' ').trim();
const perms = n => { const r=[]; const go=(a,rest)=>{ if(!rest.length){ r.push(a); return; } rest.forEach((x,i)=>go(a.concat(x),rest.filter((_,j)=>j!==i))); }; go([],[...Array(n).keys()]); return r; };
let fails = 0; const fail = (f,m) => { fails++; console.log(`  ✗ [${f}] ${m}`); };

for (const f of readdirSync(DIR).filter(x => /\.html$/.test(x)).sort()) {
  const path = resolve(DIR, f); let src = readFileSync(path, 'utf8');
  const keyAt = src.indexOf('class="page keyp"');
  if (keyAt < 0) { fail(f, '解答ページ（class="page keyp"）が見つからない'); continue; }
  const student = src.slice(0, keyAt), key = src.slice(keyAt);
  // 解答ページ「オモテ 2」の英文
  const k2 = (key.match(/<h2>オモテ 2[\s\S]*?<ol[^>]*>([\s\S]*?)<\/ol>/) || [])[1] || '';
  const answers = [...k2.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => norm(m[1]));
  const brs = [...student.matchAll(/<span class="br">([^<]*)<\/span>/g)];
  if (brs.length !== answers.length) { fail(f, `並べかえの数（${brs.length}）と解答の数（${answers.length}）が合わない`); continue; }
  let fixed = 0;
  brs.forEach((m, i) => {
    const toks = m[1].split('/').map(x => x.trim()).filter(Boolean), ans = answers[i];
    const ps = toks.map(t => ans.indexOf(norm(t)));
    if (ps.some(p => p < 0)) { fail(f, `並べかえ(${i+1}) 語群の語が解答の文に無い：［ ${toks.join(' / ')} ］ ↔ ${ans}`); return; }
    const sorted = [...ps].sort((a,b)=>a-b), rank = ps.map(p => sorted.indexOf(p));
    let run = 1, maxRun = 1; for (let j=1;j<rank.length;j++){ run = rank[j]===rank[j-1]+1 ? run+1 : 1; maxRun = Math.max(maxRun, run); }
    if (maxRun < Math.min(3, toks.length)) return;
    if (!FIX) { fail(f, `並べかえ(${i+1}) 語群が答えの順のまま：［ ${toks.join(' / ')} ］`); return; }
    const inOrder = toks.slice().sort((a,b)=>ans.indexOf(norm(a))-ans.indexOf(norm(b)));
    const good = perms(inOrder.length).filter(a => a[0]!==0 && a.every((v,j)=>j===0||v!==a[j-1]+1));
    let h = 0; const keyS = inOrder.join('|'); for (let j=0;j<keyS.length;j++) h = (h*31+keyS.charCodeAt(j))>>>0;
    const neu = good[h % good.length].map(j => inOrder[j]).join(' / ');
    const old = `<span class="br">${m[1]}</span>`;
    if (src.split(old).length-1 !== 1) { fail(f, `並べかえ(${i+1}) を自動で直せない（同じ語群が複数ある）`); return; }
    src = src.replace(old, `<span class="br">${neu}</span>`); fixed++;
    console.log(`  → ${f} (${i+1}) ${toks.join(' / ')}  ⇒  ${neu}`);
  });
  if (fixed) writeFileSync(path, src);
  // ④ 作り手向けの注記を紙に出さない（2026-11-19 先生指示「メタコメント削除。解答も生徒に配ってる」）
  { const vis = strip(src.replace(/<style[\s\S]*?<\/style>/g,'').replace(/<!--[\s\S]*?-->/g,''));
    const m = vis.match(/先生用|配らない|ねらい：|マイナーチェンジ|答えそのものは載せない/);
    if (m) fail(f, `作り手向けの注記が紙に出ている：「${m[0]}」（解答ページも生徒に配る）`); }
  // ③ 解答ページの英文（4語以上）が生徒用ページにそのまま載っていない
  const stu = norm(student);
  [...key.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => norm(m[1]).replace(/\[[^\]]*\]/g,'').trim())
    .filter(a => a.split(' ').length >= 4)
    .forEach(a => { if (stu.includes(a)) fail(f, `解答の英文が生徒用ページにそのまま載っている：${a}`); });
  if (!fails) console.log(`  ✓ ${f}  並べかえ ${brs.length}問：語群は答えの順でない・解答の英文は生徒用ページに無い`);
}
console.log(fails ? `\n✗ プリントに ${fails} 件の問題` : '\n✓ プリントは答えが見えていません');
process.exit(fails ? 1 : 0);
