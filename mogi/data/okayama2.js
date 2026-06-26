/* data/okayama2.js ─ 岡山県スタイル 模擬テスト②
   傾向のみ参照（reference-only：factory/inputs/okayama_notes.md）。過去問の文・図・設問は一切再現せず、本文・対話・設問・選択肢はすべて新規創作。
   題材：倉敷の美観地区・川舟流し・デニム(ジーンズ)の町（架空の町名 Wakaba / Midori / Hikari を使用）。
   構成・配点は岡山スタイル（大問1〜5・リスニング問題A〜D）に一致。合計100点。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "岡山県スタイル 模擬テスト②",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ（1回読み） */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the timetable. The next river boat for Hikari Bridge leaves at ten fifty.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う表（川舟の出発時刻）はどれですか。",
      choices:["ヒカリ橋行きの川舟が10:50に出発。","ヒカリ橋行きの川舟が10:15に出発。",
               "ヒカリ橋行きの川舟が10:05に出発。","ミドリ橋行きの川舟が10:50に出発。"], answer:0 } ] },
  { script:'(2) Look at the picture. A boy in blue jeans is standing on a small bridge and taking a photo of the river.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う絵（橋の上の男の子の様子）はどれですか。",
      choices:["青いジーンズの男の子が橋の上で川の写真をとっている。","青いジーンズの男の子が橋の下で魚を見ている。",
               "白いシャツの男の子が橋の上で川の写真をとっている。","青いジーンズの女の子が川舟に乗っている。"], answer:0 } ] },

  /* 問題B：チャイムの応答（2回読み） */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> Have you ever made your own jeans at the denim studio?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Yes, I made a bag there last summer."), E("No, the river was very clean."), E("It was a beautiful old house."), E("You're welcome.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> How long does the river boat tour take?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I'll go to the river tomorrow."), E("It takes about twenty minutes."), E("Yes, I like old towns."), E("Let's take the boat together.") ], answer:1 } ] },

  /* 問題C：メモの空所補充（英語1語×3・2回読み） */
  { intro:"問題C　ハルト(Haruto)が、ALTのベイカー(Mr. Baker)先生にワカバの町についてインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hi, I\'m Mr. Baker from the U.K. In Wakaba, I love walking along the old <b>river</b> in the morning.</span>'+
      '<span class="sp">The town is also famous for making strong blue <b>jeans</b>, and I bought a pair last month.</span>'+
      '<span class="sp">On weekends, I often visit a small <b>museum</b> and learn about the history of the town.</span>',
    passage:'<b>ハルトのメモ</b><br>Mr. Baker — likes walking along the old （　あ　） in the morning<br>'+
            '— Wakaba is famous for making blue （　い　）<br>— visits a small （　う　） to learn the town\'s history',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）川", answers:["river"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）ジーンズ", answers:["jeans"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）博物館", answers:["museum"], hint:"英語1語" } ] },

  /* 問題D：説明を聞いて答える（内容一致＋英作文・2回読み） */
  { intro:"問題D　あなたとクラスメイトのメグ(Meg)が、町歩きイベントについての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next Sunday, we will have a town-walking event in Wakaba. You can choose one course.</span>'+
      '<span class="sp">Course A goes along the river. Course B visits the denim studio. Course C goes to the history museum.</span>'+
      '<span class="sp">The event starts at nine in the morning. Please bring your own water bottle and wear comfortable shoes.</span>'+
      '<span class="sp"><span class="who">Meg:</span> I really want to make something with my hands. Which course will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["イベントは土曜日に行われる。","参加者は川沿いを歩くコースを選べる。",
               "イベントは午後3時に始まる。","水とうを持ってくる必要はない。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"メグの発言に対するあなたの答えを完成させなさい。<br>"+E("I really want to make something with my hands. So I will choose the （　　）.")+"（英語2語）",
      answers:["denim studio"], hint:"英語2語" } ] }
]},

