/* data/okayama12.js ─ 岡山県スタイル 模擬テスト⑫
   参照：factory/inputs/okayama_notes.md（岡山県公立入試の「傾向のみ」を参照。冊子コード 633340 系を追加分析）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。
   題材：星空観察／天文台／科学クラブ（架空の町 Hoshino / Kawakami）。
   ※過去問および okayama1〜11・chu3_* との内容重複なし。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "岡山県スタイル 模擬テスト⑫",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ（英文1回読み・2問） */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the picture. Takumi is looking up at the sky through a telescope, and his dog is sitting next to him.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵はどれですか。",
      choices:["望遠鏡で空を見上げるタクミの横に、犬がすわっている。","望遠鏡で空を見上げるタクミの後ろを、犬が走っている。",
               "地図を見ているタクミの横に、犬がすわっている。","望遠鏡を運ぶタクミの横を、犬が歩いている。"], answer:0 } ] },
  { script:'(2) Look at the table. The star party will start at seven fifteen in the evening, not at seven fifty.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う表（星の観察会の開始時刻）はどれですか。",
      choices:["午後7時50分に始まる。","午後7時15分に始まる。",
               "午前7時15分に始まる。","午後8時15分に始まる。"], answer:1 } ] },

  /* 問題B：チャイムの応答（対話の最後への応答・2回読み・2問） */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> It\'s cloudy tonight. Do you think we can see the stars?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Maybe not, but let's wait a little."), E("Yes, I broke my telescope."),
                E("I studied science last night."), E("No, the sun was very hot.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> Your report about the moon was really interesting. How long did it take?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Because I like the moon."), E("About two weeks."),
                E("At the science room."), E("With my little sister.") ], answer:1 } ] },

  /* 問題C：メモの空所補充（英語1語×3・2回読み） */
  { intro:"問題C　リナ(Rina)が、ホシノ天文台で働くベーカー(Mr. Barker)さんにインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, I\'m Mr. Barker. I have worked at this observatory since <b>2009</b>.</span>'+
      '<span class="sp">The best season to watch stars here is <b>winter</b>, because the air is very clear.</span>'+
      '<span class="sp">Before you come, please check the <b>weather</b> on our website.</span>',
    passage:'<b>リナのメモ</b><br>Mr. Barker — has worked at the observatory since （　あ　）<br>'+
            '— the best season to watch stars here is （　い　）<br>'+
            '— tells visitors to check the （　う　） on the website first',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）2009年", answers:["2009"], hint:"数字4けた" },
    { type:"fill", label:"い", pt:2, stem:"（い）冬", answers:["winter"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）天気", answers:["weather"], hint:"英語1語" } ] },

  /* 問題D：説明＋人物発言（内容一致選択＋3語の英語） */
  { intro:"問題D　あなたとクラスメイトのユカ(Yuka)が、科学クラブの合宿についての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">On the second day of the science camp, you can join one of three activities.</span>'+
      '<span class="sp">In the first activity, you will draw a map of the stars. In the second one, you will take moon photos with a special camera. In the third one, you will build a small rocket and fly it.</span>'+
      '<span class="sp">Each activity takes about three hours. After that, we will eat dinner outside together.</span>'+
      '<span class="sp"><span class="who">Yuka:</span> I\'m not good at drawing, but I love using my camera. Which activity do you want to join?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["活動は全部で4種類ある。","それぞれの活動は約3時間かかる。",
               "活動のあと、室内で朝食を食べる。","参加者は3つの活動すべてに参加する。"], answer:1 },
    { type:"fill", label:"(2)", pt:3,
      stem:"ユカの発言に対して、あなたはどのように答えますか。書き出しに続けて（　）に3語の英語を書き、英文を完成させなさい。<br>"+
           E("That sounds good for you. Let's （　　） together."),
      answers:["take moon photos"], hint:"英語3語（説明の中の言い方を使う）" } ] }
]},

