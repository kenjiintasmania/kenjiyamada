/* data/fukuoka4.js ─ 福岡県スタイル 模擬テスト④（60点満点・26問）
   参照：factory/inputs/fukuoka_notes.md／fukuoka_pattern.json／factory/inputs/authoring_rules.md
   （福岡県公立入試の「傾向のみ」を参照）。骨格は fukuoka1.js と同一
   （大問1〜5・26問・20-8-10-14-8・2点×22＋4点×4＝60）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。

   ★題材：川の水質調査と生き物観察（探究：季節ごとの水のきれいさ）。
   ★舞台：沢木町（Sawaki Town）・沢木川（the Sawaki River）＝架空。地名・施設・人名・行事はすべて架空
     （Yui／Haruki／Ms. King＝ALT／Mr. Nagai＝自然センターの職員）。
   ★文法の軸：後置修飾（分詞・関係代名詞・不定詞の形容詞的用法）＋現在完了・受け身・比較。
   ⚠ 小問ごとの配点は公式「正答及び配点」PDFが未確認のため**仮置き**（fukuoka1 と同じ）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "福岡県スタイル 模擬テスト④",
fullMarks: 60,
sections: [

/* ===== 大問1 リスニング（問題1〜4・20点9問） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます。福岡県は問題1だけが1回読み、問題2〜4は2回読まれます）。", groups:[

  { intro:"問題1　放送を聞いて、内容に合うものをア〜エから1つ選びなさい。英文は1回だけ読まれます。",
    script:'(1) Look at the sign by the Sawaki River. You cannot swim here, but you can fish here.',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"放送に合うものはどれですか。",
      choices:["この川では泳げないが、魚をつることはできる。","この川では泳げるが、魚をつることはできない。",
               "この川では泳ぐことも魚をつることもできる。","この川では泳ぐことも魚をつることもできない。"], answer:0 } ] },
  { script:'(2) Look at the picture. Yui is holding a net, and Haruki is looking at a small fish in a cup.',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"放送に合う絵はどれですか。",
      choices:["ユイがあみを持ち、ハルキがコップの中の小さな魚を見ている。","ユイがコップを持ち、ハルキがあみの中の小さな魚を見ている。",
               "ユイがあみを持ち、ハルキが川の中の大きな魚を見ている。","ユイが小さな魚を持ち、ハルキがあみを見ている。"], answer:0 } ] },

  { intro:"問題2　ユイ(Yui)とハルキ(Haruki)が、下の案内を見ています。放送を聞いて、それぞれの問いに答えなさい。英文は2回読まれます。",
    passage:'<b>沢木自然センター　川の観察会</b>'+
      '<table><tr><th>日</th><th>時こく</th><th>内容</th></tr>'+
      '<tr><td>Saturday</td><td>9:00 a.m.</td><td>Fish watching</td></tr>'+
      '<tr><td>Saturday</td><td>1:00 p.m.</td><td>Water test</td></tr>'+
      '<tr><td>Sunday</td><td>9:00 a.m.</td><td>Water test</td></tr>'+
      '<tr><td>Sunday</td><td>1:00 p.m.</td><td>Fish watching</td></tr></table>',
    script:'(1) Yui wants to join the water test with her brother. They are busy on Saturday, so they can go only on Sunday. Which one should they choose?',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"ユイと弟が選ぶのはどれですか。",
      choices:[ E("Saturday, 9:00 a.m."), E("Saturday, 1:00 p.m."),
                E("Sunday, 9:00 a.m."), E("Sunday, 1:00 p.m.") ], answer:2 } ] },
  { script:'(2) Haruki will join the fish watching on Saturday morning. It starts at nine, and it takes twenty minutes from his house to the center. What time should he leave his house?',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"ハルキが家を出る時こくはどれですか。",
      choices:[ E("8:20 a.m."), E("8:40 a.m."), E("9:00 a.m."), E("9:20 a.m.") ], answer:1 } ] },

  { intro:"問題3　ALTのキング先生(Ms. King)が、自分のふるさとの川について話しています。ユイのメモの（あ）（い）に入る英語1語を書きなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, I\'m Ms. King. In my hometown, there is a long river, and it is very important to us.</span>'+
      '<span class="sp">Every <b>August</b>, we have a boat race on the river, and many people come to watch it.</span>'+
      '<span class="sp">When I was a student, I was in a river cleaning group. We picked up cans and bottles along the river every Sunday morning. Now the river is very clean, and we can see many <b>birds</b> there.</span>',
    passage:'<b>ユイのメモ</b><br>Ms. King のふるさとの川<br>— a boat race every （　あ　）<br>'+
            '— she was in a river cleaning group → picked up cans and bottles every Sunday morning<br>— now: very clean, many （　い　） there',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）ボートレースが行われる月", answers:["August"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）今その川でたくさん見られる生き物", answers:["birds"], hint:"英語1語" } ] },

  { intro:"問題4　自然センターの永井さん(Mr. Nagai)が、川の調査について説明しています。放送を聞いて(1)〜(3)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Welcome to the Sawaki Nature Center. I\'m Nagai. Today you will study the Sawaki River in three groups.</span>'+
      '<span class="sp">Group one will look at the color of the water and take its temperature. Group two will catch small living things with nets and count them. Group three will pick up trash along the river and write down what you find.</span>'+
      '<span class="sp">We do this study four times a year, in every season. Why? Because the river changes with the seasons. For example, the water is the cleanest in winter because few people visit the river and leave trash.</span>'+
      '<span class="sp">Yui has already chosen group two. She said, "I want to find water insects, so this group is the best for me."</span>'+
      '<span class="sp">Please wear long boots and bring a towel. We will start at ten.</span>',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["川の調査は年に4回、季節ごとに行われる。","川の調査は年に1回、冬だけ行われる。",
               "全員が同じ1つのグループで活動する。","調査は9時に始まる。"], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"冬に川の水が最もきれいである理由として最も適当なのは、ア〜エのどれですか。",
      choices:["川を訪れてごみを残す人が少ないから。","雨がたくさんふるから。",
               "水がとても冷たいから。","生き物がたくさんいるから。"], answer:0 },
    { type:"fill", label:"(3)", pt:4,
      stem:"ユイがグループ2を選んだ理由を、放送の中の語を使って英語3語で書きなさい。<br>"+
           E("Yui chose group two because she wants to （　　）."),
      answers:["find water insects"], hint:"英語3語（放送の中の言い方をそのまま使う）" } ] }
]},

/* ===== 大問2 短い対話の空所補充（8点4問） ===== */
{ no:2, title:"次の(1)〜(4)の対話について、それぞれの問いに答えなさい。", groups:[
  { note:"語注：net あみ／insect 昆虫",
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: What did you do last Sunday?<br>B: （　　）<br>A: Wow, that sounds fun."),
      choices:[ E("I watched fish in the Sawaki River."), E("I'm going to study math."),
                E("I have never been to the river."), E("Yes, I did.") ], answer:0 },
    { type:"mcq", label:"(2)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: Who is the man talking with Ms. King?<br>B: （　　）<br>A: Oh, I didn't know that."),
      choices:[ E("He is a man who works at the nature center."), E("I talked with her yesterday."),
                E("Yes, he is."), E("She is our new English teacher.") ], answer:0 },
    { type:"fill", label:"(3)", pt:2,
      stem:"（　）内の語を、最も適当な形に変えて1語で書きなさい。<br>"+
           E("The water of the Sawaki River is much ( clean ) in winter than in summer."),
      answers:["cleaner"], hint:"than の前・1語" },
    { type:"wordorder", label:"(4)", pt:2,
      stem:"次の語を正しく並べかえて、対話を完成させなさい。<br>"+
           E("A: What is this picture?<br>B: It is （　　）."),
      words:["a","picture","of","insects","living","in the river"], answer:"a picture of insects living in the river" } ]}
]},

