/* challenge/data/compose.js ─ 挑戦モード「英作文」のお題バンク
   g: 学年の目安（1=中1, 2=中2, 3=中3）。範囲指定はこの g 以下をまとめて出題する。
      中1＝g<=1 / 中1〜2＝g<=2 / 中1〜3＝g<=3
   jp   : 日本語のお題（何を英語で書くか）
   model: 模範解答の一例（自己採点用。表記は1例で、ほかの正解もありうる）
   tip  : 文法・表現のねらい（学習ヒント）
   ※ 自由英作文なので自動採点はしない。模範解答を見て「できた/まだ」を自分で記録する。
*/
window.COMPOSE = [
  /* ===== 中1（g=1）：be動詞・一般動詞現在・can・複数・疑問詞・現在進行形・過去(規則) ===== */
  {g:1, jp:"あなたの名前と、好きなスポーツを英語で伝えよう。", model:"My name is Ken. I like soccer.", tip:"be動詞 + 一般動詞(like)"},
  {g:1, jp:"あなたが毎朝することを1つ、英語で書こう。", model:"I eat breakfast at seven.", tip:"一般動詞の現在形"},
  {g:1, jp:"飼ってみたい動物と、その動物とできることを書こう。", model:"I want a dog. I can walk with it.", tip:"can（〜できる）"},
  {g:1, jp:"昨日したことを1つ、英語で書こう。", model:"I watched TV yesterday.", tip:"一般動詞の過去形（規則）"},
  {g:1, jp:"好きな教科と、その理由を短く書こう。", model:"I like English. It is fun.", tip:"理由を文で足す"},
  {g:1, jp:"今していることを英語で書こう（〜しているところ）。", model:"I am studying English now.", tip:"現在進行形 be + 〜ing"},
  {g:1, jp:"友だちを放課後の遊びにさそう英文を書こう。", model:"Let's play tennis after school.", tip:"Let's 〜（さそう）"},
  {g:1, jp:"あなたの家族を1人しょうかいしよう（だれ・どんな人）。", model:"I have a sister. She is kind.", tip:"have ＋ be動詞で説明"},

  /* ===== 中2（g=2）：未来・過去・助動詞・不定詞・動名詞・比較・There is/are・接続詞 ===== */
  {g:2, jp:"今度の週末の予定を英語で書こう。", model:"I am going to visit my grandmother this weekend.", tip:"be going to（予定）"},
  {g:2, jp:"行ったことのある場所と、その感想を書こう。", model:"I went to Kyoto last summer. It was beautiful.", tip:"過去形＋感想(was)"},
  {g:2, jp:"将来やってみたいことを英語で書こう。", model:"I want to be a teacher in the future.", tip:"want to 〜（不定詞）"},
  {g:2, jp:"2つのものをくらべる文を書こう（例：夏と冬）。", model:"Summer is hotter than winter.", tip:"比較級 〜er than"},
  {g:2, jp:"健康のためにするとよいことを書こう。", model:"We should eat vegetables every day.", tip:"should（〜すべき）"},
  {g:2, jp:"あなたのしゅみを英語で書こう。", model:"My hobby is reading books.", tip:"動名詞 〜ing（主語・補語）"},
  {g:2, jp:"あなたの部屋にあるものを1つ、英語で書こう。", model:"There is a desk in my room.", tip:"There is / are 〜"},
  {g:2, jp:"好きな季節と、その理由を because を使って書こう。", model:"I like winter because I can ski.", tip:"because（理由の接続詞）"},

  /* ===== 中3（g=3）：受動態・現在完了・関係代名詞・間接疑問・意見述べ ===== */
  {g:3, jp:"有名なもの・場所を受け身（受動態）で紹介しよう。", model:"Korakuen is loved by many people.", tip:"受動態 be + 過去分詞"},
  {g:3, jp:"これまでの経験を英語で書こう（〜したことがある）。", model:"I have visited Tokyo three times.", tip:"現在完了（経験）"},
  {g:3, jp:"友だちや家族を、関係代名詞を使って説明しよう。", model:"I have a friend who lives in Australia.", tip:"関係代名詞 who"},
  {g:3, jp:"英語を学ぶことが大切だと思う理由を書こう。", model:"I think English is important because we can talk with people from other countries.", tip:"意見＋理由（I think 〜 because 〜）"},
  {g:3, jp:"日本に来た外国人に、おすすめの場所を英語ですすめよう。", model:"You should visit Korakuen. It is a beautiful Japanese garden.", tip:"提案＋説明"},
  {g:3, jp:"環境のためにできることを英語で書こう。", model:"We can save water to protect the environment.", tip:"to 不定詞（目的）"},
  {g:3, jp:"「彼がどこにいるか分からない」を英語で書こう。", model:"I don't know where he is.", tip:"間接疑問（where he is）"},
  {g:3, jp:"あるアイデアに賛成か反対かを、理由つきで書こう。", model:"I agree with this idea because it helps many people.", tip:"賛否＋理由"}
];
