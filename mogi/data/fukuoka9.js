/* data/fukuoka9.js ─ 福岡県スタイル 模擬テスト⑨（60点満点・26問）
   参照：factory/inputs/fukuoka_notes.md／fukuoka_pattern.json（福岡県公立入試の「傾向のみ」を参照）、
   モデルは fukuoka1.js（大問1〜5・26問・60点・20-8-10-14-8）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。

   ★題材：スマートフォンの使い方と睡眠時間のアンケート（探究発表・グラフ）。
     舞台は架空の「橘市（Tachibana City）」、登場人物は Nanako・Riku・ALTの Mr. Dean・保健の Dr. Sano。
     地名・学校名・人名・数値はすべて架空。
   ★文法の軸：後置修飾（分詞・関係代名詞・不定詞の形容詞的用法）＋現在完了・受け身・比較。
   ★配点は 2点を基本単位、重い4問だけ4点（2点×22＋4点×4＝60）。
   ⚠ 小問ごとの配点は公式「正答及び配点」PDFが未確認のため**仮置き**（fukuoka1 と同一）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "福岡県スタイル 模擬テスト⑨",
fullMarks: 60,
sections: [

/* ===== 大問1 リスニング（問題1〜4・20点9問） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます。福岡県は問題1だけが1回読み、問題2〜4は2回読まれます）。", groups:[

  { intro:"問題1　放送を聞いて、内容に合うものをア〜エから1つ選びなさい。英文は1回だけ読まれます。",
    script:'(1) Look at the poster in the hallway. Dr. Sano\'s talk about sleep will start at two thirty.',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"放送に合うものはどれですか。",
      choices:["佐野先生の睡眠についての話は2時30分に始まる。","佐野先生の睡眠についての話は2時13分に始まる。",
               "佐野先生の睡眠についての話は3時30分に始まる。","佐野先生の朝食についての話は2時30分に始まる。"], answer:0 } ] },
  { script:'(2) Look at the picture. Riku is reading a book on the bed, and Nanako is putting her phone in a small box.',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"放送に合う絵はどれですか。",
      choices:["リクがベッドで本を読み、ナナコがスマホを小さな箱に入れている。","リクがベッドでスマホを見て、ナナコが本を小さな箱に入れている。",
               "リクがベッドで本を読み、ナナコがスマホを大きな箱に入れている。","リクがいすで本を読み、ナナコがスマホを小さな箱に入れている。"], answer:0 } ] },

  { intro:"問題2　ナナコ(Nanako)とリク(Riku)が、下の案内を見ています。放送を聞いて、それぞれの問いに答えなさい。英文は2回読まれます。",
    passage:'<b>橘市保健センター　健康教室のお知らせ</b>'+
      '<table><tr><th>日</th><th>時こく</th><th>テーマ</th></tr>'+
      '<tr><td>Wednesday</td><td>5:00 p.m.</td><td>Sleep and Smartphones</td></tr>'+
      '<tr><td>Saturday</td><td>10:30 a.m.</td><td>Sleep and Smartphones</td></tr>'+
      '<tr><td>Saturday</td><td>3:00 p.m.</td><td>Healthy Eating</td></tr>'+
      '<tr><td>Sunday</td><td>10:30 a.m.</td><td>Healthy Eating</td></tr></table>',
    script:'(1) Nanako wants to learn about sleep and smartphones. She has club practice every Wednesday, and she is free on Saturday morning. Which one should she choose?',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"ナナコが選ぶのはどれですか。",
      choices:[ E("Wednesday, 5:00 p.m."), E("Saturday, 10:30 a.m."),
                E("Saturday, 3:00 p.m."), E("Sunday, 10:30 a.m.") ], answer:1 } ] },
  { script:'(2) Riku will leave school at three thirty. It takes twenty-five minutes to Tachibana Health Center by bus. What time will he get there?',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"リクが保健センターに着く時こくはどれですか。",
      choices:[ E("3:05 p.m."), E("3:30 p.m."), E("3:55 p.m."), E("4:05 p.m.") ], answer:2 } ] },

  { intro:"問題3　ALTのディーン先生(Mr. Dean)が、自分の国の学校とスマートフォンについて話しています。ナナコのメモの（あ）（い）に入る英語1語を書きなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, I\'m Mr. Dean. In my country, students cannot use their phones at school. They give their phones to the <b>teacher</b> in the morning, and they get them back after school.</span>'+
      '<span class="sp">At home, my parents had a rule. I had to stop using my phone at <b>nine</b> every night. At first it was hard, but I slept very well.</span>',
    passage:'<b>ナナコのメモ</b><br>Mr. Dean の国の学校<br>— students give their phones to the （　あ　） in the morning<br>'+
            '— at home, he had to stop using his phone at （　い　） every night',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）朝、生徒がスマホをわたす相手", answers:["teacher"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）夜、スマホを使うのをやめる時こく", answers:["nine","9"], hint:"英語1語" } ] },

  { intro:"問題4　保健の佐野先生(Dr. Sano)が、睡眠についての調査の結果を説明しています。放送を聞いて(1)〜(3)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Last month, we asked all the students in our school about their sleep. Many students said that they sleep less than seven hours.</span>'+
      '<span class="sp">Why? Most of them use their phones in bed before they sleep. The light from the phone makes it hard to fall asleep.</span>'+
      '<span class="sp">So, from next week, we will start "No Phone Night" every Tuesday. On that night, please put your phone in another room after nine.</span>'+
      '<span class="sp">Riku has already tried this. He said, "I want to get up early, so I put my phone in the living room." Please tell your family about this, and try it together.</span>',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["多くの生徒が、7時間より短く眠っていると答えた。","多くの生徒が、7時間より長く眠っていると答えた。",
               "「ノー・フォン・ナイト」は毎週金曜日に行われる。","9時以降は、スマホを先生にわたす。"], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"生徒がねむりにつきにくくなる原因として、佐野先生が挙げたものはどれですか。",
      choices:[ E("the light from the phone"), E("the sound from the TV"),
                E("a hot room at night"), E("a big dinner") ], answer:0 },
    { type:"fill", label:"(3)", pt:4,
      stem:"リクがスマホを居間に置く理由を、放送の中の語を使って英語3語で書きなさい。<br>"+
           E("Riku puts his phone in the living room because he wants to （　　）."),
      answers:["get up early"], hint:"英語3語（放送の中の言い方をそのまま使う）" } ] }
]},

/* ===== 大問2 短い対話の空所補充（8点4問） ===== */
{ no:2, title:"次の(1)〜(4)の対話について、それぞれの問いに答えなさい。", groups:[
  { note:"語注：midnight 真夜中",
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: You look tired, Nanako. Did you sleep well last night?<br>B: （　　）<br>A: You should go to bed earlier."),
      choices:[ E("No. I watched videos on my phone until midnight."), E("Yes. I slept for nine hours."),
                E("No. I don't have a phone."), E("Yes. I went to bed at eight.") ], answer:0 },
    { type:"mcq", label:"(2)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: Who is the woman talking with Mr. Dean?<br>B: （　　）<br>A: Oh, I didn't know that."),
      choices:[ E("She is the doctor who works in our school."), E("I talked with him yesterday."),
                E("Yes, she is."), E("He is our English teacher.") ], answer:0 },
    { type:"fill", label:"(3)", pt:2,
      stem:"（　）内の語を、最も適当な形に変えて1語で書きなさい。<br>"+
           E("For me, getting up early is ( easy ) than going to bed early."),
      answers:["easier"], hint:"than があるので・1語" },
    { type:"wordorder", label:"(4)", pt:2,
      stem:"次の語を正しく並べかえて、対話を完成させなさい。<br>"+
           E("A: What are you looking at?<br>B: This is （　　）."),
      words:["showing","the graph","our","sleep","time"], answer:"the graph showing our sleep time" } ]}
]},

