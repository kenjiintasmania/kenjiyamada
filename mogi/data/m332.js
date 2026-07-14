/* data/m332.js ─ 中3 模擬テスト 332
   構成：岡山県型（正進社 3年 第3回）と同一。大問1〜5・リスニング問題A〜D・合計100点。
   出題傾向・問題数・配点は chu3_3 と完全一致。内容はすべて新規（読書／図書館／物語を書くこと）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 模擬テスト 332",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵を選ぶ */
  { intro:"問題A　放送を聞いて、内容に合う絵をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the sign. The library opens at ten and closes at six.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵（図書館の開館時間の表示）はどれですか。",
      choices:["図書館は10時に開き、6時に閉まる。","図書館は10時に開き、5時に閉まる。",
               "図書館は9時に開き、6時に閉まる。","図書館は10時に開き、7時に閉まる。"], answer:0 } ] },
  { script:'(2) Look at the picture. It is sunny today, and two girls are reading books under a big tree.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う絵（今日の天気と様子）はどれですか。",
      choices:["雨で、女の子が2人木の下で本を読んでいる。","晴れで、女の子が3人木の下で本を読んでいる。",
               "晴れで、女の子が2人木の下で本を読んでいる。","くもりで、女の子が2人ベンチで本を読んでいる。"], answer:2 } ] },

  /* 問題B：チャイムの応答 */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> Will you come to the book club after school?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Sure, I'd love to."), E("No, I didn't read the book."), E("It was an interesting story."), E("You're welcome.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> How many books have you read this month?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I'll go to the library tomorrow."), E("About four books."), E("Yes, I like reading."), E("Let's read together.") ], answer:1 } ] },

  /* 問題C：メモの空所補充 */
  { intro:"問題C　コウタ(Kota)が、ALTのベイカー(Ms. Baker)先生に将来の夢についてインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hi, I\'m Ms. Baker from Australia. When I was a child, I wanted to be a <b>writer</b> like my father.</span>'+
      '<span class="sp">But I loved libraries very much, so now I am a <b>librarian</b> here in Japan.</span>'+
      '<span class="sp">In the future, I want to write a <b>story</b> for young children.</span>',
    passage:'<b>コウタのメモ</b><br>Ms. Baker — wanted to be a （　あ　） like her father<br>'+
            '— now she is a （　い　） in Japan<br>— wants to write a （　う　） for children',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）作家・書く人", answers:["writer"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）図書館員・司書", answers:["librarian"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）物語・お話", answers:["story"], hint:"英語1語" } ] },

  /* 問題D：説明を聞いて答える */
  { intro:"問題D　あなたとクラスメイトのメイ(Mei)が、ブックウィークについての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next week we will have a book week at school. You can choose one activity to join.</span>'+
      '<span class="sp">Group A will read picture books to little children. Group B will make bookmarks for the library. Group C will join a writing workshop.</span>'+
      '<span class="sp">The book week starts on Thursday. Please bring your favorite book and a pencil.</span>'+
      '<span class="sp"><span class="who">Mei:</span> I really like writing stories. Which group will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["ブックウィークは水曜日に始まる。","参加者は図書館用のしおりを作ることができる。",
               "説明では、えんぴつは必要ないと言っている。","自分のお気に入りの本は持ってこなくてよい。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"メイの発言に対するあなたの答えを完成させなさい。<br>"+E("I really like writing stories. So I will choose the （　　）.")+"（英語2語）",
      answers:["writing workshop"], hint:"英語2語" } ] }
]},

