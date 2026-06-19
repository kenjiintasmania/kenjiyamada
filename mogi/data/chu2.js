/* data/chu2.js ─ 中2 模擬テスト
   出典：正進社 過去問「2年 No.2 Aコース」（大問1〜7・X/Yコース選択）。
   出題傾向・問題数は完全一致。季節・数字・名前・場所などの細部のみ入れかえ。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中2 模擬テスト",
sections: [

/* ===== 大問1 リスニングテスト ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[
  { intro:"(1) 絵の内容に合う英文を、ア〜ウから1つずつ選びなさい。英文は2回読まれます。", items:[
    { type:"mcq", label:"①", pt:2,
      stem:'<div class="scene">絵：男の子が時計の下でテレビゲームをしている。時計は7時45分。</div>',
      choices:[ E("The boy is reading a book. It's seven forty-five."),
                E("The boy is playing a video game. It's seven forty-five."),
                E("The boy is playing a video game. It's eight fifteen.") ], answer:1 },
    { type:"mcq", label:"②", pt:2,
      stem:'<div class="scene">絵：女の子が窓をあらっている。</div>',
      choices:[ E("She is washing the windows."),
                E("She is washing her hands."),
                E("She is opening the windows.") ], answer:0 },
    { type:"mcq", label:"③", pt:2,
      stem:'<div class="scene">絵：男の人が台所でカレーを作っている。時計は6時。</div>',
      choices:[ E("He is eating curry in the kitchen at six."),
                E("He is cooking curry in the kitchen at six."),
                E("He is cooking soup in the kitchen at seven.") ], answer:1 } ] },

  { script:
      '<span class="sp"><span class="who">Mike:</span> Hi, Saki. What did you do last Sunday?</span>'+
      '<span class="sp"><span class="who">Saki:</span> Hi, Mike. I read a book about animals at home. How about you?</span>'+
      '<span class="sp"><span class="who">Mike:</span> I played baseball with my friends in the park.</span>'+
      '<span class="sp"><span class="who">Saki:</span> Sounds fun. Does your sister play baseball, too?</span>'+
      '<span class="sp"><span class="who">Mike:</span> No, she doesn\'t. She likes tennis. She practices it every Saturday.</span>'+
      '<span class="sp"><span class="who">Saki:</span> I see. Next week my friend Kumi will come to my house, and we will cook lunch together.</span>'+
      '<span class="sp"><span class="who">Mike:</span> That\'s nice. Where does Kumi live?</span>'+
      '<span class="sp"><span class="who">Saki:</span> She lives near the station. She is coming over this Sunday evening.</span>',
    intro:"(2) マイクとサキの対話を聞き、英語の質問の答えを選びなさい。対話と質問は1回読まれます。",
    items:[
    { type:"mcq", label:"①", pt:3, stem:E("What did Mike do last Sunday?"),
      choices:[ E("He read a book about animals."), E("He played tennis with his sister."),
                E("He played baseball with his friends."), E("He cooked lunch with Kumi.") ], answer:2 },
    { type:"mcq", label:"②", pt:3, stem:E("Does Mike's sister play baseball?"),
      choices:[ E("No, she doesn't."), E("Yes, she does."), E("No, she isn't."), E("Yes, she is.") ], answer:0 },
    { type:"mcq", label:"③", pt:3, stem:E("Where will Saki and Kumi cook lunch?"),
      choices:[ E("At Saki's home."), E("At a café near the station."), E("At Kumi's home."), E("At school.") ], answer:0 },
    { type:"mcq", label:"④", pt:3, stem:E("When will Kumi visit Saki?"),
      choices:[ E("On Sunday morning."), E("On Sunday evening."),
                E("On Saturday evening."), E("On Monday afternoon.") ], answer:1 } ] },

  { passage:
      '<b>転入生について（メモ）</b><br>名前：リサ・ブラウン<br>出身：カナダ<br>'+
      '・毎日バイオリンをひく<br>・理科が好きで、週末によく実験する<br>・イヌ1匹とネコ2匹を飼っている',
    script:
      '<span class="sp">We have a new student. Her name is Lisa Brown. She is from Canada.</span>'+
      '<span class="sp">She plays the violin every day. She likes science, and she often does experiments on weekends.</span>'+
      '<span class="sp">She has one dog and two cats at home.</span>',
    intro:"(3) リサについてのメモを見ながら放送を聞き、質問の答えを選びなさい。放送は2回読まれます。",
    items:[
    { type:"mcq", label:"①", pt:3, stem:E("Does Lisa play the violin every day?"),
      choices:[ E("Yes, she does."), E("No, she doesn't."), E("Yes, she is."), E("No, she isn't.") ], answer:0 },
    { type:"mcq", label:"②", pt:3, stem:E("How many cats does Lisa have?"),
      choices:[ E("One."), E("Two."), E("Three."), E("Four.") ], answer:1 } ] }
]},

/* ===== 大問2 読解（チラシ＋対話） ===== */
{ no:2, title:"次は、中学生のケンタとトム(Tom)の対話文です。チラシを参考にして読み、あとの問いに答えなさい。", groups:[
  { flyer:
    '<h4>★ ひかり宇宙博物館（Hikari Space Museum）★</h4>'+
    '<table><tr><th>プラネタリウム（毎日）</th><th></th></tr>'+
    '<tr><td>10:00〜10:50</td><td>冬の星空ショー</td></tr>'+
    '<tr><td>11:00〜11:50</td><td>映画「月への旅」</td></tr>'+
    '<tr><td>13:30〜14:20</td><td>冬の星空ショー</td></tr>'+
    '<tr><td>14:30〜15:20</td><td>映画「宇宙の動物たち」</td></tr></table>'+
    '<div class="note">料金　大人 500円／中・高校生 300円／小学生 200円</div>'+
    '<table style="margin-top:6px"><tr><th>工作教室（毎月第1日曜日・参加無料）</th><th></th></tr>'+
    '<tr><td>定員</td><td>（　③　）名</td></tr>'+
    '<tr><td>時間</td><td>13:00〜／15:00〜</td></tr>'+
    '<tr><td>12月</td><td>ぼうしを作ろう</td></tr><tr><td>1月</td><td>けん玉を作ろう</td></tr>'+
    '<tr><td>2月</td><td>ロケットを作ろう</td></tr><tr><td>3月</td><td>たこを作ろう</td></tr></table>'+
    '<div class="note">・10分前に集合してください</div>',
    passage:
    '<span class="sp"><span class="who">Tom:</span> Kenta, have you seen this flyer?</span>'+
    '<span class="sp"><span class="who">Kenta:</span> Hi, Tom. Yes. It\'s a flyer from Hikari Space Museum. There we can study the (　①　) and enjoy some space movies.</span>'+
    '<span class="sp"><span class="who">Tom:</span> The planetarium is popular. The museum also has a craft class on the (　②　) Sunday of every month. (　③　) students can join. I joined last month and made a hat.</span>'+
    '<span class="sp"><span class="who">Kenta:</span> That sounds interesting. I want to visit next month. Can you go with me?</span>'+
    '<span class="sp"><span class="who">Tom:</span> Yes, but I can\'t go in the morning. I practice the piano then. I\'m free in the afternoon.</span>'+
    '<span class="sp"><span class="who">Kenta:</span> That\'s OK. I want to watch the show about the winter night sky.</span>'+
    '<span class="sp"><span class="who">Tom:</span> Then let\'s meet at one twenty, so we can watch the show from one thirty.</span>'+
    '<span class="sp"><span class="who">Kenta:</span> Good. Let\'s join the craft class after the planetarium.</span>'+
    '<span class="sp"><span class="who">Tom:</span> Sure. We can make rockets that day. I can\'t wait!</span>',
    note:'語注：flyer チラシ／planetarium プラネタリウム／space 宇宙／night sky 夜空',
    items:[
    { type:"fill", label:"(1)①", pt:3, stem:"①に入る最も適切な英語を1語で書きなさい。", answers:["stars"], hint:"1語・星" },
    { type:"fill", label:"(1)②", pt:3, stem:"②に入る最も適切な英語を1語で書きなさい。", answers:["first"], hint:"1語・第1の" },
    { type:"fill", label:"(2)③", pt:3, stem:"チラシと対話に合うよう、③に入る適切な数字を書きなさい。", answers:["30","thirty"], hint:"数字" },
    { type:"mcq", label:"(3)", pt:4, stem:"ケンタとトムが博物館で参加するイベントの組み合わせとして、最も適切なものを選びなさい。",
      choices:[ "13:00 工作教室　→　13:30 プラネタリウム",
                "13:30 プラネタリウム　→　15:00 工作教室",
                "10:00 プラネタリウム　→　13:00 工作教室",
                "13:30 プラネタリウム　→　14:30 映画" ], answer:1 } ]}
]},