/* ===== 大問2 ポスター＋対話 ===== */
{ no:2, title:"中学生のリナ(Rina)とタクミ(Takumi)が、ホシノ天文台の案内を見ながら会話をしています。次は、その案内と会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Hoshino Observatory — Winter Star Night</h4>'+
    '<div class="note">Come and see the clear winter sky with us!</div>'+
    '<table><tr><td>Date</td><td>Saturday, December 6</td></tr>'+
    '<tr><td>Time</td><td>6:00 p.m. – 9:00 p.m.</td></tr>'+
    '<tr><td>Ticket</td><td>500 yen　(students: 200 yen)</td></tr>'+
    '<tr><td>Telescope room</td><td>twenty people at a time</td></tr></table>'+
    '<div class="note">Bus … The last bus for Kawakami Station leaves the observatory at 9:20 p.m.<br>'+
    'Wear … a warm coat. The hill is much colder than the town.</div>',
    passage:
    '<span class="sp"><span class="who">Rina:</span> Takumi, look. The observatory will hold a star night next month.</span>'+
    '<span class="sp"><span class="who">Takumi:</span> That sounds exciting! I have wanted to use a big telescope for a long time.</span>'+
    '<span class="sp"><span class="who">Rina:</span> Me too. The sky on the hill is very （　あ　）, so we can see many stars.</span>'+
    '<span class="sp"><span class="who">Takumi:</span> I know. My brother went last year, and he （　い　） very cold on the hill.</span>'+
    '<span class="sp"><span class="who">Rina:</span> Then let\'s wear our warmest coats. How much is the ticket for us?</span>'+
    '<span class="sp"><span class="who">Takumi:</span> Only two hundred yen. We are <u>(う) student</u>, so it is cheaper.</span>'+
    '<span class="sp"><span class="who">Rina:</span> Great. And on a （　あ　） night in December, we may even see the Milky Way.</span>'+
    '<span class="sp"><span class="who">Takumi:</span> Perfect. I\'ll ask my brother to lend me his warm gloves.</span>',
    note:'語注：observatory 天文台／telescope 望遠鏡／Milky Way 天の川／lend 〜を貸す／glove 手ぶくろ',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"2か所の（あ）に共通して入れるのに最も適当な英語1語を、案内の中から抜き出して書きなさい。",
      answers:["clear"], hint:"案内の中にある語（The sky is very 〜 / on a 〜 night）" },
    { type:"fill", label:"(2)い", pt:3, stem:"（い）に入れるのに最も適当な英語1語を書きなさい。", answers:["felt"], hint:"he 〜 very cold（過去形1語）" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う)の単語を、最も適当な形に変えて1語で書きなさい。", answers:["students"], hint:"We are 〜, so it is cheaper." },
    { type:"mcq", label:"(4)", pt:3, stem:"案内から、望遠鏡の部屋に一度に入れる人数として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("twelve people"), E("twenty people"), E("two hundred people"), E("five hundred people") ], answer:1 },
    { type:"mcq", label:"(5)", pt:4, stem:"案内や会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Takumi's brother visited the observatory last year."),
                E("The star night will finish at six in the evening."),
                E("Rina has already used a big telescope many times."),
                E("Students must pay five hundred yen for a ticket.") ], answer:0 } ]}
]},

