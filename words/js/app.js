/* 単語アプリ — 基本編＆拡張編（訳→英語 タイピング式）
   - 品詞ごとに挑戦／シャッフル／再挑戦
   - 訳（日本語）を見て英語をキー入力し、正誤判定
   - 「打ち込めた単語数（正解できた語数）」を端末ごとに保存 */
(function () {
  "use strict";

  var WORDS = window.WORDS || [];
  var META = window.WORD_META || {};
  var STORE_KEY = "tango_v2";        // v1=フラッシュカード(見た語数)。意味が変わるため新キーへ
  var OLD_STORE_KEY = "tango_v1";
  var SET_SIZE = 20;                  // 1セットの語数
  var RETRY_RATES = { off: 0, low: 0.12, normal: 0.22, high: 0.35 };

  /* ---------- 保存データ ---------- */
  var store = loadStore();
  function loadStore() {
    var def = { cleared: {}, settings: { retry: "normal", sound: true, order: "shuffle" } };
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var o = JSON.parse(raw);
        o.cleared = o.cleared || {};
        o.settings = Object.assign(def.settings, o.settings || {});
        return o;
      }
    } catch (e) { /* 壊れていれば初期化 */ }
    // 旧データ(tango_v1)は「見た語数」で意味が異なるため引き継がず破棄。
    // ただし古い端末でクラッシュしないよう、安全に存在チェックだけ行う。
    try { if (localStorage.getItem(OLD_STORE_KEY)) localStorage.removeItem(OLD_STORE_KEY); } catch (e) {}
    return def;
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

  /* ---------- 正誤判定（英語の入力チェック） ---------- */
  // 入力・正解を正規化：前後の空白除去→小文字化→引用符の統一→
  // 前後の記号除去→内部の連続空白を1つに→ハイフンは空白扱い。
  function normalizeAnswer(s) {
    if (s == null) return "";
    var t = String(s);
    // 引用符・約物の統一（カーリー→ストレート、全角→半角の主要なもの）
    t = t.replace(/[‘’ʼ′]/g, "'")   // ' ' ʼ ′ → '
         .replace(/[“”]/g, '"')               // “ ” → "
         .replace(/[‐-―−]/g, "-")         // 各種ダッシュ・マイナス → -
         .replace(/　/g, " ");                       // 全角スペース → 半角
    t = t.trim().toLowerCase();
    t = t.replace(/-/g, " ");                            // ハイフンは空白と同一視
    t = t.replace(/\s+/g, " ").trim();                   // 内部の連続空白を1つに
    // 前後の約物を除去（語頭・語末のみ。内部のアポストロフィ等は保持）
    t = t.replace(/^[\s.,!?;:"'()\[\]{}…~～、。･・]+/, "")
         .replace(/[\s.,!?;:"'()\[\]{}…~～、。･・]+$/, "");
    return t;
  }

  // 1つの正解 w から「許容される正規化済み解答」の集合を作る。
  // 例: "as a result (of)" → {"as a result of", "as a result"}
  //     括弧内が任意（省略可）の部分とみなし、付き／無しの両方を許容する。
  function acceptableSet(w) {
    var set = {};
    function add(str) { var n = normalizeAnswer(str); if (n) set[n] = 1; }
    function addP(s) {
      add(s);
      if (/[()]/.test(s)) {
        add(s.replace(/\([^)]*\)/g, " "));   // 括弧（と中身）をすべて省いた形
        add(s.replace(/[()]/g, " "));        // 括弧記号だけ外して中身は残す形
      }
    }
    var main = (w && typeof w === "object") ? w.w : w;
    var alts = (w && typeof w === "object" && w.alt) ? w.alt : [];
    addP(main);
    alts.forEach(addP);                      // 別表記（例: pencil case の旧表記 pencase）も正解扱い
    return set;
  }

  function judge(input, w) {
    var n = normalizeAnswer(input);
    if (!n) return false;
    return !!acceptableSet(w)[n];
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
    if (name === "study") setTimeout(focusInput, 50);
  }
  function goBack() {
    if (session && screens.study.classList.contains("hidden") === false) {
      if (!confirm("学習をやめてもどりますか？（成績は保存されます）")) return;
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
    $("catModeProg").innerHTML = "打ち込めた <b>" + done + "</b> / " + all.length + " 語";

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
        '<span class="cat-count">打ち込めた <b>' + c + '</b> / ' + total + '</span>' +
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
      if (!pool.length) { toast("まだ打ち込めた単語がありません"); return; }
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
    showWordList();
  }

  // ── 答え一覧を先に表示（おぼえてからテスト）──
  function escWL(s){ return String(s==null?"":s).replace(/[<>&]/g,function(c){return c==="<"?"&lt;":c===">"?"&gt;":"&amp;";}); }
  var wlOverlay = null;
  function showWordList() {
    if (!wlOverlay) {
      wlOverlay = document.createElement("div");
      wlOverlay.id = "wordListOverlay";
      wlOverlay.style.cssText = "position:fixed;inset:0;z-index:60;background:rgba(20,24,40,.55);display:flex;align-items:center;justify-content:center;padding:16px";
      wlOverlay.innerHTML =
        '<div style="background:#fff;border-radius:18px;max-width:560px;width:100%;max-height:86vh;overflow:auto;padding:18px 18px 8px;box-shadow:0 12px 40px rgba(0,0,0,.35)">'+
        '<h2 style="margin:0 0 4px;font-size:19px">📖 答え一覧（おぼえてからテスト）</h2>'+
        '<p style="font-size:13px;color:#7a8094;margin:0 0 10px">この回に出る単語です。意味と英語をおぼえて、じゅんびができたら「テスト開始」を押そう。</p>'+
        '<div id="wlBody"></div>'+
        '<div style="position:sticky;bottom:0;background:#fff;padding:12px 0 6px;text-align:center">'+
        '<button id="wlStart" class="btn clear" style="min-width:160px">✏️ テスト開始</button></div>'+
        '</div>';
      document.body.appendChild(wlOverlay);
      wlOverlay.querySelector("#wlStart").addEventListener("click", function () {
        wlOverlay.style.display = "none";
        show("study"); nextCard();
      });
    }
    wlOverlay.querySelector("#wlBody").innerHTML = session.queue.map(function (it) {
      return '<div style="display:flex;justify-content:space-between;gap:12px;padding:5px 2px;border-bottom:1px dashed #eee;font-size:15px">'+
        '<span>'+escWL(it.w.j)+'</span><b style="color:#4f7cff">'+escWL(it.w.w)+'</b></div>';
    }).join("");
    wlOverlay.style.display = "flex";
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

  function focusInput() {
    var inp = $("answerInput");
    if (inp && !inp.disabled) { try { inp.focus(); } catch (e) {} }
  }

  function renderCard(it) {
    var w = it.w;
    // 出題：日本語の意味（訳）
    $("cardFront").textContent = w.j || w.w;
    $("cardFront").className = "card-front jp";
    $("cardPos").textContent = w.p;
    $("card").className = "card flip pos-" + w.p;
    setTimeout(function () { $("card").classList.remove("flip"); }, 300);
    $("retryBadge").classList.toggle("hidden", !it.retry);

    // 入力欄を初期化
    var inp = $("answerInput");
    inp.value = "";
    inp.disabled = false;
    inp.className = "answer-input";
    inp.setAttribute("placeholder", "英語を入力");

    // フィードバック・操作の表示切替
    $("feedback").className = "feedback hidden";
    $("feedback").innerHTML = "";
    $("inputActions").classList.remove("hidden");
    $("nextActions").classList.add("hidden");
    $("speakBtn").classList.add("hidden");    // 答え合わせ前は読み上げボタンを隠す
    it.answered = false;

    // 進捗
    var pct = session.baseTotal ? Math.round(session.baseDone / session.baseTotal * 100) : 0;
    $("studyBar").style.width = pct + "%";
    $("studyCount").innerHTML = "<b>" + session.baseDone + "</b> / " + session.baseTotal;
    var c = (POS_COLOR(w.p));
    $("studyTitle").innerHTML = '<span class="tag" style="background:' + c + '">' + session.tag + "</span>" +
      (session.scope === "__shuffle__" ? "ぜんぶシャッフル" : session.scope === "__retry__" ? "再挑戦" : session.scope);
    $("studyTitle").style.setProperty("--c", c);

    focusInput();
  }

  // 入力を確定して採点する
  function submitAnswer() {
    var it = session.current; if (!it || it.answered) return;
    var inp = $("answerInput");
    var raw = inp.value;
    if (!normalizeAnswer(raw)) { focusInput(); return; }   // 空入力は無視
    it.answered = true;
    var ok = judge(raw, it.w);   // 単語オブジェクトを渡す（w.alt の別表記も許容）

    inp.disabled = true;
    inp.classList.add(ok ? "correct" : "wrong");

    var fb = $("feedback");
    fb.className = "feedback " + (ok ? "ok" : "ng");
    fb.innerHTML =
      '<div class="mark">' + (ok ? "○" : "✕") + '</div>' +
      '<div class="fb-body">' +
        '<div class="fb-label">' + (ok ? "正解！" : "おしい！正解は") + '</div>' +
        '<div class="fb-answer">' + esc(it.w.w) + '</div>' +
        (ok ? "" : '<div class="fb-your">あなたの入力：' + esc(raw) + '</div>') +
      '</div>';

    $("inputActions").classList.add("hidden");
    $("nextActions").classList.remove("hidden");
    $("speakBtn").classList.remove("hidden");
    $("nextBtn").focus();

    recordResult(ok, it);
    if (store.settings.sound) speak(it.w.w);
  }

  // 採点結果を成績・保存に反映
  function recordResult(ok, it) {
    if (it.retry) {
      session.results.retry++;
      if (ok) setCleared(it.w.id, true);
      else setCleared(it.w.id, false);   // 再挑戦で間違えたら未クリアに戻す
    } else {
      if (ok) {
        setCleared(it.w.id, true);       // 正しく打ち込めた → クリア
        session.results.clear++;
        session.baseDone++;
      } else {
        session.results.again++;
        if (session.isReview) {
          setCleared(it.w.id, false);
          session.baseDone++;
        } else {
          session.queue.push({ w: it.w, retry: false }); // 後でもう一度出題
        }
      }
    }
    maybeInjectRetry();
  }

  function goNext() {
    if (!session.current || !session.current.answered) return;
    nextCard();
  }

  function finishSession() {
    var r = session.results;
    var msg = "<b>" + r.clear + " 語</b> を打ち込めました！";
    if (r.again) msg += "<br>まちがえた語：" + r.again;
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
      var u = new SpeechSynthesisUtterance(String(text).replace(/\(.*?\)/g, "").replace(/[.…~～]/g, ""));
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
      '<div class="setting-row"><div><div class="label">出題順</div><div class="desc">品詞ごとの並び順</div></div>' +
      seg("order", [["shuffle", "シャッフル"], ["seq", "順番"]]) + "</div>" +
      '<div class="setting-row"><div><div class="label">再挑戦の頻度</div><div class="desc">打ち込めた語を自動で再出題</div></div>' +
      seg("retry", [["off", "なし"], ["low", "少"], ["normal", "ふつう"], ["high", "多"]]) + "</div>" +
      '<div class="setting-row"><div><div class="label">英語の音声</div><div class="desc">答え合わせのときに読み上げ</div></div>' +
      '<div class="switch ' + (s.sound ? "on" : "") + '" data-sw="sound"></div></div>' +
      '<button class="danger-btn" data-reset="mode">「' + MODE_NAME[curMode] + '」の成績をリセット</button>' +
      '<button class="danger-btn" data-reset="all">すべての成績をリセット</button>';
  }

  function aboutHtml() {
    var m = META;
    return '<h3>？ このアプリについて</h3><div class="about">' +
      "<p>意味（日本語）を見て英語を打ち込む単語アプリです。品詞ごとに練習できます。全 <b>" + (m.total || WORDS.length) + "</b> 語。</p>" +
      "<ul>" +
      "<li><b>基本編（" + (m.basicCount || 0) + "語）</b>：先生の単語集から、品詞ごとに抜粋。</li>" +
      "<li><b>拡張編（" + (m.extendedCount || 0) + "語）</b>：NEW HORIZON のデータベースから、マイナー過ぎる語を除いて収録。</li>" +
      "<li><b>打ち込めた単語数</b>：英語を正しく入力できた語が記録され、進み具合が残ります。</li>" +
      "<li><b>判定</b>：大文字小文字・前後の空白や記号・ハイフン／スペースの違いは正解とみなします。</li>" +
      "<li><b>シャッフル</b>：全品詞からランダムに出題。</li>" +
      "<li><b>再挑戦</b>：打ち込めた語をたまに自動で再出題します（設定で頻度を変更可）。</li>" +
      "</ul><p style='font-size:12px'>※ 成績はこの端末のブラウザに保存されます。</p></div>";
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

  $("speakBtn").addEventListener("click", function (e) { e.stopPropagation(); if (session && session.current) speak(session.current.w.w); });
  $("submitBtn").addEventListener("click", submitAnswer);
  $("nextBtn").addEventListener("click", goNext);
  $("answerInput").addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); submitAnswer(); }
  });
  $("doneBackBtn").addEventListener("click", function () { renderHome(); renderCats(); show("cats", false); navStack = ["home", "cats"]; });
  $("doneAgainBtn").addEventListener("click", function () { startSession(session.mode, session.scope); });

  document.addEventListener("keydown", function (e) {
    if (screens.study.classList.contains("hidden")) return;
    if (!session || !session.current) return;
    // 採点後は Enter で次へ（入力欄からのEnterは上で処理）
    if (e.key === "Enter" && session.current.answered) {
      if (document.activeElement && document.activeElement.id === "answerInput") return;
      e.preventDefault(); goNext();
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
      if (confirm(MODE_NAME[curMode] + " の成績をすべて消しますか？")) {
        byMode[curMode].forEach(function (w) { delete store.cleared[w.id]; }); save();
        closeModal(); renderHome(); renderCats(); toast("リセットしました");
      }
    } else if (rs === "all") {
      if (confirm("すべての成績を消しますか？")) { store.cleared = {}; save(); closeModal(); renderHome(); renderCats(); toast("リセットしました"); }
    }
  }

  /* ---------- start ---------- */
  renderHome();
  show("home");
})();
