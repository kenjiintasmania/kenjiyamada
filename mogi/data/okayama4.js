/* data/okayama4.js ─ 岡山県スタイル 模擬テスト④（reference-only・完全オリジナル）
   出典：岡山県公立高校入試 英語の「傾向のみ」を参照（過去問の再現はしない）。
   出題形式・問題数・配点バランスを傾向に合わせ、本文・設問・選択肢はすべて新規創作。
   テーマ：桃狩り／果物農園／地元のフルーツを使ったカフェ（架空の町 Wakaba/Midori/Hikari）。
   ※ okayama1〜3 と人物名・数値・場面を重複させない。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "岡山県スタイル 模擬テスト④",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ（1回読み・2問） */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the sign. The peach farm opens at nine in the morning.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合うかんばん（農園の開園時刻）はどれですか。",
      choices:["桃農園は午前9時に開く。","桃農園は午前8時に開く。",
               "桃農園は午前10時に開く。","ぶどう農園は午前9時に開く。"], answer:0 } ] },
  { script:'(2) Look at the basket. There are four peaches and two apples in it.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う絵（かごの中身）はどれですか。",
      choices:["桃4個・りんご2個","桃2個・りんご4個","桃4個・りんご4個","桃2個・りんご2個"], answer:0 } ] },

  /* 問題B：チャイムの応答（2回読み・2問） */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> These peaches look so fresh. May I try one?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Sure. Please go ahead."), E("Yes, I picked the apples."),
                E("No, I didn't visit the farm."), E("It's on the third floor.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> How many peaches did you pick at the farm today?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I picked about ten."), E("Yes, I have."),
                E("No, thank you."), E("It's hers.") ], answer:0 } ] },

  /* 問題C：メモの空所補充（英語1語×3・2回読み） */
  { intro:"問題C　農園の人が、桃狩り体験の注意を話しています。ナオ(Nao)が書いたメモの（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Welcome to our peach farm. First, please wash your <b>hands</b> before you start.</span>'+
      '<span class="sp">Each visitor can pick <b>five</b> peaches today, so please be careful.</span>'+
      '<span class="sp">We will meet again at the white <b>gate</b> at eleven o\'clock.</span>',
    passage:'<b>ナオのメモ</b><br>・始める前に（　あ　）を洗う<br>・1人（　い　）個まで桃をつめる<br>・11時に白い（　う　）に集合',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）両手", answers:["hands"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）5", answers:["five"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）門・ゲート", answers:["gate"], hint:"英語1語" } ] },

  /* 問題D：説明＋人物発言→(1)内容一致選択, (2)英語2語の応答 */
  { intro:"問題D　あなたとクラスメイトのサキ(Saki)が、果物農園の体験コースについての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">This Saturday we will have a fruit-picking event at Wakaba Farm. You can choose one course.</span>'+
      '<span class="sp">Course A is the peach course. Course B is the grape course.</span>'+
      '<span class="sp">The event starts at ten in the morning. Please bring a hat and a small towel.</span>'+
      '<span class="sp">After picking fruit, we will make fresh juice together.</span>'+
      '<span class="sp"><span class="who">Saki:</span> I really love grapes. Which course will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["イベントは日曜日に行われる。","イベントは午前10時に始まる。",
               "ぼうしを持ってくる必要はない。","桃狩りの後にケーキを作る。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"サキの発言に対するあなたの答えを完成させなさい。<br>"+E("I really love grapes. So I will choose （　　）.")+"（英語2語）",
      answers:["course b"], hint:"英語2語" } ] }
]},

