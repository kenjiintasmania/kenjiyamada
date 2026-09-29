/* data/fukuoka3.js ─ 福岡県スタイル 模擬テスト③（60点満点・26問）
   参照：factory/inputs/fukuoka_notes.md／fukuoka_pattern.json／factory/inputs/authoring_rules.md
   （福岡県公立入試の「傾向のみ」を参照）。骨格は fukuoka1.js と同一
   （大問1〜5・26問・20-8-10-14-8・2点×22＋4点×4＝60）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。

   ★題材：町の古い石橋の保存と歴史調べ（探究：橋を渡る人の数）。
   ★舞台：石倉町（Ishikura Town）＝架空。地名・施設・人名・行事はすべて架空
     （Rin／Taiga／Mr. Hall＝ALT／Ms. Aoki＝郷土史の先生）。
   ★文法の軸：後置修飾（分詞・関係代名詞・不定詞の形容詞的用法）＋受け身・現在完了・比較。
   ⚠ 小問ごとの配点は公式「正答及び配点」PDFが未確認のため**仮置き**（fukuoka1 と同じ）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "福岡県スタイル 模擬テスト③",
fullMarks: 60,
sections: [

/* ===== 大問1 リスニング（問題1〜4・20点9問） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます。福岡県は問題1だけが1回読み、問題2〜4は2回読まれます）。", groups:[

  { intro:"問題1　放送を聞いて、内容に合うものをア〜エから1つ選びなさい。英文は1回だけ読まれます。",
    script:'(1) Look at the sign at the Ishikura Town Library. It opens at nine thirty and closes at six.',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"放送に合うものはどれですか。",
      choices:["図書館は9時30分に開き、6時に閉まる。","図書館は9時に開き、6時30分に閉まる。",
               "図書館は9時30分に開き、5時に閉まる。","歴史館は9時30分に開き、6時に閉まる。"], answer:0 } ] },
  { script:'(2) Look at the picture. Rin is taking a picture of the stone bridge, and Taiga is drawing it in his notebook.',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"放送に合う絵はどれですか。",
      choices:["リンが石橋の写真をとり、タイガがノートに橋の絵をかいている。","リンがノートに橋の絵をかき、タイガが石橋の写真をとっている。",
               "リンが石橋の写真をとり、タイガが橋の上で本を読んでいる。","リンとタイガが石橋の上でいっしょに写真をとっている。"], answer:0 } ] },

  { intro:"問題2　リン(Rin)とタイガ(Taiga)が、下の案内を見ています。放送を聞いて、それぞれの問いに答えなさい。英文は2回読まれます。",
    passage:'<b>石倉町 歴史ツアー（土・日）</b>'+
      '<table><tr><th>ツアー</th><th>出発</th><th>所要時間</th><th>料金</th></tr>'+
      '<tr><td>Tour A: the stone bridge</td><td>9:00 a.m.</td><td>30 minutes</td><td>free</td></tr>'+
      '<tr><td>Tour B: the stone bridge and the old houses</td><td>9:00 a.m.</td><td>1 hour</td><td>200 yen</td></tr>'+
      '<tr><td>Tour C: the stone bridge and a boat ride</td><td>10:30 a.m.</td><td>1 hour</td><td>500 yen</td></tr>'+
      '<tr><td>Tour D: the stone bridge, the old houses and a boat ride</td><td>10:30 a.m.</td><td>2 hours</td><td>600 yen</td></tr></table>',
    script:'(1) Rin wants to take a boat ride on Sunday, but she has only five hundred yen. Which tour should she choose?',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"リンが選ぶツアーはどれですか。",
      choices:[ E("Tour A"), E("Tour B"), E("Tour C"), E("Tour D") ], answer:2 } ] },
  { script:'(2) Taiga will take Tour B with his father. How much will they pay?',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"タイガと父親が払う金額はどれですか。",
      choices:[ E("200 yen"), E("400 yen"), E("600 yen"), E("1,000 yen") ], answer:1 } ] },

  { intro:"問題3　ALTのホール先生(Mr. Hall)が、自分の町にある橋について話しています。リンのメモの（あ）（い）に入る英語1語を書きなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, I\'m Mr. Hall. I come from a small town by a river, and my town has an old bridge, too. It was built about two hundred years ago.</span>'+
      '<span class="sp">It is made of <b>wood</b>, not stone. People still <b>walk</b> across it every day.</span>'+
      '<span class="sp">Every summer, we have a music festival on the bridge. When I was a student, I played the guitar there.</span>',
    passage:'<b>リンのメモ</b><br>Mr. Hall の町の橋<br>— built about 200 years ago<br>— made of （　あ　）, not stone<br>'+
            '— people still （　い　） across it every day<br>— every summer: a music festival on the bridge',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）橋の材料", answers:["wood"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）人々が今も毎日していること", answers:["walk"], hint:"英語1語" } ] },

  { intro:"問題4　青木先生(Ms. Aoki)が、石橋についての探究学習を説明しています。放送を聞いて(1)〜(3)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next week, our class will start a project about the Ishikura Stone Bridge. The bridge was built one hundred and fifty years ago, and it is the oldest bridge in our town. You will work in three groups.</span>'+
      '<span class="sp">Group one will go to the town library and read old books about the bridge. Group two will count the people who cross the bridge every day. Group three will visit old people in town and ask about their memories of the bridge.</span>'+
      '<span class="sp">Rin has already chosen group two. She said, "Some people say the town doesn\'t need the bridge, so I want to know how many people use it."</span>'+
      '<span class="sp">We will meet at the bridge at nine on Monday. Please bring a notebook and a hat, because it is still hot outside.</span>',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["橋は150年前に建てられ、町でいちばん古い橋だ。","橋は50年前に建てられ、町でいちばん新しい橋だ。",
               "クラスは4つのグループに分かれて活動する。","月曜日は10時に橋に集合する。"], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"グループ2がすることとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("read old books about the bridge"), E("count the people who cross the bridge"),
                E("ask old people about their memories"), E("clean the bridge every morning") ], answer:1 },
    { type:"fill", label:"(3)", pt:4,
      stem:"リンがグループ2を選んだ理由を、放送の中の語を使って英語3語で書きなさい。<br>"+
           E("Rin chose group two because she wants to know （　　） use the bridge."),
      answers:["how many people"], hint:"英語3語（放送の中の言い方をそのまま使う）" } ] }
]},

/* ===== 大問2 短い対話の空所補充（8点4問） ===== */
{ no:2, title:"次の(1)〜(4)の対話について、それぞれの問いに答えなさい。", groups:[
  { note:"語注：report レポート",
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: Have you finished your report about the stone bridge?<br>B: （　　）<br>A: Then let's look for one at the library."),
      choices:[ E("Not yet. I need one more book."), E("Yes, I finished it last night."),
                E("I have never seen the bridge."), E("The library is closed today.") ], answer:0 },
    { type:"mcq", label:"(2)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: Which picture did you take?<br>B: （　　）<br>A: Oh, the stone one. It looks great."),
      choices:[ E("The one which shows the stone bridge."), E("I took it last Sunday."),
                E("Yes, I did."), E("I don't have a camera.") ], answer:0 },
    { type:"fill", label:"(3)", pt:2,
      stem:"（　）内の語を、最も適当な形に変えて1語で書きなさい。<br>"+
           E("The stone bridge in our town was ( build ) about 150 years ago."),
      answers:["built"], hint:"was のうしろ・1語" },
    { type:"wordorder", label:"(4)", pt:2,
      stem:"次の語を正しく並べかえて、対話を完成させなさい。<br>"+
           E("A: What are you looking at?<br>B: This is （　　）."),
      words:["a","map","that","shows","old","bridges"], answer:"a map that shows old bridges" } ]}
]},

