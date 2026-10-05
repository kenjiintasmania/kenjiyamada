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
G.rebuildMasteryBoard();   // jigaku-15〜：まとめは記録のたびではなく、作りなおしで入る
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
G.rebuildMasteryBoard();
{
  const sum=G.dump("成績まとめ")||[];
  const col=(sum[0]||[]).indexOf("到達度2000語_合計");
  const row=sum.find(r=>String(r[1])==="3"&&String(r[2])==="21");
  ok(row && Number(row[col])===195, "★セット1が95に伸びたら195点："+(row?row[col]:"行なし"));
}
// 文法は別の列
G.call({action:"gate", pin:"PIN", exam:"mgram", open:true});
G.call({kind:"mastery", exam:"mgram", cls:"3", num:"21", name:"テスト", round:1, set:1, correct:5, asked:5, sec:30, ver:"t"});
G.rebuildMasteryBoard();
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
  G.rebuildMasteryBoard();

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



/* ===================== jigaku-16 ===================== */

/* ---------- 合言葉：コードは "PIN" のまま、「設定」タブの「合言葉」行が優先 ---------- *
   貼るたびに TEACHER_PIN を直す約束は、直し忘れで /admin が「合言葉が違います」になった
   （2026-09）。以後は既定値のまま。学校ごとに変えるなら設定タブに書く。 */
console.log("— 合言葉：設定タブが優先 —");
{
  let r=G.call({action:"gate", pin:"PIN", exam:"c2u1", open:true});
  ok(r.result==="ok", "既定の合言葉で開けられる");
  // 設定タブに「合言葉」行を足す（学習方針は B2。行はどこでもよい）
  G.call({action:"setpolicy", pin:"PIN", policy:"kihon"});
  const st=G.__SS.getSheetByName("設定");
  st.appendRow(["合言葉","himitsu"]);
  r=G.call({action:"gate", pin:"PIN", exam:"c2u1", open:false});
  ok(r.result==="error" && /合言葉/.test(r.message), "★設定タブに書いたら、既定の PIN では開けない（"+r.message+"）");
  r=G.call({action:"gate", pin:"himitsu", exam:"c2u1", open:false});
  ok(r.result==="ok" && r.open===false, "設定タブの合言葉で閉じられる");
  r=G.call({action:"setpolicy", pin:"himitsu", policy:"moshi"});
  ok(r.result==="ok", "学習方針の保存も同じ合言葉");
  ok(String(st.getRange(2,1).getValue())==="学習方針", "学習方針の行（A2）は壊れていない");
  // B列を空にすれば既定に戻る
  st.getRange(st.getLastRow(),2).setValue("");
  r=G.call({action:"gate", pin:"PIN", exam:"c2u1", open:true});
  ok(r.result==="ok", "B列が空なら既定の PIN に戻る");
  G.call({action:"gate", pin:"PIN", exam:"c2u1", open:false});
}

/* ---------- ロックが取れないとき：例外ではなく busy ---------- *
   先生のスタートが生徒の記録送信に押し負けて「Exception: Lock timeout」で止まっていた。 */
console.log("— ロック待ち：busy を返す —");
{
  G.setBusy(true);
  let r=G.call({action:"gate", pin:"PIN", exam:"m2000", open:true});
  ok(r.result==="error" && r.busy===true && /混みあ/.test(r.message), "★スタートは busy つきの error（管理画面が押しなおす）："+r.message);
  r=G.call({kind:"mastery", exam:"m2000", cls:"3", num:"7", name:"テスト", round:9, set:1, correct:1, asked:1, sec:1, ver:"t"});
  ok(r.result==="busy", "★生徒の記録は busy（端末にためて送りなおす）："+JSON.stringify(r));
  r=G.call({kind:"unittest", exam:"c2u1", cls:"3", num:"7", name:"テスト", score:1, total:1, pct:100, ver:"t"});
  ok(r.result==="busy", "単元テストの提出も busy："+JSON.stringify(r));
  G.setBusy(false);
  r=G.call({action:"gate", pin:"PIN", exam:"m2000", open:true});
  ok(r.result==="ok", "ロックが空けば通る");
  const log=(G.dump("到達度テスト")||[]).filter(x=>String(x[2])==="m2000"&&String(x[4])==="7"&&Number(x[6])===9);
  ok(log.length===0, "busy のとき記録は書かれていない");
}