/* ===== 大問3 会話の英作文（並べかえ2問） ===== */
{ no:3, title:"科学クラブに来た留学生のルーカス(Lucas)と、中学生のリナ(Rina)が会話をしています。次の①〜⑥はそのときの二人の会話です。二人が考えている内容に合うように、(1)(2)の語を正しく並べかえて、会話を完成させなさい。なお、会話は①〜⑥の順に行われています。", groups:[
  { sceneNote:"イラスト：①リナが望遠鏡を指さして「これは50年前に作られました」と説明している。②ルーカスが「え、本当に。だれがそれを作ったのか知りたい」と考えている。③リナが「私たちの学校の先生です」と答えている。④ルーカスが「すごい！」とおどろいている。⑤リナが「土曜日にいっしょに星を見ませんか」とさそっている。⑥ルーカスが「はい、ぜひ」と答えている。",
    passage:
    '<span class="sp"><span class="who">Rina:</span> ① This telescope was made fifty years ago.</span>'+
    '<span class="sp"><span class="who">Lucas:</span> ② Oh, really? <u>(1)</u>.</span>'+
    '<span class="sp"><span class="who">Rina:</span> ③ A teacher at our school made it.</span>'+
    '<span class="sp"><span class="who">Lucas:</span> ④ That\'s amazing!</span>'+
    '<span class="sp"><span class="who">Rina:</span> ⑤ <u>(2)</u> on Saturday?</span>'+
    '<span class="sp"><span class="who">Lucas:</span> ⑥ Yes, I\'d love to.</span>',
    passageEn:true,
    note:'語注：telescope 望遠鏡／was made 作られた',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：ルーカスが「だれがそれを作ったのか知りたい」と考える場面。次の語を正しく並べて英文を完成させなさい。",
      words:["want","I","know","to","made","who","it"], answer:"I want to know who made it" },
    { type:"wordorder", label:"(2)", pt:5, stem:"イラスト：リナが「いっしょに星を見ませんか」とさそう場面。次の語を正しく並べて英文を完成させなさい。",
      words:["watch","Shall","stars","we","the"], answer:"Shall we watch the stars" } ]}
]},

/* ===== 大問4 話し合い＋感想 ===== */
{ no:4, title:"ヒル(Ms. Hill)先生の英語の授業で、Yuka、Daiki、Aki が、科学クラブの発表について話し合いをしています。次の英文は、話し合いと、それを聞いて Rina が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Ms. Hill:</span> Next month, our science club will show something to the whole school. What should we show? Yuka, please start.</span>'+
    '<span class="sp"><span class="who">Yuka:</span> I want to <u>show our moon photos</u> in the hall. We took them for six months.</span>'+
    '<span class="sp"><span class="who">Ms. Hill:</span> That\'s a nice plan. Why do you think photos are good, Yuka?</span>'+
    '<span class="sp"><span class="who">Yuka:</span> Because everyone can enjoy them without any special words. Pictures speak to all people.</span>'+
    '<span class="sp"><span class="who">Ms. Hill:</span> I agree. Daiki, what is your idea?</span>'+
    '<span class="sp"><span class="who">Daiki:</span> I want to hold a small star night in the schoolyard. Then our families can come, too.</span>'+
    '<span class="sp"><span class="who">Ms. Hill:</span> Sounds fun. Do you often watch the sky, Daiki?</span>'+
    '<span class="sp"><span class="who">Daiki:</span> Yes, looking at the night sky is the thing I like the most.</span>'+
    '<span class="sp"><span class="who">Ms. Hill:</span> Wonderful. Aki, how about you?</span>'+
    '<span class="sp"><span class="who">Aki:</span> I want to make a short movie about our club. Then students who cannot come can watch it later.</span>'+
    '<span class="sp"><span class="who">Ms. Hill:</span> Making a movie in one month is not （　あ　）, but I like your idea very much.</span>'+
    '<span class="sp"><span class="who">Aki:</span> I think so, too.</span>'+
    '<span class="sp"><span class="who">Ms. Hill:</span> Now I will tell you my own story. When I was fourteen, my father took me to a dark hill and showed me the stars. I could not sleep that night because I was so excited.</span>'+
    '<span class="sp"><span class="who">Aki:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Ms. Hill:</span> Good question. I became a science teacher because I wanted to give that feeling to young people.</span>'+
    '<span class="sp"><span class="who">Aki:</span> And now you teach us English and science.</span>'+
    '<span class="sp"><span class="who">Ms. Hill:</span> Yes, and I am very happy about it. I hope you will look up at the sky often.</span>',
    note:'語注：whole 全体の／schoolyard 校庭／excited わくわくして' },
  { passage:'<b>Rina の感想</b><br>All three ideas were good. Like Daiki, I love the night sky. '+
            'I （　X　）, too, so I want our families to see the stars with us.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語4語を、話し合いの中の Yuka の発言から抜き出して書きなさい。<br>"+E("Yuka wants to [　　] in the hall."),
      answers:["show our moon photos"], hint:"英語4語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("easy"),E("dark"),E("kind"),E("late")], answer:0 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Where did your father buy it?"), E("How old is your father now?"),
                E("Why did you choose your job?"), E("When will you visit the hill?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Daiki wants to hold a star night in the schoolyard."),
                E("Yuka took the moon photos in only one day."),
                E("Ms. Hill slept very well after she saw the stars."),
                E("Aki wants to write a long book about the club.") ], answer:0 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("often play soccer after school"), E("like watching the sky at night"),
                E("want to be a math teacher"), E("read many books about animals") ], answer:1 } ]}
]},