/* ===== 大問2 ちらし＋対話 ===== */
{ no:2, title:"中学生のタイガ(Taiga)とユア(Yua)が、ミドリ町の「桃狩り体験」のちらしを見ながら話しています。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Midori Peach Picking Day!</h4>'+
    '<div class="note">Come and enjoy picking sweet peaches at Midori Farm!</div>'+
    '<table><tr><td>Date</td><td>August 9, 2026</td></tr>'+
    '<tr><td>Morning time</td><td>9:00 a.m. – 11:00 a.m.</td></tr>'+
    '<tr><td>Afternoon time</td><td>1:00 p.m. – 3:00 p.m.</td></tr></table>'+
    '<table style="margin-top:6px"><tr><th>Ticket</th><th>Price</th></tr>'+
    '<tr><td>Junior high student</td><td>¥600</td></tr>'+
    '<tr><td>Adult</td><td>¥900</td></tr>'+
    '<tr><td>Peach juice (one cup)</td><td>¥200</td></tr></table>'+
    '<div class="note">You can pick five peaches with one ticket. '+
    'Free bus from Midori Station leaves at 8:30 a.m.　→ You can apply here.</div>',
    passage:
    '<span class="sp"><span class="who">Taiga:</span> Look, Yua. Did you know about this event?</span>'+
    '<span class="sp"><span class="who">Yua:</span> Yes. Midori Farm grows the （　あ　） sweet peaches in our town.</span>'+
    '<span class="sp"><span class="who">Taiga:</span> Sounds nice. I want to join, but I\'m not （　い　） that I can pick good ones.</span>'+
    '<span class="sp"><span class="who">Yua:</span> You don\'t need to worry about that. The farm people will help us.</span>'+
    '<span class="sp"><span class="who">Taiga:</span> Good. Then let\'s go together with my little brother. He is seven years old.</span>'+
    '<span class="sp"><span class="who">Yua:</span> Your brother is not a junior high student, so he doesn\'t need a ticket. Children under twelve can join for free.</span>'+
    '<span class="sp"><span class="who">Taiga:</span> Oh, that\'s good news. So we need two student tickets. The peaches at this farm are the <u>(う) sweet</u> I have ever eaten.</span>'+
    '<span class="sp"><span class="who">Yua:</span> I agree. Let\'s also try one cup of peach juice each after picking.</span>'+
    '<span class="sp"><span class="who">Taiga:</span> Nice. The free bus is helpful, too. We can meet at the station before it leaves.</span>'+
    '<span class="sp"><span class="who">Yua:</span> The event is two days from now. I\'m （　い　） we will have a great time.</span>',
    note:'語注：grow 〜を育てる／worry about 〜 〜を気にする／under 〜 〜未満の／apply 申し込む',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"（あ）に入れるのに最も適当な英語1語を書きなさい。", answers:["most"], hint:"the （　） sweet（最も〜）" },
    { type:"fill", label:"(2)い", pt:3, stem:"2か所の（い）に共通して入る最も適当な英語1語を書きなさい。", answers:["sure"], hint:"I'm not 〜 / I'm 〜" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) sweet を、最も適当な形に変えて1語で書きなさい。", answers:["sweetest"], hint:"the 〜 I have ever eaten" },
    { type:"mcq", label:"(4)", pt:3, stem:"タイガとユアの2人が当日に支払う合計金額として最も適当なのは、ア〜エのどれですか。（弟は無料）",
      choices:[ E("¥1,200"), E("¥1,400"), E("¥1,600"), E("¥2,100") ], answer:2 },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("People can pick five peaches with one ticket."),
                E("Taiga's little brother needs a student ticket."),
                E("The free bus leaves from Midori Station at nine."),
                E("Taiga and Yua are talking on August 9.") ], answer:0 } ]}
]},

/* ===== 大問3 日記の英作文（並べかえ2問） ===== */
{ no:3, title:"ヒナ(Hina)には、ミア(Mia)という友達がいます。次は、ある日のヒナの日記の一部と、その日のできごとを表したイラストです。日記とイラストの内容に合うように、(1)(2)の語を正しく並べかえて、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：ミアの家の庭に大きな桃の木があり、二人で木に実った桃を見上げている。夜には二人でジャムを作っている。",
    passage:
    'August 9<br><br>'+
    'This morning, Mia took me to her garden. There was a big tree there, and it was full of peaches. '+
    'I was surprised and said, "<u>(1)</u>!" Mia smiled and said, "Yes. My grandfather planted it ten years ago." '+
    'We picked some peaches together. In the evening, we made <u>(2)</u> with them. It was sweet and delicious.',
    passageEn:true,
    note:'語注：garden 庭／plant 〜を植える／jam ジャム',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：たくさんの桃が実った木を見上げて驚く場面。次の語を正しく並べて英文を完成させなさい。",
      words:["tree","beautiful","a","What"], answer:"What a beautiful tree" },
    { type:"wordorder", label:"(2)", pt:5, stem:"夜に二人で桃のジャムを作る場面です（we made のあとの部分）。次の語を正しく並べて英文を完成させなさい。",
      words:["jam","peach","some"], answer:"some peach jam" } ]}
]},

