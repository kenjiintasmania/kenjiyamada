/****************************************************************************
 * score_gas.gs — 英語学習アプリ 成績受信スクリプト（Google Apps Script）
 *
 * 役割：
 *   (A) 英検アプリ（eiken）からの 1回ごとの結果        → タブ「英検テスト履歴」に追記
 *   (B) マイページ（me）からの 3アプリまとめ（最新/最高）→ タブ「成績まとめ」に1人1行で集約
 *
 * 使い方（先生）：
 *   1. 集約したいスプレッドシートを開く（＝英検の記録が入っている既存のシート）。
 *   2. メニュー［拡張機能］→［Apps Script］を開く。
 *   3. 既存のコードをこのファイルの内容にまるごと置きかえて保存。
 *      （※元のコードは念のためコピーして控えておくと安心です）
 *   4. ［デプロイ］→［デプロイを管理］→ 既存のウェブアプリを［編集(鉛筆)］
 *      →［バージョン］を「新バージョン」にして［デプロイ］。
 *      ※こうすると “URLは変わらず” 中身だけ新しくなります（アプリ側の設定変更は不要）。
 *   5. 初回は権限の承認を求められたら許可してください。
 *
 *   ・「成績まとめ」「英検テスト履歴」タブは自動で作られます。
 *   ・既存の英検ログを別タブ名で続けたい場合は EIKEN_SHEET を合わせてください。
 ****************************************************************************/

var SUMMARY_SHEET = "成績まとめ";       // (B) 1人1行の集約タブ
var EIKEN_SHEET   = "英検テスト履歴";   // (A) 英検の1回ごとの追記タブ

/* ===== 書き込み先スプレッドシート =====
 * ★IDを直書きしておくと、スクリプトが「単独プロジェクト」（スプレッドシートに
 *   紐づいていない＝拡張機能メニューに自作メニューが出ない型）でも、必ず正しい
 *   シートに書き込めます。これが /admin の「？取得できません」「保存できませんでした」
 *   の主因――getActiveSpreadsheet() が null を返し getSS() が例外を投げる――を
 *   根本から防ぎます。コピペし直してもこの行が残れば毎回確実に動きます。
 *   別のブックに変えるときは下のIDだけ置きかえてください。
 *   シートのURL: https://docs.google.com/spreadsheets/d/【この部分がID】/edit   */
var SPREADSHEET_ID = "1x3jpH6zynyl-9Pw14XxvoNpza0N17vsLhKgky5dXNJs";
function getSS(){
  if (SPREADSHEET_ID) return SpreadsheetApp.openById(SPREADSHEET_ID);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error("スプレッドシートが見つかりません。SPREADSHEET_ID にシートIDを貼ってください。");
  return ss;
}


/* ===== (C) 自学ログ：自学マイページ（jigaku/）から1回ごとに追記 ===== */
function handleJigaku(d){
  // 「範囲」ではなく「リスト」。出題の根拠は生徒が自分で作った単語リストであって、
  // 教科書の単元名ではない（教科書は学年・地域で変わるため単元名は根拠にならない）。
  var header = ["日時","学年","番号","名前","レーン","リスト名","作り方","リスト語数",
                "問題数","正解数","正答率(%)","プロンプト版","リスト外の語","まちがえた語","クリアした語",
                "強調数","的中数"];
  var cls = String(d.cls||"").trim(), num = String(d.num||"").trim();
  if (!cls || !num) return {result:"error", message:"学年と番号を入れてね"};
  var sh = getSheet(JIGAKU_SHEET, header);
  sh.getRange(1,1,1,header.length).setValues([header]);
  sh.appendRow([
    new Date(), cls, num, d.name||"",
    d.lane||"", d.unit||"", d.src||"", numOrBlank(d.listN),
    numOrBlank(d.total), numOrBlank(d.ok), numOrBlank(d.pct),
    d.promptV||"", numOrBlank(d.notDb),
    String(d.weak||"").slice(0, 500),
    String(d.okw||"").slice(0, 1200),
    numOrBlank(d.mark), numOrBlank(d.hit)
  ]);
  // 成績まとめ側のユニット別クリア語数を更新。ここで失敗しても記録は残す。
  try{ rebuildJigakuUnits(); }catch(e){}
  return {result:"ok"};
}

/* ===== (A2) 自学ログ ▶ 成績まとめ「ユニット別クリア語数」 ===== *
 * 各生徒について「そのユニットで、これまでに正解できた語が何語あるか」を出す。
 *   ・同じリストを何回やっても、同じ語は1語として数える（延べではなく実数）。
 *   ・1つのユニットをいくつかのリストに分けても合算される。
 *   ・「クリアした語」が無い古い記録は、その単元の正解数の最大値で代用する。
 * 列は 成績まとめ の固定列（＝単語_活用まで）の右に、ユニット順で自動生成する。
 * 固定列は SUMMARY_COLS の幅までしか読み書きしないので、既存の集計とはぶつからない。 */

