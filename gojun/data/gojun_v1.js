/* gojun/data/gojun_v1.js ─ 語順文法テストの教材
   ★既定の枠は7つ：主語／助動詞＝／動詞／目的語／その他／場所／時間
     「助動詞／＝」の箱には、can・will・have のような助動詞と、be動詞（＝の役割）の
     両方が入る。進行形の am/was、受け身の is/was はここ。＝ は先生の図形分析法の記号。
   ★比較級・It for to・関係代名詞は、この7枠では測れない。項目ごとに slots を持てる
     ようにして、それぞれ専用の枠を出す（枠がちがっても、左から読むと英文になるのは同じ）。
     英語の語順「だれが → する → なにを → どのように → どこで → いつ」を、
     箱に入れる形で身につけさせる。空欄になる箱は「—」で見せる（使わない箱を
     見せないと、枠そのものが覚えられないため）。

   ★1文＝完答で1点。5文で5点。
   ★えらぶモードの選択肢は、この項目の5文の答えから自動で作る（＋extra）。
     項目ごとに作るので、現在形の項目に過去形がまざるようなことが起きない。

   ⚠ already / just / never は「have already finished」のように助動詞と動詞の
     あいだに入るので、この7枠には乗らない。時間の箱に入れると誤った語順を
     教えてしまうため、教材には入れていない（for 〜 / twice / since 〜 は文末なのでOK）。 */