/* ===== 大問2 チラシ＋対話 ===== */
{ no:2, title:"中学生のカイ(Kai)とユイ(Yui)が、ワカバの町の体験イベントの一つである、デニム工房のジーンズづくり教室のちらしを見ながら話しています。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Make Your Own Jeans in Wakaba!</h4>'+
    '<div class="note">Hello, everyone! Let\'s make a pair of blue jeans with us at the Wakaba Denim Studio!</div>'+
    '<table><tr><td>Date</td><td>September 13, 2026</td></tr>'+
    '<tr><td>Morning class</td><td>9:30 a.m. – 11:30 a.m.</td></tr>'+
    '<tr><td>Afternoon class</td><td>1:30 p.m. – 3:30 p.m.</td></tr>'+
    '<tr><td>Price</td><td>2,000 yen for each person</td></tr>'+
    '<tr><td>Group price</td><td>3 people for 5,000 yen</td></tr></table>'+
    '<div class="note">Our studio … makes strong blue jeans by hand. (We have made jeans for forty years.)<br>'+
    'After the class … you can ride a river boat near the studio! '+
    '(The boat leaves every thirty minutes.)　→ You can join here.</div>',
    passage:
    '<span class="sp"><span class="who">Kai:</span> Look, Yui. Did you know about this class?</span>'+
    '<span class="sp"><span class="who">Yui:</span> Yes. The Wakaba Denim Studio is the （　あ　） famous place in our town.</span>'+
    '<span class="sp"><span class="who">Kai:</span> Really? I want to join, but I\'m not （　い　） that I can make good jeans.</span>'+
    '<span class="sp"><span class="who">Yui:</span> You don\'t need to worry about that. The people there will help you a lot.</span>'+
    '<span class="sp"><span class="who">Kai:</span> Good. Three of my friends want to come, too. The group price is the <u>(う) good</u> way for us.</span>'+
    '<span class="sp"><span class="who">Yui:</span> That\'s a nice idea. I\'m （　い　） you will enjoy it together.</span>'+
    '<span class="sp"><span class="who">Kai:</span> By the way, four people will join in our group. How much is it for us in all?</span>'+
    '<span class="sp"><span class="who">Yui:</span> Three people can use the group price, and one more person pays the usual price. So it is （　え　） yen in all.</span>'+
    '<span class="sp"><span class="who">Kai:</span> I see. We have a soccer game in the morning that day, so let\'s take the afternoon class.</span>'+
    '<span class="sp"><span class="who">Yui:</span> Good. After the class, we can ride a river boat near the studio, too!</span>',
    note:'語注：by hand 手作業で／worry about 〜 〜を気にする／in all 全部で',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"（あ）に入れるのに最も適当な英語1語を書きなさい。", answers:["most"], hint:"the （　） famous" },
    { type:"fill", label:"(2)い", pt:3, stem:"2か所の（い）に共通して入る最も適当な英語1語を書きなさい。", answers:["sure"], hint:"I'm not 〜 / I'm 〜" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) good を、最も適当な形に変えて1語で書きなさい。", answers:["best"], hint:"the 〜 way for us" },
    { type:"fill", label:"(4)え", pt:3, stem:"（え）に入れるのに最も適当な数を、ちらしを見て算用数字で書きなさい（4人ぶんの合計金額）。", answers:["7000"], hint:"5,000 + 2,000" },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("The Wakaba Denim Studio has made jeans for forty years."),
                E("Kai and Yui cannot ride a river boat after the class."),
                E("The morning class starts at one thirty in the afternoon."),
                E("Kai and his friends will take the morning class.") ], answer:0 } ]}
]},

