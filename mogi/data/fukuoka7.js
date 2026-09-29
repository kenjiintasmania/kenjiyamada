/* data/fukuoka7.js ─ 福岡県スタイル 模擬テスト⑦（60点満点・26問）
   参照：factory/inputs/fukuoka_notes.md／fukuoka_pattern.json／authoring_rules.md
   （福岡県公立入試の「傾向のみ」を参照）。出題形式・問題数・配点バランスのみ踏襲し、
   本文・設問・選択肢はすべて新規創作。

   ★題材：無人になった駅とボランティア駅員（探究：駅の利用者数の変化）。
   ★舞台：桐野町（Kirino Town・架空）・桐野駅（Kirino Station・架空）。
     登場人物：ミユ(Miyu)・リョウタ(Ryota)・コール先生(Mr. Cole・ALT)・
     ババさん(Mr. Baba・ボランティア駅員)。地名・施設・人名・行事はすべて架空。
   ★骨格は fukuoka1 と同一：大問1〜5・26問・配点 20-8-10-14-8。
     2点を基本単位、重い4問だけ4点（2点×22＋4点×4＝60）。
   ⚠ 小問ごとの配点は公式「正答及び配点」PDFが未確認のため仮置き（fukuoka_pattern.json 参照）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "福岡県スタイル 模擬テスト⑦",
fullMarks: 60,
sections: [

/* ===== 大問1 リスニング（問題1〜4・20点9問） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます。福岡県は問題1だけが1回読み、問題2〜4は2回読まれます）。", groups:[

  { intro:"問題1　放送を聞いて、内容に合うものをア〜エから1つ選びなさい。英文は1回だけ読まれます。",
    script:'(1) Look at the board at Kirino Station. The next train for Sumino City leaves at eight twenty from Platform 2.',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"放送に合うものはどれですか。",
      choices:["澄野市行きの次の電車は8時20分に2番ホームから出る。","澄野市行きの次の電車は8時12分に2番ホームから出る。",
               "澄野市行きの次の電車は8時20分に1番ホームから出る。","澄野市行きの次の電車は8時2分に2番ホームから出る。"], answer:0 } ] },
  { script:'(2) Look at the picture. Ryota is watering the flowers in front of the station, and Miyu is cleaning the window.',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"放送に合う絵はどれですか。",
      choices:["リョウタが駅前の花に水をやり、ミユが窓をふいている。","リョウタが窓をふき、ミユが駅前の花に水をやっている。",
               "リョウタが駅前の花に水をやり、ミユがベンチにすわっている。","リョウタがベンチにペンキをぬり、ミユが窓をふいている。"], answer:0 } ] },

  { intro:"問題2　ミユ(Miyu)とリョウタ(Ryota)が、下の案内を見ています。放送を聞いて、それぞれの問いに答えなさい。英文は2回読まれます。",
    passage:'<b>桐野駅ボランティアの日</b>'+
      '<table><tr><th>日</th><th>時こく</th><th>活動</th></tr>'+
      '<tr><td>Saturday</td><td>9:00 a.m.</td><td>Cleaning the waiting room</td></tr>'+
      '<tr><td>Saturday</td><td>2:00 p.m.</td><td>Painting the bench</td></tr>'+
      '<tr><td>Sunday</td><td>9:00 a.m.</td><td>Planting flowers</td></tr>'+
      '<tr><td>Sunday</td><td>2:00 p.m.</td><td>Cleaning the waiting room</td></tr></table>',
    script:'(1) Miyu wants to join the volunteer work with Ryota. They have club practice on Saturday, so they can go only on Sunday. They want to plant flowers. Which one should they choose?',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"ミユとリョウタが選ぶのはどれですか。",
      choices:[ E("Saturday, 9:00 a.m."), E("Saturday, 2:00 p.m."),
                E("Sunday, 9:00 a.m."), E("Sunday, 2:00 p.m.") ], answer:2 } ] },
  { script:'(2) Mr. Cole wants to join the volunteer work, too. He is free only in the afternoon, and he wants to try painting. Which one should he choose?',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"コール先生が選ぶのはどれですか。",
      choices:[ E("Saturday, 9:00 a.m."), E("Saturday, 2:00 p.m."),
                E("Sunday, 9:00 a.m."), E("Sunday, 2:00 p.m.") ], answer:1 } ] },

  { intro:"問題3　ALTのコール(Cole)先生が、自分の国の駅について話しています。ミユのメモの（あ）（い）に入る英語1語を書きなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, I\'m Mr. Cole. In my country, most small stations have no staff, so people buy tickets from a <b>machine</b>.</span>'+
      '<span class="sp">My grandfather worked at a station for <b>thirty</b> years. He loved talking with the people who took the train every morning.</span>',
    passage:'<b>ミユのメモ</b><br>Mr. Cole の国の駅<br>— most small stations have no staff → people buy tickets from a （　あ　）<br>'+
            '— his grandfather worked at a station for （　い　） years',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）機械", answers:["machine"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）おじいさんが駅で働いた年数（数を英語1語で）", answers:["thirty","30"], hint:"英語1語" } ] },

  { intro:"問題4　ボランティア駅員のババさん(Mr. Baba)が、駅に来た中学生に話をしています。放送を聞いて(1)〜(3)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Welcome to Kirino Station. My name is Baba. Four years ago, the station staff left, and nobody worked here after that. Nobody cleaned the waiting room, and it became dark and dirty. So the next year, I started working here as a volunteer with five friends.</span>'+
      '<span class="sp">We do three things. We clean the waiting room every morning, we help people who don\'t know how to buy a ticket from the machine, and we take care of the flowers in front of the station.</span>'+
      '<span class="sp">Ryota asked me, "Why do you do this?" I answered, "I want to make people smile." When people say thank you to us, we feel happy, too.</span>'+
      '<span class="sp">Today, please help us plant flowers. Please wear gloves. We will start at nine.</span>',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["ババさんは5人の友人といっしょにボランティアを始めた。","駅は4年前に無人になり、ババさんはすぐに駅員として働き始めた。",
               "ババさんは1人でボランティアをしている。","今日の作業は10時に始まる。"], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"ボランティアが毎朝することとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("clean the waiting room"), E("sell tickets at the window"),
                E("drive the train to the city"), E("paint the bench in the park") ], answer:0 },
    { type:"fill", label:"(3)", pt:4,
      stem:"ババさんがボランティアをしている理由を、放送の中の語を使って英語3語で書きなさい。<br>"+
           E("Mr. Baba does the volunteer work because he wants to （　　）."),
      answers:["make people smile"], hint:"英語3語（放送の中の言い方をそのまま使う）" } ] }
]},

/* ===== 大問2 短い対話の空所補充（8点4問） ===== */
{ no:2, title:"次の(1)〜(4)の対話について、それぞれの問いに答えなさい。", groups:[
  { note:"語注：platform （駅の）ホーム",
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: Did you see Mr. Baba at the station this morning?<br>B: Yes. （　　）<br>A: He is always kind to everyone."),
      choices:[ E("He carried an old woman's bag for her."), E("I have never been to the station."),
                E("He was not there today."), E("I don't know who he is.") ], answer:0 },
    { type:"mcq", label:"(2)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: Excuse me. Which train goes to Sumino City?<br>B: （　　）<br>A: Platform 1? Thank you very much."),
      choices:[ E("The one waiting at Platform 1."), E("I have taken it many times."),
                E("It is a very long train."), E("No, that is not my train.") ], answer:0 },
    { type:"fill", label:"(3)", pt:2,
      stem:"（　）内の語を、最も適当な形に変えて1語で書きなさい。<br>"+
           E("Miyu has ( know ) Mr. Baba since she was a small child."),
      answers:["known"], hint:"has のうしろ・1語" },
    { type:"wordorder", label:"(4)", pt:2,
      stem:"次の語句を正しく並べかえて、対話を完成させなさい。<br>"+
           E("A: Who is that man?<br>B: He is （　　） every morning."),
      words:["a","volunteer","cleans","who","the station"], answer:"a volunteer who cleans the station" } ]}
]},

