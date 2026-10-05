/* tools/tests/idiom.test.mjs ─ 熟語200語 到達度テストの通し試験
   本物の idiom.html（mastery.js を熟語の設定で読む）を、本物の score_gas.gs（模型スプレッドシート）につないで動かす。
   使い方: CHROME_PATH=/path/to/chrome node tools/tests/idiom.test.mjs */
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

G.call({action:"gate", pin:"PIN", exam:"midiom", open:true});
await p.goto(new URL("../../mastery/idiom.html", import.meta.url).href); await p.waitForTimeout(700);
ok(/受付中/.test(await p.textContent("#gateBadge")), "受付中になる（midiom の受付で開く）");
await p.selectOption("#f_cls","3"); await p.fill("#f_num","7"); await p.dispatchEvent("#f_num","change");
await p.waitForTimeout(700);

ok((await p.$$("#setBar button")).length===10, "帯が10セット（"+(await p.$$("#setBar button")).length+"）");
ok(/\/ 200語/.test(await p.textContent("#learned")), "覚えた熟語の分母は200語（"+(await p.textContent("#learned")).trim().slice(0,30)+"）");
ok(await p.isVisible("#listCard"), "一覧が出る");
ok(/look/.test(await p.textContent("#listTitle")), "セット1は look 系（"+(await p.textContent("#listTitle"))+"）");
ok((await p.$$("#listBody div")).length===20, "一覧は20語");
ok(/look at/.test(await p.textContent("#listBody")) && /hear of/.test(await p.textContent("#listBody")), "look at 〜 hear of がならぶ");
// 帯でセット2へ移れる
await p.click('#setBar button[data-set="2"]'); await p.waitForTimeout(400);
ok(/take/.test(await p.textContent("#listTitle")), "セット2は take 系（"+(await p.textContent("#listTitle"))+"）");
await p.click('#setBar button[data-set="1"]'); await p.waitForTimeout(400);

await p.click("#startSet"); await p.waitForTimeout(400);
ok(await p.isVisible("#testCard"), "出題画面に入る");
ok(/セット1/.test(await p.textContent("#qPos")), "札にセット名（"+(await p.textContent("#qPos"))+"）");

/* 20語を打つ：index 3（look like）は1回まちがえて、セット末のもう一度で正解。index 5（look around）はパス。
   watch out には手がかり「（w ではじまる）」がつく（look out と同じ「気をつける」）。 */
const set1=await p.evaluate(()=>window.IDIOMS.sets[0].items.map(x=>({w:x.w, j:x.j, prompt:window.WordJudge.promptOf(x)})));
const clean=(w)=>w.replace(/\.{3}|…|[～〜]/g," it ").replace(/[（(][^)）]*[)）]|［[^］]*］/g," ").replace(/\s+/g," ").trim();
let sawHint=false, firstWrongDone=false, steps=0;
while(steps++<30){
  if(await p.isVisible("#doneCard")) break;
  const ja=(await p.textContent("#qJa")).trim();
  const it=set1.find(x=>x.prompt===ja);
  if(!it){ ok(false, "出題の日本語が教材に見つからない: "+ja); break; }
  if(it.w==="watch out" && /（w ではじまる）/.test(ja)) sawHint=true;
  let v=clean(it.w);
  if(it.w==="look like" && !firstWrongDone){ v="look likes"; firstWrongDone=true; }
  if(it.w==="look around") v="";
  if(it.w==="see ... off") v="see him off";            // 「...」に語を入れても○
  if(it.w==="look back (on)") v="LOOK BACK";          // ( ) は省いてよい・大文字でも○
  await p.fill("#ansIn", v); await p.press("#ansIn","Enter"); await p.waitForTimeout(40);
}
ok(sawHint, "★watch out には手がかり「（w ではじまる）」がつく");
ok(await p.isVisible("#doneCard"), "20語（＋もう一度1語）で結果画面へ");
ok((await p.textContent("#doneScore"))==="19 / 20", "パス1語で 19 / 20（"+(await p.textContent("#doneScore"))+"）");
ok(/パス 1語/.test(await p.textContent("#doneSub")), "パスの数が出る");
ok((await p.$$("#missBody div")).length===1 && /look around/.test(await p.textContent("#missBody")), "取れなかった語は look around だけ");

await p.waitForTimeout(700);
const rows=(G.dump("到達度テスト")||[]).slice(1);
ok(rows.length===1 && rows[0][2]==="midiom" && Number(rows[0][8])===19 && Number(rows[0][9])===21,
   "シートに midiom・正解19・21問 の行（"+JSON.stringify(rows.map(r=>r.slice(2,10)))+"）");
ok(G.call({action:"progress", exam:"m2000", cls:"3", num:"7"}).done===0, "★2000語（m2000）には入っていない");
await p.click("#sendNext"); await p.waitForTimeout(800);
ok(/いまは セット2/.test(await p.textContent("#progMsg")), "次のおすすめはセット2（"+(await p.textContent("#progMsg"))+"）");
ok(/19<\/b> \/ 200語/.test(await p.innerHTML("#learned")), "覚えた熟語 19 / 200語（"+(await p.textContent("#learned")).trim().slice(0,40)+"）");
const ls=await p.evaluate(()=>Object.keys(localStorage).filter(k=>/^mastery/.test(k)));
ok(ls.includes("mastery_idiom_v1") && !ls.includes("mastery_v1"), "端末の控えは mastery_idiom_v1（"+ls.join(",")+"）");

await p.close(); await b.close();
console.log(errs.length? "\nJSエラー:\n"+errs.slice(0,5).join("\n") : "\nJSエラーなし");
console.log(`\n${pass} pass / ${fail} fail`);
