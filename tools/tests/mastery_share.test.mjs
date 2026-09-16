/* tools/tests/mastery_share.test.mjs ─ 1台を何人かで使う教室の通し試験
   （先生が「ためしに生徒で入る」のもこの形）。
   端末の控えに「どの子のぶんか」が無いと、前の子の記録が次の子に混ざって、
   すんだ印・おすすめのセット・「何回目」がまるごとずれる。実際に起きた。
   使い方: CHROME_PATH=/path/to/chrome node tools/tests/mastery_share.test.mjs */
import { chromium } from "playwright-core";
import { loadGas } from "./gasmock.mjs";
const G=loadGas();
let pass=0,fail=0; const ok=(c,m)=>{ c?pass++:(fail++,console.log("  ✗ "+m)); };
const b=await chromium.launch({executablePath:process.env.CHROME_PATH||"/opt/pw-browsers/chromium-1194/chrome-linux/chrome",args:["--no-sandbox"]});
const p=await b.newPage(); const errs=[];
p.on("pageerror",e=>errs.push(String(e)));
let dead=false;                                   // サーバーを落とすスイッチ
await p.exposeFunction("__gas",(body)=>{ if(dead) throw new Error("offline");
  try{ return JSON.stringify(G.call(JSON.parse(body))); }
  catch(e){ return JSON.stringify({result:"error",message:String(e)}); } });
await p.addInitScript(()=>{ window.fetch=(u,o)=>window.__gas(o.body)
  .then(t=>({status:200,ok:true,text:()=>Promise.resolve(t),json:()=>Promise.resolve(JSON.parse(t))})); });
G.call({action:"gate", pin:"PIN", exam:"m2000", open:true});
await p.goto(new URL("../../mastery/index.html", import.meta.url).href); await p.waitForTimeout(600);

/* 1セット通す（はじめの n 語だけ正解、あとはパス） */
async function runSet(n){
  await p.click("#startSet"); await p.waitForTimeout(200);
  for(let i=0;i<100;i++){
    if(i<n){ const w=await p.evaluate(()=>{ const q=document.getElementById("qJa").textContent;
      return (window.WORDS.find(x=>x.j===q)||{}).w||""; }); await p.fill("#ansIn",w); }
    await p.press("#ansIn","Enter");
  }
  await p.waitForTimeout(400);
}
async function login(num){
  await p.fill("#f_num",num); await p.dispatchEvent("#f_num","change"); await p.waitForTimeout(600);
}
const view = () => p.evaluate(()=>({
  done:[...document.querySelectorAll("#setBar button.done")].map(x=>x.getAttribute("data-set")),
  prog:document.getElementById("progMsg").textContent.replace(/\s+/g," ").trim(),
  title:(document.getElementById("listTitle").textContent||"").replace(/\s+/g," ").trim() }));

// ── Aさん（3年7番）がセット1を10語で終える ──
await p.selectOption("#f_cls","3"); await login("7");
await runSet(10);
ok((await p.textContent("#doneScore"))==="10 / 100", "Aさんは 10 / 100");
await p.click("#toHome");

// ── Bさん（3年8番）が同じ端末で入る ──
await login("8");
const vb=await view();
ok(vb.done.length===0, "★Bさんの帯にすんだ印が無い（"+(vb.done.join(",")||"なし")+"）");
ok(/さわったセット 0 \/ 20/.test(vb.prog), "★Bさんの進捗は0から（"+vb.prog+"）");
ok(/セット1（1〜100語目）/.test(vb.title) && /はじめて/.test(vb.title),
   "★Bさんのおすすめはセット1・はじめて（"+vb.title+"）");

// Bさんがセット1をやる → 「何回目」は1でなければならない
await runSet(3);
const rows=G.dump("到達度テスト")||[];
const mine=rows.filter(r=>String(r[3])==="3"&&String(r[4])==="8");
ok(mine.length===1, "Bさんの行が1行入る（"+mine.length+"）");
ok(mine[0] && Number(mine[0][7])===1,
   "★Bさんがやったのはセット1（"+((mine[0]||[])[7])+"）");
ok(mine[0] && Number(mine[0][6])===1,
   "★Bさんのセット1は「1回目」として記録される（"+((mine[0]||[])[6])+"回目）");
ok(mine[0] && Number(mine[0][8])===3, "Bさんの正解は3（"+((mine[0]||[])[8])+"）");

// ── Aさんに戻ると、Aさんの記録は残っている ──
await p.click("#toHome"); await login("7");
const va=await view();
ok(va.done.join(",")==="1", "★Aさんに戻るとAさんの記録が出る（"+(va.done.join(",")||"なし")+"）");
ok(/最高点の合計 10語/.test(va.prog), "Aさんの最高点はAさんのまま（"+va.prog+"）");

// ── サーバーが落ちていても、自分の控えで続きが出る ──
dead=true;
await p.reload(); await p.waitForTimeout(1200);
const off=await view();
ok(off.done.join(",")==="1", "★通信できなくても自分の控えから戻せる（"+(off.done.join(",")||"なし")+"）");
dead=false;

console.log(errs.length? "\nJSエラー:\n"+errs.slice(0,5).join("\n") : "\nJSエラーなし");
await p.close(); await b.close();
console.log(`\n${pass} pass / ${fail} fail`);
process.exit(fail?1:0);
