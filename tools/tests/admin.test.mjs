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
/* 模型サーバー：新版（status_all を知っている）。gate は最初の1回だけ busy を返し、
   管理画面が自分で押しなおすかを見る（ロック待ちで「Exception」が末尾に出るだけ、をなくした） */
await p.addInitScript((VER)=>{
  window.__sent=[]; window.__open={}; let busyOnce=true;
  window.fetch=function(url,opt){
    const d=JSON.parse(opt.body); window.__sent.push(d);
    let r={result:"ok", ver:VER};
    const st=(ex)=>({result:"ok", open:!!window.__open[ex], exam:ex, session:window.__open[ex]?"S1":"", submissions:0});
    if(d.action==="status") r={...st(d.exam), ver:VER};
    if(d.action==="status_all"){ r={result:"ok", ver:VER, exams:{}};
      ["c2u1","c2u2","c2u3","c3u1","c3u2","c3u3","c3u4","m2000","mgram"].forEach(ex=>r.exams[ex]=st(ex)); }
    if(d.action==="gate"){
      if(busyOnce){ busyOnce=false; r={result:"error", busy:true, ver:VER, message:"いま生徒の記録が混みあっていて…"}; }
      else { window.__open[d.exam]=!!d.open; r={result:"ok", ver:VER, open:!!d.open, exam:d.exam, session:"S1", submissions:0}; }
    }
    return Promise.resolve({status:200, text:()=>Promise.resolve(JSON.stringify(r)), json:()=>Promise.resolve(r)});
  };
}, VER);
await p.goto(new URL("../../admin/index.html", import.meta.url).href); await p.waitForTimeout(800);
{ // 状態は全試験を1回で聞く（旧来の9回ではなく）
  const kinds=await p.evaluate(()=>window.__sent.map(x=>x.action));
  ok(kinds.filter(a=>a==="status_all").length>=1 && !kinds.includes("status"),
     "★状態は status_all で1回に（"+kinds.join(",")+"）");
  const sa=await p.evaluate(()=>window.__sent.find(x=>x.action==="status_all"));
  ok(sa && sa.kind==="admin", "status_all には kind:admin がつく（旧版で英検タブに落ちないため）");
}

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
const card=(await p.$$("#exams .card"))[ADM_IDS.indexOf("m2000")];
await btns[ADM_IDS.indexOf("m2000")].click(); await p.waitForTimeout(300);
{ // 押した直後：両方のボタンが止まり、カードの下に「スタートしています…」
  const st=await card.evaluate(c=>({s:c.querySelector(".start").disabled, t:c.querySelector(".stop").disabled, m:c.querySelector(".cmsg").textContent}));
  ok(st.s && st.t, "送信中は両方のボタンが止まる");
  ok(/スタートしています|混みあっています/.test(st.m), "★結果はカードのすぐ下に出る（"+st.m+"）");
}
await p.waitForTimeout(3200);   // busy → 2.5秒後に押しなおす
const sent=await p.evaluate(()=>window.__sent.filter(x=>x.action==="gate"));
ok(sent.length===2 && sent.every(x=>x.exam==="m2000" && x.open===true),
   "★busy なら自分で押しなおす（gate "+sent.length+"回）");
{
  const st=await card.evaluate(c=>({s:c.querySelector(".start").disabled, t:c.querySelector(".stop").disabled,
    m:c.querySelector(".cmsg").textContent, b:c.querySelector(".badge").textContent}));
  ok(/受付を開始しました/.test(st.m), "★押しなおしが通って「✓ 受付を開始しました」（"+st.m+"）");
  ok(/受付中/.test(st.b), "カードのバッジが受付中になる（"+st.b+"）");
  ok(st.s && !st.t, "スタートは止まり、ストップが押せる");
}
// 版チェック
// ★見えているかは計算後のスタイルで見る（インラインの display だけ見ていて、スタイルシートの
//   display:none に負けて「一度も出ていない」のを見逃していた）
const note=await p.evaluate(()=>{const e=document.getElementById("serverNote");
  return {shown:getComputedStyle(e).display!=="none", txt:(e.textContent||"").slice(0,40), cls:e.className};});
