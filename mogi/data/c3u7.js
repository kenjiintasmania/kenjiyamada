/* data/c3u7.js ─ 中3 単元テスト⑦（初見・自動採点のみ）… テーマ：プログラミング部とロボットコンテスト（架空の Hikari City）。内容はすべて新規。
   参照：factory/inputs/authoring_rules.md／factory/inputs/okayama_notes.md（3年目の分析＝提供PDFの形式・配点だけを踏襲）
        ／モデル mogi/data/chu3_341.js（大問1〜5・28問・100点の骨格）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。
   登場人物：Daichi, Nao, Ms. Carter（ALT）, Mr. Ishii（顧問）。
   ※過去問および既存の模試データとの内容重複なし。
   ロック式：先生が /admin で「スタート」するまで問題は表示されない（exam.html の unit:true）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 単元テスト⑦",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ（英文1回読み・2問） */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the picture. Daichi is holding a small robot in his hands, and Nao is typing on a computer next to him.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵はどれですか。",
      choices:["ダイチがコンピュータを打ち、そのとなりでナオが小さなロボットを手に持っている。","ダイチが小さなロボットを手に持ち、そのとなりでナオが本を読んでいる。",
               "ダイチが小さなロボットを手に持ち、そのとなりでナオがコンピュータを打っている。","ダイチとナオが2人でいっしょにコンピュータを打っている。"], answer:2 } ] },
  { script:'(2) Look at the table. Last year, Team Sora\'s robot got the first prize in the Line Race, and the third prize in the Dance Robot.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う表（去年のコンテストでのチーム・ソラの結果）はどれですか。",
      choices:["ライン・レース 1位、ダンス・ロボット 3位","ライン・レース 3位、ダンス・ロボット 1位",
               "ライン・レース 1位、ダンス・ロボット 2位","ライン・レース 2位、ダンス・ロボット 3位"], answer:0 } ] },

  /* 問題B：チャイムの応答（対話の最後への応答・2回読み・2問） */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> I\'ve been writing this program for three hours, but the robot still doesn\'t move.</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Yes, I bought a new computer."), E("Why don't you take a break and check it again later?"),
                E("It was built in 1990."), E("I visited the science center yesterday.") ], answer:1 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> Are you going to join the robot contest next month?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("No, I have never been to Australia."), E("It's near the station."),
                E("Because it was too expensive."), E("Yes. I'm looking for one more team member.") ], answer:3 } ] },

  /* 問題C：メモの空所補充（英語1語×3・2回読み） */
  { intro:"問題C　ナオ(Nao)が、プログラミング部の顧問のイシイ(Mr. Ishii)先生の話を聞いて、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, everyone. I\'m Mr. Ishii, the teacher of the programming club. I have three things to tell you today.</span>'+
      '<span class="sp">First, our next club meeting will be next <b>Saturday</b>, not Wednesday, because I have to go to a teachers\' meeting on Wednesday.</span>'+
      '<span class="sp">Second, we usually use the computer room, but next week we will meet in the <b>science</b> room. The computer room will be used by another club.</span>'+
      '<span class="sp">Third, <b>fifteen</b> teams will join the city robot contest this year. Please think about ideas for our robot before the meeting.</span>',
    passage:'<b>ナオのメモ</b><br>Mr. Ishii\'s talk<br>— The next club meeting will be next （　あ　）.<br>'+
            '— Next week, go to the （　い　） room, not the computer room.<br>'+
            '— （　う　） teams will join the city robot contest this year.',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）土曜日", answers:["Saturday"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）理科（室）", answers:["science"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）コンテストに参加するチームの数", answers:["fifteen","15"], hint:"英語1語（数を表す語）" } ] },

  /* 問題D：説明＋人物発言（内容一致選択＋指定語を含む3語の英語） */
  { intro:"問題D　あなたとクラスメイトのナオ(Nao)が、ロボット作りのワークショップについての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next Sunday, the Hikari Science Center will hold a robot workshop for junior high school students. Each team will make one robot, and you can choose one job.</span>'+
      '<span class="sp">In Job A, you will build the body of the robot with tools. In Job B, you will write the program on a computer. In Job C, you will draw a poster and explain your robot to the judges.</span>'+
      '<span class="sp">The workshop starts at nine in the morning and finishes at one in the afternoon. Please bring a notebook and a pencil.</span>'+
      '<span class="sp"><span class="who">Nao:</span> I\'m not good at using tools, and speaking in front of people makes me nervous. But I like using computers. Which job should I choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["ワークショップでは、チームごとに2台のロボットを作る。","ワークショップは午前9時に始まり、午後1時に終わる。",
               "参加者はロボットを家から持っていく。","ワークショップは土曜日の午後に行われる。"], answer:1 },
    { type:"fill", label:"(2)", pt:3,
      stem:"ナオの発言に対して、あなたはどのように答えますか。書き出しに続けて（　）に program を含む3語の英語を書き、英文を完成させなさい。<br>"+
           E("Don't worry. Job B is the best for you. Let's （　　） together."),
      answers:["write the program"], hint:"英語3語（説明の中の言い方を使う）" } ] }
]},

