#!/usr/bin/env node
// ゲームブック EPUB ソースの品質ゲート。
// 使い方: node gamebook/tools/check_links.mjs <srcDir>
// 例:     node gamebook/tools/check_links.mjs gamebook/epub/src/sample
//
// 検査項目:
//  1. リンク切れ（href の先にファイルがない）
//  2. すべてのパラグラフが title.xhtml（なければ最初のファイル）から到達可能か
//  3. 行き先のないパラグラフがエンディング（class="end"）として明示されているか
//  4. content.opf の manifest / spine と実ファイルの食い違い

import fs from 'node:fs';
import path from 'node:path';

const srcDir = process.argv[2];
if (!srcDir) {
  console.error('使い方: node check_links.mjs <srcDir>');
  process.exit(1);
}

const oebps = path.join(srcDir, 'OEBPS');
const textDir = path.join(oebps, 'text');
const errors = [];
const isPara = (f) => /^p\d+\.xhtml$/.test(f);

const files = fs.readdirSync(textDir).filter((f) => f.endsWith('.xhtml')).sort();
const graph = new Map();

for (const f of files) {
  const body = fs.readFileSync(path.join(textDir, f), 'utf8');
  const out = new Set();
  for (const m of body.matchAll(/href="([^"#]+)(?:#[^"]*)?"/g)) {
    const href = m[1];
    if (/^[a-z]+:/.test(href) || href.endsWith('.css')) continue;
    const abs = path.resolve(textDir, href);
    if (!fs.existsSync(abs)) {
      errors.push(`${f}: リンク切れ → ${href}`);
      continue;
    }
    if (path.dirname(abs) === path.resolve(textDir)) out.add(path.basename(abs));
  }
  graph.set(f, out);
}

// 2. 到達可能性（表紙から辿れないパラグラフ＝ゴミか番号ミス）
const start = files.includes('title.xhtml') ? 'title.xhtml' : files[0];
const seen = new Set([start]);
const queue = [start];
while (queue.length) {
  for (const nxt of graph.get(queue.shift()) ?? []) {
    if (!seen.has(nxt)) { seen.add(nxt); queue.push(nxt); }
  }
}
for (const f of files) {
  if (!seen.has(f)) errors.push(`${f}: ${start} から到達できないパラグラフ`);
}

// 3. エンディング明示
let endings = 0;
for (const f of files.filter(isPara)) {
  const outsPara = [...(graph.get(f) ?? [])].filter(isPara);
  const marked = /class="[^"]*\bend\b[^"]*"/.test(fs.readFileSync(path.join(textDir, f), 'utf8'));
  if (outsPara.length === 0 && !marked) {
    errors.push(`${f}: 行き先がないのにエンディング（class="end"）になっていない`);
  }
  if (marked) endings++;
}

// 4. OPF 整合
const opfName = fs.readdirSync(oebps).find((f) => f.endsWith('.opf'));
if (!opfName) {
  errors.push('OEBPS/*.opf が見つからない');
} else {
  const opf = fs.readFileSync(path.join(oebps, opfName), 'utf8');
  const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]+)"`))?.[1];
  const items = [...opf.matchAll(/<item\b[^>]*>/g)].map((m) => m[0]);
  const hrefById = new Map(items.map((t) => [attr(t, 'id'), attr(t, 'href')]));
  const manifestHrefs = new Set(hrefById.values());

  for (const href of manifestHrefs) {
    if (!fs.existsSync(path.resolve(oebps, href))) {
      errors.push(`${opfName}: manifest のファイルが存在しない → ${href}`);
    }
  }
  const spine = [...opf.matchAll(/<itemref\b[^>]*>/g)].map((t) => attr(t[0], 'idref'));
  for (const f of files) {
    if (!manifestHrefs.has(`text/${f}`)) {
      errors.push(`${opfName}: manifest に text/${f} が登録されていない`);
      continue;
    }
    const id = [...hrefById.entries()].find(([, href]) => href === `text/${f}`)?.[0];
    if (!spine.includes(id)) errors.push(`${opfName}: spine に text/${f}（id=${id}）が入っていない`);
  }
}

if (errors.length) {
  for (const e of errors) console.error(`NG: ${e}`);
  process.exit(1);
}
console.log(`OK: パラグラフ ${files.filter(isPara).length}、エンディング ${endings}、全パラグラフ到達可能、リンク切れなし、OPF整合`);
