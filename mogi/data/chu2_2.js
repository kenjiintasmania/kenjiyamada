/* data/chu2_2.js ─ 中2 第2回 模擬テスト
   構成・問題数・配点は chu2.js（第1回）と完全一致。
   テーマ：動物／動物園／秋。細部の内容はすべて新規オリジナル。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中2 第2回 模擬テスト",
sections: [

/* ===== 大問1 リスニングテスト ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[
  { intro:"(1) 絵の内容に合う英文を、ア〜ウから1つずつ選びなさい。英文は2回読まれます。", items:[
    { type:"mcq", label:"①", pt:2,
      stem:'<div class="scene">絵：女の子が木の下でリスにえさをあげている。時計は9時30分。</div>',
      choices:[ E("The girl is feeding a rabbit under the tree. It's nine thirty."),
                E("The girl is feeding a squirrel under the tree. It's nine thirty."),
                E("The girl is feeding a squirrel under the tree. It's ten thirty.") ], answer:1 },
    { type:"mcq", label:"②", pt:2,
      stem:'<div class="scene">絵：男の子が動物園でゾウの写真をとっている。</div>',
      choices:[ E("He is taking a picture of an elephant."),
                E("He is drawing a picture of an elephant."),
                E("He is taking a picture of a lion.") ], answer:0 },
    { type:"mcq", label:"③", pt:2,
      stem:'<div class="scene">絵：女の人が公園で落ち葉をはいている。時計は4時。</div>',
      choices:[ E("She is picking up the leaves in the park at four."),
                E("She is sweeping the leaves in the park at four."),
                E("She is sweeping the leaves in the garden at five.") ], answer:1 } ] },

  { script:
      '<span class="sp"><span class="who">Yuta:</span> Hi, Beth. What did you do last Saturday?</span>'+
      '<span class="sp"><span class="who">Beth:</span> Hi, Yuta. I went to the zoo with my family. We saw many animals there. How about you?</span>'+
      '<span class="sp"><span class="who">Yuta:</span> I went fishing in the river with my father. We caught three fish.</span>'+
      '<span class="sp"><span class="who">Beth:</span> Sounds nice. What animal did you like the best at the river?</span>'+
      '<span class="sp"><span class="who">Yuta:</span> Wait, you went to the zoo, not me. Which animal did you like the best?</span>'+
      '<span class="sp"><span class="who">Beth:</span> Oh, sorry! I liked the pandas the best. They were eating bamboo.</span>'+
      '<span class="sp"><span class="who">Yuta:</span> That\'s nice. Next Sunday my cousin Leo will come to my town, and we will go to the zoo together.</span>'+
      '<span class="sp"><span class="who">Beth:</span> Good. Does Leo like animals, too?</span>'+
      '<span class="sp"><span class="who">Yuta:</span> Yes, he loves birds. He is coming by train on Sunday morning.</span>',
    intro:"(2) ユウタとベスの対話を聞き、英語の質問の答えを選びなさい。対話と質問は1回読まれます。",
    items:[
    { type:"mcq", label:"①", pt:3, stem:E("What did Yuta do last Saturday?"),
      choices:[ E("He went to the zoo with his family."), E("He went fishing with his father."),
                E("He saw pandas at the zoo."), E("He went to the zoo with Leo.") ], answer:1 },
    { type:"mcq", label:"②", pt:3, stem:E("Which animal did Beth like the best?"),
      choices:[ E("The elephants."), E("The birds."), E("The pandas."), E("The fish.") ], answer:2 },
    { type:"mcq", label:"③", pt:3, stem:E("Where will Yuta and Leo go next Sunday?"),
      choices:[ E("To the river."), E("To the zoo."), E("To the station."), E("To Beth's house.") ], answer:1 },
    { type:"mcq", label:"④", pt:3, stem:E("When will Leo come to Yuta's town?"),
      choices:[ E("On Saturday morning."), E("On Sunday afternoon."),
                E("On Sunday morning."), E("On Monday evening.") ], answer:2 } ] },

  { passage:
      '<b>転入生について（メモ）</b><br>名前：トム・グリーン<br>出身：オーストラリア<br>'+
      '・毎朝犬と散歩する<br>・音楽が好きで、週末によくギターをひく<br>・ウサギ1匹とインコ3羽を飼っている',
    script:
      '<span class="sp">We have a new student. His name is Tom Green. He is from Australia.</span>'+
      '<span class="sp">He walks his dog every morning. He likes music, and he often plays the guitar on weekends.</span>'+
      '<span class="sp">He has one rabbit and three parakeets at home.</span>',
    intro:"(3) トムについてのメモを見ながら放送を聞き、質問の答えを選びなさい。放送は2回読まれます。",
    items:[
    { type:"mcq", label:"①", pt:3, stem:E("Does Tom walk his dog every morning?"),
      choices:[ E("Yes, he does."), E("No, he doesn't."), E("Yes, he is."), E("No, he isn't.") ], answer:0 },
    { type:"mcq", label:"②", pt:3, stem:E("How many parakeets does Tom have?"),
      choices:[ E("One."), E("Two."), E("Three."), E("Four.") ], answer:2 } ] }
]},

/* ===== 大問2 読解（チラシ＋対話） ===== */
{ no:2, title:"次は、中学生のハルカとサム(Sam)の対話文です。チラシを参考にして読み、あとの問いに答えなさい。", groups:[
  { flyer:
    '<h4>★ みどり動物園（Midori Zoo）秋のイベント ★</h4>'+
    '<table><tr><th>えさやり体験（毎日）</th><th></th></tr>'+
    '<tr><td>10:00〜10:30</td><td>ヤギ</td></tr>'+
    '<tr><td>11:00〜11:30</td><td>ペンギン</td></tr>'+
    '<tr><td>13:30〜14:00</td><td>ゾウ</td></tr>'+
    '<tr><td>15:00〜15:30</td><td>ペンギン</td></tr></table>'+
    '<div class="note">入園料　大人 600円／中・高校生 400円／小学生 200円</div>'+
    '<table style="margin-top:6px"><tr><th>工作教室（毎月第2土曜日・参加無料）</th><th></th></tr>'+
    '<tr><td>定員</td><td>（　③　）名</td></tr>'+
    '<tr><td>時間</td><td>13:00〜／15:00〜</td></tr>'+
    '<tr><td>9月</td><td>どんぐりの動物を作ろう</td></tr><tr><td>10月</td><td>落ち葉のカードを作ろう</td></tr>'+
    '<tr><td>11月</td><td>木の鳥を作ろう</td></tr><tr><td>12月</td><td>羊毛のマスコットを作ろう</td></tr></table>'+
    '<div class="note">・10分前に集合してください</div>',
    passage:
    '<span class="sp"><span class="who">Sam:</span> Haruka, have you seen this flyer?</span>'+
    '<span class="sp"><span class="who">Haruka:</span> Hi, Sam. Yes. It\'s a flyer from Midori Zoo. There we can feed the (　①　) and join a craft class.</span>'+
    '<span class="sp"><span class="who">Sam:</span> The feeding time is popular. The zoo also has a craft class on the (　②　) Saturday of every month. (　③　) students can join. I joined last month and made a leaf card.</span>'+
    '<span class="sp"><span class="who">Haruka:</span> That sounds fun. I want to visit next month. Can you go with me?</span>'+
    '<span class="sp"><span class="who">Sam:</span> Yes, but I can\'t go in the morning. I help my mother then. I\'m free in the afternoon.</span>'+
    '<span class="sp"><span class="who">Haruka:</span> That\'s OK. I want to join the elephant feeding.</span>'+
    '<span class="sp"><span class="who">Sam:</span> Then let\'s meet at one twenty, so we can start from one thirty.</span>'+
    '<span class="sp"><span class="who">Haruka:</span> Good. Let\'s join the craft class after the feeding.</span>'+
    '<span class="sp"><span class="who">Sam:</span> Sure. We can make wooden birds that day. I can\'t wait!</span>',
    note:'語注：flyer チラシ／feed えさをやる／craft class 工作教室／wooden 木の',
    items:[
    { type:"fill", label:"(1)①", pt:3, stem:"①に入る最も適切な英語を1語で書きなさい。", answers:["animals"], hint:"1語・動物" },
    { type:"fill", label:"(1)②", pt:3, stem:"②に入る最も適切な英語を1語で書きなさい。", answers:["second"], hint:"1語・第2の" },
    { type:"fill", label:"(2)③", pt:3, stem:"チラシと対話に合うよう、③に入る適切な数字を書きなさい。", answers:["20","twenty"], hint:"数字" },
    { type:"mcq", label:"(3)", pt:4, stem:"ハルカとサムが動物園で参加するイベントの組み合わせとして、最も適切なものを選びなさい。",
      choices:[ "13:00 工作教室　→　13:30 えさやり（ゾウ）",
                "13:30 えさやり（ゾウ）　→　15:00 工作教室",
                "10:00 えさやり（ヤギ）　→　13:00 工作教室",
                "13:30 えさやり（ゾウ）　→　15:00 えさやり（ペンギン）" ], answer:1 } ]}
]},

