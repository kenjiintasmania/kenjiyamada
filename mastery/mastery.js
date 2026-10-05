/* mastery/mastery.js ─ 到達度テスト（打って答える・ノンストップ）
 *
 * 受付・続きの位置・帯・記録の送信は ../assets/masterycore.js（全文法と共通）。
 * このファイルが持つのは「一覧の出しかた」と「打って答える出題の回しかた」だけ。
 *
 * ★2つの画面がこの1本を読む（写しを置かない）：
 *   index.html … 2000語（100語×20セット・words.js）＝試験ID m2000  ※この下の既定
 *   idiom.html … 熟語200語（20連語×10セット・data/idioms.js）＝試験ID midiom
 *                idiom.html は window.MASTERY_CFG を置いてからこのファイルを読む。
 *
 * 入力はノンストップ用：
 *   ・打って Enter → 正解ならそのまま次へ（止めない）
 *   ・何も打たずに Enter → パス（分からない語はアッサリ捨てる）
 *   ・まちがえても止めない。正解は「直前」の欄に出しておく（読むのは任意）
 *   ・フォーカスは入力欄から動かさない
 * ふだんの単語アプリ（words/）は「○✕を見てから次へ」で、あちらはそのまま。
 *
 * 採点は ../assets/wordjudge.js（単語アプリとまったく同じものさし）。
 */
