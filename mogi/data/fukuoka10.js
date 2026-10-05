/* data/fukuoka10.js ─ 福岡県スタイル 模擬テスト⑩（60点満点・26問）
   参照：factory/inputs/fukuoka_notes.md／fukuoka_pattern.json（福岡県公立入試の「傾向のみ」を参照）。
   骨格は fukuoka1.js と同一（大問1〜5・26問・20-8-10-14-8）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。

   ★題材：町の伝統の祭り「カグラ光の祭り」の担い手不足と若い人の参加（探究：ちょうちんを運ぶ人の年れい）。
   ★舞台：カグラ町（Kagura Town・架空）／登場人物：Hinata, Yuma, Ms. Lane（ALT）, Mr. Kai（祭りの会長）。
     地名・学校名・祭りの名・人名はすべて**架空**。
   ★文法の軸：後置修飾（分詞・関係代名詞・不定詞の形容詞的用法）＋現在完了・受け身・比較。
   ⚠ 小問ごとの配点は公式「正答及び配点」PDFが未確認のため**仮置き**（fukuoka1 と同じ）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "福岡県スタイル 模擬テスト⑩",
fullMarks: 60,
sections: [

/* ===== 大問1 リスニング（問題1〜4・20点9問） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます。福岡県は問題1だけが1回読み、問題2〜4は2回読まれます）。", groups:[

  { intro:"問題1　放送を聞いて、内容に合うものをア〜エから1つ選びなさい。英文は1回だけ読まれます。",
    script:'(1) Look at the poster for the Kagura Light Festival. It will be held on Saturday, and it starts at six in the evening.',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"放送に合うものはどれですか。",
      choices:["祭りは土曜日に行われ、午後6時に始まる。","祭りは土曜日に行われ、午後7時に始まる。",
               "祭りは日曜日に行われ、午後6時に始まる。","祭りは金曜日に行われ、午後7時に始まる。"], answer:0 } ] },
  { script:'(2) Look at the picture. Hinata is holding a lantern, and Yuma is playing the flute.',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"放送に合う絵はどれですか。",
      choices:["ヒナタがちょうちんを持ち、ユウマがフルートをふいている。","ヒナタがフルートをふき、ユウマがちょうちんを持っている。",
               "ヒナタがちょうちんを2つ持ち、ユウマが太鼓をたたいている。","ヒナタがちょうちんを持ち、ユウマが太鼓をたたいている。"], answer:0 } ] },

  { intro:"問題2　ヒナタ(Hinata)とユウマ(Yuma)が、下の案内を見ています。放送を聞いて、それぞれの問いに答えなさい。英文は2回読まれます。",
    passage:'<b>カグラ光の祭り　ボランティア案内</b>'+
      '<table><tr><th>日</th><th>時こく</th><th>仕事</th></tr>'+
      '<tr><td>Friday</td><td>5:00 p.m.</td><td>Making lanterns</td></tr>'+
      '<tr><td>Saturday</td><td>11:00 a.m.</td><td>Making lanterns</td></tr>'+
      '<tr><td>Saturday</td><td>3:30 p.m.</td><td>Carrying lanterns</td></tr>'+
      '<tr><td>Sunday</td><td>11:00 a.m.</td><td>Cleaning the street</td></tr></table>',
    script:'(1) Hinata wants to make lanterns for the festival. She is busy on Friday, so she will go on another day. Which one should she choose?',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"ヒナタが選ぶのはどれですか。",
      choices:[ E("Friday, 5:00 p.m."), E("Saturday, 11:00 a.m."),
                E("Saturday, 3:30 p.m."), E("Sunday, 11:00 a.m.") ], answer:1 } ] },
  { script:'(2) Yuma will help carry the lanterns on Saturday. He will leave home at two thirty. It takes fifteen minutes to the town hall. What time will he get there?',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"ユウマが町役場に着く時こくはどれですか。",
      choices:[ E("2:15 p.m."), E("2:30 p.m."), E("2:45 p.m."), E("3:00 p.m.") ], answer:2 } ] },

  { intro:"問題3　ALTのレーン(Lane)先生が、自分の町の祭りについて話しています。ヒナタのメモの（あ）（い）に入る英語1語を書きなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, I\'m Ms. Lane. In my hometown, we have a big festival in January, not in October.</span>'+
      '<span class="sp">People make big lights with ice and put them along the street. They look very beautiful at night.</span>',
    passage:'<b>ヒナタのメモ</b><br>Ms. Lane の町の祭り<br>— held in （　あ　）, not in October<br>'+
            '— people make big lights with （　い　） and put them along the street',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）", answers:["January"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）", answers:["ice"], hint:"英語1語" } ] },

  { intro:"問題4　祭りの会長のカイさん(Mr. Kai)が、祭りを手伝う生徒たちに説明しています。放送を聞いて(1)〜(3)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, everyone. I\'m Kai, the leader of the Kagura Light Festival. Thank you for coming today. Our festival is more than one hundred years old. This year, we will carry two hundred lanterns through the town at night.</span>'+
      '<span class="sp">But now we have a problem. Many of the people who carry the lanterns are over sixty, and we don\'t have enough young people. So this year, we asked your school for help.</span>'+
      '<span class="sp">You can choose one of three jobs. The first group will make lanterns with old paper. The second group will carry the lanterns in the parade. The third group will play music in front of the parade.</span>'+
      '<span class="sp">Hinata has already chosen the first group. She said, "I want to learn old skills, so this is a good job for me."</span>'+
      '<span class="sp">Please come to the town hall by three thirty on the festival day. Don\'t forget to bring gloves.</span>',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["祭りは100年以上前から続いている。","祭りは今年で10年目になる。",
               "ちょうちんは毎年20個運ばれる。","手伝う生徒は3つの仕事をすべてする。"], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"カイさんが祭りについて困っていることとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Many of the people who carry the lanterns are over sixty."), E("The festival has too many young people."),
                E("Nobody wants to make lanterns."), E("The festival is only ten years old.") ], answer:0 },
    { type:"fill", label:"(3)", pt:4,
      stem:"ヒナタが1つ目のグループを選んだ理由を、放送の中の語を使って英語3語で書きなさい。<br>"+
           E("Hinata chose the first group because she wants to （　　）."),
      answers:["learn old skills"], hint:"英語3語（放送の中の言い方をそのまま使う）" } ] }
]},

/* ===== 大問2 短い対話の空所補充（8点4問） ===== */
{ no:2, title:"次の(1)〜(4)の対話について、それぞれの問いに答えなさい。", groups:[
  { note:"語注：lantern ちょうちん／jacket 上着／lead 〜を率いる",
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: Did you go to the Kagura Light Festival last night?<br>B: Yes. （　　）<br>A: That sounds beautiful."),
      choices:[ E("I stayed home and watched TV."), E("I will go there next year."),
                E("I saw hundreds of lanterns in the street."), E("It was too noisy for me.") ], answer:2 },
    { type:"mcq", label:"(2)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: Who is that man wearing a blue jacket?<br>B: （　　）<br>A: Oh, I want to talk to him."),
      choices:[ E("I like his jacket, too."), E("He is not here now."),
                E("I don't need a jacket."), E("He is the man who leads the festival.") ], answer:3 },
    { type:"fill", label:"(3)", pt:2,
      stem:"（　）内の語を、最も適当な形に変えて1語で書きなさい。<br>"+
           E("The festival is much ( old ) than our school."),
      answers:["older"], hint:"than のまえ・1語" },
    { type:"wordorder", label:"(4)", pt:2,
      stem:"次の語を正しく並べかえて、対話を完成させなさい。<br>"+
           E("A: What is this?<br>B: This is （　　）."),
      words:["made","a","lantern","of","old","paper"], answer:"a lantern made of old paper" } ]}
]},

