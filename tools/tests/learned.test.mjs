/* tools/tests/learned.test.mjs ─ 「覚えた単語」の出しかた
   ・分母を2つ出す：全体（2000語）と、さわったぶん（13セット＝1300語）
   ・同じセットを何度やっても、最高点だけを数える（二重に足さない）
   ・★受付が閉じていても出す（自分の記録なので隠す理由がない）
   使い方: CHROME_PATH=/path/to/chrome node tools/tests/learned.test.mjs */
import { chromium } from "playwright-core";
import { loadGas } from "./gasmock.mjs";
const G = loadGas();
let pass=0, fail=0; const ok=(c,m)=>{ c?pass++:(fail++,console.log("  ✗ "+m)); };
const b = await chromium.launch({executablePath:process.env.CHROME_PATH||"/opt/pw-browsers/chromium-1194/chrome-linux/chrome",args:["--no-sandbox"]});
const p = await b.newPage(); const errs=[];
p.on("pageerror", e=>errs.push(String(e).split("\n")[0]));
await p.exposeFunction("__gas", (x)=>{ try{ return JSON.stringify(G.call(JSON.parse(x))); }
  catch(e){ return JSON.stringify({result:"error"}); } });
await p.addInitScript(()=>{ window.fetch=(u,o)=>window.__gas(o.body)
  .then(t=>({status:200,ok:true,text:()=>Promise.resolve(t),json:()=>Promise.resolve(JSON.parse(t))})); });

G.call({action:"gate", pin:"PIN", exam:"m2000", open:true});
/* 先生の例：13セットを何回かずつやって、最高記録の合計が1050 */
const BEST=[95,90,85,80,80,80,80,80,80,80,75,75,70];
BEST.forEach((best,i)=>{
  const set=i+1;
  G.call({kind:"mastery",exam:"m2000",cls:"1",num:"1",name:"いち",round:1,set,correct:best-10,asked:100,sec:90,ver:"t"});
  G.call({kind:"mastery",exam:"m2000",cls:"1",num:"1",name:"いち",round:2,set,correct:best,    asked:100,sec:90,ver:"t"});
});
const sum = BEST.reduce((a,x)=>a+x,0);   // 1050

await p.goto(new URL("../../mastery/index.html", import.meta.url).href);
await p.waitForTimeout(600);
await p.fill("#f_num","1"); await p.selectOption("#f_cls","1");
await p.waitForTimeout(900);
const openTxt = (await p.textContent("#learned")).replace(/\s+/g," ").trim();
ok(new RegExp("^"+sum+" / 2000語").test(openTxt), `★全体の分母は2000語（${openTxt}）`);
ok(/さわった13セット（1300語）のうち 1050 \/ 1300/.test(openTxt),
   `★さわったぶんは 1050 / 1300（${openTxt}）`);
ok(!/2100|2600/.test(openTxt), "同じセットの2回ぶんを二重に足していない");

/* 受付を閉じても出しつづける（閉じるのは「閉」3回ぶん待つ） */
G.call({action:"gate", pin:"PIN", exam:"m2000", open:false});
await p.waitForTimeout(17000);
const lockTxt = (await p.textContent("#learned")).replace(/\s+/g," ").trim();
ok(/受付していません/.test(await p.textContent("#gateBadge")), "ロックされた");
ok(lockTxt === openTxt, `★ロック中でも覚えた数は出たまま（${lockTxt}）`);

/* 全文法のほうは「できた文」155文 */
G.call({action:"gate", pin:"PIN", exam:"mgram", open:true});
G.call({kind:"mastery",exam:"mgram",cls:"1",num:"1",name:"いち",round:1,set:1,correct:4,asked:5,sec:60,ver:"t"});
const q = await b.newPage();
await q.exposeFunction("__gas", (x)=>JSON.stringify(G.call(JSON.parse(x))));
await q.addInitScript(()=>{ window.fetch=(u,o)=>window.__gas(o.body)
  .then(t=>({status:200,ok:true,text:()=>Promise.resolve(t),json:()=>Promise.resolve(JSON.parse(t))})); });
await q.goto(new URL("../../mastery/gram.html", import.meta.url).href);
await q.waitForTimeout(600);
await q.fill("#f_num","1"); await q.selectOption("#f_cls","1"); await q.waitForTimeout(900);
const gt = (await q.textContent("#learned")).replace(/\s+/g," ").trim();
ok(/^4 \/ 155文/.test(gt), `★全文法は 4 / 155文（${gt}）`);
ok(/さわった1項目（5文）のうち 4 \/ 5/.test(gt), `★さわったぶんは 4 / 5（${gt}）`);


