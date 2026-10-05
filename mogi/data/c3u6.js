/* data/c3u6.js ─ 中3 単元テスト⑥（初見・自動採点のみ）… テーマ：移動図書館（ブックバス）／小学生への読み聞かせ（架空の町 Minori Town）。内容はすべて新規。
   参照：factory/inputs/authoring_rules.md／factory/inputs/okayama_notes.md（3年目の分析＝提供PDFの形式・配点だけを踏襲）
        ／モデル mogi/data/chu3_341.js（大問1〜5・28問・100点の骨格）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。
   登場人物：Aoi, Ren, Mr. Taylor（ALT）, Mr. Kubo（図書館員・ブックバスの運転手）。
   ※過去問および既存の模試データとの内容重複なし。
   ロック式：先生が /admin で「スタート」するまで問題は表示されない（exam.html の unit:true）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 単元テスト⑥",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ（英文1回読み・2問） */
  { intro:"問題A　放送を聞いて、内容に合う絵やグラフをア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the picture. Aoi is reading a picture book to three children, and a small dog is sleeping under the bench.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵はどれですか。",
      choices:["3人の子どもに絵本を読んでいるアオイ。ベンチの上で小さな犬がねむっている。","3人の子どもに絵本を読んでいるアオイ。ベンチの下で小さな犬がねむっている。",
               "2人の子どもと本を運んでいるアオイ。ベンチの下で小さな犬がねむっている。","3人の子どもに絵本を読んでいるアオイ。小さな犬がベンチのまわりを走っている。"], answer:1 } ] },
  { script:'(2) Look at the graph. On the book bus, picture books are the most popular. Comic books are more popular than science books.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合うグラフ（ブックバスで人気のある本）はどれですか。",
      choices:["1位 絵本、2位 科学の本、3位 まんが","1位 まんが、2位 絵本、3位 科学の本",
               "1位 絵本、2位 まんが、3位 科学の本","1位 科学の本、2位 絵本、3位 まんが"], answer:2 } ] },

  /* 問題B：チャイムの応答（対話の最後への応答・2回読み・2問） */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> Excuse me. I want to borrow this book, but I don\'t have a library card. What should I do?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I read it last summer."), E("The bus will leave at five."),
                E("You can make one at that desk. It's free."), E("No, I don't like this book.") ], answer:2 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> The children loved your story today. Will you read to them again next month?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Because the bus was late."), E("Sure. I'll choose a funny one next time."),
                E("I went to the library yesterday."), E("It's on the second floor.") ], answer:1 } ] },

  /* 問題C：メモの空所補充（英語1語×3・2回読み） */
  { intro:"問題C　アオイ(Aoi)が、ブックバスを運転する図書館員のクボ(Mr. Kubo)さんにインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, I\'m Mr. Kubo. I drive the book bus. The bus carries about eight hundred books, and half of them are picture books.</span>'+
      '<span class="sp">I always put the new books near the door of the bus. Then the children can find them easily.</span>'+
      '<span class="sp">The bus is yellow, so you can find it easily in the town.</span>',
    passage:'<b>アオイのメモ</b><br>Mr. Kubo — drives the book bus, which carries about （　あ　） hundred books<br>'+
            '— puts the new books near the （　い　） of the bus<br>'+
            '— the bus is （　う　）, so it is easy to find',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）", answers:["eight","8"], hint:"英語1語（数）" },
    { type:"fill", label:"い", pt:2, stem:"（い）", answers:["door"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）", answers:["yellow"], hint:"英語1語" } ] },

  /* 問題D：説明＋人物発言（内容一致選択＋3語の英語） */
  { intro:"問題D　あなたとクラスメイトのレン(Ren)が、ブックバスの特別な日の手伝いについての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">On the last Sunday of this month, Minori Library will hold a special book bus day at Minori Park. Junior high school students can help as volunteers. There are three jobs.</span>'+
      '<span class="sp">In Job A, you will read picture books to small children. In Job B, you will carry books from the bus to the tables. In Job C, you will make a list of new books.</span>'+
      '<span class="sp">The event starts at ten in the morning and finishes at one in the afternoon. Please come to the park at nine thirty and wear a white T-shirt.</span>'+
      '<span class="sp"><span class="who">Ren:</span> I\'m not good at carrying heavy things, but I like talking to little children. Which job do you want to do?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["仕事は2種類あり、両方に参加しなければならない。","参加者は午前10時に公園に来るように言われている。",
               "イベントは午前10時に始まり、午後1時に終わる。","手伝うことができるのは小学生だけである。"], answer:2 },
    { type:"fill", label:"(2)", pt:3,
      stem:"レンの発言に対して、あなたはどのように答えますか。書き出しに続けて（　）に picture を含む3語の英語を書き、英文を完成させなさい。<br>"+
           E("That's a good job for you. Let's （　　） together."),
      answers:["read picture books"], hint:"英語3語（説明の中の言い方を使う）" } ] }
]},