/* ===== 大問3 対話文読解（10点5問） ===== */
{ no:3, title:"中学生のリン(Rin)とタイガ(Taiga)、ALTのホール先生(Mr. Hall)が、「石橋の日」の案内を見ながら話しています。次は、その案内と会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Ishikura Stone Bridge Day</h4>'+
    '<div class="note">Let\'s learn about our 150-year-old bridge!</div>'+
    '<table><tr><td>Date</td><td>October 10 (Sat)</td></tr>'+
    '<tr><td>Time</td><td>10:00 a.m. – 3:00 p.m.</td></tr>'+
    '<tr><td>Place</td><td>Ishikura Riverside Park (next to the bridge)</td></tr>'+
    '<tr><td>Program</td><td>10:00 a.m. History talk by Ms. Aoki<br>11:00 a.m. Bridge walk with a guide<br>1:00 p.m. Old photo show</td></tr>'+
    '<tr><td>Fee</td><td>200 yen　(junior high school students: 100 yen)</td></tr></table>'+
    '<div class="note">Bring … a hat and a bottle of water.<br>'+
    'If it rains, the history talk and the photo show will be held in the town library.</div>',
    passage:
    '<span class="sp"><span class="who">Rin:</span> Look at this, Taiga. There will be a Stone Bridge Day at Ishikura Riverside Park on October tenth.</span>'+
    '<span class="sp"><span class="who">Taiga:</span> Stone Bridge Day? What can we do there?</span>'+
    '<span class="sp"><span class="who">Rin:</span> Ms. Aoki will give a talk about the history of the bridge at ten. There is also a bridge walk with a guide at eleven.</span>'+
    '<span class="sp"><span class="who">Taiga:</span> That\'s perfect for our project. We should （　あ　） the bridge walk. How much is it?</span>'+
    '<span class="sp"><span class="who">Rin:</span> Two hundred yen, but it is one hundred yen for junior high school students.</span>'+
    '<span class="sp"><span class="who">Taiga:</span> That\'s not expensive. Mr. Hall, will you come with us?</span>'+
    '<span class="sp"><span class="who">Mr. Hall:</span> Of course. I want to （　あ　） the history talk, too. I walk across the bridge every morning, but I don\'t know its history at all.</span>'+
    '<span class="sp"><span class="who">Rin:</span> Then you will enjoy the old photo show at one. Ms. Aoki has many pictures of the bridge taken about one hundred years ago.</span>'+
    '<span class="sp"><span class="who">Mr. Hall:</span> Great! I like taking pictures, too. Please tell me <u>(い) ( the / place / best / pictures / to take )</u> of the bridge.</span>'+
    '<span class="sp"><span class="who">Taiga:</span> The park next to the bridge. You can see the whole bridge from there.</span>'+
    '<span class="sp"><span class="who">Mr. Hall:</span> Thank you. What will happen if it rains?</span>'+
    '<span class="sp"><span class="who">Rin:</span> The history talk and the photo show will be held in the town library. But I think the bridge walk will be canceled.</span>'+
    '<span class="sp"><span class="who">Taiga:</span> I hope it will be sunny. What should we bring?</span>'+
    '<span class="sp"><span class="who">Rin:</span> A hat and a bottle of water. It is still hot in October.</span>'+
    '<span class="sp"><span class="who">Mr. Hall:</span> OK. I\'m looking forward to it. Let\'s meet at the park gate at nine forty.</span>',
    note:'語注：guide 案内人／whole 全体の／hold 開催する／cancel 中止する',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"2か所の（あ）に共通して入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("join"), E("close"), E("build"), E("miss") ], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"リンとホール先生の2人が「石橋の日」に参加するとき、2人が払う金額の合計として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("200 yen"), E("300 yen"), E("400 yen"), E("600 yen") ], answer:1 },
    { type:"mcq", label:"(3)", pt:2, stem:"案内や会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Mr. Hall walks across the bridge every morning."), E("The bridge walk starts at one in the afternoon."),
                E("Junior high school students must pay two hundred yen."), E("Mr. Hall doesn't like taking pictures.") ], answer:0 },
    { type:"fill", label:"(4)", pt:2,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、会話の中から抜き出して書きなさい。<br>"+
           E("Taiga says that Mr. Hall can （　　） from the park next to the bridge."),
      answers:["see the whole bridge"], hint:"英語4語" },
    { type:"wordorder", label:"(5)", pt:2, stem:"下線部(い)の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["the","place","best","pictures","to take"], answer:"the best place to take pictures",
      display:"the best place to take pictures" } ]}
]},