/* ===== 大問3 対話文（語句補充・記述） ===== */
{ no:3, title:"次は、中学生のケン(Ken)とエマ(Emma)の対話文です。よく読んで、あとの問いに答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Ken:</span> Hi, Emma. I saw you at Midori Park last Sunday morning.</span>'+
    '<span class="sp"><span class="who">Emma:</span> Oh, Ken. Yes, I was there. My brother had a soccer game that day.</span>'+
    '<span class="sp"><span class="who">Ken:</span> （　ⓐ　）</span>'+
    '<span class="sp"><span class="who">Emma:</span> No, I didn\'t. I watched my brother\'s game. He is a good player.</span>'+
    '<span class="sp"><span class="who">Ken:</span> I see. I often take pictures of games.</span>'+
    '<span class="sp"><span class="who">Emma:</span> <u>Me, too.</u> Look, these are my brother\'s pictures.</span>'+
    '<span class="sp"><span class="who">Ken:</span> They are nice. （　ⓑ　）</span>'+
    '<span class="sp"><span class="who">Emma:</span> I took them at the city stadium last month.</span>'+
    '<span class="sp"><span class="who">Ken:</span> Your family really likes soccer. （　ⓒ　）</span>'+
    '<span class="sp"><span class="who">Emma:</span> Yes, she does. She has many old soccer photos in her room. She often talks about our town\'s old team.</span>'+
    '<span class="sp"><span class="who">Ken:</span> I\'m interested in the history of the team. Can I see the photos?</span>'+
    '<span class="sp"><span class="who">Emma:</span> Sure. Come to my house next Sunday.</span>',
    items:[
    { type:"bankpick", label:"(1)ⓐ", pt:3, stem:"ⓐに入る最も適切な文を、次のア〜カから選びなさい。", answer:1,
      bank:[E("Did you walk your dog there?"),E("Did you play in the game?"),E("Where did you take these pictures?"),
            E("How do you get there?"),E("Is that your brother in the photos?"),E("Does your grandmother like soccer, too?")] },
    { type:"bankpick", label:"(1)ⓑ", pt:3, stem:"ⓑに入る最も適切な文を、ア〜カから選びなさい。", answer:2,
      bank:[E("Did you walk your dog there?"),E("Did you play in the game?"),E("Where did you take these pictures?"),
            E("How do you get there?"),E("Is that your brother in the photos?"),E("Does your grandmother like soccer, too?")] },
    { type:"bankpick", label:"(1)ⓒ", pt:3, stem:"ⓒに入る最も適切な文を、ア〜カから選びなさい。", answer:5,
      bank:[E("Did you walk your dog there?"),E("Did you play in the game?"),E("Where did you take these pictures?"),
            E("How do you get there?"),E("Is that your brother in the photos?"),E("Does your grandmother like soccer, too?")] },
    { type:"mcq", label:"(2)", pt:4, stem:"下線部 <span class=\"en\">Me, too.</span> は、どのようなことに対するエマの発言ですか。最も適切なものを、ア〜エから選びなさい。",
      choices:[ "ケンが「試合の写真をよくとる」と言ったこと。",
                "ケンが「弟はよい選手だ」と言ったこと。",
                "ケンが「ミドリ公園にいた」と言ったこと。",
                "ケンが「サッカーが好きだ」と言ったこと。" ], answer:0 },
    { type:"fill", label:"(3)", pt:4, stem:"対話の内容について、次の質問に主語と動詞を含む英文1文で答えなさい。<br>"+E("What does Emma's grandmother have in her room?"),
      answers:["she has many old soccer photos in her room","she has many old soccer photos","she has old soccer photos in her room"], hint:"She has 〜." } ]}
]},

