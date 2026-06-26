/* data/okayama7.js ─ 岡山県スタイル 模擬テスト⑦（中3）
   参照：factory/inputs/okayama_notes.md の「傾向のみ」（リスニング厚め／聞く→書く複合／
   図表読み取り／記述分散／中3文法が軸）。過去問の文・図・設問の再現は一切なし。
   本文・対話・設問・選択肢はすべて新規創作。題材は「学校の文化祭・吹奏楽部・部活動」を
   架空の町名（Wakaba/Midori/Hikari）と架空の中学校で創作的に使用。okayama1〜6 と重複させない。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "岡山県スタイル 模擬テスト⑦",
sections: [

/* ===== 大問1 リスニング（問題A〜D）　24点 ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ（1回読み） */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the poster. The brass band concert will start at two thirty in the gym.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合うもの（コンサートのお知らせ）はどれですか。",
      choices:["体育館でのコンサートが2:13に開始。","体育館でのコンサートが2:30に開始。",
               "音楽室でのコンサートが2:30に開始。","体育館でのコンサートが3:20に開始。"], answer:1 } ] },
  { script:'(2) Look at the picture. A boy is carrying a big drum, and a girl next to him is holding a flute.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う絵（楽器を運ぶ生徒の様子）はどれですか。",
      choices:["男の子がフルートを持ち、女の子が大だいこを運んでいる。","男の子が大だいこを運び、となりの女の子がフルートを持っている。",
               "男の子がギターを運び、女の子がフルートを持っている。","男の子が大だいこを運び、女の子もう一つの大だいこを運んでいる。"], answer:1 } ] },

  /* 問題B：チャイムの応答（2回読み） */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> Have you ever played in the brass band at the school festival?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Yes, I have. I played the trumpet last year."), E("No, I won't build a stage."), E("It is raining at the festival."), E("You're welcome.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> How many members does your brass band have this year?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("We practice in the music room."), E("It has about thirty members."), E("Yes, the concert was great."), E("Let's sing a song together.") ], answer:1 } ] },

  /* 問題C：メモの空所補充（英語1語×3／2回読み） */
  { intro:"問題C　ハルト(Haruto)が、ALTのベイカー(Mr. Baker)先生に、文化祭の思い出についてインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, I\'m Mr. Baker from Canada. In my country, my high school had a big <b>music</b> festival every November.</span>'+
      '<span class="sp">I was in the brass band, and I always <b>played</b> the trumpet on the stage.</span>'+
      '<span class="sp">My favorite memory is the last concert, because all of my <b>friends</b> sang together at the end.</span>',
    passage:'<b>ハルトのメモ</b><br>Mr. Baker — had a big （　あ　） festival in November<br>'+
            '— （　い　） the trumpet on the stage<br>— his （　う　） sang together at the last concert',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）音楽", answers:["music"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）演奏した（過去形）", answers:["played"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）友達（複数）", answers:["friends"], hint:"英語1語" } ] },

  /* 問題D：説明を聞いて答える（内容一致＋英作文／2回読み） */
  { intro:"問題D　あなたとクラスメイトのアヤ(Aya)が、文化祭の係決めの説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next week we will get ready for the school festival. You can choose one job from three groups.</span>'+
      '<span class="sp">Group A will paint the welcome posters. Group B will help the brass band on the stage. Group C will sell drinks at the entrance.</span>'+
      '<span class="sp">The work starts after lunch. Please wear old clothes and bring a towel because it may be hot in the gym.</span>'+
      '<span class="sp"><span class="who">Aya:</span> I really like drawing and painting. Which group will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["係の仕事は昼食の前に始まる。","参加者は入口で飲み物を売ることができる。",
               "タオルは持って行かなくてよい。","新しい服を着なければならない。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"アヤの発言に対するあなたの答えを完成させなさい。<br>"+E("I really like drawing and painting. So I will choose the （　　）.")+"（英語2語）",
      answers:["welcome posters"], hint:"英語2語" } ] }
]},