(function () {
  "use strict";

  /* 出題のもと。既定は 2000語。 all()＝手がかり（同じ訳の語の見分け）を組むための全語、
     setOf(n)＝セット n の語、tipOf(n)＝帯と一覧の見出し、posOf(w)＝出題の上に出す小さな札 */
  var CFG = window.MASTERY_CFG || {
    exam: "m2000", ver: "mastery 0.7", sets: 20, perSet: 100, unitName: "セット", unitWord: "語",
    all: function () { return window.WORDS || []; },
    setOf: function (n) { return (window.WORDS || []).slice((n - 1) * 100, n * 100); },
    tipOf: function (n) { return "セット" + n + "（" + ((n - 1) * 100 + 1) + "〜" + (n * 100) + "語目）"; },
    posOf: function (w) { return w.p; },
    emptyMsg: "単語が読みこめませんでした。ページを開きなおしてください。"
  };
  var SET_SIZE = CFG.perSet, SETS = CFG.sets;
  var RETRY_CAP = 30;     // セット末にもう一度出す上限。パスした語は出さない（捨てた語なので）

  var $ = function (id) { return document.getElementById(id); };
  function setWords(n) { return CFG.setOf(n) || []; }
  /* 手がかり（「w ではじまる」）は、この画面の出題リスト全体から組む。
     2000語は WORDS から自動で組まれるが、熟語の画面では WORDS を読まないので、ここで明示する。 */
  window.WordJudge.buildHints(CFG.all() || []);

  var run = null;

  var core = window.MasteryCore.create({
    exam: CFG.exam, ver: CFG.ver, sets: SETS, perSet: SET_SIZE,
    unitName: CFG.unitName || "セット", unitWord: CFG.unitWord || "語",
    gas: "https://script.google.com/macros/s/AKfycbzJ2HThmRaf6Okkj682KOlxULwv_uQEtrdwbxCFyqOB5w8yKHa5bRpB9VTCEU3R2bCt/exec",
    tipOf: CFG.tipOf,

    renderList: function (set, info) {
      $("listTitle").textContent = CFG.tipOf(set) + "　" +
        (info.attempts ? (info.attempts + 1) + "回目　これまでの最高 " + info.best + "語" : "はじめて");
      $("listBody").innerHTML = setWords(set).map(function (w) {
        return "<div><span>" + core.esc(w.j) + "</span><b>" + core.esc(w.w) + "</b></div>";
      }).join("");
    },

    startRun: function (set, round) {
      /* 単語データ（words.js）が読みこめていないと、100語のはずが0語になり、
         始めた瞬間に「0 / 100」で記録されてしまう（実データに 0問・0秒 の回が6件）。
         記録せずに止めて、ページを開きなおしてもらう。 */
      if (!setWords(set).length) {
        run = null;
        $("qPos").textContent = "";
        $("qJa").textContent = CFG.emptyMsg || "出題が読みこめませんでした。ページを開きなおしてください。";
        $("ansIn").disabled = true;
        return;
      }
      run = { set: set, round: round,
              queue: setWords(set).map(function (w) { return { w: w, retry: false }; }),
              i: 0, ok: {}, missed: [], passed: [], asked: 0, t0: 0, retried: false };
      $("prevBox").innerHTML = "　";
      draw();
    },
    abortRun: function () { run = null; }
  });

  /* ---------- 出題 ---------- */
  function cur() { return run && run.queue[run.i]; }
  function draw() {
    var it = cur();
    if (!it) return done();
    $("qPos").textContent = (CFG.posOf ? CFG.posOf(it.w) : it.w.p) + (it.retry ? "　🔄 もう一度" : "");
    $("qJa").textContent = window.WordJudge.promptOf(it.w);   // 同じ訳が複数あれば手がかりつき
    $("ansIn").value = "";
    $("mLeft").textContent = run.queue.length - run.i;
    $("mOk").textContent = Object.keys(run.ok).length;
    $("mCpm").textContent = cpmNow();
    $("ansIn").focus();
  }
  function cpmNow() {
    if (!run.t0) return "–";
    var sec = (Date.now() - run.t0) / 1000;
    if (sec < 3) return "–";
    return Math.round(Object.keys(run.ok).length / (sec / 60));
  }
  function answer(raw) {
    var it = cur(); if (!it) return;
    if (!run.t0) run.t0 = Date.now();      // 時間は最初の1打から（一覧を見た時間は入れない）
    run.asked++;
    var typed = String(raw || "").trim();
    if (typed && window.WordJudge.judge(typed, it.w)) {
      run.ok[it.w.id] = 1;
      $("prevBox").innerHTML = '<span class="mk ok">○</span> <span class="en">' + core.esc(it.w.w) + "</span>";
    } else {
      if (!typed) run.passed.push(it.w);
      else if (!it.retry && run.missed.length < RETRY_CAP) run.missed.push(it.w);
      $("prevBox").innerHTML = '<span class="mk ng">' + (typed ? "✕" : "パス") + "</span> " +
        core.esc(it.w.j) + ' ＝ <span class="en">' + core.esc(it.w.w) + "</span>";
    }
    run.i++;
    // セットぶん終わったら、まちがえた語だけもう一度（パスした語は出さない＝捨てた語なので）
    if (run.i >= run.queue.length && !run.retried && run.missed.length) {
      run.retried = true;
      run.missed.forEach(function (w) { if (!run.ok[w.id]) run.queue.push({ w: w, retry: true }); });
    }
    draw();
  }
  function done() {
    var sec = run.t0 ? Math.round((Date.now() - run.t0) / 1000) : 0;
    var correct = Object.keys(run.ok).length;
    var miss = setWords(run.set).filter(function (w) { return !run.ok[w.id]; });
    $("missWrap").classList.toggle("hide", !miss.length);
    $("missBody").innerHTML = miss.map(function (w) {
      return "<div><span>" + core.esc(w.j) + "</span><b>" + core.esc(w.w) + "</b></div>"; }).join("");
    core.finish(run.set, run.round,
      { correct: correct, asked: run.asked, sec: sec, max: SET_SIZE,
        note: "パス " + run.passed.length + "語" });
    run = null;
  }

  $("ansIn").addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    /* 押しっぱなしの Enter（キーリピート）は数えない。実データに「100問を2秒・0点」の回が
       いくつもあった＝Enter を押しっぱなしにしてセットを丸ごと飛ばしている。
       それでも1回として数えられ、何回目が進んでしまう。1回ずつ押すパスはこれまでどおり。 */
    if (e.repeat) return;
    answer(this.value);
  });
})();
