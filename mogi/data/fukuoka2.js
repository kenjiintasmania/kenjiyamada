/* data/fukuoka2.js ─ 福岡県スタイル 模擬テスト②（60点満点・26問）
   参照：factory/inputs/fukuoka_notes.md・factory/inputs/fukuoka_pattern.json
   （福岡県公立入試の「傾向のみ」を参照）。モデルは mogi/data/fukuoka1.js
   （大問1〜5・26問・60点・各小問の型と配点・日本語の言い回しを同じにしてある）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。

   ★題材：学校の花だんづくりと地域の公園の花植え（探究：どの花が長くさくか）。
   ★舞台：花宮町（Hanamiya Town・架空）。登場人物：サナ(Sana)・コタ(Kota)・
     ALT のウッド先生(Ms. Wood)・公園の係の上野さん(Mr. Ueno)。地名・人名・施設・行事はすべて架空。
   ★文法の軸：後置修飾（分詞・関係代名詞・不定詞の形容詞的用法）＋現在完了・受け身・比較。
   ★配点は 2点を基本単位、重い4問だけ4点（2点×22＋4点×4＝60）。
   ⚠ 小問ごとの配点は公式「正答及び配点」PDFが未確認のため**仮置き**（fukuoka1 と同一）。
     形式が確定したら fukuoka_pattern.json の対応表ごと差しかえる。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "福岡県スタイル 模擬テスト②",
fullMarks: 60,
sections: [

/* ===== 大問1 リスニング（問題1〜4・20点9問） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます。福岡県は問題1だけが1回読み、問題2〜4は2回読まれます）。", groups:[

  { intro:"問題1　放送を聞いて、内容に合うものをア〜エから1つ選びなさい。英文は1回だけ読まれます。",
    script:'(1) Look at the sign at Hanamiya Park. The flower garden closes at four thirty today.',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"放送に合うものはどれですか。",
      choices:["花だんは今日4時30分に閉まる。","花だんは今日4時13分に閉まる。",
               "花だんは今日5時30分に閉まる。","公園の門は今日4時30分に閉まる。"], answer:0 } ] },
  { script:'(2) Look at the picture. Sana is watering the flowers, and Kota is carrying a big pot.',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"放送に合う絵はどれですか。",
      choices:["サナが花に水をやり、コタが大きな植木ばちを運んでいる。","サナが大きな植木ばちを運び、コタが花に水をやっている。",
               "サナが花に水をやり、コタが小さな植木ばちを運んでいる。","サナが花の写真をとり、コタが大きな植木ばちを運んでいる。"], answer:0 } ] },

  { intro:"問題2　サナ(Sana)とコタ(Kota)が、下の案内を見ています。放送を聞いて、それぞれの問いに答えなさい。英文は2回読まれます。",
    passage:'<b>花宮公園　花植えの日</b>'+
      '<table><tr><th>日</th><th>時こく</th><th>内容</th></tr>'+
      '<tr><td>Saturday</td><td>9:00 a.m.</td><td>Planting tulips</td></tr>'+
      '<tr><td>Saturday</td><td>2:00 p.m.</td><td>Planting pansies</td></tr>'+
      '<tr><td>Sunday</td><td>9:00 a.m.</td><td>Planting pansies</td></tr>'+
      '<tr><td>Sunday</td><td>2:00 p.m.</td><td>Planting tulips</td></tr></table>',
    script:'(1) Sana wants to plant pansies with her brother. Her brother has soccer practice every morning, so they can go only in the afternoon. Which one should they choose?',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"サナと弟が選ぶのはどれですか。",
      choices:[ E("Saturday, 9:00 a.m."), E("Saturday, 2:00 p.m."),
                E("Sunday, 9:00 a.m."), E("Sunday, 2:00 p.m.") ], answer:1 } ] },
  { script:'(2) Kota will leave home at one fifteen. It takes thirty minutes to walk to Hanamiya Park. What time will he get to the park?',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"コタが公園に着く時こくはどれですか。",
      choices:[ E("1:30 p.m."), E("1:45 p.m."), E("2:00 p.m."), E("2:15 p.m.") ], answer:1 } ] },

  { intro:"問題3　ALTのウッド(Wood)先生が、自分の町の花について話しています。サナのメモの（あ）（い）に入る英語1語を書きなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, everyone. I\'m Ms. Wood. In my town, we have a big flower festival every May. People plant flowers along the streets, and many visitors come to see them.</span>'+
      '<span class="sp">My grandmother has grown roses for thirty years. She always gives some to her friends. I think flowers make people happy.</span>',
    passage:'<b>サナのメモ</b><br>Ms. Wood の町<br>— a big flower festival every （　あ　）<br>'+
            '— her grandmother has grown （　い　） for thirty years',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）", answers:["May"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）", answers:["roses"], hint:"英語1語" } ] },

  { intro:"問題4　公園の係の上野さん(Mr. Ueno)が、花植えの日について説明しています。放送を聞いて(1)〜(3)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, everyone. I\'m Ueno. I work at Hanamiya Park. Next Saturday, you will plant flowers in the park with us. There are three groups, and you can choose one of them.</span>'+
      '<span class="sp">The first group will plant cosmos near the gate. The second group will plant sunflowers by the pond. The third group will water the flowers and clean the garden.</span>'+
      '<span class="sp">Sana has already chosen the second group. She said, "I want to see tall flowers, so sunflowers are the best for me."</span>'+
      '<span class="sp">Please wear old clothes and bring a towel. We will start at ten and finish at twelve.</span>',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["グループは3つあり、その中から1つ選ぶ。","グループは3つあり、その中から2つ選ぶ。",
               "作業は10時に始まり、12時30分に終わる。","タオルは公園で貸してもらえる。"], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"池のそばですることとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("plant cosmos near the gate"), E("plant sunflowers by the pond"),
                E("water the flowers and clean the garden"), E("clean the pond and pick the flowers") ], answer:1 },
    { type:"fill", label:"(3)", pt:4,
      stem:"サナが2番目のグループを選んだ理由を、放送の中の語を使って英語3語で書きなさい。<br>"+
           E("Sana chose the second group because she wants to （　　）."),
      answers:["see tall flowers"], hint:"英語3語（放送の中の言い方をそのまま使う）" } ] }
]},

/* ===== 大問2 短い対話の空所補充（8点4問） ===== */
{ no:2, title:"次の(1)〜(4)の対話について、それぞれの問いに答えなさい。", groups:[
  { note:"語注：tulip チューリップ／pansy パンジー／bloom（花が）さく／garden club 園芸部",
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: I hear you planted flowers at Hanamiya Park last Saturday.<br>B: Yes. （　　）<br>A: Fifty! That's a lot."),
      choices:[ E("I planted fifty tulips with my friends."), E("I will plant them next Saturday."),
                E("I have never been to the park."), E("It rained, so I stayed at home.") ], answer:0 },
    { type:"mcq", label:"(2)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: Who is the girl watering the flowers over there?<br>B: （　　）<br>A: Oh, I didn't know she was in the garden club."),
      choices:[ E("That's Sana. She is in the garden club."), E("She is watering them now."),
                E("I don't know where the garden is."), E("She has never seen a flower.") ], answer:0 },
    { type:"fill", label:"(3)", pt:2,
      stem:"（　）内の語を、最も適当な形に変えて1語で書きなさい。<br>"+
           E("Pansies bloom ( long ) than tulips, so many people plant them in autumn."),
      answers:["longer"], hint:"than の前・1語" },
    { type:"wordorder", label:"(4)", pt:2,
      stem:"次の語を正しく並べかえて、対話を完成させなさい。<br>"+
           E("A: Look at those red flowers by the gate. They're beautiful!<br>B: Thank you. Those are （　　）."),
      words:["by","planted","our","the flowers","class"], answer:"the flowers planted by our class" } ]}
]},

