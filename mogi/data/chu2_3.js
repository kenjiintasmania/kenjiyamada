/* data/chu2_3.js ─ 中2 第3回 模擬テスト
   テンプレート data/chu2.js の構成（大問1〜7・X/Yコース選択）と完全一致。
   問題数・配点(計100点)・出題形式は同一。内容はすべて新作（テーマ：町・音楽・夏）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中2 第3回 模擬テスト",
sections: [

/* ===== 大問1 リスニングテスト ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[
  { intro:"(1) 絵の内容に合う英文を、ア〜ウから1つずつ選びなさい。英文は2回読まれます。", items:[
    { type:"mcq", label:"①", pt:2,
      stem:'<div class="scene">絵：女の子が公園のベンチでギターをひいている。時計は4時30分。</div>',
      choices:[ E("She is playing the guitar in the park. It's four thirty."),
                E("She is playing the piano in the park. It's four thirty."),
                E("She is playing the guitar in the park. It's three forty.") ], answer:0 },
    { type:"mcq", label:"②", pt:2,
      stem:'<div class="scene">絵：男の子がプールで泳いでいる。</div>',
      choices:[ E("He is swimming in the pool."),
                E("He is running by the pool."),
                E("He is washing the pool.") ], answer:0 },
    { type:"mcq", label:"③", pt:2,
      stem:'<div class="scene">絵：女の人が駅前でアイスクリームを食べている。時計は2時。</div>',
      choices:[ E("She is buying an ice cream at the station at two."),
                E("She is eating an ice cream at the station at two."),
                E("She is eating an ice cream at the station at twelve.") ], answer:1 } ] },

  { script:
      '<span class="sp"><span class="who">Lucy:</span> Hi, Daiki. What are you going to do next Saturday?</span>'+
      '<span class="sp"><span class="who">Daiki:</span> Hi, Lucy. I\'m going to go to the summer festival in our town. Do you want to come?</span>'+
      '<span class="sp"><span class="who">Lucy:</span> Yes! I love festivals. What time does it start?</span>'+
      '<span class="sp"><span class="who">Daiki:</span> It starts at four in the afternoon. My brother\'s band will play music on the stage.</span>'+
      '<span class="sp"><span class="who">Lucy:</span> Cool! Does your sister play in the band, too?</span>'+
      '<span class="sp"><span class="who">Daiki:</span> No, she doesn\'t. She is going to sell cold drinks at the festival.</span>'+
      '<span class="sp"><span class="who">Lucy:</span> Sounds fun. Where should we meet?</span>'+
      '<span class="sp"><span class="who">Daiki:</span> Let\'s meet in front of the station at half past three.</span>'+
      '<span class="sp"><span class="who">Lucy:</span> OK. See you there!</span>',
    intro:"(2) ルーシーとダイキの対話を聞き、英語の質問の答えを選びなさい。対話と質問は1回読まれます。",
    items:[
    { type:"mcq", label:"①", pt:3, stem:E("What is Daiki going to do next Saturday?"),
      choices:[ E("He is going to play in a band."), E("He is going to go to the summer festival."),
                E("He is going to sell cold drinks."), E("He is going to swim in the pool.") ], answer:1 },
    { type:"mcq", label:"②", pt:3, stem:E("Does Daiki's sister play in the band?"),
      choices:[ E("No, she doesn't."), E("Yes, she does."), E("No, she isn't."), E("Yes, she is.") ], answer:0 },
    { type:"mcq", label:"③", pt:3, stem:E("What time does the festival start?"),
      choices:[ E("At three thirty."), E("At three in the afternoon."),
                E("At four in the afternoon."), E("At half past three.") ], answer:2 },
    { type:"mcq", label:"④", pt:3, stem:E("Where will Lucy and Daiki meet?"),
      choices:[ E("At the festival stage."), E("In front of the station."),
                E("At Daiki's house."), E("By the pool.") ], answer:1 } ] },

  { passage:
      '<b>転入生について（メモ）</b><br>名前：トム・スミス<br>出身：オーストラリア<br>'+
      '・毎日ドラムを練習する<br>・夏が好きで、週末によく海で泳ぐ<br>・カメ1匹とインコ3羽を飼っている',
    script:
      '<span class="sp">We have a new student. His name is Tom Smith. He is from Australia.</span>'+
      '<span class="sp">He practices the drums every day. He likes summer, and he often swims in the sea on weekends.</span>'+
      '<span class="sp">He has one turtle and three parakeets at home.</span>',
    intro:"(3) トムについてのメモを見ながら放送を聞き、質問の答えを選びなさい。放送は2回読まれます。",
    items:[
    { type:"mcq", label:"①", pt:3, stem:E("Does Tom practice the drums every day?"),
      choices:[ E("Yes, he does."), E("No, he doesn't."), E("Yes, he is."), E("No, he isn't.") ], answer:0 },
    { type:"mcq", label:"②", pt:3, stem:E("How many parakeets does Tom have?"),
      choices:[ E("One."), E("Two."), E("Three."), E("Four.") ], answer:2 } ] }
]},

/* ===== 大問2 読解（チラシ＋対話） ===== */
{ no:2, title:"次は、中学生のソウタとケイト(Kate)の対話文です。チラシを参考にして読み、あとの問いに答えなさい。", groups:[
  { flyer:
    '<h4>★ ひかりホール 夏の音楽会（Hikari Hall Summer Concert）★</h4>'+
    '<table><tr><th>コンサート（毎日）</th><th></th></tr>'+
    '<tr><td>10:30〜11:20</td><td>ピアノの調べ</td></tr>'+
    '<tr><td>11:30〜12:20</td><td>夏のうたコンサート</td></tr>'+
    '<tr><td>14:00〜14:50</td><td>ピアノの調べ</td></tr>'+
    '<tr><td>15:00〜15:50</td><td>吹奏楽コンサート</td></tr></table>'+
    '<div class="note">料金　大人 600円／中・高校生 400円／小学生 200円</div>'+
    '<table style="margin-top:6px"><tr><th>楽器教室（毎月第2土曜日・参加無料）</th><th></th></tr>'+
    '<tr><td>定員</td><td>25名</td></tr>'+
    '<tr><td>時間</td><td>13:00〜／15:00〜</td></tr>'+
    '<tr><td>6月</td><td>たいこをたたこう</td></tr><tr><td>7月</td><td>リコーダーをふこう</td></tr>'+
    '<tr><td>8月</td><td>ギターをひこう</td></tr><tr><td>9月</td><td>うたをうたおう</td></tr></table>'+
    '<div class="note">・10分前に集合してください</div>',
    passage:
    '<span class="sp"><span class="who">Kate:</span> Sota, have you seen this flyer?</span>'+
    '<span class="sp"><span class="who">Sota:</span> Hi, Kate. Yes. It\'s a flyer from Hikari Hall. There we can enjoy beautiful (　①　) and listen to some summer concerts.</span>'+
    '<span class="sp"><span class="who">Kate:</span> The concerts are popular. The hall also has an instrument class on the (　②　) Saturday of every month. (　③　) students can join. I joined last month and played the drums.</span>'+
    '<span class="sp"><span class="who">Sota:</span> That sounds fun. I want to visit next month. Can you go with me?</span>'+
    '<span class="sp"><span class="who">Kate:</span> Yes, but I can\'t go in the morning. I help my mother then. I\'m free in the afternoon.</span>'+
    '<span class="sp"><span class="who">Sota:</span> That\'s OK. I want to listen to the brass band concert.</span>'+
    '<span class="sp"><span class="who">Kate:</span> Then let\'s meet at twelve fifty, so we can join the class from one.</span>'+
    '<span class="sp"><span class="who">Sota:</span> Good. Let\'s join the instrument class before the concert.</span>'+
    '<span class="sp"><span class="who">Kate:</span> Sure. We can play the guitar that day. I can\'t wait!</span>',
    note:'語注：flyer チラシ／instrument 楽器／brass band 吹奏楽／concert コンサート',
    items:[
    { type:"fill", label:"(1)①", pt:3, stem:"①に入る最も適切な英語を1語で書きなさい。", answers:["music"], hint:"1語・音楽" },
    { type:"fill", label:"(1)②", pt:3, stem:"②に入る最も適切な英語を1語で書きなさい。", answers:["second"], hint:"1語・第2の" },
    { type:"fill", label:"(2)③", pt:3, stem:"チラシと対話に合うよう、③に入る適切な数字を書きなさい。", answers:["25","twenty-five"], hint:"数字" },
    { type:"mcq", label:"(3)", pt:4, stem:"ソウタとケイトが音楽会で参加するイベントの組み合わせとして、最も適切なものを選びなさい。",
      choices:[ "13:00 楽器教室　→　14:00 コンサート",
                "13:00 楽器教室　→　15:00 コンサート",
                "10:30 コンサート　→　13:00 楽器教室",
                "15:00 コンサート　→　15:00 楽器教室" ], answer:1 } ]}
]},

