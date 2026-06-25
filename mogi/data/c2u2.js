/* data/c2u2.js ─ 中2 単元テスト②（初見・自動採点のみ）
   構成・問題数・配点は data/chu2_2.js（中2 第2回 模擬テスト）と完全一致。
   テーマ：旅行／道案内／町しょうかい。内容はすべて新規。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中2 単元テスト②",
sections: [

/* ===== 大問1 リスニングテスト ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[
  { intro:"(1) 絵の内容に合う英文を、ア〜ウから1つずつ選びなさい。英文は2回読まれます。", items:[
    { type:"mcq", label:"①", pt:2,
      stem:'<div class="scene">絵：男の子が駅前で地図を見ている。時計は8時15分。</div>',
      choices:[ E("The boy is reading a book in front of the station. It's eight fifteen."),
                E("The boy is looking at a map in front of the station. It's eight fifteen."),
                E("The boy is looking at a map in front of the station. It's nine fifteen.") ], answer:1 },
    { type:"mcq", label:"②", pt:2,
      stem:'<div class="scene">絵：女の子が観光案内所で外国人に道を教えている。</div>',
      choices:[ E("She is showing the way to a tourist."),
                E("She is asking the way to a tourist."),
                E("She is taking a picture of a tourist.") ], answer:0 },
    { type:"mcq", label:"③", pt:2,
      stem:'<div class="scene">絵：男の人が橋をわたっている。時計は5時。</div>',
      choices:[ E("He is walking along the river at five."),
                E("He is crossing the bridge at five."),
                E("He is crossing the bridge at six.") ], answer:1 } ] },

  { script:
      '<span class="sp"><span class="who">Mika:</span> Hi, Tom. What did you do during the holiday?</span>'+
      '<span class="sp"><span class="who">Tom:</span> Hi, Mika. I went to Kyoto with my family. We visited many old temples. How about you?</span>'+
      '<span class="sp"><span class="who">Mika:</span> I went to the beach in Okinawa with my sister. We swam in the sea.</span>'+
      '<span class="sp"><span class="who">Tom:</span> Sounds nice. What temple did you like the best in Okinawa?</span>'+
      '<span class="sp"><span class="who">Mika:</span> Wait, you went to Kyoto, not me. Which place did you like the best?</span>'+
      '<span class="sp"><span class="who">Tom:</span> Oh, sorry! I liked the old castle the best. It had a beautiful garden.</span>'+
      '<span class="sp"><span class="who">Mika:</span> That\'s nice. Next month my friend Jack will come to my town, and we will visit the museum together.</span>'+
      '<span class="sp"><span class="who">Tom:</span> Good. Does Jack like history, too?</span>'+
      '<span class="sp"><span class="who">Mika:</span> Yes, he loves it. He is coming by bus next Sunday afternoon.</span>',
    intro:"(2) ミカとトムの対話を聞き、英語の質問の答えを選びなさい。対話と質問は1回読まれます。",
    items:[
    { type:"mcq", label:"①", pt:3, stem:E("What did Tom do during the holiday?"),
      choices:[ E("He went to the beach with his sister."), E("He went to Kyoto with his family."),
                E("He swam in the sea in Okinawa."), E("He visited the museum with Jack.") ], answer:1 },
    { type:"mcq", label:"②", pt:3, stem:E("Which place did Tom like the best?"),
      choices:[ E("The temples."), E("The beach."), E("The old castle."), E("The museum.") ], answer:2 },
    { type:"mcq", label:"③", pt:3, stem:E("Where will Mika and Jack go next month?"),
      choices:[ E("To the beach."), E("To the museum."), E("To Kyoto."), E("To Tom's house.") ], answer:1 },
    { type:"mcq", label:"④", pt:3, stem:E("When will Jack come to Mika's town?"),
      choices:[ E("Next Sunday morning."), E("Next Saturday afternoon."),
                E("Next Sunday afternoon."), E("Next Monday evening.") ], answer:2 } ] },

  { passage:
      '<b>転入生について（メモ）</b><br>名前：エマ・ヒル<br>出身：カナダ<br>'+
      '・毎週末に自転車で町をまわる<br>・写真が好きで、よく古い建物の写真をとる<br>・日本の城を2つとお寺を3つおとずれた',
    script:
      '<span class="sp">We have a new student. Her name is Emma Hill. She is from Canada.</span>'+
      '<span class="sp">She rides her bike around the town every weekend. She likes taking pictures, and she often takes pictures of old buildings.</span>'+
      '<span class="sp">She has visited two castles and three temples in Japan.</span>',
    intro:"(3) エマについてのメモを見ながら放送を聞き、質問の答えを選びなさい。放送は2回読まれます。",
    items:[
    { type:"mcq", label:"①", pt:3, stem:E("Does Emma ride her bike around the town every weekend?"),
      choices:[ E("Yes, she does."), E("No, she doesn't."), E("Yes, she is."), E("No, she isn't.") ], answer:0 },
    { type:"mcq", label:"②", pt:3, stem:E("How many temples has Emma visited in Japan?"),
      choices:[ E("One."), E("Two."), E("Three."), E("Four.") ], answer:2 } ] }
]},

/* ===== 大問2 読解（チラシ＋対話） ===== */
{ no:2, title:"次は、中学生のアオイとトム(Tom)の対話文です。チラシを参考にして読み、あとの問いに答えなさい。", groups:[
  { flyer:
    '<h4>★ ひかり町 観光ガイドツアー（Hikari Town Walking Tour）★</h4>'+
    '<table><tr><th>ガイドツアー（毎日）</th><th></th></tr>'+
    '<tr><td>9:00〜9:40</td><td>古い城</td></tr>'+
    '<tr><td>10:30〜11:10</td><td>川ぞいの道</td></tr>'+
    '<tr><td>13:30〜14:10</td><td>古い神社</td></tr>'+
    '<tr><td>15:00〜15:40</td><td>川ぞいの道</td></tr></table>'+
    '<div class="note">参加料　大人 500円／中・高校生 300円／小学生 100円</div>'+
    '<table style="margin-top:6px"><tr><th>町しょうかい教室（毎月第2土曜日・参加無料）</th><th></th></tr>'+
    '<tr><td>定員</td><td>15名</td></tr>'+
    '<tr><td>時間</td><td>13:00〜／15:00〜</td></tr>'+
    '<tr><td>9月</td><td>町の地図を作ろう</td></tr><tr><td>10月</td><td>道案内カードを作ろう</td></tr>'+
    '<tr><td>11月</td><td>名所ポスターを作ろう</td></tr><tr><td>12月</td><td>町のしおりを作ろう</td></tr></table>'+
    '<div class="note">・10分前に集合してください</div>',
    passage:
    '<span class="sp"><span class="who">Tom:</span> Aoi, have you seen this flyer?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> Hi, Tom. Yes. It\'s a flyer from Hikari Town. There we can join a walking (　①　) and make town guides.</span>'+
    '<span class="sp"><span class="who">Tom:</span> The walking tour is popular. The town also has a guide class on the (　②　) Saturday of every month. (　③　) students can join. I joined last month and made a town map.</span>'+
    '<span class="sp"><span class="who">Aoi:</span> That sounds fun. I want to visit next month. Can you go with me?</span>'+
    '<span class="sp"><span class="who">Tom:</span> Yes, but I can\'t go in the morning. I help my mother then. I\'m free in the afternoon.</span>'+
    '<span class="sp"><span class="who">Aoi:</span> That\'s OK. I want to join the old shrine tour.</span>'+
    '<span class="sp"><span class="who">Tom:</span> Then let\'s meet at one twenty, so we can start from one thirty.</span>'+
    '<span class="sp"><span class="who">Aoi:</span> Good. Let\'s join the guide class after the tour.</span>'+
    '<span class="sp"><span class="who">Tom:</span> Sure. We can make name-spot posters that day. I can\'t wait!</span>',
    note:'語注：flyer チラシ／walking tour 観光ツアー／guide class 町しょうかい教室／name-spot poster 名所ポスター',
    items:[
    { type:"fill", label:"(1)①", pt:3, stem:"①に入る最も適切な英語を1語で書きなさい。", answers:["tour"], hint:"1語・ツアー" },
    { type:"fill", label:"(1)②", pt:3, stem:"②に入る最も適切な英語を1語で書きなさい。", answers:["second"], hint:"1語・第2の" },
    { type:"fill", label:"(2)③", pt:3, stem:"チラシと対話に合うよう、③に入る適切な数字を書きなさい。", answers:["15","fifteen"], hint:"数字" },
    { type:"mcq", label:"(3)", pt:4, stem:"アオイとトムが町で参加するイベントの組み合わせとして、最も適切なものを選びなさい。",
      choices:[ "13:00 町しょうかい教室　→　13:30 ガイドツアー（古い神社）",
                "13:30 ガイドツアー（古い神社）　→　15:00 町しょうかい教室",
                "9:00 ガイドツアー（古い城）　→　13:00 町しょうかい教室",
                "13:30 ガイドツアー（古い神社）　→　15:00 ガイドツアー（川ぞいの道）" ], answer:1 } ]}
]},

