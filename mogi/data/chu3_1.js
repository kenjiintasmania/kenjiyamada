/* data/chu3_1.js ─ 中3 第1回 模擬テスト
   出典：正進社 過去問「3年 第1回」（大問1〜5・リスニング問題A〜D）。
   出題傾向・問題数は完全一致。季節・数字・名前・場所などの細部のみ入れかえ。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 第1回 模擬テスト",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵を選ぶ */
  { intro:"問題A　放送を聞いて、内容に合う絵をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the picture. A dog is sleeping under the table.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵はどれですか。",
      choices:["イヌがテーブルの下でねている。","イヌがテーブルの上にのっている。",
               "ネコがテーブルの下でねている。","イヌがいすの下でねている。"], answer:0 } ] },
  { script:'(2) Ken gets up at six thirty, and he eats breakfast at seven.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う絵（ケンの朝）はどれですか。",
      choices:["6:30に起きて、7:00に朝食。","6:00に起きて、7:30に朝食。",
               "6:30に起きて、7:30に朝食。","7:00に起きて、7:30に朝食。"], answer:0 } ] },

  /* 問題B：チャイムの応答 */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> Will you help me with my homework after school?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Sure, I will."), E("Yes, I cleaned it."), E("No, you can't swim."), E("I went there yesterday.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> How was the soccer game yesterday?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I'll go there by bus."), E("It was very exciting."), E("Yes, I do."), E("Let's play together.") ], answer:1 } ] },

  /* 問題C：メモの空所補充 */
  { intro:"問題C　サキが、ALTのベーカー(Ms. Baker)先生に日本でやりたいことをインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hi, I\'m Ms. Baker from Australia. First, I\'d like to visit the old <b>temples</b> in Nara.</span>'+
      '<span class="sp">I\'m also excited to try cooking Japanese <b>food</b> at home.</span>'+
      '<span class="sp">And in <b>winter</b>, I want to enjoy skiing and other snow sports.</span>',
    passage:'<b>サキのメモ</b><br>Ms. Baker — visit the old （　あ　） in Nara<br>'+
            '— try cooking Japanese （　い　）<br>— enjoy （　う　） sports such as skiing',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）寺・寺院（複数）", answers:["temples"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）食べ物", answers:["food"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）冬の", answers:["winter"], hint:"英語1語" } ] },

  /* 問題D：説明を聞いて答える */
  { intro:"問題D　あなたとクラスメイトのメイ(Mei)が、職業体験についての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next week we will have a work-experience day. You can choose one place.</span>'+
      '<span class="sp">Group A will work at a flower shop. Group B will work at a kindergarten. Group C will work at a bookstore.</span>'+
      '<span class="sp">The work-experience day is on Friday. Please bring your lunch and a notebook.</span>'+
      '<span class="sp"><span class="who">Mei:</span> I love plants and flowers. Which group will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["職業体験は木曜日に行われる。","参加者は花屋で働くことができる。",
               "体験では昼食が出される。","ノートを持ってくる必要はない。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"メイの発言に対するあなたの答えを完成させなさい。<br>"+E("I love plants and flowers. So I will choose the （　　）.")+"（英語2語）",
      answers:["flower shop"], hint:"英語2語" } ] }
]},