/* ===== 大問2 ちらし（表）＋対話 ===== */
{ no:2, title:"中学生のダイチ(Daichi)とナオ(Nao)が、ヒカリ市のロボットコンテストのちらしを見ながら会話をしています。次は、そのちらしと会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Hikari City Robot Contest — Junior High School Classes</h4>'+
    '<div class="note">Bring your robot and show your ideas!</div>'+
    '<table><tr><th>Class</th><th>What your robot will do</th><th>Entry fee (one team)</th><th>Teams now</th></tr>'+
    '<tr><td>Line Race</td><td>run along a black line to the goal</td><td>free</td><td>12</td></tr>'+
    '<tr><td>Ball Shooter</td><td>pick up balls and put them into a box</td><td>300 yen</td><td>8</td></tr>'+
    '<tr><td>Robot Arm</td><td>move small blocks with an arm</td><td>500 yen</td><td>5</td></tr>'+
    '<tr><td>Dance Robot</td><td>move to music for one minute</td><td>300 yen</td><td>9</td></tr></table>'+
    '<div class="note">Date … Sunday, November 16, 10:00 a.m. – 3:00 p.m.<br>'+
    'Place … Hikari Science Center (a five-minute walk from Hikari Station)<br>'+
    'A robot kit is lent to each team for free. Please return the kit after the contest.<br>'+
    'Teams that need an extra sensor pay 200 yen.</div>',
    passage:
    '<span class="sp"><span class="who">Nao:</span> Daichi, look at this. The city robot contest will be held in November.</span>'+
    '<span class="sp"><span class="who">Daichi:</span> Oh, I have wanted to join it since I entered the programming club. Which class should we choose?</span>'+
    '<span class="sp"><span class="who">Nao:</span> How about the Ball Shooter class? Our club robot can already pick up a ball. And look, a robot （　あ　） is lent to each team for free.</span>'+
    '<span class="sp"><span class="who">Daichi:</span> That\'s great. But we have to return the （　あ　） after the contest, right?</span>'+
    '<span class="sp"><span class="who">Nao:</span> Yes. （　い　） ever joined a robot contest, Daichi?</span>'+
    '<span class="sp"><span class="who">Daichi:</span> No, never. But I have <u>(う) make</u> programs for our club robot many times.</span>'+
    '<span class="sp"><span class="who">Nao:</span> Then you can write the program, and I\'ll build the body. Our robot will need an extra sensor to find the balls.</span>'+
    '<span class="sp"><span class="who">Daichi:</span> OK. We have to pay for the sensor, too. Let\'s ask Mr. Ishii about it today.</span>',
    note:'語注：contest コンテスト／kit キット（ロボットの部品一式）／be lent 貸される／return 〜を返す／entry fee 参加料／shooter シューター（ボールを入れるもの）／block ブロック／sensor センサー／extra 追加の',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"2か所の（あ）に共通して入れるのに最も適当な英語1語を、ちらしの中から抜き出して書きなさい。",
      answers:["kit"], hint:"ちらしの中にある語" },
    { type:"fill", label:"(2)い", pt:3, stem:"（い）に入れるのに最も適当な2語の英語を書きなさい。", answers:["Have you"], hint:"英語2語（〜したことがありますか）" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う)の単語を、最も適当な形に変えて1語で書きなさい。", answers:["made"], hint:"I have 〜 programs for our club robot many times." },
    { type:"mcq", label:"(4)", pt:3, stem:"ちらしから、ダイチとナオのチームが払う金額として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("300 yen"), E("500 yen"), E("700 yen"), E("free") ], answer:1 },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("The contest will be held on a Saturday in October."),
                E("Each team must buy a robot kit at the science center."),
                E("The Line Race class has the most teams now."),
                E("Daichi has joined a robot contest before.") ], answer:2 } ]}
]},

