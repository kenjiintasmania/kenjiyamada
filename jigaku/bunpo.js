/* jigaku/bunpo.js ─ 文法レーンの中身
   ★ 出題の根拠は、生徒が持ってきたキーセンテンスだけ。教科書名から推測しない。
     （教科書は学年・地域で変わる。単元名は根拠にならない）
   ★ 1文につき、ちょうど5問＝5点。
        写しがき1 ▶ 英訳1 ▶ 一部空欄2 ▶ 並びかえ1　すべて1点。
     5種類とも貼られた英文から機械的に作れるので、AIモードは使わない。
   ★ 採点はこのページがやる。生成AIの丸つけは1文字も点に変えない。 */
(function(){
"use strict";
var $=function(i){return document.getElementById(i);};
var SCREENS=["intro","learn","result"];
function show(n){ SCREENS.forEach(function(s){ $(s).classList.toggle("hide", s!==n); }); window.scrollTo(0,0); }
function esc(s){ return String(s==null?"":s).replace(/[&<>"]/g,function(c){
  return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

/* ================= 記録 ================= */
var KEY="jigaku_v1";
function load(){ try{ return JSON.parse(localStorage.getItem(KEY)||"{}"); }catch(e){ return {}; } }
function saveS(s){ try{ localStorage.setItem(KEY, JSON.stringify(s)); }catch(e){} }
function store(){ var s=load(); s.bunpo=s.bunpo||{}; s.bunpo.runs=s.bunpo.runs||[]; return s; }

/* ================= 単元えらび（単語レーンとそろえる） ================= */
(function fillUnits(){
  var u=$("f_unum"), l=$("f_lnum"), i;
  for(i=0;i<=15;i++) u.insertAdjacentHTML("beforeend",'<option value="'+i+'">'+i+'</option>');
  for(i=1;i<=15;i++) l.insertAdjacentHTML("beforeend",'<option value="'+i+'">'+i+'</option>');
})();
function unitNum(){ return $("f_unum").value; }   // "0" もありうるので、空文字だけを未選択とみなす
function listNum(){ return $("f_lnum").value; }
function fullName(){
  if(unitNum()===""||listNum()==="") return "";
  return $("f_kind").value+" "+unitNum()+"-"+listNum();
}
function echoUnit(){
  var nm=fullName();
  $("unitEcho").innerHTML = nm
    ? ("記録される名前 → <b>"+esc(nm)+"</b>")
    : "2つとも選ぶと、ここに記録される名前が出ます";
  $("f_unum").classList.toggle("bad", unitNum()==="");
  $("f_lnum").classList.toggle("bad", listNum()==="");
}
["f_kind","f_unum","f_lnum"].forEach(function(id){ $(id).addEventListener("change", echoUnit); });

/* ================= キーセンテンスの読み取り =================
   教科書のキーセンテンス欄は、並びかたが本によってちがう。
   ・英文の行と訳の行が交互
   ・1行に英文と訳が両方
   ・番号（1. / (1) / ・）つき
   どれでも読めるようにする。読めなかった行は捨てずに、画面に出して直させる。 */
var JA_RE=/[ぁ-んァ-ヶ一-龥々ー〜、。「」『』（）：＝]/;
var EN_RE=/[A-Za-z]/;
function stripNum(s){ return s.replace(/^\s*(?:[（(]?\d+[.)．）、:：]?|[・•▶▷>*\-–—])\s*/,""); }
function tidyEn(s){ return String(s||"").replace(/\s+/g," ").trim(); }
function tidyJa(s){
  return String(s||"").replace(/^[\s（("「『:：=＝|｜]+/,"").replace(/[）)"」』|｜]+\s*$/,"").replace(/\s+/g," ").trim();
}
function parseSentences(raw){
  var out=[], pendEN=null, pendJA=null;
  function push(en,ja){ out.push({en:tidyEn(en), ja:tidyJa(ja)}); }
  String(raw||"").replace(/\r/g,"").split("\n").forEach(function(line){
    var s=stripNum(line.trim());
    if(!s) return;
    var hasJa=JA_RE.test(s), hasEn=EN_RE.test(s);
    if(hasEn&&hasJa){
      var i=s.search(JA_RE);
      var en=s.slice(0,i).replace(/[\s|｜\t=＝:：\/,]+$/,"");
      if(EN_RE.test(en)){                    // 区切りの左に英字がある＝1行に両方入っている
        if(pendEN!=null){ push(pendEN,""); pendEN=null; }
        push(en, s.slice(i)); pendJA=null; return;
      }
      hasEn=false;                           // 日本語の行に英字記号がまじっただけ
    }
    if(hasEn){
      if(pendJA!=null){ push(s,pendJA); pendJA=null; return; }
      if(pendEN!=null) push(pendEN,"");      // 英文が2行つづいた＝前の文に訳がない
      pendEN=s; return;
    }
    if(hasJa){
      if(pendEN!=null){ push(pendEN,s); pendEN=null; return; }
      pendJA=s;
    }
  });
  if(pendEN!=null) push(pendEN,"");
  out.forEach(function(x){
    x.toks=tokens(x.en);
    x.ng = !x.ja ? "日本語訳がありません" : (x.toks.length<3 ? "英文が短すぎます（3語以上）" : "");
  });
  return out;
}
function tokens(en){
  return String(en||"").trim().split(/\s+/).filter(function(t){ return /[A-Za-z0-9]/.test(t); });
}

/* ================= 空欄にする語をえらぶ =================
   文法の自学なので、内容語ではなく「文法をになう語」を抜く。
   a / the は抜いても文法の勉強にならないので、最後まで選ばない。 */
var RANK=[
  /* 100点：文の骨組み（be・助動詞・完了・否定） */
  ["am","is","are","was","were","be","been","being","have","has","had",
   "will","would","shall","should","can","could","may","might","must",
   "do","does","did","not","never","dont","doesnt","didnt","cant","wont",
   "isnt","arent","wasnt","werent","havent","hasnt","hadnt","couldnt","shouldnt","mustnt"],
  /* 90点：単元のねらいになりやすい語（完了・比較・関係詞・接続詞） */
  ["already","yet","ever","just","since","ago","still","before","after","twice","once",
   "than","more","most","much","many","as","who","which","that","whose","whom",
   "what","where","when","why","how","if","because","but","so","while","though","when"],
  /* 80点：前置詞・to不定詞 */
  ["to","in","on","at","by","with","from","of","about","into","over","under",
   "between","during","without","through","for","and","or"]
];
function bare(t){ return String(t||"").toLowerCase().replace(/[^a-z0-9']/g,"").replace(/'/g,""); }
function blankScore(tok){
  var t=bare(tok);
  if(!t) return 0;
  for(var r=0;r<RANK.length;r++) if(RANK[r].indexOf(t)>=0) return 100-r*10;
  if(/(ing|ed)$/.test(t)&&t.length>4) return 70;      // 動詞の形が変わっている＝そこも文法
  if(t==="a"||t==="an"||t==="the") return 1;          // 冠詞は最後の最後
  return 30+Math.min(t.length,9);                     // 残りは長い語ほど手ごたえがある
}
function pickBlanks(toks){
  var bag=toks.map(bare);
  /* 比較級・最上級は -er / -est の語そのものがねらい。ただし father・water まで
     抜いてしまうので、than / most / the ○○est がある文のときだけ持ち上げる。 */
  var cmp = bag.indexOf("than")>=0;
  var sup = bag.indexOf("most")>=0 || bag.some(function(w,i){
              return /est$/.test(w) && w.length>4 && bag[i-1]==="the"; });
  var sc=[];
  toks.forEach(function(t,i){
    var s=blankScore(t), w=bag[i];
    if(cmp && /er$/.test(w)  && w.length>3) s=Math.max(s,95);
    if(sup && /est$/.test(w) && w.length>3) s=Math.max(s,95);
    if(s>0) sc.push({i:i, s:s, w:w});
  });
  sc.sort(function(a,b){ return b.s-a.s || a.i-b.i; });
  if(sc.length<2) return sc.map(function(x){ return x.i; });
  /* 2問とも同じ語だと練習にならないので、2つめは別の語から取る。
     となり合わせは避けない。1問に1つしか穴を見せないので、読みにくくならない。 */
  var first=sc[0], second=null, k;
  for(k=1;k<sc.length;k++){ if(sc[k].w!==first.w){ second=sc[k]; break; } }
  if(!second) second=sc[1];
  return [first.i, second.i].sort(function(a,b){ return a-b; });
}
/* 並べかえの札。文末の . や , は落とす。残すと「どれが最後か」がタダで分かってしまう */
function chipList(toks){
  return toks.map(function(t){ return t.replace(/[.,!?;:]+$/,""); }).filter(Boolean);
}
function shuffled(a){
  if(a.length<2) return a.slice();
  var b,t=0;
  do{ b=a.slice();
      for(var i=b.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)),x=b[i]; b[i]=b[j]; b[j]=x; }
      t++;
  } while(t<25 && b.join(" ")===a.join(" "));
  return b;
}

/* ================= 判定のものさし（単語レーンと同じ） ================= */
function norm(s){
  return String(s==null?"":s).toLowerCase().replace(/['’]/g,"")
    .replace(/[.,!?;:"“”]/g," ").replace(/\s+/g," ").trim();
}
function words(s){ return norm(s).split(" ").filter(Boolean); }
function edist(a,b){                                   // Damerau-Levenshtein（入れかえも1回とみなす）
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
/* 1問1点。だから「おしい」でも点は動かない。かわりに、なぜ×なのかは必ず出す。
   ・写しがき … 見ながら写すだけなので、ちがえば写しまちがい
   ・並びかえ … 完答のみ（業者テストもそう）
   ・英訳／空欄 … つづりミスは0点。ただし △ と出して「おしい」と分かるようにする */
function judge(mine,ans,mode){
  if(!String(mine||"").trim()) return {tag:"—", pt:0, why:"書けなかった"};
  if(norm(mine)===norm(ans))   return {tag:"○", pt:1, why:""};
  if(sameBag(mine,ans))        return {tag:"×", pt:0, why:"語はそろっているが、順番がちがう"};
  if(spellOnly(mine,ans))      return {tag:"△", pt:0,
    why:(mode==="copy")?"写しまちがい（つづり）":"つづりが1文字ちがう"};
  return {tag:"×", pt:0, why:""};
}

/* ================= ① 画面 ================= */
var TYPES={
  copy :{tag:"写しがき", lead:"下の英文を見ながら、そのまま打つ。"},
  trans:{tag:"英訳",     lead:"日本語だけを見て、英文を思い出して打つ。"},
  blank:{tag:"一部空欄", lead:"( ) に入る語を1つだけ書く。"},
  order:{tag:"並びかえ", lead:"札を順にタップして英文を作る。"}
};
var parsed=[];
function renderPreview(){
  var box=$("preview"), msg=$("rawMsg");
  parsed=parseSentences($("f_raw").value);
  if(!parsed.length){ box.innerHTML=""; msg.className="msg"; return; }
  var okN=parsed.filter(function(x){ return !x.ng; }).length;
  box.innerHTML='<h3>読み取り（'+parsed.length+'文）</h3>'+parsed.map(function(x,i){
    return '<div class="kihon'+(x.ng?" bad":"")+'"><div class="e">'+esc(x.en)+'</div>'+
      (x.ja?'<div class="j">'+esc(x.ja)+'</div>':"")+
      (x.ng?'<div class="warn">⚠ '+esc(x.ng)+'</div>':"")+'</div>';
  }).join("");
  msg.className="msg show "+(okN===parsed.length?"ok":(okN?"warn":"ng"));
  msg.innerHTML = okN
    ? ("使える文 <b>"+okN+"文</b> → <b>"+(okN*5)+"点満点</b>（1文5問）"+
       (okN<parsed.length?("　※ "+(parsed.length-okN)+"文は使えません。上の⚠を直してください。"):""))
    : "使える文がありません。英文とその日本語訳を、両方入れてください。";
}
var tmr=null;
$("f_raw").addEventListener("input",function(){ clearTimeout(tmr); tmr=setTimeout(renderPreview,400); });
$("checkRaw").addEventListener("click", renderPreview);
$("loadLast").addEventListener("click",function(){
  var s=store();
  if(!s.bunpo.raw){ $("rawMsg").className="msg show warn"; $("rawMsg").textContent="前に入れた文がありません。"; return; }
  $("f_raw").value=s.bunpo.raw;
  if(s.bunpo.kind) $("f_kind").value=s.bunpo.kind;
  if(s.bunpo.unum!=null) $("f_unum").value=String(s.bunpo.unum);
  if(s.bunpo.lnum!=null) $("f_lnum").value=String(s.bunpo.lnum);
  echoUnit(); renderPreview();
});
$("loadSample").addEventListener("click",function(){
  var G=window.BUNPO_KANRYO;
  if(!G||!G.sentences){ return; }
  $("f_raw").value=G.sentences.map(function(s){ return s.en+"\n"+s.ja; }).join("\n");
  renderPreview();
});

/* ================= ② 出題 ================= */
var Q=[], qi=0, SENTS=[], RUN=null;
function buildQs(sents){
  var qs=[];
  sents.forEach(function(s,si){
    var bl=pickBlanks(s.toks);
    qs.push({si:si, type:"copy",  ans:s.en});
    qs.push({si:si, type:"trans", ans:s.en});
    qs.push({si:si, type:"blank", at:bl[0], ans:s.toks[bl[0]].replace(/[.,!?;:]+$/,"")});
    qs.push({si:si, type:"blank", at:bl[1], ans:s.toks[bl[1]].replace(/[.,!?;:]+$/,"")});
    qs.push({si:si, type:"order", ans:s.en, chips:shuffled(chipList(s.toks))});
  });
  return qs;
}
$("start").addEventListener("click",function(){
  var m=$("startMsg"); m.className="msg";
  renderPreview();
  if(unitNum()===""||listNum()===""){
    m.className="msg show ng";
    m.innerHTML="<b>教科書のどこか</b>を選んでください。あとで自分の記録を見返すときに、ここが無いと何をやったのか分かりません。";
    echoUnit(); $(unitNum()===""?"f_unum":"f_lnum").focus(); return;
  }
  SENTS=parsed.filter(function(x){ return !x.ng; });
  if(!SENTS.length){
    m.className="msg show ng";
    m.textContent="使える文がありません。英文とその日本語訳を入れて、「読み取りを確かめる」で確認してください。";
    return;
  }
  var s=store();
  s.bunpo.raw=$("f_raw").value; s.bunpo.kind=$("f_kind").value;
  s.bunpo.unum=unitNum(); s.bunpo.lnum=listNum(); saveS(s);
  Q=buildQs(SENTS); qi=0;
  RUN={ts:Date.now(), name:fullName(), n:SENTS.length, rows:[]};
  show("learn"); renderQ();
});
$("q_quit").addEventListener("click",function(){ show("intro"); });

var picked=[];              // 並びかえで選んだ札の番号
function renderQ(){
  var q=Q[qi], s=SENTS[q.si], T=TYPES[q.type];
  $("q_count").textContent="文 "+(q.si+1)+"/"+SENTS.length+"　問 "+(qi+1)+"/"+Q.length;
  $("q_tag").textContent=T.tag;
  $("q_verdict").innerHTML="";
  $("q_check").classList.remove("hide"); $("q_check").disabled=false;
  $("q_next").classList.add("hide");
  var base=qi-(qi%5);
  $("qSteps").innerHTML=[0,1,2,3,4].map(function(k){
    var t=Q[base+k].type, cls=(base+k===qi)?"now":((base+k<qi)?"done":"");
    return '<span class="'+cls+'">'+TYPES[t].tag+'</span>';
  }).join("");
  var h='<p class="hint" style="margin:0 0 8px">'+T.lead+'</p>';
  if(q.type==="copy"){
    h+='<div class="qen">'+esc(s.en)+'</div><div class="qja">'+esc(s.ja)+'</div>'+inputBox("そのまま打つ");
  }else if(q.type==="trans"){
    h+='<div class="qja">'+esc(s.ja)+'</div>'+inputBox("英語で打つ");
  }else if(q.type==="blank"){
    h+='<div class="qja">'+esc(s.ja)+'</div><div class="qen">'+blanked(s.toks,q.at)+'</div>'+inputBox("1語だけ");
  }else{
    h+='<div class="qja">'+esc(s.ja)+'</div>'+
       '<div class="wo-build" id="woBuild"><span class="wo-empty">ここに札が並びます</span></div>'+
       '<div class="wo-bank" id="woBank"></div>'+
       '<div class="row"><button class="btn ghost sm" id="woUndo">1つもどす</button>'+
       '<button class="btn ghost sm" id="woClear">ぜんぶ消す</button></div>';
  }
  $("q_body").innerHTML=h;
  if(q.type==="order"){
    picked=[];
    $("woBank").innerHTML=q.chips.map(function(c,i){
      return '<button class="chip" data-i="'+i+'">'+esc(c)+'</button>'; }).join("");
    $("woBank").querySelectorAll(".chip").forEach(function(b){
      b.addEventListener("click",function(){
        var i=+b.getAttribute("data-i");
        if(picked.indexOf(i)>=0) return;
        picked.push(i); drawWo();
      });
    });
    $("woUndo").addEventListener("click",function(){ picked.pop(); drawWo(); });
    $("woClear").addEventListener("click",function(){ picked=[]; drawWo(); });
    drawWo();
  }else{
    var el=$("q_in"); el.focus();
    el.addEventListener("keydown",function(e){ if(e.key==="Enter"){ e.preventDefault(); $("q_check").click(); } });
  }
}
function inputBox(ph){
  return '<input type="text" class="en" id="q_in" placeholder="'+ph+'" autocomplete="off" '+
    'autocapitalize="off" autocorrect="off" spellcheck="false" style="margin-top:9px">';
}
function blanked(toks,at){
  return toks.map(function(t,i){
    if(i!==at) return esc(t);
    var tail=(t.match(/[.,!?;:]+$/)||[""])[0];
    return '<span class="bl">(&nbsp;&nbsp;)</span>'+esc(tail);
  }).join(" ");
}
function drawWo(){
  var q=Q[qi];
  $("woBuild").innerHTML = picked.length
    ? picked.map(function(i){ return '<span class="chip in">'+esc(q.chips[i])+'</span>'; }).join("")
    : '<span class="wo-empty">ここに札が並びます</span>';
  $("woBank").querySelectorAll(".chip").forEach(function(b){
    b.disabled = picked.indexOf(+b.getAttribute("data-i"))>=0; });
}
$("q_check").addEventListener("click",function(){
  var q=Q[qi], s=SENTS[q.si];
  var mine = (q.type==="order") ? picked.map(function(i){ return q.chips[i]; }).join(" ")
                                : $("q_in").value;
  var v=judge(mine, q.ans, q.type);
  RUN.rows.push({si:q.si, type:q.type, en:s.en, ja:s.ja, mine:mine, ans:q.ans, tag:v.tag, pt:v.pt, why:v.why});
  var cls=(v.tag==="○")?"ok":((v.tag==="△")?"mid":"ng");
  $("q_verdict").innerHTML='<div class="verdict '+cls+'">'+v.tag+' '+v.pt+'点'+
    (v.tag==="○" ? "" :
      '<small>'+(v.why?esc(v.why)+"／":"")+'正しくは <span class="ans">'+esc(q.ans)+'</span>'+
      // 空欄の正解は1語なので、文まるごとも並べて出す。他の型は q.ans が文そのもの
      (q.type==="blank" ? '<br>'+esc(s.en) : "")+'</small>')+'</div>';
  if(q.type==="order"){
    $("woBank").querySelectorAll(".chip").forEach(function(b){ b.disabled=true; });
    $("woUndo").disabled=true; $("woClear").disabled=true;
  }else $("q_in").disabled=true;
  this.classList.add("hide");
  var nx=$("q_next");
  nx.classList.remove("hide");
  nx.textContent=(qi>=Q.length-1)?"結果を見る →":"次へ →";
  nx.focus();
});
$("q_next").addEventListener("click",function(){
  qi++;
  if(qi>=Q.length){ finish(); return; }
  renderQ();
});

/* ================= ③ 結果 ================= */
var graded=null;
function finish(){
  var rows=RUN.rows;
  var got=rows.reduce(function(a,x){ return a+x.pt; },0), max=rows.length;   // 1問1点
  var pct=max?Math.round(got/max*100):0;
  function tally(t){ var a=rows.filter(function(x){ return x.type===t; });
    return {ok:a.filter(function(x){ return x.pt; }).length, n:a.length}; }
  var C=tally("copy"), T=tally("trans"), B=tally("blank"), O=tally("order");
  var weak=rows.filter(function(x){ return !x.pt; })
               .map(function(x){ return x.ans; }).join(" / ");
  graded={ts:RUN.ts, name:RUN.name, n:RUN.n, got:got, max:max, pct:pct,
          copyMiss:C.n-C.ok, C:C, T:T, B:B, O:O, rows:rows, weak:weak};
  $("r_score").textContent=got+" / "+max;
  $("k_pct").textContent=pct+"%";
  $("k_copy").textContent=C.ok+" / "+C.n;
  $("k_trans").textContent=T.ok+" / "+T.n;
  $("k_blank").textContent=B.ok+" / "+B.n;
  var note=$("r_note"); note.className="msg show ok";
  note.innerHTML=esc(RUN.name)+"　"+RUN.n+"文 × 5問 = <b>"+max+"点満点</b>。"+
    "　並びかえは "+O.ok+" / "+O.n+"。"+
    (graded.copyMiss?("<br>見ながらの写しで "+graded.copyMiss+"問まちがえました。"+
      "<b>つづりを1文字ずつ見る練習</b>が要るサインです。"):"");
  var bad=rows.filter(function(x){ return !x.pt; });
  $("r_detail").innerHTML = bad.length
    ? '<h3>まちがえたところ（'+bad.length+'問）</h3><table><thead><tr><th>種類</th><th>あなた</th>'+
      '<th>正解</th><th>なぜ</th></tr></thead><tbody>'+
      bad.map(function(x){ return '<tr><td>'+TYPES[x.type].tag+'</td><td class="en">'+
        esc(x.mine||"（空）")+'</td><td class="en">'+esc(x.ans)+'</td><td>'+esc(x.why||"")+'</td></tr>'; }).join("")+
      '</tbody></table>'
    : '<p class="hint">全問正解。次はキーセンテンスを増やすか、次のページに進もう。</p>';
  $("saveMsg").className="msg";
  $("saveRun").disabled=false; $("sendRun").disabled=false; $("sendRun").textContent="先生に送信";
  fillIdentity();
  show("result");
}
$("again").addEventListener("click",function(){ show("intro"); renderHome(); });
$("home").addEventListener("click",function(){ show("intro"); renderHome(); });

$("saveRun").addEventListener("click",function(){
  if(!graded) return;
  var s=store();
  s.bunpo.runs.push({ts:graded.ts, item:graded.name, n:graded.n,
    got:graded.got, max:graded.max, pct:graded.pct, copyMiss:graded.copyMiss});
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
  // ★HTMLが返ってきたとき r.json() は「Unexpected token '<'」で落ちる。それだと原因に
  //   たどり着けないので、本文を先に文字列で受けて、何が返ってきたのかを言えるようにする。
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
    // notDb（列名「リスト外の語」）は、文法レーンでは写しがきのミス数として使う。
    // 列を増やすと先生に再デプロイをお願いすることになるので、既にある数値列に載せる。
    var payload={kind:"jigaku", ver:"bunpo 1.0", cls:cls, num:num, name:name,
      lane:"文法", unit:graded.name, src:"キーセンテンス", listN:graded.n,
      total:graded.max, ok:graded.got, pct:graded.pct, promptV:"",
      notDb:graded.copyMiss, weak:graded.weak.slice(0,400)};
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
        "デプロイのURLか公開設定を確認してください。<br>"+
        "いま送った先：<code>…"+esc(tail)+"…</code>"+
        ((window.SITE&&SITE.isTrial)?"（<b>実証モード</b>で送信中）":"（通常モード）")+"<br>"+
        "・［デプロイを管理］で<b>アクセスできるユーザー＝全員</b>か<br>"+
        "・URLの末尾が <code>/exec</code> か（<code>/dev</code> は本人専用）<br>"+
        "・そのデプロイを消したり差しかえたりしていないか<br>"+
        "記録は端末には残っています。";
    } else if(s.indexOf("__OLD__")>=0){
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
  if(!s.bunpo.runs.length){
    box.innerHTML='<p class="hint">まだ記録がありません。教科書のキーセンテンスを貼って、はじめよう。</p>'; return; }
  var h='<table><thead><tr><th>日付</th><th>どこ</th><th>文数</th><th>点</th><th>正答率</th><th>写しミス</th></tr></thead><tbody>';
  s.bunpo.runs.slice().reverse().slice(0,12).forEach(function(r){
    h+='<tr><td>'+new Date(r.ts).toLocaleDateString("ja-JP")+'</td><td>'+esc(r.item||"—")+'</td>'+
       '<td>'+(r.n||"—")+'</td><td>'+r.got+' / '+r.max+'</td><td>'+r.pct+'%</td>'+
       '<td>'+(r.copyMiss||0)+'</td></tr>';
  });
  box.innerHTML=h+'</tbody></table>';
}
(function init(){
  var s=store();
  if(s.bunpo.raw){ $("f_raw").value=s.bunpo.raw;
    if(s.bunpo.kind) $("f_kind").value=s.bunpo.kind;
    if(s.bunpo.unum!=null) $("f_unum").value=String(s.bunpo.unum);
    if(s.bunpo.lnum!=null) $("f_lnum").value=String(s.bunpo.lnum);
    renderPreview();
  }
  echoUnit(); renderHome();
})();
})();
