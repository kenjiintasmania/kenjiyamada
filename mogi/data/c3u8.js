/* data/c3u8.js ─ 中3 単元テスト⑧（初見・自動採点のみ）… テーマ：昔の遊び（けん玉・お手玉・こま）を小学生に教える交流会（架空の町 Tsubaki Town）。内容はすべて新規。
   参照：factory/inputs/authoring_rules.md／factory/inputs/okayama_notes.md（3年目の分析＝提供PDFの形式・配点だけを踏襲）
        ／モデル mogi/data/chu3_341.js（大問1〜5・28問・100点の骨格）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。
   登場人物：Hana, Yuto, Mr. Lewis（ALT）, Ms. Mori（公民館の職員）, Mr. Oda（けん玉名人のお年寄り）。
   ※過去問および既存の模試データとの内容重複なし。
   ロック式：先生が /admin で「スタート」するまで問題は表示されない（exam.html の unit:true）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 単元テスト⑧",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ（英文1回読み・2問） */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    note:"語注：top こま／spin 〜を回す",
    script:'(1) Look at the picture. Hana is playing kendama, and Yuto is spinning a top on the table.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵はどれですか。",
      choices:["ハナがけん玉をしていて、ユウトがテーブルの上でこまを回している。","ハナがこまを回していて、ユウトがテーブルの上でけん玉をしている。",
               "ハナがけん玉をしていて、ユウトがお手玉を投げている。","ハナがお手玉を投げていて、ユウトが床でこまを回している。"], answer:0 } ] },
  { script:'(2) Look at the table. Hana practices kendama on Tuesday and Thursday, and she practices tops on Saturday.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う表（ハナの今週の練習予定）はどれですか。",
      choices:["火曜日と木曜日にけん玉、土曜日にこま","火曜日と木曜日にこま、土曜日にけん玉",
               "火曜日と土曜日にけん玉、木曜日にこま","月曜日と木曜日にけん玉、土曜日にこま"], answer:0 } ] },

  /* 問題B：チャイムの応答（対話の最後への応答・2回読み・2問） */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> I have never played kendama before. Is it difficult?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("A little, but you'll get better soon."), E("Yes, I visited the center last year."),
                E("No, the ball is red."), E("I ate lunch at noon.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> Your top spins for such a long time! When did you learn to do that?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("It's on the table."), E("My grandfather taught me last winter."),
                E("Yes, I like winter very much."), E("I'll spin it three more times.") ], answer:1 } ] },

  /* 問題C：メモの空所補充（英語1語×3・2回読み） */
  { intro:"問題C　ハナ(Hana)が、公民館の職員のモリ(Ms. Mori)さんの話を聞いて、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, everyone. I\'m Ms. Mori from Tsubaki Community Center. Thank you for helping us with the event for the children.</span>'+
      '<span class="sp">The event will be held in <b>December</b>, not November, because another group will use the meeting room in November.</span>'+
      '<span class="sp">When you arrive, please go to the <b>meeting</b> room on the second floor. We will keep all the toys there.</span>'+
      '<span class="sp">The children will practice one game for about <b>twenty</b> minutes, and then they will move to the next table.</span>',
    passage:'<b>ハナのメモ</b><br>Ms. Mori\'s talk<br>— The event will be held in （　あ　）.<br>'+
            '— Go to the （　い　） room on the second floor.<br>'+
            '— Each child practices one game for about （　う　） minutes.',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）12月", answers:["December"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）会議（〜 room）", answers:["meeting"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）1つの遊びを練習する時間（分）", answers:["twenty","20"], hint:"英語1語（数を表す語）" } ] },

  /* 問題D：説明＋人物発言（内容一致選択＋3語の英語） */
  { intro:"問題D　あなたとクラスメイトのユウト(Yuto)が、小学生に昔の遊びを教える交流会についての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next Sunday, thirty children from Tsubaki Elementary School will come to the community center to learn old Japanese games. You will teach them in three groups.</span>'+
      '<span class="sp">Group A will teach kendama. Group B will teach otedama. Group C will play with tops and show the children how to spin them.</span>'+
      '<span class="sp">The event starts at ten in the morning and finishes at noon. Please come thirty minutes before it starts.</span>'+
      '<span class="sp"><span class="who">Yuto:</span> I\'m not good at kendama, but I can spin a top very well. Which group will you join?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["交流会は午前10時に始まり、正午に終わる。","参加する小学生は13人である。",
               "グループは全部で4つある。","手伝う生徒は、始まる1時間前に来る。"], answer:0 },
    { type:"fill", label:"(2)", pt:3,
      stem:"ユウトの発言に対して、あなたはどのように答えますか。書き出しに続けて（　）に tops を含む3語の英語を書き、英文を完成させなさい。<br>"+
           E("Group C is the best for you. Let's （　　） together."),
      answers:["play with tops","spin the tops","spin our tops","spin some tops"], hint:"英語3語（説明の中の言い方を使う）" } ] }
]},

