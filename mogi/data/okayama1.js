/* data/okayama1.js ─ 岡山県スタイル 模擬テスト①（中3）
   参照：factory/inputs/okayama_notes.md の「傾向のみ」（リスニング厚め／聞く→書く複合／
   図表読み取り／記述分散／中3文法が軸）。過去問の文・図・設問の再現は一切なし。
   本文・対話・設問・選択肢はすべて新規創作。岡山らしい題材（日本庭園・地元の祭り・桃/マスカット）
   を架空の町名（Wakaba/Midori/Hikari）で創作的に使用。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "岡山県スタイル 模擬テスト①",
sections: [

/* ===== 大問1 リスニング（問題A〜D）　24点 ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the timetable. The next train for Wakaba leaves at ten forty.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合うもの（電車の時刻表示）はどれですか。",
      choices:["ワカバ行きの電車が10:14に出発。","ワカバ行きの電車が10:40に出発。",
               "ワカバ行きの電車が10:04に出発。","ミドリ行きの電車が10:40に出発。"], answer:1 } ] },
  { script:'(2) Look at the picture. It is cloudy this morning, and two cats are sleeping under the bench.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う絵（今朝の天気と様子）はどれですか。",
      choices:["晴れで、ネコが2ひきベンチの下でねている。","くもりで、ネコが3びきベンチの下でねている。",
               "くもりで、ネコが2ひきベンチの下でねている。","雨で、ネコが2ひきベンチの上でねている。"], answer:2 } ] },

  /* 問題B：チャイムの応答 */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> Have you ever visited the old Japanese garden in Midori?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Yes, I have. I went there last fall."), E("No, I won't make a garden."), E("It is raining in the garden."), E("You're welcome.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> How long does it take to walk to the festival from here?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I went there by bike yesterday."), E("It takes about fifteen minutes."), E("Yes, the festival was fun."), E("Let's dance at the festival.") ], answer:1 } ] },

  /* 問題C：メモの空所補充（英語1語×3） */
  { intro:"問題C　ユウタ(Yuta)が、ALTのグリーン(Ms. Green)先生に、ふるさとの行事についてインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, I\'m Ms. Green from Australia. In my hometown, we have a big <b>summer</b> festival by the river every year.</span>'+
      '<span class="sp">People wear special clothes and <b>dance</b> together in the street all night.</span>'+
      '<span class="sp">My favorite part is the food. We always eat sweet <b>peaches</b> at the festival because they are famous here.</span>',
    passage:'<b>ユウタのメモ</b><br>Ms. Green — has a big （　あ　） festival by the river<br>'+
            '— people （　い　） together in the street<br>— eats sweet （　う　） at the festival',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）夏", answers:["summer"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）おどる", answers:["dance"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）もも（複数）", answers:["peaches"], hint:"英語1語" } ] },

  /* 問題D：説明を聞いて答える（内容一致＋英作文） */
  { intro:"問題D　あなたとクラスメイトのリナ(Rina)が、職場体験の説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next week we will have a work-experience day. You can choose one place to visit.</span>'+
      '<span class="sp">Group A will help at the Japanese garden. Group B will work at a fruit farm. Group C will help at the city library.</span>'+
      '<span class="sp">The work experience starts at nine. Please bring your own lunch and wear a hat because it may be hot.</span>'+
      '<span class="sp"><span class="who">Rina:</span> I really like reading books. Which group will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["職場体験は午後に始まる。","参加者は果物農園で働くことができる。",
               "昼食は持って行かなくてよい。","ぼうしはかぶらなくてよい。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"リナの発言に対するあなたの答えを完成させなさい。<br>"+E("I really like reading books. So I will choose the （　　）.")+"（英語2語）",
      answers:["city library"], hint:"英語2語" } ] }
]},

