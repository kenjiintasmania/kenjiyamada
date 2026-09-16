/* assets/gojuncore.js ─ 語順（箱に入れる）の共通部分
 *
 * 使う側は2つ：
 *   gojun/          … ふだんの語順文法テスト（項目をえらんで5文）
 *   mastery/gram.*  … 全文法 到達度テスト（31項目を通しで・ロックつき）
 *
 * ★写さずに1か所へ置く理由：このリポジトリは「同じものさしの写しが少しずつ食いちがう」
 *   事故を何度も起こしている。判定（norm/same）と選択肢の作りかたが2つの画面でずれると、
 *   同じ文なのに片方だけ×になる。ここ1本にまとめる。
 *
 * 持っているもの：
 *   ・全角と半角をそろえる／アポストロフィを消す判定（4レーン共通のものさし）
 *   ・枠の決め方（文 ＞ 項目 ＞ 既定）
 *   ・えらぶモードの選択肢づくり（項目の5文＋extra から、文ごとに固定の並びで5つ）
 *   ・箱の採点（1つでも外したら0点＝部分点なし）
 * 持たないもの：画面の見た目、記録、送信。
 */
(function (global) {
  "use strict";

  /* 全角で打っても半角と同じものとして見る。※学年・番号欄の han()（数字だけ残す）とは別物。 */
  function zenhan(s) {
    return String(s == null ? "" : s)
      .replace(/[！-～]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 65248); })
      .replace(/　/g, " ");
  }
  /* アポストロフィは消す（自学の他レーンと同じ）。don't も dont も同じ答えとして見る。 */
  function norm(s) {
    return zenhan(s).toLowerCase().replace(/['’]/g, "")
      .replace(/[.,!?;:"“”]/g, " ").replace(/\s+/g, " ").trim();
  }
  function same(a, b) { return norm(a) === norm(b); }

  /* 枠は 文 ＞ 項目 ＞ 既定 の順で決まる。
     ・項目ごと … 比較級・It for to・関係代名詞は7つの箱では測れないので自前の枠を持つ
     ・文ごと  … 実践編は1問ずつ形が変わる（疑問文のときだけ 助動詞／＝ が主語の前に出る） */
  function slotsOf(G, item, sent) { return (sent && sent.slots) || (item && item.slots) || G.slots; }

  /* その項目の5文から、同じ箱の答えを集めて候補にする。足りないぶんは extra から。 */
  function poolOf(item, slotKey) {
    var seen = {}, out = [];
    item.sents.forEach(function (s) {
      var v = (s.fill[slotKey] || {}).en || "";
      if (v && !seen[v.toLowerCase()]) { seen[v.toLowerCase()] = 1; out.push(v); }
    });
    ((item.extra || {})[slotKey] || []).forEach(function (v) {
      if (v && !seen[v.toLowerCase()]) { seen[v.toLowerCase()] = 1; out.push(v); }
    });
    return out;
  }
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = (h * 16777619) >>> 0; }
    return h;
  }
  /* 並びは文ごとに固定（見るたびに入れかわると、選び直すときに混乱するため）。 */
  function choicesFor(item, si, slotKey, answer) {
    var pool = poolOf(item, slotKey).filter(function (v) { return !same(v, answer); });
    var seed = hash(item.key + "|" + si + "|" + slotKey), out = [answer];
    var idx = []; pool.forEach(function (_, i) { idx.push(i); });
    while (out.length < 5 && idx.length) {
      seed = (seed * 1103515245 + 12345) >>> 0;
      out.push(pool[idx.splice(seed % idx.length, 1)[0]]);
    }
    for (var i = out.length - 1; i > 0; i--) {
      seed = (seed * 1103515245 + 12345) >>> 0;
      var j = seed % (i + 1), t = out[i]; out[i] = out[j]; out[j] = t;
    }
    return out;
  }

  /* 箱の採点。1つでも外したら0点（部分点なし）＝「左から読むと英文になる」を教えているため。
     戻り：{ok, miss:[{key,label,mine,ans}]} */
  function gradeSlots(G, item, sent, answers, skipped) {
    var miss = [], all = true;
    slotsOf(G, item, sent).forEach(function (sl) {
      var f = sent.fill[sl.k] || { en: "" };
      if (!f.en) return;                                   // 使わない箱は採点しない
      var v = String((answers || {})[sl.k] || "").trim();
      var okv = !skipped && v && same(v, f.en);
      if (!okv) { all = false; miss.push({ key: sl.k, label: sl.label, mine: v, ans: f.en }); }
    });
    if (skipped) all = false;
    return { ok: all, miss: miss };
  }

  global.GojunCore = {
    zenhan: zenhan, norm: norm, same: same,
    slotsOf: slotsOf, poolOf: poolOf, choicesFor: choicesFor, gradeSlots: gradeSlots
  };
})(typeof window !== "undefined" ? window : globalThis);