/* ===== 大問3 対話文（語句補充・記述） ===== */
{ no:3, title:"次は、中学生のリク(Riku)とケイト(Kate)の対話文です。よく読んで、あとの問いに答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Riku:</span> Hi, Kate. I saw you at Midori Zoo last Saturday afternoon.</span>'+
    '<span class="sp"><span class="who">Kate:</span> Oh, Riku. Yes, I was there. My class had a school trip that day.</span>'+
    '<span class="sp"><span class="who">Riku:</span> （　ⓐ　）</span>'+
    '<span class="sp"><span class="who">Kate:</span> No, I didn\'t. The class was full that day, so I watched the elephants with my friends instead.</span>'+
    '<span class="sp"><span class="who">Riku:</span> I see. I often draw pictures of animals.</span>'+
    '<span class="sp"><span class="who">Kate:</span> <u>Me, too.</u> Look, these are my animal pictures.</span>'+
    '<span class="sp"><span class="who">Riku:</span> They are nice. （　ⓑ　）</span>'+
    '<span class="sp"><span class="who">Kate:</span> I drew them at the zoo last month.</span>'+
    '<span class="sp"><span class="who">Riku:</span> Your family really likes animals. （　ⓒ　）</span>'+
    '<span class="sp"><span class="who">Kate:</span> Yes, she does. She has many animal books in her room. She often talks about birds in autumn.</span>'+
    '<span class="sp"><span class="who">Riku:</span> I\'m interested in autumn birds. Can I see the books?</span>'+
    '<span class="sp"><span class="who">Kate:</span> Sure. Come to my house next Sunday.</span>',
    items:[
    { type:"bankpick", label:"(1)ⓐ", pt:3, stem:"ⓐに入る最も適切な文を、次のア〜カから選びなさい。", answer:1,
      bank:[E("Did you feed the goats there?"),E("Did you join the craft class?"),E("Where did you draw these pictures?"),
            E("How do you get there?"),E("Is that an elephant in the pictures?"),E("Does your mother like animals, too?")] },
    { type:"bankpick", label:"(1)ⓑ", pt:3, stem:"ⓑに入る最も適切な文を、ア〜カから選びなさい。", answer:2,
      bank:[E("Did you feed the goats there?"),E("Did you join the craft class?"),E("Where did you draw these pictures?"),
            E("How do you get there?"),E("Is that an elephant in the pictures?"),E("Does your mother like animals, too?")] },
    { type:"bankpick", label:"(1)ⓒ", pt:3, stem:"ⓒに入る最も適切な文を、ア〜カから選びなさい。", answer:5,
      bank:[E("Did you feed the goats there?"),E("Did you join the craft class?"),E("Where did you draw these pictures?"),
            E("How do you get there?"),E("Is that an elephant in the pictures?"),E("Does your mother like animals, too?")] },
    { type:"mcq", label:"(2)", pt:4, stem:"下線部 <span class=\"en\">Me, too.</span> は、どのようなことに対するケイトの発言ですか。最も適切なものを、ア〜エから選びなさい。",
      choices:[ "リクが「動物の絵をよくかく」と言ったこと。",
                "リクが「ゾウは本当に大きい」と言ったこと。",
                "リクが「ミドリ動物園にいた」と言ったこと。",
                "リクが「動物が好きだ」と言ったこと。" ], answer:0 },
    { type:"fill", label:"(3)", pt:4, stem:"対話の内容について、次の質問に主語と動詞を含む英文1文で答えなさい。<br>"+E("What does Kate's mother have in her room?"),
      answers:["she has many animal books in her room","she has many animal books","she has animal books in her room"], hint:"She has 〜." } ]}
]},

