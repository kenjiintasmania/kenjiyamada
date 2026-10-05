/* data/fukuoka8.js ─ 福岡県スタイル 模擬テスト⑧（60点満点・26問）
   参照：factory/inputs/fukuoka_notes.md／fukuoka_pattern.json（福岡県公立入試の「傾向のみ」を参照）。
   骨格は fukuoka1.js と同一（大問1〜5・26問・20-8-10-14-8）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。

   ★題材：学校給食の人気メニューと食べ残しのアンケート（探究発表・グラフ）。
   ★舞台：砂浜市（Sunahama City・架空）／登場人物：Emi, Shun, Ms. Fox（ALT）, Ms. Kaneko（栄養の先生）。
     地名・学校名・人名はすべて**架空**。
   ★文法の軸：後置修飾（分詞・関係代名詞・接触節）＋現在完了・受け身・比較。
   ⚠ 小問ごとの配点は公式「正答及び配点」PDFが未確認のため**仮置き**（fukuoka1 と同じ）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "福岡県スタイル 模擬テスト⑧",
fullMarks: 60,
sections: [

/* ===== 大問1 リスニング（問題1〜4・20点9問） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます。福岡県は問題1だけが1回読み、問題2〜4は2回読まれます）。", groups:[

  { intro:"問題1　放送を聞いて、内容に合うものをア〜エから1つ選びなさい。英文は1回だけ読まれます。",
    script:'(1) Look at the menu board at Sunahama Junior High School. Today\'s lunch is curry and rice, and lunch starts at twelve thirty.',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"放送に合うものはどれですか。",
      choices:["今日の給食はシチューで、12時30分に始まる。","今日の給食はカレーライスで、12時30分に始まる。",
               "今日の給食はカレーライスで、12時13分に始まる。","今日の給食はカレーライスで、1時30分に始まる。"], answer:1 } ] },
  { script:'(2) Look at the picture. Emi is carrying a big pot, and Shun is holding three bottles of milk.',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"放送に合う絵はどれですか。",
      choices:["エミが小さななべを運び、シュンが牛乳のびんを3本持っている。","エミが大きななべを運び、シュンが牛乳のびんを1本持っている。",
               "エミが大きななべを運び、シュンが牛乳のびんを3本持っている。","エミが牛乳のびんを3本持ち、シュンが大きななべを運んでいる。"], answer:2 } ] },

  { intro:"問題2　エミ(Emi)とシュン(Shun)が、下の案内を見ています。放送を聞いて、それぞれの問いに答えなさい。英文は2回読まれます。",
    passage:'<b>砂浜市 料理教室</b>'+
      '<table><tr><th>日</th><th>時こく</th><th>内容</th></tr>'+
      '<tr><td>Wednesday</td><td>4:00 p.m.</td><td>Making curry</td></tr>'+
      '<tr><td>Thursday</td><td>4:00 p.m.</td><td>Making bread</td></tr>'+
      '<tr><td>Saturday</td><td>10:00 a.m.</td><td>Making bread</td></tr>'+
      '<tr><td>Saturday</td><td>2:00 p.m.</td><td>Making curry</td></tr></table>',
    script:'(1) Emi wants to learn how to make bread. She has club activities on Wednesday and Saturday, so she can\'t go on those days. Which lesson should she choose?',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"エミが選ぶ教室はどれですか。",
      choices:[ E("Wednesday, 4:00 p.m."), E("Thursday, 4:00 p.m."),
                E("Saturday, 10:00 a.m."), E("Saturday, 2:00 p.m.") ], answer:1 } ] },
  { script:'(2) Shun will join the curry lesson on Saturday afternoon. It starts at two and takes ninety minutes. What time will it finish?',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"シュンの教室が終わる時こくはどれですか。",
      choices:[ E("2:30 p.m."), E("3:00 p.m."), E("3:30 p.m."), E("4:00 p.m.") ], answer:2 } ] },

  { intro:"問題3　ALTのフォックス(Ms. Fox)先生が、自分の国の学校の昼食について話しています。エミのメモの（あ）（い）に入る英語1語を書きなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, I\'m Ms. Fox. In my country, most students bring their own lunch to school in a box.</span>'+
      '<span class="sp">Some students buy lunch at school. The most popular lunch there is pizza, and we eat it in a big lunch room, not in the classroom.</span>',
    passage:'<b>エミのメモ</b><br>Ms. Fox の国の昼食<br>— most students bring their own lunch in a （　あ　）<br>'+
            '— the most popular lunch at school: （　い　） → eat it in a big lunch room',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）", answers:["box"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）", answers:["pizza"], hint:"英語1語" } ] },

  { intro:"問題4　栄養の先生のカネコ(Ms. Kaneko)先生が、来週の「給食週間」について説明しています。放送を聞いて(1)〜(3)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next week, we will have Lunch Week at Sunahama Junior High School. We have three events.</span>'+
      '<span class="sp">On Monday, you will vote for your favorite lunch menu. On Wednesday, the most popular menu will be served. On Friday, we will weigh the food left on the trays after lunch.</span>'+
      '<span class="sp">Last year, Shun\'s class left the least food in the school. He said, "We wanted to thank the cooks, so we tried to eat everything."</span>'+
      '<span class="sp">Please wash your hands well and come to the lunch room by twelve thirty.</span>',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["月曜日に食べ残しの重さをはかる。","月曜日に好きな給食のメニューに投票する。",
               "水曜日に投票をする。","金曜日に最も人気のメニューが出される。"], answer:1 },
    { type:"mcq", label:"(2)", pt:2, stem:"金曜日にすることとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("vote for the favorite lunch menu"), E("cook the most popular menu"),
                E("weigh the food left on the trays"), E("wash the trays after lunch") ], answer:2 },
    { type:"fill", label:"(3)", pt:4,
      stem:"シュンのクラスが全部食べようとした理由を、放送の中の語を使って英語3語で書きなさい。<br>"+
           E("Shun's class tried to eat everything because they wanted to （　　）."),
      answers:["thank the cooks"], hint:"英語3語（放送の中の言い方をそのまま使う）" } ] }
]},

/* ===== 大問2 短い対話の空所補充（8点4問） ===== */
{ no:2, title:"次の(1)〜(4)の対話について、それぞれの問いに答えなさい。", groups:[
  { note:"語注：tray おぼん／farmer 農家の人／plan 計画する",
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: Did you finish your lunch today?<br>B: （　　）<br>A: That's great. The cooks will be happy."),
      choices:[ E("No, I left some rice on my tray."), E("I will bring my lunch tomorrow."),
                E("Yes, I ate everything on my tray."), E("I don't know today's menu.") ], answer:2 },
    { type:"mcq", label:"(2)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: Who is the woman talking with Ms. Kaneko?<br>B: （　　）<br>A: Oh, I see. So the onions in today's soup are from her farm."),
      choices:[ E("She is a new music teacher."), E("She is the farmer who grows vegetables for our lunch."),
                E("I have never seen her before."), E("She likes talking with students.") ], answer:1 },
    { type:"fill", label:"(3)", pt:2,
      stem:"（　）内の語を、最も適当な形に変えて1語で書きなさい。<br>"+
           E("Shun has ( eat ) school lunch at this school for three years."),
      answers:["eaten"], hint:"has のうしろ・1語" },
    { type:"wordorder", label:"(4)", pt:2,
      stem:"次の語を正しく並べかえて、対話を完成させなさい。<br>"+
           E("A: Who is Ms. Kaneko?<br>B: She is （　　）."),
      words:["the","teacher","who","plans","our","school lunch"], answer:"the teacher who plans our school lunch" } ]}
]},