/* ===== 大問2 ちらし（表）＋対話 ===== */
{ no:2, title:"中学生のアオイ(Aoi)とレン(Ren)が、ミノリ町のブックバス（移動図書館）のちらしを見ながら会話をしています。次は、そのちらしと会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Minori Book Bus — Autumn Schedule</h4>'+
    '<div class="note">The library comes to you! You can borrow up to five books for two weeks.</div>'+
    '<table><tr><td>Place</td><td>Day</td><td>Time</td><td>Event</td></tr>'+
    '<tr><td>Minori Park</td><td>Tuesday</td><td>10:00 a.m. – 11:30 a.m.</td><td>Story time for small children</td></tr>'+
    '<tr><td>Minori Elementary School</td><td>Monday</td><td>2:00 p.m. – 4:00 p.m.</td><td>—</td></tr>'+
    '<tr><td>Minori Station</td><td>Saturday</td><td>1:00 p.m. – 3:00 p.m.</td><td>Book talk by Mr. Kubo</td></tr>'+
    '<tr><td>Minori Community Center</td><td>Sunday</td><td>10:00 a.m. – 12:00 p.m.</td><td>Picture book making … 200 yen</td></tr></table>'+
    '<div class="note">Library card … free (bring something with your name and address on it)<br>'+
    'Book bag … 300 yen<br>'+
    'Driver … Mr. Kubo, a librarian. (He has worked for the library for twelve years.)</div>',
    passage:
    '<span class="sp"><span class="who">Aoi:</span> Ren, look at this. The book bus will come to the community center next Sunday.</span>'+
    '<span class="sp"><span class="who">Ren:</span> I\'ve heard about it, but I\'ve never used it. What can we do there?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> We can （　あ　） books, of course. Up to five books at one time.</span>'+
    '<span class="sp"><span class="who">Ren:</span> （　い　） can we keep them?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> For two weeks. And there is a special event on Sunday, too. We can make our own picture books.</span>'+
    '<span class="sp"><span class="who">Ren:</span> That sounds fun. Who drives the bus?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> It is <u>(う) drive</u> by Mr. Kubo. He knows every book on the bus, so he can help us find good ones.</span>'+
    '<span class="sp"><span class="who">Ren:</span> Great. I want to （　あ　） some books about dogs for my little brother.</span>'+
    '<span class="sp"><span class="who">Aoi:</span> Me too. I\'ll join the picture book making and buy a book bag, too. I already have a library card.</span>'+
    '<span class="sp"><span class="who">Ren:</span> I don\'t have one. Can I make a card there?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> Yes. It\'s free, but you need something with your name and address on it.</span>'+
    '<span class="sp"><span class="who">Ren:</span> OK. I\'ll bring my student card. See you at the community center at ten.</span>',
    note:'語注：schedule 予定表／up to 〜 〜まで／story time 読み聞かせの時間／community center 公民館／address 住所／driver 運転手／librarian 図書館員／student card 生徒証',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"2か所の（あ）に共通して入れるのに最も適当な英語1語を、ちらしの中から抜き出して書きなさい。",
      answers:["borrow"], hint:"ちらしの中にある語（We can 〜 books）" },
    { type:"fill", label:"(2)い", pt:3, stem:"（い）に入れるのに最も適当な2語の英語を書きなさい。", answers:["How long"], hint:"英語2語（どれくらいの間）" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う)の単語を、最も適当な形に変えて1語で書きなさい。", answers:["driven"], hint:"It is 〜 by Mr. Kubo." },
    { type:"mcq", label:"(4)", pt:3, stem:"ちらしと会話から、アオイが日曜日に支払う金額として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("200 yen"), E("300 yen"), E("500 yen"), E("700 yen") ], answer:2 },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("The book bus comes to Minori Park on Saturday."),
                E("Ren has used the book bus many times."),
                E("Mr. Kubo has worked for the library for twelve years."),
                E("Ren has to pay three hundred yen for a library card.") ], answer:2 } ]}
]},