/* ===== 大問3 対話文（語句補充・記述） ===== */
{ no:3, title:"次は、中学生のリク(Riku)とエマ(Emma)の対話文です。よく読んで、あとの問いに答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Riku:</span> Hi, Emma. I saw you near the old castle last Saturday afternoon.</span>'+
    '<span class="sp"><span class="who">Emma:</span> Oh, Riku. Yes, I was there. My class had a town trip that day.</span>'+
    '<span class="sp"><span class="who">Riku:</span> （　ⓐ　）</span>'+
    '<span class="sp"><span class="who">Emma:</span> No, I didn\'t. I walked around the castle with my friends. The garden was really beautiful.</span>'+
    '<span class="sp"><span class="who">Riku:</span> I see. I often take pictures of old places.</span>'+
    '<span class="sp"><span class="who">Emma:</span> <u>Me, too.</u> Look, these are my town pictures.</span>'+
    '<span class="sp"><span class="who">Riku:</span> They are nice. （　ⓑ　）</span>'+
    '<span class="sp"><span class="who">Emma:</span> I took them near the river last month.</span>'+
    '<span class="sp"><span class="who">Riku:</span> Your family really likes traveling. （　ⓒ　）</span>'+
    '<span class="sp"><span class="who">Emma:</span> Yes, she does. She has many travel books in her room. She often talks about old towns.</span>'+
    '<span class="sp"><span class="who">Riku:</span> I\'m interested in old towns. Can I see the books?</span>'+
    '<span class="sp"><span class="who">Emma:</span> Sure. Come to my house next Sunday.</span>',
    items:[
    { type:"bankpick", label:"(1)ⓐ", pt:3, stem:"ⓐに入る最も適切な文を、次のア〜カから選びなさい。", answer:1,
      bank:[E("Did you take the bus there?"),E("Did you join the walking tour?"),E("Where did you take these pictures?"),
            E("How do you get there?"),E("Is that the old shrine in the pictures?"),E("Does your mother like traveling, too?")] },
    { type:"bankpick", label:"(1)ⓑ", pt:3, stem:"ⓑに入る最も適切な文を、ア〜カから選びなさい。", answer:2,
      bank:[E("Did you take the bus there?"),E("Did you join the walking tour?"),E("Where did you take these pictures?"),
            E("How do you get there?"),E("Is that the old shrine in the pictures?"),E("Does your mother like traveling, too?")] },
    { type:"bankpick", label:"(1)ⓒ", pt:3, stem:"ⓒに入る最も適切な文を、ア〜カから選びなさい。", answer:5,
      bank:[E("Did you take the bus there?"),E("Did you join the walking tour?"),E("Where did you take these pictures?"),
            E("How do you get there?"),E("Is that the old shrine in the pictures?"),E("Does your mother like traveling, too?")] },
    { type:"mcq", label:"(2)", pt:4, stem:"下線部 <span class=\"en\">Me, too.</span> は、どのようなことに対するエマの発言ですか。最も適切なものを、ア〜エから選びなさい。",
      choices:[ "リクが「古い場所の写真をよくとる」と言ったこと。",
                "リクが「庭は本当に美しい」と言ったこと。",
                "リクが「古い城の近くにいた」と言ったこと。",
                "リクが「旅行が好きだ」と言ったこと。" ], answer:0 },
    { type:"fill", label:"(3)", pt:4, stem:"対話の内容について、次の質問に主語と動詞を含む英文1文で答えなさい。<br>"+E("What does Emma's mother have in her room?"),
      answers:["she has many travel books in her room","she has many travel books","she has travel books in her room"], hint:"She has 〜." } ]}
]},

