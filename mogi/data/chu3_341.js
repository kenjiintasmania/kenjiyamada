/* data/chu3_341.js ─ 中3 習熟度テスト対策 341
   参照：factory/inputs/okayama_notes.md（習熟度テスト・県立入試の「傾向のみ」を参照。冊子コード 633340 系を分析）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。
   題材：朝市／地元の農家／地産地消（架空の町 Yamabe / Sakura）。
   ※過去問および既存の模試データとの内容重複なし。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 習熟度テスト対策 341",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・グラフを選ぶ（英文1回読み・2問） */
  { intro:"問題A　放送を聞いて、内容に合う絵やグラフをア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the picture. Nanami is carrying two baskets of tomatoes and one bag of potatoes.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵はどれですか。",
      choices:["トマトのかご2つと、じゃがいもの袋1つ","トマトのかご1つと、じゃがいもの袋2つ",
               "トマトのかご2つと、じゃがいもの袋2つ","トマトのかご1つと、じゃがいもの袋1つ"], answer:0 } ] },
  { script:'(2) Look at the graph. At the Yamabe morning market, vegetables are the most popular. Flowers are more popular than eggs.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合うグラフ（ヤマベ朝市で人気のあるもの）はどれですか。",
      choices:["1位 野菜、2位 花、3位 卵","1位 野菜、2位 卵、3位 花",
               "1位 花、2位 野菜、3位 卵","1位 卵、2位 野菜、3位 花"], answer:0 } ] },

  /* 問題B：チャイムの応答（対話の最後への応答・2回読み・2問） */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> The market opens at six thirty. Shall we meet at the station at six?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("OK. I'll be there before that."), E("No, I don't like tomatoes."),
                E("Yes, I bought some flowers."), E("It closed last Sunday.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> Oh no, I forgot my shopping bag. What should I do?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I helped my mother yesterday."), E("Don't worry. You can use mine."),
                E("The carrots were very sweet."), E("I'll visit the farm next week.") ], answer:1 } ] },

  /* 問題C：メモの空所補充（英語1語×3・2回読み） */
  { intro:"問題C　ハル(Haru)が、朝市に野菜を出している農家のベイカー(Mr. Baker)さんにインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, I\'m Mr. Baker. I grow vegetables, and I bring them to the market every <b>Friday</b> morning.</span>'+
      '<span class="sp">The most important thing for me is the <b>smile</b> of the people who buy my vegetables.</span>'+
      '<span class="sp">In the future, I want to teach young <b>farmers</b> how to grow good vegetables.</span>',
    passage:'<b>ハルのメモ</b><br>Mr. Baker — brings vegetables to the market every （　あ　） morning<br>'+
            '— the most important thing is the （　い　） of the people who buy them<br>'+
            '— wants to teach young （　う　） in the future',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）金曜日", answers:["Friday"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）笑顔", answers:["smile"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）農家の人たち", answers:["farmers"], hint:"英語1語" } ] },

  /* 問題D：説明＋人物発言（内容一致選択＋3語の英語） */
  { intro:"問題D　あなたとクラスメイトのユウタ(Yuta)が、朝市の手伝いについての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next Saturday, Yamabe Town will hold a morning market for junior high school students. You can choose one job.</span>'+
      '<span class="sp">Job A is carrying vegetables from the trucks. Job B is making price cards. Job C is telling visitors about our town.</span>'+
      '<span class="sp">The work starts at seven in the morning and finishes at ten. Please wear comfortable shoes.</span>'+
      '<span class="sp"><span class="who">Yuta:</span> I\'m not good at speaking to people I don\'t know, but I like drawing. Which job will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["仕事は朝7時に始まり、10時に終わる。","仕事は3種類あり、2つまで選ぶことができる。",
               "参加できるのは高校生だけである。","参加者は自分の野菜を持ってくる。"], answer:0 },
    { type:"fill", label:"(2)", pt:3,
      stem:"ユウタの発言に対して、あなたはどのように答えますか。書き出しに続けて（　）に3語の英語を書き、英文を完成させなさい。<br>"+
           E("That's a good job for you. Let's （　　） together."),
      answers:["make price cards"], hint:"英語3語（説明の中の言い方を使う）" } ] }
]},

