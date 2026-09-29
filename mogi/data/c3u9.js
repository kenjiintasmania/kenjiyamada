/* data/c3u9.js ─ 中3 単元テスト⑨（初見・自動採点のみ）… テーマ：手話（sign language）を学ぶ／耳の不自由な人との交流（架空の Nagisa City）。内容はすべて新規。
   参照：factory/inputs/authoring_rules.md／factory/inputs/okayama_notes.md（3年目の分析＝提供PDFの形式・配点だけを踏襲）
        ／モデル mogi/data/chu3_341.js（大問1〜5・28問・100点の骨格）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。
   登場人物：Miku, Sho, Ms. Adams（ALT）, Mr. Hayashi（手話の先生）, Ms. Ono（耳の不自由な花屋の店主）。
   ※過去問および既存の模試データとの内容重複なし。
   ロック式：先生が /admin で「スタート」するまで問題は表示されない（exam.html の unit:true）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 単元テスト⑨",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ（英文1回読み・2問） */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the picture. Miku is moving her hands in front of a mirror, and Sho is sitting next to her and writing in his notebook.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵はどれですか。",
      choices:["鏡の前で手を動かすミクの横で、ショウが立って写真をとっている。","鏡の前で手を動かすミクの横で、ショウがすわってノートに書いている。",
               "ノートに書いているミクの横で、ショウが鏡の前で手を動かしている。","鏡の前で手を動かすミクの後ろで、ショウが本を読んでいる。"], answer:1 } ] },
  { script:'(2) Look at the table. Next week, the sign language club will meet twice. On Tuesday, the members will practice in the music room, and on Thursday, they will practice in the library.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う表（来週の手話クラブの練習予定）はどれですか。",
      choices:["火曜日：図書室、木曜日：音楽室","月曜日：音楽室、木曜日：図書室",
               "火曜日：音楽室、金曜日：図書室","火曜日：音楽室、木曜日：図書室"], answer:3 } ] },

  /* 問題B：チャイムの応答（対話の最後への応答・2回読み・2問） */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> I want to say "thank you" to Mr. Hayashi in sign language. Can you show me how?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("No, I have never been there."), E("Sure. Watch my hands carefully."),
                E("Yes, it was built last year."), E("Because he is a kind teacher.") ], answer:1 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> Why did you start learning sign language?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I started it at the community center."), E("Yes, I practice it every day."),
                E("Because my neighbor can't hear, and I want to talk with her."), E("It takes about ten minutes.") ], answer:2 } ] },

  /* 問題C：メモの空所補充（英語1語×3・2回読み） */
  { intro:"問題C　ミク(Miku)が、手話教室の先生のハヤシ(Mr. Hayashi)さんの説明を聞いて、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, everyone. I\'m Mr. Hayashi. Thank you for coming to the sign language class today.</span>'+
      '<span class="sp">Next month, in <b>November</b>, we will visit a café in Nagisa City. The staff there cannot hear, so you will order your drinks in sign language.</span>'+
      '<span class="sp">Before that, please practice the signs for food and drinks. There are <b>sixteen</b> signs on the paper I gave you today.</span>'+
      '<span class="sp">On the day of the visit, please come to the <b>library</b> of the community center at ten, not to this room. We will walk to the café from there.</span>',
    passage:'<b>ミクのメモ</b><br>Mr. Hayashi\'s talk<br>— We will visit a café in （　あ　）. The staff there cannot hear.<br>'+
            '— Practice the （　い　） signs for food and drinks on the paper.<br>'+
            '— On the day of the visit, go to the （　う　） at ten.',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）11月", answers:["November"], hint:"英語1語（月の名前）" },
    { type:"fill", label:"い", pt:2, stem:"（い）紙に書かれている手話の数", answers:["sixteen","16"], hint:"英語1語（数を表す語）" },
    { type:"fill", label:"う", pt:2, stem:"（う）図書室", answers:["library"], hint:"英語1語" } ] },

  /* 問題D：説明＋人物発言（内容一致選択＋指定語を含む3語の英語） */
  { intro:"問題D　あなたとクラスメイトのショウ(Sho)が、公民館で行われる手話イベントの手伝いについての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next Sunday, Nagisa Community Center will hold Sign Language Day, and we need help from junior high school students. You can choose one job.</span>'+
      '<span class="sp">In Job A, you will teach simple signs to small children in the big hall. In Job B, you will take a video of the sign language songs with Mr. Hayashi. In Job C, you will welcome visitors at the door in sign language.</span>'+
      '<span class="sp">The event starts at one in the afternoon and finishes at four. Please wear the blue T-shirt of the class.</span>'+
      '<span class="sp"><span class="who">Sho:</span> I\'m shy with small children, and I\'m not good at talking in front of many people. But I love using my camera. Which job should I choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["生徒は好きな仕事を2つまで選ぶことができる。","参加する生徒は、白いTシャツを着ていく。",
               "イベントは午後1時に始まり、午後4時に終わる。","仕事Aでは、大きなホールで大人に手話を教える。"], answer:2 },
    { type:"fill", label:"(2)", pt:3,
      stem:"ショウの発言に対して、あなたはどのように答えますか。書き出しに続けて（　）に video を含む3語の英語を書き、英文を完成させなさい。<br>"+
           E("Don't worry. Job B is perfect for you. Let's （　　） together."),
      answers:["take a video"], hint:"英語3語（説明の中の言い方を使う）" } ] }
]},