/* ===== 大問3 対話文読解（10点5問） ===== */
{ no:3, title:"中学生のサナ(Sana)とコタ(Kota)が、花宮公園の係の上野さん(Mr. Ueno)と、花植えの日の案内を見ながら話しています。次は、その案内と会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Hanamiya Park — Flower Planting Day</h4>'+
    '<div class="note">Let\'s make the road in the park colorful with pansies!</div>'+
    '<table><tr><td>Date</td><td>October 10 (Sat)</td></tr>'+
    '<tr><td>Time</td><td>9:00 a.m. – 11:30 a.m.</td></tr>'+
    '<tr><td>Meeting place</td><td>The east gate of Hanamiya Park</td></tr>'+
    '<tr><td>Fee</td><td>Free</td></tr>'+
    '<tr><td>Flowers</td><td>200 pansies</td></tr>'+
    '<tr><td>Number of people</td><td>30　(Junior high school students are welcome.)</td></tr></table>'+
    '<div class="note">Bring … gloves, old clothes, and something to drink.<br>'+
    'If it rains, we will plant on Sunday, October 11.</div>',
    passage:
    '<span class="sp"><span class="who">Sana:</span> Mr. Ueno, we saw this flyer at school. Can junior high school students join the Flower Planting Day?</span>'+
    '<span class="sp"><span class="who">Mr. Ueno:</span> Of course. We still need more people. Only twenty have joined, so please tell your friends about it.</span>'+
    '<span class="sp"><span class="who">Kota:</span> Then we\'ll ask our classmates. What flowers will we plant?</span>'+
    '<span class="sp"><span class="who">Mr. Ueno:</span> Pansies. We will plant two hundred of them along the road in the park.</span>'+
    '<span class="sp"><span class="who">Sana:</span> Why pansies? I thought tulips were more popular.</span>'+
    '<span class="sp"><span class="who">Mr. Ueno:</span> Tulips are beautiful, but they bloom for only two weeks. Pansies are （　あ　）. They can keep blooming from autumn to spring.</span>'+
    '<span class="sp"><span class="who">Kota:</span> That\'s a long time! So the road will be colorful for many months.</span>'+
    '<span class="sp"><span class="who">Mr. Ueno:</span> That\'s right. The winter wind in the park is （　あ　）, but pansies are fine in cold weather.</span>'+
    '<span class="sp"><span class="who">Sana:</span> I see. I\'m doing a project about flowers at school. In our school garden, I want to plant <u>(い) ( a long time / bloom / flowers / for / that )</u>, too.</span>'+
    '<span class="sp"><span class="who">Mr. Ueno:</span> Then pansies are a good choice. Please come at nine. We will meet at the east gate.</span>'+
    '<span class="sp"><span class="who">Kota:</span> OK. Do we need to bring anything?</span>'+
    '<span class="sp"><span class="who">Mr. Ueno:</span> Yes. Bring gloves and old clothes because your clothes will get dirty. And bring something to drink. You will get thirsty after planting.</span>'+
    '<span class="sp"><span class="who">Sana:</span> What will happen if it rains?</span>'+
    '<span class="sp"><span class="who">Mr. Ueno:</span> We will plant on the next day, Sunday. I hope it will be sunny.</span>'+
    '<span class="sp"><span class="who">Kota:</span> Me too. We\'ll see you on Saturday!</span>',
    note:'語注：flyer ちらし／pansy パンジー／bloom（花が）さく／gloves 手ぶくろ／thirsty のどがかわいた',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"2か所の（あ）に共通して入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("strong"), E("weak"), E("small"), E("quiet") ], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"参加者の人数について、案内と会話から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Ten more people are needed."), E("Twenty more people are needed."),
                E("Thirty more people are needed."), E("Fifty more people are needed.") ], answer:0 },
    { type:"mcq", label:"(3)", pt:2, stem:"案内や会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Sana and Kota will ask their classmates to join the event."), E("Tulips bloom for a longer time than pansies."),
                E("Students must pay to join the event."), E("Mr. Ueno will give gloves to everyone.") ], answer:0 },
    { type:"fill", label:"(4)", pt:2,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、会話の中から抜き出して書きなさい。<br>"+
           E("Mr. Ueno chose pansies because they can keep blooming （　　）."),
      answers:["from autumn to spring"], hint:"英語4語" },
    { type:"wordorder", label:"(5)", pt:2, stem:"下線部(い)の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["a long time","bloom","flowers","for","that"], answer:"flowers that bloom for a long time",
      display:"flowers that bloom for a long time" } ]}
]},

