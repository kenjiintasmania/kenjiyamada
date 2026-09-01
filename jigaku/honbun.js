/* jigaku/honbun.js ─ 本文レーン
   ・本文は生徒が持ってくる（打ち込む／自分でまとめたノートのスクショ）。
   ・打ち込みは contenteditable。Ctrl+B とボタンで太字にでき、太字語をアプリが取り出せる。
     ＝「強調した語のうち、あとの設問で答えに絡んだのは何語か」を突合できる。
     AIには「メモの精度に一言」だけ言わせ、点数には使わない。
   ・設問は3種5問固定（数字・人名・地名／接続詞／重要だと思う情報）。
   ・採点はAIの丸つけを使わず、貼られた「わたしの答え」と「正解」だけで再計算する。 */
(function(){
"use strict";
var $=function(i){return document.getElementById(i);};
var SCREENS=["intro","build","paste","result"];
var AI_URL="https://www.google.com/search?udm=50";
var NQ=5;                                   // 設問数（固定）
var PT=4;                                   // 1問の配点 → 満点20
function openAImode(){ try{ window.open(AI_URL,"_blank","noopener"); }catch(e){ location.href=AI_URL; } }
function show(n){ SCREENS.forEach(function(s){ $(s).classList.toggle("hide", s!==n); }); window.scrollTo(0,0);
  if(n==="intro") renderHome(); }
document.querySelectorAll("[data-go]").forEach(function(b){
  b.addEventListener("click",function(){ show(b.getAttribute("data-go")); }); });
function esc(s){ return String(s==null?"":s).replace(/[&<>"]/g,function(c){
  return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

/* ================= 記録 ================= */
var KEY="jigaku_v1";
function load(){ try{ return JSON.parse(localStorage.getItem(KEY)||"{}"); }catch(e){ return {}; } }
function saveS(s){ try{ localStorage.setItem(KEY, JSON.stringify(s)); }catch(e){} }
function store(){ var s=load(); s.honbun=s.honbun||{prompts:[],runs:[]}; return s; }

/* ================= 判定のものさし ================= */
function norm(s){
  return String(s==null?"":s).toLowerCase().replace(/['’]/g,"")
    .replace(/[.,!?;:"“”（）()]/g," ").replace(/\s+/g," ").trim();
}
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
// 「A、B、C」のような列挙かどうか。列挙なら集合として比べる。
function items(s){
  return String(s==null?"":s).split(/[,、，\/／]|\s+と\s+/).map(function(x){return x.trim();})
    .filter(Boolean);
}
/* 1問ぶんの判定。
   ・単一の答え … 一致で満点。1文字ちがいは「つづりミス −1」（本文からの抜き書きなので、
                  読み取れたかが主眼。つづりそのものを問うてはいない）
   ・列挙       … 集合で比べ、合った数で按分。よけいに挙げた分は減点しない */
function judge(mine, ans){
  var A=items(mine), B=items(ans);
  if(!String(mine||"").trim()) return {pt:0, tag:"—", why:"書けなかった", hit:[]};
  if(B.length<=1){
    if(norm(mine)===norm(ans)) return {pt:PT, tag:"○", why:"", hit:[ans]};
    if(edist(norm(mine),norm(ans))<=1 && norm(ans).length>2)
      return {pt:PT-1, tag:"△", why:"つづりミス −1", hit:[ans]};
    return {pt:0, tag:"×", why:"", hit:[]};
  }
  var got=[], extra=0;
  var used={};
  A.forEach(function(a){
    var f=null;
    B.forEach(function(b,bi){ if(!used[bi]&&norm(a)===norm(b)){ f=bi; } });
    if(f!=null){ used[f]=1; got.push(B[f]); } else extra++;
  });
  var pt=Math.floor(PT*got.length/B.length);
  return {pt:pt, tag:(got.length===B.length?"○":(got.length?"△":"×")),
          why:(got.length===B.length?"":(B.length+"つ中"+got.length+"つ"+(extra?("／よけいに"+extra+"つ"):""))),
          hit:got};
}

/* ================= ① 本文を用意する ================= */
(function fillUnit(){
  var u=$("f_unum"), l=$("f_lnum"), i;
  for(i=0;i<=15;i++){ var o=document.createElement("option"); o.value=String(i); o.textContent=String(i); u.appendChild(o); }
  for(i=1;i<=15;i++){ var p=document.createElement("option"); p.value=String(i); p.textContent=String(i); l.appendChild(p); }
})();
function unitNum(){ return $("f_unum").value; }
function listNum(){ return $("f_lnum").value; }
function fullName(){
  if(unitNum()===""||listNum()==="") return "";
    // 教科書が Lesson と書いていても "Unit" で記録する。ここを選ばせると、
  // 同じ単元が先生の表で U3 と L3 の2列に割れる。数字だけそろえばよい。
  return "Unit "+unitNum()+"-"+listNum();
}
function echoUnit(){
  var nm=fullName();
  $("unitEcho").innerHTML = nm
    ? ("記録される名前 → <b>"+esc(nm)+"</b>　（先生の表では <b>本文_"+esc(nm)+"</b> に出ます）")
    : "2つとも選ぶと、ここに記録される名前が出ます";
  $("f_unum").classList.toggle("bad", unitNum()==="");
  $("f_lnum").classList.toggle("bad", listNum()==="");
}
["f_unum","f_lnum"].forEach(function(id){ $(id).addEventListener("change", echoUnit); });

var SRC="type";
function setSrc(k){
  SRC=k;
  $("wayType").classList.toggle("on", k==="type");
  $("wayShot").classList.toggle("on", k==="shot");
  $("typeBox").classList.toggle("hide", k!=="type");
  $("shotBox").classList.toggle("hide", k!=="shot");
}
$("wayType").addEventListener("click",function(){ setSrc("type"); });
$("wayShot").addEventListener("click",function(){ setSrc("shot"); });

/* --- 太字（Ctrl+B とボタン）。スマホには Ctrl キーが無いのでボタンは必須 --- */
var ED=$("f_text");
function bold(){ ED.focus(); try{ document.execCommand("bold",false,null); }catch(e){} showMarks(); }
$("btnBold").addEventListener("click", bold);
$("btnClear").addEventListener("click",function(){
  ED.innerHTML = ED.innerText.replace(/\n/g,"<br>"); showMarks();
});
ED.addEventListener("keyup", showMarks);
ED.addEventListener("input", showMarks);
// 他所からの貼り付けで書式が丸ごと入ると全部が太字に見える。文字だけ受ける。
ED.addEventListener("paste",function(e){
  e.preventDefault();
  var t=(e.clipboardData||window.clipboardData).getData("text/plain");
  try{ document.execCommand("insertText",false,t); }catch(err){ ED.textContent+=t; }
  showMarks();
});
function bodyText(){ return String(ED.innerText||"").replace(/\s+/g," ").trim(); }
function bodyWords(){ return bodyText().split(/\s+/).filter(Boolean); }
// 太字にされた語を取り出す。ブラウザによって b / strong / style の3通りがある。
function markedWords(){
  var out=[], seen={};
  var els=ED.querySelectorAll("b,strong,[style*='bold'],[style*='font-weight: 700']");
  [].forEach.call(els,function(el){
    String(el.textContent||"").split(/\s+/).forEach(function(w){
      var t=w.replace(/^[^A-Za-z0-9'’-]+|[^A-Za-z0-9'’-]+$/g,"");
      var k=norm(t);
      if(k && !seen[k]){ seen[k]=1; out.push(t); }
    });
  });
  return out;
}
function showMarks(){
  if(SRC!=="type") return;
  var m=markedWords(), n=bodyWords().length;
  $("markInfo").innerHTML = m.length
    ? ("本文 "+n+"語／太字にした語 <b>"+m.length+"</b>："+m.map(function(w){return '<span class="w">'+esc(w)+'</span>';}).join(""))
    : (n ? ('<span class="hint">本文 '+n+'語。まだ太字がありません。大事なところをえらんで <b>Ctrl+B</b> か上の「太字」ボタン。</span>')
         : "");
}

$("toBuild").addEventListener("click",function(){
  var m=$("introMsg"); m.className="msg";
  if(unitNum()===""||listNum()===""){
    m.className="msg show ng";
    m.innerHTML="先に<b>教科書のどこか</b>を選んでください。<code>Unit</code>／<code>Lesson</code> と番号、そして何つめか。";
    echoUnit(); $(unitNum()===""?"f_unum":"f_lnum").focus(); return;
  }
  if(SRC==="type" && bodyWords().length<20){
    m.className="msg show ng";
    m.textContent="本文が短すぎます（"+bodyWords().length+"語）。20語以上を入れてください。";
    ED.focus(); return;
  }
  var s=store();
  s.honbun.src={src:SRC, name:fullName(), kind:$("f_kind").value, unum:unitNum(), lnum:listNum(),
    text:(SRC==="type"?bodyText():""), marks:(SRC==="type"?markedWords():[]),
    shotMark:(SRC==="shot" && $("f_shotmark").checked), ts:Date.now()};
  saveS(s);
  show("build"); prefill(); syncBuild();
});

/* ================= ② AIモードのプロンプト ================= */
function cur(){ return (store().honbun.src)||{}; }
function syncBuild(){
  var L=cur(), hasMark = (L.src==="type") ? (L.marks||[]).length>0 : !!L.shotMark;
  $("flowNote").innerHTML = (L.src==="type")
    ? "①でコピー → ②でAIモードに貼る → <b>1問ずつ出てくるので1問ずつ答える</b> → 5問終わると出るまとめをコピー → ③で貼る。"
    : "①でコピー → ②でAIモードに貼り、<b>つづけてノートの画像を貼る</b> → 1問ずつ答える → まとめをコピー → ③で貼る。";
  if(hasMark) $("flowNote").innerHTML += "<br>はじめに<b>メモの精度に一言</b>もらえます（点数にはしません）。";
}
function buildPrompt(mine){
  var L=cur(), p=[];
  var hasMark = (L.src==="type") ? (L.marks||[]).length>0 : !!L.shotMark;
  p.push("あなたは中学英語の先生です。わたしが読んだ本文について、読み取りの問題を出してください。");
  p.push("");
  if(L.src==="type"){
    p.push("【本文】");
    p.push(L.text);
    p.push("");
    if(hasMark){
      p.push("【わたしが大事だと思って印をつけた語】");
      p.push(L.marks.join(" / "));
      p.push("");
    }
  } else {
    p.push("【本文】このあとわたしが貼る画像に写っているものです。");
    if(hasMark) p.push("画像には、わたしが下線や赤丸で強調したところがあります。");
    p.push("まず、画像から読み取った本文を短く要約して見せてください。読みまちがいがあればわたしが直します。");
    p.push("");
  }
  if(hasMark){
    p.push("【はじめに】問題に入る前に、わたしの印のつけ方（どこを大事だと思ったか）について、");
    p.push("　よかった点と、拾えていなかったかもしれない点を、あわせて3行以内でコメントしてください。");
    p.push("　点数はつけないでください。コメントだけです。");
    p.push("");
  }
  p.push("【出す問題】ぜんぶで"+NQ+"問。次の3種から出してください。");
  p.push("　・数字・人名・地名 … 本文に出てくる数・人の名前・場所を答えさせる");
  p.push("　・接続詞 … 文と文をつなぐ語（but / because / however / so など）を答えさせる");
  p.push("　・重要だと思う情報 … 本文でいちばん大事なところ、まとめ、具体例などを答えさせる");
  p.push("　3種がなるべく混ざるようにしてください。");
  p.push("");
  p.push("【いちばん大事な決まり】");
  p.push("　・**1問ずつ**出してください。わたしが答えるまで、次の問題を出さないでください。");
  p.push("　・わたしが答えたら、○×も解説もまだ書かないでください。「次の問題です」とだけ言って進んでください。");
  p.push("　・"+NQ+"問終わってから、最後に下の【まとめ】を1回だけ出してください。");
  p.push("");
  p.push("【答え方】答えは次のどちらかにしてください。どちらでも構いません。");
  p.push("　・本文にある語を**そのまま抜き出す**形（数字・人名・地名・接続詞はこちら）");
  p.push("　・ア〜エから**選ぶ**形（考えて答えるものはこちらでもよい）");
  p.push("　いくつか挙げさせるときは、正解を「A、B、C」のように読点で区切ってください。");
  if(mine && mine.trim()){ p.push(""); p.push("【わたしからの注文】"+mine.trim().replace(/\n/g,"／")); }
  p.push("");
  p.push("【まとめ】※この書式は1文字も変えないでください");
  p.push("=== HONBUN ===");
  p.push("範囲: "+(L.name||""));
  p.push("no | 種別 | 問題 | わたしの答え | 正解");
  p.push("1 | 数字 | （出した問題） | （わたしが書いた答えをそのまま） | （正しい答え）");
  p.push("2 | 接続詞 | ... | ... | ...");
  p.push("3 | 重要 | ... | ... | ...");
  p.push("=== END ===");
  p.push("");
  p.push("・区切りは半角の縦棒 | を使ってください。1問を1行に書いてください。");
  p.push("・「種別」は 数字／接続詞／重要 のどれかにしてください。");
  p.push("・「わたしの答え」には、わたしが書いたものを直さずそのまま入れてください（まちがいもそのまま）。");
  p.push("・○×や点数は書かないでください。採点はわたしのアプリがやります。");
  return p.join("\n");
}
var current=null;
function prefill(){
  var s=store(), last=s.honbun.prompts[s.honbun.prompts.length-1];
  $("verNote").textContent = last ? ("いまの最新は v"+last.v+"（"+new Date(last.ts).toLocaleDateString("ja-JP")+"）")
                                  : "まだ作ったことがありません";
}
$("mkPrompt").addEventListener("click",function(){
  var mine=$("f_mine").value;
  var s=store(), v=(s.honbun.prompts.length? s.honbun.prompts[s.honbun.prompts.length-1].v:0)+1;
  var text=buildPrompt(mine);
  current={v:v, ts:Date.now(), mine:mine, text:text};
  s.honbun.prompts.push(current); saveS(s);
  $("promptText").textContent=text;
  $("promptBox").classList.remove("hide");
  $("verNote").textContent="v"+v+" として保存しました";
});
$("loadLast").addEventListener("click",function(){
  var s=store(), last=s.honbun.prompts[s.honbun.prompts.length-1];
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
$("goPaste").addEventListener("click",function(){ show("paste"); });

/* ================= ③ まとめの読み取りと採点 ================= */
function cells(line){
  var c=String(line).replace(/｜/g,"|").split("|").map(function(x){return x.trim();});
  while(c.length&&c[0]==="") c.shift();
  while(c.length&&c[c.length-1]==="") c.pop();
  return c;
}
function kindOf(t){
  if(/接続/.test(t)) return "conj";
  if(/数|名|地|人/.test(t)) return "fact";
  return "key";
}
function parseSummary(raw){
  var txt=String(raw||"").replace(/\r/g,"");
  var i=txt.indexOf("=== HONBUN ==="), j=txt.indexOf("=== END ===");
  var body=(i>=0)? txt.slice(i+14, j>i? j: txt.length) : txt;
  var rows=[], bad=0, name="";
  body.split("\n").forEach(function(line){
    var s=line.trim(); if(!s) return;
    var mn=s.match(/^(?:範囲|項目)\s*[:：]\s*(.+)$/); if(mn){ name=mn[1].split("|")[0].trim(); return; }
    if(s.indexOf("|")<0) return;
    var c=cells(s);
    if(!c.length) return;
    if(/^[-:\s]+$/.test(c.join(""))) return;
    if(/^no$/i.test(c[0])||/種別/.test(c[1]||"")) return;
    if(!/^\d+$/.test(c[0].replace(/[^0-9]/g,""))) { bad++; return; }
    if(c.length<5){ bad++; return; }
    rows.push({no:parseInt(c[0].replace(/[^0-9]/g,""),10), kindLabel:c[1], kind:kindOf(c[1]),
               q:c[2], mine:c[3], ans:c[4]});
  });
  return {name:name, rows:rows, bad:bad};
}

var graded=null;
$("doGrade").addEventListener("click",function(){
  var msg=$("pasteMsg"), cm=$("checkMsg");
  msg.className="msg"; cm.className="msg";
  var p=parseSummary($("f_paste").value);
  if(!p.rows.length){
    msg.className="msg show ng";
    msg.innerHTML="✗ まとめを読み取れませんでした。<br>AIにこう言い直してみよう：<br>"+
      "<code>さっきの"+NQ+"問を、no | 種別 | 問題 | わたしの答え | 正解 の5列で、"+
      "=== HONBUN === と === END === ではさんで出し直して</code>";
    return;
  }
  var L=cur();
  // 採点：AIの丸つけは見ない
  p.rows.forEach(function(r){ var v=judge(r.mine, r.ans); r.pt=v.pt; r.tag=v.tag; r.why=v.why; r.hit=v.hit; });

  // 打ち込み経路だけの検算：AIが正解として返した語が本文に実在するか
  var offText=[];
  if(L.src==="type" && L.text){
    var pool={};
    String(L.text).toLowerCase().split(/[^a-z0-9'’-]+/).forEach(function(w){ if(w) pool[w]=1; });
    p.rows.forEach(function(r){
      if(r.kind==="key") return;                       // 「重要」は言いかえがありうるので見ない
      items(r.ans).forEach(function(a){
        if(/^[ア-ン]$/.test(String(a).trim())) return;  // 記号選択は対象外
        // ★答えは「Ms. Sato」「Aozora Zoo」のように複数語のことがある。
        //   まるごと1語として引くと、本文にあるのに「無い」と誤判定する。
        //   語に割って、どれ1つも本文に無いときだけ知らせる（警告なので空振りを避ける）。
        var ws=String(a).toLowerCase().split(/[^a-z0-9'’-]+/)
          .filter(function(w){ return w && !/^[0-9]+$/.test(w) && w.length>1; });
        if(!ws.length) return;
        var anyHit=false;
        ws.forEach(function(w){ if(pool[w]) anyHit=true; });
        if(!anyHit) offText.push(a);
      });
    });
  }
  // 強調の的中：太字にした語が、正解のどこかに現れたか
  var marks=(L.src==="type"? (L.marks||[]) : []), hit=[];
  if(marks.length){
    var ansPool={};
    p.rows.forEach(function(r){ items(r.ans).forEach(function(a){ ansPool[norm(a)]=1; });
      String(r.ans).toLowerCase().split(/[^a-z0-9'’-]+/).forEach(function(w){ if(w) ansPool[w]=1; }); });
    marks.forEach(function(w){ if(ansPool[norm(w)]) hit.push(w); });
  }
  if(offText.length){
    cm.className="msg show warn";
    cm.innerHTML="⚠ AIが正解にした語のうち、<b>本文に見あたらないもの</b>が"+offText.length+"語あります："+
      "<b class='en'>"+esc(offText.slice(0,8).join(", "))+"</b>　本文を見直すか、AIに出し直させてください。";
  } else if(L.src==="shot"){
    cm.className="msg show warn";
    cm.textContent="スクショ経路なのでアプリは本文を持っていません。正解の検算はしていません。";
  }
  finish(p, marks, hit, offText);
});

function finish(p, marks, hit, offText){
  var got=p.rows.reduce(function(a,r){return a+r.pt;},0), max=p.rows.length*PT;
  var pct=max?Math.round(got/max*100):0;
  var by=function(k){ var a=p.rows.filter(function(r){return r.kind===k;});
    return {n:a.filter(function(r){return r.pt===PT;}).length, all:a.length}; };
  var f=by("fact"), c=by("conj");
  var L=cur();
  graded={ts:Date.now(), name:(L.name||p.name||""), src:L.src, words:(L.text?L.text.split(/\s+/).length:0),
          got:got, max:max, pct:pct, rows:p.rows, bad:p.bad,
          marks:marks.length, hit:hit.length, hitWords:hit, offText:offText,
          promptV:(current?current.v:null)};
  $("r_score").textContent=got+" / "+max;
  $("k_pct").textContent=pct+"%";
  $("k_fact").textContent=f.all? (f.n+" / "+f.all) : "—";
  $("k_conj").textContent=c.all? (c.n+" / "+c.all) : "—";
  $("k_mark").textContent=marks.length? (hit.length+" / "+marks.length) : "—";
  var note=$("r_note"); note.className="msg show ok";
  note.innerHTML="AIの丸つけは使わず、<b>「わたしの答え」と「正解」だけ</b>で計算しました。"+
    (marks.length? ("　太字にした"+marks.length+"語のうち、答えに絡んだのは<b>"+hit.length+"語</b>です。"):"")+
    (p.bad? ("　読み取れなかった行が"+p.bad+"行ありました。"):"");
  var h='<h3>ぜんぶの問題</h3><table><thead><tr><th>#</th><th>種別</th><th>あなた</th><th>正解</th><th>点</th><th>なぜ</th></tr></thead><tbody>';
  p.rows.forEach(function(r){
    h+='<tr class="'+(r.pt===PT?"":(r.pt?"mid":"ng"))+'"><td>'+r.no+'</td><td>'+esc(r.kindLabel)+'</td>'+
       '<td class="en">'+esc(r.mine||"（空）")+'</td><td class="en">'+esc(r.ans)+'</td>'+
       '<td>'+r.tag+' '+r.pt+'</td><td>'+esc(r.why||"")+'</td></tr>';
  });
  h+='</tbody></table>';
  if(marks.length) h+='<h3>太字にした語</h3><p class="marks">'+
    marks.map(function(w){ var on=hit.indexOf(w)>=0;
      return '<span class="w" style="'+(on?"":"background:#eef2f1;color:#9aa3b2")+'">'+esc(w)+(on?" ✓":"")+'</span>'; }).join("")+
    '</p><p class="hint">色がついているのが、答えに絡んだ語です。灰色は今回は出番がありませんでした。' +
    '外れが多いなら、次はどこに印をつけるかを変えてみよう。</p>';
  $("r_detail").innerHTML=h;
  $("saveMsg").className="msg";
  $("saveRun").disabled=false; $("sendRun").disabled=false; $("sendRun").textContent="先生に送信";
  fillIdentity();
  show("result");
}

$("saveRun").addEventListener("click",function(){
  if(!graded) return;
  var s=store();
  s.honbun.runs.push({ts:graded.ts, name:graded.name, src:graded.src, words:graded.words,
    got:graded.got, max:graded.max, pct:graded.pct, marks:graded.marks, hit:graded.hit,
    promptV:graded.promptV});
  saveS(s);
  var m=$("saveMsg"); m.className="msg show ok";
  m.textContent="記録しました（この端末に保存）。これまで"+s.honbun.runs.length+"回。";
  this.disabled=true;
});

/* ---------- 先生に送信（自学ログの「本文」レーン） ---------- */
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
  // HTMLが返ったとき r.json() は「Unexpected token '<'」で落ちる。何が返ったかを言えるようにする。
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
  if(!/^(Unit|Lesson)\s+\d{1,2}-\d{1,2}$/i.test(String(graded.name||""))){
    m.className="msg show ng";
    m.textContent="範囲が入っていません。ホームからやり直して、Unit／Lesson と番号を選んでください。"; return; }
  if(!GAS_URL){ m.className="msg show ng";
    m.textContent=(window.SITE&&SITE.isTrial)?"実証用の送信先が未設定です。":"送信先(GAS)が未設定です。"; return; }
  btn.disabled=true; btn.textContent="送信中…";
  m.className="msg show"; m.textContent="送信しています…";
  post({action:"policy"}).then(function(j){
    var ver=(j&&j.ver)||"";
    if(!/jigaku/.test(ver)) throw new Error("__OLD__"+ver);
    var weak=graded.rows.filter(function(r){return r.pt<PT;})
      .map(function(r){return r.ans;}).join(" / ");
    var payload={kind:"jigaku", ver:"honbun 0.1", cls:cls, num:num, name:name,
      lane:"本文", unit:graded.name,
      src:(graded.src==="shot"?"スクショ":"打ち込み"), listN:graded.words,
      total:graded.max, ok:graded.got, pct:graded.pct,
      promptV:(graded.promptV?("v"+graded.promptV):""),
      notDb:(graded.offText||[]).length, weak:weak.slice(0,400),
      mark:graded.marks, hit:graded.hit};
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
        ((window.SITE&&SITE.isTrial)?"（<b>実証モード</b>で送信中）":"（通常モード）")+
        "<br>記録は端末には残っています。";
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
  echoUnit(); showMarks();
  if(!s.honbun.runs.length){ box.innerHTML='<p class="hint">まだ記録がありません。読んだ本文を持ってきて始めよう。</p>'; return; }
  var h='<table><thead><tr><th>日付</th><th>範囲</th><th>作り方</th><th>点</th><th>正答率</th><th>強調の的中</th></tr></thead><tbody>';
  s.honbun.runs.slice().reverse().slice(0,12).forEach(function(r){
    h+='<tr><td>'+new Date(r.ts).toLocaleDateString("ja-JP")+'</td><td>'+esc(r.name||"—")+'</td>'+
       '<td>'+(r.src==="shot"?"📷":"⌨️")+'</td><td>'+r.got+' / '+r.max+'</td><td>'+r.pct+'%</td>'+
       '<td>'+(r.marks? (r.hit+" / "+r.marks) : "—")+'</td></tr>';
  });
  box.innerHTML=h+'</tbody></table>';
}
renderHome();
})();
