/* data/c2u1.js ─ 中2 単元テスト①（初見・自動採点のみ）… テーマ：運動会／スポーツ大会／運動部。内容はすべて新規。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中2 単元テスト①",
sections: [

/* ===== 大問1 リスニングテスト ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[
  { intro:"(1) 絵の内容に合う英文を、ア〜ウから1つずつ選びなさい。英文は2回読まれます。", items:[
    { type:"mcq", label:"①", pt:2,
      stem:'<div class="scene">絵：男の子が校庭で走っている。時計は8時30分。</div>',
      choices:[ E("The boy is jumping in the gym. It's eight thirty."),
                E("The boy is running on the school ground. It's eight thirty."),
                E("The boy is running on the school ground. It's nine thirteen.") ], answer:1 },
    { type:"mcq", label:"②", pt:2,
      stem:'<div class="scene">絵：女の子が応援団でうちわを持って応援している。</div>',
      choices:[ E("She is cheering for her team."),
                E("She is washing her hands."),
                E("She is drawing a picture.") ], answer:0 },
    { type:"mcq", label:"③", pt:2,
      stem:'<div class="scene">絵：男の人が校庭で大玉転がしの練習をしている。時計は4時。</div>',
      choices:[ E("He is eating lunch on the ground at four."),
                E("He is practicing the ball-rolling race at four."),
                E("He is practicing the ball-rolling race at five.") ], answer:1 } ] },

  { script:
      '<span class="sp"><span class="who">Tom:</span> Hi, Aoi. What did you do last Saturday?</span>'+
      '<span class="sp"><span class="who">Aoi:</span> Hi, Tom. I practiced for the relay at the school ground. How about you?</span>'+
      '<span class="sp"><span class="who">Tom:</span> I cheered for the soccer club with my friends.</span>'+
      '<span class="sp"><span class="who">Aoi:</span> Sounds fun. Does your brother run in the relay, too?</span>'+
      '<span class="sp"><span class="who">Tom:</span> No, he doesn\'t. He likes the tug-of-war. He practices it every Sunday.</span>'+
      '<span class="sp"><span class="who">Aoi:</span> I see. Next week my friend Emma will come to my house, and we will make a flag together.</span>'+
      '<span class="sp"><span class="who">Tom:</span> That\'s nice. Where does Emma live?</span>'+
      '<span class="sp"><span class="who">Aoi:</span> She lives near the park. She is coming over this Sunday morning.</span>',
    intro:"(2) トムとアオイの対話を聞き、英語の質問の答えを選びなさい。対話と質問は1回読まれます。",
    items:[
    { type:"mcq", label:"①", pt:3, stem:E("What did Aoi do last Saturday?"),
      choices:[ E("She cheered for the soccer club."), E("She practiced for the relay."),
                E("She made a flag with Emma."), E("She played the tug-of-war.") ], answer:1 },
    { type:"mcq", label:"②", pt:3, stem:E("Does Tom's brother run in the relay?"),
      choices:[ E("No, he doesn't."), E("Yes, he does."), E("No, he isn't."), E("Yes, he is.") ], answer:0 },
    { type:"mcq", label:"③", pt:3, stem:E("Where will Aoi and Emma make a flag?"),
      choices:[ E("At Aoi's home."), E("At a park near the station."), E("At Emma's home."), E("At school.") ], answer:0 },
    { type:"mcq", label:"④", pt:3, stem:E("When will Emma visit Aoi?"),
      choices:[ E("On Sunday morning."), E("On Sunday evening."),
                E("On Saturday morning."), E("On Monday afternoon.") ], answer:0 } ] },

  { passage:
      '<b>転入生について（メモ）</b><br>名前：リク・グリーン<br>出身：ニュージーランド<br>'+
      '・毎日校庭を走る<br>・スポーツが好きで、週末によくサッカーをする<br>・トロフィー2つとメダル3つを持っている',
    script:
      '<span class="sp">We have a new student. His name is Riku Green. He is from New Zealand.</span>'+
      '<span class="sp">He runs on the school ground every day. He likes sports, and he often plays soccer on weekends.</span>'+
      '<span class="sp">He has two trophies and three medals at home.</span>',
    intro:"(3) リクについてのメモを見ながら放送を聞き、質問の答えを選びなさい。放送は2回読まれます。",
    items:[
    { type:"mcq", label:"①", pt:3, stem:E("Does Riku run on the school ground every day?"),
      choices:[ E("Yes, he does."), E("No, he doesn't."), E("Yes, he is."), E("No, he isn't.") ], answer:0 },
    { type:"mcq", label:"②", pt:3, stem:E("How many medals does Riku have?"),
      choices:[ E("One."), E("Two."), E("Three."), E("Four.") ], answer:2 } ] }
]},

/* ===== 大問2 読解（チラシ＋対話） ===== */
{ no:2, title:"次は、中学生のケンタとトム(Tom)の対話文です。チラシを参考にして読み、あとの問いに答えなさい。", groups:[
  { flyer:
    '<h4>★ みどり市 スポーツフェスティバル（Midori City Sports Festival）★</h4>'+
    '<table><tr><th>競技プログラム（毎日）</th><th></th></tr>'+
    '<tr><td>9:00〜9:50</td><td>100m走</td></tr>'+
    '<tr><td>10:00〜10:50</td><td>大玉転がし</td></tr>'+
    '<tr><td>13:00〜13:50</td><td>リレー</td></tr>'+
    '<tr><td>14:00〜14:50</td><td>つなひき</td></tr></table>'+
    '<div class="note">入場料　大人 400円／中・高校生 200円／小学生 100円</div>'+
    '<table style="margin-top:6px"><tr><th>体験教室（毎月第1日曜日・参加無料）</th><th></th></tr>'+
    '<tr><td>定員</td><td>20名</td></tr>'+
    '<tr><td>時間</td><td>11:00〜／15:00〜</td></tr>'+
    '<tr><td>4月</td><td>玉入れに挑戦</td></tr><tr><td>5月</td><td>パン食い競走に挑戦</td></tr>'+
    '<tr><td>6月</td><td>障害物競走に挑戦</td></tr><tr><td>7月</td><td>二人三脚に挑戦</td></tr></table>'+
    '<div class="note">・10分前に集合してください</div>',
    passage:
    '<span class="sp"><span class="who">Tom:</span> Kenta, have you seen this flyer?</span>'+
    '<span class="sp"><span class="who">Kenta:</span> Hi, Tom. Yes. It\'s a flyer from the Midori City Sports Festival. There we can enjoy many (　①　) and cheer for the players.</span>'+
    '<span class="sp"><span class="who">Tom:</span> The festival is popular. It also has a sports class on the (　②　) Sunday of every month. (　③　) students can join. I joined last month and tried the ball-toss game.</span>'+
    '<span class="sp"><span class="who">Kenta:</span> That sounds interesting. I want to visit next month. Can you go with me?</span>'+
    '<span class="sp"><span class="who">Tom:</span> Yes, but I can\'t go in the morning. I help my father then. I\'m free in the afternoon.</span>'+
    '<span class="sp"><span class="who">Kenta:</span> That\'s OK. I want to watch the relay race.</span>'+
    '<span class="sp"><span class="who">Tom:</span> Then let\'s meet at twelve fifty, so we can watch the race from one.</span>'+
    '<span class="sp"><span class="who">Kenta:</span> Good. Let\'s join the sports class after the relay.</span>'+
    '<span class="sp"><span class="who">Tom:</span> Sure. We can try the obstacle race that day. I can\'t wait!</span>',
    note:'語注：flyer チラシ／festival 大会／relay リレー／obstacle race 障害物競走',
    items:[
    { type:"fill", label:"(1)①", pt:3, stem:"①に入る最も適切な英語を1語で書きなさい。", answers:["sports","games","events"], hint:"1語・競技" },
    { type:"fill", label:"(1)②", pt:3, stem:"②に入る最も適切な英語を1語で書きなさい。", answers:["first"], hint:"1語・第1の" },
    { type:"fill", label:"(2)③", pt:3, stem:"チラシと対話に合うよう、③に入る適切な数字を書きなさい。", answers:["20","twenty"], hint:"数字" },
    { type:"mcq", label:"(3)", pt:4, stem:"ケンタとトムが大会で参加するイベントの組み合わせとして、最も適切なものを選びなさい。",
      choices:[ "11:00 体験教室　→　13:00 リレー",
                "13:00 リレー　→　15:00 体験教室",
                "9:00 100m走　→　11:00 体験教室",
                "13:00 リレー　→　14:00 つなひき" ], answer:1 } ]}
]},

