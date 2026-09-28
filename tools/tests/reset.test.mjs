/* tools/tests/reset.test.mjs ─ 先生の指示による「やり直し」（リセット）
   ・マイページの「設定」→ 前半リセット／全データリセット が、サーバーにリセット行を足し、
     端末の控え（セット1〜10）と送り待ちの記録も消す
   ・到達度テストの画面は、progress の返事の resets を一度だけ当てて、控えを同じところまで消す
   ・その画面が覚えていた古いセットを、次の記録のときに書き戻さない
   使い方: CHROME_PATH=/path/to/chrome node tools/tests/reset.test.mjs */
import { chromium } from "playwright-core";
import { loadGas } from "./gasmock.mjs";
const G = loadGas();
let pass=0, fail=0; const ok=(c,m)=>{ c?pass++:(fail++,console.log("  ✗ "+m)); };
const b = await chromium.launch({executablePath:process.env.CHROME_PATH||"/opt/pw-browsers/chromium-1194/chrome-linux/chrome",args:["--no-sandbox"]});
const ctx = await b.newContext();
const p = await ctx.newPage(); const errs=[];
p.on("pageerror", e=>errs.push(String(e).split("\n")[0]));
await p.exposeFunction("__gas", (x)=>{ try{ return JSON.stringify(G.call(JSON.parse(x))); }
  catch(e){ return JSON.stringify({result:"error", message:String(e)}); } });
await p.addInitScript(()=>{ window.fetch=(u,o)=>window.__gas(o.body)
  .then(t=>({status:200,ok:true,text:()=>Promise.resolve(t),json:()=>Promise.resolve(JSON.parse(t))})); });
const spin=(ms)=>{ const t=Date.now(); while(Date.now()-t<ms){} };

G.call({action:"gate", pin:"PIN", exam:"m2000", open:true});
G.call({action:"gate", pin:"PIN", exam:"mgram", open:true});
const put=(set,correct,round=1)=>G.call({kind:"mastery",exam:"m2000",cls:"1",num:"8",name:"テスト",round,set,correct,asked:100,sec:60,ver:"t"});
[1,2,3,4,5,6,7,8,9,10,11,12].forEach(s=>put(s,90));
G.call({kind:"mastery",exam:"mgram",cls:"1",num:"8",name:"テスト",round:1,set:2,correct:5,asked:5,sec:30,ver:"t"});

/* ---------- 1) マイページの設定からリセット ---------- */
console.log("— マイページ：設定 → 前半リセット —");
const ME = new URL("../../me/index.html", import.meta.url).href;
await p.goto(ME); await p.waitForTimeout(300);
// 端末の控え：セット1〜12 と、まだ送っていないセット3の記録を仕込む
await p.evaluate(()=>{
  const sets={}; for(let s=1;s<=12;s++) sets["1-"+s]={correct:90,sec:60,cpm:90};
  localStorage.setItem("mastery_v1", JSON.stringify({m2000:{by:{"1-8":{sets}}},
    __pending:[{kind:"mastery",exam:"m2000",cls:"1",num:"8",set:3,round:2,correct:88},
               {kind:"mastery",exam:"m2000",cls:"1",num:"8",set:11,round:2,correct:70}]}));
  localStorage.setItem("mado_year","1"); localStorage.setItem("mado_num","8"); localStorage.setItem("mado_name","テスト");
});
await p.reload(); await p.waitForTimeout(500);
ok(await p.isHidden("#settingsBody"), "設定の中身はたたんである");
await p.click("#settingsBtn"); await p.waitForTimeout(150);
ok(await p.isVisible("#resetHalf") && await p.isVisible("#resetAll"), "⚙ 設定 を押すと2つのリセットボタンが出る");
// 確認ダイアログ：まず「やめる」
p.once("dialog", d=>d.dismiss());
await p.click("#resetHalf"); await p.waitForTimeout(300);
ok(/やめました/.test(await p.textContent("#resetMsg")), "確認で「キャンセル」ならリセットしない");
ok(G.call({action:"progress", exam:"m2000", cls:"1", num:"8"}).done===12, "サーバーの記録もそのまま（12回）");
spin(3);
p.once("dialog", d=>d.accept());
await p.click("#resetHalf"); await p.waitForTimeout(600);
const m1=await p.textContent("#resetMsg");
ok(/リセットしました/.test(m1) && /開きなおして/.test(m1), "★前半リセットできた（"+m1.slice(0,40)+"）");
{
  const pr=G.call({action:"progress", exam:"m2000", cls:"1", num:"8"});
  ok(pr.done===2 && pr.sets["1-11"] && pr.sets["1-12"] && !pr.sets["1-1"], "★サーバー：1〜10 は無かったことに、11・12 は残る");
  const ls=await p.evaluate(()=>JSON.parse(localStorage.getItem("mastery_v1")));
  const mine=ls.m2000.by["1-8"];
  ok(Object.keys(mine.sets).sort().join(",")==="1-11,1-12", "★端末の控えも 11・12 だけ（"+Object.keys(mine.sets).join(",")+"）");
  ok(Number(mine.resetKey)===pr.resets[0].key, "当てたリセットの key を控えている");
  ok(ls.__pending.length===1 && ls.__pending[0].set===11, "★送り待ちのセット3は捨て、セット11は残す");
  const gram=G.call({action:"progress", exam:"mgram", cls:"1", num:"8"});
  ok(gram.done===1, "全文法は触っていない");
}

