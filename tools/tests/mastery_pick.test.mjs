/* tools/tests/mastery_pick.test.mjs ─ セットを自分でえらべること／
   同じセットの2回目が dup で消えずに記録されること。
   「もういちど1をやりたい」という声から入れた機能の通し試験。
   使い方: CHROME_PATH=/path/to/chrome node tools/tests/mastery_pick.test.mjs   */
/* セットを自分でえらべること／同じセットの2回目がちゃんと記録されること */
import { chromium } from "playwright-core";
import { loadGas } from "./gasmock.mjs";
const G=loadGas();
let pass=0,fail=0; const ok=(c,m)=>{ c?pass++:(fail++,console.log("  ✗ "+m)); };
const b=await chromium.launch({executablePath:process.env.CHROME_PATH||"/opt/pw-browsers/chromium-1194/chrome-linux/chrome",args:["--no-sandbox"]});
const p=await b.newPage();
p.on("pageerror",e=>console.log("PAGEERROR",String(e).split("\n")[0]));
await p.exposeFunction("__gas",(body)=>{ try{ return JSON.stringify(G.call(JSON.parse(body))); }
  catch(e){ return JSON.stringify({result:"error",message:String(e)}); } });
await p.addInitScript(()=>{ window.fetch=(u,o)=>window.__gas(o.body)
  .then(t=>({status:200,ok:true,text:()=>Promise.resolve(t),json:()=>Promise.resolve(JSON.parse(t))})); });
G.call({action:"gate", pin:"PIN", exam:"m2000", open:true});
await p.goto(new URL("../../mastery/index.html", import.meta.url).href); await p.waitForTimeout(600);
await p.selectOption("#f_cls","3"); await p.fill("#f_num","7"); await p.dispatchEvent("#f_num","change");
await p.waitForTimeout(700);

const title=()=>p.textContent("#listTitle");
ok(/セット1（1〜100語目）/.test(await title()), "はじめはセット1（"+(await title())+"）");
ok((await p.$$("#setBar button")).length===20, "帯が20個のボタンになっている");

// ① セット20を押す
await p.click('#setBar button[data-set="20"]'); await p.waitForTimeout(400);
ok(/セット20（1901〜2000語目）/.test(await title()), "★セット20を選べる（"+(await title())+"）");
// ② セット1へ戻す
await p.click('#setBar button[data-set="1"]'); await p.waitForTimeout(400);
ok(/セット1（1〜100語目）/.test(await title()), "★セット1に戻せる");
ok(/はじめて/.test(await title()), "まだやっていないと出る");

async function runSet(){
  await p.click("#startSet"); await p.waitForTimeout(250);
  await p.evaluate(()=>{ const inp=document.getElementById("ansIn");
    const ja=()=>document.getElementById("qJa").textContent;
    for(let i=0;i<400;i++){
      if(!document.getElementById("doneCard").classList.contains("hide")) break;
      const cur=window.WORDS.find(w=>w.j===ja());
      inp.value=(cur && i%3===0)? cur.w : "";
      inp.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",bubbles:true}));
    }});
  await p.waitForTimeout(700);
}
// ③ セット1を1回やる
await runSet();
ok(/セット1　1回目 おわり/.test(await p.textContent("#doneTitle")), "1回目と出る（"+(await p.textContent("#doneTitle"))+"）");
ok(/セット2 へ/.test(await p.textContent("#nextSet")), "★次のおすすめはセット2（"+(await p.textContent("#nextSet"))+"）");
ok(/セット1 をもう一度/.test(await p.textContent("#againSet")), "「もう一度」ボタンが出る");
let rows=G.dump("到達度テスト")||[];
ok(rows.length===2, "シートに1行入る（"+(rows.length-1)+"行）");

// ④ セット1をもう一度 → 2回目として記録される（dupで消えない）
await p.click("#againSet"); await p.waitForTimeout(400);
ok(/セット1（1〜100語目）　2回目/.test(await title()), "★2回目と出る（"+(await title())+"）");
await runSet();
ok(/セット1　2回目 おわり/.test(await p.textContent("#doneTitle")), "2回目として終わる");
ok(/前回は/.test(await p.textContent("#doneSub")), "★前回とくらべて出る（"+(await p.textContent("#doneSub")).slice(0,70)+"）");
rows=G.dump("到達度テスト")||[];
ok(rows.length===3, "★シートに2行目が入る＝dupで消えていない（"+(rows.length-1)+"行）");
const r2=rows[2];
ok(Number(r2[6])===2 && Number(r2[7])===1, "2行目は 周回2・セット1（"+r2[6]+"-"+r2[7]+"）");

// ⑤ 帯にそのセットの最高点が出る
const t1=await p.$eval('#setBar button[data-set="1"]', n=>n.textContent.trim());
ok(/^1\d+$/.test(t1)||/^1/.test(t1), "帯のセット1に最高点が出る（"+t1+"）");
const tip=await p.$eval('#setBar button[data-set="1"]', n=>n.getAttribute("title"));
ok(/2回・最高/.test(tip), "★ホバーで回数と最高点（"+tip+"）");

// ⑥ セット中は帯を押しても動かない
await p.click("#nextSet"); await p.waitForTimeout(300);
await p.click("#startSet"); await p.waitForTimeout(250);
await p.click('#setBar button[data-set="5"]'); await p.waitForTimeout(300);
const vis=await p.evaluate(()=>["listCard","testCard","doneCard"]
  .filter(id=>!document.getElementById(id).classList.contains("hide")).join(","));
ok(vis==="testCard", "★答えている途中は帯を押しても動かない（"+vis+"）");

await p.close(); await b.close();
console.log(`\n${pass} pass / ${fail} fail`);
