/* data/chu2_a2.js ─ 中2 模擬テスト（A2）
   構造・配点は chu2.js（正進社 2年 No.2 Aコース形式・大問1〜7・X/Yコース選択・合計100点）と完全一致。
   題材は完全オリジナル：遠足／動物園／スポーツ大会／買い物／天気・自然。人名・場所も新規。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中2 模擬テスト（A2）",
sections: [

/* ===== 大問1 リスニングテスト ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[
  { intro:"(1) 絵の内容に合う英文を、ア〜ウから1つずつ選びなさい。英文は2回読まれます。", items:[
    { type:"mcq", label:"①", pt:2,
      stem:'<div class="scene">絵：女の子が動物園でパンダの写真をとっている。時計は10時30分。</div>',
      choices:[ E("The girl is reading a book about pandas. It's ten thirty."),
                E("The girl is taking a picture of the panda. It's ten thirty."),
                E("The girl is taking a picture of the panda. It's eleven thirty.") ], answer:1 },
    { type:"mcq", label:"②", pt:2,
      stem:'<div class="scene">絵：男の子が木の下でお弁当を食べている。</div>',
      choices:[ E("The boy is eating lunch under the tree."),
                E("The boy is sleeping under the tree."),
                E("The boy is eating lunch by the river.") ], answer:0 },
    { type:"mcq", label:"③", pt:2,
      stem:'<div class="scene">絵：女の人が店でくつを買っている。時計は3時。</div>',
      choices:[ E("She is buying caps at a shop. It's three o'clock."),
                E("She is buying shoes at a shop. It's three o'clock."),
                E("She is buying shoes at a shop. It's two o'clock.") ], answer:1 } ] },

  { script:
      '<span class="sp"><span class="who">Daichi:</span> Hi, Hana. What did you do last Saturday?</span>'+
      '<span class="sp"><span class="who">Hana:</span> Hi, Daichi. I went to the zoo with my family. How about you?</span>'+
      '<span class="sp"><span class="who">Daichi:</span> I watched a soccer game at the stadium. My brother played in it.</span>'+
      '<span class="sp"><span class="who">Hana:</span> Sounds exciting. Does your brother play soccer every day?</span>'+
      '<span class="sp"><span class="who">Daichi:</span> No, he doesn\'t. He practices it on Tuesdays and Fridays.</span>'+
      '<span class="sp"><span class="who">Hana:</span> I see. Next month our school will have a sports day. Are you going to join the relay?</span>'+
      '<span class="sp"><span class="who">Daichi:</span> Yes, I am. I run fast. Where will you be that day?</span>'+
      '<span class="sp"><span class="who">Hana:</span> I\'m going to cheer for you near the goal.</span>',
    intro:"(2) ダイチとハナの対話を聞き、英語の質問の答えを選びなさい。対話と質問は1回読まれます。",
    items:[
    { type:"mcq", label:"①", pt:3, stem:E("What did Hana do last Saturday?"),
      choices:[ E("She went to the zoo with her family."), E("She watched a soccer game at the stadium."),
                E("She played in the relay."), E("She cheered near the goal.") ], answer:0 },
    { type:"mcq", label:"②", pt:3, stem:E("Does Daichi's brother play soccer every day?"),
      choices:[ E("No, he doesn't."), E("Yes, he does."), E("No, he isn't."), E("Yes, he is.") ], answer:0 },
    { type:"mcq", label:"③", pt:3, stem:E("What will Daichi do on the sports day?"),
      choices:[ E("He will cheer near the goal."), E("He will join the relay."),
                E("He will watch a soccer game."), E("He will go to the zoo.") ], answer:1 },
    { type:"mcq", label:"④", pt:3, stem:E("Where will Hana be on the sports day?"),
      choices:[ E("Near the goal."), E("At the zoo."),
                E("At the stadium."), E("In her classroom.") ], answer:0 } ] },

  { passage:
      '<b>転入生について（メモ）</b><br>名前：エラ・ヒル<br>出身：ニュージーランド<br>'+
      '・毎朝ジョギングする<br>・自然が好きで、週末によく山に登る<br>・カメラを2台持ち、鳥の写真をとる',
    script:
      '<span class="sp">We have a new student. Her name is Ella Hill. She is from New Zealand.</span>'+
      '<span class="sp">She goes jogging every morning. She likes nature, and she often climbs mountains on weekends.</span>'+
      '<span class="sp">She has two cameras and takes many pictures of birds.</span>',
    intro:"(3) エラについてのメモを見ながら放送を聞き、質問の答えを選びなさい。放送は2回読まれます。",
    items:[
    { type:"mcq", label:"①", pt:3, stem:E("Does Ella go jogging every morning?"),
      choices:[ E("Yes, she does."), E("No, she doesn't."), E("Yes, she is."), E("No, she isn't.") ], answer:0 },
    { type:"mcq", label:"②", pt:3, stem:E("How many cameras does Ella have?"),
      choices:[ E("One."), E("Two."), E("Three."), E("Four.") ], answer:1 } ] }
]},

/* ===== 大問2 読解（チラシ＋対話） ===== */
{ no:2, title:"次は、中学生のソウタとリン(Rin)の対話文です。チラシを参考にして読み、あとの問いに答えなさい。", groups:[
  { flyer:
    '<h4>★ あおぞら動物園（Aozora Zoo）★</h4>'+
    '<table><tr><th>ふれあい・えさやり体験（毎日）</th><th></th></tr>'+
    '<tr><td>10:30〜11:00</td><td>ペンギンのえさやり</td></tr>'+
    '<tr><td>11:30〜12:00</td><td>ヤギとのふれあい</td></tr>'+
    '<tr><td>13:30〜14:00</td><td>ゾウのえさやり</td></tr>'+
    '<tr><td>15:00〜15:30</td><td>ライオンのお食事タイム</td></tr></table>'+
    '<div class="note">料金　大人 600円／中・高校生 400円／小学生 200円</div>'+
    '<table style="margin-top:6px"><tr><th>夜の動物園（毎月第2土曜日・参加無料）</th><th></th></tr>'+
    '<tr><td>定員</td><td>25名</td></tr>'+
    '<tr><td>時間</td><td>18:00〜／19:00〜</td></tr>'+
    '<tr><td>7月</td><td>ホタルを見よう</td></tr><tr><td>8月</td><td>コウモリの観察</td></tr>'+
    '<tr><td>9月</td><td>秋の虫の声</td></tr><tr><td>10月</td><td>月と動物</td></tr></table>'+
    '<div class="note">・10分前に集合してください</div>',
    passage:
    '<span class="sp"><span class="who">Rin:</span> Sota, look at this flyer.</span>'+
    '<span class="sp"><span class="who">Sota:</span> Hi, Rin. It\'s a flyer from Aozora Zoo. There we can touch the animals and give them (　①　) at feeding time.</span>'+
    '<span class="sp"><span class="who">Rin:</span> The feeding time is popular. The zoo also has a special night event on the (　②　) Saturday of every month. Only (　③　) people can join.</span>'+
    '<span class="sp"><span class="who">Sota:</span> That sounds fun. I want to visit next Saturday. Can you go with me?</span>'+
    '<span class="sp"><span class="who">Rin:</span> Yes, but I can\'t go at night. I sometimes come here with my family in the daytime.</span>'+
    '<span class="sp"><span class="who">Sota:</span> That\'s OK. I want to see the penguin feeding.</span>'+
    '<span class="sp"><span class="who">Rin:</span> Then let\'s meet at ten twenty, so we can watch it from ten thirty.</span>'+
    '<span class="sp"><span class="who">Sota:</span> Good. After that, let\'s touch the goats at eleven thirty. I can\'t wait!</span>',
    note:'語注：flyer チラシ／feeding えさやり／goat ヤギ／daytime 昼間',
    items:[
    { type:"fill", label:"(1)①", pt:3, stem:"①に入る最も適切な英語を1語で書きなさい。", answers:["food"], hint:"1語・えさ" },
    { type:"fill", label:"(1)②", pt:3, stem:"②に入る最も適切な英語を1語で書きなさい。", answers:["second"], hint:"1語・第2の" },
    { type:"fill", label:"(2)③", pt:3, stem:"チラシと対話に合うよう、③に入る適切な数字を書きなさい。", answers:["25","twenty-five"], hint:"数字" },
    { type:"mcq", label:"(3)", pt:4, stem:"ソウタとリンが動物園で参加するイベントの組み合わせとして、最も適切なものを選びなさい。",
      choices:[ "10:30 ペンギンのえさやり　→　11:30 ヤギとのふれあい",
                "10:30 ペンギンのえさやり　→　13:30 ゾウのえさやり",
                "11:30 ヤギとのふれあい　→　15:00 ライオンのお食事タイム",
                "13:30 ゾウのえさやり　→　15:00 ライオンのお食事タイム" ], answer:0 } ]}
]},

