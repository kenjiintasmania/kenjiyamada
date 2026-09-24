/* data/c2u3.js ─ 中2 単元テスト③（初見・自動採点のみ・先生が受付を開けた時だけ）
   構成・問題数・配点は data/chu2_231.js（中2 231）と同じ。ただし大問6のコース分けはなし。
   出題範囲：must / have to ・不定詞 ・how to ・動名詞 ・be going to ・if ・
             SVOO（show you 〜）・SVOC（call me 〜）・that節の省略
   題材：みなと市民プールの冬の水泳教室（大問2）／料理クラブのおにぎり（大問3）／
         保育園での絵本の読み聞かせ（大問5）。模試231・c2u1・c2u2 と内容の重複なし。
   配点：24+13+17+10+16+12+8 ＝ ちょうど100点（33問）。 */
const E = s => '<span class="en">'+s+'</span>';
const W = s => '<span class="who" style="font-family:var(--en)">'+s+'</span>';

window.EXAM = {
title: "中2 単元テスト③",
sections: [

/* ===== 大問1 リスニング（24点） ===== */
{ no:1, title:"リスニングテスト", lead:"放送を聞いて、(1)〜(3)の問いに答えなさい（実際の試験では音声が流れます）。", groups:[

  { intro:"(1) 絵や表の内容に合う英文を、ア〜ウから1つずつ選びなさい。英文は2回読まれます。",
    items:[
      { type:"mcq", label:"①", pt:2,
        stem:'<div class="scene">絵：男の子がプールで泳いでいる。かべの時計は3時15分。</div>',
        choices:[E("The boy is swimming in the pool. It's three fifteen."),
                 E("The boy is running by the pool. It's three fifteen."),
                 E("The boy is swimming in the pool. It's five thirty.")], answer:0 },
      { type:"mcq", label:"②", pt:2,
        stem:'<div class="scene">絵：女の子が公園のベンチで手紙を書いている。ねこがとなりにすわっている。</div>',
        choices:[E("She is reading a letter with her cat."),
                 E("She is writing a letter with her cat."),
                 E("She is feeding her cat on the bench.")], answer:1 },
      { type:"mcq", label:"③", pt:2,
        stem:'<div class="scene">表：<table><tr><th>名前</th><th>習いごと</th><th>曜日</th></tr>'+
             '<tr><td>ミナ</td><td>ピアノ</td><td>火曜日</td></tr>'+
             '<tr><td>ダイチ</td><td>水泳</td><td>木曜日</td></tr>'+
             '<tr><td>ソラ</td><td>ピアノ</td><td>金曜日</td></tr></table></div>',
        choices:[E("Two students learn the piano. Daichi swims on Thursdays."),
                 E("Two students learn swimming. Sora plays the piano on Tuesdays."),
                 E("Three students learn the piano. Mina swims on Fridays.")], answer:0 }
    ] },

  { script:"Emily: Kenta, are you free next Saturday?\n"+
           "Kenta: Yes. I have nothing to do in the afternoon. Why?\n"+
           "Emily: My host family will make okonomiyaki at home. Do you want to join us?\n"+
           "Kenta: Sure! I love okonomiyaki, but I have never made it.\n"+
           "Emily: Don't worry. My host mother will teach us. She started cooking twenty years ago.\n"+
           "Kenta: Wow. What should I bring?\n"+
           "Emily: You don't have to bring anything. Just come at four.\n"+
           "Kenta: OK. I'll bring some juice for everyone.\n"+
           "Emily: Thank you. See you on Saturday.",
    intro:"(2) エミリー(Emily)とケンタ(Kenta)の対話を聞き、そのあとの①〜④の質問の答えとして最も適切なものを、ア〜エから1つずつ選びなさい。",
    items:[
      { type:"mcq", label:"①", pt:3, stem:E("What will Emily's host family make?"),
        choices:[E("Curry."),E("Okonomiyaki."),E("Sandwiches."),E("Juice.")], answer:1 },
      { type:"mcq", label:"②", pt:3, stem:E("Has Kenta made okonomiyaki before?"),
        choices:[E("Yes, he has."),E("Yes, he did."),E("No, he hasn't."),E("No, he isn't.")], answer:2 },
      { type:"mcq", label:"③", pt:3, stem:E("What time will Kenta come?"),
        choices:[E("At two."),E("At three."),E("At four."),E("At five.")], answer:2 },
      { type:"mcq", label:"④", pt:3, stem:E("What will Kenta bring?"),
        choices:[E("Nothing."),E("Some juice."),E("Some eggs."),E("His host mother.")], answer:1 }
    ] },

  { passage:'<div class="scene">①の絵：ミナが台所でおにぎりを作っている。</div>'+
            '<div class="scene">②の表：みなと市民プールの教室<table>'+
            '<tr><th>教室</th><th>時間</th></tr>'+
            '<tr><td>子ども水泳</td><td>16:00〜17:00</td></tr>'+
            '<tr><td>おとな水泳</td><td>19:00〜20:00</td></tr>'+
            '<tr><td>水中ウォーキング</td><td>10:00〜11:00</td></tr></table></div>',
    script:"① Is Mina making rice balls?\n② What time does the children's swimming class start?",
    intro:"(3) ①の絵と②の表を見て、放送される質問の答えとして最も適切なものを、ア〜エから1つずつ選びなさい。質問は2回ずつ読まれます。",
    items:[
      { type:"mcq", label:"①", pt:3, stem:"①の絵についての質問",
        choices:[E("Yes, she is."),E("Yes, she does."),E("No, she isn't."),E("No, she doesn't.")], answer:0 },
      { type:"mcq", label:"②", pt:3, stem:"②の表についての質問",
        choices:[E("At ten."),E("At four."),E("At five."),E("At seven.")], answer:1 }
    ] }
]},

/* ===== 大問2 対話＋ちらし（13点） ===== */
{ no:2, title:"次は、中学生のアヤとベン(Ben)の対話文です。次のちらし(leaflet)を参考にしながら、よく読んで、あとの(1)〜(3)の問いに答えなさい。", groups:[
  { flyer:'<h4>★ みなと市民プール　冬の教室 ★</h4>'+
          '<div class="note">＜今月のお知らせ＞</div>'+
          '<table><tr><td>・12月23日（水）はプール開き20周年のため、利用料が特別料金になります。<br>'+
          '　　中学生以上：200円（小学生以下 無料）</td></tr>'+
          '<tr><td>・体験教室が受けられます。<br>'+
          '　　テーマ：「（　ⓐ　）でも泳げるようになろう」</td></tr></table>'+
          '<div class="note" style="margin-top:6px">＜体験教室＞</div>'+
          '<table><tr><th>内容</th><th>開始時刻</th></tr>'+
          '<tr><td>○ 水中ウォーキング</td><td>13:00〜</td></tr>'+
          '<tr><td>○ 泳ぎ方教室（12月1日より）</td><td>14:30〜</td></tr>'+
          '<tr><td>○ 水球（ウォーターポロ）体験</td><td>11:00〜／16:00〜</td></tr></table>'+
          '<div class="note">開館時間：9:00〜21:00　　休館日：火曜日</div>',
    passage:
      W("Aya:")+" "+E("Hi, Ben. Do you have any plans for next （　①　）?")+"<br>"+
      W("Ben:")+" "+E("Hi, Aya. You mean December 23? The pool has a special day, right?")+"<br>"+
      W("Aya:")+" "+E("Yes. Look at this leaflet from Minato Pool. On that day junior high school students can swim for （　②　） hundred yen.")+"<br>"+
      W("Ben:")+" "+E("That's cheap. Well, I have a guitar lesson in the morning on that day. Can we go there in the afternoon?")+"<br>"+
      W("Aya:")+" "+E("Sure. Let's meet at Minato Station at twelve thirty and walk together. We can get to the pool at twelve forty-five.")+"<br>"+
      W("Ben:")+" "+E("OK. Well, we can join the swimming class only from two thirty. Why don't we walk in the water first? It will start at one.")+"<br>"+
      W("Aya:")+" "+E("Good. After that, maybe we will have some time. We can try water polo in the afternoon, too. Let's try it after the swimming class.")+"<br>"+
      W("Ben:")+" "+E("I cannot swim well, but I want to learn.")+"<br>"+
      W("Aya:")+" "+E("Don't worry. Even people like you can learn there. That is the theme of this winter.")+"<br>"+
      '<div class="note">[注] leaflet ちらし　yen 円　water polo 水球　Why don\'t we 〜? 〜しませんか。　even 〜でさえ</div>',
    items:[
      { type:"fill", label:"(1)①", pt:3, stem:"①の（　）内にあてはまる最も適切な英語を1語で書きなさい。",
        answers:["Wednesday"], hint:"曜日・英語1語" },
      { type:"fill", label:"(1)②", pt:3, stem:"②の（　）内にあてはまる最も適切な英語を1語で書きなさい。",
        answers:["two"], hint:"数・英語1語" },
      { type:"fill", label:"(2)", pt:3, stem:"ちらしの中の（　ⓐ　）にあてはまる最も適切な日本語を書きなさい。",
        answers:["泳げない人"], hint:"ベンのような人のこと" },
      { type:"mcq", label:"(3)", pt:4, stem:"アヤとベンのプールでのスケジュールとして最も適切なものを、ア〜エから1つ選びなさい。",
        choices:["泳ぎ方教室　→　水中ウォーキング　→　水球",
                 "水中ウォーキング　→　水球　→　泳ぎ方教室",
                 "水中ウォーキング　→　泳ぎ方教室　→　水球",
                 "水球　→　水中ウォーキング　→　泳ぎ方教室"], answer:2 }
    ] }
]},

/* ===== 大問3 対話（17点） ===== */
{ no:3, title:"次は、中学生のミナと留学生のオリバー(Oliver)の対話文です。よく読んで、あとの(1)〜(4)の問いに答えなさい。", groups:[
  { passage:
      W("Mina:")+" "+E("Oliver, this is our cooking room.")+"<br>"+
      W("Oliver:")+" "+E("Your cooking room is big, Mina. Oh, I see a rice cooker on the table. Do you cook here?")+"<br>"+
      W("Mina:")+" "+E("Yes. I'm a member of the cooking club in this school. We cook here after school on Wednesdays.")+"<br>"+
      W("Oliver:")+" "+E("Great.")+"　<b>［　ⓐ　］</b><br>"+
      W("Mina:")+" "+E("Rice balls. There are eighteen students in the cooking club, and we make them together.")+"<br>"+
      W("Oliver:")+" "+E("<u>That</u>'s nice.")+"<br>"+
      W("Mina:")+" "+E("We will have a cooking event at the community center on the last Saturday of January. So we are practicing hard for it now.")+"<br>"+
      W("Oliver:")+" "+E("I see. Well, my father will come to Japan on January 20 and stay here for ten days. His name is Daniel. I think he wants to eat Japanese food. Can we join your event?")+"<br>"+
      W("Mina:")+" "+E("Sure. The event will open at nine.")+"<br>"+
      W("Oliver:")+" <b>［　Ａ　］</b><br>"+
      W("Mina:")+" "+E("It will start at ten. And maybe we will finish around noon. After the event, everyone can eat the rice balls together.")+"<br>"+
      W("Oliver:")+" "+E("Oh, Daniel will be happy.")+"<br>"+
      W("Mina:")+" "+E("Why don't you make them with him?")+"<br>"+
      W("Oliver:")+" "+E("Well, I'm not good at cooking.")+"<br>"+
      W("Mina:")+" <b>［　Ｂ　］</b> "+E("I think you can enjoy it.")+"<br>"+
      W("Oliver:")+" "+E("OK. I'll try it.")+"<br>"+
      W("Mina:")+" "+E("Good.")+"<br>"+
      '<div class="note">[注] rice cooker すいはんき　rice ball おにぎり　community center 公民館　'+
      'noon 正午　Why don\'t you 〜? 〜しませんか。</div>',
    items:[
      { type:"fill", label:"(1)", pt:4, stem:"［　ⓐ　］にあてはまる適切な文を、英文1文で書きなさい。",
        answers:["What do you cook?","What do you make?"], hint:"What で始める英文" },
      { type:"fill", label:"(2)", pt:4, stem:"下線部 That が指す内容を具体的に日本語で書きなさい。",
        answers:["料理クラブに18人の生徒がいて、いっしょにおにぎりを作っているということ"],
        hint:"「〜ということ」の形で" },
      { type:"bankpick", label:"(3)Ａ", pt:3, stem:"［　Ａ　］にあてはまる最も適切な文を、ア〜オから1つ選びなさい。",
        bank:[E("How was the event?"),E("Learning new things is fun."),E("Will you eat the rice balls?"),
              E("You cannot learn new things."),E("What time will the cooking start?")], answer:4 },
      { type:"bankpick", label:"(3)Ｂ", pt:3, stem:"［　Ｂ　］にあてはまる最も適切な文を、ア〜オから1つ選びなさい。",
        bank:[E("How was the event?"),E("Learning new things is fun."),E("Will you eat the rice balls?"),
              E("You cannot learn new things."),E("What time will the cooking start?")], answer:1 },
      { type:"fill", label:"(4)", pt:3,
        stem:"対話文の内容について、次の質問に答えなさい。ただし、主語と動詞を含む英文1文で書きなさい。<br>"+E("When will Daniel come to Japan?"),
        answers:["He will come to Japan on January 20.","He will come on January 20."], hint:"主語と動詞のある英文1文" }
    ] }
]},

/* ===== 大問4（10点） ===== */
{ no:4, title:"次の(1)、(2)の問いに答えなさい。", groups:[
  { intro:"(1) 次の絵は、カナダにいるルーシー(Lucy)が電話でソウタに質問しているところです。ルーシーはどのような質問をしましたか。下線部に適切な英語を書き、英文を完成させなさい。",
    items:[
      { type:"fill", label:"①", pt:4,
        stem:'<div class="scene">絵：ルーシーが電話で「＿＿＿＿＿ in Japan?」とたずね、ソウタが「It\'s snowy.」と答えている。</div>'+
             E("＿＿＿＿＿＿＿＿＿＿ in Japan?"),
        answers:["how is the weather"], hint:"How で始める・in Japan? の前まで" }
    ] },
  { intro:"(2) 次の語を正しく並べて英文を完成させなさい。",
    items:[
      { type:"wordorder", label:"", pt:6, stem:"次の語を正しく並べて英文を完成させなさい。",
        words:["is","hobby","my","letters","writing"],
        answer:"My hobby is writing letters.", display:"My hobby is writing letters." }
    ] }
]},

/* ===== 大問5 長文（16点） ===== */
{ no:5, title:"次は、中学生のリンが書いた英文です。よく読んで、あとの(1)〜(4)の問いに答えなさい。", groups:[
  { passage:
      E("I'm Rin. I live in Midori with my father and mother. I'm in the art club at school. I draw pictures on Mondays and Thursdays. I like drawing. My father is a bus driver. My mother works at a flower shop.")+
      " <b>［ア］</b> "+
      E("Her name is Sachiko, and she is seventy-two. She lives next to my house. She reads picture books to children at a nursery school. I sometimes go with her. She is very kind, but sometimes strict when I read books with her. I like her very much.")+
      "<br><br>"+
      E("One Friday evening, Sachiko said to me, \"I will read picture books to children at the nursery school next Wednesday. Some children from other countries will come.\"")+
      " <b>［イ］</b> "+
      E("\"Please help me.\" I said, \"Do you think I can help them?\" She said, \"I think you can. It will be a good chance for you because you can draw pictures well.\" I said, \"OK. I'll help you.\"")+
      "<br><br>"+
      E("The next Wednesday, I went to the nursery school with Sachiko. Many children were in the big room. Some of them were from other countries.")+
      " <b>［ウ］</b> "+
      E("I was nervous, but I showed them my pictures and used easy English. They asked a lot of questions. For example, \"What is this animal?\" and \"Can I draw one, too?\" I learned a lot of things about picture books from Sachiko, so I could answer the children. I was glad about <u>that</u>.")+
      "<br><br>"+
      E("After the reading, I talked with Sachiko. She said, \"You helped many children. Thank you. Did you have a good time?\" I said, \"Yes. When I talked with the children, my pictures helped me. I want to learn about picture books more. Also, I will try to learn other things.\" She smiled and said, \"You are great.\"")+
      '<div class="note">[注] art club 美術部　bus driver バスの運転手　flower shop 花屋　'+
      'nursery school 保育園　strict きびしい　chance 機会　nervous 緊張して　for example 例えば　'+
      'glad うれしい　reading 読み聞かせ</div>',
    items:[
      { type:"mcq", label:"(1)", pt:3,
        stem:"次の英文は、本文の ［ア］〜［ウ］ のどこに入りますか。最も適切なものを1つ選びなさい。<br>"+
             E("When they are busy, my grandmother cooks dinner for me."),
        choices:["［ア］","［イ］","［ウ］"], answer:0 },
      { type:"fill", label:"(2)", pt:4, stem:"下線部 that が指す内容を具体的に日本語で書きなさい。",
        answers:["幸子から絵本についてたくさんのことを学んでいたので、子どもたちの質問に答えられたこと"],
        hint:"「〜こと」の形で" },
      { type:"mcq", label:"(3)①", pt:3, stem:E("Where did Sachiko read picture books to children?"),
        choices:[E("At Rin's house."),E("At the flower shop."),E("At the nursery school."),E("At Rin's school.")], answer:2 },
      { type:"mcq", label:"(3)②", pt:3, stem:E("What does Rin want to do after the reading?"),
        choices:[E("She wants to learn only about drawing."),
                 E("She wants to learn about picture books and other things."),
                 E("She wants to work at a nursery school in other countries."),
                 E("She wants to teach English to children.")], answer:1 },
      { type:"mcq", label:"(4)", pt:3, stem:"本文の内容に合うものを、ア〜エから1つ選びなさい。",
        choices:[E("Rin draws pictures in the art club every day."),
                 E("Sachiko is always very kind when she reads books with Rin."),
                 E("Sachiko thought that the reading was a good chance for Rin."),
                 E("The children asked a lot of questions about Rin's school.")], answer:2 }
    ] }
]},

/* ===== 大問6 並べかえ（12点・コース分けなし） ===== */
{ no:6, title:"次の(1)〜(4)の対話文が成り立つように、［　］内の語（句）を正しく並べかえて正しい英文にしなさい。",
  lead:"文の最初にくる語も小文字で示しています。", groups:[
  { items:[
    { type:"wordorder", label:"(1)", pt:3,
      stem:"A: You ［ "+E("must / clean / your / room")+" ］ today.　B: OK.",
      words:["must","clean","your","room"], answer:"You must clean your room today.",
      display:"You must clean your room today." },
    { type:"wordorder", label:"(2)", pt:3,
      stem:"A: Please ［ "+E("buy / something / drink / to")+" ］ tomorrow.　B: All right.",
      words:["buy","something","drink","to"], answer:"Please buy something to drink tomorrow.",
      display:"Please buy something to drink tomorrow." },
    { type:"wordorder", label:"(3)", pt:3,
      stem:"A: I will make a cake for my mother.　B: Nice! I'm ［ "+E("she / sure / love / will")+" ］ it.",
      words:["she","sure","love","will"], answer:"I'm sure she will love it.",
      display:"I'm sure she will love it." },
    { type:"wordorder", label:"(4)", pt:3,
      stem:"A: What's your name?　B: I'm Takeshi. ［ "+E("classmates / me / my / call")+" ］ Take.",
      words:["classmates","me","my","call"], answer:"My classmates call me Take.",
      display:"My classmates call me Take." }
  ] }
]},

/* ===== 大問7 1語補充（8点） ===== */
{ no:7, title:"次の対話文が成り立つように、①〜④の（　）内にあてはまる最も適切な英語を、それぞれ1語ずつ書きなさい。", groups:[
  { passage:
      W("Sana:")+" "+E("I like cooking, and I often enjoy （　①　） cakes.")+"<br>"+
      W("Leo:")+" "+E("What kind of food do you like?")+"<br>"+
      W("Sana:")+" "+E("I like Italian food. Are you interested （　②　） it?")+"<br>"+
      W("Leo:")+" "+E("Oh, yes. Pizza is delicious.")+"<br>"+
      W("Sana:")+" "+E("That's right. Well, Mika and I are （　③　） to make pizza next Sunday.")+"<br>"+
      "　　　 "+E("（　④　） you are free, please join us.")+"<br>"+
      W("Leo:")+" "+E("Thank you. I want to make it with you.")+"<br>"+
      '<div class="note">[注] Italian イタリアの　delicious おいしい　free ひまな</div>',
    items:[
      { type:"fill", label:"①", pt:2, stem:"①に入る英語1語", answers:["making"], hint:"enjoy のあとの形" },
      { type:"fill", label:"②", pt:2, stem:"②に入る英語1語", answers:["in"], hint:"be interested 〜" },
      { type:"fill", label:"③", pt:2, stem:"③に入る英語1語", answers:["going"], hint:"be 〜 to ＝〜する予定だ" },
      { type:"fill", label:"④", pt:2, stem:"④に入る英語1語", answers:["If"], hint:"「もし〜なら」" }
    ] }
]}

]};