/* ===== 大問3 対話文（語句補充・記述） ===== */
{ no:3, title:"次は、中学生のリク(Riku)とアナ(Anna)の対話文です。よく読んで、あとの問いに答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Riku:</span> Hi, Anna. I saw you at the town hall last Saturday afternoon.</span>'+
    '<span class="sp"><span class="who">Anna:</span> Oh, Riku. Yes, I was there. My sister had a piano concert that day.</span>'+
    '<span class="sp"><span class="who">Riku:</span> （　ⓐ　）</span>'+
    '<span class="sp"><span class="who">Anna:</span> No, I didn\'t. I listened to my sister\'s music. She is a good player.</span>'+
    '<span class="sp"><span class="who">Riku:</span> I see. I often record songs on my phone.</span>'+
    '<span class="sp"><span class="who">Anna:</span> <u>Me, too.</u> Listen, this is my sister\'s song.</span>'+
    '<span class="sp"><span class="who">Riku:</span> It\'s beautiful. （　ⓑ　）</span>'+
    '<span class="sp"><span class="who">Anna:</span> I recorded it at the town hall last week.</span>'+
    '<span class="sp"><span class="who">Riku:</span> Your family really loves music. （　ⓒ　）</span>'+
    '<span class="sp"><span class="who">Anna:</span> Yes, he does. He has many old records in his room. He often talks about his favorite summer songs.</span>'+
    '<span class="sp"><span class="who">Riku:</span> I\'m interested in old music. Can I listen to the records?</span>'+
    '<span class="sp"><span class="who">Anna:</span> Sure. Come to my house next Sunday.</span>',
    items:[
    { type:"bankpick", label:"(1)ⓐ", pt:3, stem:"ⓐに入る最も適切な文を、次のア〜カから選びなさい。", answer:1,
      bank:[E("Did you bring your dog there?"),E("Did you play in the concert?"),E("Where did you record this song?"),
            E("How do you get there?"),E("Is that your sister in the photo?"),E("Does your grandfather like music, too?")] },
    { type:"bankpick", label:"(1)ⓑ", pt:3, stem:"ⓑに入る最も適切な文を、ア〜カから選びなさい。", answer:2,
      bank:[E("Did you bring your dog there?"),E("Did you play in the concert?"),E("Where did you record this song?"),
            E("How do you get there?"),E("Is that your sister in the photo?"),E("Does your grandfather like music, too?")] },
    { type:"bankpick", label:"(1)ⓒ", pt:3, stem:"ⓒに入る最も適切な文を、ア〜カから選びなさい。", answer:5,
      bank:[E("Did you bring your dog there?"),E("Did you play in the concert?"),E("Where did you record this song?"),
            E("How do you get there?"),E("Is that your sister in the photo?"),E("Does your grandfather like music, too?")] },
    { type:"mcq", label:"(2)", pt:4, stem:"下線部 <span class=\"en\">Me, too.</span> は、どのようなことに対するアナの発言ですか。最も適切なものを、ア〜エから選びなさい。",
      choices:[ "リクが「よくスマホで歌を録音する」と言ったこと。",
                "リクが「姉はよい演奏者だ」と言ったこと。",
                "リクが「町のホールにいた」と言ったこと。",
                "リクが「音楽が好きだ」と言ったこと。" ], answer:0 },
    { type:"fill", label:"(3)", pt:4, stem:"対話の内容について、次の質問に主語と動詞を含む英文1文で答えなさい。<br>"+E("What does Anna's grandfather have in his room?"),
      answers:["he has many old records in his room","he has many old records","he has old records in his room"], hint:"He has 〜." } ]}
]},

