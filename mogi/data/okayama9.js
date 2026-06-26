/* data/okayama9.js ─ 岡山県スタイル 模擬テスト⑨（中3）
   参照：factory/inputs/okayama_notes.md の「傾向のみ」（リスニング厚め／聞く→書く複合／
   図表読み取り／記述分散／中3文法が軸）。過去問の文・図・設問の再現は一切なし。
   本文・対話・設問・選択肢はすべて新規創作。題材は「留学生との交流・ホームステイ・
   日本文化の紹介」（書道・折り紙・茶道・和食など）を架空の町名（Wakaba/Midori/Hikari）で
   創作的に使用。okayama1（日本庭園のライトアップ・夏祭り・もも/マスカット・庭園そうじ）とは
   題材・本文・設問・選択肢を重複させない。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "岡山県スタイル 模擬テスト⑨",
sections: [

/* ===== 大問1 リスニング（問題A〜D）　24点 ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the schedule. The welcome party for the new student starts at four fifteen in the gym.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合うもの（予定の表示）はどれですか。",
      choices:["体育館での歓迎会が4:15に始まる。","図書館での歓迎会が4:15に始まる。",
               "体育館での歓迎会が4:50に始まる。","体育館での歓迎会が5:15に始まる。"], answer:0 } ] },
  { script:'(2) Look at the picture. A girl in a kimono is holding a paper crane in her right hand.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う絵（女の子の様子）はどれですか。",
      choices:["着物の女の子が左手に折りづるを持っている。","着物の女の子が右手に折りづるを持っている。",
               "着物の女の子が右手におうぎを持っている。","制服の女の子が右手に折りづるを持っている。"], answer:1 } ] },

  /* 問題B：チャイムの応答 */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> Have you ever tried writing your name with a brush?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("No, not yet. Can you show me how?"), E("Yes, I will buy a new brush."), E("It is a beautiful name."), E("You're welcome.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> How many origami cranes did you make for our guest?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I made them yesterday afternoon."), E("I made about thirty of them."), E("Yes, origami is interesting."), E("Let's fold paper together.") ], answer:1 } ] },

  /* 問題C：メモの空所補充（英語1語×3） */
  { intro:"問題C　ハルト(Haruto)が、ホームステイに来た留学生のルーシー(Lucy)に、楽しみたいことをインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hi, I\'m Lucy from the U.K. I came to Japan two days ago, and I\'m so excited to stay with your family.</span>'+
      '<span class="sp">First, I really want to learn Japanese <b>calligraphy</b>. I love beautiful letters written with a brush.</span>'+
      '<span class="sp">I also want to wear a <b>kimono</b> someday and take many photos in it.</span>'+
      '<span class="sp">And before I go home, I hope to <b>cook</b> Japanese food with your mother. I want to make sushi!</span>',
    passage:'<b>ハルトのメモ</b><br>Lucy — wants to learn Japanese （　あ　）<br>'+
            '— wants to wear a （　い　） and take photos<br>— hopes to （　う　） Japanese food with my mother',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）書道", answers:["calligraphy"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）着物", answers:["kimono"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）料理する", answers:["cook"], hint:"英語1語" } ] },

  /* 問題D：説明を聞いて答える（内容一致＋英作文） */
  { intro:"問題D　あなたとクラスメイトのソウタ(Sota)が、留学生の歓迎会についての先生の説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next Friday, we will have a welcome party for the students from Hikari. You can choose one activity to show them.</span>'+
      '<span class="sp">Group A will teach origami. Group B will play taiko drums. Group C will make green tea in the tea room.</span>'+
      '<span class="sp">The party starts at three. Please come to the music room, and don\'t forget to bring your own cup if you choose Group C.</span>'+
      '<span class="sp"><span class="who">Sota:</span> I really like playing music. Which group will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["歓迎会は来週の月曜日に開かれる。","参加者は太鼓を演奏することができる。",
               "歓迎会は午前中に始まる。","C班の人もカップを持って来なくてよい。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"ソウタの発言に対するあなたの答えを完成させなさい。<br>"+E("I really like playing music. So I will choose the （　　） drums.")+"（英語1語）",
      answers:["taiko"], hint:"英語1語" } ] }
]},