/* ===== 大問4 英作文 ===== */
{ no:4, title:"次の問いに答えなさい。", groups:[
  { intro:"(1) 次は、ミカ(Mika)がレオ(Leo)に質問しているところです。レオの返事に合うように、下線部に適切な英語を書き、英文を完成させなさい。",
    items:[
    { type:"fill", label:"①", pt:4,
      stem:'<div class="scene">絵：レオが手作りのペンケース（pen case）を持っている。</div>'+
           '<span class="who" style="font-family:var(--en)">Mika:</span> '+E("（　①　） this?")+'　'+
           '<span class="who" style="font-family:var(--en)">Leo:</span> '+E("It's mine. My sister made it."),
      answers:["whose pen case is this","whose pencil case is this","whose pen case is this one"], hint:"Whose で始める英文" } ] },
  { intro:"(2) 英語の授業で、あなたの夕方（夕食後）の過ごし方について話します。下の条件に合うように英文を書きなさい。",
    note:"【条件】① 主語と動詞を含む英文を2文以上で書く。② 全体で8語以上にする（. , ? などの符号は語数に含めない）。",
    items:[
    { type:"wordorder", label:"", pt:6, stem:"夕方（夕食後）の過ごし方を表す英文です。次の語を正しく並べて英文を完成させなさい。",
      words:["after","do","homework","I","my","dinner"], answer:"I do my homework after dinner." } ] }
]},

