/* data/okayama3.js ─ 岡山県スタイル 模擬テスト③
   出典：岡山県公立高校入試 英語の「傾向のみ」を参照（過去問の文・図・設問は一切再現しない）。
   大問構成・問題数・配点バランスのみ踏襲し、本文・対話・設問・選択肢はすべて新規創作。
   題材：瀬戸内海の島・しまなみのサイクリング・海の生き物（架空の町 Wakaba/Midori/Hikari）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "岡山県スタイル 模擬テスト③",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the picture. A small boat is going to the island, and two birds are flying above it.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵（船と鳥の様子）はどれですか。",
      choices:["小さな船が島へ向かい、2羽の鳥がその上を飛んでいる。","大きな船が港にとまり、2羽の鳥が海にいる。",
               "小さな船が島へ向かい、3羽の鳥がその上を飛んでいる。","小さな船が港にとまり、1羽の鳥が飛んでいる。"], answer:0 } ] },
  { script:'(2) Look at the sign. The cycling tour starts at eight forty in the morning at Wakaba Port.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う表示（ツアーの出発案内）はどれですか。",
      choices:["サイクリングツアーは午前8:14にミドリ港を出発。","サイクリングツアーは午前8:40にワカバ港を出発。",
               "サイクリングツアーは午前8:40にミドリ港を出発。","サイクリングツアーは午後8:40にワカバ港を出発。"], answer:1 } ] },

  /* 問題B：チャイムの応答 */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> Have you ever ridden a bike across the long bridge to the island?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Yes, I have. The view from the bridge was amazing."), E("No, I don't like sea animals."),
                E("You can buy a map at the station."), E("It will rain on the island tomorrow.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> How many kinds of fish did you see at the small aquarium?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I rode my bike for two hours."), E("About thirty kinds, I think."),
                E("Yes, the water was very clean."), E("Let's visit the island next week.") ], answer:1 } ] },

  /* 問題C：メモの空所補充（英語1語×3） */
  { intro:"問題C　ナオト(Naoto)が、ALTのバンクス(Mr. Banks)先生に島での体験についてインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hi, I\'m Mr. Banks. Last weekend I went to a small island in the Seto Inland Sea by <b>bike</b>.</span>'+
      '<span class="sp">On the island, I joined a tour and learned about sea animals from a kind <b>guide</b>.</span>'+
      '<span class="sp">The thing I liked the best was a beautiful <b>sunset</b> over the calm sea. I will never forget it.</span>',
    passage:'<b>ナオトのメモ</b><br>Mr. Banks — went to a small island by （　あ　）<br>'+
            '— learned about sea animals from a kind （　い　）<br>— liked a beautiful （　う　） over the sea the best',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）自転車", answers:["bike"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）ガイド・案内人", answers:["guide"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）夕日・日の入り", answers:["sunset"], hint:"英語1語" } ] },

  /* 問題D：説明を聞いて答える（mcq＋英作文） */
  { intro:"問題D　あなたとクラスメイトのサキ(Saki)が、島での自然教室についての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next month we will have a nature class on Hikari Island. You can choose one activity.</span>'+
      '<span class="sp">Group A will go cycling along the coast. Group B will watch sea birds. Group C will study small sea animals in the rock pools.</span>'+
      '<span class="sp">The nature class will be held on Saturday. Please bring your hat and enough water.</span>'+
      '<span class="sp"><span class="who">Saki:</span> I really love riding a bike. Which group will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["自然教室は金曜日に行われる。","参加者は岩場の小さな海の生き物を調べることができる。",
               "ぼうしを持ってくる必要はない。","水は会場で配られる。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"サキの発言に対するあなたの答えを完成させなさい。<br>"+E("I really love riding a bike. So I will join Group （　　）.")+"（英語1語）",
      answers:["A"], hint:"英語1語（A・B・C のどれか）" } ] }
]},