/* ===== 大問2 チラシ＋対話　16点 ===== */
{ no:2, title:"中学生のミナ(Mina)とダイキ(Daiki)が、みどり市の「日本文化体験デー」のちらしを見ながら話しています。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Midori Japanese Culture Day — for Students from Abroad!</h4>'+
    '<div class="note">Come and try Japanese culture with us! Students from other countries are welcome.</div>'+
    '<table><tr><td>Date</td><td>November 14, 2026 (Saturday)</td></tr>'+
    '<tr><td>Time</td><td>10:00 a.m. – 3:00 p.m.</td></tr>'+
    '<tr><td>Lessons</td><td>Calligraphy / Origami / Tea ceremony</td></tr>'+
    '<tr><td>Number of people</td><td>Only 30 students can join each lesson.</td></tr></table>'+
    '<div class="note">Teacher: Ms. Mori (She has taught calligraphy for fifteen years.)<br>'+
    'After the lessons, you can enjoy a small kimono show in the main hall. → Please come to the front desk first.</div>',
    passage:
    '<span class="sp"><span class="who">Daiki:</span> Look, Mina. I think this is the （　あ　） interesting event for our guests this month.</span>'+
    '<span class="sp"><span class="who">Mina:</span> I agree. Lucy wants to try calligraphy, but she is not （　い　） that she can write kanji well.</span>'+
    '<span class="sp"><span class="who">Daiki:</span> She doesn\'t need to worry. Ms. Mori is a very kind teacher.</span>'+
    '<span class="sp"><span class="who">Mina:</span> That\'s good. I\'m （　い　） Lucy will enjoy the lesson with her.</span>'+
    '<span class="sp"><span class="who">Daiki:</span> By the way, only thirty students can join each lesson, so we should sign up early.</span>'+
    '<span class="sp"><span class="who">Mina:</span> You\'re right. I also think the kimono show is the <u>(う) good</u> part of this day.</span>'+
    '<span class="sp"><span class="who">Daiki:</span> The event is two days from now. Let\'s meet at the front desk at nine fifty on that day.</span>'+
    '<span class="sp"><span class="who">Mina:</span> OK. See you on Saturday!</span>',
    note:'語注：from abroad 海外から／calligraphy 書道／tea ceremony 茶道／sign up 申しこむ／front desk 受付',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"（あ）に入れるのに最も適当な英語1語を書きなさい。", answers:["most"], hint:"the （　） interesting" },
    { type:"fill", label:"(2)い", pt:3, stem:"2か所の（い）に共通して入る最も適当な英語1語を書きなさい。", answers:["sure"], hint:"is not 〜 / I'm 〜" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) good を、最も適当な形に変えて1語で書きなさい。", answers:["best"], hint:"the 〜 part of this day" },
    { type:"fill", label:"(4)X", pt:3, stem:"次の文の（X）に入る数字を、ちらしを見て算用数字で書きなさい。<br>"+E("Only （　X　） students can join each lesson."), answers:["30"], hint:"半角の数字" },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Ms. Mori has taught calligraphy for fifteen years."),
                E("The culture day starts at three in the afternoon."),
                E("Mina and Daiki will meet at the main hall first."),
                E("More than fifty students can join each lesson.") ], answer:0 } ]}
]},

/* ===== 大問3 日記の英作文（並べかえ2問）　11点 ===== */
{ no:3, title:"留学生のトム(Tom)は、わかば町のサキ(Saki)の家にホームステイしています。次は、ホームステイ中のトムの日記の一部と、その日のできごとを表したイラストです。日記とイラストの内容に合うように、(1)に4語以上、(2)に3語以上の英語を、語を並べかえて書き、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：サキが机の上に、筆で「友」と上手に書かれた書道の作品を見せている。トムはおどろいた顔で見ている。",
    passage:
    'October 9<br><br>'+
    'This evening, Saki showed me her calligraphy. She wrote the kanji for "friend" with a brush. '+
    'It looked so beautiful. I was surprised and said, "Wow! '+
    '<u>(1)</u>!" Saki smiled and said, "Thank you. I have practiced it since I was seven." She gave the paper to me as a present. '+
    'Later, I sent <u>(2)</u> to my family in Canada. They were surprised, too.',
    passageEn:true,
    note:'語注：calligraphy 書道／brush 筆／kanji 漢字',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"上手な書道の作品を見ておどろく場面です。次の語を正しく並べて英文を完成させなさい。",
      words:["are","at","you","good","calligraphy"], answer:"You are good at calligraphy" },
    { type:"wordorder", label:"(2)", pt:5, stem:"夜、書道の作品の写真を家族に送る場面です（I sent の続き）。次の語を正しく並べて英文を完成させなさい。",
      words:["of","a","it","photo"], answer:"a photo of it" } ]}
]},