/* ===== 大問4 長文読解（14点5問・グラフつき） ===== */
{ no:4, title:"次の英文は、石倉中学校のリン(Rin)が、探究学習の発表で話した内容です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Rin. Have you ever walked across the Ishikura Stone Bridge? '+
    'It was built one hundred and fifty years ago, and it is the oldest bridge in our town. '+
    'Last spring, I heard that some people wanted to take it down because it was old and small. '+
    'I asked myself, "Does our town still need this bridge?" '+
    'To find the answer, my group studied the bridge for three months.<br><br>'+
    '<b>②</b> First, we counted the people who crossed the bridge. '+
    'We stood at the bridge from seven in the morning to five in the evening for five weekdays, '+
    'and we asked some of them why they used it. '+
    'Then we visited Ms. Aoki, who teaches us about the history of our town, and learned how the bridge was built.<br><br>'+
    '<b>③</b> Look at the graph. It shows the number of people who crossed the bridge in one day. '+
    'The most people crossed it between seven and nine in the morning. Most of them were students walking to school. '+
    'The number was the smallest around noon, but it went up again in the afternoon. '+
    'Many of the people at that time were old people going to the shops across the river. '+
    'In one day, about three hundred and sixty people used the bridge. '+
    'The new road bridge is two kilometers away, so people without cars need the old bridge.<br><br>'+
    '<b>④</b> Ms. Aoki told us an interesting story. The bridge was built by the people of Ishikura. '+
    'They carried big stones from the mountain and built the bridge with their own hands. '+
    'She also showed us <u>③ ( pictures / taken / some / at / the bridge )</u> more than one hundred years ago. '+
    'In the pictures, people were dancing on the bridge at a festival. '+
    'An old man who lives near the bridge said, "When I was a child, I played on the bridge every day. It is the treasure of our town."<br><br>'+
    '<b>⑤</b> Now I can answer my question. Yes, our town still needs the bridge. '+
    'It is used by many people every day, and it holds the memories of our town. '+
    'My group made a poster with the graph and the old pictures, and we put it at Ishikura Station. '+
    'Next month, we will ask the town to repair the bridge instead of taking it down. '+
    'I hope more people will understand why this bridge is important.',
    passageEn:true,
    flyer:
    '<h4>グラフ：石倉の石橋を渡った人の数（平日1日・時間帯別）</h4>'+
    '<table><tr><th>時間帯</th><th>7〜9時</th><th>9〜11時</th><th>11〜13時</th><th>13〜15時</th><th>15〜17時</th></tr>'+
    '<tr><td>渡った人の数（人）</td><td>120</td><td>40</td><td>30</td><td>60</td><td>110</td></tr></table>',
    note:'語注：take down 取りこわす／weekday 平日／noon 正午／kilometer キロメートル／treasure 宝物／poster ポスター／repair 修理する',
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"次の1文は、①〜⑤のどの段落の直後に入れるのが最も適当ですか。<br>"+
           E("In other words, the bridge is still a part of their everyday life."),
      choices:["①の直後","②の直後","③の直後","④の直後"], answer:2 },
    { type:"mcq", label:"(2)", pt:2, stem:"グラフと本文から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:["7時から9時に橋を渡った人が最も多く、その数は120人だった。","11時から13時に橋を渡った人は、13時から15時より多かった。",
               "15時から17時に橋を渡った人は、7時から9時より多かった。","1日に橋を渡った人は、全部で約200人だった。"], answer:0 },
    { type:"wordorder", label:"(3)", pt:2, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["pictures","taken","some","at","the bridge"],
      answer:"some pictures taken at the bridge",
      display:"some pictures taken at the bridge" },
    { type:"fill", label:"(4)", pt:4,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、第4段落から抜き出して書きなさい。<br>"+
           E("The people of Ishikura carried big stones from the mountain and built the bridge （　　）."),
      answers:["with their own hands"], hint:"第4段落の語・英語4語" },
    { type:"mcqMulti", label:"(5)", pt:4, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Rin's group studied the bridge for three months."),
                E("Rin's group counted the people on the bridge on Sunday."),
                E("The new road bridge is two kilometers away from the old bridge."),
                E("Ms. Aoki built the bridge with her own hands."),
                E("Rin's group put the poster at the town library.") ], answer:[0,2] } ]}
]},