/* ===== 大問3 対話文読解（10点5問） ===== */
{ no:3, title:"中学生のユイ(Yui)とハルキ(Haruki)が、自然センターの永井さん(Mr. Nagai)と、「川の調査の日」の案内を見ながら話しています。次は、その案内と会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Sawaki Nature Center — River Study Day</h4>'+
    '<div class="note">Let\'s find out how clean the Sawaki River is!</div>'+
    '<table><tr><td>Date</td><td>July 18 (Sat)</td></tr>'+
    '<tr><td>Time</td><td>9:00 a.m. – 12:00 p.m.</td></tr>'+
    '<tr><td>Meeting place</td><td>The front door of the Sawaki Nature Center</td></tr>'+
    '<tr><td>Program</td><td>9:00 a.m. Water test<br>10:00 a.m. Catching small living things<br>11:00 a.m. Talking about what we found</td></tr>'+
    '<tr><td>Fee</td><td>200 yen　(junior high school students: 100 yen)</td></tr>'+
    '<tr><td>Guide</td><td>Mr. Nagai, Sawaki Nature Center</td></tr></table>'+
    '<div class="note">Bring … long boots and a towel. Wear old clothes.<br>'+
    'If it rains, we will have a talk about river living things inside the center.</div>',
    passage:
    '<span class="sp"><span class="who">Yui:</span> Look at this, Haruki. The Sawaki Nature Center will have a River Study Day on July eighteenth.</span>'+
    '<span class="sp"><span class="who">Haruki:</span> River Study Day? What can we do there?</span>'+
    '<span class="sp"><span class="who">Yui:</span> We will （　あ　） the water at nine, and then catch small living things in the river at ten.</span>'+
    '<span class="sp"><span class="who">Haruki:</span> That sounds perfect for our science project. Let\'s go together. How much is it?</span>'+
    '<span class="sp"><span class="who">Yui:</span> It is one hundred yen for junior high school students. Ms. King said she wants to come with us, too.</span>'+
    '<span class="sp"><span class="who">Haruki:</span> Great. Oh, Mr. Nagai! Are you the guide of the River Study Day?</span>'+
    '<span class="sp"><span class="who">Mr. Nagai:</span> Yes, I am. I have studied this river for twenty years. Do you have any questions?</span>'+
    '<span class="sp"><span class="who">Yui:</span> Yes. Is the water of the Sawaki River clean? Last week, I saw some cans in the water near the bridge.</span>'+
    '<span class="sp"><span class="who">Mr. Nagai:</span> It is much cleaner than before. When I was a child, there were few fish in it. Now you can see many kinds of fish and insects.</span>'+
    '<span class="sp"><span class="who">Haruki:</span> I want to know <u>(い) ( what / living things / kind of / we can / find )</u> there.</span>'+
    '<span class="sp"><span class="who">Mr. Nagai:</span> Small fish and water insects. Some insects live only in clean water, so we can （　あ　） the water by looking at them.</span>'+
    '<span class="sp"><span class="who">Yui:</span> Interesting! What should we bring?</span>'+
    '<span class="sp"><span class="who">Mr. Nagai:</span> Long boots and a towel. Please wear old clothes because you will get wet. Also, we will meet at the front door of the center at eight fifty.</span>'+
    '<span class="sp"><span class="who">Haruki:</span> OK. What will we do if it rains?</span>'+
    '<span class="sp"><span class="who">Mr. Nagai:</span> We will have a talk about river living things inside the center. But I hope it will be sunny.</span>'+
    '<span class="sp"><span class="who">Yui:</span> Me, too. I\'m looking forward to it.</span>',
    note:'語注：insect 昆虫／boots 長ぐつ／towel タオル／wet ぬれた',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"2か所の（あ）に共通して入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("check"), E("drink"), E("carry"), E("paint") ], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"ユイ、ハルキ、キング先生の3人が「川の調査の日」に参加するとき、3人が払う金額の合計として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("200 yen"), E("300 yen"), E("400 yen"), E("500 yen") ], answer:2 },
    { type:"mcq", label:"(3)", pt:2, stem:"案内や会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Mr. Nagai has studied the Sawaki River for twenty years."), E("There were many fish in the river when Mr. Nagai was a child."),
                E("Ms. King doesn't want to go to the River Study Day."), E("The River Study Day will be canceled if it rains.") ], answer:0 },
    { type:"fill", label:"(4)", pt:2,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、会話の中から抜き出して書きなさい。<br>"+
           E("Mr. Nagai says that the water of the Sawaki River is （　　）."),
      answers:["much cleaner than before"], hint:"英語4語" },
    { type:"wordorder", label:"(5)", pt:2, stem:"下線部(い)の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["what","living things","kind of","we can","find"], answer:"what kind of living things we can find",
      display:"what kind of living things we can find" } ]}
]},

