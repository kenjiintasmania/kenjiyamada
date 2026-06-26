/* data/okayama8.js ─ 岡山県スタイル 模擬テスト⑧（中3）
   参照：factory/inputs/okayama_notes.md の「傾向のみ」（リスニング厚め／聞く→書く複合／
   図表読み取り／記述分散／中3文法が軸）。過去問の文・図・設問の再現は一切なし。
   本文・対話・設問・選択肢はすべて新規創作。題材は地域の清掃ボランティア・環境・リサイクル
   （川や海岸の清掃・ごみの分別・リサイクル工房）を、架空の町名（Wakaba/Midori/Hikari）で
   創作的に使用。okayama1（日本庭園の清掃ボランティア）とは別角度になるよう設計。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "岡山県スタイル 模擬テスト⑧",
sections: [

/* ===== 大問1 リスニング（問題A〜D）　24点 ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ（英文1回読み） */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the notice. The river cleanup will start at eight thirty next Sunday.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合うもの（清掃の開始時刻の表示）はどれですか。",
      choices:["川の清掃が次の日曜の8:13に始まる。","川の清掃が次の日曜の8:30に始まる。",
               "川の清掃が次の土曜の8:30に始まる。","海岸の清掃が次の日曜の8:30に始まる。"], answer:1 } ] },
  { script:'(2) Look at the picture. The boy is putting three plastic bottles into the blue box.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う絵（少年が分別している様子）はどれですか。",
      choices:["少年が青い箱にペットボトルを2本入れている。","少年が赤い箱にペットボトルを3本入れている。",
               "少年が青い箱にペットボトルを3本入れている。","少年が青い箱に空きかんを3本入れている。"], answer:2 } ] },

  /* 問題B：チャイムの応答（対話の最後への応答／2回読み） */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> Have you ever joined the beach cleanup in Hikari?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Yes, I have. I went there last summer."), E("No, I won't buy a new beach ball."),
                E("It is snowing on the beach now."), E("Sorry, I cannot swim well.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> How many bags of trash did you collect along the river?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I will go to the river by bike."), E("We collected about ten bags."),
                E("Yes, the river is very clean."), E("Let's swim in the river.") ], answer:1 } ] },

  /* 問題C：メモの空所補充（英語1語×3／2回読み） */
  { intro:"問題C　ダイチ(Daichi)が、ALTのカーター(Mr. Carter)先生に、ふるさとの環境活動についてインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, I\'m Mr. Carter from Canada. In my hometown, many people clean the <b>river</b> together every spring.</span>'+
      '<span class="sp">We pick up bottles and cans, and then we put them into different <b>boxes</b> to recycle them.</span>'+
      '<span class="sp">My favorite part is the end. After the work, everyone enjoys a warm cup of <b>tea</b> by the water.</span>',
    passage:'<b>ダイチのメモ</b><br>Mr. Carter — many people clean the （　あ　） every spring<br>'+
            '— they put bottles and cans into different （　い　）<br>— everyone enjoys a cup of （　う　） after the work',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）川", answers:["river"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）箱（複数）", answers:["boxes"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）お茶", answers:["tea"], hint:"英語1語" } ] },

  /* 問題D：説明を聞いて答える（内容一致＋英作文／2回読み） */
  { intro:"問題D　あなたとクラスメイトのサキ(Saki)が、清掃ボランティアの説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next Sunday we will have a cleanup volunteer day. You can choose one place to clean.</span>'+
      '<span class="sp">Group A will clean the river. Group B will clean the beach. Group C will help at the recycling center.</span>'+
      '<span class="sp">The work starts at nine. Please bring your own gloves and wear a cap because it may be hot.</span>'+
      '<span class="sp"><span class="who">Saki:</span> I really want to learn how things are recycled. Which group will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["清掃は午後に始まる。","参加者はリサイクルセンターを手伝うことができる。",
               "手ぶくろは持って行かなくてよい。","ぼうしはかぶらなくてよい。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"サキの発言に対するあなたの答えを完成させなさい。<br>"+E("I really want to learn how things are recycled. So I will choose the （　　）.")+"（英語2語）",
      answers:["recycling center"], hint:"英語2語" } ] }
]},

