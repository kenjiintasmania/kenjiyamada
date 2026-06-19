/* data/chu3_4.js ─ 中3 第4回 模擬テスト
   出典：正進社 過去問「3年 第4回」（大問1〜5・リスニング問題A〜D）。
   出題傾向・問題数は完全一致。テーマ：食べ物／アイスクリーム・ベーカリー店／料理部。
   ※この回に必要な単語は「中3 第4回 答えの単語テスト」に対応。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 第4回 模擬テスト",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  { intro:"問題A　放送を聞いて、内容に合う絵をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the sign. This bakery opens at eight in the morning.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合うかんばん（開店時刻）はどれですか。",
      choices:["8時開店","9時開店","7時開店","10時開店"], answer:0 } ] },
  { script:'(2) On the plate, there are three cookies and one piece of cake.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う絵はどれですか。",
      choices:["クッキー3枚・ケーキ1切れ","クッキー1枚・ケーキ3切れ","クッキー3枚・ケーキ3切れ","クッキー1枚・ケーキ1切れ"], answer:0 } ] },

  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> This cake looks delicious. Can I have one more piece?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Of course. Help yourself."), E("Yes, I washed the dishes."), E("No, I didn't make it yesterday."), E("It is on the second floor.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> What did you make in cooking club today?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("We made strawberry ice cream."), E("Yes, I have."), E("No, thank you."), E("It's hers.") ], answer:0 } ] },

  { intro:"問題C　先生が料理部の活動について話しています。ケンタ(Kenta)が書いたメモの（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">OK, listen, everyone. Today in cooking club, we will make <b>bread</b> together.</span>'+
      '<span class="sp">Each group needs <b>four</b> eggs, so please check them now.</span>'+
      '<span class="sp">We will meet in the cooking <b>room</b> at three thirty.</span>',
    passage:'<b>ケンタのメモ</b><br>・今日はみんなで（　あ　）を作る<br>・各グループに卵が（　い　）個必要<br>・料理（　う　）に3時半に集合',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）パン", answers:["bread"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）4", answers:["four"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）部屋／室", answers:["room"], hint:"英語1語" } ] },

  { intro:"問題D　あなたとクラスメイトのナンシー(Nancy)が、アイスクリーム作り体験についての説明を聞いて話しています。(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next Sunday we will have an ice-cream making event at the school kitchen. You can choose one group.</span>'+
      '<span class="sp">Group A will make vanilla ice cream. Group B will make chocolate ice cream.</span>'+
      '<span class="sp">The event starts at ten in the morning. Please bring an apron and a towel.</span>'+
      '<span class="sp">After the event, we will eat the ice cream together.</span>'+
      '<span class="sp"><span class="who">Nancy:</span> I want to make vanilla ice cream. Which group will you choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["イベントは土曜日に行われる。","イベントは午前10時に始まる。",
               "タオルを持ってくる必要はない。","イベントの後にジュースが出される。"], answer:1 },
    { type:"fill", label:"(2)", pt:3, stem:"ナンシーの発言に対するあなたの答えを完成させなさい。<br>"+E("I want to make chocolate ice cream. So I will choose （　　）.")+"（英語2語）",
      answers:["group b"], hint:"英語2語" } ] }
]},

/* ===== 大問2 メニュー表＋対話 ===== */
{ no:2, title:"ケン(Ken)とミア(Mia)が、歩きながら話しています。次のメニュー表と会話を読み、(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>アイスクリームショップ・メニュー表</h4>'+
    '<table><tr><th>セット</th><th>ねだん</th><th>内容</th></tr>'+
    '<tr><td>Set A</td><td>¥500</td><td>Ice cream・Cookie・Drink</td></tr>'+
    '<tr><td>Set B</td><td>¥600</td><td>Pancake・Cookie・Drink</td></tr>'+
    '<tr><td>Set C</td><td>¥700</td><td>Pancake・Ice cream・Drink</td></tr>'+
    '<tr><td>Set D</td><td>¥1,100</td><td>Ice cream×2・Cookie・Drink×2</td></tr></table>'+
    '<table style="margin-top:6px"><tr><th>サイドメニュー</th><th></th></tr>'+
    '<tr><td>Drink　S / M / L</td><td>¥100 / ¥150 / ¥200</td></tr>'+
    '<tr><td>Cookie</td><td>¥120</td></tr><tr><td>Pancake</td><td>¥350</td></tr><tr><td>Ice cream</td><td>¥250</td></tr></table>',
    passage:
    '<span class="sp"><span class="who">Ken:</span> The concert doesn\'t start until （あ） o\'clock, so we have some free time. Shall we find an ice-cream shop?</span>'+
    '<span class="sp"><span class="who">Mia:</span> Good idea. It\'s one thirty now. We have thirty minutes, so there is （い） time to eat. But it takes about ten minutes to walk to the hall.</span>'+
    '<span class="sp"><span class="who">Ken:</span> Sure. There is a nice ice-cream shop over there. Let\'s go.</span>'+
    '<span class="sp"><i>At the shop.</i></span>'+
    '<span class="sp"><span class="who">Mia:</span> Look at the menu. Which set looks good to you?</span>'+
    '<span class="sp"><span class="who">Ken:</span> Hmm, Set D looks nice. How about sharing it? It comes with （あ） scoops of ice cream and （あ） drinks.</span>'+
    '<span class="sp"><span class="who">Mia:</span> That\'s a bit much for me. We <u>(う) eat</u> a big lunch two hours ago, so I\'m not very hungry.</span>'+
    '<span class="sp"><span class="who">Ken:</span> Then how about Set B and a medium drink? We can share the pancake and cookie.</span>'+
    '<span class="sp"><span class="who">Mia:</span> Sounds good.</span>'+
    '<span class="sp"><span class="who">Ken:</span> OK, I\'ll go and order for us. I\'ll pay first — could you save our seats, Mia?</span>'+
    '<span class="sp"><span class="who">Mia:</span> Sure. I\'ll give you my half afterwards.</span>',
    note:'語注：over there あそこに／scoop （アイスの）すくい一盛り／medium Mサイズの／pay 支払う／half 半分',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"3か所の（あ）に共通して入れる最も適当な英語1語を書きなさい。", answers:["two"], hint:"〜o'clock / 〜 scoops" },
    { type:"fill", label:"(2)い", pt:3, stem:"（い）に入れるのに最も適当な英語1語を書きなさい。", answers:["enough"], hint:"〜 time to eat（じゅうぶんな）" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う) eat を、最も適当な形に変えて1語で書きなさい。", answers:["ate"], hint:"two hours ago" },
    { type:"mcq", label:"(4)", pt:3, stem:"ケンがレジで支払う金額として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("750円"), E("850円"), E("950円"), E("1,100円") ], answer:0 },
    { type:"mcq", label:"(5)", pt:4, stem:"メニュー表や会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("There are only three types of set menus at the shop."),
                E("Ken and Mia will go to the concert after they eat at the shop."),
                E("Mia wants to eat a lot because she is very hungry."),
                E("Ken and Mia will not pay for the food.") ], answer:1 } ]}
]},