/* ===== 大問3 対話文（語句補充・記述） ===== */
{ no:3, title:"次は、中学生のユウト(Yuto)とグレイス(Grace)の対話文です。よく読んで、あとの問いに答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Yuto:</span> Hi, Grace. I saw you at the city gym last Saturday afternoon.</span>'+
    '<span class="sp"><span class="who">Grace:</span> Oh, Yuto. Yes, I was there. My sister had a basketball game that day.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> （　ⓐ　）</span>'+
    '<span class="sp"><span class="who">Grace:</span> No, I didn\'t. I watched my sister\'s game. She is a great player.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> I see. I often make videos of games.</span>'+
    '<span class="sp"><span class="who">Grace:</span> <u>Me, too.</u> Look, this is my sister\'s video.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> It\'s nice. （　ⓑ　）</span>'+
    '<span class="sp"><span class="who">Grace:</span> I took it at the city gym last week.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> Your family really likes basketball. （　ⓒ　）</span>'+
    '<span class="sp"><span class="who">Grace:</span> Yes, he does. He was a good player. He always talks about his old school team.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> I\'m interested in the history of the team. Can I see the videos?</span>'+
    '<span class="sp"><span class="who">Grace:</span> Sure. Come to my house next Sunday.</span>',
    items:[
    { type:"bankpick", label:"(1)ⓐ", pt:3, stem:"ⓐに入る最も適切な文を、次のア〜カから選びなさい。", answer:1,
      bank:[E("Did you walk to the gym?"),E("Did you play in the game?"),E("Where did you take this video?"),
            E("How do you get there?"),E("Is that your sister in the video?"),E("Does your father like basketball, too?")] },
    { type:"bankpick", label:"(1)ⓑ", pt:3, stem:"ⓑに入る最も適切な文を、ア〜カから選びなさい。", answer:2,
      bank:[E("Did you walk to the gym?"),E("Did you play in the game?"),E("Where did you take this video?"),
            E("How do you get there?"),E("Is that your sister in the video?"),E("Does your father like basketball, too?")] },
    { type:"bankpick", label:"(1)ⓒ", pt:3, stem:"ⓒに入る最も適切な文を、ア〜カから選びなさい。", answer:5,
      bank:[E("Did you walk to the gym?"),E("Did you play in the game?"),E("Where did you take this video?"),
            E("How do you get there?"),E("Is that your sister in the video?"),E("Does your father like basketball, too?")] },
    { type:"mcq", label:"(2)", pt:4, stem:"下線部 <span class=\"en\">Me, too.</span> は、どのようなことに対するグレイスの発言ですか。最も適切なものを、ア〜エから選びなさい。",
      choices:[ "ユウトが「試合の動画をよくとる」と言ったこと。",
                "ユウトが「お姉さんはすばらしい選手だ」と言ったこと。",
                "ユウトが「市の体育館にいた」と言ったこと。",
                "ユウトが「バスケットボールが好きだ」と言ったこと。" ], answer:0 },
    { type:"fill", label:"(3)", pt:4, stem:"対話の内容について、次の質問に主語と動詞を含む英文1文で答えなさい。<br>"+E("What does Grace's father always talk about?"),
      answers:["he talks about his old school team","he always talks about his old school team","he talks about his school team","he talks about his old team"], hint:"He talks about 〜." } ]}
]},

