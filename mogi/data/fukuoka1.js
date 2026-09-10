/* data/fukuoka1.js ─ 福岡県スタイル 模擬テスト①（60点満点・26問）
   参照：factory/inputs/fukuoka_notes.md（福岡県公立入試の「傾向のみ」を参照）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。

   ★岡山県スタイル（100点28問）とは別系統。福岡は 60点満点・大問1〜5・
     リスニングが1/3（20点）を占め、条件英作文が独立した最小の大問（8点）になる。
   ★配点は 2点を基本単位、重い4問だけ4点（2点×22＋4点×4＝60）。
   ★題材は桂川町らしさを出しつつ、地名・人名・特産・行事はすべて**架空**にしてある
     （実在の固有名詞の事実誤りを避けるため。既存の岡山10本と同じ流儀）。
   ⚠ 小問ごとの配点は公式「正答及び配点」PDFが未確認のため**仮置き**。
     形式が確定したら fukuoka_notes.md の対応表ごと差しかえる。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "福岡県スタイル 模擬テスト①",
fullMarks: 60,
sections: [

/* ===== 大問1 リスニング（問題1〜4・20点9問） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます。福岡県は問題1だけが1回読み、問題2〜4は2回読まれます）。", groups:[

  { intro:"問題1　放送を聞いて、内容に合うものをア〜エから1つ選びなさい。英文は1回だけ読まれます。",
    script:'(1) Look at the sign at Keino Station. The next train for Chikuno City leaves at ten forty.',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"放送に合うものはどれですか。",
      choices:["筑野市行きの次の電車は10時40分に出る。","筑野市行きの次の電車は10時14分に出る。",
               "筑野市行きの次の電車は11時40分に出る。","桂野行きの次の電車は10時40分に出る。"], answer:0 } ] },
  { script:'(2) Look at the picture. Kenta is carrying a big box, and Aya is holding two small bags.',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"放送に合う絵はどれですか。",
      choices:["ケンタが大きな箱を運び、アヤが小さなふくろを2つ持っている。","ケンタが小さな箱を運び、アヤが大きなふくろを2つ持っている。",
               "ケンタが大きな箱を運び、アヤが小さなふくろを1つ持っている。","ケンタが大きなふくろを運び、アヤが小さな箱を2つ持っている。"], answer:0 } ] },

  { intro:"問題2　アヤ(Aya)とケンタ(Kenta)が、下の案内を見ています。放送を聞いて、それぞれの問いに答えなさい。英文は2回読まれます。",
    passage:'<b>桂野川ホタルまつり</b>'+
      '<table><tr><th>日</th><th>時こく</th><th>内容</th></tr>'+
      '<tr><td>Friday</td><td>7:30 p.m.</td><td>Free walk</td></tr>'+
      '<tr><td>Saturday</td><td>7:00 p.m.</td><td>Guided walk</td></tr>'+
      '<tr><td>Saturday</td><td>8:30 p.m.</td><td>Free walk</td></tr>'+
      '<tr><td>Sunday</td><td>7:00 p.m.</td><td>Guided walk</td></tr></table>',
    script:'(1) Aya wants to see the fireflies with her family. They can go only on Saturday, and they want to join the guided walk. Which one should they choose?',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"アヤの家族が選ぶのはどれですか。",
      choices:[ E("Friday, 7:30 p.m."), E("Saturday, 7:00 p.m."),
                E("Saturday, 8:30 p.m."), E("Sunday, 7:00 p.m.") ], answer:1 } ] },
  { script:'(2) Kenta will leave Keino Station at four. It takes twenty minutes to Keino Firefly Park. What time will he get to the park?',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"ケンタが公園に着く時こくはどれですか。",
      choices:[ E("3:40 p.m."), E("4:00 p.m."), E("4:20 p.m."), E("4:40 p.m.") ], answer:2 } ] },

  { intro:"問題3　ALTのエマ(Emma)先生が、自分の国の学校について話しています。アヤのメモの（あ）（い）に入る英語1語を書きなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, I\'m Emma. In my country, school starts in <b>February</b>, not in April.</span>'+
      '<span class="sp">We have no uniforms, so we can choose our own <b>clothes</b> every morning.</span>',
    passage:'<b>アヤのメモ</b><br>Emma の国の学校<br>— school starts in （　あ　）, not in April<br>'+
            '— no uniforms → we can choose our own （　い　） every morning',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）2月", answers:["February"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）服", answers:["clothes"], hint:"英語1語" } ] },

  { intro:"問題4　山口先生(Mr. Yamaguchi)が、職場体験について説明しています。放送を聞いて(1)〜(3)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next month, you will have a work experience day. You can choose one of three places.</span>'+
      '<span class="sp">At the Keino Local Museum, you will help visitors and clean the old tools. At the strawberry farm, you will pick strawberries and pack them in boxes. At the library, you will put books back and read stories to small children.</span>'+
      '<span class="sp">Kenta has already chosen the library. He said, "I want to read more books, so this is a good place for me."</span>'+
      '<span class="sp">Please bring your lunch and comfortable shoes. We will leave school at eight thirty.</span>',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["体験先は3つあり、その中から1つ選ぶ。","体験先は3つあり、その中から2つ選ぶ。",
               "学校を9時30分に出発する。","昼食は学校で用意される。"], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"いちご農園ですることとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("help visitors and clean the old tools"), E("pick strawberries and pack them in boxes"),
                E("put books back and read stories"), E("clean the school and cook lunch") ], answer:1 },
    { type:"fill", label:"(3)", pt:4,
      stem:"ケンタが図書館を選んだ理由を、放送の中の語を使って英語3語で書きなさい。<br>"+
           E("Kenta chose the library because he wants to （　　）."),
      answers:["read more books"], hint:"英語3語（放送の中の言い方をそのまま使う）" } ] }
]},

/* ===== 大問2 短い対話の空所補充（8点4問） ===== */
{ no:2, title:"次の(1)〜(4)の対話について、それぞれの問いに答えなさい。", groups:[
  { note:"語注：ribbon リボン",
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: I hear you went to the Keino Local Museum last Sunday.<br>B: Yes. （　　）<br>A: That sounds interesting."),
      choices:[ E("I saw many old tools there."), E("I will go there next Sunday."),
                E("I don't like old things."), E("It was closed all day.") ], answer:0 },
    { type:"mcq", label:"(2)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: Which bag is yours?<br>B: （　　）<br>A: The blue one? OK, I'll get it."),
      choices:[ E("The one that has a blue ribbon."), E("I bought it last week."),
                E("Yes, it is mine."), E("I don't have a bag.") ], answer:0 },
    { type:"fill", label:"(3)", pt:2,
      stem:"（　）内の語を、最も適当な形に変えて1語で書きなさい。<br>"+
           E("Aya has ( write ) three letters to her friend in Australia."),
      answers:["written"], hint:"has のうしろ・1語" },
    { type:"wordorder", label:"(4)", pt:2,
      stem:"次の語を正しく並べかえて、対話を完成させなさい。<br>"+
           E("A: What are you reading?<br>B: This is （　　）."),
      words:["written","the","book","by","my","brother"], answer:"the book written by my brother" } ]}
]},

