/* assets/site.js ─ 送信先（サイト）の切り替え
 * ------------------------------------------------------------------
 * 目的：外部での実地検証（麻生情報システム）のとき、記録が「生徒用スプレッドシート」
 *       ではなく「実証用スプレッドシート」に届くようにする。
 *
 * 設計の要点（安全側）：
 *   1) 通常モードでは何も変えない。gasFor() は既定URLをそのまま返す＝生徒の経路は無改変。
 *   2) 実証モードで送信先が未設定なら、空文字を返して「送信できない」状態にする。
 *      ＝生徒用シートへ誤って落ちることは構造的に起こらない。
 *   3) 実証モード中は全画面の先頭に帯を出し、いつでも通常へ戻せる。
 *   4) 実証モードは TTL_DAYS 日で自動失効（戻し忘れ対策）。
 *
 * 使い方：
 *   ・実証モードにする  … URLに ?site=aso を付けて開く（/trial/ の各リンクが付与済み）
 *   ・通常モードに戻す  … 帯の「通常モードにもどす」／ URLに ?site=school
 *
 * ★先生へ：下の TRIAL_GAS に、試用版GAS（tools/score_gas_trial.gs をデプロイして
 *   得られる /exec のURL）を貼ってください。手順は trial/SETUP.md にあります。
 * ------------------------------------------------------------------ */
(function(){
  "use strict";

  var TTL_DAYS = 60;                 // 実証モードの自動失効（日）
  var KEY = "mado_site", KEY_EXP = "mado_site_until";

  /* ★ここに試用版GASのURLを貼る（summary と eiken は同じURLでOK）。
     空のままだと実証モードでは送信されません（生徒用には絶対に入りません）。 */
  var TRIAL_GAS = {
    summary: "https://script.google.com/macros/s/AKfycbyKM0YO4nJJbmql__uBVRXiaKKbDY7-wAK03xZo_Jjez6tCBTgsKnMYPkvtj3BcZd0IAg/exec",     // マイページ・模試（単元テスト）用
    eiken:   "https://script.google.com/macros/s/AKfycbyKM0YO4nJJbmql__uBVRXiaKKbDY7-wAK03xZo_Jjez6tCBTgsKnMYPkvtj3BcZd0IAg/exec"      // 英検アプリ用
  };

  var SITES = {
    school: { label:"", trial:false },
    aso:    { label:"麻生情報システム 実証", trial:true }
  };

  function lsGet(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function lsSet(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  function lsDel(k){ try{ localStorage.removeItem(k); }catch(e){} }

  /* ---- 現在のサイトを決める：URLパラメータ > 端末の記憶（期限内） > 通常 ---- */
  function resolve(){
    var prm=null; try{ prm=new URLSearchParams(location.search); }catch(e){}
    var q = prm && prm.get("site");
    if(q && SITES[q]){
      if(SITES[q].trial){ lsSet(KEY,q); lsSet(KEY_EXP, String(Date.now()+TTL_DAYS*86400000)); }
      else { lsDel(KEY); lsDel(KEY_EXP); }
      return q;
    }
    var saved = lsGet(KEY);
    if(saved && SITES[saved] && SITES[saved].trial){
      var until = parseInt(lsGet(KEY_EXP)||"0", 10);
      if(until && Date.now() > until){ lsDel(KEY); lsDel(KEY_EXP); return "school"; }  // 自動失効
      return saved;
    }
    return "school";
  }

  var id = resolve();
  var conf = SITES[id] || SITES.school;

  var SITE = {
    id: id,
    label: conf.label,
    isTrial: !!conf.trial,

    /* 送信先の解決。通常モードでは既定URLをそのまま返す（＝無改変）。 */
    gasFor: function(kind, defaultUrl){
      if(!this.isTrial) return defaultUrl;
      return TRIAL_GAS[kind] || "";        // 未設定なら "" ＝ 送信しない
    },

    /* 実証モードのときだけ payload に site を足す（通常時の送信内容は変えない）。 */
    tag: function(payload){
      if(this.isTrial && payload && typeof payload==="object") payload.site = this.id;
      return payload;
    },

    /* 内部リンクに ?site= を伝播させる（端末記憶に加えた二重の保険）。 */
    href: function(url){
      if(!this.isTrial || !url) return url;
      if(/^(https?:|mailto:|tel:|javascript:|#)/i.test(url)) return url;
      if(/[?&]site=/.test(url)) return url;
      var hash="", u=url, i=u.indexOf("#");
      if(i>=0){ hash=u.slice(i); u=u.slice(0,i); }
      return u + (u.indexOf("?")>=0 ? "&" : "?") + "site=" + encodeURIComponent(this.id) + hash;
    },

    /* 実証モードを解除して通常に戻す。 */
    exit: function(reload){
      lsDel(KEY); lsDel(KEY_EXP);
      if(reload!==false){
        var u = location.pathname + location.search.replace(/([?&])site=[^&]*/,"$1").replace(/[?&]$/,"");
        location.href = u.replace(/\?&/,"?");
      }
    },

    /* 実証モードで送信先が未設定かどうか（帯の文言用）。 */
    needsSetup: function(){ return this.isTrial && !this.trialConfigured(); },

    /* 以下は設定確認用（モードに関係なく素の値を返す）。trial/ の設定画面が使う。 */
    trialConfigured: function(){ return !!(TRIAL_GAS.summary || TRIAL_GAS.eiken); },
    trialUrl: function(kind){ return TRIAL_GAS[kind] || ""; }
  };
  window.SITE = SITE;

  /* ---- 実証モードの帯（全画面共通・固定配置にしないので既存レイアウトを壊さない） ---- */
  function banner(){
    if(!SITE.isTrial || document.getElementById("siteBanner")) return;
    var st=document.createElement("style");
    st.textContent =
      "#siteBanner{background:#2d2438;color:#fff;font-size:13px;line-height:1.5;"+
      "padding:8px 14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;justify-content:center}"+
      "#siteBanner b{color:#ffd9a8}"+
      "#siteBanner .warn{color:#ffb4a2;font-weight:bold}"+
      "#siteBanner button{font:inherit;font-size:12px;font-weight:bold;cursor:pointer;"+
      "border:none;border-radius:999px;padding:5px 14px;background:#fff;color:#2d2438}";
    document.head.appendChild(st);
    var bar=document.createElement("div"); bar.id="siteBanner";
    var txt = SITE.needsSetup()
      ? '<span>🧪 <b>'+SITE.label+'</b>（試用版）</span><span class="warn">送信先が未設定のため、記録は送信されません</span>'
      : '<span>🧪 <b>'+SITE.label+'</b>（試用版）</span><span>記録は実証用シートに届きます（生徒用には入りません）</span>';
    bar.innerHTML = txt;
    var b=document.createElement("button"); b.type="button"; b.textContent="通常モードにもどす";
    b.addEventListener("click",function(){ SITE.exit(); });
    bar.appendChild(b);
    if(document.body.firstChild) document.body.insertBefore(bar, document.body.firstChild);
    else document.body.appendChild(bar);
    // 画面内リンクにも site を伝播（動的追加分は端末記憶が担保する）
    var as=document.querySelectorAll("a[href]");
    for(var i=0;i<as.length;i++){
      var h=as[i].getAttribute("href");
      var n=SITE.href(h); if(n!==h) as[i].setAttribute("href", n);
    }
  }
  if(document.body) banner();
  else document.addEventListener("DOMContentLoaded", banner);
})();