/* ===== 大問3 対話文（語句補充・記述） ===== */
{ no:3, title:"次は、中学生のケン(Ken)とエマ(Emma)の対話文です。よく読んで、あとの問いに答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Ken:</span> Hi, Emma. I saw you at Midori Stadium last Sunday morning.</span>'+
    '<span class="sp"><span class="who">Emma:</span> Oh, Ken. Yes, I was there. My sister had a track meet that day.</span>'+
    '<span class="sp"><span class="who">Ken:</span> （　ⓐ　）</span>'+
    '<span class="sp"><span class="who">Emma:</span> No, I didn\'t. I cheered for my sister. She is a fast runner.</span>'+
    '<span class="sp"><span class="who">Ken:</span> I see. I often take pictures of sports events.</span>'+
    '<span class="sp"><span class="who">Emma:</span> <u>Me, too.</u> Look, these are my sister\'s pictures.</span>'+
    '<span class="sp"><span class="who">Ken:</span> They are nice. （　ⓑ　）</span>'+
    '<span class="sp"><span class="who">Emma:</span> I took them at the city stadium last month.</span>'+
    '<span class="sp"><span class="who">Ken:</span> Your family really likes sports. （　ⓒ　）</span>'+
    '<span class="sp"><span class="who">Emma:</span> Yes, he does. He has many old medals in his room. He often talks about our town\'s old relay team.</span>'+
    '<span class="sp"><span class="who">Ken:</span> I\'m interested in the history of the team. Can I see the medals?</span>'+
    '<span class="sp"><span class="who">Emma:</span> Sure. Come to my house next Sunday.</span>',
    items:[
    { type:"bankpick", label:"(1)ⓐ", pt:3, stem:"ⓐに入る最も適切な文を、次のア〜カから選びなさい。", answer:1,
      bank:[E("Did you walk your dog there?"),E("Did you run in the race?"),E("Where did you take these pictures?"),
            E("How do you get there?"),E("Is that your sister in the photos?"),E("Does your grandfather like sports, too?")] },
    { type:"bankpick", label:"(1)ⓑ", pt:3, stem:"ⓑに入る最も適切な文を、ア〜カから選びなさい。", answer:2,
      bank:[E("Did you walk your dog there?"),E("Did you run in the race?"),E("Where did you take these pictures?"),
            E("How do you get there?"),E("Is that your sister in the photos?"),E("Does your grandfather like sports, too?")] },
    { type:"bankpick", label:"(1)ⓒ", pt:3, stem:"ⓒに入る最も適切な文を、ア〜カから選びなさい。", answer:5,
      bank:[E("Did you walk your dog there?"),E("Did you run in the race?"),E("Where did you take these pictures?"),
            E("How do you get there?"),E("Is that your sister in the photos?"),E("Does your grandfather like sports, too?")] },
    { type:"mcq", label:"(2)", pt:4, stem:"下線部 <span class=\"en\">Me, too.</span> は、どのようなことに対するエマの発言ですか。最も適切なものを、ア〜エから選びなさい。",
      choices:[ "ケンが「スポーツの試合の写真をよくとる」と言ったこと。",
                "ケンが「姉は速い走者だ」と言ったこと。",
                "ケンが「ミドリ競技場にいた」と言ったこと。",
                "ケンが「スポーツが好きだ」と言ったこと。" ], answer:0 },
    { type:"fill", label:"(3)", pt:4, stem:"対話の内容について、次の質問に主語と動詞を含む英文1文で答えなさい。<br>"+E("What does Emma's grandfather have in his room?"),
      answers:["he has many old medals in his room","he has many old medals","he has old medals in his room"], hint:"He has 〜." } ]}
]},

