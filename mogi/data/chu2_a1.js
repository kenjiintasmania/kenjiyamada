/* data/chu2_a1.js ─ 中2 模擬テスト（A1）
   テンプレート data/chu2.js（正進社 2年 No.2 Aコース形式・大問1〜7・X/Yコース選択）と
   完全に同じ構造・同じ配点（合計100点）。内容は完全オリジナル。
   テーマ：学校の文化祭／料理／ペット（犬・猫）／音楽／週末の予定。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中2 模擬テスト（A1）",
sections: [

/* ===== 大問1 リスニングテスト ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[
  { intro:"(1) 絵の内容に合う英文を、ア〜ウから1つずつ選びなさい。英文は2回読まれます。", items:[
    { type:"mcq", label:"①", pt:2,
      stem:'<div class="scene">絵：女の子がギターをひいている。時計は4時30分。</div>',
      choices:[ E("She is playing the piano. It's four thirty."),
                E("She is playing the guitar. It's four thirty."),
                E("She is playing the guitar. It's five thirty.") ], answer:1 },
    { type:"mcq", label:"②", pt:2,
      stem:'<div class="scene">絵：男の子が公園でイヌを散歩させている。</div>',
      choices:[ E("He is walking his dog in the park."),
                E("He is washing his dog in the park."),
                E("He is running with his cat in the park.") ], answer:0 },
    { type:"mcq", label:"③", pt:2,
      stem:'<div class="scene">絵：男の人が台所でケーキを作っている。時計は3時。</div>',
      choices:[ E("He is eating a cake in the kitchen at three."),
                E("He is making a cake in the kitchen at three."),
                E("He is making a salad in the kitchen at four.") ], answer:1 } ] },

  { script:
      '<span class="sp"><span class="who">Jack:</span> Hi, Hana. What did you do last Saturday?</span>'+
      '<span class="sp"><span class="who">Hana:</span> Hi, Jack. I made cookies with my mother at home. How about you?</span>'+
      '<span class="sp"><span class="who">Jack:</span> I went to the music festival with my brother.</span>'+
      '<span class="sp"><span class="who">Hana:</span> Sounds fun. Does your brother play the guitar, too?</span>'+
      '<span class="sp"><span class="who">Jack:</span> No, he doesn\'t. He likes the drums. He practices them every Sunday.</span>'+
      '<span class="sp"><span class="who">Hana:</span> I see. Next weekend, my friend Lucy will come to my house, and we are going to bake a cake together.</span>'+
      '<span class="sp"><span class="who">Jack:</span> That\'s nice. Where does Lucy live?</span>'+
      '<span class="sp"><span class="who">Hana:</span> She lives near the school. She is coming to my house on Sunday morning.</span>',
    intro:"(2) ジャックとハナの対話を聞き、英語の質問の答えを選びなさい。対話と質問は1回読まれます。",
    items:[
    { type:"mcq", label:"①", pt:3, stem:E("What did Hana do last Saturday?"),
      choices:[ E("She went to the music festival."), E("She made cookies with her mother."),
                E("She played the guitar with Jack."), E("She baked a cake with Lucy.") ], answer:1 },
    { type:"mcq", label:"②", pt:3, stem:E("Does Jack's brother play the guitar?"),
      choices:[ E("Yes, he does."), E("Yes, he is."), E("No, he doesn't."), E("No, he isn't.") ], answer:2 },
    { type:"mcq", label:"③", pt:3, stem:E("What are Hana and Lucy going to do next weekend?"),
      choices:[ E("They are going to make cookies."), E("They are going to play the guitar."),
                E("They are going to go to the festival."), E("They are going to bake a cake.") ], answer:3 },
    { type:"mcq", label:"④", pt:3, stem:E("When will Lucy visit Hana?"),
      choices:[ E("On Saturday morning."), E("On Sunday morning."),
                E("On Sunday afternoon."), E("On Monday morning.") ], answer:1 } ] },

  { passage:
      '<b>転入生について（メモ）</b><br>名前：グレース・ミラー<br>出身：オーストラリア<br>'+
      '・毎朝ピアノをひく<br>・料理が好きで、週末によくケーキを焼く<br>・ネコ1匹とイヌ2匹を飼っている',
    script:
      '<span class="sp">We have a new student. Her name is Grace Miller. She is from Australia.</span>'+
      '<span class="sp">She plays the piano every morning. She likes cooking, and she often bakes cakes on weekends.</span>'+
      '<span class="sp">She has one cat and two dogs at home.</span>',
    intro:"(3) グレースについてのメモを見ながら放送を聞き、質問の答えを選びなさい。放送は2回読まれます。",
    items:[
    { type:"mcq", label:"①", pt:3, stem:E("Does Grace play the piano every morning?"),
      choices:[ E("Yes, she does."), E("No, she doesn't."), E("Yes, she is."), E("No, she isn't.") ], answer:0 },
    { type:"mcq", label:"②", pt:3, stem:E("How many dogs does Grace have?"),
      choices:[ E("One."), E("Two."), E("Three."), E("Four.") ], answer:1 } ] }
]},

/* ===== 大問2 読解（チラシ＋対話） ===== */
{ no:2, title:"次は、中学生のダイチ(Daichi)とエラ(Ella)の対話文です。チラシを参考にして読み、あとの問いに答えなさい。", groups:[
  { flyer:
    '<h4>★ さくら中学校 文化祭（Sakura Junior High Festival）★</h4>'+
    '<table><tr><th>ステージ発表（体育館）</th><th></th></tr>'+
    '<tr><td>10:00〜10:40</td><td>吹奏楽部の演奏</td></tr>'+
    '<tr><td>11:00〜11:40</td><td>ダンス部</td></tr>'+
    '<tr><td>13:00〜13:40</td><td>合唱コンクール</td></tr>'+
    '<tr><td>14:00〜14:40</td><td>演劇部</td></tr></table>'+
    '<div class="note">入場無料</div>'+
    '<table style="margin-top:6px"><tr><th>料理教室（調理室・毎月第1土曜日・参加無料）</th><th></th></tr>'+
    '<tr><td>定員</td><td>20名</td></tr>'+
    '<tr><td>時間</td><td>11:00〜／14:00〜</td></tr>'+
    '<tr><td>9月</td><td>カレーを作ろう</td></tr><tr><td>10月</td><td>ピザを作ろう</td></tr>'+
    '<tr><td>11月</td><td>クッキーを作ろう</td></tr><tr><td>12月</td><td>ケーキを作ろう</td></tr></table>'+
    '<div class="note">・10分前に集合してください</div>',
    passage:
    '<span class="sp"><span class="who">Ella:</span> Daichi, have you seen this flyer?</span>'+
    '<span class="sp"><span class="who">Daichi:</span> Hi, Ella. Yes. It\'s a flyer for the Sakura Junior High Festival. On the stage we can enjoy the (　①　) and some dances.</span>'+
    '<span class="sp"><span class="who">Ella:</span> The stage shows are popular. The school also has a cooking class on the (　②　) Saturday of every month. Only (　③　) students can join. I joined last month and made cookies.</span>'+
    '<span class="sp"><span class="who">Daichi:</span> That sounds interesting. I want to join next month. Can you come with me?</span>'+
    '<span class="sp"><span class="who">Ella:</span> Yes, but I can\'t come in the morning. I have a piano lesson then. I\'m free in the afternoon.</span>'+
    '<span class="sp"><span class="who">Daichi:</span> That\'s OK. I want to watch the chorus contest.</span>'+
    '<span class="sp"><span class="who">Ella:</span> The chorus starts at one, so let\'s meet at twelve fifty.</span>'+
    '<span class="sp"><span class="who">Daichi:</span> Good. Let\'s join the cooking class after the chorus.</span>'+
    '<span class="sp"><span class="who">Ella:</span> Sure. We can make a cake that day. I can\'t wait!</span>',
    note:'語注：flyer チラシ／stage ステージ／chorus contest 合唱コンクール／be free ひまである',
    items:[
    { type:"fill", label:"(1)①", pt:3, stem:"①に入る最も適切な英語を1語で書きなさい。", answers:["music"], hint:"1語・音楽" },
    { type:"fill", label:"(1)②", pt:3, stem:"②に入る最も適切な英語を1語で書きなさい。", answers:["first"], hint:"1語・第1の" },
    { type:"fill", label:"(2)③", pt:3, stem:"チラシと対話に合うよう、③に入る適切な数字を書きなさい。", answers:["20","twenty"], hint:"数字" },
    { type:"mcq", label:"(3)", pt:4, stem:"ダイチとエラが文化祭で鑑賞・参加するイベントの組み合わせとして、最も適切なものを選びなさい。",
      choices:[ "11:00 料理教室　→　13:00 合唱コンクール",
                "13:00 合唱コンクール　→　14:00 料理教室",
                "10:00 吹奏楽部　→　11:00 料理教室",
                "13:00 合唱コンクール　→　14:00 演劇部" ], answer:1 } ]}
]},

