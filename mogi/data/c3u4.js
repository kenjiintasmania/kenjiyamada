/* data/c3u4.js ─ 中3 単元テスト④（初見・自動採点のみ）… テーマ：地域のお年寄りとの交流／ボランティア。内容はすべて新規。
   ロック式：先生が /admin で「スタート」するまで問題は表示されない（exam.html の unit:true）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 単元テスト④",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the picture. Nozomi is holding some flowers, and an old man is sitting in a chair beside her.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵はどれですか。",
      choices:["花を持つノゾミの横で、おじいさんがいすにすわっている。","花を持つノゾミの後ろを、おじいさんが歩いている。",
               "本を持つノゾミの横で、おじいさんがいすにすわっている。","花を持つおじいさんの横で、ノゾミがいすにすわっている。"], answer:0 } ] },
  { script:'(2) Look at the table. The volunteer club visits the house twice a month, not twice a week.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う表（訪問の回数）はどれですか。",
      choices:["月に2回訪問する。","週に2回訪問する。","年に2回訪問する。","月に1回訪問する。"], answer:0 } ] },

  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> My grandfather can\'t hear me well. What should I do?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Try speaking a little more slowly."), E("Yes, he ran very fast."),
                E("I bought a new radio."), E("No, the room was too small.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> Thank you for coming today. Will you visit us again?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("It was a very long train."), E("Of course. See you next month."),
                E("I don't know his name."), E("She was born in this town.") ], answer:1 } ] },

  { intro:"問題C　ノゾミ(Nozomi)が、ひだまりハウスで働くサノ(Ms. Sano)さんにインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, I\'m Ms. Sano. About <b>fifty</b> people come to this house every day.</span>'+
      '<span class="sp">The most popular activity here is <b>singing</b> old Japanese songs together.</span>'+
      '<span class="sp">When you talk to the people here, please look at their <b>eyes</b> and speak slowly.</span>',
    passage:'<b>ノゾミのメモ</b><br>Ms. Sano — about （　あ　） people come to this house every day<br>'+
            '— the most popular activity is （　い　） old Japanese songs together<br>'+
            '— when we talk to them, we should look at their （　う　） and speak slowly',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）50", answers:["fifty"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）歌うこと", answers:["singing"], hint:"英語1語（〜ing の形）" },
    { type:"fill", label:"う", pt:2, stem:"（う）目", answers:["eyes"], hint:"英語1語" } ] },

  { intro:"問題D　あなたとクラスメイトのダイキ(Daiki)が、交流会の準備についての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next Wednesday afternoon, our class will visit Hidamari House. Each group will prepare one thing.</span>'+
      '<span class="sp">Group A will play music with recorders. Group B will make paper flowers with the people there. Group C will read old picture books aloud.</span>'+
      '<span class="sp">Each group has about forty minutes. Please arrive at the house by one thirty.</span>'+
      '<span class="sp"><span class="who">Daiki:</span> I\'m too shy to read in front of people, but I\'m good at using my hands. What should our group do?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["それぞれのグループの時間は約40分である。","訪問は次の水曜日の朝に行われる。",
               "グループは全部で4つある。","楽器は持って行かなくてよい。"], answer:0 },
    { type:"fill", label:"(2)", pt:3,
      stem:"ダイキの発言に対して、あなたはどのように答えますか。書き出しに続けて（　）に3語の英語を書き、英文を完成させなさい。<br>"+
           E("Then Group B is good for us. Let's （　　） together."),
      answers:["make paper flowers"], hint:"英語3語（説明の中の言い方を使う）" } ] }
]},

/* ===== 大問2 案内＋対話 ===== */
{ no:2, title:"中学生のノゾミ(Nozomi)とダイキ(Daiki)が、ひだまりハウスの案内を見ながら会話をしています。次は、その案内と会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Hidamari House — Weekend Volunteer</h4>'+
    '<div class="note">Spend a warm afternoon with the people in our town.</div>'+
    '<table><tr><td>Day</td><td>Every Saturday</td></tr>'+
    '<tr><td>Time</td><td>2:00 p.m. – 4:00 p.m.</td></tr>'+
    '<tr><td>Age</td><td>junior high school students and older</td></tr>'+
    '<tr><td>Members</td><td>fifteen people each day</td></tr></table>'+
    '<div class="note">Staff … Ms. Sano. (She has worked here for twelve years.)<br>'+
    'Wear … comfortable clothes. You will move a lot.</div>',
    passage:
    '<span class="sp"><span class="who">Nozomi:</span> Daiki, look. Hidamari House is looking for weekend （　あ　）.</span>'+
    '<span class="sp"><span class="who">Daiki:</span> A （　あ　）? That sounds interesting. What do we do there?</span>'+
    '<span class="sp"><span class="who">Nozomi:</span> We talk with the people, sing songs, and sometimes make things together.</span>'+
    '<span class="sp"><span class="who">Daiki:</span> I see. But I （　い　） talked with old people outside my family.</span>'+
    '<span class="sp"><span class="who">Nozomi:</span> Don\'t worry. My grandmother says young people are always welcome there.</span>'+
    '<span class="sp"><span class="who">Daiki:</span> How old is she? My grandmother is the <u>(う) old</u> person in my family.</span>'+
    '<span class="sp"><span class="who">Nozomi:</span> Mine is eighty-two. She goes to Hidamari House every Saturday.</span>'+
    '<span class="sp"><span class="who">Daiki:</span> Then let\'s join together this weekend. I\'ll wear comfortable clothes.</span>',
    note:'語注：spend （時を）過ごす／comfortable 楽な／welcome かんげいされて',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"2か所の（あ）に共通して入れるのに最も適当な英語1語を、案内の中から抜き出して書きなさい。",
      answers:["volunteer"], hint:"案内の中にある語" },
    { type:"fill", label:"(2)い", pt:3, stem:"（い）に入れるのに最も適当な2語の英語を書きなさい。", answers:["have never"], hint:"英語2語（一度も〜したことがない）" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う)の単語を、最も適当な形に変えて1語で書きなさい。", answers:["oldest"], hint:"the 〜 person in my family" },
    { type:"mcq", label:"(4)", pt:3, stem:"案内から、1日に参加できる人数として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("five people each day"), E("fifteen people each day"),
                E("fifty people each day"), E("twelve people each day") ], answer:1 },
    { type:"mcq", label:"(5)", pt:4, stem:"案内や会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Ms. Sano has worked at the house for twelve years."),
                E("The volunteer work starts at four in the afternoon."),
                E("Only high school students can join the work."),
                E("Nozomi's grandmother is ninety-two years old.") ], answer:0 } ]}
]},

