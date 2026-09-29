/* data/chu3_352.js ─ 中3 習熟度テスト対策 352
   参照：factory/inputs/okayama_notes.md（習熟度テスト・県立入試の「傾向のみ」を参照。3年目の分析・633340 系の骨格）
        ／factory/inputs/authoring_rules.md／モデル mogi/data/chu3_341.js。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。
   題材：海外の姉妹校とのオンライン交流／時差・季節と文化のちがい・学校生活
        （架空の町 Shirakawa City／相手校は Australia の架空の Bell Hill School）。
   登場人物：Sora, Hina, Mr. Green（ALT）, Lucy（相手校の生徒）。
   ※過去問および既存の模試データとの内容重複なし。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 習熟度テスト対策 352",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ（英文1回読み・2問） */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the picture. Sora is holding a tablet, and Hina is waving her hand at the screen.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵はどれですか。",
      choices:["ソラがタブレットを持ち、ヒナが画面に向かって手をふっている。","ソラがタブレットを持ち、ヒナがノートに何かを書いている。",
               "ソラが画面に向かって手をふり、ヒナがタブレットを持っている。","ソラとヒナが二人ともタブレットを持っている。"], answer:0 } ] },
  { script:'(2) Look at the table. When it is nine in the morning in Shirakawa City, it is ten in the morning at Bell Hill School. Australia is one hour ahead of Japan.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う表（シラカワ市とベルヒル校の時刻）はどれですか。",
      choices:["シラカワ市 午前9時／ベルヒル校 午前8時","シラカワ市 午前10時／ベルヒル校 午前9時",
               "シラカワ市 午前9時／ベルヒル校 午前10時","シラカワ市 午前9時／ベルヒル校 午後10時"], answer:2 } ] },

  /* 問題B：チャイムの応答（対話の最後への応答・2回読み・2問） */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> The online meeting will start at nine. Have you checked the camera yet?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("No, I have never met her."), E("Yes, it was very hot yesterday."),
                E("Yes, I have. It works well."), E("She lives near the station.") ], answer:2 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> Lucy says it\'s summer in Australia now. Can you believe it?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Yes, I had lunch at school."), E("Really? It's very cold here in December."),
                E("No, she isn't my sister."), E("I'll take the bus tomorrow.") ], answer:1 } ] },

  /* 問題C：メモの空所補充（英語1語×3・2回読み） */
  { intro:"問題C　ソラ(Sora)が、ALT のグリーン(Mr. Green)先生からオンライン交流についての説明を聞いて、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, everyone. Our first online meeting with Bell Hill School will be next <b>Tuesday</b>.</span>'+
      '<span class="sp">We will use the <b>computer</b> room on the second floor, because it has a big screen.</span>'+
      '<span class="sp">The meeting will be about <b>forty</b> minutes long, so please prepare a short speech about our school.</span>',
    passage:'<b>ソラのメモ</b><br>Online meeting with Bell Hill School<br>'+
            '— will be next （　あ　）<br>'+
            '— place: the （　い　） room on the second floor<br>'+
            '— about （　う　） minutes long<br>'+
            '— prepare a short speech about our school',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）火曜日", answers:["Tuesday"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）コンピュータ", answers:["computer"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）会議のおよその長さ（〜分）", answers:["forty","40"], hint:"英語1語（数）" } ] },

  /* 問題D：説明＋人物発言（内容一致選択＋3語の英語） */
  { intro:"問題D　あなたとクラスメイトのヒナ(Hina)が、オンライン交流の活動についての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next month, our school will start an online exchange program with Bell Hill School in Australia. You can choose one activity.</span>'+
      '<span class="sp">Activity A is playing Japanese games with the students there. Activity B is teaching Japanese songs to them. Activity C is making a short video about our city.</span>'+
      '<span class="sp">Each group will meet the Australian students on Friday morning. It is Friday morning there, too, because Australia is only one hour ahead of Japan.</span>'+
      '<span class="sp">Please speak slowly and clearly.</span>'+
      '<span class="sp"><span class="who">Hina:</span> I love singing, but I\'m not good at using a camera. Which activity will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["活動は4種類あり、2つを選ぶことができる。","各グループは金曜日の午前中にオーストラリアの生徒と会う。",
               "オーストラリアは日本より3時間進んでいる。","生徒はできるだけ速く話すように言われている。"], answer:1 },
    { type:"fill", label:"(2)", pt:3,
      stem:"ヒナの発言に対して、あなたはどのように答えますか。書き出しに続けて（　）に songs を含む3語の英語を書き、英文を完成させなさい。<br>"+
           E("That's a good activity for you. Let's （　　） together."),
      answers:["teach Japanese songs"], hint:"英語3語（説明の中の言い方を使う）" } ] }
]},