/* ===== 大問3 対話文（語句補充・記述） ===== */
{ no:3, title:"次は、中学生のソラ(Sora)とオリバー(Oliver)の対話文です。よく読んで、あとの問いに答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Sora:</span> Hi, Oliver. I saw you at Aoba Park last Sunday morning.</span>'+
    '<span class="sp"><span class="who">Oliver:</span> Oh, Sora. Yes, I was there. I walked my dog that day.</span>'+
    '<span class="sp"><span class="who">Sora:</span> （　ⓐ　）</span>'+
    '<span class="sp"><span class="who">Oliver:</span> No, I didn\'t. I only walked my dog. He is a big white dog.</span>'+
    '<span class="sp"><span class="who">Sora:</span> I see. I often take pictures of dogs.</span>'+
    '<span class="sp"><span class="who">Oliver:</span> <u>Me, too.</u> Look, these are my dog\'s pictures.</span>'+
    '<span class="sp"><span class="who">Sora:</span> They are nice. （　ⓑ　）</span>'+
    '<span class="sp"><span class="who">Oliver:</span> I took them at the river last month.</span>'+
    '<span class="sp"><span class="who">Sora:</span> Your family really likes dogs. （　ⓒ　）</span>'+
    '<span class="sp"><span class="who">Oliver:</span> Yes, she does. She has three dogs at her house. She often walks them in the morning.</span>'+
    '<span class="sp"><span class="who">Sora:</span> I\'m interested in dogs. Can I see them?</span>'+
    '<span class="sp"><span class="who">Oliver:</span> Sure. Come to my house next Sunday.</span>',
    items:[
    { type:"bankpick", label:"(1)ⓐ", pt:3, stem:"ⓐに入る最も適切な文を、次のア〜カから選びなさい。", answer:0,
      bank:[E("Did you play tennis there?"),E("Did you walk your dog there?"),E("Where did you take these pictures?"),
            E("How many dogs do you have?"),E("Is that your cat in the pictures?"),E("Does your grandmother like dogs, too?")] },
    { type:"bankpick", label:"(1)ⓑ", pt:3, stem:"ⓑに入る最も適切な文を、ア〜カから選びなさい。", answer:2,
      bank:[E("Did you play tennis there?"),E("Did you walk your dog there?"),E("Where did you take these pictures?"),
            E("How many dogs do you have?"),E("Is that your cat in the pictures?"),E("Does your grandmother like dogs, too?")] },
    { type:"bankpick", label:"(1)ⓒ", pt:3, stem:"ⓒに入る最も適切な文を、ア〜カから選びなさい。", answer:5,
      bank:[E("Did you play tennis there?"),E("Did you walk your dog there?"),E("Where did you take these pictures?"),
            E("How many dogs do you have?"),E("Is that your cat in the pictures?"),E("Does your grandmother like dogs, too?")] },
    { type:"mcq", label:"(2)", pt:4, stem:"下線部 <span class=\"en\">Me, too.</span> は、どのようなことに対するオリバーの発言ですか。最も適切なものを、ア〜エから選びなさい。",
      choices:[ "ソラが「青葉公園でオリバーを見た」と言ったこと。",
                "ソラが「犬の写真をよくとる」と言ったこと。",
                "ソラが「犬が好きだ」と言ったこと。",
                "オリバーの犬が大きくて白いこと。" ], answer:1 },
    { type:"fill", label:"(3)", pt:4, stem:"対話の内容について、次の質問に主語と動詞を含む英文1文で答えなさい。<br>"+E("What does Oliver's grandmother have at her house?"),
      answers:["she has three dogs at her house","she has three dogs","she has three dogs at her home"], hint:"She has 〜." } ]}
]},