/* ===== 大問4 話し合い＋感想 ===== */
{ no:4, title:"リー(Mr. Lee)先生と中学校の英語部の Lucy(ルーシー)、Noah(ノア)、Yuna(ユナ)が、それぞれの地域でとれる果物について話し合いをしています。次の英文は、話し合いと、それを聞いて Kaito が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Lee:</span> Good afternoon, everyone. Today, let\'s talk about local fruit in your areas. Lucy, can you tell us first?</span>'+
    '<span class="sp"><span class="who">Lucy:</span> OK. In my city in America, many farmers grow apples. In autumn, we visit an apple farm and pick apples with our family.</span>'+
    '<span class="sp"><span class="who">Noah:</span> I\'m from Spain. In my town, people grow a lot of oranges. When I was a child, I often ate fresh oranges from my grandmother\'s garden.</span>'+
    '<span class="sp"><span class="who">Yuna:</span> That\'s nice. In Hikari Town, we are famous for peaches. Every summer, many people come to pick sweet peaches at our farms.</span>'+
    '<span class="sp"><span class="who">Mr. Lee:</span> Picking fruit is a good way to （　え　） nature. But some people say young people don\'t know where their fruit comes from. Is that true?</span>'+
    '<span class="sp"><span class="who">Yuna:</span> My cousin lives in a big city, and he sometimes buys fruit only at a supermarket.</span>'+
    '<span class="sp"><span class="who">Noah:</span> Really? （　お　）</span>'+
    '<span class="sp"><span class="who">Yuna:</span> He buys apples and oranges, but he has never picked them at a farm.</span>'+
    '<span class="sp"><span class="who">Lucy:</span> <u>(か) I became interested in Japanese peaches</u> when I read a book about Hikari Town. In the book, children picked peaches and made juice. So I tried a peach cake in America.</span>'+
    '<span class="sp"><span class="who">Noah:</span> Sounds great. I want to make orange juice in Spain, but I miss the peaches here.</span>'+
    '<span class="sp"><span class="who">Yuna:</span> Then, when you visit Hikari Town, let\'s pick peaches together.</span>'+
    '<span class="sp"><span class="who">Mr. Lee:</span> Fruit in each area is different, but enjoying it with friends is always wonderful.</span>',
    note:'語注：farmer 農家／local 地元の／cousin いとこ／supermarket スーパーマーケット' },
  { passage:'<b>Kaito の感想</b><br>Fruit in different areas is interesting. Like Yuna, I am proud of the peaches in my town. '+
            'I want to （　き　） like Lucy\'s family. I have never done that, so it sounds like fun.', passageEn:true,
    items:[
    { type:"mcq", label:"(1)え", pt:3, stem:"（え）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("buy"), E("enjoy"), E("write"), E("clean") ], answer:1 },
    { type:"mcq", label:"(2)お", pt:3, stem:"（お）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("What does he buy at the supermarket?"), E("Where does he grow peaches?"),
                E("When does he visit your farm?"), E("How does he make juice?") ], answer:0 },
    { type:"fill", label:"(3)", pt:4, stem:"下線部(か)の内容を表すように、本文中から連続する英語6語を抜き出して書きなさい。",
      answers:["i became interested in japanese peaches"], hint:"英語6語" },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Lucy picks apples with her family in autumn."),
                E("Noah grows peaches in Spain now."),
                E("Yuna's cousin often picks fruit at a farm."),
                E("Lucy tried a peach cake in Japan.") ], answer:0 },
    { type:"mcq", label:"(5)", pt:3, stem:"感想の（き）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("buy oranges at a supermarket"), E("pick apples at a farm"),
                E("sell peaches in a big city"), E("read a book about Spain") ], answer:1 } ]}
]},

/* ===== 大問5 長文スピーチ（読解） ===== */
{ no:5, title:"次の英文は、ユウタ(Yuta)が地元のフルーツカフェについて発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Yuta. Today I want to talk about a small café in Wakaba Town. '+
    'It is run by my aunt, and it uses only local fruit. I learned something important there, so I want to share my story.<br><br>'+
    '<b>②</b> Last spring, my aunt opened the café near Wakaba Station. At first, only a few people came. '+
    'She felt sad, and one day she said to me, "Maybe I should close this café." '+
    'I didn\'t want her to give up. I said, "Your fruit cakes are wonderful. Please don\'t stop." '+
    'Her words and my words <u>(お) ___</u> in my mind for a long time.<br><br>'+
    '<b>③</b> After that, we thought about the café together. My aunt makes a peach cake every summer, and it is very popular. '+
    'But she only sold cakes. So I said, "Why don\'t you show people how you make them?" '+
    'She liked my idea. We held a small cooking event for children, and they made fruit juice with her. '+
    'Little by little, more people began to visit the café.<br><br>'+
    '<b>④</b> Some people say that a café is only a place to eat. That\'s true. <u>④ A café is a good place to enjoy sweet cakes</u>. '+
    'But it is more than that for my aunt. <u>③ ( me / the café / many things / taught )</u>. '+
    'I learned that we should not give up easily. When we keep trying, we can <u>(か) ___</u> our dream. '+
    'So please visit a local shop in your town, and find something you love!',
    passageEn:true,
    note:'語注：run 〜を経営する／aunt おば／give up あきらめる／hold 〜を開く／popular 人気のある',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お stayed　か lose"), E("お stayed　か reach"),
                E("お left　か lose"), E("お left　か reach") ], answer:1 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "おばは夏に桃のケーキを作る。", "おばはケーキだけを売っていた。",
                "子ども向けの料理イベントを開いた。", "おばはカフェを閉めることに決めた。" ], answer:3 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["me","the café","many things","taught"], answer:"The café taught me many things",
      display:"The café taught me many things" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語2語を、第2段落中から抜き出して書きなさい。<br>"+E("Yuta didn't want his aunt to （　え　）."),
      answers:["give up"], hint:"第2段落の語・英語2語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>カフェは、あまいケーキを（　①　）のによい（　②　）だ。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "楽しむ","作る","売る","運ぶ" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "場所","時間","本","道" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Yuta's aunt opened her café near Wakaba Station last spring."),
                E("Many people came to the café from the first day."),
                E("Yuta told his aunt to close the café."),
                E("Children made fruit juice with Yuta's aunt at the event."),
                E("Yuta thinks people should give up easily.") ], answer:[0,3] } ]}
]}

]};
