#!/usr/bin/env node
// パンタクル原稿 → EPUB3 ソース変換器。
// 使い方: node gamebook/tools/pantacle/convert.mjs
// 入力:  gamebook/manuscript/pantacle/genko/*.md
// 出力:  gamebook/epub/src/pantacle/（OEBPS 一式）
//        gamebook/manuscript/pantacle/unresolved.json（デバッグ一覧の材料）
//
// 方針: 原文は一切改変しない。解決できないジャンプは p000（執筆中）へ、
//       オフィユカス島の呪門系は p001（転移の間・合成ページ）へつなぐ。

import fs from 'node:fs';
import path from 'node:path';

const GENKO = 'gamebook/manuscript/pantacle/genko';
const OUT = 'gamebook/epub/src/pantacle';

// ---------------------------------------------------------------- 章定義
// range: 番号パラグラフの正規範囲。named/box/alpha: そのノード種を許可
const CHAPTERS = [
  { file: '20-macro-machi-1.md', id: 'macro1', name: 'マクロの街１', range: null, box: true },
  { file: '02-kingyukyu.md', id: 'taurus', name: '金牛宮', range: [100, 199] },
  { file: '05-shishikyu.md', id: 'leo', name: '獅子宮', range: [200, 299] },
  { file: '08-tenkatsukyu.md', id: 'scorpio', name: '天蝎宮', range: [300, 399], alpha: true },
  { file: '11-hoheikyu.md', id: 'aquarius', name: '宝瓶宮', range: [400, 499] },
  { file: '21-macro-machi-2.md', id: 'macro2', name: 'マクロの街２', range: null, box: true },
  { file: '01-hakuyokyu.md', id: 'aries', name: '白羊宮', range: [500, 599], named: true },
  { file: '04-kyokaikyu.md', id: 'cancer', name: '巨蟹宮', range: [600, 699] },
  { file: '07-tenbinkyu.md', id: 'libra', name: '天秤宮', range: [700, 799] },
  { file: '03-sojikyu.md', id: 'gemini', name: '双児宮', range: [900, 999] },
  { file: '06-shojokyu.md', id: 'virgo', name: '処女宮', range: [1000, 1099] },
  { file: '09-jinbakyu.md', id: 'sagittarius', name: '人馬宮', range: [1100, 1199] },
  { file: '12-sogyokyu.md', id: 'pisces', name: '双魚宮', range: [1200, 1299] },
  { file: '30-shuban.md', id: 'finale', name: 'パンタクル終盤', range: null, box: true },
];

// ---------------------------------------------------------------- 基本関数
const KANJI = { '〇': '0', '一': '1', '二': '2', '三': '3', '四': '4', '五': '5', '六': '6', '七': '7', '八': '8', '九': '9' };
const NUMCHAR = '0-9０-９〇一二三四五六七八九';
const BSUF = '(?:ーＢ|ーB|-B|−B)';