/* ===== 大問4 英作文 ===== */
{ no:4, title:"次の問いに答えなさい。", groups:[
  { intro:"(1) 次は、アオイ(Aoi)がリク(Riku)に質問しているところです。リクの返事に合うように、下線部に適切な英語を書き、英文を完成させなさい。",
    items:[
    { type:"fill", label:"①", pt:4,
      stem:'<div class="scene">絵：リクが手作りの町の地図（map）を持っている。</div>'+
           '<span class="who" style="font-family:var(--en)">Aoi:</span> '+E("（　①　）?")+'　'+
           '<span class="who" style="font-family:var(--en)">Riku:</span> '+E("It's mine. My father made it."),
      answers:["whose map is this","whose map is this one","whose town map is this"], hint:"Whose で始める英文" } ] },
  { intro:"(2) 英語の授業で、あなたの旅行の思い出について話します。次の語を正しく並べて英文を完成させなさい。",
    items:[
    { type:"wordorder", label:"", pt:6, stem:"旅行先を表す英文です。次の語を正しく並べて英文を完成させなさい。",
      words:["Kyoto","to","summer","went","I","last"], answer:"I went to Kyoto last summer." } ] }
]},

/* ===== 大問5 長文読解 ===== */
{ no:5, title:"次の英文は、中学生のケンタ(Kenta)が書いたものです。(1)〜(4)に答えなさい。", groups:[
  { passage:
    'Last spring, I visited my grandmother\'s house in Hikari Town. （　ア　） One morning, I walked to the small station near her house. '+
    'There I saw a foreign woman with a big suitcase. （　イ　） She looked worried and could not read the map, so I went to her and said, "May I help you?" '+
    'She wanted to go to the old castle. （　ウ　）<br><br>'+
    'A week later, on Sunday, April 20, I got an e-mail. It was from a woman named Ms. Green. '+
    'She wrote, "Thank you for showing me the way to the castle. It was very beautiful." She wanted to meet me, so we met at the station the next day.<br><br>'+
    'Ms. Green gave me a small notebook. She said, "My son, Mark, made this for you. '+
    'He lives in Australia, and he makes notebooks as a hobby." <u>That</u> made me very happy. The notebook had a little castle on it.<br><br>'+
    'Ms. Green often talks with Mark on the Internet. Mark visits Japan every summer. '+
    'Next summer, I will meet Mark and say thank you to him.',
    passageEn:true,
    note:'語注：suitcase スーツケース／worried 心配そうな／son むすこ／as a hobby しゅみで',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"次の英文を入れるのに最も適切な場所を、本文中の（ア）〜（ウ）から選びなさい。<br>"+E("So I walked with her and showed her the way."),
      choices:["（ア）","（イ）","（ウ）"], answer:2 },
    { type:"mcq", label:"(2)", pt:4, stem:"下線部 <span class=\"en\">That</span> が指す内容として最も適切なものを、ア〜エから選びなさい。",
      choices:[ "マーク（グリーンさんのむすこ）が、ケンタのためにノートを手作りしてくれたこと。",
                "グリーンさんが、ケンタのために大きなスーツケースをくれたこと。",
                "マークがオーストラリアからケンタに会いに来てくれたこと。",
                "ケンタが駅で外国人の女性を古い城まで案内したこと。" ], answer:0 },
    { type:"mcq", label:"(3)①", pt:3, stem:E("When did Kenta get an e-mail from Ms. Green?"),
      choices:[ E("On April 20."), E("On April 21."), E("Last spring."), E("Next summer.") ], answer:0 },
    { type:"mcq", label:"(3)②", pt:3, stem:E("What was the notebook?"),
      choices:[ E("It was a present from Ms. Green to Mark."), E("It was a present for Mark's father."),
                E("It was a present from Mark to Kenta."), E("It was a present from Mark's mother.") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"本文の内容に合うものを、ア〜エから1つ選びなさい。",
      choices:[ E("Kenta met a foreign woman at a station and showed her the way to the castle."),
                E("Kenta visited his grandmother's house every summer."),
                E("Ms. Green made the notebook for Kenta last Sunday."),
                E("Mark lives in Japan and visits Australia every summer.") ], answer:0 } ]}
]},

