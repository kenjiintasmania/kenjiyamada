/* data/fukuoka6.js ─ 福岡県スタイル 模擬テスト⑥（60点満点・26問）
   参照：factory/inputs/fukuoka_notes.md／fukuoka_pattern.json／authoring_rules.md
   （福岡県公立入試の「傾向のみ」を参照。骨格は fukuoka1.js と同一：大問1〜5・26問・20-8-10-14-8）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。

   ★題材：外国から来た転校生とのコミュニケーション（学校のルール・給食・部活の紹介）。
     舞台は架空の「水穂市（Mizuho City）」、登場人物は Ayaka・Kenji・Ms. Reed（ALT）・
     Diego（ブラジルから来た転校生）。地名・学校名・人名はすべて**架空**。
   ★文法の軸：後置修飾（分詞・関係代名詞・接触節・不定詞の形容詞的用法）＋現在完了・受け身・比較。
   ★配点は 2点を基本単位、重い4問だけ4点（2点×22＋4点×4＝60）。
   ⚠ 小問ごとの配点は公式「正答及び配点」PDFが未確認のため**仮置き**（fukuoka1 と同じ）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "福岡県スタイル 模擬テスト⑥",
fullMarks: 60,
sections: [

/* ===== 大問1 リスニング（問題1〜4・20点9問） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます。福岡県は問題1だけが1回読み、問題2〜4は2回読まれます）。", groups:[

  { intro:"問題1　放送を聞いて、内容に合うものをア〜エから1つ選びなさい。英文は1回だけ読まれます。",
    script:'(1) Diego\'s first day at Mizuho Junior High School is Thursday, April sixteenth.',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"放送に合うものはどれですか。",
      choices:["ディエゴの登校初日は4月16日の木曜日である。","ディエゴの登校初日は4月6日の木曜日である。",
               "ディエゴの登校初日は4月16日の火曜日である。","ディエゴの登校初日は6月16日の木曜日である。"], answer:0 } ] },
  { script:'(2) Look at the picture. Diego is wearing a blue cap and holding a soccer ball.',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"放送に合う絵はどれですか。",
      choices:["ディエゴが青い帽子をかぶり、サッカーボールを持っている。","ディエゴが赤い帽子をかぶり、サッカーボールを持っている。",
               "ディエゴが青い帽子をかぶり、バスケットボールを持っている。","ディエゴが青いかばんを持ち、サッカーボールを持っている。"], answer:0 } ] },

  { intro:"問題2　アヤカ(Ayaka)とケンジ(Kenji)が、転校生のディエゴ(Diego)のために、下の部活動見学の案内を見ています。放送を聞いて、それぞれの問いに答えなさい。英文は2回読まれます。",
    passage:'<b>部活動見学の案内（4月）</b>'+
      '<table><tr><th>曜日</th><th>時こく</th><th>部</th></tr>'+
      '<tr><td>Monday</td><td>4:00 p.m.</td><td>Soccer club</td></tr>'+
      '<tr><td>Tuesday</td><td>4:30 p.m.</td><td>Brass band</td></tr>'+
      '<tr><td>Wednesday</td><td>4:00 p.m.</td><td>Science club</td></tr>'+
      '<tr><td>Thursday</td><td>4:30 p.m.</td><td>Basketball club</td></tr></table>',
    script:'(1) Diego wants to visit a sports club. He has a piano lesson on Monday, so he can\'t go on that day. Which club visit should he choose?',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"ディエゴが選ぶ見学はどれですか。",
      choices:[ E("Monday, 4:00 p.m."), E("Tuesday, 4:30 p.m."),
                E("Wednesday, 4:00 p.m."), E("Thursday, 4:30 p.m.") ], answer:3 } ] },
  { script:'(2) Kenji will show Diego the science room after lunch. Lunch starts at twelve twenty and takes thirty minutes. What time will lunch finish?',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"昼食が終わる時こくはどれですか。",
      choices:[ E("12:20 p.m."), E("12:30 p.m."), E("12:50 p.m."), E("1:00 p.m.") ], answer:2 } ] },

  { intro:"問題3　転校生のディエゴ(Diego)が、自分の国の学校について話しています。アヤカのメモの（あ）（い）に入る英語1語を書きなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hi, everyone. I\'m Diego. I came from Brazil last month.</span>'+
      '<span class="sp">At my school in Brazil, classes started at seven and finished at noon. We didn\'t have school lunch, so we ate lunch at <b>home</b>.</span>'+
      '<span class="sp">Our long vacation was in <b>July</b>, because it is winter in Brazil then. I was surprised that your long vacation is in summer.</span>',
    passage:'<b>アヤカのメモ</b><br>Diego の国の学校<br>— classes: 7:00 → noon, no school lunch → ate lunch at （　あ　）<br>'+
            '— long vacation: in （　い　）, because it is winter there then',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）家", answers:["home"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）7月", answers:["July"], hint:"英語1語" } ] },

  { intro:"問題4　ALTのリード先生(Ms. Reed)が、転校生のディエゴを迎える「ウェルカムウィーク」について説明しています。放送を聞いて(1)〜(3)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next week is Welcome Week for Diego. You will work in one of three groups.</span>'+
      '<span class="sp">Group A will show him the school rules. Group B will eat school lunch with him and explain the menu. Group C will take him to club activities after school.</span>'+
      '<span class="sp">Ayaka has already chosen Group B. She said, "I want to talk about food, so this is a good group for me."</span>'+
      '<span class="sp">On Friday, we will have a small welcome party in the music room. It starts at three thirty. Please bring one thing you want to show Diego.</span>',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["グループは3つあり、その中の1つに入って活動する。","グループは3つあり、全員が3つすべてに参加する。",
               "歓迎会は金曜日の4時30分に始まる。","歓迎会は体育館で行われる。"], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"グループCがすることとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("show him the school rules"), E("eat school lunch with him"),
                E("take him to club activities"), E("teach him Japanese songs") ], answer:2 },
    { type:"fill", label:"(3)", pt:4,
      stem:"アヤカがグループBを選んだ理由を、放送の中の語を使って英語3語で書きなさい。<br>"+
           E("Ayaka chose Group B because she wants to （　　）."),
      answers:["talk about food"], hint:"英語3語（放送の中の言い方をそのまま使う）" } ]}
]},

/* ===== 大問2 短い対話の空所補充（8点4問） ===== */
{ no:2, title:"次の(1)〜(4)の対話について、それぞれの問いに答えなさい。", groups:[
  { note:"語注：especially 特に",
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: Diego, how was your first school lunch in Japan?<br>B: （　　）<br>A: I'm glad you liked it."),
      choices:[ E("It was delicious, especially the soup."), E("I will eat it tomorrow."),
                E("I don't like Japanese food."), E("I have never had lunch at school.") ], answer:0 },
    { type:"mcq", label:"(2)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: Which boy is Diego?<br>B: （　　）<br>A: The one near the window? OK, I'll go and talk to him."),
      choices:[ E("The boy standing near the window."), E("He came here from Brazil."),
                E("Yes, he is my classmate."), E("I don't know him well.") ], answer:0 },
    { type:"fill", label:"(3)", pt:2,
      stem:"（　）内の語を、最も適当な形に変えて1語で書きなさい。<br>"+
           E("Diego has ( be ) in Japan for two months."),
      answers:["been"], hint:"has のうしろ・1語" },
    { type:"wordorder", label:"(4)", pt:2,
      stem:"次の語を正しく並べかえて、対話を完成させなさい。<br>"+
           E("A: Who is that woman?<br>B: She is （　　）."),
      words:["teaches","the","who","teacher","us","English"], answer:"the teacher who teaches us English" } ]}
]},