/* ===== 大問4 英作文 ===== */
{ no:4, title:"次の問いに答えなさい。", groups:[
  { intro:"(1) 次は、アヤ(Aya)がベン(Ben)に質問しているところです。ベンの返事に合うように、下線部に適切な英語を書き、英文を完成させなさい。",
    items:[
    { type:"fill", label:"①", pt:4,
      stem:'<div class="scene">絵：ベンが手作りの鳥のおきもの（bird）を持っている。</div>'+
           '<span class="who" style="font-family:var(--en)">Aya:</span> '+E("（　①　）?")+'　'+
           '<span class="who" style="font-family:var(--en)">Ben:</span> '+E("It's mine. My brother made it."),
      answers:["whose bird is this","whose bird is this one","whose wooden bird is this"], hint:"Whose で始める英文" } ] },
  { intro:"(2) 次の語を正しく並べて英文を完成させなさい。",
    items:[
    { type:"wordorder", label:"", pt:6, stem:"次の語を正しく並べて英文を完成させなさい。",
      words:["six","get","I","at","up"], answer:"I get up at six." } ] }
]},

/* ===== 大問5 長文読解 ===== */
{ no:5, title:"次の英文は、中学生のソウタ(Sota)が書いたものです。(1)〜(4)に答えなさい。", groups:[
  { passage:
    'Last autumn, I visited my aunt\'s house in Midori Town. （　ア　） One afternoon, I walked to a small river near her house. '+
    'There I found a little brown dog under a bridge. （　イ　） The dog looked sad and cold, so I took it to the police station. '+
    'A kind police officer said, "Thank you. I will look for the owner." （　ウ　）<br><br>'+
    'A week later, on Sunday, October 12, I got a phone call. It was from a man named Mr. Sato. '+
    'He said, "You found my dog, Choco. Thank you very much." He wanted to meet me, so we met at the river the next day.<br><br>'+
    'Mr. Sato gave me a small bag. He said, "My daughter, Emi, made this for you. '+
    'She lives in Canada, and she makes bags as a hobby." <u>That</u> made me very happy. The bag had a little dog on it.<br><br>'+
    'Mr. Sato often talks with Emi on the Internet. Emi visits Japan every summer. '+
    'Next summer, I will meet Emi and say thank you to her.',
    passageEn:true,
    note:'語注：owner 持ち主／daughter むすめ／bridge 橋／as a hobby しゅみで',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"次の英文を入れるのに最も適切な場所を、本文中の（ア）〜（ウ）から選びなさい。<br>"+E("Then I felt really happy."),
      choices:["（ア）","（イ）","（ウ）"], answer:2 },
    { type:"mcq", label:"(2)", pt:4, stem:"下線部 <span class=\"en\">That</span> が指す内容として最も適切なものを、ア〜エから選びなさい。",
      choices:[ "エミ（サトウさんのむすめ）が、ソウタのためにかばんを手作りしてくれたこと。",
                "サトウさんが、ソウタのために茶色い犬をくれたこと。",
                "エミがカナダからソウタに会いに来てくれたこと。",
                "ソウタが橋の下でサトウさんの犬を見つけたこと。" ], answer:0 },
    { type:"mcq", label:"(3)①", pt:3, stem:E("When did Sota get a phone call from Mr. Sato?"),
      choices:[ E("On October 12."), E("On October 13."), E("Last autumn."), E("Next summer.") ], answer:0 },
    { type:"mcq", label:"(3)②", pt:3, stem:E("What was the bag?"),
      choices:[ E("It was a present from Mr. Sato to Emi."), E("It was a present for Emi's mother."),
                E("It was a present from Emi to Sota."), E("It was a present from Emi's mother.") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"本文の内容に合うものを、ア〜エから1つ選びなさい。",
      choices:[ E("Sota found a little dog by a river and took it to the police station."),
                E("Sota visited his aunt's house every summer."),
                E("Mr. Sato made the bag for Sota last Sunday."),
                E("Emi lives in Japan and visits Canada every summer.") ], answer:0 } ]}
]},

