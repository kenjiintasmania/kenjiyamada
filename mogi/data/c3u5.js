/* data/c3u5.js ─ 中3 単元テスト⑤（初見・自動採点のみ）… テーマ：動物保護施設（アニマルシェルター）でのボランティア（架空の町 Aoba Town）。内容はすべて新規。
   参照：factory/inputs/authoring_rules.md／factory/inputs/okayama_notes.md（3年目の分析＝提供PDFの形式・配点だけを踏襲）
        ／モデル mogi/data/chu3_341.js（大問1〜5・28問・100点の骨格）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。
   登場人物：Yuki, Kaito, Ms. Brown（ALT）, Ms. Sato（施設の職員）。
   ※過去問および既存の模試データとの内容重複なし。
   ロック式：先生が /admin で「スタート」するまで問題は表示されない（exam.html の unit:true）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 単元テスト⑤",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ（英文1回読み・2問） */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the picture. Yuki is brushing a small dog, and Kaito is holding a cat in his arms.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵はどれですか。",
      choices:["ユキが小さな犬にブラシをかけ、カイトがねこをだいている。","ユキがねこにブラシをかけ、カイトが小さな犬をだいている。",
               "ユキが小さな犬を洗い、カイトがねこをだいている。","ユキが小さな犬にブラシをかけ、カイトがねこにえさをやっている。"], answer:0 } ] },
  { script:'(2) Look at the table. This weekend, the volunteers will walk the dogs on Saturday morning, and they will clean the cat room on Sunday afternoon.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う表（今週末のボランティアの予定）はどれですか。",
      choices:["土曜日の午後に犬の散歩、日曜日の午前にねこの部屋のそうじ","土曜日の午前にねこの部屋のそうじ、日曜日の午後に犬の散歩",
               "土曜日の午前に犬の散歩、日曜日の午後にねこの部屋のそうじ","日曜日の午前に犬の散歩、土曜日の午後にねこの部屋のそうじ"], answer:2 } ] },

  /* 問題B：チャイムの応答（対話の最後への応答・2回読み・2問） */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> My mother says our house is too small for a dog. What should I do?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Yes, my dog is ten years old."), E("How about a smaller animal, like a hamster?"),
                E("I went to the zoo last Sunday."), E("No, I cleaned my room yesterday.") ], answer:1 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> Have you finished the poster for the shelter\'s open day yet?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Not yet. I'll finish it tonight."), E("Yes, I have two cats at home."),
                E("It was built ten years ago."), E("Because I like drawing.") ], answer:0 } ] },

  /* 問題C：メモの空所補充（英語1語×3・2回読み） */
  { intro:"問題C　ユキ(Yuki)が、動物保護施設の職員のサトウ(Ms. Sato)さんの話を聞いて、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, everyone. I\'m Ms. Sato. Thank you for joining the volunteer team of Aoba Animal Shelter.</span>'+
      '<span class="sp">Our next volunteer day will be next <b>Wednesday</b>, not Sunday, because a doctor will come to check the animals on Sunday.</span>'+
      '<span class="sp">When you arrive, please come to the <b>kitchen</b> first. We will make food for the animals there.</span>'+
      '<span class="sp">Our shelter has <b>eighteen</b> cats now, and each cat needs a small towel. So please bring some old towels from home if you can.</span>',
    passage:'<b>ユキのメモ</b><br>Ms. Sato\'s talk<br>— The next volunteer day will be next （　あ　）.<br>'+
            '— Go to the （　い　） first and make food for the animals.<br>'+
            '— The shelter has （　う　） cats now. Bring some old towels.',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）水曜日", answers:["Wednesday"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）台所", answers:["kitchen"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）施設にいるねこの数", answers:["eighteen","18"], hint:"英語1語（数を表す語）" } ] },

  /* 問題D：説明＋人物発言（内容一致選択＋指定語を含む3語の英語） */
  { intro:"問題D　あなたとクラスメイトのカイト(Kaito)が、動物保護施設のオープンデーの手伝いについての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next Sunday, Aoba Animal Shelter will hold an open day, and we need help from junior high school students. You can choose one job.</span>'+
      '<span class="sp">In Job A, you will walk the dogs in the park near the shelter. In Job B, you will make name cards for the cats. In Job C, you will talk to visitors about the shelter at the gate.</span>'+
      '<span class="sp">The open day starts at ten in the morning and finishes at two in the afternoon. Please wear clothes that can get dirty.</span>'+
      '<span class="sp"><span class="who">Kaito:</span> I\'m afraid of big dogs, and I\'m not good at talking to people I don\'t know. But I like drawing. Which job should I choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["オープンデーは午前10時に始まり、午後4時に終わる。","参加する生徒は、よごれてもよい服を着ていく。",
               "生徒は3つの仕事のうち2つを選ぶ。","犬の散歩は、施設の中の部屋で行う。"], answer:1 },
    { type:"fill", label:"(2)", pt:3,
      stem:"カイトの発言に対して、あなたはどのように答えますか。書き出しに続けて（　）に cards を含む3語の英語を書き、英文を完成させなさい。<br>"+
           E("No problem. Job B is good for you. Let's （　　） together."),
      answers:["make name cards"], hint:"英語3語（説明の中の言い方を使う）" } ] }
]},