/* ---------- 2) 到達度テストの画面が resets を一度だけ当てる ---------- */
console.log("— 到達度テストの画面：progress の resets を当てる —");
// 別の端末のつもり：控えにはまだ 1〜12 が残っている（リセットを知らない）
await p.evaluate(()=>{
  const sets={}; for(let s=1;s<=12;s++) sets["1-"+s]={correct:90,sec:60,cpm:90};
  localStorage.setItem("mastery_v1", JSON.stringify({m2000:{by:{"1-8":{sets}}}}));
});
// 画面の core をつかまえる（finish を直接呼んで、控えの書きかたを見るため）
await p.addInitScript(()=>{
  let mc=null;
  Object.defineProperty(window, "MasteryCore", { configurable:true,
    get(){ return mc; },
    set(v){ mc=v; const orig=v.create; v.create=function(cfg){ const core=orig(cfg); window.__core=core; return core; }; } });
});
await p.goto(new URL("../../mastery/index.html", import.meta.url).href); await p.waitForTimeout(1200);
{
  const txt=(await p.textContent("#learned")).replace(/\s+/g," ");
  ok(/^\s*180 \/ 2000語/.test(txt), "★画面の覚えた単語は 11・12 の 180（端末に残っていた 1〜10 を拾わない）："+txt);
  const ls=await p.evaluate(()=>JSON.parse(localStorage.getItem("mastery_v1")));
  ok(Object.keys(ls.m2000.by["1-8"].sets).length===2, "端末の控えからも 1〜10 が消えた");
  ok(Number(ls.m2000.by["1-8"].resetKey)>0, "key を控えた");
}
// 同じリセットを二度当てない：リセット後にこの端末でやり直したセット2（送れずに控えだけ）と、
// ほかの端末でやり直したセット1（サーバーだけ）は、開きなおしても残る
await p.evaluate(()=>{
  const ls=JSON.parse(localStorage.getItem("mastery_v1"));
  ls.m2000.by["1-8"].sets["1-2"]={correct:33,sec:60,cpm:33};
  localStorage.setItem("mastery_v1", JSON.stringify(ls));
});
spin(3);
put(1,40);
await p.reload(); await p.waitForTimeout(1200);
{
  const txt=(await p.textContent("#learned")).replace(/\s+/g," ");
  ok(/^\s*253 \/ 2000語/.test(txt), "★やり直しは数える：40（サーバー）+33（端末）+90+90=253："+txt);
  const ls=await p.evaluate(()=>JSON.parse(localStorage.getItem("mastery_v1")));
  ok(ls.m2000.by["1-8"].sets["1-2"] && ls.m2000.by["1-8"].sets["1-2"].correct===33, "★控えのやり直し（セット2）は消えない＝同じリセットを二度当てない");
}