/* ===== 大問2 ちらし（表）＋対話 ===== */
{ no:2, title:"中学生のソラ(Sora)とヒナ(Hina)が、姉妹校とのオンライン交流週間のちらしを見ながら会話をしています。次は、そのちらしと会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Bell Hill Week at Shirakawa Junior High School</h4>'+
    '<div class="note">Let\'s meet the students at our new sister school in Australia online!</div>'+
    '<table><tr><th>Day</th><th>Event</th><th>Place</th><th>Students</th></tr>'+
    '<tr><td>Monday</td><td>Online tour of Bell Hill School</td><td>computer room</td><td>30</td></tr>'+
    '<tr><td>Tuesday</td><td>Quiz about Australia</td><td>library</td><td>20</td></tr>'+
    '<tr><td>Wednesday</td><td>Cooking online — Australian sweets</td><td>cooking room</td><td>16</td></tr>'+
    '<tr><td>Thursday</td><td>Talk with Bell Hill students in small groups</td><td>English room</td><td>24</td></tr></table>'+
    '<div class="note">Time … 9:00 a.m. – 9:40 a.m. (Japan time) = 10:00 a.m. – 10:40 a.m. (Australia time)<br>'+
    'Fee … The cooking event is 200 yen for the food. The other events are free.<br>'+
    'Bring … your own headphones.<br>'+
    'Please use simple English and speak slowly. The students there are learning Japanese, too.</div>',
    passage:
    '<span class="sp"><span class="who">Sora:</span> Hina, look at this. Bell Hill Week starts next Monday. We can meet the students in Australia online.</span>'+
    '<span class="sp"><span class="who">Hina:</span> Great! I want to join the quiz on Tuesday. And on Wednesday, we can learn how to make Australian sweets.</span>'+
    '<span class="sp"><span class="who">Sora:</span> That sounds fun. Are you going to join both?</span>'+
    '<span class="sp"><span class="who">Hina:</span> Yes. I （　い　） looking forward to it since I saw the video from Bell Hill School. How about you?</span>'+
    '<span class="sp"><span class="who">Sora:</span> I\'ll join the talk on Thursday. I want to ask the students about their town. Have you ever <u>(う) speak</u> English with a person from another country?</span>'+
    '<span class="sp"><span class="who">Hina:</span> Only once, with Mr. Green\'s friend. I was nervous, but he used （　あ　） words, so I could understand him.</span>'+
    '<span class="sp"><span class="who">Sora:</span> Then let\'s use （　あ　） English, too. The students there are learning Japanese, so they will try to understand us.</span>'+
    '<span class="sp"><span class="who">Hina:</span> Right. And I\'ll bring my own headphones. I don\'t want to miss any words.</span>'+
    '<span class="sp"><span class="who">Sora:</span> Good idea. Let\'s tell Mr. Green about our plans.</span>',
    note:'語注：sister school 姉妹校／tour 見学／quiz クイズ／sweets おかし／fee 料金／look forward to 〜 〜を楽しみに待つ／nervous 緊張して／headphones ヘッドホン／miss 〜を聞きのがす',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"2か所の（あ）に共通して入れるのに最も適当な英語1語を、ちらしの中から抜き出して書きなさい。",
      answers:["simple"], hint:"ちらしの中にある語" },
    { type:"fill", label:"(2)い", pt:3, stem:"（い）に入れるのに最も適当な2語の英語を書きなさい。", answers:["have been"], hint:"英語2語（ずっと〜し続けている）" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う)の単語を、最も適当な形に変えて1語で書きなさい。", answers:["spoken"], hint:"Have you ever 〜 English with a person from another country?" },
    { type:"mcq", label:"(4)", pt:3, stem:"ちらしから、ヒナが火曜日と水曜日の行事の両方に参加するとき、払う金額は全部でいくらですか。最も適当なのは、ア〜エのどれですか。",
      choices:[ E("100 yen"), E("200 yen"), E("300 yen"), E("400 yen") ], answer:1 },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Sora will join the cooking event on Wednesday."),
                E("The events start at ten in the morning in Japan."),
                E("The students at Bell Hill School are learning Chinese."),
                E("Hina has talked in English with a person from another country before.") ], answer:3 } ]}
]},