/* ===== 大問2 ちらし（表）＋対話 ===== */
{ no:2, title:"中学生のミク(Miku)とショウ(Sho)が、ナギサ市の公民館の手話教室のちらしを見ながら会話をしています。次は、そのちらしと会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Nagisa Community Center — Sign Language Classes</h4>'+
    '<div class="note">Let\'s talk with our hands! Everyone is welcome.</div>'+
    '<table><tr><th>Class</th><th>What you will learn</th><th>Day and time</th><th>Fee (each time)</th></tr>'+
    '<tr><td>Beginner Class</td><td>greetings and how to say your name</td><td>Saturday 10:00 – 11:00 a.m.</td><td>free</td></tr>'+
    '<tr><td>Talk Class</td><td>talking about your family and hobbies</td><td>Saturday 11:00 a.m. – 12:00 p.m.</td><td>100 yen</td></tr>'+
    '<tr><td>Song Class</td><td>singing songs with your hands</td><td>Sunday 10:00 – 11:00 a.m.</td><td>200 yen</td></tr>'+
    '<tr><td>Café Class</td><td>ordering food and drinks at a café</td><td>Sunday 2:00 – 3:00 p.m.</td><td>300 yen</td></tr></table>'+
    '<div class="note">Teacher … Mr. Hayashi (He has taught sign language for fifteen years.)<br>'+
    'Place … Room 2 on the second floor<br>'+
    'Bring … a notebook and a pencil. You don\'t need any special tools.<br>'+
    'Members … thirty students and twelve adults now</div>',
    passage:
    '<span class="sp"><span class="who">Miku:</span> Sho, look at this. The community center has four sign language classes this autumn.</span>'+
    '<span class="sp"><span class="who">Sho:</span> Oh, I\'ve wanted to learn sign language since I saw a sign language song on TV. Which class are you going to take?</span>'+
    '<span class="sp"><span class="who">Miku:</span> I have already <u>(う) take</u> the Beginner Class, so I\'ll take the Talk Class next. I want to talk about my family and hobbies.</span>'+
    '<span class="sp"><span class="who">Sho:</span> I\'m a beginner, so I\'ll start with the Beginner Class. （　い　） does it start on Saturday?</span>'+
    '<span class="sp"><span class="who">Miku:</span> At ten in the morning. The Talk Class is held after that, so you can take both on the same day.</span>'+
    '<span class="sp"><span class="who">Sho:</span> Great. Then I\'ll take both. And look, there is a Song Class, too. I like singing, so I want to learn how to sing （　あ　） with my hands.</span>'+
    '<span class="sp"><span class="who">Miku:</span> Sounds fun! Let\'s take it together in winter. We can sing （　あ　） at the school festival next year.</span>'+
    '<span class="sp"><span class="who">Sho:</span> Good idea. I\'ll bring a notebook and a pencil on Saturday.</span>',
    note:'語注：sign language 手話／greeting あいさつ／hobby 趣味／order 〜を注文する／fee 料金／each time 毎回／tool 道具／adult 大人／beginner 初心者／both 両方',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"2か所の（あ）に共通して入れるのに最も適当な英語1語を、ちらしの中から抜き出して書きなさい。",
      answers:["songs"], hint:"ちらしの中にある語" },
    { type:"fill", label:"(2)い", pt:3, stem:"（い）に入れるのに最も適当な2語の英語を書きなさい。", answers:["What time"], hint:"英語2語（時刻をたずねる）" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う)の単語を、最も適当な形に変えて1語で書きなさい。", answers:["taken"], hint:"I have already 〜 the Beginner Class." },
    { type:"mcq", label:"(4)", pt:3, stem:"ちらしから、ショウが土曜日に2つのクラスを受けるときに払う金額として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("free"), E("100 yen"), E("200 yen"), E("300 yen") ], answer:1 },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("The Café Class is held on Saturday afternoon."),
                E("Miku has already finished the Beginner Class."),
                E("Sho has learned sign language for many years."),
                E("Students need special tools for the classes.") ], answer:1 } ]}
]},