/* ===== 大問2 ポスター＋対話 ===== */
{ no:2, title:"中学生のハル(Haru)とナナミ(Nanami)が、ヤマベ町の朝市のポスターを見ながら会話をしています。次は、そのポスターと会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>The 30th Yamabe Morning Market</h4>'+
    '<div class="note">Fresh vegetables from our own town!</div>'+
    '<table><tr><td>Date</td><td>Sunday, October 12</td></tr>'+
    '<tr><td>Place</td><td>Yamabe Station Square</td></tr>'+
    '<tr><td>Open</td><td>6:30 a.m. – 11:00 a.m.</td></tr>'+
    '<tr><td>Cooking show</td><td>8:00 a.m. – 9:00 a.m.</td></tr>'+
    '<tr><td>Free soup</td><td>for the first one hundred people</td></tr></table>'+
    '<div class="note">Guide … Ms. Clark, an English teacher. (She has lived in Yamabe for eight years.)<br>'+
    'Bring … your own bag. We don\'t give plastic bags.</div>',
    passage:
    '<span class="sp"><span class="who">Haru:</span> Look at this, Nanami. The morning market will be held next Sunday.</span>'+
    '<span class="sp"><span class="who">Nanami:</span> I know. The vegetables there are very （　あ　）, because the farmers pick them that morning.</span>'+
    '<span class="sp"><span class="who">Haru:</span> Nice. I want to eat （　あ　） tomatoes. But I have club practice, and it will finish at nine.</span>'+
    '<span class="sp"><span class="who">Nanami:</span> That\'s OK. The market is open until eleven, so you can still buy a lot.</span>'+
    '<span class="sp"><span class="who">Haru:</span> Wow, the thirtieth market! It （　い　） held for a long time, right?</span>'+
    '<span class="sp"><span class="who">Nanami:</span> Yes. My mother went there when she was a child.</span>'+
    '<span class="sp"><span class="who">Haru:</span> That\'s amazing. Have you been there before?</span>'+
    '<span class="sp"><span class="who">Nanami:</span> Of course. I have <u>(う) buy</u> vegetables there many times.</span>'+
    '<span class="sp"><span class="who">Haru:</span> Then I\'ll bring a big bag and go with you after practice.</span>',
    note:'語注：pick 〜をつむ／until 〜まで／thirtieth 30番目の',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"2か所の（あ）に共通して入れるのに最も適当な英語1語を、ポスターの中から抜き出して書きなさい。",
      answers:["fresh"], hint:"ポスターの中にある語" },
    { type:"fill", label:"(2)い", pt:3, stem:"（い）に入れるのに最も適当な2語の英語を書きなさい。", answers:["has been"], hint:"英語2語（〜され続けている）" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う)の単語を、最も適当な形に変えて1語で書きなさい。", answers:["bought"], hint:"I have 〜 vegetables there many times." },
    { type:"mcq", label:"(4)", pt:3, stem:"ポスターから、無料のスープをもらえるのは何人までですか。最も適当なのは、ア〜エのどれですか。",
      choices:[ E("the first fifty people"), E("the first one hundred people"),
                E("the first thirty people"), E("everyone at the market") ], answer:1 },
    { type:"mcq", label:"(5)", pt:4, stem:"ポスターや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Ms. Clark has lived in Yamabe for eight years."),
                E("The market will finish at nine in the morning."),
                E("Nanami has never been to the morning market."),
                E("Visitors can get plastic bags at the market.") ], answer:0 } ]}
]},