/* ===== 大問4 長文読解（14点5問・グラフつき） ===== */
{ no:4, title:"次の英文は、沢木中学校のユイ(Yui)が、探究学習の発表で話した内容です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Yui. How clean is the Sawaki River? '+
    'Last summer, I went to the river with my friend Haruki and found many cans and bottles in the water. '+
    'I asked myself, "Is the river always dirty like this?" '+
    'To find the answer, Haruki and I studied the river in every season for one year.<br><br>'+
    '<b>②</b> We went to the same place by the river four times: in April, July, October and January. '+
    'First, we caught small living things with nets and counted them. '+
    'Mr. Nagai at the Sawaki Nature Center told us that some insects live only in clean water, so we counted those insects carefully. '+
    'Then we picked up the trash along the river and counted it, too. '+
    'It was very cold in January, but we did the same things in the same way.<br><br>'+
    '<b>③</b> Look at the graph. It shows the number of insects living in clean water and the number of pieces of trash in each season. '+
    'In winter, we found thirty insects. That was the most of the four seasons, and there were only six pieces of trash. '+
    'In summer, however, we found only nine insects, and we picked up fifty-two pieces of trash, the most of the year. '+
    'In spring and autumn, the numbers were between them. '+
    'When there was more trash, there were fewer insects.<br><br>'+
    '<b>④</b> Why was there so much trash in summer? '+
    'Mr. Nagai said that many people come to the river to swim and have a barbecue in summer, and some of them leave their trash there. '+
    '<u>③ ( the trash / by / left / people / visiting the river )</u> makes the water dirty. '+
    'From this, I understood that the river is not always dirty. People make it dirty in summer.<br><br>'+
    '<b>⑤</b> So Haruki and I started something new. '+
    'This summer, we made posters that say, "Take your trash home," and put them by the river. '+
    'We also asked the nature center to put a trash box near the swimming place. '+
    'Some people who saw our posters said, "We didn\'t know the river was so dirty in summer." '+
    'Last month, we visited the river again. There were fewer cans and bottles than last summer. '+
    'I want to keep studying our river, and I hope the Sawaki River will be clean in every season.',
    passageEn:true,
    flyer:
    '<h4>グラフ：沢木川　季節ごとの「きれいな水にすむ昆虫」の数（棒）と拾ったごみの数（折れ線）</h4>'+
    '<table><tr><th>季節</th><th>春（4月）</th><th>夏（7月）</th><th>秋（10月）</th><th>冬（1月）</th></tr>'+
    '<tr><td>きれいな水にすむ昆虫の数（匹）</td><td>24</td><td>9</td><td>18</td><td>30</td></tr>'+
    '<tr><td>拾ったごみの数（個）</td><td>15</td><td>52</td><td>20</td><td>6</td></tr></table>',
    note:'語注：trash ごみ／insect 昆虫／piece 個（数える単位）／barbecue バーベキュー／poster ポスター／fewer より少ない',
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"次の1文は、①〜⑤のどの段落の直後に入れるのが最も適当ですか。<br>"+
           E("This means that the river is cleaner when there is less trash."),
      choices:["①の直後","②の直後","③の直後","⑤の直後"], answer:2 },
    { type:"mcq", label:"(2)", pt:2, stem:"グラフと本文から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:["冬はきれいな水にすむ昆虫が最も多く、拾ったごみは6個だった。","夏はきれいな水にすむ昆虫が最も多かった。",
               "春に拾ったごみの数は、夏より多かった。","秋の昆虫の数は、冬より多かった。"], answer:0 },
    { type:"wordorder", label:"(3)", pt:2, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["the trash","by","left","people","visiting the river"],
      answer:"the trash left by people visiting the river",
      display:"the trash left by people visiting the river" },
    { type:"fill", label:"(4)", pt:4,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、第4段落から抜き出して書きなさい。<br>"+
           E("Yui understood that the river is not always dirty, and that （　　） in summer."),
      answers:["people make it dirty"], hint:"第4段落の語・英語4語" },
    { type:"mcqMulti", label:"(5)", pt:4, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Yui and Haruki studied the river four times in one year."),
                E("Yui found many cans and bottles in the river last winter."),
                E("Mr. Nagai told Yui that some insects live only in clean water."),
                E("Yui and Haruki put their posters at the nature center."),
                E("Yui wants to stop studying the river.") ], answer:[0,2] } ]}
]},

