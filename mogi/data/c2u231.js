/* data/c2u231.js ─ 中2 単元テスト231（初見・自動採点のみ・先生が受付を開けた時だけ）
   構成・問題数・配点は data/chu2_231.js（中2 231）と同じ（連動）。文法は同じ・単語だけ入れかえ。
   出題範囲：must / have to ・不定詞（目的・something to 〜）・how to ・動名詞 ・be going to ・if ・
             SVOO（show you 〜）・SVOC（call me 〜）・that節の省略・What time is it
   題材：さくら公民館の手作りフェア（大問2）／合唱部のコンサート（大問3）／
         海岸の清掃ボランティア（大問5）。模試231・232・c2u1〜c2u3 と内容の重複なし。
   配点：24+13+17+10+16+12+8 ＝ ちょうど100点（37問）。 */
const E = s => '<span class="en">'+s+'</span>';
const W = s => '<span class="who" style="font-family:var(--en)">'+s+'</span>';

window.EXAM = {
title: "中2 単元テスト231",
sections: [

/* ===== 大問1 リスニング（24点） ===== */
{ no:1, title:"リスニングテスト", lead:"放送を聞いて、(1)〜(3)の問いに答えなさい（実際の試験では音声が流れます）。", groups:[

  { intro:"(1) 絵や表の内容に合う英文を、ア〜ウから1つずつ選びなさい。英文は2回読まれます。",
    items:[
      { type:"mcq", label:"①", pt:2,
        stem:'<div class="scene">絵：男の子が海辺で犬といっしょに歩いている。うしろの時計は5時15分。</div>',
        choices:[E("He is running with his dog. It's five fifteen."),
                 E("He is walking with his dog. It's four fifty."),
                 E("He is walking with his dog. It's five fifteen.")], answer:2 },
      { type:"mcq", label:"②", pt:2,
        stem:'<div class="scene">絵：女の子が台所でクッキーを作っている。そばでお父さんが見ている。</div>',
        choices:[E("She is making cookies in the kitchen."),
                 E("She is eating cookies in the kitchen."),
                 E("She is washing the dishes in the kitchen.")], answer:0 },
      { type:"mcq", label:"③", pt:2,
        stem:'<div class="scene">表：<table><tr><th>名前</th><th>部活</th><th>好きな教科</th></tr>'+
             '<tr><td>アオイ</td><td>合唱部</td><td>理科</td></tr>'+
             '<tr><td>ソラ</td><td>サッカー部</td><td>音楽</td></tr>'+
             '<tr><td>ユウタ</td><td>合唱部</td><td>英語</td></tr></table></div>',
        choices:[E("Two students are in the soccer club. Yuta likes science."),
                 E("Three students are in the chorus club. Aoi likes music."),
                 E("Two students are in the chorus club. Sora likes music.")], answer:2 }
    ] },

  { script:"Emma: Ken, what did you do last Sunday?\n"+
           "Ken: I went to the city museum with my sister. I saw many old pictures.\n"+
           "Emma: Old pictures? What kind of pictures do you like?\n"+
           "Ken: I like pictures of the sea. My sister likes pictures of flowers. She bought four postcards.\n"+
           "Emma: Nice. I want to see Japanese pictures, but I don't know much about them.\n"+
           "Ken: You can get an English map of the museum there. The museum opens at ten.\n"+
           "Emma: Great. I'll visit it next Sunday. Do you want to go with me?\n"+
           "Ken: Sorry, I have tennis practice on Sunday morning. How about Sunday afternoon?\n"+
           "Emma: OK. Let's meet at one thirty.",
    intro:"(2) エマ(Emma)とケン(Ken)の対話を聞き、そのあとの①〜④の質問の答えとして最も適切なものを、ア〜エから1つずつ選びなさい。",
    items:[
      { type:"mcq", label:"①", pt:3, stem:E("Where did Ken go last Sunday?"),
        choices:[E("To the city zoo."),E("To the tennis court."),E("To the city museum."),E("To Emma's house.")], answer:2 },
      { type:"mcq", label:"②", pt:3, stem:E("How many postcards did Ken's sister buy?"),
        choices:[E("Two."),E("Four."),E("Six."),E("Ten.")], answer:1 },
      { type:"mcq", label:"③", pt:3, stem:E("Does Emma want to see Japanese pictures?"),
        choices:[E("Yes, she does."),E("Yes, she did."),E("No, she doesn't."),E("No, she didn't.")], answer:0 },
      { type:"mcq", label:"④", pt:3, stem:E("When will Emma and Ken meet?"),
        choices:[E("At one on Saturday."),E("At ten on Sunday."),E("At one thirty on Saturday."),E("At one thirty on Sunday.")], answer:3 }
    ] },

  { passage:'<div class="scene">①の絵：ハナが黒板の前で、1枚の絵をかいている。</div>'+
            '<div class="scene">②の表：さくら公民館の開館時間<table>'+
            '<tr><th>曜日</th><th>開館時間</th></tr>'+
            '<tr><td>月</td><td>休館</td></tr>'+
            '<tr><td>火〜金</td><td>9:00〜20:00</td></tr>'+
            '<tr><td>土・日</td><td>9:00〜17:30</td></tr></table></div>',
    script:"① Is Hana drawing a picture?\n② What time does the community center close on Saturday?",
    intro:"(3) ①の絵と②の表を見て、放送される質問の答えとして最も適切なものを、ア〜エから1つずつ選びなさい。質問は2回ずつ読まれます。",
    items:[
      { type:"mcq", label:"①", pt:3, stem:"①の絵についての質問",
        choices:[E("Yes, she does."),E("Yes, she is."),E("No, she doesn't."),E("No, she isn't.")], answer:1 },
      { type:"mcq", label:"②", pt:3, stem:"②の表についての質問",
        choices:[E("At nine."),E("At five thirty."),E("At six thirty."),E("At eight.")], answer:1 }
    ] }
]},

/* ===== 大問2 対話＋ちらし（13点） ===== */
{ no:2, title:"次は、中学生のメイとジャック(Jack)の対話文です。次のちらし(leaflet)を参考にしながら、よく読んで、あとの(1)〜(3)の問いに答えなさい。", groups:[
  { flyer:'<h4>★ さくら公民館だより ★</h4>'+
          '<div class="note">＜今月のお知らせ＞</div>'+
          '<table><tr><td>・12月25日（金）は開館10周年の日のため、教室にふだんより多く参加できます。<br>'+
          '　　ふだん：2つまで　／　その日だけ：6つまで</td></tr>'+
          '<tr><td>・手作りフェア　期間：12月14日（月）〜12月27日（日）<br>'+
          '　　テーマ：「（　ⓐ　）に使いたい手作りの一品」</td></tr></table>'+
          '<div class="note" style="margin-top:6px">＜イベント＞</div>'+
          '<table><tr><th>内容</th><th>開始時刻</th></tr>'+
          '<tr><td>○ 英語の歌を歌おう（12月14日より）</td><td>13:30〜</td></tr>'+
          '<tr><td>○ 人形劇</td><td>14:00〜</td></tr>'+
          '<tr><td>○ 年賀状作り</td><td>10:30〜／15:30〜</td></tr></table>'+
          '<div class="note">開館時間：9:00〜20:00（土・日は17:30まで）　　休館日：月曜日</div>',
    passage:
      W("Mei:")+" "+E("Hi, Jack. Are you busy next （　①　）?")+"<br>"+
      W("Jack:")+" "+E("Hi, Mei. You mean December 25? The community center will be ten years old on that day.")+"<br>"+
      W("Mei:")+" "+E("Right. Look at this leaflet from Sakura Community Center. On that day we can join （　②　） classes, not two.")+"<br>"+
      W("Jack:")+" "+E("Sounds good. Well, I'll practice soccer in the morning on that day. Can we visit it in the afternoon?")+"<br>"+
      W("Mei:")+" "+E("Sure. Let's meet at Sakura Station at one and walk there together. We'll get to the center at one fifteen.")+"<br>"+
      W("Jack:")+" "+E("OK. Well, the puppet show starts at two, so we can't see it before that. Why don't we sing English songs first? That class will start at one thirty.")+"<br>"+
      W("Mei:")+" "+E("Good idea. After that, I think we'll have some free time. We can make New Year's cards in the afternoon, too. Let's make them after the puppet show.")+"<br>"+
      W("Jack:")+" "+E("New Year's Day is coming soon. I want to make a nice card for the new year.")+"<br>"+
      W("Mei:")+" "+E("Then the theme of this craft fair is just right for you.")+"<br>"+
      '<div class="note">[注] leaflet ちらし　community center 公民館　puppet show 人形劇　'+
      'Why don\'t we 〜? 〜しませんか。　New Year\'s card 年賀状　craft fair 手作りフェア</div>',
    items:[
      { type:"fill", label:"(1)①", pt:3, stem:"①の（　）内にあてはまる最も適切な英語を1語で書きなさい。",
        answers:["Friday"], hint:"曜日・英語1語" },
      { type:"fill", label:"(1)②", pt:3, stem:"②の（　）内にあてはまる最も適切な英語を1語で書きなさい。",
        answers:["six"], hint:"数・英語1語" },
      { type:"fill", label:"(2)", pt:3, stem:"ちらしの中の（　ⓐ　）にあてはまる最も適切な日本語を書きなさい。",
        answers:["正月","お正月","新年"], hint:"漢字2字" },
      { type:"mcq", label:"(3)", pt:4, stem:"メイとジャックの公民館でのスケジュールとして最も適切なものを、ア〜エから1つ選びなさい。",
        choices:["人形劇　→　英語の歌　→　年賀状作り",
                 "英語の歌　→　人形劇　→　年賀状作り",
                 "年賀状作り　→　人形劇　→　英語の歌",
                 "人形劇　→　年賀状作り　→　英語の歌"], answer:1 }
    ] }
]},

/* ===== 大問3 対話（17点） ===== */
{ no:3, title:"次は、中学生のダイキと留学生のオリバー(Oliver)の対話文です。よく読んで、あとの(1)〜(4)の問いに答えなさい。", groups:[
  { passage:
      W("Daiki:")+" "+E("Oliver, this is the music room of our school.")+"<br>"+
      W("Oliver:")+" "+E("It's a nice room, Daiki. Oh, I see a big piano by the window. Can you play it?")+"<br>"+
      W("Daiki:")+" "+E("No, our teacher plays it. I'm a member of the chorus club in this school. I practice singing after school every day.")+"<br>"+
      W("Oliver:")+" "+E("Great.")+"　<b>［　ⓐ　］</b><br>"+
      W("Daiki:")+" "+E("In this room. There are thirty members in the chorus club, and they are all my good friends.")+"<br>"+
      W("Oliver:")+" "+E("<u>That</u>'s wonderful.")+"<br>"+
      W("Daiki:")+" "+E("We will have a concert at the town hall on the third Saturday of December. So we are practicing hard now.")+"<br>"+
      W("Oliver:")+" "+E("I see. Well, my brother will come to Japan on December 12 and stay here for three weeks. His name is Noah. I think he wants to hear Japanese songs. Can we go to your concert?")+"<br>"+
      W("Daiki:")+" "+E("Of course. The doors will open at twelve thirty.")+"<br>"+
      W("Oliver:")+" <b>［　Ａ　］</b><br>"+
      W("Daiki:")+" "+E("We will sing at two. And maybe our last song will be around three thirty. After the concert, children and beginners can sing with us on the stage.")+"<br>"+
      W("Oliver:")+" "+E("Oh, Noah will like that.")+"<br>"+
      W("Daiki:")+" "+E("Why don't you sing with him?")+"<br>"+
      W("Oliver:")+" "+E("Well, I'm not good at singing.")+"<br>"+
      W("Daiki:")+" <b>［　Ｂ　］</b> "+E("I'm sure you can enjoy it.")+"<br>"+
      W("Oliver:")+" "+E("OK. I'll try.")+"<br>"+
      W("Daiki:")+" "+E("Great.")+"<br>"+
      '<div class="note">[注] chorus club 合唱部　member 部員　town hall 町民ホール　beginner 初心者　'+
      'stage ステージ　Why don\'t you 〜? 〜しませんか。</div>',
    items:[
      { type:"fill", label:"(1)", pt:4, stem:"［　ⓐ　］にあてはまる適切な文を、英文1文で書きなさい。",
        answers:["Where do you practice singing?","Where do you sing?","Where do you practice the songs?"], hint:"Where で始める英文" },
      { type:"fill", label:"(2)", pt:4, stem:"下線部 That が指す内容を具体的に日本語で書きなさい。",
        answers:["合唱部に30人の部員がいて、その人たちがみんなダイキの仲のよい友達だということ"],
        hint:"「〜ということ」の形で" },
      { type:"bankpick", label:"(3)Ａ", pt:3, stem:"［　Ａ　］にあてはまる最も適切な文を、ア〜オから1つ選びなさい。",
        bank:[E("Singing with others is fun."),E("What time will your club sing?"),E("How many songs did you sing last year?"),
              E("You cannot sing new songs."),E("Will you sing a song for us now?")], answer:1 },
      { type:"bankpick", label:"(3)Ｂ", pt:3, stem:"［　Ｂ　］にあてはまる最も適切な文を、ア〜オから1つ選びなさい。",
        bank:[E("Singing with others is fun."),E("What time will your club sing?"),E("How many songs did you sing last year?"),
              E("You cannot sing new songs."),E("Will you sing a song for us now?")], answer:0 },
      { type:"fill", label:"(4)", pt:3,
        stem:"対話文の内容について、次の質問に答えなさい。ただし、主語と動詞を含む英文1文で書きなさい。<br>"+E("When will Noah come to Japan?"),
        answers:["He will come to Japan on December 12.","He will come on December 12."], hint:"主語と動詞のある英文1文" }
    ] }
]},

/* ===== 大問4（10点） ===== */
{ no:4, title:"次の(1)、(2)の問いに答えなさい。", groups:[
  { intro:"(1) 次の絵は、オーストラリアにいるエマ(Emma)が電話でリクに質問しているところです。エマはどのような質問をしましたか。下線部に適切な英語を書き、英文を完成させなさい。",
    items:[
      { type:"fill", label:"①", pt:4,
        stem:'<div class="scene">絵：エマが電話で「＿＿＿＿＿ now?」とたずね、リクが「It\'s seven thirty in Japan.」と答えている。</div>'+
             E("＿＿＿＿＿＿＿＿＿＿ now?"),
        answers:["what time is it in Japan","what time is it there"], hint:"What で始める・now? の前まで" }
    ] },
  { intro:"(2) 次の語を正しく並べて英文を完成させなさい。",
    items:[
      { type:"wordorder", label:"", pt:6, stem:"次の語を正しく並べて英文を完成させなさい。",
        words:["be","to","want","good","I","singer","a"],
        answer:"I want to be a good singer.", display:"I want to be a good singer." }
    ] }
]},

/* ===== 大問5 長文（16点） ===== */
{ no:5, title:"次は、中学生のヒカリが書いた英文です。よく読んで、あとの(1)〜(4)の問いに答えなさい。", groups:[
  { passage:
      E("I'm Hikari. I live in Hamano with my father and mother. I'm in the nature club at school. I study sea animals on Mondays and Wednesdays. I like the sea very much. My mother is a teacher at a junior high school. My father drives a bus in our town.")+
      " <b>［ア］</b> "+
      E("My grandmother lives next to my house. Her name is Fumiko, and she is seventy-two. She teaches children about sea animals at the beach. I'm one of those children. She is very kind, but sometimes strict when I learn from her. She is a good teacher for me.")+
      "<br><br>"+
      E("One Sunday morning, Fumiko said to me, \"I will clean the beach with people in our town next Saturday. Some students from other countries will join us.\"")+
      " <b>［イ］</b> "+
      E("\"So please help me.\" I said, \"Do you think I can do that?\" She said, \"Yes, I do. It will be a great chance for you because you study English hard.\" I said, \"All right. I'll help you.\"")+
      "<br><br>"+
      E("The next Saturday, I went to the beach with Fumiko. A lot of people were there. Some of them were students from other countries.")+
      " <b>［ウ］</b> "+
      E("I was nervous, but I tried to speak to them in English. They asked me many questions. For example, \"What kind of birds come to this beach?\" and \"Where should we put these bottles?\" I learned a lot about the sea from Fumiko, so I could answer the students from other countries. I was really happy about <u>that</u>.")+
      "<br><br>"+
      E("After the cleaning, I talked with Fumiko. She said, \"You helped a lot of people today. Thank you. Did you have fun?\" I said, \"Yes. When I talked with the students, my knowledge about the sea helped me. I want to know more about it. And I will try other things, too.\" She smiled and said, \"You did well.\"")+
      '<div class="note">[注] nature club 自然部　sea animal 海の生き物　drive 〜を運転する　strict きびしい　'+
      'clean 〜をそうじする　chance 機会　nervous 緊張して　for example 例えば　bottle びん　'+
      'cleaning そうじ　knowledge 知識</div>',
    items:[
      { type:"mcq", label:"(1)", pt:3,
        stem:"次の英文は、本文の ［ア］〜［ウ］ のどこに入りますか。最も適切なものを1つ選びなさい。<br>"+
             E("She also said, \"I can't speak English well.\""),
        choices:["［ア］","［イ］","［ウ］"], answer:1 },
      { type:"fill", label:"(2)", pt:4, stem:"下線部 that が指す内容を具体的に日本語で書きなさい。",
        answers:["文子から海についてたくさんのことを学んでいたので、外国から来た生徒たちの質問に答えられたこと"],
        hint:"「〜こと」の形で" },
      { type:"mcq", label:"(3)①", pt:3, stem:E("Where did Fumiko clean with people in her town?"),
        choices:[E("At Hikari's school."),E("At the beach."),E("At the bus station."),E("At the junior high school.")], answer:1 },
      { type:"mcq", label:"(3)②", pt:3, stem:E("What does Hikari want to do after the cleaning?"),
        choices:[E("She wants to learn only about sea animals from Fumiko."),
                 E("She wants to visit other countries to study English."),
                 E("She wants to know about the sea and other things."),
                 E("She wants to teach children about sea animals at the beach.")], answer:2 },
      { type:"mcq", label:"(4)", pt:3, stem:"本文の内容に合うものを、ア〜エから1つ選びなさい。",
        choices:[E("Hikari studies sea animals in the nature club every day."),
                 E("Fumiko is always kind when she teaches children at the beach."),
                 E("The students from other countries asked many questions about Hikari."),
                 E("Fumiko thought that the cleaning was a good chance for Hikari.")], answer:3 }
    ] }
]},

/* ===== 大問6 並べかえ（X・Yコース選択・各12点） ===== */
{ no:6, title:"並べかえ（X・Yコースのどちらかを選んで答えなさい）",
  lead:"［　］内の語（句）を正しく並べかえ、英文を完成させましょう。文の最初にくる語も小文字で示しています。",
  courses:[
  { name:"Xコース", items:[
    { type:"wordorder", label:"(1)", pt:3,
      stem:"A: You ［ "+E("must / take / an / umbrella")+" ］ today.　B: OK.",
      words:["must","take","an","umbrella"], answer:"You must take an umbrella today.",
      display:"You must take an umbrella today." },
    { type:"wordorder", label:"(2)", pt:3,
      stem:"A: Please ［ "+E("bring / something / read / to")+" ］ on the train.　B: All right.",
      words:["bring","something","read","to"], answer:"Please bring something to read on the train.",
      display:"Please bring something to read on the train." },
    { type:"wordorder", label:"(3)", pt:3,
      stem:"A: You ［ "+E("to / don't / cook / have")+" ］ dinner tonight. I'll do it.　B: Thanks a lot.",
      words:["to","don't","cook","have"], answer:"You don't have to cook dinner tonight.",
      display:"You don't have to cook dinner tonight." },
    { type:"wordorder", label:"(4)", pt:3,
      stem:"A: Why did you go to the station?　B: I went ［ "+E("to / my / see / there")+" ］ aunt.",
      words:["to","my","see","there"], answer:"I went there to see my aunt.",
      display:"I went there to see my aunt." }
  ]},
  { name:"Yコース", items:[
    { type:"wordorder", label:"(1)", pt:3,
      stem:"A: Do you ［ "+E("know / how / play / to")+" ］ shogi?　B: Yes. Shall I teach you?",
      words:["know","how","play","to"], answer:"Do you know how to play shogi?",
      display:"Do you know how to play shogi?" },
    { type:"wordorder", label:"(2)", pt:3,
      stem:"A: I ［ "+E("you / show / my notebook / will")+" ］ tomorrow.　B: Thank you.",
      words:["you","show","my notebook","will"], answer:"I will show you my notebook tomorrow.",
      display:"I will show you my notebook tomorrow." },
    { type:"wordorder", label:"(3)", pt:3,
      stem:"A: I will make a cake for my brother.　B: Nice! I'm ［ "+E("he / sure / enjoy / will")+" ］ it.",
      words:["he","sure","enjoy","will"], answer:"I'm sure he will enjoy it.",
      display:"I'm sure he will enjoy it." },
    { type:"wordorder", label:"(4)", pt:3,
      stem:"A: Hi, I'm Mika. What's your name?　B: I'm Hiroshi. ［ "+E("teammates / me / my / call")+" ］ Hiro.",
      words:["teammates","me","my","call"], answer:"My teammates call me Hiro.",
      display:"My teammates call me Hiro." }
  ]}
]},

/* ===== 大問7 1語補充（8点） ===== */
{ no:7, title:"次の対話文が成り立つように、①〜④の（　）内にあてはまる最も適切な英語を、それぞれ1語ずつ書きなさい。", groups:[
  { passage:
      W("Saki:")+" "+E("I like music, and I often enjoy （　①　） songs with my friends.")+"<br>"+
      W("Jim:")+" "+E("What kind of songs do you sing?")+"<br>"+
      W("Saki:")+" "+E("I sing English songs. Are you good （　②　） singing?")+"<br>"+
      W("Jim:")+" "+E("Oh, yes. Singing is a lot of fun.")+"<br>"+
      W("Saki:")+" "+E("That's right. Well, Emi and I will join a music event next month. It is going （　③　） be exciting.")+"<br>"+
      "　　　 "+E("（　④　） you are free, please come with us.")+"<br>"+
      W("Jim:")+" "+E("Thank you. I want to sing with you.")+"<br>"+
      '<div class="note">[注] event 行事　free ひまな</div>',
    items:[
      { type:"fill", label:"①", pt:2, stem:"①に入る英語1語", answers:["singing"], hint:"enjoy のあとの形" },
      { type:"fill", label:"②", pt:2, stem:"②に入る英語1語", answers:["at"], hint:"be good 〜" },
      { type:"fill", label:"③", pt:2, stem:"③に入る英語1語", answers:["to"], hint:"「〜するつもり・〜でしょう」be going 〜" },
      { type:"fill", label:"④", pt:2, stem:"④に入る英語1語", answers:["If"], hint:"「もし〜なら」" }
    ] }
]}

]};
