/* challenge/data/compose.js ─ 挑戦モード「並べ替え英作文」のお題バンク
   g      : 学年の目安（1=中1, 2=中2, 3=中3）。範囲指定はこの g 以下をまとめて出題する。
            中1＝g<=1 / 中1〜2＝g<=2 / 中1〜3＝g<=3
   jp     : 日本語の文（この意味になるよう英語を並べ替える）
   answer : 完成する英文（＝正解。自動採点の基準。語順はこの文の並びで判定）
   words  : タップして並べるチップ（answer を語のかたまりに分けたもの。出題時はシャッフルする）
   tip    : 文法・表現のねらい（学習ヒント）
   ※ 並べ替え式なので自動採点できる（自己採点は廃止）。words を正しい順に並べれば正解。
      判定は大文字小文字・記号を無視（normSpell）。同じ語が複数あっても入れ替え可（同一表記のため）。
*/
window.COMPOSE = [
  /* ===== 中1（g=1）：be動詞・一般動詞現在・can・複数・疑問詞・現在進行形・命令(Let's)・過去(規則) ===== */
  {g:1, jp:"私はサッカーが得意です。", answer:"I am good at soccer.",
    words:["I","am","good","at","soccer."], tip:"be動詞（〜です）"},
  {g:1, jp:"私は毎日英語を勉強します。", answer:"I study English every day.",
    words:["I","study","English","every","day."], tip:"一般動詞の現在形"},
  {g:1, jp:"私はとても上手に泳ぐことができます。", answer:"I can swim very well.",
    words:["I","can","swim","very","well."], tip:"can（〜できる）"},
  {g:1, jp:"あなたは何のスポーツが好きですか。", answer:"What sport do you like?",
    words:["What","sport","do","you","like?"], tip:"疑問詞 What"},
  {g:1, jp:"私は犬を3匹飼っています。", answer:"I have three dogs.",
    words:["I","have","three","dogs."], tip:"名詞の複数形"},
  {g:1, jp:"私は今、テレビを見ています。", answer:"I am watching TV now.",
    words:["I","am","watching","TV","now."], tip:"現在進行形 be + 〜ing"},
  {g:1, jp:"放課後にテニスをしましょう。", answer:"Let's play tennis after school.",
    words:["Let's","play","tennis","after","school."], tip:"Let's 〜（さそう）"},
  {g:1, jp:"私は昨日サッカーをしました。", answer:"I played soccer yesterday.",
    words:["I","played","soccer","yesterday."], tip:"一般動詞の過去形（規則）"},

  /* ===== 中2（g=2）：未来・過去(不規則)・助動詞・不定詞・動名詞・比較・There is/are・接続詞 ===== */
  {g:2, jp:"私は祖母を訪ねるつもりです。", answer:"I am going to visit my grandmother.",
    words:["I","am","going","to","visit","my","grandmother."], tip:"be going to（予定）"},
  {g:2, jp:"私は昨年の夏、京都へ行きました。", answer:"I went to Kyoto last summer.",
    words:["I","went","to","Kyoto","last","summer."], tip:"過去形（不規則 went）"},
  {g:2, jp:"私は先生になりたいです。", answer:"I want to be a teacher.",
    words:["I","want","to","be","a","teacher."], tip:"want to 〜（不定詞）"},
  {g:2, jp:"夏は冬よりも暑いです。", answer:"Summer is hotter than winter.",
    words:["Summer","is","hotter","than","winter."], tip:"比較級 〜er than"},
  {g:2, jp:"私たちは毎日野菜を食べるべきです。", answer:"We should eat vegetables every day.",
    words:["We","should","eat","vegetables","every","day."], tip:"should（〜すべき）"},
  {g:2, jp:"私の趣味は本を読むことです。", answer:"My hobby is reading books.",
    words:["My","hobby","is","reading","books."], tip:"動名詞 〜ing"},
  {g:2, jp:"私の部屋には机があります。", answer:"There is a desk in my room.",
    words:["There","is","a","desk","in","my","room."], tip:"There is / are 〜"},
  {g:2, jp:"私はスキーができるので冬が好きです。", answer:"I like winter because I can ski.",
    words:["I","like","winter","because","I","can","ski."], tip:"because（理由の接続詞）"},

  /* ===== 中3（g=3）：受動態・現在完了・関係代名詞・不定詞(目的)・間接疑問・意見述べ ===== */
  {g:3, jp:"後楽園は多くの人に愛されています。", answer:"Korakuen is loved by many people.",
    words:["Korakuen","is","loved","by","many","people."], tip:"受動態 be + 過去分詞"},
  {g:3, jp:"私は東京へ3回行ったことがあります。", answer:"I have visited Tokyo three times.",
    words:["I","have","visited","Tokyo","three","times."], tip:"現在完了（経験）"},
  {g:3, jp:"私にはオーストラリアに住んでいる友だちがいます。", answer:"I have a friend who lives in Australia.",
    words:["I","have","a","friend","who","lives","in","Australia."], tip:"関係代名詞 who"},
  {g:3, jp:"私たちは環境を守るために水を大切にできます。", answer:"We can save water to protect the environment.",
    words:["We","can","save","water","to","protect","the","environment."], tip:"to 不定詞（目的）"},
  {g:3, jp:"私は彼がどこにいるのか分かりません。", answer:"I don't know where he is.",
    words:["I","don't","know","where","he","is."], tip:"間接疑問（where he is）"},
  {g:3, jp:"私は英語が大切だと思います。", answer:"I think English is important.",
    words:["I","think","English","is","important."], tip:"意見（I think 〜）"},
  {g:3, jp:"あなたは後楽園を訪れるべきです。", answer:"You should visit Korakuen.",
    words:["You","should","visit","Korakuen."], tip:"提案（should）"},
  {g:3, jp:"私はこの考えに賛成です。", answer:"I agree with this idea.",
    words:["I","agree","with","this","idea."], tip:"賛成／反対（agree with）"}
];