/* ===== 大問3 対話文読解（10点5問） ===== */
{ no:3, title:"中学生のミユ(Miyu)とリョウタ(Ryota)が、桐野駅のボランティア駅員のババさん(Mr. Baba)に、駅の開放日の案内を見ながら話を聞いています。次は、その案内と会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Kirino Station Open Day</h4>'+
    '<div class="note">Come and learn about our station with the volunteers!</div>'+
    '<table><tr><td>Date</td><td>October 10 (Sat)</td></tr>'+
    '<tr><td>Time</td><td>10:00 a.m. – 3:00 p.m.</td></tr>'+
    '<tr><td>Meeting place</td><td>The waiting room of Kirino Station</td></tr>'+
    '<tr><td>Programs</td><td>10:00 a.m. Station tour<br>11:00 a.m. Old photos of the station<br>1:00 p.m. Flower planting</td></tr>'+
    '<tr><td>Fee</td><td>200 yen　(students: 100 yen)</td></tr></table>'+
    '<div class="note">Bring … gloves and a drink.<br>'+
    'If it rains, we will not plant flowers. Mr. Baba will talk about the history of the station in the waiting room.</div>',
    passage:
    '<span class="sp"><span class="who">Miyu:</span> Mr. Baba, we are studying about Kirino Station for our class. May we ask you some questions?</span>'+
    '<span class="sp"><span class="who">Mr. Baba:</span> Of course. What do you want to know?</span>'+
    '<span class="sp"><span class="who">Ryota:</span> First, why did you start working here as a volunteer?</span>'+
    '<span class="sp"><span class="who">Mr. Baba:</span> Four years ago, the station became unmanned. Nobody cleaned the waiting room, and some people stopped （　あ　） the station. I didn\'t want to see that, so the next year I started with my friends.</span>'+
    '<span class="sp"><span class="who">Miyu:</span> How many volunteers are there now?</span>'+
    '<span class="sp"><span class="who">Mr. Baba:</span> Twelve. Some of us are over seventy, but we are all healthy!</span>'+
    '<span class="sp"><span class="who">Ryota:</span> Do you come here every day?</span>'+
    '<span class="sp"><span class="who">Mr. Baba:</span> Yes. I open the waiting room at six every morning. Then I water the flowers.</span>'+
    '<span class="sp"><span class="who">Miyu:</span> That\'s great. Look at this, Ryota. There will be an open day on October tenth. The station tour starts at ten, and the flower planting is in the afternoon. Mr. Baba, how much is the fee for students?</span>'+
    '<span class="sp"><span class="who">Mr. Baba:</span> One hundred yen. Adults pay two hundred yen. The money is used to buy new flowers.</span>'+
    '<span class="sp"><span class="who">Ryota:</span> That\'s not expensive. Miyu, let\'s join together. Mr. Baba, is there <u>(い) ( anything / need / we / to / bring )</u>?</span>'+
    '<span class="sp"><span class="who">Mr. Baba:</span> Gloves and a drink. Your hands will get dirty when you plant flowers.</span>'+
    '<span class="sp"><span class="who">Miyu:</span> I see. What will happen if it rains?</span>'+
    '<span class="sp"><span class="who">Mr. Baba:</span> We will not plant flowers. Instead, I will talk about the history of the station in the waiting room.</span>'+
    '<span class="sp"><span class="who">Ryota:</span> That sounds interesting, too. We are looking forward to the open day.</span>'+
    '<span class="sp"><span class="who">Mr. Baba:</span> Thank you. I hope young people will start （　あ　） the station again.</span>',
    note:'語注：unmanned 無人の／fee 料金／glove 手ぶくろ／adult おとな／instead そのかわりに',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"2か所の（あ）に共通して入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("using"), E("building"), E("closing"), E("painting") ], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"開放日の料金について、案内と会話から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Students pay one hundred yen, and adults pay two hundred yen."), E("Students pay two hundred yen, and adults pay one hundred yen."),
                E("Everyone can join the open day for free."), E("The money is used to clean the waiting room.") ], answer:0 },
    { type:"mcq", label:"(3)", pt:2, stem:"案内や会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Mr. Baba started the volunteer work the year after the station became unmanned."), E("There are twenty volunteers at Kirino Station now."),
                E("The station tour starts in the afternoon."), E("Miyu will not join the open day.") ], answer:0 },
    { type:"fill", label:"(4)", pt:2,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、会話の中から抜き出して書きなさい。<br>"+
           E("The fee from the open day is used （　　）."),
      answers:["to buy new flowers"], hint:"英語4語" },
    { type:"wordorder", label:"(5)", pt:2, stem:"下線部(い)の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["anything","need","we","to","bring"], answer:"anything we need to bring",
      display:"anything we need to bring" } ]}
]},

