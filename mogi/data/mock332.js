/* data/mock332.js ─ 中3 模擬テスト 332
   構成：岡山県型（正進社 3年 第3回）と同一。大問1〜5・リスニング問題A〜D・合計100点。
   出題傾向・問題数・配点は chu3_3 と完全一致。内容はすべて新規（部活動・スポーツ大会での努力／仲間／成長）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 模擬テスト 332",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵を選ぶ */
  { intro:"問題A　放送を聞いて、内容に合う絵をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the sign. The basketball game starts at three thirty.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵（試合開始時刻の表示）はどれですか。",
      choices:["バスケの試合が3:30に始まる。","バスケの試合が3:13に始まる。",
               "バスケの試合が2:30に始まる。","サッカーの試合が3:30に始まる。"], answer:0 } ] },
  { script:'(2) Look at the picture. It is sunny today, and four students are running around the field.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う絵（今日の天気と様子）はどれですか。",
      choices:["くもりで、生徒が4人グラウンドを走っている。","晴れで、生徒が3人グラウンドを走っている。",
               "晴れで、生徒が4人グラウンドを走っている。","雨で、生徒が4人体育館を走っている。"], answer:2 } ] },

  /* 問題B：チャイムの応答 */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> Will you come to watch our basketball game this Saturday?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Sure, I'd love to."), E("No, I didn't watch the game."), E("It was an exciting game."), E("You're welcome.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> How long have you played basketball?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I'll go to the gym tomorrow."), E("For about five years."), E("Yes, I can play well."), E("Let's play together.") ], answer:1 } ] },

  /* 問題C：メモの空所補充 */
  { intro:"問題C　ユキ(Yuki)が、ALTのカーター(Mr. Carter)先生に部活動の思い出についてインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hi, I\'m Mr. Carter from New Zealand. When I was a junior high school student, I was a member of the basketball <b>team</b>.</span>'+
      '<span class="sp">I practiced very hard, and later I became the <b>captain</b> of the team.</span>'+
      '<span class="sp">At my last tournament, we won a gold <b>medal</b>. I will never forget that day.</span>',
    passage:'<b>ユキのメモ</b><br>Mr. Carter — was a member of the basketball （　あ　）<br>'+
            '— later became the （　い　） of the team<br>— won a gold （　う　） at his last tournament',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）チーム・部", answers:["team"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）キャプテン・主将", answers:["captain"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）メダル", answers:["medal"], hint:"英語1語" } ] },

  /* 問題D：説明を聞いて答える */
  { intro:"問題D　あなたとクラスメイトのアオイ(Aoi)が、体育祭についての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next month we will have a sports day. You can choose one team event to join.</span>'+
      '<span class="sp">Team A will run in the relay race. Team B will play in the basketball game. Team C will join the jump-rope contest.</span>'+
      '<span class="sp">The sports day starts on Friday. Please wear your P.E. clothes and bring a towel and some water.</span>'+
      '<span class="sp"><span class="who">Aoi:</span> I really like running fast. Which team will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["体育祭は木曜日に始まる。","参加者はなわとび大会に参加できる。",
               "説明では、タオルは必要ないと言っている。","体育の服は着なくてよい。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"アオイの発言に対するあなたの答えを完成させなさい。<br>"+E("I really like running fast. So I will choose the （　　）.")+"（英語2語）",
      answers:["relay race"], hint:"英語2語" } ] }
]},