/* ===== 大問3 対話文読解（10点5問） ===== */
{ no:3, title:"中学生のケンジ(Kenji)とアヤカ(Ayaka)、ALTのリード先生(Ms. Reed)が、転校生のディエゴ(Diego)のために作った学校生活の案内を見ながら話しています。次は、その案内と会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Mizuho Junior High School — A Day at Our School</h4>'+
    '<div class="note">Welcome, Diego! This is our school day.</div>'+
    '<table><tr><td>8:15</td><td>Morning meeting</td></tr>'+
    '<tr><td>8:30 – 12:20</td><td>Classes (four classes)</td></tr>'+
    '<tr><td>12:20 – 12:50</td><td>School lunch (in our classroom)</td></tr>'+
    '<tr><td>12:50 – 1:20</td><td>Lunch break</td></tr>'+
    '<tr><td>1:30 – 3:10</td><td>Classes (two classes)</td></tr>'+
    '<tr><td>3:30 – 5:30</td><td>Club activities (Monday – Friday)</td></tr></table>'+
    '<div class="note">Bring … a lunch mat and a cup.<br>'+
    'Rules … Don\'t use your phone at school. Change your shoes at the entrance.</div>',
    passage:
    '<span class="sp"><span class="who">Kenji:</span> Ms. Reed, we made this guide for Diego. Could you check our English?</span>'+
    '<span class="sp"><span class="who">Ms. Reed:</span> Sure. Oh, this is a nice table. It shows a day at our school. Does Diego know that we eat school lunch in the classroom?</span>'+
    '<span class="sp"><span class="who">Ayaka:</span> No, he doesn\'t. In his country, students go home for lunch. So we wrote, "We eat lunch in the （　あ　） room that we study in."</span>'+
    '<span class="sp"><span class="who">Ms. Reed:</span> That\'s clear. What about the things he needs to bring?</span>'+
    '<span class="sp"><span class="who">Kenji:</span> A lunch mat and a cup. We also wrote that everyone eats the （　あ　） menu. He was surprised to hear that.</span>'+
    '<span class="sp"><span class="who">Ms. Reed:</span> I understand. In my country, students choose their lunch from three or four dishes.</span>'+
    '<span class="sp"><span class="who">Ayaka:</span> Really? Then Diego may feel strange at first. I hope he likes Japanese food.</span>'+
    '<span class="sp"><span class="who">Kenji:</span> I think he will. Yesterday he said he wanted to try miso soup.</span>'+
    '<span class="sp"><span class="who">Ms. Reed:</span> Good. Now, look at the club activities. It says they finish at five thirty. Is that every day?</span>'+
    '<span class="sp"><span class="who">Kenji:</span> From Monday to Friday. There are no club activities on weekends in April, because new students are still choosing their clubs.</span>'+
    '<span class="sp"><span class="who">Ms. Reed:</span> I see. Diego likes soccer, right?</span>'+
    '<span class="sp"><span class="who">Ayaka:</span> Yes. <u>(い) ( is / the club / to / join / he / wants )</u> the soccer club. He has played soccer since he was five.</span>'+
    '<span class="sp"><span class="who">Ms. Reed:</span> Great. One more thing. Please tell him about the phone rule. Some students forget it.</span>'+
    '<span class="sp"><span class="who">Kenji:</span> We wrote it here. "Don\'t use your phone at school." We also wrote that he should change his shoes at the entrance.</span>'+
    '<span class="sp"><span class="who">Ms. Reed:</span> Perfect. I\'m sure this guide will help him a lot.</span>'+
    '<span class="sp"><span class="who">Ayaka:</span> Thank you, Ms. Reed. We will give it to him tomorrow morning.</span>',
    note:'語注：mat 敷物／menu メニュー／dish 料理／entrance 入り口',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"2か所の（あ）に共通して入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("same"), E("new"), E("small"), E("different") ], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"ディエゴの昼食について、案内と会話から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("He will eat lunch in his classroom from 12:20 to 12:50."), E("He will go home for lunch at 12:20."),
                E("He will choose his lunch from three or four dishes."), E("He will eat lunch in the gym at 12:50.") ], answer:0 },
    { type:"mcq", label:"(3)", pt:2, stem:"案内や会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Diego has played soccer since he was five."), E("Diego doesn't want to try Japanese food."),
                E("Ms. Reed made the guide for Diego."), E("There are club activities on weekends in April.") ], answer:0 },
    { type:"fill", label:"(4)", pt:2,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、会話の中から抜き出して書きなさい。<br>"+
           E("Diego may （　　） because everyone eats the same menu."),
      answers:["feel strange at first"], hint:"英語4語" },
    { type:"wordorder", label:"(5)", pt:2, stem:"下線部(い)の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["is","the club","to","join","he","wants"], answer:"the club he wants to join is",
      display:"the club he wants to join is" } ]}
]},

