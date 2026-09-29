/* data/chu3_351.js ─ 中3 習熟度テスト対策 351
   参照：factory/inputs/okayama_notes.md（習熟度テスト・県立入試の「傾向のみ」を参照。3年目の分析＝提供PDFの形式・配点だけを踏襲）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。
   題材：地域の伝統太鼓と秋祭りの練習（架空の町 Kaede Town）。
   ※過去問および既存の模試データとの内容重複なし。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 習熟度テスト対策 351",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ（英文1回読み・2問） */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the picture. Riku is hitting a big drum with two sticks, and Mio is standing next to him with a flute.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵はどれですか。",
      choices:["リクが1本のばちで小さな太鼓をたたき、その横でミオが笛を持って立っている。","リクが2本のばちで大きな太鼓をたたき、その横でミオが笛を持って立っている。",
               "リクが2本のばちで大きな太鼓をたたき、その横でミオが笛をふきながらすわっている。","リクが笛を持って立ち、その横でミオが2本のばちで大きな太鼓をたたいている。"], answer:1 } ] },
  { script:'(2) Look at the table. The drum team practices on Tuesday afternoon and on Saturday morning.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う表（太鼓チームの練習日）はどれですか。",
      choices:["火曜日の午前と土曜日の午後","火曜日の午後と木曜日の午前",
               "火曜日の午後と土曜日の午前","木曜日の午後と土曜日の午前"], answer:2 } ] },

  /* 問題B：チャイムの応答（対話の最後への応答・2回読み・2問） */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> I\'ve been practicing the drum for two hours, and my arms are so tired.</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Yes, I bought a new drum yesterday."), E("Why don't you take a short break?"),
                E("The festival was held last autumn."), E("I'll play the flute at eight.") ], answer:1 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> Excuse me. Where can I get a map of the festival?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("It starts at ten in the morning."), E("Because I like the drums."),
                E("At the desk near the gate."), E("I went there with my sister.") ], answer:2 } ] },

  /* 問題C：メモの空所補充（英語1語×3・2回読み） */
  { intro:"問題C　ミオ(Mio)が、太鼓の先生のオダ(Mr. Oda)さんの話を聞いて、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, everyone. I\'m Mr. Oda. Thank you for joining the drum team for the autumn festival.</span>'+
      '<span class="sp">Our next practice will be next <b>Thursday</b>, not Tuesday, because I have to work on Tuesday.</span>'+
      '<span class="sp">We will practice in the <b>gym</b> of your school. The music room is too small for all of us.</span>'+
      '<span class="sp">I will bring <b>twelve</b> drums from the community center, so you don\'t have to bring anything.</span>',
    passage:'<b>ミオのメモ</b><br>Mr. Oda\'s drum practice<br>— The next practice will be next （　あ　）.<br>'+
            '— Place: the （　い　） of our school<br>'+
            '— Mr. Oda will bring （　う　） drums from the community center.',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）木曜日", answers:["Thursday"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）体育館", answers:["gym"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）オダさんが持ってくる太鼓の数", answers:["twelve","12"], hint:"英語1語（数を表す語）" } ] },

  /* 問題D：説明＋人物発言（内容一致選択＋指定語を含む3語の英語） */
  { intro:"問題D　あなたとクラスメイトのリク(Riku)が、秋祭りの手伝いについての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">The Kaede Autumn Festival will be held on the last Sunday of October, and we need help from junior high school students. You can choose one job.</span>'+
      '<span class="sp">In Job A, you will carry the big drums to the stage. In Job B, you will hand out maps to visitors at the gate. In Job C, you will play small drums with children.</span>'+
      '<span class="sp">The festival starts at ten in the morning and finishes at three in the afternoon. Lunch will be given to all the helpers.</span>'+
      '<span class="sp"><span class="who">Riku:</span> I\'m not strong enough to carry heavy things, but I love playing with little kids. Which job will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["祭りは10月の最初の日曜日に行われる。","手伝いをする生徒には昼食が出される。",
               "仕事は3種類あり、すべてに参加しなければならない。","祭りは午前10時に始まり、午後4時に終わる。"], answer:1 },
    { type:"fill", label:"(2)", pt:3,
      stem:"リクの発言に対して、あなたはどのように答えますか。書き出しに続けて（　）に drums を含む3語の英語を書き、英文を完成させなさい。<br>"+
           E("That's the best job for you. Let's （　　） together."),
      answers:["play small drums"], hint:"英語3語（説明の中の言い方を使う）" } ] }
]},

