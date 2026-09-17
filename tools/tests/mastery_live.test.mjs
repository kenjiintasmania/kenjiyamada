/* tools/tests/mastery_live.test.mjs ─ 本物の mastery/index.html を、本物の score_gas.gs
   （tools/tests/gasmock.mjs の模型スプレッドシート上）につないで動かす通し試験。
   「受付中なのに一覧へ戻される」「受付が閉じるとセットが捨てられる」を捕まえるために作った。
   使い方: CHROME_PATH=/path/to/chrome node tools/tests/mastery_live.test.mjs      */
/* 本物の mastery/index.html を、本物の score_gas.gs（Node模型）につないで動かす */
import { chromium } from "playwright-core";
import { loadGas } from "./gasmock.mjs";
const G=loadGas();
let pass=0,fail=0; const ok=(c,m)=>{ c?pass++:(fail++,console.log("  ✗ "+m)); };
const calls=[];
const b=await chromium.launch({executablePath:process.env.CHROME_PATH||"/opt/pw-browsers/chromium-1194/chrome-linux/chrome",args:["--no-sandbox"]});
const p=await b.newPage();
p.on("pageerror",e=>console.log("PAGEERROR", String(e).split("\n")[0]));
await p.exposeFunction("__gas", (body)=>{
  const obj=JSON.parse(body); calls.push(obj);
  try { return JSON.stringify(G.call(obj)); } catch(e){ return JSON.stringify({result:"error", message:String(e)}); }
});
await p.addInitScript(()=>{
  window.fetch=function(url,opt){
    return window.__gas(opt.body).then(function(t){
      return { status:200, ok:true, text:()=>Promise.resolve(t), json:()=>Promise.resolve(JSON.parse(t)) };
    });
  };
});

// 先生：受付を開ける
console.log("先生がスタート:", JSON.stringify(G.call({action:"gate", pin:"PIN", exam:"m2000", open:true})));

await p.goto(new URL("../../mastery/index.html", import.meta.url).href); await p.waitForTimeout(700);
const badge=()=>p.textContent("#gateBadge");
const visible=()=>p.evaluate(()=>["listCard","testCard","doneCard"]
  .filter(id=>!document.getElementById(id).classList.contains("hide")).join(",")||"（なし）");

ok(/受付中/.test(await badge()), "生徒画面：受付中になる（"+(await badge())+"）");
await p.selectOption("#f_cls","3"); await p.fill("#f_num","7"); await p.dispatchEvent("#f_num","change");
await p.waitForTimeout(600);
ok((await visible())==="listCard", "一覧が出る（"+(await visible())+"）");

await p.click("#startSet"); await p.waitForTimeout(300);
ok((await visible())==="testCard", "テスト画面に入る");

// ★ここが本題：ポーリングが2回まわるあいだ、テスト画面のままか
console.log("  …ポーリングを2回またぐまで待ちます（12秒）");
for(let i=0;i<6;i++){
  await p.waitForTimeout(2000);
  const v=await p.evaluate(()=>({card:["listCard","testCard","doneCard"]
      .filter(id=>!document.getElementById(id).classList.contains("hide")).join(",")||"（なし）",
    badge:document.getElementById("gateBadge").textContent}));
  console.log(`   ${(i+1)*2}秒: ${v.card} / ${v.badge}`);
}
ok((await visible())==="testCard", "★12秒たってもテスト画面のまま（"+(await visible())+"）");
ok(/受付中/.test(await badge()), "★12秒たっても受付中のまま（"+(await badge())+"）");
console.log("  サーバーの状態:", JSON.stringify(G.call({action:"status", exam:"m2000"})));
console.log("  画面が呼んだもの:", calls.map(c=>c.action||c.kind).join(", "));

/* ---- 受付が途中で閉じられても、そのセットは最後まで進められる ---- */
console.log("先生がストップ:", JSON.stringify(G.call({action:"gate", pin:"PIN", exam:"m2000", open:false})).slice(0,60));
/* ロックは「閉」が3回続いてから（約15秒）。一瞬の「閉」で授業が止まらないよう
   わざと遅らせてある（gate_flap.test.mjs 参照）ので、ここも待つ。 */
await p.waitForTimeout(17000);
ok((await visible())==="testCard", "★受付が閉じてもテスト画面のまま（"+(await visible())+"）");
ok(/受付していません/.test(await badge()), "バッジはロックになる");
ok(/最後まで進められます/.test(await p.textContent("#gateMsg")), "最後までやってよいと伝える（"+(await p.textContent("#gateMsg")).slice(0,30)+"）");

/* ---- 閉じたまま1セット終える → 記録は端末に残り、開き直すと届く ---- */
await p.evaluate(()=>{
  const inp=document.getElementById("ansIn");
  for(let i=0;i<400;i++){
    if(!document.getElementById("doneCard").classList.contains("hide")) break;
    inp.value=""; inp.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:true}));
  }
});
await p.waitForTimeout(600);
ok((await visible())==="doneCard", "閉じていてもセットは終えられる（"+(await visible())+"）");
const before=G.call({action:"progress", exam:"m2000", cls:"3", num:"7"});
ok(before.done===0, "閉じている間はシートに入らない（done="+before.done+"）");
const pend=await p.evaluate(()=>JSON.parse(localStorage.getItem("mastery_v1")||"{}").__pending||[]);
ok(pend.length===1, "端末に1件ひかえてある（"+pend.length+"）");

console.log("先生がもう一度スタート");
G.call({action:"gate", pin:"PIN", exam:"m2000", open:true});
await p.waitForTimeout(6500);
await p.click("#nextSet").catch(()=>{});
await p.waitForTimeout(1500);
const after=G.call({action:"progress", exam:"m2000", cls:"3", num:"7"});
ok(after.done===1, "★開き直すと、ひかえていた記録が届く（done="+after.done+"）");
ok(after.round===1 && after.set===2, "続きはセット2（"+after.round+"-"+after.set+"）");

await p.close(); await b.close();
console.log(`\n${pass} pass / ${fail} fail`);