ok(note.shown, "★版の表示が実際に見えている（display="+(note.shown?"見える":"none")+"）");
ok(!/版が古い/.test(note.txt), VER+" なら版の警告が出ない（"+note.txt+"）");
ok(/okline/.test(note.cls) && /jigaku-\d+ ✓/.test(note.txt), "サーバー版が緑で出る（"+note.txt+"）");
// 旧版のサーバー（版が足りない）なら、赤い警告が実際に見える
{
  const q=await b.newPage();
  await q.addInitScript(()=>{
    window.fetch=function(url,opt){
      const d=JSON.parse(opt.body);
      let r={result:"error", ver:"jigaku-3", message:"未知の kind: admin"};   // 旧版は status_all を知らない
      if(d.action==="status") r={result:"ok", ver:"jigaku-3", open:false, exam:d.exam, session:"", submissions:0};
      return Promise.resolve({status:200, text:()=>Promise.resolve(JSON.stringify(r)), json:()=>Promise.resolve(r)});
    };
  });
  await q.goto(new URL("../../admin/index.html", import.meta.url).href); await q.waitForTimeout(800);
  const w=await q.evaluate(()=>{const e=document.getElementById("serverNote");
    return {shown:getComputedStyle(e).display!=="none", txt:(e.textContent||"").slice(0,60), cls:e.className};});
  ok(w.shown && /warn/.test(w.cls) && /版が古い/.test(w.txt), "★旧版なら「版が古い」の警告が見える（"+w.txt+"）");
  const badges=await q.$$eval("#exams .badge", ns=>ns.map(n=>n.textContent.trim()));
  ok(badges.every(t=>/ロック中/.test(t)), "旧版でも1試験ずつ聞いてカードは描ける（"+badges[0]+"）");
  await q.close();
}
// 1つ前の版（jigaku-16）なら「少し古い・足りないものはこれ」と具体的に言う（大げさな定型文を出さない）
{
  const q=await b.newPage();
  await q.addInitScript(()=>{
    window.fetch=function(url,opt){
      const d=JSON.parse(opt.body);
      let r={result:"ok", ver:"jigaku-16", exams:{}};
      if(d.action==="status_all"){ ["c2u1","c2u2","c2u3","c3u1","c3u2","c3u3","c3u4","m2000","mgram"].forEach(ex=>r.exams[ex]={result:"ok",open:false,exam:ex,session:"",submissions:0}); }
      return Promise.resolve({status:200, text:()=>Promise.resolve(JSON.stringify(r)), json:()=>Promise.resolve(r)});
    };
  });
  await q.goto(new URL("../../admin/index.html", import.meta.url).href); await q.waitForTimeout(800);
  const w=await q.evaluate(()=>{const e=document.getElementById("serverNote");
    return {shown:getComputedStyle(e).display!=="none", txt:(e.textContent||""), cls:e.className};});
  ok(w.shown && /少し古い/.test(w.txt) && /合言葉/.test(w.txt) && !/単元テスト③④が開かない/.test(w.txt),
     "★1つ前の版なら「少し古い」＋足りないものだけ（"+w.txt.slice(0,50)+"）");
  await q.close();
}
// ずっと busy なら 3回でやめて、そう言い、ボタンを解放する
{
  const q=await b.newPage();
  await q.addInitScript((VER)=>{
    window.__gate=0;
    window.fetch=function(url,opt){
      const d=JSON.parse(opt.body);
      let r={result:"ok", ver:VER, exams:{}};
      if(d.action==="status_all"){ ["c2u1","c2u2","c2u3","c3u1","c3u2","c3u3","c3u4","m2000","mgram"].forEach(ex=>r.exams[ex]={result:"ok",open:false,exam:ex,session:"",submissions:0}); }
      if(d.action==="gate"){ window.__gate++; r={result:"error", busy:true, ver:VER, message:"混みあい"}; }
      return Promise.resolve({status:200, text:()=>Promise.resolve(JSON.stringify(r)), json:()=>Promise.resolve(r)});
    };
  }, VER);
  await q.goto(new URL("../../admin/index.html", import.meta.url).href); await q.waitForTimeout(600);
  await q.fill("#pin","TESTPIN");
  const card=(await q.$$("#exams .card"))[ADM_IDS.indexOf("m2000")];
  await (await card.$(".start")).click();
  await q.waitForTimeout(6500);   // 2.5秒×2回の押しなおし
  const n=await q.evaluate(()=>window.__gate);
  ok(n===3, "★押しなおしは3回まで（"+n+"回）");
  const st=await card.evaluate(c=>({s:c.querySelector(".start").disabled, t:c.querySelector(".stop").disabled, m:c.querySelector(".cmsg").textContent}));
  ok(/できませんでした/.test(st.m) && /混みあ/.test(st.m), "3回だめなら理由をカードの下に出す（"+st.m+"）");
  ok(!st.s, "★スタートを押しなおせる（ボタンが止まったままにならない）");
  await q.close();
}
await p.close(); await b.close();
console.log(errs.length? "\nJSエラー:\n"+errs.slice(0,4).join("\n") : "\nJSエラーなし");
console.log(`\n${pass} pass / ${fail} fail`);
