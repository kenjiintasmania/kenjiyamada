/* data/okayama5.js ─ 岡山県スタイル 模擬テスト⑤（中3）
   参照：factory/inputs/okayama_notes.md の「傾向のみ」（リスニング厚め／聞く→書く複合／
   図表読み取り／記述分散／中3文法が軸）。過去問の文・図・設問の再現は一切なし。
   本文・対話・設問・選択肢はすべて新規創作。題材は「路面電車(tram)での町案内」と
   「駅前図書館(station library)のイベント」を、架空の町名（Wakaba/Midori/Hikari）で創作的に使用。
   okayama1（日本庭園ライトアップ／夏祭り／果物農園／庭園そうじ）とは題材・登場人物を重複させない。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "岡山県スタイル 模擬テスト⑤",
sections: [

/* ===== 大問1 リスニング（問題A〜D）　24点 ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ（英文1回） */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the sign at the tram stop. The next tram for Hikari leaves at eight fifty.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合うもの（路面電車の発車表示）はどれですか。",
      choices:["ヒカリ行きの路面電車が8:15に出発。","ヒカリ行きの路面電車が8:50に出発。",
               "ヒカリ行きの路面電車が8:05に出発。","ミドリ行きの路面電車が8:50に出発。"], answer:1 } ] },
  { script:'(2) Look at the picture in front of the library. It is snowy today, and three children are waiting at the bus stop.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う絵（図書館前の今日の様子）はどれですか。",
      choices:["雪で、子どもが3人バス停で待っている。","くもりで、子どもが3人バス停で待っている。",
               "雪で、子どもが2人バス停で待っている。","晴れで、子どもが3人駅で待っている。"], answer:0 } ] },

  /* 問題B：チャイムの応答（英文2回） */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> Which tram should I take to get to the station library?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("You should take the blue tram."), E("No, I didn't read the book."), E("The library was closed yesterday."), E("The station is far from here.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> How often does the tram for Midori come?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I took the tram yesterday morning."), E("It comes every ten minutes."), E("Yes, the tram was very full."), E("Let's ride the tram together.") ], answer:1 } ] },

  /* 問題C：メモの空所補充（英語1語×3） */
  { intro:"問題C　タクヤ(Takuya)が、ALTのベイカー(Mr. Baker)先生に、駅前図書館の利用についてインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hi, I\'m Mr. Baker. I often go to the station library on <b>Sunday</b> because I have a lot of free time then.</span>'+
      '<span class="sp">I usually take the <b>tram</b> to the library because it stops right in front of the door.</span>'+
      '<span class="sp">My favorite place there is the reading room on the third <b>floor</b>. It is quiet and bright.</span>',
    passage:'<b>タクヤのメモ</b><br>Mr. Baker — goes to the station library on （　あ　）<br>'+
            '— takes the （　い　） to the library<br>— likes the reading room on the third （　う　）',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）日曜日", answers:["sunday"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）路面電車", answers:["tram"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）階", answers:["floor"], hint:"英語1語" } ] },

  /* 問題D：説明を聞いて答える（内容一致＋英作文） */
  { intro:"問題D　あなたとクラスメイトのソフィア(Sophia)が、駅前図書館の館内放送を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Welcome to the station library. We have three special events for you today.</span>'+
      '<span class="sp">In Room A, you can listen to a story for children. In Room B, you can join an English word game. In Room C, you can make a paper bookmark.</span>'+
      '<span class="sp">All the events start at two in the afternoon. Please be quiet in the rooms, and you do not need to bring anything.</span>'+
      '<span class="sp"><span class="who">Sophia:</span> I really like making things with my hands. Which room will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["イベントは午前中に始まる。","B室では英語の単語ゲームができる。",
               "参加には何か持ってくる必要がある。","C室では物語の読み聞かせがある。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"ソフィアの発言に対するあなたの答えを完成させなさい。<br>"+E("I really like making things with my hands. So I will choose （　　）.")+"（英語2語）",
      answers:["room c"], hint:"英語2語" } ] }
]},

