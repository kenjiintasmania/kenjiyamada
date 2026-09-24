/* data/chu2_231.js ─ 中2 習熟度テスト対策 231（2学期末）
   参照：先生提供の「2年 No.3 Aコース」用紙の**傾向のみ**（大問1〜7の構成・問題数・
   配点バランス・X/Yコース選択）。本文・設問・選択肢・語句はすべて新規創作。
   題材：みどり図書館の読書週間（大問2）／吹奏楽部のコンサート（大問3）／
         川の清掃ボランティア（大問5）。既存の模試データと内容の重複なし。
   配点：1コースぶんで ちょうど100点（24+13+17+10+16+12+8）。 */
const E = s => '<span class="en">'+s+'</span>';
const W = s => '<span class="who" style="font-family:var(--en)">'+s+'</span>';

window.EXAM = {
title: "中2 習熟度テスト対策 231",
sections: [

/* ===== 大問1 リスニング（24点） ===== */
{ no:1, title:"リスニングテスト", lead:"放送を聞いて、(1)〜(3)の問いに答えなさい（実際の試験では音声が流れます）。", groups:[

  { intro:"(1) 絵や表の内容に合う英文を、ア〜ウから1つずつ選びなさい。英文は2回読まれます。",
    items:[
      { type:"mcq", label:"①", pt:2,
        stem:'<div class="scene">絵：女の子が公園で犬といっしょに走っている。うしろの時計は4時30分。</div>',
        choices:[E("She is walking with her dog. It's four thirty."),
                 E("She is running with her dog. It's four thirty."),
                 E("She is running with her dog. It's three forty.")], answer:1 },
      { type:"mcq", label:"②", pt:2,
        stem:'<div class="scene">絵：男の子が台所でカレーを作っている。そばでお母さんが見ている。</div>',
        choices:[E("He is eating curry in the kitchen."),
                 E("He is washing the dishes in the kitchen."),
                 E("He is making curry in the kitchen.")], answer:2 },
      { type:"mcq", label:"③", pt:2,
        stem:'<div class="scene">表：<table><tr><th>名前</th><th>部活</th><th>好きな季節</th></tr>'+
             '<tr><td>ハルト</td><td>吹奏楽部</td><td>冬</td></tr>'+
             '<tr><td>ミオ</td><td>テニス部</td><td>春</td></tr>'+
             '<tr><td>ケイタ</td><td>吹奏楽部</td><td>夏</td></tr></table></div>',
        choices:[E("Two students are in the brass band. Mio likes spring."),
                 E("Two students are in the tennis club. Keita likes winter."),
                 E("Three students are in the brass band. Haruto likes summer.")], answer:0 }
    ] },

  { script:"Sam: Aya, what did you do last weekend?\n"+
           "Aya: I went to the city library with my brother. I borrowed three books.\n"+
           "Sam: Three books? What kind of books do you like?\n"+
           "Aya: I like books about animals. My brother likes history books. He borrowed five books.\n"+
           "Sam: Wow. I want to read Japanese books, but they are difficult for me.\n"+
           "Aya: You can find easy English books there, too. The library opens at nine thirty.\n"+
           "Sam: Great. I will go there next Saturday. Will you come with me?\n"+
           "Aya: Sorry, I have a piano lesson on Saturday morning. How about Sunday afternoon?\n"+
           "Sam: OK. Let's meet at two.",
    intro:"(2) サム(Sam)とアヤ(Aya)の対話を聞き、そのあとの①〜④の質問の答えとして最も適切なものを、ア〜エから1つずつ選びなさい。",
    items:[
      { type:"mcq", label:"①", pt:3, stem:E("Where did Aya go last weekend?"),
        choices:[E("To the museum."),E("To the city library."),E("To the piano school."),E("To Sam's house.")], answer:1 },
      { type:"mcq", label:"②", pt:3, stem:E("How many books did Aya's brother borrow?"),
        choices:[E("Two."),E("Three."),E("Five."),E("Eight.")], answer:2 },
      { type:"mcq", label:"③", pt:3, stem:E("Does Sam want to read Japanese books?"),
        choices:[E("Yes, he does."),E("Yes, he did."),E("No, he doesn't."),E("No, he didn't.")], answer:0 },
      { type:"mcq", label:"④", pt:3, stem:E("When will Sam and Aya go to the library?"),
        choices:[E("On Saturday morning."),E("On Saturday afternoon."),E("On Sunday morning."),E("On Sunday afternoon.")], answer:3 }
    ] },

  { passage:'<div class="scene">①の絵：ケンタが本だなの前で、1冊の本に手をのばしている。</div>'+
            '<div class="scene">②の表：みどり図書館の開館時間<table>'+
            '<tr><th>曜日</th><th>開館時間</th></tr>'+
            '<tr><td>月</td><td>休館</td></tr>'+
            '<tr><td>火〜金</td><td>9:30〜18:00</td></tr>'+
            '<tr><td>土・日</td><td>9:30〜17:00</td></tr></table></div>',
    script:"① Is Kenta looking for a book?\n② What time does the library close on Sunday?",
    intro:"(3) ①の絵と②の表を見て、放送される質問の答えとして最も適切なものを、ア〜エから1つずつ選びなさい。質問は2回ずつ読まれます。",
    items:[
      { type:"mcq", label:"①", pt:3, stem:"①の絵についての質問",
        choices:[E("Yes, he is."),E("Yes, he does."),E("No, he isn't."),E("No, he doesn't.")], answer:0 },
      { type:"mcq", label:"②", pt:3, stem:"②の表についての質問",
        choices:[E("At nine thirty."),E("At five."),E("At six."),E("At seven.")], answer:1 }
    ] }
]},

/* ===== 大問2 対話＋ちらし（13点） ===== */
{ no:2, title:"次は、中学生のユイとマーク(Mark)の対話文です。次のちらし(leaflet)を参考にしながら、よく読んで、あとの(1)〜(3)の問いに答えなさい。", groups:[
  { flyer:'<h4>★ みどり図書館だより ★</h4>'+
          '<div class="note">＜今月のお知らせ＞</div>'+
          '<table><tr><td>・11月10日（火）は開館記念日のため、本をふだんより多く借りられます。<br>'+
          '　　ふだん：3冊まで　／　その日だけ：5冊まで</td></tr>'+
          '<tr><td>・読書週間　期間：11月2日（月）〜11月15日（日）<br>'+
          '　　テーマ：「（　ⓐ　）に読みたい一冊」</td></tr></table>'+
          '<div class="note" style="margin-top:6px">＜イベント＞</div>'+
          '<table><tr><th>内容</th><th>開始時刻</th></tr>'+
          '<tr><td>○ 英語の絵本を読もう（11月2日より）</td><td>13:30〜</td></tr>'+
          '<tr><td>○ おはなし会</td><td>14:00〜</td></tr>'+
          '<tr><td>○ 本のしおり作り</td><td>10:30〜／15:30〜</td></tr></table>'+
          '<div class="note">開館時間：9:30〜18:00　　休館日：月曜日</div>',
    passage:
      W("Yui:")+" "+E("Hi, Mark. Do you have any plans for next （　①　）?")+"<br>"+
      W("Mark:")+" "+E("Hi, Yui. You mean November 10? That day is the opening anniversary of the library.")+"<br>"+
      W("Yui:")+" "+E("Yes. Look at this leaflet from Midori Library. On that day we can borrow （　②　） books, not three.")+"<br>"+
      W("Mark:")+" "+E("That's nice. Well, I have a swimming lesson in the morning on that day. Can we go there in the afternoon?")+"<br>"+
      W("Yui:")+" "+E("Sure. Let's meet at Midori Station at one and walk together. We can get to the library at one fifteen.")+"<br>"+
      W("Mark:")+" "+E("OK. Well, we can join the story time only from two. Why don't we read English picture books first? It will start at one thirty.")+"<br>"+
      W("Yui:")+" "+E("Good. After that, maybe we will have some time. We can make bookmarks in the afternoon, too. Let's make them after the story time.")+"<br>"+
      W("Mark:")+" "+E("Winter is coming. I want to find a good book for cold days.")+"<br>"+
      W("Yui:")+" "+E("Then the theme of this reading week is perfect for you.")+"<br>"+
      '<div class="note">[注] leaflet ちらし　opening anniversary 開館記念日　borrow 〜を借りる　'+
      'story time おはなし会　Why don\'t we 〜? 〜しませんか。　bookmark しおり</div>',
    items:[
      { type:"fill", label:"(1)①", pt:3, stem:"①の（　）内にあてはまる最も適切な英語を1語で書きなさい。",
        answers:["Tuesday"], hint:"曜日・英語1語" },
      { type:"fill", label:"(1)②", pt:3, stem:"②の（　）内にあてはまる最も適切な英語を1語で書きなさい。",
        answers:["five"], hint:"数・英語1語" },
      { type:"fill", label:"(2)", pt:3, stem:"ちらしの中の（　ⓐ　）にあてはまる最も適切な日本語を書きなさい。",
        answers:["冬"], hint:"漢字1字" },
      { type:"mcq", label:"(3)", pt:4, stem:"ユイとマークの図書館でのスケジュールとして最も適切なものを、ア〜エから1つ選びなさい。",
        choices:["しおり作り　→　おはなし会　→　英語の絵本",
                 "おはなし会　→　しおり作り　→　英語の絵本",
                 "英語の絵本　→　おはなし会　→　しおり作り",
                 "おはなし会　→　英語の絵本　→　しおり作り"], answer:2 }
    ] }
]},

/* ===== 大問3 対話（17点） ===== */
{ no:3, title:"次は、中学生のハルトと留学生のルーカス(Lucas)の対話文です。よく読んで、あとの(1)〜(4)の問いに答えなさい。", groups:[
  { passage:
      W("Haruto:")+" "+E("Lucas, this is our music room.")+"<br>"+
      W("Lucas:")+" "+E("Your music room is nice, Haruto. Oh, I see a trumpet near the window. Do you play it?")+"<br>"+
      W("Haruto:")+" "+E("Yes. I'm a member of the brass band in this school. I practice it before school every morning.")+"<br>"+
      W("Lucas:")+" "+E("Great.")+"　<b>［　ⓐ　］</b><br>"+
      W("Haruto:")+" "+E("In this room. There are twenty-five students in the brass band, and they're my good friends.")+"<br>"+
      W("Lucas:")+" "+E("<u>That</u>'s nice.")+"<br>"+
      W("Haruto:")+" "+E("We will have a concert at the city hall on the second Sunday of December. So we are practicing hard for it now.")+"<br>"+
      W("Lucas:")+" "+E("I see. Well, my sister will come to Japan on December 5 and stay here for two weeks. Her name is Anna. I think she wants to listen to Japanese music. Can we come to your concert?")+"<br>"+
      W("Haruto:")+" "+E("Sure. The concert will start at one.")+"<br>"+
      W("Lucas:")+" <b>［　Ａ　］</b><br>"+
      W("Haruto:")+" "+E("It will start at one thirty. And maybe the last song will be around three. After the concert, children and beginners can try the instruments.")+"<br>"+
      W("Lucas:")+" "+E("Oh, Anna will be happy.")+"<br>"+
      W("Haruto:")+" "+E("Why don't you try it with her?")+"<br>"+
      W("Lucas:")+" "+E("Well, I'm not good at music.")+"<br>"+
      W("Haruto:")+" <b>［　Ｂ　］</b> "+E("I think you can enjoy it.")+"<br>"+
      W("Lucas:")+" "+E("OK. I'll try it.")+"<br>"+
      W("Haruto:")+" "+E("Good.")+"<br>"+
      '<div class="note">[注] brass band 吹奏楽部　city hall 市民ホール　beginner 初心者　'+
      'instrument 楽器　Why don\'t you 〜? 〜しませんか。</div>',
    items:[
      { type:"fill", label:"(1)", pt:4, stem:"［　ⓐ　］にあてはまる適切な文を、英文1文で書きなさい。",
        answers:["Where do you practice it?","Where do you practice?"], hint:"Where で始める英文" },
      { type:"fill", label:"(2)", pt:4, stem:"下線部 That が指す内容を具体的に日本語で書きなさい。",
        answers:["吹奏楽部に25人の生徒がいて、その人たちがハルトの仲のよい友達だということ"],
        hint:"「〜ということ」の形で" },
      { type:"bankpick", label:"(3)Ａ", pt:3, stem:"［　Ａ　］にあてはまる最も適切な文を、ア〜オから1つ選びなさい。",
        bank:[E("How was the concert?"),E("Trying new things is fun."),E("Will you play the trumpet?"),
              E("You cannot try new things."),E("What time will your part start?")], answer:4 },
      { type:"bankpick", label:"(3)Ｂ", pt:3, stem:"［　Ｂ　］にあてはまる最も適切な文を、ア〜オから1つ選びなさい。",
        bank:[E("How was the concert?"),E("Trying new things is fun."),E("Will you play the trumpet?"),
              E("You cannot try new things."),E("What time will your part start?")], answer:1 },
      { type:"fill", label:"(4)", pt:3,
        stem:"対話文の内容について、次の質問に答えなさい。ただし、主語と動詞を含む英文1文で書きなさい。<br>"+E("When will Anna come to Japan?"),
        answers:["She will come to Japan on December 5.","She will come on December 5."], hint:"主語と動詞のある英文1文" }
    ] }
]},

/* ===== 大問4（10点） ===== */
{ no:4, title:"次の(1)、(2)の問いに答えなさい。", groups:[
  { intro:"(1) 次の絵は、アメリカにいるエリック(Eric)が電話でユカに質問しているところです。エリックはどのような質問をしましたか。下線部に適切な英語を書き、英文を完成させなさい。",
    items:[
      { type:"fill", label:"①", pt:4,
        stem:'<div class="scene">絵：エリックが電話で「＿＿＿＿＿ in Japan?」とたずね、ユカが「It\'s ten o\'clock.」と答えている。</div>'+
             E("＿＿＿＿＿＿＿＿＿＿ in Japan?"),
        answers:["what time is it"], hint:"What で始める・in Japan? の前まで" }
    ] },
  { intro:"(2) 次の語を正しく並べて英文を完成させなさい。",
    items:[
      { type:"wordorder", label:"", pt:6, stem:"次の語を正しく並べて英文を完成させなさい。",
        words:["to","be","want","a","I","teacher","music"],
        answer:"I want to be a music teacher.", display:"I want to be a music teacher." }
    ] }
]},

/* ===== 大問5 長文（16点） ===== */
{ no:5, title:"次は、中学生のソウタが書いた英文です。よく読んで、あとの(1)〜(4)の問いに答えなさい。", groups:[
  { passage:
      E("I'm Sota. I live in Aoba with my father and mother. I'm in the science club at school. I study rivers on Tuesdays and Thursdays. I like science. My mother is a nurse at a hospital. My father works at a city office.")+
      " <b>［ア］</b> "+
      E("His name is Takeshi, and he is sixty-eight. He lives near my house. He teaches fishing to children by the river. I'm one of them. He is very kind, but sometimes strict when I learn fishing from him. I like him very much.")+
      "<br><br>"+
      E("One Saturday morning, Takeshi said to me, \"I will clean the river with people in our town next Sunday. Some people from other countries will join us.\"")+
      " <b>［イ］</b> "+
      E("\"Please help me.\" I said, \"Do you think I can help them?\" He said, \"I think you can. It will be a good chance for you because you can speak English a little.\" I said, \"OK. I'll help you.\"")+
      "<br><br>"+
      E("The next Sunday, I went to the river with Takeshi. Many people were there. Some of them were from other countries.")+
      " <b>［ウ］</b> "+
      E("I was nervous, but I tried to talk with them in English. They asked a lot of questions. For example, \"What kind of fish live in this river?\" and \"Where should we put the cans?\" I learned a lot of things about the river from Takeshi, so I could answer people from other countries. I was glad about <u>that</u>.")+
      "<br><br>"+
      E("After the cleaning, I talked with Takeshi. He said, \"You helped many people. Thank you. Did you have a good time?\" I said, \"Yes. When I talked with people, my knowledge about the river helped me. I want to learn about it more. Also, I will try to learn other things.\" He smiled and said, \"You are great.\"")+
      '<div class="note">[注] science club 科学部　nurse 看護師　city office 市役所　fishing 魚つり　'+
      'strict きびしい　clean 〜をそうじする　chance 機会　nervous 緊張して　for example 例えば　'+
      'can かん　glad うれしい　cleaning そうじ　knowledge 知識</div>',
    items:[
      { type:"mcq", label:"(1)", pt:3,
        stem:"次の英文は、本文の ［ア］〜［ウ］ のどこに入りますか。最も適切なものを1つ選びなさい。<br>"+
             E("When they are busy, my grandfather helps me."),
        choices:["［ア］","［イ］","［ウ］"], answer:0 },
      { type:"fill", label:"(2)", pt:4, stem:"下線部 that が指す内容を具体的に日本語で書きなさい。",
        answers:["武から川についてたくさんのことを学んでいたので、外国から来た人たちの質問に答えられたこと"],
        hint:"「〜こと」の形で" },
      { type:"mcq", label:"(3)①", pt:3, stem:E("Where did Takeshi clean with people in his town?"),
        choices:[E("At Sota's house."),E("At the hospital."),E("At the river."),E("At the city office.")], answer:2 },
      { type:"mcq", label:"(3)②", pt:3, stem:E("What does Sota want to do after the cleaning?"),
        choices:[E("He wants to learn only about fishing."),
                 E("He wants to learn about the river and other things."),
                 E("He wants to learn English in other countries."),
                 E("He wants to teach fishing to children.")], answer:1 },
      { type:"mcq", label:"(4)", pt:3, stem:"本文の内容に合うものを、ア〜エから1つ選びなさい。",
        choices:[E("Sota studies rivers in the science club every day."),
                 E("Takeshi is always very kind when he teaches fishing."),
                 E("Takeshi thought that the cleaning was a good chance for Sota."),
                 E("The people from other countries asked a lot of questions about Sota.")], answer:2 }
    ] }
]},

/* ===== 大問6 並べかえ（X・Yコース選択・各12点） ===== */
{ no:6, title:"並べかえ（X・Yコースのどちらかを選んで答えなさい）",
  lead:"［　］内の語（句）を正しく並べかえ、英文を完成させましょう。文の最初にくる語も小文字で示しています。",
  courses:[
  { name:"Xコース", items:[
    { type:"wordorder", label:"(1)", pt:3,
      stem:"A: You ［ "+E("must / read / this / book")+" ］ today.　B: OK.",
      words:["must","read","this","book"], answer:"You must read this book today.",
      display:"You must read this book today." },
    { type:"wordorder", label:"(2)", pt:3,
      stem:"A: Please ［ "+E("bring / something / eat / to")+" ］ tomorrow.　B: All right.",
      words:["bring","something","eat","to"], answer:"Please bring something to eat tomorrow.",
      display:"Please bring something to eat tomorrow." },
    { type:"wordorder", label:"(3)", pt:3,
      stem:"A: You ［ "+E("to / don't / wash / have")+" ］ the car. I'll do it.　B: Oh, thank you.",
      words:["to","don't","wash","have"], answer:"You don't have to wash the car.",
      display:"You don't have to wash the car." },
    { type:"wordorder", label:"(4)", pt:3,
      stem:"A: Why did you go to the park?　B: I went ［ "+E("to / my / meet / there")+" ］ friend.",
      words:["to","my","meet","there"], answer:"I went there to meet my friend.",
      display:"I went there to meet my friend." }
  ]},
  { name:"Yコース", items:[
    { type:"wordorder", label:"(1)", pt:3,
      stem:"A: Do you ［ "+E("know / how / cook / to")+" ］ curry?　B: Oh, yes. Please teach me.",
      words:["know","how","cook","to"], answer:"Do you know how to cook curry?",
      display:"Do you know how to cook curry?" },
    { type:"wordorder", label:"(2)", pt:3,
      stem:"A: I ［ "+E("you / show / my pictures / will")+" ］ tomorrow.　B: Thank you.",
      words:["you","show","my pictures","will"], answer:"I will show you my pictures tomorrow.",
      display:"I will show you my pictures tomorrow." },
    { type:"wordorder", label:"(3)", pt:3,
      stem:"A: I will buy this bag for my sister.　B: Cool! I'm ［ "+E("she / sure / like / will")+" ］ it.",
      words:["she","sure","like","will"], answer:"I'm sure she will like it.",
      display:"I'm sure she will like it." },
    { type:"wordorder", label:"(4)", pt:3,
      stem:"A: What's your name?　B: I'm Naoko. ［ "+E("friends / me / my / call")+" ］ Nao.",
      words:["friends","me","my","call"], answer:"My friends call me Nao.",
      display:"My friends call me Nao." }
  ]}
]},

/* ===== 大問7 1語補充（8点） ===== */
{ no:7, title:"次の対話文が成り立つように、①〜④の（　）内にあてはまる最も適切な英語を、それぞれ1語ずつ書きなさい。", groups:[
  { passage:
      W("Rika:")+" "+E("I like sports, and I often enjoy （　①　） tennis.")+"<br>"+
      W("Tom:")+" "+E("What kind of sports do you like?")+"<br>"+
      W("Rika:")+" "+E("I like winter sports. Are you interested （　②　） them?")+"<br>"+
      W("Tom:")+" "+E("Oh, yes. Skiing is exciting.")+"<br>"+
      W("Rika:")+" "+E("That's right. Well, Yuki and I are （　③　） to go to a ski school next month.")+"<br>"+
      "　　　 "+E("（　④　） you are free, please join us.")+"<br>"+
      W("Tom:")+" "+E("Thank you. I want to go with you.")+"<br>"+
      '<div class="note">[注] skiing スキー　free ひまな</div>',
    items:[
      { type:"fill", label:"①", pt:2, stem:"①に入る英語1語", answers:["playing"], hint:"enjoy のあとの形" },
      { type:"fill", label:"②", pt:2, stem:"②に入る英語1語", answers:["in"], hint:"be interested 〜" },
      { type:"fill", label:"③", pt:2, stem:"③に入る英語1語", answers:["going"], hint:"be 〜 to ＝〜する予定だ" },
      { type:"fill", label:"④", pt:2, stem:"④に入る英語1語", answers:["If"], hint:"「もし〜なら」" }
    ] }
]}

]};