/* ===== 大問3 対話文読解（10点5問） ===== */
{ no:3, title:"中学生のエミ(Emi)とシュン(Shun)、ALTのフォックス先生(Ms. Fox)が、学校のポスターを見ながら話しています。次は、そのポスターと会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Sunahama Junior High School — Dream Lunch Contest</h4>'+
    '<div class="note">Make a new lunch menu for our school!</div>'+
    '<table><tr><td>Idea cards</td><td>Write your idea on a card and put it in the box by October 9 (Fri)</td></tr>'+
    '<tr><td>Voting</td><td>October 15 (Thu), 12:30 – 1:00 p.m., in the lunch room</td></tr>'+
    '<tr><td>Votes</td><td>Each student can vote for two ideas</td></tr>'+
    '<tr><td>Prize</td><td>The winning menu will be served on November 20 (Fri)</td></tr>'+
    '<tr><td>Rule</td><td>Use vegetables from farms in Sunahama City</td></tr></table>'+
    '<div class="note">If you have questions, ask Ms. Kaneko in the lunch room.</div>',
    passage:
    '<span class="sp"><span class="who">Emi:</span> Look at this poster, Shun. Our school will have a Dream Lunch Contest next month.</span>'+
    '<span class="sp"><span class="who">Shun:</span> A Dream Lunch Contest? What is it?</span>'+
    '<span class="sp"><span class="who">Emi:</span> We write our ideas for a new lunch menu on a card. Then everyone votes, and the winning menu will be served in November.</span>'+
    '<span class="sp"><span class="who">Shun:</span> That sounds fun. When do we have to put the card in the box?</span>'+
    '<span class="sp"><span class="who">Emi:</span> By October ninth. We don\'t have much time.</span>'+
    '<span class="sp"><span class="who">Shun:</span> I see. Ms. Fox, do you have any ideas? You have eaten school lunch with us for two years.</span>'+
    '<span class="sp"><span class="who">Ms. Fox:</span> Yes, I have one. I like your school lunch very much, but I have never seen pizza on the menu. How about a pizza with a lot of （　あ　）? Pizza is very popular in my country.</span>'+
    '<span class="sp"><span class="who">Shun:</span> Great idea! Look, the poster says our ideas must use （　あ　） grown in Sunahama City. Pizza with fresh tomatoes and onions from our city is perfect.</span>'+
    '<span class="sp"><span class="who">Emi:</span> I like it, too. But I have never made a pizza. Is it difficult?</span>'+
    '<span class="sp"><span class="who">Ms. Fox:</span> No, it isn\'t. <u>(い) ( the / pizza / I / made / last week )</u> was very easy. I can show you the recipe.</span>'+
    '<span class="sp"><span class="who">Emi:</span> Thank you. Shun, how many ideas can each student vote for?</span>'+
    '<span class="sp"><span class="who">Shun:</span> Two. So we can vote for our own idea and one more. The voting will be held in the lunch room on October fifteenth.</span>'+
    '<span class="sp"><span class="who">Ms. Fox:</span> Then let\'s write our idea today. If our pizza wins, everyone will eat it on November twentieth.</span>'+
    '<span class="sp"><span class="who">Emi:</span> I\'m looking forward to that day. I hope many students will vote for our pizza.</span>',
    note:'語注：contest コンテスト／vote 投票する／prize 賞／recipe 作り方',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"2か所の（あ）に共通して入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("fruits"), E("fish"), E("vegetables"), E("rice") ], answer:2 },
    { type:"mcq", label:"(2)", pt:2, stem:"投票について、ポスターと会話から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Students will vote on October 9 in their classrooms."), E("Each student can vote for two ideas on October 15."),
                E("Each student can vote for only one idea."), E("The voting will be held on November 20.") ], answer:1 },
    { type:"mcq", label:"(3)", pt:2, stem:"ポスターや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Ms. Fox thinks making a pizza is difficult."), E("Shun doesn't like Ms. Fox's idea."),
                E("Pizza is not popular in Ms. Fox's country."), E("Emi has never made a pizza.") ], answer:3 },
    { type:"fill", label:"(4)", pt:2,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、会話の中から抜き出して書きなさい。<br>"+
           E("Shun thinks that a pizza with （　　） from their city is a perfect idea."),
      answers:["fresh tomatoes and onions"], hint:"英語4語" },
    { type:"wordorder", label:"(5)", pt:2, stem:"下線部(い)の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["the","pizza","I","made","last week"], answer:"the pizza I made last week",
      display:"the pizza I made last week" } ]}
]},