/* ===== 大問2 チラシ＋対話 ===== */
{ no:2, title:"中学生のタクミ(Takumi)とハナ(Hana)が、ひかり市の体育館で行われる、バスケットボール指導者リード(Mr. Reed)さんの特別講演会のちらしを見ながら話しています。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Meet Mr. Reed, a Basketball Coach!</h4>'+
    '<div class="note">Hello, everyone! Come and learn how to play better with me!</div>'+
    '<table><tr><td>Date</td><td>November 14, 2026</td></tr>'+
    '<tr><td>Morning talk</td><td>10:00 a.m. – 11:00 a.m.</td></tr>'+
    '<tr><td>Afternoon talk</td><td>2:00 p.m. – 3:00 p.m.</td></tr></table>'+
    '<div class="note">I am … Mr. Reed, a basketball coach. (I have coached the city team for twelve years.)<br>'+
    'I like … running, music, watching games … and ramen! '+
    '(Please tell me about a good ramen shop!)　→ You can join here.</div>',
    passage:
    '<span class="sp"><span class="who">Takumi:</span> Look, Hana. Did you know about this event?</span>'+
    '<span class="sp"><span class="who">Hana:</span> Yes. Mr. Reed is the （　あ　） famous coach in our city.</span>'+
    '<span class="sp"><span class="who">Takumi:</span> Really? I want to join, but I\'m not （　い　） that I can ask good questions.</span>'+
    '<span class="sp"><span class="who">Hana:</span> You don\'t need to worry about that when you talk with him.</span>'+
    '<span class="sp"><span class="who">Takumi:</span> Good advice. He likes ramen. My favorite ramen shop is near the park. '+
    'I think the ramen there is the <u>(う) good</u> in our town.</span>'+
    '<span class="sp"><span class="who">Hana:</span> That\'s nice. I\'m （　い　） he will be happy to hear that.</span>'+
    '<span class="sp"><span class="who">Takumi:</span> The talk is two days from now. I have basketball practice in the morning that day.</span>'+
    '<span class="sp"><span class="who">Hana:</span> What time will it finish?</span>'+
    '<span class="sp"><span class="who">Takumi:</span> It will finish at eleven thirty. Then I can join the afternoon talk and ask about basketball!</span>',
    note:'語注：coach 指導者・コーチ／worry about 〜 〜を気にする／practice 練習',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"（あ）に入れるのに最も適当な英語1語を書きなさい。", answers:["most"], hint:"the （　） famous" },
    { type:"fill", label:"(2)い", pt:3, stem:"2か所の（い）に共通して入る最も適当な英語1語を書きなさい。", answers:["sure"], hint:"I'm not 〜 / I'm 〜" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) good を、最も適当な形に変えて1語で書きなさい。", answers:["best"], hint:"the 〜 in our town" },
    { type:"mcq", label:"(4)", pt:3, stem:"タクミとハナが話している日として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("November 12"), E("November 13"), E("November 14"), E("November 15") ], answer:0 },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Mr. Reed has coached the city team for twelve years."),
                E("Takumi cannot ask any questions to Mr. Reed."),
                E("There is a ramen shop near the station in Takumi's town."),
                E("Takumi will join the morning talk.") ], answer:0 } ]}
]},

/* ===== 大問3 日記の英作文 ===== */
{ no:3, title:"次は、海外でホームステイをしている生徒の日記の一部と、その日のできごとを表したイラストです。日記とイラストの内容に合うように、(1)に4語以上、(2)に3語以上の英語を書き、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：ホームステイ先のベン(Ben)が自分の部屋でたくさんのトロフィー(trophies)を見せている。棚にはぴかぴかのトロフィーがいっぱい並んでいる。",
    passage:
    'June 8<br><br>'+
    'This afternoon, Ben took me to his room. He said, "I want to show you something." '+
    'On the shelf, there were so many shiny trophies. I was surprised and said, "Wow! '+
    '<u>(1)</u>!" Ben smiled and said, "Yes. Our team won them together." He gave me an old ball as a present. '+
    'In the evening, I sent <u>(2)</u> to my family in Japan. They were excited, too.',
    passageEn:true,
    note:'語注：shelf たな／trophy トロフィー・優勝カップ／shiny ぴかぴかの',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：たくさんのトロフィーを見て驚く場面。次の語を正しく並べて英文を完成させなさい。",
      words:["won","You","trophies","many","have","great"], answer:"You have won many great trophies" },
    { type:"wordorder", label:"(2)", pt:5, stem:"夜、そのことを家族に知らせる場面です（I sent の続き）。次の語を正しく並べて英文を完成させなさい。",
      words:["a","picture","of","them"], answer:"a picture of them" } ]}
]},