/* ===== 大問5 長文読解 ===== */
{ no:5, title:"次の英文は、中学生のミサキ(Misaki)が書いたものです。(1)〜(4)に答えなさい。", groups:[
  { passage:
    'Last spring, I visited my uncle\'s house in Midori City. （　ア　） One morning, I walked to a small park near his house. '+
    'There I found a red umbrella under a tree. （　イ　） I picked it up and took it to the park office. '+
    'An old man there said, "Thank you. I will look for the owner." （　ウ　）<br><br>'+
    'A week later, on Sunday, May 5, I got a phone call. It was from a woman named Ms. Mori. '+
    'She said, "You found my umbrella. Thank you very much." She wanted to meet me, so we met at the park the next day.<br><br>'+
    'Ms. Mori gave me a small key ring. She said, "My granddaughter, Aya, made this for you. '+
    'She lives in America, and she makes key rings as a hobby." <u>That</u> made me very glad. The key ring had a little bird on it.<br><br>'+
    'Ms. Mori often talks with Aya on the Internet. Aya visits Japan every winter. '+
    'Next winter, I will meet Aya and say thank you to her.',
    passageEn:true,
    note:'語注：owner 持ち主／granddaughter 孫娘／key ring キーホルダー／as a hobby しゅみで',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"次の英文を入れるのに最も適切な場所を、本文中の（ア）〜（ウ）から選びなさい。<br>"+E("Then I felt really glad."),
      choices:["（ア）","（イ）","（ウ）"], answer:2 },
    { type:"mcq", label:"(2)", pt:4, stem:"下線部 <span class=\"en\">That</span> が指す内容として最も適切なものを、ア〜エから選びなさい。",
      choices:[ "アヤ（モリさんの孫娘）が、ミサキのためにキーホルダーを手作りしてくれたこと。",
                "モリさんが、ミサキのために赤いかさを買ってくれたこと。",
                "アヤがアメリカからミサキに会いに来てくれたこと。",
                "ミサキが公園でモリさんのかさを見つけたこと。" ], answer:0 },
    { type:"mcq", label:"(3)①", pt:3, stem:E("When did Misaki get a phone call from Ms. Mori?"),
      choices:[ E("On May 5."), E("On May 6."), E("Last spring."), E("Next winter.") ], answer:0 },
    { type:"mcq", label:"(3)②", pt:3, stem:E("What was the key ring?"),
      choices:[ E("It was a present from Ms. Mori to Aya."), E("It was a present for Aya's mother."),
                E("It was a present from Aya to Misaki."), E("It was a present from Aya's mother.") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"本文の内容に合うものを、ア〜エから1つ選びなさい。",
      choices:[ E("Misaki found a red umbrella in a park and took it to the park office."),
                E("Misaki visited her uncle's house every winter."),
                E("Ms. Mori made the key ring for Misaki last Sunday."),
                E("Aya lives in Japan and visits America every winter.") ], answer:0 } ]}
]},