/* ===== 大問4 長文読解（14点5問・グラフつき） ===== */
{ no:4, title:"次の英文は、砂浜中学校のエミ(Emi)が、探究学習の発表で話した内容です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Emi. After lunch every day, I help carry the food left on the trays to the kitchen. '+
    'One day, Ms. Kaneko, our nutrition teacher, told me that about eight kilograms of food is thrown away every day at our school. '+
    'I was shocked. Why do we leave so much food? '+
    'I wanted to know the answer, so I decided to study school lunch at Sunahama Junior High School.<br><br>'+
    '<b>②</b> First, I asked all three hundred students in our school, "Which lunch menu do you like the best?" '+
    'I gave them four menus to choose from: curry and rice, fried chicken, vegetable stew, and grilled fish. '+
    'Then, with Ms. Kaneko\'s help, I weighed the food left after lunch on the day each menu was served. '+
    'The graph shows the number of votes as bars, and the weight of the food left as a line.<br><br>'+
    '<b>③</b> Look at the graph. Curry and rice was the most popular menu. '+
    'One hundred and twenty students chose it, and only three kilograms of food were left on that day. '+
    'Grilled fish got the fewest votes, and twelve kilograms were left. '+
    'When a menu got more votes, less food was left. '+
    'From this, I thought that students leave the food they don\'t like.<br><br>'+
    '<b>④</b> However, when I asked the students who left food, "Why did you leave it?", I found something surprising. '+
    'I thought most of them would say, "I don\'t like it." '+
    'But the most common answer was "I didn\'t have enough time." '+
    'Our lunch time is only twenty minutes, and many students said that it was too short for them. '+
    'Some students also said, "I want to eat everything, but I can\'t finish it."<br><br>'+
    '<b>⑤</b> So I want to suggest two things. '+
    'First, we should put the vegetables that many students leave into popular menus like curry. '+
    'Second, we should start lunch five minutes earlier. '+
    'Ms. Kaneko liked my ideas, and our school will try them next month. '+
    'If the food left becomes less, I will show the new graph to everyone. '+
    'The cooks get up early every morning and cook for three hundred students. '+
    'We should not throw away <u>③ ( the food / the cooks / made / for / us )</u>. '+
    'I want to keep studying school lunch and make our lunch time better.',
    passageEn:true,
    flyer:
    '<h4>グラフ：砂浜中学校　好きな給食メニューの投票数（棒）と、その日の食べ残しの量（折れ線）</h4>'+
    '<table><tr><th>メニュー</th><th>カレーライス</th><th>からあげ</th><th>野菜シチュー</th><th>焼き魚</th></tr>'+
    '<tr><td>投票数（人）</td><td>120</td><td>90</td><td>60</td><td>30</td></tr>'+
    '<tr><td>食べ残し（kg）</td><td>3</td><td>5</td><td>9</td><td>12</td></tr></table>',
    note:'語注：nutrition teacher 栄養の先生／kilogram キログラム／throw away 捨てる／stew シチュー／grilled 焼いた／weigh 重さをはかる／vote 投票（数）／weight 重さ',
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"次の1文は、①〜⑤のどの段落の直後に入れるのが最も適当ですか。<br>"+
           E("In other words, the students needed more time, not different menus."),
      choices:["①の直後","②の直後","④の直後","⑤の直後"], answer:2 },
    { type:"mcq", label:"(2)", pt:2, stem:"グラフと本文から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:["焼き魚は投票数が最も多かった。","カレーライスは投票数が最も多く、食べ残しは3kgだった。",
               "からあげの食べ残しは野菜シチューより多かった。","野菜シチューの投票数は焼き魚より少なかった。"], answer:1 },
    { type:"wordorder", label:"(3)", pt:2, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["the food","the cooks","made","for","us"],
      answer:"the food the cooks made for us",
      display:"the food the cooks made for us" },
    { type:"fill", label:"(4)", pt:4,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、第4段落から抜き出して書きなさい。<br>"+
           E("Emi found that the most common reason for leaving food was that the students （　　）."),
      answers:["didn't have enough time","did not have enough time"], hint:"第4段落の語・英語4語" },
    { type:"mcqMulti", label:"(5)", pt:4, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("About eight kilograms of food is thrown away every day at Emi's school."),
                E("Emi asked one hundred students about their favorite menu."),
                E("Only three kilograms of food were left on the curry and rice day."),
                E("Most students left food because they didn't like it."),
                E("Emi wants to stop studying school lunch.") ], answer:[0,2] } ]}
]},