/* ===== 大問2 ちらし（表）＋対話 ===== */
{ no:2, title:"中学生のハナ(Hana)とユウト(Yuto)が、ツバキ公民館のちらしを見ながら会話をしています。次は、そのちらしと会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Old Games Day at Tsubaki Community Center</h4>'+
    '<div class="note">Learn the games your grandparents loved!<br>Sunday, November 16　1:00 p.m. – 4:00 p.m.</div>'+
    '<table><tr><td><b>Game</b></td><td><b>Room</b></td><td><b>Teacher</b></td><td><b>Make your own</b></td></tr>'+
    '<tr><td>Kendama</td><td>Hall</td><td>Mr. Oda</td><td>300 yen</td></tr>'+
    '<tr><td>Otedama</td><td>Room 1</td><td>Ms. Mori</td><td>100 yen</td></tr>'+
    '<tr><td>Top (koma)</td><td>Room 2</td><td>Mr. Oda</td><td>free</td></tr>'+
    '<tr><td>Ayatori (string games)</td><td>Room 1</td><td>Ms. Mori</td><td>free</td></tr></table>'+
    '<div class="note">Mr. Oda has played kendama for sixty years.<br>'+
    'Each game is taught for forty minutes, and you can join two games.<br>'+
    'Junior high school helpers … Please come at 12:30 p.m.</div>',
    passage:
    '<span class="sp"><span class="who">Hana:</span> Yuto, look at this. Tsubaki Community Center will hold Old Games Day next Sunday.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> Sounds fun. （　い　） do you practice kendama, Hana?</span>'+
    '<span class="sp"><span class="who">Hana:</span> Two or three times a week. And my grandmother is good at otedama. I\'ll make my （　あ　） kendama in the hall, and then sew an otedama with Ms. Mori.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> Two games? That\'s a lot. I\'ll paint my （　あ　） top in Room 2. It\'s free!</span>'+
    '<span class="sp"><span class="who">Hana:</span> Nice. Mr. Oda will teach you. He has <u>(う) teach</u> kendama to children for many years, and he is good at tops, too.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> Great. We are helpers, so we have to be there before one o\'clock, right?</span>'+
    '<span class="sp"><span class="who">Hana:</span> Right. Let\'s meet at the station at twelve.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> OK. I\'ll bring my old top from home, too.</span>',
    note:'語注：grandparents 祖父母／own 自分自身の／top こま／string ひも／free 無料の／helper 手伝う人／sew 〜をぬう／paint 〜に色をぬる／times a week 週に〜回',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"2か所の（あ）に共通して入れるのに最も適当な英語1語を、ちらしの中から抜き出して書きなさい。",
      answers:["own"], hint:"ちらしの中にある語（my 〜 kendama / my 〜 top）" },
    { type:"fill", label:"(2)い", pt:3, stem:"（い）に入れるのに最も適当な2語の英語を書きなさい。", answers:["How often"], hint:"英語2語（どれくらいの頻度で）" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う)の単語を、最も適当な形に変えて1語で書きなさい。", answers:["taught"], hint:"He has 〜 kendama to children for many years." },
    { type:"mcq", label:"(4)", pt:3, stem:"ちらしと会話から、ハナが自分のけん玉とお手玉を作るときに払う金額は合計いくらですか。最も適当なのは、ア〜エのどれですか。",
      choices:[ E("100 yen"), E("300 yen"), E("400 yen"), E("600 yen") ], answer:2 },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Mr. Oda teaches both kendama and tops."),
                E("Old Games Day will be held on Saturday morning."),
                E("Hana practices kendama only on Sundays."),
                E("Helpers must come at one thirty.") ], answer:0 } ]}
]},