/* ===== 大問2 チラシ＋対話 ===== */
{ no:2, title:"中学生のソウタ(Sota)とナオ(Nao)が、ワカバ町の「しまなみ海の体験デー」の一つである、ガイドのモリ(Ms. Mori)さんのサイクリング教室のちらしを見ながら話しています。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Island Cycling Class with Ms. Mori!</h4>'+
    '<div class="note">Hello, everyone! Let\'s ride along the sea and meet the islands together!</div>'+
    '<table><tr><td>Date</td><td>May 16, 2026</td></tr>'+
    '<tr><td>Morning ride</td><td>9:00 a.m. – 10:30 a.m.</td></tr>'+
    '<tr><td>Afternoon ride</td><td>1:30 p.m. – 3:00 p.m.</td></tr></table>'+
    '<div class="note">I am … Ms. Mori, a cycling guide. (I have led tours on these islands for twelve years.)<br>'+
    'I like … the sea, watching dolphins, and rice balls (<i>onigiri</i>)! '+
    '(Please tell me about a good rice-ball shop!)　→ You can sign up here.</div>',
    passage:
    '<span class="sp"><span class="who">Sota:</span> Look, Nao. Did you know about this class?</span>'+
    '<span class="sp"><span class="who">Nao:</span> Yes. Ms. Mori is the （　あ　） popular guide on the islands near our town.</span>'+
    '<span class="sp"><span class="who">Sota:</span> Really? I want to join, but I\'m not （　い　） that I can ride so far.</span>'+
    '<span class="sp"><span class="who">Nao:</span> You don\'t need to worry about that. She rides slowly with everyone.</span>'+
    '<span class="sp"><span class="who">Sota:</span> Good advice. She likes rice balls. My favorite rice-ball shop is in front of the port. '+
    'I think the rice balls there are the <u>(う) good</u> on this island.</span>'+
    '<span class="sp"><span class="who">Nao:</span> That sounds great. I\'m （　い　） she will be glad to hear that.</span>'+
    '<span class="sp"><span class="who">Sota:</span> The class is two days from now. I have a piano lesson in the morning that day.</span>'+
    '<span class="sp"><span class="who">Nao:</span> What time will it finish?</span>'+
    '<span class="sp"><span class="who">Sota:</span> It will finish at eleven. Then I can join the afternoon ride and look for dolphins!</span>',
    note:'語注：guide ガイド・案内人／sign up 申し込む／worry about 〜 〜を気にする／dolphin イルカ',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"（あ）に入れるのに最も適当な英語1語を書きなさい。", answers:["most"], hint:"the （　） popular" },
    { type:"fill", label:"(2)い", pt:3, stem:"2か所の（い）に共通して入る最も適当な英語1語を書きなさい。", answers:["sure"], hint:"I'm not 〜 / I'm 〜" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) good を、最も適当な形に変えて1語で書きなさい。", answers:["best"], hint:"the 〜 on this island" },
    { type:"mcq", label:"(4)", pt:3, stem:"ソウタとナオが話している日として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("May 13"), E("May 14"), E("May 15"), E("May 16") ], answer:1 },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Ms. Mori has led tours on the islands for twelve years."),
                E("Sota cannot ride a bike at all."),
                E("Sota's favorite rice-ball shop is near the school."),
                E("Sota will join the morning ride.") ], answer:0 } ]}
]},