/* ===== 大問2 チラシ＋対話 ===== */
{ no:2, title:"中学生のユウト(Yuto)とリナ(Rina)が、みどり市立図書館で行われる作家アオキ(Ms. Aoki)先生の特別講演会のちらしを見ながら話しています。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Meet Ms. Aoki, a Story Writer!</h4>'+
    '<div class="note">Hello, everyone! Come and enjoy the world of stories with me!</div>'+
    '<table><tr><td>Date</td><td>October 10, 2026</td></tr>'+
    '<tr><td>Morning talk</td><td>10:00 a.m. – 11:00 a.m.</td></tr>'+
    '<tr><td>Afternoon talk</td><td>2:00 p.m. – 3:00 p.m.</td></tr></table>'+
    '<div class="note">I am … Ms. Aoki, a story writer. (I have written books for fifteen years.)<br>'+
    'I like … coffee, walking, reading old stories … and cats! '+
    '(Please tell me about a good café!)　→ You can join here.</div>',
    passage:
    '<span class="sp"><span class="who">Yuto:</span> Look, Rina. Did you know about this event?</span>'+
    '<span class="sp"><span class="who">Rina:</span> Yes. Ms. Aoki is the （　あ　） famous writer in our city.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> Really? I want to join, but I\'m not （　い　） that I can ask good questions.</span>'+
    '<span class="sp"><span class="who">Rina:</span> You don\'t need to worry about that when you talk with her.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> Good advice. She likes coffee. My favorite café is near the station. '+
    'I think the coffee there is the <u>(う) good</u> in our town.</span>'+
    '<span class="sp"><span class="who">Rina:</span> That\'s nice. I\'m （　い　） she will be happy to hear that.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> The talk is two days from now. I have piano practice in the morning that day.</span>'+
    '<span class="sp"><span class="who">Rina:</span> What time will it finish?</span>'+
    '<span class="sp"><span class="who">Yuto:</span> It will finish at eleven thirty. Then I can join the afternoon talk and ask about writing stories!</span>',
    note:'語注：writer 作家／worry about 〜 〜を気にする／café カフェ',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"（あ）に入れるのに最も適当な英語1語を書きなさい。", answers:["most"], hint:"the （　） famous" },
    { type:"fill", label:"(2)い", pt:3, stem:"2か所の（い）に共通して入る最も適当な英語1語を書きなさい。", answers:["sure"], hint:"I'm not 〜 / I'm 〜" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) good を、最も適当な形に変えて1語で書きなさい。", answers:["best"], hint:"the 〜 in our town" },
    { type:"mcq", label:"(4)", pt:3, stem:"ユウトとリナが話している日として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("October 8"), E("October 9"), E("October 10"), E("October 11") ], answer:0 },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Ms. Aoki has written books for fifteen years."),
                E("Yuto cannot ask any questions to Ms. Aoki."),
                E("There is a bookstore near the station in Yuto's town."),
                E("Yuto will join the morning talk.") ], answer:0 } ]}
]},

/* ===== 大問3 日記の英作文 ===== */
{ no:3, title:"次は、ヒナ(Hina)の日記の一部と、その日のできごとを表したイラストです。日記とイラストの内容に合うように、(1)に4語以上、(2)に3語以上の英語を書き、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：おばあさんが部屋でたくさんの手作りの絵本(picture books)を見せている。棚にはカラフルな絵本がいっぱい並んでいる。",
    passage:
    'October 5<br><br>'+
    'This afternoon, my grandmother took me to her room. She said, "I want to show you something." '+
    'On the shelf, there were so many colorful picture books. I was surprised and said, "Wow! '+
    '<u>(1)</u>!" Grandmother smiled and said, "Yes. I started making them thirty years ago." She gave me one as a present. '+
    'In the evening, I sent <u>(2)</u> to my family in Osaka. They were excited, too.',
    passageEn:true,
    note:'語注：shelf たな／picture book 絵本',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：たくさんの絵本を見て驚く場面。次の語を正しく並べて英文を完成させなさい。",
      words:["made","You","books","many","have","beautiful"], answer:"You have made many beautiful books" },
    { type:"wordorder", label:"(2)", pt:5, stem:"夜、そのことを家族に知らせる場面です（I sent の続き）。次の語を正しく並べて英文を完成させなさい。",
      words:["a","about","it","message"], answer:"a message about it" } ]}
]},

