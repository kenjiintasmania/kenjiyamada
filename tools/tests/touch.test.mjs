/* tools/tests/touch.test.mjs ─ 指で押して動くこと（Chromebook のタッチ画面で反応しないと報告）
   ・開始ボタンが、スクロールしなくても画面に入っていること
     （100語の一覧のあとに置くと画面の外へ出る。タブレットでは指がとどかない）
   ・タップで始まること／帯を続けてタップしても飲まれないこと
   使い方: CHROME_PATH=/path/to/chrome node tools/tests/touch.test.mjs */
import { chromium } from "playwright-core";
import { loadGas } from "./gasmock.mjs";
const G = loadGas();
let pass=0, fail=0; const ok=(c,m)=>{ c?pass++:(fail++,console.log("  ✗ "+m)); };
const b = await chromium.launch({executablePath:process.env.CHROME_PATH||"/opt/pw-browsers/chromium-1194/chrome-linux/chrome",args:["--no-sandbox"]});
const errs=[];

async function onDevice(page, exam, label, vp) {
  G.call({action:"gate", pin:"PIN", exam, open:true});
  const ctx = await b.newContext({viewport:vp, hasTouch:true, deviceScaleFactor:2});
  const p = await ctx.newPage();
  p.on("pageerror", e=>errs.push(label+": "+String(e).split("\n")[0]));
  await p.exposeFunction("__gas", (x)=>{ try{ return JSON.stringify(G.call(JSON.parse(x))); }
    catch(e){ return JSON.stringify({result:"error"}); } });
  await p.addInitScript(()=>{ window.fetch=(u,o)=>window.__gas(o.body)
    .then(t=>({status:200,ok:true,text:()=>Promise.resolve(t),json:()=>Promise.resolve(JSON.parse(t))})); });
  await p.goto(new URL("../../"+page, import.meta.url).href);
  await p.waitForTimeout(600);
  await p.fill("#f_num","9"); await p.selectOption("#f_cls","3");
  await p.waitForTimeout(800);
  return p;
}

for (const [page, exam, label] of [["mastery/index.html","m2000","2000語"], ["mastery/gram.html","mgram","全文法"]]) {
  for (const [vl, vp] of [["横1024x768",{width:1024,height:768}], ["縦768x1024",{width:768,height:1024}]]) {
    const p = await onDevice(page, exam, label+vl, vp);
    const vis = await p.evaluate(()=>{ const r=document.getElementById("startSet").getBoundingClientRect();
      return r.top>=0 && r.bottom<=innerHeight; });
    ok(vis, `★${label} ${vl}：開始ボタンがスクロールなしで画面に入っている`);
    await p.tap("#startSet"); await p.waitForTimeout(350);
    const now = await p.evaluate(()=>["listCard","testCard","doneCard"]
      .filter(id=>!document.getElementById(id).classList.contains("hide")).join(",")||"(なし)");
    ok(now==="testCard", `★${label} ${vl}：指でタップすると始まる（${now}）`);
    await p.context().close();
  }
}

/* 帯を続けてタップしても飲まれないこと（click の二重発火よけが効きすぎると起きる） */
{
  G.call({action:"gate", pin:"PIN", exam:"m2000", open:true});
  const ctx = await b.newContext({viewport:{width:1024,height:768}, hasTouch:true});
  const p = await ctx.newPage();
  p.on("pageerror", e=>errs.push("帯: "+String(e).split("\n")[0]));
  await p.exposeFunction("__gas", (x)=>JSON.stringify(G.call(JSON.parse(x))));
  await p.addInitScript(()=>{ window.fetch=(u,o)=>window.__gas(o.body)
    .then(t=>({status:200,ok:true,text:()=>Promise.resolve(t),json:()=>Promise.resolve(JSON.parse(t))})); });
  await p.goto(new URL("../../mastery/index.html", import.meta.url).href);
  await p.waitForTimeout(600);
  await p.fill("#f_num","9"); await p.selectOption("#f_cls","3"); await p.waitForTimeout(800);
  await p.tap('#setBar button[data-set="20"]'); await p.waitForTimeout(250);
  const a = await p.textContent("#listTitle");
  await p.tap('#setBar button[data-set="1"]');  await p.waitForTimeout(250);
  const c = await p.textContent("#listTitle");
  ok(/セット20/.test(a), `帯の20を指でえらべる（${a.slice(0,18)}）`);
  ok(/セット1（/.test(c), `★続けて1をえらんでも飲まれない（${c.slice(0,18)}）`);
  await ctx.close();
}


/* ★報告された形そのもの：番号を打った指が、そのままスタートを押す。
   入力欄からフォーカスが外れて change が走るのと、ボタンを押すのが同時に起きる。 */
{
  G.call({action:"gate", pin:"PIN", exam:"m2000", open:true});
  const ctx = await b.newContext({viewport:{width:1366,height:768}, hasTouch:true});
  const p = await ctx.newPage();
  p.on("pageerror", e=>errs.push("打ってすぐ押す: "+String(e).split("\n")[0]));
  await p.exposeFunction("__gas", (x)=>JSON.stringify(G.call(JSON.parse(x))));
  await p.addInitScript(()=>{ window.fetch=(u,o)=>window.__gas(o.body)
    .then(t=>({status:200,ok:true,text:()=>Promise.resolve(t),json:()=>Promise.resolve(JSON.parse(t))})); });
  await p.goto(new URL("../../mastery/index.html", import.meta.url).href);
  await p.waitForTimeout(600);
  await p.selectOption("#f_cls","3");
  await p.waitForTimeout(700);
  // 番号は最後に打つ＝入力欄にフォーカスが残ったまま
  await p.click("#f_num"); await p.keyboard.type("12");
  await p.waitForTimeout(700);
  await p.tap("#startSet"); await p.waitForTimeout(400);
  const now = await p.evaluate(()=>["listCard","testCard","doneCard"]
    .filter(id=>!document.getElementById(id).classList.contains("hide")).join(",")||"(なし)");
  ok(now==="testCard", `★番号を打った指でそのままスタートを押せる（${now}）`);

  await ctx.close();
}
/* 帯も同じ。打ったすぐあとに指でセットをえらんでも、1に戻されない */
{
  const ctx = await b.newContext({viewport:{width:1366,height:768}, hasTouch:true});
  const p = await ctx.newPage();
  p.on("pageerror", e=>errs.push("帯を打ってすぐ: "+String(e).split("\n")[0]));
  await p.exposeFunction("__gas", (x)=>JSON.stringify(G.call(JSON.parse(x))));
  await p.addInitScript(()=>{ window.fetch=(u,o)=>window.__gas(o.body)
    .then(t=>({status:200,ok:true,text:()=>Promise.resolve(t),json:()=>Promise.resolve(JSON.parse(t))})); });
  await p.goto(new URL("../../mastery/index.html", import.meta.url).href);
  await p.waitForTimeout(600);
  await p.selectOption("#f_cls","3"); await p.waitForTimeout(700);
  await p.click("#f_num"); await p.keyboard.type("15");
  await p.waitForTimeout(700);
  await p.tap('#setBar button[data-set="20"]'); await p.waitForTimeout(600);
  const t = await p.textContent("#listTitle");
  ok(/セット20/.test(t), `★打ったすぐあとに指でセット20をえらべる（${t.slice(0,20)}）`);
  await ctx.close();
}

console.log(errs.length? "\nJSエラー:\n"+errs.slice(0,3).join("\n") : "\nJSエラーなし");
await b.close();
console.log(`\n${pass} pass / ${fail} fail`);
process.exit(fail?1:0);
