/* engine.js ─ 模擬テスト描画＆採点エンジン
   data/*.js が定義する EXAM オブジェクトを描画し、自動採点する。
   ＜問題タイプ＞
     mcq        : 記号選択（ア〜エ など）単一正解
     mcqMulti   : 記号選択（複数正解：2つ選べ 等）
     fill       : 英単語・英文の空所補充（テキスト入力・表記ゆれ吸収）
     bankpick   : 共通の選択肢（ア〜カ等）から選ぶ
     wordorder  : 並べかえ（語群を見て英文を入力）
     en         : 英作文（模範解答を表示し自己採点／語数ヒント）
     jp         : 日本語記述（模範解答を表示し自己採点）
*/
(function(){
'use strict';

/* ---------- 正規化 ---------- */
function normSpell(s){
  return (s||"").toLowerCase().trim()
    .replace(/[.,!?;:"'’“”]/g,"")
    .replace(/[-_/]/g," ")
    .replace(/\s+/g," ").trim();
}
function countWords(s){
  const t=(s||"").trim(); if(!t) return 0;
  return t.replace(/\s+/g," ").split(" ").length;
}
const KATA = ["ア","イ","ウ","エ","オ","カ","キ","ク"];

/* ---------- 状態 ---------- */
let ITEMS = [];   // 採点対象 {item, pt, kind, get:()=>state, mark:(state)=>void}
let EXAM = null;

/* ---------- 描画 ---------- */
function el(tag, cls, html){
  const e=document.createElement(tag);
  if(cls) e.className=cls;
  if(html!=null) e.innerHTML=html;
  return e;
}

function render(exam, mount){
  EXAM = exam; ITEMS = [];
  mount.innerHTML = "";
  exam.sections.forEach(sec=> mount.appendChild(renderSection(sec)));
  computeTotal();
}

/* 大問6 等のコース選択：選んだコースだけを集計・採点 */
function selCourse(secNo){
  const r=document.querySelector('input[name="course_'+secNo+'"]:checked');
  return r ? +r.value : 0;
}
function isActive(o){ return o.course===undefined || o.course===selCourse(o.secNo); }
function computeTotal(){
  const total = ITEMS.filter(isActive).reduce((a,o)=>a+o.pt,0);
  EXAM._total = total;
  const tEl = document.getElementById("totalpts");
  if(tEl) tEl.textContent = total;
}
function pushItem(o, ctx){
  o.course = ctx ? ctx.course : undefined;
  o.secNo  = ctx ? ctx.secNo  : undefined;
  ITEMS.push(o);
}

function renderSection(sec){
  const box = el("section","oimon");
  const head = el("div","head");
  head.appendChild(el("div","no", String(sec.no)));
  head.appendChild(el("div","ttl", sec.title));
  box.appendChild(head);
  if(sec.lead) box.appendChild(el("div","lead", sec.lead));

  if(sec.courses){              // 大問6：X/Yコース選択
    const pick = el("div","course-pick");
    sec.courses.forEach((c,i)=>{
      const id="course_"+sec.no+"_"+i;
      const lab=el("label",null,
        `<input type="radio" name="course_${sec.no}" value="${i}" ${i===0?"checked":""}> ${c.name}`);
      pick.appendChild(lab);
    });
    box.appendChild(pick);
    const boxes=[];
    sec.courses.forEach((c,i)=>{
      const cb=el("div","coursebox"+(i===0?"":" dim"));
      if(c.intro) cb.appendChild(el("div","lead", c.intro));
      c.items.forEach(it=> cb.appendChild(renderItem(it, {course:i, secNo:sec.no})));
      boxes.push(cb); box.appendChild(cb);
    });
    pick.querySelectorAll("input").forEach(r=> r.addEventListener("change",()=>{
      const v=+pick.querySelector("input:checked").value;
      boxes.forEach((b,i)=> b.classList.toggle("dim", i!==v));
      computeTotal();
    }));
    box._courseName = "course_"+sec.no;
    return box;
  }

  (sec.groups||[]).forEach(g=> box.appendChild(renderGroup(g)));
  return box;
}

function renderGroup(g){
  const wrap = el("div","group");
  if(g.intro) wrap.appendChild(el("div","lead", g.intro));
  // 放送文（リスニング・シミュレーション）：最初は隠して「スクリプト」で開く
  if(g.script){
    const t=el("div","script-toggle");
    const btn=el("button","ghost","▶ 放送文を読む（リスニング）");
    const pas=el("div","passage"); pas.style.display="none";
    pas.innerHTML = g.script;
    btn.addEventListener("click",()=>{
      const open = pas.style.display==="none";
      pas.style.display = open?"block":"none";
      btn.textContent = open?"▼ 放送文をとじる":"▶ 放送文を読む（リスニング）";
    });
    t.appendChild(btn); wrap.appendChild(t); wrap.appendChild(pas);
  }
  if(g.sceneNote) wrap.appendChild(el("div","scene", g.sceneNote));
  if(g.flyer)   wrap.appendChild(el("div","flyer", g.flyer));
  if(g.passage) wrap.appendChild(el("div","passage"+(g.passageEn?" en":""), g.passage));
  if(g.note)    wrap.appendChild(el("div","note", g.note));
  (g.items||[]).forEach(it=> wrap.appendChild(renderItem(it,{})));
  return wrap;
}

function renderItem(it, ctx){
  const q = el("div","q");
  const pt = it.pt||2;
  const stem = (it.label?`<span class="label">${it.label}</span>`:"") + (it.stem||"");

  if(it.type==="mcq" || it.type==="mcqMulti"){
    q.appendChild(el("div","stem", stem));
    const ul=el("ul","choices"+(it.cols2?" cols2":""));
    const name="m_"+(ITEMS.length)+"_"+Math.random().toString(36).slice(2,7);
    it.choices.forEach((c,i)=>{
      const li=el("li","choice");
      const input=`<input type="${it.type==="mcqMulti"?"checkbox":"radio"}" name="${name}" value="${i}">`;
      li.innerHTML=`${input}<span class="mk">${KATA[i]}</span><span class="tx">${c}</span>`;
      li.addEventListener("click",e=>{ if(e.target.tagName!=="INPUT"){const inp=li.querySelector("input"); inp.checked=it.type==="mcqMulti"?!inp.checked:true;}});
      ul.appendChild(li);
    });
    q.appendChild(ul);
    q.appendChild(resultBox());
    const ans = Array.isArray(it.answer)?it.answer:[it.answer];
    pushItem({pt, el:q, kind:"auto", grade:()=>{
      const chosen=[...ul.querySelectorAll("input:checked")].map(i=>+i.value);
      ul.querySelectorAll(".choice").forEach((li,i)=>{
        li.classList.remove("correct","wrong","miss");
        if(ans.includes(i)&&chosen.includes(i)) li.classList.add("correct");
        else if(!ans.includes(i)&&chosen.includes(i)) li.classList.add("wrong");
        else if(ans.includes(i)&&!chosen.includes(i)) li.classList.add("miss");
      });
      const ok = chosen.length===ans.length && ans.every(a=>chosen.includes(a));
      showRes(q, ok, ok?null:`正解：${ans.map(a=>KATA[a]).join("・")}`);
      return ok?pt:0;
    }}, ctx);
    return q;
  }

  if(it.type==="fill"){
    const inline = `<input class="${it.inlineWidth?'inline-ans':'ans'}" type="text" autocomplete="off" autocapitalize="off" spellcheck="false">`;
    q.appendChild(el("div","stem", stem+" "+(it.hint?`<span class="hintword">（${it.hint}）</span>`:"")));
    const w=el("div"); w.innerHTML=inline; const inp=w.querySelector("input");
    q.appendChild(w);
    q.appendChild(resultBox());
    const answers=(it.answers||[]).map(normSpell);
    pushItem({pt, el:q, kind:"auto", grade:()=>{
      const ok = answers.includes(normSpell(inp.value)) && inp.value.trim()!=="";
      showRes(q, ok, ok?null:`正解：<span class="en">${it.answers[0]}</span>`);
      return ok?pt:0;
    }}, ctx);
    return q;
  }

  if(it.type==="bankpick"){
    q.appendChild(el("div","stem", stem));
    const sel=el("select","inline-ans");
    sel.style.width="70px";
    sel.appendChild(el("option",null,"—"));
    it.bank.forEach((b,i)=> sel.appendChild(el("option",null,KATA[i])) );
    [...sel.options].forEach((o,i)=>{ if(i>0) o.value=i-1; });
    q.appendChild(sel);
    q.appendChild(resultBox());
    pushItem({pt, el:q, kind:"auto", grade:()=>{
      const v=sel.value===""?-1:+sel.value;
      const ok=v===it.answer;
      showRes(q, ok, ok?null:`正解：${KATA[it.answer]}`);
      return ok?pt:0;
    }}, ctx);
    return q;
  }

  if(it.type==="wordorder"){
    q.appendChild(el("div","stem", stem));
    const wb=el("div","wordbank");
    it.words.forEach(w=> wb.appendChild(el("span","w", w)));
    q.appendChild(wb);
    const w=el("div"); w.innerHTML=`<input class="ans" type="text" autocomplete="off" spellcheck="false" placeholder="英文を書こう">`;
    const inp=w.querySelector("input"); q.appendChild(w);
    q.appendChild(resultBox());
    pushItem({pt, el:q, kind:"auto", grade:()=>{
      const ok=normSpell(inp.value)===normSpell(it.answer);
      showRes(q, ok, ok?null:`正解：<span class="en">${it.display||it.answer}</span>`);
      return ok?pt:0;
    }}, ctx);
    return q;
  }

  if(it.type==="en" || it.type==="jp"){
    const hint = it.minWords?`<span class="hintword">（${it.minWords}語以上）</span>`:(it.hint?`<span class="hintword">（${it.hint}）</span>`:"");
    q.appendChild(el("div","stem", stem+" "+hint));
    const w=el("div"); w.innerHTML=`<textarea class="ans" rows="2" spellcheck="false"></textarea>`;
    const ta=w.querySelector("textarea"); q.appendChild(w);
    const wc=el("div","hintword"); if(it.type==="en"){ ta.addEventListener("input",()=> wc.textContent="語数：" + countWords(ta.value)); q.appendChild(wc); }
    const res=el("div","result");
    res.innerHTML = `<div class="model"><span class="lab">模範解答（例）</span><br><span class="${it.type==='en'?'en':''}">${it.model}</span></div>`+
      `<div class="selfcheck">自己採点：`+
      `<label><input type="radio" name="self_${ITEMS.length}" value="1"> できた（＋${pt}点）</label>`+
      `<label><input type="radio" name="self_${ITEMS.length}" value="0" checked> まだ</label>`+
      (it.tip?`<span class="hintword">${it.tip}</span>`:"")+`</div>`;
    q.appendChild(res);
    pushItem({pt, el:q, kind:"self", grade:()=>{
      q.classList.add("done");
      const sel=res.querySelector('input[name^="self_"]:checked');
      return (sel && sel.value==="1")?pt:0;
    }}, ctx);
    return q;
  }

  q.appendChild(el("div","stem", stem+" <i>(未対応の問題タイプ)</i>"));
  return q;
}

function resultBox(){ return el("div","result"); }
function showRes(q, ok, msg){
  q.classList.add("done");
  const r=q.querySelector(".result");
  r.innerHTML = ok
    ? `<span class="mark ok">○</span>`
    : `<span class="mark ng">✕</span> <span style="color:var(--ng)">${msg||""}</span>`;
}

/* ---------- 採点 ---------- */
function gradeAll(){
  let score=0;
  computeTotal();
  ITEMS.forEach(o=>{ if(isActive(o)) score += o.grade(); });
  const total=EXAM._total;
  const bar=document.getElementById("scorebar");
  bar.classList.remove("hide");
  document.getElementById("scoretext").textContent = score+" / "+total;
  const pct= total? score/total : 0;
  let msg="まだまだ！まちがいを直してもう一度。";
  if(pct>=1) msg="満点！パーフェクト！🎉";
  else if(pct>=0.9) msg="すごい！あと少しで満点！";
  else if(pct>=0.7) msg="いい調子！赤いところを見直そう。";
  else if(pct>=0.5) msg="半分こえた。解説を読んで復習しよう。";
  document.getElementById("scoremsg").textContent = msg
    + "（英作文・記述は自己採点です）";
  bar.scrollIntoView({behavior:"smooth",block:"nearest"});
}
function resetAll(){
  render(EXAM, document.getElementById("quiz"));
  document.getElementById("scorebar").classList.add("hide");
  window.scrollTo({top:0,behavior:"smooth"});
}

/* ---------- 公開 ---------- */
window.MockExam = { render, gradeAll, resetAll };
})();
