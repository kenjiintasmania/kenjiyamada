#!/usr/bin/env node
// パンタクル原稿（gamebook/manuscript/pantacle/genko/*.md）の構造解析。
// 見出し（番号・漢数字・【単語】・■・A〜Z・記号）とジャンプ参照を抽出し、
// 解決可否・空パラグラフ・メモ行を JSON とテキストで報告する。
// 使い方: node gamebook/tools/pantacle/analyze.mjs [--json 出力先.json]

import fs from 'node:fs';
import path from 'node:path';

const GENKO = 'gamebook/manuscript/pantacle/genko';

// EPUB に収録する章（05x=獅子宮旧版・00系=設定/メモ は解析のみで build 対象外）
export const CHAPTERS = [
  { file: '20-macro-machi-1.md', id: 'macro1', name: 'マクロの街１', inBook: true },
  { file: '21-macro-machi-2.md', id: 'macro2', name: 'マクロの街２', inBook: true },
  { file: '02-kingyukyu.md', id: 'taurus', name: '金牛宮', inBook: true },
  { file: '05-shishikyu.md', id: 'leo', name: '獅子宮', inBook: true },
  { file: '08-tenkatsukyu.md', id: 'scorpio', name: '天蝎宮', inBook: true },
  { file: '11-hoheikyu.md', id: 'aquarius', name: '宝瓶宮', inBook: true },
  { file: '01-hakuyokyu.md', id: 'aries', name: '白羊宮', inBook: true },
  { file: '04-kyokaikyu.md', id: 'cancer', name: '巨蟹宮', inBook: true },
  { file: '07-tenbinkyu.md', id: 'libra', name: '天秤宮', inBook: true },
  { file: '03-sojikyu.md', id: 'gemini', name: '双児宮', inBook: true },
  { file: '06-shojokyu.md', id: 'virgo', name: '処女宮', inBook: true },
  { file: '09-jinbakyu.md', id: 'sagittarius', name: '人馬宮', inBook: true },
  { file: '12-sogyokyu.md', id: 'pisces', name: '双魚宮', inBook: true },
  { file: '30-shuban.md', id: 'finale', name: 'パンタクル終盤', inBook: true },
  { file: '05x-shishikyu-0108.md', id: 'leo0108', name: '獅子宮0108（旧版）', inBook: false },
  { file: '00-settei.md', id: 'settei', name: 'パンタクル設定', inBook: false },
  { file: '00-kako-memo.md', id: 'kakomemo', name: 'パンタクル過去メモ', inBook: false },
];

const Z2H = (s) => s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
const KANJI = { '〇': '0', '一': '1', '二': '2', '三': '3', '四': '4', '五': '5', '六': '6', '七': '7', '八': '8', '九': '9' };
const kanji2num = (s) => [...s].map((c) => KANJI[c] ?? '').join('');

// 数字（半角・全角・漢数字位取り・混在）→ 半角文字列
export function normNum(raw) {
  const t = [...raw].map((c) => {
    if (/[0-9]/.test(c)) return c;
    if (/[０-９]/.test(c)) return Z2H(c);
    if (c in KANJI) return KANJI[c];
    return '';
  }).join('');
  return t;
}

const NUMCHAR = '0-9０-９〇一二三四五六七八九';
const numRe = new RegExp(`[${NUMCHAR}]{3,5}`, 'g');