/* ===== 大問3 会話の英作文（並べかえ2問） ===== */
{ no:3, title:"ひだまりハウスで、ノゾミ(Nozomi)が、イトウ(Mr. Ito)さんと話しています。次の①〜⑥はそのときの二人の会話です。二人が考えている内容に合うように、(1)(2)の語を正しく並べかえて、会話を完成させなさい。なお、会話は①〜⑥の順に行われています。", groups:[
  { sceneNote:"イラスト：①イトウさんが古い写真を見せて「これは50年前のこの町です」と話している。②ノゾミが「え、本当に。それについてもっと聞きたい」と考えている。③イトウさんが「ここには大きな川がありました」と説明している。④ノゾミが「知りませんでした」とおどろいている。⑤イトウさんが「古い地図を見たことがありますか」とたずねている。⑥ノゾミが「いいえ、ありません。見てみたいです」と答えている。",
    passage:
    '<span class="sp"><span class="who">Mr. Ito:</span> ① This is a photo of this town fifty years ago.</span>'+
    '<span class="sp"><span class="who">Nozomi:</span> ② Oh, really? <u>(1)</u>.</span>'+
    '<span class="sp"><span class="who">Mr. Ito:</span> ③ There was a big river here.</span>'+
    '<span class="sp"><span class="who">Nozomi:</span> ④ I didn\'t know that.</span>'+
    '<span class="sp"><span class="who">Mr. Ito:</span> ⑤ <u>(2)</u>?</span>'+
    '<span class="sp"><span class="who">Nozomi:</span> ⑥ No, I haven\'t. I\'d like to see one.</span>',
    passageEn:true,
    note:'語注：photo 写真／would like to 〜 〜したい',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：ノゾミが「それについてもっと聞きたい」と思う場面。次の語を正しく並べて英文を完成させなさい。",
      words:["hear","I","want","about","to","more","it"], answer:"I want to hear more about it" },
    { type:"wordorder", label:"(2)", pt:5, stem:"イラスト：イトウさんが「古い地図を見たことがありますか」とたずねる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["ever","Have","seen","you","map","an","old"], answer:"Have you ever seen an old map" } ]}
]},

/* ===== 大問4 話し合い＋感想 ===== */
{ no:4, title:"フォード(Mr. Ford)先生の英語の授業で、Daiki、Mika、Yuto が、地域のお年寄りとの交流について話し合いをしています。次の英文は、話し合いと、それを聞いて Nozomi が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Mr. Ford:</span> Today we will plan our visit to Hidamari House. What do you want to do with the people there? Daiki, please start.</span>'+
    '<span class="sp"><span class="who">Daiki:</span> I want to <u>make paper flowers</u> with them. We can talk while our hands are moving.</span>'+
    '<span class="sp"><span class="who">Mr. Ford:</span> That\'s a good point. Why do you like that idea, Daiki?</span>'+
    '<span class="sp"><span class="who">Daiki:</span> Because I get nervous when I only sit and talk. Working together makes it easier for me.</span>'+
    '<span class="sp"><span class="who">Mr. Ford:</span> I understand you well. Mika, how about you?</span>'+
    '<span class="sp"><span class="who">Mika:</span> I want to ask them about this town long ago. Then we can write a small history book.</span>'+
    '<span class="sp"><span class="who">Mr. Ford:</span> Interesting. Do you like history, Mika?</span>'+
    '<span class="sp"><span class="who">Mika:</span> Yes, listening to old stories is the thing I like the most.</span>'+
    '<span class="sp"><span class="who">Mr. Ford:</span> Wonderful. Yuto, what is your idea?</span>'+
    '<span class="sp"><span class="who">Yuto:</span> I want to teach them how to use a smartphone. Then they can send photos to their families.</span>'+
    '<span class="sp"><span class="who">Mr. Ford:</span> Teaching a new machine in one afternoon is not （　あ　）, but it may help them a lot.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> I think so, too.</span>'+
    '<span class="sp"><span class="who">Mr. Ford:</span> Now let me tell you my own story. When I moved to Japan, I lived alone and spoke to nobody for a week. Then a woman next door brought me some soup and talked with me for an hour.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Mr. Ford:</span> Good question. I still remember it because that hour made this country my home.</span>'+
    '<span class="sp"><span class="who">Yuto:</span> And now you talk with us every day.</span>'+
    '<span class="sp"><span class="who">Mr. Ford:</span> Yes, and I am thankful for it. I hope you will give that hour to someone else.</span>',
    note:'語注：nervous きんちょうして／next door となりの／thankful 感謝して' },
  { passage:'<b>Nozomi の感想</b><br>All three ideas were kind. Like Mika, I want to hear their stories. '+
            'I （　X　）, too, so I will listen carefully at Hidamari House.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Daiki の発言から抜き出して書きなさい。<br>"+E("Daiki wants to [　　] with the people there."),
      answers:["make paper flowers"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("easy"),E("kind"),E("warm"),E("young")], answer:0 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("What kind of soup was it?"), E("Why do you still remember it?"),
                E("How long did you live alone?"), E("Where does the woman live now?") ], answer:1 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Mika wants to write a small history book about the town."),
                E("Daiki feels relaxed when he only sits and talks."),
                E("Mr. Ford had many friends in his first week in Japan."),
                E("Yuto wants to teach the people how to cook soup.") ], answer:0 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("want to buy a new smartphone"), E("like making things with paper"),
                E("love hearing about old days"), E("don't want to visit the house") ], answer:2 } ]}
]},