/* ===== 大問4 話し合い＋感想 ===== */
{ no:4, title:"グリーン(Ms. Green)先生の英語の授業で、Koki、Nao、Ren が、好きな本について話し合いをしています。次の英文は、話し合いと、それを聞いて Emi が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Ms. Green:</span> Today, let\'s talk about books. What kind of story do you like? Koki, tell us first.</span>'+
    '<span class="sp"><span class="who">Koki:</span> I like reading science books. I love science, and I want to learn how to make robots.</span>'+
    '<span class="sp"><span class="who">Ms. Green:</span> That\'s nice. Are you good at science, Koki?</span>'+
    '<span class="sp"><span class="who">Koki:</span> Yes. I have read many science books for three years. I want to build a robot someday.</span>'+
    '<span class="sp"><span class="who">Ms. Green:</span> Wonderful. I hope your dream will come true.</span>'+
    '<span class="sp"><span class="who">Nao:</span> I like mystery stories. My brother gave me a mystery book last year, and it was very exciting.</span>'+
    '<span class="sp"><span class="who">Ms. Green:</span> Oh, that\'s a great reason. Do you like reading, Nao?</span>'+
    '<span class="sp"><span class="who">Nao:</span> Yes, reading books is the thing I like the most. I want to read many stories from other countries.</span>'+
    '<span class="sp"><span class="who">Ms. Green:</span> That\'s wonderful. Ren, how about you?</span>'+
    '<span class="sp"><span class="who">Ren:</span> I want to write my own stories. I hear it is hard to write a good story, and I want to study how to write at a university.</span>'+
    '<span class="sp"><span class="who">Ms. Green:</span> Writing a good story is not （　あ　）, but it\'s a wonderful thing.</span>'+
    '<span class="sp"><span class="who">Ren:</span> I think so.</span>'+
    '<span class="sp"><span class="who">Ms. Green:</span> OK, I\'m going to talk about myself. When I was young, I read a book about a foreign country. I wanted to see the world, so I decided to travel and write stories.</span>'+
    '<span class="sp"><span class="who">Ren:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Ms. Green:</span> Good question. When I was twenty-three, I came to Japan to write a story about its towns. The people were kind, and I was very happy. So I am still here.</span>'+
    '<span class="sp"><span class="who">Ren:</span> And now you are teaching us and writing stories.</span>'+
    '<span class="sp"><span class="who">Ms. Green:</span> Yes, and I love it. I hope you\'ll find a book you really like.</span>',
    note:'語注：science 理科・科学／mystery 推理もの・なぞ／own 自分自身の／university 大学' },
  { passage:'<b>Emi の感想</b><br>There are many kinds of wonderful stories in the world. Like Nao, I love mystery stories. '+
            'I （　X　）, too, so I want to read many exciting books at the library.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Koki の発言から抜き出して書きなさい。<br>"+E("Koki wants to learn [　　] robots in the future."),
      answers:["how to make"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("bad"),E("easy"),E("difficult"),E("sad")], answer:1 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Where do you live now?"), E("Why did you come to Japan?"),
                E("How many books do you have?"), E("What time do you get up?") ], answer:1 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Koki wants to learn how to make robots."),
                E("Nao doesn't like reading books."),
                E("Ms. Green came to Japan to study music."),
                E("Ren wants to be a scientist.") ], answer:0 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("play the guitar well"), E("like reading stories"),
                E("want to travel abroad"), E("study math every day") ], answer:1 } ]}
]},

/* ===== 大問5 意見文（読解） ===== */
{ no:5, title:"次の英文は、読書クラブのサナ(Sana)が発表した意見文です。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Sana from the reading club. Today I want to talk about my experience of learning to enjoy reading. '+
    'When I was in my first year, I did not like reading at all. But now I really love reading. I want to share my story with you.<br><br>'+
    '<b>②</b> Last spring, I joined the reading club. At first, reading was very hard for me. '+
    'I could not understand long stories and got bored soon. I sometimes wanted to stop going to the club. '+
    'One day, my brother saw me. He said, "Don\'t give up. If you keep reading, you will find a story you love." '+
    'These words <u>(お) ___</u> my mind. I decided to try harder.<br><br>'+
    '<b>③</b> After that, I read many books every day. A club member also helped me a lot. '+
    'She taught me how to choose good books. She said, "You should not read only hard books. Easy books make your reading more fun." '+
    'I followed her advice. Little by little, I could read longer stories.<br><br>'+
    '<b>④</b> Some people say that reading is only for fun. That\'s true. <u>④ Reading is a good way to make your world larger</u>. '+
    'But it is more than that for me. <u>③ ( me / reading / many things / taught )</u>. '+
    'I learned that I should not stop trying. When I keep reading, I can <u>(か) ___</u> my dream. '+
    'So please don\'t give up, and find something you love!',
    passageEn:true,
    note:'語注：give up あきらめる／get bored たいくつになる／advice 助言',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お changed　か lose"), E("お changed　か reach"),
                E("お lost　か lose"), E("お lost　か reach") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "サナは毎日たくさんの本を読んだ。", "部員が良い本の選び方を教えてくれた。",
                "部員は難しい本だけを読むべきだと言った。", "サナは少しずつ長い物語を読めるようになった。" ], answer:2 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["me","reading","many things","taught"], answer:"Reading taught me many things",
      display:"Reading taught me many things" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語2語を、第2段落中から抜き出して書きなさい。<br>"+E("Sana's brother told her not to （　え　）."),
      answers:["give up"], hint:"第2段落の語・英語2語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>読書は、あなたの（　①　）をより（　②　）するためのよい方法だ。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "世界（せかい）","体（からだ）","心（こころ）","時間（じかん）" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "大きく（広く）","小さく","暗く","重く" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Sana did not like reading at all in her first year."),
                E("Sana never wanted to stop going to the club."),
                E("Sana's brother told her to keep reading."),
                E("Sana's club member said that she should read only hard books."),
                E("Sana thinks reading is only for fun.") ], answer:[0,2] } ]}
]}

]};