/* ===== 大問4 英作文 ===== */
{ no:4, title:"次の問いに答えなさい。", groups:[
  { intro:"(1) 次は、アオイ(Aoi)がベン(Ben)に質問しているところです。ベンの返事に合うように、下線部に適切な英語を書き、英文を完成させなさい。",
    items:[
    { type:"fill", label:"①", pt:4,
      stem:'<div class="scene">絵：ベンが新しい水とう（water bottle）を持っている。</div>'+
           '<span class="who" style="font-family:var(--en)">Aoi:</span> '+E("（　①　） this?")+'　'+
           '<span class="who" style="font-family:var(--en)">Ben:</span> '+E("It's mine. My mother bought it."),
      answers:["whose water bottle is this","whose bottle is this","whose water bottle is this one"], hint:"Whose で始める英文" } ] },
  { intro:"(2) 次の語を正しく並べて英文を完成させなさい。",
    items:[
    { type:"wordorder", label:"", pt:6, stem:"次の語を正しく並べて英文を完成させなさい。",
      words:["cloudy","in","It","morning","the","was"], answer:"It was cloudy in the morning.",
      display:"It was cloudy in the morning." } ] }
]},

/* ===== 大問5 長文読解 ===== */
{ no:5, title:"次の英文は、中学生のリク(Riku)が書いたものです。(1)〜(4)に答えなさい。", groups:[
  { passage:
    'Last summer, our class went on a school trip to Aozora Zoo. （　ア　） In the morning, I walked around the zoo with my friends. '+
    'There I saw a baby elephant near the gate. （　イ　） I took many pictures of it. '+
    'A zookeeper there said, "This elephant was born in April. Its name is Momo." （　ウ　）<br><br>'+
    'After lunch, on that day, I lost my cap. It was very hot, so I looked for it for a long time. '+
    'A little girl came to me and said, "Is this your cap? I found it under a bench near the lions."<br><br>'+
    'The girl gave my cap back to me. She said, "I looked for its owner for you." <u>That</u> made me very glad. '+
    'Then she said, "My name is Sara. I like animals very much, and I come to this zoo every month."<br><br>'+
    'Sara often draws pictures of animals. She is going to have a small art show next spring. '+
    'Next spring, I will visit her show and say thank you to her.',
    passageEn:true,
    note:'語注：school trip 遠足／zookeeper 飼育員／be born 生まれる／cap ぼうし／owner 持ち主',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"次の英文を入れるのに最も適切な場所を、本文中の（ア）〜（ウ）から選びなさい。<br>"+E("Then I felt really excited."),
      choices:["（ア）","（イ）","（ウ）"], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"下線部 <span class=\"en\">That</span> が指す内容として最も適切なものを、ア〜エから選びなさい。",
      choices:[ "サラが、なくしたぼうしを見つけ、持ち主をさがしてくれたこと。",
                "サラが、リクのために動物の絵をかいてくれたこと。",
                "リクが、動物園で赤ちゃんゾウの写真をとったこと。",
                "サラが、毎月この動物園に来ていること。" ], answer:0 },
    { type:"mcq", label:"(3)①", pt:3, stem:E("When was the baby elephant born?"),
      choices:[ E("In April."), E("In August."), E("Last summer."), E("Next spring.") ], answer:0 },
    { type:"mcq", label:"(3)②", pt:3, stem:E("How often does Sara come to the zoo?"),
      choices:[ E("Every month."), E("Every week."), E("Every day."), E("Every spring.") ], answer:0 },
    { type:"mcq", label:"(4)", pt:3, stem:"本文の内容に合うものを、ア〜エから1つ選びなさい。",
      choices:[ E("Riku went on a school trip and saw a baby elephant at the zoo."),
                E("Sara lost her cap and Riku found it near the lions."),
                E("The baby elephant was born next spring."),
                E("Riku is going to have an art show next spring.") ], answer:0 } ]}
]},