/* ===== 大問3 会話の英作文（並べかえ2問） ===== */
{ no:3, title:"オンライン交流で、ベルヒル校のルーシー(Lucy)と中学生のソラ(Sora)が会話をしています。次の①〜⑥はそのときの二人の会話です。二人が考えている内容に合うように、(1)(2)の語を正しく並べかえて、会話を完成させなさい。なお、会話は①〜⑥の順に行われています。", groups:[
  { sceneNote:"イラスト：①ルーシーが汗をふきながら「今日はとても暑い。35度もある」と言っている。②ソラが「オーストラリアではどの月がいちばん暑いのだろう」と考えながらたずねている。③ルーシーが「1月。ここでは夏は12月に始まる」と答えている。④ソラが「日本では12月は冬の始まり」とおどろいている。⑤ルーシーが画面に映ったソラの校舎を見て「いつ建てられたのだろう」と考えながらたずねている。⑥ソラが「約60年前。祖父もここで学んだ」と答えている。",
    passage:
    '<span class="sp"><span class="who">Lucy:</span> ① It\'s very hot here today. It\'s thirty-five degrees!</span>'+
    '<span class="sp"><span class="who">Sora:</span> ② Wow! <u>(1)</u>?</span>'+
    '<span class="sp"><span class="who">Lucy:</span> ③ January. Summer starts in December here.</span>'+
    '<span class="sp"><span class="who">Sora:</span> ④ Really? In Japan, December is the beginning of winter.</span>'+
    '<span class="sp"><span class="who">Lucy:</span> ⑤ I see. By the way, your school building looks old. <u>(2)</u>?</span>'+
    '<span class="sp"><span class="who">Sora:</span> ⑥ About sixty years ago. My grandfather studied here, too.</span>',
    passageEn:true,
    note:'語注：degree 度／beginning 始まり／was built 建てられた',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：ソラが「オーストラリアではどの月がいちばん暑いのですか」とたずねる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["month","Which","the","is","hottest","in","Australia"], answer:"Which month is the hottest in Australia" },
    { type:"wordorder", label:"(2)", pt:5, stem:"イラスト：ルーシーが「あなたの学校はいつ建てられたのですか」とたずねる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["was","When","school","your","built"], answer:"When was your school built" } ]}
]},

/* ===== 大問4 話し合い＋日記 ===== */
{ no:4, title:"グリーン(Mr. Green)先生の英語の授業で、Sora と Hina が、オンライン交流で相手校に見せるものについて話し合いをしています。次の英文は、話し合いと、その日に Hina が書いた日記です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Green:</span> Our second online meeting with Bell Hill School is next Friday. This time, each of you will show something about our school life to the students there. What do you want to show? Sora, please start.</span>'+
    '<span class="sp"><span class="who">Sora:</span> I want to <u>cook Japanese food</u> in the cooking room and show it online. In the video Lucy sent us, the students were eating lunch outside, and nobody had a school lunch like ours.</span>'+
    '<span class="sp"><span class="who">Mr. Green:</span> Good point. In Australia, most students bring their lunch from home. What will you cook, Sora?</span>'+
    '<span class="sp"><span class="who">Sora:</span> Rice balls. They are easy to make, and I can teach the students how to make them.</span>'+
    '<span class="sp"><span class="who">Mr. Green:</span> Nice. Hina, how about you?</span>'+
    '<span class="sp"><span class="who">Hina:</span> I want to show our school rules, like changing shoes at the entrance. And I have a question. In the video, every student wore a hat outside. Is that a rule?</span>'+
    '<span class="sp"><span class="who">Mr. Green:</span> Yes, at many schools. The sun is very strong there, so wearing a hat outside is （　あ　）. Students must wear one.</span>'+
    '<span class="sp"><span class="who">Hina:</span> I see. Their school life is different from ours in many ways.</span>'+
    '<span class="sp"><span class="who">Mr. Green:</span> Right. Now let me talk about my school days in Australia. Our school year started in late January, and we had a long summer vacation in December. I went to the beach almost every day.</span>'+
    '<span class="sp"><span class="who">Sora:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Mr. Green:</span> Good question. My uncle lived in Japan, and he taught me Japanese during the vacation. That\'s why I became interested in Japan.</span>'+
    '<span class="sp"><span class="who">Sora:</span> And now you teach us English in Japan.</span>'+
    '<span class="sp"><span class="who">Mr. Green:</span> Yes, and I enjoy every day here. It is important for us to learn about each other\'s lives, so please ask many questions next Friday.</span>',
    note:'語注：rice ball おにぎり／rule 規則／entrance 玄関／wore 〜をかぶっていた（wear の過去形）／strong （日ざしが）強い／necessary 必要な／late January 1月の終わりごろ／beach 浜辺／uncle おじ／during 〜の間に／each other おたがい' },
  { passage:'<b>Hina の日記</b><br>Today we talked about the next online meeting. Sora will cook rice balls, and I will show our school rules. '+
            'I （　X　）, so I asked Mr. Green about the hats. He also told us about his school days in Australia. '+
            'I want to ask Lucy a lot of questions next Friday.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Sora の発言から抜き出して書きなさい。<br>"+E("Sora wants to [　　] and show it to the students at Bell Hill School."),
      answers:["cook Japanese food"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("necessary"),E("dangerous"),E("expensive"),E("quiet")], answer:0 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("How many students were in your class?"), E("Why did you become interested in Japan?"),
                E("When will you go back to the beach?"), E("What did you eat for lunch at school?") ], answer:1 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Sora will cook rice balls in the video Lucy sent."),
                E("Mr. Green had his summer vacation in August."),
                E("Hina wants to show the school rules of her school."),
                E("Students in Australia never wear hats at school.") ], answer:2 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("was good at making rice balls"), E("have been to Australia many times"),
                E("wanted to swim at the beach"), E("wanted to know their school rules") ], answer:3 } ]}
]},