function parseChapter(ch) {
  const text = fs.readFileSync(path.join(GENKO, ch.file), 'utf8');
  const lines = text.split('\n');
  const nodes = [];       // {kind, key, label, line, bodyLines, refs:[]}
  const memoLines = [];
  let cur = null;

  const pushNode = (kind, key, label, i) => {
    cur = { kind, key, label, line: i + 1, bodyLines: [], refs: [] };
    nodes.push(cur);
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();

    // --- 見出し判定 ---
    // 番号見出し: 行頭（任意で ・ ）＋3〜5桁数字（＋ーB）＋（注記）＋★◆・装飾のみ
    const mNum = line.match(new RegExp(
      `^・?([${NUMCHAR}]{3,5})(ーＢ|ーB|-B|−B)?(（[^）]*）)?[　 ]*[★◆]?[　 ]*(?:[・…]*)?$`));
    if (mNum) {
      const n = normNum(mNum[1]);
      if (n.length >= 3) {
        pushNode('num', n + (mNum[2] ? 'b' : ''), line, i);
        continue;
      }
    }
    // 【単語】見出し: 行頭が【...】で、その後が空か装飾のみ
    const mNamed = line.match(/^【([^】]+)】[　 ]*(?:[・…]*)?$/);
    if (mNamed) {
      pushNode('named', mNamed[1], line, i);
      continue;
    }
    // ■見出し（マクロの街・終盤・金牛宮の小見出し）
    const mBox = line.match(/^■(.+)$/);
    if (mBox) {
      pushNode('box', mBox[1].trim(), line, i);
      continue;
    }
    // 単独アルファベット見出し（天蝎宮 A〜Z）
    const mAlpha = line.match(/^([A-ZＡ-Ｚ])[　 ]*$/);
    if (mAlpha && ch.id === 'scorpio') {
      const a = mAlpha[1].replace(/[Ａ-Ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
      pushNode('alpha', a, line, i);
      continue;
    }

    if (/※/.test(line)) memoLines.push({ line: i + 1, text: line.slice(0, 60), node: cur?.key });
    if (cur) cur.bodyLines.push(raw);

    // --- 参照抽出（本文行から） ---
    if (!cur) continue;
    // a) 数字＋(ーB)?＋（なら等を挟み）へ/ヘ: 「５０５へ進む」「３４５ならへ進む」「４２２ヘ」
    for (const m of line.matchAll(new RegExp(
      `([${NUMCHAR}]{3,5})(ーＢ|ーB|-B|−B)?(?:なら|に|まで)?[　 ]*[へヘ]`, 'g'))) {
      const n = normNum(m[1]);
      if (n.length >= 3) cur.refs.push({ target: n + (m[2] ? 'b' : ''), kind: 'num', line: i + 1, raw: line.slice(0, 50) });
    }
    // b) 括弧参照: 「北（一〇六五）」「西（一〇４７）」
    for (const m of line.matchAll(new RegExp(`[（(]([${NUMCHAR}]{3,5})[）)]`, 'g'))) {
      const n = normNum(m[1]);
      if (n.length >= 3) cur.refs.push({ target: n, kind: 'num', line: i + 1, raw: line.slice(0, 50) });
    }
    // c) 【数字】参照: 「気がつくと【５９０】にいた」
    for (const m of line.matchAll(new RegExp(`【([${NUMCHAR}]{3,5})】`, 'g'))) {
      const n = normNum(m[1]);
      if (n.length >= 3) cur.refs.push({ target: n, kind: 'num', line: i + 1, raw: line.slice(0, 50) });
    }
    // d) 【単語】参照（見出し行以外に現れたもの）
    for (const m of line.matchAll(/【([^】]+)】/g)) {
      const name = m[1];
      if (new RegExp(`^[${NUMCHAR}]{3,5}$`).test(name)) continue;
      cur.refs.push({ target: name, kind: 'named', line: i + 1, raw: line.slice(0, 50) });
    }
    // e) 行き先未記入: 「〜ならへ進む」「◆へ進む」
    if (/(?:なら|るなら)[　 ]*へ進|◆へ進|へ[　 ]*進[むめ]/.test(line)) {
      const hasNum = new RegExp(`[${NUMCHAR}]{3,5}`).test(line);
      if (!hasNum && /^[・・]/.test(line)) {
        cur.refs.push({ target: null, kind: 'missing', line: i + 1, raw: line.slice(0, 50) });
      }
    }
  }

  // 空ノード判定
  for (const n of nodes) {
    n.empty = n.bodyLines.every((l) => l.trim() === '' || /^[・…　 ]*$/.test(l.trim()));
    n.chars = n.bodyLines.join('').replace(/\s/g, '').length;
  }
  return { ...ch, nodes, memoLines };
}

const chapters = CHAPTERS.map(parseChapter);

// --- グローバル解決 ---
const numOwner = new Map();   // '501' -> chapterId（重複は配列）
const namedOwner = new Map(); // chapterId:name -> node
for (const ch of chapters) {
  if (!ch.inBook) continue;
  for (const n of ch.nodes) {
    if (n.kind === 'num') {
      if (!numOwner.has(n.key)) numOwner.set(n.key, []);
      numOwner.get(n.key).push(ch.id);
    } else {
      namedOwner.set(`${ch.id}:${n.key}`, true);
    }
  }
}

const report = [];
const unresolved = [];
for (const ch of chapters) {
  if (!ch.inBook) continue;
  const counts = { num: 0, named: 0, box: 0, alpha: 0 };
  const empties = [];
  for (const n of ch.nodes) {
    counts[n.kind]++;
    if (n.empty && n.kind === 'num') empties.push(n.key);
    for (const r of n.refs) {
      if (r.kind === 'num') {
        if (!numOwner.has(r.target)) unresolved.push({ ch: ch.id, from: n.key, ...r });
      } else if (r.kind === 'named') {
        if (!namedOwner.has(`${ch.id}:${r.target}`)) unresolved.push({ ch: ch.id, from: n.key, ...r });
      } else if (r.kind === 'missing') {
        unresolved.push({ ch: ch.id, from: n.key, ...r });
      }
    }
  }
  const dupNums = [...new Set(ch.nodes.filter((n) => n.kind === 'num').map((n) => n.key)
    .filter((k, i, a) => a.indexOf(k) !== i))];
  report.push({ ch: ch.id, name: ch.name, counts, empties, dupNums, memos: ch.memoLines.length });
}

// 番号の章間重複
const crossDup = [...numOwner.entries()].filter(([, v]) => new Set(v).size > 1);

console.log('=== 章別サマリ ===');
for (const r of report) {
  console.log(`${r.name} [${r.ch}]  番号:${r.counts.num} 名前:${r.counts.named} ■:${r.counts.box} A-Z:${r.counts.alpha}  空番号:${r.empties.length} 章内重複:${r.dupNums.join(',') || 'なし'} ※メモ:${r.memos}`);
  if (r.empties.length) console.log(`   空: ${r.empties.join(' ')}`);
}
console.log(`\n=== 章間で重複する番号 ===\n${crossDup.map(([k, v]) => `${k}: ${v.join(',')}`).join('\n') || 'なし'}`);
console.log(`\n=== 未解決参照（${unresolved.length}件） ===`);
for (const u of unresolved) {
  console.log(`[${u.ch}] ${u.from} (L${u.line}) → ${u.target ?? '(行き先なし)'}  | ${u.raw}`);
}

const jsonArg = process.argv.indexOf('--json');
if (jsonArg !== -1) {
  const out = process.argv[jsonArg + 1];
  fs.writeFileSync(out, JSON.stringify({ chapters, unresolved }, null, 1));
  console.log(`\nJSON: ${out}`);
}