window.GOJUN = {
ver: "v1",
slots: [
  {k:"S",  label:"主語",   q:"だれが"},
  {k:"AUX",label:"助動詞／＝", q:"＝ は be動詞"},
  {k:"V",  label:"動詞",   q:"する"},
  {k:"O",  label:"目的語", q:"なにを"},
  {k:"M",  label:"その他", q:"どのように"},
  {k:"PL", label:"場所",   q:"どこで"},
  {k:"T",  label:"時間",   q:"いつ"}
],
items: [

/* ===== ① 一般動詞（現在形） ===== */
{ key:"ippan_now", group:"base", title:"一般動詞（現在形）", emoji:"🔤",
  lead:"「助動詞／＝」の箱は空になります。主語が he / she のときは動詞に s がつくところが山場です。",
  extra:{ V:["play","read","study","eats","runs"], M:["slowly","carefully"], T:["every night"] },
  sents:[
  { ja:"わたしは 毎日 家で 熱心に 英語を 勉強する。", en:"I study English hard at home every day.",
    fill:{S:{ja:"わたしは",en:"I"}, AUX:{ja:"（なし）",en:""}, V:{ja:"勉強する",en:"study"},
          O:{ja:"英語を",en:"English"}, M:{ja:"熱心に",en:"hard"},
          PL:{ja:"家で",en:"at home"}, T:{ja:"毎日",en:"every day"}} },
  { ja:"彼は 毎週土曜日に 公園で 上手に サッカーを する。", en:"He plays soccer well in the park every Saturday.",
    fill:{S:{ja:"彼は",en:"He"}, AUX:{ja:"（なし）",en:""}, V:{ja:"する",en:"plays"},
          O:{ja:"サッカーを",en:"soccer"}, M:{ja:"上手に",en:"well"},
          PL:{ja:"公園で",en:"in the park"}, T:{ja:"毎週土曜日に",en:"every Saturday"}} },
  { ja:"わたしたちは 毎日 教室で いっしょに 昼食を 食べる。", en:"We eat lunch together in our classroom every day.",
    fill:{S:{ja:"わたしたちは",en:"We"}, AUX:{ja:"（なし）",en:""}, V:{ja:"食べる",en:"eat"},
          O:{ja:"昼食を",en:"lunch"}, M:{ja:"いっしょに",en:"together"},
          PL:{ja:"教室で",en:"in our classroom"}, T:{ja:"毎日",en:"every day"}} },
  { ja:"彼女は 放課後に 図書館で 静かに 本を 読む。", en:"She reads books quietly in the library after school.",
    fill:{S:{ja:"彼女は",en:"She"}, AUX:{ja:"（なし）",en:""}, V:{ja:"読む",en:"reads"},
          O:{ja:"本を",en:"books"}, M:{ja:"静かに",en:"quietly"},
          PL:{ja:"図書館で",en:"in the library"}, T:{ja:"放課後に",en:"after school"}} },
  { ja:"彼らは 朝に 川のそばを 速く 走る。", en:"They run fast by the river in the morning.",
    fill:{S:{ja:"彼らは",en:"They"}, AUX:{ja:"（なし）",en:""}, V:{ja:"走る",en:"run"},
          O:{ja:"（なし）",en:""}, M:{ja:"速く",en:"fast"},
          PL:{ja:"川のそばを",en:"by the river"}, T:{ja:"朝に",en:"in the morning"}} } ] },

/* ===== ② 助動詞 can ===== */
{ key:"can", group:"base", title:"助動詞 can", emoji:"💪",
  lead:"「助動詞／＝」の箱に can が入ります。can のうしろの動詞は、s も ed もつかない形（原形）です。",
  extra:{ AUX:["will","must","should"], V:["plays","played","seeing","swims"], M:["hard","slowly"] },
  sents:[
  { ja:"わたしは 毎回 スタジアムで うまく サッカーを することが できる。", en:"I can play soccer well at the stadium every time.",
    fill:{S:{ja:"わたしは",en:"I"}, AUX:{ja:"できる",en:"can"}, V:{ja:"することが",en:"play"},
          O:{ja:"サッカーを",en:"soccer"}, M:{ja:"うまく",en:"well"},
          PL:{ja:"スタジアムで",en:"at the stadium"}, T:{ja:"毎回",en:"every time"}} },
  { ja:"あなたは 今日 この部屋で この本を 読むことが できる。", en:"You can read this book in this room today.",
    fill:{S:{ja:"あなたは",en:"You"}, AUX:{ja:"できる",en:"can"}, V:{ja:"読むことが",en:"read"},
          O:{ja:"この本を",en:"this book"}, M:{ja:"（なし）",en:""},
          PL:{ja:"この部屋で",en:"in this room"}, T:{ja:"今日",en:"today"}} },
  { ja:"彼は 上手に ギターを ひくことが できる。", en:"He can play the guitar well.",
    fill:{S:{ja:"彼は",en:"He"}, AUX:{ja:"できる",en:"can"}, V:{ja:"ひくことが",en:"play"},
          O:{ja:"ギターを",en:"the guitar"}, M:{ja:"上手に",en:"well"},
          PL:{ja:"（なし）",en:""}, T:{ja:"（なし）",en:""}} },
  { ja:"わたしたちは 今夜 屋上から はっきりと 星を 見ることが できる。", en:"We can see the stars clearly from the roof tonight.",
    fill:{S:{ja:"わたしたちは",en:"We"}, AUX:{ja:"できる",en:"can"}, V:{ja:"見ることが",en:"see"},
          O:{ja:"星を",en:"the stars"}, M:{ja:"はっきりと",en:"clearly"},
          PL:{ja:"屋上から",en:"from the roof"}, T:{ja:"今夜",en:"tonight"}} },
  { ja:"彼女は 速く 泳ぐことが できる。", en:"She can swim fast.",
    fill:{S:{ja:"彼女は",en:"She"}, AUX:{ja:"できる",en:"can"}, V:{ja:"泳ぐことが",en:"swim"},
          O:{ja:"（なし）",en:""}, M:{ja:"速く",en:"fast"},
          PL:{ja:"（なし）",en:""}, T:{ja:"（なし）",en:""}} } ] },

/* ===== ③ 過去形 ===== */
{ key:"kako", group:"base", title:"過去形", emoji:"⏪",
  lead:"「助動詞／＝」の箱は空。動詞の箱が過去形になります。時間の箱に yesterday や last 〜 が入ります。",
  extra:{ V:["study","sing","make","come","clean"], T:["yesterday","last month","two days ago"] },
  sents:[
  { ja:"わたしは 昨日 図書館で 熱心に 英語を 勉強した。", en:"I studied English hard in the library yesterday.",
    fill:{S:{ja:"わたしは",en:"I"}, AUX:{ja:"（なし）",en:""}, V:{ja:"勉強した",en:"studied"},
          O:{ja:"英語を",en:"English"}, M:{ja:"熱心に",en:"hard"},
          PL:{ja:"図書館で",en:"in the library"}, T:{ja:"昨日",en:"yesterday"}} },
  { ja:"彼は 先週 公園で 楽しそうに 歌を 歌った。", en:"He sang a song happily in the park last week.",
    fill:{S:{ja:"彼は",en:"He"}, AUX:{ja:"（なし）",en:""}, V:{ja:"歌った",en:"sang"},
          O:{ja:"歌を",en:"a song"}, M:{ja:"楽しそうに",en:"happily"},
          PL:{ja:"公園で",en:"in the park"}, T:{ja:"先週",en:"last week"}} },
  { ja:"わたしたちは 昨夜 家で いっしょに 夕食を 作った。", en:"We made dinner together at home last night.",
    fill:{S:{ja:"わたしたちは",en:"We"}, AUX:{ja:"（なし）",en:""}, V:{ja:"作った",en:"made"},
          O:{ja:"夕食を",en:"dinner"}, M:{ja:"いっしょに",en:"together"},
          PL:{ja:"家で",en:"at home"}, T:{ja:"昨夜",en:"last night"}} },
  { ja:"彼女は 2年前に この町に 来た。", en:"She came to this town two years ago.",
    fill:{S:{ja:"彼女は",en:"She"}, AUX:{ja:"（なし）",en:""}, V:{ja:"来た",en:"came"},
          O:{ja:"（なし）",en:""}, M:{ja:"（なし）",en:""},
          PL:{ja:"この町に",en:"to this town"}, T:{ja:"2年前に",en:"two years ago"}} },
  { ja:"彼らは 放課後 教室を そうじした。", en:"They cleaned the classroom after school.",
    fill:{S:{ja:"彼らは",en:"They"}, AUX:{ja:"（なし）",en:""}, V:{ja:"そうじした",en:"cleaned"},
          O:{ja:"教室を",en:"the classroom"}, M:{ja:"（なし）",en:""},
          PL:{ja:"（なし）",en:""}, T:{ja:"放課後",en:"after school"}} } ] },

/* ===== ④ 現在進行形 ===== */
{ key:"shinkou", group:"base", title:"現在進行形", emoji:"🏃",
  lead:"「助動詞／＝」の箱に am / is / are（＝ の役割）、動詞の箱に 〜ing が入ります。主語で am・is・are を選び分けます。",
  extra:{ AUX:["am","is","are","was","were"], V:["read","make","play","study","practice"],
          T:["then","last night","every day","yesterday"] },
  sents:[
  { ja:"わたしは 今 自分の部屋で 静かに 本を 読んでいる。", en:"I am reading a book quietly in my room now.",
    fill:{S:{ja:"わたしは",en:"I"}, AUX:{ja:"〜している",en:"am"}, V:{ja:"読んで",en:"reading"},
          O:{ja:"本を",en:"a book"}, M:{ja:"静かに",en:"quietly"},
          PL:{ja:"自分の部屋で",en:"in my room"}, T:{ja:"今",en:"now"}} },
  { ja:"彼は 今 台所で 夕食を 作っている。", en:"He is making dinner in the kitchen now.",
    fill:{S:{ja:"彼は",en:"He"}, AUX:{ja:"〜している",en:"is"}, V:{ja:"作って",en:"making"},
          O:{ja:"夕食を",en:"dinner"}, M:{ja:"（なし）",en:""},
          PL:{ja:"台所で",en:"in the kitchen"}, T:{ja:"今",en:"now"}} },
  { ja:"わたしたちは 今 校庭で いっしょに サッカーを している。", en:"We are playing soccer together in the schoolyard now.",
    fill:{S:{ja:"わたしたちは",en:"We"}, AUX:{ja:"〜している",en:"are"}, V:{ja:"して",en:"playing"},
          O:{ja:"サッカーを",en:"soccer"}, M:{ja:"いっしょに",en:"together"},
          PL:{ja:"校庭で",en:"in the schoolyard"}, T:{ja:"今",en:"now"}} },
  { ja:"彼女は 今 図書館で 英語を 勉強している。", en:"She is studying English in the library now.",
    fill:{S:{ja:"彼女は",en:"She"}, AUX:{ja:"〜している",en:"is"}, V:{ja:"勉強して",en:"studying"},
          O:{ja:"英語を",en:"English"}, M:{ja:"（なし）",en:""},
          PL:{ja:"図書館で",en:"in the library"}, T:{ja:"今",en:"now"}} },
  { ja:"彼らは 今 体育館で 熱心に 練習している。", en:"They are practicing hard in the gym now.",
    fill:{S:{ja:"彼らは",en:"They"}, AUX:{ja:"〜している",en:"are"}, V:{ja:"練習して",en:"practicing"},
          O:{ja:"（なし）",en:""}, M:{ja:"熱心に",en:"hard"},
          PL:{ja:"体育館で",en:"in the gym"}, T:{ja:"今",en:"now"}} } ] },

/* ===== ⑤ 未来 will ===== */
{ key:"will", group:"base", title:"未来 will", emoji:"🔮",
  lead:"「助動詞／＝」の箱に will。can と同じで、うしろの動詞は原形です。時間の箱に tomorrow や next 〜 が入ります。",
  extra:{ AUX:["can","must","is","are"], V:["studied","visited","cleans","gets up"], T:["next year","this evening"],
          PL:["at home","in the park","at school"] },
  sents:[
  { ja:"わたしは 明日 図書館で 英語を 勉強するつもりだ。", en:"I will study English in the library tomorrow.",
    fill:{S:{ja:"わたしは",en:"I"}, AUX:{ja:"〜するつもりだ",en:"will"}, V:{ja:"勉強する",en:"study"},
          O:{ja:"英語を",en:"English"}, M:{ja:"（なし）",en:""},
          PL:{ja:"図書館で",en:"in the library"}, T:{ja:"明日",en:"tomorrow"}} },
  { ja:"彼は 来週 東京を 訪れるだろう。", en:"He will visit Tokyo next week.",
    fill:{S:{ja:"彼は",en:"He"}, AUX:{ja:"〜だろう",en:"will"}, V:{ja:"訪れる",en:"visit"},
          O:{ja:"東京を",en:"Tokyo"}, M:{ja:"（なし）",en:""},
          PL:{ja:"（なし）",en:""}, T:{ja:"来週",en:"next week"}} },
  { ja:"わたしたちは 来月 いっしょに この公園を そうじするつもりだ。", en:"We will clean this park together next month.",
    fill:{S:{ja:"わたしたちは",en:"We"}, AUX:{ja:"〜するつもりだ",en:"will"}, V:{ja:"そうじする",en:"clean"},
          O:{ja:"この公園を",en:"this park"}, M:{ja:"いっしょに",en:"together"},
          PL:{ja:"（なし）",en:""}, T:{ja:"来月",en:"next month"}} },
  { ja:"彼女は 明日の朝 早く 起きるだろう。", en:"She will get up early tomorrow morning.",
    fill:{S:{ja:"彼女は",en:"She"}, AUX:{ja:"〜だろう",en:"will"}, V:{ja:"起きる",en:"get up"},
          O:{ja:"（なし）",en:""}, M:{ja:"早く",en:"early"},
          PL:{ja:"（なし）",en:""}, T:{ja:"明日の朝",en:"tomorrow morning"}} },
  { ja:"彼らは 今夜 体育館で 熱心に 練習するだろう。", en:"They will practice hard in the gym tonight.",
    fill:{S:{ja:"彼らは",en:"They"}, AUX:{ja:"〜だろう",en:"will"}, V:{ja:"練習する",en:"practice"},
          O:{ja:"（なし）",en:""}, M:{ja:"熱心に",en:"hard"},
          PL:{ja:"体育館で",en:"in the gym"}, T:{ja:"今夜",en:"tonight"}} } ] },

/* ===== ⑥ 現在完了 ===== */
{ key:"kanryo", group:"base", title:"現在完了", emoji:"⏳",
  lead:"「助動詞／＝」の箱に have / has、動詞の箱に過去分詞。時間の箱に for 〜・since 〜・twice などが入ります。",
  extra:{ AUX:["have","has","had","am","is"], V:["live","visit","read","study","practice"],
          T:["for two years","since 2020","three times"],
          M:["together","well","quietly","fast"] },
  sents:[
  { ja:"わたしは 3年間 この町に 住んでいる。", en:"I have lived in this town for three years.",
    fill:{S:{ja:"わたしは",en:"I"}, AUX:{ja:"〜している",en:"have"}, V:{ja:"住んで",en:"lived"},
          O:{ja:"（なし）",en:""}, M:{ja:"（なし）",en:""},
          PL:{ja:"この町に",en:"in this town"}, T:{ja:"3年間",en:"for three years"}} },
  { ja:"彼は 2回 京都を 訪れたことが ある。", en:"He has visited Kyoto twice.",
    fill:{S:{ja:"彼は",en:"He"}, AUX:{ja:"〜たことがある",en:"has"}, V:{ja:"訪れ",en:"visited"},
          O:{ja:"京都を",en:"Kyoto"}, M:{ja:"（なし）",en:""},
          PL:{ja:"（なし）",en:""}, T:{ja:"2回",en:"twice"}} },
  { ja:"わたしたちは 図書館で 何度も この本を 読んだことが ある。", en:"We have read this book in the library many times.",
    fill:{S:{ja:"わたしたちは",en:"We"}, AUX:{ja:"〜たことがある",en:"have"}, V:{ja:"読んだ",en:"read"},
          O:{ja:"この本を",en:"this book"}, M:{ja:"（なし）",en:""},
          PL:{ja:"図書館で",en:"in the library"}, T:{ja:"何度も",en:"many times"}} },
  { ja:"彼女は 昨年から 英語を 勉強している。", en:"She has studied English since last year.",
    fill:{S:{ja:"彼女は",en:"She"}, AUX:{ja:"〜している",en:"has"}, V:{ja:"勉強して",en:"studied"},
          O:{ja:"英語を",en:"English"}, M:{ja:"（なし）",en:""},
          PL:{ja:"（なし）",en:""}, T:{ja:"昨年から",en:"since last year"}} },
  { ja:"彼らは 2時間 体育館で 熱心に 練習している。", en:"They have practiced hard in the gym for two hours.",
    fill:{S:{ja:"彼らは",en:"They"}, AUX:{ja:"〜している",en:"have"}, V:{ja:"練習して",en:"practiced"},
          O:{ja:"（なし）",en:""}, M:{ja:"熱心に",en:"hard"},
          PL:{ja:"体育館で",en:"in the gym"}, T:{ja:"2時間",en:"for two hours"}} } ] },

/* ===== ⑦ 過去進行形 ===== */
{ key:"kako_shinkou", group:"base", title:"過去進行形", emoji:"🕰️",
  lead:"「助動詞／＝」の箱に was / were が入ります（＝ の役割）。動詞の箱は 〜ing のまま。",
  extra:{ AUX:["am","is","are","will","have"], V:["read","make","play","study","practice"],
          T:["last night","yesterday morning"] },
  sents:[
  { ja:"わたしは そのとき 自分の部屋で 静かに 本を 読んでいた。", en:"I was reading a book quietly in my room then.",
    fill:{S:{ja:"わたしは",en:"I"}, AUX:{ja:"〜していた（＝）",en:"was"}, V:{ja:"読んで",en:"reading"},
          O:{ja:"本を",en:"a book"}, M:{ja:"静かに",en:"quietly"},
          PL:{ja:"自分の部屋で",en:"in my room"}, T:{ja:"そのとき",en:"then"}} },
  { ja:"彼は 昨夜 台所で 夕食を 作っていた。", en:"He was making dinner in the kitchen last night.",
    fill:{S:{ja:"彼は",en:"He"}, AUX:{ja:"〜していた（＝）",en:"was"}, V:{ja:"作って",en:"making"},
          O:{ja:"夕食を",en:"dinner"}, M:{ja:"（なし）",en:""},
          PL:{ja:"台所で",en:"in the kitchen"}, T:{ja:"昨夜",en:"last night"}} },
  { ja:"わたしたちは そのとき 校庭で いっしょに サッカーを していた。", en:"We were playing soccer together in the schoolyard then.",
    fill:{S:{ja:"わたしたちは",en:"We"}, AUX:{ja:"〜していた（＝）",en:"were"}, V:{ja:"して",en:"playing"},
          O:{ja:"サッカーを",en:"soccer"}, M:{ja:"いっしょに",en:"together"},
          PL:{ja:"校庭で",en:"in the schoolyard"}, T:{ja:"そのとき",en:"then"}} },
  { ja:"彼女は 昨日の朝 図書館で 英語を 勉強していた。", en:"She was studying English in the library yesterday morning.",
    fill:{S:{ja:"彼女は",en:"She"}, AUX:{ja:"〜していた（＝）",en:"was"}, V:{ja:"勉強して",en:"studying"},
          O:{ja:"英語を",en:"English"}, M:{ja:"（なし）",en:""},
          PL:{ja:"図書館で",en:"in the library"}, T:{ja:"昨日の朝",en:"yesterday morning"}} },
  { ja:"彼らは そのとき 体育館で 熱心に 練習していた。", en:"They were practicing hard in the gym then.",
    fill:{S:{ja:"彼らは",en:"They"}, AUX:{ja:"〜していた（＝）",en:"were"}, V:{ja:"練習して",en:"practicing"},
          O:{ja:"（なし）",en:""}, M:{ja:"熱心に",en:"hard"},
          PL:{ja:"体育館で",en:"in the gym"}, T:{ja:"そのとき",en:"then"}} } ] },

/* ===== ⑧ 受け身 ===== */
{ key:"ukemi", group:"base", title:"受け身", emoji:"📥",
  lead:"「助動詞／＝」の箱に is / are / was / were（＝ の役割）。動詞の箱は過去分詞。"+
       "「〜によって」は by 〜 で『その他』の箱に入ります。",
  extra:{ AUX:["am","is","are","was","were"], V:["write","clean","sing","build","wrote","cleaned"],
          M:["by my mother","by many students"],
          PL:["at school","in the park","in Japan"] },
  sents:[
  { ja:"この手紙は 先週 父によって 書かれた。", en:"This letter was written by my father last week.",
    fill:{S:{ja:"この手紙は",en:"This letter"}, AUX:{ja:"〜された（＝）",en:"was"}, V:{ja:"書か",en:"written"},
          O:{ja:"（なし）",en:""}, M:{ja:"父によって",en:"by my father"},
          PL:{ja:"（なし）",en:""}, T:{ja:"先週",en:"last week"}} },
  { ja:"その部屋は 毎日 生徒たちによって そうじされる。", en:"The room is cleaned by the students every day.",
    fill:{S:{ja:"その部屋は",en:"The room"}, AUX:{ja:"〜される（＝）",en:"is"}, V:{ja:"そうじさ",en:"cleaned"},
          O:{ja:"（なし）",en:""}, M:{ja:"生徒たちによって",en:"by the students"},
          PL:{ja:"（なし）",en:""}, T:{ja:"毎日",en:"every day"}} },
  { ja:"これらの本は 世界中で 多くの人に 読まれている。", en:"These books are read by many people all over the world.",
    fill:{S:{ja:"これらの本は",en:"These books"}, AUX:{ja:"〜れている（＝）",en:"are"}, V:{ja:"読ま",en:"read"},
          O:{ja:"（なし）",en:""}, M:{ja:"多くの人に",en:"by many people"},
          PL:{ja:"世界中で",en:"all over the world"}, T:{ja:"（なし）",en:""}} },
  { ja:"その歌は 昨年 若い歌手によって 歌われた。", en:"The song was sung by a young singer last year.",
    fill:{S:{ja:"その歌は",en:"The song"}, AUX:{ja:"〜された（＝）",en:"was"}, V:{ja:"歌わ",en:"sung"},
          O:{ja:"（なし）",en:""}, M:{ja:"若い歌手によって",en:"by a young singer"},
          PL:{ja:"（なし）",en:""}, T:{ja:"昨年",en:"last year"}} },
  { ja:"わたしたちの学校は 50年前に この町に 建てられた。", en:"Our school was built in this town fifty years ago.",
    fill:{S:{ja:"わたしたちの学校は",en:"Our school"}, AUX:{ja:"〜られた（＝）",en:"was"}, V:{ja:"建て",en:"built"},
          O:{ja:"（なし）",en:""}, M:{ja:"（なし）",en:""},
          PL:{ja:"この町に",en:"in this town"}, T:{ja:"50年前に",en:"fifty years ago"}} } ] },

/* ============================================================
   ここから下は「7つの箱では測れない」文法。項目ごとに専用の枠を持つ。
   枠がちがっても、左から読むと英文になるのは同じ。
   ============================================================ */

/* ===== ⑨ 比較級・最上級 ===== */
{ key:"hikaku", group:"other", title:"比較級・最上級", emoji:"📏",
  lead:"7つの箱では測れないので専用の枠です。くらべる中身と、くらべる相手を分けて置きます。",
  slots:[
    {k:"S",  label:"主語",     q:"だれが・なにが"},
    {k:"BE", label:"助動詞／＝", q:"＝ は be動詞"},
    {k:"V",  label:"動詞",     q:"する"},
    {k:"C",  label:"くらべる中身", q:"どれくらい"},
    {k:"X",  label:"相手・はんい", q:"何と・どこで"}
  ],
  extra:{ BE:["am","are","was"], V:["run","sing","runs","sings"],
          C:["more popular","the best","faster","as popular"],
          X:["than my sister","in the world","in my class"] },
  sents:[
  { ja:"この本は あの本より おもしろい。", en:"This book is more interesting than that one.",
    fill:{S:{ja:"この本は",en:"This book"}, BE:{ja:"〜だ（＝）",en:"is"}, V:{ja:"（なし）",en:""},
          C:{ja:"よりおもしろい",en:"more interesting"}, X:{ja:"あの本より",en:"than that one"}} },
  { ja:"富士山は 日本で いちばん高い山だ。", en:"Mt. Fuji is the highest mountain in Japan.",
    fill:{S:{ja:"富士山は",en:"Mt. Fuji"}, BE:{ja:"〜だ（＝）",en:"is"}, V:{ja:"（なし）",en:""},
          C:{ja:"いちばん高い山",en:"the highest mountain"}, X:{ja:"日本で",en:"in Japan"}} },
  { ja:"わたしの兄は わたしより 速く 走る。", en:"My brother runs faster than I do.",
    fill:{S:{ja:"わたしの兄は",en:"My brother"}, BE:{ja:"（なし）",en:""}, V:{ja:"走る",en:"runs"},
          C:{ja:"より速く",en:"faster"}, X:{ja:"わたしより",en:"than I do"}} },
  { ja:"サッカーは 野球と 同じくらい人気がある。", en:"Soccer is as popular as baseball.",
    fill:{S:{ja:"サッカーは",en:"Soccer"}, BE:{ja:"〜だ（＝）",en:"is"}, V:{ja:"（なし）",en:""},
          C:{ja:"同じくらい人気が",en:"as popular"}, X:{ja:"野球と",en:"as baseball"}} },
  { ja:"彼女は クラスでいちばん 上手に 歌う。", en:"She sings the best in her class.",
    fill:{S:{ja:"彼女は",en:"She"}, BE:{ja:"（なし）",en:""}, V:{ja:"歌う",en:"sings"},
          C:{ja:"いちばん上手に",en:"the best"}, X:{ja:"クラスで",en:"in her class"}} } ] },

/* ===== ⑩ It ... for 〜 to ... 構文 ===== */
{ key:"it_for_to", group:"other", title:"It ... for 〜 to ... 構文", emoji:"🪜",
  lead:"7つの箱では測れないので専用の枠です。頭の It は形だけの主語。"+
       "「だれにとって」が for 〜、「何をすることが」が to 〜 です。",
  slots:[
    {k:"IT", label:"It",       q:"意味はない"},
    {k:"BE", label:"助動詞／＝", q:"＝ は be動詞"},
    {k:"C",  label:"どんな",    q:"どうだ"},
    {k:"FOR",label:"for だれ",  q:"だれにとって"},
    {k:"TO", label:"to する",   q:"何をすることが"},
    {k:"O",  label:"なにを",    q:"目的語"}
  ],
  extra:{ BE:["are","am","were"], C:["difficult","fun","necessary","interesting"],
          FOR:["for them","for you","for my brother"],
          TO:["to write","to sing","to make","to speak"],
          IT:["That","This","He","There"] },
  sents:[
  { ja:"わたしたちが英語を勉強することは 大切だ。", en:"It is important for us to study English.",
    fill:{IT:{ja:"形だけの主語",en:"It"}, BE:{ja:"〜だ（＝）",en:"is"}, C:{ja:"大切",en:"important"},
          FOR:{ja:"わたしたちが",en:"for us"}, TO:{ja:"勉強することは",en:"to study"}, O:{ja:"英語を",en:"English"}} },
  { ja:"彼がこの本を読むことは 簡単だ。", en:"It is easy for him to read this book.",
    fill:{IT:{ja:"形だけの主語",en:"It"}, BE:{ja:"〜だ（＝）",en:"is"}, C:{ja:"簡単",en:"easy"},
          FOR:{ja:"彼が",en:"for him"}, TO:{ja:"読むことは",en:"to read"}, O:{ja:"この本を",en:"this book"}} },
  { ja:"子どもたちがこの歌を歌うことは 楽しい。", en:"It is fun for children to sing this song.",
    fill:{IT:{ja:"形だけの主語",en:"It"}, BE:{ja:"〜だ（＝）",en:"is"}, C:{ja:"楽しい",en:"fun"},
          FOR:{ja:"子どもたちが",en:"for children"}, TO:{ja:"歌うことは",en:"to sing"}, O:{ja:"この歌を",en:"this song"}} },
  { ja:"わたしがこの質問に答えることは 難しい。", en:"It is difficult for me to answer this question.",
    fill:{IT:{ja:"形だけの主語",en:"It"}, BE:{ja:"〜だ（＝）",en:"is"}, C:{ja:"難しい",en:"difficult"},
          FOR:{ja:"わたしが",en:"for me"}, TO:{ja:"答えることは",en:"to answer"}, O:{ja:"この質問に",en:"this question"}} },
  { ja:"彼女がその重い箱を運ぶことは 大変だった。", en:"It was hard for her to carry the heavy box.",
    fill:{IT:{ja:"形だけの主語",en:"It"}, BE:{ja:"〜だった（＝）",en:"was"}, C:{ja:"大変",en:"hard"},
          FOR:{ja:"彼女が",en:"for her"}, TO:{ja:"運ぶことは",en:"to carry"}, O:{ja:"その重い箱を",en:"the heavy box"}} } ] },

/* ===== ⑪ 関係代名詞 ===== */
{ key:"kankei", group:"other", title:"関係代名詞", emoji:"🔗",
  lead:"7つの箱では測れないので専用の枠です。名詞のうしろに who / which / that をつけて、"+
       "そのあとで「どんな名詞か」を説明します。",
  slots:[
    {k:"S", label:"主語",   q:"だれが"},
    {k:"V", label:"動詞",   q:"する"},
    {k:"N", label:"先行詞", q:"どの名詞を説明する？"},
    {k:"R", label:"関係詞", q:"who / which / that"},
    {k:"E", label:"そのあとの説明", q:"どんな〜か"}
  ],
  extra:{ R:["what","when","where","whose"], V:["knows","have","has","read","visit"],
          N:["a girl","the book","the town"],
          E:["lives in Tokyo","is famous for its food","I bought yesterday"] },
  sents:[
  { ja:"わたしは ギターをひける 男の子を 知っている。", en:"I know a boy who can play the guitar.",
    fill:{S:{ja:"わたしは",en:"I"}, V:{ja:"知っている",en:"know"}, N:{ja:"男の子を",en:"a boy"},
          R:{ja:"（人なので）",en:"who"}, E:{ja:"ギターをひける",en:"can play the guitar"}} },
  { ja:"これは 父がとった 写真です。", en:"This is the picture which my father took.",
    fill:{S:{ja:"これは",en:"This"}, V:{ja:"です（＝）",en:"is"}, N:{ja:"写真",en:"the picture"},
          R:{ja:"（ものなので）",en:"which"}, E:{ja:"父がとった",en:"my father took"}} },
  { ja:"わたしには 大阪に住んでいる 友達が いる。", en:"I have a friend who lives in Osaka.",
    fill:{S:{ja:"わたしには",en:"I"}, V:{ja:"いる",en:"have"}, N:{ja:"友達が",en:"a friend"},
          R:{ja:"（人なので）",en:"who"}, E:{ja:"大阪に住んでいる",en:"lives in Osaka"}} },
  { ja:"彼女は わたしが彼女にあげた 本を 読んだ。", en:"She read the book that I gave her.",
    fill:{S:{ja:"彼女は",en:"She"}, V:{ja:"読んだ",en:"read"}, N:{ja:"本を",en:"the book"},
          R:{ja:"（that でもよい）",en:"that"}, E:{ja:"わたしが彼女にあげた",en:"I gave her"}} },
  { ja:"わたしたちは 城で有名な 町を 訪れた。", en:"We visited the town which is famous for its castle.",
    fill:{S:{ja:"わたしたちは",en:"We"}, V:{ja:"訪れた",en:"visited"}, N:{ja:"町を",en:"the town"},
          R:{ja:"（ものなので）",en:"which"}, E:{ja:"城で有名な",en:"is famous for its castle"}} } ] },
]};
