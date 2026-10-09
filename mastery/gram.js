/* mastery/gram.js ─ 全文法 到達度テスト（33項目 × 5文）
 *
 * 受付・続きの位置・帯・記録の送信は ../assets/masterycore.js（2000語と共通）。
 * 判定と選択肢の作りは ../assets/gojuncore.js（語順文法テストと共通）。
 * このファイルが持つのは「項目のはじめの見せかた」と「5文の回しかた」だけ。
 *
 * ★2つの画面がこの1本を読む（写しを置かない）：
 *   gram.html  … えらぶ（ドロップダウン）＝試験ID mgram  ※この下の既定
 *   gram2.html … 上級編＝自分で打つ        ＝試験ID mgram2（先生の指示 2026-10-05
 *                「全文法テストの上級編として自力で入力するパターンも設置して」）
 *   gram2.html は window.GRAM_CFG を置いてからこのファイルを読む。
 *
 * ・1文＝完答で1点（部分点なし）。正解なら止めずに次へ、まちがえたら正解を見せて止まる
 * ・解説はたたんでおく（自学で終わっている子には邪魔なので、開きたい子だけ開く）
 * ・打つモードの判定は GojunCore.gradeSlots（全角→半角・大文字小文字・アポストロフィ・
 *   文末の記号を見ない）＝語順文法テストの「じぶんで打つ」とまったく同じものさし
 */
