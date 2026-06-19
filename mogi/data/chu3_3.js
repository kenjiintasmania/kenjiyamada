/* data/chu3_3.js ─ 中3 第3回 模擬テスト
   出典：正進社 過去問形式「3年 第3回」（大問1〜5・リスニング問題A〜D）。
   出題傾向・問題数は完全一致。内容はすべて新規（将来の職業／水泳／ボランティア）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 第3回 模擬テスト",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵を選ぶ */
  { intro:"問題A　放送を聞いて、内容に合う絵をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the sign. The next bus for the station leaves at nine fifteen.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵（バスの時刻表示）はどれですか。",
      choices:["駅行きのバスが9:15に出発。","駅行きのバスが9:50に出発。",
               "駅行きのバスが9:05に出発。","空港行きのバスが9:15に出発。"], answer:0 } ] },
  { script:'(2) Look at the picture. It is sunny today, and three birds are flying over the pool.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う絵（今日の天気と様子）はどれですか。",
      choices:["くもりで、鳥が3羽プールの上を飛んでいる。","晴れで、鳥が2羽プールの上を飛んでいる。",
               "晴れで、鳥が3羽プールの上を飛んでいる。","雨で、鳥が3羽木の上を飛んでいる。"], answer:2 } ] },

  /* 問題B：チャイムの応答 */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> Will you join the volunteer work at the park this weekend?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Yes, of course. I'd love to."), E("No, I didn't clean the park."), E("It was a beautiful flower."), E("You're welcome.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> How long have you practiced swimming?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I'll go to the pool tomorrow."), E("For about three years."), E("Yes, I can swim fast."), E("Let's swim together.") ], answer:1 } ] },

  /* 問題C：メモの空所補充 */
  { intro:"問題C　リク(Riku)が、ALTのスミス(Mr. Smith)先生に将来の夢についてインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hi, I\'m Mr. Smith from Canada. When I was a child, I wanted to be a <b>doctor</b> like my mother.</span>'+
      '<span class="sp">But I liked English very much, so now I am a <b>teacher</b> here in Japan.</span>'+
      '<span class="sp">In the future, I want to write an English <b>book</b> for young children.</span>',
    passage:'<b>リクのメモ</b><br>Mr. Smith — wanted to be a （　あ　） like his mother<br>'+
            '— now he is a （　い　） in Japan<br>— wants to write an English （　う　） for children',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）医者", answers:["doctor"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）先生・教師", answers:["teacher"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）本", answers:["book"], hint:"英語1語" } ] },

  /* 問題D：説明を聞いて答える */
  { intro:"問題D　あなたとクラスメイトのナナ(Nana)が、職場体験についての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next month we will have a job-experience week. You can choose one place to work.</span>'+
      '<span class="sp">Group A will help at a hospital. Group B will work at an animal shelter. Group C will help at a swimming school.</span>'+
      '<span class="sp">The job experience starts on Monday. Please wear your sports shoes and bring a water bottle.</span>'+
      '<span class="sp"><span class="who">Nana:</span> I really like dogs and cats. Which group will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["職場体験は火曜日に始まる。","参加者は動物保護施設で働くことができる。",
               "体験では水筒は必要ない。","運動ぐつははかなくてよい。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"ナナの発言に対するあなたの答えを完成させなさい。<br>"+E("I really like dogs and cats. So I will choose the （　　）.")+"（英語2語）",
      answers:["animal shelter"], hint:"英語2語" } ] }
]},

