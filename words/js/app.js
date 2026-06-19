/* 単語アプリ — 基本編＆拡張編
   - 品詞ごとに挑戦／シャッフル／クリアフラグ（保存）／再挑戦の自動再出題 */
(function () {
  "use strict";

  var WORDS = window.WORDS || [];
  var META = window.WORD_META || {};
  var STORE_KEY = "tango_v1";
  var SET_SIZE = 20;            // 1セットの語数
  var RETRY_RATES = { off: 0, low: 0.12, normal: 0.22, high: 0.35 };

  /* ---------- 保存データ ---------- */
  var store = loadStore();
  function loadStore() {
    var def = { cleared: {}, settings: { dir: "j2e", retry: "normal", sound: true, order: "shuffle" } };
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return def;
      var o = JSON.parse(raw);
      o.cleared = o.cleared || {};
      o.settings = Object.assign(def.settings, o.settings || {});
      return o;
    } catch (e) { return def; }
  }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) {} }
  function isCleared(id) { return !!store.cleared[id]; }
  function setCleared(id, v) {
    if (v) store.cleared[id] = Date.now();
    else delete store.cleared[id];
    save();
  }

  /* ---------- インデックス ---------- */
  var byMode = { b: [], e: [] };
  var byModePos = { b: {}, e: {} };
  WORDS.forEach(function (w) {
    byMode[w.m].push(w);
    (byModePos[w.m][w.p] = byModePos[w.m][w.p] || []).push(w);
  });
  var MODE_NAME = { b: "基本編", e: "拡張編" };

  function clearedCount(list) {
    var n = 0; for (var i = 0; i < list.length; i++) if (isCleared(list[i].id)) n++; return n;
  }

  /* ---------- DOM ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var screens = { home: $("screen-home"), cats: $("screen-cats"), study: $("screen-study"), done: $("screen-done") };
  var navStack = [];

  function show(name, push) {
    Object.keys(screens).forEach(function (k) { screens[k].classList.toggle("hidden", k !== name); });
    if (push !== false) navStack.push(name);
    var top = $("topbar");
    if (name === "home") { top.classList.add("hidden"); }
    else { top.classList.remove("hidden"); }
    $("topTitle").textContent = name === "study" ? (session ? session.titleShort : "学習") :
      name === "cats" ? MODE_NAME[curMode] : "単語アプリ";
    window.scrollTo(0, 0);
  }
  function goBack() {
    if (session && screens.study.classList.contains("hidden") === false) {
      if (!confirm("学習をやめてもどりますか？（クリア状況は保存されます）")) return;
    }
    navStack.pop();
    var prev = navStack[navStack.length - 1] || "home";
    if (prev === "study") prev = "cats";
    navStack[navStack.length - 1] = prev;
    if (prev === "cats") renderCats();
    if (prev === "home") renderHome();
    show(prev, false);
  }

  /* ---------- ホーム ---------- */
  var curMode = "b";
  function renderHome() {
    $("totalWords").textContent = META.total || WORDS.length;
    document.querySelectorAll(".mode-card").forEach(function (card) {
      var m = card.getAttribute("data-mode");
      var list = byMode[m] || [];
      var done = clearedCount(list);
      var pct = list.length ? Math.round(done / list.length * 100) : 0;
      card.querySelector(".bar i").style.width = pct + "%";
      card.querySelector(".mode-prog em").textContent = done + " / " + list.length + "（" + pct + "%）";
    });
  }

  /* ---------- カテゴリ ---------- */
  function renderCats() {
    $("catModeTitle").textContent = MODE_NAME[curMode];
    var all = byMode[curMode];
    var done = clearedCount(all);
    $("catModeProg").innerHTML = "クリア <b>" + done + "</b> / " + all.length + " 語";

    var posList = (curMode === "b" ? META.basicByPos : META.extendedByPos) ||
      (META.posOrder || []).map(function (p) { return [p, (byModePos[curMode][p] || []).length]; }).filter(function (x) { return x[1]; });

    var html = "";
    posList.forEach(function (pc) {
      var pos = pc[0], total = pc[1];
      var list = byModePos[curMode][pos] || [];
      var c = clearedCount(list);
      var pct = total ? Math.round(c / total * 100) : 0;
      html += '<button class="cat-tile pos-' + pos + (c >= total && total > 0 ? ' done' : '') + '" data-pos="' + pos + '">' +
        '<div class="cat-row"><span class="cat-name">' + pos + '</span><span class="cat-chip">' + total + '</span></div>' +
        '<span class="bar"><i style="width:' + pct + '%"></i></span>' +
        '<span class="cat-count">クリア <b>' + c + '</b> / ' + total + '</span>' +
        '</button>';
    });
    $("catList").innerHTML = html;
    document.querySelectorAll(".cat-tile").forEach(function (t) {
      t.addEventListener("click", function () { startSession(curMode, t.getAttribute("data-pos")); });
    });
  }

  /* ---------- セッション ---------- */
  var session = null;

  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function startSession(mode, scope) {
    var pool, title, tag, isReview = false, posLabel = "";
    if (scope === "__shuffle__") {
      pool = byMode[mode].filter(function (w) { return !isCleared(w.id); });
      if (!pool.length) pool = byMode[mode].slice(), isReview = true;
      shuffle(pool);
      title = "🔀 ぜんぶシャッフル"; tag = "全品詞";
    } else if (scope === "__retry__") {
      pool = byMode[mode].filter(function (w) { return isCleared(w.id); });
      if (!pool.length) { toast("まだクリアした単語がありません"); return; }
      shuffle(pool); isReview = true;
      title = "🔄 再挑戦"; tag = "復習";
    } else {
      posLabel = scope;
      var list = byModePos[mode][scope] || [];
      pool = list.filter(function (w) { return !isCleared(w.id); });
      if (!pool.length) { pool = list.slice(); isReview = true; }   // 全クリア済みなら復習
      if (store.settings.order === "shuffle") shuffle(pool);
      title = scope; tag = "品詞";
    }

    var queue = pool.slice(0, SET_SIZE).map(function (w) { return { w: w, retry: false }; });
    session = {
      mode: mode, scope: scope, posLabel: posLabel, isReview: isReview,
      queue: queue, baseTotal: queue.length, baseDone: 0,
      results: { clear: 0, again: 0, retry: 0 },
      seenRetry: {}, title: title, tag: tag,
      titleShort: scope === "__shuffle__" ? "シャッフル" : scope === "__retry__" ? "再挑戦" : scope
    };
    show("study");
    nextCard();
  }

  function poolForRetryInjection() {
    // いまのセッションに出ていないクリア済み語
    var inQueue = {};
    session.queue.forEach(function (it) { inQueue[it.w.id] = 1; });
    return byMode[session.mode].filter(function (w) {
      return isCleared(w.id) && !inQueue[w.id] && !session.seenRetry[w.id] &&
        (session.current ? w.id !== session.current.w.id : true);
    });
  }

  function maybeInjectRetry() {
    if (session.isReview) return;                       // 復習中は注入しない
    var rate = RETRY_RATES[store.settings.retry] || 0;
    if (rate <= 0 || Math.random() > rate) return;
    var cand = poolForRetryInjection();
    if (!cand.length) return;
    var pick = cand[Math.floor(Math.random() * cand.length)];
    session.seenRetry[pick.id] = 1;
    session.queue.unshift({ w: pick, retry: true });    // 次に出題
  }

  function nextCard() {
    if (!session.queue.length) return finishSession();
    var it = session.queue.shift();
    session.current = it;
    renderCard(it);
  }

  function renderCard(it) {
    var w = it.w, dir = store.settings.dir;
    var frontText = dir === "j2e" ? (w.j || w.w) : w.w;
    var frontJp = dir === "j2e";
    $("cardFront").textContent = frontText;
    $("cardFront").className = "card-front" + (frontJp ? " jp" : "");
    $("cardBack").classList.add("hidden");
    $("cardBack").innerHTML = "";
    $("cardPos").textContent = w.p;
    $("card").className = "card flip pos-" + w.p;
    setTimeout(function () { $("card").classList.remove("flip"); }, 300);
    $("retryBadge").classList.toggle("hidden", !it.retry);
    $("tapHint").classList.remove("hidden");
    $("speakBtn").classList.toggle("hidden", false);
    $("revealActions").classList.add("hidden");
    $("showActions").classList.remove("hidden");
    it.revealed = false;

    // progress
    var pct = session.baseTotal ? Math.round(session.baseDone / session.baseTotal * 100) : 0;
    $("studyBar").style.width = pct + "%";
    $("studyCount").innerHTML = "<b>" + session.baseDone + "</b> / " + session.baseTotal;
    var c = (POS_COLOR(w.p));
    $("studyTitle").innerHTML = '<span class="tag" style="background:' + c + '">' + session.tag + "</span>" +
      (session.scope === "__shuffle__" ? "ぜんぶシャッフル" : session.scope === "__retry__" ? "再挑戦" : session.scope);
    $("studyTitle").style.setProperty("--c", c);
  }

  function reveal() {
    var it = session.current; if (!it || it.revealed) return;
    it.revealed = true;
    var w = it.w, dir = store.settings.dir;
    var ansEng = dir === "j2e";
    var ansText = ansEng ? w.w : (w.j || "—");
    $("cardBack").innerHTML = '<div class="ans ' + (ansEng ? "" : "jp") + '">' + esc(ansText) + "</div>";
    $("cardBack").classList.remove("hidden");
    $("tapHint").classList.add("hidden");
    $("showActions").classList.add("hidden");
    $("revealActions").classList.remove("hidden");
    if (store.settings.sound) speak(w.w);
  }

  function answer(ok) {
    var it = session.current; if (!it) return;
    if (it.retry) {
      session.results.retry++;
      if (!ok) setCleared(it.w.id, false);   // 再挑戦で間違えたらクリア解除（学習に戻す）
      else setCleared(it.w.id, true);
    } else {
      if (ok) {
        setCleared(it.w.id, true);
        session.results.clear++;
        session.baseDone++;
      } else {
        session.results.again++;
        if (session.isReview) {
          setCleared(it.w.id, false);
          session.baseDone++;
        } else {
          session.queue.push({ w: it.w, retry: false }); // 後でもう一度
        }
      }
    }
    maybeInjectRetry();
    nextCard();
  }

  function finishSession() {
    var r = session.results;
    var msg = "<b>" + r.clear + " 語</b> をクリア！";
    if (r.again) msg += "<br>もう一回にした語：" + r.again;
    if (r.retry) msg += "<br>🔄 再挑戦：" + r.retry + " 語";
    var list = session.scope === "__shuffle__" || session.scope === "__retry__"
      ? byMode[session.mode] : (byModePos[session.mode][session.scope] || []);
    var c = clearedCount(list), total = list.length;
    msg += "<br><br>この" + (session.scope === "__shuffle__" ? "モード" : session.scope === "__retry__" ? "モード" : "品詞") +
      "の進み具合：<b>" + c + " / " + total + "</b>";
    $("doneSummary").innerHTML = msg;
    show("done");
  }

  /* ---------- 音声 ---------- */
  var voices = [];
  function loadVoices() { try { voices = speechSynthesis.getVoices(); } catch (e) {} }
  if ("speechSynthesis" in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  function speak(text) {
    if (!("speechSynthesis" in window)) return;
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text.replace(/\(.*?\)/g, "").replace(/[.…]/g, ""));
      u.lang = "en-US"; u.rate = 0.92;
      var v = voices.filter(function (x) { return /en[-_]/i.test(x.lang); })[0];
      if (v) u.voice = v;
      speechSynthesis.speak(u);
    } catch (e) {}
  }

  /* ---------- 設定／About ---------- */
  function openModal(html) { $("modalBody").innerHTML = html; $("modal").classList.remove("hidden"); }
  function closeModal() { $("modal").classList.add("hidden"); }

  function settingsHtml() {
    var s = store.settings;
    function seg(name, opts) {
      return '<div class="seg" data-seg="' + name + '">' + opts.map(function (o) {
        return '<button data-val="' + o[0] + '" class="' + (s[name] === o[0] ? "on" : "") + '">' + o[1] + "</button>";
      }).join("") + "</div>";
    }
    return '<h3>⚙ 設定</h3>' +
      '<div class="setting-row"><div><div class="label">出題の向き</div><div class="desc">意味→英語／英語→意味</div></div>' +
      seg("dir", [["j2e", "意味→英語"], ["e2j", "英語→意味"]]) + "</div>" +
      '<div class="setting-row"><div><div class="label">出題順</div><div class="desc">品詞ごとの並び順</div></div>' +
      seg("order", [["shuffle", "シャッフル"], ["seq", "順番"]]) + "</div>" +
      '<div class="setting-row"><div><div class="label">再挑戦の頻度</div><div class="desc">クリア済みを自動で再出題</div></div>' +
      seg("retry", [["off", "なし"], ["low", "少"], ["normal", "ふつう"], ["high", "多"]]) + "</div>" +
      '<div class="setting-row"><div><div class="label">英語の音声</div><div class="desc">答えを見ると読み上げ</div></div>' +
      '<div class="switch ' + (s.sound ? "on" : "") + '" data-sw="sound"></div></div>' +
      '<button class="danger-btn" data-reset="mode">「' + MODE_NAME[curMode] + '」のクリア状況をリセット</button>' +
      '<button class="danger-btn" data-reset="all">すべてのクリア状況をリセット</button>';
  }

  function aboutHtml() {
    var m = META;
    return '<h3>？ このアプリについて</h3><div class="about">' +
      "<p>英単語を品詞ごとに練習できるアプリです。全 <b>" + (m.total || WORDS.length) + "</b> 語。</p>" +
      "<ul>" +
      "<li><b>基本編（" + (m.basicCount || 0) + "語）</b>：先生の単語集から、品詞ごとに抜粋。</li>" +
      "<li><b>拡張編（" + (m.extendedCount || 0) + "語）</b>：NEW HORIZON のデータベースから、マイナー過ぎる語を除いて収録。</li>" +
      "<li><b>クリアフラグ</b>：「✓クリア！」を押すと記録され、進み具合が残ります。</li>" +
      "<li><b>シャッフル</b>：全品詞からランダムに出題。</li>" +
      "<li><b>再挑戦</b>：クリア済みの語をたまに自動で再出題します（設定で頻度を変更可）。</li>" +
      "</ul><p style='font-size:12px'>※ 記録はこの端末のブラウザに保存されます。</p></div>";
  }

  /* ---------- helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  var POS_COLORS = { 名詞: "#4f7cff", 動詞: "#21b573", 形容詞: "#ff8a3d", 副詞: "#e0529c", 代名詞: "#7a6bff", 疑問詞: "#ff5d73", 前置詞: "#14b1c9", 接続詞: "#9b8b2e", 助動詞: "#0fae8e", 冠詞: "#8a93a6", 間投詞: "#d98324", 短縮形: "#6c7a92", 連語: "#b06bd6" };
  function POS_COLOR(p) { return POS_COLORS[p] || "#4f7cff"; }
  var toastTimer;
  function toast(msg) {
    var t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }

  /* ---------- events ---------- */
  document.querySelectorAll(".mode-card").forEach(function (c) {
    c.addEventListener("click", function () { curMode = c.getAttribute("data-mode"); renderCats(); show("cats"); });
  });
  document.querySelectorAll(".special-tile").forEach(function (t) {
    t.addEventListener("click", function () { startSession(curMode, t.getAttribute("data-special") === "shuffle" ? "__shuffle__" : "__retry__"); });
  });
  $("backBtn").addEventListener("click", goBack);
  $("topRight").addEventListener("click", function () { openModal(settingsHtml()); });
  $("settingsBtn").addEventListener("click", function () { openModal(settingsHtml()); });
  $("aboutBtn").addEventListener("click", function () { openModal(aboutHtml()); });
  $("modalClose").addEventListener("click", closeModal);
  $("modal").addEventListener("click", function (e) { if (e.target === $("modal")) closeModal(); });

  $("card").addEventListener("click", function (e) { if (e.target.closest("#speakBtn")) return; reveal(); });
  $("speakBtn").addEventListener("click", function (e) { e.stopPropagation(); if (session && session.current) speak(session.current.w.w); });
  $("showBtn").addEventListener("click", reveal);
  $("clearBtn").addEventListener("click", function () { answer(true); });
  $("againBtn").addEventListener("click", function () { answer(false); });
  $("doneBackBtn").addEventListener("click", function () { renderHome(); renderCats(); show("cats", false); navStack = ["home", "cats"]; });
  $("doneAgainBtn").addEventListener("click", function () { startSession(session.mode, session.scope); });

  document.addEventListener("keydown", function (e) {
    if (!screens.study.classList.contains("hidden")) {
      if (e.code === "Space") { e.preventDefault(); session.current && !session.current.revealed ? reveal() : null; }
      else if (e.key === "Enter") { if (session.current && session.current.revealed) answer(true); }
      else if (e.key === "Backspace") { if (session.current && session.current.revealed) { e.preventDefault(); answer(false); } }
    }
  });

  // 設定モーダルは中身が再生成されるため、コンテナにイベント委譲
  $("modalBody").addEventListener("click", modalClickHandler);
  function modalClickHandler(e) {
    var seg = e.target.closest ? e.target.closest("[data-seg]") : null;
    if (seg && e.target.dataset && e.target.dataset.val) {
      store.settings[seg.getAttribute("data-seg")] = e.target.dataset.val; save();
      seg.querySelectorAll("button").forEach(function (b) { b.classList.toggle("on", b === e.target); }); return;
    }
    var sw = e.target.closest ? e.target.closest("[data-sw]") : null;
    if (sw) { store.settings.sound = !store.settings.sound; save(); sw.classList.toggle("on", store.settings.sound); return; }
    var rs = e.target.getAttribute && e.target.getAttribute("data-reset");
    if (rs === "mode") {
      if (confirm(MODE_NAME[curMode] + " のクリア状況をすべて消しますか？")) {
        byMode[curMode].forEach(function (w) { delete store.cleared[w.id]; }); save();
        closeModal(); renderHome(); renderCats(); toast("リセットしました");
      }
    } else if (rs === "all") {
      if (confirm("すべてのクリア状況を消しますか？")) { store.cleared = {}; save(); closeModal(); renderHome(); renderCats(); toast("リセットしました"); }
    }
  }

  /* ---------- start ---------- */
  renderHome();
  show("home");
})();