/* ===== 大問3 日記の英作文 ===== */
{ no:3, title:"ハル(Haru)には、ジョー(Joe)という友達がいます。次は、ある日曜日のハルの日記の一部と、その日のできごとを表したイラストです。日記とイラストの内容に合うように、(1)に4語以上、(2)に3語以上の英語を書き、日記を完成させなさい。", groups:[
  { sceneNote:"イラスト：ハルの部屋に大きな模型の車のたながあり、二人でいっしょに車を見ている。",
    passage:
    'October 12<br><br>'+
    'Joe visited my house in the afternoon. When he came into my room, he said, "What a big shelf of model cars! '+
    '<u>(1)</u> you have?" I said, "About three hundred." I showed him some of my favorite model cars. We enjoyed looking at them together. '+
    'At four thirty, he said, "I want to stay here longer, but I have <u>(2)</u> before five. I\'m going to bake cookies with my mother." '+
    'I wanted to talk with him more, but he left my house.',
    passageEn:true,
    note:'語注：shelf たな／model car 模型の車／three hundred 300',
    items:[
    { type:"en", label:"(1)", pt:6, stem:"日記とイラストに合うように、ジョーのことばを4語以上で書きなさい。", minWords:4,
      model:"How many model cars do you have?", tip:"ハルが「約300」と答えている。数をたずねる文。" },
    { type:"en", label:"(2)", pt:5, stem:"日記の流れに合うように、3語以上で書きなさい。", minWords:3,
      model:"to go home", tip:"5時前に家ですること。「〜しなければならない」have to の続き。" } ]}
]},