/* ===== 大問2 チラシ＋対話 ===== */
{ no:2, title:"中学生のケンジ(Kenji)とアヤ(Aya)が、ミドリ市の文化交流イベントの一つである、ALTのエミリー(Emily Davis)先生の英会話レッスンのちらしを見ながら話しています。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>English Café with Emily!</h4>'+
    '<div class="note">Hi, everyone! Join my class, and let\'s enjoy English together!</div>'+
    '<table><tr><td>Date</td><td>October 12, 2026</td></tr>'+
    '<tr><td>Morning class</td><td>10:00 a.m. – 11:00 a.m.</td></tr>'+
    '<tr><td>Afternoon class</td><td>2:30 p.m. – 3:30 p.m.</td></tr></table>'+
    '<div class="note">I am … Emily Davis, from Australia. (I lived in Canada for eight years.)<br>'+
    'I like … basketball, reading books, watching anime … and <i>sushi</i>! '+
    '(Please tell me about a good <i>sushi</i> restaurant!)　→ You can apply here.</div>',
    passage:
    '<span class="sp"><span class="who">Kenji:</span> Look, Aya. Did you know about this event?</span>'+
    '<span class="sp"><span class="who">Aya:</span> Yes. Ms. Davis is the （　あ　） popular English teacher in my school.</span>'+
    '<span class="sp"><span class="who">Kenji:</span> Really? I want to join, but I\'m not （　い　） that I can speak well.</span>'+
    '<span class="sp"><span class="who">Aya:</span> You don\'t need to worry about mistakes when you speak.</span>'+
    '<span class="sp"><span class="who">Kenji:</span> Good advice. She likes <i>sushi</i>. My favorite <i>sushi</i> restaurant is near the park. '+
    'I think the <i>sushi</i> there is the <u>(う) good</u> in our town.</span>'+
    '<span class="sp"><span class="who">Aya:</span> That\'s good. I\'m （　い　） she will like it.</span>'+
    '<span class="sp"><span class="who">Kenji:</span> The class is three days from now. I have basketball practice that day.</span>'+
    '<span class="sp"><span class="who">Aya:</span> What time will it finish?</span>'+
    '<span class="sp"><span class="who">Kenji:</span> It will finish at noon. Then I can join the afternoon class and talk about basketball!</span>',
    note:'語注：apply 申し込む／worry about 〜 〜を気にする／mistake 間違い',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"（あ）に入れるのに最も適当な英語1語を書きなさい。", answers:["most"], hint:"the （　） popular" },
    { type:"fill", label:"(2)い", pt:3, stem:"2か所の（い）に共通して入る最も適当な英語1語を書きなさい。", answers:["sure"], hint:"I'm not 〜 / I'm 〜" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) good を、最も適当な形に変えて1語で書きなさい。", answers:["best"], hint:"the 〜 in our town" },
    { type:"mcq", label:"(4)", pt:3, stem:"ケンジとアヤが話している日として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("October 9"), E("October 10"), E("October 11"), E("October 12") ], answer:0 },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Ms. Davis is from Canada and lived in Australia for eight years."),
                E("Kenji makes many mistakes when he speaks English."),
                E("There is a sushi restaurant near the park in Kenji's town."),
                E("Kenji will join the morning class.") ], answer:2 } ]}
]},

/* ===== 大問3 日記の英作文 ===== */
{ no:3, title:"オーストラリアにホームステイしているユキ(Yuki)は、エマ(Emma)の家にホームステイしています。次は、ホームステイ中のユキの日記の一部と、その日のできごとを表したイラストです。日記とイラストの内容に合うように、(1)に4語以上、(2)に3語以上の英語を書き、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：エマがキッチンでケーキを作り、夜にはかざりつけをしてみんなでパーティーをしている。",
    passage:
    'December 3<br><br>'+
    'This morning, I got up early and went to the kitchen. Emma was very busy there. '+
    'I asked, "What are you doing?" Emma said, "<u>(1)</u> because today is my father\'s birthday." '+
    'I said, "I want to help you!" So I started to help her. In the evening, we had <u>(2)</u> for my host father. He looked happy.',
    passageEn:true,
    note:'語注：host father ホストファーザー',
    items:[
    { type:"en", label:"(1)", pt:6, stem:"イラストに合うように、エマのことばを4語以上で書きなさい。", minWords:4,
      model:"I am making a birthday cake", tip:"I am 〜ing の形。ケーキを作っている場面。" },
    { type:"en", label:"(2)", pt:5, stem:"イラストに合うように、3語以上で書きなさい。", minWords:3,
      model:"a birthday party", tip:"夜のできごと（パーティー）。" } ]}
]},