/* ===== 大問5 条件英作文（8点3問・骨組みを作る形） ===== */
{ no:5, title:"石倉町では、古い石橋をこれからどうするかを話し合っています。次のA〜Cから1つ選び、自分の考えとその理由を町の人に伝える英文を作ります。ここでは A を選んだものとして、(1)〜(3)に答えなさい。", groups:[
  { passage:
    '<b>3つの案</b><br>'+
    'A： 古い石橋を残して修理する　'+E("keep and repair the old stone bridge")+'<br>'+
    'B： 記録を残して新しい橋にかえる　'+E("build a new bridge and keep records of the old one")+'<br>'+
    'C： 橋を新しい公園の一部にする　'+E("make the bridge a part of a new park")+'<br><br>'+
    '<b>作る英文の組み立て</b><br>'+
    '① 自分の立場　→　② その理由　→　③ 町の人にどうしてほしいか',
    note:'語注：repair 修理する／record 記録',
    items:[
    { type:"wordorder", label:"(1)", pt:2,
      stem:"①「わたしは、わたしたちは古い石橋を残すべきだと思う。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["should","I","we","think","keep","the old stone bridge"],
      answer:"I think we should keep the old stone bridge",
      display:"I think we should keep the old stone bridge." },
    { type:"wordorder", label:"(2)", pt:2,
      stem:"②「それは町の多くの人に使われている橋だからです。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["because","it is","a bridge","used by","many people"],
      answer:"because it is a bridge used by many people",
      display:"because it is a bridge used by many people." },
    { type:"fill", label:"(3)", pt:4,
      stem:"③「わたしは町の人々に、この橋を大切にしてほしい。」という文にします。<br>"+
           "（　）に入れるのに最も適当な英語3語を書きなさい。<br>"+
           E("I want people in our town （　　） of this bridge."),
      answers:["to take care"], hint:"英語3語（want＋人＋to 〜 の形）" } ]}
]}

]};
