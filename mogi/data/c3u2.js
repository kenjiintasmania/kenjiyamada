/* data/c3u2.js ─ 中3 単元テスト②（初見・自動採点のみ）… テーマ：図書館／読書週間／おすすめの本。内容はすべて新規。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 単元テスト②",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  { intro:"問題A　放送を聞いて、内容に合う絵をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the sign. The library is closed on Wednesday.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合うかんばん（休館日）はどれですか。",
      choices:["水曜休館","木曜休館","火曜休館","金曜休館"], answer:0 } ] },
  { script:'(2) There are three books and one notebook on the desk.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う絵はどれですか。",
      choices:["本3冊・ノート1冊","本1冊・ノート3冊","本3冊・ノート3冊","本1冊・ノート1冊"], answer:0 } ] },

  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> I can\'t reach that book on the top shelf. Can you help me?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Sure, no problem."), E("Yes, I read it yesterday."), E("No, I didn't borrow it."), E("It was a sad story.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> What kind of books do you like to read?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I like mystery stories the best."), E("Yes, I will."), E("No, thank you."), E("It's mine.") ], answer:0 } ] },

  { intro:"問題C　先生が読書週間の宿題について話しています。アオイ(Aoi)が書いたメモの（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">OK, here is your homework for the reading week. Choose your favorite <b>book</b> and write about it.</span>'+
      '<span class="sp">Your writing should be over <b>eighty</b> words in English.</span>'+
      '<span class="sp">Please hand it in by next <b>Friday</b>.</span>',
    passage:'<b>アオイのメモ</b><br>・いちばん好きな（　あ　）を選んで書く<br>・英語で（　い　）語より多く書く<br>・次の（　う　）に提出する',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）本", answers:["book"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）80", answers:["eighty"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）金曜日", answers:["friday"], hint:"英語1語" } ] },

  { intro:"問題D　あなたとクラスメイトのリク(Riku)が、図書館の読書イベントについての説明を聞いて話しています。(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next Saturday we will have a reading event at the library. You can choose one group.</span>'+
      '<span class="sp">Group A will read picture books to children. Group B will read English stories.</span>'+
      '<span class="sp">The event starts at ten in the morning. Please bring a pen and your library card.</span>'+
      '<span class="sp">After the event, we will have tea together.</span>'+
      '<span class="sp"><span class="who">Riku:</span> I want to read English stories. Which group will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["イベントは日曜日に行われる。","イベントは午前10時に始まる。",
               "図書館カードを持ってくる必要はない。","イベントの後にジュースが出される。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"リクの発言に対するあなたの答えを完成させなさい。<br>"+E("I want to read picture books. So I will choose （　　）.")+"（英語2語）",
      answers:["group a"], hint:"英語2語" } ] }
]},

/* ===== 大問2 図書館の案内＋対話 ===== */
{ no:2, title:"ケンタ(Kenta)とエマ(Emma)が、図書館で話しています。次の案内表と会話を読み、(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>図書館・貸し出し案内</h4>'+
    '<table><tr><th>コーナー</th><th>貸出冊数</th><th>貸出期間</th></tr>'+
    '<tr><td>Novels</td><td>5冊まで</td><td>2週間</td></tr>'+
    '<tr><td>Comics</td><td>3冊まで</td><td>1週間</td></tr>'+
    '<tr><td>Magazines</td><td>2冊まで</td><td>3日</td></tr>'+
    '<tr><td>New books</td><td>1冊まで</td><td>1週間</td></tr></table>'+
    '<table style="margin-top:6px"><tr><th>サービス</th><th></th></tr>'+
    '<tr><td>Study room</td><td>9:00 – 17:00</td></tr>'+
    '<tr><td>Reading event (Sat)</td><td>10:00 – 11:00</td></tr><tr><td>Closed</td><td>Wednesday</td></tr></table>',
    passage:
    '<span class="sp"><span class="who">Kenta:</span> The reading event doesn\'t start until （あ） o\'clock, so we have some free time. Shall we look for some books?</span>'+
    '<span class="sp"><span class="who">Emma:</span> Good idea. It\'s nine thirty now. We have thirty minutes, so there is （い） time to choose. But it takes about ten minutes to walk to the event room.</span>'+
    '<span class="sp"><span class="who">Kenta:</span> Sure. The novel corner is over there. Let\'s go.</span>'+
    '<span class="sp"><i>At the novel corner.</i></span>'+
    '<span class="sp"><span class="who">Emma:</span> Look at this series. Which book looks good to you?</span>'+
    '<span class="sp"><span class="who">Kenta:</span> Hmm, this set looks nice. How about borrowing it together? It comes with （あ） novels and （あ） bookmarks.</span>'+
    '<span class="sp"><span class="who">Emma:</span> That\'s a bit much for me. I <u>(う) read</u> three novels last week, so I don\'t have much time now.</span>'+
    '<span class="sp"><span class="who">Kenta:</span> Then how about one novel and one magazine? We can talk about them later.</span>'+
    '<span class="sp"><span class="who">Emma:</span> Sounds good.</span>'+
    '<span class="sp"><span class="who">Kenta:</span> OK, I\'ll go and borrow them. I\'ll use my card first — could you save our seats, Emma?</span>'+
    '<span class="sp"><span class="who">Emma:</span> Sure. I\'ll return mine next week.</span>',
    note:'語注：over there あそこに／series シリーズ／bookmark しおり／return 返す',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"3か所の（あ）に共通して入れる最も適当な英語1語を書きなさい。", answers:["ten"], hint:"〜o'clock / 〜 novels" },
    { type:"fill", label:"(2)い", pt:3, stem:"（い）に入れるのに最も適当な英語1語を書きなさい。", answers:["enough"], hint:"〜 time to choose（じゅうぶんな）" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) read を、最も適当な形に変えて1語で書きなさい。", answers:["read"], hint:"last week（過去形・発音はred）" },
    { type:"mcq", label:"(4)", pt:3, stem:"会話の内容から、ケンタが借りることにしたものとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("小説1冊と雑誌1冊"), E("小説2冊"), E("まんが3冊"), E("新刊1冊") ], answer:0 },
    { type:"mcq", label:"(5)", pt:4, stem:"案内表や会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Comics can be borrowed for two weeks."),
                E("Kenta and Emma will join the reading event after they choose books."),
                E("Emma wants to borrow many books because she has a lot of time."),
                E("The library is open every day of the week.") ], answer:1 } ]}
]},

