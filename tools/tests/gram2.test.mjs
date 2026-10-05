/* tools/tests/gram2.test.mjs ─ 全文法 到達度テスト 上級編（打つ）の通し試験
   本物の gram2.html（gram.js を「打つ」で読む）を、本物の score_gas.gs（模型スプレッドシート）につないで動かす。
   使い方: CHROME_PATH=/path/to/chrome node tools/tests/gram2.test.mjs */
import { chromium } from "playwright-core";
import { loadGas } from "./gasmock.mjs";
const G=loadGas();
let pass=0,fail=0; const ok=(c,m)=>{ c?pass++:(fail++,console.log("  ✗ "+m)); };
const b=await chromium.launch({executablePath:process.env.CHROME_PATH||"/opt/pw-browsers/chromium-1194/chrome-linux/chrome",args:["--no-sandbox"]});
const p=await b.newPage(); const errs=[];
p.on("pageerror",e=>errs.push(String(e)));
p.on("console",m=>{ if(m.type()==="error") errs.push("console: "+m.text().slice(0,140)); });
await p.exposeFunction("__gas",(body)=>{ try{ return JSON.stringify(G.call(JSON.parse(body))); }
  catch(e){ return JSON.stringify({result:"error",message:String(e)}); } });
await p.addInitScript(()=>{ window.fetch=(u,o)=>window.__gas(o.body)
  .then(t=>({status:200,ok:true,text:()=>Promise.resolve(t),json:()=>Promise.resolve(JSON.parse(t))})); });

G.call({action:"gate", pin:"PIN", exam:"mgram2", open:true});
await p.goto(new URL("../../mastery/gram2.html", import.meta.url).href); await p.waitForTimeout(700);
ok(/受付中/.test(await p.textContent("#gateBadge")), "受付中になる（mgram2 の受付で開く）");
await p.selectOption("#f_cls","3"); await p.fill("#f_num","7"); await p.dispatchEvent("#f_num","change");
await p.waitForTimeout(700);

ok((await p.$$("#setBar button")).length===31, "帯が31項目");
ok(await p.isVisible("#listCard"), "項目のはじめが出る");
ok(/自分で打ちます/.test(await p.textContent("#listCard")), "打つ編の説明が出る");
ok(!(await p.evaluate(()=>document.getElementById("leadBox").open)), "解説はたたまれている");

await p.click("#startSet"); await p.waitForTimeout(400);
ok(await p.isVisible("#testCard"), "出題画面に入る");
const inputs=await p.$$eval("#qFrame input[data-in]", ns=>ns.length);
const selects=await p.$$eval("#qFrame select[data-in]", ns=>ns.length);
ok(inputs>0 && selects===0, "★ドロップダウンではなく入力欄（input "+inputs+"・select "+selects+"）");
ok(await p.evaluate(()=>document.activeElement && document.activeElement.matches("#qFrame input[data-in]")), "最初の入力欄にフォーカス");

// Enter は「次の空いている箱へ」。1つ打っただけで採点されない
await p.keyboard.type("i"); await p.keyboard.press("Enter"); await p.waitForTimeout(120);
ok(await p.evaluate(()=>{ const ins=[...document.querySelectorAll("#qFrame input[data-in]")]; return document.activeElement===ins[1]; }),
   "★Enter で次の箱へ移る（まだ採点しない）");
ok((await p.textContent("#qVerdict")).trim()==="", "まだ○×は出ていない");

// 第1文：ぜんぶ埋めて Enter → 採点。大文字小文字・全角はゆるす（GojunCore と同じものさし）
const items=await p.evaluate(()=>window.GOJUN.items[0].sents.map(s=>({fill:s.fill,en:s.en})));
await p.evaluate((s)=>{ document.querySelectorAll("#qFrame input[data-in]").forEach((el,i)=>{
  const f=s.fill[el.getAttribute("data-in")]; let v=f.en;
  if(i===1) v=v.toUpperCase();                                   // STUDY
  if(i===2) v=v.replace(/[A-Za-z]/g,c=>String.fromCharCode(c.charCodeAt(0)+65248)); // 全角 Ｅｎｇｌｉｓｈ
  el.value=v; }); }, items[0]);
await p.focus("#qFrame input[data-in]:last-of-type");
await p.evaluate(()=>{ const ins=[...document.querySelectorAll("#qFrame input[data-in]")]; ins[ins.length-1].focus(); });
await p.keyboard.press("Enter"); await p.waitForTimeout(150);
ok(/○ 正解/.test(await p.textContent("#qVerdict")), "★大文字・全角で打っても○（"+(await p.textContent("#qVerdict")).slice(0,30)+"）");
await p.waitForTimeout(600);

// 第2文：1か所まちがえる → ×・正解が箱に出る・止まる
await p.evaluate((s)=>{ document.querySelectorAll("#qFrame input[data-in]").forEach((el,i)=>{
  const f=s.fill[el.getAttribute("data-in")]; el.value = i===1 ? "play" : f.en; }); }, items[1]);
await p.click("#qCheck"); await p.waitForTimeout(150);
ok(/× おしい/.test(await p.textContent("#qVerdict")), "まちがえると ×");
ok((await p.$$("#qFrame .box.ng .right")).length===1, "外した箱に正解が出る");
ok(await p.isVisible("#qNext"), "まちがえたときは止まる（次へ ボタン）");
await p.click("#qNext"); await p.waitForTimeout(200);

// 第3〜5文：正解して終える
for(let n=2;n<5;n++){
  await p.evaluate((s)=>{ document.querySelectorAll("#qFrame input[data-in]").forEach(el=>{
    const f=s.fill[el.getAttribute("data-in")]; el.value=f.en; }); }, items[n]);
  await p.click("#qCheck"); await p.waitForTimeout(650);
}
ok(await p.isVisible("#doneCard"), "5文終えると結果画面へ");
ok((await p.textContent("#doneScore"))==="4 / 5", "1文外して 4 / 5（"+(await p.textContent("#doneScore"))+"）");
ok((await p.$$("#missBody div")).length===1, "取れなかった文が1つ出る");

// 記録は mgram2 として入り、えらぶ編（mgram）には混ざらない
await p.waitForTimeout(700);
const rows=(G.dump("到達度テスト")||[]).slice(1);
ok(rows.length===1 && rows[0][2]==="mgram2" && Number(rows[0][8])===4, "シートに mgram2・正解4 の行（"+JSON.stringify(rows.map(r=>r.slice(2,9)))+"）");
ok(G.call({action:"progress", exam:"mgram", cls:"3", num:"7"}).done===0, "★えらぶ編（mgram）には入っていない");
ok(G.call({action:"progress", exam:"mgram2", cls:"3", num:"7"}).done===1, "上級編の続きの位置が取れる");
await p.click("#sendNext"); await p.waitForTimeout(800);
ok(/いまは 項目2/.test(await p.textContent("#progMsg")), "次のおすすめは項目2（"+(await p.textContent("#progMsg"))+"）");
const ls=await p.evaluate(()=>Object.keys(localStorage).filter(k=>/^mastery/.test(k)));
ok(ls.includes("mastery_gram2_v1") && !ls.includes("mastery_gram_v1"), "端末の控えは mastery_gram2_v1（"+ls.join(",")+"）");

await p.close(); await b.close();
console.log(errs.length? "\nJSエラー:\n"+errs.slice(0,5).join("\n") : "\nJSエラーなし");
console.log(`\n${pass} pass / ${fail} fail`);