/* ===== 大問4 話し合い＋感想 ===== */
{ no:4, title:"クラーク(Mr. Clark)先生の英語の授業で、Yuma、Saki、Kai が、好きなスポーツについて話し合いをしています。次の英文は、話し合いと、それを聞いて Rin が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Clark:</span> Today, let\'s talk about sports. What sport do you like the most? Yuma, tell us first.</span>'+
    '<span class="sp"><span class="who">Yuma:</span> I like basketball. I love it, and I want to learn how to shoot better.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> That\'s nice. Are you good at basketball, Yuma?</span>'+
    '<span class="sp"><span class="who">Yuma:</span> Yes. I have played basketball for four years. I want to win the city tournament with my team.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> Wonderful. I hope your dream will come true.</span>'+
    '<span class="sp"><span class="who">Saki:</span> I like running. My sister ran in a relay race last year, and it looked very exciting.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> Oh, that\'s a great reason. Do you like running, Saki?</span>'+
    '<span class="sp"><span class="who">Saki:</span> Yes, running fast is the thing I like the most. I want to join the relay team at the sports festival.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> That\'s wonderful. Kai, how about you?</span>'+
    '<span class="sp"><span class="who">Kai:</span> I want to be a P.E. teacher. I hear it is hard to teach sports well, and I want to study how to teach at a university.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> Teaching sports well is not （　あ　）, but it\'s a wonderful job.</span>'+
    '<span class="sp"><span class="who">Kai:</span> I think so.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> OK, I\'m going to talk about myself. When I was young, I joined a volleyball team. I practiced every day with my friends, so I learned the importance of teamwork.</span>'+
    '<span class="sp"><span class="who">Kai:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> Good question. When I was twenty-four, I came to Japan to teach P.E. The students were kind, and I was very happy. So I am still here.</span>'+
    '<span class="sp"><span class="who">Kai:</span> And now you are teaching us every day.</span>'+
    '<span class="sp"><span class="who">Mr. Clark:</span> Yes, and I love it. I hope you\'ll find a sport you really like.</span>',
    note:'語注：tournament 大会・トーナメント／relay リレー／teamwork チームワーク／P.E. 体育／university 大学' },
  { passage:'<b>Rin の感想</b><br>There are many exciting sports in the world. Like Saki, I love running. '+
            'I （　X　）, too, so I want to run in the relay race at the sports festival.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Yuma の発言から抜き出して書きなさい。<br>"+E("Yuma wants to learn [　　] better in the future."),
      answers:["how to shoot"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("bad"),E("easy"),E("difficult"),E("sad")], answer:1 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("How old are you now?"), E("What sport do you like?"),
                E("Why did you come to Japan?"), E("Where is your school?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Yuma wants to win the city tournament."),
                E("Saki doesn't like running."),
                E("Mr. Clark came to Japan to study Japanese."),
                E("Kai wants to be a doctor.") ], answer:0 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("play the piano well"), E("like running fast"),
                E("want to be a doctor"), E("study math hard") ], answer:1 } ]}
]},

/* ===== 大問5 意見文（読解） ===== */
{ no:5, title:"次の英文は、バスケットボール部のハルト(Haruto)が発表した意見文です。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Haruto from the basketball club. Today I want to talk about my experience of learning to play basketball. '+
    'When I was in my first year, I could not play well at all. But now I really enjoy playing. I want to share my story with you.<br><br>'+
    '<b>②</b> Last spring, I joined the basketball club. At first, basketball was very hard for me. '+
    'I missed many shots and got tired soon. I sometimes wanted to stop coming to practice. '+
    'One day, my father saw me. He said, "Don\'t give up. If you keep practicing, you will get better." '+
    'These words <u>(お) ___</u> my mind. I decided to try harder.<br><br>'+
    '<b>③</b> After that, I practiced very hard. My teammate also helped me a lot. '+
    'He taught me how to pass the ball. He said, "You should not play alone. Working together makes your team stronger." '+
    'I followed his advice. Little by little, I could play better.<br><br>'+
    '<b>④</b> Some people say that basketball is only a sport. That\'s true. <u>④ Basketball is a good way to make your body healthier</u>. '+
    'But it is more than that for me. <u>③ ( me / basketball / many things / taught )</u>. '+
    'I learned that I should not stop trying. When I keep practicing, I can <u>(か) ___</u> my dream. '+
    'So please don\'t give up, and find something you love!',
    passageEn:true,
    note:'語注：give up あきらめる／pass パスする／advice 助言',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お changed　か lose"), E("お changed　か reach"),
                E("お lost　か lose"), E("お lost　か reach") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "ハルトは一生けんめい練習した。", "チームメイトがパスの仕方を教えてくれた。",
                "チームメイトは一人でプレーするべきだと言った。", "ハルトは少しずつうまくプレーできるようになった。" ], answer:2 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["me","basketball","many things","taught"], answer:"Basketball taught me many things",
      display:"Basketball taught me many things" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語2語を、第2段落中から抜き出して書きなさい。<br>"+E("Haruto's father told him not to （　え　）."),
      answers:["give up"], hint:"第2段落の語・英語2語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>バスケットボールは、あなたの（　①　）をより（　②　）するためのよい方法だ。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "体（からだ）","心（こころ）","頭（あたま）","声（こえ）" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "健康に（じょうぶに）","つめたく","暗く","静かに" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Haruto could not play basketball well at all in his first year."),
                E("Haruto never wanted to stop coming to practice."),
                E("Haruto's father told him to keep practicing."),
                E("Haruto's teammate said that he should play alone."),
                E("Haruto thinks basketball is only a sport for him.") ], answer:[0,2] } ]}
]}

]};