/* ===== 大問3 日記の英作文 ===== */
{ no:3, title:"アオイ(Aoi)には、エマ(Emma)という友達がいます。次は、ある土曜日のアオイの日記の一部と、その日のできごとを表したイラストです。日記とイラストの内容に合うように、(1)に4語以上、(2)に3語以上の英語を書き、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：アオイの部屋に大きな本だながあり、二人でいっしょに本を読んでいる。",
    passage:
    'October 17<br><br>'+
    'Emma visited my house in the afternoon. When she came into my room, she said, "What a big bookshelf! '+
    '<u>(1)</u> you have?" I said, "About three hundred." I showed her some of my favorite stories. We enjoyed reading them together. '+
    'At four thirty, she said, "I want to stay here longer, but I have <u>(2)</u> before five. I\'m going to read aloud with my sister." '+
    'I wanted to talk with her more, but she left my house.',
    passageEn:true,
    note:'語注：bookshelf 本だな／three hundred 300／read aloud 音読する',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"アオイが「約300（冊）」と答えています。数をたずねるエマのことばになるよう、次の語を正しく並べて英文を完成させなさい。",
      words:["do","many","have","How","you","books"], answer:"How many books do you have?" },
    { type:"wordorder", label:"(2)", pt:5, stem:"5時前に帰宅しなければならないことを表します（I have の続き）。次の語を正しく並べて英文を完成させなさい。",
      words:["home","to","go"], answer:"to go home" } ]}
]},

/* ===== 大問4 話し合い＋感想 ===== */
{ no:4, title:"ブラウン(Brown)先生と中学校の図書委員の Emma(エマ)、Riku(リク)、Aoi(アオイ)が、おすすめの本について話し合いをしています。次の英文は、話し合いと、それを聞いて Kenta が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Brown:</span> Good afternoon, everyone. Let\'s talk about books you like to read. Emma, can you tell us first?</span>'+
    '<span class="sp"><span class="who">Emma:</span> OK. In America, many students read fantasy stories. I love them because I can travel to another world in my mind.</span>'+
    '<span class="sp"><span class="who">Riku:</span> I usually read science books. When I was small, I sometimes read a science book at the library near my house.</span>'+
    '<span class="sp"><span class="who">Aoi:</span> That\'s interesting. I like history books. I often read them at home and tell my family about the stories.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> Reading is a good chance to （　え　） many things. But some people say young people don\'t read books now. Is that true?</span>'+
    '<span class="sp"><span class="who">Aoi:</span> My brother is a high school student, and he sometimes doesn\'t read any books.</span>'+
    '<span class="sp"><span class="who">Riku:</span> Every day? （　お　）</span>'+
    '<span class="sp"><span class="who">Aoi:</span> My mother buys him a book every month, but he is sometimes too busy with club activities.</span>'+
    '<span class="sp"><span class="who">Emma:</span> <u>(か) I became interested in Japanese stories</u> when I read a Japanese book in English. In the book, an old man helped a small bird. So I borrowed more Japanese books in America.</span>'+
    '<span class="sp"><span class="who">Riku:</span> Really? I want to read English stories at home, but I can\'t find easy ones.</span>'+
    '<span class="sp"><span class="who">Aoi:</span> Then, after the reading week, let\'s look for some easy English books together.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> The books people like are different, but enjoying a good story is always nice.</span>',
    note:'語注：fantasy ファンタジー／another world 別の世界／borrow 借りる' },
  { passage:'<b>Kenta の感想</b><br>The books people enjoy are different, and all of them sound interesting. '+
            'I want to （　き　） like Aoi. I can\'t do that on busy days with a lot of homework.', passageEn:true,
    items:[
    { type:"mcq", label:"(1)え", pt:3, stem:"（え）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("move"), E("sell"), E("learn"), E("close") ], answer:2 },
    { type:"mcq", label:"(2)お", pt:3, stem:"（お）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Who buys his books?"), E("Where does he sell them?"),
                E("How does she read a book?"), E("When does she write a story?") ], answer:0 },
    { type:"fill", label:"(3)", pt:4, stem:"下線部(か)の内容を表すように、本文中から連続する英語6語を抜き出して書きなさい。",
      answers:["i became interested in japanese stories"], hint:"英語6語" },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("In America, all students read history books."),
                E("Riku sometimes read a science book at the library."),
                E("Aoi's brother never reads any books."),
                E("Emma borrowed Japanese books in Japan.") ], answer:1 },
    { type:"mcq", label:"(5)", pt:3, stem:"感想の（き）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("read fantasy stories quietly"), E("read history books at home"),
                E("stop reading every day"), E("buy a science book for my family") ], answer:1 } ]}
]},