/* ===== 大問3 対話文読解（10点5問） ===== */
{ no:3, title:"中学生のリク(Riku)とナナコ(Nanako)、ALTのディーン先生(Mr. Dean)が、「よい睡眠週間」の案内を見ながら話しています。次は、その案内と会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Tachibana Junior High School — Good Sleep Week</h4>'+
    '<div class="note">Let\'s sleep well and enjoy school!</div>'+
    '<table><tr><td>Date</td><td>October 12 (Mon) – October 16 (Fri)</td></tr>'+
    '<tr><td>Talk</td><td>"Sleep and Your Phone" by Dr. Sano<br>October 12, 3:30 p.m., in the gym</td></tr>'+
    '<tr><td>Challenge</td><td>Put your phone away by 9:00 p.m.<br>Go to bed by 10:30 p.m.</td></tr>'+
    '<tr><td>Sleep record sheet</td><td>Write down your sleep time every morning.<br>Give it to your homeroom teacher on October 19 (Mon).</td></tr>'+
    '<tr><td>Prize</td><td>Students who do the challenge for five days get a "Good Sleeper" card.</td></tr></table>',
    passage:
    '<span class="sp"><span class="who">Riku:</span> Look at this, Nanako. Our school will have Good Sleep Week next month.</span>'+
    '<span class="sp"><span class="who">Nanako:</span> Good Sleep Week? What will we do?</span>'+
    '<span class="sp"><span class="who">Riku:</span> First, Dr. Sano will give a talk in the gym on October twelfth. Then we take the challenge for five days.</span>'+
    '<span class="sp"><span class="who">Nanako:</span> The challenge? Oh, I see. We have to put our phones away by nine and go to bed by ten thirty.</span>'+
    '<span class="sp"><span class="who">Riku:</span> That\'s right. Can you do it?</span>'+
    '<span class="sp"><span class="who">Nanako:</span> Going to bed （　あ　） is hard for me. I often watch videos on my phone in bed, so I can\'t sleep well.</span>'+
    '<span class="sp"><span class="who">Riku:</span> Then put your phone away before nine. If you sleep well, you can get up （　あ　） too.</span>'+
    '<span class="sp"><span class="who">Nanako:</span> I\'ll try. Mr. Dean, please tell me <u>(い) ( the / best / way / to / sleep / well )</u>.</span>'+
    '<span class="sp"><span class="who">Mr. Dean:</span> Well, I stopped using my phone in bed two years ago. Now I read a book for about ten minutes before I sleep. It works for me.</span>'+
    '<span class="sp"><span class="who">Nanako:</span> That sounds nice. I\'ll try it too.</span>'+
    '<span class="sp"><span class="who">Mr. Dean:</span> In my country, many students have the same problem. Some of my friends put their phones in the kitchen at night.</span>'+
    '<span class="sp"><span class="who">Riku:</span> And look, we have to write down our sleep time every morning. We give the sheet to our homeroom teacher on October nineteenth.</span>'+
    '<span class="sp"><span class="who">Nanako:</span> Every morning? That\'s a lot of work. But if I do the challenge for five days, I\'ll get a Good Sleeper card.</span>'+
    '<span class="sp"><span class="who">Mr. Dean:</span> That sounds fun. I\'ll try the challenge with you. Let\'s sleep well together!</span>'+
    '<span class="sp"><span class="who">Nanako:</span> Thank you, Mr. Dean. I want to get the card.</span>',
    note:'語注：challenge 挑戦／gym 体育館／homeroom teacher 担任の先生／prize 賞',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"2か所の（あ）に共通して入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("early"), E("late"), E("fast"), E("long") ], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"睡眠の記録シートについて、案内と会話から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Students give it to their homeroom teacher on October 19."), E("Students give it to Dr. Sano on October 16."),
                E("Students write down their sleep time every night."), E("Students do not have to write it.") ], answer:0 },
    { type:"mcq", label:"(3)", pt:2, stem:"案内や会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Mr. Dean stopped using his phone in bed two years ago."), E("Riku often watches videos on his phone in bed."),
                E("Nanako goes to bed before nine every day."), E("Dr. Sano's talk will be held in the library.") ], answer:0 },
    { type:"fill", label:"(4)", pt:2,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、会話の中から抜き出して書きなさい。<br>"+
           E("Mr. Dean reads a book （　　） before he sleeps."),
      answers:["for about ten minutes"], hint:"英語4語" },
    { type:"wordorder", label:"(5)", pt:2, stem:"下線部(い)の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["the","best","way","to","sleep","well"], answer:"the best way to sleep well",
      display:"the best way to sleep well" } ]}
]},

