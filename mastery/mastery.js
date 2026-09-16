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
  /* ★セットは1→2→3と進むのが基本だが、生徒が自分で選べる（「1をもう一度やりたい」が多いため）。
     そのため「周回」は全体の周ではなく **そのセットの何回目か** を指す。
     サーバーは（試験・学年・番号・周回・セット）で二重送信を弾くので、
     セット1の2回目は「周回2・セット1」となり、ちゃんと別の記録として残る。 */
  var session = "", open = false, submitted = false;
  var pos = { set: 1 };                    // いま選んでいるセット
  /* ★生徒が自分でセットを選んだら、おすすめで上書きしない。
     番号欄にカーソルがある状態でタイルを押すと、離れた瞬間に change が飛んで
     進捗を取り直し、選んだセットがおすすめに戻されていた。 */
  var picked = false;
  var doneSets = {};                       // "回-セット" → {correct, sec, cpm}
  var run = null;                          // いま走っているセット

  function attemptsOf(set) {               // そのセットを何回やったか
    var n = 0;
    for (var k in doneSets) if (k.split("-")[1] === String(set)) n++;
    return n;
  }
  function bestOf(set) {                   // そのセットの最高正解数
    var b = null;
    for (var k in doneSets) if (k.split("-")[1] === String(set)) {
      var c = doneSets[k].correct || 0; if (b == null || c > b) b = c;
    }
    return b;
  }
  /* 既定のおすすめ＝いちばん回数の少ないセット（同数なら小さい番号）。
     まっさらなら 1→2→3…、20まで終えたら自然と1へ戻って2周目になる。 */
  function recommendNext() {
    var best = 1, bn = Infinity;
    for (var i = 1; i <= SETS; i++) { var n = attemptsOf(i); if (n < bn) { bn = n; best = i; } }
    return best;
  }

  /* ---------- 受付（ゲート） ---------- */
  function idOK() { return $("f_cls").value.trim() && han($("f_num").value); }
  function setGateView() {
    var b = $("gateBadge"), m = $("gateMsg");
    if (!open) {
      b.className = "badge lock"; b.textContent = "🔒 受付していません";
      // セット中に閉じられても、そのセットは最後までやらせる（書いたぶんを捨てない）。
      // 記録は端末に貯まり、次に開いたときに送られる。
      m.textContent = busy()
        ? "受付が閉じました。いまのセットは最後まで進められます。記録は次に開いたときに届きます。"
        : "先生が受付を開けるまで待ってね。";
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
        if (open && !was) {
          fetchProgress();
          // 受付が閉じている間に終えたセットは端末にひかえてある。開いたら送り直す。
          if (pending().length && idOK()) flush();
        }
      }
    }).catch(function () {});
  }

  /* ---------- 続きの位置 ---------- */
  function fetchProgress() {
    if (!idOK()) return;
    var cls = $("f_cls").value.trim(), num = han($("f_num").value);
    post({ action: "progress", exam: EXAM, cls: cls, num: num }).then(function (r) {
      if (!r || r.result !== "ok") return;
      // サーバーの記録に、端末の控えを重ねる（どちらかにしか無い回も拾う＝生徒が損しない側）
      doneSets = r.sets || {};
      var mine = (load()[EXAM] || {}).sets || {};
      for (var k in mine) if (!doneSets[k]) doneSets[k] = mine[k];
      if (!busy() && !picked) pos.set = recommendNext();
      showHome();
    }).catch(function () {
      var st = load()[EXAM];
      if (st && st.sets) { doneSets = st.sets; if (!busy() && !picked) pos.set = recommendNext(); }
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
      var n = attemptsOf(i), b = bestOf(i);
      var cls = (i === pos.set ? "now" : (n ? "done" : ""));
      var tip = "セット" + i + "（" + ((i - 1) * SET_SIZE + 1) + "〜" + (i * SET_SIZE) + "語目）" +
        (n ? "　" + n + "回・最高 " + b + "語" : "　まだ");
      html += '<button type="button" class="' + cls + '" data-set="' + i + '" title="' + esc(tip) + '">' +
              i + (n ? '<em>' + b + '</em>' : "") + "</button>";
    }
    /* ★中身が変わっていないときは描き直さない。5秒ごとのポーリングで毎回作り直すと、
       押そうとした瞬間にボタンが作り替えられて、タップが吸われる（実機でもテストでも起きた）。 */
    if ($("setBar").getAttribute("data-sig") !== html) {
      $("setBar").setAttribute("data-sig", html);
      $("setBar").innerHTML = html;
    }
    var done = 0, bestSum = 0;
    for (var i2 = 1; i2 <= SETS; i2++) { if (attemptsOf(i2)) { done++; bestSum += bestOf(i2); } }
    $("progMsg").innerHTML = open
      ? ("さわったセット " + done + " / " + SETS + "　／　最高点の合計 " + bestSum + "語" +
         "　／　<b>いまは セット" + pos.set + "（" + (attemptsOf(pos.set) + 1) + "回目）</b>")
      : "　";
  }
  /* ★セット中・結果を読んでいる最中は画面を動かさない。
     進捗の問い合わせは非同期なので、応答があとから届くと、答えている途中の生徒を
     一覧へ蹴り出してしまう（学年→番号と入力すると2回飛ぶので、実際に起きた）。
     受付が開き直したときも同じ道を通るので、ここ1か所で止める。 */
  function busy() {
    return !$("testCard").classList.contains("hide") || !$("doneCard").classList.contains("hide");
  }
  function showHome() {
    renderBar();
    if (busy()) return;
    show(null);
    if (open && idOK()) showList();
  }

  /* ---------- 一覧（おぼえてからテスト） ---------- */
  function showList() {
    var ws = setWords(pos.set);
    var n = attemptsOf(pos.set), b = bestOf(pos.set);
    $("listTitle").textContent = "セット" + pos.set + "（" +
      ((pos.set - 1) * SET_SIZE + 1) + "〜" + (pos.set * SET_SIZE) + "語目）　" +
      (n ? (n + 1) + "回目　これまでの最高 " + b + "語" : "はじめて");
    $("listBody").innerHTML = ws.map(function (w) {
      return "<div><span>" + esc(w.j) + "</span><b>" + esc(w.w) + "</b></div>";
    }).join("");
    show("listCard");
  }

  /* ---------- セット本番 ---------- */
  function startSet() {
    if (pending().length && idOK()) flush();   // 前に送れていないぶんがあれば、ここでも送り直す
    var ws = setWords(pos.set).slice();
    run = { set: pos.set, round: attemptsOf(pos.set) + 1,   // 何回目かは始めた時点で決める
            queue: ws.map(function (w) { return { w: w, retry: false }; }),
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
    var mySet = run.set, myRound = run.round;
    var prev = myRound > 1 ? doneSets[(myRound - 1) + "-" + mySet] : null;   // 同じセットの前回
    var key = myRound + "-" + mySet;
    doneSets[key] = { correct: correct, sec: sec, cpm: cpm };

    var st = load(); st[EXAM] = st[EXAM] || {};
    st[EXAM].sets = st[EXAM].sets || {}; st[EXAM].sets[key] = doneSets[key];
    save(st);

    $("doneTitle").textContent = "セット" + mySet + "　" + myRound + "回目 おわり";
    $("doneScore").textContent = correct + " / " + SET_SIZE;
    $("doneSub").innerHTML = "かかった時間 " + Math.floor(sec / 60) + "分" + (sec % 60) + "秒　／　" +
      "<b>CPM " + cpm + "</b>" +
      (prev ? "（前回は " + prev.correct + "語・CPM " + prev.cpm +
              "　→ " + (correct - prev.correct >= 0 ? "＋" : "") + (correct - prev.correct) + "語）"
            : "") +
      "　／　パス " + run.passed.length + "語";
    var miss = setWords(mySet).filter(function (w) { return !run.ok[w.id]; });
    $("missWrap").classList.toggle("hide", !miss.length);
    $("missBody").innerHTML = miss.map(function (w) {
      return "<div><span>" + esc(w.j) + "</span><b>" + esc(w.w) + "</b></div>"; }).join("");
    sendSet(myRound, mySet, correct, run.asked, sec);
    pos.set = recommendNext();            // 既定のおすすめ。帯から別のセットを選んでもよい
    $("nextSet").textContent = "セット" + pos.set + " へ →";
    $("againSet").textContent = "セット" + mySet + " をもう一度";
    $("againSet").setAttribute("data-set", mySet);
    renderBar();          // 回数と最高点を最新に
    show("doneCard");
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
  $("nextSet").addEventListener("click", function () { picked = false; show(null); renderBar(); showList(); });
  $("againSet").addEventListener("click", function () {
    pos.set = Number(this.getAttribute("data-set")) || pos.set;
    picked = true;
    show(null); renderBar(); showList();
  });
  /* 帯のセットを押すと、そのセットに移る（1をもう一度、20だけ、が自分で選べる）。
     セット中は動かさない＝答えている途中で別のセットに飛ばないように。 */
  $("setBar").addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-set]") : null;
    if (!b) return;
    if (!open || !idOK()) return;
    if (!$("testCard").classList.contains("hide")) return;
    pos.set = Number(b.getAttribute("data-set"));
    picked = true;
    show(null); renderBar(); showList();
  });
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