(function () {
  "use strict";

  var CFG = window.GRAM_CFG || { exam: "mgram", ver: "gram 0.5", mode: "select" };
  var TYPE = CFG.mode === "type";               // 上級編＝打つ

  var G = window.GOJUN, C = window.GojunCore;
  var ITEMS = G.items, SETS = ITEMS.length;      // 33項目（2026-10-09 に 疑問詞の疑問文・help＋人＋原形 を末尾に追加）
  var PER = 5;                                   // 1項目 5文

  var $ = function (id) { return document.getElementById(id); };
  var run = null;

  var core = window.MasteryCore.create({
    exam: CFG.exam, ver: CFG.ver, sets: SETS, perSet: PER,
    unitName: "項目", unitWord: "文",
    gas: "https://script.google.com/macros/s/AKfycbzJ2HThmRaf6Okkj682KOlxULwv_uQEtrdwbxCFyqOB5w8yKHa5bRpB9VTCEU3R2bCt/exec",
    tipOf: function (i) { return ITEMS[i - 1].emoji + " " + ITEMS[i - 1].title; },
    tileOf: function (i) { return i; },

    renderList: function (set, info) {
      var it = ITEMS[set - 1];
      $("listTitle").textContent = it.emoji + " " + it.title + "　" +
        (info.attempts ? (info.attempts + 1) + "回目　これまでの最高 " + info.best + "文" : "はじめて");
      $("leadBody").innerHTML = it.lead || "";
      $("leadBox").open = false;                 // 毎回たたんだ状態から
      $("listBody").innerHTML = it.sents.map(function (s, i) {
        return "<div>" + (i + 1) + "　" + core.esc(s.ja) +
          (s.from ? '　<span class="note">（もとの文 <b>' + core.esc(s.from) + "</b>）</span>" : "") +
          "</div>";
      }).join("");
    },

    startRun: function (set, round) {
      run = { set: set, round: round, it: ITEMS[set - 1], i: 0, ok: 0,
              asked: 0, t0: 0, answered: false, miss: [] };
      draw();
    },
    abortRun: function () { run = null; }
  });

  /* ---------- 出題 ---------- */
  function inputFor(it, si, sl, f) {
    if (TYPE) {
      /* 上級編：箱に英語を自分で打つ（語順文法テストの「じぶんで打つ」と同じ入力欄） */
      return '<input type="text" data-in="' + sl.k + '" class="en" placeholder="英語" autocomplete="off" ' +
             'autocapitalize="off" autocorrect="off" spellcheck="false">';
    }
    var cs = C.choicesFor(it, si, sl.k, f.en);
    return '<select data-in="' + sl.k + '"><option value="">えらぶ</option>' +
      cs.map(function (c) { return "<option>" + core.esc(c) + "</option>"; }).join("") + "</select>";
  }
  function draw() {
    if (!run || run.i >= PER) return done();
    var it = run.it, s = it.sents[run.i];
    run.answered = false;
    $("qTag").textContent = it.emoji + " " + it.title + (s.tag ? "　" + s.tag : "");
    $("qProg").textContent = "第 " + (run.i + 1) + " 文 / " + PER;
    $("qJa").textContent = s.ja;
    $("qFrom").innerHTML = s.from ? ('もとの文 → <span class="en">' + core.esc(s.from) + "</span>") : "";
    $("qFrom").classList.toggle("hide", !s.from);
    $("qVerdict").innerHTML = "";
    $("qCheck").classList.remove("hide"); $("qNext").classList.add("hide");
    $("qSkip").disabled = false;
    $("qFrame").innerHTML = C.slotsOf(G, it, s).map(function (sl) {
      var f = s.fill[sl.k] || { ja: "（なし）", en: "" };
      var head = '<span class="bh">' + core.esc(sl.label) + "</span>" +
        (sl.q ? '<div class="bq">' + core.esc(sl.q) + "</div>" : '<div class="bq">&nbsp;</div>') +
        '<div class="bj">' + core.esc(f.ja) + "</div>";
      if (!f.en) return '<div class="box empty" data-k="' + sl.k + '">' + head + '<div class="dash">—</div></div>';
      return '<div class="box" data-k="' + sl.k + '">' + head + inputFor(it, run.i, sl, f) + "</div>";
    }).join("");
    $("mLeft").textContent = PER - run.i;
    $("mOk").textContent = run.ok;
    $("mCpm").textContent = cpmNow();
    var first = $("qFrame").querySelector("[data-in]");
    if (first) first.focus();
  }
  function cpmNow() {
    if (!run.t0) return "–";
    var sec = (Date.now() - run.t0) / 1000;
    if (sec < 3) return "–";
    return Math.round(run.ok / (sec / 60) * 10) / 10;
  }
  function answers() {
    var o = {};
    $("qFrame").querySelectorAll("[data-in]").forEach(function (el) { o[el.getAttribute("data-in")] = el.value; });
    return o;
  }
  function check(skipped) {
    if (!run || run.answered) return;
    if (!run.t0) run.t0 = Date.now();       // 時計は最初の答え合わせから（解説を読む時間は入れない）
    run.answered = true; run.asked++;
    var it = run.it, s = it.sents[run.i];
    var r = C.gradeSlots(G, it, s, answers(), skipped);
    // 箱に○✕と正解を出す
    C.slotsOf(G, it, s).forEach(function (sl) {
      var f = s.fill[sl.k] || { en: "" }; if (!f.en) return;
      var box = $("qFrame").querySelector('.box[data-k="' + sl.k + '"]');
      var bad = r.miss.some(function (m) { return m.key === sl.k; });
      box.classList.add(bad ? "ng" : "ok");
      box.insertAdjacentHTML("afterbegin", '<span class="mark">' + (bad ? "×" : "○") + "</span>");
      if (bad) box.insertAdjacentHTML("beforeend", '<div class="right">' + core.esc(f.en) + "</div>");
      var el = box.querySelector("[data-in]"); if (el) el.disabled = true;
    });
    if (r.ok) run.ok++; else run.miss.push(s);
    $("qVerdict").innerHTML = '<div class="verdict ' + (r.ok ? "ok" : "ng") + '">' +
      (r.ok ? "○ 正解" : (skipped ? "— スキップ" : "× おしい")) +
      '　<span class="en">' + core.esc(s.en) + "</span></div>";
    $("mOk").textContent = run.ok;
    $("mCpm").textContent = cpmNow();
    $("qCheck").classList.add("hide"); $("qSkip").disabled = true;
    run.i++;
    // 正解なら止めない。まちがえた（スキップした）ときだけ、正解を読ませるために止まる。
    if (r.ok) { setTimeout(function () { if (run) draw(); }, 450); }
    else { $("qNext").classList.remove("hide"); $("qNext").focus(); }
  }
  function done() {
    var sec = run.t0 ? Math.round((Date.now() - run.t0) / 1000) : 0;
    $("missWrap").classList.toggle("hide", !run.miss.length);
    $("missBody").innerHTML = run.miss.map(function (s) {
      return "<div>" + core.esc(s.ja) + '　<b>' + core.esc(s.en) + "</b></div>"; }).join("");
    core.finish(run.set, run.round,
      { correct: run.ok, asked: run.asked, sec: sec, max: PER });
    run = null;
  }

  $("qCheck").addEventListener("click", function () { check(false); });
  $("qSkip").addEventListener("click", function () { check(true); });
  $("qNext").addEventListener("click", function () { draw(); });
  $("qFrame").addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (!run) return;
    if (run.answered) { draw(); return; }
    /* 打つモードの Enter は「次の空いている箱へ」。ぜんぶ埋まっていれば答え合わせ。
       （箱が7つあるのに最初の Enter で採点されると、残りが×になって当然の0点になる） */
    if (TYPE) {
      var ins = [].slice.call($("qFrame").querySelectorAll("input[data-in]")), i = ins.indexOf(e.target);
      for (var k = i + 1; k < ins.length; k++) if (!ins[k].value.trim()) { ins[k].focus(); return; }
      for (var j = 0; j < ins.length; j++) if (!ins[j].value.trim() && j !== i) { ins[j].focus(); return; }
    }
    check(false);
  });
})();
