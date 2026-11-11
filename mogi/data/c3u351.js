/* data/c3u351.js ─ 中3 単元テスト351（初見・自動採点のみ・先生が受付を開けた時だけ）
   構成・問題数・配点は data/chu3_351.js（中3 351）と同じ（連動）。文法は同じ・単語だけ入れかえ。
   参照：factory/inputs/authoring_rules.md／factory/inputs/okayama_notes.md（3年目の分析＝提供PDFの形式・配点だけを踏襲）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。
   題材：地域の伝統のしし舞（lion dance）教室と春祭り（架空の町 Kohaku Town）。
   登場人物：Kota, Mana, Ms. Walker（ALT）, Mr. Iwata（しし舞の先生）。
   ※過去問および既存の模試データとの内容重複なし。
   ロック式：先生が /admin で「スタート」するまで問題は表示されない（exam.html の unit:true）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 単元テスト351",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ（英文1回読み・2問） */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the picture. Kota is holding a big lion head with both hands, and Mana is sitting next to him with a bell.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵はどれですか。",
      choices:["コウタが片手で小さなしし頭を持ち、その横でマナが鈴を持ってすわっている。","コウタが両手で大きなしし頭を持ち、その横でマナが鈴を持って立っている。",
               "コウタが鈴を持ってすわり、その横でマナが両手で大きなしし頭を持っている。","コウタが両手で大きなしし頭を持ち、その横でマナが鈴を持ってすわっている。"], answer:3 } ] },
  { script:'(2) Look at the table. The lion dance team practices on Wednesday evening and on Sunday morning.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う表（しし舞チームの練習日）はどれですか。",
      choices:["水曜日の夜と日曜日の午前","水曜日の午前と日曜日の夜",
               "水曜日の夜と金曜日の午前","金曜日の夜と日曜日の午前"], answer:0 } ] },

  /* 問題B：チャイムの応答（対話の最後への応答・2回読み・2問） */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> I\'ve been practicing the lion dance for three hours, and my legs are so tired.</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Yes, I got a new bell last week."), E("The festival was held last spring."),
                E("Why don't you sit down and rest?"), E("I'll ring the bell at nine.") ], answer:2 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> Excuse me. Where can I get a ticket for the festival?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("At the table in front of the hall."), E("Because I like the lion dance."),
                E("It begins at nine in the morning."), E("I went there with my brother.") ], answer:0 } ] },

  /* 問題C：メモの空所補充（英語1語×3・2回読み） */
  { intro:"問題C　マナ(Mana)が、しし舞の先生のイワタ(Mr. Iwata)さんの話を聞いて、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, everyone. I\'m Mr. Iwata. Thank you for joining the lion dance team for the spring festival.</span>'+
      '<span class="sp">Our next practice will be next Monday, not Wednesday, because I have a meeting on Wednesday.</span>'+
      '<span class="sp">We will practice on the playground of your school. The gym is used by the basketball team on that day.</span>'+
      '<span class="sp">I will bring fourteen lion heads from my house, so you don\'t have to bring anything.</span>',
    passage:'<b>マナのメモ</b><br>Mr. Iwata\'s lion dance practice<br>— The next practice will be next （　あ　）.<br>'+
            '— Place: the （　い　） of our school<br>'+
            '— Mr. Iwata will bring （　う　） lion heads from his house.',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）", answers:["Monday"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）", answers:["playground"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）", answers:["fourteen","14"], hint:"英語1語（数を表す語）" } ] },

  /* 問題D：説明＋人物発言（内容一致選択＋指定語を含む3語の英語） */
  { intro:"問題D　あなたとクラスメイトのコウタ(Kota)が、春祭りの手伝いについての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">The Kohaku Spring Festival will be held on the second Saturday of April, and we need help from junior high school students. You can choose one job.</span>'+
      '<span class="sp">In Job A, you will carry the lion heads to the hall. In Job B, you will sell tickets to visitors at the gate. In Job C, you will dance with children.</span>'+
      '<span class="sp">The festival starts at nine in the morning and finishes at two in the afternoon. Drinks will be given to all the helpers.</span>'+
      '<span class="sp"><span class="who">Kota:</span> I\'m not good at selling things, but I love dancing with little kids. Which job will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["祭りは4月の最初の土曜日に行われる。","仕事は3種類あり、2つ選ばなければならない。",
               "祭りは午前9時に始まり、午後3時に終わる。","手伝いをする生徒には飲み物が出される。"], answer:3 },
    { type:"fill", label:"(2)", pt:3,
      stem:"コウタの発言に対して、あなたはどのように答えますか。書き出しに続けて（　）に children を含む3語の英語を書き、英文を完成させなさい。<br>"+
           E("That's the best job for you. Let's （　　） together."),
      answers:["dance with children","dance with the children"], hint:"英語3語（説明の中の言い方を使う）" } ] }
]},

