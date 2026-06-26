/* data/okayama10.js ─ 岡山県スタイル 模擬テスト⑩
   参照：factory/inputs/okayama_notes.md（岡山県公立入試の「傾向のみ」を参照）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。
   題材：防災・地域の助け合い・未来の町づくり（架空の町 Wakaba / Midori / Hikari）。
   ※過去問および okayama1〜9・chu3_* との内容重複なし。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "岡山県スタイル 模擬テスト⑩",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ（英文1回読み・2問） */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the map. The disaster-evacuation area in Wakaba Town is next to the river, in front of the hospital.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う地図（ワカバ町の避難場所）はどれですか。",
      choices:["避難場所は川のそば、病院の前にある。","避難場所は山のそば、学校の前にある。",
               "避難場所は川のそば、図書館のうしろにある。","避難場所は駅のそば、病院のうしろにある。"], answer:0 } ] },
  { script:'(2) Look at the chart. In Midori Town, the safety meeting starts at four forty in the afternoon, not at four fourteen.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う表（ミドリ町の防災ミーティングの開始時刻）はどれですか。",
      choices:["午後4時14分に始まる。","午後4時40分に始まる。",
               "午前4時40分に始まる。","午後5時14分に始まる。"], answer:1 } ] },

  /* 問題B：チャイムの応答（対話の最後への応答・2回読み・2問） */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> Will you join the town clean-up to help our neighbors this Saturday?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Sure. I'd be happy to help."), E("No, I didn't break the bridge."), E("It was a strong earthquake."), E("You should run to the hill.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> How can we make our town safer for old people?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I went to the festival last week."), E("We can put more clear signs on the streets."), E("Yes, the cake was delicious."), E("No, I can't swim very fast.") ], answer:1 } ] },

  /* 問題C：メモの空所補充（英語1語×3・2回読み） */
  { intro:"問題C　ハルト(Haruto)が、防災ボランティアのリーダーであるホワイト(Ms. White)さんに、町づくりについてインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, I\'m Ms. White. In our town, we always keep some <b>water</b> and food at the community center for an emergency.</span>'+
      '<span class="sp">When a disaster happens, the most important thing is to <b>help</b> each other as neighbors.</span>'+
      '<span class="sp">In the future, I want to build a safer <b>town</b> for everyone who lives here.</span>',
    passage:'<b>ハルトのメモ</b><br>Ms. White — keeps （　あ　） and food at the community center<br>'+
            '— the most important thing is to （　い　） each other<br>— wants to build a safer （　う　） in the future',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）水", answers:["water"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）助ける", answers:["help"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）町", answers:["town"], hint:"英語1語" } ] },

  /* 問題D：説明＋人物発言（内容一致選択＋英作文） */
  { intro:"問題D　あなたとクラスメイトのアオイ(Aoi)が、防災キャンプについての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next month, Hikari Town will have a one-day disaster camp. You can choose one group to join.</span>'+
      '<span class="sp">Group A will learn first aid. Group B will cook meals with little water. Group C will make a map of safe places.</span>'+
      '<span class="sp">The camp starts on Sunday morning. Please bring a hat and your own water bottle.</span>'+
      '<span class="sp"><span class="who">Aoi:</span> I really want to learn how to help injured people. Which group will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["防災キャンプは土曜日の夜に始まる。","参加者は安全な場所の地図を作ることができる。",
               "防災キャンプは1週間つづく。","参加者は救急の手当を学ぶことはできない。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"アオイの発言に対するあなたの答えを完成させなさい。<br>"+E("I really want to learn how to help injured people. So I will choose Group （　　）.")+"（英語1語）",
      answers:["A"], hint:"英語1語（Group A〜Cのどれか）" } ] }
]},