/* ===== 大問2 チラシ＋対話 ===== */
{ no:2, title:"中学生のソウタ(Sota)とミオ(Mio)が、ひかり市の動物まもりプロジェクトの一つである、獣医のタナカ(Dr. Tanaka)先生の特別講演会のちらしを見ながら話しています。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Meet Dr. Tanaka, a Vet!</h4>'+
    '<div class="note">Hello, everyone! Come and learn how to take care of animals with me!</div>'+
    '<table><tr><td>Date</td><td>November 8, 2026</td></tr>'+
    '<tr><td>Morning talk</td><td>9:30 a.m. – 10:30 a.m.</td></tr>'+
    '<tr><td>Afternoon talk</td><td>1:00 p.m. – 2:00 p.m.</td></tr></table>'+
    '<div class="note">I am … Dr. Tanaka, an animal doctor. (I have worked at the zoo for ten years.)<br>'+
    'I like … dogs, hiking, taking photos of birds … and curry! '+
    '(Please tell me about a good curry shop!)　→ You can join here.</div>',
    passage:
    '<span class="sp"><span class="who">Sota:</span> Look, Mio. Did you know about this event?</span>'+
    '<span class="sp"><span class="who">Mio:</span> Yes. Dr. Tanaka is the （　あ　） famous vet in our city.</span>'+
    '<span class="sp"><span class="who">Sota:</span> Really? I want to join, but I\'m not （　い　） that I can ask good questions.</span>'+
    '<span class="sp"><span class="who">Mio:</span> You don\'t need to worry about that when you talk with her.</span>'+
    '<span class="sp"><span class="who">Sota:</span> Good advice. She likes curry. My favorite curry shop is near the library. '+
    'I think the curry there is the <u>(う) good</u> in our town.</span>'+
    '<span class="sp"><span class="who">Mio:</span> That\'s nice. I\'m （　い　） she will be happy to hear that.</span>'+
    '<span class="sp"><span class="who">Sota:</span> The talk is two days from now. I have swimming practice in the morning that day.</span>'+
    '<span class="sp"><span class="who">Mio:</span> What time will it finish?</span>'+
    '<span class="sp"><span class="who">Sota:</span> It will finish at eleven thirty. Then I can join the afternoon talk and ask about animals!</span>',
    note:'語注：vet 獣医／take care of 〜 〜の世話をする／worry about 〜 〜を気にする',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"（あ）に入れるのに最も適当な英語1語を書きなさい。", answers:["most"], hint:"the （　） famous" },
    { type:"fill", label:"(2)い", pt:3, stem:"2か所の（い）に共通して入る最も適当な英語1語を書きなさい。", answers:["sure"], hint:"I'm not 〜 / I'm 〜" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) good を、最も適当な形に変えて1語で書きなさい。", answers:["best"], hint:"the 〜 in our town" },
    { type:"mcq", label:"(4)", pt:3, stem:"ソウタとミオが話している日として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("November 6"), E("November 7"), E("November 8"), E("November 9") ], answer:0 },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Dr. Tanaka has worked at the zoo for ten years."),
                E("Sota cannot ask any questions to Dr. Tanaka."),
                E("There is a curry shop near the station in Sota's town."),
                E("Sota will join the morning talk.") ], answer:0 } ]}
]},

/* ===== 大問3 日記の英作文 ===== */
{ no:3, title:"アメリカにホームステイしているハルカ(Haruka)は、ジャック(Jack)の家にホームステイしています。次は、ホームステイ中のハルカの日記の一部と、その日のできごとを表したイラストです。日記とイラストの内容に合うように、(1)に4語以上、(2)に3語以上の英語を書き、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：ジャックが部屋でたくさんの貝がら(seashells)を見せている。棚にはきれいな貝がらがいっぱい並んでいる。",
    passage:
    'July 14<br><br>'+
    'This afternoon, Jack took me to his room. He said, "I want to show you something." '+
    'On the shelf, there were so many beautiful seashells. I was surprised and said, "Wow! '+
    '<u>(1)</u>!" Jack smiled and said, "Yes. I started it five years ago." He gave me one as a present. '+
    'In the evening, I sent <u>(2)</u> about the shells to my family in Japan. They were excited, too.',
    passageEn:true,
    note:'語注：shelf たな／seashell 貝がら',
    items:[
    { type:"en", label:"(1)", pt:6, stem:"イラストに合うように、ハルカのことばを4語以上で書きなさい。", minWords:4,
      model:"You have many beautiful seashells", tip:"You have 〜 の形。たくさんの貝がらを見て驚く場面。" },
    { type:"en", label:"(2)", pt:5, stem:"イラストに合うように、3語以上で書きなさい。", minWords:3,
      model:"a photo of them", tip:"夜のできごと（貝がらの写真を家族に送る）。" } ]}
]},