/* ===== 大問2 ちらし（表）＋対話 ===== */
{ no:2, title:"中学生のコウタ(Kota)とマナ(Mana)が、コハク町の公民館で開かれるしし舞教室のちらしを見ながら会話をしています。次は、そのちらしと会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Kohaku Spring Festival — Lion Dance Lessons for Teenagers (12 – 18 years old)</h4>'+
    '<div class="note">Learn the festival dance and dance on the stage in April!</div>'+
    '<table><tr><th>Course</th><th>What you will do</th><th>Time</th><th>Fee (one lesson)</th></tr>'+
    '<tr><td>Small Lion</td><td>learn easy steps with a small paper lion head</td><td>9:00 – 9:40</td><td>free</td></tr>'+
    '<tr><td>Big Lion</td><td>dance with the big festival lion head on the stage</td><td>9:00 – 9:40</td><td>400 yen</td></tr>'+
    '<tr><td>Flute</td><td>play the festival song on the wooden flute</td><td>9:50 – 10:30</td><td>300 yen</td></tr>'+
    '<tr><td>Bell</td><td>ring the bells to the dance in a festival jacket</td><td>9:50 – 10:30</td><td>free</td></tr></table>'+
    '<div class="note">Place … Kohaku Community Center, Room 3 (ten minutes by bike from Kohaku Station)<br>'+
    'Day … every Sunday (March 1 – April 19, eight lessons)<br>'+
    'You can take one course at 9:00 and another course at 9:50.<br>'+
    'Lion heads and bells are lent for free. Please bring gloves and something to drink.</div>',
    passage:
    '<span class="sp"><span class="who">Kota:</span> Look at this, Mana. The community center will hold lion dance lessons before the spring festival.</span>'+
    '<span class="sp"><span class="who">Mana:</span> Oh, nice. The lessons are for （　あ　）, so we can join. We are fifteen now.</span>'+
    '<span class="sp"><span class="who">Kota:</span> Right. I want to dance with the big festival lion head on the stage. I have <u>(う) see</u> its dance every spring since I was a child.</span>'+
    '<span class="sp"><span class="who">Mana:</span> Then the Big Lion course is the best for you. （　い　） is it from the station?</span>'+
    '<span class="sp"><span class="who">Kota:</span> About ten minutes by bike. I also want to learn the wooden flute, so I\'ll take the Flute course at 9:50, too.</span>'+
    '<span class="sp"><span class="who">Mana:</span> That sounds hard, but you can do it. I\'ll take the Big Lion course and the Bell course. My brother is in the Bell course, and he says it\'s fun.</span>'+
    '<span class="sp"><span class="who">Kota:</span> Great. Even （　あ　） like us can dance on the stage in April.</span>'+
    '<span class="sp"><span class="who">Mana:</span> Yes. The lessons start on March 1, so let\'s visit the community center this Sunday.</span>',
    note:'語注：lion dance しし舞／lion head しし頭（ししの頭の形のかぶり物）／step ステップ・足の運び／fee 料金／wooden 木でできた／flute 笛／jacket 上着・はっぴ／teenager 13〜19歳の人／lend 〜を貸す（lent は過去分詞）／glove 手ぶくろ',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"2か所の（あ）に共通して入れるのに最も適当な英語1語を、ちらしの中から抜き出して書きなさい。",
      answers:["teenagers"], hint:"ちらしの中にある語" },
    { type:"fill", label:"(2)い", pt:3, stem:"（い）に入れるのに最も適当な2語の英語を書きなさい。", answers:["How far"], hint:"英語2語（きょりをたずねる）" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う)の単語を、最も適当な形に変えて1語で書きなさい。", answers:["seen"], hint:"I have 〜 its dance every spring since I was a child." },
    { type:"mcq", label:"(4)", pt:3, stem:"ちらしから、コウタが毎週日曜日に2つのコースに参加するとき、払う金額は全部でいくらですか。最も適当なのは、ア〜エのどれですか。",
      choices:[ E("300 yen"), E("400 yen"), E("700 yen"), E("800 yen") ], answer:2 },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("The lessons will be held on Saturday mornings at the station."),
                E("Mana's brother is a member of the Flute course this spring."),
                E("Kota has danced with the big lion head many times."),
                E("Members can borrow bells and lion heads without paying.") ], answer:3 } ]}
]},

