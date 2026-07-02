/**
 * log_gas.gs — Phase 1「AI練習メニュー」まとめ送信の受け口（Google Apps Script Web App）
 *
 * ★参照用★ 正(source of truth)は live の Apps Script（アプリ側で管理）。本ファイルは
 *   設計参照で live より古いことがある。GASは再デプロイ＝生徒に即影響・データ収集の要なので、
 *   このファイルの全文上書きで反映しない。
 *   変更手順: ①現行(live)GASを取得 → ②差分(変更行)だけ提案 → ③承認 → ④手動で反映＋再デプロイ。
 *
 * デプロイ手順:
 *   1. script.google.com で新規プロジェクト → このコードを貼る
 *   2. SHEET_ID に保存先スプレッドシートIDを入れる（空ならスクリプト紐づきの新規シート）
 *   3. デプロイ > 新しいデプロイ > 種類=ウェブアプリ / 実行=自分 / アクセス=全員
 *   4. 発行された /exec URL を index.html の LOG_GAS_URL に貼る
 *
 * 収集: タブ「AIログ」に 1送信=1行。
 * 蒸留: distillLevel_() が AI活用レベル(知識/思考/議論/探求) を推定（初期値・要検証）。
 * 注意: 振り返り(8番)の「つらさ用語」検知はここに入れない＝管理スプレッドシート側
 *       （アプリスレッド）で扱う。本GASは学習方略の収集とレベル蒸留まで。
 */
var SHEET_ID = "1x3jpH6zynyl-9Pw14XxvoNpza0N17vsLhKgky5dXNJs";  // ★DATAシートのURLのidに合わせる（要確認。今エディタで動いてる値があればそれを優先）
var TAB      = "AIログ";

var HEADERS = ["時刻","学年","番号","名前","レベル座標",
  "1目的","2モード","3変更","4使えた語/文法","5難しかった","6次回","7評価","8振り返り",
  "AI活用レベル(推定)","raw"];

function doGet(){ return out_({result:"alive", tab:TAB}); }   // ブラウザで /exec を開くと alive 表示＝到達&公開OK

// ★最初に1回、エディタで setup を選んで実行★ → 権限承認 + SHEET_ID確認 + AIログタブ作成。
// 実行ログに "ok: <ブック名> / <タブ名>" が出れば成功。エラーが出たら SHEET_ID か権限の問題。
function setup(){
  var sh = sheet_();
  if(sh.getLastRow() === 0) sh.appendRow(HEADERS);
  var msg = "ok: " + sh.getParent().getName() + " / " + sh.getName();
  Logger.log(msg);
  return msg;
}

function doPost(e){
  try{
    // フォーム送信(e.parameter.payload) と 生POST(e.postData.contents) の両対応
    var body = (e && e.parameter && e.parameter.payload) ? e.parameter.payload
             : (e && e.postData ? e.postData.contents : "{}");
    var p = JSON.parse(body);
    if(p.kind !== "ai_log") return out_({result:"ignored"});
    var sh = sheet_();
    if(sh.getLastRow() === 0) sh.appendRow(HEADERS);
    var f = parseLog_(p.raw || "");
    sh.appendRow([
      new Date(), p.cls||"", p.num||"", p.name||"", (p.level===0?0:(p.level||"")),
      f[1],f[2],f[3],f[4],f[5],f[6],f[7],f[8],
      distillLevel_(f),
      p.raw||""
    ]);
    return out_({result:"ok"});
  }catch(err){ return out_({result:"error", message:String(err)}); }
}

function sheet_(){
  var ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  if(!ss) throw new Error("no spreadsheet (set SHEET_ID)");
  return ss.getSheetByName(TAB) || ss.insertSheet(TAB);
}

// 全角→半角の正規化（正規表現に全角文字を書かない＝コピペ安全）。
// 全角数字→半角、全角ピリオド(．)→".", 全角スラッシュ(／)→" "
function normalize_(t){
  var r="", i, c;
  for(i=0;i<t.length;i++){
    c = t.charCodeAt(i);
    if(c>=0xFF10 && c<=0xFF19) r += String.fromCharCode(c-0xFEE0);
    else if(c===0xFF0E) r += ".";
    else if(c===0xFF0F) r += " ";
    else if(c===0xFF1A) r += ":";   // 全角コロン：→ :
    else r += t.charAt(i);
  }
  return r;
}
// 8項目を「ラベル」で分解（番号 "N." はコピー時に消えることがある＝ラベル基準が安全）。
// AI が出す見出し語を前から順に探し、その間を中身とする。
var LABELS_ = ["今日の目的","使ったモード","途中で変えたモード","使えた単語","難しかった","次回やること","AI活用レベル","今日の振り返り"];
// 連続する空白類を半角スペース1つに圧縮＋前後除去（正規表現なし＝コピペ安全）
function clean_(v){
  v = String(v);
  var buf="", prevSp=false, started=false, i, c, isSp;
  for(i=0;i<v.length;i++){
    c = v.charCodeAt(i);
    isSp = (c===32||c===9||c===10||c===13||c===0x3000);
    if(isSp){ prevSp=true; }
    else { if(prevSp && started) buf += " "; buf += v.charAt(i); prevSp=false; started=true; }
  }
  return buf;
}
function parseLog_(raw){
  var t = normalize_(String(raw));
  var pos=[], from=0, i, idx;
  for(i=0;i<8;i++){
    idx = t.indexOf(LABELS_[i], from);
    pos.push(idx);
    if(idx>=0) from = idx + LABELS_[i].length;
  }
  var o={}, n, s, e, k, seg, ci, v;
  for(n=1;n<=8;n++){
    s = pos[n-1];
    if(s<0){ o[n]=""; continue; }
    e = t.length;
    for(k=n;k<8;k++){ if(pos[k]>=0){ e=pos[k]; break; } }
    seg = t.substring(s, e);
    ci = seg.indexOf(":");                    // normalize_ で全角：も : 済み
    v = (ci>=0 ? seg.substring(ci+1) : seg.substring(LABELS_[n-1].length));
    v = clean_(v);
    o[n] = v.length>500 ? v.substring(0,500) : v;
  }
  return o;
}