/* ===== 大問4 話し合い＋感想　16点 ===== */
{ no:4, title:"クラーク(Mr. Clark)先生の英語の授業で、Yuki、Ren、Aya が、留学生のアンナ(Anna)に日本文化を体験してもらう方法について話し合いをしています。次の英文は、話し合いと、それを聞いて Kota が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Clark:</span> Today, let\'s talk about Anna. She is staying in Hikari for one month. How can we help her enjoy Japanese culture? Yuki, please start.</span>'+
    '<span class="sp"><span class="who">Yuki:</span> I want to teach her origami. I want to show her how to fold a paper crane.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> That\'s a nice idea. Why do you like origami, Yuki?</span>'+
    '<span class="sp"><span class="who">Yuki:</span> We can make many things from just one piece of paper. I want to teach her how to make a beautiful flower, too.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> Wonderful. Ren, how about you?</span>'+
    '<span class="sp"><span class="who">Ren:</span> I want to take her to a tea ceremony. My aunt is a tea teacher, and the quiet time is really special.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> That sounds great. Do you often join the tea ceremony, Ren?</span>'+
    '<span class="sp"><span class="who">Ren:</span> Yes. Drinking tea slowly is the thing I like the most. I want Anna to feel the calm time, too.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> That\'s a warm idea. Aya, what is your idea?</span>'+
    '<span class="sp"><span class="who">Aya:</span> I want to cook Japanese food with her. We can make rice balls together, and they are easy and delicious.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> Cooking with a guest is not （　あ　）, but it is a fun way to share our culture.</span>'+
    '<span class="sp"><span class="who">Aya:</span> I think so.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> OK, I\'m going to talk about myself. When I first came to Japan, my host family taught me how to wear a yukata. I was very happy.</span>'+
    '<span class="sp"><span class="who">Aya:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> Good question. I came to Japan eight years ago to teach English. The culture was new and interesting, so I decided to stay.</span>'+
    '<span class="sp"><span class="who">Aya:</span> And now you are teaching us about many countries every day.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> Yes, and I love it. I hope Anna will have a wonderful time with all of you.</span>',
    note:'語注：fold 折る／paper crane 折りづる／tea ceremony 茶道／rice ball おにぎり／yukata ゆかた' },
  { passage:'<b>Kota の感想</b><br>There are many ways to share Japanese culture. Like Aya, I want to cook with Anna. '+
            'I （　Y　）, too, so I want to make rice balls with her after school.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Yuki の発言から抜き出して書きなさい。<br>"+E("Yuki wants to show Anna [　　] a paper crane."),
      answers:["how to fold"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("bad"),E("easy"),E("difficult"),E("sad")], answer:1 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("How much is this yukata?"), E("Whose tea is this?"),
                E("Why did you come to Japan?"), E("What time does the class start?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Yuki wants to teach Anna how to make origami."),
                E("Ren doesn't like joining the tea ceremony."),
                E("Aya wants to teach Anna how to swim."),
                E("Mr. Clark came to Japan to study Japanese cooking.") ], answer:0 },
    { type:"mcq", label:"(5)Y", pt:3, stem:"（Y）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("am good at tennis"), E("like cooking Japanese food"),
                E("want to study math"), E("don't have any free time") ], answer:1 } ]}
]},

/* ===== 大問5 長文スピーチ（意見文）　33点 ===== */
{ no:5, title:"次の英文は、わかば中学校に留学していたエミリー(Emily)が、帰国前のスピーチで発表した英文です。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Emily, and I came from Australia. Today I want to talk about my experience of learning Japanese culture during my homestay. '+
    'When I arrived, I knew almost nothing about Japan. But now I love many things here. I want to share my story with you.<br><br>'+
    '<b>②</b> In April, I started my homestay with Mika\'s family. At first, everything was new, and I was a little afraid. '+
    'I could not use chopsticks well, and I often felt shy. I sometimes wanted to stay in my room. '+
    'One day, Mika\'s grandmother saw me. She said, "Don\'t be afraid. If you keep trying, you will make many friends." '+
    'These words <u>(お) ___</u> my mind. I decided to try harder.<br><br>'+
    '<b>③</b> After that, I joined many activities. Mika also helped me a lot. '+
    'She taught me how to fold paper cranes. She said, "You should not pull the paper hard. Folding it slowly makes a beautiful shape." '+
    'I followed her advice. Little by little, I learned many parts of Japanese culture.<br><br>'+
    '<b>④</b> Some people say that culture is just old customs. That may be true. <u>④ Learning Japanese culture is a good way to understand this country better</u>. '+
    'But it was more than that for me. <u>③ ( me / Japanese culture / a lot of things / taught )</u>. '+
    'I learned that I should not be afraid of new things. When I keep trying, I can <u>(か) ___</u> my dream. '+
    'So please be brave, and enjoy meeting people from other countries!',
    passageEn:true,
    note:'語注：homestay ホームステイ／chopsticks はし／shy はずかしがりの／fold 折る／custom 習慣／advice 助言',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お changed　か lose"), E("お changed　か reach"),
                E("お lost　か lose"), E("お lost　か reach") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "エミリーは多くの活動に参加した。", "ミカが折りづるの折り方を教えてくれた。",
                "ミカは紙を強く引っぱるべきだと言った。", "エミリーは少しずつ日本文化の多くの部分を学んだ。" ], answer:2 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["me","Japanese culture","a lot of things","taught"], answer:"Japanese culture taught me a lot of things",
      display:"Japanese culture taught me a lot of things" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語2語を、第2段落中から抜き出して書きなさい。<br>"+E("Mika's grandmother told Emily not to be （　え　）."),
      answers:["afraid"], hint:"第2段落の語・英語1語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>日本文化を学ぶことは、この国を（　①　）（　②　）するためのよい方法だ。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "より深く","より大きく","より新しく","より静かに" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "理解（する）","建設（する）","しょうかい（する）","しゅうり（する）" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Emily knew almost nothing about Japan when she arrived."),
                E("Emily never wanted to stay in her room."),
                E("Mika's grandmother told Emily to keep trying."),
                E("Mika said that Emily should pull the paper hard."),
                E("Emily thinks culture is just old customs for her.") ], answer:[0,2] } ]}
]}

]};