/* ===== 大問2 ちらし（表）＋対話 ===== */
{ no:2, title:"中学生のリク(Riku)とミオ(Mio)が、カエデ町の公民館で開かれる太鼓教室のちらしを見ながら会話をしています。次は、そのちらしと会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Kaede Autumn Festival — Drum Lessons for Beginners</h4>'+
    '<div class="note">Learn the festival music and play on the stage in October!</div>'+
    '<table><tr><th>Course</th><th>What you will do</th><th>Fee (one lesson)</th><th>Members now</th></tr>'+
    '<tr><td>Small Drum</td><td>learn easy rhythms with small drums</td><td>free</td><td>12</td></tr>'+
    '<tr><td>Big Drum</td><td>play the big festival drum on the stage</td><td>300 yen</td><td>8</td></tr>'+
    '<tr><td>Flute</td><td>play the festival song on the bamboo flute</td><td>200 yen</td><td>6</td></tr>'+
    '<tr><td>Dance</td><td>dance to the drums in a happi coat</td><td>free</td><td>15</td></tr></table>'+
    '<div class="note">Place … Kaede Community Center, Hall 2<br>'+
    'Day … every Saturday, 10:00 a.m. – 11:30 a.m. (September 6 – October 25)<br>'+
    'Drums and flutes are lent for free. Please bring a towel and something to drink.</div>',
    passage:
    '<span class="sp"><span class="who">Riku:</span> Look at this, Mio. The community center will hold drum lessons before the autumn festival.</span>'+
    '<span class="sp"><span class="who">Mio:</span> Oh, nice. The lessons are for （　あ　）, so we can join even if we have never played the drum.</span>'+
    '<span class="sp"><span class="who">Riku:</span> Right. I want to play the big festival drum on the stage. I have <u>(う) hear</u> its sound every autumn since I was a child.</span>'+
    '<span class="sp"><span class="who">Mio:</span> Then the Big Drum course is the best for you. （　い　） is it?</span>'+
    '<span class="sp"><span class="who">Riku:</span> Three hundred yen a lesson. I also want to learn the bamboo flute, so I\'ll take the Flute course, too.</span>'+
    '<span class="sp"><span class="who">Mio:</span> That sounds hard, but you can do it. I\'ll take the Big Drum course and the Dance course. My sister is in the Dance course, and she says it\'s fun.</span>'+
    '<span class="sp"><span class="who">Riku:</span> Great. Even （　あ　） like us can play on the stage in October.</span>'+
    '<span class="sp"><span class="who">Mio:</span> Yes. The lessons start on September 6, so let\'s go to the community center this Saturday.</span>',
    note:'語注：community center 公民館／beginner 初心者／rhythm リズム／fee 料金／bamboo 竹／flute 笛／happi coat はっぴ／lend 〜を貸す（lent は過去分詞）／towel タオル',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"2か所の（あ）に共通して入れるのに最も適当な英語1語を、ちらしの中から抜き出して書きなさい。",
      answers:["beginners"], hint:"ちらしの中にある語" },
    { type:"fill", label:"(2)い", pt:3, stem:"（い）に入れるのに最も適当な2語の英語を書きなさい。", answers:["How much"], hint:"英語2語（値段をたずねる）" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う)の単語を、最も適当な形に変えて1語で書きなさい。", answers:["heard"], hint:"I have 〜 its sound every autumn since I was a child." },
    { type:"mcq", label:"(4)", pt:3, stem:"ちらしから、リクが1回のレッスンで払う金額として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("200 yen"), E("300 yen"), E("500 yen"), E("800 yen") ], answer:2 },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("The lessons will be held on Sunday mornings."),
                E("Mio's sister is a member of the Flute course."),
                E("Riku has played the big festival drum many times."),
                E("Drums and flutes are lent to the members for free.") ], answer:3 } ]}
]},

