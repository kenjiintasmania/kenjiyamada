/* data/c3u1.js ─ 中3 単元テスト①（初見・自動採点のみ）… テーマ：文化祭／環境・リサイクル／留学生交流。内容はすべて新規。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 単元テスト①",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵を選ぶ */
  { intro:"問題A　放送を聞いて、内容に合う絵をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the poster. Our school festival will be held on October 24.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵（文化祭のポスター）はどれですか。",
      choices:["文化祭は10月24日に開かれる。","文化祭は10月14日に開かれる。",
               "文化祭は10月24日に終わる。","運動会は10月24日に開かれる。"], answer:0 } ] },
  { script:'(2) Look at the picture. Aoi is putting empty cans into the recycling box.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う絵（アオイの様子）はどれですか。",
      choices:["アオイが空きびんをごみ箱に捨てている。","アオイが空き缶をリサイクルの箱に入れている。",
               "アオイが古紙を箱から出している。","アオイがペットボトルを洗っている。"], answer:1 } ] },

  /* 問題B：チャイムの応答 */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> Will you help me make posters for the school festival after school?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Sure, I'd be happy to."), E("Yes, I cleaned the box."), E("No, you can't recycle it."), E("I visited Canada last year.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> How was the eco-volunteer activity by the river yesterday?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I'll go there by bike."), E("It was really fun."), E("Yes, I do every day."), E("Let's recycle together.") ], answer:1 } ] },

  /* 問題C：メモの空所補充 */
  { intro:"問題C　ケンタ(Kenta)が、留学生のエマ(Emma)に文化祭でやりたいことをインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hi, I\'m Emma from Australia. First, I\'d like to sing a <b>song</b> with the music club at the festival.</span>'+
      '<span class="sp">I\'m also excited to make a poster about <b>recycling</b> with my classmates.</span>'+
      '<span class="sp">And I want to wear a Japanese <b>kimono</b> on that day.</span>',
    passage:'<b>ケンタのメモ</b><br>Emma — sing a （　あ　） with the music club<br>'+
            '— make a poster about （　い　）<br>— wear a Japanese （　う　） on the festival day',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）歌", answers:["song"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）リサイクル", answers:["recycling"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）着物", answers:["kimono"], hint:"英語1語" } ] },

  /* 問題D：説明を聞いて答える */
  { intro:"問題D　あなたとクラスメイトのアオイ(Aoi)が、文化祭の準備についての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next week we will get ready for the school festival. You can choose one team.</span>'+
      '<span class="sp">Team A will paint the stage. Team B will make a recycling corner. Team C will help the guests from abroad.</span>'+
      '<span class="sp">We will start on Wednesday. Please bring your own gloves and a pen.</span>'+
      '<span class="sp"><span class="who">Aoi:</span> I really like talking with people from other countries. Which team will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["準備は火曜日に始まる。","Bチームはリサイクルコーナーを作る。",
               "準備には手袋は必要ない。","ペンを持ってくる必要はない。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"アオイの発言に対するあなたの答えを完成させなさい。<br>"+E("I really like talking with people from other countries. So I will choose （　　） C.")+"（英語1語）",
      answers:["Team","team"], hint:"英語1語" } ] }
]},