/* ===== 大問3 会話の英作文（並べかえ2問） ===== */
{ no:3, title:"放課後の教室で、ALTのアダムズ(Ms. Adams)先生と、中学生のミク(Miku)が会話をしています。次の①〜⑥はそのときの二人の会話です。二人が考えている内容に合うように、(1)(2)の語を正しく並べかえて、会話を完成させなさい。なお、会話は①〜⑥の順に行われています。", groups:[
  { sceneNote:"イラスト：①アダムズ先生が、手を動かしているミクに「手で何をしているの」とたずねている。②ミクが「手話を練習しています。これは『ありがとう』という意味です」と説明している。③アダムズ先生が「手話はすべての国で使われているのかな」と考えながらたずねている。④ミクが「いいえ。国ごとに自分の手話があります。でも同じ表現もあります」と答えている。⑤アダムズ先生が「どれくらい長くそれを学んでいるの」と考えながらたずねている。⑥ミクが「約6か月です。放課後にいっしょに練習しましょう」と答えている。",
    passage:
    '<span class="sp"><span class="who">Ms. Adams:</span> ① Hi, Miku. What are you doing with your hands?</span>'+
    '<span class="sp"><span class="who">Miku:</span> ② I\'m practicing sign language. This sign means "thank you."</span>'+
    '<span class="sp"><span class="who">Ms. Adams:</span> ③ Interesting! <u>(1)</u>?</span>'+
    '<span class="sp"><span class="who">Miku:</span> ④ No. Each country has its own sign language. But some signs are the same.</span>'+
    '<span class="sp"><span class="who">Ms. Adams:</span> ⑤ I see. <u>(2)</u>?</span>'+
    '<span class="sp"><span class="who">Miku:</span> ⑥ For about six months. Let\'s practice together after school!</span>',
    passageEn:true,
    note:'語注：sign 手話の表現／mean 〜を意味する／each それぞれの／own 自分自身の',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：アダムズ先生が「手話はすべての国で使われているのですか」とたずねる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["used","Is","language","sign","every","in","country"], answer:"Is sign language used in every country" },
    { type:"wordorder", label:"(2)", pt:5, stem:"イラスト：アダムズ先生が「どれくらい長くそれを学んでいるのですか」とたずねる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["long","How","have","you","been","learning","it"], answer:"How long have you been learning it" } ]}
]},

/* ===== 大問4 話し合い＋日記 ===== */
{ no:4, title:"ALTのアダムズ(Ms. Adams)先生の英語の授業で、Miku と Sho が、耳の不自由な人たちの学校訪問について話し合いをしています。次の英文は、話し合いと、その日に Sho が書いた日記です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Ms. Adams:</span> Next month, ten people who cannot hear will visit our school from Nagisa Community Center. Today, let\'s talk about what we can do to welcome them. Miku, you have been learning sign language since spring, right?</span>'+
    '<span class="sp"><span class="who">Miku:</span> Yes. I go to Mr. Hayashi\'s class every Saturday. I want to <u>learn some greetings</u> for the visit, like "Welcome to our school" and "Nice to meet you." Then everyone in our class can use them at the door.</span>'+
    '<span class="sp"><span class="who">Ms. Adams:</span> That\'s a wonderful idea. Sho, what do you think?</span>'+
    '<span class="sp"><span class="who">Sho:</span> I agree with Miku. But learning many signs in one month is not easy for us. So I think we should also make picture cards. When we can\'t sign, we can show the cards. Picture cards are （　あ　） for everyone, even for small children.</span>'+
    '<span class="sp"><span class="who">Ms. Adams:</span> Good. Has Mr. Hayashi heard about our plan yet?</span>'+
    '<span class="sp"><span class="who">Sho:</span> Not yet. Miku is going to tell him this Saturday.</span>'+
    '<span class="sp"><span class="who">Ms. Adams:</span> Please do. Now let me tell you my story. When I was in high school in my country, my best friend could not hear. I learned sign language because I wanted to talk with her.</span>'+
    '<span class="sp"><span class="who">Miku:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Ms. Adams:</span> About a year. I made many mistakes at first, and she laughed a lot. But she always said, "Your hands are easy to read." I still remember her smile.</span>'+
    '<span class="sp"><span class="who">Sho:</span> What a nice story! Now I understand why you want us to welcome the visitors warmly.</span>'+
    '<span class="sp"><span class="who">Ms. Adams:</span> That\'s right. Let\'s make the visit a happy day for everyone.</span>',
    note:'語注：welcome 〜を歓迎する／greeting あいさつ／agree 賛成する／sign 手話で話す／picture card 絵カード／even 〜でさえ／heard 聞いた（hear の過去分詞）／mistake まちがい／laugh 笑う／easy to read 読み取りやすい／remember 〜を覚えている／warmly 温かく' },
  { passage:'<b>Sho の日記</b><br>Today we talked about the visitors who cannot hear. Miku\'s idea was good, and I was surprised to hear that Ms. Adams （　X　）. '+
            'I want to learn some signs with Miku before the visit.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Miku の発言から抜き出して書きなさい。<br>"+E("Miku wants to [　　] in sign language for the visit."),
      answers:["learn some greetings"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("expensive"),E("useful"),E("dangerous"),E("noisy")], answer:1 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Where did you meet her?"), E("How long did it take to learn it?"),
                E("How many friends do you have?"), E("When will she visit Japan?") ], answer:1 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Sho thinks that picture cards are not useful."),
                E("Miku has already told Mr. Hayashi about the plan."),
                E("Ms. Adams learned sign language to talk with her friend."),
                E("The visitors will come to the school next week.") ], answer:2 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("has never met a person who cannot hear"), E("learned sign language for her friend"),
                E("doesn't like making picture cards"), E("visited Nagisa Community Center yesterday") ], answer:1 } ]}
]},