/* ===== 大問2 チラシ＋対話　16点 ===== */
{ no:2, title:"中学生のケンタ(Kenta)とエミ(Emi)が、わかば市の「日本庭園 夜のライトアップ」のちらしを見ながら話しています。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Wakaba Garden — Night Light-up!</h4>'+
    '<div class="note">Come and enjoy our beautiful Japanese garden at night with colorful lights!</div>'+
    '<table><tr><td>Date</td><td>October 10, 2026 (Saturday)</td></tr>'+
    '<tr><td>Time</td><td>6:00 p.m. – 8:30 p.m.</td></tr>'+
    '<tr><td>Tickets</td><td>500 yen for adults / 200 yen for students</td></tr>'+
    '<tr><td>Number of people</td><td>Only 40 people can join the night tour.</td></tr></table>'+
    '<div class="note">Guide: Mr. Sato (He has worked in this garden for twenty years.)<br>'+
    'You can also drink warm green tea in the old tea house. → Please come to the front gate first.</div>',
    passage:
    '<span class="sp"><span class="who">Kenta:</span> Look, Emi. This is the （　あ　） beautiful garden in our city, I think.</span>'+
    '<span class="sp"><span class="who">Emi:</span> Yes. And the night light-up looks wonderful. I want to go, but I\'m not （　い　） that I have enough money.</span>'+
    '<span class="sp"><span class="who">Kenta:</span> Don\'t worry. We are students, so each ticket is only （　X　） yen.</span>'+
    '<span class="sp"><span class="who">Emi:</span> Oh, that\'s cheap! I\'m （　い　） we can go together then.</span>'+
    '<span class="sp"><span class="who">Kenta:</span> But look, only forty people can join the tour. We should buy our tickets early.</span>'+
    '<span class="sp"><span class="who">Emi:</span> You\'re right. By the way, the tea house sounds nice. I think the green tea there is the <u>(う) good</u> in our town.</span>'+
    '<span class="sp"><span class="who">Kenta:</span> I agree. Let\'s meet at the front gate at five forty on that day.</span>'+
    '<span class="sp"><span class="who">Emi:</span> OK. The event is two days from now. See you on Saturday!</span>',
    note:'語注：light-up ライトアップ／guide 案内係／tea house 茶室／front gate 正門',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"（あ）に入れるのに最も適当な英語1語を書きなさい。", answers:["most"], hint:"the （　） beautiful" },
    { type:"fill", label:"(2)い", pt:3, stem:"2か所の（い）に共通して入る最も適当な英語1語を書きなさい。", answers:["sure"], hint:"I'm not 〜 / I'm 〜" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) good を、最も適当な形に変えて1語で書きなさい。", answers:["best"], hint:"the 〜 in our town" },
    { type:"fill", label:"(4)X", pt:3, stem:"会話の（X）に入る数字を、ちらしを見て算用数字で書きなさい。", answers:["200"], hint:"半角の数字" },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Mr. Sato has worked in the garden for twenty years."),
                E("More than fifty people can join the night tour."),
                E("Kenta and Emi will meet at the tea house first."),
                E("The night light-up starts at five in the evening.") ], answer:0 } ]}
]},

/* ===== 大問3 日記の英作文（並べかえ2問）　11点 ===== */
{ no:3, title:"オーストラリアでホームステイしているソラ(Sora)は、エマ(Emma)の家にホームステイしています。次は、ホームステイ中のソラの日記の一部と、その日のできごとを表したイラストです。日記とイラストの内容に合うように、(1)に4語以上、(2)に3語以上の英語を、語を並べかえて書き、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：エマが台所でたくさんのマスカット(muscat grapes)をテーブルに並べて見せている。ソラはおどろいた顔をしている。",
    passage:
    'August 3<br><br>'+
    'This morning, Emma took me to the kitchen. She said, "Look at these!" '+
    'On the table, there were so many green grapes. I was surprised and said, "Wow! '+
    '<u>(1)</u>!" Emma smiled and said, "Yes. My father grows them on our farm." She gave me some as a present. '+
    'In the evening, I sent <u>(2)</u> to my friends in Japan. They wanted to try them, too.',
    passageEn:true,
    note:'語注：grape ぶどう／grow 〜を育てる／farm 農園',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"たくさんのマスカットを見ておどろく場面です。次の語を正しく並べて英文を完成させなさい。",
      words:["have","so","grapes","you","many"], answer:"You have so many grapes" },
    { type:"wordorder", label:"(2)", pt:5, stem:"夜、マスカットの写真を友達に送る場面です（I sent の続き）。次の語を正しく並べて英文を完成させなさい。",
      words:["of","them","picture","a"], answer:"a picture of them" } ]}
]},