/* ===== 大問3 対話文読解（10点5問） ===== */
{ no:3, title:"中学生のケンタ(Kenta)とアヤ(Aya)、留学生のエマ(Emma)が、ホタルの観察会の案内を見ながら話しています。次は、その案内と会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Keino Firefly Park — Firefly Watching</h4>'+
    '<div class="note">Come and see the fireflies by the Keino River!</div>'+
    '<table><tr><td>Date</td><td>June 6 (Sat) and June 7 (Sun)</td></tr>'+
    '<tr><td>Time</td><td>7:00 p.m. – 8:30 p.m.</td></tr>'+
    '<tr><td>Meeting place</td><td>The gate of Keino Firefly Park</td></tr>'+
    '<tr><td>Ticket</td><td>300 yen　(students: free)</td></tr>'+
    '<tr><td>Guide</td><td>Mr. Mori, a member of the Keino Nature Club</td></tr></table>'+
    '<div class="note">Bring … a small light and long sleeves. It gets cold by the river.<br>'+
    'If it rains, we will hold it on the next Saturday.</div>',
    passage:
    '<span class="sp"><span class="who">Kenta:</span> Look at this, Aya. There will be a firefly watching event at Keino Firefly Park.</span>'+
    '<span class="sp"><span class="who">Aya:</span> Wow! I have never seen fireflies. When is it?</span>'+
    '<span class="sp"><span class="who">Kenta:</span> On June sixth and seventh. It starts at seven in the evening and finishes at eight thirty.</span>'+
    '<span class="sp"><span class="who">Aya:</span> That\'s a little late, but I want to go. How much is the ticket?</span>'+
    '<span class="sp"><span class="who">Kenta:</span> Three hundred yen for adults, but it is （　あ　） for students.</span>'+
    '<span class="sp"><span class="who">Aya:</span> Really? So we don\'t have to pay anything?</span>'+
    '<span class="sp"><span class="who">Kenta:</span> That\'s right. Everything is （　あ　） for us. Emma, will you come with us?</span>'+
    '<span class="sp"><span class="who">Emma:</span> Of course. In my country we don\'t have fireflies, so this will be my first time.</span>'+
    '<span class="sp"><span class="who">Kenta:</span> Then you should bring a small light. The park is very dark at night.</span>'+
    '<span class="sp"><span class="who">Emma:</span> I see. Please tell me <u>(い) ( the / things / bring / I / should )</u>.</span>'+
    '<span class="sp"><span class="who">Aya:</span> A light and long sleeves. It gets cold by the river, even in June.</span>'+
    '<span class="sp"><span class="who">Emma:</span> Thank you. What will we do if it rains?</span>'+
    '<span class="sp"><span class="who">Kenta:</span> Don\'t worry. They will hold it on the next Saturday.</span>'+
    '<span class="sp"><span class="who">Emma:</span> That\'s good. I\'m looking forward to it.</span>',
    note:'語注：firefly ホタル／sleeve そで／adult おとな',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"2か所の（あ）に共通して入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("free"), E("busy"), E("dark"), E("cold") ], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"雨がふったときについて、案内と会話から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("The event will be held on the next Saturday."), E("The event will be canceled."),
                E("The event will start at eight."), E("The event will move to the museum.") ], answer:0 },
    { type:"mcq", label:"(3)", pt:2, stem:"案内や会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Emma has never seen fireflies before."), E("Aya has seen fireflies many times."),
                E("Students must pay three hundred yen."), E("The event finishes at seven in the evening.") ], answer:0 },
    { type:"fill", label:"(4)", pt:2,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、会話の中から抜き出して書きなさい。<br>"+
           E("The park is （　　）, so Emma should bring a small light."),
      answers:["very dark at night"], hint:"英語4語" },
    { type:"wordorder", label:"(5)", pt:2, stem:"下線部(い)の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["the","things","bring","I","should"], answer:"the things I should bring",
      display:"the things I should bring" } ]}
]},