/* ★受付が閉じたまま開いても、サーバーの記録が出ること（先生報告「まだ出てこない」）。
   以前は受付が開いた瞬間にしか記録を取りにいかず、授業のあとに開くと 0 に見えていた。 */
{
  const G2 = loadGas();
  G2.call({action:"gate", pin:"PIN", exam:"m2000", open:true});
  [[1,1,95],[1,2,87],[1,3,95]].forEach(([r,s,c])=>G2.call({kind:"mastery",exam:"m2000",cls:"2",num:"5",
    name:"t",round:r,set:s,correct:c,asked:100,sec:300,ver:"t"}));
  G2.call({action:"gate", pin:"PIN", exam:"m2000", open:false});
  const r = await b.newPage();
  await r.exposeFunction("__gas2", (x)=>JSON.stringify(G2.call(JSON.parse(x))));
  await r.addInitScript(()=>{ localStorage.setItem("mado_year","2"); localStorage.setItem("mado_num","5");
    window.fetch=(u,o)=>window.__gas2(o.body)
      .then(t=>({status:200,ok:true,text:()=>Promise.resolve(t),json:()=>Promise.resolve(JSON.parse(t))})); });
  await r.goto(new URL("../../mastery/index.html", import.meta.url).href);
  await r.waitForTimeout(1500);
  const t = (await r.textContent("#learned")).replace(/\s+/g," ").trim();
  ok(/受付していません/.test(await r.textContent("#gateBadge")), "受付は閉じている");
  ok(/^277 \/ 2000語/.test(t), `★閉じたまま開いても、サーバーの記録が出る（${t}）`);

  /* 単語データが読めていないときは始めず、記録もしない（0問・0秒の回を作らない） */
  const before = (G2.dump("到達度テスト")||[]).length;
  G2.call({action:"gate", pin:"PIN", exam:"m2000", open:true});
  await r.evaluate(()=>{ window.WORDS_SAVE = window.WORDS; });
  const e = await b.newPage();
  await e.exposeFunction("__gas3", (x)=>JSON.stringify(G2.call(JSON.parse(x))));
  await e.route("**/words/data/words.js", route=>route.fulfill({status:404, body:""}));
  await e.addInitScript(()=>{ window.fetch=(u,o)=>window.__gas3(o.body)
    .then(t=>({status:200,ok:true,text:()=>Promise.resolve(t),json:()=>Promise.resolve(JSON.parse(t))})); });
  await e.goto(new URL("../../mastery/index.html", import.meta.url).href);
  await e.waitForTimeout(700);
  await e.fill("#f_num","6"); await e.selectOption("#f_cls","2"); await e.waitForTimeout(900);
  await e.click("#startSet"); await e.waitForTimeout(500);
  const after = (G2.dump("到達度テスト")||[]).length;
  ok(after === before, `★単語が読めないときは記録しない（行数 ${before}→${after}）`);
  ok(/読みこめませんでした/.test(await e.textContent("#qJa")), "開きなおすよう伝える");
  await r.close(); await e.close();
}


/* Enter の押しっぱなし（キーリピート）ではパスしない。1回ずつ押せばパスできる。 */
{
  const G3 = loadGas();
  G3.call({action:"gate", pin:"PIN", exam:"m2000", open:true});
  const k = await b.newPage();
  await k.exposeFunction("__gas4", (x)=>JSON.stringify(G3.call(JSON.parse(x))));
  await k.addInitScript(()=>{ window.fetch=(u,o)=>window.__gas4(o.body)
    .then(t=>({status:200,ok:true,text:()=>Promise.resolve(t),json:()=>Promise.resolve(JSON.parse(t))})); });
  await k.goto(new URL("../../mastery/index.html", import.meta.url).href);
  await k.waitForTimeout(600);
  await k.fill("#f_num","7"); await k.selectOption("#f_cls","2"); await k.waitForTimeout(900);
  await k.click("#startSet"); await k.waitForTimeout(300);
  const left0 = Number(await k.textContent("#mLeft"));
  await k.evaluate(()=>{ const el=document.getElementById("ansIn");
    for (let i=0;i<30;i++) el.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",repeat:true,bubbles:true})); });
  const left1 = Number(await k.textContent("#mLeft"));
  ok(left1 === left0, `★押しっぱなしの Enter では進まない（のこり ${left0}→${left1}）`);
  await k.press("#ansIn","Enter"); await k.press("#ansIn","Enter");
  const left2 = Number(await k.textContent("#mLeft"));
  ok(left2 === left0-2, `1回ずつ押せばパスできる（のこり ${left0}→${left2}）`);
  await k.close();
}

console.log(errs.length? "\nJSエラー:\n"+errs.slice(0,3).join("\n") : "\nJSエラーなし");
await b.close();
console.log(`\n${pass} pass / ${fail} fail`);
process.exit(fail?1:0);