/* ===== 大問6 並べかえ（X/Yコース選択） ===== */
{ no:6, title:"並べかえ（X・Yコースのどちらかを選んで答えなさい）", lead:"［　］内の語を正しく並べかえ、英文を完成させましょう。文の最初にくる語も小文字で示しています。",
  courses:[
    { name:"Xコース", items:[
      { type:"wordorder", label:"(1)", pt:3, stem:'A:［ '+E("feed / where / you / will")+' ］ the goats tomorrow?　B: At the zoo.',
        words:["feed","where","you","will"], answer:"Where will you feed the goats tomorrow?",
        display:"Where will you feed the goats tomorrow?" },
      { type:"wordorder", label:"(2)", pt:3, stem:'A:［ '+E("you / to / going / are")+' ］ visit the zoo next Sunday?　B: Yes, I am.',
        words:["you","to","going","are"], answer:"Are you going to visit the zoo next Sunday?",
        display:"Are you going to visit the zoo next Sunday?" },
      { type:"wordorder", label:"(3)", pt:3, stem:'A:［ '+E("are / you / if / free")+' ］ this weekend, let\'s go to the park.　B: Sounds good.',
        words:["are","you","if","free"], answer:"If you are free this weekend, let's go to the park.",
        display:"If you are free this weekend, let's go to the park." },
      { type:"wordorder", label:"(4)", pt:3, stem:'A:［ '+E("was / your / feeding / brother")+' ］ the rabbits at three yesterday?　B: Yes, he was.',
        words:["was","your","feeding","brother"], answer:"Was your brother feeding the rabbits at three yesterday?",
        display:"Was your brother feeding the rabbits at three yesterday?" } ] },
    { name:"Yコース", items:[
      { type:"wordorder", label:"(1)", pt:3, stem:'A:［ '+E("you / birds / were / watching")+' ］ at four last evening?　B: Yes, I was.',
        words:["you","birds","were","watching"], answer:"Were you watching birds at four last evening?",
        display:"Were you watching birds at four last evening?" },
      { type:"wordorder", label:"(2)", pt:3, stem:'A: I stayed home ［ '+E("because / it / was / very")+' ］ rainy this morning.　B: I see.',
        words:["because","it","was","very"], answer:"I stayed home because it was very rainy this morning.",
        display:"I stayed home because it was very rainy this morning." },
      { type:"wordorder", label:"(3)", pt:3, stem:'A: I went to ［ '+E("to / the / see / zoo")+' ］ the pandas last week.　B: That\'s nice.',
        words:["to","the","see","zoo"], answer:"I went to the zoo to see the pandas last week.",
        display:"I went to the zoo to see the pandas last week." },
      { type:"wordorder", label:"(4)", pt:3, stem:'A:［ '+E("are / you / if / free")+' ］ tomorrow, come to the zoo with me.　B: OK.',
        words:["are","you","if","free"], answer:"If you are free tomorrow, come to the zoo with me.",
        display:"If you are free tomorrow, come to the zoo with me." } ] }
  ] },

