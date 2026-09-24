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

/* ---------- 到達度テストの合計点（jigaku-11） ---------- */
console.log("— 合計点：セットごとの最高点の足しあげ —");
G.call({action:"gate", pin:"PIN", exam:"m2000", open:true});
// 先生の例：セット1の1回目90点／2回目89点／セット2の1回目100点 → 190点
const put=(round,set,correct)=>G.call({kind:"mastery", exam:"m2000", cls:"3", num:"21", name:"テスト",
  round, set, correct, asked:100, sec:60, ver:"t"});
put(1,1,90); put(2,1,89); put(1,2,100);
{
  const sum=G.dump("成績まとめ")||[];
  const head=sum[0]||[];
  const col=head.indexOf("到達度2000語_合計");
  const row=sum.find(r=>String(r[1])==="3"&&String(r[2])==="21");
  ok(col>=0, "成績まとめに「到達度2000語_合計」の列がある");
  ok(row && Number(row[col])===190,
     "★90/89/100 → 190点（2回目の89は足さない）："+(row?row[col]:"行なし"));
}
// 3回目でセット1が95点なら 95+100＝195
put(3,1,95);
{
  const sum=G.dump("成績まとめ")||[];
  const col=(sum[0]||[]).indexOf("到達度2000語_合計");
  const row=sum.find(r=>String(r[1])==="3"&&String(r[2])==="21");
  ok(row && Number(row[col])===195, "★セット1が95に伸びたら195点："+(row?row[col]:"行なし"));
}
// 文法は別の列
G.call({action:"gate", pin:"PIN", exam:"mgram", open:true});
G.call({kind:"mastery", exam:"mgram", cls:"3", num:"21", name:"テスト", round:1, set:1, correct:5, asked:5, sec:30, ver:"t"});
{
  const sum=G.dump("成績まとめ")||[];
  const head=sum[0]||[];
  const row=sum.find(r=>String(r[1])==="3"&&String(r[2])==="21");
  ok(Number(row[head.indexOf("到達度文法_合計")])===5, "文法は別の列に5点");
  ok(Number(row[head.indexOf("到達度2000語_合計")])===195, "2000語の列は195のまま");
}
// 読めなかったときに「閉」と言わないこと
console.log("— 分からないときに「閉」と言わない —");
{
  const r=G.call({action:"status", exam:"nosuch"});
  ok(r.result==="error", "★未知の試験IDは error（open:false ではない）："+JSON.stringify(r).slice(0,60));
  ok(r.open===undefined, "open を返さない＝アプリはいまの状態を保つ");
}


/* ---------- 合計点が、あとから来るものに消されないか ---------- *
   成績まとめは マイページの送信・自学の集計・合計点 の3つが同じ行を触る。
   貼り直した直後に順番が入れちがうと、合計点だけ消えることがありうるので見ておく。 */
console.log("— 合計点が、ほかの書き込みで消えないか —");
{
  const col = () => {
    const sum = G.dump("成績まとめ") || [];
    const i = (sum[0]||[]).indexOf("到達度2000語_合計");
    const row = sum.find(r => String(r[1])==="3" && String(r[2])==="21");
    return row ? Number(row[i]) : null;
  };
  ok(col()===195, "いまは195点（前の節のつづき）");

  // ① マイページから送信（合計点は送らない）
  G.call({kind:"summary", cls:"3", num:"21", name:"テスト", w_basic:100, m_best:80});
  ok(col()===195, "★マイページ送信でも合計点は消えない（"+col()+"）");

  // ② 自学ログの集計が走っても
  G.call({kind:"jigaku", lane:"単語", cls:"3", num:"21", name:"テスト",
          unit:"Unit 1", src:"打ち込み", listN:10, ok:8, total:10, ver:"t"});
  try { G.rebuildJigakuUnits && G.rebuildJigakuUnits(); } catch(e){}
  ok(col()===195, "★自学の集計のあとも合計点は残る（"+col()+"）");

  // ③ 入れなおしのメニューを叩いても同じ数
  const msg = G.rebuildMasteryTotals ? G.rebuildMasteryTotals() : "(呼べない)";
  ok(col()===195, "★入れなおしても195点のまま（"+col()+"／"+msg+"）");

  // ④ 2列を空にする関数が、その2列だけを空にする
  const before = G.dump("成績まとめ")[0].length;
  const r2 = G.clearMasteryTotalCols ? G.clearMasteryTotalCols() : "(呼べない)";
  ok(col()===0 || col()===null || isNaN(col()), "clearMasteryTotalCols で空になる（"+col()+"／"+r2+"）");
  ok(G.dump("成績まとめ")[0].length===before, "列の数は変わらない");
}


/* ---------- 到達度まとめ（1人1行・名簿順） ---------- */
console.log("— 到達度まとめ：1人1行・名簿順 —");
{
  G.call({action:"gate", pin:"PIN", exam:"m2000", open:true});
  const put=(cls,num,name,round,set,correct,sec)=>G.call({kind:"mastery", exam:"m2000",
    cls, num, name, round, set, correct, asked:100, sec, ver:"t"});
  // わざと名簿順でない順に入れる（3年5番 → 2年10番 → 3年2番）
  put("3","5","ごばん",1,1,80,60);    // CPM 80
  put("3","5","ごばん",2,1,90,90);    // CPM 60  → セット1の最高は90
  put("3","5","ごばん",1,2,70,60);    // CPM 70  → 合計 90+70=160
  put("2","10","じゅう",1,1,50,60);   // CPM 50
  put("3","2","にばん",1,1,60,30);    // CPM 120

  const bd=G.dump("到達度まとめ")||[];
  const head=bd[0]||[];
  ok(head[0]==="学年" && head[1]==="番号" && head[3]==="2000語 合計点",
     "見出しが 学年／番号／…／合計点（"+head.slice(0,6).join(",")+"）");
  const body=bd.slice(1).filter(r=>String(r[0]).trim()!=="");
  const keys=body.map(r=>r[0]+"-"+r[1]);
  ok(new Set(keys).size===keys.length, "★1人1行＝同じ子が2度出ない（"+keys.join(" ")+"）");
  const nums=body.map(r=>Number(r[0])*1000+Number(r[1]));
  ok(nums.every((x,i)=>i===0||nums[i-1]<=x), "★名簿順（学年▶番号）に並ぶ（"+keys.join(" ")+"）");
  const go=body.find(r=>String(r[0])==="3"&&String(r[1])==="5");
  ok(Number(go[3])===160, "★合計点はセットごとの最高の足しあげ 90+70=160（"+go[3]+"）");
  ok(Number(go[4])===80,  "★最高CPMは80（"+go[4]+"）");
  ok(Number(go[5])===70,  "★平均CPMは (80+60+70)/3=70（"+go[5]+"）");
  // 作りなおしても同じ
  const msg=G.rebuildMasteryBoard ? G.rebuildMasteryBoard() : "(呼べない)";
  const again=(G.dump("到達度まとめ")||[]).slice(1).filter(r=>String(r[0]).trim()!=="");
  ok(again.length===body.length && Number(again.find(r=>String(r[0])==="3"&&String(r[1])==="5")[3])===160,
     "★作りなおしても同じ（"+msg+"）");
}

console.log(`\n${pass} pass / ${fail} fail`);