/* ---------- 全試験を1回で ---------- */
console.log("— status_all —");
{
  const r=G.call({action:"status_all", kind:"admin"});
  ok(r.result==="ok" && r.exams && r.exams.m2000 && r.exams.c3u4, "全試験の状態が1回で返る");
  ok(r.exams.m2000.open===true && typeof r.exams.m2000.session==="string", "m2000 は開いていてセッションつき");
  ok(r.exams.c3u4.open===false, "c3u4 は閉");
  ok(/jigaku-\d+/.test(r.ver), "版がついている："+r.ver);
  const one=G.call({action:"status", exam:"m2000"});
  ok(one.session===r.exams.m2000.session && one.submissions===r.exams.m2000.submissions, "1試験ずつ聞いた答えと同じ");
}

/* ---------- リセット：行を消さず「リセット行」で前の記録を無かったことにする ---------- *
   先生の指示（2026-09-28）：カンニング（最初の100語の一覧を別画面に出したまま受けていた）が分かった
   生徒のセット1〜10を0点にし、11〜20だけやらせた。学年1・番号8 は模型用の架空の生徒（実在の番号は書かない）。 */
console.log("— リセット（前半）—");
{
  const put=(round,set,correct)=>G.call({kind:"mastery", exam:"m2000", cls:"1", num:"8", name:"テスト",
    round, set, correct, asked:100, sec:60, ver:"t"});
  put(1,1,90); put(2,1,95); put(1,2,80); put(1,11,70); put(1,12,60);
  let p=G.call({action:"progress", exam:"m2000", cls:"1", num:"8"});
  ok(p.done===5 && p.resets.length===0, "リセット前：5回ぶん（"+p.done+"）・resets 空");
  // リセット行は必ず後の時刻にする（模型は速いので、同じmsに並ばないよう少し待つ）
  const t0=Date.now(); while(Date.now()-t0<3){}
  let r=G.call({action:"mastery_reset", kind:"mastery_reset", exam:"m2000", from:1, to:10, cls:"1", num:"8", name:"テスト"});
  ok(r.result==="error" && /合言葉/.test(r.message), "★合言葉なしではリセットできない（他の子の記録を消せない）："+r.message);
  r=G.call({action:"mastery_reset", kind:"mastery_reset", pin:"xxx", exam:"m2000", from:1, to:10, cls:"1", num:"8", name:"テスト"});
  ok(r.result==="error" && /合言葉/.test(r.message), "まちがった合言葉でもだめ");
  ok((G.dump("到達度テスト")||[]).filter(x=>String(x[12])==="reset").length===0, "リセット行は書かれていない");
  r=G.call({action:"mastery_reset", kind:"mastery_reset", pin:"PIN", exam:"m2000", from:1, to:10, cls:"1", num:"8", name:"テスト"});
  ok(r.result==="ok" && r.exams.length===1 && r.exams[0]==="m2000" && r.range==="1〜10", "★先生の合言葉つきならリセットできる："+JSON.stringify(r));
  ok(typeof r.key==="number" && r.key>0, "端末が控える key（行の日時ms）が返る");
  const rows=G.dump("到達度テスト");
  const mark=rows.filter(x=>String(x[12])==="reset");
  ok(mark.length===1 && String(mark[0][7])==="1〜10" && Number(mark[0][6])===0, "★シートにはリセット行が1行足されるだけ（記録は消さない）");
  ok(rows.length>=6, "元の記録行は残っている（"+rows.length+"行）");
  p=G.call({action:"progress", exam:"m2000", cls:"1", num:"8"});
  ok(p.done===2 && !p.sets["1-1"] && !p.sets["2-1"] && !p.sets["1-2"] && p.sets["1-11"] && p.sets["1-12"],
     "★続きの位置：1〜10 は無かったことに、11・12 は残る（"+Object.keys(p.sets).join(" ")+"）");
  ok(p.resets.length===1 && p.resets[0].from===1 && p.resets[0].to===10 && p.resets[0].key===r.key,
     "★progress が端末に resets を返す（key が一致）："+JSON.stringify(p.resets));
  ok(p.round===1 && p.set===13, "次は 1周目セット13（"+p.round+"-"+p.set+"）");
  G.rebuildMasteryBoard();
  const bd=(G.dump("到達度まとめ")||[]).find(x=>String(x[0])==="1"&&String(x[1])==="8");
  ok(bd && Number(bd[3])===130, "★到達度まとめの合計は 70+60=130（"+(bd&&bd[3])+"）");
  const sum=G.dump("成績まとめ"); const col=sum[0].indexOf("到達度2000語_合計");
  const srow=sum.find(x=>String(x[1])==="1"&&String(x[2])==="8");
  ok(srow && Number(srow[col])===130, "★成績まとめの合計も 130（"+(srow&&srow[col])+"）");
  // やり直しの1回目が「記録ずみ」で弾かれない
  const t1=Date.now(); while(Date.now()-t1<3){}
  r=put(1,1,50);
  ok(r.result==="ok", "★リセット後のセット1・1回目は dup にならない："+JSON.stringify(r));
  p=G.call({action:"progress", exam:"m2000", cls:"1", num:"8"});
  ok(p.sets["1-1"] && p.sets["1-1"].correct===50 && p.done===3, "やり直した記録は数える（"+JSON.stringify(p.sets["1-1"])+"）");
  G.rebuildMasteryBoard();
  const bd2=(G.dump("到達度まとめ")||[]).find(x=>String(x[0])==="1"&&String(x[1])==="8");
  ok(bd2 && Number(bd2[3])===180, "合計 50+70+60=180（"+(bd2&&bd2[3])+"）");
}
console.log("— リセット（全部）—");
{
  G.call({action:"gate", pin:"PIN", exam:"mgram", open:true});
  G.call({kind:"mastery", exam:"mgram", cls:"1", num:"8", name:"テスト", round:1, set:3, correct:4, asked:5, sec:30, ver:"t"});
  const t0=Date.now(); while(Date.now()-t0<3){}
  const r=G.call({action:"mastery_reset", kind:"mastery_reset", pin:"PIN", exam:"all", all:true, cls:"1", num:"8", name:"テスト"});
  ok(r.result==="ok" && r.exams.length===4 && r.range==="全", "★全データ：到達度テスト4本すべてにリセット行："+JSON.stringify(r.exams));
  const p1=G.call({action:"progress", exam:"m2000", cls:"1", num:"8"});
  const p2=G.call({action:"progress", exam:"mgram", cls:"1", num:"8"});
  ok(p1.done===0 && p2.done===0, "★両方とも 0 から（"+p1.done+"/"+p2.done+"）");
  ok(p1.resets.length===2 && p1.resets[1].to>=1e9, "resets は2件（前半＋全）で、全は to が大きい");
  ok(p2.resets.length===1, "全文法の resets は1件");
  // ほかの子は影響なし
  const p3=G.call({action:"progress", exam:"m2000", cls:"3", num:"21"});
  ok(p3.done>0 && p3.resets.length===0, "★ほかの子の記録は変わらない");
  // 入力のおかしいリセットは弾く
  let e=G.call({action:"mastery_reset", kind:"mastery_reset", pin:"PIN", exam:"m2000", from:10, to:1, cls:"1", num:"8"});
  ok(e.result==="error", "範囲が逆なら error");
  e=G.call({action:"mastery_reset", kind:"mastery_reset", pin:"PIN", exam:"nosuch", from:1, to:10, cls:"1", num:"8"});
  ok(e.result==="error", "未知の試験IDは error");
  e=G.call({action:"mastery_reset", kind:"mastery_reset", pin:"PIN", exam:"m2000", from:1, to:10, cls:"", num:""});
  ok(e.result==="error", "学年・番号なしは error");
}
console.log("— リセットのつづき：二度目・やり直し後の dup・文法だけ —");
{
  const put=(exam,round,set,correct)=>G.call({kind:"mastery", exam, cls:"1", num:"9", name:"テスト",
    round, set, correct, asked:100, sec:60, ver:"t"});
  put("m2000",1,1,80); put("m2000",1,2,80);
  const t0=Date.now(); while(Date.now()-t0<3){}
  const r1=G.call({action:"mastery_reset", kind:"mastery_reset", pin:"PIN", exam:"m2000", from:1, to:10, cls:"1", num:"9"});
  const t1=Date.now(); while(Date.now()-t1<3){}
  let r=put("m2000",1,1,50);
  ok(r.result==="ok", "リセット後のやり直し（1回目）は通る");
  r=put("m2000",1,1,55);
  ok(r.result==="dup", "★やり直し後に同じ回をもう一度送ると dup（二重送信の判定はリセット後の記録で効く）："+r.result);
  const t2=Date.now(); while(Date.now()-t2<3){}
  const r2=G.call({action:"mastery_reset", kind:"mastery_reset", pin:"PIN", exam:"m2000", from:1, to:10, cls:"1", num:"9"});
  ok(r2.result==="ok" && r2.key>r1.key, "二度目のリセットは新しい key");
  let p=G.call({action:"progress", exam:"m2000", cls:"1", num:"9"});
  ok(p.done===0 && p.resets.length===2 && p.resets[1].key===r2.key, "★二度目でやり直しの記録も消え、resets は2件（"+p.done+"）");
  const t3=Date.now(); while(Date.now()-t3<3){}
  r=put("m2000",1,1,60);
  ok(r.result==="ok", "二度目のあとの1回目も通る");
  // 文法だけ・範囲つき（画面には無いがサーバーは受ける）
  put("mgram",1,2,5); put("mgram",1,7,5);
  const t4=Date.now(); while(Date.now()-t4<3){}
  const r3=G.call({action:"mastery_reset", kind:"mastery_reset", pin:"PIN", exam:"mgram", from:1, to:5, cls:"1", num:"9"});
  ok(r3.result==="ok" && r3.exams[0]==="mgram", "文法だけのリセット");
  const pg=G.call({action:"progress", exam:"mgram", cls:"1", num:"9"});
  ok(!pg.sets["1-2"] && pg.sets["1-7"], "★文法の項目2は消え、項目7は残る");
  const p2=G.call({action:"progress", exam:"m2000", cls:"1", num:"9"});
  ok(p2.sets["1-1"] && p2.sets["1-1"].correct===60, "2000語のほうは触らない");
  // 日時の列が読めない行があっても、行の順でリセットが効く
  const sh=G.__SS.getSheetByName("到達度テスト");
  // ★"2026.9.28 10:00" は V8 が日付として読めてしまう（日付順で比べられ、日付に左右される）ので、本当に読めない文字にする
  sh.appendRow(["2026年9月28日 10時", "", "m2000", "1", "9", "テスト", 1, 3, 77, 100, 60, 77, "t"]);   // 読めない日時の記録
  sh.appendRow(["2026年9月28日 10時1分", "", "m2000", "1", "9", "テスト", 0, "1〜10", "", "", "", "", "reset"]);  // 読めない日時のリセット行
  const p3=G.call({action:"progress", exam:"m2000", cls:"1", num:"9"});
  ok(!p3.sets["1-3"] && !p3.sets["1-1"], "★日時が読めなくても、行の順で「前」の記録は消える（"+Object.keys(p3.sets).join(",")+"）");
  // 成績まとめ・到達度まとめは、リセット（最後は文法の項目1〜5）のその場で入れなおされている：
  // 2000語はそのとき 1-1=60 のまま、文法は項目7の5点だけ
  const sum=G.dump("成績まとめ"); const head=sum[0];
  const srow=sum.find(x=>String(x[1])==="1"&&String(x[2])==="9");
  ok(srow && Number(srow[head.indexOf("到達度2000語_合計")])===60 && Number(srow[head.indexOf("到達度文法_合計")])===5,
     "★リセット直後に成績まとめの合計が入れなおる（2000語 "+(srow&&srow[head.indexOf("到達度2000語_合計")])+"／文法 "+(srow&&srow[head.indexOf("到達度文法_合計")])+"）");
  const bd=(G.dump("到達度まとめ")||[]).find(x=>String(x[0])==="1"&&String(x[1])==="9");
  ok(bd && Number(bd[3])===60 && Number(bd[6])===5, "到達度まとめも同じ（"+(bd&&bd[3])+"／"+(bd&&bd[6])+"）");
}
/* ---------- 試験×学年の受付（jigaku-18） ---------- */
console.log("— 試験×学年の受付 —");
{
  G.call({action:"gate", pin:"PIN", exam:"m2000", open:false});
  let r=G.call({action:"gate", pin:"PIN", exam:"m2000", cls:"2", open:true});
  ok(r.result==="ok" && r.open===true && r.cls==="2" && /-2$/.test(r.session), "★2年だけ開けられる（セッションに学年つき）："+r.session);
  ok(G.call({action:"status", exam:"m2000", cls:"2"}).open===true, "2年から見ると受付中");
  ok(G.call({action:"status", exam:"m2000", cls:"3"}).open===false, "★3年から見ると閉");
  ok(G.call({action:"status", exam:"m2000"}).open===false, "学年なし（旧ページ）は全学年の行＝閉");
  let m=G.call({kind:"mastery", exam:"m2000", cls:"3", num:"30", name:"t", round:1, set:1, correct:10, asked:100, sec:60, ver:"t"});
  ok(m.result==="ok" && m.late===true, "★閉じている学年の記録も受け取り、「受付外」と返す："+JSON.stringify(m).slice(0,60));
  m=G.call({kind:"mastery", exam:"m2000", cls:"2", num:"30", name:"t", round:1, set:1, correct:10, asked:100, sec:60, ver:"t"});
  ok(m.result==="ok" && !m.late, "開いている学年の記録は受付中として届く");
  const rows=(G.dump("到達度テスト")||[]).filter(x=>String(x[4])==="30");
  const r3=rows.find(x=>String(x[3])==="3"), r2=rows.find(x=>String(x[3])==="2");
  ok(rows.length===2 && r3 && String(r3[1])==="受付外" && r2 && /-2$/.test(String(r2[1])), "★セッション欄：3年は「受付外」・2年は学年つきセッション（"+(r3&&r3[1])+"／"+(r2&&r2[1])+"）");
  const sa=G.call({action:"status_all", kind:"admin"});
  ok(sa.exams.m2000.open===false && sa.exams.m2000.by["2"] && sa.exams.m2000.by["2"].open===true && sa.exams.m2000.by["2"].ownOpen===true,
     "status_all：全学年は閉・2年は開（"+JSON.stringify(sa.exams.m2000.by)+"）");
  r=G.call({action:"gate", pin:"PIN", exam:"m2000", open:true});
  ok(r.result==="ok" && r.open===true, "全学年で開ける");
  ok(G.call({action:"status", exam:"m2000", cls:"3"}).open===true, "★全学年が開けば3年も受付中");
  r=G.call({action:"gate", pin:"PIN", exam:"m2000", cls:"3", open:true});
  ok(r.result==="error" && /全学年/.test(r.message), "全学年が開いているあいだは学年ごとの操作を断る："+r.message);
  const sa2=G.call({action:"status_all", kind:"admin"});
  ok(sa2.exams.m2000.by["2"].scope==="all", "status_all：学年の行は「全学年で開いている」と分かる");
  G.call({action:"gate", pin:"PIN", exam:"m2000", open:false});
  ok(G.call({action:"status", exam:"m2000", cls:"2"}).open===false, "★全学年ストップで2年の行も閉じる");
  // 単元テスト：学年ごとの受付。提出数はその行に
  G.call({action:"gate", pin:"PIN", exam:"c3u1", cls:"3", open:true});
  let u=G.call({kind:"unittest", exam:"c3u1", cls:"2", num:"5", name:"t", score:50, total:100, pct:50, ver:"t"});
  ok(u.result==="locked", "単元テスト：開いていない学年は提出できない");
  u=G.call({kind:"unittest", exam:"c3u1", cls:"3", num:"5", name:"t", score:50, total:100, pct:50, ver:"t"});
  ok(u.result==="ok", "開いている学年は提出できる："+JSON.stringify(u));
  ok(G.call({action:"status", exam:"c3u1", cls:"3"}).submissions===1, "★提出数は3年の行に入る");
  ok(G.call({action:"status", exam:"c3u1"}).submissions===0, "全学年の行の提出数は0のまま");
  G.call({action:"gate", pin:"PIN", exam:"c3u1", open:false});
  const um=(G.dump("単元管理")||[]);
  ok(String(um[0][6])==="学年" && um.some(x=>String(x[0])==="m2000"&&String(x[6])==="2"), "単元管理にG列「学年」と m2000×2年 の行がある");
}
console.log("— 到達度テスト以外の記録が英検タブに落ちない —");
{
  const before=(G.dump("英検テスト履歴")||[]).length;
  G.call({action:"status_all", kind:"admin"});
  G.call({action:"mastery_reset", kind:"mastery_reset", pin:"PIN", exam:"m2000", from:1, to:10, cls:"1", num:"8"});
  const after=(G.dump("英検テスト履歴")||[]).length;
  ok(before===after, "status_all / mastery_reset は英検タブに行を作らない（"+before+"→"+after+"）");
}