/* ===== 大問3 会話の英作文（並べかえ2問） ===== */
{ no:3, title:"ミノリ町の中学校で働くALTのテイラー(Mr. Taylor)先生と、中学生のアオイ(Aoi)が、ブックバスの前で会話をしています。次の①〜⑥はそのときの二人の会話です。二人が考えている内容に合うように、(1)(2)の語を正しく並べかえて、会話を完成させなさい。なお、会話は①〜⑥の順に行われています。", groups:[
  { sceneNote:"イラスト：①テイラー先生がバスの中を見て「わあ、バスの中が図書館だ」とおどろいている。②アオイが「これはミノリ・ブックバスと呼ばれています。先生はブックバスを見たことがあるのかな」と考えながらたずねている。③テイラー先生が「いいえ、初めてです。すばらしい！」と答えている。④アオイが「町の子どもたちはこれが大好きです」と説明している。⑤テイラー先生が「このバスは毎日使われているのかな」と考えながらたずねている。⑥アオイが「いいえ。週に4か所を回ります」と答えている。",
    passage:
    '<span class="sp"><span class="who">Mr. Taylor:</span> ① Wow, this is a library on a bus!</span>'+
    '<span class="sp"><span class="who">Aoi:</span> ② Yes. It is called the Minori Book Bus. <u>(1)</u>?</span>'+
    '<span class="sp"><span class="who">Mr. Taylor:</span> ③ No, this is my first time. It\'s wonderful!</span>'+
    '<span class="sp"><span class="who">Aoi:</span> ④ The children in our town love it.</span>'+
    '<span class="sp"><span class="who">Mr. Taylor:</span> ⑤ <u>(2)</u>?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> ⑥ No. It visits four places a week.</span>',
    passageEn:true,
    note:'語注：is called 〜と呼ばれている／place 場所',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：アオイが「ブックバスを見たことがありますか」とたずねる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["seen","ever","you","Have","a book bus","before"], answer:"Have you ever seen a book bus before" },
    { type:"wordorder", label:"(2)", pt:5, stem:"イラスト：テイラー先生が「このバスは毎日使われているのですか」とたずねる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["used","this","Is","bus","every day"], answer:"Is this bus used every day" } ]}
]},

/* ===== 大問4 話し合い＋日記 ===== */
{ no:4, title:"テイラー(Mr. Taylor)先生の英語の授業で、Aoi と Ren が、小学生への読み聞かせについて話し合いをしています。次の英文は、話し合いと、その日に Ren が書いた日記です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Taylor:</span> Next Monday, the book bus will go to Minori Elementary School, and you two are going to read picture books to the first graders there. Have you chosen your books yet?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> Yes, I have. I chose a story about a little bear that cannot sleep. The words are easy, and the pictures are big.</span>'+
    '<span class="sp"><span class="who">Mr. Taylor:</span> Nice choice. How will you read it, Aoi?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> I want to <u>use different voices</u> for each animal in the story. Then the children will not get bored.</span>'+
    '<span class="sp"><span class="who">Mr. Taylor:</span> That\'s a great idea. Ren, how about you?</span>'+
    '<span class="sp"><span class="who">Ren:</span> I haven\'t decided yet. I read two books last night, but both of them were too long for small children.</span>'+
    '<span class="sp"><span class="who">Mr. Taylor:</span> I understand. Choosing a book for small children is （　あ　）. You have to find a book which they can enjoy in five minutes.</span>'+
    '<span class="sp"><span class="who">Ren:</span> I see. I\'ll go to the book bus tomorrow and look for a shorter one.</span>'+
    '<span class="sp"><span class="who">Mr. Taylor:</span> Good. Mr. Kubo, the librarian, knows a lot about picture books. Now, let me tell you my own story. When I was a child in Canada, my grandmother read to me every night before I went to bed.</span>'+
    '<span class="sp"><span class="who">Aoi:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Mr. Taylor:</span> Good question. She usually read stories about animals. Some of them were written by Japanese writers, and that is why I became interested in Japan.</span>'+
    '<span class="sp"><span class="who">Ren:</span> So reading brought you to Minori!</span>'+
    '<span class="sp"><span class="who">Mr. Taylor:</span> Yes. I hope your reading will make the children love books, too.</span>',
    note:'語注：first grader 小学1年生／chosen 選んだ（choose の過去分詞）／choice 選択／bear クマ／voice 声／get bored あきる／decide 決める／librarian 図書館員／own 自分自身の／were written 書かれた／writer 作家／bring 〜を連れてくる（過去形 brought）' },
  { passage:'<b>Ren の日記</b><br>Today we talked about our story time at the elementary school. Aoi has already chosen her book, but I haven\'t. '+
            'Small children need a short story, so tomorrow I will go to the book bus and （　X　）.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Aoi の発言から抜き出して書きなさい。<br>"+E("Aoi is going to [　　] when she reads the story to the children."),
      answers:["use different voices"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("difficult"),E("famous"),E("cheap"),E("noisy")], answer:0 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Where did you buy the books?"), E("What did she usually read?"),
                E("How many brothers do you have?"), E("Where does your grandmother live now?") ], answer:1 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Ren has already chosen a short book about a dog."),
                E("Aoi chose a story about a little bear."),
                E("Mr. Taylor's grandmother read to him every morning."),
                E("Ren read two very short books last night.") ], answer:1 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("ask Mr. Kubo to help me find a short book"), E("buy a big picture book for my sister"),
                E("read a long story to the first graders"), E("borrow some books about Canada") ], answer:0 } ]}
]},