/* ===== 大問2 チラシ＋対話　16点 ===== */
{ no:2, title:"中学生のユウト(Yuto)とサキ(Saki)が、わかば市の「路面電車で行く 駅前図書館 読書フェア」のちらしを見ながら話しています。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Wakaba Station Library — Reading Fair!</h4>'+
    '<div class="note">Take the tram and visit our reading fair at the station library!</div>'+
    '<table><tr><td>Date</td><td>November 14, 2026 (Saturday)</td></tr>'+
    '<tr><td>Time</td><td>10:00 a.m. – 4:00 p.m.</td></tr>'+
    '<tr><td>Tram fare</td><td>300 yen for adults / 100 yen for students</td></tr>'+
    '<tr><td>Number of people</td><td>Only 30 students can join the tram tour.</td></tr></table>'+
    '<div class="note">Guide: Ms. Clark (She has worked at this library for fifteen years.)<br>'+
    'You can also get a free bookmark at the front desk. → Please come to the tram stop in front of the station first.</div>',
    passage:
    '<span class="sp"><span class="who">Yuto:</span> Look, Saki. This is the （　あ　） interesting fair in our city, I think.</span>'+
    '<span class="sp"><span class="who">Saki:</span> Yes, and we can go there by tram. I want to join, but I\'m not （　い　） that I have enough money for the fare.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> Don\'t worry. We are students, so the tram fare is only （　X　） yen.</span>'+
    '<span class="sp"><span class="who">Saki:</span> Wow, that\'s really cheap! I\'m （　い　） we can go together now.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> But look, only thirty students can join the tram tour. We should sign up early.</span>'+
    '<span class="sp"><span class="who">Saki:</span> You\'re right. By the way, the free bookmark sounds nice. I think the bookmarks there are the <u>(う) cute</u> in our town.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> I agree. Let\'s meet at the tram stop in front of the station at nine forty.</span>'+
    '<span class="sp"><span class="who">Saki:</span> OK. The fair is two days from now. See you on Saturday!</span>',
    note:'語注：reading fair 読書フェア／tram fare 路面電車の運賃／bookmark しおり／front desk 受付／sign up 申しこむ',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"（あ）に入れるのに最も適当な英語1語を書きなさい。", answers:["most"], hint:"the （　） interesting" },
    { type:"fill", label:"(2)い", pt:3, stem:"2か所の（い）に共通して入る最も適当な英語1語を書きなさい。", answers:["sure"], hint:"I'm not 〜 / I'm 〜" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) cute を、最も適当な形に変えて1語で書きなさい。", answers:["cutest"], hint:"the 〜 in our town" },
    { type:"fill", label:"(4)X", pt:3, stem:"会話の（X）に入る数字を、ちらしを見て算用数字で書きなさい。", answers:["100"], hint:"半角の数字" },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Ms. Clark has worked at the library for fifteen years."),
                E("More than forty students can join the tram tour."),
                E("Yuto and Saki will meet at the front desk first."),
                E("The reading fair starts at twelve in the afternoon.") ], answer:0 } ]}
]},

/* ===== 大問3 日記の英作文（並べかえ2問）　11点 ===== */
{ no:3, title:"カナダにホームステイしているレン(Ren)は、ノア(Noah)の家にホームステイしています。次は、ホームステイ中のレンの日記の一部と、その日のできごとを表したイラストです。日記とイラストの内容に合うように、(1)に4語以上、(2)に3語以上の英語を、語を並べかえて書き、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：ノアと一緒に古い路面電車(old tram)に乗っている。車内にはきれいな木のいすが並び、レンは窓の外を指さしておどろいている。",
    passage:
    'September 9<br><br>'+
    'This morning, Noah took me to the town by an old tram. He said, "Look outside!" '+
    'From the window, I could see so many old shops. I was surprised and said, "Wow! '+
    '<u>(1)</u>!" Noah smiled and said, "Yes. This tram has run here for a hundred years." '+
    'In the evening, I sent <u>(2)</u> to my friends in Japan. They wanted to ride it, too.',
    passageEn:true,
    note:'語注：tram 路面電車／outside 外を／shop 店／email メール',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"窓の外にたくさんの古い店が見えておどろく場面です。次の語を正しく並べて英文を完成させなさい。",
      words:["see","so","shops","can","I","many"], answer:"I can see so many shops" },
    { type:"wordorder", label:"(2)", pt:5, stem:"夜、その路面電車のことを伝える長いメールを友達に送る場面です（I sent の続き）。次の語を正しく並べて英文を完成させなさい。",
      words:["email","long","a"], answer:"a long email" } ]}
]},