console.log("— jigaku-20：全文法 上級編（mgram2）・熟語200語（midiom） —");
{
  ["mgram2","midiom"].forEach(ex=>{
    const g=G.call({action:"gate", pin:"PIN", exam:ex, open:true});
    ok(g.result==="ok" && g.open===true, ex+" の受付を開けられる "+JSON.stringify({result:g.result,open:g.open}));
  });
  let r=G.call({kind:"mastery", exam:"mgram2", cls:"1", num:"3", name:"テスト", round:1, set:2, correct:4, asked:5, sec:40, ver:"t"});
  ok(r.result==="ok", "mgram2 を記録できる "+JSON.stringify(r));
  r=G.call({kind:"mastery", exam:"midiom", cls:"1", num:"3", name:"テスト", round:1, set:1, correct:17, asked:20, sec:50, ver:"t"});
  ok(r.result==="ok", "midiom を記録できる");
  r=G.call({kind:"mastery", exam:"midiom", cls:"1", num:"3", name:"テスト", round:1, set:3, correct:20, asked:20, sec:50, ver:"t"});
  ok(r.result==="ok", "midiom セット3も記録できる");
  const p=G.call({action:"progress", exam:"midiom", cls:"1", num:"3"});
  ok(p.done===2 && p.set===4, "熟語の続きの位置（done="+p.done+" set="+p.set+"）");
  const p0=G.call({action:"progress", exam:"m2000", cls:"1", num:"3"});
  const p1=G.call({action:"progress", exam:"mgram", cls:"1", num:"3"});
  ok(p0.done===0 && p1.done===0, "★2000語・全文法（えらぶ）には混ざらない");
  const st=G.call({action:"status_all", kind:"admin"});
  ok(st.exams.mgram2 && st.exams.midiom && st.exams.mgram2.open===true, "status_all に2本が出る");
  const e=G.call({action:"status", exam:"mgram2", cls:"1"});
  ok(e.result==="ok" && e.open===true, "学年つきの status も開いている");
  // 到達度まとめ（16列）と 成績まとめの末尾2列
  G.rebuildMasteryBoard();
  const bd=G.dump("到達度まとめ")||[], head=bd[0]||[];
  ok(head.length===16 && head[9]==="文法上級 合計点" && head[12]==="熟語 合計点" && head[15]==="更新", "到達度まとめは16列（"+head.length+"）");
  const row=bd.find(x=>String(x[0])==="1"&&String(x[1])==="3");
  ok(row && Number(row[9])===4 && Number(row[12])===37, "文法上級 4・熟語 17+20=37（"+(row&&row[9])+"/"+(row&&row[12])+"）");
  const sm=G.dump("成績まとめ")||[], hd=(sm[0]||[]).slice(); while(hd.length && hd[hd.length-1]==="") hd.pop();   // 模型は右端に空セルを足すことがある
  const ci=hd.indexOf("到達度文法上級_合計"), cj=hd.indexOf("到達度熟語_合計");
  const me=sm.find(x=>String(x[1])==="1"&&String(x[2])==="3");
  ok(ci>0 && cj>0 && me && Number(me[ci])===4 && Number(me[cj])===37, "成績まとめに合計点（"+(me&&me[ci])+"/"+(me&&me[cj])+"）");
  // 自学の単元列（自学_U1…）は受け口が実行時に右端へ足すので、「定義の末尾」＝福岡10 の直後 を見る
  const i10=hd.indexOf("模試_福岡10");
  ok(i10>0 && hd[i10+1]==="到達度文法上級_合計" && hd[i10+2]==="到達度熟語_合計", "★新しい列は定義の末尾（既存の列位置が動かない）: "+JSON.stringify(hd.slice(i10,i10+3)));
  // 全データリセットは4本ぶん
  const t0=Date.now(); while(Date.now()-t0<3){}
  const rs=G.call({action:"mastery_reset", kind:"mastery_reset", pin:"PIN", exam:"all", all:true, cls:"1", num:"3", name:"テスト"});
  ok(rs.result==="ok" && rs.exams.length===4, "全データリセットは4本ぶんのリセット行");
  ok(G.call({action:"progress", exam:"midiom", cls:"1", num:"3"}).done===0, "熟語も 0 から");
}
console.log("— 到達度まとめ：古い10列の並びの行が残っていても作りなおす —");
{
  // 旧版（jigaku-19 まで）の10列の並びでシートが残っている状態を模す
  const sh=G.__SS.getSheetByName("到達度まとめ");
  const OLD=["学年","番号","名前","2000語 合計点","2000語 最高CPM","2000語 平均CPM","文法 合計点","文法 最高CPM","文法 平均CPM","更新"];
  sh.v.length=0;
  sh.v.push(OLD.slice());
  sh.v.push(["3","21","テスト",190,100,95,0,"","","2026-09-30"]);
  sh.v.push(["1","8","テスト",180,50,50,4,10,10,"2026-09-30"]);
  // 1人ぶんの更新（リセット時に呼ばれる）が入ると、見出しのちがいを見て全員ぶん作りなおす
  G.call({action:"mastery_reset", kind:"mastery_reset", pin:"PIN", exam:"mgram2", from:1, to:1, cls:"1", num:"3", name:"テスト"});
  const bd=G.dump("到達度まとめ")||[];
  ok(bd[0].length===16 && bd[0][15]==="更新", "見出しが16列に置きかわる（"+bd[0].length+"）");
  const r21=bd.find(x=>String(x[0])==="3"&&String(x[1])==="21");
  ok(r21 && typeof r21[3]==="number" && r21[3]>0 && typeof r21[9]==="number", "★古い行の「更新」が「文法上級 合計点」の列に残らない（"+(r21&&r21[9])+"）");
  const dates=bd.slice(1).filter(x=>x[15] instanceof Date || /20\d\d/.test(String(x[15])));
  ok(dates.length===bd.length-1, "全員の行に「更新」が16列目に入る（"+dates.length+"/"+(bd.length-1)+"）");
}

console.log(`\n${pass} pass / ${fail} fail`);
