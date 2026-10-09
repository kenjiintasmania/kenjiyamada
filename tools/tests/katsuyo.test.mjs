/* tools/tests/katsuyo.test.mjs ─ 活用編 到達度テストの通し試験
   本物の katsuyo.html（mastery.js を活用編の設定で読む）を、本物の score_gas.gs（模型スプレッドシート）につないで動かす。 */
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

G.call({action:"gate", pin:"PIN", exam:"mkatsu", open:true});
await p.goto(new URL("../../mastery/katsuyo.html", import.meta.url).href); await p.waitForTimeout(700);
ok(/受付中/.test(await p.textContent("#gateBadge")), "受付中になる（mkatsu の受付で開く）");
await p.selectOption("#f_cls","3"); await p.fill("#f_num","7"); await p.dispatchEvent("#f_num","change");
await p.waitForTimeout(700);
ok((await p.$$("#setBar button")).length===8, "帯が8セット（"+(await p.$$("#setBar button")).length+"）");
ok(/\/ 600語形/.test(await p.textContent("#learned")), "分母は600語形（"+(await p.textContent("#learned")).trim().slice(0,30)+"）");
ok(/動詞の活用/.test(await p.textContent("#listTitle")), "セット1は動詞（"+(await p.textContent("#listTitle"))+"）");
ok((await p.$$("#listBody div")).length===75, "一覧は75語形");
await p.click('#setBar button[data-set="8"]'); await p.waitForTimeout(400);
ok(/形容詞の比較/.test(await p.textContent("#listTitle")), "セット8は形容詞（"+(await p.textContent("#listTitle"))+"）");
await p.click("#startSet"); await p.waitForTimeout(400);
ok(await p.isVisible("#testCard"), "出題画面に入る");
ok(/形容詞の比較　原形/.test(await p.textContent("#qPos")), "札に 種類＋語形（"+(await p.textContent("#qPos"))+"）");
/* 75語形：3つめ（最上級）を1回まちがえて、セット末のもう一度で正解。5つめはパス。 */
const set8=await p.evaluate(()=>window.MASTERY_CFG.setOf(8).map(x=>({w:x.w, prompt:window.WordJudge.promptOf(x)})));
let steps=0, wrongDone=false, passed=false;
while(steps++<90){
  if(await p.isVisible("#doneCard")) break;
  const ja=await p.textContent("#qJa");
  const it=set8.find(x=>x.prompt===ja);
  if(!it){ ok(false, "出題が教材に見つからない: "+ja.slice(0,30)); break; }
  let v=it.w;
  if(it===set8[2] && !wrongDone){ v="wrong"; wrongDone=true; }
  if(it===set8[4] && !passed){ v=""; passed=true; }
  await p.fill("#ansIn", v); await p.press("#ansIn","Enter"); await p.waitForTimeout(25);
}
ok(await p.isVisible("#doneCard"), "75語形（＋もう一度1語）で結果画面へ");
ok((await p.textContent("#doneScore"))==="74 / 75", "パス1語で 74 / 75（"+(await p.textContent("#doneScore"))+"）");
await p.waitForTimeout(700);
const rows=(G.dump("到達度テスト")||[]).slice(1);
ok(rows.length===1 && rows[0][2]==="mkatsu" && Number(rows[0][7])===8 && Number(rows[0][8])===74, "シートに mkatsu・セット8・正解74（"+JSON.stringify(rows.map(r=>r.slice(2,9)))+"）");
ok(G.call({action:"progress", exam:"m2000", cls:"3", num:"7"}).done===0, "★2000語には入っていない");
await p.click("#sendNext"); await p.waitForTimeout(800);
ok(/74<\/b> \/ 600語形/.test(await p.innerHTML("#learned")), "できた語形 74 / 600語形");
const ls=await p.evaluate(()=>Object.keys(localStorage).filter(k=>/^mastery/.test(k)));
ok(ls.includes("mastery_katsu_v1") && !ls.includes("mastery_v1"), "端末の控えは mastery_katsu_v1（"+ls.join(",")+"）");
await p.close(); await b.close();
console.log(errs.length? "\nJSエラー:\n"+errs.slice(0,5).join("\n") : "\nJSエラーなし");
console.log(`\n${pass} pass / ${fail} fail`);