/* ===== 大問2 チラシ＋対話　16点 ===== */
{ no:2, title:"中学生のリク(Riku)とナナ(Nana)が、みどり市の「川の清掃ボランティア」のちらしを見ながら話しています。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Midori River Cleanup Day!</h4>'+
    '<div class="note">Let\'s make our river clean and beautiful together! Everyone is welcome.</div>'+
    '<table><tr><td>Date</td><td>May 17, 2026 (Sunday)</td></tr>'+
    '<tr><td>Time</td><td>8:30 a.m. – 11:00 a.m.</td></tr>'+
    '<tr><td>Place</td><td>Meet at the Green Bridge</td></tr>'+
    '<tr><td>Number of people</td><td>Only 60 people can join the cleanup.</td></tr></table>'+
    '<div class="note">Leader: Ms. Aoki (She has cleaned this river for fifteen years.)<br>'+
    'We will give free gloves and trash bags to everyone. After the work, you can enjoy free hot soup. → Please come to the Green Bridge first.</div>',
    passage:
    '<span class="sp"><span class="who">Riku:</span> Look, Nana. I think this is the （　あ　） important event in our town this spring.</span>'+
    '<span class="sp"><span class="who">Nana:</span> Yes. I want to join, but I\'m not （　い　） that I have my own gloves at home.</span>'+
    '<span class="sp"><span class="who">Riku:</span> Don\'t worry. Look at the flyer. They will give （　X　） gloves to everyone.</span>'+
    '<span class="sp"><span class="who">Nana:</span> Oh, really? Then I\'m （　い　） we can join together.</span>'+
    '<span class="sp"><span class="who">Riku:</span> But look, only sixty people can join. We should send our names early.</span>'+
    '<span class="sp"><span class="who">Nana:</span> You\'re right. By the way, the hot soup sounds nice. I think the soup at this event is the <u>(う) good</u> in our town.</span>'+
    '<span class="sp"><span class="who">Riku:</span> I agree. Let\'s meet at the Green Bridge at eight twenty on that day.</span>'+
    '<span class="sp"><span class="who">Nana:</span> OK. The event is three days from now. See you on Sunday!</span>',
    note:'語注：cleanup 清掃／glove 手ぶくろ／trash bag ごみ袋／bridge 橋',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"（あ）に入れるのに最も適当な英語1語を書きなさい。", answers:["most"], hint:"the （　） important" },
    { type:"fill", label:"(2)い", pt:3, stem:"2か所の（い）に共通して入る最も適当な英語1語を書きなさい。", answers:["sure"], hint:"I'm not 〜 / I'm 〜" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) good を、最も適当な形に変えて1語で書きなさい。", answers:["best"], hint:"the 〜 in our town" },
    { type:"fill", label:"(4)X", pt:3, stem:"会話の（X）に入る最も適当な英語1語を、ちらしを見て書きなさい。", answers:["free"], hint:"無料の（英語1語）" },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Ms. Aoki has cleaned the river for fifteen years."),
                E("More than seventy people can join the cleanup."),
                E("Riku and Nana will meet at the recycling center first."),
                E("The cleanup starts at nine in the morning.") ], answer:0 } ]}
]},

/* ===== 大問3 日記の英作文（並べかえ2問）　11点 ===== */
{ no:3, title:"カナダでホームステイしているユウ(Yu)は、ルーカス(Lucas)の家にホームステイしています。次は、ホームステイ中のユウの日記の一部と、その日のできごとを表したイラストです。日記とイラストの内容に合うように、(1)に4語以上、(2)に3語以上の英語を、語を並べかえて書き、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：ルーカスがガレージで、古いびんやかんから作った手作りの花びん(handmade vases)をたくさん見せている。ユウはおどろいた顔をしている。",
    passage:
    'April 12<br><br>'+
    'This afternoon, Lucas took me to his garage. He said, "Look at these!" '+
    'On the table, there were so many colorful vases. I was surprised and said, "Wow! '+
    '<u>(1)</u>!" Lucas smiled and said, "Yes. I made them from old bottles and cans." He gave me one as a present. '+
    'In the evening, I sent <u>(2)</u> to my friends in Japan. They wanted to make one, too.',
    passageEn:true,
    note:'語注：garage ガレージ／vase 花びん／bottle びん',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"たくさんの手作りの花びんを見ておどろく場面です。次の語を正しく並べて英文を完成させなさい。",
      words:["have","so","vases","you","many"], answer:"You have so many vases" },
    { type:"wordorder", label:"(2)", pt:5, stem:"夜、花びんの動画を友達に送る場面です（I sent の続き）。次の語を正しく並べて英文を完成させなさい。",
      words:["of","them","video","a"], answer:"a video of them" } ]}
]},