/* ===== 大問6 並べかえ（X/Yコース選択） ===== */
{ no:6, title:"並べかえ（X・Yコースのどちらかを選んで答えなさい）", lead:"［　］内の語を正しく並べかえ、英文を完成させましょう。文の最初にくる語も小文字で示しています。",
  courses:[
    { name:"Xコース", items:[
      { type:"wordorder", label:"(1)", pt:3, stem:'A:［ '+E("watch / where / you / will")+' ］ the stars tonight?　B: At the hill.',
        words:["watch","where","you","will"], answer:"Where will you watch the stars tonight?",
        display:"Where will you watch the stars tonight?" },
      { type:"wordorder", label:"(2)", pt:3, stem:'A:［ '+E("you / to / going / are")+' ］ visit your aunt next Sunday?　B: Yes, I am.',
        words:["you","to","going","are"], answer:"Are you going to visit your aunt next Sunday?",
        display:"Are you going to visit your aunt next Sunday?" },
      { type:"wordorder", label:"(3)", pt:3, stem:'A:［ '+E("are / you / if / free")+' ］ tomorrow, let\'s go to the zoo.　B: Sounds good.',
        words:["are","you","if","free"], answer:"If you are free tomorrow, let's go to the zoo.",
        display:"If you are free tomorrow, let's go to the zoo." },
      { type:"wordorder", label:"(4)", pt:3, stem:'A:［ '+E("was / your / playing / sister")+' ］ the piano at five yesterday?　B: Yes, she was.',
        words:["was","your","playing","sister"], answer:"Was your sister playing the piano at five yesterday?",
        display:"Was your sister playing the piano at five yesterday?" } ] },
    { name:"Yコース", items:[
      { type:"wordorder", label:"(1)", pt:3, stem:'A:［ '+E("you / TV / were / watching")+' ］ at eight last night?　B: Yes, I was.',
        words:["you","TV","were","watching"], answer:"Were you watching TV at eight last night?",
        display:"Were you watching TV at eight last night?" },
      { type:"wordorder", label:"(2)", pt:3, stem:'A: I didn\'t go out ［ '+E("because / it / was / very")+' ］ cold this morning.　B: I see.',
        words:["because","it","was","very"], answer:"I didn't go out because it was very cold this morning.",
        display:"I didn't go out because it was very cold this morning." },
      { type:"wordorder", label:"(3)", pt:3, stem:'A: I went to ［ '+E("to / my / see / Osaka")+' ］ grandmother last week.　B: That\'s nice.',
        words:["to","my","see","Osaka"], answer:"I went to Osaka to see my grandmother last week.",
        display:"I went to Osaka to see my grandmother last week." },
      { type:"wordorder", label:"(4)", pt:3, stem:'A:［ '+E("are / you / if / free")+' ］ tomorrow, come to the festival with me.　B: OK.',
        words:["are","you","if","free"], answer:"If you are free tomorrow, come to the festival with me.",
        display:"If you are free tomorrow, come to the festival with me." } ] }
  ] },

/* ===== 大問7 対話文（語句補充） ===== */
{ no:7, title:"次の対話文の（　①　）〜（　④　）に入る最も適切な英語を、それぞれ1語で書きなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Nao:</span> Hi, Mei. Do you come to this library a lot?</span>'+
    '<span class="sp"><span class="who">Mei:</span> Yes, Nao. Today I （　①　） here at nine, and I read some books.</span>'+
    '<span class="sp"><span class="who">Nao:</span> Nice. I think （　②　） all the students here love this library.</span>'+
    '<span class="sp"><span class="who">Mei:</span> I agree. I usually come with my brother. How （　③　） books do you read each week?</span>'+
    '<span class="sp"><span class="who">Nao:</span> About five. My sister reads more. She works here as a librarian.</span>'+
    '<span class="sp"><span class="who">Mei:</span> Oh, does she work here?</span>'+
    '<span class="sp"><span class="who">Nao:</span> Yes. I hope to become a librarian （　④　） my sister.</span>',
    items:[
    { type:"fill", label:"①", pt:2, stem:"①（過去形に）", answers:["came"], hint:"come の過去形" },
    { type:"fill", label:"②", pt:2, stem:"②（〜のほとんど）", answers:["almost"], hint:"almost 〜" },
    { type:"fill", label:"③", pt:2, stem:"③（数をたずねる）", answers:["many"], hint:"How 〜 books" },
    { type:"fill", label:"④", pt:2, stem:"④（〜のような）", answers:["like"], hint:"〜 her" } ]}
]}

]};