/* ===== 大問4 話し合い＋感想　16点 ===== */
{ no:4, title:"ヒル(Mr. Hill)先生の英語の授業で、Riku、Aoi、Sho が、ふるさとのみりょくを伝える方法について話し合いをしています。次の英文は、話し合いと、それを聞いて Mei が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Hill:</span> Today, let\'s talk about our town. How can we tell foreign people about the good points of our town? Riku, please start.</span>'+
    '<span class="sp"><span class="who">Riku:</span> I want to make an English map. I want to show visitors how to enjoy our old Japanese garden.</span>'+
    '<span class="sp"><span class="who">Mr. Hill:</span> That\'s a nice idea. Why do you like the garden, Riku?</span>'+
    '<span class="sp"><span class="who">Riku:</span> It is very beautiful in every season. I want to teach visitors how to walk around it slowly.</span>'+
    '<span class="sp"><span class="who">Mr. Hill:</span> Wonderful. Aoi, how about you?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> I want to hold a cooking event. My grandmother makes a local dish with peaches, and it is really delicious.</span>'+
    '<span class="sp"><span class="who">Mr. Hill:</span> That sounds great. Do you often cook with your grandmother, Aoi?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> Yes. Cooking together is the thing I like the most. I want to share our local food with many people.</span>'+
    '<span class="sp"><span class="who">Mr. Hill:</span> That\'s a warm idea. Sho, what is your idea?</span>'+
    '<span class="sp"><span class="who">Sho:</span> I want to make a short video about our summer festival. Many people dance in the street, and it is exciting.</span>'+
    '<span class="sp"><span class="who">Mr. Hill:</span> Making a good video is not （　あ　）, but it can show our festival to the world.</span>'+
    '<span class="sp"><span class="who">Sho:</span> I think so.</span>'+
    '<span class="sp"><span class="who">Mr. Hill:</span> OK, I\'m going to talk about myself. When I came to this town, I joined the summer festival. I danced with the people, so I learned to love this town.</span>'+
    '<span class="sp"><span class="who">Sho:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Mr. Hill:</span> Good question. I came here five years ago to teach English. The town was quiet and kind, so I decided to stay.</span>'+
    '<span class="sp"><span class="who">Sho:</span> And now you enjoy our festival with us every summer.</span>'+
    '<span class="sp"><span class="who">Mr. Hill:</span> Yes, and I love it. I hope you\'ll find a good way to share our town.</span>',
    note:'語注：visitor 訪れる人／local dish 郷土料理／festival 祭り／video 動画' },
  { passage:'<b>Mei の感想</b><br>There are many good ways to share our town. Like Aoi, I want to tell people about our food. '+
            'I （　Y　）, too, so I want to cook a local dish for visitors from other countries.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Riku の発言から抜き出して書きなさい。<br>"+E("Riku wants to teach visitors [　　] the garden slowly."),
      answers:["how to walk"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("bad"),E("easy"),E("difficult"),E("sad")], answer:1 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("How much is this map?"), E("Whose video is this?"),
                E("Why did you come to this town?"), E("What time does the festival start?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Riku wants to make an English map of the town."),
                E("Aoi doesn't like cooking with her grandmother."),
                E("Sho wants to write a long book about the garden."),
                E("Mr. Hill came to this town to study Japanese food.") ], answer:0 },
    { type:"mcq", label:"(5)Y", pt:3, stem:"（Y）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("am good at swimming"), E("like our local food"),
                E("want to study science"), E("don't have any hobbies") ], answer:1 } ]}
]},

/* ===== 大問5 長文スピーチ（意見文）　33点 ===== */
{ no:5, title:"次の英文は、ボランティア部のハナ(Hana)が発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Hana from the volunteer club. Today I want to talk about my experience of cleaning our old Japanese garden. '+
    'When I was in my first year, I did not know much about my town. But now I really love it. I want to share my story with you.<br><br>'+
    '<b>②</b> Last spring, I joined the volunteer club. At first, cleaning the garden was very hard for me. '+
    'There were many leaves on the ground, and I got tired soon. I sometimes wanted to stop joining the work. '+
    'One day, an old man in the garden saw me. He said, "Don\'t give up. If you keep working, you will learn many things." '+
    'These words <u>(お) ___</u> my mind. I decided to try harder.<br><br>'+
    '<b>③</b> After that, I worked very hard. A kind woman in the club also helped me a lot. '+
    'She taught me how to take care of the old trees. She said, "You should not pull the branches. Touching them gently keeps the trees healthy." '+
    'I followed her advice. Little by little, I learned the history of the garden.<br><br>'+
    '<b>④</b> Some people say that cleaning is only hard work. That\'s true. <u>④ Cleaning the garden is a good way to make the place more beautiful</u>. '+
    'But it is more than that for me. <u>③ ( me / volunteer work / many things / taught )</u>. '+
    'I learned that I should not stop trying. When I keep working, I can <u>(か) ___</u> my goal. '+
    'So please don\'t give up, and find something you love in your town!',
    passageEn:true,
    note:'語注：give up あきらめる／leaf(leaves) 葉／branch 枝／gently やさしく／advice 助言',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お changed　か lose"), E("お changed　か reach"),
                E("お lost　か lose"), E("お lost　か reach") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "ハナは一生けんめい働いた。", "クラブの女性が木の世話の仕方を教えてくれた。",
                "女性は枝を引っぱるべきだと言った。", "ハナは少しずつ庭園の歴史を学んだ。" ], answer:2 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["me","volunteer work","many things","taught"], answer:"Volunteer work taught me many things",
      display:"Volunteer work taught me many things" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語2語を、第2段落中から抜き出して書きなさい。<br>"+E("The old man told Hana not to （　え　）."),
      answers:["give up"], hint:"第2段落の語・英語2語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>庭園のそうじは、その場所を（　①　）（　②　）するためのよい方法だ。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "より美しく","より大きく","より静かに","より新しく" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "する（〜にする）","売る","こわす","かりる" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Hana did not know much about her town in her first year."),
                E("Hana never wanted to stop joining the work."),
                E("An old man told Hana to keep working."),
                E("The woman in the club said that Hana should pull the branches."),
                E("Hana thinks cleaning is only hard work for her.") ], answer:[0,2] } ]}
]}

]};
