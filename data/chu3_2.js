/* data/chu3_2.js ─ 中3 第2回 模擬テスト
   出典：正進社 過去問「3年 第2回」（大問1〜5・リスニング問題A〜D）。
   出題傾向・問題数は完全一致。季節・数字・名前・場所などの細部のみ入れかえ。
   ※この回に必要な単語は「中3 第2回 答えの単語テスト」に対応。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 第2回 模擬テスト",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  { intro:"問題A　放送を聞いて、内容に合う絵をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the sign. This shop is closed on Tuesday.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合うかんばん（定休日）はどれですか。",
      choices:["火曜定休","水曜定休","月曜定休","木曜定休"], answer:0 } ] },
  { script:'(2) There are two cats and one dog in the picture.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う絵はどれですか。",
      choices:["ネコ2匹・イヌ1匹","ネコ1匹・イヌ2匹","ネコ2匹・イヌ2匹","ネコ1匹・イヌ1匹"], answer:0 } ] },

  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> It\'s hot in this room. Can you open the window?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Sure, no problem."), E("Yes, I cleaned it."), E("No, I didn't go there."), E("It was a lot of fun.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> What did you do during the summer vacation?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I visited my grandmother in Okinawa."), E("Yes, I will."), E("No, thank you."), E("It's mine.") ], answer:0 } ] },

  { intro:"問題C　先生が宿題について話しています。マリ(Mari)が書いたメモの（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Now I\'ll tell you about your homework. Write about your favorite <b>season</b>.</span>'+
      '<span class="sp">Write more than <b>seventy</b> English words about it.</span>'+
      '<span class="sp">Finish your homework by next <b>Monday</b>.</span>',
    passage:'<b>マリのメモ</b><br>・好きな（　あ　）について書く<br>・それについて（　い　）語より多く英語で書く<br>・次の（　う　）までに終わらせる',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）季節", answers:["season"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）70", answers:["seventy"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）月曜日", answers:["monday"], hint:"英語1語" } ] },

  { intro:"問題D　あなたとクラスメイトのトム(Tom)が、川の清掃活動についての説明を聞いて話しています。(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next Saturday we will have a clean-up activity at the river. You can choose one group.</span>'+
      '<span class="sp">Group A will collect plastic bottles. Group B will collect cans.</span>'+
      '<span class="sp">The activity starts at nine in the morning. Please bring gloves and a cap.</span>'+
      '<span class="sp">After the activity, we will have juice together.</span>'+
      '<span class="sp"><span class="who">Tom:</span> I want to collect plastic bottles. Which group will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["活動は日曜日に行われる。","活動は午前9時に始まる。",
               "ぼうしを持ってくる必要はない。","活動の後にお茶が出される。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"トムの発言に対するあなたの答えを完成させなさい。<br>"+E("I want to collect cans. So I will choose （　　）.")+"（英語2語）",
      answers:["group b"], hint:"英語2語" } ] }
]},

/* ===== 大問2 メニュー表＋対話 ===== */
{ no:2, title:"リョウ(Ryo)とリサ(Lisa)が、歩きながら話しています。次のメニュー表と会話を読み、(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>カフェ・メニュー表</h4>'+
    '<table><tr><th>セット</th><th>ねだん</th><th>内容</th></tr>'+
    '<tr><td>Set A</td><td>¥700</td><td>Pizza・Salad・Drink</td></tr>'+
    '<tr><td>Set B</td><td>¥750</td><td>Pasta・Salad・Drink</td></tr>'+
    '<tr><td>Set C</td><td>¥850</td><td>Pizza・Cake・Drink</td></tr>'+
    '<tr><td>Set D</td><td>¥1,300</td><td>Pizza×2・Salad・Drink×2</td></tr></table>'+
    '<table style="margin-top:6px"><tr><th>サイドメニュー</th><th></th></tr>'+
    '<tr><td>Drink　S / M / L</td><td>¥120 / ¥150 / ¥200</td></tr>'+
    '<tr><td>Cake</td><td>¥280</td></tr><tr><td>Salad</td><td>¥250</td></tr><tr><td>Ice cream</td><td>¥300</td></tr></table>',
    passage:
    '<span class="sp"><span class="who">Ryo:</span> We still have some time before the movie. It starts at （あ） o\'clock. How about going to a café?</span>'+
    '<span class="sp"><span class="who">Lisa:</span> Good idea. It\'s one thirty now. We have thirty minutes, so we have （い） time to eat. But we need about ten minutes to walk to the theater.</span>'+
    '<span class="sp"><span class="who">Ryo:</span> Right. There is a nice café over there. Let\'s go.</span>'+
    '<span class="sp"><i>At the café.</i></span>'+
    '<span class="sp"><span class="who">Lisa:</span> Look at the menu. Which set do you like?</span>'+
    '<span class="sp"><span class="who">Ryo:</span> Well, Set D looks good. Let\'s share it. It has （あ） pizzas and （あ） drinks.</span>'+
    '<span class="sp"><span class="who">Lisa:</span> That\'s too much for me. We <u>(う) eat</u> lunch two hours ago, so I\'m not very hungry.</span>'+
    '<span class="sp"><span class="who">Ryo:</span> Then how about Set B and a medium drink? We can share the pasta and salad.</span>'+
    '<span class="sp"><span class="who">Lisa:</span> That\'s good.</span>'+
    '<span class="sp"><span class="who">Ryo:</span> Then I\'ll go and order. I\'ll pay for ours. Keep our table, Lisa.</span>'+
    '<span class="sp"><span class="who">Lisa:</span> OK. I\'ll pay you half later.</span>',
    note:'語注：over there あそこに／medium Mサイズの／pay 支払う／half 半分',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"3か所の（あ）に共通して入れる最も適当な英語1語を書きなさい。", answers:["two"], hint:"〜o'clock / 〜 pizzas" },
    { type:"fill", label:"(2)い", pt:3, stem:"（い）に入れるのに最も適当な英語1語を書きなさい。", answers:["enough"], hint:"〜 time to eat（じゅうぶんな）" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) eat を、最も適当な形に変えて1語で書きなさい。", answers:["ate"], hint:"two hours ago" },
    { type:"mcq", label:"(4)", pt:3, stem:"リョウがレジで支払う金額として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("900円"), E("1,000円"), E("1,100円"), E("1,300円") ], answer:0 },
    { type:"mcq", label:"(5)", pt:4, stem:"メニュー表や会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("There are only three types of set menus at the café."),
                E("Ryo and Lisa will go to the movie after they eat at the café."),
                E("Lisa wants to eat a lot because she is very hungry."),
                E("Ryo and Lisa will not pay for the food.") ], answer:1 } ]}
]},

