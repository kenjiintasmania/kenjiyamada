/* data/okayama6.js ─ 岡山県スタイル 模擬テスト⑥（中3）
   参照：factory/inputs/okayama_notes.md の「傾向のみ」（リスニング厚め／聞く→書く複合／
   図表読み取り／記述分散／中3文法が軸）。過去問の文・図・設問の再現は一切なし。
   本文・対話・設問・選択肢はすべて新規創作。岡山らしい題材（備前焼の陶芸体験・伝統工芸の職人）を
   架空の町名（Wakaba/Midori/Hikari）で創作的に使用。okayama①〜⑤と題材・本文を重複させない。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "岡山県スタイル 模擬テスト⑥",
sections: [

/* ===== 大問1 リスニング（問題A〜D）　24点 ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the timetable. The next bus for the pottery town in Hikari leaves at one thirteen.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合うもの（バスの時刻表示）はどれですか。",
      choices:["ヒカリの陶芸の町行きのバスが1:30に出発。","ヒカリの陶芸の町行きのバスが1:13に出発。",
               "ヒカリの陶芸の町行きのバスが1:03に出発。","ミドリの陶芸の町行きのバスが1:13に出発。"], answer:1 } ] },
  { script:'(2) Look at the picture. It is a sunny morning, and an old man is making a cup with clay at the table.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う絵（朝の天気と様子）はどれですか。",
      choices:["晴れた朝で、おじいさんが机で粘土からカップを作っている。","くもった朝で、おじいさんが机で粘土からカップを作っている。",
               "晴れた朝で、おじいさんが机で皿を洗っている。","雨の朝で、おじいさんが外で絵をかいている。"], answer:0 } ] },

  /* 問題B：チャイムの応答 */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> Have you ever made a bowl at the pottery studio in Wakaba?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Yes, I have. I made a small cup last summer."), E("No, I won't sell any bowls."), E("It is cloudy in the studio."), E("You're welcome.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> How long does it take to dry the clay before we fire it?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I went to the shop by train."), E("It takes about one week."), E("Yes, the cup was beautiful."), E("Let's paint a picture together.") ], answer:1 } ] },

  /* 問題C：メモの空所補充（英語1語×3） */
  { intro:"問題C　ケンタ(Kenta)が、ALTのベイカー(Mr. Baker)先生に、ふるさとの伝統工芸についてインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, I\'m Mr. Baker from Canada. In my hometown, many people make beautiful things from <b>wood</b>.</span>'+
      '<span class="sp">My grandfather was a craftsman, and he taught me how to <b>cut</b> the wood into small spoons.</span>'+
      '<span class="sp">It was difficult, but making things by <b>hand</b> is a wonderful part of our culture.</span>',
    passage:'<b>ケンタのメモ</b><br>Mr. Baker — people make things from （　あ　） in his hometown<br>'+
            '— his grandfather taught him how to （　い　） the wood<br>— making things by （　う　） is a wonderful culture',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）木材", answers:["wood"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）（〜を）切る", answers:["cut"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）手", answers:["hand"], hint:"英語1語" } ] },

  /* 問題D：説明を聞いて答える（内容一致＋英作文） */
  { intro:"問題D　あなたとクラスメイトのユイ(Yui)が、職場体験の説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next week we will have a work-experience day. You can choose one place to visit.</span>'+
      '<span class="sp">Group A will help at a pottery studio. Group B will work at a paper factory. Group C will help at a flower shop.</span>'+
      '<span class="sp">The work experience starts at ten. Please wear old clothes and bring a small towel because your hands may get dirty.</span>'+
      '<span class="sp"><span class="who">Yui:</span> I really like making things with clay. Which group will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["職場体験は午後に始まる。","参加者は紙の工場で働くことができる。",
               "古い服は着なくてよい。","タオルは持って行かなくてよい。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"ユイの発言に対するあなたの答えを完成させなさい。<br>"+E("I really like making things with clay. So I will choose the （　　）.")+"（英語2語）",
      answers:["pottery studio"], hint:"英語2語" } ] }
]},