/* ===== 大問5 条件英作文（8点3問・骨組みを作る形） ===== */
{ no:5, title:"沢木町では、沢木川をきれいに保つために何をするかを話し合っています。次のA〜Cから1つ選び、自分の考えとその理由を町の人に伝える英文を作ります。ここでは A を選んだものとして、(1)〜(3)に答えなさい。", groups:[
  { passage:
    '<b>3つの案</b><br>'+
    'A： 月に1回、川のそうじの日をつくる　'+E("have a river cleaning day once a month")+'<br>'+
    'B： ごみを持ち帰るよう呼びかけるポスターを作る　'+E("make posters that ask people to take their trash home")+'<br>'+
    'C： 川の生き物について学ぶ教室を開く　'+E("hold classes about the living things in the river")+'<br><br>'+
    '<b>作る英文の組み立て</b><br>'+
    '① 自分の立場　→　② その理由　→　③ 町の人にどうしてほしいか',
    note:'語注：trash ごみ／once a month 月に1回',
    items:[
    { type:"wordorder", label:"(1)", pt:2,
      stem:"①「わたしは、わたしたちは月に1回、川のそうじの日をつくるべきだと思う。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["should","I","we","think","have","a river cleaning day","once a month"],
      answer:"I think we should have a river cleaning day once a month",
      display:"I think we should have a river cleaning day once a month." },
    { type:"wordorder", label:"(2)", pt:2,
      stem:"②「それは、川に残されたごみをすばやく拾うことができるからです。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["because","we can","pick up","quickly","the trash","left in the river"],
      answer:"because we can quickly pick up the trash left in the river",
      display:"because we can quickly pick up the trash left in the river." },
    { type:"fill", label:"(3)", pt:4,
      stem:"③「わたしは町の人々に、川のそうじの日にわたしたちに加わってほしい。」という文にします。<br>"+
           "（　）に入れるのに最も適当な英語3語を書きなさい。<br>"+
           E("I want people in our town （　　） on the river cleaning day."),
      answers:["to join us"], hint:"英語3語（want＋人＋to 〜 の形）" } ]}
]}

]};
