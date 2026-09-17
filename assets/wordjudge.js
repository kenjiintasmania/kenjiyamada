/* assets/wordjudge.js ─ 単語の答え合わせ（単語アプリ・2000語到達度テスト 共通）
 *
 * ★1か所に置く理由：このリポジトリでは「同じものさしの写しが少しずつ食いちがう」事故が
 *   何度か起きている（4レーンの norm() のアポストロフィ扱いなど）。単語の判定は
 *   単語アプリと到達度テストの両方が使うので、写さずにこのファイルを両方から読む。
 *
 * 出題文字列の書きかた（教科書の表記に合わせる）:
 *   year(s)                … 丸カッコ ＝ あってもなくてもよい（year / years）
 *   there is［are］        … 角カッコ ＝ 直前の語と入れかえられる（there is / there are）
 *   cheer ... up           … ... … ～ 〜 ＝ 何語入ってもよい場所（cheer up / cheer him up）
 *   enjoy ...ing           … くっついている場合は語の一部（enjoy playing / enjoy ing）
 */
(function (global) {
  "use strict";

  var PLACE = /\.{2,}|…|[～〜]/g;          // 「何語入ってもよい」印
  var MARK  = "\u0001";                    // 正規化で消えないように、いったん置きかえる印

  function normalizeAnswer(s) {
    if (s == null) return "";
    var t = String(s);
    // 引用符・約物の統一（カーリー→ストレート、全角→半角の主要なもの）
    t = t.replace(/[‘’ʼ′]/g, "'")
         .replace(/[“”]/g, '"')
         .replace(/[‐-―−]/g, "-")
         .replace(/　/g, " ");
    t = t.trim().toLowerCase();
    t = t.replace(/-/g, " ");                            // ハイフンは空白と同一視
    t = t.replace(/\s+/g, " ").trim();
    // 前後の約物を除去（語頭・語末のみ。内部のアポストロフィ等は保持）
    t = t.replace(/^[\s.,!?;:"'()\[\]{}…~～、。･・]+/, "")
         .replace(/[\s.,!?;:"'()\[\]{}…~～、。･・]+$/, "");
    return t;
  }

  /* 出題文字列 → 受け入れる「かたち」の配列。カッコを1つずつ開いていく。 */
  function variants(s) {
    var out = [], seen = {}, queue = [String(s)];
    var guard = 0;
    while (queue.length && guard++ < 400) {
      var cur = queue.shift();
      if (seen[cur]) continue;
      seen[cur] = 1;
      // 丸カッコ：中身ごと省く形と、カッコ記号だけ外す形
      var mr = cur.match(/[（(][^)）]*[)）]/);
      if (mr) {
        queue.push(cur.replace(mr[0], " "));
        queue.push(cur.replace(mr[0], mr[0].slice(1, -1)));
        continue;
      }
      // 角カッコ：直前の語（または直前2語）と入れかえる形／カッコごと省く形
      var ms = cur.match(/[［\[]([^］\]]*)[］\]]/);
      if (ms) {
        var head = cur.slice(0, ms.index), tail = cur.slice(ms.index + ms[0].length), alt = ms[1];
        queue.push(head + " " + tail);                                          // ［　］を省く
        queue.push(head.replace(/\S+\s*$/, "") + " " + alt + " " + tail);       // 直前1語を入れかえ
        queue.push(head.replace(/\S+\s+\S+\s*$/, "") + " " + alt + " " + tail); // 直前2語（Thank you［Thanks］用）
        continue;
      }
      out.push(cur);
    }
    return out;
  }

  function esc(x) { return x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  /* 「何語入ってもよい」印を含むかたち → 正規表現。含まなければ null（文字列比較でよい）。
     ★印は正規化の前に MARK へ置きかえておく。normalizeAnswer は語頭・語末の約物を落とすので、
       「... year(s) old」の先頭の ... がそこで消えてしまい、10 years old を拾えなくなるため。 */
  function toRe(marked) {
    if (marked.indexOf(MARK) < 0) return null;
    var toks = marked.split(" ").filter(Boolean), parts = [], soft = [];
    for (var i = 0; i < toks.length; i++) {
      var t = toks[i];
      if (t === MARK) {
        parts.push("(?:\\S+(?:\\s+\\S+)*)?");      // 単独の印＝0語以上
        soft.push(true);
      } else {
        parts.push(esc(t).split(MARK).join("\\S*"));   // 語にくっついた印（...ing など）
        soft.push(false);
      }
    }
    var body = "";
    for (var j = 0; j < parts.length; j++) {
      if (j) body += (soft[j] || soft[j - 1]) ? "\\s*" : "\\s+";
      body += parts[j];
    }
    try { return new RegExp("^" + body + "$"); } catch (e) { return null; }
  }

  /* 受け入れる形（完全一致用の集合と、印つきの正規表現） */
  function acceptable(w) {
    var main = (w && typeof w === "object") ? w.w : w;
    var alts = (w && typeof w === "object" && w.alt) ? w.alt : [];
    var set = {}, res = [];
    [main].concat(alts).forEach(function (s) {
      variants(s).forEach(function (v) {
        // ① 印を取り去った形＝そのまま打てば正解になる形（welcome to など）
        var plain = normalizeAnswer(v.replace(PLACE, " "));
        if (plain) set[plain] = 1;
        // ② 印を残した形＝「何語入ってもよい」を許す正規表現
        var re = toRe(normalizeAnswer(v.replace(PLACE, MARK)));
        if (re) res.push(re);
      });
    });
    return { set: set, res: res };
  }


  /* ---------- 同じ訳が何語もあるときの手がかり ---------- *
   * 「すばらしい」＝ wonderful / fantastic / great のように、同じ訳の語が2つ以上あると、
   * 生徒はどれを打てばよいか決めようがない（2026-09 先生報告）。2000語中 21の訳・44語がこれ。
   * 品詞は出題画面に出ているので、**品詞まで見ても分かれないときだけ**手がかりを出す。
   *   ① 頭文字でわかれる          → 「wではじまる」
   *   ② 頭文字が同じで長さがちがう → 「mではじまる・長いほう」（mother と mom）
   *   ③ それでも決められない       → 手がかりは出さず、**相手の綴りも正解にする**
   *      （have to / has to、would like to / would love to。主語も文脈も無いのだから、
   *        どちらを書いても生徒の落ち度ではない）
   * ★手がかりは訳の前に（　）で足すだけで、データ（words.js）はさわらない。
   *   語が増えても自動でつき直る。
   */
  var HINT = null, TWIN = null;
  var LONG_ENOUGH = 2;                 // 「長い／短い」と言えるだけの字数差

  function letters(s) { return String(s).replace(/[^A-Za-z]/g, "").length; }
  function allDifferent(a) {
    var seen = {};
    for (var i = 0; i < a.length; i++) { if (seen[a[i]]) return false; seen[a[i]] = 1; }
    return true;
  }
  function buildHints(list) {
    HINT = {}; TWIN = {};
    var g = {};
    (list || []).forEach(function (w) {
      if (w && w.id != null) (g[w.j + "\u0000" + w.p] = g[w.j + "\u0000" + w.p] || []).push(w);
    });
    Object.keys(g).forEach(function (k) {
      var a = g[k];
      if (a.length < 2) return;
      var head = a.map(function (w) { return String(w.w).charAt(0); });
      if (allDifferent(head.map(function (c) { return c.toLowerCase(); }))) {
        a.forEach(function (w, i) { HINT[w.id] = head[i] + " ではじまる"; });
        return;
      }
      var len = a.map(function (w) { return letters(w.w); });
      if (a.length === 2 && Math.abs(len[0] - len[1]) >= LONG_ENOUGH) {
        a.forEach(function (w, i) {
          HINT[w.id] = head[i] + " ではじまる・" + (len[i] < len[1 - i] ? "短いほう" : "長いほう");
        });
        return;
      }
      a.forEach(function (w) {
        TWIN[w.id] = a.filter(function (x) { return x !== w; }).map(function (x) { return x.w; });
      });
    });
    return { hint: HINT, twin: TWIN };
  }
  /* WORDS はこのファイルより後に読みこまれるので、最初に使うときに組み立てる。 */
  function ready() { if (!HINT) buildHints(global.WORDS || []); }
  function hintOf(w) { ready(); return (w && w.id != null && HINT[w.id]) || ""; }
  /* 出題に出す日本語。手がかりがあるときだけ（　）を前につける。 */
  function promptOf(w) {
    if (!w) return "";
    var h = hintOf(w);
    return (h ? "（" + h + "）" : "") + (w.j || w.w || "");
  }

  function hit(n, w) {
    var a = acceptable(w);
    if (a.set[n]) return true;
    for (var i = 0; i < a.res.length; i++) if (a.res[i].test(n)) return true;
    return false;
  }
  function judge(input, w) {
    var n = normalizeAnswer(input);
    if (!n) return false;
    if (hit(n, w)) return true;
    // 見分けようのない相手（have to / has to など）は、相手の綴りも正解にする
    ready();
    var tw = (w && w.id != null && TWIN[w.id]) || [];
    for (var k = 0; k < tw.length; k++) if (hit(n, tw[k])) return true;
    return false;
  }

  global.WordJudge = { normalizeAnswer: normalizeAnswer, acceptable: acceptable, judge: judge,
                       buildHints: buildHints, hintOf: hintOf, promptOf: promptOf,
                       twinsOf: function (w) { ready(); return (w && w.id != null && TWIN[w.id]) || []; } };
})(typeof window !== "undefined" ? window : globalThis);
