// tools/check_eiken.mjs ─ 英検アプリの問題データの検査（npm run check から呼ばれる）
//   ① 形（mc は4択・正解は ch[0]・a は 0／fill は a が文字列／ex と q がある／reading は p の本文が実在）
//   ② 重複（同じ級で 同じ英文＋設問、同じ vocab の答え、同じ fill の答え）
//   ③ 量（級×ジャンルごとに FULL_PLAN の3倍以上＝フル判定テスト3回分。先生指示 2026-10-16）
//   ④ 選択肢の重複・空（同じ語が2つ、空の選択肢）
import { loadEikenBank, countBank } from './lib/eiken_bank.mjs';

let fails = 0;
const fail = (m) => { fails++; console.log('  ✗ [eiken] ' + m); };
const pass = (m) => console.log('  ✓ eiken   ' + m);

const { BANK, PASSAGES, GENRES, FULL_PLAN } = loadEikenBank();
const norm = (s) => String(s || '').toLowerCase().replace(/\s+/g, ' ').trim();

let n = 0, bad = 0;
for (const g of Object.keys(BANK)) {
  const seenKey = new Set(), seenVocab = new Set(), seenFill = new Set();
  for (const ge of Object.keys(BANK[g])) {
    BANK[g][ge].forEach((q, i) => {
      n++;
      const where = `${g}/${ge}#${i + 1}`;
      if (!q.q || !q.ex) { fail(`${where} q か ex が空`); bad++; }
      if (q.t === 'mc') {
        if (!Array.isArray(q.ch) || q.ch.length !== 4) { fail(`${where} 選択肢が4つでない`); bad++; }
        else {
          if (q.a !== 0) { fail(`${where} a が 0 でない（正解は ch[0] に置く約束）`); bad++; }
          const cs = q.ch.map(norm);
          if (cs.some(c => !c)) { fail(`${where} 空の選択肢`); bad++; }
          if (new Set(cs).size !== 4) { fail(`${where} 同じ選択肢が2つ: ${q.ch.join(' / ')}`); bad++; }
        }
      } else if (q.t === 'fill') {
        if (typeof q.a !== 'string' || !q.a.trim()) { fail(`${where} fill の答えが空`); bad++; }
      } else { fail(`${where} 未知の形 t=${q.t}`); bad++; }
      if (ge === 'reading') { if (!q.p || !PASSAGES[q.p]) { fail(`${where} 本文 p=${q.p} が PASSAGES に無い`); bad++; } }
      else if (q.p) { fail(`${where} reading 以外に p がある`); bad++; }
      // 重複
      const key = norm(q.en) + '|' + norm(q.q);
      if (seenKey.has(key)) { fail(`${where} 同じ問題が2つ: ${(q.en || q.q).slice(0, 50)}`); bad++; } else seenKey.add(key);
      if (ge === 'vocab') {
        const ans = norm(q.t === 'mc' ? q.ch[0] : q.a);
        if (seenVocab.has(ans)) { fail(`${where} vocab の答え「${ans}」が同じ級に2回`); bad++; } else seenVocab.add(ans);
      }
      if (q.t === 'fill' && ge !== 'reading') {
        const k2 = norm(q.a) + '|' + norm(q.q);
        if (seenFill.has(k2)) { fail(`${where} 同じ fill が2回`); bad++; } else seenFill.add(k2);
      }
    });
  }
}
if (!bad) pass(`${n}問の形と重複：問題なし`);

// 本文：参照されない本文、段落が空
for (const pid of Object.keys(PASSAGES)) {
  const p = PASSAGES[pid];
  if (!p.title || !Array.isArray(p.paras) || !p.paras.length || p.paras.some(x => !String(x).trim())) fail(`本文 ${pid} の title か段落が空`);
  const used = Object.values(BANK).some(gr => (gr.reading || []).some(q => q.p === pid));
  if (!used) fail(`本文 ${pid} はどの問題からも使われていない`);
}

// 量：FULL_PLAN × 3
const want = 3, short = [];
const { byGrade, total } = countBank(BANK);
for (const g of Object.keys(FULL_PLAN)) {
  for (const ge of Object.keys(FULL_PLAN[g])) {
    const have = (byGrade[g] || {})[ge] || 0, need = FULL_PLAN[g][ge] * want;
    if (have < need) short.push(`${g}/${ge} ${have}/${need}`);
  }
  for (const ge of Object.keys(byGrade[g] || {})) if (FULL_PLAN[g][ge] == null) fail(`${g}/${ge} は FULL_PLAN に無い（フル判定テストに出ない）`);
}
if (short.length) fail(`フル判定テスト${want}回分に足りない: ${short.join(', ')}`);
else pass(`全${total}問。どの級・ジャンルもフル判定テスト${want}回分以上ある`);
const lines = Object.keys(byGrade).map(g => `${g}:${Object.values(byGrade[g]).reduce((a, b) => a + b, 0)}`);
console.log('  ⓘ eiken   ' + lines.join('  '));

console.log(fails ? `\n✗ 英検の問題データに ${fails} 件` : '\n✓ 英検の問題データは整っています');
process.exit(fails ? 1 : 0);