/* ===== 大問2 チラシ＋対話　16点 ===== */
{ no:2, title:"中学生のソウタ(Sota)とミナ(Mina)が、わかば市の「伝統工芸 備前焼の陶芸体験教室」のちらしを見ながら話しています。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Wakaba Pottery Experience Class!</h4>'+
    '<div class="note">Come and make your own cup or bowl with a real craftsman of our town!</div>'+
    '<table><tr><td>Date</td><td>November 14, 2026 (Saturday)</td></tr>'+
    '<tr><td>Time</td><td>9:30 a.m. – 11:30 a.m.</td></tr>'+
    '<tr><td>Price</td><td>1,500 yen for adults / 800 yen for students</td></tr>'+
    '<tr><td>Number of people</td><td>Only 12 people can join the class.</td></tr></table>'+
    '<div class="note">Teacher: Mr. Mori (He has made pottery in this town for thirty years.)<br>'+
    'You can take your cup home about one month later. → Please come to the studio gate first.</div>',
    passage:
    '<span class="sp"><span class="who">Sota:</span> Look, Mina. Mr. Mori is the （　あ　） famous craftsman in our town, I think.</span>'+
    '<span class="sp"><span class="who">Mina:</span> Yes. And making a cup by hand looks fun. I want to join, but I\'m not （　い　） that I can do it well.</span>'+
    '<span class="sp"><span class="who">Sota:</span> Don\'t worry. We are students, so the price for each of us is only （　X　） yen.</span>'+
    '<span class="sp"><span class="who">Mina:</span> Oh, that\'s not so expensive! I\'m （　い　） we can enjoy it together then.</span>'+
    '<span class="sp"><span class="who">Sota:</span> But look, only twelve people can join the class. We should send our names early.</span>'+
    '<span class="sp"><span class="who">Mina:</span> You\'re right. By the way, I want to make a tea cup. I think a handmade cup is the <u>(う) good</u> present for my mother.</span>'+
    '<span class="sp"><span class="who">Sota:</span> I agree. Let\'s meet at the studio gate at nine fifteen on that day.</span>'+
    '<span class="sp"><span class="who">Mina:</span> OK. The class is three days from now. See you on Saturday!</span>',
    note:'語注：craftsman 職人／by hand 手で／handmade 手作りの／studio 工房',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"（あ）に入れるのに最も適当な英語1語を書きなさい。", answers:["most"], hint:"the （　） famous" },
    { type:"fill", label:"(2)い", pt:3, stem:"2か所の（い）に共通して入る最も適当な英語1語を書きなさい。", answers:["sure"], hint:"I'm not 〜 / I'm 〜" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) good を、最も適当な形に変えて1語で書きなさい。", answers:["best"], hint:"the 〜 present" },
    { type:"fill", label:"(4)X", pt:3, stem:"会話の（X）に入る数字を、ちらしを見て算用数字で書きなさい。", answers:["800"], hint:"半角の数字" },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Mr. Mori has made pottery in this town for thirty years."),
                E("More than twenty people can join the class."),
                E("Sota and Mina will meet at the station first."),
                E("People can take their cup home on the same day.") ], answer:0 } ]}
]},

/* ===== 大問3 日記の英作文（並べかえ2問）　11点 ===== */
{ no:3, title:"アメリカでホームステイしているリク(Riku)は、ノア(Noah)の家にホームステイしています。次は、ホームステイ中のリクの日記の一部と、その日のできごとを表したイラストです。日記とイラストの内容に合うように、(1)に4語以上、(2)に3語以上の英語を、語を並べかえて書き、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：ノアが居間でたな(shelf)に手作りの茶わん(handmade bowls)をたくさん並べて見せている。リクはおどろいた顔をしている。",
    passage:
    'September 5<br><br>'+
    'This afternoon, Noah took me to the living room. He said, "Look at these!" '+
    'On the shelf, there were so many handmade bowls. I was surprised and said, "Wow! '+
    '<u>(1)</u>!" Noah smiled and said, "Yes. My grandmother made them by hand." He let me touch one of them. '+
    'In the evening, I sent <u>(2)</u> to my family in Japan. They wanted to see them, too.',
    passageEn:true,
    note:'語注：shelf たな／handmade 手作りの／bowl 茶わん',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"たくさんの手作りの茶わんを見ておどろく場面です。次の語を正しく並べて英文を完成させなさい。",
      words:["have","so","bowls","you","many"], answer:"You have so many bowls" },
    { type:"wordorder", label:"(2)", pt:5, stem:"夜、茶わんの写真を家族に送る場面です（I sent の続き）。次の語を正しく並べて英文を完成させなさい。",
      words:["of","them","picture","a"], answer:"a picture of them" } ]}
]},