/* ---------- 3) 画面が覚えていた古い控えを書き戻さない ---------- */
console.log("— 古い控えの書き戻し —");
// このタブが開いているあいだに、マイページでリセットされた想定：控えから 11・12 が消えている
await p.evaluate(()=>{
  const ls=JSON.parse(localStorage.getItem("mastery_v1"));
  delete ls.m2000.by["1-8"].sets["1-11"]; delete ls.m2000.by["1-8"].sets["1-12"];
  localStorage.setItem("mastery_v1", JSON.stringify(ls));
});
// そのままこのタブで1セット終える（画面の中の doneSets には 11・12 がまだある）
await p.evaluate(()=>{ document.getElementById("testCard").classList.remove("hide");
  window.__core.finish(13, 1, {correct:50, asked:100, sec:60, max:100}); });
await p.waitForTimeout(400);
{
  const ls=await p.evaluate(()=>JSON.parse(localStorage.getItem("mastery_v1")));
  const keys=Object.keys(ls.m2000.by["1-8"].sets).sort().join(",");
  ok(ls.m2000.by["1-8"].sets["1-13"] && ls.m2000.by["1-8"].sets["1-13"].correct===50, "終えたセット13は控えに入る");
  ok(!ls.m2000.by["1-8"].sets["1-11"] && !ls.m2000.by["1-8"].sets["1-12"], "★消されていた 11・12 を書き戻さない（"+keys+"）");
  ok(Number(ls.m2000.by["1-8"].resetKey)>0, "resetKey も残る");
  ok(/50 \/ 100/.test(await p.textContent("#doneScore")), "結果画面は出る");
}
/* ---------- 4) 別の端末に残っていた「リセット前の送り待ち」を、開いたときに送ってしまわない ---------- *
   記録の日時は届いた時刻なので、先に送るとリセット行より新しくなり、消したはずの点が復活する。
   送るのは progress（リセット）を当てたあと。範囲外（セット11）の送り待ちはちゃんと届く。 */
console.log("— 送り待ちは、リセットを当ててから送る —");
{
  const before=G.call({action:"progress", exam:"m2000", cls:"1", num:"8"});
  await p.evaluate(()=>{
    localStorage.setItem("mastery_v1", JSON.stringify({m2000:{by:{"1-8":{sets:{}}}},
      __pending:[{kind:"mastery",exam:"m2000",cls:"1",num:"8",name:"テスト",round:5,set:3,correct:99,asked:100,sec:60,ver:"t"},
                 {kind:"mastery",exam:"m2000",cls:"1",num:"8",name:"テスト",round:5,set:11,correct:88,asked:100,sec:60,ver:"t"}]}));
  });
  await p.reload(); await p.waitForTimeout(1500);
  const after=G.call({action:"progress", exam:"m2000", cls:"1", num:"8"});
  ok(!after.sets["5-3"], "★リセット前にためていたセット3は送られない（復活しない）");
  ok(after.sets["5-11"] && after.sets["5-11"].correct===88, "★範囲外のセット11の送り待ちは届く");
  ok(after.done===before.done+1, "届いたのは1件だけ（"+before.done+"→"+after.done+"）");
  const ls=await p.evaluate(()=>JSON.parse(localStorage.getItem("mastery_v1")));
  ok((ls.__pending||[]).length===0, "送り待ちは空になる（セット3は捨てた）");
}
await p.close(); await ctx.close(); await b.close();
console.log(errs.length? "\nJSエラー:\n"+errs.slice(0,4).join("\n") : "\nJSエラーなし");
console.log(`\n${pass} pass / ${fail} fail`);