/* ===== 大問3 日記の英作文 ===== */
{ no:3, title:"ソラ(Sora)には、リリー(Lily)という友達がいます。次は、ある日曜日のソラの日記の一部と、その日のできごとを表したイラストです。日記とイラストの内容に合うように、(1)に4語以上、(2)に3語以上の英語を書き、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：ソラの部屋に大きなCDだながあり、二人でいっしょに音楽を聞いている。",
    passage:
    'November 9<br><br>'+
    'Lily visited my house in the afternoon. When she came into my room, she said, "What a big CD shelf! '+
    '<u>(1)</u> you have?" I said, "About five hundred." I showed her some of my favorite songs. We enjoyed listening to them together. '+
    'At four thirty, she said, "I want to stay here longer, but I have <u>(2)</u> before five. I\'m going to cook dinner with my father." '+
    'I wanted to talk with her more, but she left my house.',
    passageEn:true,
    note:'語注：CD shelf CDだな／five hundred 500',
    items:[
    { type:"en", label:"(1)", pt:6, stem:"日記とイラストに合うように、リリーのことばを4語以上で書きなさい。", minWords:4,
      model:"How many CDs do you have?", tip:"ソラが「約500」と答えている。数をたずねる文。" },
    { type:"en", label:"(2)", pt:5, stem:"日記の流れに合うように、3語以上で書きなさい。", minWords:3,
      model:"to go home", tip:"5時前に家ですること。「〜しなければならない」have to の続き。" } ]}
]},

/* ===== 大問4 話し合い＋感想 ===== */
{ no:4, title:"グリーン(Green)先生と中学校の英語部の Emma(エマ)、Leo(レオ)、Saki(サキ)が、学校での朝食について話し合いをしています。次の英文は、話し合いと、それを聞いて Naoto が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Green:</span> Good afternoon, everyone. Let\'s talk about breakfast in your countries. Emma, can you tell us first?</span>'+
    '<span class="sp"><span class="who">Emma:</span> OK. In America, many students eat cereal or toast for breakfast. It\'s quick. Some students don\'t eat breakfast because they are busy.</span>'+
    '<span class="sp"><span class="who">Leo:</span> I\'m from France. In France, many people eat bread, like croissants. When I was in France, I sometimes ate breakfast at a café near my house.</span>'+
    '<span class="sp"><span class="who">Saki:</span> That\'s interesting. In Japan, many families eat rice and miso soup. We often eat together and talk about our plans for the day.</span>'+
    '<span class="sp"><span class="who">Mr. Green:</span> Breakfast is a good chance to （　え　） together. But some people say young people don\'t eat breakfast now. Is that true?</span>'+
    '<span class="sp"><span class="who">Saki:</span> My brother is a high school student, and he sometimes skips breakfast.</span>'+
    '<span class="sp"><span class="who">Leo:</span> Every morning?</span>'+
    '<span class="sp"><span class="who">Saki:</span> （　お　）</span>'+
    '<span class="sp"><span class="who">Saki:</span> My mother makes it every morning, but he sometimes gets up late.</span>'+
    '<span class="sp"><span class="who">Emma:</span> <u>(か) I became interested in Japanese breakfast</u> when I watched a Japanese movie. In the movie, a family ate rice and fish in the morning. So I tried natto in America.</span>'+
    '<span class="sp"><span class="who">Leo:</span> Really? I want to try a Japanese breakfast in France, but I can\'t find natto.</span>'+
    '<span class="sp"><span class="who">Saki:</span> Then, when you visit Japan, let\'s eat breakfast together.</span>'+
    '<span class="sp"><span class="who">Mr. Green:</span> Breakfasts in each country are different, but eating with family is always nice.</span>',
    note:'語注：cereal シリアル／skip 〜をぬかす／natto 納豆' },
  { passage:'<b>Naoto の感想</b><br>Breakfasts in some countries are different, and all of them are interesting. '+
            'I want to （　き　） like people in France. I can\'t do that on busy mornings in Japan.', passageEn:true,
    items:[
    { type:"mcq", label:"(1)え", pt:3, stem:"（え）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("move"), E("cook"), E("talk"), E("work") ], answer:2 },
    { type:"mcq", label:"(2)お", pt:3, stem:"（お）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Who makes his breakfast?"), E("Where does he buy it?"),
                E("How does she cook rice?"), E("When does she eat natto?") ], answer:0 },
    { type:"fill", label:"(3)", pt:4, stem:"下線部(か)の内容を表すように、本文中から連続する英語6語を抜き出して書きなさい。",
      answers:["i became interested in japanese breakfast"], hint:"英語6語" },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("In America, all students eat a big breakfast."),
                E("Leo sometimes ate breakfast at a café in France."),
                E("Saki's brother never eats breakfast."),
                E("Emma tried natto in Japan.") ], answer:1 },
    { type:"mcq", label:"(5)", pt:3, stem:"感想の（き）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("eat cereal quickly at home"), E("eat breakfast at a café"),
                E("skip breakfast every day"), E("cook miso soup for my family") ], answer:1 } ]}
]},