/* ===== 大問3 会話の英作文（並べかえ2問） ===== */
{ no:3, title:"太鼓の練習を見に来たALTのヒル(Ms. Hill)先生と、中学生のリク(Riku)が会話をしています。次の①〜⑥はそのときの二人の会話です。二人が考えている内容に合うように、(1)(2)の語を正しく並べかえて、会話を完成させなさい。なお、会話は①〜⑥の順に行われています。", groups:[
  { sceneNote:"イラスト：①ヒル先生が大きな太鼓を見て「なんて大きな太鼓！」とおどろいている。②リクが「これは私たちの町でいちばん古い太鼓です」と説明している。③ヒル先生が「本当？それがいつ作られたのか知っていますか」と考えながらたずねている。④リクが「約100年前です」と答えている。⑤ヒル先生が「すごい！たたいてみてもいいですか」とたずねている。⑥リクが「もちろん。このばちを持ってください」と答えている。",
    passage:
    '<span class="sp"><span class="who">Ms. Hill:</span> ① Wow, what a big drum!</span>'+
    '<span class="sp"><span class="who">Riku:</span> ② <u>(1)</u>.</span>'+
    '<span class="sp"><span class="who">Ms. Hill:</span> ③ Really? <u>(2)</u>?</span>'+
    '<span class="sp"><span class="who">Riku:</span> ④ About one hundred years ago.</span>'+
    '<span class="sp"><span class="who">Ms. Hill:</span> ⑤ Amazing! Can I try it?</span>'+
    '<span class="sp"><span class="who">Riku:</span> ⑥ Sure. Please hold these sticks.</span>',
    passageEn:true,
    note:'語注：stick ばち（太鼓をたたく棒）／hold 〜を持つ',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：リクが「これは私たちの町でいちばん古い太鼓です」と説明する場面。次の語を正しく並べて英文を完成させなさい。",
      words:["the","It","oldest","in","is","drum","our","town"], answer:"It is the oldest drum in our town" },
    { type:"wordorder", label:"(2)", pt:5, stem:"イラスト：ヒル先生が「それがいつ作られたのか知っていますか」とたずねる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["know","Do","when","you","made","it","was"], answer:"Do you know when it was made" } ]}
]},

/* ===== 大問4 話し合い＋日記 ===== */
{ no:4, title:"ALTのヒル(Ms. Hill)先生の英語の授業で、Riku と Mio が、秋祭りの太鼓チームについて話し合いをしています。次の英文は、話し合いと、その日に Mio が書いた日記です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Ms. Hill:</span> The autumn festival is only three weeks away. Today, let\'s talk about our drum team. Riku, how is the practice going?</span>'+
    '<span class="sp"><span class="who">Riku:</span> We have been practicing since May, but we haven\'t finished learning the last song yet. It\'s really fast, and I often make mistakes.</span>'+
    '<span class="sp"><span class="who">Ms. Hill:</span> I see. What are you going to do about it?</span>'+
    '<span class="sp"><span class="who">Riku:</span> I want to <u>record our practice</u> with my phone and watch it at home. Then I can find my mistakes by myself.</span>'+
    '<span class="sp"><span class="who">Ms. Hill:</span> That\'s a good idea. Mio, what do you think about the team?</span>'+
    '<span class="sp"><span class="who">Mio:</span> I\'m a little worried about the small children on our team. The sound of the big drum is too （　あ　） for some of them, so they cover their ears and stop playing.</span>'+
    '<span class="sp"><span class="who">Ms. Hill:</span> Then what can you do for them?</span>'+
    '<span class="sp"><span class="who">Mio:</span> I\'ll ask Mr. Oda to put the small children far from the big drum at first. Then they can enjoy playing without fear.</span>'+
    '<span class="sp"><span class="who">Ms. Hill:</span> Nice. I\'m sure Mr. Oda will listen to you. Now let me tell you my story. In my country, I played the drums in a school band. When I came to Kaede two years ago, I heard the festival drums for the first time, and I couldn\'t stop listening.</span>'+
    '<span class="sp"><span class="who">Riku:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Ms. Hill:</span> Not yet. Mr. Oda has invited me many times, but I was too shy. This year, I\'ll play with you on the stage.</span>'+
    '<span class="sp"><span class="who">Mio:</span> Really? That\'s great news!</span>'+
    '<span class="sp"><span class="who">Ms. Hill:</span> Yes. Let\'s help each other and make the best performance in the history of Kaede Town.</span>',
    note:'語注：away （時間が）先で／mistake まちがい／record 〜を録画する／by myself 自分で／worried 心配して／cover 〜をおおう／far from 〜 〜から遠くに／fear こわさ／band バンド・楽団／shy 恥ずかしがりの／performance 演奏／history 歴史' },
  { passage:'<b>Mio の日記</b><br>Today we talked about our drum team with Ms. Hill. I was glad to hear that she （　X　）. '+
            'On the festival day, we will all play together on the stage.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Riku の発言から抜き出して書きなさい。<br>"+E("Riku wants to [　　] with his phone."),
      answers:["record our practice"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("loud"),E("soft"),E("slow"),E("cheap")], answer:0 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Where did you buy your first drum?"), E("Have you ever played the festival drum?"),
                E("What time will the festival start?"), E("How many students are in the band?") ], answer:1 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Ms. Hill has played the festival drum many times."),
                E("Riku wants to stop practicing before the festival."),
                E("Riku's team hasn't finished learning the last song yet."),
                E("Mio thinks the sound of the big drum is too soft.") ], answer:2 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("has never heard the festival drums"), E("does not like the sound of the drums"),
                E("wants us to stop playing the drum"), E("will play the drum with us this year") ], answer:3 } ]}
]},