/* ===== 大問4 英作文 ===== */
{ no:4, title:"次の問いに答えなさい。", groups:[
  { intro:"(1) 次は、ハナ(Hana)がサム(Sam)に質問しているところです。サムの返事に合うように、下線部に適切な英語を書き、英文を完成させなさい。",
    items:[
    { type:"fill", label:"①", pt:4,
      stem:'<div class="scene">絵：サムが手作りのうちわ（paper fan）を持っている。</div>'+
           '<span class="who" style="font-family:var(--en)">Hana:</span> '+E("（　①　）?")+'　'+
           '<span class="who" style="font-family:var(--en)">Sam:</span> '+E("It's mine. My grandmother made it."),
      answers:["whose paper fan is this","whose fan is this","whose paper fan is this one"], hint:"Whose で始める英文" } ] },
  { intro:"(2) 次の語を正しく並べて英文を完成させなさい。",
    items:[
    { type:"wordorder", label:"", pt:6, stem:"次の語を正しく並べて英文を完成させなさい。",
      words:["my","play","I","with","soccer","friends"], answer:"I play soccer with my friends." } ] }
]},

/* ===== 大問5 長文読解 ===== */
{ no:5, title:"次の英文は、中学生のハルト(Haruto)が書いたものです。(1)〜(4)に答えなさい。", groups:[
  { passage:
    'Last summer, I went to a big summer festival in my town. （　ア　） One hot afternoon, I walked near the station. '+
    'There I saw a foreign man with a big map. He looked worried. （　イ　） I went to him and said, "May I help you?" '+
    'He wanted to visit the old shrine in our town. （　ウ　） So I walked with him and showed him the way.<br><br>'+
    'A month later, on Friday, August 21, I got a postcard. It was from the man. His name was Mr. Carter. '+
    'He wrote, "Thank you for your help. The shrine was very beautiful." He lives in England now.<br><br>'+
    'In the postcard, there was a small picture of a summer flower. He wrote, "My daughter, Emily, drew this for you. '+
    'She likes drawing pictures." <u>That</u> made me very happy. The flower was a sunflower, my favorite.<br><br>'+
    'Mr. Carter sometimes sends me e-mails. Emily wants to come to Japan next summer. '+
    'Next summer, I will meet Emily and show her our town.',
    passageEn:true,
    note:'語注：worried 心配そうな／shrine 神社／postcard はがき／drew draw(描く)の過去形／sunflower ひまわり',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"次の英文を入れるのに最も適切な場所を、本文中の（ア）〜（ウ）から選びなさい。<br>"+E("Then he smiled and looked happy."),
      choices:["（ア）","（イ）","（ウ）"], answer:2 },
    { type:"mcq", label:"(2)", pt:4, stem:"下線部 <span class=\"en\">That</span> が指す内容として最も適切なものを、ア〜エから選びなさい。",
      choices:[ "エミリー（カーターさんの娘）が、ハルトのために夏の花（ひまわり）の絵を描いてくれたこと。",
                "カーターさんが、ハルトに大きな地図をくれたこと。",
                "ハルトがカーターさんを古い神社まで案内したこと。",
                "カーターさんがイギリスからはがきを送ってくれたこと。" ], answer:0 },
    { type:"mcq", label:"(3)①", pt:3, stem:E("When did Haruto get a postcard from Mr. Carter?"),
      choices:[ E("On August 21."), E("On August 12."), E("Last summer."), E("Next summer.") ], answer:0 },
    { type:"mcq", label:"(3)②", pt:3, stem:E("What was the picture in the postcard?"),
      choices:[ E("It was a picture of the old shrine."), E("It was a picture of a sunflower."),
                E("It was a picture of the station."), E("It was a picture of England.") ], answer:1 },
    { type:"mcq", label:"(4)", pt:3, stem:"本文の内容に合うものを、ア〜エから1つ選びなさい。",
      choices:[ E("Haruto helped a foreign man find the old shrine in his town."),
                E("Haruto visited England last summer."),
                E("Mr. Carter drew the flower picture for Haruto."),
                E("Emily lives in Japan and visits England every summer.") ], answer:0 } ]}
]},