/* ===== 大問4 英作文 ===== */
{ no:4, title:"次の問いに答えなさい。", groups:[
  { intro:"(1) 次は、ナナミ(Nanami)がベン(Ben)に質問しているところです。ベンの返事に合うように、下線部に適切な英語を書き、英文を完成させなさい。",
    items:[
    { type:"fill", label:"①", pt:4,
      stem:'<div class="scene">絵：ベンが手作りの帽子（cap）を持っている。</div>'+
           '<span class="who" style="font-family:var(--en)">Nanami:</span> '+E("（　①　） this?")+'　'+
           '<span class="who" style="font-family:var(--en)">Ben:</span> '+E("It's mine. My brother made it."),
      answers:["whose cap is this","whose cap is this one","whose hat is this"], hint:"Whose で始める英文" } ] },
  { intro:"(2) 次の語を正しく並べて英文を完成させなさい。",
    items:[
    { type:"wordorder", label:"", pt:6, stem:"次の語を正しく並べて英文を完成させなさい。",
      words:["I","sometimes","cook","breakfast","for","everyone"], answer:"I sometimes cook breakfast for everyone." } ] }
]},

/* ===== 大問5 長文読解 ===== */
{ no:5, title:"次の英文は、中学生のハルト(Haruto)が書いたものです。(1)〜(4)に答えなさい。", groups:[
  { passage:
    'Last spring, I became a first-year student at Sakura Junior High School. I love music very much. （　ア　） '+
    'One morning in April, I saw a poster about the school festival on the wall. I wanted to play music at the festival. （　イ　）<br><br>'+
    'I talked to my friend Kaito. He plays the guitar very well. He said, "Let\'s make a band together!" （　ウ　） '+
    'We asked two more friends, and soon we had four members.<br><br>'+
    'We practiced every weekend. It was hard, but it was a lot of fun. Our music teacher, Mr. Green, often helped us. '+
    'He said, "You are getting better. I will listen to your show at the festival." <u>That</u> made me very happy.<br><br>'+
    'The school festival is in November. Next month, we are going to play three songs on the stage. I can\'t wait to see everyone\'s smiles.',
    passageEn:true,
    note:'語注：poster ポスター／member メンバー／getting better 上達している／stage ステージ',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"次の英文を入れるのに最も適切な場所を、本文中の（ア）〜（ウ）から選びなさい。<br>"+E("So we needed more members."),
      choices:["（ア）","（イ）","（ウ）"], answer:2 },
    { type:"mcq", label:"(2)", pt:4, stem:"下線部 <span class=\"en\">That</span> が指す内容として最も適切なものを、ア〜エから選びなさい。",
      choices:[ "カイトが、ギターがとても上手なこと。",
                "グリーン先生が、文化祭で自分たちの演奏を聴くと言ってくれたこと。",
                "友達が2人、バンドに加わってくれたこと。",
                "ハルトが、毎週末に練習したこと。" ], answer:1 },
    { type:"mcq", label:"(3)①", pt:3, stem:E("When is the school festival?"),
      choices:[ E("It is in April."), E("It is in November."), E("It is in spring."), E("It is next weekend.") ], answer:1 },
    { type:"mcq", label:"(3)②", pt:3, stem:E("How many members are there in Haruto's band?"),
      choices:[ E("There are two."), E("There are three."), E("There are four."), E("There are five.") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"本文の内容に合うものを、ア〜エから1つ選びなさい。",
      choices:[ E("Haruto's band will play at the festival next weekend."),
                E("Mr. Green made a band for the students."),
                E("Haruto started a band with his friends for the school festival."),
                E("Haruto played the guitar better than Kaito.") ], answer:2 } ]}
]},