/* ===== 大問4 長文読解（14点5問・グラフつき） ===== */
{ no:4, title:"次の英文は、橘中学校のナナコ(Nanako)が、探究学習の発表で話した内容です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Nanako. Last spring, I often felt sleepy in class. '+
    'My friend Riku said, "Me too. Maybe our phones are the reason." '+
    'I wanted to know if this was true, so I asked the third-year students in our school about their phones and their sleep.<br><br>'+
    '<b>②</b> In June, I gave a survey to one hundred twenty students. '+
    'I asked two questions: "How long do you use your phone every day?" and "How many hours do you sleep?" '+
    'Dr. Sano, our school doctor, helped me make the questions. '+
    'Then I put the students into four groups by their phone time. '+
    'The graph shows the number of students in each group as bars, and their average sleep time as a line.<br><br>'+
    '<b>③</b> Look at the graph. The largest group was the students who use their phones for one to two hours a day. '+
    'Forty-five students were in this group. The line went down as the phone time went up. '+
    'The students who use their phones for more than three hours slept only about six hours. '+
    'Dr. Sano told me the reason. '+
    'She said, "The light from a phone tells our body that it is still daytime, so we cannot fall asleep easily."<br><br>'+
    '<b>④</b> I also asked, "Do you feel sleepy in class?" '+
    'In the group of less than one hour, only two students out of ten said yes. '+
    'In the group of more than three hours, fifteen out of twenty-five said yes. '+
    'Riku was in this group. He said, "I have used my phone in bed for two years. I often check it again and again before I sleep." '+
    'From these answers, I understood that <u>④ our phones take our sleep time away</u>.<br><br>'+
    '<b>⑤</b> After the survey, our class started a rule. <u>③ ( the rule / made / by / our class / is )</u> simple: no phones in bed. '+
    'I have followed the rule for three months, and now I sleep more than seven hours. I don\'t feel sleepy in class anymore. '+
    'At first, it was hard for some of us, but now many of my classmates say that they feel better in the morning. '+
    'Riku also said, "I put my phone in the living room at night. Now I don\'t check it before I sleep, and I sleep well." '+
    'Next, I want to ask the first-year and second-year students, too. '+
    'Let\'s sleep well and enjoy our school life together!',
    passageEn:true,
    flyer:
    '<h4>グラフ：橘中学校3年生120人　1日のスマホ使用時間ごとの人数（棒）と平均睡眠時間（折れ線）</h4>'+
    '<table><tr><th>1日のスマホ使用時間</th><th>1時間未満</th><th>1〜2時間</th><th>2〜3時間</th><th>3時間より長い</th></tr>'+
    '<tr><td>人数（人）</td><td>10</td><td>45</td><td>40</td><td>25</td></tr>'+
    '<tr><td>平均睡眠時間（時間）</td><td>7.9</td><td>7.5</td><td>7.0</td><td>6.2</td></tr></table>',
    note:'語注：sleepy ねむい／survey アンケート／average 平均の／school doctor 学校医（保健の先生）／daytime 昼間／fall asleep ねむりにつく／rule ルール／anymore もう（〜ない）',
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"次の1文は、①〜⑤のどの段落の直後に入れるのが最も適当ですか。<br>"+
           E("In other words, our phones were the reason for feeling sleepy in class."),
      choices:["②の直後","③の直後","④の直後","⑤の直後"], answer:2 },
    { type:"mcq", label:"(2)", pt:2, stem:"グラフと本文から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:["スマホを1日1〜2時間使う生徒が最も多く、45人だった。","スマホを3時間より長く使う生徒の平均睡眠時間は7時間より長かった。",
               "スマホを1時間未満使う生徒の平均睡眠時間が最も短かった。","スマホを2〜3時間使う生徒は10人だった。"], answer:0 },
    { type:"wordorder", label:"(3)", pt:2, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["the rule","made","by","our class","is"],
      answer:"the rule made by our class is",
      display:"the rule made by our class is" },
    { type:"fill", label:"(4)", pt:4,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、第3段落から抜き出して書きなさい。<br>"+
           E("Dr. Sano said that the light from a phone tells our body that （　　）."),
      answers:["it is still daytime"], hint:"第3段落の語・英語4語" },
    { type:"mcqMulti", label:"(5)", pt:4, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Nanako gave the survey to one hundred twenty students in June."),
                E("Nanako asked the first-year students about their sleep."),
                E("Riku used his phone in bed for two years before the rule started."),
                E("The students who use their phones the most slept the longest."),
                E("Nanako still feels sleepy in class after the rule.") ], answer:[0,2] } ]}
]},