/* ===== 大問6 並べかえ（X/Yコース選択） ===== */
{ no:6, title:"並べかえ", lead:"［　］内の語を正しく並べかえ、英文を完成させましょう。文の最初にくる語も小文字で示しています。",
  groups:[
    { items:[
      { type:"wordorder", label:"(1)", pt:3, stem:'A:［ '+E("visit / where / you / will")+' ］ next Sunday?　B: The old castle.',
        words:["visit","where","you","will"], answer:"Where will you visit next Sunday?",
        display:"Where will you visit next Sunday?" },
      { type:"wordorder", label:"(2)", pt:3, stem:'A:［ '+E("you / to / going / are")+' ］ travel to Kyoto next month?　B: Yes, I am.',
        words:["you","to","going","are"], answer:"Are you going to travel to Kyoto next month?",
        display:"Are you going to travel to Kyoto next month?" },
      { type:"wordorder", label:"(3)", pt:3, stem:'A:［ '+E("are / you / if / free")+' ］ this weekend, let\'s join the town tour.　B: Sounds good.',
        words:["are","you","if","free"], answer:"If you are free this weekend, let's join the town tour.",
        display:"If you are free this weekend, let's join the town tour." },
      { type:"wordorder", label:"(4)", pt:3, stem:'A:［ '+E("was / your / reading / sister")+' ］ the map at three yesterday?　B: Yes, she was.',
        words:["was","your","reading","sister"], answer:"Was your sister reading the map at three yesterday?",
        display:"Was your sister reading the map at three yesterday?" } ] }
  ] },