/* ===== 大問3 日記の英作文（並べかえ2問） ===== */
{ no:3, title:"瀬戸内海の島でホームステイをしているタイガ(Taiga)は、漁師のおじさんの家にホームステイしています。次は、ホームステイ中のタイガの日記の一部と、その日のできごとを表したイラストです。日記とイラストの内容に合うように、(1)(2)の語を正しく並べかえて、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：朝、ホストのおじさんが船の上で大きな魚を高く持ち上げ、タイガがおどろいている。夕方、波止場でその魚の写真をとっている。",
    passage:
    'August 9<br><br>'+
    'Early this morning, I went out on a fishing boat with my host family. The sea was very calm. '+
    'Suddenly, my host uncle pulled up a big fish. I was so surprised and said, "Wow! '+
    '<u>(1)</u>!" He laughed and said, "We are lucky today." In the evening, on the pier, I '+
    '<u>(2)</u> with my smartphone to keep this happy memory.',
    passageEn:true,
    note:'語注：fishing boat 漁船／calm おだやかな／host uncle ホストのおじさん／pier 波止場',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：大きな魚を見ておどろく場面。次の語を正しく並べて英文を完成させなさい。",
      words:["a","caught","fish","you","big","have"], answer:"You have caught a big fish" },
    { type:"wordorder", label:"(2)", pt:5, stem:"イラスト：波止場で魚の写真をとる場面です（I の続き）。次の語を正しく並べて英文を完成させなさい。",
      words:["a","took","of","photo","it"], answer:"took a photo of it" } ]}
]},

/* ===== 大問4 話し合い＋感想 ===== */
{ no:4, title:"リード(Reed)先生の英語の授業で、Yuto、Kaito、Hina が、島の自然を守るためにできることについて話し合いをしています。次の英文は、話し合いと、それを聞いて Mio が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Reed:</span> Today, let\'s talk about our islands. What can we do to protect their beautiful nature? Yuto, tell us first.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> I want to <u>clean the island beaches</u>. Last summer, I saw a lot of plastic on the sand, and it made me sad.</span>'+
    '<span class="sp"><span class="who">Mr. Reed:</span> That\'s a good idea. Did you pick up the plastic, Yuto?</span>'+
    '<span class="sp"><span class="who">Yuto:</span> Yes. My friends and I filled three big bags. I want to do it again with more people.</span>'+
    '<span class="sp"><span class="who">Mr. Reed:</span> Wonderful. Clean beaches are safer for sea animals, too.</span>'+
    '<span class="sp"><span class="who">Kaito:</span> I want to tell visitors about the sea animals here. Many people don\'t know that small fish live near the rocks.</span>'+
    '<span class="sp"><span class="who">Mr. Reed:</span> Oh, that\'s nice. How will you tell them, Kaito?</span>'+
    '<span class="sp"><span class="who">Kaito:</span> I want to make a small map of the coast. When people learn about the animals, they will take better care of the sea.</span>'+
    '<span class="sp"><span class="who">Mr. Reed:</span> That\'s a great plan. Hina, how about you?</span>'+
    '<span class="sp"><span class="who">Hina:</span> I want to grow more trees on the hills. I hear that trees keep the soil and the sea water clean.</span>'+
    '<span class="sp"><span class="who">Mr. Reed:</span> Growing trees is not （　あ　）, but it is a wonderful way to help nature.</span>'+
    '<span class="sp"><span class="who">Hina:</span> I think so, too.</span>'+
    '<span class="sp"><span class="who">Mr. Reed:</span> OK, I\'m going to talk about myself. When I was young, I lived near a small fishing town. I loved the clean sea there, so I started to join beach cleaning.</span>'+
    '<span class="sp"><span class="who">Hina:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Mr. Reed:</span> Good question. I came to Japan eight years ago because I wanted to see the islands of the Seto Inland Sea. The sea here is so beautiful that I decided to stay.</span>'+
    '<span class="sp"><span class="who">Hina:</span> And now you teach us about nature, too.</span>'+
    '<span class="sp"><span class="who">Mr. Reed:</span> Yes, and I really enjoy it. I hope you\'ll find your own way to protect our sea.</span>',
    note:'語注：protect 〜を守る／plastic プラスチック／visitor 訪れる人／soil 土' },
  { passage:'<b>Mio の感想</b><br>There are many ways to protect our islands. Like Yuto, I want to clean the beaches. '+
            'I （　X　）, too, so I want to make the sand clean for the sea animals.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語4語を、話し合いの中の Yuto の発言から抜き出して書きなさい。<br>"+E("Yuto wants to [　　] with more people in the future."),
      answers:["clean the island beaches"], hint:"英語4語（Yuto の発言から）" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("bad"),E("easy"),E("difficult"),E("sad")], answer:1 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("How much is this map?"), E("Whose bike is this?"),
                E("Why did you come to Japan?"), E("What time does the class start?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Kaito wants to make a small map of the coast."),
                E("Yuto found no plastic on the beach."),
                E("Mr. Reed came to Japan to study Japanese."),
                E("Hina wants to clean the island beaches.") ], answer:0 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("am a soccer fan"), E("like playing video games"),
                E("worry about the plastic on the beach"), E("want to study music") ], answer:2 } ]}
]},