/* ===== 大問4 長文読解（14点5問・グラフつき） ===== */
{ no:4, title:"次の英文は、花宮中学校のサナ(Sana)が、探究学習の発表で話した内容です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Sana. Our school is in Hanamiya Town, and many flowers are grown in the parks of our town. '+
    'Last spring, our class made a flower garden in front of the school. '+
    'When we were choosing the flowers, Kota said, "Let\'s plant flowers that keep blooming until autumn. Then everyone can enjoy them for many months." '+
    'But nobody knew which flowers bloom the longest. So I decided to find out.<br><br>'+
    '<b>②</b> In May, I planted four kinds of flowers in the garden: sunflowers, morning glories, cosmos, and marigolds. '+
    'I took care of all of them in the same way. I watered them every morning, and I wrote down when the first flower opened '+
    'and when the last one fell. I also counted the flowers that opened on one plant. '+
    'At the end of October, I put everything on one graph. '+
    'The bars show the number of days each flower bloomed, and the line shows the number of flowers on one plant.<br><br>'+
    '<b>③</b> Look at the graph. Sunflowers bloomed for only twenty days, and each plant had just one big flower. '+
    'Morning glories bloomed for forty-five days, and cosmos bloomed longer than morning glories. '+
    'Marigolds bloomed the longest. They kept blooming for one hundred days, and one plant had eighty small flowers. '+
    'From this, I found that plants with many small flowers bloom longer than plants with one big flower.<br><br>'+
    '<b>④</b> I also learned something else. In August, it was very hot, and it did not rain for two weeks. '+
    'Some of the cosmos became weak, but the marigolds were fine. I wanted to know why, so I visited Hanamiya Park. '+
    'Mr. Ueno, a man working there, told me that marigolds are strong in hot weather.<br><br>'+
    '<b>⑤</b> Now we know what to plant. This spring, our class will plant marigolds and cosmos together in the garden. '+
    'Mr. Ueno also asked us to plant some marigolds in Hanamiya Park, and we are going to help him in April. '+
    '<u>③ ( made / that / garden / our class / the )</u> is small, but I hope it will make many people happy. '+
    'Thank you for listening.',
    passageEn:true,
    flyer:
    '<h4>グラフ：学校の花だんで調べた4種類の花　さいていた日数（棒）と一株にさいた花の数（折れ線）</h4>'+
    '<table><tr><th>花</th><th>ヒマワリ</th><th>アサガオ</th><th>コスモス</th><th>マリーゴールド</th></tr>'+
    '<tr><td>さいていた日数</td><td>20</td><td>45</td><td>60</td><td>100</td></tr>'+
    '<tr><td>一株の花の数</td><td>1</td><td>30</td><td>40</td><td>80</td></tr></table>',
    note:'語注：marigold マリーゴールド／morning glory アサガオ／cosmos コスモス／bloom（花が）さく／plant（名詞）株／bar 棒／fell ← fall 落ちる',
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"次の1文は、①〜⑤のどの段落の直後に入れるのが最も適当ですか。<br>"+
           E("That is why they are planted in many parks in summer."),
      choices:["①の直後","②の直後","④の直後","⑤の直後"], answer:2 },
    { type:"mcq", label:"(2)", pt:2, stem:"グラフと本文から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:["マリーゴールドは最も長くさき、一株の花の数は80だった。","ヒマワリは4種類の中で最も長くさいた。",
               "アサガオはコスモスより長くさいた。","コスモスの一株の花の数は、アサガオより少なかった。"], answer:0 },
    { type:"wordorder", label:"(3)", pt:2, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["made","that","garden","our class","the"],
      answer:"the garden that our class made",
      display:"The garden that our class made" },
    { type:"fill", label:"(4)", pt:4,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、第4段落から抜き出して書きなさい。<br>"+
           E("The marigolds were fine in August because they are （　　）."),
      answers:["strong in hot weather"], hint:"第4段落の語・英語4語" },
    { type:"mcqMulti", label:"(5)", pt:4, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Sana's class made a flower garden in front of the school."),
                E("Sana planted the four kinds of flowers in August."),
                E("Sana watered the flowers every morning."),
                E("Sunflowers bloomed longer than morning glories."),
                E("Sana's class will plant only sunflowers this spring.") ], answer:[0,2] } ]}
]},