/* ===== 大問5 スピーチ（長文読解） ===== */
{ no:5, title:"次の英文は、リク(Riku)が英語の授業で発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Riku. Every autumn, the sound of the festival drums fills our town. '+
    'When I was small, I only watched the drums from the street. This May, I joined the drum team of Kaede Town, '+
    'and today I want to tell you what I have learned.<br><br>'+
    '<b>②</b> Our teacher is Mr. Oda. He has played the festival drum for forty years. On the first day, he gave me two sticks and said, '+
    '"The drum is not a toy. Listen to it before you hit it." When I first held the sticks, I was so <u>(お) ___</u> that my hands were shaking. '+
    'I hit the drum, but the sound was small and weak. Mr. Oda laughed and said, "Everyone starts like that." '+
    'He taught me how to stand and how to move my arms. I could not make a good sound for a month, but I never missed a practice.<br><br>'+
    '<b>③</b> In summer, the team practiced at the community center three times a week. '+
    'The little children learned the rhythm faster than I did. Their small hands moved fast and light. '+
    'Mio, my classmate, played the flute next to the drums. '+
    'One evening, Mr. Oda showed us an old photo. In the photo, his grandfather was hitting the same drum that we use now. '+
    'He said, "This drum has been played by people in this town for a hundred years. You are the next ones." '+
    'After that, the drum felt heavier than before.<br><br>'+
    '<b>④</b> Some people think that the sound of the festival drum is made by a strong arm. I thought so, too. '+
    'But now I know that is not true. <u>④ The sound of the festival drum is not made by one strong player</u>. '+
    'It is made by everyone who listens to each other. <u>③ ( been / we / practicing / have / months / for / four )</u>, '+
    'and last week, our sound finally became one. On the festival day, I will hit the drum for Mr. Oda, for the little children, '+
    'and for the people who played it before us. '+
    'So please come to the community center next Saturday, and let\'s <u>(か) ___</u> the drum together!',
    passageEn:true,
    note:'語注：fill 〜を満たす／stick ばち／toy おもちゃ／shake ふるえる／weak 弱い／miss 〜を休む／rhythm リズム／photo 写真／heavy 重い／true 本当の／player 演奏者／each other おたがい／finally ついに',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お bored　か sell"), E("お bored　か play"),
                E("お nervous　か sell"), E("お nervous　か play") ], answer:3 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "チームは夏に、週に3回公民館で練習した。", "写真の中で、オダさんの祖父は今とはちがう太鼓をたたいていた。",
                "小さな子どもたちは、リクより早くリズムを覚えた。", "オダさんは、ある晩に古い写真を見せた。" ], answer:1 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["been","we","practicing","have","months","for","four"], answer:"We have been practicing for four months",
      display:"We have been practicing for four months" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語3語を、第2段落中から抜き出して書きなさい。<br>"+E("Riku （　え　） a good sound for a month, but he never missed a practice."),
      answers:["could not make"], hint:"第2段落の語・英語3語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>祭りの太鼓の（　①　）は、1人の力の強い（　②　）によって作られるのではない。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "形","音","色","名前" ], answer:1 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "観客","先生","演奏者","子ども" ], answer:2 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Riku joined the drum team of Kaede Town this year."),
                E("Mr. Oda told Riku to hit the drum before listening to it."),
                E("Riku made a good sound on his first day."),
                E("Mio played the flute next to the drums in summer."),
                E("Riku thinks the drum sound is made by one strong player.") ], answer:[0,3] } ]}
]}

]};
