/* tools/tests/gojun.test.mjs ─ 語順文法テストが動くか（共通化しても壊れていないか）
   使い方: CHROME_PATH=/path/to/chrome node tools/tests/gojun.test.mjs */
import { chromium } from "playwright-core";
let pass=0,fail=0; const ok=(c,m)=>{ c?pass++:(fail++,console.log("  ✗ "+m)); };
const b=await chromium.launch({executablePath:process.env.CHROME_PATH||"/opt/pw-browsers/chromium-1194/chrome-linux/chrome",args:["--no-sandbox"]});
const p=await b.newPage(); const errs=[];
p.on("pageerror",e=>errs.push(String(e)));
p.on("console",m=>{ if(m.type()==="error") errs.push("console: "+m.text().slice(0,120)); });
await p.goto(new URL("../../gojun/index.html", import.meta.url).href); await p.waitForTimeout(600);

ok(await p.evaluate(()=>!!window.GojunCore), "共通ファイル（GojunCore）が読めている");
const n=await p.evaluate(()=>window.GOJUN.items.length);
ok(n===31, "31項目ある（"+n+"）");
const sent=await p.evaluate(()=>window.GOJUN.items.reduce((a,i)=>a+i.sents.length,0));
ok(sent===155, "155文ある（"+sent+"）");

// 判定のものさしが共通ファイル経由で効く
const j=await p.evaluate(()=>({
  same1: window.GojunCore.same("Don't", "dont"),
  same2: window.GojunCore.same("Ｉ", "I"),
  same3: window.GojunCore.same("play", "plays"),
}));
ok(j.same1, "don't と dont は同じ");
ok(j.same2, "全角Ｉと半角Iは同じ");
ok(!j.same3, "play と plays はちがう");

// 選択肢が5つ作れる（並びは固定）
const ch=await p.evaluate(()=>{
  const it=window.GOJUN.items[0], s=it.sents[0];
  const k=Object.keys(s.fill).find(k=>s.fill[k].en);
  const a=window.GojunCore.choicesFor(it,0,k,s.fill[k].en);
  const b=window.GojunCore.choicesFor(it,0,k,s.fill[k].en);
  return {n:a.length, hasAns:a.indexOf(s.fill[k].en)>=0, stable:a.join("|")===b.join("|")};
});
ok(ch.n>=2, "選択肢が作れる（"+ch.n+"個）");
ok(ch.hasAns, "正解が選択肢に入っている");
ok(ch.stable, "同じ問題なら並びが変わらない");

// 実際に1項目を解いてみる（枠と選択肢の作りは、共通化でいちばん壊れやすいところ）
await p.click('.item[data-i="0"]'); await p.waitForTimeout(400);
ok(await p.isVisible("#quiz"), "項目をえらぶと出題画面に入る");
const boxes=await p.$$eval("#q_frame .box", ns=>ns.length);
ok(boxes>=5, "箱が並ぶ（"+boxes+"）");
const sels=await p.$$eval("#q_frame select[data-in]", ns=>ns.length);
ok(sels>0, "えらぶモードのドロップダウンが出る（"+sels+"）");
const opts=await p.$$eval("#q_frame select[data-in]", ns=>ns.map(n=>n.options.length));
ok(opts.every(n=>n>=3), "どの箱にも選択肢がある（"+opts.join(",")+"）");

// 正解を選んで○になるか
const res=await p.evaluate(()=>{
  const it=window.GOJUN.items[0], s=it.sents[0];
  document.querySelectorAll("#q_frame [data-in]").forEach(el=>{
    const k=el.getAttribute("data-in"); const f=s.fill[k];
    if(f && f.en) el.value=f.en;
  });
  document.getElementById("q_check").click();
  return document.getElementById("q_verdict").textContent;
});
ok(/○|正解/.test(res), "正解を入れると○になる（"+res.replace(/\s+/g," ").slice(0,40)+"）");

await p.close(); await b.close();
console.log(errs.length? "\nJSエラー:\n"+errs.slice(0,4).join("\n") : "\nJSエラーなし");
console.log(`\n${pass} pass / ${fail} fail`);