/* ===== 大問4 話し合い＋感想 ===== */
{ no:4, title:"ホワイト(White)先生の英語の授業で、Takashi、Hana、Yuto が、将来行きたい国について話し合いをしています。次の英文は、話し合いと、それを聞いて Mai が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. White:</span> Today, let\'s talk about countries. What country do you want to visit? Takashi, tell us first.</span>'+
    '<span class="sp"><span class="who">Takashi:</span> I want to go to Canada. I\'m a big fan of nature. I want to visit beautiful lakes there because I only see them in pictures.</span>'+
    '<span class="sp"><span class="who">Mr. White:</span> That\'s nice. Do you want to take pictures in Canada?</span>'+
    '<span class="sp"><span class="who">Takashi:</span> Yes, I hope so. I want to be a nature photographer.</span>'+
    '<span class="sp"><span class="who">Mr. White:</span> Wonderful. I hope I\'ll see your beautiful photos someday.</span>'+
    '<span class="sp"><span class="who">Hana:</span> There are many famous museums in Italy, so I want to go there. I also want to eat delicious pizza.</span>'+
    '<span class="sp"><span class="who">Mr. White:</span> Oh, you should try gelato in Italy, too. Do you like art, Hana?</span>'+
    '<span class="sp"><span class="who">Hana:</span> Yes, art is my favorite subject. When I see real art in Italy, I think I can get some ideas from it.</span>'+
    '<span class="sp"><span class="who">Mr. White:</span> That\'s wonderful. Yuto, how about you?</span>'+
    '<span class="sp"><span class="who">Yuto:</span> I want to go to Kenya. I hear there are many wild animals there. I want to study how to protect them at a university in Kenya.</span>'+
    '<span class="sp"><span class="who">Mr. White:</span> Protecting wild animals is not （　あ　）, but it\'s an important thing.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> I think so.</span>'+
    '<span class="sp"><span class="who">Mr. White:</span> OK, I\'m going to talk about myself. When I was young, I liked Japanese food. After I ate sushi in my country, I wanted to make it, so I decided to learn Japanese cooking.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Mr. White:</span> Good question. When I was twenty, I came to Japan for the first time to study Japanese food. People were kind, and the food was great. So I am still here.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> And now you are teaching us English.</span>'+
    '<span class="sp"><span class="who">Mr. White:</span> Yes, and I\'m very happy. I hope you\'ll visit other countries and learn new things.</span>',
    note:'語注：nature 自然／photographer 写真家／wild 野生の／protect 〜を守る' },
  { passage:'<b>Mai の感想</b><br>There are many wonderful countries in the world. Like Hana, I want to go to Italy. '+
            'I （　X　）, too, so I want to see many beautiful buildings and art there.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Takashi の発言から抜き出して書きなさい。<br>"+E("Takashi hopes that he will [　　] in Canada."),
      answers:["visit beautiful lakes"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("bad"),E("difficult"),E("easy"),E("sad")], answer:2 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("How do you come to school?"), E("Whose book is it?"),
                E("Why did you come to Japan?"), E("What do you want to do?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Takashi wants to be a nature photographer."),
                E("Hana doesn't like art."),
                E("Mr. White came to Japan to teach English."),
                E("Yuto wants to protect wild animals in Italy.") ], answer:0 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("am a baseball fan"), E("am interested in art"),
                E("like sports"), E("want to study music") ], answer:1 } ]}
]},

/* ===== 大問5 意見文（読解） ===== */
{ no:5, title:"次の英文は、図書委員のダイキ(Daiki)が発表した意見文です。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Good morning, everyone. I\'m Daiki from the library committee. Today I want to talk about our new plan, "Reading Friends." '+
    'This plan will start next month. We hope students will enjoy reading and share good books with each other.<br><br>'+
    '<b>②</b> In my first year of junior high school, I didn\'t read many books. I often played video games at home. '+
    'One day, my older brother gave me a book. He said, "I think you will like this story." He was right. I read it again and again. '+
    'It was my first time to enjoy a book so much. This experience <u>(お) ___</u> the way I think about books. '+
    'I learned that meeting a good book is <b>wonderful</b>. That is why I joined the library committee.<br><br>'+
    '<b>③</b> In this plan, we will choose one good book every month. Some books are exciting stories, and some are true stories. '+
    'After you read the book, please tell us your comments. We may use your comments for our website, but please '+
    'don\'t worry about your English. We just want everyone to know that books are （　え　）.<br><br>'+
    '<b>④</b> Some people say that using a smartphone is useful. That\'s true. <u>④ Using a smartphone is faster than reading a book</u> '+
    'when we want to find information. But a book has good points, too. <u>③ ( us / a book / teaches / many things )</u> slowly. '+
    'When you read a book, you can <u>(か) ___</u> the hero\'s true feelings. So please join "Reading Friends" and find a good book!',
    passageEn:true,
    note:'語注：committee 委員会／experience 経験／comment 感想／information 情報',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お changed　か lose"), E("お changed　か understand"),
                E("お found　か lose"), E("お found　か understand") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている「この計画」の内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "毎月1冊の本を選ぶ。", "本を読んだら感想を伝える。",
                "感想をウェブサイトで使うことがある。", "英語の感想文に賞をおくる。" ], answer:3 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["us","a book","teaches","many things"], answer:"A book teaches us many things",
      display:"A book teaches us many things" },
    { type:"fill", label:"(4)え", pt:4, stem:"（え）に入れるのに最も適当な英語1語を、第2段落中から抜き出して書きなさい。",
      answers:["wonderful"], hint:"第2段落の語・英語1語" },
    { type:"jp", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に、適当な日本語を入れなさい。<br>（　①　）とき、スマートフォンを使うことは（　②　）ことよりも速い。<br>①にあてはまる日本語：",
      model:"情報を調べる（さがす）", tip:"本文 find information より。" },
    { type:"jp", label:"(5)②", pt:4, stem:"②にあてはまる日本語：",
      model:"本を読む", tip:"reading a book より。" },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Daiki's new plan, \"Reading Friends,\" will start next month."),
                E("Daiki read many books before he became a junior high school student."),
                E("Daiki's brother gave him a book and Daiki couldn't stop reading it."),
                E("Daiki thinks using a smartphone is always better than reading a book."),
                E("Daiki joined the library committee because he hated reading.") ], answer:[0,2] } ]}
]}

]};