/* ===== 大問4 英作文 ===== */
{ no:4, title:"次の問いに答えなさい。", groups:[
  { intro:"(1) 次は、ミカ(Mika)がレオ(Leo)に質問しているところです。レオの返事に合うように、下線部に適切な英語を書き、英文を完成させなさい。",
    items:[
    { type:"fill", label:"①", pt:4,
      stem:'<div class="scene">絵：レオが手作りの応援うちわ（cheering fan）を持っている。</div>'+
           '<span class="who" style="font-family:var(--en)">Mika:</span> '+E("（　①　）?")+'　'+
           '<span class="who" style="font-family:var(--en)">Leo:</span> '+E("It's mine. My brother made it."),
      answers:["whose cheering fan is this","whose fan is this","whose cheering fan is this one"], hint:"Whose で始める英文" } ] },
  { intro:"(2) 運動会に向けてあなたが練習することを表す英文です。次の語を正しく並べて英文を完成させなさい。",
    items:[
    { type:"wordorder", label:"", pt:6, stem:"次の語を正しく並べて英文を完成させなさい。",
      words:["the","I","relay","practice","every","day"], answer:"I practice the relay every day." } ] }
]},

/* ===== 大問5 長文読解 ===== */
{ no:5, title:"次の英文は、中学生のケンタ(Kenta)が書いたものです。(1)〜(4)に答えなさい。", groups:[
  { passage:
    'Last fall, our school had a sports day. （　ア　） One sunny morning, I went to the school ground early. '+
    'There I found a blue cap under a bench. （　イ　） I picked it up and took it to the teachers\' room. '+
    'Mr. Brown said, "Thank you. I will look for the owner." （　ウ　）<br><br>'+
    'A week later, on Sunday, October 9, a girl came to me. Her name was Aoi. '+
    'She said, "You found my cap. Thank you very much." She was happy, so we talked about the relay race.<br><br>'+
    'Aoi gave me a small badge. She said, "My brother, Riku, made this for you. '+
    'He is in the art club, and he makes badges as a hobby." <u>That</u> made me very glad. The badge had a little star on it.<br><br>'+
    'Aoi often runs with Riku in the park. Riku joins our sports day every year. '+
    'Next fall, I will run in the relay with Riku and Aoi.',
    passageEn:true,
    note:'語注：sports day 運動会／owner 持ち主／badge バッジ／art club 美術部／as a hobby しゅみで',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"次の英文を入れるのに最も適切な場所を、本文中の（ア）〜（ウ）から選びなさい。<br>"+E("Then I felt really glad."),
      choices:["（ア）","（イ）","（ウ）"], answer:2 },
    { type:"mcq", label:"(2)", pt:4, stem:"下線部 <span class=\"en\">That</span> が指す内容として最も適切なものを、ア〜エから選びなさい。",
      choices:[ "リク（アオイの兄）が、ケンタのためにバッジを手作りしてくれたこと。",
                "アオイが、ケンタのために青い帽子を買ってくれたこと。",
                "リクが運動会のリレーで一緒に走ってくれたこと。",
                "ケンタが校庭でアオイの帽子を見つけたこと。" ], answer:0 },
    { type:"mcq", label:"(3)①", pt:3, stem:E("When did Aoi come to Kenta?"),
      choices:[ E("On October 9."), E("On October 10."), E("Last fall."), E("Next fall.") ], answer:0 },
    { type:"mcq", label:"(3)②", pt:3, stem:E("What was the badge?"),
      choices:[ E("It was a present from Aoi to Riku."), E("It was a present for Riku's mother."),
                E("It was a present from Riku to Kenta."), E("It was a present from Riku's mother.") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"本文の内容に合うものを、ア〜エから1つ選びなさい。",
      choices:[ E("Kenta found a blue cap on the ground and took it to the teachers' room."),
                E("Kenta went to the school ground every Sunday."),
                E("Aoi made the badge for Kenta last Sunday."),
                E("Riku is in the soccer club and joins the sports day every year.") ], answer:0 } ]}
]},