/* ===== 大問5 スピーチ（長文読解） ===== */
{ no:5, title:"次の英文は、ミク(Miku)が英語の授業で発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Miku. Last spring, I started to learn sign language at Nagisa Community Center. '+
    'Before that, I thought sign language was just a way to show words with our hands. '+
    'Now I think it is a real language which brings people together, and I want to tell you why.<br><br>'+
    '<b>②</b> On the first day, Mr. Hayashi, our teacher, brought a woman to the class. Her name was Ms. Ono, and she cannot hear. '+
    'She runs a small flower shop near the station. She moved her hands very fast, and I could not understand anything. '+
    'At first, I used a notebook to talk with her. I was <u>(お) ___</u> because I could not say anything with my hands. '+
    'But Mr. Hayashi said to me, "Don\'t worry. Your face can talk, too. Keep smiling and try again."<br><br>'+
    '<b>③</b> After that, I practiced in front of a mirror every night. In June, I visited Ms. Ono\'s shop for the first time. '+
    'I signed, "These flowers are beautiful," and she understood me! She was so happy that she gave me a small yellow flower. '+
    'Since then, I have visited her shop every Saturday. One day, a little boy came into the shop. '+
    'He wanted to buy flowers for his mother, but he could not talk with Ms. Ono. '+
    'So I stood between them and told her his words with my hands. '+
    'When the boy left with the flowers, Ms. Ono signed to me, "Thank you, Miku. You are my bridge." I will never forget that day.<br><br>'+
    '<b>④</b> Some people say that learning sign language is too hard for junior high school students. That may be true. '+
    '<u>④ A student cannot learn all the signs in a few months</u>. '+
    'But I found something important. <u>③ ( Sign language / helped / me / make / new / friends )</u>. '+
    'Now I have many friends who cannot hear, and we talk about everything with our hands. '+
    'When we try to use the language of others, our hearts become closer. '+
    'So please come to the community center next Saturday, and let\'s <u>(か) ___</u> sign language together!',
    passageEn:true,
    note:'語注：real 本当の／bring 〜 together 〜を結びつける／run 〜を経営する／understand 〜を理解する／mirror 鏡／sign 手話で言う／yellow 黄色い／between 〜の間に／bridge 橋／forget 〜を忘れる／few 少しの／heart 心／closer より近い（close の比較級）',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お nervous　か forget"), E("お excited　か learn"),
                E("お nervous　か learn"), E("お excited　か forget") ], answer:2 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "6月に、ミクは初めてオノさんの店を訪れた。", "小さな男の子は、父親のために花を買いたかった。",
                "オノさんはミクに小さな黄色い花をくれた。", "ミクは男の子とオノさんの間に立って、男の子の言葉を手で伝えた。" ], answer:1 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["Sign language","helped","me","make","new","friends"], answer:"Sign language helped me make new friends",
      display:"Sign language helped me make new friends" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語3語を、第2段落中から抜き出して書きなさい。<br>"+E("At first, Miku （　え　） to talk with Ms. Ono."),
      answers:["used a notebook"], hint:"第2段落の語・英語3語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>1人の（　①　）が、数か月ですべての（　②　）を学ぶことはできない。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "先生","生徒","花屋","子ども" ], answer:1 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "歌","花","手話","数字" ], answer:2 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Ms. Ono works at a hospital near the station."),
                E("Miku started to learn sign language last spring."),
                E("Miku could understand Ms. Ono well on the first day."),
                E("Miku has visited Ms. Ono's shop every Saturday since June."),
                E("Mr. Hayashi told Miku to stop smiling in the class.") ], answer:[1,3] } ]}
]}

]};
