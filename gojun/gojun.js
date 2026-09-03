/* gojun/gojun.js ─ 語順文法テストの中身（試作 v1）
   ★7つの箱に入れた語を左から読むと英文になる、というのが教える中身なので、
     採点も「箱ごとに合っているか」で見て、1つでも外したら ❌（部分点なし）。
   ★えらぶモードの選択肢は、その項目の5文の答えから作る。項目ごとに作るので、
     現在形の項目に過去形がまざるようなことが起きない。
   ★採点はこのページがやる。生成AIは使わない。 */
(function(){
"use strict";
var $=function(i){return document.getElementById(i);};
var SCREENS=["home","quiz","result"];
var G=window.GOJUN;
function show(n){ SCREENS.forEach(function(s){ $(s).classList.toggle("hide", s!==n); }); window.scrollTo(0,0); }
/* 枠は 文 ＞ 項目 ＞ 既定 の順で決まる。
   ・項目ごと … 比較級・It for to・関係代名詞は7つの箱では測れないので自前の枠を持つ
   ・文ごと  … 実践編は1問ずつ形が変わる（疑問文のときだけ 助動詞／＝ が主語の前に出る） */
function slotsOf(item, sent){ return (sent && sent.slots) || (item && item.slots) || G.slots; }
function esc(s){ return String(s==null?"":s).replace(/[&<>"]/g,function(c){
  return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

/* ================= 記録 ================= */
var KEY="gojun_v1";
function load(){ try{ return JSON.parse(localStorage.getItem(KEY)||"{}"); }catch(e){ return {}; } }
function saveS(s){ try{ localStorage.setItem(KEY, JSON.stringify(s)); }catch(e){} }
function store(){ var s=load(); s.runs=s.runs||[]; s.best=s.best||{}; return s; }

/* ================= 判定のものさし ================= */
/* 全角で打っても半角と同じものとして見る。※学年・番号欄の han() とは別物（あちらは数字だけ残す）。「３」と「3」、「Ｉ」と「I」を
   区別しても学力の差にはならず、スマホの入力モードのちがいで落ちるだけになる。
   U+FF01〜U+FF5E は ASCII の ! 〜 ~ に 1 対 1 で対応しているので、まとめて寄せる。 */
function zenhan(s){
  return String(s==null?"":s)
    .replace(/[！-～]/g,function(c){ return String.fromCharCode(c.charCodeAt(0)-65248); })
    .replace(/　/g," ");
}
function norm(s){
  return zenhan(s).toLowerCase().replace(/['’]/g,"'")
    .replace(/[.,!?;:"“”]/g," ").replace(/\s+/g," ").trim();
}
function same(a,b){ return norm(a)===norm(b); }

/* ================= えらぶモードの選択肢 =================
   その項目の5文から、同じ箱の答えを集めて候補にする。
   足りないぶんは data 側の extra から足す。並びは文ごとに固定
   （見るたびに入れかわると、選び直すときに混乱するため）。 */
function poolOf(item, slotKey){
  var seen={}, out=[];
  item.sents.forEach(function(s){
    var v=(s.fill[slotKey]||{}).en||"";
    if(v && !seen[v.toLowerCase()]){ seen[v.toLowerCase()]=1; out.push(v); }
  });
  ((item.extra||{})[slotKey]||[]).forEach(function(v){
    if(v && !seen[v.toLowerCase()]){ seen[v.toLowerCase()]=1; out.push(v); }
  });
  return out;
}
function hash(str){ var h=2166136261; for(var i=0;i<str.length;i++){ h^=str.charCodeAt(i); h=(h*16777619)>>>0; } return h; }
function choicesFor(item, si, slotKey, answer){
  var pool=poolOf(item, slotKey).filter(function(v){ return !same(v,answer); });
  var seed=hash(item.key+"|"+si+"|"+slotKey), out=[answer];
  // 種から順に取り出す＝同じ問題なら毎回同じ並び
  var idx=[]; pool.forEach(function(_,i){ idx.push(i); });
  while(out.length<5 && idx.length){
    seed=(seed*1103515245+12345)>>>0;
    out.push(pool[idx.splice(seed%idx.length,1)[0]]);
  }
  // 並べかえも種で決める
  for(var i=out.length-1;i>0;i--){
    seed=(seed*1103515245+12345)>>>0;
    var j=seed%(i+1), t=out[i]; out[i]=out[j]; out[j]=t;
  }
  return out;
}

/* ================= ホーム ================= */
var MODE="easy";
$("modeEasy").addEventListener("click",function(){ setMode("easy"); });
$("modeHard").addEventListener("click",function(){ setMode("hard"); });
function setMode(m){
  MODE=m;
  $("modeEasy").classList.toggle("on", m==="easy");
  $("modeHard").classList.toggle("on", m==="hard");
  try{ localStorage.setItem("gojun_mode", m); }catch(e){}
}
function renderHome(){
  var s=store();
  function cardsOf(group){
    return G.items.map(function(it,i){ return {it:it,i:i}; })
      .filter(function(x){ return (x.it.group||"base")===group; })
      .map(function(x){
        var b=s.best[x.it.key]||{};
        var badge = (b.easy!=null||b.hard!=null)
          ? ('<span class="s">最高 '+(b.easy!=null?("えらぶ "+b.easy+"/5"):"")+
             ((b.easy!=null&&b.hard!=null)?"　":"")+(b.hard!=null?("打つ "+b.hard+"/5"):"")+'</span>')
          : '<span class="s">まだ挑戦していません</span>';
        var frame=slotsOf(x.it, x.it.sents[0]).map(function(sl){ return sl.label; }).join("｜");
        return '<button class="item" data-i="'+x.i+'"><div class="e">'+x.it.emoji+'</div>'+
          '<div class="t">'+esc(x.it.title)+'</div><div class="d">'+esc(x.it.lead)+'</div>'+
          '<div class="fr">'+esc(frame)+'</div>'+badge+'</button>';
      }).join("");
  }
  // 3つに分けて見せる。ならびがそのまま学習の順番になる
  var GROUPS=[
    ["base",  "gname",     "🧱 基本の語順（主語｜助動詞／＝｜動詞｜目的語｜その他｜場所｜時間）"],
    ["other", "gname alt", "🧩 この語順では測れないもの（それぞれ専用の枠）"],
    ["kata",  "gname kata","🔄 文の形（箱が動く・消える）　普通 → 疑問 → 命令 → 禁止 → 否定"]
  ];
  $("itemList").innerHTML=GROUPS.map(function(g){
    var cards=cardsOf(g[0]);
    return cards ? ('<div class="'+g[1]+'">'+g[2]+'</div><div class="items">'+cards+'</div>') : "";
  }).join("");
  $("itemList").querySelectorAll(".item").forEach(function(b){
    b.addEventListener("click",function(){ start(+b.getAttribute("data-i")); });
  });
  var box=$("hist");
  if(!s.runs.length){ box.innerHTML='<p class="hint">まだ記録がありません。文法をえらんではじめよう。</p>'; return; }
  var h='<table><thead><tr><th>日付</th><th>文法</th><th>やりかた</th><th>点</th><th>スキップ</th></tr></thead><tbody>';
  s.runs.slice().reverse().slice(0,12).forEach(function(r){
    h+='<tr><td>'+new Date(r.ts).toLocaleDateString("ja-JP")+'</td><td>'+esc(r.title)+'</td>'+
       '<td>'+(r.mode==="easy"?"えらぶ":"打つ")+'</td><td>'+r.got+' / '+r.max+'</td><td>'+(r.skip||0)+'</td></tr>';
  });
  box.innerHTML=h+'</tbody></table>';
}

/* ================= 出題 ================= */
var IT=null, si=0, RUN=null, answered=false;
function start(i){
  IT=G.items[i]; si=0;
  RUN={ts:Date.now(), key:IT.key, title:IT.title, mode:MODE, rows:[], skip:0};
  show("quiz"); renderQ();
}
/* あぶないほうのボタンは2回たずねる。1回のミスタッチで、といた分が消えるため。 */
var quitArmed=0;
$("q_quit").addEventListener("click",function(){
  var b=this;
  if(Date.now()-quitArmed < 4000){ quitArmed=0; show("home"); renderHome(); return; }
  quitArmed=Date.now();
  b.classList.add("armed"); b.textContent="ほんとうに消す？";
  setTimeout(function(){ if(Date.now()-quitArmed>=4000){
    b.classList.remove("armed"); b.textContent="記録せずやめる"; } }, 4100);
});
/* 残りをぜんぶスキップして結果へ。ここまでの点は残る。 */
$("q_skipall").addEventListener("click",function(){
  if(!answered) grade(true);                 // いまの問題もスキップ扱いにする
  while(si < IT.sents.length-1){
    si++;
    var s=IT.sents[si];
    RUN.skip++;
    RUN.rows.push({ja:s.ja, en:s.en, pt:0, skipped:true, miss:[]});
  }
  finish();
});

function renderQ(){
  var s=IT.sents[si];
  answered=false;
  $("q_title").textContent=IT.emoji+" "+IT.title;
  $("q_prog").textContent="第 "+(si+1)+" 文 / "+IT.sents.length;
  $("q_ja").innerHTML=(s.tag?'<span class="qtag2">'+esc(s.tag)+'</span>':"")+esc(s.ja);
  // 実践編は「もとの文をどう変えるか」なので、変える前の文を見せる
  $("q_from").innerHTML = s.from ? ('もとの文 → <span class="en">'+esc(s.from)+'</span>') : "";
  $("q_from").classList.toggle("hide", !s.from);
  $("q_verdict").innerHTML="";
  $("q_check").classList.remove("hide"); $("q_check").disabled=false;
  $("q_next").classList.add("hide");
  $("q_skip").disabled=false; $("q_skipall").disabled=false;
  quitArmed=0; $("q_quit").classList.remove("armed"); $("q_quit").textContent="記録せずやめる";
  $("q_frame").innerHTML=slotsOf(IT,s).map(function(sl,k){
    var f=s.fill[sl.k]||{ja:"（なし）",en:""};
    if(!f.en){
      return '<div class="box empty" data-k="'+sl.k+'"><span class="bh">'+esc(sl.label)+'</span>'+
        (sl.q?'<div class="bq">'+esc(sl.q)+'</div>':'<div class="bq">&nbsp;</div>')+
        '<div class="bj">'+esc(f.ja)+'</div><div class="dash">—</div></div>';
    }
    var input;
    if(MODE==="easy"){
      var cs=choicesFor(IT, si, sl.k, f.en);
      input='<select data-in="'+sl.k+'" title="えらぶ"><option value="">えらぶ</option>'+
        cs.map(function(c){ return '<option title="'+esc(c)+'">'+esc(c)+'</option>'; }).join("")+'</select>';
    } else {
      input='<input type="text" data-in="'+sl.k+'" class="en" placeholder="英語" autocomplete="off" '+
        'autocapitalize="off" autocorrect="off" spellcheck="false">';
    }
    return '<div class="box" data-k="'+sl.k+'"><span class="bh">'+esc(sl.label)+'</span>'+
      (sl.q?'<div class="bq">'+esc(sl.q)+'</div>':'<div class="bq">&nbsp;</div>')+
      '<div class="bj">'+esc(f.ja)+'</div>'+input+'</div>';
  }).join("");
  $("q_frame").querySelectorAll("[data-in]").forEach(function(el){
    el.addEventListener("input", drawBuilt);
    el.addEventListener("change", drawBuilt);
    el.addEventListener("keydown",function(e){ if(e.key==="Enter"&&!answered){ e.preventDefault(); $("q_check").click(); } });
  });
  drawBuilt();
}
function mine(){
  var o={};
  $("q_frame").querySelectorAll("[data-in]").forEach(function(el){ o[el.getAttribute("data-in")]=el.value; });
  return o;
}
/* 埋めるそばから英文が組み上がるのを見せる。左から読むと英文になる、が伝わるように */
function drawBuilt(){
  var s=IT.sents[si], m=mine(), parts=[], any=false;
  slotsOf(IT,s).forEach(function(sl){
    var f=s.fill[sl.k]||{en:""};
    if(!f.en) return;
    var v=String(m[sl.k]||"").trim();
    if(v){ parts.push(esc(v)); any=true; } else parts.push('<span style="color:#c3bfd6">___</span>');
  });
  // 文の終わりの記号は、その文自身のものを使う（疑問文に . をつけない）
  var end=(String(s.en||"").match(/[.?!]$/)||["."])[0];
  $("q_built").innerHTML = any ? (parts.join(" ")+end) : '<span class="ph">箱をうめると、ここに英文ができていきます。</span>';
}

function grade(skipped){
  var s=IT.sents[si], m=mine(), miss=[], all=true;
  slotsOf(IT,s).forEach(function(sl){
    var f=s.fill[sl.k]||{en:""};
    var box=$("q_frame").querySelector('.box[data-k="'+sl.k+'"]');
    if(!f.en) return;                                  // 使わない箱は採点しない
    var v=String(m[sl.k]||"").trim();
    var okv=!skipped && v && same(v,f.en);
    box.classList.add(okv?"ok":"ng");
    box.insertAdjacentHTML("afterbegin",'<span class="mark">'+(okv?"○":"×")+'</span>');
    if(!okv){ all=false; miss.push({label:sl.label, mine:v, ans:f.en}); }
    box.insertAdjacentHTML("beforeend", okv?"":'<div class="right">'+esc(f.en)+'</div>');
    var el=box.querySelector("[data-in]"); if(el) el.disabled=true;
  });
  if(skipped){ all=false; RUN.skip++; }
  var pt=all?1:0;
  RUN.rows.push({ja:s.ja, en:s.en, pt:pt, skipped:!!skipped, miss:miss});
  var v=$("q_verdict");
  v.className=""; v.innerHTML='<div class="verdict '+(all?"ok":"ng")+'">'+
    (all?"○ 完答！ 1点":(skipped?"— スキップ（0点）":"❌ 0点（1つでもちがうと点になりません）"))+
    '<span class="ans">'+esc(s.en)+'</span></div>';
  answered=true;
  $("q_check").classList.add("hide"); $("q_skip").disabled=true;
  var nx=$("q_next"); nx.classList.remove("hide");
  nx.textContent=(si>=IT.sents.length-1)?"結果を見る →":"次へ →";
  nx.focus();
}
$("q_check").addEventListener("click",function(){ if(!answered) grade(false); });
$("q_skip").addEventListener("click",function(){ if(!answered) grade(true); });
$("q_next").addEventListener("click",function(){
  si++;
  if(si>=IT.sents.length){ finish(); return; }
  renderQ();
});

/* ================= 結果 ================= */
var graded=null;
function finish(){
  var got=RUN.rows.reduce(function(a,x){ return a+x.pt; },0), max=RUN.rows.length;
  var pct=max?Math.round(got/max*100):0;
  graded={ts:RUN.ts, key:RUN.key, title:RUN.title, mode:RUN.mode,
          got:got, max:max, pct:pct, skip:RUN.skip, rows:RUN.rows};
  $("r_score").textContent=got+" / "+max;
  $("k_pct").textContent=pct+"%";
  $("k_mode").textContent=(RUN.mode==="easy"?"えらぶ":"打つ");
  $("k_skip").textContent=RUN.skip+"回";
  var note=$("r_note"); note.className="msg show ok";
  note.innerHTML="<b>"+esc(RUN.title)+"</b>　"+max+"文 × 1点 = <b>"+max+"点満点</b>。"+
    (RUN.mode==="easy" ? "　次は「じぶんで打つ」でも同じ点が取れるか試してみよう。"
                       : "　打つモードで取れた点は、そのまま書く力です。");
  var bad=RUN.rows.filter(function(x){ return !x.pt; });
  $("r_detail").innerHTML = bad.length
    ? '<h3>点にならなかった文（'+bad.length+'文）</h3><table><thead><tr><th>日本語</th><th>どの箱を外したか</th>'+
      '<th>正しい英文</th></tr></thead><tbody>'+
      bad.map(function(x){
        var why = x.skipped ? "スキップ"
          : x.miss.map(function(m){ return m.label+"：<span class='en'>"+esc(m.mine||"（空）")+"</span> → <span class='en'>"+esc(m.ans)+"</span>"; }).join("<br>");
        return '<tr><td>'+esc(x.ja)+'</td><td>'+why+'</td><td class="en">'+esc(x.en)+'</td></tr>';
      }).join("")+'</tbody></table>'
    : '<p class="hint">全問完答。次の文法か、「じぶんで打つ」に進もう。</p>';
  // 最高記録は下げない
  var s=store(); var b=s.best[RUN.key]||{};
  if(b[RUN.mode]==null || got>b[RUN.mode]) b[RUN.mode]=got;
  s.best[RUN.key]=b; saveS(s);
  $("saveMsg").className="msg";
  $("saveRun").disabled=false; $("sendRun").disabled=false; $("sendRun").textContent="先生に送信";
  fillIdentity();
  show("result");
}
$("again").addEventListener("click",function(){
  var i=G.items.map(function(x){return x.key;}).indexOf(RUN.key);
  start(i<0?0:i);
});
$("home2").addEventListener("click",function(){ show("home"); renderHome(); });

$("saveRun").addEventListener("click",function(){
  if(!graded) return;
  var s=store();
  s.runs.push({ts:graded.ts, key:graded.key, title:graded.title, mode:graded.mode,
               got:graded.got, max:graded.max, pct:graded.pct, skip:graded.skip});
  saveS(s);
  var m=$("saveMsg"); m.className="msg show ok";
  m.textContent="記録しました（この端末に保存）。これまで"+s.runs.length+"回。";
  this.disabled=true;
});

/* ---------- 先生に送信（自学ログの「語順」レーン） ---------- */
var GAS_URL="https://script.google.com/macros/s/AKfycbzJ2HThmRaf6Okkj682KOlxULwv_uQEtrdwbxCFyqOB5w8yKHa5bRpB9VTCEU3R2bCt/exec";
if(window.SITE) GAS_URL = SITE.gasFor("summary", GAS_URL);
function idGet(k){ try{ return localStorage.getItem("mado_"+k)||""; }catch(e){ return ""; } }
function idSet(k,v){ try{ localStorage.setItem("mado_"+k,v); }catch(e){} }
function han(s){ return String(s||"").replace(/[０-９]/g,function(d){
  return String.fromCharCode(d.charCodeAt(0)-65248); }).replace(/[^0-9]/g,""); }
function fillIdentity(){
  $("f_cls").value=idGet("year"); $("f_num").value=han(idGet("num")); $("f_name").value=idGet("name");
}
$("f_cls").addEventListener("change",function(){ idSet("year",this.value); });
$("f_num").addEventListener("input",function(){ this.value=han(this.value); idSet("num",this.value); });
$("f_name").addEventListener("input",function(){ idSet("name",this.value.trim()); });
function post(obj){
  // HTMLが返ってきたとき r.json() は「Unexpected token '<'」で落ちて原因にたどり着けない。
  // 本文を先に文字列で受けて、何が返ってきたのかを言えるようにする。
  return fetch(GAS_URL,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},
    body:JSON.stringify(obj)}).then(function(r){
      return r.text().then(function(t){
        try{ return JSON.parse(t); }
        catch(e){
          var head=String(t||"").slice(0,300);
          throw new Error((/accounts\.google\.com|Sign in|ログイン/i.test(head) ? "__AUTH__" :
                           /<!DOCTYPE|<html/i.test(head) ? "__HTML__" : "__EMPTY__")+" status="+r.status);
        }
      });
    });
}
$("sendRun").addEventListener("click",function(){
  if(!graded) return;
  var m=$("saveMsg"), btn=this;
  var cls=$("f_cls").value.trim(), num=han($("f_num").value), name=$("f_name").value.trim();
  if(!cls||!num){ m.className="msg show ng"; m.textContent="学年と番号を入れると送信できます。"; return; }
  if(!GAS_URL){ m.className="msg show ng";
    m.textContent=(window.SITE&&SITE.isTrial)?"実証用の送信先が未設定です。":"送信先(GAS)が未設定です。"; return; }
  btn.disabled=true; btn.textContent="送信中…";
  m.className="msg show"; m.textContent="送信しています…";
  post({action:"policy"}).then(function(j){
    var ver=(j&&j.ver)||"";
    if(!/jigaku/.test(ver)) throw new Error("__OLD__"+ver);
    var weak=graded.rows.filter(function(x){ return !x.pt; })
      .map(function(x){ return x.en; }).join(" / ");
    var payload={kind:"jigaku", ver:"gojun 1.0", cls:cls, num:num, name:name,
      lane:"語順", unit:graded.title, src:(graded.mode==="easy"?"えらぶ":"打つ"), listN:graded.max,
      total:graded.max, ok:graded.got, pct:graded.pct, promptV:"",
      notDb:graded.skip, weak:weak.slice(0,400)};
    if(window.SITE) SITE.tag(payload);
    return post(payload);
  }).then(function(j){
    if(j&&j.result==="ok"){ m.className="msg show ok";
      m.textContent="先生に送りました ✓（"+new Date().toLocaleString("ja-JP")+"）";
      btn.textContent="送信ずみ ✓"; }
    else throw new Error((j&&j.message)||"server");
  }).catch(function(err){
    var s=String(err.message||err);
    m.className="msg show ng";
    if(s.indexOf("__AUTH__")>=0||s.indexOf("__HTML__")>=0||s.indexOf("__EMPTY__")>=0){
      var tail=String(GAS_URL).replace(/^.*\/macros\/s\//,"").slice(0,14);
      m.innerHTML="先生へ：送信先が<b>スクリプトではなくページを返しています</b>。"+
        "デプロイのURLか公開設定を確認してください。<br>いま送った先：<code>…"+esc(tail)+"…</code>"+
        ((window.SITE&&SITE.isTrial)?"（<b>実証モード</b>で送信中）":"（通常モード）")+"<br>記録は端末には残っています。";
    } else if(s.indexOf("__OLD__")>=0){
      m.innerHTML="先生へ：スプレッドシート側がまだ自学ログに対応していません（いまの版 "+
        esc(s.replace(/^Error: /,"").replace("__OLD__",""))+"）。<br>"+
        "<code>tools/score_gas.gs</code> を貼り直して「新バージョン」で再デプロイしてください。記録は端末には残っています。";
    } else m.textContent="送信できませんでした。電波を確認してもう一度。（"+s.slice(0,40)+"）";
    btn.disabled=false; btn.textContent="先生に送信";
  });
});

(function init(){
  try{ var m=localStorage.getItem("gojun_mode"); if(m==="hard"||m==="easy") setMode(m); }catch(e){}
  renderHome();
})();
})();