/* ===== 大問2 チラシ＋対話 ===== */
{ no:2, title:"中学生のソウタ(Sota)とリン(Rin)が、ワカバ町の「みんなで防災ウォーク」のちらしを見ながら話しています。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Wakaba Town Disaster Walk!</h4>'+
    '<div class="note">Let\'s walk and check the safe places in our town together!</div>'+
    '<table><tr><td>Date</td><td>September 26, 2026</td></tr>'+
    '<tr><td>Morning walk</td><td>9:00 a.m. – 10:30 a.m.</td></tr>'+
    '<tr><td>Afternoon walk</td><td>1:30 p.m. – 3:00 p.m.</td></tr>'+
    '<tr><td>People who can join</td><td>30 people for each walk</td></tr></table>'+
    '<div class="note">Guide … Mr. Aoki, a town volunteer. (He has helped our town for fifteen years.)<br>'+
    'Bring … good shoes, a cap, and some water.　→ You can join here.</div>',
    passage:
    '<span class="sp"><span class="who">Sota:</span> Look, Rin. Have you heard about this disaster walk?</span>'+
    '<span class="sp"><span class="who">Rin:</span> Yes. Mr. Aoki is the （　あ　） helpful volunteer in our town.</span>'+
    '<span class="sp"><span class="who">Sota:</span> Really? I want to join, but I\'m not （　い　） that I can walk for ninety minutes.</span>'+
    '<span class="sp"><span class="who">Rin:</span> You don\'t need to worry about that. We can rest if we get tired.</span>'+
    '<span class="sp"><span class="who">Sota:</span> Good. By the way, only thirty people can join each walk, right?</span>'+
    '<span class="sp"><span class="who">Rin:</span> Yes. So we should send our names today. I\'m （　い　） many people want to join.</span>'+
    '<span class="sp"><span class="who">Sota:</span> I think the river road near my house is the <u>(う) safe</u> way to the hill.</span>'+
    '<span class="sp"><span class="who">Rin:</span> That\'s good to know. Which walk will you join?</span>'+
    '<span class="sp"><span class="who">Sota:</span> I have soccer practice in the morning, so I will join the afternoon walk and learn the safe places.</span>',
    note:'語注：disaster 災害／volunteer ボランティア／rest 休む／worry about 〜 〜を気にする',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"（あ）に入れるのに最も適当な英語1語を書きなさい。", answers:["most"], hint:"the （　） helpful" },
    { type:"fill", label:"(2)い", pt:3, stem:"2か所の（い）に共通して入る最も適当な英語1語を書きなさい。", answers:["sure"], hint:"I'm not 〜 / I'm 〜" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) safe を、最も適当な形に変えて1語で書きなさい。", answers:["safest"], hint:"the 〜 way to the hill" },
    { type:"mcq", label:"(4)", pt:3, stem:"ちらしから、それぞれの防災ウォークに参加できる人数として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("13 people"), E("15 people"), E("30 people"), E("90 people") ], answer:2 },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Mr. Aoki has helped the town for fifteen years."),
                E("Sota will join the morning walk."),
                E("People don't need to bring any water."),
                E("Only ten people can join each walk.") ], answer:0 } ]}
]},

/* ===== 大問3 日記の英作文（並べかえ2問） ===== */
{ no:3, title:"ミドリ町に住むユイ(Yui)は、町の防災イベントに参加しました。次は、その日のユイの日記の一部と、できごとを表したイラストです。日記とイラストの内容に合うように、(1)(2)の語を正しく並べかえて、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：(1) 公民館でお年寄りと中学生が一緒に、防災用の地図を作っている。(2) 夜、ユイが家族に「私たちの町を助けたい」と話している。",
    passage:
    'May 18<br><br>'+
    'This morning, I went to the community center in Midori Town. Many people were there. '+
    'An old man said to me, "<u>(1)</u>." So I sat with him, and we drew the safe places together. '+
    'It was hard, but it was a lot of fun. In the evening, I told my family, "<u>(2)</u>." '+
    'They smiled and said, "That\'s a wonderful idea."',
    passageEn:true,
    note:'語注：community center 公民館／draw 〜をかく／safe place 安全な場所',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：お年寄りが「いっしょにこの地図を作りましょう」とユイにたのむ場面。次の語を正しく並べて英文を完成させなさい。",
      words:["make","Let's","map","this","together"], answer:"Let's make this map together" },
    { type:"wordorder", label:"(2)", pt:5, stem:"イラスト：夜、ユイが家族に「私たちの町を助けたい」と話す場面。次の語を正しく並べて英文を完成させなさい。",
      words:["help","want","I","our","to","town"], answer:"I want to help our town" } ]}
]},