/* ===== 大問3 対話文読解（10点5問） ===== */
{ no:3, title:"中学生のヒナタ(Hinata)とユウマ(Yuma)、ALTのレーン(Lane)先生が、祭りのボランティアを募集するちらしを見ながら話しています。次は、そのちらしと会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Kagura Light Festival — We Need Your Help!</h4>'+
    '<div class="note">Carry a lantern with us and light up our town!</div>'+
    '<table><tr><td>Date</td><td>Saturday, October 10</td></tr>'+
    '<tr><td>Parade</td><td>6:00 p.m. – 8:00 p.m.</td></tr>'+
    '<tr><td>Meeting place</td><td>Kagura Town Hall</td></tr>'+
    '<tr><td>Lanterns</td><td>200 paper lanterns</td></tr>'+
    '<tr><td>Dinner</td><td>500 yen　(students: 300 yen)</td></tr>'+
    '<tr><td>Leader</td><td>Mr. Kai, the leader of the festival</td></tr></table>'+
    '<div class="note">Anyone over twelve can join.<br>'+
    'If it rains, the parade will be held on October 11.</div>',
    passage:
    '<span class="sp"><span class="who">Yuma:</span> Hinata, look at this flyer. The Kagura Light Festival needs volunteers this year.</span>'+
    '<span class="sp"><span class="who">Hinata:</span> Really? My grandfather has carried a lantern in the parade for forty years. He says the number of （　あ　） people is getting smaller every year.</span>'+
    '<span class="sp"><span class="who">Yuma:</span> That\'s why they need us. Look, students can carry lanterns, too.</span>'+
    '<span class="sp"><span class="who">Ms. Lane:</span> What is the Kagura Light Festival? I have never heard of it.</span>'+
    '<span class="sp"><span class="who">Hinata:</span> It\'s a festival held in our town every October. People walk through the town with paper lanterns at night. The lanterns are made by hand with old paper.</span>'+
    '<span class="sp"><span class="who">Yuma:</span> Two hundred lanterns are carried in the parade. Each person carries two, so the festival needs a lot of people.</span>'+
    '<span class="sp"><span class="who">Ms. Lane:</span> Wow, two hundred lanterns! It must be beautiful. I have wanted to see a Japanese festival for a long time. Can I join, too?</span>'+
    '<span class="sp"><span class="who">Hinata:</span> Of course. Anyone over twelve can join. But the parade is long. It starts at six and ends at eight, so you should wear comfortable shoes.</span>'+
    '<span class="sp"><span class="who">Ms. Lane:</span> Two hours? That\'s OK. I want to see （　あ　） people and old people working together.</span>'+
    '<span class="sp"><span class="who">Yuma:</span> Then let\'s go to the town hall. <u>(い) ( the / who / leads / man / our festival )</u> is Mr. Kai. He will tell us what to do.</span>'+
    '<span class="sp"><span class="who">Hinata:</span> Good idea. Oh, dinner is five hundred yen, but it\'s three hundred yen for students.</span>'+
    '<span class="sp"><span class="who">Ms. Lane:</span> I\'m a teacher, so I\'ll pay five hundred yen. What will we do if it rains?</span>'+
    '<span class="sp"><span class="who">Yuma:</span> Don\'t worry. The parade will be held on the next day.</span>'+
    '<span class="sp"><span class="who">Ms. Lane:</span> I see. I\'m excited. Let\'s make our town bright together!</span>',
    note:'語注：lantern ちょうちん／parade 行列／volunteer ボランティア／town hall 町役場／flyer ちらし／by hand 手作業で',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"2か所の（あ）に共通して入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("young"), E("old"), E("busy"), E("famous") ], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"ちらしと会話から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("The parade starts at eight in the evening."), E("Students pay three hundred yen for dinner."),
                E("Ms. Lane will pay three hundred yen for dinner."), E("The parade will be canceled if it rains.") ], answer:1 },
    { type:"mcq", label:"(3)", pt:2, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Hinata's grandfather has carried a lantern for four years."), E("Yuma doesn't want to help the festival."),
                E("Ms. Lane didn't know about the festival before."), E("Each person carries four lanterns in the parade.") ], answer:2 },
    { type:"fill", label:"(4)", pt:2,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、会話の中から抜き出して書きなさい。<br>"+
           E("The lanterns are （　　） old paper."),
      answers:["made by hand with"], hint:"英語4語" },
    { type:"wordorder", label:"(5)", pt:2, stem:"下線部(い)の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["the","who","leads","man","our festival"], answer:"the man who leads our festival",
      display:"The man who leads our festival" } ]}
]},

