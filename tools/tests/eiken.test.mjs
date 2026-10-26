/* tools/tests/eiken.test.mjs ─ 英検アプリの判定テスト：フル1回分をランダムに引く・読解は本文ごと・毎回ちがう */
import { chromium } from "playwright-core";
import { loadEikenBank } from "../lib/eiken_bank.mjs";
let pass=0,fail=0; const ok=(c,m)=>{ c?pass++:(fail++,console.log("  ✗ "+m)); };
const { FULL_PLAN } = loadEikenBank();
const b=await chromium.launch({executablePath:process.env.CHROME_PATH||"/opt/pw-browsers/chromium-1194/chrome-linux/chrome",args:["--no-sandbox"]});
const p=await b.newPage(); const errs=[]; p.on("pageerror",e=>errs.push(String(e)));
await p.goto(new URL("../../eiken/index.html", import.meta.url).href); await p.waitForTimeout(500);
const sum=(o)=>Object.values(o).reduce((a,b)=>a+b,0);
for (const grade of ["3","5","prep"]) {
  const r=await p.evaluate((grade)=>{
    const {gradePool,drawFull,BANK,GENRES}=window.__eiken; const pool=gradePool(grade); const a=drawFull(grade), b2=drawFull(grade);
    const genreOf=(q)=>{ for(const ge of GENRES){ if((BANK[grade][ge.id]||[]).includes(q)) return ge.id; } return "?"; };
    const by={}; a.forEach(q=>{ const g=genreOf(q); by[g]=(by[g]||0)+1; });
    // 読解は後半にまとまり、同じ本文の問題は隣り合う
    const ps=a.map(q=>q.p||null); const firstP=ps.findIndex(x=>x); const tailAllReading=firstP<0||ps.slice(firstP).every(x=>x);
    let grouped=true; for(let i=firstP+1;i>0&&i<ps.length;i++){ if(ps[i]!==ps[i-1] && ps.slice(0,i).includes(ps[i])) grouped=false; }
    const same=a.length===b2.length && a.every((q,i)=>q===b2[i]);
    const dup=new Set(a).size!==a.length;
    return {pool:pool.length, n:a.length, by, tailAllReading, grouped, same, dup};
  }, grade);
  const plan=FULL_PLAN[grade]||{};
  ok(r.n>=sum(plan) && r.n<=sum(plan)+6, `${grade}: 1回分は ${sum(plan)}問前後（${r.n}問・プール${r.pool}）`);
  for (const ge of Object.keys(plan)) if (ge!=="reading") ok(r.by[ge]===Math.min(plan[ge], 10**9), `${grade}/${ge}: ${plan[ge]}問（${r.by[ge]}）`);
  if (plan.reading) ok(r.by.reading>=plan.reading && r.tailAllReading && r.grouped, `${grade}: 読解は本文ごとに後半へ（${r.by.reading}問・grouped=${r.grouped}）`);
  ok(!r.dup, `${grade}: 同じ問題が2回出ない`);
  ok(!r.same || r.pool<=r.n, `${grade}: 2回引くと並びがちがう`);
}
// 画面：フルの問題数の表示と、スタート後の問題数が一致する
await p.evaluate(()=>{ window.__eiken.S.grade="4"; window.__eiken.go("testsetup"); }); await p.waitForTimeout(300);
const label=await p.textContent("#mFull"); const n=Number((label.match(/(\d+)問/)||[])[1]);
await p.click("#mFull"); await p.waitForTimeout(300);
const shown=await p.evaluate(()=>window.__eiken.S.test.queue.length);
ok(n===shown && n>0, `フルの表示 ${n}問 とスタート後 ${shown}問 が同じ`);
ok(/回分/.test(await p.evaluate(()=>{ window.__eiken.go("testsetup"); return document.body.innerText; })), "「約N回分から毎回ちがう組み合わせ」の説明が出る");
// フルモードの受験回数：結果画面で数え、学年・番号が端末にあれば自動で先生に送る
const posts=[];
await p.exposeFunction("__post",(body)=>{ posts.push(JSON.parse(body)); return JSON.stringify({result:"ok"}); });
await p.addInitScript(()=>{ window.fetch=(u,o)=>window.__post(o.body).then(t=>({ok:true,status:200,json:()=>Promise.resolve(JSON.parse(t)),text:()=>Promise.resolve(t)})); });
await p.goto(new URL("../../eiken/index.html", import.meta.url).href); await p.waitForTimeout(400);
await p.evaluate(()=>{ localStorage.setItem("mado_year","3"); localStorage.setItem("mado_num","7"); localStorage.removeItem("mado_fullruns_v1"); });
const fin=async(mode,ok)=>p.evaluate(({mode,ok})=>{ const E=window.__eiken; E.S.grade="4"; const q=E.BANK["4"].vocab.slice(0,4);
  E.S.test={mode, queue:q, idx:q.length, ok, byGenre:{}}; E.go("testresult"); return document.getElementById("sendmsg").textContent; },{mode,ok});
let m=await fin("full",4); await p.waitForTimeout(300);
let runs=await p.evaluate(()=>JSON.parse(localStorage.getItem("mado_fullruns_v1")||"{}"));
ok(runs["4"] && runs["4"].n===1 && runs["4"].pass===1, "フル1回目（合格）が端末に残る "+JSON.stringify(runs));
ok(/1回目（合格 1回）/.test(m), "結果画面に回数が出る（"+m+"）");
ok(posts.length===1 && posts[0].mode==="フル" && posts[0].cls==="3" && posts[0].num==="7", "★フルは自動で先生に送られる "+JSON.stringify(posts[0]||{}));
await fin("full",1); await p.waitForTimeout(300);
runs=await p.evaluate(()=>JSON.parse(localStorage.getItem("mado_fullruns_v1")||"{}"));
ok(runs["4"].n===2 && runs["4"].pass===1, "フル2回目（不合格）→ 2回・合格1 "+JSON.stringify(runs["4"]));
await fin("quick",4); await p.waitForTimeout(300);
runs=await p.evaluate(()=>JSON.parse(localStorage.getItem("mado_fullruns_v1")||"{}"));
ok(runs["4"].n===2 && posts.length===2, "クイックは数えないし自動送信もしない（n="+runs["4"].n+" posts="+posts.length+"）");
// マイページ：回数が出て、送信キーに入る
await p.goto(new URL("../../me/index.html", import.meta.url).href); await p.waitForTimeout(600);
ok(/2回（合格 1回）/.test(await p.textContent("#e_runs")), "マイページに「フルモードの受験 2回（合格 1回）」（"+(await p.textContent("#e_runs"))+"）");
await b.close();
console.log(errs.length?"\nJSエラー: "+errs.join(" | "):"\nJSエラーなし");
console.log(`\n${pass} pass / ${fail} fail`);