/* ===== 大問6 並べかえ（X/Yコース選択） ===== */
{ no:6, title:"並べかえ（X・Yコースのどちらかを選んで答えなさい）", lead:"［　］内の語を正しく並べかえ、英文を完成させましょう。文の最初にくる語も小文字で示しています。",
  courses:[
    { name:"Xコース", items:[
      { type:"wordorder", label:"(1)", pt:3, stem:'A:［ '+E("will / what / you / cook")+' ］ for the party?　B: I will make a pizza.',
        words:["will","what","you","cook"], answer:"What will you cook for the party?",
        display:"What will you cook for the party?" },
      { type:"wordorder", label:"(2)", pt:3, stem:'A:［ '+E("going / are / to / you")+' ］ join the festival next week?　B: Yes, I am.',
        words:["going","are","to","you"], answer:"Are you going to join the festival next week?",
        display:"Are you going to join the festival next week?" },
      { type:"wordorder", label:"(3)", pt:3, stem:'A:［ '+E("if / are / you / free")+' ］ this weekend, let\'s go to the concert.　B: Sounds good.',
        words:["if","are","you","free"], answer:"If you are free this weekend, let's go to the concert.",
        display:"If you are free this weekend, let's go to the concert." },
      { type:"wordorder", label:"(4)", pt:3, stem:'A:［ '+E("was / your / brother / playing")+' ］ the guitar at seven yesterday?　B: Yes, he was.',
        words:["was","your","brother","playing"], answer:"Was your brother playing the guitar at seven yesterday?",
        display:"Was your brother playing the guitar at seven yesterday?" } ] },
    { name:"Yコース", items:[
      { type:"wordorder", label:"(1)", pt:3, stem:'A:［ '+E("you / were / cooking / what")+' ］ at six last night?　B: I was making curry.',
        words:["you","were","cooking","what"], answer:"What were you cooking at six last night?",
        display:"What were you cooking at six last night?" },
      { type:"wordorder", label:"(2)", pt:3, stem:'A: I stayed home ［ '+E("was / because / it / raining")+' ］ hard yesterday.　B: I see.',
        words:["was","because","it","raining"], answer:"I stayed home because it was raining hard yesterday.",
        display:"I stayed home because it was raining hard yesterday." },
      { type:"wordorder", label:"(3)", pt:3, stem:'A: I use this room ［ '+E("to / practice / the / drums")+' ］ every day.　B: Cool.',
        words:["to","practice","the","drums"], answer:"I use this room to practice the drums every day.",
        display:"I use this room to practice the drums every day." },
      { type:"wordorder", label:"(4)", pt:3, stem:'A:［ '+E("if / you / are / hungry")+' ］ now, let\'s eat lunch.　B: OK.',
        words:["if","you","are","hungry"], answer:"If you are hungry now, let's eat lunch.",
        display:"If you are hungry now, let's eat lunch." } ] }
  ] },