/* ===== 大問6 並べかえ（X/Yコース選択） ===== */
{ no:6, title:"並べかえ（X・Yコースのどちらかを選んで答えなさい）", lead:"［　］内の語を正しく並べかえ、英文を完成させましょう。文の最初にくる語も小文字で示しています。",
  courses:[
    { name:"Xコース", items:[
      { type:"wordorder", label:"(1)", pt:3, stem:'A:［ '+E("go / you / will / where")+' ］ next Sunday?　B: To the animal park.',
        words:["go","you","will","where"], answer:"Where will you go next Sunday?",
        display:"Where will you go next Sunday?" },
      { type:"wordorder", label:"(2)", pt:3, stem:'A:［ '+E("going / to / are / you")+' ］ watch the game tomorrow?　B: Yes, I am.',
        words:["going","to","are","you"], answer:"Are you going to watch the game tomorrow?",
        display:"Are you going to watch the game tomorrow?" },
      { type:"wordorder", label:"(3)", pt:3, stem:'A:［ '+E("sunny / if / is / it")+' ］ tomorrow, let\'s climb the mountain.　B: Sounds good.',
        words:["sunny","if","is","it"], answer:"If it is sunny tomorrow, let's climb the mountain.",
        display:"If it is sunny tomorrow, let's climb the mountain." },
      { type:"wordorder", label:"(4)", pt:3, stem:'A:［ '+E("running / your / was / brother")+' ］ in the park at seven yesterday?　B: Yes, he was.',
        words:["running","your","was","brother"], answer:"Was your brother running in the park at seven yesterday?",
        display:"Was your brother running in the park at seven yesterday?" } ] },
    { name:"Yコース", items:[
      { type:"wordorder", label:"(1)", pt:3, stem:'A:［ '+E("lunch / were / you / eating")+' ］ at noon yesterday?　B: Yes, I was.',
        words:["lunch","were","you","eating"], answer:"Were you eating lunch at noon yesterday?",
        display:"Were you eating lunch at noon yesterday?" },
      { type:"wordorder", label:"(2)", pt:3, stem:'A: I didn\'t go to the zoo ［ '+E("was / because / rainy / it")+' ］ yesterday.　B: I see.',
        words:["was","because","rainy","it"], answer:"I didn't go to the zoo because it was rainy yesterday.",
        display:"I didn't go to the zoo because it was rainy yesterday." },
      { type:"wordorder", label:"(3)", pt:3, stem:'A: I visited the shop ［ '+E("a / cap / to / buy")+' ］ yesterday.　B: That\'s nice.',
        words:["a","cap","to","buy"], answer:"I visited the shop to buy a cap yesterday.",
        display:"I visited the shop to buy a cap yesterday." },
      { type:"wordorder", label:"(4)", pt:3, stem:'A:［ '+E("are / hungry / if / you")+' ］, let\'s eat lunch now.　B: OK.',
        words:["are","hungry","if","you"], answer:"If you are hungry, let's eat lunch now.",
        display:"If you are hungry, let's eat lunch now." } ] }
  ] },