/* ===== 大問4 長文読解（14点5問・グラフつき） ===== */
{ no:4, title:"次の英文は、水穂中学校のケンジ(Kenji)が、探究学習の発表で話した内容です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Kenji. In April, Diego came to our class from Brazil. '+
    'On his first day, he looked nervous and didn\'t say much. '+
    'I wanted to talk with him, but I didn\'t know what to say. Many of my classmates felt the same way. '+
    'So I decided to study one question: how can we communicate with a friend who speaks a different language?<br><br>'+
    '<b>②</b> First, I asked my thirty classmates, "How did you talk with Diego in April?" Each student chose one answer. '+
    'Look at the graph. Twelve students used easy English. Nine students used gestures, '+
    'and six students showed him pictures on paper or on a phone. Only three students used Japanese. '+
    'Then I asked Diego which way was the best for him. His answer surprised me. '+
    'He said, "Pictures were the best. Easy English was good, too, but a picture is something everyone can understand."<br><br>'+
    '<b>③</b> Next, I made a small picture book with Ayaka. It shows the things we use at school every day: '+
    'a lunch mat, a cup, and our school shoes. Under each picture, we wrote the word in Japanese, English, and Portuguese. '+
    'We gave the book to Diego, and we also gave one to every student in our class. '+
    'After that, more students started to talk with him. <u>③ ( helped / the book / us / we / made )</u> a lot.<br><br>'+
    '<b>④</b> In May, I asked my classmates another question: "Do you talk with Diego every day?" '+
    'In April, only eight students said yes. In May, the number went up to twenty-five. '+
    'Diego also changed. Now he talks about soccer with his friends at lunch time, and he says "itadakimasu" before eating. '+
    'He told me, "I felt lonely in April, but now I feel that I am one of you."<br><br>'+
    '<b>⑤</b> From this study, I learned two things. First, language is not the only way to communicate. '+
    'Pictures and gestures can open the door. Second, the most important thing is to try. '+
    'Diego said, "When someone tries to talk with me, I feel happy, even if the English is not perfect." '+
    'Next month, a new student from Vietnam will come to our school. '+
    'I want to use what I learned and make a picture book for her, too.',
    passageEn:true,
    flyer:
    '<h4>グラフ：4月にディエゴとどのように話したか（クラス30人・1人1つ回答）</h4>'+
    '<table><tr><th>方法</th><th>やさしい英語</th><th>身ぶり</th><th>絵や写真を見せる</th><th>日本語</th></tr>'+
    '<tr><td>人数</td><td>12</td><td>9</td><td>6</td><td>3</td></tr></table>',
    note:'語注：nervous 緊張した／communicate 意思を伝え合う／gesture 身ぶり／Portuguese ポルトガル語／lonely さびしい／perfect 完全な',
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"次の1文は、①〜④のどの段落の直後に入れるのが最も適当ですか。<br>"+
           E("This means that seventeen more students began to talk with him every day."),
      choices:["①の直後","②の直後","③の直後","④の直後"], answer:3 },
    { type:"mcq", label:"(2)", pt:2, stem:"グラフと本文から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:["やさしい英語を使った生徒が最も多く、日本語を使った生徒は3人だった。","身ぶりを使った生徒は、絵や写真を見せた生徒より少なかった。",
               "絵や写真を見せた生徒が最も多かった。","日本語を使った生徒は9人だった。"], answer:0 },
    { type:"wordorder", label:"(3)", pt:2, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["helped","the book","us","we","made"],
      answer:"the book we made helped us",
      display:"the book we made helped us" },
    { type:"fill", label:"(4)", pt:4,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、第2段落から抜き出して書きなさい。<br>"+
           E("Diego said that pictures were the best because a picture is （　　）."),
      answers:["something everyone can understand"], hint:"第2段落の語・英語4語" },
    { type:"mcqMulti", label:"(5)", pt:4, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Diego came to Kenji's class from Brazil in April."),
                E("Kenji asked his classmates only one question."),
                E("Kenji and Ayaka made a picture book with words in three languages."),
                E("Diego said that easy English was the best way for him."),
                E("A new student from Vietnam came to the school last month.") ], answer:[0,2] } ]}
]},