/* ===== 大問6 並べかえ（X/Yコース選択） ===== */
{ no:6, title:"並べかえ", lead:"［　］内の語を正しく並べかえ、英文を完成させましょう。文の最初にくる語も小文字で示しています。",
  groups:[
    { items:[
      { type:"wordorder", label:"(1)", pt:3, stem:'A:［ '+E("run / where / you / will")+' ］ the relay this fall?　B: At the school ground.',
        words:["run","where","you","will"], answer:"Where will you run the relay this fall?",
        display:"Where will you run the relay this fall?" },
      { type:"wordorder", label:"(2)", pt:3, stem:'A:［ '+E("you / to / going / are")+' ］ join the sports day?　B: Yes, I am.',
        words:["you","to","going","are"], answer:"Are you going to join the sports day?",
        display:"Are you going to join the sports day?" },
      { type:"wordorder", label:"(3)", pt:3, stem:'A:［ '+E("are / you / if / free")+' ］ tomorrow, let\'s practice the relay.　B: Sounds good.',
        words:["are","you","if","free"], answer:"If you are free tomorrow, let's practice the relay.",
        display:"If you are free tomorrow, let's practice the relay." },
      { type:"wordorder", label:"(4)", pt:3, stem:'A:［ '+E("was / your / running / brother")+' ］ on the ground at five yesterday?　B: Yes, he was.',
        words:["was","your","running","brother"], answer:"Was your brother running on the ground at five yesterday?",
        display:"Was your brother running on the ground at five yesterday?" } ] }
  ] },