function normNum(raw) {
  return [...raw].map((c) => {
    if (/[0-9]/.test(c)) return c;
    if (/[０-９]/.test(c)) return String.fromCharCode(c.charCodeAt(0) - 0xfee0);
    return KANJI[c] ?? '';
  }).join('');
}
const normDash = (s) => s.replace(/[ー－‐−―]/g, '－').replace(/[　 ]/g, '');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------------------------------------------------------------- パース
function parseChapter(ch) {
  const text = fs.readFileSync(path.join(GENKO, ch.file), 'utf8');
  const lines = text.split('\n').map((l) => l.replace(/\r$/, ''));
  const nodes = [];
  const preamble = [];
  let cur = null;
  let started = false; // 章区切り（……【　X　】……等）以降 or 最初のノード以降

  const sepRe = new RegExp(`^…{6,}.*(?:【|${ch.name.replace(/[０-９0-9]/g, '')}).*…{0,}$`);
  const numHeadRe = new RegExp(`^・?([${NUMCHAR}]{3,5})(${BSUF})?(.*)$`);
  const jumpVerb = /[へヘ][　 ]*(?:進|戻)|進[むめ]。|加え|念じ/;

  const push = (kind, key, label) => {
    cur = { kind, key, label, body: [] };
    nodes.push(cur);
    started = true;
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (!started && /^…{6,}/.test(line) && sepRe.test(line)) { started = true; preamble.push(raw); continue; }

    // --- 番号見出し ---
    const mN = line.match(numHeadRe);
    if (mN) {
      const rest = mN[3] ?? '';
      const isHead = !jumpVerb.test(rest) && !/[${'０-９0-9'}]{3}/.test(rest.replace(/（[^）]*）/g, ''));
      const n = normNum(mN[1]);
      if (isHead && n.length >= 3 && !/^0/.test(n)) {
        const v = parseInt(n, 10);
        const inRange = ch.range && v >= ch.range[0] && v <= ch.range[1];
        const restClean = rest.replace(/（[^）]*）/g, '').replace(/※.*$/, '').replace(/[★◆・…―－ー─　 ]/g, '');
        const preOk = started || (restClean === '' && inRange && v <= ch.range[0] + 10);
        if (inRange && preOk) { push('num', n + (mN[2] ? 'b' : ''), line); continue; }
        if (ch.range && started && v >= 100 && v <= 1299) { push('stray', n, line); continue; }
        // 範囲外・章開始前（プリアンブルの星読み表等）→ 見出しにしない
      }
    }
    // --- 【単語】見出し（白羊のみ） ---
    if (ch.named) {
      const mW = line.match(/^【([^】]+)】[　 ]*[・…]*$/);
      if (mW && !new RegExp(`^[${NUMCHAR}　 ]+$`).test(mW[1])) { push('named', mW[1].trim(), line); continue; }
    }
    // --- ■場所見出し（マクロの街・終盤のみ） ---
    if (ch.box) {
      const mB = line.match(/^■+(.*?)■*$/);
      if (mB && mB[1].trim() && /[ぁ-んァ-ヶ一-龠a-zA-Zａ-ｚＡ-Ｚ0-9０-９]/.test(mB[1])) { push('box', mB[1].trim(), line); continue; }
    }
    // --- A〜Z・フェイズ２見出し（天蝎のみ） ---
    if (ch.alpha) {
      const mA = line.match(/^([A-ZＡ-Ｚ])$/);
      if (mA) { push('alpha', mA[1].replace(/[Ａ-Ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)), line); continue; }
      if (/^フェイズ２―*$/.test(line)) { push('phase', 'フェイズ２', line); continue; }
    }

    if (cur) cur.body.push(raw);
    else preamble.push(raw);
  }

  for (const n of nodes) {
    n.textJoined = n.body.join('\n');
    n.empty = n.body.every((l) => l.trim() === '' || /^[・…　 ]*$/.test(l.trim()));
    // ノード内の ▶小節見出し（同一ページ内の読み進み先＝リンク不要判定に使う）
    n.branches = n.body.map((l) => l.trim().match(/^[▶]+(.+?)[　 ]*$/)?.[1])
      .filter(Boolean).map((s) => s.replace(/（[^）]*）/g, '').replace(/\*\*/g, '').trim());
  }
  return { ...ch, nodes, preamble };
}

// ---------------------------------------------------------------- 参照解決
// 戻り値: 各行に適用する [regex, resolver] のリストを章ごとに構成
function buildResolver(chapters) {
  const byNum = new Map();      // '501' -> {file, chId}（初出優先・章内優先のため章別にも持つ）
  const chNum = new Map();      // chId -> Map(num -> file)
  const chNamed = new Map();    // chId -> Map(name -> file)
  const chCoord = new Map();    // chId -> Map(coord -> file)
  const files = new Map();      // 決定済みファイル名 -> node

  for (const ch of chapters) {
    chNum.set(ch.id, new Map());
    chNamed.set(ch.id, new Map());
    chCoord.set(ch.id, new Map());
    let seq = 0;
    for (const n of ch.nodes) {
      if (n.kind === 'num') {
        let f = `p${n.key}.xhtml`;
        let k = 2;
        while (files.has(f)) { f = `p${n.key}x${k++}.xhtml`; n.dup = true; }
        n.file = f;
        files.set(f, n);
        if (!chNum.get(ch.id).has(n.key)) chNum.get(ch.id).set(n.key, f);
        if (!byNum.has(n.key)) byNum.set(n.key, { file: f, chId: ch.id });
      } else {
        seq++;
        n.file = `${ch.id}-${String(seq).padStart(2, '0')}.xhtml`;
        files.set(n.file, n);
        const key = n.kind === 'alpha' ? n.key : n.key.replace(/[　 ]/g, '');
        chNamed.get(ch.id).set(key, n.file);
        if (n.kind === 'stray') chNamed.get(ch.id).set(n.key, n.file);
      }
    }
    // 獣帯コンパス座標（■ノードの本文宣言から）
    for (const n of ch.nodes) {
      if (n.kind !== 'box') continue;
      for (const m of n.textJoined.matchAll(/獣帯コンパスが【([^】]+)】を示している/g)) {
        const c = normDash(m[1]);
        if (!chCoord.get(ch.id).has(c)) chCoord.get(ch.id).set(c, n.file);
      }
    }
  }
  // 場所名エイリアス（マクロの街・終盤の■見出しを（）・／で分解。長い順に照合）
  const chAlias = new Map();
  for (const ch of chapters) {
    const list = [];
    if (ch.box) {
      for (const n of ch.nodes) {
        if (n.kind !== 'box') continue;
        const parts = new Set([n.key]);
        for (const p of n.key.split(/[（）／・]/)) if (p.trim().length >= 2) parts.add(p.trim());
        // 「蛇夫宮の呪門」→「呪門」のような末尾語も別名にする
        for (const p of [...parts]) {
          const tail = p.split('の').pop().trim();
          if (tail.length >= 2 && tail !== p) parts.add(tail);
        }
        for (const a of parts) list.push({ alias: a, file: n.file });
      }
      list.sort((a, b) => b.alias.length - a.alias.length);
    }
    chAlias.set(ch.id, list);
  }
  return { byNum, chNum, chNamed, chCoord, chAlias };
}