/* ===== 大問4 長文読解（14点5問・グラフつき） ===== */
{ no:4, title:"次の英文は、桐野中学校のリョウタ(Ryota)が、探究学習の発表で話した内容です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Ryota. Every morning I go to school from Kirino Station. '+
    'Many people in Kirino Town used it to go to work or school. '+
    'Four years ago, the station staff left, and the station became unmanned. '+
    'My grandmother said, "The station was so quiet and sad after that." '+
    'I wanted to know how the station has changed, so I studied the number of people who use it.<br><br>'+
    '<b>②</b> First, I asked the train company for the number of passengers. '+
    'They gave me the average number of people who used the station each day, from 2021 to 2025. '+
    'Then I asked Mr. Baba, a volunteer at the station, how many volunteers worked there in each year. '+
    'He keeps a notebook of the volunteers, so he knew the number well. '+
    'I put both on one graph. The bars show the passengers, and the line shows the volunteers.<br><br>'+
    '<b>③</b> Look at the graph. In 2021, about two hundred people used the station every day. '+
    'In 2022, the year the station became unmanned, the number dropped to one hundred sixty. '+
    'The volunteers started in 2023, but the number did not go up soon. '+
    'It went up in 2024 and again in 2025. The line, however, went up every year after 2023. '+
    'Many of <u>③ ( the people / who / the station / use / are )</u> students like me.<br><br>'+
    '<b>④</b> Why did the number go up? I asked twenty passengers at the station. '+
    'Fifteen of them said that the station became clean and bright. '+
    'One woman said, "The flowers planted by the volunteers make me happy every morning." '+
    'Three people said that they can ask the volunteers when they don\'t know how to buy a ticket. '+
    'Some students said that they feel safe because someone is always there. '+
    'From these answers, I understood that the volunteers changed the station.<br><br>'+
    '<b>⑤</b> Now I know that a station is not just a place to take a train. '+
    'It is a place where people meet and talk. Mr. Baba is seventy-two years old. '+
    'He said, "I hope young people will keep this station in the future." '+
    'My grandmother goes to the station to see the flowers now, and she talks with Mr. Baba every week. '+
    'I want to join the volunteers next spring and tell more people about Kirino Station.',
    passageEn:true,
    flyer:
    '<h4>グラフ：桐野駅　1日の平均利用者数（棒）とボランティアの人数（折れ線）</h4>'+
    '<table><tr><th>年</th><th>2021</th><th>2022</th><th>2023</th><th>2024</th><th>2025</th></tr>'+
    '<tr><td>1日の平均利用者数（人）</td><td>200</td><td>160</td><td>150</td><td>170</td><td>185</td></tr>'+
    '<tr><td>ボランティアの人数（人）</td><td>0</td><td>0</td><td>6</td><td>10</td><td>12</td></tr></table>',
    note:'語注：staff 職員／unmanned 無人の／passenger 乗客／company 会社／average 平均の／drop 下がる／bright 明るい／safe 安全な',
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"次の1文は、①〜⑤のどの段落の直後に入れるのが最も適当ですか。<br>"+
           E("In other words, people came back because of the volunteers."),
      choices:["①の直後","②の直後","④の直後","⑤の直後"], answer:2 },
    { type:"mcq", label:"(2)", pt:2, stem:"グラフと本文から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:["2022年は駅が無人になった年で、1日の平均利用者数は160人だった。","2023年は1日の平均利用者数が最も多かった。",
               "2024年のボランティアの人数は2021年より少なかった。","2025年の1日の平均利用者数は2021年より多かった。"], answer:0 },
    { type:"wordorder", label:"(3)", pt:2, stem:"下線部③の語句をすべて用いて、意味が通るように並べかえなさい。",
      words:["the people","who","the station","use","are"],
      answer:"the people who use the station are",
      display:"the people who use the station are" },
    { type:"fill", label:"(4)", pt:4,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、第4段落から抜き出して書きなさい。<br>"+
           E("Fifteen of the twenty passengers said that the station （　　）."),
      answers:["became clean and bright"], hint:"第4段落の語・英語4語" },
    { type:"mcqMulti", label:"(5)", pt:4, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Ryota goes to school from Kirino Station every morning."),
                E("Ryota got the number of passengers from Mr. Baba."),
                E("The number of passengers went up as soon as the volunteers started."),
                E("Some students feel safe because someone is always at the station."),
                E("Ryota does not want to join the volunteers.") ], answer:[0,3] } ]}
]},