/* ===== 大問4 長文読解（14点5問・グラフつき） ===== */
{ no:4, title:"次の英文は、桂野中学校のアヤ(Aya)が、探究学習の発表で話した内容です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Aya. My family grows strawberries in Keino Town. '+
    'Last year, my father said, "This year we could not pick many strawberries in May." '+
    'I wanted to know why, so I studied the strawberries on our farm for one year.<br><br>'+
    '<b>②</b> First, I counted the boxes of strawberries we picked each month. '+
    'Then I wrote down the average temperature of each month. I put both on one graph. '+
    'The graph shows the number of boxes as bars, and the temperature as a line.<br><br>'+
    '<b>③</b> Look at the graph. We picked the most boxes in March. '+
    'The number went down in April, and it went down again in May. '+
    'At the same time, the temperature went up every month. In May, it was over twenty degrees. '+
    'I also found that the best time to pick strawberries is the middle of March. '+
    'From this, I understood that <u>④ hot days are not good for strawberries</u>.<br><br>'+
    '<b>⑤</b> Now I know why we could not pick many strawberries last May. '+
    'This year, my father put a white sheet over the field to keep it cool, '+
    'and we picked more boxes in May than last year. '+
    '<u>③ ( how / I / important / learned / the temperature is )</u> for our strawberries. '+
    'I want to keep studying our farm.',
    passageEn:true,
    flyer:
    '<h4>グラフ：桂野いちご　月ごとの収穫箱数（棒）と平均気温（折れ線）</h4>'+
    '<table><tr><th>月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th></tr>'+
    '<tr><td>収穫箱数</td><td>60</td><td>120</td><td>90</td><td>40</td></tr>'+
    '<tr><td>平均気温（℃）</td><td>8</td><td>12</td><td>17</td><td>22</td></tr></table>',
    note:'語注：average 平均の／degree 度／field 畑／sheet シート',
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"次の1文は、①〜⑤のどの段落の直後に入れるのが最も適当ですか。<br>"+
           E("In other words, the strawberries were too warm."),
      choices:["①の直後","②の直後","③の直後","⑤の直後"], answer:2 },
    { type:"mcq", label:"(2)", pt:2, stem:"グラフと本文から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:["3月は収穫箱数が最も多く、平均気温は12℃だった。","5月は収穫箱数が最も多かった。",
               "4月の平均気温は2月より低かった。","2月の収穫箱数は3月より多かった。"], answer:0 },
    { type:"wordorder", label:"(3)", pt:2, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["how","I","important","learned","the temperature is"],
      answer:"I learned how important the temperature is",
      display:"I learned how important the temperature is" },
    { type:"fill", label:"(4)", pt:4,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、第3段落から抜き出して書きなさい。<br>"+
           E("Aya found that the best time to pick strawberries is （　　）."),
      answers:["the middle of March"], hint:"第3段落の語・英語4語" },
    { type:"mcqMulti", label:"(5)", pt:4, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Aya's family grows strawberries in Keino Town."),
                E("Aya studied the strawberries on her farm for one month."),
                E("Aya's father put a white sheet over the field this year."),
                E("The temperature went down every month."),
                E("Aya wants to stop studying her farm.") ], answer:[0,2] } ]}
]},

