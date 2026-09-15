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

  function judge(input, w) {
    var n = normalizeAnswer(input);
    if (!n) return false;
    var a = acceptable(w);
    if (a.set[n]) return true;
    for (var i = 0; i < a.res.length; i++) if (a.res[i].test(n)) return true;
    return false;
  }

  global.WordJudge = { normalizeAnswer: normalizeAnswer, acceptable: acceptable, judge: judge };
})(typeof window !== "undefined" ? window : globalThis);