/* ===== 大問3 会話の英作文（並べかえ2問） ===== */
{ no:3, title:"ALTのルイス(Mr. Lewis)先生と、中学生のハナ(Hana)が公民館で会話をしています。次の①〜⑥はそのときの二人の会話です。二人が考えている内容に合うように、(1)(2)の語を正しく並べかえて、会話を完成させなさい。なお、会話は①〜⑥の順に行われています。", groups:[
  { sceneNote:"イラスト：①ルイス先生がけん玉を手に取って「このおもちゃは何？初めて見た」と言っている。②ハナが「けん玉です。祖父によって作られました」と説明している。③ルイス先生が「やってみてもいい？」とたずねている。④ハナが「大きい皿で玉を受けてください」と教えている。⑤ルイス先生が「できた！どの技がいちばん難しいの」と考えながらたずねている。⑥ハナが「これです。玉をけん先にのせます」と答えている。",
    passage:
    '<span class="sp"><span class="who">Mr. Lewis:</span> ① Hana, what is this toy? I have never seen it before.</span>'+
    '<span class="sp"><span class="who">Hana:</span> ② It\'s a kendama. <u>(1)</u>.</span>'+
    '<span class="sp"><span class="who">Mr. Lewis:</span> ③ Wow. Can I try it?</span>'+
    '<span class="sp"><span class="who">Hana:</span> ④ Sure. Catch the ball with the big cup.</span>'+
    '<span class="sp"><span class="who">Mr. Lewis:</span> ⑤ I did it! <u>(2)</u>?</span>'+
    '<span class="sp"><span class="who">Hana:</span> ⑥ This one. Put the ball on the point.</span>',
    passageEn:true,
    note:'語注：toy おもちゃ／cup 皿／trick 技／point 先',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：ハナが「祖父によって作られました」と説明する場面。次の語を正しく並べて英文を完成させなさい。",
      words:["was","It","by","made","my","grandfather"], answer:"It was made by my grandfather" },
    { type:"wordorder", label:"(2)", pt:5, stem:"イラスト：ルイス先生が「どの技がいちばん難しいの」とたずねる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["Which trick","is","the","most","difficult"], answer:"Which trick is the most difficult" } ]}
]},

/* ===== 大問4 話し合い＋日記 ===== */
{ no:4, title:"ルイス(Mr. Lewis)先生の英語の授業で、Hana と Yuto が、小学生に昔の遊びを教える交流会について話し合いをしています。次の英文は、話し合いと、その日に Yuto が書いた日記です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Lewis:</span> Next Sunday, we will teach old Japanese games to the children at the community center. How should we teach them? Hana, please start.</span>'+
    '<span class="sp"><span class="who">Hana:</span> I want to <u>use easy words</u> when I explain kendama. Small children don\'t know difficult words.</span>'+
    '<span class="sp"><span class="who">Mr. Lewis:</span> That\'s important. What else, Hana?</span>'+
    '<span class="sp"><span class="who">Hana:</span> I\'ll also show them slowly. My grandfather taught me kendama that way when I was five.</span>'+
    '<span class="sp"><span class="who">Mr. Lewis:</span> Nice. Yuto, what is your idea?</span>'+
    '<span class="sp"><span class="who">Yuto:</span> I want to make a small card for each game. The card will have pictures, so the children can understand the rules without reading a lot.</span>'+
    '<span class="sp"><span class="who">Mr. Lewis:</span> Great idea. Have you made the cards yet?</span>'+
    '<span class="sp"><span class="who">Yuto:</span> Not yet. I have been drawing the pictures since last Monday, and I will finish them tonight.</span>'+
    '<span class="sp"><span class="who">Mr. Lewis:</span> Good. Now let me tell you about my own experience. When I first came to Japan, I could not read the signs at the station. But a kind old man showed me the way with his hands. So words are not always （　あ　）.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Mr. Lewis:</span> Good question. It was about ten years ago. I was a university student then, and I have lived in Japan since that time.</span>'+
    '<span class="sp"><span class="who">Hana:</span> Then you have been in Japan longer than we have been in junior high school!</span>'+
    '<span class="sp"><span class="who">Mr. Lewis:</span> That\'s right. That old man\'s kindness helped me love this country. I hope your kindness will help the children love these games.</span>',
    note:'語注：explain 〜を説明する／else ほかに／slowly ゆっくりと／rule ルール／experience 経験／sign 案内板／university 大学／kindness 親切／country 国' },
  { passage:'<b>Yuto の日記</b><br>Today we talked about how to teach the games. Mr. Lewis\'s story about the kind old man was interesting. '+
            'I （　X　）, so I will draw pictures that every child can understand.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Hana の発言から抜き出して書きなさい。<br>"+E("Hana wants to [　　] when she explains kendama."),
      answers:["use easy words"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("expensive"),E("necessary"),E("dangerous"),E("delicious")], answer:1 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Where is the station?"), E("How much was the ticket?"),
                E("When did you first come to Japan?"), E("Who showed you the game?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Hana learned kendama from her mother."),
                E("Yuto has not finished the cards yet."),
                E("Mr. Lewis came to Japan last year."),
                E("Hana wants to use difficult words.") ], answer:1 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("have played kendama for ten years"), E("want to be a station worker"),
                E("want to make cards with pictures"), E("like reading long books") ], answer:2 } ]}
]},