/* ===== 大問5 スピーチ（長文読解） ===== */
{ no:5, title:"次の英文は、ソラ(Sora)が英語の授業で発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Sora. Since September, our class has been talking with the students at Bell Hill School in Australia online. '+
    'Our school and Bell Hill School became sister schools last year. '+
    'Before the first meeting, I thought that people in other countries were very different from us. '+
    'Now I don\'t think so, and I want to tell you why.<br><br>'+
    '<b>②</b> At the first meeting, I was so nervous that I could not say anything. Then a girl named Lucy smiled at the screen. '+
    'She spoke slowly and asked me easy questions, so I could answer them. She has been studying Japanese for two years, '+
    'and she showed me a paper with the word "Konnichiwa" on it. After the meeting, we began to write emails to each other. '+
    'Soon I found something surprising. When it is nine in the morning here, it is ten at her school. '+
    'And in December, it is summer there! Lucy wrote, "We swim in the sea on Christmas Day." I was <u>(お) ___</u> to read that.<br><br>'+
    '<b>③</b> In November, I made a mistake. Lucy and I planned to talk online on Sunday at four in the afternoon, Australian time. '+
    'I forgot the time difference and turned on my computer at four, Japan time. It was already five in Australia, and Lucy waited for an hour. '+
    'I said sorry many times, but she did not get angry. She laughed and said, "Don\'t worry. Now you will never forget the time difference." '+
    'She was right. Since then, I have always checked the time in Australia before I call her.<br><br>'+
    '<b>④</b> Some people say that we cannot become real friends with people we have never met. That may be true. '+
    '<u>④ A small screen cannot show me everything about her country</u>. '+
    'But I found something important through this program. <u>③ ( helped / Lucy / understand / me / her country )</u>. '+
    'Now I want to help her understand Japan, too. When we know how people far away live, they are not strangers anymore. '+
    'So please turn on your computer next Friday, and let\'s <u>(か) ___</u> the students at Bell Hill together!',
    passageEn:true,
    note:'語注：nervous 緊張して／named 〜という名前の／screen 画面／surprising おどろくような／Christmas Day クリスマスの日／mistake まちがい／Australian time オーストラリアの時刻で／time difference 時差／turn on 〜の電源を入れる／get angry おこる／stranger 知らない人／anymore もはや（〜ない）',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お surprised　か meet"), E("お surprised　か leave"),
                E("お sad　か meet"), E("お sad　か leave") ], answer:0 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "ソラは日本時間の午後4時にコンピュータの電源を入れた。", "ルーシーは1時間待った。",
                "ルーシーはソラに対しておこった。", "ソラはそれ以来、電話をかける前にオーストラリアの時刻を確かめている。" ], answer:2 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["helped","Lucy","understand","me","her country"], answer:"Lucy helped me understand her country",
      display:"Lucy helped me understand her country" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語3語を、第2段落中から抜き出して書きなさい。<br>"+E("After the first meeting, Sora and Lucy （　え　） emails to each other."),
      answers:["began to write"], hint:"第2段落の語・英語3語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>小さな（　①　）は、彼女の（　②　）についてのすべてを私に見せることはできない。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "画面","写真","手紙","地図" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "国","家","学校","町" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Sora's class has talked with the students at Bell Hill School since September."),
                E("Lucy could not say anything at the first meeting."),
                E("Lucy wrote that she swims in the sea on Christmas Day."),
                E("Sora turned on his computer at four, Australian time."),
                E("Sora still thinks people in other countries are very different from us.") ], answer:[0,2] } ]}
]}

]};