/* ===== 大問5 条件英作文（8点3問・骨組みを作る形） ===== */
{ no:5, title:"留学生のエマ(Emma)を、1日だけ桂野町に案内します。次のA〜Cから1つ選び、案内したい場所とその理由を伝える英文を作ります。ここでは B を選んだものとして、(1)〜(3)に答えなさい。", groups:[
  { passage:
    '<b>3つの案</b><br>'+
    'A： 桂野川の自然　'+E("the Keino River")+'<br>'+
    'B： 桂野郷土館　'+E("the Keino Local Museum")+'<br>'+
    'C： いちご農園　'+E("a strawberry farm")+'<br><br>'+
    '<b>作る英文の組み立て</b><br>'+
    '① どこへ案内したいか　→　② その理由　→　③ 相手にどうなってほしいか',
    note:'語注：tool 道具',
    items:[
    { type:"wordorder", label:"(1)", pt:2,
      stem:"①「わたしはエマを桂野郷土館へ連れて行きたい。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["want","I","take","to","Emma","to the Keino Local Museum"],
      order:["I","want","to","take","Emma","to the Keino Local Museum"],
      answer:"I want to take Emma to the Keino Local Museum",
      display:"I want to take Emma to the Keino Local Museum." },
    { type:"wordorder", label:"(2)", pt:2,
      stem:"②「そこには桂野町で使われていた古い道具がたくさんあるからです。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["because","many","there","are","old tools","used in Keino Town"],
      answer:"because there are many old tools used in Keino Town",
      display:"because there are many old tools used in Keino Town." },
    { type:"fill", label:"(3)", pt:4,
      stem:"③「わたしはエマに、わたしたちの町についてもっと知ってほしい。」という文にします。<br>"+
           "（　）に入れるのに最も適当な英語3語を書きなさい。<br>"+
           E("I want Emma （　　） more about our town."),
      answers:["to learn about"], hint:"英語3語（want＋人＋to 〜 の形）" } ]}
]}

]};