// リスト名からユニットを取り出す。教科書によって Unit / Lesson が違うので両方拾う。
function jigakuUnitKey(name){
  var s = String(name||"").trim();
  if (!s) return "その他";
  // ★Unit と Lesson は同じ列にまとめる。教科書によって呼び名がちがうだけで、
  //   生徒にとっては同じ単元だから。呼び名を選ばせていた頃は、同じ単元が
  //   U3 と L3 の2列に割れて表が増えた。アプリは "Unit N-M" で統一して送るように
  //   なったが、それ以前の "Lesson N-M" の記録も、ここで同じ列に寄せる。
  var m = s.match(/(?:unit|lesson|ユニット|レッスン)\s*[-.．_]?\s*(\d{1,2})/i)
       || s.match(/(?:^|[^a-z])[ul]\s*[-.．_]?\s*(\d{1,2})/i);
  if (m) return "U" + Number(m[1]);
  return "その他";
}
function jigakuUnitOrder(k){
  if (k === "その他") return 99999;
  var n = Number(String(k).slice(1)) || 0;
  return (k.charAt(0) === "U" ? 0 : 1000) + n;
}
// 「Picture Book」と「picture book.」を同じ語として数えるための正規化。
function jigakuNormWord(w){
  return String(w||"").toLowerCase().trim()
    .replace(/[.,!?;:"'’“”（）()]/g, "").replace(/[-_\/]/g, " ")
    .replace(/\s+/g, " ").trim();
}

function rebuildJigakuUnits(){
  var ss = getSS();
  var lg = ss.getSheetByName(JIGAKU_SHEET);
  if (!lg || lg.getLastRow() < 2) return 0;

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return 0;   // 取れなければ次の送信でやり直す
  try{
    var sm = getSheet(SUMMARY_SHEET, SUMMARY_COLS.map(function(c){return c.head;}));

    var vals = lg.getRange(1,1,lg.getLastRow(), lg.getLastColumn()).getValues();
    var C = {};
    vals[0].forEach(function(h,i){ C[String(h).trim()] = i; });
    var iCls=C["学年"], iNum=C["番号"], iName=C["名前"], iList=C["リスト名"],
        iOk=C["正解数"], iWords=C["クリアした語"], iLane=C["レーン"], iPct=C["正答率(%)"];
    if (iCls == null || iNum == null) return 0;

    var byStudent = {}, unitSet = {}, gramSet = {};
    for (var r=1; r<vals.length; r++){
      var row = vals[r];
      var cls = String(row[iCls]).trim(), num = String(row[iNum]).trim();
      if (!cls || !num) continue;
      var key = cls + " / " + num;
      var st = byStudent[key] || (byStudent[key] = {name:"", units:{}, gram:{}});
      if (iName != null && String(row[iName]).trim()) st.name = String(row[iName]).trim();

      // 単語レーン以外（文法・本文…）は「語の実数」ではなく「その項目の最高正答率」で見る。
      // 単語の語数集計に混ぜると、項目名が「その他」に落ちて数字が汚れる。
      var lane = (iLane == null) ? "" : String(row[iLane]).trim();
      if (lane && lane !== "単語"){
        var g = lane + "_" + (String(iList == null ? "" : row[iList]).trim() || "（項目なし）");
        gramSet[g] = true;
        var pct = toNum(iPct == null ? null : row[iPct]);
        if (pct != null && pct > (st.gram[g] || 0)) st.gram[g] = pct;
        continue;
      }

      var u = jigakuUnitKey(iList == null ? "" : row[iList]);
      unitSet[u] = true;
      var slot = st.units[u] || (st.units[u] = {seen:{}, n:0, fallback:0});
      var words = (iWords == null) ? "" : String(row[iWords]||"");
      if (words){
        words.split(/[,、]/).forEach(function(w){
          var k = jigakuNormWord(w);
          if (k && !slot.seen[k]){ slot.seen[k]=1; slot.n++; }
        });
      } else {
        var ok = toNum(iOk == null ? null : row[iOk]);
        if (ok != null && ok > slot.fallback) slot.fallback = ok;
      }
    }

    var units = Object.keys(unitSet).sort(function(a,b){
      return jigakuUnitOrder(a) - jigakuUnitOrder(b); });
    var grams = Object.keys(gramSet).sort();
    var heads = units.map(function(u){ return "自学_" + u; })
          .concat(grams);
    if (!heads.length) return 0;

    var base = SUMMARY_COLS.length;              // 固定列の右端＝単語_活用
    var need = base + heads.length;
    if (sm.getMaxColumns() < need)
      sm.insertColumnsAfter(sm.getMaxColumns(), need - sm.getMaxColumns());

    // 自学の列だけ一度まっさらにする（ユニットが減ったときの消し忘れ防止）
    var wipe = Math.max(sm.getLastColumn(), need) - base;
    if (wipe > 0) sm.getRange(1, base+1, sm.getMaxRows(), wipe).clearContent();
    sm.getRange(1, base+1, 1, heads.length).setValues([heads]);

    // 成績まとめに行が無い生徒（自学だけやった子）は行を作る
    var lastRow = sm.getLastRow();
    var rowOf = {};
    if (lastRow >= 2)
      sm.getRange(2,2,lastRow-1,2).getValues().forEach(function(p,i){
        rowOf[String(p[0]).trim() + " / " + String(p[1]).trim()] = i+2; });
    Object.keys(byStudent).forEach(function(k){
      if (rowOf[k]) return;
      var p = k.split(" / ");
      var blank = SUMMARY_COLS.map(function(){ return ""; });
      blank[0] = new Date(); blank[1] = p[0]; blank[2] = p[1]; blank[3] = byStudent[k].name || "";
      sm.appendRow(blank);
      rowOf[k] = sm.getLastRow();
    });

    lastRow = sm.getLastRow();
    if (lastRow < 2) return heads.length;
    var ids = sm.getRange(2,2,lastRow-1,2).getValues();
    var out = ids.map(function(p){
      var st = byStudent[String(p[0]).trim() + " / " + String(p[1]).trim()];
      return units.map(function(u){
        if (!st || !st.units[u]) return "";
        var slot = st.units[u];
        return Math.max(slot.n, slot.fallback) || "";
      }).concat(grams.map(function(g){
        return (st && st.gram[g] != null) ? st.gram[g] : "";
      }));
    });
    sm.getRange(2, base+1, out.length, heads.length).setValues(out);
    return heads.length;
  } finally {
    lock.releaseLock();
  }
}

// メニューから手で回すとき用（件数をトーストで返す）
function rebuildJigakuUnitsMenu(){
  var n = 0;
  try{ n = rebuildJigakuUnits(); }
  catch(e){ toastMsg("集計に失敗しました：" + e.message); return; }
  toastMsg(n ? ("ユニット別クリア語数を更新しました（" + n + "ユニット）。")
             : "自学ログにまだ集計できる記録がありません。");
}

/* ===== (B) 成績まとめ：列の定義 ===== *
 * key   … 送信ペイロードのキー
 * head  … スプレッドシートの見出し
 * max   … true なら「これまでの最大値」を保持（記録は下がらない）。
 *          false は毎回「最新の値」で上書き（直近の状態・氏名など）。       */
var SUMMARY_COLS = [
  {key:"_ts",            head:"更新日時",       max:false},
  {key:"cls",            head:"学年",           max:false},
  {key:"num",            head:"番号",           max:false},
  {key:"name",           head:"名前",           max:false},
  // --- 単語（打ち込めた単語数） ---
  {key:"w_all",          head:"単語_合計",      max:true},
  {key:"w_goal",         head:"単語_目標",      max:false},
  {key:"w_basic",        head:"単語_基本編",    max:true},
  {key:"w_ext",          head:"単語_拡張編",    max:true},
  {key:"w_g1",           head:"単語_1年",       max:true},
  {key:"w_g2",           head:"単語_2年",       max:true},
  {key:"w_g3",           head:"単語_3年",       max:true},
  // --- 模試（各回ベスト・100点満点）※見出しは3桁コード。列の位置は従来と同じ（データ無傷） ---
  {key:"m_c2_1",         head:"模試_211",       max:true},
  {key:"m_c2_2",         head:"模試_212",       max:true},
  {key:"m_c2_3",         head:"模試_213",       max:true},
  {key:"m_c3_1",         head:"模試_321",       max:true},
  {key:"m_c3_2",         head:"模試_322",       max:true},
  {key:"m_c3_3",         head:"模試_324",       max:true},   // 旧 中3第3回（chu3_3）＝コード324
  {key:"m_c3_4",         head:"模試_323",       max:true},   // 旧 中3第4回（chu3_4）＝コード323
  {key:"m_best",         head:"模試_最高点",    max:true},
  {key:"m_done",         head:"模試_挑戦回数",  max:true},
  // --- 英検（レベル目安） ---
  {key:"e_full",         head:"英検_本番Lv",    max:true},
  {key:"e_full_label",   head:"英検_目安",      max:false},
  {key:"e_quick",        head:"英検_クイックLv",max:true},
  {key:"e_avg",          head:"英検_平均Lv",    max:false},
  {key:"e_recent_grade", head:"英検_直近級",    max:false},
  {key:"e_recent_pct",   head:"英検_直近正答率",max:false},
  {key:"e_recent_pass",  head:"英検_直近合否",  max:false},
  // 習熟度 単語テスト（80%以上のみ送信＝正式点／挑戦回数）
  {key:"sv_c2",     head:"習熟度単語_中2",          max:true},
  {key:"sv_c2_n",   head:"習熟度単語_中2_回数",      max:true},
  {key:"sv_c3",     head:"習熟度単語_中3第2回",       max:true},
  {key:"sv_c3_n",   head:"習熟度単語_中3第2回_回数",   max:true},
  {key:"sv_c3_3",   head:"習熟度単語_中3第3回",       max:true},
  {key:"sv_c3_3_n", head:"習熟度単語_中3第3回_回数",   max:true},
  // --- 新作模試（★必ず末尾に追加＝途中に挟むと既存データが列ズレするため） ---
  {key:"m_c2_a1",   head:"模試_214",   max:true},
  {key:"m_331",     head:"模試_331",   max:true},
  {key:"m_332",     head:"模試_332",   max:true},
  // --- 岡山県スタイル模試（回ごとのベスト・案B） ---
  {key:"m_ok1",     head:"模試_岡山1",  max:true},
  {key:"m_ok2",     head:"模試_岡山2",  max:true},
  {key:"m_ok3",     head:"模試_岡山3",  max:true},
  {key:"m_ok4",     head:"模試_岡山4",  max:true},
  {key:"m_ok5",     head:"模試_岡山5",  max:true},
  {key:"m_ok6",     head:"模試_岡山6",  max:true},
  {key:"m_ok7",     head:"模試_岡山7",  max:true},
  {key:"m_ok8",     head:"模試_岡山8",  max:true},
  {key:"m_ok9",     head:"模試_岡山9",  max:true},
  {key:"m_ok10",    head:"模試_岡山10", max:true},
  // --- 活用編（動詞の変化形/形容詞の比較・1語形=1点・全600点） ---
  {key:"w_katsuyo", head:"単語_活用",   max:true}
];

/* ===== 単元テスト（先生がゲートを開けた時だけ受験・記録） ===== *
 * ★先生へ：下の TEACHER_PIN を必ず自分だけが知る合言葉に変更してください。
 *   管理ページ（/admin/）でスタート/ストップを押すときに使います。            */
var TEACHER_PIN = "PIN";
var UNIT_SHEET = "単元管理";        // ゲート状態（開/閉・セッション）。先生が見える化用も兼ねる
var UNIT_LOG   = "単元テスト記録";  // 提出を1回ずつ別枠で記録
var JIGAKU_SHEET = "自学ログ";      // 自学マイページ（jigaku/）から1回ごとに追記
// 単元テスト扱いにする試験ID（exam.html?id=… と一致）→ 表示名。複数登録可。
var UNIT_EXAMS = {
  "c2u1": "中2 単元テスト①",
  "c2u2": "中2 単元テスト②",
  "c3u1": "中3 単元テスト①",
  "c3u2": "中3 単元テスト②",
  "c3u3": "中3 単元テスト③",
  "c3u4": "中3 単元テスト④"
};
// デプロイ確認用の版番号。/admin に表示され、新版が反映されたか一目で分かります。
var GAS_VERSION = "jigaku-7";   // ★"jigaku" を含むと自学ログ対応。アプリ側が送信可否の判定に使う
var SETTINGS_SHEET = "設定";   // 学習方針などの保存（A2=項目, B2=値）

function doGet(e){
  return ContentService
    .createTextOutput(JSON.stringify({result:"ok", message:"score_gas alive", ver:GAS_VERSION}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e){
  try{
    var data = {};
    if (e && e.postData && e.postData.contents){
      data = JSON.parse(e.postData.contents);
    }
    if (data.action === "status"){ var st=gateStatus(data.exam); st.ver=GAS_VERSION; return json(st); }
    if (data.action === "gate"){ var gs=setGate(data); gs.ver=GAS_VERSION; return json(gs); }
    if (data.action === "policy")    return json({result:"ok", policy:getPolicy(), ver:GAS_VERSION});
    if (data.action === "setpolicy"){ var ps=setPolicy(data); ps.ver=GAS_VERSION; return json(ps); }
    if (data.action === "buildcorr"){
      if (String(data.pin||"") !== TEACHER_PIN) return json({result:"error", message:"合言葉(PIN)が違います", ver:GAS_VERSION});
      return json({result:"ok", message:buildCorrelationTab(), ver:GAS_VERSION});
    }
    if (data.kind === "unittest") return json(handleUnitTest(data));
    if (data.kind === "jigaku")   return json(handleJigaku(data));
    if (data.kind === "summary"){
      handleSummary(data);
      return json({result:"ok", policy:getPolicy()});   // マイページのコメント用に方針を返す
    }
    // ★未知の kind を英検タブに落とさない。旧版では kind の綴り違いや新機能の先行送信が
    //   「英検テスト履歴」に空行を作っていた。kind 無し＝英検、が従来からの約束。
    if (data.kind) return json({result:"error", message:"未知の kind: "+data.kind, ver:GAS_VERSION});
    handleEiken(data);   // kind 無し＝英検の1回ごと（従来どおり）
    return json({result:"ok"});
  } catch(err){
    return json({result:"error", message:String(err)});
  }
}

function json(obj){
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet(name, header){
  var ss = getSS();
  var sh = ss.getSheetByName(name);
  if (!sh){
    sh = ss.insertSheet(name);
    sh.appendRow(header);
    sh.setFrozenRows(1);
  } else if (sh.getLastRow() === 0){
    sh.appendRow(header);
    sh.setFrozenRows(1);
  }
  // ★重要：列定義を増やした直後、既存タブのグリッド列数がヘッダより少ないと
  //   getRange(1,1,1,header.length) が範囲外例外を投げて全送信が止まる。
  //   （getRange/setValues はグリッドを自動拡張しない。自動拡張は appendRow のみ）
  //   → 足りない分だけ右端に列を自動追加してから返す（足りていれば何もしない）。
  if (sh.getMaxColumns() < header.length)
    sh.insertColumnsAfter(sh.getMaxColumns(), header.length - sh.getMaxColumns());
  return sh;
}

/* ===== (A) 英検：1回ごとに追記 ===== */
function handleEiken(d){
  var header = ["日時","学年","番号","名前","版","級","モード","得点","満点","正答率","合否"];
  var sh = getSheet(EIKEN_SHEET, header);
  sh.getRange(1,1,1,header.length).setValues([header]); // 既存ヘッダ(組→学年)も毎回そろえる
  sh.appendRow([
    new Date(),
    d.cls||"", d.num||"", d.name||"", d.ver||"",
    d.grade||"", d.mode||"",
    numOrBlank(d.score), numOrBlank(d.total), numOrBlank(d.pct),
    d.pass||""
  ]);
}

/* ===== (B) 成績まとめ：1人1行で upsert ===== */
function handleSummary(d){
  d._ts = new Date();
  var header = SUMMARY_COLS.map(function(c){return c.head;});
  var sh = getSheet(SUMMARY_SHEET, header);

  // 既存ヘッダが古い場合に備え、毎回ヘッダを最新定義に整える
  sh.getRange(1,1,1,header.length).setValues([header]);

  var key = String(d.cls||"").trim() + " / " + String(d.num||"").trim();
  var lastRow = sh.getLastRow();
  var rowIndex = -1;
  if (lastRow >= 2){
    // 「学年 / 番号」で既存行を検索（2列＝学年,3列＝番号）
    var ids = sh.getRange(2,2,lastRow-1,2).getValues(); // [学年,番号] × n
    for (var i=0;i<ids.length;i++){
      var k = String(ids[i][0]).trim() + " / " + String(ids[i][1]).trim();
      if (k === key){ rowIndex = i+2; break; }
    }
  }

  var width = SUMMARY_COLS.length;
  if (rowIndex < 0){
    // 新規：そのまま1行追加
    sh.appendRow(buildRow(d, null));
  } else {
    var cur = sh.getRange(rowIndex,1,1,width).getValues()[0];
    sh.getRange(rowIndex,1,1,width).setValues([buildRow(d, cur)]);
  }
}

// d=今回の値, cur=既存行（無ければ null）。列定義に従って1行ぶんの配列を作る。
function buildRow(d, cur){
  return SUMMARY_COLS.map(function(c, idx){
    var incoming = d[c.key];
    var old = cur ? cur[idx] : null;
    if (c.max){
      var ni = toNum(incoming), no = toNum(old);
      if (ni == null) return (no==null? "" : no);   // 今回が空なら従来値を維持
      if (no == null) return ni;
      return Math.max(ni, no);                        // 記録は下げない
    } else {
      // 最新で上書き。ただし今回が空（未入力）なら従来値を残す。
      if (incoming === undefined || incoming === null || incoming === "")
        return (old==null? "" : old);
      return incoming;
    }
  });
}

function toNum(v){
  if (v === null || v === undefined || v === "") return null;
  var n = Number(v);
  return isNaN(n) ? null : n;
}
function numOrBlank(v){ var n=toNum(v); return n==null? "" : n; }

/* ===================== 単元テスト：ゲート制御 ===================== *
 * 単元管理シート列：A=試験ID B=タイトル C=状態(開/閉) D=セッション E=開始時刻 F=提出数 */
function unitSheetEnsured(){
  var sh = getSheet(UNIT_SHEET, ["試験ID","タイトル","状態","セッション","開始時刻","提出数"]);
  var last = sh.getLastRow(), have = {};
  if (last >= 2){
    var v = sh.getRange(2,1,last-1,1).getValues();
    for (var i=0;i<v.length;i++) have[String(v[i][0]).trim()] = true;
  }
  for (var ex in UNIT_EXAMS){ if (!have[ex]) sh.appendRow([ex, UNIT_EXAMS[ex], "閉", "", "", 0]); }
  return sh;
}
function findUnitRow(sh, exam){
  var last = sh.getLastRow(); if (last < 2) return -1;
  var v = sh.getRange(2,1,last-1,1).getValues();
  for (var i=0;i<v.length;i++){ if (String(v[i][0]).trim()===exam) return i+2; }
  return -1;
}
// 状態の読み取り（ポーリング用・書き込みなし）
function gateStatus(exam){
  var title = UNIT_EXAMS[exam] || "";
  if (!exam || !UNIT_EXAMS[exam]) return {result:"ok", open:false, exam:exam||"", title:title, session:""};
  var sh = getSS().getSheetByName(UNIT_SHEET);
  if (!sh) return {result:"ok", open:false, exam:exam, title:title, session:""};
  var r = findUnitRow(sh, exam);
  if (r < 0) return {result:"ok", open:false, exam:exam, title:title, session:""};
  var row = sh.getRange(r,1,1,6).getValues()[0];
  return {result:"ok", open:(String(row[2]).trim()==="開"), exam:exam, title:(row[1]||title),
          session:String(row[3]||""), opened_at:row[4]||"", submissions:Number(row[5])||0};
}
// スタート/ストップ（PIN必須）
function setGate(data){
  if (String(data.pin||"") !== TEACHER_PIN) return {result:"error", message:"合言葉(PIN)が違います"};
  var exam = data.exam;
  if (!exam || !UNIT_EXAMS[exam]) return {result:"error", message:"未知の試験IDです"};
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  try{
    var sh = unitSheetEnsured();
    var r = findUnitRow(sh, exam);
    if (data.open){
      var session = "S" + Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyyMMdd-HHmmss");
      sh.getRange(r,3,1,4).setValues([["開", session, new Date(), 0]]);
      return {result:"ok", open:true, exam:exam, title:UNIT_EXAMS[exam], session:session, submissions:0};
    } else {
      sh.getRange(r,3).setValue("閉");
      return {result:"ok", open:false, exam:exam, title:UNIT_EXAMS[exam], session:String(sh.getRange(r,4).getValue()||"")};
    }
  } finally { lock.releaseLock(); }
}

/* ===================== 単元テスト：提出（開いてる時のみ・1人1回） ===================== */
function handleUnitTest(d){
  var exam = d.exam;
  if (!exam || !UNIT_EXAMS[exam]) return {result:"error", message:"未知の試験IDです"};
  var lock = LockService.getScriptLock(); lock.waitLock(15000);
  try{
    var st = gateStatus(exam);
    if (!st.open) return {result:"locked", message:"いまは受付していません"};
    if (d.session && String(d.session) !== String(st.session))
      return {result:"locked", message:"受付が切り替わりました。もう一度ひらいてね"};
    var session = st.session;
    var log = getSheet(UNIT_LOG, ["提出日時","セッション","試験","学年","番号","名前","得点","満点","正答率(%)","版"]);
    var cls = String(d.cls||"").trim(), num = String(d.num||"").trim();
    if (!cls || !num) return {result:"error", message:"学年と番号を入れてね"};
    // 同一セッション・同一試験で同じ生徒は1回だけ
    var last = log.getLastRow();
    if (last >= 2){
      var rows = log.getRange(2,2,last-1,4).getValues(); // セッション,試験,学年,番号
      for (var i=0;i<rows.length;i++){
        if (String(rows[i][0])===session && String(rows[i][1])===exam &&
            String(rows[i][2]).trim()===cls && String(rows[i][3]).trim()===num){
          return {result:"dup", message:"もう提出ずみです"};
        }
      }
    }
    log.appendRow([ new Date(), session, exam, cls, num, d.name||"",
      numOrBlank(d.score), numOrBlank(d.total), numOrBlank(d.pct), d.ver||"" ]);
    var ush = unitSheetEnsured(), r = findUnitRow(ush, exam);
    if (r > 0){ var c = ush.getRange(r,6); c.setValue((Number(c.getValue())||0)+1); }
    return {result:"ok", message:"提出しました"};
  } finally { lock.releaseLock(); }
}

/* ===================== データのリフレッシュ（先生が手動で1回実行） ===================== *
 * Apps Scriptエディタで関数 refreshData を選んで［実行］すると、
 *  ・各タブの見出しを最新（組→学年）にそろえ直し、
 *  ・古い記録（2A/3A混在など）をすべて消去します。
 * ※消したくない記録があるときは、先にシートを複製してから実行してください。     */
function refreshData(){
  var ss = getSS();
  resetSheet(ss, SUMMARY_SHEET, SUMMARY_COLS.map(function(c){return c.head;}));
  resetSheet(ss, EIKEN_SHEET, ["日時","学年","番号","名前","版","級","モード","得点","満点","正答率","合否"]);
  resetSheet(ss, UNIT_LOG, ["提出日時","セッション","試験","学年","番号","名前","得点","満点","正答率(%)","版"]);
  // 単元管理：すべて「閉」・提出数0にリセット
  var u = ss.getSheetByName(UNIT_SHEET);
  if (u) u.clear();
  u = getSheet(UNIT_SHEET, ["試験ID","タイトル","状態","セッション","開始時刻","提出数"]);
  for (var ex in UNIT_EXAMS) u.appendRow([ex, UNIT_EXAMS[ex], "閉", "", "", 0]);
  return "リフレッシュ完了：見出しを学年にそろえ、古い記録を消去しました。";
}
function resetSheet(ss, name, header){
  var sh = ss.getSheetByName(name) || ss.insertSheet(name);
  sh.clear();
  sh.appendRow(header);
  sh.setFrozenRows(1);
}

/* ===================== 学習方針（マイページのコメント用） ===================== *
 * 「設定」シートの B2 に方針コードを保存。管理ページ(/admin)から設定します。 */
function getPolicy(){
  var sh = getSS().getSheetByName(SETTINGS_SHEET);
  if (!sh) return "";
  return String(sh.getRange("B2").getValue() || "");
}
function setPolicy(data){
  if (String(data.pin||"") !== TEACHER_PIN) return {result:"error", message:"合言葉(PIN)が違います"};
  var sh = getSheet(SETTINGS_SHEET, ["設定項目","値"]);
  sh.getRange("A2").setValue("学習方針");
  sh.getRange("B2").setValue(String(data.policy||""));
  return {result:"ok", policy:String(data.policy||"")};
}

/* ===================== スプレッドシート用ボタン（メニュー） ===================== *
 * シートを開くと上部に「📊 成績ツール」メニューが出ます（このスクリプトがシートに
 * ひも付いている場合）。出ないときは Apps Script エディタで onOpen を1回実行してください。 */
var CLASS_SIZE = { "2": 40, "3": 40 };   // ★各学年の人数（番号の最大）。クラスに合わせて変更してください。

function onOpen(){
  var ui = SpreadsheetApp.getUi();
  var unitMenu = ui.createMenu("📝 単元テスト 未提出者")
    .addItem("中2 単元テスト①", "um_c2u1")
    .addItem("中2 単元テスト②", "um_c2u2")
    .addItem("中3 単元テスト①", "um_c3u1")
    .addItem("中3 単元テスト②", "um_c3u2");
  ui.createMenu("📊 成績ツール")
    .addItem("🔢 学年▶番号で並べかえ", "sortSummary")
    .addSeparator()
    .addItem("🟠 2年 未投稿者（マイページ送信）", "missing2")
    .addItem("🔵 3年 未投稿者（マイページ送信）", "missing3")
    .addSeparator()
    .addItem("🔗 AI×成績 相関タブを作成/更新", "buildCorrelationTab")
    .addItem("🔤 自学ログ▶ユニット別クリア語数を更新", "rebuildJigakuUnitsMenu")
    .addSeparator()
    .addSubMenu(unitMenu)
    .addToUi();
}
function missing2(){ listMissing(2); }
function missing3(){ listMissing(3); }
function um_c2u1(){ listMissingUnit("c2u1"); }
function um_c2u2(){ listMissingUnit("c2u2"); }
function um_c3u1(){ listMissingUnit("c3u1"); }
function um_c3u2(){ listMissingUnit("c3u2"); }

// 成績まとめを 学年(昇順)▶番号(昇順) で並べかえ（番号は数値順）
function sortSummary(){
  var sh = getSS().getSheetByName(SUMMARY_SHEET);
  if (!sh || sh.getLastRow() < 3){ toastMsg("並べかえる成績がまだありません。"); return; }
  var last = sh.getLastRow(), width = sh.getLastColumn();
  var rng = sh.getRange(2, 1, last - 1, width);
  var data = rng.getValues();
  data.sort(function(a, b){
    var ga = sortKey(a[1]), gb = sortKey(b[1]);   // 2列目＝学年
    if (ga !== gb) return ga - gb;
    return sortKey(a[2]) - sortKey(b[2]);          // 3列目＝番号
  });
  rng.setValues(data);
  toastMsg("学年▶番号で並べかえました（" + (last - 1) + "件）。");
}
function sortKey(v){ var n = toNum(v); return (n == null) ? 1e9 : n; }   // 数値以外は末尾へ
function toastMsg(m){ try{ getSS().toast(m, "成績ツール", 4); }catch(e){} }

// 指定学年の未投稿者（成績まとめに番号が無い人）を計算
function computeMissing(grade){
  var g = String(grade);
  var sh = getSS().getSheetByName(SUMMARY_SHEET);
  var sub = {};
  if (sh && sh.getLastRow() >= 2){
    var v = sh.getRange(2, 2, sh.getLastRow() - 1, 2).getValues();   // [学年, 番号]
    for (var i = 0; i < v.length; i++){
      if (String(v[i][0]).trim() === g){ var n = toNum(v[i][1]); if (n != null) sub[n] = true; }
    }
  }
  var maxN = CLASS_SIZE[g] || 40, miss = [];
  for (var k = 1; k <= maxN; k++){ if (!sub[k]) miss.push(k); }
  var cnt = 0; for (var s in sub) cnt++;
  return { grade: g, max: maxN, submitted: cnt, missing: miss };
}
function listMissing(grade){
  var r = computeMissing(grade);
  var ui = SpreadsheetApp.getUi();
  ui.alert(r.grade + "年 未投稿者",
    r.grade + "年（番号 1〜" + r.max + "）\n投稿ずみ：" + r.submitted + "人　／　未投稿：" + r.missing.length + "人\n\n" +
    "未投稿の番号：\n" + (r.missing.length ? r.missing.join(", ") : "なし（全員投稿ずみ！）"),
    ui.ButtonSet.OK);
}

// 単元テストの未提出者（現在＝直近のセッションで、単元テスト記録に番号が無い人）を計算
function computeMissingUnit(examId){
  var title = UNIT_EXAMS[examId] || examId;
  var ush = getSS().getSheetByName(UNIT_SHEET);
  var session = "", state = "";
  if (ush && ush.getLastRow() >= 2){
    var rows = ush.getRange(2, 1, ush.getLastRow() - 1, 4).getValues();   // 試験ID,タイトル,状態,セッション
    for (var i = 0; i < rows.length; i++){
      if (String(rows[i][0]).trim() === examId){ state = String(rows[i][2]); session = String(rows[i][3]); break; }
    }
  }
  var g = examId.charAt(1);   // c2u1→"2", c3u2→"3"
  var sub = {};
  if (session){
    var log = getSS().getSheetByName(UNIT_LOG);
    if (log && log.getLastRow() >= 2){
      var v = log.getRange(2, 2, log.getLastRow() - 1, 4).getValues();   // セッション,試験,学年,番号
      for (var j = 0; j < v.length; j++){
        if (String(v[j][0]) === session && String(v[j][1]) === examId){
          var n = toNum(v[j][3]); if (n != null) sub[n] = true;
        }
      }
    }
  }
  var maxN = CLASS_SIZE[g] || 40, miss = [];
  for (var k = 1; k <= maxN; k++){ if (!sub[k]) miss.push(k); }
  var cnt = 0; for (var s in sub) cnt++;
  return { exam: examId, title: title, grade: g, session: session, state: state,
           max: maxN, submitted: cnt, missing: miss, started: !!session };
}
function listMissingUnit(examId){
  var r = computeMissingUnit(examId);
  var ui = SpreadsheetApp.getUi();
  if (!r.started){ ui.alert(r.title, "この単元テストはまだ一度も開始されていません。", ui.ButtonSet.OK); return; }
  ui.alert(r.title + " 未提出者",
    r.title + "（" + r.grade + "年・番号 1〜" + r.max + "）\n受付状態：" + (r.state === "開" ? "受付中" : "終了") +
    "\nセッション：" + r.session + "\n\n提出ずみ：" + r.submitted + "人　／　未提出：" + r.missing.length + "人\n\n" +
    "未提出の番号：\n" + (r.missing.length ? r.missing.join(", ") : "なし（全員提出ずみ！）"),
    ui.ButtonSet.OK);
}

/* ===================== AI×成績 相関タブ（成績ツールから1クリックで自動生成） ===================== *
 * 「成績まとめ」（1人1行）に、AImodeログ（学年＋番号で集計）を横付けした「相関」シートを作る。
 * 押すたびに最新化。タブ名（確定「AImodeログ」。log_gas の既定 TAB="AIログ" は本番で揃える）に依存せず、
 * 「AI活用レベル(推定)」列の有無で自動検出するので、改名・二重タブでも追従します。手動の数式入力も不要。
 * ※ log_gas とは「学年・番号・レベル座標・AI活用レベル(推定)」の“列見出し名”で受け渡す契約。       */
var CORR_SHEET = "相関";
// 収集タブを列ヘッダで検出（タブ名に非依存）。移行中などで該当タブが複数あるときは、
// データ行が最多のものを採用し、同数なら既知名（AImodeログ→AIログ）を優先＝常に本物を選ぶ。
function findAiLogSheet(ss){
  var shs = ss.getSheets(), best=null, bestScore=-1;
  var PREFER = {"AImodeログ":2, "AIログ":1};
  for (var i=0;i<shs.length;i++){
    var lc = shs[i].getLastColumn(); if (lc < 1) continue;
    var h = shs[i].getRange(1,1,1,lc).getValues()[0], hit=false;
    for (var j=0;j<h.length;j++){ if (String(h[j]).trim() === "AI活用レベル(推定)"){ hit=true; break; } }
    if (!hit) continue;
    var rows  = Math.max(0, shs[i].getLastRow()-1);                     // ヘッダ除くデータ行数
    var score = rows*10 + (PREFER[String(shs[i].getName()).trim()]||0); // 行数優先・同数なら既知名
    if (score > bestScore){ bestScore=score; best=shs[i]; }
  }
  return best;
}
function buildCorrelationTab(){
  var ss = getSS();
  var sum = ss.getSheetByName(SUMMARY_SHEET);
  if (!sum || sum.getLastRow() < 2){ toastMsg("成績まとめにデータがありません。"); return; }

  // 成績まとめ：ヘッダ名→列番号（GAS更新で列が増減してもズレない）
  var sH = sum.getRange(1,1,1,sum.getLastColumn()).getValues()[0];
  var col    = function(name){ for (var i=0;i<sH.length;i++) if (String(sH[i]).trim()===name) return i; return -1; };
  var colPre = function(pre){  for (var i=0;i<sH.length;i++) if (String(sH[i]).indexOf(pre)===0) return i; return -1; };
  var cY=col("学年"), cN=col("番号"), cNm=col("名前"),
      cW=col("単語_合計"), cMo=col("模試_最高点"), cEi=col("英検_平均Lv"), cSh=colPre("習熟度単語_中3");
  var sData = sum.getRange(2,1,sum.getLastRow()-1,sum.getLastColumn()).getValues();

  // AImodeログ：学年|番号 で集計（セッション数・最新レベル座標・最新AI活用レベル・議論+探求回数）
  var ai = findAiLogSheet(ss), agg = {}, aiFound = !!ai;
  if (ai && ai.getLastRow() >= 2){
    var aH = ai.getRange(1,1,1,ai.getLastColumn()).getValues()[0];
    var ac = function(name){ for (var i=0;i<aH.length;i++) if (String(aH[i]).trim()===name) return i; return -1; };
    var aY=ac("学年"), aN=ac("番号"), aLv=ac("レベル座標"), aAI=ac("AI活用レベル(推定)");
    var aData = ai.getRange(2,1,ai.getLastRow()-1,ai.getLastColumn()).getValues();
    for (var r=0;r<aData.length;r++){
      var y=String(aData[r][aY]).trim(), n=String(aData[r][aN]).trim(); if(!y||!n) continue;
      var k=y+"|"+n, o=agg[k]||{s:0,lv:"",ai:"",deep:0};
      o.s++;
      var lv = aLv>=0?aData[r][aLv]:""; if(lv!==""&&lv!=null) o.lv=lv;
      var al = aAI>=0?String(aData[r][aAI]).trim():"";  if(al) o.ai=al;
      if(al==="議論"||al==="探求") o.deep++;
      agg[k]=o;
    }
  }

  // 成績×AImode を結合
  var head=["学年","番号","名前","単語数","模試最高","英検平均Lv","習熟中3","AIセッション","最新レベル座標","最新AI活用Lv","議論+探求回数"];
  var body=[];
  for (var i=0;i<sData.length;i++){
    var row=sData[i], y=String(row[cY]).trim(), n=String(row[cN]).trim(); if(!y||!n) continue;
    var a=agg[y+"|"+n]||{s:0,lv:"",ai:"",deep:0};
    body.push([ row[cY], row[cN], cNm>=0?row[cNm]:"",
      cW>=0?row[cW]:"", cMo>=0?row[cMo]:"", cEi>=0?row[cEi]:"", cSh>=0?row[cSh]:"",
      a.s, a.lv, a.ai, a.deep ]);
  }
  body.sort(function(p,q){ var a=sortKey(p[0]),b=sortKey(q[0]); return a!==b?a-b:sortKey(p[1])-sortKey(q[1]); });

  // 書き込み（押すたび全消し→再生成）
  var sh = ss.getSheetByName(CORR_SHEET) || ss.insertSheet(CORR_SHEET);
  sh.clear();
  var out=[head].concat(body);
  sh.getRange(1,1,out.length,head.length).setValues(out);
  sh.setFrozenRows(1);
  // 相関係数（参考・右側）— データが2人以上そろうと数値が出る
  var last=out.length;
  sh.getRange(1, head.length+2, 4, 2).setValues([
    ["相関係数（参考）",""],
    ["模試最高 × AIセッション",      "=IFERROR(CORREL(E2:E"+last+",H2:H"+last+"),\"データ不足\")"],
    ["英検平均Lv × 最新レベル座標",   "=IFERROR(CORREL(F2:F"+last+",I2:I"+last+"),\"データ不足\")"],
    ["単語数 × AIセッション",        "=IFERROR(CORREL(D2:D"+last+",H2:H"+last+"),\"データ不足\")"]
  ]);
  var msg = "相関タブを更新しました（"+body.length+"人"+(aiFound?"":"／AImodeログ未検出＝AI列は空")+"）";
  try{ ss.toast(msg, "成績ツール", 6); }catch(e){}   // Webアプリ実行時はUIが無いので握りつぶす
  return msg;
}