/* ===== 大問4 話し合い＋感想 ===== */
{ no:4, title:"グリーン(Green)先生の英語の授業で、Kenta、Saki、Riku が、未来の町づくりについて話し合いをしています。次の英文は、話し合いと、それを聞いて Mio が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Green:</span> Today, let\'s talk about our town. What do you want to do for our future town? Kenta, tell us first.</span>'+
    '<span class="sp"><span class="who">Kenta:</span> I want to <u>plant many trees</u> in our town. Trees give us cool shade, and they make the town beautiful.</span>'+
    '<span class="sp"><span class="who">Mr. Green:</span> That\'s nice. Why do you think trees are important, Kenta?</span>'+
    '<span class="sp"><span class="who">Kenta:</span> Because trees can also stop the strong wind in a typhoon. So they keep us safer.</span>'+
    '<span class="sp"><span class="who">Mr. Green:</span> Wonderful. I hope our town will have a green park someday.</span>'+
    '<span class="sp"><span class="who">Saki:</span> I want to make a map of safe places for old people. Last year, my grandmother could not find the evacuation area quickly.</span>'+
    '<span class="sp"><span class="who">Mr. Green:</span> Oh, that\'s a great idea. Do you like helping people, Saki?</span>'+
    '<span class="sp"><span class="who">Saki:</span> Yes, helping people is the thing I like the most. I want everyone in my town to feel safe.</span>'+
    '<span class="sp"><span class="who">Mr. Green:</span> That\'s wonderful. Riku, how about you?</span>'+
    '<span class="sp"><span class="who">Riku:</span> I want to hold more events, so people can know their neighbors. When we know each other, we can help each other in a disaster.</span>'+
    '<span class="sp"><span class="who">Mr. Green:</span> Building a town where people help each other is not （　あ　）, but it\'s a wonderful goal.</span>'+
    '<span class="sp"><span class="who">Riku:</span> I think so, too.</span>'+
    '<span class="sp"><span class="who">Mr. Green:</span> OK, I\'m going to talk about myself. When I was young, a big storm hit my town. My neighbors helped my family a lot, so I decided to work for safe towns.</span>'+
    '<span class="sp"><span class="who">Riku:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Mr. Green:</span> Good question. I came to this town five years ago because I wanted to teach you about helping each other. The people here are kind, so I am very happy.</span>'+
    '<span class="sp"><span class="who">Riku:</span> And now you teach us English and about our town.</span>'+
    '<span class="sp"><span class="who">Mr. Green:</span> Yes, and I love it. I hope you\'ll make our town a better place.</span>',
    note:'語注：plant 〜を植える／shade 日かげ／evacuation area 避難場所／neighbor 近所の人／disaster 災害' },
  { passage:'<b>Mio の感想</b><br>There are many good ideas for our town. Like Saki, I want to help old people. '+
            'I （　X　）, too, so I want to make our town a safe place for everyone.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Kenta の発言から抜き出して書きなさい。<br>"+E("Kenta wants to [　　] in his town."),
      answers:["plant many trees"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("bad"),E("easy"),E("difficult"),E("sad")], answer:1 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("What did you teach before?"), E("Who helped your family then?"),
                E("What made you decide to come here?"), E("How long will you stay here?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Saki wants to make a map of safe places for old people."),
                E("Kenta thinks trees are not important for the town."),
                E("Mr. Green came to this town to study Japanese."),
                E("Riku doesn't want to know his neighbors.") ], answer:0 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("enjoy fishing on weekends"), E("want to travel around the world"),
                E("want to help people in my town"), E("want to study music abroad") ], answer:2 } ]}
]},

/* ===== 大問5 スピーチ（長文読解） ===== */
{ no:5, title:"次の英文は、防災クラブのハナ(Hana)が発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Hana from the disaster club. Today I want to talk about my experience in our town, Hikari. '+
    'Two years ago, I thought a disaster would never happen near my house. But now I think helping each other is the most important thing. '+
    'I want to share my story with you.<br><br>'+
    '<b>②</b> One night, a big typhoon hit Hikari Town. The wind was very strong, and the lights went off. '+
    'I was very afraid, and I didn\'t know what to do. Then I heard a knock on the door. '+
    'It was Mr. Tanaka, our old neighbor. He said, "Are you all right? Please come to the community center with us. It is safer there." '+
    'His kind words <u>(お) ___</u> me, and I was not afraid anymore.<br><br>'+
    '<b>③</b> At the community center, many people from our town were there. '+
    'Some adults were cooking warm soup. Some children were drawing pictures to cheer up everyone. '+
    'An old woman gave me a warm blanket. She said, "When we help each other, we are not alone." '+
    'I understood that our town was like a big family. I wanted to do something for other people, too.<br><br>'+
    '<b>④</b> Some people say that a disaster only takes good things from us. That may be true. '+
    '<u>④ A strong typhoon can break many houses in a town</u>. '+
    'But I learned something important that night. <u>③ ( me / the typhoon / a lot / taught )</u>. '+
    'When people help each other, our town can become stronger. '+
    'So please talk with your neighbors, and let\'s <u>(か) ___</u> a town where everyone feels safe!',
    passageEn:true,
    note:'語注：typhoon 台風／go off （明かりが）消える／neighbor 近所の人／blanket 毛布／cheer up 〜を元気づける',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お helped　か break"), E("お helped　か build"),
                E("お stopped　か break"), E("お stopped　か build") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "公民館には町の多くの人がいた。", "大人たちが温かいスープを作っていた。",
                "子どもたちはみんなを元気づけるために絵をかいていた。", "お年寄りの女性はハナに温かい飲み物を渡した。" ], answer:3 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["me","the typhoon","a lot","taught"], answer:"The typhoon taught me a lot",
      display:"The typhoon taught me a lot" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語2語を、第2段落中から抜き出して書きなさい。<br>"+E("On that night, the lights （　え　） because of the strong wind."),
      answers:["went off"], hint:"第2段落の語・英語2語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>強い（　①　）は、町の多くの（　②　）をこわすことがある。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "台風","地震","火事","大雪" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "家","車","橋","木" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Two years ago, Hana thought a disaster would never happen near her house."),
                E("During the typhoon, Hana knew well what to do."),
                E("Mr. Tanaka asked Hana to come to the community center."),
                E("At the community center, nobody helped Hana."),
                E("Hana thinks a disaster only takes good things from us.") ], answer:[0,2] } ]}
]}

]};