/* ===== 大問2 チラシ＋対話　16点 ===== */
{ no:2, title:"中学生のリク(Riku)とユイ(Yui)が、みどり中学校の文化祭でひらかれる「吹奏楽部 ランチタイム・コンサート」のちらしを見ながら話しています。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Midori Brass Band — Lunchtime Concert!</h4>'+
    '<div class="note">Come and enjoy popular songs played by our brass band at the school festival!</div>'+
    '<table><tr><td>Date</td><td>October 24, 2026 (Saturday)</td></tr>'+
    '<tr><td>Time</td><td>12:30 p.m. – 1:10 p.m.</td></tr>'+
    '<tr><td>Place</td><td>The school gym</td></tr>'+
    '<tr><td>Tickets</td><td>300 yen for adults / 100 yen for students</td></tr>'+
    '<tr><td>Number of seats</td><td>Only 120 seats. Please come early.</td></tr></table>'+
    '<div class="note">Leader: Ms. Mori (She has taught the brass band for fifteen years.)<br>'+
    'After the concert, you can try the instruments in the music room. → Please come to the gym door first.</div>',
    passage:
    '<span class="sp"><span class="who">Riku:</span> Look, Yui. This is the （　あ　） popular event at our school festival, I think.</span>'+
    '<span class="sp"><span class="who">Yui:</span> Yes. The brass band always plays well. I want to go, but I\'m not （　い　） that I have enough money.</span>'+
    '<span class="sp"><span class="who">Riku:</span> Don\'t worry. We are students, so each ticket is only （　X　） yen.</span>'+
    '<span class="sp"><span class="who">Yui:</span> Oh, that\'s cheap! I\'m （　い　） we can go together then.</span>'+
    '<span class="sp"><span class="who">Riku:</span> But look, there are only one hundred and twenty seats. We should get there early.</span>'+
    '<span class="sp"><span class="who">Yui:</span> You\'re right. By the way, trying the instruments sounds fun. I think the trumpet is the <u>(う) good</u> instrument in the band.</span>'+
    '<span class="sp"><span class="who">Riku:</span> I agree. Let\'s meet at the gym door at twelve fifteen on that day.</span>'+
    '<span class="sp"><span class="who">Yui:</span> OK. The concert is two days from now. See you on Saturday!</span>',
    note:'語注：brass band 吹奏楽部／instrument 楽器／leader 部長・リーダー／gym door 体育館の入口',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"（あ）に入れるのに最も適当な英語1語を書きなさい。", answers:["most"], hint:"the （　） popular" },
    { type:"fill", label:"(2)い", pt:3, stem:"2か所の（い）に共通して入る最も適当な英語1語を書きなさい。", answers:["sure"], hint:"I'm not 〜 / I'm 〜" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) good を、最も適当な形に変えて1語で書きなさい。", answers:["best"], hint:"the 〜 instrument in the band" },
    { type:"fill", label:"(4)X", pt:3, stem:"会話の（X）に入る数字を、ちらしを見て算用数字で書きなさい。", answers:["100"], hint:"半角の数字" },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Ms. Mori has taught the brass band for fifteen years."),
                E("More than two hundred people can sit at the concert."),
                E("Riku and Yui will meet in the music room first."),
                E("The lunchtime concert starts at one thirty in the afternoon.") ], answer:0 } ]}
]},

/* ===== 大問3 日記の英作文（並べかえ2問）　11点 ===== */
{ no:3, title:"カナダにホームステイしているソウタ(Sota)は、オリバー(Oliver)の家にホームステイしています。次は、ホームステイ中のソウタの日記の一部と、その日のできごとを表したイラストです。日記とイラストの内容に合うように、(1)に4語以上、(2)に3語以上の英語を、語を並べかえて書き、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：オリバーが自分の部屋で、棚にきれいに並んだたくさんの古いトランペット(trumpets)をソウタに見せている。ソウタはおどろいた顔をしている。",
    passage:
    'September 5<br><br>'+
    'This afternoon, Oliver took me to his room. He said, "I want to show you something." '+
    'On the shelf, there were so many old trumpets. I was surprised and said, "Wow! '+
    '<u>(1)</u>!" Oliver smiled and said, "Yes. My grandfather played in a band, so he gave them to me." He let me hold one of them. '+
    'In the evening, I sent <u>(2)</u> to my friends in Japan. They were excited, too.',
    passageEn:true,
    note:'語注：shelf たな／trumpet トランペット',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"たくさんの古いトランペットを見ておどろく場面です。次の語を正しく並べて英文を完成させなさい。",
      words:["have","old","trumpets","you","many"], answer:"You have many old trumpets" },
    { type:"wordorder", label:"(2)", pt:5, stem:"夜、トランペットの写真を友達に送る場面です（I sent の続き）。次の語を正しく並べて英文を完成させなさい。",
      words:["of","them","picture","a"], answer:"a picture of them" } ]}
]},