/* ===== 大問4 長文読解（14点5問・グラフつき） ===== */
{ no:4, title:"次の英文は、カグラ中学校のヒナタ(Hinata)が、探究学習の発表で話した内容です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Hinata. Every October, our town has the Kagura Light Festival. '+
    'It has a history of more than one hundred years. My grandfather has carried a lantern in the parade for forty years. '+
    'Last year, he said to me, "The festival may stop in ten years." '+
    'I was surprised and wanted to know why. So I decided to study the people who carry the lanterns.<br><br>'+
    '<b>②</b> First, I asked Mr. Kai, the leader of the festival, for help. '+
    'He gave me two lists: a list of the people who carried lanterns ten years ago, and a list of last year. '+
    'I counted the people in each age group and made a graph. Making a graph was not easy, but Mr. Kai helped me a lot.<br><br>'+
    '<b>③</b> Look at the graph. Ten years ago, one hundred forty people carried lanterns, '+
    'and the largest group was people from forty to fifty-nine years old. '+
    'Last year, only one hundred people carried them. '+
    'The largest group was people over sixty, and there were only ten people under twenty. '+
    'The number of people from twenty to thirty-nine went down, too. It was forty ten years ago, but it was only fifteen last year. '+
    '<u>③ ( the / who / young people / join / number of )</u> the parade is getting smaller. '+
    'Many old people said, "We are getting tired, and we cannot carry the lanterns for a long time."<br><br>'+
    '<b>④</b> Then I asked forty students in my school, "Why don\'t you join the festival?" '+
    'Twenty-five of them said, "I didn\'t know that students could join it." '+
    'Only five students said, "I\'m not interested." Some students said, "I want to join if my friends join, too." '+
    'So I found that the biggest problem of the festival is a lack of information.<br><br>'+
    '<b>⑤</b> The festival needs young people, and young people need information. '+
    'So this year, our class made a poster and put it in the school and at the station. '+
    'As a result, twenty-three students carried lanterns in the parade. '+
    'Some of them said, "It was hard, but I was happy to walk with old people." '+
    'Mr. Kai said, "This is the biggest number of students in the history of the festival." '+
    'I think a festival is a place where old people and young people can meet. '+
    'Next year, I want to tell more students about the festival with my friends. I want to keep helping the festival.',
    passageEn:true,
    flyer:
    '<h4>グラフ：カグラ光の祭りで ちょうちんを運んだ人の数（年れい別）</h4>'+
    '<table><tr><th>年れい</th><th>20才未満</th><th>20〜39才</th><th>40〜59才</th><th>60才以上</th><th>合計</th></tr>'+
    '<tr><td>10年前</td><td>30</td><td>40</td><td>50</td><td>20</td><td>140</td></tr>'+
    '<tr><td>昨年</td><td>10</td><td>15</td><td>25</td><td>50</td><td>100</td></tr></table>',
    note:'語注：age 年れい／group 集団／list 一覧／lack 不足／information 情報／history 歴史／as a result その結果',
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"次の1文は、①〜⑤のどの段落の直後に入れるのが最も適当ですか。<br>"+
           E("The problem was not that students didn't like the festival."),
      choices:["①の直後","②の直後","③の直後","④の直後"], answer:3 },
    { type:"mcq", label:"(2)", pt:2, stem:"グラフと本文から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:["昨年は60才以上が最も多く、20才未満は10人だった。","10年前は60才以上が最も多かった。",
               "昨年は10年前より運んだ人の合計が多かった。","10年前の20才未満は10人だった。"], answer:0 },
    { type:"wordorder", label:"(3)", pt:2, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["the","who","young people","join","number of"],
      answer:"the number of young people who join",
      display:"The number of young people who join" },
    { type:"fill", label:"(4)", pt:4,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、第4段落から抜き出して書きなさい。<br>"+
           E("Hinata found that the biggest problem of the festival is （　　）."),
      answers:["a lack of information"], hint:"第4段落の語・英語4語" },
    { type:"mcqMulti", label:"(5)", pt:4, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Hinata's grandfather has carried a lantern for forty years."),
                E("Mr. Kai gave Hinata two lists of people who carried lanterns."),
                E("Last year, more than one hundred forty people carried lanterns."),
                E("Only five students said they didn't know about the festival."),
                E("Hinata wants to stop helping the festival.") ], answer:[0,1] } ]}
]},