// 蒸留（初期値・要検証）: 使ったモード(2)＋評価(7) の語/★から AI活用レベルを推定。
// ※ 評価(7)は対話末にAIが生成（生徒の自己申告ではない）。
// ※ criterion validity（英検合否/テスト点の伸びの予測）で確かめるまで「レベル」と確定しない。
var LV_ORDER_ = ["知識","思考","議論","探求"];
function lvIdx_(s){ for(var i=0;i<LV_ORDER_.length;i++){ if(s===LV_ORDER_[i]) return i; } return -1; }

// 評価(7)の★を読む：各レベルの直後の★(U+2605)を数え、最も★が多いレベルを返す（同数は上位）。
// 3段階(★★☆)でも5段階(★★★★★)でも相対比較なので尺度に依存しない。正規表現は使わない（コピペ安全）。
function countStars_(s, start){
  var i=start, c, n=0, started=false;
  while(i<s.length){ c=s.charCodeAt(i); if(c===32||c===0x3000||c===0xFF1A||c===58){ i++; } else break; } // 先頭の空白/コロンを飛ばす
  while(i<s.length){ c=s.charCodeAt(i);
    if(c===0x2605){ n++; started=true; i++; }   // ★ = 達成
    else if(c===0x2606){ started=true; i++; }    // ☆ = 評価枠（未達）
    else break;
  }
  return started ? n : -1;   // -1 = ★評価が見当たらない
}
function starLevel_(s7){
  s7=String(s7||"");
  var best="", bestN=0, i, lab, idx, n;
  for(i=0;i<LV_ORDER_.length;i++){
    lab=LV_ORDER_[i]; idx=s7.indexOf(lab);
    if(i===3 && idx<0){ lab="探究"; idx=s7.indexOf(lab); }   // 「探究」(究) の表記ゆれ
    if(idx<0) continue;
    n=countStars_(s7, idx+lab.length);
    if(n>=1 && n>=bestN){ bestN=n; best=LV_ORDER_[i]; }      // 同数は上位レベル優先（昇順走査で後勝ち）
  }
  return best;
}
function distillLevel_(f){
  function modeToLevel(s){
    s=String(s||"");
    if(s.indexOf("フリーパス")>=0) return "探求";   // FPは最上位＝探求扱い
    if(s.indexOf("探究")>=0)       return "探求";   // 「探究」(究) の表記ゆれ
    for(var i=LV_ORDER_.length-1;i>=0;i--){ if(s.indexOf(LV_ORDER_[i])>=0) return LV_ORDER_[i]; }
    return "";
  }
  // 一次：使ったモード(2)＋途中で変えたモード(3) のうち上位（モード起点）
  var best="", cands=[modeToLevel(f[2]), modeToLevel(f[3])];
  cands.forEach(function(l){ if(l && lvIdx_(l)>lvIdx_(best)) best=l; });
  // 二次：評価(7)の★が示す到達レベルが上なら引き上げる（モード名≠到達レベルの補正）
  var sl=starLevel_(f[7]);
  if(sl && lvIdx_(sl)>lvIdx_(best)) best=sl;
  if(best) return best;
  // フォールバック：自由文（旧データ等）向けキーワード
  var s=((f[2]||"")+" "+(f[7]||"")).toLowerCase();
  function has_(a){ for(var i=0;i<a.length;i++){ if(s.indexOf(a[i])>=0) return true; } return false; }
  if(has_(["探求","探究","inquiry","仮説","問いを立て","調査"])) return "探求";
  if(has_(["議論","debate","反論","立場","根拠","賛成","反対"])) return "議論";
  if(has_(["思考","なぜ","説明","ヒント","自分で直","並べ替","英作文"])) return "思考";
  if(has_(["知識","暗記","覚え","出題","単語","文法"])) return "知識";
  return "";
}

function out_(o){
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