/* ===== 大問5 条件英作文（8点3問・骨組みを作る形） ===== */
{ no:5, title:"砂浜中学校では、給食の食べ残しを減らすために何をするべきかを話し合っています。次のA〜Cから1つ選び、自分の意見とその理由を伝える英文を作ります。ここでは B を選んだものとして、(1)〜(3)に答えなさい。", groups:[
  { passage:
    '<b>3つの案</b><br>'+
    'A： 人気のメニューをもっと多く出す　'+E("serve popular menus more often")+'<br>'+
    'B： 昼食の時間を長くする　'+E("make lunch time longer")+'<br>'+
    'C： 学校で野菜を育てて給食に使う　'+E("grow vegetables at school for lunch")+'<br><br>'+
    '<b>作る英文の組み立て</b><br>'+
    '① 自分の意見　→　② その理由　→　③ みんなにどうなってほしいか',
    note:'語注：serve （料理を）出す',
    items:[
    { type:"wordorder", label:"(1)", pt:2,
      stem:"①「わたしは、わたしたちは昼食の時間をもっと長くするべきだと思います。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["think","I","should","we","make","lunch time longer"],
      answer:"I think we should make lunch time longer",
      display:"I think we should make lunch time longer." },
    { type:"wordorder", label:"(2)", pt:2,
      stem:"②「20分で食べ終えることができない生徒がたくさんいるからです。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["because","there","are","many students","who","can't finish eating in twenty minutes"],
      answer:"because there are many students who can't finish eating in twenty minutes",
      display:"because there are many students who can't finish eating in twenty minutes." },
    { type:"fill", label:"(3)", pt:4,
      stem:"③「わたしはみんなに、毎日昼食を食べ終えてほしい。」という文にします。<br>"+
           "（　）に入れるのに最も適当な英語3語を書きなさい。<br>"+
           E("I want everyone （　　） their lunch every day."),
      answers:["to finish eating"], hint:"英語3語（want＋人＋to 〜 の形。「食べ終える」は finish ＋ 〜ing）" } ]}
]}

]};
