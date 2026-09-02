/* gojun/data/gojun_v1.js ─ 語順文法テストの教材
   ★語順の枠は7つ：主語／助動詞／動詞／目的語／その他／場所／時間
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
  {k:"AUX",label:"助動詞", q:""},
  {k:"V",  label:"動詞",   q:"する"},
  {k:"O",  label:"目的語", q:"なにを"},
  {k:"M",  label:"その他", q:"どのように"},
  {k:"PL", label:"場所",   q:"どこで"},
  {k:"T",  label:"時間",   q:"いつ"}
],
items: [

/* ===== ① 一般動詞（現在形） ===== */
{ key:"ippan_now", title:"一般動詞（現在形）", emoji:"🔤",
  lead:"助動詞の箱は空になります。主語が he / she のときは動詞に s がつくところが山場です。",
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
{ key:"can", title:"助動詞 can", emoji:"💪",
  lead:"助動詞の箱に can が入ります。can のうしろの動詞は、s も ed もつかない形（原形）です。",
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
{ key:"kako", title:"過去形", emoji:"⏪",
  lead:"助動詞の箱は空。動詞の箱が過去形になります。時間の箱に yesterday や last 〜 が入ります。",
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
{ key:"shinkou", title:"現在進行形", emoji:"🏃",
  lead:"助動詞の箱に am / is / are、動詞の箱に 〜ing が入ります。主語で am・is・are を選び分けます。",
  extra:{ AUX:["am","is","are","was","were"], V:["read","make","play","study","practice"] },
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
{ key:"will", title:"未来 will", emoji:"🔮",
  lead:"助動詞の箱に will。can と同じで、うしろの動詞は原形です。時間の箱に tomorrow や next 〜 が入ります。",
  extra:{ AUX:["can","must","is","are"], V:["studied","visited","cleans","gets up"], T:["next year","this evening"] },
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
{ key:"kanryo", title:"現在完了", emoji:"⏳",
  lead:"助動詞の箱に have / has、動詞の箱に過去分詞。時間の箱に for 〜・since 〜・twice などが入ります。",
  extra:{ AUX:["have","has","had","am","is"], V:["live","visit","read","study","practice"],
          T:["for two years","since 2020","three times"] },
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
          PL:{ja:"体育館で",en:"in the gym"}, T:{ja:"2時間",en:"for two hours"}} } ] }

]};