/* ===== 大問2 ちらし（表）＋対話 ===== */
{ no:2, title:"中学生のユキ(Yuki)とカイト(Kaito)が、アオバ町の動物保護施設のちらしを見ながら会話をしています。次は、そのちらしと会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Aoba Animal Shelter — Weekend Volunteer Courses</h4>'+
    '<div class="note">Help the animals that are waiting for new families!</div>'+
    '<table><tr><th>Course</th><th>What you will do</th><th>Fee (one month)</th><th>Volunteers now</th></tr>'+
    '<tr><td>Dog Walking</td><td>walk the dogs in Aoba Park for one hour</td><td>free</td><td>10</td></tr>'+
    '<tr><td>Cat Care</td><td>brush the cats and clean their room</td><td>free</td><td>7</td></tr>'+
    '<tr><td>Photo Team</td><td>take photos of the animals for our website</td><td>300 yen</td><td>4</td></tr>'+
    '<tr><td>Kids\' Class</td><td>teach small children how to touch animals gently</td><td>200 yen</td><td>6</td></tr></table>'+
    '<div class="note">Place … Aoba Animal Shelter (a ten-minute walk from Aoba Station)<br>'+
    'Day … every Sunday, 9:00 a.m. – 11:00 a.m.<br>'+
    'The fees are used to buy food for the animals. Gloves and aprons are lent for free.</div>',
    passage:
    '<span class="sp"><span class="who">Yuki:</span> Kaito, look at this. Aoba Animal Shelter is looking for weekend volunteers.</span>'+
    '<span class="sp"><span class="who">Kaito:</span> Oh, I\'ve wanted to help animals for a long time. What can we do there?</span>'+
    '<span class="sp"><span class="who">Yuki:</span> There are four courses. Look, the animals there are waiting for new （　あ　）. I\'ll take the Cat Care course because I love cats.</span>'+
    '<span class="sp"><span class="who">Kaito:</span> I like taking photos, so the Photo Team is good for me. （　い　） volunteers are in it now?</span>'+
    '<span class="sp"><span class="who">Yuki:</span> Only four. They need more people. Are you going to take another course, too?</span>'+
    '<span class="sp"><span class="who">Kaito:</span> Yes. I have never <u>(う) walk</u> a dog, so I want to try the Dog Walking course.</span>'+
    '<span class="sp"><span class="who">Yuki:</span> Sounds good. Then we can go to the shelter together every Sunday.</span>'+
    '<span class="sp"><span class="who">Kaito:</span> Great. I hope all the animals will find warm （　あ　） soon.</span>',
    note:'語注：shelter 動物保護施設／brush 〜にブラシをかける／website ウェブサイト／gently やさしく／fee 料金／glove 手ぶくろ／apron エプロン／lent 貸される（lend の過去分詞）／walk 〜を散歩させる',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"2か所の（あ）に共通して入れるのに最も適当な英語1語を、ちらしの中から抜き出して書きなさい。",
      answers:["families"], hint:"ちらしの中にある語" },
    { type:"fill", label:"(2)い", pt:3, stem:"（い）に入れるのに最も適当な2語の英語を書きなさい。", answers:["How many"], hint:"英語2語（数をたずねる）" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う)の単語を、最も適当な形に変えて1語で書きなさい。", answers:["walked"], hint:"I have never 〜 a dog." },
    { type:"mcq", label:"(4)", pt:3, stem:"ちらしから、カイトが1か月に払う金額として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("free"), E("200 yen"), E("300 yen"), E("500 yen") ], answer:2 },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("The courses are held on Saturday afternoons."),
                E("The Photo Team has ten volunteers now."),
                E("Kaito has walked a dog many times."),
                E("Yuki is going to take the Cat Care course.") ], answer:3 } ]}
]},