/* ===== 大問6 並べかえ（X/Yコース選択） ===== */
{ no:6, title:"並べかえ（X・Yコースのどちらかを選んで答えなさい）", lead:"［　］内の語を正しく並べかえ、英文を完成させましょう。文の最初にくる語も小文字で示しています。",
  courses:[
    { name:"Xコース", items:[
      { type:"wordorder", label:"(1)", pt:3, stem:'A:［ '+E("you / will / where / meet")+' ］ your friends this summer?　B: At the beach.',
        words:["you","will","where","meet"], answer:"Where will you meet your friends this summer?",
        display:"Where will you meet your friends this summer?" },
      { type:"wordorder", label:"(2)", pt:3, stem:'A:［ '+E("going / are / to / you")+' ］ join the summer festival?　B: Yes, I am.',
        words:["going","are","to","you"], answer:"Are you going to join the summer festival?",
        display:"Are you going to join the summer festival?" },
      { type:"wordorder", label:"(3)", pt:3, stem:'A:［ '+E("are / if / you / free")+' ］ tomorrow, let\'s go to the concert.　B: Sounds good.',
        words:["are","if","you","free"], answer:"If you are free tomorrow, let's go to the concert.",
        display:"If you are free tomorrow, let's go to the concert." },
      { type:"wordorder", label:"(4)", pt:3, stem:'A:［ '+E("playing / brother / was / your")+' ］ the guitar at six yesterday?　B: Yes, he was.',
        words:["playing","brother","was","your"], answer:"Was your brother playing the guitar at six yesterday?",
        display:"Was your brother playing the guitar at six yesterday?" } ] },
    { name:"Yコース", items:[
      { type:"wordorder", label:"(1)", pt:3, stem:'A:［ '+E("listening / were / you / to")+' ］ music at nine last night?　B: Yes, I was.',
        words:["listening","were","you","to"], answer:"Were you listening to music at nine last night?",
        display:"Were you listening to music at nine last night?" },
      { type:"wordorder", label:"(2)", pt:3, stem:'A: I stayed home ［ '+E("because / was / it / very")+' ］ hot this afternoon.　B: I see.',
        words:["because","was","it","very"], answer:"I stayed home because it was very hot this afternoon.",
        display:"I stayed home because it was very hot this afternoon." },
      { type:"wordorder", label:"(3)", pt:3, stem:'A: I went to ［ '+E("see / Tokyo / to / my")+' ］ uncle last week.　B: That\'s nice.',
        words:["see","Tokyo","to","my"], answer:"I went to Tokyo to see my uncle last week.",
        display:"I went to Tokyo to see my uncle last week." },
      { type:"wordorder", label:"(4)", pt:3, stem:'A:［ '+E("are / if / you / free")+' ］ tomorrow, come to the festival with me.　B: OK.',
        words:["are","if","you","free"], answer:"If you are free tomorrow, come to the festival with me.",
        display:"If you are free tomorrow, come to the festival with me." } ] }
  ] },