/* ===== 大問3 日記の英作文（並べかえ） ===== */
{ no:3, title:"ワカバの町に来た友だちのケイト(Kate)を案内したミナト(Minato)は、その日の日記を書きました。次は、日記の一部と、その日のできごとを表したイラストです。日記とイラストの内容に合うように、(1)(2)の語を正しく並べかえて、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：午前中、ケイトとミナトが川舟に乗って美観地区を進んでいる。午後はデニム工房で、ケイトが自分でつくった青いジーンズを手に持って笑っている。",
    passage:
    'August 5<br><br>'+
    'This morning, I took Kate to the old town. The streets were beautiful and quiet. '+
    'We found a small boat by the river, and the man on it said, "Please get on." So <u>(1)</u> along the river. '+
    'Kate was very happy. In the afternoon, we went to the denim studio. Kate worked hard for two hours, and '+
    'at last she made <u>(2)</u>. She said, "This is my treasure!"',
    passageEn:true,
    note:'語注：get on 乗る／at last ついに／treasure 宝物',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：午前中、二人が川舟に乗っている場面です（So の続き）。次の語を正しく並べて英文を完成させなさい。",
      words:["the","rode","we","boat"], answer:"we rode the boat", display:"we rode the boat" },
    { type:"wordorder", label:"(2)", pt:5, stem:"イラスト：午後、ケイトが自分でつくった青いジーンズを持っている場面です（she made の続き）。次の語を正しく並べて英文を完成させなさい。",
      words:["jeans","blue","own","her"], answer:"her own blue jeans", display:"her own blue jeans" } ]}
]},

/* ===== 大問4 話し合い＋感想 ===== */
{ no:4, title:"カーター(Carter)先生の英語の授業で、Yuki、Daichi、Ren が、ワカバの町をしょうかいするなら何を伝えたいかについて話し合いをしています。次の英文は、話し合いと、それを聞いて Sara が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Carter:</span> Today, let\'s talk about our town. If you show Wakaba to visitors, what do you want to tell them? Yuki, tell us first.</span>'+
    '<span class="sp"><span class="who">Yuki:</span> I want to tell them about the river boats. I love them because we can <u>see the old streets</u> from the water. It is really special.</span>'+
    '<span class="sp"><span class="who">Mr. Carter:</span> That\'s nice. Have you ever ridden the boat, Yuki?</span>'+
    '<span class="sp"><span class="who">Yuki:</span> Yes, many times. The view from the boat is the best thing in our town.</span>'+
    '<span class="sp"><span class="who">Mr. Carter:</span> Wonderful. I hope visitors will enjoy the boats, too.</span>'+
    '<span class="sp"><span class="who">Daichi:</span> I want to tell them about our blue jeans. Wakaba has made strong jeans for many years, and they are popular around the world.</span>'+
    '<span class="sp"><span class="who">Mr. Carter:</span> Oh, that\'s a great point. Do you have a pair of Wakaba jeans, Daichi?</span>'+
    '<span class="sp"><span class="who">Daichi:</span> Yes. My father gave me a pair last year. They are strong, so I can wear them for a long time.</span>'+
    '<span class="sp"><span class="who">Mr. Carter:</span> That\'s wonderful. Ren, how about you?</span>'+
    '<span class="sp"><span class="who">Ren:</span> I want to tell them about the old houses. Some of them are more than a hundred years old, and I want to keep them for the future.</span>'+
    '<span class="sp"><span class="who">Mr. Carter:</span> Keeping old houses is not （　あ　）, but it is an important thing.</span>'+
    '<span class="sp"><span class="who">Ren:</span> I think so.</span>'+
    '<span class="sp"><span class="who">Mr. Carter:</span> OK, I\'m going to talk about myself. When I first came to Wakaba, I saw the river and the old town, and I loved them at once. So I decided to live here.</span>'+
    '<span class="sp"><span class="who">Ren:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Mr. Carter:</span> Good question. I came here three years ago. I wanted to learn about old Japanese towns, and Wakaba was the best place for me.</span>'+
    '<span class="sp"><span class="who">Ren:</span> And now you are teaching us English in this town.</span>'+
    '<span class="sp"><span class="who">Mr. Carter:</span> Yes, and I\'m very happy. I hope you\'ll love your town and tell others about it.</span>',
    note:'語注：view ながめ／around the world 世界中で／keep 〜を守る・残す／at once すぐに' },
  { passage:'<b>Sara の感想</b><br>There are many good things in Wakaba. Like Yuki, I want to tell visitors about the river boats. '+
            'I （　X　）, too, so I want to show them the beautiful old streets from the water.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語4語を、話し合いの中の Yuki の発言から抜き出して書きなさい。<br>"+E("Yuki likes the boats because people can [　　] from the water."),
      answers:["see the old streets"], hint:"英語4語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("bad"),E("difficult"),E("easy"),E("sad")], answer:2 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("How much is this house?"), E("Whose bag is this?"),
                E("When did you come to Wakaba?"), E("What time is it now?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Daichi's father gave him a pair of Wakaba jeans."),
                E("Yuki has never ridden the river boat."),
                E("Mr. Carter came to Wakaba to teach Japanese."),
                E("Ren wants to take down the old houses.") ], answer:0 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("am a soccer fan"), E("like the river boats"),
                E("want to study music"), E("don't like old towns") ], answer:1 } ]}
]},