/* ===== 大問5 条件英作文（8点3問・骨組みを作る形） ===== */
{ no:5, title:"ALTのウッド先生(Ms. Wood)に、花宮公園をもっとよい場所にするための案を伝えます。次のA〜Cから1つ選び、選んだ案とその理由を伝える英文を作ります。ここでは A を選んだものとして、(1)〜(3)に答えなさい。", groups:[
  { passage:
    '<b>3つの案</b><br>'+
    'A： 花をもっと植える　'+E("plant more flowers")+'<br>'+
    'B： ベンチを増やす　'+E("put more benches")+'<br>'+
    'C： 清掃の日をつくる　'+E("have a cleaning day")+'<br><br>'+
    '<b>作る英文の組み立て</b><br>'+
    '① 自分の考え　→　② その理由　→　③ 相手にどうなってほしいか',
    note:'語注：bench ベンチ',
    items:[
    { type:"wordorder", label:"(1)", pt:2,
      stem:"①「わたしは、わたしたちは公園にもっと花を植えるべきだと思います。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["think","I","should","we","plant","more flowers in the park"],
      answer:"I think we should plant more flowers in the park",
      display:"I think we should plant more flowers in the park." },
    { type:"wordorder", label:"(2)", pt:2,
      stem:"②「なぜなら、花は公園を訪れる人々を幸せにするからです。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["make","because","happy","the people","flowers","visiting the park"],
      answer:"because flowers make the people visiting the park happy",
      display:"because flowers make the people visiting the park happy." },
    { type:"fill", label:"(3)", pt:4,
      stem:"③「わたしはウッド先生に、花のことでわたしたちを手伝ってほしい。」という文にします。<br>"+
           "（　）に入れるのに最も適当な英語3語を書きなさい。<br>"+
           E("I want Ms. Wood （　　） with the flowers."),
      answers:["to help us"], hint:"英語3語（want＋人＋to 〜 の形）" } ]}
]}

]};