/* ===== 大問3 会話の英作文（並べかえ2問） ===== */
{ no:3, title:"しし舞の練習を見に来たALTのウォーカー(Ms. Walker)先生と、中学生のコウタ(Kota)が会話をしています。次の①〜⑥はそのときの二人の会話です。二人が考えている内容に合うように、(1)(2)の語を正しく並べかえて、会話を完成させなさい。なお、会話は①〜⑥の順に行われています。", groups:[
  { sceneNote:"イラスト：①ウォーカー先生が大きなしし頭を見て「なんて大きなしし頭！お祭りで使うのですか」とおどろいている。②コウタが「はい。かぶってみませんか」とすすめている。③ウォーカー先生が「いいの？ありがとう」としし頭を受け取っている。④コウタが「両手でこのように持ってください」と教えている。⑤ウォーカー先生が動かしたあと「楽しい！どうやって動かすのか見せてくれますか」と考えながらたずねている。⑥コウタが「もちろん。来週の練習に参加してください」と答えている。",
    passage:
    '<span class="sp"><span class="who">Ms. Walker:</span> ① Wow, what a big lion head! Do you use it at the festival?</span>'+
    '<span class="sp"><span class="who">Kota:</span> ② Yes. <u>(1)</u>?</span>'+
    '<span class="sp"><span class="who">Ms. Walker:</span> ③ Can I? Thank you.</span>'+
    '<span class="sp"><span class="who">Kota:</span> ④ Hold it with both hands like this.</span>'+
    '<span class="sp"><span class="who">Ms. Walker:</span> ⑤ This is fun! <u>(2)</u>?</span>'+
    '<span class="sp"><span class="who">Kota:</span> ⑥ Of course. Come and join our practice next week.</span>',
    passageEn:true,
    note:'語注：lion head しし頭（ししの頭の形のかぶり物）／hold 〜を持つ／both 両方の',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：コウタが「かぶってみませんか」とすすめる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["like","Would","wear","you","to","it"], answer:"Would you like to wear it" },
    { type:"wordorder", label:"(2)", pt:5, stem:"イラスト：ウォーカー先生が「どうやって動かすのか見せてくれますか」とたずねる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["show","Can","how","you","me","to","move","it"], answer:"Can you show me how to move it" } ]}
]},

/* ===== 大問4 話し合い＋日記 ===== */
{ no:4, title:"ALTのウォーカー(Ms. Walker)先生の英語の授業で、Kota と Mana が、春祭りのしし舞チームについて話し合いをしています。次の英文は、話し合いと、その日に Mana が書いた日記です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Ms. Walker:</span> The spring festival is only two weeks away. Today, let\'s talk about our lion dance team. Kota, how is the practice going?</span>'+
    '<span class="sp"><span class="who">Kota:</span> We have been practicing since December, but we haven\'t learned the last part of the dance yet. The lion has to jump a lot, and I often fall down.</span>'+
    '<span class="sp"><span class="who">Ms. Walker:</span> I see. What are you going to do about it?</span>'+
    '<span class="sp"><span class="who">Kota:</span> I want to <u>watch old videos</u> of the festival at the library. Then I can learn how the lion moves.</span>'+
    '<span class="sp"><span class="who">Ms. Walker:</span> That\'s a good idea. Mana, what do you think about the team?</span>'+
    '<span class="sp"><span class="who">Mana:</span> I\'m a little worried about the small children on our team. The lion head is too （　あ　） for some of them, so they cry and stop dancing.</span>'+
    '<span class="sp"><span class="who">Ms. Walker:</span> Then what can you do for them?</span>'+
    '<span class="sp"><span class="who">Mana:</span> I\'ll ask Mr. Iwata to give the small children a paper lion head with a smiling face at first. Then they can enjoy dancing without crying.</span>'+
    '<span class="sp"><span class="who">Ms. Walker:</span> Nice. I\'m sure Mr. Iwata will listen to you. Now let me tell you my story. In my country, I danced in a school club. When I came to Kohaku three years ago, I saw the lion dance for the first time, and I wanted to see it again and again.</span>'+
    '<span class="sp"><span class="who">Kota:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Ms. Walker:</span> Not yet. Mr. Iwata has asked me many times, but I was afraid of making mistakes. This year, I\'ll dance with you on the stage.</span>'+
    '<span class="sp"><span class="who">Mana:</span> Really? That\'s wonderful!</span>'+
    '<span class="sp"><span class="who">Ms. Walker:</span> Yes. Let\'s work together and show the best lion dance in the history of Kohaku Town.</span>',
    note:'語注：away （時間が）先で／part 部分／jump とぶ／fall down ころぶ／video 動画／worried 心配して／scary こわい／cry 泣く／paper 紙の／smiling ほほえんでいる／club クラブ・部／mistake まちがい／history 歴史' },
  { passage:'<b>Mana の日記</b><br>Today we talked about our lion dance team with Ms. Walker. I was happy to hear that she （　X　）. '+
            'On the festival day, we will all dance together on the stage.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Kota の発言から抜き出して書きなさい。<br>"+E("Kota wants to [　　] of the festival at the library."),
      answers:["watch old videos"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("funny"),E("scary"),E("cheap"),E("quiet")], answer:1 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("When did you buy that bell at the shop?"), E("What time does the festival finish today?"),
                E("Have you ever joined the lion dance?"), E("How old is the lion head of this town?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Ms. Walker has joined the lion dance many times."),
                E("Kota's team hasn't learned the last part yet."),
                E("Kota wants to stop practicing before the festival."),
                E("Mana thinks the lion head is too funny for children.") ], answer:1 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("has never seen the lion dance"), E("does not like the lion head"),
                E("will dance with us this spring"), E("wants us to stop dancing") ], answer:2 } ]}
]},