/* ===== 大問4 話し合い＋感想 ===== */
{ no:4, title:"ブラウン(Brown)先生の英語の授業で、Kenta、Sakura、Daiki が、将来つきたい仕事について話し合いをしています。次の英文は、話し合いと、それを聞いて Yui が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Brown:</span> Today, let\'s talk about jobs. What job do you want to have in the future? Kenta, tell us first.</span>'+
    '<span class="sp"><span class="who">Kenta:</span> I want to be a swimming coach. I love swimming, and I want to teach young children how to swim.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> That\'s nice. Are you good at swimming, Kenta?</span>'+
    '<span class="sp"><span class="who">Kenta:</span> Yes. I have been in the swim club for three years. I want to help children enjoy the water.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> Wonderful. I hope you\'ll be a great coach someday.</span>'+
    '<span class="sp"><span class="who">Sakura:</span> I want to be a nurse. My grandmother was sick last year, and a kind nurse helped her a lot.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> Oh, that\'s a great reason. Do you like helping people, Sakura?</span>'+
    '<span class="sp"><span class="who">Sakura:</span> Yes, helping people is the thing I like the most. I want to work at a hospital near my town.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> That\'s wonderful. Daiki, how about you?</span>'+
    '<span class="sp"><span class="who">Daiki:</span> I want to be a vet. I hear there are many sick animals, and I want to study how to help them at a university.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> Becoming a vet is not （　あ　）, but it\'s a wonderful job.</span>'+
    '<span class="sp"><span class="who">Daiki:</span> I think so.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> OK, I\'m going to talk about myself. When I was young, I joined a volunteer group. I taught English to children, so I decided to be a teacher.</span>'+
    '<span class="sp"><span class="who">Daiki:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> Good question. When I was twenty-two, I came to Japan to teach English. The students were kind, and I was very happy. So I am still here.</span>'+
    '<span class="sp"><span class="who">Daiki:</span> And now you are teaching us every day.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> Yes, and I love it. I hope you\'ll find a job you really like.</span>',
    note:'語注：coach コーチ／nurse 看護師／vet 獣医／volunteer ボランティアの' },
  { passage:'<b>Yui の感想</b><br>There are many wonderful jobs in the world. Like Sakura, I want to be a nurse. '+
            'I （　X　）, too, so I want to take care of sick people at a hospital.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Kenta の発言から抜き出して書きなさい。<br>"+E("Kenta wants to teach children [　　] in the future."),
      answers:["how to swim"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("bad"),E("easy"),E("difficult"),E("sad")], answer:2 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("How much is this book?"), E("Whose pen is this?"),
                E("Why did you come to Japan?"), E("What time is it now?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Kenta wants to be a swimming coach."),
                E("Sakura doesn't like helping people."),
                E("Mr. Brown came to Japan to study Japanese."),
                E("Daiki wants to be a swimming coach.") ], answer:0 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("am a soccer fan"), E("like playing video games"),
                E("want to help sick people"), E("want to study music") ], answer:2 } ]}
]},

/* ===== 大問5 意見文（読解） ===== */
{ no:5, title:"次の英文は、水泳部のミカ(Mika)が発表した意見文です。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Mika from the swim club. Today I want to talk about my experience of learning to swim. '+
    'When I was in my first year, I could not swim at all. But now I really enjoy swimming. I want to share my story with you.<br><br>'+
    '<b>②</b> Last spring, I joined the swim club. At first, swimming was very hard for me. '+
    'I drank a lot of water and got tired soon. I sometimes wanted to stop coming to practice. '+
    'One day, my grandfather saw me. He said, "Don\'t give up. If you keep practicing, you will get better." '+
    'These words <u>(お) ___</u> my mind. I decided to try harder.<br><br>'+
    '<b>③</b> After that, I practiced very hard. My coach also helped me a lot. '+
    'She taught me how to move my arms. She said, "You should not hold your breath. Breathing makes your swimming better." '+
    'I followed her advice. Little by little, I could swim longer.<br><br>'+
    '<b>④</b> Some people say that swimming is only a sport. That\'s true. <u>④ Swimming is a good way to make your body stronger</u>. '+
    'But it is more than that for me. <u>③ ( me / swimming / many things / taught )</u>. '+
    'I learned that I should not stop trying. When I keep practicing, I can <u>(か) ___</u> my dream. '+
    'So please don\'t give up, and find something you love!',
    passageEn:true,
    note:'語注：give up あきらめる／breath 息／breathe 息をする／advice 助言',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お changed　か lose"), E("お changed　か reach"),
                E("お lost　か lose"), E("お lost　か reach") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "ミカは一生けんめい練習した。", "コーチが腕の動かし方を教えてくれた。",
                "コーチは息を止めるべきだと言った。", "ミカは少しずつ長く泳げるようになった。" ], answer:2 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["me","swimming","many things","taught"], answer:"Swimming taught me many things",
      display:"Swimming taught me many things" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語1語を、第2段落中から抜き出して書きなさい。<br>"+E("Mika's grandfather told her not to （　え　）."),
      answers:["give"], hint:"第2段落の語・英語1語" },
    { type:"jp", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に、適当な日本語を入れなさい。<br>水泳は、あなたの（　①　）をより（　②　）するためのよい方法だ。<br>①にあてはまる日本語：",
      model:"体（からだ）", tip:"本文 your body より。" },
    { type:"jp", label:"(5)②", pt:4, stem:"②にあてはまる日本語：",
      model:"強く（じょうぶに）", tip:"stronger より。" },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Mika could not swim at all in her first year."),
                E("Mika never wanted to stop coming to practice."),
                E("Mika's grandfather told her to keep practicing."),
                E("Mika's coach said that she should hold her breath."),
                E("Mika thinks swimming is only a sport for her.") ], answer:[0,2] } ]}
]}

]};