/* ===== 大問7 対話文（語句補充） ===== */
{ no:7, title:"次の対話文の（　①　）〜（　④　）に入る最も適切な英語を、それぞれ1語で書きなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Aoi:</span> Hi, Liz. Do you come to this zoo a lot?</span>'+
    '<span class="sp"><span class="who">Liz:</span> Yes, Aoi. Today I （　①　） here at nine, and I watched the penguins.</span>'+
    '<span class="sp"><span class="who">Aoi:</span> Nice. I think （　②　） all the children here love this zoo.</span>'+
    '<span class="sp"><span class="who">Liz:</span> I agree. I usually come with my sister. How （　③　） times do you visit each month?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> About four. My brother comes more. He works here as a zookeeper.</span>'+
    '<span class="sp"><span class="who">Liz:</span> Oh, does he work here?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> Yes. I hope to become a zookeeper （　④　） my brother.</span>',
    items:[
    { type:"fill", label:"①", pt:2, stem:"①（過去形に）", answers:["came"], hint:"come の過去形" },
    { type:"fill", label:"②", pt:2, stem:"②（〜のほとんど）", answers:["almost"], hint:"almost 〜" },
    { type:"fill", label:"③", pt:2, stem:"③（数をたずねる）", answers:["many"], hint:"How 〜 times" },
    { type:"fill", label:"④", pt:2, stem:"④（〜のような）", answers:["like"], hint:"〜 my brother" } ]}
]}

]};