/* ===== 大問4 話し合い＋感想 ===== */
{ no:4, title:"ブラウン(Brown)先生と中学校の英語部の Olivia(オリビア)、Noah(ノア)、Yuki(ユキ)が、それぞれの国の学校給食について話し合いをしています。次の英文は、話し合いと、それを聞いて Daiki が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Brown:</span> Good afternoon, everyone. Let\'s talk about school lunch in your countries. Olivia, can you tell us first?</span>'+
    '<span class="sp"><span class="who">Olivia:</span> OK. In America, many students buy lunch in the school cafeteria. They can choose pizza or a sandwich. Some students bring lunch from home.</span>'+
    '<span class="sp"><span class="who">Noah:</span> I\'m from Italy. In Italy, many students eat pasta for lunch. When I was in Italy, I sometimes ate lunch with my classmates in a big dining hall.</span>'+
    '<span class="sp"><span class="who">Yuki:</span> That\'s interesting. In Japan, students eat the same school lunch in their classroom. We often clean the room and serve the food to each other.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> School lunch is a good chance to （　え　） together. But some people say students leave a lot of food now. Is that true?</span>'+
    '<span class="sp"><span class="who">Yuki:</span> My sister is a high school student, and she sometimes leaves her vegetables.</span>'+
    '<span class="sp"><span class="who">Noah:</span> Every day?</span>'+
    '<span class="sp"><span class="who">Yuki:</span> （　お　）</span>'+
    '<span class="sp"><span class="who">Yuki:</span> Our cook makes a salad every day, but she sometimes doesn\'t like the taste.</span>'+
    '<span class="sp"><span class="who">Olivia:</span> <u>(か) I became interested in Japanese lunch</u> when I watched a Japanese video. In the video, students carried the food and ate together. So I tried curry rice in America.</span>'+
    '<span class="sp"><span class="who">Noah:</span> Really? I want to try a Japanese school lunch in Italy, but I can\'t find natto.</span>'+
    '<span class="sp"><span class="who">Yuki:</span> Then, when you visit Japan, let\'s eat school lunch together.</span>'+
    '<span class="sp"><span class="who">Mr. Brown:</span> School lunches in each country are different, but eating with friends is always nice.</span>',
    note:'語注：cafeteria 食堂／serve 〜を配る／leave 〜を残す／natto 納豆' },
  { passage:'<b>Daiki の感想</b><br>School lunches in some countries are different, and all of them are interesting. '+
            'I want to （　き　） like students in Italy. I can\'t do that in my small classroom in Japan.', passageEn:true,
    items:[
    { type:"mcq", label:"(1)え", pt:3, stem:"（え）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("run"), E("buy"), E("eat"), E("write") ], answer:2 },
    { type:"mcq", label:"(2)お", pt:3, stem:"（お）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Who makes her lunch?"), E("Where does she buy it?"),
                E("How does she cook pasta?"), E("When does she try curry?") ], answer:0 },
    { type:"fill", label:"(3)", pt:4, stem:"下線部(か)の内容を表すように、本文中から連続する英語6語を抜き出して書きなさい。",
      answers:["i became interested in japanese lunch"], hint:"英語6語" },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("In America, all students bring lunch from home."),
                E("Noah sometimes ate lunch in a big dining hall in Italy."),
                E("Yuki's sister never eats school lunch."),
                E("Olivia tried curry rice in Japan.") ], answer:1 },
    { type:"mcq", label:"(5)", pt:3, stem:"感想の（き）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("buy pizza in the cafeteria"), E("eat lunch in a big dining hall"),
                E("leave my vegetables every day"), E("serve food to my classmates") ], answer:1 } ]}
]},