// 1行の中のリンク箇所を [{start,end,target}] で返す
function findRefs(line, ch, R, report, node, isChoice = false) {
  const nodeKey = node.key;
  const refs = [];
  // 現在地表示（獣帯コンパスが【X】を示している）はリンクにしない
  const isCompassStatus = /獣帯コンパスが【[^】]+】を(?:示|指)して/.test(line);
  const add = (m, idx, target, why) => {
    if (target) refs.push({ start: idx, end: idx + m.length, target });
    else {
      report.push({ ch: ch.id, node: nodeKey, raw: line.slice(0, 60), why });
      refs.push({ start: idx, end: idx + m.length, target: 'p000.xhtml' });
    }
  };
  const numTarget = (numKey) => {
    if (R.chNum.get(ch.id).has(numKey)) return R.chNum.get(ch.id).get(numKey);
    if (R.byNum.has(numKey)) return R.byNum.get(numKey).file;
    // Ｂ面のみ存在する番号（双児宮の迷宮Ｂ面）: Ｂ面ノードと解釈して接続（要確認）
    const b = R.chNum.get(ch.id).get(numKey + 'b');
    if (b && numKey + 'b' !== nodeKey) {
      report.push({ ch: ch.id, node: nodeKey, raw: line.slice(0, 60), why: `番号 ${numKey} をＢ面（${numKey}ーＢ）と解釈して接続（要確認）` });
      return b;
    }
    return null;
  };

  // 1) ハブ（オフィユカス島／マクロの街の呪門）
  const hubRe = /(?:オフィユカス島の【?呪門】?|マクロの街の【?呪門】?|【マクロの街の呪門】|マクロの街【呪門前】|オフィユカス島の呪門)/g;
  for (const m of line.matchAll(hubRe)) refs.push({ start: m.index, end: m.index + m[0].length, target: 'p001.xhtml' });
  const cover = (i) => refs.some((r) => i >= r.start && i < r.end);

  // 2) 番号＋(ーB)?＋（なら/に/まで)?＋へ・ヘ
  const numRe = new RegExp(`([${NUMCHAR}]{3,5})(${BSUF})?(?:なら|に|まで)?[　 ]*[へヘ]`, 'g');
  for (const m of line.matchAll(numRe)) {
    if (cover(m.index)) continue;
    const key = normNum(m[1]) + (m[2] ? 'b' : '');
    const t = numTarget(key);
    add(m[1] + (m[2] ?? ''), m.index, t, `番号 ${key} が未定義`);
  }
  // 2b) へ＋番号＋進（語順崩れ）・番号＋なら（行末）
  for (const m of line.matchAll(new RegExp(`[へヘ][　 ]*([${NUMCHAR}]{3,5})[　 ]*進`, 'g'))) {
    if (cover(m.index + 1)) continue;
    const key = normNum(m[1]);
    add(m[1], m.index + 1, numTarget(key), `番号 ${key} が未定義`);
  }
  for (const m of line.matchAll(new RegExp(`([${NUMCHAR}]{3,5})(${BSUF})?なら[。　 ]*$`, 'gm'))) {
    if (cover(m.index)) continue;
    const key = normNum(m[1]) + (m[2] ? 'b' : '');
    add(m[1] + (m[2] ?? ''), m.index, numTarget(key), `番号 ${key} が未定義`);
  }
  // 3) 括弧参照（２８６）／【５９０】
  for (const m of line.matchAll(new RegExp(`[（(【]([${NUMCHAR}]{3,5})[）)】]`, 'g'))) {
    if (cover(m.index + 1)) continue;
    const key = normNum(m[1]);
    const v = parseInt(key, 10);
    if (ch.range && v >= 100 && v <= 1299) {
      add(m[1], m.index + 1, numTarget(key), `番号 ${key} が未定義（括弧参照）`);
    }
  }
  // 4) 【単語】（章内ノード・座標）
  if (!isCompassStatus) {
    for (const m of line.matchAll(/【([^】]+)】/g)) {
      if (cover(m.index)) continue;
      const name = m[1].replace(/[　 ]/g, '');
      let t = R.chNamed.get(ch.id).get(name) ?? R.chCoord.get(ch.id).get(normDash(m[1]));
      if (t) refs.push({ start: m.index, end: m.index + m[0].length, target: t });
      else if (/^呪門前?$/.test(name)) {
        // 章内に呪門ノードが無い裸の【呪門】＝オフィユカス島の呪門（ハブ）
        refs.push({ start: m.index, end: m.index + m[0].length, target: 'p001.xhtml' });
      } else if (isChoice && /[へヘ][　 ]*(?:進|戻)/.test(line)) {
        report.push({ ch: ch.id, node: nodeKey, raw: line.slice(0, 60), why: `【${m[1]}】の行き先が章内に見つからない` });
        refs.push({ start: m.index, end: m.index + m[0].length, target: 'p000.xhtml' });
      }
    }
  }
  // 5) 場所名参照（マクロの街・終盤の・選択肢）: 「・蛇夫宮に入る」「・玄関ホールに戻る」等
  if (ch.box && isChoice && refs.length === 0) {
    // 同一ページ内の ▶小節へ読み進む選択肢はリンク不要
    const choice = line.trim();
    const inPage = (node.branches ?? []).some((b) => b && (choice.includes(b) || b.includes(choice.replace(/を?見る|に近寄る|を調べる|へ行く|に戻る|。/g, ''))));
    if (!inPage) {
      for (const { alias, file } of R.chAlias.get(ch.id)) {
        const idx = line.indexOf(alias);
        if (idx !== -1 && !cover(idx)) { refs.push({ start: idx, end: idx + alias.length, target: file }); break; }
      }
      if (refs.length === 0 && /呪印に触れ|呪門に触れ/.test(line)) {
        const i = line.search(/呪印に触れ|呪門に触れ/);
        refs.push({ start: i, end: i + 5, target: 'p001.xhtml' });
      }
      if (refs.length === 0 && /(向かう|入る|戻る|進む|出る|行く|登る|降りる|渡る|くぐる)。?[　 ]*$/.test(choice)) {
        report.push({ ch: ch.id, node: nodeKey, raw: line.slice(0, 60), why: '移動先の場所が特定できない（街マップへ接続）' });
        refs.push({ start: 0, end: line.length, target: `part-${ch.id}.xhtml` });
      }
    }
  }
  // 6) A〜Z（天蝎）
  if (ch.alpha) {
    for (const m of line.matchAll(/([A-ZＡ-Ｚ])(?:なら)?[　 ]*[へヘ]/g)) {
      if (cover(m.index)) continue;
      const a = m[1].replace(/[Ａ-Ｚ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
      const t = R.chNamed.get(ch.id).get(a);
      if (t) refs.push({ start: m.index, end: m.index + 1, target: t });
    }
    if (/フェイズ２へ/.test(line)) {
      const i = line.indexOf('フェイズ２へ');
      if (!cover(i)) {
        const t = R.chNamed.get(ch.id).get('フェイズ２');
        if (t) refs.push({ start: i, end: i + 5, target: t });
      }
    }
  }
  // 7) １へ進め（ハブ）・２桁番号
  for (const m of line.matchAll(/(?<![0-9０-９])([0-9０-９]{1,2})[　 ]*[へヘ][　 ]*(?:進|戻)/g)) {
    if (cover(m.index)) continue;
    const v = parseInt(normNum(m[1]), 10);
    if (v === 1) refs.push({ start: m.index, end: m.index + m[1].length, target: 'p001.xhtml' });
    else {
      report.push({ ch: ch.id, node: nodeKey, raw: line.slice(0, 60), why: `パラグラフ ${v} は原稿に存在しない` });
      refs.push({ start: m.index, end: m.index + m[1].length, target: 'p000.xhtml' });
    }
  }
  // 8) 行き先未記入（・行で へ進む/進め が数字なしに残る）
  if (isChoice && refs.length === 0) {
    const mMiss = line.match(/(?:なら|◆)[　 ]*[へヘ][　 ]*進[むめ]。?[　 ]*$/);
    if (mMiss) {
      report.push({ ch: ch.id, node: nodeKey, raw: line.slice(0, 60), why: '行き先未記入' });
      refs.push({ start: mMiss.index, end: mMiss.index + mMiss[0].length, target: 'p000.xhtml' });
    }
  }
  refs.sort((a, b) => a.start - b.start);
  // 重なり除去（先勝ち）
  const out = [];
  let last = -1;
  for (const r of refs) { if (r.start >= last) { out.push(r); last = r.end; } }
  return out;
}

// ---------------------------------------------------------------- 行 → XHTML
function inlineFmt(s) {
  // esc 済み文字列に対して: **強調** と {漢字/よみ} ルビ
  return s
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*\*/g, '')
    .replace(/\{([^/{}]+)\/([^/{}]+)\}/g, '<ruby>$1<rt>$2</rt></ruby>');
}

function renderLine(rawLine, ch, R, report, node, isChoice = false) {
  const refs = findRefs(rawLine, ch, R, report, node, isChoice);
  let html = '';
  let pos = 0;
  for (const r of refs) {
    html += inlineFmt(esc(rawLine.slice(pos, r.start)));
    html += `<a href="${r.target}">${inlineFmt(esc(rawLine.slice(r.start, r.end)))}</a>`;
    pos = r.end;
  }
  html += inlineFmt(esc(rawLine.slice(pos)));
  return html;
}

const GRID_RE = /^[■□◇▽☆●○◎▲△▼×✕＋十字＿｜/／\\＼・\-ー－―…　 0-9０-９a-zａ-ｚA-ZＡ-Ｚ↑↓←→♈♉♊♋♌♍♎♏♐♑♒♓⛎]{2,}$/;
const isGridLine = (l) => /[■□◇▽☆♈-♓⛎]/.test(l) && GRID_RE.test(l) && !/[ぁ-んァ-ヶ一-龠]/.test(l);

function renderBody(node, ch, R, report) {
  const out = [];
  let ul = null;
  let grid = null;
  const flushUl = () => { if (ul) { out.push(`<ul class="choices">\n${ul.join('\n')}\n</ul>`); ul = null; } };
  const flushGrid = () => { if (grid) { out.push(`<pre class="grid">${grid.join('\n')}</pre>`); grid = null; } };

  for (const raw of node.body) {
    const line = raw.replace(/\s+$/, '');
    const t = line.trim();
    const disp = line.replace(/^[ \t]+/, ''); // 全角スペースの字下げは保持
    if (t === '') { flushGrid(); continue; } // 空行では choices を閉じない（選択肢間の空行対策）
    if (isGridLine(t)) { flushUl(); (grid ??= []).push(esc(disp)); continue; }
    flushGrid();
    if (/^・/.test(t)) {
      (ul ??= []).push(`  <li>${renderLine(t.replace(/^・/, ''), ch, R, report, node, true)}</li>`);
      continue;
    }
    flushUl();
    if (/^※|^（※/.test(t)) { out.push(`<p class="memo">${renderLine(disp, ch, R, report, node)}</p>`); continue; }
    if (/^[▶■□◇▽☆]/.test(t)) { out.push(`<p class="branch">${renderLine(disp, ch, R, report, node)}</p>`); continue; }
    out.push(`<p>${renderLine(disp, ch, R, report, node)}</p>`);
  }
  flushUl();
  flushGrid();
  return out.join('\n');
}

// ---------------------------------------------------------------- XHTML 枠
function xhtml(title, bodyHtml, cssPath = '../style.css') {
  return `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="ja" lang="ja">
<head>
  <meta charset="utf-8"/>
  <title>${esc(title)}</title>
  <link rel="stylesheet" type="text/css" href="${cssPath}"/>
</head>
<body>
${bodyHtml}
</body>
</html>
`;
}

// ---------------------------------------------------------------- メイン
const chapters = CHAPTERS.map(parseChapter);
const R = buildResolver(chapters);
const report = [];
const textDir = path.join(OUT, 'OEBPS', 'text');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(textDir, { recursive: true });
fs.mkdirSync(path.join(OUT, 'META-INF'), { recursive: true });

const ENDING_RE = /バッドエンド|ハッピーエンド|エンディング|冒険はここでおしまい|THE END|了$/m;

const manifest = [];
const spine = [];
const addFile = (name, content) => {
  fs.writeFileSync(path.join(textDir, name), content);
  manifest.push(name);
  spine.push(name);
};

// --- 各章 ---
const partLinks = [];
for (const ch of chapters) {
  // part ページ（プリアンブル＝術一覧・星読み表などをそのまま収録）
  const pre = [];
  {
    const dummy = { body: ch.preamble, key: '(preamble)' };
    pre.push(renderBody(dummy, ch, R, report));
  }
  const entry = ch.nodes.find((n) => !n.empty) ?? ch.nodes[0];
  const partFile = `part-${ch.id}.xhtml`;
  const entryLink = entry ? `<ul class="choices">\n  <li><a href="${entry.file}">${esc(ch.name)}に入る（${esc(entry.key)}）</a></li>\n</ul>` : '';
  // マクロの街・終盤は場所一覧（街マップ）を掲載（場所名ナビの受け皿）
  const placeMap = ch.box
    ? `<h2>場所一覧（マップ代わり）</h2>\n<ul class="choices">\n${ch.nodes.filter((n) => n.kind === 'box')
        .map((n) => `  <li><a href="${n.file}">${esc(n.key)}</a></li>`).join('\n')}\n</ul>`
    : '';
  addFile(partFile, xhtml(ch.name, `<section class="part">
<h1>${esc(ch.name)}</h1>
<p class="notice">（この章の術一覧・星読み表などの原稿冒頭資料を下に収録）</p>
${entryLink}
${placeMap}
${pre.join('\n')}
${entryLink}
</section>`));
  partLinks.push({ file: partFile, name: ch.name });

  for (const n of ch.nodes) {
    const body = renderBody(n, ch, R, report);
    // 行き先の有無（本文リンクから判定するため、変換後の a href を数える）
    const paraOuts = [...body.matchAll(/href="(p[0-9]+b?x?\d*\.xhtml|[a-z0-9]+-\d+\.xhtml)"/g)]
      .filter((m) => m[1] !== n.file);
    const isEnding = ENDING_RE.test(n.textJoined);
    let cls = 'paragraph';
    let extra = '';
    if (n.empty) {
      cls += ' end wip';
      extra = `<p class="fin">■ 執筆中（本文未執筆） ■</p>
<ul class="choices">
  <li><a href="p001.xhtml">呪門（転移の間）へ戻る</a></li>
  <li><a href="debug.xhtml">全ノード索引へ</a></li>
</ul>`;
      report.push({ ch: ch.id, node: n.key, raw: '(空)', why: '本文未執筆の番号' });
    } else if (isEnding && paraOuts.length === 0) {
      cls += ' end';
      extra = `<p class="fin">■ エンディング ■</p>
<ul class="choices">
  <li><a href="title.xhtml">表紙にもどる</a></li>
  <li><a href="p001.xhtml">呪門（転移の間）へ</a></li>
</ul>`;
    } else if (paraOuts.length === 0) {
      cls += ' end wip';
      extra = `<p class="fin">■ 執筆中（この先のジャンプが原稿に未記載） ■</p>
<ul class="choices">
  <li><a href="p001.xhtml">呪門（転移の間）へ戻る</a></li>
</ul>`;
      report.push({ ch: ch.id, node: n.key, raw: n.textJoined.slice(0, 40).replace(/\n/g, ' '), why: '行き先のないパラグラフ（エンディング明示なし）' });
    }
    const heading = n.kind === 'num'
      ? `<h2 class="pnum">${esc(n.key.replace('b', 'ーＢ'))}</h2>`
      : `<h2 class="pname">${esc(n.kind === 'alpha' ? n.key : n.key)}</h2>`;
    const dupNote = n.dup ? `<p class="memo">※ 同じ番号の定義が複数あります（デバッグ一覧参照）</p>` : '';
    addFile(n.file, xhtml(`${ch.name} ${n.key}`, `<section id="${n.file.replace('.xhtml', '')}" class="${cls}">
<p class="chname">${esc(ch.name)}</p>
${heading}
${dupNote}
${body}
${extra}
</section>`));
  }
}

// --- p001 呪門（転移の間）＝ 原稿に無い基幹パラグラフ 1 の代役 ---
{
  const links = chapters.map((ch) => {
    const p = partLinks.find((x) => x.file === `part-${ch.id}.xhtml`);
    const entry = ch.range ? ch.nodes.find((n) => n.kind === 'num' && !n.empty) : null;
    const tobira = `<a href="${p.file}">とびら（術・星読み表）</a>`;
    return entry
      ? `  <li><a href="${entry.file}">${esc(ch.name)}へ転移する（${esc(entry.key)}）</a>　${tobira}</li>`
      : `  <li><a href="${p.file}">${esc(ch.name)}へ</a></li>`;
  }).join('\n');
  addFile('p001.xhtml', xhtml('呪門（転移の間）', `<section id="p001" class="paragraph hub">
<h2 class="pnum">１　呪門（転移の間）</h2>
<p class="memo">※ この頁は変換時に補ったものです。原稿にはオフィユカス島の基幹パラグラフ（１〜９９番台）が見つからなかったため、
「１へ進め」「オフィユカス島の【呪門】へ」「マクロの街の呪門へ」等のジャンプはすべてここに着地します。</p>
<p>ぼくはオフィユカス島の呪門の前に立っている。どこへ向かおう。</p>
<ul class="choices">
${links}
  <li><a href="debug.xhtml">全ノード索引（デバッグ用・ネタバレ注意）</a></li>
</ul>
</section>`));
}

// --- p000 執筆中 ---
addFile('p000.xhtml', xhtml('執筆中', `<section id="p000" class="paragraph wip">
<h2 class="pnum">◆　執筆中</h2>
<p>このジャンプの行き先は、原稿にまだ書かれていません（行き先番号の未記入・番号の未定義・未執筆エリアなど）。</p>
<p>どのジャンプがここに来るかの一覧は、リポジトリの <code>gamebook/manuscript/pantacle/debug-list.md</code> にまとめてあります。</p>
<ul class="choices">
  <li><a href="p001.xhtml">呪門（転移の間）へ戻る</a></li>
  <li><a href="debug.xhtml">全ノード索引へ</a></li>
</ul>
</section>`));

// --- debug.xhtml 全ノード索引 ---
{
  const secs = chapters.map((ch) => {
    const items = ch.nodes.map((n) => {
      const mark = n.empty ? '（空）' : '';
      const label = n.kind === 'num' ? n.key.replace('b', 'ーＢ') : n.key;
      return `<li><a href="${n.file}">${esc(label)}</a>${mark}</li>`;
    }).join('');
    return `<h2>${esc(ch.name)}</h2>\n<ol class="dbg">${items}</ol>`;
  }).join('\n');
  addFile('debug.xhtml', xhtml('全ノード索引', `<section class="debugidx">
<h1>全ノード索引（デバッグ用）</h1>
<p class="memo">※ ドラフト検証用の索引です。物語の順番どおりではありません。ネタバレを含みます。</p>
${secs}
<ul class="choices"><li><a href="p001.xhtml">呪門（転移の間）へ戻る</a></li></ul>
</section>`));
}

// --- title.xhtml ---
{
  const first = 'part-macro1.xhtml';
  addFile('title.xhtml', xhtml('パンタクル', `<section id="title">
<h1>パンタクル</h1>
<p class="notice">（ドラフト全編・デバッグ版）</p>
<h2>遊び方</h2>
<ul>
  <li>この本は、順番にページをめくって読む本ではありません。番号のついた場面（パラグラフ）を読み、選択肢のリンクを押して指定の番号へジャンプします。</li>
  <li>「星読み表」「カリスマ値」「経験記号」は紙のメモに自分で記録しながら進みます（各章とびらに原稿の一覧を収録）。</li>
  <li>原稿はドラフトです。未執筆の場所に着くと「執筆中」のページが表示されます。</li>
</ul>
<ul class="choices">
  <li><a href="${first}">冒険をはじめる（マクロの街１から）</a></li>
  <li><a href="p001.xhtml">呪門（転移の間）＝章えらび</a></li>
</ul>
</section>`));
  // title を spine 先頭へ
  const i = spine.indexOf('title.xhtml');
  spine.splice(i, 1);
  spine.unshift('title.xhtml');
}

// --- style.css / container.xml / mimetype / nav / opf ---
fs.writeFileSync(path.join(OUT, 'OEBPS', 'style.css'), `body { margin: 5% 6%; line-height: 1.8; font-family: serif; }
h1 { font-size: 1.5em; margin: 1em 0; }
h2.pnum { font-size: 1.3em; border-bottom: 1px solid #999; padding-bottom: .2em; }
h2.pname { font-size: 1.2em; border-bottom: 1px dashed #999; padding-bottom: .2em; }
p.chname { color: #888; font-size: .8em; margin-bottom: 0; }
p { margin: .6em 0; text-indent: 0; }
ul.choices { list-style: none; margin: 1.2em 0; padding: 0; }
ul.choices li { margin: .7em 0; padding: .5em .8em; border: 1px solid #aaa; border-radius: .4em; }
ul.choices a { text-decoration: none; }
p.jump { margin: 1.2em 0; font-weight: bold; }
p.fin { text-align: center; font-weight: bold; margin: 1.5em 0; }
p.notice { color: #666; font-size: .9em; }
p.memo { background: #f3f0e0; border-left: 4px solid #c9b458; padding: .4em .6em; font-size: .85em; color: #555; }
p.branch { font-weight: bold; margin-top: 1.1em; }
pre.grid { line-height: 1.15; font-size: .95em; letter-spacing: .1em; margin: .8em auto; }
section.wip h2 { color: #a66; }
ol.dbg { columns: 3; font-size: .85em; }
ol.dbg li { break-inside: avoid; }
`);
fs.writeFileSync(path.join(OUT, 'mimetype'), 'application/epub+zip');
fs.writeFileSync(path.join(OUT, 'META-INF', 'container.xml'), `<?xml version="1.0" encoding="utf-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>
`);
{
  const navPoints = [`<li><a href="text/title.xhtml">表紙・遊び方</a></li>`,
    `<li><a href="text/p001.xhtml">呪門（転移の間）＝章えらび</a></li>`,
    ...partLinks.map((p) => `<li><a href="text/${p.file}">${esc(p.name)}</a></li>`),
    `<li><a href="text/debug.xhtml">全ノード索引（デバッグ用）</a></li>`];
  fs.writeFileSync(path.join(OUT, 'OEBPS', 'nav.xhtml'), `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="ja" lang="ja">
<head><meta charset="utf-8"/><title>目次</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
<nav epub:type="toc" id="toc">
<h1>目次</h1>
<ol>
${navPoints.map((l) => '  ' + l).join('\n')}
</ol>
</nav>
</body>
</html>
`);
  const items = manifest.map((f) => `    <item id="${f.replace(/[^a-zA-Z0-9]/g, '_')}" href="text/${f}" media-type="application/xhtml+xml"/>`).join('\n');
  const refs = spine.map((f) => `    <itemref idref="${f.replace(/[^a-zA-Z0-9]/g, '_')}"/>`).join('\n');
  fs.writeFileSync(path.join(OUT, 'OEBPS', 'content.opf'), `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="pub-id" xml:lang="ja">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="pub-id">urn:uuid:3f6b1c2a-9e4d-4b7a-8c5e-6d2f8a1b4c70</dc:identifier>
    <dc:title>パンタクル（ドラフト全編・デバッグ版）</dc:title>
    <dc:language>ja</dc:language>
    <meta property="dcterms:modified">2026-07-03T00:00:00Z</meta>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="css" href="style.css" media-type="text/css"/>
${items}
  </manifest>
  <spine>
${refs}
  </spine>
</package>
`);
}

// --- レポート ---
fs.writeFileSync('gamebook/manuscript/pantacle/unresolved.json', JSON.stringify(report, null, 1));
const nodeCount = chapters.reduce((a, c) => a + c.nodes.length, 0);
console.log(`OK: 章 ${chapters.length}、ノード ${nodeCount}、生成ファイル ${manifest.length + 2}`);
console.log(`未解決・要デバッグ ${report.length} 件 → gamebook/manuscript/pantacle/unresolved.json`);
const byWhy = {};
for (const r of report) byWhy[r.why.replace(/\d+/g, 'N')] = (byWhy[r.why.replace(/\d+/g, 'N')] ?? 0) + 1;
for (const [k, v] of Object.entries(byWhy)) console.log(`  ${k}: ${v}`);