/* ===== 大問5 スピーチ（長文読解） ===== */
{ no:5, title:"次の英文は、コウタ(Kota)が英語の授業で発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Kota. Every spring, the festival lion visits the houses in our town. '+
    'When I was small, I only watched the lion from behind my mother. Last December, I joined the lion dance team of Kohaku Town, '+
    'and today I want to tell you what I have learned.<br><br>'+
    '<b>②</b> Our teacher is Mr. Iwata. He has danced the lion dance for thirty years. On the first day, he gave me the lion head and said, '+
    '"The lion is not a toy. Watch it before you move it." When I first put on the head, I was so <u>(お) ___</u> that my legs were shaking. '+
    'I moved the head, but the lion looked small and weak. Mr. Iwata laughed and said, "Everyone starts like that." '+
    'He taught me how to step and how to turn the head. I could not move well for two months, but I never missed a practice.<br><br>'+
    '<b>③</b> In winter, the team practiced at the community center twice a week. '+
    'The little children learned the steps faster than I did. Their small feet moved quickly and lightly. '+
    'Mana, my classmate, played the flute beside the lion. '+
    'One evening, Mr. Iwata showed us an old picture. In the picture, his father was wearing the same lion head that we use now. '+
    'He said, "This lion has visited the houses in this town for eighty years. You are the next ones." '+
    'After that, the head felt heavier than before.<br><br>'+
    '<b>④</b> Some people think that the lion dance is made by a strong dancer. I thought so, too. '+
    'But now I know that is not true. <u>④ The dance of the lion is not made by one strong dancer</u>. '+
    'It is made by everyone who follows the flute and the other dancers. <u>③ ( to / us / how / follow / Mr. Iwata / taught )</u>, '+
    'and last week, our lion finally moved as one. On the festival day, I will dance for Mr. Iwata, for the little children, '+
    'and for the people who danced before us. '+
    'So please come to the community center next Sunday, and let\'s <u>(か) ___</u> the lion dance together!',
    passageEn:true,
    note:'語注：lion dance しし舞／lion head しし頭／behind 〜のうしろで／toy おもちゃ／put on 〜をかぶる／shake ふるえる／weak 弱い／step 足を運ぶ／turn 〜を回す／miss 〜を休む／twice 2回／lightly 軽やかに／beside 〜のそばで／heavy 重い／true 本当の／follow 〜について行く／finally ついに',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お sleepy　か sell"), E("お afraid　か enjoy"),
                E("お sleepy　か enjoy"), E("お afraid　か sell") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "チームは冬に、週に2回公民館で練習した。", "小さな子どもたちは、コウタより早くステップを覚えた。",
                "写真の中で、イワタさんの父親は今とはちがうしし頭をかぶっていた。", "イワタさんは、ある晩に古い写真を見せた。" ], answer:2 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["to","us","how","follow","Mr. Iwata","taught"], answer:"Mr. Iwata taught us how to follow",
      display:"Mr. Iwata taught us how to follow" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語3語を、第2段落中から抜き出して書きなさい。<br>"+E("Kota （　え　） well for two months, but he never missed a practice."),
      answers:["could not move"], hint:"第2段落の語・英語3語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>ししの（　①　）は、1人の力の強い（　②　）によって作られるのではない。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "頭","色","踊り","名前" ], answer:2 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "子ども","踊り手","先生","観客" ], answer:1 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Mr. Iwata told Kota to move the lion before watching it."),
                E("Kota joined the lion dance team of Kohaku Town last December."),
                E("Kota moved the lion well on his first day."),
                E("Kota thinks the lion dance is made by one strong dancer."),
                E("Mana played the flute beside the lion in winter.") ], answer:[1,4] } ]}
]}

]};
