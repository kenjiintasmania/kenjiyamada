/* data/chu2_232.js ─ 中2 習熟度テスト対策 232（2学期末）
   構成・問題数・配点は data/chu2_231.js（中2 231）と完全に同じ（大問1〜7・大問6はX/Yコース選択）。
   本文・設問・選択肢・語句はすべて新規創作。
   題材：わかば科学館の冬の星空ウィーク（大問2）／美術部の作品展（大問3）／
         おばのパン屋とチャリティーバザー（大問5）。模試231・c2u1〜c2u3 と内容の重複なし。
   文法の山：must / have to / 不定詞（名詞・副詞・形容詞用法）/ what to・how to / 動名詞 /
             be going to / will / SVOO(told me a story) / SVOC(call our dog Momo) / that節の省略
   配点：1コースぶんで ちょうど100点（24+13+17+10+16+12+8）。 */
const E = s => '<span class="en">'+s+'</span>';
const W = s => '<span class="who" style="font-family:var(--en)">'+s+'</span>';

window.EXAM = {
title: "中2 習熟度テスト対策 232",
sections: [

/* ===== 大問1 リスニング（24点） ===== */
{ no:1, title:"リスニングテスト", lead:"放送を聞いて、(1)〜(3)の問いに答えなさい（実際の試験では音声が流れます）。", groups:[

  { intro:"(1) 絵や表の内容に合う英文を、ア〜ウから1つずつ選びなさい。英文は2回読まれます。",
    items:[
      { type:"mcq", label:"①", pt:2,
        stem:'<div class="scene">絵：女の子が木の下にすわって本を読んでいる。うしろの時計は3時15分。</div>',
        choices:[E("She is reading a book under the tree. It's three fifteen."),
                 E("She is sleeping under the tree. It's three fifteen."),
                 E("She is reading a book under the tree. It's three fifty.")], answer:0 },
      { type:"mcq", label:"②", pt:2,
        stem:'<div class="scene">絵：男の子が自分の部屋でギターをひいている。妹がベッドにすわって聞いている。</div>',
        choices:[E("He is cleaning his room with his sister."),
                 E("He is playing the guitar in his room."),
                 E("He is listening to music in the living room.")], answer:1 },
      { type:"mcq", label:"③", pt:2,
        stem:'<div class="scene">表：<table><tr><th>名前</th><th>部活</th><th>好きな教科</th></tr>'+
             '<tr><td>ユウキ</td><td>美術部</td><td>理科</td></tr>'+
             '<tr><td>サクラ</td><td>科学部</td><td>英語</td></tr>'+
             '<tr><td>ダイキ</td><td>美術部</td><td>英語</td></tr></table></div>',
        choices:[E("Two students are in the science club. Yuki likes English."),
                 E("Three students like English. Daiki is in the science club."),
                 E("Two students are in the art club. Sakura likes English.")], answer:2 }
    ] },

  { script:"Emma: Riku, what are you going to do during the winter vacation?\n"+
           "Riku: I'm going to visit my grandmother in Nagano. I will stay there for four days and ski with my cousins.\n"+
           "Emma: Four days? That sounds fun. I want to see a lot of snow.\n"+
           "Riku: You can see it in Nagano. How about you, Emma? What are you going to do?\n"+
           "Emma: I'm going to stay in this town. I want to go to the new science museum. It will open on December 26.\n"+
           "Riku: Oh, I want to go there, too. I will come back from Nagano on December 25. Shall we go together on the 26th?\n"+
           "Emma: Sure. The museum opens at nine, but it will be crowded in the morning. Let's go there in the afternoon.\n"+
           "Riku: OK. Let's meet at the station at one.",
    intro:"(2) エマ(Emma)とリク(Riku)の対話を聞き、そのあとの①〜④の質問の答えとして最も適切なものを、ア〜エから1つずつ選びなさい。",
    items:[
      { type:"mcq", label:"①", pt:3, stem:E("Where is Riku going to go during the winter vacation?"),
        choices:[E("To Hokkaido."),E("To Nagano."),E("To the science museum."),E("To Emma's house.")], answer:1 },
      { type:"mcq", label:"②", pt:3, stem:E("How long will Riku stay with his grandmother?"),
        choices:[E("For two days."),E("For three days."),E("For four days."),E("For five days.")], answer:2 },
      { type:"mcq", label:"③", pt:3, stem:E("What does Emma want to see?"),
        choices:[E("A lot of snow."),E("Riku's cousins."),E("Old temples."),E("Riku's grandmother.")], answer:0 },
      { type:"mcq", label:"④", pt:3, stem:E("When will Emma and Riku go to the museum?"),
        choices:[E("On December 25 in the morning."),E("On December 25 in the afternoon."),
                 E("On December 26 in the morning."),E("On December 26 in the afternoon.")], answer:3 }
    ] },

  { passage:'<div class="scene">①の絵：雨の中、ミカがバス停に立っている。かさは持っていない。</div>'+
            '<div class="scene">②の表：わかば科学館の入館料<table>'+
            '<tr><th>区分</th><th>入館料</th></tr>'+
            '<tr><td>大人</td><td>600円</td></tr>'+
            '<tr><td>中学生</td><td>300円</td></tr>'+
            '<tr><td>小学生</td><td>200円</td></tr>'+
            '<tr><td>5才以下</td><td>無料</td></tr></table></div>',
    script:"① Does Mika have an umbrella?\n② How much is a ticket for a junior high school student?",
    intro:"(3) ①の絵と②の表を見て、放送される質問の答えとして最も適切なものを、ア〜エから1つずつ選びなさい。質問は2回ずつ読まれます。",
    items:[
      { type:"mcq", label:"①", pt:3, stem:"①の絵についての質問",
        choices:[E("Yes, she is."),E("Yes, she does."),E("No, she isn't."),E("No, she doesn't.")], answer:3 },
      { type:"mcq", label:"②", pt:3, stem:"②の表についての質問",
        choices:[E("Two hundred yen."),E("Three hundred yen."),E("Six hundred yen."),E("It's free.")], answer:1 }
    ] }
]},

/* ===== 大問2 対話＋ちらし（13点） ===== */
{ no:2, title:"次は、中学生のサキとベン(Ben)の対話文です。次のちらし(leaflet)を参考にしながら、よく読んで、あとの(1)〜(3)の問いに答えなさい。", groups:[
  { flyer:'<h4>★ わかば科学館だより ★</h4>'+
          '<div class="note">＜今月のお知らせ＞</div>'+
          '<table><tr><td>・12月12日（土）は開館10周年の記念日のため、入館料がふだんの半額になります。<br>'+
          '　　ふだん：中学生300円　／　その日だけ：中学生150円</td></tr>'+
          '<tr><td>・冬の星空ウィーク　期間：12月5日（土）〜12月20日（日）</td></tr></table>'+
          '<div class="note" style="margin-top:6px">＜イベント＞</div>'+
          '<table><tr><th>内容</th><th>開始時刻</th></tr>'+
          '<tr><td>○ プラネタリウム（12月5日より）</td><td>14:00〜</td></tr>'+
          '<tr><td>○ 星のおはなし会</td><td>15:00〜</td></tr>'+
          '<tr><td>○ 星座カード作り</td><td>11:00〜／16:00〜</td></tr>'+
          '<tr><td>○ 夜の観察会（12月12日のみ）　望遠鏡で（　ⓐ　）を見よう</td><td>18:00〜</td></tr></table>'+
          '<div class="note">開館時間：9:30〜17:30（12月12日は20:00まで）　　休館日：月曜日</div>',
    passage:
      W("Saki:")+" "+E("Hi, Ben. Are you free next （　①　）?")+"<br>"+
      W("Ben:")+" "+E("Hi, Saki. You mean December 12? What's happening on that day?")+"<br>"+
      W("Saki:")+" "+E("Look at this leaflet from Wakaba Science Museum. That day is the tenth anniversary of the museum. We can buy a ticket at （　②　） price, so it's only one hundred and fifty yen.")+"<br>"+
      W("Ben:")+" "+E("That's nice. Well, I have soccer practice in the morning on that day. Can we go there in the afternoon?")+"<br>"+
      W("Saki:")+" "+E("Sure. Let's meet at Wakaba Station at one thirty and walk together. We can get to the museum at one forty-five.")+"<br>"+
      W("Ben:")+" "+E("OK. Then we can watch the planetarium show first. After that, let's join the star story time at three.")+"<br>"+
      W("Saki:")+" "+E("Good. I want to make a star card, too. We can't make it at eleven, so let's make it after the story time.")+"<br>"+
      W("Ben:")+" "+E("Sure. Oh, look. There is a night event on that day. This month we can see the moon clearly through the telescope.")+"<br>"+
      W("Saki:")+" "+E("Great. I want to stay for it. I'll ask my mother.")+"<br>"+
      '<div class="note">[注] leaflet ちらし　tenth anniversary 10周年　price 値段　'+
      'planetarium プラネタリウム　story time おはなし会　telescope 望遠鏡</div>',
    items:[
      { type:"fill", label:"(1)①", pt:3, stem:"①の（　）内にあてはまる最も適切な英語を1語で書きなさい。",
        answers:["Saturday"], hint:"曜日・英語1語" },
      { type:"fill", label:"(1)②", pt:3, stem:"②の（　）内にあてはまる最も適切な英語を1語で書きなさい。",
        answers:["half"], hint:"英語1語" },
      { type:"fill", label:"(2)", pt:3, stem:"ちらしの中の（　ⓐ　）にあてはまる最も適切な日本語を書きなさい。",
        answers:["月"], hint:"漢字1字" },
      { type:"mcq", label:"(3)", pt:4, stem:"サキとベンの科学館でのスケジュールとして最も適切なものを、ア〜エから1つ選びなさい。",
        choices:["星座カード作り　→　プラネタリウム　→　おはなし会",
                 "プラネタリウム　→　星座カード作り　→　おはなし会",
                 "おはなし会　→　プラネタリウム　→　星座カード作り",
                 "プラネタリウム　→　おはなし会　→　星座カード作り"], answer:3 }
    ] }
]},

/* ===== 大問3 対話（17点） ===== */
{ no:3, title:"次は、中学生のハナと留学生のノア(Noah)の対話文です。よく読んで、あとの(1)〜(4)の問いに答えなさい。", groups:[
  { passage:
      W("Hana:")+" "+E("Noah, this is our art room.")+"<br>"+
      W("Noah:")+" "+E("Your art room is big, Hana. Oh, I see a lot of pictures on the wall. Did you draw them?")+"<br>"+
      W("Hana:")+" "+E("Some of them. I'm a member of the art club in this school. I draw pictures here after school every day.")+"<br>"+
      W("Noah:")+" "+E("Great.")+"　<b>［　ⓐ　］</b><br>"+
      W("Hana:")+" "+E("Eighteen. We draw together in this room, and we often show our pictures to each other.")+"<br>"+
      W("Noah:")+" "+E("<u>That</u>'s nice.")+"<br>"+
      W("Hana:")+" "+E("We will have an art show at the city gallery on the third Saturday of December. So we are working hard for it now.")+"<br>"+
      W("Noah:")+" "+E("I see. Well, my brother will come to Japan on December 18 and stay here for ten days. His name is Leo. I think he wants to see Japanese pictures. Can we go to your show?")+"<br>"+
      W("Hana:")+" "+E("Sure. The show will be from ten to five.")+"<br>"+
      W("Noah:")+" <b>［　Ａ　］</b><br>"+
      W("Hana:")+" "+E("Yes, you can. And at two, we will teach visitors how to draw with a brush and ink. Children and beginners can try it.")+"<br>"+
      W("Noah:")+" "+E("Oh, Leo will be happy.")+"<br>"+
      W("Hana:")+" "+E("Why don't you try it with him?")+"<br>"+
      W("Noah:")+" "+E("Well, I'm not good at drawing.")+"<br>"+
      W("Hana:")+" <b>［　Ｂ　］</b> "+E("I think you can enjoy it.")+"<br>"+
      W("Noah:")+" "+E("OK. I'll try it.")+"<br>"+
      W("Hana:")+" "+E("Good.")+"<br>"+
      '<div class="note">[注] art club 美術部　each other おたがい　art show 作品展　city gallery 市民ギャラリー　'+
      'visitor 来場者　brush ふで　ink すみ　beginner 初心者　Why don\'t you 〜? 〜しませんか。</div>',
    items:[
      { type:"fill", label:"(1)", pt:4, stem:"［　ⓐ　］にあてはまる適切な文を、英文1文で書きなさい。",
        answers:["How many students are in the art club?","How many students are there in the art club?",
                 "How many members are in the art club?","How many members does the art club have?"],
        hint:"How many で始める英文" },
      { type:"fill", label:"(2)", pt:4, stem:"下線部 That が指す内容を具体的に日本語で書きなさい。",
        answers:["美術部の18人がこの部屋でいっしょに絵をかいて、よくおたがいに絵を見せ合っているということ"],
        hint:"「〜ということ」の形で" },
      { type:"bankpick", label:"(3)Ａ", pt:3, stem:"［　Ａ　］にあてはまる最も適切な文を、ア〜オから1つ選びなさい。",
        bank:[E("Did you finish your picture?"),E("You don't have to draw well."),E("Will you buy a picture?"),
              E("You should not try new things."),E("Can we take pictures there?")], answer:4 },
      { type:"bankpick", label:"(3)Ｂ", pt:3, stem:"［　Ｂ　］にあてはまる最も適切な文を、ア〜オから1つ選びなさい。",
        bank:[E("Did you finish your picture?"),E("You don't have to draw well."),E("Will you buy a picture?"),
              E("You should not try new things."),E("Can we take pictures there?")], answer:1 },
      { type:"fill", label:"(4)", pt:3,
        stem:"対話文の内容について、次の質問に答えなさい。ただし、主語と動詞を含む英文1文で書きなさい。<br>"+E("How long will Leo stay in Japan?"),
        answers:["He will stay in Japan for ten days.","He will stay there for ten days.","He will stay for ten days."],
        hint:"主語と動詞のある英文1文" }
    ] }
]},

/* ===== 大問4（10点） ===== */
{ no:4, title:"次の(1)、(2)の問いに答えなさい。", groups:[
  { intro:"(1) 次の絵は、カナダにいるケイト(Kate)が電話でユカに質問しているところです。ケイトはどのような質問をしましたか。下線部に適切な英語を書き、英文を完成させなさい。",
    items:[
      { type:"fill", label:"①", pt:4,
        stem:'<div class="scene">絵：ケイトが電話で「＿＿＿＿＿ today?」とたずね、ユカが「It\'s snowing.」と答えている。</div>'+
             E("＿＿＿＿＿＿＿＿＿＿ today?"),
        answers:["how is the weather","how's the weather","how is the weather there","how's the weather there",
                 "what is the weather like","what's the weather like"],
        hint:"How で始める・today? の前まで" }
    ] },
  { intro:"(2) 次の語を正しく並べて英文を完成させなさい。",
    items:[
      { type:"wordorder", label:"", pt:6, stem:"次の語を正しく並べて英文を完成させなさい。",
        words:["bought","me","father","my","a","new","bike"],
        answer:"My father bought me a new bike.", display:"My father bought me a new bike." }
    ] }
]},

/* ===== 大問5 長文（16点） ===== */
{ no:5, title:"次は、中学生のミキが書いた英文です。よく読んで、あとの(1)〜(4)の問いに答えなさい。", groups:[
  { passage:
      E("I'm Miki. I live in Hikari Town with my parents and my little brother. I'm in the cooking club at school. We cook on Mondays and Wednesdays. I like cooking. My mother is a teacher at an elementary school. My father works at a post office. My aunt Yoko lives near the station.")+
      " <b>［ア］</b> "+
      E("She is forty-five, and she has a small bakery. She makes delicious bread every morning. When I have time, I help her at the bakery. She is cheerful, but sometimes strict when I make bread with her. I like her very much.")+
      "<br><br>"+
      E("One Friday evening, Yoko said to me, \"Next Sunday, there will be a charity bazaar at the town hall. I will sell bread there. The money will go to a children's hospital.\"")+
      " <b>［イ］</b> "+
      E("\"Please help me at the bazaar.\" I said, \"Do you think I can sell bread?\" She said, \"I think you can. You know a lot about my bread because you help me every weekend.\" I said, \"OK. I'll help you.\"")+
      "<br><br>"+
      E("On Sunday, I went to the town hall with Yoko. Many people came to our table. Some of them were mothers with small children.")+
      " <b>［ウ］</b> "+
      E("I was nervous, but I tried to talk with them. They asked me a lot of questions. For example, \"Does this bread have eggs in it? My son can't eat eggs.\" and \"Which bread is good for small children?\" I learned about Yoko's bread every weekend, so I could answer their questions. I was glad about <u>that</u>.")+
      "<br><br>"+
      E("After the bazaar, I talked with Yoko. She said, \"You helped many people today. Thank you. Did you have a good time?\" I said, \"Yes. When I talked with people, my knowledge about your bread helped me. I want to learn more about bread. Also, I want to make bread for the children in the hospital someday.\" She smiled and said, \"That's a great dream.\"")+
      '<div class="note">[注] cooking club 料理部　elementary school 小学校　post office 郵便局　aunt おば　'+
      'bakery パン屋　cheerful 明るい　strict きびしい　charity bazaar チャリティーバザー　town hall 町民会館　'+
      'nervous 緊張して　for example 例えば　glad うれしい　knowledge 知識　someday いつか</div>',
    items:[
      { type:"mcq", label:"(1)", pt:3,
        stem:"次の英文は、本文の ［ア］〜［ウ］ のどこに入りますか。最も適切なものを1つ選びなさい。<br>"+
             E("Many people will come, so I need some help."),
        choices:["［ア］","［イ］","［ウ］"], answer:1 },
      { type:"fill", label:"(2)", pt:4, stem:"下線部 that が指す内容を具体的に日本語で書きなさい。",
        answers:["毎週末ヨウコのパンについて学んでいたので、お客さんの質問に答えられたこと"],
        hint:"「〜こと」の形で" },
      { type:"mcq", label:"(3)①", pt:3, stem:E("Where did Yoko sell bread?"),
        choices:[E("At the station."),E("At the town hall."),E("At the children's hospital."),E("At Miki's school.")], answer:1 },
      { type:"mcq", label:"(3)②", pt:3, stem:E("What does Miki want to do someday?"),
        choices:[E("She wants to be a teacher like her mother."),
                 E("She wants to work at a post office."),
                 E("She wants to open a bakery near the station."),
                 E("She wants to make bread for the children in the hospital.")], answer:3 },
      { type:"mcq", label:"(4)", pt:3, stem:"本文の内容に合うものを、ア〜エから1つ選びなさい。",
        choices:[E("Miki cooks in the cooking club every day after school."),
                 E("Miki could answer the questions because she helped Yoko every weekend."),
                 E("Yoko is always cheerful when she makes bread with Miki."),
                 E("The money from the bazaar will go to Miki's school.")], answer:1 }
    ] }
]},

/* ===== 大問6 並べかえ（X・Yコース選択・各12点） ===== */
{ no:6, title:"並べかえ（X・Yコースのどちらかを選んで答えなさい）",
  lead:"［　］内の語（句）を正しく並べかえ、英文を完成させましょう。文の最初にくる語も小文字で示しています。",
  courses:[
  { name:"Xコース", items:[
    { type:"wordorder", label:"(1)", pt:3,
      stem:"A: We ［ "+E("must / finish / this / work")+" ］ today.　B: OK. Let's do it now.",
      words:["must","finish","this","work"], answer:"We must finish this work today.",
      display:"We must finish this work today." },
    { type:"wordorder", label:"(2)", pt:3,
      stem:"A: I have ［ "+E("a lot of / things / to / do")+" ］ today.　B: Can I help you?",
      words:["a lot of","things","to","do"], answer:"I have a lot of things to do today.",
      display:"I have a lot of things to do today." },
    { type:"wordorder", label:"(3)", pt:3,
      stem:"A: Do ［ "+E("have / I / to / go")+" ］ there now?　B: No, you don't.",
      words:["have","I","to","go"], answer:"Do I have to go there now?",
      display:"Do I have to go there now?" },
    { type:"wordorder", label:"(4)", pt:3,
      stem:"A: Why did you get up so early?　B: I got up early ［ "+E("to / catch / the first / train")+" ］.",
      words:["to","catch","the first","train"], answer:"I got up early to catch the first train.",
      display:"I got up early to catch the first train." }
  ]},
  { name:"Yコース", items:[
    { type:"wordorder", label:"(1)", pt:3,
      stem:"A: I ［ "+E("don't / know / what / to")+" ］ say.　B: Just say \"Thank you.\"",
      words:["don't","know","what","to"], answer:"I don't know what to say.",
      display:"I don't know what to say." },
    { type:"wordorder", label:"(2)", pt:3,
      stem:"A: He ［ "+E("told / me / an interesting / story")+" ］ yesterday.　B: Really? Tell me about it.",
      words:["told","me","an interesting","story"], answer:"He told me an interesting story yesterday.",
      display:"He told me an interesting story yesterday." },
    { type:"wordorder", label:"(3)", pt:3,
      stem:"A: Where is Ken?　B: I ［ "+E("think / he / will / be")+" ］ late today.",
      words:["think","he","will","be"], answer:"I think he will be late today.",
      display:"I think he will be late today." },
    { type:"wordorder", label:"(4)", pt:3,
      stem:"A: Is that your dog?　B: Yes. We ［ "+E("call / our / dog / Momo")+" ］.",
      words:["call","our","dog","Momo"], answer:"We call our dog Momo.",
      display:"We call our dog Momo." }
  ]}
]},

/* ===== 大問7 1語補充（8点） ===== */
{ no:7, title:"次の対話文が成り立つように、①〜④の（　）内にあてはまる最も適切な英語を、それぞれ1語ずつ書きなさい。", groups:[
  { passage:
      W("Ken:")+" "+E("I like winter sports. How about （　①　） skiing with us next month?")+"<br>"+
      W("Lisa:")+" "+E("Sounds fun, but I'm not good （　②　） skiing.")+"<br>"+
      W("Ken:")+" "+E("Don't worry. My father will teach you. He was a ski teacher.")+"<br>"+
      W("Lisa:")+" "+E("Really? Then I want to go. But I have （　③　） ask my parents first.")+"<br>"+
      W("Ken:")+" "+E("Of course.")+"<br>"+
      W("Lisa:")+" "+E("Thank you （　④　） inviting me, Ken.")+"<br>"+
      '<div class="note">[注] skiing スキー　invite 〜を招待する</div>',
    items:[
      { type:"fill", label:"①", pt:2, stem:"①に入る英語1語", answers:["going"], hint:"How about のあとの形" },
      { type:"fill", label:"②", pt:2, stem:"②に入る英語1語", answers:["at"], hint:"be good 〜" },
      { type:"fill", label:"③", pt:2, stem:"③に入る英語1語", answers:["to"], hint:"「〜しなければならない」の形" },
      { type:"fill", label:"④", pt:2, stem:"④に入る英語1語", answers:["for"], hint:"Thank you 〜 …ing" }
    ] }
]}

]};