/* ===== 大問7 対話文（語句補充） ===== */
{ no:7, title:"次の対話文の（　①　）〜（　④　）に入る最も適切な英語を、それぞれ1語で書きなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mina:</span> Hi, Jack. Do you come to this mall a lot?</span>'+
    '<span class="sp"><span class="who">Jack:</span> Yes, Mina. Today I （　①　） here at ten, and I bought a new bag.</span>'+
    '<span class="sp"><span class="who">Mina:</span> Nice. I think （　②　） all the shops here have a sale today.</span>'+
    '<span class="sp"><span class="who">Jack:</span> I agree. I usually come with my sister. How （　③　） shops do you visit each day?</span>'+
    '<span class="sp"><span class="who">Mina:</span> About four. My brother visits more. He works here in a shoe shop.</span>'+
    '<span class="sp"><span class="who">Jack:</span> Oh, does he work here?</span>'+
    '<span class="sp"><span class="who">Mina:</span> Yes. I hope to work in a shop （　④　） my brother.</span>',
    items:[
    { type:"fill", label:"①", pt:2, stem:"①（過去形に）", answers:["came"], hint:"come の過去形" },
    { type:"fill", label:"②", pt:2, stem:"②（〜のほとんど）", answers:["almost"], hint:"almost 〜" },
    { type:"fill", label:"③", pt:2, stem:"③（数をたずねる）", answers:["many"], hint:"How 〜 shops" },
    { type:"fill", label:"④", pt:2, stem:"④（〜のような）", answers:["like"], hint:"〜 my brother" } ]}
]}

]};