/* ===== 大問7 対話文（語句補充） ===== */
{ no:7, title:"次の対話文の（　①　）〜（　④　）に入る最も適切な英語を、それぞれ1語で書きなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Yui:</span> Hi, Ben. Do you come to this music hall a lot?</span>'+
    '<span class="sp"><span class="who">Ben:</span> Yes, Yui. Today I （　①　） here at ten, and I listened to some songs.</span>'+
    '<span class="sp"><span class="who">Yui:</span> Nice. I think （　②　） all the students in our town love this hall.</span>'+
    '<span class="sp"><span class="who">Ben:</span> I agree. I usually come with my sister. How （　③　） songs do you listen to each day?</span>'+
    '<span class="sp"><span class="who">Yui:</span> About ten. My brother listens to more. He works here as a piano player.</span>'+
    '<span class="sp"><span class="who">Ben:</span> Oh, does he work here?</span>'+
    '<span class="sp"><span class="who">Yui:</span> Yes. I hope to become a piano player （　④　） my brother.</span>',
    items:[
    { type:"fill", label:"①", pt:2, stem:"①（過去形に）", answers:["came"], hint:"come の過去形" },
    { type:"fill", label:"②", pt:2, stem:"②（〜のほとんど）", answers:["almost"], hint:"almost 〜" },
    { type:"fill", label:"③", pt:2, stem:"③（数をたずねる）", answers:["many"], hint:"How 〜 songs" },
    { type:"fill", label:"④", pt:2, stem:"④（〜のような）", answers:["like"], hint:"〜 my brother" } ]}
]}

]};