/* ===== 大問5 意見文（読解） ===== */
{ no:5, title:"次の英文は、科学部のレイ(Rei)が発表した意見文です。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Rei from the science club. Today I want to talk about a small sea animal that lives near our island, the sea slug. '+
    'When I was in my first year, I did not know much about the sea. But now I really love watching sea animals. I want to share my story with you.<br><br>'+
    '<b>②</b> Last spring, my science club went to the rock pools on the coast. At first, I thought the pools were just water and stones. '+
    'I almost wanted to stop looking for anything interesting. Then a club member showed me a tiny, colorful sea slug. '+
    'My teacher said, "Don\'t give up. Look closely. If you keep watching, you will find a whole small world." '+
    'These words <u>(お) ___</u> the way I see the sea. I decided to study sea animals more.<br><br>'+
    '<b>③</b> After that, I visited the pools many times. My teacher also helped me a lot. '+
    'She taught me how to watch the animals without hurting them. She said, "You should not move the stones too much. '+
    'A quiet visitor can see more." I followed her advice. Little by little, I could find many kinds of sea slugs.<br><br>'+
    '<b>④</b> Some people say that a sea slug is too small to be important. That may be true for some. <u>④ A sea slug is only a tiny animal in the sea</u>. '+
    'But it means a lot to me. <u>③ ( me / the sea slug / many things / taught )</u>. '+
    'I learned that I should look at small things carefully. When I keep watching, I can <u>(か) ___</u> the beauty of nature. '+
    'So please don\'t pass by small things, and find a world you love!',
    passageEn:true,
    note:'語注：sea slug ウミウシ／rock pool 岩場の潮だまり／give up あきらめる／hurt 傷つける／advice 助言',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お changed　か lose"), E("お changed　か feel"),
                E("お lost　か lose"), E("お lost　か feel") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "レイは何度も潮だまりを訪れた。", "先生は生き物を傷つけない見方を教えてくれた。",
                "先生は石をたくさん動かすべきだと言った。", "レイは少しずつ多くの種類のウミウシを見つけられるようになった。" ], answer:2 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["me","the sea slug","many things","taught"], answer:"The sea slug taught me many things",
      display:"The sea slug taught me many things" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語2語を、第2段落中から抜き出して書きなさい。<br>"+E("Rei's teacher told her not to （　え　） when she looked for sea animals."),
      answers:["give up"], hint:"第2段落の語・英語2語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>ウミウシは、海にいる（　①　）な（　②　）にすぎない。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "小さ（ちいさ）","大き（おおき）","めずらし","あぶな" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "動物（どうぶつ）","植物（しょくぶつ）","岩（いわ）","船（ふね）" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Rei did not know much about the sea in her first year."),
                E("Rei found the sea slug by herself before anyone showed it to her."),
                E("Rei's teacher told her to watch the animals without hurting them."),
                E("Rei's teacher said that a noisy visitor can see more."),
                E("Rei thinks a sea slug is too small to be important to her.") ], answer:[0,2] } ]}
]}

]};