/* ===== 大問5 原稿（読解） ===== */
{ no:5, title:"次の英文は、ソウタ(Sota)が書いた原稿です。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> In my first year of junior high, I joined the cooking club. I liked food, so I wanted to make sweets well.<br><br>'+
    '<b>②</b> Three months later, in August, we had a cooking contest. It was my first one. I decided to make my best cake. '+
    'I practiced hard in the cooking room every day. I read many books by famous cooks, and I asked some members how to bake better. '+
    'When I finished making my cake, I thought I was （　お　）. However, our team didn\'t win any prizes. '+
    'My friend, Mei, said, "I think your cake needs something." I said, "What is it?" She said nothing. '+
    'I thought, "Maybe I should stop cooking because we didn\'t win."<br><br>'+
    '<b>③</b> That night, my mother heard my story. She said, "Why do you look so （　か　）?" I told her about the contest. '+
    'She said, "How did you feel when you cooked?" I said, "I felt happy when I made something for someone." '+
    'She said, "Why not put that feeling into your cooking? I think it will <u>(き) ( make / your / better / cake )</u>." '+
    'I said, "Thank you. But my skills are not good." She said, "It\'s all right, Sota. You should keep cooking if you truly love food. '+
    'If you keep cooking, your skills will improve." I said, "<u>(く) That</u> may be right. I\'ll try again."<br><br>'+
    '<b>④</b> The next month, I cooked with my feelings. I thought about the person who would eat my cake. Finally, at the next contest, our team got a prize.<br><br>'+
    '<b>⑤</b> Of course, I sometimes think making sweets well is difficult. But now, I don\'t think that I （　け　） when we can\'t win. '+
    'I don\'t cook for prizes. I will keep cooking in high school.',
    passageEn:true,
    note:'語注：cooking club 料理部／contest コンテスト／prize 賞／keep 〜ing 〜し続ける／sweets スイーツ・お菓子',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"第2段落について、本文で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "毎日料理室で練習した。","有名な料理人の本を読んだ。",
                "よい材料を買いに行った。","部員に上手な作り方をたずねた。" ], answer:2 },
    { type:"mcq", label:"(2)", pt:4, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お bad　か sad"), E("お perfect　か sad"),
                E("お bad　か excited"), E("お perfect　か excited") ], answer:1 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部(き)の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["make","your","better","cake"], answer:"make your cake better",
      display:"make your cake better" },
    { type:"jp", label:"(4)①", pt:4, stem:"下線部(く)の具体的内容を説明する次の文の①・②に、適当な日本語を入れなさい。<br>ソウタが本当に（　①　）ならば、料理を続けるべきだ。料理を続ければ、（　②　）ことができる、という母のことば。<br>①にあてはまる日本語：",
      model:"食べ物が好き", tip:"if you truly love food より。" },
    { type:"jp", label:"(4)②", pt:4, stem:"②にあてはまる日本語：",
      model:"（料理の）技術を上達させる", tip:"your skills will improve より。" },
    { type:"fill", label:"(5)け", pt:4, stem:"（け）に入れるのに最も適当な英語3語を、本文中から抜き出して書きなさい。",
      answers:["should stop cooking"], hint:"英語3語（第2段落より）" },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オから二つ選びなさい。",
      choices:[ E("Sota joined the cooking club in his first year of junior high school."),
                E("Mei told Sota the team didn't win because he didn't practice hard."),
                E("Sota's mother won many prizes when she was young."),
                E("Sota's team got a prize at the next contest."),
                E("Sota will stop cooking in high school.") ], answer:[0,3] } ]}
]}

]};