/* ===== 大問5 スピーチ（長文読解） ===== */
{ no:5, title:"次の英文は、レン(Ren)が英語の授業で発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Ren. Last month, I read a picture book to the first graders at Minori Elementary School for the first time. '+
    'I did it as a volunteer for the book bus in our town. Before that day, I thought reading to children was easy. You just open a book and read the words. '+
    'Now I think it is much harder and much more interesting, and I want to tell you why.<br><br>'+
    '<b>②</b> First, I had to choose a book. I went to the book bus and asked Mr. Kubo, the librarian, for help. '+
    'He showed me a story about a little dog that looks for his home. It was short, and every page had a big picture. '+
    'I practiced the story every night for a week. Mr. Kubo said to me, '+
    '"Don\'t read fast. Look at the children\'s faces, and wait for their smiles." '+
    'On the morning of the story time, I was <u>(お) ___</u> because it was my first time to read in front of children.<br><br>'+
    '<b>③</b> Twenty-five children were sitting on the floor of the music room. When I started reading, some of them were talking to their friends. '+
    'But when I made the dog\'s voice, they became quiet. Some of them laughed when the dog jumped into a small river. A boy in the front row began to say the dog\'s words with me. '+
    'When the dog found his home at last, everyone shouted, "Yes!" After the story, a girl came to me and said, '+
    '"I want to read this book by myself." Mr. Kubo lent it to her that day. '+
    'I understood that reading to children is giving them a door to books.<br><br>'+
    '<b>④</b> Some people say that a small library on a bus cannot change children. That may be true. '+
    '<u>④ A small bus cannot carry every book in the world</u>. '+
    'But I know what happened in the music room. <u>③ ( gave / one little dog / me / a chance / to talk / with the children )</u>. '+
    'When we share one story, we also share our feelings. '+
    'So please come to the park next Tuesday, and let\'s <u>(か) ___</u> the book bus together!',
    passageEn:true,
    note:'語注：librarian 図書館員／look for 〜 〜をさがす／practice 〜を練習する／in front of 〜 〜の前で／floor ゆか／front row 前の列／quiet 静かな／at last ついに／shout さけぶ／by myself 自分で／lent 〜を貸した（lend の過去形）／share 〜を分け合う',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お sleepy　か stop"), E("お sleepy　か visit"),
                E("お nervous　か stop"), E("お nervous　か visit") ], answer:3 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "25人の子どもが音楽室のゆかにすわっていた。", "レンが犬の声を出しても、子どもたちは話をやめなかった。",
                "前の列の男の子が、いっしょに犬のせりふを言い始めた。", "話のあとで、女の子が自分でこの本を読みたいと言った。" ], answer:1 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["gave","one little dog","me","a chance","to talk","with the children"], answer:"One little dog gave me a chance to talk with the children",
      display:"One little dog gave me a chance to talk with the children" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語3語を、第2段落中から抜き出して書きなさい。<br>"+E("Ren （　え　） every night for a week before the story time."),
      answers:["practiced the story"], hint:"第2段落の語・英語3語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>小さな（　①　）は、世界中のすべての（　②　）を運ぶことはできない。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "電車","バス","船","飛行機" ], answer:1 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "絵","本","花","手紙" ], answer:1 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Before last month, Ren thought reading to children was easy."),
                E("Mr. Kubo told Ren to read the story as fast as he could."),
                E("Some children were talking when Ren started reading."),
                E("Ren chose a long book about a little bear."),
                E("Ren thinks a small bus can carry every book in the world.") ], answer:[0,2] } ]}
]}

]};
