/* data/c2u232.js ─ 中2 単元テスト232（初見・自動採点のみ・先生が受付を開けた時だけ）
   構成・問題数・配点は data/chu2_232.js（中2 232）と同じ（連動）。文法は同じ・単語だけ入れかえ。
   題材：みなと水族館の冬のイルカウィーク（大問2）／書道部の作品展（大問3）／
         おじの花屋と秋祭り（大問5）。模試231・232・c2u1〜c2u3 と内容の重複なし。
   文法の山：must / have to / 不定詞（名詞・副詞・形容詞用法）/ what to・how to / 動名詞 / be good at /
             be going to / will / SVOO(told me a story) / SVOC(call our cat Kuro) / that節の省略
   配点：24+13+17+10+16+12+8 ＝ ちょうど100点（37問）。 */
const E = s => '<span class="en">'+s+'</span>';
const W = s => '<span class="who" style="font-family:var(--en)">'+s+'</span>';

window.EXAM = {
title: "中2 単元テスト232",
sections: [

/* ===== 大問1 リスニング（24点） ===== */
{ no:1, title:"リスニングテスト", lead:"放送を聞いて、(1)〜(3)の問いに答えなさい（実際の試験では音声が流れます）。", groups:[

  { intro:"(1) 絵や表の内容に合う英文を、ア〜ウから1つずつ選びなさい。英文は2回読まれます。",
    items:[
      { type:"mcq", label:"①", pt:2,
        stem:'<div class="scene">絵：男の子が公園のベンチにすわってまんがを読んでいる。うしろの時計は4時20分。</div>',
        choices:[E("He is sleeping on the bench. It's four twenty."),
                 E("He is reading a comic book on the bench. It's four twelve."),
                 E("He is reading a comic book on the bench. It's four twenty.")], answer:2 },
      { type:"mcq", label:"②", pt:2,
        stem:'<div class="scene">絵：女の子が自分の部屋でバイオリンをひいている。弟がいすにすわって聞いている。</div>',
        choices:[E("She is playing the violin in her room."),
                 E("She is cleaning her room with her brother."),
                 E("She is listening to the radio in the kitchen.")], answer:0 },
      { type:"mcq", label:"③", pt:2,
        stem:'<div class="scene">表：<table><tr><th>名前</th><th>部活</th><th>好きな教科</th></tr>'+
             '<tr><td>リン</td><td>写真部</td><td>数学</td></tr>'+
             '<tr><td>ハルト</td><td>書道部</td><td>音楽</td></tr>'+
             '<tr><td>アオイ</td><td>写真部</td><td>音楽</td></tr></table></div>',
        choices:[E("Three students like music. Rin is in the calligraphy club."),
                 E("Two students are in the photo club. Haruto likes music."),
                 E("Two students are in the calligraphy club. Aoi likes math.")], answer:1 }
    ] },

  { script:"Lucy: Sota, what are you going to do during the winter vacation?\n"+
           "Sota: I'm going to visit my grandfather in Niigata. I will stay there for six days and go snowboarding with my uncle.\n"+
           "Lucy: Six days? That sounds nice. I want to see a snow festival.\n"+
           "Sota: There is a big one in Niigata in February. How about you, Lucy? Are you going to go somewhere?\n"+
           "Lucy: No. I'm going to stay in this city. I want to go to the new aquarium. It will open on January 3.\n"+
           "Sota: Oh, I want to visit it, too. I will come home from Niigata on January 2. Shall we go together on the 3rd?\n"+
           "Lucy: Sure. The aquarium opens at ten, but it will be crowded in the morning. Let's go in the afternoon.\n"+
           "Sota: OK. Let's meet at the station at two.",
    intro:"(2) ルーシー(Lucy)とソウタ(Sota)の対話を聞き、そのあとの①〜④の質問の答えとして最も適切なものを、ア〜エから1つずつ選びなさい。",
    items:[
      { type:"mcq", label:"①", pt:3, stem:E("Where is Sota going to go during the winter vacation?"),
        choices:[E("To Niigata."),E("To Hokkaido."),E("To the aquarium."),E("To Lucy's house.")], answer:0 },
      { type:"mcq", label:"②", pt:3, stem:E("How long will Sota stay with his grandfather?"),
        choices:[E("For three days."),E("For six days."),E("For five days."),E("For seven days.")], answer:1 },
      { type:"mcq", label:"③", pt:3, stem:E("What does Lucy want to see?"),
        choices:[E("Sota's uncle."),E("Snow monkeys."),E("A snow festival."),E("Sota's grandfather.")], answer:2 },
      { type:"mcq", label:"④", pt:3, stem:E("When will Lucy and Sota go to the aquarium?"),
        choices:[E("On January 2 in the morning."),E("On January 3 in the afternoon."),
                 E("On January 2 in the afternoon."),E("On January 3 in the morning.")], answer:1 }
    ] },

  { passage:'<div class="scene">①の絵：雪の中、ケンがバス停に立っている。マフラーをしている。</div>'+
            '<div class="scene">②の表：みなと水族館の入館料<table>'+
            '<tr><th>区分</th><th>入館料</th></tr>'+
            '<tr><td>大人</td><td>1,200円</td></tr>'+
            '<tr><td>中学生</td><td>500円</td></tr>'+
            '<tr><td>小学生</td><td>400円</td></tr>'+
            '<tr><td>3才以下</td><td>無料</td></tr></table></div>',
    script:"① Does Ken have a scarf?\n② How much is a ticket for an elementary school student?",
    intro:"(3) ①の絵と②の表を見て、放送される質問の答えとして最も適切なものを、ア〜エから1つずつ選びなさい。質問は2回ずつ読まれます。",
    items:[
      { type:"mcq", label:"①", pt:3, stem:"①の絵についての質問",
        choices:[E("Yes, he is."),E("Yes, he does."),E("No, he isn't."),E("No, he doesn't.")], answer:1 },
      { type:"mcq", label:"②", pt:3, stem:"②の表についての質問",
        choices:[E("Four hundred yen."),E("Five hundred yen."),E("One thousand two hundred yen."),E("It's free.")], answer:0 }
    ] }
]},

/* ===== 大問2 対話＋ちらし（13点） ===== */
{ no:2, title:"次は、中学生のユイとサム(Sam)の対話文です。次のちらし(leaflet)を参考にしながら、よく読んで、あとの(1)〜(3)の問いに答えなさい。", groups:[
  { flyer:'<h4>★ みなと水族館だより ★</h4>'+
          '<div class="note">＜今月のお知らせ＞</div>'+
          '<table><tr><td>・12月29日（火）は開館5周年の記念日のため、中学生の入館料が100円になります。<br>'+
          '　　ふだん：中学生500円　／　その日だけ：中学生100円</td></tr>'+
          '<tr><td>・冬のイルカウィーク　期間：12月19日（土）〜1月5日（火）</td></tr></table>'+
          '<div class="note" style="margin-top:6px">＜イベント＞</div>'+
          '<table><tr><th>内容</th><th>開始時刻</th></tr>'+
          '<tr><td>○ イルカショー（12月19日より）</td><td>13:00〜／16:00〜</td></tr>'+
          '<tr><td>○ 飼育員のおはなし会</td><td>15:00〜</td></tr>'+
          '<tr><td>○ 海の生き物カード作り</td><td>11:00〜／14:00〜</td></tr>'+
          '<tr><td>○ 夜の館内ツアー（12月29日のみ）　ねむっている（　ⓐ　）を見よう</td><td>18:00〜</td></tr></table>'+
          '<div class="note">開館時間：10:00〜17:00（12月29日は20:00まで）　　休館日：月曜日（年末年始は休まず開館）</div>',
    passage:
      W("Yui:")+" "+E("Hi, Sam. Will you be busy next （　①　）?")+"<br>"+
      W("Sam:")+" "+E("Hi, Yui. You mean December 29? No, I'm not busy. Is there something special on that day?")+"<br>"+
      W("Yui:")+" "+E("Look at this leaflet from Minato Aquarium. That day is the fifth anniversary of the aquarium. We don't have to pay the （　②　） price. A ticket is only one hundred yen.")+"<br>"+
      W("Sam:")+" "+E("That's great. Well, I have a piano lesson in the morning on that day. Can we go in the afternoon?")+"<br>"+
      W("Yui:")+" "+E("Sure. Let's meet at Minato Station at one thirty and walk to the aquarium. We can get there at one forty-five.")+"<br>"+
      W("Sam:")+" "+E("OK. We can't see the one o'clock dolphin show, so let's make a sea animal card at two first. After that, let's listen to the keeper's talk at three.")+"<br>"+
      W("Yui:")+" "+E("Good. Then we can watch the dolphin show at four. I want to see the dolphins jump.")+"<br>"+
      W("Sam:")+" "+E("Me too. Oh, look. There is a night tour on that day. At night we can see sleeping fish in the big tank.")+"<br>"+
      W("Yui:")+" "+E("Wow. I want to join it. I'll ask my father.")+"<br>"+
      '<div class="note">[注] leaflet ちらし　fifth anniversary 5周年　price 値段　'+
      'dolphin イルカ　keeper 飼育員　talk おはなし会　tank 水そう</div>',
    items:[
      { type:"fill", label:"(1)①", pt:3, stem:"①の（　）内にあてはまる最も適切な英語を1語で書きなさい。",
        answers:["Tuesday"], hint:"曜日・英語1語" },
      { type:"fill", label:"(1)②", pt:3, stem:"②の（　）内にあてはまる最も適切な英語を1語で書きなさい。",
        answers:["full","usual","regular"], hint:"英語1語" },
      { type:"fill", label:"(2)", pt:3, stem:"ちらしの中の（　ⓐ　）にあてはまる最も適切な日本語を書きなさい。",
        answers:["魚"], hint:"漢字1字" },
      { type:"mcq", label:"(3)", pt:4, stem:"ユイとサムの水族館でのスケジュールとして最も適切なものを、ア〜エから1つ選びなさい。",
        choices:["海の生き物カード作り　→　飼育員のおはなし会　→　イルカショー",
                 "イルカショー　→　海の生き物カード作り　→　飼育員のおはなし会",
                 "飼育員のおはなし会　→　イルカショー　→　海の生き物カード作り",
                 "イルカショー　→　飼育員のおはなし会　→　海の生き物カード作り"], answer:0 }
    ] }
]},

/* ===== 大問3 対話（17点） ===== */
{ no:3, title:"次は、中学生のメイと留学生のリアム(Liam)の対話文です。よく読んで、あとの(1)〜(4)の問いに答えなさい。", groups:[
  { passage:
      W("Mei:")+" "+E("Liam, this is our calligraphy room.")+"<br>"+
      W("Liam:")+" "+E("Your calligraphy room is nice, Mei. Oh, I see a lot of works on the wall. Did you write them?")+"<br>"+
      W("Mei:")+" "+E("Some of them. I'm a member of the calligraphy club in this school. I write here after school three times a week.")+"<br>"+
      W("Liam:")+" "+E("Wow.")+"　<b>［　ⓐ　］</b><br>"+
      W("Mei:")+" "+E("Twenty-two. We write together in this room, and we often give advice to each other.")+"<br>"+
      W("Liam:")+" "+E("<u>That</u> sounds good.")+"<br>"+
      W("Mei:")+" "+E("We will have a calligraphy show at the town library on the second Sunday of January. So we practice hard every day now.")+"<br>"+
      W("Liam:")+" "+E("I see. Well, my sister will come to Japan on January 8 and stay here for two weeks. Her name is Lily. I think she wants to see Japanese writing. Can we visit your show?")+"<br>"+
      W("Mei:")+" "+E("Of course. The show will be from nine to four.")+"<br>"+
      W("Liam:")+" <b>［　Ａ　］</b><br>"+
      W("Mei:")+" "+E("Yes, you can. And at one, we will show visitors how to write with a big brush. Beginners and small children can try it, too.")+"<br>"+
      W("Liam:")+" "+E("Oh, Lily will be happy.")+"<br>"+
      W("Mei:")+" "+E("Why don't you join her?")+"<br>"+
      W("Liam:")+" "+E("Well, I'm not good at writing with a brush.")+"<br>"+
      W("Mei:")+" <b>［　Ｂ　］</b> "+E("I think you can have fun.")+"<br>"+
      W("Liam:")+" "+E("OK. I'll do it.")+"<br>"+
      W("Mei:")+" "+E("Great.")+"<br>"+
      '<div class="note">[注] calligraphy 書道　work 作品　each other おたがい　advice アドバイス　calligraphy show 作品展　'+
      'town library 町立図書館　visitor 来場者　brush ふで　beginner 初心者　Why don\'t you 〜? 〜しませんか。</div>',
    items:[
      { type:"fill", label:"(1)", pt:4, stem:"［　ⓐ　］にあてはまる適切な文を、英文1文で書きなさい。",
        answers:["How many students are in the calligraphy club?","How many students are there in the calligraphy club?",
                 "How many members are in the calligraphy club?","How many members does the calligraphy club have?"],
        hint:"How many で始める英文" },
      { type:"fill", label:"(2)", pt:4, stem:"下線部 That が指す内容を具体的に日本語で書きなさい。",
        answers:["書道部の22人がこの部屋でいっしょに字を書いて、よくおたがいにアドバイスをし合っているということ"],
        hint:"「〜ということ」の形で" },
      { type:"bankpick", label:"(3)Ａ", pt:3, stem:"［　Ａ　］にあてはまる最も適切な文を、ア〜オから1つ選びなさい。",
        bank:[E("You don't have to write well."),E("Will you sell your works?"),E("Can we bring small children?"),
              E("Are you good at calligraphy?"),E("You should not write too fast.")], answer:2 },
      { type:"bankpick", label:"(3)Ｂ", pt:3, stem:"［　Ｂ　］にあてはまる最も適切な文を、ア〜オから1つ選びなさい。",
        bank:[E("You don't have to write well."),E("Will you sell your works?"),E("Can we bring small children?"),
              E("Are you good at calligraphy?"),E("You should not write too fast.")], answer:0 },
      { type:"fill", label:"(4)", pt:3,
        stem:"対話文の内容について、次の質問に答えなさい。ただし、主語と動詞を含む英文1文で書きなさい。<br>"+E("How long will Lily stay in Japan?"),
        answers:["She will stay in Japan for two weeks.","She will stay there for two weeks.","She will stay for two weeks."],
        hint:"主語と動詞のある英文1文" }
    ] }
]},

/* ===== 大問4（10点） ===== */
{ no:4, title:"次の(1)、(2)の問いに答えなさい。", groups:[
  { intro:"(1) 次の絵は、ロンドンにいるトム(Tom)が電話でアヤに質問しているところです。トムはどのような質問をしましたか。下線部に適切な英語を書き、英文を完成させなさい。",
    items:[
      { type:"fill", label:"①", pt:4,
        stem:'<div class="scene">絵：トムが電話で「＿＿＿＿＿ is it in Japan today?」とたずね、アヤがカレンダーを見ながら「It\'s December 13.」と答えている。</div>'+
             E("＿＿＿＿＿＿＿＿＿＿ is it in Japan today?"),
        answers:["what date","what's the date","what is the date"],
        hint:"What で始める・is it の前まで" }
    ] },
  { intro:"(2) 次の語を正しく並べて英文を完成させなさい。",
    items:[
      { type:"wordorder", label:"", pt:6, stem:"次の語を正しく並べて英文を完成させなさい。",
        words:["bought","me","aunt","my","a","new","camera"],
        answer:"My aunt bought me a new camera.", display:"My aunt bought me a new camera." }
    ] }
]},

/* ===== 大問5 長文（16点） ===== */
{ no:5, title:"次は、中学生のユナが書いた英文です。よく読んで、あとの(1)〜(4)の問いに答えなさい。", groups:[
  { passage:
      E("I'm Yuna. I live in Sakura Town with my parents and my little sister. At school, I'm a member of the science club. We do experiments on Tuesdays and Thursdays. I like science. My mother is a nurse at a hospital near our house. My father works at a bank. My uncle Takashi lives near the park.")+
      " <b>［ア］</b> "+
      E("He is fifty, and he has a small flower shop. He grows beautiful flowers in his garden every day. When I have time, I help him at the shop. He is kind, but sometimes strict when I make a bouquet with him. I like him a lot.")+
      "<br><br>"+
      E("One Saturday morning, Takashi said to me, \"Next Sunday, there will be an autumn festival at the park. I will sell flowers there. The money will go to a nursing home.\"")+
      " <b>［イ］</b> "+
      E("\"Please help me at the festival.\" I said, \"Do you think I can sell flowers?\" He said, \"Of course you can. You know my flowers well because you help me every Saturday.\" I said, \"OK. I'll help you.\"")+
      "<br><br>"+
      E("On Sunday, I went to the park with Takashi. Many people came to our tent. Some of them were old people with their families.")+
      " <b>［ウ］</b> "+
      E("I was a little nervous, but I talked with them. They had many questions for me. For example, \"How long will these flowers stay fresh?\" and \"Which flowers are good for a small room?\" I learned about Takashi's flowers every Saturday, so I could answer their questions. I was happy about <u>that</u>.")+
      "<br><br>"+
      E("After the festival, I talked with Takashi. He said, \"You helped many people today. Thank you. Did you enjoy it?\" I said, \"Yes. When I talked with people, my knowledge about your flowers helped me. I want to learn more about flowers. Also, I want to bring flowers to the old people in the nursing home someday.\" He smiled and said, \"That's a wonderful dream.\"")+
      '<div class="note">[注] science club 科学部　experiment 実験　nurse 看護師　bank 銀行　uncle おじ　'+
      'flower shop 花屋　grow 育てる　strict きびしい　bouquet 花束　autumn festival 秋祭り　nursing home 老人ホーム　'+
      'tent テント　nervous 緊張して　for example 例えば　fresh 新鮮な　knowledge 知識　someday いつか</div>',
    items:[
      { type:"mcq", label:"(1)", pt:3,
        stem:"次の英文は、本文の ［ア］〜［ウ］ のどこに入りますか。最も適切なものを1つ選びなさい。<br>"+
             E("I didn't know what to say to them."),
        choices:["［ア］","［イ］","［ウ］"], answer:2 },
      { type:"fill", label:"(2)", pt:4, stem:"下線部 that が指す内容を具体的に日本語で書きなさい。",
        answers:["毎週土曜日にタカシの花について学んでいたので、お客さんの質問に答えられたこと"],
        hint:"「〜こと」の形で" },
      { type:"mcq", label:"(3)①", pt:3, stem:E("Where did Takashi sell flowers?"),
        choices:[E("At the bank."),E("At the nursing home."),E("At the park."),E("At Yuna's school.")], answer:2 },
      { type:"mcq", label:"(3)②", pt:3, stem:E("What does Yuna want to do someday?"),
        choices:[E("She wants to be a nurse at a hospital."),
                 E("She wants to give flowers to old people."),
                 E("She wants to work at the bank with her father."),
                 E("She wants to open her own flower shop near the park.")], answer:1 },
      { type:"mcq", label:"(4)", pt:3, stem:"本文の内容に合うものを、ア〜エから1つ選びなさい。",
        choices:[E("Yuna goes to the science club every day after school with her sister."),
                 E("Takashi is always kind when he makes a bouquet with Yuna at the shop."),
                 E("Yuna knew a lot about the flowers because she often helped Takashi."),
                 E("The money from the festival will go to the science club at Yuna's school.")], answer:2 }
    ] }
]},

/* ===== 大問6 並べかえ（X・Yコース選択・各12点） ===== */
{ no:6, title:"並べかえ（X・Yコースのどちらかを選んで答えなさい）",
  lead:"［　］内の語（句）を正しく並べかえ、英文を完成させましょう。文の最初にくる語も小文字で示しています。",
  courses:[
  { name:"Xコース", items:[
    { type:"wordorder", label:"(1)", pt:3,
      stem:"A: You ［ "+E("must / wash / your / hands")+" ］ before lunch.　B: OK. I'll do it now.",
      words:["must","wash","your","hands"], answer:"You must wash your hands before lunch.",
      display:"You must wash your hands before lunch." },
    { type:"wordorder", label:"(2)", pt:3,
      stem:"A: I have ［ "+E("a lot of / books / to / read")+" ］ this week.　B: Wow. Which one is the best?",
      words:["a lot of","books","to","read"], answer:"I have a lot of books to read this week.",
      display:"I have a lot of books to read this week." },
    { type:"wordorder", label:"(3)", pt:3,
      stem:"A: Do ［ "+E("have / I / to / come")+" ］ here tomorrow?　B: No, you don't.",
      words:["have","I","to","come"], answer:"Do I have to come here tomorrow?",
      display:"Do I have to come here tomorrow?" },
    { type:"wordorder", label:"(4)", pt:3,
      stem:"A: Why did you leave home so early?　B: I left home early ［ "+E("to / catch / the first / bus")+" ］.",
      words:["to","catch","the first","bus"], answer:"I left home early to catch the first bus.",
      display:"I left home early to catch the first bus." }
  ]},
  { name:"Yコース", items:[
    { type:"wordorder", label:"(1)", pt:3,
      stem:"A: I don't ［ "+E("know / what / to / cook")+" ］ tonight.　B: How about curry?",
      words:["know","what","to","cook"], answer:"I don't know what to cook tonight.",
      display:"I don't know what to cook tonight." },
    { type:"wordorder", label:"(2)", pt:3,
      stem:"A: She ［ "+E("told / me / a funny / story")+" ］ this morning.　B: Oh, I want to hear it.",
      words:["told","me","a funny","story"], answer:"She told me a funny story this morning.",
      display:"She told me a funny story this morning." },
    { type:"wordorder", label:"(3)", pt:3,
      stem:"A: Where is Yui?　B: I ［ "+E("think / she / will / come")+" ］ soon.",
      words:["think","she","will","come"], answer:"I think she will come soon.",
      display:"I think she will come soon." },
    { type:"wordorder", label:"(4)", pt:3,
      stem:"A: Is that your cat?　B: Yes. We ［ "+E("call / our / cat / Kuro")+" ］.",
      words:["call","our","cat","Kuro"], answer:"We call our cat Kuro.",
      display:"We call our cat Kuro." }
  ]}
]},

/* ===== 大問7 1語補充（8点） ===== */
{ no:7, title:"次の対話文が成り立つように、①〜④の（　）内にあてはまる最も適切な英語を、それぞれ1語ずつ書きなさい。", groups:[
  { passage:
      W("Mika:")+" "+E("I love winter. I'm good （　①　） skating. Will you come to the rink with us next Saturday?")+"<br>"+
      W("Jack:")+" "+E("Sounds nice, but I don't know （　②　） to skate.")+"<br>"+
      W("Mika:")+" "+E("Don't worry. My sister will teach you. She was a skating teacher.")+"<br>"+
      W("Jack:")+" "+E("Really? Then I'd love to go. But I have （　③　） ask my host family first.")+"<br>"+
      W("Mika:")+" "+E("Sure.")+"<br>"+
      W("Jack:")+" "+E("Thank you for （　④　） me about it, Mika.")+"<br>"+
      '<div class="note">[注] skating スケート　skate スケートをする　rink スケート場　host family ホストファミリー</div>',
    items:[
      { type:"fill", label:"①", pt:2, stem:"①に入る英語1語", answers:["at"], hint:"be good 〜" },
      { type:"fill", label:"②", pt:2, stem:"②に入る英語1語", answers:["how"], hint:"「〜のしかた」＝ 〜 to …" },
      { type:"fill", label:"③", pt:2, stem:"③に入る英語1語", answers:["to"], hint:"「〜しなければならない」の形" },
      { type:"fill", label:"④", pt:2, stem:"④に入る英語1語", answers:["telling"], hint:"Thank you for のあとの形（「〜に話す・伝える」）" }
    ] }
]}

]};
