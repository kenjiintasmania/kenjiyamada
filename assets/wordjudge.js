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
   * 「話す」は talk / speak / tell、「すばらしい」は wonderful / fantastic / great / golden。
   * 生徒はどれを打てばよいか決めようがない（2026-09 先生報告）。2000語中70語がこれ。
   *
   * ★訳の文字列が同じものだけを見ていては足りない（最初そうして取りこぼした）。
   *   「話す」と「話す、教える、伝える」は別の文字列だが、生徒から見れば同じ意味を含む。
   *   訳を「、」「・」などで意味に割り、意味の重なりで見る。
   *     ・（　）の中は残す … 「…です（Iのとき）」「（3人称単数が）…」は生徒が読む手がかり
   *     ・「…を」「…に」は落とす … talk と speak を別ものにしてしまうため
   *
   * ★相手は「その出題を見たとき答えになりうる語」＝**Aの意味をぜんぶ含む**同じ品詞の語。
   *   talk「話す」 の相手は speak と tell。
   *   逆に tell「話す、教える、伝える」 には手がかりを出さない。3つぜんぶを含む語が
   *   他に無い＝訳を読めば tell だと分かるため。よけいな手がかりでやさしくしない。
   *
   * 手がかりは、その語が相手と区別できる**いちばん軽いもの**を選ぶ：
   *   ① 頭1字        →「w ではじまる」
   *   ② 頭1字＋文字数 →「g ではじまる・5文字」（great と golden）
   *   ③ 頭2字        →「ta ではじまる」（talk と tell）
   *   ④ どれもだめ    → 手がかりを出さず、**相手の綴りも正解にする**
   * ★文字数は1語のときだけ使う（連語だと空白を数えるのか分からないため）。
   * ★手がかりは訳の前に（　）で足すだけで、データ（words.js）はさわらない。
   */
  var HINT = null, TWIN = null;

  /* ★区切りで切るのは（　）の外だけ。中は意味の並びではなく説明なので切ってはいけない。
     例）accessory「（車・カメラ・機械類の）付属品」を切ると "カメラ" が意味になってしまい、
         camera と同じ意味を持つことになる（実際に誤検出した）。 */
  function senses(j) {
    var src = String(j == null ? "" : j), out = [], cur = "", depth = 0;
    for (var i = 0; i < src.length; i++) {
      var c = src.charAt(i);
      if (c === "（" || c === "(" || c === "［" || c === "[") depth++;
      else if (c === "）" || c === ")" || c === "］" || c === "]") depth = Math.max(0, depth - 1);
      if (depth === 0 && "、，,・/／".indexOf(c) >= 0) { out.push(cur); cur = ""; continue; }
      cur += c;
    }
    out.push(cur);
    return out.map(function (t) {
      return t.replace(/^[…．.～〜\s]*/, "").replace(/[…．.～〜\s]*$/, "")
              .replace(/^[をにがへと]/, "").trim();
    }).filter(function (t) { return t.length > 0; });
  }
  function letters(s) { return String(s).replace(/[^A-Za-z]/g, "").length; }
  function oneWord(s) { return !/\s/.test(String(s).trim()); }

  function buildHints(list) {
    HINT = {}; TWIN = {};
    var S = {}, byPos = {};                 // byPos[品詞][意味] = [語…]
    (list || []).forEach(function (w) { if (w && w.id != null) S[w.id] = senses(w.j); });
    (list || []).forEach(function (w) {
      if (!S[w.id]) return;
      var m = byPos[w.p] = byPos[w.p] || {};
      S[w.id].forEach(function (t) { (m[t] = m[t] || []).push(w); });
    });
    (list || []).forEach(function (a) {
      var sa = S[a.id]; if (!sa || !sa.length) return;
      // 相手＝aの意味をぜんぶ持つ同じ品詞の語。ひとつめの意味で絞ってから確かめる。
      var pool = (byPos[a.p] || {})[sa[0]] || [];
      var others = pool.filter(function (b) {
        return b.id !== a.id && sa.every(function (t) { return S[b.id].indexOf(t) >= 0; });
      });
      if (!others.length) return;
      // その語だけを言いあてられる、いちばん軽い手がかりをえらぶ
      function tells(f) {
        var v = f(a);
        return others.every(function (b) { return f(b) !== v; });
      }
      var pre  = function (n) { return function (w) { return String(w.w).slice(0, n).toLowerCase(); }; };
      var preL = function (n) { return function (w) { return pre(n)(w) + " " + letters(w.w); }; };
      var head = function (n) { return String(a.w).slice(0, n); };
      var solo = oneWord(a.w);
      if (tells(pre(1)))                  HINT[a.id] = head(1) + " ではじまる";
      else if (solo && tells(preL(1)))    HINT[a.id] = head(1) + " ではじまる・" + letters(a.w) + "文字";
      else if (tells(pre(2)))             HINT[a.id] = head(2) + " ではじまる";
      else if (solo && tells(preL(2)))    HINT[a.id] = head(2) + " ではじまる・" + letters(a.w) + "文字";
      else TWIN[a.id] = others.map(function (b) { return b.w; });
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
                       buildHints: buildHints, hintOf: hintOf, promptOf: promptOf, senses: senses,
                       twinsOf: function (w) { ready(); return (w && w.id != null && TWIN[w.id]) || []; } };
})(typeof window !== "undefined" ? window : globalThis);
