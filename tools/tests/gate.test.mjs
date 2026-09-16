/* tools/tests/gate.test.mjs ─ score_gas.gs のゲート（受付の開閉）を Node 上で動かして確かめる。
   GAS は手で貼って再デプロイするので、貼る前にここで挙動を確認できるようにしてある。
   使い方: node tools/tests/gate.test.mjs                                        */
import { loadGas } from "./gasmock.mjs";
let pass=0,fail=0; const ok=(c,m)=>{ c?pass++:(fail++,console.log("  ✗ "+m)); };
const G=loadGas();
const PIN="PIN";

console.log("— 受付を開ける —");
let r=G.call({action:"gate", pin:PIN, exam:"m2000", open:true});
ok(r.result==="ok" && r.open===true, "スタートできる "+JSON.stringify(r));
const sess=r.session;
r=G.call({action:"status", exam:"m2000"});
ok(r.open===true, "開いている（status）"+JSON.stringify(r));

console.log("— 生徒が入る（進捗を聞く）—");
r=G.call({action:"progress", exam:"m2000", cls:"3", num:"7"});
ok(r.result==="ok" && r.round===1 && r.set===1, "1周目セット1から "+JSON.stringify(r));
r=G.call({action:"status", exam:"m2000"});
ok(r.open===true, "★進捗を聞いたあとも開いている（"+r.open+"）");

console.log("— 1セット記録する —");
r=G.call({kind:"mastery", exam:"m2000", session:sess, cls:"3", num:"7", name:"テスト",
          round:1, set:1, correct:63, asked:112, sec:97, ver:"mastery 0.1"});
ok(r.result==="ok", "記録できる "+JSON.stringify(r));
r=G.call({action:"status", exam:"m2000"});
ok(r.open===true, "★記録したあとも開いている（"+r.open+"）");
r=G.call({action:"progress", exam:"m2000", cls:"3", num:"7"});
ok(r.round===1 && r.set===2, "次はセット2 "+JSON.stringify({round:r.round,set:r.set}));

console.log("— ほかの試験のポーリングが混ざっても —");
["c2u1","c2u2","c3u1","c3u2","c3u3","c3u4","mgram"].forEach(e=>G.call({action:"status", exam:e}));
r=G.call({action:"status", exam:"m2000"});
ok(r.open===true, "★admin が全試験をポーリングしても開いている（"+r.open+"）");

console.log("— 管理画面を2台で開いて、両方でスタートを押す —");
const before=G.call({action:"status", exam:"m2000"});
const again=G.call({action:"gate", pin:PIN, exam:"m2000", open:true});
ok(again.result==="ok" && again.already===true, "2回目のスタートは空振りになる "+JSON.stringify({already:again.already}));
ok(again.session===before.session, "★セッションが作り直されない（"+(again.session===before.session)+"）");
const after=G.call({action:"status", exam:"m2000"});
ok(after.open===true && after.session===before.session, "開いたまま・セッションも同じ");
ok(after.submissions===before.submissions, "★提出数が0に戻らない（"+before.submissions+"→"+after.submissions+"）");
// ストップしてからスタートすれば、ちゃんと新しいセッションになる
G.call({action:"gate", pin:PIN, exam:"m2000", open:false});
const fresh=G.call({action:"gate", pin:PIN, exam:"m2000", open:true});
ok(fresh.session!==before.session, "ストップ→スタートなら新しいセッションになる");

console.log("— シートの中身 —");
console.log("  タブ:", G.sheets().join(" / "));
const u=G.dump("単元管理")||[];
u.forEach(row=>console.log("   単元管理:", JSON.stringify(row.slice(0,4))));
console.log(`\n${pass} pass / ${fail} fail`);