/* ===== 大問3 会話の英作文（並べかえ2問） ===== */
{ no:3, title:"動物保護施設を訪れたALTのブラウン(Ms. Brown)先生と、中学生のユキ(Yuki)が会話をしています。次の①〜⑥はそのときの二人の会話です。二人が考えている内容に合うように、(1)(2)の語を正しく並べかえて、会話を完成させなさい。なお、会話は①〜⑥の順に行われています。", groups:[
  { sceneNote:"イラスト：①ブラウン先生が大きな犬を見て「わあ、この犬はとても大きい！」とおどろいている。②ユキが「彼はこの施設でいちばん大きな犬です」と説明している。③ブラウン先生が「本当？彼はどれくらい長くここで待っているの」と考えながらたずねている。④ユキが「約2年です。新しい家族を待っています」と答えている。⑤ブラウン先生が「早く見つかるといいね。さわってもいい？」とたずねている。⑥ユキが「もちろん。やさしくさわってください」と答えている。",
    passage:
    '<span class="sp"><span class="who">Ms. Brown:</span> ① Wow, this dog is so big!</span>'+
    '<span class="sp"><span class="who">Yuki:</span> ② <u>(1)</u>.</span>'+
    '<span class="sp"><span class="who">Ms. Brown:</span> ③ Really? <u>(2)</u>?</span>'+
    '<span class="sp"><span class="who">Yuki:</span> ④ For about two years. He is waiting for a new family.</span>'+
    '<span class="sp"><span class="who">Ms. Brown:</span> ⑤ I hope he will find one soon. Can I touch him?</span>'+
    '<span class="sp"><span class="who">Yuki:</span> ⑥ Sure. Please touch him gently.</span>',
    passageEn:true,
    note:'語注：shelter 動物保護施設／gently やさしく',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：ユキが「彼はこの施設でいちばん大きな犬です」と説明する場面。次の語を正しく並べて英文を完成させなさい。",
      words:["biggest","He","the","dog","is","shelter","in","this"], answer:"He is the biggest dog in this shelter" },
    { type:"wordorder", label:"(2)", pt:5, stem:"イラスト：ブラウン先生が「彼はどれくらい長くここで待っているのですか」とたずねる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["long","How","been","he","has","waiting","here"], answer:"How long has he been waiting here" } ]}
]},

/* ===== 大問4 話し合い＋日記 ===== */
{ no:4, title:"ALTのブラウン(Ms. Brown)先生の英語の授業で、Yuki と Kaito が、動物保護施設への訪問について話し合いをしています。次の英文は、話し合いと、その日に Yuki が書いた日記です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Ms. Brown:</span> Next month, our class will visit Aoba Animal Shelter. Today, let\'s talk about what we can do for the animals there. Yuki, you have been a volunteer there since spring, right?</span>'+
    '<span class="sp"><span class="who">Yuki:</span> Yes. I go there every Sunday. There are twenty dogs and eighteen cats now, and most of them were left by their owners.</span>'+
    '<span class="sp"><span class="who">Ms. Brown:</span> That\'s sad. What is the biggest problem at the shelter?</span>'+
    '<span class="sp"><span class="who">Yuki:</span> Many people don\'t know about the shelter, so the animals have to wait for a long time. I want to <u>make a video</u> about them and show it at the school festival.</span>'+
    '<span class="sp"><span class="who">Ms. Brown:</span> That\'s a great idea. Kaito, what do you think?</span>'+
    '<span class="sp"><span class="who">Kaito:</span> I agree. A video can show how （　あ　） the animals are. I also think we should collect old towels and blankets. The shelter always needs them in winter.</span>'+
    '<span class="sp"><span class="who">Ms. Brown:</span> Good. Have you asked Ms. Sato about it yet?</span>'+
    '<span class="sp"><span class="who">Kaito:</span> Not yet. I\'ll ask her this Sunday.</span>'+
    '<span class="sp"><span class="who">Ms. Brown:</span> Please do. Now let me tell you my story. In my country, I got my dog from a shelter when I was ten. She was very small and afraid of people at first.</span>'+
    '<span class="sp"><span class="who">Yuki:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Ms. Brown:</span> She became the friendliest dog in our town. It took about a year, but she learned to trust people again.</span>'+
    '<span class="sp"><span class="who">Kaito:</span> What a nice story! I hope the animals in Aoba will meet people like you.</span>'+
    '<span class="sp"><span class="who">Ms. Brown:</span> I hope so, too. Let\'s do our best for them.</span>',
    note:'語注：shelter 動物保護施設／owner 飼い主／were left 置き去りにされた／problem 問題／festival 祭り／agree 賛成する／collect 〜を集める／blanket 毛布／afraid of 〜 〜をこわがって／friendly 人なつっこい（friendliest は最上級）／trust 〜を信じる／again 再び／do one\'s best 最善をつくす' },
  { passage:'<b>Yuki の日記</b><br>Today we talked about the animal shelter in Ms. Brown\'s class. Kaito\'s idea was good, and I was happy to hear that Ms. Brown （　X　）. '+
            'Next Sunday, I will tell Ms. Sato about our plans.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Yuki の発言から抜き出して書きなさい。<br>"+E("Yuki wants to [　　] about the animals and show it at the school festival."),
      answers:["make a video"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("busy"),E("expensive"),E("cute"),E("angry")], answer:2 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Where did you buy her?"), E("How did she change after that?"),
                E("How many dogs do you have now?"), E("When did you come to Japan?") ], answer:1 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Yuki has never been to the animal shelter."),
                E("Kaito has already asked Ms. Sato about the towels."),
                E("Kaito wants to collect old towels and blankets for the shelter."),
                E("Ms. Brown's dog was friendly to everyone from the first day.") ], answer:2 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("has never kept a dog"), E("got her dog from a shelter"),
                E("bought her dog at a pet shop"), E("doesn't like small animals") ], answer:1 } ]}
]},