/* ===== 大問2 チラシ＋対話 ===== */
{ no:2, title:"中学生のリク(Riku)とアオイ(Aoi)が、みどり中学校の文化祭の一つである、留学生のエマ(Emma)による国際交流ステージのちらしを見ながら話しています。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>International Stage with Emma!</h4>'+
    '<div class="note">Hi, everyone! Come to my stage, and let\'s learn about the world together!</div>'+
    '<table><tr><td>Date</td><td>October 24, 2026</td></tr>'+
    '<tr><td>Morning stage</td><td>10:30 a.m. – 11:30 a.m.</td></tr>'+
    '<tr><td>Afternoon stage</td><td>2:00 p.m. – 3:00 p.m.</td></tr></table>'+
    '<div class="note">I am … Emma, from Australia. (I lived in New Zealand for seven years.)<br>'+
    'I like … dancing, reading books, eco activities … and <i>ramen</i>! '+
    '(Please tell me about a good <i>ramen</i> shop!)　→ You can join here.</div>',
    passage:
    '<span class="sp"><span class="who">Riku:</span> Look, Aoi. Did you know about this stage?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> Yes. Emma is the （　あ　） popular student from abroad in our school.</span>'+
    '<span class="sp"><span class="who">Riku:</span> Really? I want to join, but I\'m not （　い　） that I can speak English well.</span>'+
    '<span class="sp"><span class="who">Aoi:</span> You don\'t need to worry about mistakes when you talk with her.</span>'+
    '<span class="sp"><span class="who">Riku:</span> Good advice. She likes <i>ramen</i>. My favorite <i>ramen</i> shop is near the station. '+
    'I think the <i>ramen</i> there is the <u>(う) good</u> in our town.</span>'+
    '<span class="sp"><span class="who">Aoi:</span> That\'s nice. I\'m （　い　） she will like it.</span>'+
    '<span class="sp"><span class="who">Riku:</span> The festival is three days from now. I have to help the recycling corner in the morning that day.</span>'+
    '<span class="sp"><span class="who">Aoi:</span> What time will it finish?</span>'+
    '<span class="sp"><span class="who">Riku:</span> It will finish at noon. Then I can join the afternoon stage and talk about eco activities!</span>',
    note:'語注：from abroad 海外からの／worry about 〜 〜を気にする／mistake 間違い',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"（あ）に入れるのに最も適当な英語1語を書きなさい。", answers:["most"], hint:"the （　） popular" },
    { type:"fill", label:"(2)い", pt:3, stem:"2か所の（い）に共通して入る最も適当な英語1語を書きなさい。", answers:["sure"], hint:"I'm not 〜 / I'm 〜" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) good を、最も適当な形に変えて1語で書きなさい。", answers:["best"], hint:"the 〜 in our town" },
    { type:"mcq", label:"(4)", pt:3, stem:"リクとアオイが話している日として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("October 21"), E("October 22"), E("October 23"), E("October 24") ], answer:0 },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Emma is from New Zealand and lived in Australia for seven years."),
                E("Riku makes many mistakes when he speaks English."),
                E("There is a ramen shop near the station in Riku's town."),
                E("Riku will join the morning stage.") ], answer:2 } ]}
]},

/* ===== 大問3 日記の英作文 ===== */
{ no:3, title:"留学生のエマ(Emma)を家にむかえているアオイ(Aoi)が、文化祭の日のことを日記に書いています。次は、アオイの日記の一部と、その日のできごとを表したイラストです。日記とイラストの内容に合うように、(1)に4語以上、(2)に3語以上の英語を書き、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：アオイとエマが教室でリサイクルのポスターを作り、午後にはステージで一緒におどっている。",
    passage:
    'October 24<br><br>'+
    'This morning, I went to school early with Emma. We went to our classroom together. '+
    'Emma asked, "What are you doing?" I said, "<u>(1)</u> because we want to teach everyone about the earth." '+
    'Emma said, "I want to help you!" So we worked together. In the afternoon, we enjoyed <u>(2)</u> on the stage. Many people watched us.',
    passageEn:true,
    note:'語注：the earth 地球',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：アオイがリサイクルのポスターを作っている場面。次の語を正しく並べて英文を完成させなさい。",
      words:["making","I","poster","am","a","recycling"], answer:"I am making a recycling poster" },
    { type:"wordorder", label:"(2)", pt:5, stem:"イラスト：午後にステージでおどっている場面。次の語を正しく並べて英文（we enjoyed のあとの部分）を完成させなさい。",
      words:["together","dancing","Emma","with"], answer:"dancing with Emma together" } ]}
]},

