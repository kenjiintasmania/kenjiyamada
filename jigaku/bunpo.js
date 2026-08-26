/* jigaku/bunpo.js ─ 文法レーンの中身（第1弾＝現在完了形）
   ・基本文・訳・解説はアプリが持つ固定教材（data/bunpo_kanryo.js）。AIには作らせない。
   ・写経と「訳→英文」はアプリの中だけで完結する。
   ・AIに任せるのは選択5＋並べかえ5のランダマイズだけ。しかも1問ずつ出させる
     （10問まとめて出すと、並べかえは書く量が多すぎて手が止まるため）。
   ・採点はAIの丸つけを使わず、貼られた「わたしの答え」と「正解」だけで再計算する。 */
(function(){
"use strict";
var $=function(i){return document.getElementById(i);};
var SCREENS=["intro","learn","build","paste","result"];
var AI_URL="https://www.google.com/search?udm=50";
var G=window.BUNPO_KANRYO;
function openAImode(){ try{ window.open(AI_URL,"_blank","noopener"); }catch(e){ location.href=AI_URL; } }
function show(n){ SCREENS.forEach(function(s){ $(s).classList.toggle("hide", s!==n); }); window.scrollTo(0,0);
  if(n==="intro") renderHome(); }
document.querySelectorAll("[data-go]").forEach(function(b){
  b.addEventListener("click",function(){ show(b.getAttribute("data-go")); }); });
function esc(s){ return String(s==null?"":s).replace(/[&<>"]/g,function(c){
  return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

/* ================= 中1語彙の判定（警告に使う） ================= */
var MUST=["already","yet","ever","never","since","for","just","twice","once","times","time","been","gone"];
var G1={}, BASE={};
(function(){
  if(window.WORDS) WORDS.forEach(function(x){ if(x.g<=1) G1[nw(x.w)]=1; });
  if(window.KATSUYO_WORDS){
    var byKid={};
    KATSUYO_WORDS.forEach(function(x){ (byKid[x.kid]=byKid[x.kid]||[])[x.slot]=x.w; });
    Object.keys(byKid).forEach(function(k){
      var a=byKid[k], b=nw(a[0]);
      a.forEach(function(f){ if(f) BASE[nw(f)]=b; });
    });
  }
  MUST.forEach(function(w){ G1[nw(w)]=1; });
})();
function nw(s){ return String(s==null?"":s).toLowerCase().replace(/[^a-z']/g,""); }
function inG1(word){
  var t=nw(word); if(!t) return true;
  if(G1[t]||(BASE[t]&&G1[BASE[t]])) return true;
  var c=[t.replace(/ies$/,"y"), t.replace(/(es|s)$/,""), t.replace(/ed$/,""), t.replace(/ed$/,"e"),
         t.replace(/ing$/,""), t.replace(/ing$/,"e"), t.replace(/([a-z])\1(ed|ing)$/,"$1")];
  for(var i=0;i<c.length;i++){ if(G1[c[i]]||(BASE[c[i]]&&G1[BASE[c[i]]])) return true; }
  return false;
}
function outOfG1(text){
  var out=[];
  String(text||"").split(/(?:[.!?]\s+)|\n/).forEach(function(sent){
    sent.trim().split(/\s+/).forEach(function(raw,i){
      var w=raw.replace(/^[^A-Za-z']+|[^A-Za-z']+$/g,"");
      if(!w) return;
      if(i>0 && /^[A-Z]/.test(w)) return;      // 文頭以外の大文字始まり＝固有名詞とみなす
      if(!inG1(w)) out.push(w.toLowerCase());
    });
  });
  return out;
}

/* ================= 記録 ================= */
var KEY="jigaku_v1";
function load(){ try{ return JSON.parse(localStorage.getItem(KEY)||"{}"); }catch(e){ return {}; } }
function saveS(s){ try{ localStorage.setItem(KEY, JSON.stringify(s)); }catch(e){} }
function store(){ var s=load(); s.bunpo=s.bunpo||{prompts:[],runs:[]}; return s; }

/* ================= 判定のものさし（単語レーンと同じ） ================= */
function norm(s){
  return String(s==null?"":s).toLowerCase().replace(/['’]/g,"")
    .replace(/[.,!?;:"“”]/g," ").replace(/\s+/g," ").trim();
}
function words(s){ return norm(s).split(" ").filter(Boolean); }
function edist(a,b){
  var m=a.length,n=b.length,d=[],i,j;
  for(i=0;i<=m;i++) d[i]=[i];
  for(j=0;j<=n;j++) d[0][j]=j;
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
    if(edist(A[i],B[i])<=1){ diff++; continue; }
    return false;
  }
  return diff>0;
}
/* 用途で見かたを変える。
   "exact"  … 選択問題。選択肢はどれも別の語なので、一致か不一致だけ。
              ever と never を「1文字ちがい＝つづりミス」と見なしてはいけない。
   "order"  … 並べかえ。完答のみ。ちがう理由（順番／つづり）は出すが点は0。
   "recall" … 訳から思い出して書く。つづりミスは −1。 */
function judge(mine,ans,pt,mode){
  if(!String(mine||"").trim()) return {tag:"—", pt:0, why:"書けなかった"};
  if(norm(mine)===norm(ans)) return {tag:"○", pt:pt, why:""};
  if(mode==="exact") return {tag:"×", pt:0, why:""};
  if(sameBag(mine,ans)) return {tag:"×", pt:0, why:"語はそろっているが順番がちがう"};
  if(spellOnly(mine,ans)){
    return (mode==="recall") ? {tag:"△", pt:Math.max(0,pt-1), why:"つづりミス −1"}
                             : {tag:"×", pt:0, why:"つづりミス（並べかえは完答のみ）"};
  }
  return {tag:"×", pt:0, why:""};
}

/* ================= ① 覚える一覧 ================= */
(function renderGuide(){
  $("gTitle").textContent=G.title;
  $("gLead").innerHTML=G.lead;
  $("gCore").innerHTML='<table>'+G.core.map(function(c){
    return '<tr><th>'+esc(c.h)+'</th><td>'+c.t+'</td></tr>'; }).join('')+'</table>';
  var byUse={};
  G.sentences.forEach(function(s){ (byUse[s.use]=byUse[s.use]||[]).push(s); });
  $("gList").innerHTML=G.uses.map(function(u){
    return '<h3>'+esc(u.k)+'　<span style="font-weight:normal;color:#5a6473">'+esc(u.label)+'</span></h3>'+
      '<p class="hint" style="margin:0 0 6px">'+u.t+'</p>'+
      (byUse[u.k]||[]).map(function(s){
        return '<div class="kihon"><div class="e">'+esc(s.en)+'</div>'+
          '<div class="j">'+esc(s.ja)+'</div><div class="k">'+esc(s.tip)+'</div></div>';
      }).join('');
  }).join('');
})();
$("startPractice").addEventListener("click",function(){ startLearn(); });

/* ================= ②③ アプリの中で打つ ================= */
var STEPS=[
  {k:"copy",  t:"② 見ながら打つ", lead:"上の英文を見ながら、そのまま打つ。つづりに気をつけて。"},
  {k:"recall",t:"③ 訳を見て打つ", lead:"日本語だけを見て、さっきの英文を思い出して打つ。"}
];
var ALL=["① 覚える","② 写す","③ 思い出す","④ AIで10問","⑤ 貼って採点"];
function chips(now){
  return ALL.map(function(t,i){ return '<span class="'+(i===now?"now":(i<now?"done":""))+'">'+t+'</span>'; }).join("");
}
var si=0, R=null;
function startLearn(){
  si=0;
  R={ts:Date.now(), item:G.key, copy:[], recall:[], sel:[], wo:[], promptV:null};
  show("learn"); renderStep();
}
function renderStep(){
  var st=STEPS[si];
  $("learnSteps").innerHTML=chips(si+1);
  $("stepTitle").textContent=st.t;
  $("stepLead").textContent=st.lead;
  $("stepMsg").className="msg";
  $("stepNext").classList.add("hide");
  $("stepCheck").classList.remove("hide");
  var b=$("stepBody");
  b.innerHTML=G.sentences.map(function(s,i){
    return '<div class="q" id="q'+i+'"><div class="qh">'+s.use+' '+(i+1)+'</div>'+
      (st.k==="copy" ? '<div class="qs">'+esc(s.en)+'</div>' : '<div class="qj">'+esc(s.ja)+'</div>')+
      '<input type="text" class="en" id="in'+i+'" placeholder="'+(st.k==="copy"?"そのまま打つ":"英語で打つ")+
      '" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"></div>';
  }).join("");
}
$("stepCheck").addEventListener("click",function(){
  var st=STEPS[si], msg=$("stepMsg");
  var rows=G.sentences.map(function(s,i){
    var mine=$("in"+i).value;
    var v=judge(mine, s.en, st.k==="copy"?1:4, "recall");
    var q=$("q"+i); q.className="q "+(v.tag==="○"?"ok":(v.tag==="△"?"mid":"ng"));
    $("in"+i).disabled=true;
    q.insertAdjacentHTML("beforeend",'<div class="verdict">'+v.tag+
      (st.k==="copy"?"":" "+v.pt+"点")+
      (v.tag==="○" ? (st.k==="copy"?" そのとおり":"") :
        ' <small>'+(v.why?esc(v.why)+"／":"")+'正しくは <span class="ans">'+esc(s.en)+'</span></small>')+'</div>');
    return {en:s.en, ja:s.ja, mine:mine, tag:v.tag, pt:v.pt, why:v.why};
  });
  if(st.k==="copy"){
    R.copy=rows;
    var miss=rows.filter(function(x){return x.tag!=="○";}).length;
    msg.className="msg show "+(miss?"warn":"ok");
    msg.textContent= miss ? ("見ながらでも "+miss+"文まちがえました。つづりを1文字ずつ見直そう。")
                          : "全部そのとおりに打てました。";
  } else {
    R.recall=rows;
    var got=rows.reduce(function(a,x){return a+x.pt;},0);
    msg.className="msg show ok";
    msg.textContent="思い出せたぶん "+got+" / "+(G.sentences.length*4)+" 点。";
  }
  this.classList.add("hide");
  $("stepNext").classList.remove("hide");
  $("stepNext").textContent=(si>=STEPS.length-1)?"④ AIモードへ →":"次へ →";
});
$("stepNext").addEventListener("click",function(){
  si++;
  if(si>=STEPS.length){ show("build"); prefill(); $("aiSteps").innerHTML=chips(3); return; }
  renderStep();
});

/* ================= ④ AIモードのプロンプト ================= */
function buildPrompt(mine){
  var p=[];
  p.push("あなたは中学英語の先生です。わたしに「"+G.key+"」の問題を出してください。");
  p.push("");
  p.push("【出す問題】ぜんぶで10問。");
  p.push("　・1〜5問目：選択問題（かっこに入る語を、4つの中から選ぶ形）");
  p.push("　・6〜10問目：並べかえ問題（日本語を見て、あなたが示した語を正しい順にならべる形）");
  p.push("");
  p.push("【いちばん大事な決まり】");
  p.push("　・**1問ずつ**出してください。わたしが答えるまで、次の問題を出さないでください。");
  p.push("　・わたしが答えたら、○×も解説もまだ書かないでください。「次の問題です」とだけ言って進んでください。");
  p.push("　・10問終わってから、最後に下の【まとめ】を1回だけ出してください。");
  p.push("");
  p.push("【使う単語】中学1年で習う英単語だけを使ってください。");
  p.push("　ただし already / yet / ever / never / since / for / just / twice / once と、動詞の過去分詞形は");
  p.push("　使ってよいです。人名・地名は自由です。");
  p.push("");
  p.push("【もとにする文】下の9文の形をもとに、語や場面を入れかえて作ってください。");
  G.sentences.forEach(function(s,i){ p.push("　"+(i+1)+". "+s.en); });
  if(mine && mine.trim()) p.push("");
  if(mine && mine.trim()) p.push("【わたしからの注文】"+mine.trim().replace(/\n/g,"／"));
  p.push("");
  p.push("【まとめ】※この書式は1文字も変えないでください");
  p.push("=== BUNPO ===");
  p.push("項目: "+G.key);
  p.push("no | 種別 | 問題 | わたしの答え | 正解");
  p.push("1 | 選択 | （出した英文。かっこはそのまま） | （わたしが選んだ語） | （正しい語）");
  p.push("6 | 並べかえ | （日本語） | （わたしが書いた英文をそのまま） | （正しい英文）");
  p.push("=== END ===");
  p.push("");
  p.push("・区切りは半角の縦棒 | を使ってください。1問を1行に書いてください。");
  p.push("・「わたしの答え」には、わたしが書いたものを直さずそのまま入れてください（まちがいもそのまま）。");
  p.push("・○×や点数は書かないでください。採点はわたしのアプリがやります。");
  return p.join("\n");
}
var current=null;
function prefill(){
  var s=store(), last=s.bunpo.prompts[s.bunpo.prompts.length-1];
  $("verNote").textContent = last ? ("いまの最新は v"+last.v+"（"+new Date(last.ts).toLocaleDateString("ja-JP")+"）")
                                  : "まだ作ったことがありません";
}
$("mkPrompt").addEventListener("click",function(){
  var mine=$("f_mine").value;
  var s=store(), v=(s.bunpo.prompts.length? s.bunpo.prompts[s.bunpo.prompts.length-1].v:0)+1;
  var text=buildPrompt(mine);
  current={v:v, ts:Date.now(), item:G.key, mine:mine, text:text};
  s.bunpo.prompts.push(current); saveS(s);
  if(R) R.promptV=v;
  $("promptText").textContent=text;
  $("promptBox").classList.remove("hide");
  $("verNote").textContent="v"+v+" として保存しました";
});
$("loadLast").addEventListener("click",function(){
  var s=store(), last=s.bunpo.prompts[s.bunpo.prompts.length-1];
  if(!last){ $("verNote").textContent="前回の版がまだありません"; return; }
  $("f_mine").value=last.mine||"";
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
$("goPaste").addEventListener("click",function(){ show("paste"); $("pasteSteps").innerHTML=chips(4); });

/* ================= ⑤ まとめの読み取り ================= */
function cells(line){
  var c=String(line).replace(/｜/g,"|").split("|").map(function(x){return x.trim();});
  while(c.length&&c[0]==="") c.shift();
  while(c.length&&c[c.length-1]==="") c.pop();
  return c;
}
function parseSummary(raw){
  var txt=String(raw||"").replace(/\r/g,"");
  var i=txt.indexOf("=== BUNPO ==="), j=txt.indexOf("=== END ===");
  var body=(i>=0)? txt.slice(i+13, j>i? j: txt.length) : txt;
  var rows=[], bad=0, item="";
  body.split("\n").forEach(function(line){
    var s=line.trim(); if(!s) return;
    var mi=s.match(/^項目\s*[:：]\s*(.+)$/); if(mi){ item=mi[1].split("|")[0].trim(); return; }
    if(s.indexOf("|")<0) return;
    var c=cells(s);
    if(!c.length) return;
    if(/^[-:\s]+$/.test(c.join(""))) return;                      // |---|---|
    if(/^no$/i.test(c[0])||/種別/.test(c[1]||"")) return;          // 見出し行
    if(!/^\d+$/.test(c[0].replace(/[^0-9]/g,""))) { bad++; return; }
    if(c.length<5){ bad++; return; }
    var no=parseInt(c[0].replace(/[^0-9]/g,""),10);
    var kind=/並べ?かえ|並替|順/.test(c[1]) ? "wo" : (/選/.test(c[1]) ? "sel" : (no<=5?"sel":"wo"));
    rows.push({no:no, kind:kind, q:c[2], mine:c[3], ans:c[4]});
  });
  return {item:item, rows:rows, bad:bad};
}

var graded=null;
$("doLoad").addEventListener("click",function(){
  var msg=$("pasteMsg"), vm=$("vocabMsg");
  msg.className="msg"; vm.className="msg";
  var p=parseSummary($("f_paste").value);
  if(!p.rows.length){
    msg.className="msg show ng";
    msg.innerHTML="✗ まとめを読み取れませんでした。<br>AIにこう言い直してみよう：<br>"+
      "<code>さっきの10問を、no | 種別 | 問題 | わたしの答え | 正解 の5列で、"+
      "=== BUNPO === と === END === ではさんで出し直して</code>";
    return;
  }
  // 中1範囲外の語を知らせる（止めはしない）
  var bad={}, list=[];
  p.rows.forEach(function(r){ outOfG1(r.ans+" "+(r.kind==="sel"?r.q.replace(/\(.*?\)/g," "):""))
    .forEach(function(w){ if(!bad[w]){ bad[w]=1; list.push(w); } }); });
  if(list.length){
    vm.className="msg show warn";
    vm.innerHTML="⚠ 中1で習わない語が"+list.length+"語ありました：<b class='en'>"+
      esc(list.slice(0,12).join(", "))+(list.length>12?" …":"")+"</b>　採点はそのまま続けます。";
  }
  // 採点：AIの丸つけは見ない。わたしの答えと正解の一致だけで決める
  p.rows.forEach(function(r){
    var pt=(r.kind==="sel")?2:4;
    var v=judge(r.mine, r.ans, pt, r.kind==="sel"?"exact":"order");
    r.tag=v.tag; r.pt=v.pt; r.why=v.why;
    (r.kind==="sel"?R.sel:R.wo).push(r);
  });
  finish(p);
});

/* ================= 結果 ================= */
function finish(p){
  var maxR=G.sentences.length*4;
  var gotR=R.recall.reduce(function(a,x){return a+x.pt;},0);
  var maxS=R.sel.length*2, gotS=R.sel.reduce(function(a,x){return a+x.pt;},0);
  var maxW=R.wo.length*4,  gotW=R.wo.reduce(function(a,x){return a+x.pt;},0);
  var got=gotR+gotS+gotW, max=maxR+maxS+maxW, pct=max?Math.round(got/max*100):0;
  var copyMiss=R.copy.filter(function(x){return x.tag!=="○";}).length;
  graded={ts:R.ts, item:G.key, promptV:R.promptV, got:got, max:max, pct:pct, copyMiss:copyMiss,
          selOK:R.sel.filter(function(x){return x.pt===2;}).length, selN:R.sel.length,
          woOK:R.wo.filter(function(x){return x.pt===4;}).length, woN:R.wo.length,
          recall:R.recall, sel:R.sel, wo:R.wo, bad:p.bad};
  $("r_score").textContent=got+" / "+max;
  $("k_pct").textContent=pct+"%";
  $("k_copy").textContent=copyMiss+"文";
  $("k_sel").textContent=graded.selOK+" / "+graded.selN;
  $("k_wo").textContent=graded.woOK+" / "+graded.woN;
  var note=$("r_note"); note.className="msg show ok";
  note.innerHTML="AIの丸つけは使わず、<b>「わたしの答え」と「正解」だけ</b>で計算しました。"+
    (copyMiss?("　見ながらの写しで"+copyMiss+"文まちがえたのは、つづりを見る練習が要るサインです。"):"")+
    (p.bad?("　読み取れなかった行が"+p.bad+"行ありました。"):"");
  var weak=[].concat(
    R.recall.filter(function(x){return x.tag!=="○";}).map(function(x){return {t:"思い出す", mine:x.mine, ans:x.en, why:x.why};}),
    R.sel.filter(function(x){return x.pt<2;}).map(function(x){return {t:"選択", mine:x.mine, ans:x.ans, why:x.why};}),
    R.wo.filter(function(x){return x.pt<4;}).map(function(x){return {t:"並べかえ", mine:x.mine, ans:x.ans, why:x.why};}));
  $("r_detail").innerHTML = weak.length
    ? '<h3>まちがえたところ</h3><table><thead><tr><th>どこ</th><th>あなた</th><th>正解</th><th>なぜ</th></tr></thead><tbody>'+
      weak.map(function(x){ return '<tr><td>'+x.t+'</td><td class="en">'+esc(x.mine||"（空）")+
        '</td><td class="en">'+esc(x.ans)+'</td><td>'+esc(x.why||"")+'</td></tr>'; }).join("")+'</tbody></table>'
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
      graded.sel.filter(function(x){return x.pt<2;}).map(function(x){return x.ans;}),
      graded.wo.filter(function(x){return x.pt<4;}).map(function(x){return x.ans;})).join(" / ");
    var payload={kind:"jigaku", ver:"bunpo 0.2", cls:cls, num:num, name:name,
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
  if(!s.bunpo.runs.length){ box.innerHTML='<p class="hint">まだ記録がありません。上の基本文をおぼえて、練習へ進もう。</p>'; return; }
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