/* ===== 大問7 対話文（語句補充） ===== */
{ no:7, title:"次の対話文の（　①　）〜（　④　）に入る最も適切な英語を、それぞれ1語で書きなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Nao:</span> Hi, Mei. Do you come to this school ground a lot?</span>'+
    '<span class="sp"><span class="who">Mei:</span> Yes, Nao. Today I （　①　） here at nine, and I practiced the relay.</span>'+
    '<span class="sp"><span class="who">Nao:</span> Nice. I think （　②　） all the students in our class join the sports day.</span>'+
    '<span class="sp"><span class="who">Mei:</span> I agree. I usually run with my brother. How （　③　） times do you practice each week?</span>'+
    '<span class="sp"><span class="who">Nao:</span> About five. My sister runs more. She works here as a coach.</span>'+
    '<span class="sp"><span class="who">Mei:</span> Oh, does she work here?</span>'+
    '<span class="sp"><span class="who">Nao:</span> Yes. I hope to become a coach （　④　） my sister.</span>',
    items:[
    { type:"fill", label:"①", pt:2, stem:"①（過去形に）", answers:["came"], hint:"come の過去形" },
    { type:"fill", label:"②", pt:2, stem:"②（〜のほとんど）", answers:["almost"], hint:"almost 〜" },
    { type:"fill", label:"③", pt:2, stem:"③（数をたずねる）", answers:["many"], hint:"How 〜 times" },
    { type:"fill", label:"④", pt:2, stem:"④（〜のような）", answers:["like"], hint:"〜 my sister" } ]}
]}

]};