/* ===== 大問5 スピーチ（長文読解） ===== */
{ no:5, title:"次の英文は、ユキ(Yuki)が英語の授業で発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Yuki. Since last spring, I have been a volunteer at Aoba Animal Shelter. '+
    'Before that, I thought a shelter was just a sad place for animals that nobody wanted. '+
    'Now I think it is the start of a new life for them, and I want to tell you why.<br><br>'+
    '<b>②</b> On my first day, Ms. Sato, a staff member, took me to the dog room. Most of the dogs ran to the door and wagged their tails. '+
    'But one white dog stayed in the corner and did not look at me. Her name was Hana. Ms. Sato said, '+
    '"She was left on a mountain road last winter. She is still afraid of people." '+
    'I sat near her every Sunday and talked to her quietly. For three weeks, she never came to me. '+
    'I was <u>(お) ___</u>, but Ms. Sato told me, "Don\'t give up. She needs time."<br><br>'+
    '<b>③</b> On the fourth Sunday, something happened. When I opened the door, Hana walked to me slowly and smelled my hand. '+
    'Then she put her head on my knee. I could not say anything. Ms. Sato said, "You are the first person she has trusted here." '+
    'After that, Hana waited for me at the door every Sunday. In June, a family with two children came to see the dogs. '+
    'Hana went to the children and sat beside them. They touched her head, and she did not run away. '+
    'In July, she left the shelter with her new family. '+
    'I cried when she left, but I was also very happy.<br><br>'+
    '<b>④</b> Some people say that one volunteer cannot save animals. That may be true. '+
    '<u>④ One person cannot help all the animals that are waiting in the shelter</u>. '+
    'But Hana taught me something important. <u>③ ( is / important / it / for / us / to / know / them )</u>. '+
    'When we know their stories, we can care about them and tell others. '+
    'Now Kaito and I are making a video about the animals in Aoba. '+
    'So please watch it at the school festival, and let\'s <u>(か) ___</u> them a warm home together!',
    passageEn:true,
    note:'語注：shelter 動物保護施設／staff member 職員／wag 〜をふる／tail しっぽ／corner すみ／was left 置き去りにされた／quietly 静かに／give up あきらめる／smell 〜のにおいをかぐ／knee ひざ／trust 〜を信じる／beside 〜のそばに／save 〜を救う／care about 〜 〜を大切に思う',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お glad　か sell"), E("お glad　か give"),
                E("お sad　か sell"), E("お sad　か give") ], answer:3 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "4回目の日曜日に、ハナはユキの手のにおいをかいだ。", "サトウさんは、ハナがここで信じた最初の人はユキだと言った。",
                "ハナは子どもたちに近づかず、部屋のすみにいた。", "7月に、ハナは新しい家族と施設を出て行った。" ], answer:2 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["is","important","it","for","us","to","know","them"], answer:"It is important for us to know them",
      display:"It is important for us to know them" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語3語を、第2段落中から抜き出して書きなさい。<br>"+E("Ms. Sato said that Hana （　え　） a mountain road last winter."),
      answers:["was left on"], hint:"第2段落の語・英語3語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>1人の（　①　）は、施設で待っているすべての（　②　）を助けることはできない。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "先生","人","子ども","家族" ], answer:1 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "動物","生徒","飼い主","職員" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Yuki has been a volunteer at the shelter since last spring."),
                E("Hana ran to the door when Yuki first came."),
                E("Ms. Sato told Yuki to give up on Hana."),
                E("Hana left the shelter with her new family in July."),
                E("Yuki still thinks a shelter is just a sad place.") ], answer:[0,3] } ]}
]}

]};