/* ===== 大問5 スピーチ（長文読解） ===== */
{ no:5, title:"次の英文は、リナ(Rina)が英語の授業で発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Rina from the science club. Two years ago, I did not care about the sky at all. '+
    'Now I watch it almost every night. One old telescope changed me, and I want to tell you the story.<br><br>'+
    '<b>②</b> When I joined the science club, I found an old telescope in the corner of the science room. '+
    'It was covered with dust, and nobody used it. I asked our teacher about it. He said, '+
    '"A student made it fifty years ago. It still works well." I cleaned it for two days, and my hands got '+
    'black. But when I looked through it that evening, I was <u>(お) ___</u> to see the rings of Saturn.<br><br>'+
    '<b>③</b> After that, I brought the telescope to the schoolyard every Friday. '+
    'At first, only two members came with me. Then a first-year student came. She said, "My grandmother told me '+
    'about this star." Soon, ten students were waiting in line. One rainy Friday, nobody could see anything, '+
    'but we talked about the sky for an hour and laughed a lot.<br><br>'+
    '<b>④</b> Some people say that one old machine cannot change a school. That may be true. '+
    '<u>④ One old telescope cannot make every student love science</u>. '+
    'But I know what happened in our club. <u>③ ( brought / the telescope / together / us )</u>. '+
    'When we share one small window to the sky, we also share our questions. '+
    'So please come to the schoolyard next Friday, and let\'s <u>(か) ___</u> up together!',
    passageEn:true,
    note:'語注：dust ほこり／work 動く／ring 輪／Saturn 土星／in line 列になって／share 〜を分け合う',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お surprised　か give"), E("お surprised　か look"),
                E("お angry　か give"), E("お angry　か look") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "はじめは2人の部員だけが来た。", "1年生の生徒が祖母から星の話を聞いていた。",
                "やがて10人の生徒が列に並んだ。", "雨の金曜日には、だれも校庭に来なかった。" ], answer:3 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["brought","the telescope","together","us"], answer:"The telescope brought us together",
      display:"The telescope brought us together" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語2語を、第2段落中から抜き出して書きなさい。<br>"+E("The old telescope （　え　） dust when Rina found it."),
      answers:["was covered"], hint:"第2段落の語・英語2語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>1台の古い（　①　）が、すべての生徒に（　②　）を好きにさせることはできない。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "望遠鏡","カメラ","時計","自転車" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "理科","音楽","体育","家庭科" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Two years ago, Rina did not care about the sky at all."),
                E("The old telescope was broken and could not be used."),
                E("Rina cleaned the telescope for two days."),
                E("Rina brought the telescope to the schoolyard every Monday."),
                E("Rina thinks nobody should use the old telescope.") ], answer:[0,2] } ]}
]}

]};