/* ===== 大問4 話し合い＋感想　16点 ===== */
{ no:4, title:"パーカー(Mr. Parker)先生の英語の授業で、Sota、Mio、Ken が、町のごみを減らす方法について話し合いをしています。次の英文は、話し合いと、それを聞いて Rin が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Parker:</span> Today, let\'s talk about our town. How can we reduce the trash in our town? Sota, please start.</span>'+
    '<span class="sp"><span class="who">Sota:</span> I want to make an English poster. I want to show people how to separate their trash.</span>'+
    '<span class="sp"><span class="who">Mr. Parker:</span> That\'s a nice idea. Why is separating trash important, Sota?</span>'+
    '<span class="sp"><span class="who">Sota:</span> When we separate bottles and cans, we can recycle them easily. I want to teach people how to sort their trash at home.</span>'+
    '<span class="sp"><span class="who">Mr. Parker:</span> Wonderful. Mio, how about you?</span>'+
    '<span class="sp"><span class="who">Mio:</span> I want to hold a recycling workshop. My aunt makes nice bags from old clothes, and they are really useful.</span>'+
    '<span class="sp"><span class="who">Mr. Parker:</span> That sounds great. Do you often make things with your aunt, Mio?</span>'+
    '<span class="sp"><span class="who">Mio:</span> Yes. Making new things from old ones is the thing I like the most. I want to share the idea with many people.</span>'+
    '<span class="sp"><span class="who">Mr. Parker:</span> That\'s a warm idea. Ken, what is your idea?</span>'+
    '<span class="sp"><span class="who">Ken:</span> I want to clean the river every month. Many fish live there, and clean water is important for them.</span>'+
    '<span class="sp"><span class="who">Mr. Parker:</span> Cleaning the river every month is not （　あ　）, but it can keep the water clean.</span>'+
    '<span class="sp"><span class="who">Ken:</span> I think so.</span>'+
    '<span class="sp"><span class="who">Mr. Parker:</span> OK, I\'m going to talk about myself. When I came to this town, I joined a beach cleanup. I picked up a lot of trash, so I learned to love this town.</span>'+
    '<span class="sp"><span class="who">Ken:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Mr. Parker:</span> Good question. I came here four years ago to teach English. The beach was beautiful and clean, so I decided to stay.</span>'+
    '<span class="sp"><span class="who">Ken:</span> And now you join the cleanup with us every month.</span>'+
    '<span class="sp"><span class="who">Mr. Parker:</span> Yes, and I love it. I hope you\'ll find a good way to help our town.</span>',
    note:'語注：reduce 減らす／separate / sort 分別する／workshop 工房・体験会／clothes 衣服' },
  { passage:'<b>Rin の感想</b><br>There are many good ways to help our town. Like Mio, I want to use old things again. '+
            'I （　Y　）, too, so I want to make useful things from old clothes.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Sota の発言から抜き出して書きなさい。<br>"+E("Sota wants to teach people [　　] their trash at home."),
      answers:["how to sort"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("bad"),E("easy"),E("difficult"),E("sad")], answer:1 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Where did you live before?"), E("Do you like teaching English?"),
                E("Why did you decide to stay?"), E("What time does the cleanup start?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Sota wants to make an English poster about trash."),
                E("Mio doesn't like making things with her aunt."),
                E("Ken wants to clean the river only once a year."),
                E("Mr. Parker came to this town to study Japanese food.") ], answer:0 },
    { type:"mcq", label:"(5)Y", pt:3, stem:"（Y）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("enjoy cleaning the river"), E("like reusing old things"),
                E("want to become a pilot"), E("don't like making things") ], answer:1 } ]}
]},

/* ===== 大問5 長文スピーチ（意見文）　33点 ===== */
{ no:5, title:"次の英文は、環境クラブのアヤ(Aya)が発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Aya from the environment club. Today I want to talk about my experience of cleaning the beach in Hikari. '+
    'When I was in my first year, I did not think much about the sea. But now I really care about it. I want to share my story with you.<br><br>'+
    '<b>②</b> Last summer, I joined the beach cleanup. At first, picking up trash was very hard for me. '+
    'There was a lot of plastic on the sand, and I got tired soon. I sometimes wanted to stop joining the work. '+
    'One day, a fisherman on the beach saw me. He said, "Don\'t feel down. If you keep working, you will save many sea animals." '+
    'These words <u>(お) ___</u> my heart. I decided to try harder.<br><br>'+
    '<b>③</b> After that, I worked very hard. A kind woman in the club also helped me a lot. '+
    'She taught me how to separate the trash. She said, "You should not mix bottles and cans. Sorting them carefully helps the recycling center." '+
    'I followed her advice. Little by little, I learned how recycling works.<br><br>'+
    '<b>④</b> Some people say that cleaning is only hard work. That\'s true. <u>④ Cleaning the beach is a good way to make the sea more beautiful</u>. '+
    'But it is more than that for me. <u>③ ( me / the cleanup / many things / taught )</u>. '+
    'I learned that I should not stop trying. When I keep working, I can <u>(か) ___</u> my goal. '+
    'So please keep trying, and find something you love in your town!',
    passageEn:true,
    note:'語注：feel down 落ちこむ／plastic プラスチック／fisherman 漁師／separate / sort 分別する／advice 助言',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お moved　か lose"), E("お moved　か reach"),
                E("お weakened　か lose"), E("お weakened　か reach") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "アヤは一生けんめい働いた。", "クラブの女性がごみの分別の仕方を教えてくれた。",
                "女性はびんとかんを混ぜるべきだと言った。", "アヤは少しずつリサイクルの仕組みを学んだ。" ], answer:2 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["me","the cleanup","many things","taught"], answer:"The cleanup taught me many things",
      display:"The cleanup taught me many things" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語2語を、第2段落中から抜き出して書きなさい。<br>"+E("The fisherman told Aya not to （　え　）."),
      answers:["feel down"], hint:"第2段落の語・英語2語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>海岸のそうじは、海を（　①　）（　②　）するためのよい方法だ。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "より美しく","より大きく","より静かに","より新しく" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "する（〜にする）","売る","こわす","かりる" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Aya did not think much about the sea in her first year."),
                E("Aya never wanted to stop joining the work."),
                E("A fisherman told Aya to keep working."),
                E("The woman in the club said that Aya should mix bottles and cans."),
                E("Aya thinks cleaning is only hard work for her.") ], answer:[0,2] } ]}
]}

]};