/* ===== 大問4 話し合い＋感想　16点 ===== */
{ no:4, title:"ベル(Ms. Bell)先生の英語の授業で、Kaito、Yuna、Ren が、ふるさとの伝統工芸を残す方法について話し合いをしています。次の英文は、話し合いと、それを聞いて Sara が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Ms. Bell:</span> Today, let\'s talk about our town. How can we keep our traditional crafts for the future? Kaito, please start.</span>'+
    '<span class="sp"><span class="who">Kaito:</span> I want to open a small class. I want to teach children how to make a cup with clay.</span>'+
    '<span class="sp"><span class="who">Ms. Bell:</span> That\'s a nice idea. Why do you like pottery, Kaito?</span>'+
    '<span class="sp"><span class="who">Kaito:</span> Each cup is different and warm. I want to show children how to enjoy making things by hand.</span>'+
    '<span class="sp"><span class="who">Ms. Bell:</span> Wonderful. Yuna, how about you?</span>'+
    '<span class="sp"><span class="who">Yuna:</span> I want to make a website. Many craftsmen in our town are old, and few young people know about their work.</span>'+
    '<span class="sp"><span class="who">Ms. Bell:</span> That sounds great. Do you often use the Internet, Yuna?</span>'+
    '<span class="sp"><span class="who">Yuna:</span> Yes. Sharing things online is the thing I like the most. I want people in other countries to know our crafts.</span>'+
    '<span class="sp"><span class="who">Ms. Bell:</span> That\'s a smart idea. Ren, what is your idea?</span>'+
    '<span class="sp"><span class="who">Ren:</span> I want to hold a craft market. People can buy handmade cups and bowls, and they can meet the craftsmen.</span>'+
    '<span class="sp"><span class="who">Ms. Bell:</span> Holding a good market is not （　あ　）, but it can bring many people to our town.</span>'+
    '<span class="sp"><span class="who">Ren:</span> I think so.</span>'+
    '<span class="sp"><span class="who">Ms. Bell:</span> OK, I\'m going to talk about myself. When I came to this town, I visited a pottery studio. I made a small cup, so I learned to love this craft.</span>'+
    '<span class="sp"><span class="who">Ren:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Ms. Bell:</span> Good question. I came here four years ago to teach English. The town was warm and quiet, so I decided to stay.</span>'+
    '<span class="sp"><span class="who">Ren:</span> And now you visit the studio with us every year.</span>'+
    '<span class="sp"><span class="who">Ms. Bell:</span> Yes, and I love it. I hope you\'ll find a good way to keep our crafts.</span>',
    note:'語注：traditional craft 伝統工芸／craftsman 職人／by hand 手で／website ウェブサイト' },
  { passage:'<b>Sara の感想</b><br>There are many good ways to keep our crafts. Like Kaito, I want to share pottery with children. '+
            'I （　Y　）, too, so I want to teach young children how to make a cup by hand.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Kaito の発言から抜き出して書きなさい。<br>"+E("Kaito wants to show children [　　] making things by hand."),
      answers:["how to enjoy"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("bad"),E("easy"),E("difficult"),E("sad")], answer:1 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("How much is this cup?"), E("Whose website is this?"),
                E("Why did you come to this town?"), E("What time does the market start?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Kaito wants to teach children how to make a cup."),
                E("Yuna doesn't want to use the Internet."),
                E("Ren wants to write a long book about pottery."),
                E("Ms. Bell came to this town to study Japanese food.") ], answer:0 },
    { type:"mcq", label:"(5)Y", pt:3, stem:"（Y）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("am good at swimming"), E("love our local pottery"),
                E("want to study science"), E("don't have any hobbies") ], answer:1 } ]}
]},

/* ===== 大問5 長文スピーチ（意見文）　33点 ===== */
{ no:5, title:"次の英文は、美術部のアオイ(Aoi)が発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Aoi from the art club. Today I want to talk about my experience of learning pottery from an old craftsman. '+
    'When I was in my first year, I did not know much about traditional crafts. But now I really love them. I want to share my story with you.<br><br>'+
    '<b>②</b> Last spring, I joined a pottery class in our town. At first, making a cup with clay was very hard for me. '+
    'My cups often broke before they were finished, and I got tired soon. I sometimes wanted to stop going to the class. '+
    'One day, the old craftsman saw me. He said, "Don\'t give up. If you keep trying, your hands will remember the shape." '+
    'These words <u>(お) ___</u> my mind. I decided to try harder.<br><br>'+
    '<b>③</b> After that, I practiced very hard. The craftsman also helped me a lot. '+
    'He taught me how to move my fingers slowly. He said, "You should not push the clay too fast. Working slowly makes a better cup." '+
    'I followed his advice. Little by little, I could make a nice cup.<br><br>'+
    '<b>④</b> Some people say that pottery is only an old hobby. That\'s true. <u>④ Making pottery is a good way to keep our culture alive</u>. '+
    'But it is more than that for me. <u>③ ( me / pottery / many things / taught )</u>. '+
    'I learned that I should not stop trying. When I keep practicing, I can <u>(か) ___</u> my dream. '+
    'So please don\'t give up, and find something you love in your life!',
    passageEn:true,
    note:'語注：give up あきらめる／shape 形／finger 指／advice 助言／alive 生きている',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お changed　か lose"), E("お changed　か reach"),
                E("お lost　か lose"), E("お lost　か reach") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "アオイは一生けんめい練習した。", "職人は指をゆっくり動かす方法を教えてくれた。",
                "職人は粘土を速くおすべきだと言った。", "アオイは少しずつよいカップを作れるようになった。" ], answer:2 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["me","pottery","many things","taught"], answer:"Pottery taught me many things",
      display:"Pottery taught me many things" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語2語を、第2段落中から抜き出して書きなさい。<br>"+E("The old craftsman told Aoi not to （　え　）."),
      answers:["give up"], hint:"第2段落の語・英語2語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>焼き物を作ることは、私たちの（　①　）を（　②　）残しておくためのよい方法だ。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "文化","お金","建物","言葉" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "生きたまま（いきいきと）","しずかに","あたらしく","みじかく" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Aoi did not know much about traditional crafts in her first year."),
                E("Aoi never wanted to stop going to the class."),
                E("The old craftsman told Aoi to keep trying."),
                E("The craftsman said that Aoi should push the clay fast."),
                E("Aoi thinks pottery is only an old hobby for her.") ], answer:[0,2] } ]}
]}

]};
