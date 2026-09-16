/* assets/masterycore.js ─ 到達度テストの共通部分（2000語・全文法 の両方が使う）
 *
 * ★写さずに1か所へ置く理由：このリポジトリは「同じ仕組みの写しが少しずつ食いちがう」
 *   事故を何度も起こしている（4レーンの norm()、/admin の試験一覧など）。
 *   受付・続きの位置・記録の送り方は、2つの到達度テストでまったく同じでなければ
 *   困るので、ここ1本にまとめる。
 *
 * ここが持つもの：
 *   ・受付（ゲート）の見はり
 *   ・「どこまでやったか」の取り寄せと、端末の控えとの突き合わせ
 *   ・セットの帯（押して選べる）／おすすめの決め方
 *   ・1セット終わるごとの記録送信（届かなければ端末にためて送り直す）
 * 出題そのものは持たない。呼ぶ側が renderList / startRun を渡す。
 *
 * ★「周回」は全体の周ではなく **そのセットの何回目か**。セットを自由に選べる以上、
 *   全体の周という数えかたは成り立たないため。
 */
(function (global) {
  "use strict";

  function create(cfg) {
    var EXAM = cfg.exam, VER = cfg.ver, SETS = cfg.sets;
    var LS = cfg.ls || "mastery_v1";
    var UNIT = cfg.unitName || "セット";      // 「セット」／「項目」
    var THING = cfg.unitWord || "語";         // 「語」／「文」

    var $ = function (id) { return document.getElementById(id); };
    function esc(s) { return String(s == null ? "" : s).replace(/[<>&"]/g, function (c) {
      return c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === "&" ? "&amp;" : "&quot;"; }); }
    function han(s) { return String(s || "").replace(/[０-９]/g, function (d) {
      return String.fromCharCode(d.charCodeAt(0) - 65248); }).replace(/[^0-9]/g, ""); }

    var GAS_URL = window.SITE ? SITE.gasFor("summary", cfg.gas) : cfg.gas;
    function post(obj) {
      if (!GAS_URL) return Promise.reject(new Error("送信先が未設定です"));
      if (window.SITE) SITE.tag(obj);
      return fetch(GAS_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(obj) }).then(function (r) { return r.json(); });
    }

    function load() { try { return JSON.parse(localStorage.getItem(LS) || "{}"); } catch (e) { return {}; } }
    function save(o) { try { localStorage.setItem(LS, JSON.stringify(o)); } catch (e) {} }

    /* ★端末の控えは「どの子のぶんか」を添えて持つ。
       1台を何人かで使う教室（先生の試用もこれ）で、これが無いと前の子の記録が次の子に混ざり、
       すんだ印・おすすめのセット・「何回目」がまるごとずれる。控えはあくまで保険で、
       正はサーバーなので、自分のぶんが無ければ空から始めればよい。 */
    function who() { return $("f_cls").value.trim() + "-" + han($("f_num").value); }
    function mySets() { return (((load()[EXAM] || {}).by || {})[who()] || {}).sets || {}; }
    function saveMine(sets) {
      var o = load(); o[EXAM] = o[EXAM] || {}; o[EXAM].by = o[EXAM].by || {};
      o[EXAM].by[who()] = { sets: sets };
      delete o[EXAM].sets;                 // 旧かたち（誰のか分からない控え）は捨てる
      save(o);
    }

    /* ---------- 状態 ---------- */
    var session = "", open = false;
    var pos = { set: 1 };
    var picked = false;          // 生徒が自分で選んだら、おすすめで上書きしない
    var doneSets = {};           // "回-セット" → {correct, sec, cpm}
    var running = false;         // 出題中か（呼ぶ側が startRun/finish で切りかえる）

    function attemptsOf(set) {
      var n = 0;
      for (var k in doneSets) if (k.split("-")[1] === String(set)) n++;
      return n;
    }
    function bestOf(set) {
      var b = null;
      for (var k in doneSets) if (k.split("-")[1] === String(set)) {
        var c = doneSets[k].correct || 0; if (b == null || c > b) b = c;
      }
      return b;
    }
    /* おすすめ＝いちばん回数の少ないセット（同数なら小さい番号）。
       まっさらなら 1→2→3…、ぜんぶ終えたら自然と1へ戻って2周目になる。 */
    function recommendNext() {
      var best = 1, bn = Infinity;
      for (var i = 1; i <= SETS; i++) { var n = attemptsOf(i); if (n < bn) { bn = n; best = i; } }
      return best;
    }

    /* ---------- 画面の出しわけ ---------- */
    function show(which) {
      ["listCard", "testCard", "doneCard"].forEach(function (id) { $(id).classList.add("hide"); });
      if (which) $(which).classList.remove("hide");
    }
    /* セット中・結果を読んでいる最中は画面を動かさない。進捗の問い合わせは非同期なので、
       応答があとから届くと、答えている途中の生徒を一覧へ蹴り出してしまう。 */
    function busy() {
      return !$("testCard").classList.contains("hide") || !$("doneCard").classList.contains("hide");
    }

    function idOK() { return $("f_cls").value.trim() && han($("f_num").value); }

    function setGateView() {
      var b = $("gateBadge"), m = $("gateMsg");
      if (!open) {
        b.className = "badge lock"; b.textContent = "🔒 受付していません";
        m.textContent = busy()
          ? "受付が閉じました。いまの" + UNIT + "は最後まで進められます。記録は次に開いたときに届きます。"
          : "先生が受付を開けるまで待ってね。";
      } else {
        b.className = "badge open"; b.textContent = "✅ 受付中";
        m.textContent = idOK() ? "" : "学年と番号を入れると始められます。";
      }
      renderBar();
    }

    function renderBar() {
      var html = "";
      for (var i = 1; i <= SETS; i++) {
        var n = attemptsOf(i), b = bestOf(i);
        var cls = (i === pos.set ? "now" : (n ? "done" : ""));
        var tip = cfg.tipOf ? cfg.tipOf(i) : (UNIT + i);
        tip += n ? "　" + n + "回・最高 " + b + THING : "　まだ";
        html += '<button type="button" class="' + cls + '" data-set="' + i + '" title="' + esc(tip) + '">' +
                (cfg.tileOf ? cfg.tileOf(i) : i) + (n ? '<em>' + b + "</em>" : "") + "</button>";
      }
      /* 中身が変わっていないときは描き直さない。5秒ごとに作り直すと、押そうとした瞬間に
         ボタンが作り替えられて、タップが吸われる。 */
      if ($("setBar").getAttribute("data-sig") !== html) {
        $("setBar").setAttribute("data-sig", html);
        $("setBar").innerHTML = html;
      }
      var done = 0, bestSum = 0;
      for (var j = 1; j <= SETS; j++) if (attemptsOf(j)) { done++; bestSum += bestOf(j); }
      $("progMsg").innerHTML = open
        ? ("さわった" + UNIT + " " + done + " / " + SETS + "　／　最高点の合計 " + bestSum + THING +
           "　／　<b>いまは " + UNIT + pos.set + "（" + (attemptsOf(pos.set) + 1) + "回目）</b>")
        : "　";
    }

    function showList() {
      cfg.renderList(pos.set, { attempts: attemptsOf(pos.set), best: bestOf(pos.set) });
      show("listCard");
    }
    function showHome() {
      renderBar();
      if (busy()) return;
      show(null);
      if (open && idOK()) showList();
    }

    /* ---------- 受付の見はり ---------- */
    function poll() {
      post({ action: "status", exam: EXAM }).then(function (st) {
        if (!st || st.result !== "ok") return;
        var was = open;
        session = st.session || ""; open = !!st.open;
        setGateView();
        if (open && !was) {
          fetchProgress();
          if (pending().length && idOK()) flush();
        }
      }).catch(function () {});
    }

    /* ---------- どこまでやったか ---------- */
    function fetchProgress() {
      if (!idOK()) return;
      if (!busy()) doneSets = mySets();        // 待っている間、前の子の記録を出さない
      post({ action: "progress", exam: EXAM, cls: $("f_cls").value.trim(), num: han($("f_num").value) })
        .then(function (r) {
          if (!r || r.result !== "ok") return;
          // サーバーの記録に端末の控えを重ねる（どちらかにしか無い回も拾う＝生徒が損しない側）
          doneSets = r.sets || {};
          var mine = mySets();
          for (var k in mine) if (!doneSets[k]) doneSets[k] = mine[k];
          if (!busy() && !picked) pos.set = recommendNext();
          showHome();
        }).catch(function () {
          doneSets = mySets();
          if (!busy() && !picked) pos.set = recommendNext();
          showHome();
        });
    }

    /* ---------- 記録（届かなくても止めない） ---------- */
    function pending() { var o = load(); return o.__pending || []; }
    function setPending(a) { var o = load(); o.__pending = a; save(o); }
    function flush() {
      var q = pending();
      if (!q.length) { $("sendMsg").textContent = "記録しました ✓"; return; }
      post(q[0]).then(function (r) {
        if (r && (r.result === "ok" || r.result === "dup")) { setPending(pending().slice(1)); flush(); }
        else $("sendMsg").textContent = "まだ届いていません（" + ((r && r.message) || "?") +
          "）。次の" + UNIT + "のときに送り直します。";
      }).catch(function () {
        $("sendMsg").textContent = "いま送れませんでした。記録は端末に残してあるので、次の" + UNIT + "のときに送り直します。";
      });
    }

    /* ---------- 1セット終わり ---------- */
    /* res: {correct, asked, sec, max, note}  note は結果画面の末尾に足す文字列 */
    function finish(set, round, res) {
      running = false;
      var sec = res.sec || 0, correct = res.correct || 0;
      var cpm = sec > 0 ? Math.round(correct / (sec / 60) * 10) / 10 : 0;
      var prev = round > 1 ? doneSets[(round - 1) + "-" + set] : null;
      var key = round + "-" + set;
      doneSets[key] = { correct: correct, sec: sec, cpm: cpm };

      saveMine(doneSets);

      $("doneTitle").textContent = UNIT + set + "　" + round + "回目 おわり";
      $("doneScore").textContent = correct + " / " + (res.max || 0);
      $("doneSub").innerHTML = "かかった時間 " + Math.floor(sec / 60) + "分" + (sec % 60) + "秒　／　" +
        "<b>CPM " + cpm + "</b>" +
        (prev ? "（前回は " + prev.correct + THING + "・CPM " + prev.cpm + "　→ " +
                (correct - prev.correct >= 0 ? "＋" : "") + (correct - prev.correct) + THING + "）" : "") +
        (res.note ? "　／　" + res.note : "");

      var body = { kind: "mastery", exam: EXAM, session: session, ver: VER,
        cls: $("f_cls").value.trim(), num: han($("f_num").value), name: $("f_name").value.trim(),
        round: round, set: set, correct: correct, asked: res.asked || 0, sec: sec };
      setPending(pending().concat([body]));
      $("sendMsg").textContent = "記録を送っています…";
      flush();

      pos.set = recommendNext();
      picked = false;
      $("nextSet").textContent = UNIT + pos.set + " へ →";
      $("againSet").textContent = UNIT + set + " をもう一度";
      $("againSet").setAttribute("data-set", set);
      renderBar();
      show("doneCard");
    }

    /* ---------- つなぎ ---------- */
    function goSet(n, byStudent) {
      pos.set = n; picked = !!byStudent;
      show(null); renderBar(); showList();
    }
    $("startSet").addEventListener("click", function () {
      if (pending().length && idOK()) flush();
      running = true;
      show("testCard");
      cfg.startRun(pos.set, attemptsOf(pos.set) + 1);
    });
    $("backHome").addEventListener("click", function () { show(null); });
    $("quitSet").addEventListener("click", function () {
      if (!confirm("この" + UNIT + "をやめると、ここまでの答えは記録されません。やめますか？")) return;
      running = false;
      if (cfg.abortRun) cfg.abortRun();
      show(null);
    });
    $("nextSet").addEventListener("click", function () { goSet(pos.set, false); });
    $("againSet").addEventListener("click", function () {
      goSet(Number(this.getAttribute("data-set")) || pos.set, true);
    });
    /* 帯を押すと、そのセットに移る。答えている途中は動かさない。 */
    $("setBar").addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-set]") : null;
      if (!b || !open || !idOK()) return;
      if (!$("testCard").classList.contains("hide")) return;
      goSet(Number(b.getAttribute("data-set")), true);
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
        if (id !== "f_name") {                 // 別の子に替わったら、その場で控えを切りかえる
          doneSets = mySets(); picked = false;
          pos.set = recommendNext();
        }
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
    doneSets = mySets();
    if (Object.keys(doneSets).length) pos.set = recommendNext();
    setGateView();
    poll(); setInterval(poll, 5000);

    return { finish: finish, show: show, renderBar: renderBar, esc: esc,
             attemptsOf: attemptsOf, bestOf: bestOf,
             isOpen: function () { return open; }, isRunning: function () { return running; } };
  }

  global.MasteryCore = { create: create };
})(typeof window !== "undefined" ? window : globalThis);