/* ===== 大問5 条件英作文（8点3問・骨組みを作る形） ===== */
{ no:5, title:"祭りの会長のカイさん(Mr. Kai)から、「若い人にもっと祭りに参加してもらうために、中学生ができることを提案してほしい」とたのまれました。次のA〜Cから1つ選び、提案とその理由を伝える英文を作ります。ここでは B を選んだものとして、(1)〜(3)に答えなさい。", groups:[
  { passage:
    '<b>3つの案</b><br>'+
    'A： 学校でちらしを配る　'+E("give out flyers at school")+'<br>'+
    'B： 祭りについての動画を作る　'+E("make a video about the festival")+'<br>'+
    'C： ちょうちん作りの会を開く　'+E("hold a lantern-making event")+'<br><br>'+
    '<b>作る英文の組み立て</b><br>'+
    '① 何をすべきだと思うか　→　② その理由　→　③ 相手にどうなってほしいか',
    note:'語注：video 動画／flyer ちらし',
    items:[
    { type:"wordorder", label:"(1)", pt:2,
      stem:"①「わたしたちは祭りについての動画を作るべきだと思います。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["think","we","I","should","make","a video about the festival"],
      answer:"I think we should make a video about the festival",
      display:"I think we should make a video about the festival." },
    { type:"wordorder", label:"(2)", pt:2,
      stem:"②「祭りについて知らない生徒がたくさんいるからです。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["because","many","there","are","students","who don't know about the festival"],
      answer:"because there are many students who don't know about the festival",
      display:"because there are many students who don't know about the festival." },
    { type:"fill", label:"(3)", pt:4,
      stem:"③「わたしは若い人たちに、祭りに参加してほしい。」という文にします。<br>"+
           "（　）に入れるのに最も適当な英語3語を書きなさい。<br>"+
           E("I want young people （　　） in the festival."),
      answers:["to take part","to join us"], hint:"英語3語（want＋人＋to 〜 の形。あとに in が続く）" } ]}
]}

]};