/* ===== 大問5 原稿（読解） ===== */
{ no:5, title:"次の英文は、ユイ(Yui)が書いた原稿です。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> When I became a junior high school student, I joined the brass band. I liked music, so I wanted to play the trumpet well.<br><br>'+
    '<b>②</b> Three months later, in August, we had a music contest. It was my first one. I decided to play my best. '+
    'I practiced hard in the music room every day. I listened to many CDs of famous players, and I asked some members how to play better. '+
    'When I finished practicing, I thought I was （　お　）. However, our band didn\'t win any prizes. '+
    'My friend, Ken, said, "I think your sound needs something." I said, "What is it?" He said nothing. '+
    'I thought, "Maybe I should stop playing because we didn\'t win."<br><br>'+
    '<b>③</b> That night, my grandmother heard my story. She said, "Why do you look so （　か　）?" I told her about the contest. '+
    'She said, "How did you feel when you played?" I said, "I felt happy when the sound was beautiful." '+
    'She said, "How about expressing that feeling? I think that will <u>(き) ( make / your / better / sound )</u>." '+
    'I said, "Thank you. But my skills are not good." She said, "Don\'t worry, Yui. You should keep practicing if you really like music. '+
    'If you keep practicing, you can improve your skills." I said, "<u>(く) That</u> may be right. I\'ll try again."<br><br>'+
    '<b>④</b> The next month, I practiced with my feelings. I thought about the song\'s story. Finally, at the next contest, our band got a prize.<br><br>'+
    '<b>⑤</b> Of course, I sometimes think playing well is difficult. But now, I don\'t think that I （　け　） when we can\'t win. '+
    'I don\'t play for prizes. I will keep playing in high school.',
    passageEn:true,
    note:'語注：brass band 吹奏楽部／contest コンテスト／prize 賞／keep 〜ing 〜し続ける／express 〜を表現する',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"第2段落について、本文で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "毎日音楽室で練習した。","有名な演奏者のCDを聞いた。",
                "よい楽器を買いに行った。","部員に上手な演奏のしかたをたずねた。" ], answer:2 },
    { type:"mcq", label:"(2)", pt:4, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お bad　か sad"), E("お perfect　か sad"),
                E("お bad　か excited"), E("お perfect　か excited") ], answer:1 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部(き)の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["make","your","better","sound"], answer:"make your sound better",
      display:"make your sound better" },
    { type:"jp", label:"(4)①", pt:4, stem:"下線部(く)の具体的内容を説明する次の文の①・②に、適当な日本語を入れなさい。<br>ユイが本当に（　①　）ならば、練習を続けるべきだ。練習を続ければ、（　②　）ことができる、という祖母のことば。<br>①にあてはまる日本語：",
      model:"音楽が好き", tip:"if you really like music より。" },
    { type:"jp", label:"(4)②", pt:4, stem:"②にあてはまる日本語：",
      model:"（演奏の）技術を上達させる", tip:"you can improve your skills より。" },
    { type:"fill", label:"(5)け", pt:4, stem:"（け）に入れるのに最も適当な英語3語を、本文中から抜き出して書きなさい。",
      answers:["should stop playing"], hint:"英語3語（第2段落より）" },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Yui joined the brass band when she became a junior high school student."),
                E("Ken told Yui the band didn't win because she didn't practice hard."),
                E("Yui's grandmother won many prizes when she was young."),
                E("Yui's band got a prize at the next contest."),
                E("Yui will stop playing the trumpet in high school.") ], answer:[0,3] } ]}
]}

]};