/* ===== 大問5 条件英作文（8点3問・骨組みを作る形） ===== */
{ no:5, title:"無人になった桐野駅を守るために、中学生としてできることを次のA〜Cから1つ選び、その案とその理由を伝える英文を作ります。ここでは B を選んだものとして、(1)〜(3)に答えなさい。", groups:[
  { passage:
    '<b>3つの案</b><br>'+
    'A： 駅のそうじを手伝う　'+E("help clean the station")+'<br>'+
    'B： 駅に英語の案内板を作る　'+E("make English signs for the station")+'<br>'+
    'C： 駅で写真展を開く　'+E("hold a photo exhibition at the station")+'<br><br>'+
    '<b>作る英文の組み立て</b><br>'+
    '① 何をするべきか　→　② その理由　→　③ 相手にどうしてほしいか',
    note:'語注：sign 案内板／foreign 外国の／exhibition 展示会',
    items:[
    { type:"wordorder", label:"(1)", pt:2,
      stem:"①「わたしたちは駅に英語の案内板を作るべきだと思います。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["think","I","we","should","make","English signs for the station"],
      answer:"I think we should make English signs for the station",
      display:"I think we should make English signs for the station." },
    { type:"wordorder", label:"(2)", pt:2,
      stem:"②「なぜなら、駅を利用する外国の人たちを助けることができるからです。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["because","we","can help","foreign people","who","use the station"],
      answer:"because we can help foreign people who use the station",
      display:"because we can help foreign people who use the station." },
    { type:"fill", label:"(3)", pt:4,
      stem:"③「わたしはババさんに、わたしたちの案内板を見てほしい。」という文にします。<br>"+
           "（　）に入れるのに最も適当な英語3語を書きなさい。<br>"+
           E("I want Mr. Baba （　　） our signs."),
      answers:["to look at"], hint:"英語3語（want＋人＋to 〜 の形）" } ]}
]}

]};