/* ===== 大問5 条件英作文（8点3問・骨組みを作る形） ===== */
{ no:5, title:"橘中学校では、生徒の睡眠時間を増やすために新しい取り組みを始めます。次のA〜Cから1つ選び、自分の考えとその理由を伝える英文を作ります。ここでは A を選んだものとして、(1)〜(3)に答えなさい。", groups:[
  { passage:
    '<b>3つの案</b><br>'+
    'A： 夜9時以降はスマホを家族にあずける　'+E("give our phones to our family after nine")+'<br>'+
    'B： 毎朝、睡眠時間を記録する　'+E("write down our sleep time every morning")+'<br>'+
    'C： 月に1回、保健の先生の話を聞く　'+E("listen to Dr. Sano's talk once a month")+'<br><br>'+
    '<b>作る英文の組み立て</b><br>'+
    '① 自分の考え　→　② その理由　→　③ みんなにどうしてほしいか',
    note:'語注：after nine 9時以降',
    items:[
    { type:"wordorder", label:"(1)", pt:2,
      stem:"①「わたしたちは夜9時以降はスマホを家族にあずけるべきだと思います。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["think","we","I","should","give our phones","to our family","after nine"],
      answer:"I think we should give our phones to our family after nine",
      display:"I think we should give our phones to our family after nine." },
    { type:"wordorder", label:"(2)", pt:2,
      stem:"②「ベッドで使われるスマホは、わたしたちの睡眠時間を短くするからです。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["because","phones","used in bed","make","our sleep time","shorter"],
      answer:"because phones used in bed make our sleep time shorter",
      display:"because phones used in bed make our sleep time shorter." },
    { type:"fill", label:"(3)", pt:4,
      stem:"③「わたしはみんなに、ベッドでスマホを使うのをやめてほしい。」という文にします。<br>"+
           "（　）に入れるのに最も適当な英語3語を書きなさい。<br>"+
           E("I want everyone （　　） their phones in bed."),
      answers:["to stop using","not to use"], hint:"英語3語（want＋人＋to 〜 の形）" } ]}
]}

]};