/* ===== 大問3 会話の英作文（並べかえ2問） ===== */
{ no:3, title:"プログラミング部の部室を訪れたALTのカーター(Ms. Carter)先生と、中学生のダイチ(Daichi)が会話をしています。次の①〜⑥はそのときの二人の会話です。二人が考えている内容に合うように、(1)(2)の語を正しく並べかえて、会話を完成させなさい。なお、会話は①〜⑥の順に行われています。", groups:[
  { sceneNote:"イラスト：①カーター先生がボールを拾うロボットを見て「わあ、このロボットはボールを拾えるのね！それはあなたたちの部によって作られたの」とおどろいてたずねている。②ダイチが「はい。3か月で作りました」と答えている。③カーター先生が「3か月！何回それをテストしたの」と考えながらたずねている。④ダイチが「50回以上です。まだ時々止まります」と答えている。⑤カーター先生が「なるほど。来月のコンテスト、がんばってね」とはげましている。⑥ダイチが「ありがとうございます。全力をつくします」と答えている。",
    passage:
    '<span class="sp"><span class="who">Ms. Carter:</span> ① Wow, this robot can pick up a ball! <u>(1)</u>?</span>'+
    '<span class="sp"><span class="who">Daichi:</span> ② Yes. We built it in three months.</span>'+
    '<span class="sp"><span class="who">Ms. Carter:</span> ③ Three months! <u>(2)</u>?</span>'+
    '<span class="sp"><span class="who">Daichi:</span> ④ More than fifty times. It still stops sometimes.</span>'+
    '<span class="sp"><span class="who">Ms. Carter:</span> ⑤ I see. Good luck at the contest next month!</span>'+
    '<span class="sp"><span class="who">Daichi:</span> ⑥ Thank you. We\'ll do our best.</span>',
    passageEn:true,
    note:'語注：pick up 〜 〜を拾い上げる／test 〜を試す',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：カーター先生が「それはあなたたちの部によって作られたのですか」とたずねる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["it","Was","by","made","your","club"], answer:"Was it made by your club" },
    { type:"wordorder", label:"(2)", pt:5, stem:"イラスト：カーター先生が「何回それをテストしたのですか」とたずねる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["times","How","many","tested","have","you","it"], answer:"How many times have you tested it" } ]}
]},

/* ===== 大問4 話し合い＋日記 ===== */
{ no:4, title:"ALTのカーター(Ms. Carter)先生の英語の授業で、Daichi と Nao が、ロボットコンテストの準備について話し合いをしています。次の英文は、話し合いと、その日に Nao が書いた日記です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Ms. Carter:</span> Next month, Daichi and Nao will join the city robot contest. Today, let\'s talk about their robot. Daichi, how is it going?</span>'+
    '<span class="sp"><span class="who">Daichi:</span> Our robot can pick up balls now, but it sometimes stops in the middle of the field. We have been looking for the reason for two weeks.</span>'+
    '<span class="sp"><span class="who">Ms. Carter:</span> That sounds hard. What are you going to do?</span>'+
    '<span class="sp"><span class="who">Daichi:</span> I want to <u>check every line</u> of the program again. The program has about two hundred lines, so it will take a long time.</span>'+
    '<span class="sp"><span class="who">Ms. Carter:</span> I see. Nao, what do you think?</span>'+
    '<span class="sp"><span class="who">Nao:</span> I think the problem may be in the body, not in the program. We should be （　あ　） when we look at the wires and the sensor. A very small thing can stop a robot.</span>'+
    '<span class="sp"><span class="who">Ms. Carter:</span> Good point. Have you talked with Mr. Ishii about it yet?</span>'+
    '<span class="sp"><span class="who">Nao:</span> Not yet. He was busy this week, so we\'ll ask him tomorrow.</span>'+
    '<span class="sp"><span class="who">Ms. Carter:</span> Please do. Now let me tell you my story. When I was fourteen, I was in a science club, and we made a robot for a school contest. On the contest day, our robot didn\'t move at all.</span>'+
    '<span class="sp"><span class="who">Daichi:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Ms. Carter:</span> The battery was empty. I forgot to charge it the night before. It was a simple mistake, but I learned to check everything twice.</span>'+
    '<span class="sp"><span class="who">Nao:</span> That\'s a good lesson for us. We\'ll check the battery, the wires, and the program.</span>'+
    '<span class="sp"><span class="who">Ms. Carter:</span> Great. I\'m looking forward to seeing your robot at the contest.</span>',
    note:'語注：field フィールド（競技場）／reason 理由／line （プログラムの）行／wire 配線／sensor センサー／battery 電池／empty 空の／charge 〜を充電する／mistake まちがい／twice 2回／lesson 教訓／look forward to 〜ing 〜するのを楽しみにする' },
  { passage:'<b>Nao の日記</b><br>Today we talked about our robot in Ms. Carter\'s class. I was surprised to hear that Ms. Carter （　X　） when she was a student. '+
            'Tomorrow, Daichi and I will ask Mr. Ishii to look at our robot with us.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Daichi の発言から抜き出して書きなさい。<br>"+E("Daichi wants to [　　] of the program again."),
      answers:["check every line"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("noisy"),E("careful"),E("famous"),E("hungry")], answer:1 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("How much was the battery?"), E("When did you come to Hikari City?"),
                E("What was wrong with your robot?"), E("Who won the first prize?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Daichi and Nao have already found the reason for the problem."),
                E("Nao thinks the problem may be in the robot's body."),
                E("Ms. Carter's robot moved well on the contest day."),
                E("Daichi and Nao talked with Mr. Ishii yesterday.") ], answer:1 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("did not like science at all"), E("won the first prize easily"),
                E("made a robot for a contest"), E("taught English in Japan") ], answer:2 } ]}
]},

