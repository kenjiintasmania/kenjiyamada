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

/* ===== (B) 成績まとめ：列の定義 ===== *
 * key   … 送信ペイロードのキー
 * head  … スプレッドシートの見出し
 * max   … true なら「これまでの最大値」を保持（記録は下がらない）。
 *          false は毎回「最新の値」で上書き（直近の状態・氏名など）。       */
var SUMMARY_COLS = [
  {key:"_ts",            head:"更新日時",       max:false},
  {key:"cls",            head:"組",             max:false},
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
  // --- 模試（各回ベスト・100点満点） ---
  {key:"m_c2_1",         head:"模試_中2第1回",  max:true},
  {key:"m_c2_2",         head:"模試_中2第2回",  max:true},
  {key:"m_c2_3",         head:"模試_中2第3回",  max:true},
  {key:"m_c3_1",         head:"模試_中3第1回",  max:true},
  {key:"m_c3_2",         head:"模試_中3第2回",  max:true},
  {key:"m_c3_3",         head:"模試_中3第3回",  max:true},
  {key:"m_c3_4",         head:"模試_中3第4回",  max:true},
  {key:"m_best",         head:"模試_最高点",    max:true},
  {key:"m_done",         head:"模試_挑戦回数",  max:true},
  // --- 英検（レベル目安） ---
  {key:"e_full",         head:"英検_本番Lv",    max:true},
  {key:"e_full_label",   head:"英検_目安",      max:false},
  {key:"e_quick",        head:"英検_クイックLv",max:true},
  {key:"e_avg",          head:"英検_平均Lv",    max:false},
  {key:"e_recent_grade", head:"英検_直近級",    max:false},
  {key:"e_recent_pct",   head:"英検_直近正答率",max:false},
  {key:"e_recent_pass",  head:"英検_直近合否",  max:false}
];

function doGet(e){
  return ContentService
    .createTextOutput(JSON.stringify({result:"ok", message:"score_gas alive"}))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e){
  try{
    var data = {};
    if (e && e.postData && e.postData.contents){
      data = JSON.parse(e.postData.contents);
    }
    if (data.kind === "summary"){
      handleSummary(data);
    } else {
      handleEiken(data);   // kind 無し＝英検の1回ごと（従来どおり）
    }
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
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh){
    sh = ss.insertSheet(name);
    sh.appendRow(header);
    sh.setFrozenRows(1);
  } else if (sh.getLastRow() === 0){
    sh.appendRow(header);
    sh.setFrozenRows(1);
  }
  return sh;
}

/* ===== (A) 英検：1回ごとに追記 ===== */
function handleEiken(d){
  var header = ["日時","組","番号","名前","版","級","モード","得点","満点","正答率","合否"];
  var sh = getSheet(EIKEN_SHEET, header);
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
    // 「組 / 番号」で既存行を検索（2列＝組,3列＝番号）
    var ids = sh.getRange(2,2,lastRow-1,2).getValues(); // [組,番号] × n
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
