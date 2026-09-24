/* tools/tests/admin.test.mjs ─ 先生用コンソールに試験のカードが出て、受付を開けられるか。
   GAS に足しても /admin の一覧に足し忘れると「開けるボタンが出てこない」ので、ここで見る。
   使い方: CHROME_PATH=/path/to/chrome node tools/tests/admin.test.mjs */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
/* 版は直書きしない。/admin が要求する版（ADMIN_NEED）を読んで、それを返す模型サーバーにする。
   直書きすると GAS を上げるたびに、このテストだけが落ちる。 */
const VER = "jigaku-" + (readFileSync(new URL("../../admin/index.html", import.meta.url), "utf8")
  .match(/ADMIN_NEED\s*=\s*(\d+)/) || [, "0"])[1];
let pass=0,fail=0; const ok=(c,m)=>{ c?pass++:(fail++,console.log("  ✗ "+m)); };
const b=await chromium.launch({executablePath:process.env.CHROME_PATH||"/opt/pw-browsers/chromium-1194/chrome-linux/chrome",args:["--no-sandbox"]});
const p=await b.newPage(); const errs=[];
p.on("pageerror",e=>errs.push(String(e)));
await p.addInitScript((VER)=>{
  window.__sent=[];
  window.fetch=function(url,opt){
    const d=JSON.parse(opt.body); window.__sent.push(d);
    let r={result:"ok", ver:VER};
    if(d.action==="status") r={result:"ok", ver:VER, open:false, exam:d.exam, session:"", submissions:0};
    if(d.action==="gate")   r={result:"ok", ver:VER, open:!!d.open, exam:d.exam, session:"S1", submissions:0};
    return Promise.resolve({status:200, text:()=>Promise.resolve(JSON.stringify(r)), json:()=>Promise.resolve(r)});
  };
}, VER);
await p.goto(new URL("../../admin/index.html", import.meta.url).href); await p.waitForTimeout(800);

/* 枚数も本数も直書きしない。/admin の EXAMS を数えて、それと画面が合うかを見る
   （試験を足すたびにこのテストだけが落ちるのを避ける）。 */
const ADM = readFileSync(new URL("../../admin/index.html", import.meta.url), "utf8");
const ADM_IDS = [...((ADM.match(/var EXAMS=\[([\s\S]*?)\n  \];/)||[,""])[1]
  .matchAll(/id:"([a-z0-9_]+)"/g))].map(m=>m[1]);
const UNIT_N = ADM_IDS.filter(id=>/^c[23]u\d$/.test(id)).length;
const titles=await p.$$eval("#exams .exam-title", ns=>ns.map(n=>n.textContent.trim()));
ok(titles.length===ADM_IDS.length, `カードが${ADM_IDS.length}枚（${titles.length}）`);
ok(titles.some(t=>/2000語 到達度テスト/.test(t)), "2000語 到達度テストのカードがある");
const links=await p.$$eval("#exams .link a", ns=>ns.map(n=>n.getAttribute("href")));
ok(links.includes("../mastery/index.html"), "2000語のリンクが mastery/index.html を指す");
ok(links.includes("../mastery/gram.html"), "全文法のリンクが mastery/gram.html を指す");
ok(titles.some(t=>/全文法 到達度テスト/.test(t)), "全文法 到達度テストのカードがある");
ok(links.filter(h=>/mogi\/exam\.html\?id=c/.test(h)).length===UNIT_N, `単元テスト${UNIT_N}本は従来どおり mogi/exam.html`);
ok(/100語×20セット/.test(await p.textContent("#exams")), "使いかたの注記が出る");
// スタートが押せる（PINを入れて）
await p.fill("#pin","TESTPIN");
// m2000 のカードの位置は増減するので、並び順ではなく EXAMS の中の位置で探す
const btns=await p.$$("#exams .start");
await btns[ADM_IDS.indexOf("m2000")].click(); await p.waitForTimeout(400);
const sent=await p.evaluate(()=>window.__sent.filter(x=>x.action==="gate"));
ok(sent.length===1 && sent[0].exam==="m2000" && sent[0].open===true,
   "スタートで m2000 のゲートを開ける（"+JSON.stringify(sent[0]||{})+"）");
// 版チェック
const note=await p.evaluate(()=>{const e=document.getElementById("serverNote");
  return {shown:e.style.display!=="none", txt:(e.textContent||"").slice(0,40), cls:e.className};});
ok(!/版が古い/.test(note.txt), VER+" なら版の警告が出ない（"+note.txt+"）");
ok(/okline/.test(note.cls), "サーバー版が緑で出る（"+note.cls+"）");
await p.close(); await b.close();
console.log(errs.length? "\nJSエラー:\n"+errs.slice(0,4).join("\n") : "\nJSエラーなし");
console.log(`\n${pass} pass / ${fail} fail`);