/* ===== 大問7 対話文（語句補充） ===== */
{ no:7, title:"次の対話文の（　①　）〜（　④　）に入る最も適切な英語を、それぞれ1語で書きなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Aoi:</span> Hi, Tom. Do you come to this town hall a lot?</span>'+
    '<span class="sp"><span class="who">Tom:</span> Yes, Aoi. Today I （　①　） here at nine, and I got a town map.</span>'+
    '<span class="sp"><span class="who">Aoi:</span> Nice. I think （　②　） all the people in this town love this place.</span>'+
    '<span class="sp"><span class="who">Tom:</span> I agree. I usually come with my sister. How （　③　） times do you visit each month?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> About four. My brother comes more. He works here as a tour guide.</span>'+
    '<span class="sp"><span class="who">Tom:</span> Oh, does he work here?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> Yes. I hope to become a tour guide （　④　） my brother.</span>',
    items:[
    { type:"fill", label:"①", pt:2, stem:"①（過去形に）", answers:["came"], hint:"come の過去形" },
    { type:"fill", label:"②", pt:2, stem:"②（〜のほとんど）", answers:["almost"], hint:"almost 〜" },
    { type:"fill", label:"③", pt:2, stem:"③（数をたずねる）", answers:["many"], hint:"How 〜 times" },
    { type:"fill", label:"④", pt:2, stem:"④（〜のような）", answers:["like"], hint:"〜 my brother" } ]}
]}

]};