/* ===== 大問5 原稿（読解） ===== */
{ no:5, title:"次の英文は、リク(Riku)が書いた原稿です。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> In my first year of junior high, I joined the library committee. I liked reading, so I wanted to share good books with everyone.<br><br>'+
    '<b>②</b> Three months later, in November, we had a reading week. It was my first one. I decided to do my best. '+
    'I worked hard in the library every day. I read many famous books, and I asked some members how to introduce a book well. '+
    'When I finished my poster, I thought it was （　お　）. However, only a few students came to read. '+
    'My friend, Emma, said, "I think your poster needs something." I said, "What is it?" She said nothing. '+
    'I thought, "Maybe I should stop making posters because almost no one came."<br><br>'+
    '<b>③</b> That night, my grandmother heard my story. She said, "Why do you look so （　か　）?" I told her about the reading week. '+
    'She said, "How did you feel when you read the book?" I said, "I felt happy when the story was exciting." '+
    'She said, "Why not put that feeling into your poster? I think it will <u>(き) ( make / your / better / poster )</u>." '+
    'I said, "Thank you. But my drawing is not good." She said, "It\'s all right, Riku. You should keep trying if you truly love books. '+
    'If you keep trying, your posters will improve." I said, "<u>(く) That</u> may be right. I\'ll try again."<br><br>'+
    '<b>④</b> The next month, I made a poster with my feelings. I wrote about the story I loved. Finally, at the next reading week, many students came to read.<br><br>'+
    '<b>⑤</b> Of course, I sometimes think introducing books is difficult. But now, I don\'t think that I （　け　） posters when only a few people come. '+
    'I don\'t work for numbers. I will keep sharing books in high school.',
    passageEn:true,
    note:'語注：library committee 図書委員会／reading week 読書週間／poster ポスター／introduce 紹介する／keep 〜ing 〜し続ける',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"第2段落について、本文で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "毎日図書室で活動した。","有名な本をたくさん読んだ。",
                "新しい本を買いに行った。","部員に本の紹介のしかたをたずねた。" ], answer:2 },
    { type:"mcq", label:"(2)", pt:4, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お bad　か sad"), E("お perfect　か sad"),
                E("お bad　か excited"), E("お perfect　か excited") ], answer:1 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部(き)の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["make","your","better","poster"], answer:"make your poster better",
      display:"make your poster better" },
    { type:"mcq", label:"(4)①", pt:4, stem:"下線部(く)の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>リクが本当に（　①　）ならば、活動を続けるべきだ。続ければ、（　②　）ことができる、という祖母のことば。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "本が好き","読書週間で勝ちたい","有名になりたい","友達がほしい" ], answer:0 },
    { type:"mcq", label:"(4)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "ポスター（紹介）を上達させる","新しい本を買う","賞をもらう","委員会をやめる" ], answer:0 },
    { type:"fill", label:"(5)け", pt:4, stem:"（け）に入れるのに最も適当な英語3語を、本文中から抜き出して書きなさい。",
      answers:["should stop making"], hint:"英語3語（第2段落より）" },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Riku joined the library committee in his first year of junior high school."),
                E("Emma told Riku that no one came because he didn't read enough books."),
                E("Riku's grandmother won many prizes when she was young."),
                E("Many students came to read at the next reading week."),
                E("Riku will stop sharing books in high school.") ], answer:[0,3] } ]}
]}

]};
