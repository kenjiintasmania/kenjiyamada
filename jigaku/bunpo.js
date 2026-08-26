/* jigaku/bunpo.js ─ 文法レーンの中身
   ・AIには問題だけ作らせ、答えはこのページの中で受け取る（AIの丸つけを一切通さない）
   ・語彙は中1に固定。項目ごとの必須語だけ例外にし、外れたら警告する（止めはしない） */
(function(){
"use strict";
var $=function(i){return document.getElementById(i);};
var SCREENS=["intro","build","paste","learn","result"];
var AI_URL="https://www.google.com/search?udm=50";
function openAImode(){ try{ window.open(AI_URL,"_blank","noopener"); }catch(e){ location.href=AI_URL; } }
function show(n){ SCREENS.forEach(function(s){ $(s).classList.toggle("hide", s!==n); }); window.scrollTo(0,0);
  if(n==="intro") renderHome(); }
document.querySelectorAll("[data-go]").forEach(function(b){
  b.addEventListener("click",function(){ show(b.getAttribute("data-go")); }); });

function esc(s){ return String(s==null?"":s).replace(/[&<>"]/g,function(c){
  return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

/* ================= 文法項目 ================= *
 * must … その文法を教えるのに要るが中1範囲外の語。中1チェックの例外にする。
 *        （already / yet / ever / since は中3語だが、完了形では避けられない） */
var ITEM = {
  key:"現在完了形",
  guide:"have / has + 過去分詞。「ずっと〜している（継続）」「〜したことがある（経験）」"+
        "「〜したところだ（完了）」の3つの使い方がある。",
  must:["already","yet","ever","never","since","for","just","twice","once","times","time",
        "before","ago","ever","yet","already","been","gone","seen","eaten","written","spoken",
        "known","taken","given","done","made","read","met","heard","bought","lived","played",
        "studied","visited","finished","started","used","how","long","many"]
};

/* ================= 中1語彙の判定 ================= */
var G1={}, BASE={};
(function(){
  if(window.WORDS) WORDS.forEach(function(x){ if(x.g<=1) G1[nw(x.w)]=1; });
  if(window.KATSUYO_WORDS){                       // 活用形 → 原形
    var byKid={};
    KATSUYO_WORDS.forEach(function(x){ (byKid[x.kid]=byKid[x.kid]||[])[x.slot]=x.w; });
    Object.keys(byKid).forEach(function(k){
      var a=byKid[k], b=nw(a[0]);
      a.forEach(function(f){ if(f) BASE[nw(f)]=b; });
    });
  }
  ITEM.must.forEach(function(w){ G1[nw(w)]=1; });
})();
function nw(s){ return String(s==null?"":s).toLowerCase().replace(/[^a-z']/g,""); }
function inG1(word){
  var t=nw(word); if(!t) return true;
  if(G1[t]) return true;
  if(BASE[t]&&G1[BASE[t]]) return true;
  var c=[t.replace(/ies$/,"y"), t.replace(/(es|s)$/,""), t.replace(/ed$/,""), t.replace(/ed$/,"e"),
         t.replace(/ing$/,""), t.replace(/ing$/,"e"), t.replace(/([a-z])\1(ed|ing)$/,"$1")];
  for(var i=0;i<c.length;i++){ if(G1[c[i]]||(BASE[c[i]]&&G1[BASE[c[i]]])) return true; }
  return false;
}
// 文の中の「中1範囲外」の語を集める。文頭以外の大文字始まりは固有名詞とみなして見逃す。
function outOfG1(text){
  var out=[];
  String(text||"").split(/(?<=[.!?])\s+|\n/).forEach(function(sent){
    sent.trim().split(/\s+/).forEach(function(raw,i){
      var w=raw.replace(/^[^A-Za-z']+|[^A-Za-z']+$/g,"");
      if(!w) return;
      if(i>0 && /^[A-Z]/.test(w)) return;          // 固有名詞
      if(!inG1(w)) out.push(w.toLowerCase());
    });
  });
  return out;
}

/* ================= 記録（単語レーンと同じ箱） ================= */
var KEY="jigaku_v1";
function load(){ try{ return JSON.parse(localStorage.getItem(KEY)||"{}"); }catch(e){ return {}; } }
function saveS(s){ try{ localStorage.setItem(KEY, JSON.stringify(s)); }catch(e){} }
function store(){ var s=load(); s.bunpo=s.bunpo||{prompts:[],runs:[]}; return s; }

/* ================= 判定のものさし（単語レーンと同じ） ================= */
function norm(s){
  return String(s==null?"":s).toLowerCase().replace(/['’]/g,"")
    .replace(/[.,!?;:"“”]/g," ").replace(/\s+/g," ").trim();
}
var words=function(s){ return norm(s).split(" ").filter(Boolean); };
function ed(a,b){
  var m=a.length,n=b.length,d=[],i,j;
  for(i=0;i<=m;i++){ d[i]=[i]; }
  for(j=0;j<=n;j++){ d[0][j]=j; }
  for(i=1;i<=m;i++) for(j=1;j<=n;j++){
    d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a.charAt(i-1)===b.charAt(j-1)?0:1));
    if(i>1&&j>1&&a.charAt(i-1)===b.charAt(j-2)&&a.charAt(i-2)===b.charAt(j-1))
      d[i][j]=Math.min(d[i][j],d[i-2][j-2]+1);
  }
  return d[m][n];
}
function sameBag(a,b){ var f=function(x){ return words(x).slice().sort().join(" "); }; return f(a)===f(b); }
function spellOnly(mine,ans){
  var A=words(mine),B=words(ans);
  if(A.length!==B.length||!A.length) return false;
  var diff=0;
  for(var i=0;i<A.length;i++){
    if(A[i]===B[i]) continue;
    if(ed(A[i],B[i])<=1){ diff++; continue; }
    return false;
  }
  return diff>0;
}
// ○＝満点 ／ △＝つづりミスで−1 ／ ×＝0。語順ちがいを先に見る（つづりと取りちがえないため）
function judge(mine,ans,pt){
  if(!String(mine||"").trim()) return {tag:"—", pt:0, why:"書けなかった"};
  if(norm(mine)===norm(ans)) return {tag:"○", pt:pt, why:""};
  if(sameBag(mine,ans)) return {tag:"×", pt:0, why:"語はそろっているが順番がちがう"};
  if(spellOnly(mine,ans)) return {tag:"△", pt:Math.max(0,pt-1), why:"つづりミス −1"};
  return {tag:"×", pt:0, why:""};
}

/* ================= プロンプト ================= */
$("itemName").textContent=ITEM.key;
$("mustWords").innerHTML="ただし <b>already / yet / ever / since</b> などは完了形に必要なので使ってよいことにします。";

function buildPrompt(nk,mine){
  var p=[];
  p.push("あなたは中学英語の先生です。わたしのために「"+ITEM.key+"」の教材を作ってください。");
  p.push("");
  p.push("【文法項目】"+ITEM.key+"（"+ITEM.guide+"）");
  p.push("【使う単語】中学1年で習う英単語だけを使ってください。");
  p.push("　ただし "+ITEM.key+" に必要な already / yet / ever / never / since / for / just / twice / once");
  p.push("　と、動詞の過去分詞形は使ってよいです。人名・地名は自由です。");
  p.push("【作るもの】次の3つを1回のメッセージでまとめて出してください。");
  p.push("　1. 基本文 "+nk+"つ（英文・日本語訳・かんたんな解説）");
  p.push("　2. 選択問題 5問（かっこに入る語を4つの中から選ぶ形）");
  p.push("　3. 並べかえ問題 5問（日本語を見て、与えた語を正しい順にならべる形）");
  if(mine && mine.trim()) p.push("【わたしからの注文】"+mine.trim().replace(/\n/g,"／"));
  p.push("");
  p.push("【出し方】※この書式は1文字も変えないでください");
  p.push("=== BUNPO ===");
  p.push("項目: "+ITEM.key);
  p.push("[基本文]");
  p.push("1 | （英文） | （日本語訳） | （解説を1〜2文で）");
  p.push("[選択]");
  p.push("1 | （英文。入るところは半角の ( ) にする） | （選択肢4つを / で区切る） | （正解の語） | （解説を1文で）");
  p.push("[並べかえ]");
  p.push("1 | （日本語訳） | （ならべる語を / で区切る） | （正しい英文）");
  p.push("=== END ===");
  p.push("");
  p.push("・区切りは半角の縦棒 | を使ってください。1問を1行に書いてください。");
  p.push("・並べかえの「ならべる語」は、正しい英文の語をばらばらの順にしたものにしてください。");
  p.push("・答えはこの書式の中だけに書いてください。わたしに問いかけたり、解かせたりしないでください。");
  return p.join("\n");
}
var current=null;
$("mkPrompt").addEventListener("click",function(){
  var nk=parseInt($("f_kihon").value,10)||4, mine=$("f_mine").value;
  var s=store(), v=(s.bunpo.prompts.length? s.bunpo.prompts[s.bunpo.prompts.length-1].v:0)+1;
  var text=buildPrompt(nk,mine);
  current={v:v, ts:Date.now(), item:ITEM.key, nk:nk, mine:mine, text:text};
  s.bunpo.prompts.push(current); saveS(s);
  $("promptText").textContent=text;
  $("promptBox").classList.remove("hide");
  $("verNote").textContent="v"+v+" として保存しました";
});
$("loadLast").addEventListener("click",function(){
  var s=store(), last=s.bunpo.prompts[s.bunpo.prompts.length-1];
  if(!last){ $("verNote").textContent="前回の版がまだありません"; return; }
  $("f_kihon").value=String(last.nk||4); $("f_mine").value=last.mine||"";
  $("verNote").textContent="v"+last.v+" を読み込みました。書き足して v"+(last.v+1)+" にしよう。";
});
$("copyPrompt").addEventListener("click",function(){
  var t=$("promptText").textContent, b=this;
  function done(){ b.textContent="コピーしました ✓"; setTimeout(function(){ b.textContent="📋 ① コピーする"; },1600); }
  if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(t).then(done,fb); } else fb();
  function fb(){ var ta=document.createElement("textarea"); ta.value=t; document.body.appendChild(ta);
    ta.select(); try{ document.execCommand("copy"); done(); }catch(e){} document.body.removeChild(ta); }
});
$("openAI").addEventListener("click", openAImode);
$("goPaste").addEventListener("click",function(){ show("paste"); });
$("toBuild").addEventListener("click",function(){ show("build"); prefill(); });
$("toPasteDirect").addEventListener("click",function(){ show("paste"); });
function prefill(){
  var s=store(), last=s.bunpo.prompts[s.bunpo.prompts.length-1];
  $("verNote").textContent = last ? ("いまの最新は v"+last.v+"（"+new Date(last.ts).toLocaleDateString("ja-JP")+"）")
                                  : "まだ作ったことがありません";
}

/* ================= 教材の読み取り ================= */
/* 縦棒で区切られた表を、見出し［基本文］［選択］［並べかえ］ごとに拾う。
   markdown の表・行頭行末の | ・区切り行 |---| も通す。 */
function cells(line){
  var c=String(line).replace(/｜/g,"|").split("|").map(function(x){return x.trim();});
  while(c.length&&c[0]==="") c.shift();
  while(c.length&&c[c.length-1]==="") c.pop();
  return c;
}
function parseMaterial(raw){
  var txt=String(raw||"").replace(/\r/g,"");
  var i=txt.indexOf("=== BUNPO ==="), j=txt.indexOf("=== END ===");
  var body=(i>=0)? txt.slice(i+13, j>i? j: txt.length) : txt;
  var mode="", out={item:"", kihon:[], sel:[], wo:[]}, bad=0;
  body.split("\n").forEach(function(line){
    var s=line.trim(); if(!s) return;
    var mi=s.match(/^項目\s*[:：]\s*(.+)$/); if(mi){ out.item=mi[1].split("|")[0].trim(); return; }
    if(/\[?\s*基本文\s*\]?$/.test(s)&&s.length<10){ mode="k"; return; }
    if(/\[?\s*選択\s*\]?$/.test(s)&&s.length<10){ mode="s"; return; }
    if(/\[?\s*並べ?かえ\s*\]?$/.test(s)&&s.length<12){ mode="w"; return; }
    if(s.indexOf("|")<0) return;
    var c=cells(s);
    if(!c.length) return;
    if(/^[-:\s]+$/.test(c.join(""))) return;                 // |---|---|
    if(!/^\d+$/.test(c[0].replace(/[^0-9]/g,""))) return;    // 見出し行など
    var no=parseInt(c[0].replace(/[^0-9]/g,""),10);
    if(mode==="k"){
      if(c.length<3){ bad++; return; }
      out.kihon.push({no:no, en:c[1], ja:c[2], note:c[3]||""});
    } else if(mode==="s"){
      if(c.length<4){ bad++; return; }
      var ch=c[2].split("/").map(function(x){return x.trim();}).filter(Boolean);
      if(ch.length<2){ bad++; return; }
      out.sel.push({no:no, q:c[1], choices:ch, ans:c[3], note:c[4]||""});
    } else if(mode==="w"){
      if(c.length<4){ bad++; return; }
      var ws=c[2].split("/").map(function(x){return x.trim();}).filter(Boolean);
      if(ws.length<2){ bad++; return; }
      out.wo.push({no:no, ja:c[1], words:ws, ans:c[3]});
    }
  });
  out.bad=bad;
  return out;
}

var M=null;   // いま読み込んでいる教材
$("doLoad").addEventListener("click",function(){
  var msg=$("pasteMsg"), vm=$("vocabMsg");
  msg.className="msg"; vm.className="msg";
  var m=parseMaterial($("f_paste").value);
  if(!m.kihon.length || m.sel.length<1 || m.wo.length<1){
    msg.className="msg show ng";
    msg.innerHTML="✗ 教材を読み取れませんでした（基本文"+m.kihon.length+"／選択"+m.sel.length+"／並べかえ"+m.wo.length+"）。<br>"+
      "AIにこう言い直してみよう：<br><code>さっきの教材を、=== BUNPO === と === END === ではさんで、"+
      "[基本文] [選択] [並べかえ] の見出しごとに、1問1行・縦棒 | 区切りで出し直して</code>";
    return;
  }
  // 中1範囲外の語を集めて知らせる（止めはしない）
  var pool=[];
  m.kihon.forEach(function(k){ pool.push(k.en); });
  m.sel.forEach(function(q){ pool.push(q.q.replace(/\(.*?\)/g," ")); pool.push(q.choices.join(" ")); });
  m.wo.forEach(function(q){ pool.push(q.ans); });
  var bad={}, list=[];
  pool.forEach(function(t){ outOfG1(t).forEach(function(w){ if(!bad[w]){ bad[w]=1; list.push(w); } }); });
  if(list.length){
    vm.className="msg show warn";
    vm.innerHTML="⚠ 中1で習わない語が"+list.length+"語あります：<b class='en'>"+esc(list.slice(0,12).join(", "))+
      (list.length>12?" …":"")+"</b><br>そのまま進めても構いません。気になるなら"+
      "「<code>中1で習う単語だけで作り直して</code>」とAIに言って、作り直したものを貼りなおしてください。";
  }
  M=m;
  startLearn();
});

/* ================= 学習の進行 ================= */
var STEPS=[
  {k:"read",  t:"① 基本文を読む",       lead:"英文・訳・解説をよく読む。ここでおぼえる。"},
  {k:"copy",  t:"② 見ながら打つ",       lead:"上の英文を見ながら、そのまま打つ。つづりに気をつけて。"},
  {k:"recall",t:"③ 訳を見て打つ",       lead:"日本語だけを見て、さっきの英文を思い出して打つ。"},
  {k:"sel",   t:"④ 選択 5問",           lead:"かっこに入る語をえらぶ。"},
  {k:"wo",    t:"⑤ 並べかえ 5問",       lead:"日本語に合うように、語をタップしてならべる。もう一度タップで取り消し。"}
];
var si=0, R=null;
function startLearn(){
  si=0;
  R={ts:Date.now(), item:M.item||ITEM.key, promptV:(current?current.v:null),
     copy:[], recall:[], sel:[], wo:[]};
  show("learn"); renderStep();
}
function renderStep(){
  var st=STEPS[si];
  $("learnSteps").innerHTML='<span class="done">教材を作る</span><span class="done">貼る</span>'+
    STEPS.map(function(x,i){ return '<span class="'+(i===si?"now":(i<si?"done":""))+'">'+
      x.t.replace(/^[①-⑤]\s*/,"")+'</span>'; }).join("");
  $("stepTitle").textContent=st.t;
  $("stepLead").textContent=st.lead;
  $("stepMsg").className="msg";
  $("stepNext").classList.add("hide");
  $("stepCheck").classList.remove("hide");
  $("stepCheck").disabled=false;
  var b=$("stepBody"); b.innerHTML="";
  if(st.k==="read"){
    b.innerHTML=M.kihon.map(function(k){
      return '<div class="kihon"><div class="e">'+esc(k.en)+'</div><div class="j">'+esc(k.ja)+'</div>'+
        (k.note?'<div class="k">'+esc(k.note)+'</div>':'')+'</div>'; }).join("");
    $("stepCheck").classList.add("hide");
    $("stepNext").classList.remove("hide");
  } else if(st.k==="copy"){
    b.innerHTML=M.kihon.map(function(k,i){
      return '<div class="q" id="cq'+i+'"><div class="qh">'+(i+1)+'</div>'+
        '<div class="qs">'+esc(k.en)+'</div>'+
        '<input type="text" class="en" id="ci'+i+'" placeholder="ここに打つ" autocomplete="off" autocapitalize="off" spellcheck="false"></div>'; }).join("");
  } else if(st.k==="recall"){
    b.innerHTML=M.kihon.map(function(k,i){
      return '<div class="q" id="rq'+i+'"><div class="qh">'+(i+1)+'</div>'+
        '<div class="qj">'+esc(k.ja)+'</div>'+
        '<input type="text" class="en" id="ri'+i+'" placeholder="英語で打つ" autocomplete="off" autocapitalize="off" spellcheck="false"></div>'; }).join("");
  } else if(st.k==="sel"){
    b.innerHTML=M.sel.map(function(q,i){
      return '<div class="q" id="sq'+i+'"><div class="qh">'+(i+1)+'</div>'+
        '<div class="qs">'+esc(q.q)+'</div><div class="ch" id="sc'+i+'">'+
        q.choices.map(function(c,ci){ return '<button type="button" data-q="'+i+'" data-c="'+ci+'">'+esc(c)+'</button>'; }).join("")+
        '</div></div>'; }).join("");
    b.querySelectorAll(".ch button").forEach(function(bt){
      bt.addEventListener("click",function(){
        var qi=bt.getAttribute("data-q");
        $("sc"+qi).querySelectorAll("button").forEach(function(x){ x.classList.remove("on"); });
        bt.classList.add("on");
      });
    });
  } else if(st.k==="wo"){
    b.innerHTML=M.wo.map(function(q,i){
      return '<div class="q" id="wq'+i+'"><div class="qh">'+(i+1)+'</div>'+
        '<div class="qj">'+esc(q.ja)+'</div>'+
        '<div class="wo-build" id="wb'+i+'"></div><div class="wo-bank" id="wk'+i+'"></div></div>'; }).join("");
    M.wo.forEach(function(q,i){ drawWO(i,q,[]); });
  }
}
var woSeq={};
function drawWO(i,q,seq){
  woSeq[i]=seq;
  var build=$("wb"+i), bank=$("wk"+i);
  build.innerHTML = seq.length? "" : '<span class="wo-empty">ここに語がならびます →</span>';
  seq.forEach(function(wi,pos){
    var c=document.createElement("button"); c.type="button"; c.className="chip in"; c.textContent=q.words[wi];
    c.addEventListener("click",function(){ var s=seq.slice(); s.splice(pos,1); drawWO(i,q,s); });
    build.appendChild(c);
  });
  bank.innerHTML="";
  q.words.forEach(function(w,wi){
    if(seq.indexOf(wi)>=0) return;
    var c=document.createElement("button"); c.type="button"; c.className="chip"; c.textContent=w;
    c.addEventListener("click",function(){ drawWO(i,q,seq.concat([wi])); });
    bank.appendChild(c);
  });
}
$("stepNext").addEventListener("click",function(){
  si++;
  if(si>=STEPS.length){ finish(); return; }
  renderStep();
});
$("stepCheck").addEventListener("click",function(){
  var st=STEPS[si], msg=$("stepMsg");
  if(st.k==="copy"){
    R.copy=M.kihon.map(function(k,i){
      var mine=$("ci"+i).value, v=judge(mine,k.en,1);
      var q=$("cq"+i); q.className="q "+(v.tag==="○"?"ok":(v.tag==="△"?"mid":"ng"));
      $("ci"+i).disabled=true;
      q.insertAdjacentHTML("beforeend",'<div class="verdict">'+v.tag+
        (v.tag==="○"?" そのとおり":(' <small>正しくは <span class="ans">'+esc(k.en)+'</span></small>'))+'</div>');
      return {en:k.en, mine:mine, tag:v.tag};
    });
    var miss=R.copy.filter(function(x){ return x.tag!=="○"; }).length;
    msg.className="msg show "+(miss?"warn":"ok");
    msg.textContent= miss? ("見ながらでも "+miss+"文まちがえました。つづりを1文字ずつ見直そう。")
                         : "全部そのとおりに打てました。";
  } else if(st.k==="recall"){
    R.recall=M.kihon.map(function(k,i){
      var mine=$("ri"+i).value, v=judge(mine,k.en,4);
      var q=$("rq"+i); q.className="q "+(v.tag==="○"?"ok":(v.tag==="△"?"mid":"ng"));
      $("ri"+i).disabled=true;
      q.insertAdjacentHTML("beforeend",'<div class="verdict">'+v.tag+" "+v.pt+"点"+
        (v.tag==="○"?"":(' <small>'+(v.why?esc(v.why)+"／":"")+'正しくは <span class="ans">'+esc(k.en)+'</span></small>'))+'</div>');
      return {en:k.en, mine:mine, tag:v.tag, pt:v.pt, why:v.why};
    });
    var got=R.recall.reduce(function(a,x){return a+x.pt;},0);
    msg.className="msg show ok"; msg.textContent="思い出せたぶん "+got+" / "+(M.kihon.length*4)+" 点。";
  } else if(st.k==="sel"){
    R.sel=M.sel.map(function(q,i){
      var on=$("sc"+i).querySelector("button.on");
      var mine=on? on.textContent : "";
      var ok=!!mine && norm(mine)===norm(q.ans);
      $("sc"+i).querySelectorAll("button").forEach(function(bt){
        bt.disabled=true;
        if(norm(bt.textContent)===norm(q.ans)) bt.classList.add("right");
        else if(bt.classList.contains("on")) bt.classList.add("wrong");
      });
      var el=$("sq"+i); el.className="q "+(ok?"ok":"ng");
      el.insertAdjacentHTML("beforeend",'<div class="verdict">'+(ok?"○ 2点":"× 0点")+
        (ok?"":' <small>正解は <span class="ans">'+esc(q.ans)+'</span></small>')+
        (q.note?'<br><small>'+esc(q.note)+'</small>':'')+'</div>');
      return {q:q.q, mine:mine, ans:q.ans, ok:ok, pt:ok?2:0};
    });
    var n=R.sel.filter(function(x){return x.ok;}).length;
    msg.className="msg show ok"; msg.textContent=n+" / "+M.sel.length+" 問正解。";
  } else if(st.k==="wo"){
    R.wo=M.wo.map(function(q,i){
      var seq=woSeq[i]||[];
      var mine=seq.map(function(wi){return q.words[wi];}).join(" ");
      var ok=!!mine && norm(mine)===norm(q.ans);            // 並べかえは完答のみ
      $("wb"+i).querySelectorAll("button").forEach(function(b){ b.disabled=true; });
      $("wk"+i).querySelectorAll("button").forEach(function(b){ b.disabled=true; });
      var el=$("wq"+i); el.className="q "+(ok?"ok":"ng");
      el.insertAdjacentHTML("beforeend",'<div class="verdict">'+(ok?"○ 4点":"× 0点")+
        (ok?"":' <small>正解は <span class="ans">'+esc(q.ans)+'</span></small>')+'</div>');
      return {ja:q.ja, mine:mine, ans:q.ans, ok:ok, pt:ok?4:0};
    });
    var m2=R.wo.filter(function(x){return x.ok;}).length;
    msg.className="msg show ok"; msg.textContent=m2+" / "+M.wo.length+" 問正解（並べかえは完答のみ）。";
  }
  this.classList.add("hide");
  $("stepNext").classList.remove("hide");
  $("stepNext").textContent = (si>=STEPS.length-1) ? "結果を見る →" : "次へ →";
});

/* ================= 結果 ================= */
var graded=null;
function finish(){
  var maxR=M.kihon.length*4, maxS=M.sel.length*2, maxW=M.wo.length*4;
  var gotR=R.recall.reduce(function(a,x){return a+x.pt;},0);
  var gotS=R.sel.reduce(function(a,x){return a+x.pt;},0);
  var gotW=R.wo.reduce(function(a,x){return a+x.pt;},0);
  var got=gotR+gotS+gotW, max=maxR+maxS+maxW;
  var pct=max? Math.round(got/max*100):0;
  var copyMiss=R.copy.filter(function(x){return x.tag!=="○";}).length;
  graded={ts:R.ts, item:R.item, promptV:R.promptV, got:got, max:max, pct:pct,
          copyMiss:copyMiss, sel:gotS/2, selN:M.sel.length, wo:gotW/4, woN:M.wo.length,
          recall:R.recall, selRows:R.sel, woRows:R.wo};
  $("r_score").textContent=got+" / "+max;
  $("k_pct").textContent=pct+"%";
  $("k_copy").textContent=copyMiss+"文";
  $("k_sel").textContent=(gotS/2)+" / "+M.sel.length;
  $("k_wo").textContent=(gotW/4)+" / "+M.wo.length;
  var note=$("r_note"); note.className="msg show ok";
  note.innerHTML="AIの丸つけは使っていません。<b>答えはこのページの外に出ていません。</b>"+
    (copyMiss?("　見ながらの写しで"+copyMiss+"文まちがえたのは、つづりを見る練習が要るサインです。"):"");
  var weak=[].concat(
    R.recall.filter(function(x){return x.tag!=="○";}).map(function(x){return {t:"思い出す", mine:x.mine, ans:x.en};}),
    R.sel.filter(function(x){return !x.ok;}).map(function(x){return {t:"選択", mine:x.mine, ans:x.ans};}),
    R.wo.filter(function(x){return !x.ok;}).map(function(x){return {t:"並べかえ", mine:x.mine, ans:x.ans};}));
  $("r_detail").innerHTML = weak.length
    ? '<h3>まちがえたところ</h3><table><thead><tr><th>どこ</th><th>あなた</th><th>正解</th></tr></thead><tbody>'+
      weak.map(function(x){ return '<tr><td>'+x.t+'</td><td class="en">'+esc(x.mine||"（空）")+
        '</td><td class="en">'+esc(x.ans)+'</td></tr>'; }).join("")+'</tbody></table>'
    : '<p class="hint">まちがいなし。次はAIに「もっとむずかしく」と注文してみよう。</p>';
  $("saveMsg").className="msg";
  $("saveRun").disabled=false; $("sendRun").disabled=false; $("sendRun").textContent="先生に送信";
  fillIdentity();
  show("result");
}

$("saveRun").addEventListener("click",function(){
  if(!graded) return;
  var s=store();
  s.bunpo.runs.push({ts:graded.ts, item:graded.item, got:graded.got, max:graded.max, pct:graded.pct,
    copyMiss:graded.copyMiss, promptV:graded.promptV});
  saveS(s);
  var m=$("saveMsg"); m.className="msg show ok";
  m.textContent="記録しました（この端末に保存）。これまで"+s.bunpo.runs.length+"回。";
  this.disabled=true;
});

/* ---------- 先生に送信（自学ログの「文法」レーン） ---------- */
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
  return fetch(GAS_URL,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},
    body:JSON.stringify(obj)}).then(function(r){ return r.json(); });
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
    var weak=[].concat(
      graded.selRows.filter(function(x){return !x.ok;}).map(function(x){return x.ans;}),
      graded.woRows.filter(function(x){return !x.ok;}).map(function(x){return x.ans;})).join(" / ");
    var payload={kind:"jigaku", ver:"bunpo 0.1", cls:cls, num:num, name:name,
      lane:"文法", unit:graded.item, src:"アプリ内", listN:"",
      total:graded.max, ok:graded.got, pct:graded.pct,
      promptV:(graded.promptV?("v"+graded.promptV):""),
      notDb:graded.copyMiss, weak:weak.slice(0,400)};
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
    if(s.indexOf("__OLD__")>=0){
      m.innerHTML="先生へ：スプレッドシート側がまだ自学ログに対応していません（いまの版 "+
        esc(s.replace(/^Error: /,"").replace("__OLD__",""))+"）。<br>"+
        "<code>tools/score_gas.gs</code> を貼り直して「新バージョン」で再デプロイしてください。記録は端末には残っています。";
    } else m.textContent="送信できませんでした。電波を確認してもう一度。（"+s.slice(0,40)+"）";
    btn.disabled=false; btn.textContent="先生に送信";
  });
});

/* ---------- 履歴 ---------- */
function renderHome(){
  var s=store(), box=$("hist");
  if(!s.bunpo.runs.length){ box.innerHTML='<p class="hint">まだ記録がありません。上から始めてみよう。</p>'; return; }
  var h='<table><thead><tr><th>日付</th><th>項目</th><th>点</th><th>正答率</th><th>写しミス</th><th>版</th></tr></thead><tbody>';
  s.bunpo.runs.slice().reverse().slice(0,12).forEach(function(r){
    h+='<tr><td>'+new Date(r.ts).toLocaleDateString("ja-JP")+'</td><td>'+esc(r.item)+'</td>'+
       '<td>'+r.got+' / '+r.max+'</td><td>'+r.pct+'%</td><td>'+(r.copyMiss||0)+'</td>'+
       '<td>'+(r.promptV?("v"+r.promptV):"—")+'</td></tr>';
  });
  box.innerHTML=h+'</tbody></table>';
}
renderHome();
})();