/* ===== 大問5 スピーチ（長文読解） ===== */
{ no:5, title:"次の英文は、ハナ(Hana)が英語の授業で発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Hana. Last month, I taught kendama to children at Tsubaki Community Center. '+
    'Before that day, I thought old games were only for old people. Now I think they are for everyone, and I want to tell you why.<br><br>'+
    '<b>②</b> On the morning of the event, I was very nervous. I practiced my explanation many times at home, but my voice was too small. '+
    'Thirty children came into the meeting room, and they were much louder than I expected. '+
    'Ms. Mori, a staff member of the center, said to me, "Don\'t worry. Children learn with their eyes. Just show them." '+
    'So I showed the children how to hold the kendama, and I said, "Watch the ball, not your hand." '+
    'Some children did it soon. They laughed and showed their friends. But one small boy, Kota, could not catch the ball at all. '+
    'He <u>(お) ___</u> the kendama on the floor and looked down. I did not know what to say.<br><br>'+
    '<b>③</b> Then something happened. Mr. Oda, an old man who has played kendama for sixty years, sat down next to Kota. '+
    'He did not say anything. He just did the trick very slowly, again and again. Kota watched him for a long time. His eyes never left the ball. '+
    'Then he picked up his kendama and tried again. After twenty minutes, the ball landed on the cup. '+
    'Kota shouted, "I did it!" All the children around him clapped their hands. '+
    'Mr. Oda smiled and said, "Old games are slow, but they wait for you."<br><br>'+
    '<b>④</b> Some people say that children today do not need old games. That may be true. '+
    '<u>④ Children today can find newer and faster games on their phones</u>. '+
    'But I saw something different that day. <u>③ ( was / the boy / the happiest / who kept trying )</u>. '+
    'When we play an old game together, we share the time, not just the game. That is something a phone cannot give us. '+
    'Now I practice kendama with my grandfather every evening, and we talk a lot. '+
    'So please pick up an old toy this weekend, and let\'s <u>(か) ___</u> it to someone younger than you!',
    passageEn:true,
    note:'語注：nervous 緊張して／explanation 説明／voice 声／expect 〜を予想する／staff member 職員／hold 〜を持つ／at all まったく／floor 床／look down うつむく／trick 技／again and again 何度も／pick up 〜を拾い上げる／land on 〜 〜にのる／shout さけぶ／clap 〜をたたく／share 〜を分け合う／younger より年下の',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お dropped　か buy"), E("お dropped　か teach"),
                E("お caught　か buy"), E("お caught　か teach") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "小田さんは60年間けん玉をしている。", "小田さんはコウタの横にすわり、技をゆっくり何度も見せた。",
                "小田さんはコウタに、たくさんの言葉で説明した。", "コウタは20分後に、玉を皿にのせることができた。" ], answer:2 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["was","the boy","the happiest","who kept trying"], answer:"The boy who kept trying was the happiest",
      display:"The boy who kept trying was the happiest" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語3語を、第2段落中から抜き出して書きなさい。<br>"+E("Hana showed the children （　え　） the kendama."),
      answers:["how to hold"], hint:"第2段落の語・英語3語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>今日の子どもたちは、自分の（　①　）で、より新しくてより速い（　②　）を見つけることができる。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "本","電話","地図","机" ], answer:1 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "歌","絵","ゲーム","店" ], answer:2 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Before the event, Hana thought old games were only for old people."),
                E("Kota could catch the ball the first time he tried."),
                E("Mr. Oda showed Kota the trick slowly without saying anything."),
                E("Hana now practices kendama with Ms. Mori every evening."),
                E("Hana thinks children today do not need old games.") ], answer:[0,2] } ]}
]}

]};