/* ===== 大問4 話し合い＋感想 ===== */
{ no:4, title:"ブラウン(Brown)先生の英語の授業で、Kenta、Aoi、Riku が、文化祭でやってみたいことについて話し合いをしています。次の英文は、話し合いと、それを聞いて Emma が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Brown:</span> Today, let\'s talk about our school festival. What do you want to do at the festival? Kenta, tell us first.</span>'+
    '<span class="sp"><span class="who">Kenta:</span> I want to make a quiz about the environment. I love nature, and I want to teach people how to protect it.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> That\'s nice. Do you want to use pictures in your quiz?</span>'+
    '<span class="sp"><span class="who">Kenta:</span> Yes, I hope so. I want to show people many photos of beautiful forests.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> Wonderful. I hope many students will learn from your quiz.</span>'+
    '<span class="sp"><span class="who">Aoi:</span> I want to open a recycling shop. We can collect old clothes and give them to people who need them.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> Oh, that\'s a great idea. Do you like helping people, Aoi?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> Yes, helping people is the thing I like the most. I want to make our town cleaner and kinder.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> That\'s wonderful. Riku, how about you?</span>'+
    '<span class="sp"><span class="who">Riku:</span> I want to make a world food corner. I hear our school has many students from abroad, and I want to learn about their cultures.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> Cooking food from many countries is not （　あ　）, but it\'s an exciting plan.</span>'+
    '<span class="sp"><span class="who">Riku:</span> I think so.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> OK, I\'m going to talk about myself. When I was a student, I joined a school festival in Australia. I made a poster about clean energy, so I became interested in the environment.</span>'+
    '<span class="sp"><span class="who">Riku:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> Good question. When I was twenty-four, I came to Japan for the first time to teach English. People were kind, and the festivals were great. So I am still here.</span>'+
    '<span class="sp"><span class="who">Riku:</span> And now you are helping us with our festival.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> Yes, and I\'m very happy. I hope you\'ll make many friends from other countries.</span>',
    note:'語注：environment 環境／protect 〜を守る／recycle 再利用する／culture 文化' },
  { passage:'<b>Emma の感想</b><br>There are many fun ideas for our festival. Like Aoi, I want to open a recycling shop. '+
            'I （　X　）, too, so I want to help our town become cleaner with everyone.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Kenta の発言から抜き出して書きなさい。<br>"+E("Kenta wants to teach people [　　] nature."),
      answers:["how to protect"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("bad"),E("difficult"),E("easy"),E("sad")], answer:2 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("How do you come to school?"), E("Whose poster is this?"),
                E("Why did you come to Japan?"), E("What time is the festival?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Kenta wants to make a quiz about the environment."),
                E("Aoi doesn't like helping people."),
                E("Mr. Brown came to Japan to study music."),
                E("Riku wants to open a recycling shop.") ], answer:0 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("am a baseball fan"), E("am interested in eco activities"),
                E("like playing the guitar"), E("want to study science") ], answer:1 } ]}
]},

/* ===== 大問5 意見文（読解） ===== */
{ no:5, title:"次の英文は、環境委員のアオイ(Aoi)が文化祭で発表した意見文です。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Good morning, everyone. I\'m Aoi from the environment committee. Today I want to talk about our new plan, "Green Festival." '+
    'This plan will start at our school festival next month. We hope students will think about the earth and enjoy recycling together.<br><br>'+
    '<b>②</b> Last year, I didn\'t think much about the environment. I often left empty cans and bottles on the table at home. '+
    'One day, an exchange student, Emma, came to my house. She always put cans and bottles into the right boxes. '+
    'She said, "Small actions can make a big change." Her words <u>(お) ___</u> the way I think about the earth. '+
    'I learned that protecting nature is <b>important</b>. That is why I joined the environment committee.<br><br>'+
    '<b>③</b> In this plan, we will make a recycling corner every year. People can bring old paper, cans, and clothes. '+
    'After you bring them, please write a short message for us. We may show your message on our website, but please '+
    'don\'t worry about your English. We just want everyone to know that the earth is （　え　）.<br><br>'+
    '<b>④</b> Some people say that using a car is useful. That\'s true. <u>④ Using a car is faster than riding a bike</u> '+
    'when we want to go far. But riding a bike has good points, too. <u>③ ( the air / a bike / keeps / clean )</u> for everyone. '+
    'When you ride a bike, you can also <u>(か) ___</u> the beauty of your town. So please join "Green Festival" and help the earth!',
    passageEn:true,
    note:'語注：committee 委員会／exchange student 留学生／action 行動／message メッセージ',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お changed　か lose"), E("お changed　か enjoy"),
                E("お found　か lose"), E("お found　か enjoy") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている「この計画」の内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "毎年リサイクルコーナーを作る。", "古紙や缶や衣服を持ってくることができる。",
                "短いメッセージをウェブサイトで見せることがある。", "英語のメッセージに賞をおくる。" ], answer:3 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["the air","a bike","keeps","clean"], answer:"A bike keeps the air clean",
      display:"A bike keeps the air clean" },
    { type:"fill", label:"(4)え", pt:4, stem:"（え）に入れるのに最も適当な英語1語を、第2段落中から抜き出して書きなさい。",
      answers:["important"], hint:"第2段落の語・英語1語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>（　①　）とき、車を使うことは（　②　）ことよりも速い。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "遠くへ行く","近所を歩く","荷物を運ぶ","友達と話す" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "自転車に乗る","写真をとる","音楽を聞く","手紙を書く" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Aoi's new plan, \"Green Festival,\" will start next month."),
                E("Aoi always recycled cans and bottles before she met Emma."),
                E("Emma put cans and bottles into the right boxes at Aoi's house."),
                E("Aoi thinks using a car is always better than riding a bike."),
                E("Aoi joined the environment committee because she hated nature.") ], answer:[0,2] } ]}
]}

]};