/* ===== 大問3 会話の英作文（並べかえ2問） ===== */
{ no:3, title:"朝市に来た留学生のケリー(Kelly)と、中学生のハル(Haru)が会話をしています。次の①〜⑥はそのときの二人の会話です。二人が考えている内容に合うように、(1)(2)の語を正しく並べかえて、会話を完成させなさい。なお、会話は①〜⑥の順に行われています。", groups:[
  { sceneNote:"イラスト：①ケリーがトマトを見て「おいしそう」と言っている。②ハルが「祖父が育てました。1つ食べてみませんか」とすすめている。③ケリーが「ありがとう。とても甘い！」と喜んでいる。④ハルが「気に入ってくれてうれしいです」と答えている。⑤ケリーが「どれくらい長くそれらを育てているの」と考えながらたずねている。⑥ハルが「30年以上です」と答えている。",
    passage:
    '<span class="sp"><span class="who">Kelly:</span> ① Wow, these tomatoes look delicious.</span>'+
    '<span class="sp"><span class="who">Haru:</span> ② My grandfather grew them. <u>(1)</u>?</span>'+
    '<span class="sp"><span class="who">Kelly:</span> ③ Thank you. It\'s very sweet!</span>'+
    '<span class="sp"><span class="who">Haru:</span> ④ I\'m glad you like it.</span>'+
    '<span class="sp"><span class="who">Kelly:</span> ⑤ <u>(2)</u>?</span>'+
    '<span class="sp"><span class="who">Haru:</span> ⑥ For more than thirty years.</span>',
    passageEn:true,
    note:'語注：grew 〜を育てた（grow の過去形）',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：ハルが「1つ食べてみませんか」とすすめる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["Would","like","you","eat","to","one"], answer:"Would you like to eat one" },
    { type:"wordorder", label:"(2)", pt:5, stem:"イラスト：ケリーが「どれくらい長くそれらを育てているのですか」とたずねる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["long","How","he","has","grown","them"], answer:"How long has he grown them" } ]}
]},

/* ===== 大問4 話し合い＋感想 ===== */
{ no:4, title:"ホワイト(Ms. White)先生の英語の授業で、Sho、Mei、Ken が、地元の食べ物について話し合いをしています。次の英文は、話し合いと、それを聞いて Nana が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Ms. White:</span> Today, let\'s talk about the food in our town. What do you want to tell people from other places? Sho, please start.</span>'+
    '<span class="sp"><span class="who">Sho:</span> I want to <u>sell our tomatoes</u> at the station. Many people pass there every day.</span>'+
    '<span class="sp"><span class="who">Ms. White:</span> That\'s a good idea. Why did you choose tomatoes, Sho?</span>'+
    '<span class="sp"><span class="who">Sho:</span> Because the tomatoes in this town are sweeter than others. My family has grown them for many years.</span>'+
    '<span class="sp"><span class="who">Ms. White:</span> I see. Mei, how about you?</span>'+
    '<span class="sp"><span class="who">Mei:</span> I want to make a small book of recipes. Then visitors can cook our vegetables at home.</span>'+
    '<span class="sp"><span class="who">Ms. White:</span> Interesting. Do you like cooking, Mei?</span>'+
    '<span class="sp"><span class="who">Mei:</span> Yes, cooking with my grandmother is the thing I like the most.</span>'+
    '<span class="sp"><span class="who">Ms. White:</span> Wonderful. Ken, what is your idea?</span>'+
    '<span class="sp"><span class="who">Ken:</span> I want to open a small café that uses only vegetables from this town. People can eat and talk there.</span>'+
    '<span class="sp"><span class="who">Ms. White:</span> Running a café by yourself is not （　あ　）, but it is a nice dream.</span>'+
    '<span class="sp"><span class="who">Ken:</span> I think so, too.</span>'+
    '<span class="sp"><span class="who">Ms. White:</span> Now let me talk about myself. When I came to Japan, I could not eat Japanese food well. But a farmer here gave me fresh vegetables every week, and I began to love them.</span>'+
    '<span class="sp"><span class="who">Ken:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Ms. White:</span> Good question. I started teaching here nine years ago because I wanted to live in a town with beautiful fields.</span>'+
    '<span class="sp"><span class="who">Ken:</span> And now you teach us English and about food.</span>'+
    '<span class="sp"><span class="who">Ms. White:</span> Yes, and I enjoy it very much. I hope you will tell the world about our town.</span>',
    note:'語注：recipe 作り方／run 〜を経営する／field 畑' },
  { passage:'<b>Nana の感想</b><br>Everyone had a good idea about our town\'s food. Like Mei, I love cooking. '+
            'I （　X　）, too, so I want many people to try our vegetables.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Sho の発言から抜き出して書きなさい。<br>"+E("Sho wants to [　　] at the station."),
      answers:["sell our tomatoes"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("simple"),E("famous"),E("quiet"),E("cheap")], answer:0 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("What did you cook yesterday?"), E("Who gave you the vegetables?"),
                E("Why did you start teaching here?"), E("How many fields are there?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Mei wants to make a book of recipes for visitors."),
                E("Sho thinks the tomatoes in his town are not sweet."),
                E("Ms. White could eat Japanese food well at first."),
                E("Ken wants to open a shop that sells clothes.") ], answer:0 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("want to be a doctor in the future"), E("like reading books in the library"),
                E("enjoy cooking with my family"), E("want to study math harder") ], answer:2 } ]}
]},