/* ===== 大問4 話し合い＋感想　16点 ===== */
{ no:4, title:"ロス(Mr. Ross)先生の英語の授業で、Sota、Yua、Kai が、町をおとずれる人にやさしい町にする方法について話し合いをしています。次の英文は、話し合いと、それを聞いて Rio が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Ross:</span> Today, let\'s think about our town together. How can we make our town kind to visitors? Sota, please start.</span>'+
    '<span class="sp"><span class="who">Sota:</span> I want to put English signs at every tram stop. I want to show visitors how to find the right tram easily.</span>'+
    '<span class="sp"><span class="who">Mr. Ross:</span> That\'s a nice idea. Why do you choose the tram, Sota?</span>'+
    '<span class="sp"><span class="who">Sota:</span> Many people use it to go around the town. I want to teach visitors how to ride it without getting lost.</span>'+
    '<span class="sp"><span class="who">Mr. Ross:</span> Wonderful. Yua, how about you?</span>'+
    '<span class="sp"><span class="who">Yua:</span> I want to hold an English story time at the station library. I can read picture books to children from other countries.</span>'+
    '<span class="sp"><span class="who">Mr. Ross:</span> That sounds great. Do you often read at the library, Yua?</span>'+
    '<span class="sp"><span class="who">Yua:</span> Yes. Reading to children is the thing I like the most. I want to share fun stories with many people.</span>'+
    '<span class="sp"><span class="who">Mr. Ross:</span> That\'s a warm idea. Kai, what is your idea?</span>'+
    '<span class="sp"><span class="who">Kai:</span> I want to make a town map with pictures. I can show the way from the station to the library and the tram stops.</span>'+
    '<span class="sp"><span class="who">Mr. Ross:</span> Making a clear map is not （　あ　）, but it can help many visitors.</span>'+
    '<span class="sp"><span class="who">Kai:</span> I think so.</span>'+
    '<span class="sp"><span class="who">Mr. Ross:</span> OK, I\'m going to talk about myself. When I first came here, I got lost near the station. A kind woman showed me the way to the library, so I felt happy.</span>'+
    '<span class="sp"><span class="who">Kai:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Mr. Ross:</span> Good question. I came to this town three years ago to teach English. People here were always kind to me, so I decided to stay.</span>'+
    '<span class="sp"><span class="who">Kai:</span> And now you help us study English every day.</span>'+
    '<span class="sp"><span class="who">Mr. Ross:</span> Yes, and I love it. I hope you\'ll find a good way to help visitors.</span>',
    note:'語注：visitor 訪れる人／tram stop 路面電車の停留所／sign 標識／get lost 道に迷う／picture book 絵本' },
  { passage:'<b>Rio の感想</b><br>There are many ways to help visitors in our town. Like Yua, I want to do something at the station library. '+
            'I （　Y　）, too, so I want to read English picture books to children from other countries.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Sota の発言から抜き出して書きなさい。<br>"+E("Sota wants to teach visitors [　　] the tram without getting lost."),
      answers:["how to ride"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("bad"),E("easy"),E("difficult"),E("sad")], answer:1 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("How long is the tram line?"), E("Whose book is this?"),
                E("What brought you to this town?"), E("What time does the library open?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Sota wants to put English signs at every tram stop."),
                E("Yua doesn't like reading to children."),
                E("Kai wants to write a long story about the library."),
                E("Mr. Ross came to this town to study Japanese food.") ], answer:0 },
    { type:"mcq", label:"(5)Y", pt:3, stem:"（Y）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("often visit a museum"), E("like reading to children"),
                E("play soccer every day"), E("cannot speak English at all") ], answer:1 } ]}
]},

/* ===== 大問5 長文スピーチ（意見文）　33点 ===== */
{ no:5, title:"次の英文は、図書ボランティアのアオイ(Aoi)が発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Aoi. Today I want to talk about my experience as a volunteer at the station library. '+
    'When I was in my first year, I did not like talking with strangers. But now I really enjoy helping people. I want to share my story with you.<br><br>'+
    '<b>②</b> Last spring, I started to help at the station library. At first, the work was very hard for me. '+
    'Many visitors asked me which tram to take, and I could not answer well. I sometimes wanted to stop going there. '+
    'One day, an old librarian saw me. She said, "Don\'t run away. If you keep trying, you will help many people." '+
    'These words <u>(お) ___</u> my mind. I decided to try harder.<br><br>'+
    '<b>③</b> From that day, I worked very hard. A kind staff member also helped me a lot. '+
    'She taught me how to show visitors the way to the tram stop. She said, "You should not speak too fast. Speaking slowly makes people feel safe." '+
    'I followed her advice. Little by little, I could talk with visitors easily.<br><br>'+
    '<b>④</b> Some people say that helping at a library is only quiet work. That\'s true. <u>④ Helping at the library is a good way to make visitors more comfortable</u>. '+
    'But for me, it means much more than that. <u>③ ( me / this work / many things / taught )</u>. '+
    'I learned that I should not stop trying. When I keep helping people, I can <u>(か) ___</u> my dream. '+
    'So please never give up, and find something you love in your own town!',
    passageEn:true,
    note:'語注：run away にげる／give up あきらめる／stranger 知らない人／librarian 図書館員／staff member 係員／comfortable 心地よい／advice 助言',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お filled　か lose"), E("お filled　か reach"),
                E("お emptied　か lose"), E("お emptied　か reach") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "アオイは一生けんめい働いた。", "係員が停留所への案内の仕方を教えてくれた。",
                "係員は速く話すべきだと言った。", "アオイは少しずつ訪れる人と楽に話せるようになった。" ], answer:2 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["me","this work","many things","taught"], answer:"This work taught me many things",
      display:"This work taught me many things" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語2語を、第2段落中から抜き出して書きなさい。<br>"+E("The old librarian told Aoi not to （　え　）."),
      answers:["run away"], hint:"第2段落の語・英語2語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>図書館での手伝いは、訪れる人を（　①　）（　②　）するためのよい方法だ。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "より心地よく","より大きく","より静かに","より新しく" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "する（〜にする）","売る","こわす","かりる" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Aoi did not like talking with strangers in her first year."),
                E("Aoi never wanted to stop going to the library."),
                E("An old librarian told Aoi to keep trying."),
                E("The staff member said that Aoi should speak fast."),
                E("Aoi thinks helping at a library is only quiet work for her.") ], answer:[0,2] } ]}
]}

]};
