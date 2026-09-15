/* mastery/mastery.js ─ 2000語 到達度テスト（ノンストップ）
 *
 * 100語×20セット＝1周。時間制限なし。1コマで終わらなくてよく、次にゲートが開いたら
 * 「続きのセット」から再開する。どこまで行ったかの正はサーバー（スプレッドシート）で、
 * 端末の記録は保険でしかない（端末を変えても、キャッシュを消しても戻れるようにするため）。
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

  var EXAM = "m2000", VER = "mastery 0.1";
  var SET_SIZE = 100, SETS = 20;
  var RETRY_CAP = 30;     // セット末にもう一度出す上限。パスした語は出さない（捨てた語なので）
  var LS = "mastery_v1";

  var GAS_LIVE = "https://script.google.com/macros/s/AKfycbzJ2HThmRaf6Okkj682KOlxULwv_uQEtrdwbxCFyqOB5w8yKHa5bRpB9VTCEU3R2bCt/exec";
  var GAS_URL = window.SITE ? SITE.gasFor("summary", GAS_LIVE) : GAS_LIVE;

  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[<>&]/g, function (c) {
    return c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"; }); };
  var han = function (s) { return String(s || "").replace(/[０-９]/g, function (d) {
    return String.fromCharCode(d.charCodeAt(0) - 65248); }).replace(/[^0-9]/g, ""); };

  var WORDS = window.WORDS || [];
  function setWords(n) { return WORDS.slice((n - 1) * SET_SIZE, n * SET_SIZE); }

  /* ---------- 端末の控え ---------- */
  function load() { try { return JSON.parse(localStorage.getItem(LS) || "{}"); } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(LS, JSON.stringify(o)); } catch (e) {} }

  /* ---------- 通信 ---------- */
  function post(obj) {
    if (!GAS_URL) return Promise.reject(new Error("送信先が未設定です"));
    if (window.SITE) SITE.tag(obj);
    return fetch(GAS_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(obj) }).then(function (r) { return r.json(); });
  }

  /* ---------- 状態 ---------- */
  var session = "", open = false, submitted = false;
  var pos = { round: 1, set: 1 };          // 次にやるセット
  var doneSets = {};                       // "周-セット" → {correct, sec, cpm}
  var run = null;                          // いま走っているセット

  /* ---------- 受付（ゲート） ---------- */
  function idOK() { return $("f_cls").value.trim() && han($("f_num").value); }
  function setGateView() {
    var b = $("gateBadge"), m = $("gateMsg");
    if (!open) {
      b.className = "badge lock"; b.textContent = "🔒 受付していません";
      m.textContent = "先生が受付を開けるまで待ってね。";
    } else if (!idOK()) {
      b.className = "badge open"; b.textContent = "✅ 受付中";
      m.textContent = "学年と番号を入れると始められます。";
    } else {
      b.className = "badge open"; b.textContent = "✅ 受付中";
      m.textContent = "";
    }
    renderBar();
  }
  function poll() {
    post({ action: "status", exam: EXAM }).then(function (st) {
      if (st && st.result === "ok") {
        var was = open;
        session = st.session || ""; open = !!st.open;
        setGateView();
        if (open && !was) fetchProgress();
      }
    }).catch(function () {});
  }

  /* ---------- 続きの位置 ---------- */
  function fetchProgress() {
    if (!idOK()) return;
    var cls = $("f_cls").value.trim(), num = han($("f_num").value);
    post({ action: "progress", exam: EXAM, cls: cls, num: num }).then(function (r) {
      if (!r || r.result !== "ok") return;
      doneSets = r.sets || {};
      // 端末の控えと食いちがったら「進んでいるほう」を採る（生徒が損しない側に倒す）
      var st = load()[EXAM] || {};
      var srv = (r.round - 1) * SETS + r.set;
      var loc = st.round ? (st.round - 1) * SETS + st.set : 0;
      var n = Math.max(1, srv, loc);
      pos = { round: Math.floor((n - 1) / SETS) + 1, set: ((n - 1) % SETS) + 1 };
      showHome();
    }).catch(function () {
      var st = load()[EXAM]; if (st && st.round) { pos = { round: st.round, set: st.set }; }
      showHome();
    });
  }

  /* ---------- 画面の出しわけ ---------- */
  function show(which) {
    ["listCard", "testCard", "doneCard"].forEach(function (id) { $(id).classList.add("hide"); });
    if (which) $(which).classList.remove("hide");
  }
  function renderBar() {
    var html = "";
    for (var i = 1; i <= SETS; i++) {
      var k = pos.round + "-" + i;
      var cls = doneSets[k] ? "done" : (i === pos.set ? "now" : "");
      html += '<i class="' + cls + '">' + i + "</i>";
    }
    $("setBar").innerHTML = html;
    var n = 0, c = 0;
    for (var kk in doneSets) { n++; c += doneSets[kk].correct || 0; }
    $("progMsg").innerHTML = open
      ? (pos.round + "周目・つぎは セット" + pos.set + "　／　これまで " + n + "セット・" + c + "語")
      : "　";
  }
  function showHome() { show(null); renderBar(); if (open && idOK()) showList(); }

  /* ---------- 一覧（おぼえてからテスト） ---------- */
  function showList() {
    var ws = setWords(pos.set);
    $("listTitle").textContent = pos.round + "周目　セット" + pos.set + "（" +
      ((pos.set - 1) * SET_SIZE + 1) + "〜" + (pos.set * SET_SIZE) + "語目）";
    $("listBody").innerHTML = ws.map(function (w) {
      return "<div><span>" + esc(w.j) + "</span><b>" + esc(w.w) + "</b></div>";
    }).join("");
    show("listCard");
  }

  /* ---------- セット本番 ---------- */
  function startSet() {
    var ws = setWords(pos.set).slice();
    run = { queue: ws.map(function (w) { return { w: w, retry: false }; }),
            i: 0, ok: {}, missed: [], passed: [], asked: 0, t0: 0, retried: false };
    show("testCard");
    $("prevBox").innerHTML = "　";
    draw();
  }
  function cur() { return run.queue[run.i]; }
  function draw() {
    var it = cur();
    if (!it) return finishSet();
    $("qPos").textContent = it.w.p + (it.retry ? "　🔄 もう一度" : "");
    $("qJa").textContent = it.w.j;
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
    if (!run.t0) run.t0 = Date.now();          // 時間は最初の1打から数える（一覧を見た時間は入れない）
    run.asked++;
    var typed = String(raw || "").trim();
    var ok = typed && window.WordJudge.judge(typed, it.w);
    if (ok) {
      run.ok[it.w.id] = 1;
      $("prevBox").innerHTML = '<span class="mk ok">○</span> <span class="en">' + esc(it.w.w) + "</span>";
    } else {
      if (!typed) run.passed.push(it.w);
      else if (!it.retry && run.missed.length < RETRY_CAP) run.missed.push(it.w);
      $("prevBox").innerHTML = '<span class="mk ng">' + (typed ? "✕" : "パス") + '</span> ' +
        esc(it.w.j) + " ＝ <span class=\"en\">" + esc(it.w.w) + "</span>";
    }
    run.i++;
    // 100語ぶん終わったら、まちがえた語だけもう一度（パスした語は出さない＝捨てた語なので）
    if (run.i >= run.queue.length && !run.retried && run.missed.length) {
      run.retried = true;
      run.missed.forEach(function (w) { if (!run.ok[w.id]) run.queue.push({ w: w, retry: true }); });
    }
    draw();
  }

  /* ---------- セットの終わり ---------- */
  function finishSet() {
    var sec = run.t0 ? Math.round((Date.now() - run.t0) / 1000) : 0;
    var correct = Object.keys(run.ok).length;
    var cpm = sec > 0 ? Math.round(correct / (sec / 60) * 10) / 10 : 0;
    var key = pos.round + "-" + pos.set;
    doneSets[key] = { correct: correct, sec: sec, cpm: cpm };

    var st = load(); st[EXAM] = st[EXAM] || {};
    var nx = pos.set >= SETS ? { round: pos.round + 1, set: 1 } : { round: pos.round, set: pos.set + 1 };
    st[EXAM].round = nx.round; st[EXAM].set = nx.set;
    st[EXAM].sets = st[EXAM].sets || {}; st[EXAM].sets[key] = doneSets[key];
    save(st);

    $("doneTitle").textContent = pos.round + "周目　セット" + pos.set + " おわり";
    $("doneScore").textContent = correct + " / " + SET_SIZE;
    var prev = (load()[EXAM].sets || {})[(pos.round - 1) + "-" + pos.set];
    $("doneSub").innerHTML = "かかった時間 " + Math.floor(sec / 60) + "分" + (sec % 60) + "秒　／　" +
      "<b>CPM " + cpm + "</b>" +
      (prev ? "（前の周は " + prev.correct + "語・CPM " + prev.cpm + "）" : "") +
      "　／　パス " + run.passed.length + "語";
    var miss = setWords(pos.set).filter(function (w) { return !run.ok[w.id]; });
    $("missWrap").classList.toggle("hide", !miss.length);
    $("missBody").innerHTML = miss.map(function (w) {
      return "<div><span>" + esc(w.j) + "</span><b>" + esc(w.w) + "</b></div>"; }).join("");
    $("nextSet").textContent = pos.set >= SETS ? "次の周へ →" : "次のセットへ →";
    show("doneCard");

    sendSet(pos.round, pos.set, correct, run.asked, sec);
    pos = nx;
  }

  /* ---------- 送信（届かなくても止めない） ---------- */
  function pending() { var o = load(); return o.__pending || []; }
  function setPending(a) { var o = load(); o.__pending = a; save(o); }
  function sendSet(round, set, correct, asked, sec) {
    var body = { kind: "mastery", exam: EXAM, session: session, ver: VER,
      cls: $("f_cls").value.trim(), num: han($("f_num").value), name: $("f_name").value.trim(),
      round: round, set: set, correct: correct, asked: asked, sec: sec };
    var q = pending().concat([body]);
    setPending(q);
    $("sendMsg").textContent = "記録を送っています…";
    flush();
  }
  function flush() {
    var q = pending();
    if (!q.length) { $("sendMsg").textContent = "記録しました ✓"; return; }
    var head = q[0];
    post(head).then(function (r) {
      if (r && (r.result === "ok" || r.result === "dup")) {
        setPending(pending().slice(1));
        flush();
      } else {
        $("sendMsg").textContent = "まだ届いていません（" + ((r && r.message) || "?") + "）。次のセットのときに送り直します。";
      }
    }).catch(function () {
      $("sendMsg").textContent = "いま送れませんでした。記録は端末に残してあるので、次のセットのときに送り直します。";
    });
  }

  /* ---------- つなぎ ---------- */
  $("ansIn").addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    answer(this.value);
  });
  $("startSet").addEventListener("click", startSet);
  $("backHome").addEventListener("click", function () { show(null); });
  $("quitSet").addEventListener("click", function () {
    if (!confirm("このセットをやめると、ここまでの答えは記録されません。やめますか？")) return;
    run = null; show(null);
  });
  $("nextSet").addEventListener("click", function () { renderBar(); showList(); });
  $("toHome").addEventListener("click", function () { show(null); renderBar(); });

  ["f_cls", "f_num", "f_name"].forEach(function (id) {
    $(id).addEventListener("change", function () {
      if (id === "f_num") this.value = han(this.value);
      try {
        localStorage.setItem("mado_year", $("f_cls").value);
        localStorage.setItem("mado_num", han($("f_num").value));
        localStorage.setItem("mado_name", $("f_name").value.trim());
      } catch (e) {}
      setGateView();
      if (idOK()) fetchProgress();
    });
  });

  /* ---------- 起動 ---------- */
  try {
    $("f_cls").value = localStorage.getItem("mado_year") || "";
    $("f_num").value = han(localStorage.getItem("mado_num") || "");
    $("f_name").value = localStorage.getItem("mado_name") || "";
  } catch (e) {}
  var st0 = load()[EXAM];
  if (st0 && st0.round) { pos = { round: st0.round, set: st0.set }; doneSets = st0.sets || {}; }
  setGateView();
  poll(); setInterval(poll, 5000);
  window.MASTERY = { setWords: setWords, SET_SIZE: SET_SIZE, SETS: SETS };  // テスト用
})();