/* ===== 大問4 話し合い＋感想　16点 ===== */
{ no:4, title:"クラーク(Mr. Clark)先生の英語の授業で、Kaito、Mio、Ren が、文化祭をもっと楽しくする方法について話し合いをしています。次の英文は、話し合いと、それを聞いて Nao が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Clark:</span> Today, let\'s talk about our school festival. How can we make it more fun for everyone? Kaito, please start.</span>'+
    '<span class="sp"><span class="who">Kaito:</span> I want to make a stage program. I want to show visitors how to enjoy the brass band concert.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> That\'s a nice idea. Why do you like the concert, Kaito?</span>'+
    '<span class="sp"><span class="who">Kaito:</span> The music is exciting and beautiful. I want to tell visitors how to find the best seats early.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> Wonderful. Mio, how about you?</span>'+
    '<span class="sp"><span class="who">Mio:</span> I want to open a small café. The drama club can serve tea and cakes, and people can take a rest there.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> That sounds great. Do you often make cakes, Mio?</span>'+
    '<span class="sp"><span class="who">Mio:</span> Yes. Making cakes is the thing I like the most. I want to share homemade sweets with many people.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> That\'s a warm idea. Ren, what is your idea?</span>'+
    '<span class="sp"><span class="who">Ren:</span> I want to make a short video about our clubs. The brass band and the art club work very hard, and it is exciting.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> Making a good video is not （　あ　）, but it can show our clubs to many people.</span>'+
    '<span class="sp"><span class="who">Ren:</span> I think so.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> OK, I\'m going to talk about myself. When I was a student, I joined the brass band. I played the drums at every festival, so I learned to love music.</span>'+
    '<span class="sp"><span class="who">Ren:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> Good question. I started the drums when I was twelve. My older brother taught me, and it was a lot of fun.</span>'+
    '<span class="sp"><span class="who">Ren:</span> And now you still enjoy music with us every day.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> Yes, and I love it. I hope you\'ll find a good way to make our festival special.</span>',
    note:'語注：stage program 舞台の出し物／serve 〜を出す／homemade 手作りの／video 動画' },
  { passage:'<b>Nao の感想</b><br>There are many good ways to make our festival fun. Like Mio, I want to open a café. '+
            'I （　Y　）, too, so I want to make sweets for visitors from other schools.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Kaito の発言から抜き出して書きなさい。<br>"+E("Kaito wants to tell visitors [　　] the best seats early."),
      answers:["how to find"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("bad"),E("easy"),E("difficult"),E("sad")], answer:1 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("How much is this ticket?"), E("Whose drum is this?"),
                E("When did you start the drums?"), E("What time does the concert start?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Kaito wants to make a stage program for the festival."),
                E("Mio doesn't like making cakes at all."),
                E("Ren wants to write a long book about the brass band."),
                E("Mr. Clark played the violin at every festival.") ], answer:0 },
    { type:"mcq", label:"(5)Y", pt:3, stem:"（Y）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("am good at swimming"), E("like making sweets"),
                E("want to study science"), E("don't have any free time") ], answer:1 } ]}
]},

/* ===== 大問5 長文スピーチ（意見文）　33点 ===== */
{ no:5, title:"次の英文は、吹奏楽部のサキ(Saki)が発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Saki from the brass band. Today I want to talk about my experience of playing the trumpet at our school festival. '+
    'When I was in my first year, I could not play it well at all. But now I really enjoy it. I want to share my story with you.<br><br>'+
    '<b>②</b> Last spring, I joined the brass band. At first, playing the trumpet was very hard for me. '+
    'My sound was small, and I got tired soon. I sometimes wanted to stop coming to practice. '+
    'One day, an old man near the music room heard me. He said, "Don\'t give up. If you keep practicing, you will get better." '+
    'These words <u>(お) ___</u> my mind. I decided to try harder.<br><br>'+
    '<b>③</b> After that, I practiced very hard. The leader of the band also helped me a lot. '+
    'She taught me how to breathe slowly. She said, "You should not play in a hurry. Playing slowly first makes your sound better." '+
    'I followed her advice. Little by little, I could play longer songs.<br><br>'+
    '<b>④</b> Some people say that playing music is only a hobby. That\'s true. <u>④ Playing the trumpet is a good way to make our festival more exciting</u>. '+
    'But it is more than that for me. <u>③ ( me / the brass band / many things / taught )</u>. '+
    'I learned that I should not stop trying. When I keep practicing, I can <u>(か) ___</u> my dream. '+
    'So please don\'t give up, and find something you love at school!',
    passageEn:true,
    note:'語注：give up あきらめる／in a hurry あわてて／breathe 息をする／advice 助言',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お changed　か lose"), E("お changed　か reach"),
                E("お lost　か lose"), E("お lost　か reach") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "サキは一生けんめい練習した。", "部長がゆっくり息をする方法を教えてくれた。",
                "部長はあわてて演奏するべきだと言った。", "サキは少しずつ長い曲を演奏できるようになった。" ], answer:2 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["me","the brass band","many things","taught"], answer:"The brass band taught me many things",
      display:"The brass band taught me many things" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語2語を、第2段落中から抜き出して書きなさい。<br>"+E("The old man told Saki not to （　え　）."),
      answers:["give up"], hint:"第2段落の語・英語2語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>トランペットを演奏することは、わたしたちの文化祭を（　①　）（　②　）するためのよい方法だ。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "よりわくわく","より静かに","より大きく","より新しく" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "する（〜にする）","売る","こわす","かりる" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Saki could not play the trumpet well at all in her first year."),
                E("Saki never wanted to stop coming to practice."),
                E("An old man told Saki to keep practicing."),
                E("The leader said that Saki should play in a hurry."),
                E("Saki thinks playing music is only a hobby for her.") ], answer:[0,2] } ]}
]}

]};