/* ===== 大問5 条件英作文（8点3問・骨組みを作る形） ===== */
{ no:5, title:"転校生のディエゴ(Diego)に、水穂中学校の生活を紹介します。次のA〜Cから1つ選び、最初に紹介したいこととその理由を伝える英文を作ります。ここでは C を選んだものとして、(1)〜(3)に答えなさい。", groups:[
  { passage:
    '<b>3つの案</b><br>'+
    'A： 学校のルール　'+E("the school rules")+'<br>'+
    'B： 給食　'+E("school lunch")+'<br>'+
    'C： 部活動　'+E("club activities")+'<br><br>'+
    '<b>作る英文の組み立て</b><br>'+
    '① 何を最初に紹介したいか　→　② その理由　→　③ 相手にどうなってほしいか',
    note:'語注：chance 機会／club activities 部活動',
    items:[
    { type:"wordorder", label:"(1)", pt:2,
      stem:"①「わたしはディエゴに、最初にわたしたちの部活動を見せたい。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["show","I","to","want","Diego","our club activities first"],
      answer:"I want to show Diego our club activities first",
      display:"I want to show Diego our club activities first." },
    { type:"wordorder", label:"(2)", pt:2,
      stem:"②「なぜなら、部活動はサッカーが好きな友達を作るよい機会だからです。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["because","a good chance","they are","friends","to make","who like soccer"],
      answer:"because they are a good chance to make friends who like soccer",
      display:"because they are a good chance to make friends who like soccer." },
    { type:"fill", label:"(3)", pt:4,
      stem:"③「わたしはディエゴに、わたしたちの学校で友達を作ってほしい。」という文にします。<br>"+
           "（　）に入れるのに最も適当な英語3語を書きなさい。<br>"+
           E("I want Diego （　　） at our school."),
      answers:["to make friends"], hint:"英語3語（want＋人＋to 〜 の形）" } ]}
]}

]};