/* ===== 大問5 スピーチ（長文読解） ===== */
{ no:5, title:"次の英文は、ダイチ(Daichi)が英語の授業で発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Daichi. Since last spring, I have been a member of the programming club. '+
    'Before I joined it, I thought that making a robot was just writing a good program. '+
    'Now I think that working with others is the most important thing, and I want to tell you why.<br><br>'+
    '<b>②</b> Last month, Nao and I joined the city robot contest for the first time. Our robot was a ball shooter. '+
    'It had to pick up three balls and put them into a box in two minutes. I wrote the program alone for two months. '+
    'I stayed in the computer room until six every day, and I did not talk much with Nao. '+
    'On the day before the contest, our robot stopped in the middle of the field. '+
    'I checked the program again and again, but I could not find any mistakes. '+
    'I was <u>(お) ___</u>, and I could not sleep well that night.<br><br>'+
    '<b>③</b> On the contest day, Nao looked at the robot, not the program. '+
    'She found that the sensor was too close to the floor, so it could not see the balls well. '+
    'She moved it up a little, and the robot began to move again. Mr. Ishii said to us, '+
    '"A robot is not only a program. It is a body, a program, and a team." '+
    'In the afternoon, our robot put two balls into the box, and we got the fourth prize. '+
    'It was not the first prize, but I was really happy. '+
    'After the contest, a team of first-year students from another school asked us about the sensor. '+
    'Nao and I explained it to them for thirty minutes. They said, "We want to be like you next year."<br><br>'+
    '<b>④</b> Some people say that a small robot cannot change anything. That may be true. '+
    '<u>④ A small robot cannot solve the big problems in our city</u>. '+
    'But I learned something important. <u>③ ( who / friends / helped / me / I / have / build / it )</u>. '+
    'When we share our ideas, a program becomes more than words on a screen. '+
    'So please come to the computer room next Friday, and let\'s <u>(か) ___</u> a robot together!',
    passageEn:true,
    note:'語注：member 部員／shooter シューター（ボールを入れるもの）／alone ひとりで／field フィールド（競技場）／mistake まちがい／sensor センサー／close to 〜 〜に近い／floor 床／prize 賞／first-year 1年生の／explain 〜を説明する／solve 〜を解決する／problem 問題／share 〜を分け合う／screen 画面',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お proud　か sell"), E("お proud　か build"),
                E("お worried　か sell"), E("お worried　か build") ], answer:3 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "ナオはプログラムではなく、ロボットの本体を見た。", "センサーが床に近すぎたので、ロボットはボールをよく見ることができなかった。",
                "ダイチたちのロボットは、ボールを3つ箱に入れて1位になった。", "コンテストのあと、別の学校の1年生のチームがセンサーについてたずねた。" ], answer:2 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["who","friends","helped","me","I","have","build","it"], answer:"I have friends who helped me build it",
      display:"I have friends who helped me build it" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語3語を、第2段落中から抜き出して書きなさい。<br>"+E("Daichi （　え　） alone for two months."),
      answers:["wrote the program"], hint:"第2段落の語・英語3語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>小さな（　①　）は、私たちの市の大きな（　②　）を解決することはできない。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "コンピュータ","ロボット","学校","公園" ], answer:1 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "祭り","建物","問題","道路" ], answer:2 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Daichi has been in the programming club since last spring."),
                E("Daichi wrote the program together with Nao every day."),
                E("The robot could not see the balls well because the sensor was too close to the floor."),
                E("Daichi and Nao got the first prize at the contest."),
                E("Daichi still thinks that a good program is everything.") ], answer:[0,2] } ]}
]}

]};