/* ===== 大問5 スピーチ（長文読解） ===== */
{ no:5, title:"次の英文は、ナナ(Nana)が英語の授業で発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Nana. Last autumn, I helped at the morning market in our town for the first time. '+
    'Before that day, I thought selling vegetables was easy. Now I think it is much harder, and I want to tell you why.<br><br>'+
    '<b>②</b> On the first morning, I woke up at five. It was still dark and cold. '+
    'Mr. Baker, a farmer, was already washing carrots at the market. He said to me, '+
    '"I always come here before the sun rises. Fresh vegetables are the thing I can be proud of." '+
    'I carried heavy boxes with him, and my arms soon <u>(お) ___</u>. But he never stopped smiling.<br><br>'+
    '<b>③</b> At nine, many people came. An old woman bought my tomatoes and said, '+
    '"These look wonderful. Thank you for getting up so early." I was very glad to hear that. '+
    'A little girl asked me, "How do you eat this vegetable?" I could not answer her well, '+
    'so Mr. Baker taught her a simple recipe. I understood that selling food is also teaching about food.<br><br>'+
    '<b>④</b> Some people say that a small market cannot change a town. That may be true. '+
    '<u>④ A small market cannot bring many people to a quiet town</u>. '+
    'But I found something important that morning. <u>③ ( how / I / hard / farmers / learned / work )</u>. '+
    'When we know the people who grow our food, we can care about our town more. '+
    'So please wake up early next Sunday, and let\'s <u>(か) ___</u> the market together!',
    passageEn:true,
    note:'語注：rise （太陽が）のぼる／be proud of 〜 〜をほこりに思う／recipe 作り方／care about 〜 〜を大切に思う',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お hurt　か leave"), E("お hurt　か visit"),
                E("お rested　か leave"), E("お rested　か visit") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "お年寄りの女性がナナのトマトを買った。", "小さな女の子が野菜の食べ方をたずねた。",
                "ベイカーさんが女の子に簡単な作り方を教えた。", "ナナは女の子の質問にうまく答えられた。" ], answer:3 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["how","I","hard","farmers","learned","work"], answer:"I learned how hard farmers work",
      display:"I learned how hard farmers work" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語3語を、第2段落中から抜き出して書きなさい。<br>"+E("On the first morning, Nana （　え　） with Mr. Baker."),
      answers:["carried heavy boxes"], hint:"第2段落の語・英語3語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>小さな（　①　）は、静かな町に多くの（　②　）を呼ぶことはできない。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "市場","学校","病院","公園" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "人","車","店","家" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Before last autumn, Nana thought selling vegetables was easy."),
                E("Mr. Baker stopped smiling when the work got hard."),
                E("A little girl asked Nana how to eat a vegetable."),
                E("Nobody bought Nana's tomatoes at the market."),
                E("Nana thinks a small market can never change a town.") ], answer:[0,2] } ]}
]}

]};
