#!/usr/bin/env node
// EPUB ソースディレクトリ（展開状態）を .epub（ZIP）に固める。依存パッケージなし。
// 使い方: node gamebook/tools/build_epub.mjs <srcDir> <out.epub>
// 例:     node gamebook/tools/build_epub.mjs gamebook/epub/src/sample gamebook/epub/dist/sample.epub
//
// EPUB(OCF) の決まりごと:
//  - 先頭エントリは mimetype、無圧縮(stored)で格納する
//  - それ以外は deflate 圧縮でよい

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function dosDateTime(d) {
  const date = ((Math.max(d.getFullYear(), 1980) - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
  const time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
  return { date, time };
}

function walk(dir, base = dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full, base));
    else out.push(path.relative(base, full).split(path.sep).join('/'));
  }
  return out;
}

const [srcDir, outFile] = process.argv.slice(2);
if (!srcDir || !outFile) {
  console.error('使い方: node build_epub.mjs <srcDir> <out.epub>');
  process.exit(1);
}
if (!fs.existsSync(path.join(srcDir, 'mimetype'))) {
  console.error(`エラー: ${srcDir} に mimetype がありません`);
  process.exit(1);
}

// mimetype を必ず先頭に
const names = walk(srcDir).sort((a, b) =>
  a === 'mimetype' ? -1 : b === 'mimetype' ? 1 : a.localeCompare(b));

const chunks = [];
const central = [];
let offset = 0;

for (const name of names) {
  const full = path.join(srcDir, name);
  const data = fs.readFileSync(full);
  const stored = name === 'mimetype';
  const comp = stored ? data : zlib.deflateRawSync(data, { level: 9 });
  const method = stored ? 0 : 8;
  const crc = crc32(data);
  const { date, time } = dosDateTime(new Date(fs.statSync(full).mtime));
  const nameBuf = Buffer.from(name, 'utf8');

  const local = Buffer.alloc(30);
  local.writeUInt32LE(0x04034b50, 0); // local file header signature
  local.writeUInt16LE(20, 4);         // version needed
  local.writeUInt16LE(0x0800, 6);     // flags: UTF-8 filename
  local.writeUInt16LE(method, 8);
  local.writeUInt16LE(time, 10);
  local.writeUInt16LE(date, 12);
  local.writeUInt32LE(crc, 14);
  local.writeUInt32LE(comp.length, 18);
  local.writeUInt32LE(data.length, 22);
  local.writeUInt16LE(nameBuf.length, 26);

  const cen = Buffer.alloc(46);
  cen.writeUInt32LE(0x02014b50, 0);   // central directory header signature
  cen.writeUInt16LE(20, 4);           // version made by
  cen.writeUInt16LE(20, 6);           // version needed
  cen.writeUInt16LE(0x0800, 8);       // flags: UTF-8 filename
  cen.writeUInt16LE(method, 10);
  cen.writeUInt16LE(time, 12);
  cen.writeUInt16LE(date, 14);
  cen.writeUInt32LE(crc, 16);
  cen.writeUInt32LE(comp.length, 20);
  cen.writeUInt32LE(data.length, 24);
  cen.writeUInt16LE(nameBuf.length, 28);
  cen.writeUInt32LE(offset, 42);      // local header offset
  central.push(Buffer.concat([cen, nameBuf]));

  chunks.push(local, nameBuf, comp);
  offset += local.length + nameBuf.length + comp.length;
}

const centralBuf = Buffer.concat(central);
const eocd = Buffer.alloc(22);
eocd.writeUInt32LE(0x06054b50, 0);    // end of central directory signature
eocd.writeUInt16LE(names.length, 8);
eocd.writeUInt16LE(names.length, 10);
eocd.writeUInt32LE(centralBuf.length, 12);
eocd.writeUInt32LE(offset, 16);

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, Buffer.concat([...chunks, centralBuf, eocd]));
console.log(`OK: ${outFile}（${names.length} ファイル, ${fs.statSync(outFile).size} バイト）`);