/* ===== 大問5 スピーチ（読解） ===== */
{ no:5, title:"次の英文は、ワカバ中学校のミウ(Miu)が発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Miu. Today I want to talk about my experience of learning to make blue jeans in our town, Wakaba. '+
    'Last year, I could not make anything by myself. But now I really enjoy making things by hand. I want to share my story with you.<br><br>'+
    '<b>②</b> Last spring, I joined a weekend class at the denim studio. At first, the work was very hard for me. '+
    'My jeans were not beautiful, and I often made mistakes. I sometimes wanted to stop going to the class. '+
    'One day, an old worker at the studio saw me. He said, "Don\'t give up. If you keep trying, your hands will remember." '+
    'These words <u>(お) ___</u> my mind. I decided to try harder.<br><br>'+
    '<b>③</b> After that, I practiced very hard. The old worker also helped me a lot. '+
    'He taught me how to cut the cloth and use the machine. He said, "You should not work too fast. Slow work makes your jeans stronger." '+
    'I followed his advice. Little by little, my jeans became better.<br><br>'+
    '<b>④</b> Some people say that jeans are only clothes. That\'s true. <u>④ Strong jeans are a good way to enjoy a long walk by the river</u>. '+
    'But they are more than that for me. <u>③ ( me / the town / taught / many things )</u>. '+
    'I learned that I should not stop trying. When I keep making things, I can <u>(か) ___</u> the joy of my work. '+
    'So please don\'t give up, and find something you love!',
    passageEn:true,
    note:'語注：by hand 手作業で／give up あきらめる／mistake 間違い／cloth 布／advice 助言',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お changed　か lose"), E("お changed　か feel"),
                E("お lost　か lose"), E("お lost　か feel") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "ミウは一生けんめい練習した。", "年配の職人が布の切り方を教えてくれた。",
                "職人はできるだけ速く作業すべきだと言った。", "ミウのジーンズは少しずつよくなった。" ], answer:2 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["me","the town","taught","many things"], answer:"The town taught me many things",
      display:"The town taught me many things" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語2語を、第2段落中から抜き出して書きなさい。<br>"+E("The old worker told Miu not to （　え　）."),
      answers:["give up"], hint:"第2段落の語・英語2語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>じょうぶなジーンズは、川沿いの長い（　①　）を楽しむためのよい（　②　）だ。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "散歩（さんぽ）","食事（しょくじ）","ねむり","会議" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "方法（ほうほう）","問題","場所","言葉" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Miu could not make anything by herself last year."),
                E("Miu never wanted to stop going to the class."),
                E("The old worker told Miu to keep trying."),
                E("The old worker said that Miu should work as fast as possible."),
                E("Miu thinks jeans are only clothes for her.") ], answer:[0,2] } ]}
]}

]};
