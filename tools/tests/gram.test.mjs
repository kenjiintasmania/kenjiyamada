/* tools/tests/gram.test.mjs ─ 全文法 到達度テストの通し試験
   本物の gram.html を、本物の score_gas.gs（模型スプレッドシート）につないで動かす。
   使い方: CHROME_PATH=/path/to/chrome node tools/tests/gram.test.mjs */
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

G.call({action:"gate", pin:"PIN", exam:"mgram", open:true});
await p.goto(new URL("../../mastery/gram.html", import.meta.url).href); await p.waitForTimeout(700);
ok(/受付中/.test(await p.textContent("#gateBadge")), "受付中になる");
await p.selectOption("#f_cls","3"); await p.fill("#f_num","7"); await p.dispatchEvent("#f_num","change");
await p.waitForTimeout(700);

ok((await p.$$("#setBar button")).length===31, "帯が31項目（"+(await p.$$("#setBar button")).length+"）");
ok(await p.isVisible("#listCard"), "項目のはじめが出る");
ok(/一般動詞/.test(await p.textContent("#listTitle")), "1つめの項目名が出る（"+(await p.textContent("#listTitle"))+"）");
ok((await p.$$("#listBody div")).length===5, "5文の日本語が出る");
ok(!(await p.evaluate(()=>document.getElementById("leadBox").open)), "★解説はたたまれている");
ok((await p.textContent("#leadBody")).length>10, "解説の中身は入っている（開けば読める）");
ok(!/[a-zA-Z]{4,}/.test(await p.textContent("#listBody")), "予告に英語の答えは出ていない");

// 項目を自由にえらべる
await p.click('#setBar button[data-set="24"]'); await p.waitForTimeout(400);
ok(/仮定法/.test(await p.textContent("#listTitle")), "★項目24を選べる（"+(await p.textContent("#listTitle"))+"）");
await p.click('#setBar button[data-set="1"]'); await p.waitForTimeout(400);

// 出題
await p.click("#startSet"); await p.waitForTimeout(400);
ok(await p.isVisible("#testCard"), "出題画面に入る");
const boxes=await p.$$eval("#qFrame .box", ns=>ns.length);
ok(boxes===7, "箱が7つ（"+boxes+"）");
const sels=await p.$$eval("#qFrame select[data-in]", ns=>ns.length);
ok(sels>0, "ドロップダウンが出る（"+sels+"）");
ok(/第 1 文 \/ 5/.test(await p.textContent("#qProg")), "何文目かが出る");

// 5文ぜんぶ正解して終える
const res=await p.evaluate(async()=>{
  const it=window.GOJUN.items[0];
  for(let n=0;n<5;n++){
    if(!document.getElementById("doneCard").classList.contains("hide")) break;
    const s=it.sents[n];
    document.querySelectorAll("#qFrame [data-in]").forEach(el=>{
      const f=s.fill[el.getAttribute("data-in")]; if(f&&f.en) el.value=f.en; });
    document.getElementById("qCheck").click();
    await new Promise(r=>setTimeout(r,600));
  }
  return {done:!document.getElementById("doneCard").classList.contains("hide"),
          score:document.getElementById("doneScore").textContent};
});
ok(res.done, "5文終えると結果画面へ");
ok(res.score==="5 / 5", "全問正解で 5 / 5（"+res.score+"）");
ok(/CPM/.test(await p.textContent("#doneSub")), "CPMが出る（"+(await p.textContent("#doneSub")).slice(0,50)+"）");

// 記録がシートに入る
await p.waitForTimeout(700);
const rows=G.dump("到達度テスト")||[];
ok(rows.length===2, "シートに1行入る（"+(rows.length-1)+"行）");
ok(rows[1] && rows[1][2]==="mgram" && Number(rows[1][8])===5, "mgram・正解5（"+JSON.stringify((rows[1]||[]).slice(2,9))+"）");
const prog=G.call({action:"progress", exam:"mgram", cls:"3", num:"7"});
ok(prog.done===1, "続きの位置が取れる");
ok(/項目2 へ/.test(await p.textContent("#nextSet")), "次のおすすめは項目2（"+(await p.textContent("#nextSet"))+"）");

// 2000語の記録とまざっていない
const wordProg=G.call({action:"progress", exam:"m2000", cls:"3", num:"7"});
ok(wordProg.done===0, "★2000語のほうには入っていない（done="+wordProg.done+"）");

await p.close(); await b.close();
console.log(errs.length? "\nJSエラー:\n"+errs.slice(0,5).join("\n") : "\nJSエラーなし");
console.log(`\n${pass} pass / ${fail} fail`);
