/* tools/tests/gate_flap.test.mjs ─ 受付が一瞬だけ「閉」を返しても、生徒を蹴り出さないこと
   GAS はシートや行が見つからなかっただけでも {result:"ok", open:false} を返す。
   生徒が一斉に記録を送っている最中にこれが起き、授業中に受付がチカチカした（2026-09）。
   使い方: CHROME_PATH=/path/to/chrome node tools/tests/gate_flap.test.mjs */
import { chromium } from "playwright-core";
let pass=0,fail=0; const ok=(c,m)=>{ c?pass++:(fail++,console.log("  ✗ "+m)); };
const b=await chromium.launch({executablePath:process.env.CHROME_PATH||"/opt/pw-browsers/chromium-1194/chrome-linux/chrome",args:["--no-sandbox"]});
const p=await b.newPage(); const errs=[]; p.on("pageerror",e=>errs.push(String(e)));

let mode="open";           // open / blip（1回だけ閉）/ closed（本当に閉）
let blips=0;
await p.exposeFunction("__gas",(body)=>{
  const d=JSON.parse(body);
  if(d.action==="status"){
    let isOpen = true;
    if(mode==="closed") isOpen=false;
    else if(mode==="blip"){ blips++; isOpen = (blips!==1); }   // 最初の1回だけ閉を返す
    return JSON.stringify({result:"ok", open:isOpen, exam:d.exam, title:"2000語 到達度テスト",
                           session:"S1", submissions:0, ver:"jigaku-10"});
  }
  if(d.action==="progress") return JSON.stringify({result:"ok", sets:{}});
  return JSON.stringify({result:"ok"});
});
await p.addInitScript(()=>{ window.fetch=(u,o)=>window.__gas(o.body)
  .then(t=>({status:200,ok:true,text:()=>Promise.resolve(t),json:()=>Promise.resolve(JSON.parse(t))})); });
await p.goto(new URL("../../mastery/index.html", import.meta.url).href); await p.waitForTimeout(700);
await p.selectOption("#f_cls","3"); await p.fill("#f_num","7"); await p.dispatchEvent("#f_num","change");
await p.waitForTimeout(600);
const badge=()=>p.textContent("#gateBadge");
ok(/受付中/.test(await badge()), "はじめは受付中（"+(await badge())+"）");

// ① 1回だけ「閉」が混ざる → ロックされてはいけない
mode="blip";
await p.waitForTimeout(6000);                  // ポーリング1回ぶん以上
ok(/受付中/.test(await badge()), "★1回だけの「閉」ではロックしない（"+(await badge())+"）");
await p.waitForTimeout(6000);
ok(/受付中/.test(await badge()), "★そのあとも受付中のまま（"+(await badge())+"）");

// ② 答えている途中に1回だけ「閉」が来ても、出題画面から出されない
await p.click("#startSet"); await p.waitForTimeout(300);
blips=0; mode="blip";
await p.waitForTimeout(6000);
const vis=await p.evaluate(()=>["listCard","testCard","doneCard"]
  .filter(id=>!document.getElementById(id).classList.contains("hide")).join(","));
ok(vis==="testCard", "★答えている途中でも出題画面のまま（"+vis+"）");
await p.click("#quitSet"); await p.evaluate(()=>{ window.confirm=()=>true; });
await p.click("#quitSet"); await p.waitForTimeout(300);

// ③ 本当に閉じたら、15秒くらいでちゃんと閉じる
mode="closed";
await p.waitForTimeout(6000);
ok(/受付中/.test(await badge()), "閉が2回目まではまだ受付中（"+(await badge())+"）");
await p.waitForTimeout(12000);
ok(/受付していません/.test(await badge()), "★閉が続けば、ちゃんとロックされる（"+(await badge())+"）");

console.log(errs.length? "\nJSエラー:\n"+errs.slice(0,3).join("\n") : "\nJSエラーなし");
await p.close(); await b.close();
console.log(`\n${pass} pass / ${fail} fail`);
process.exit(fail?1:0);