/* ===== 大問5 スピーチ（長文読解） ===== */
{ no:5, title:"次の英文は、ノゾミ(Nozomi)が英語の授業で発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Nozomi. Since last spring, I have visited Hidamari House every month. '+
    'Before I started, I thought old people and I had nothing to talk about. '+
    'One afternoon showed me that I was wrong.<br><br>'+
    '<b>②</b> On my first visit, I sat next to a woman named Mrs. Kimura. I said hello, and then I could say nothing. '+
    'Ten minutes passed. My face got hot, and I wanted to go home. '+
    'Then she began to sing a song very quietly. I knew that song because my mother sang it to me. '+
    'I sang with her, and she smiled at me. I felt <u>(お) ___</u> for the first time that day.<br><br>'+
    '<b>③</b> After that, I visited her every month. She told me about this town in the old days. '+
    'There was a small bridge near the station, and children caught fish under it. '+
    'She also told me that she was a teacher for thirty years. I asked her many questions, and she never got tired. '+
    'One day she said, "Talking with you makes my week bright."<br><br>'+
    '<b>④</b> Some people say that young people and old people cannot understand each other. That may be true. '+
    '<u>④ Sixty years between two people is a very long time</u>. '+
    'But something crossed that time on my first visit. <u>③ ( me / one / changed / song / old )</u>. '+
    'We do not always need the same memories. We only need to listen. '+
    'So please visit someone older than you, and don\'t be <u>(か) ___</u> of the first ten minutes!',
    passageEn:true,
    note:'語注：pass （時が）過ぎる／quietly 静かに／bright 明るい／cross 〜をこえる／memory 思い出',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お easy　か proud"), E("お easy　か afraid"),
                E("お warm　か proud"), E("お warm　か afraid") ], answer:3 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "駅の近くに小さな橋があった。", "子どもたちは橋の下で魚をつかまえた。",
                "キムラさんは30年間、教師をしていた。", "キムラさんは質問が多くてつかれてしまった。" ], answer:3 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["me","one","changed","song","old"], answer:"One old song changed me",
      display:"One old song changed me" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語3語を、第3段落中から抜き出して書きなさい。<br>"+E("Mrs. Kimura said that talking with Nozomi （　え　） bright."),
      answers:["makes my week"], hint:"第3段落の語・英語3語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>二人の間にある（　①　）年という年のちがいは、とても長い（　②　）である。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "60","30","10","80" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "時間","道のり","話","橋" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Before her first visit, Nozomi thought she had nothing to talk about."),
                E("Mrs. Kimura sang a song that Nozomi had never heard."),
                E("Mrs. Kimura worked as a teacher for thirty years."),
                E("Nozomi went home in the middle of her first visit."),
                E("Nozomi thinks young and old people can never understand each other.") ], answer:[0,2] } ]}
]}

]};