/* ===== 大問7 対話文（語句補充） ===== */
{ no:7, title:"次の対話文の（　①　）〜（　④　）に入る最も適切な英語を、それぞれ1語で書きなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Rin:</span> Hi, Aoi. Do you come to this music room a lot?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> Yes, Rin. Today I （　①　） here at four, and I practiced the piano.</span>'+
    '<span class="sp"><span class="who">Rin:</span> Nice. I think （　②　） all the students in our class love music.</span>'+
    '<span class="sp"><span class="who">Aoi:</span> I agree. I usually come with my sister. How （　③　） songs do you play each week?</span>'+
    '<span class="sp"><span class="who">Rin:</span> About ten. My brother plays more. He plays the guitar in a band.</span>'+
    '<span class="sp"><span class="who">Aoi:</span> Oh, does he play in a band?</span>'+
    '<span class="sp"><span class="who">Rin:</span> Yes. I hope to become a guitarist （　④　） my brother.</span>',
    items:[
    { type:"fill", label:"①", pt:2, stem:"①（過去形に）", answers:["came"], hint:"come の過去形" },
    { type:"fill", label:"②", pt:2, stem:"②（〜のほとんど）", answers:["almost"], hint:"almost 〜" },
    { type:"fill", label:"③", pt:2, stem:"③（数をたずねる）", answers:["many"], hint:"How 〜 songs" },
    { type:"fill", label:"④", pt:2, stem:"④（〜のような）", answers:["like"], hint:"〜 my brother" } ]}
]}

]};
