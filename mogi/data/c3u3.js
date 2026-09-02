/* data/c3u3.js ─ 中3 単元テスト③（初見・自動採点のみ）… テーマ：修学旅行／班別行動／和紙工房。内容はすべて新規。
   ロック式：先生が /admin で「スタート」するまで問題は表示されない（exam.html の unit:true）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 単元テスト③",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the picture. Emi is putting a camera and two guidebooks into her bag.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵はどれですか。",
      choices:["カメラ1台とガイドブック2冊をかばんに入れている。","カメラ2台とガイドブック1冊をかばんに入れている。",
               "カメラ1台とガイドブック1冊をかばんに入れている。","カメラ2台とガイドブック2冊をかばんに入れている。"], answer:0 } ] },
  { script:'(2) Look at the table. The group will leave the hotel at eight forty, not at eight fourteen.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う表（ホテルの出発時刻）はどれですか。",
      choices:["8時14分に出発する。","8時40分に出発する。","8時40分にホテルに着く。","8時14分にホテルに着く。"], answer:1 } ] },

  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> We have thirty minutes before the bus comes. What shall we do?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Let's buy some souvenirs here."), E("The bus was very crowded."),
                E("I lost my ticket yesterday."), E("Yes, I visited the castle.") ], answer:0 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> I can\'t find our meeting place on this map. Can you help me?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("I ate lunch at the station."), E("Sure. Let me see the map."),
                E("No, the temple was closed."), E("It rained a lot last night.") ], answer:1 } ] },

  { intro:"問題C　カイト(Kaito)が、修学旅行で訪ねる和紙工房のモリ(Ms. Mori)さんに電話でインタビューし、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, this is Ms. Mori. Our workshop opens at nine, but school groups can come from <b>eight</b> thirty.</span>'+
      '<span class="sp">In the workshop, you can make your own <b>postcard</b> from Japanese paper.</span>'+
      '<span class="sp">Please don\'t forget to bring a small <b>towel</b>, because your hands will get wet.</span>',
    passage:'<b>カイトのメモ</b><br>Ms. Mori — school groups can come from （　あ　） thirty<br>'+
            '— we can make our own （　い　） from Japanese paper<br>'+
            '— must bring a small （　う　）, because our hands will get wet',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）8（時）", answers:["eight"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）はがき", answers:["postcard"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）タオル", answers:["towel"], hint:"英語1語" } ] },

  { intro:"問題D　あなたとクラスメイトのエミ(Emi)が、修学旅行2日目の班別行動についての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">On the second day of the school trip, each group will choose one course in the morning.</span>'+
      '<span class="sp">Course A goes up the hill to the old castle. Course B goes to the paper workshop, where you can try Japanese paper. Course C goes to the city museum.</span>'+
      '<span class="sp">Every course takes about two hours. All groups must come back to the station by twelve thirty.</span>'+
      '<span class="sp"><span class="who">Emi:</span> I don\'t want to walk up a hill, but I want to make something with my hands. Which course should we choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["どの班も3つのコースすべてを回る。","どのコースも約2時間かかる。",
               "班別行動は午後に行われる。","集合場所は美術館である。"], answer:1 },
    { type:"fill", label:"(2)", pt:3,
      stem:"エミの発言に対して、あなたはどのように答えますか。書き出しに続けて（　）に3語の英語を書き、英文を完成させなさい。<br>"+
           E("Then Course B is good for us. Let's （　　） together."),
      answers:["try Japanese paper"], hint:"英語3語（説明の中の言い方を使う）" } ] }
]},

/* ===== 大問2 案内＋対話 ===== */
{ no:2, title:"中学生のカイト(Kaito)とエミ(Emi)が、修学旅行で行く和紙工房の案内を見ながら会話をしています。次は、その案内と会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Nanase Paper Workshop — For School Groups</h4>'+
    '<div class="note">Make your own Japanese paper with us!</div>'+
    '<table><tr><td>Morning course</td><td>9:00 a.m. – 11:00 a.m.</td></tr>'+
    '<tr><td>Afternoon course</td><td>1:00 p.m. – 3:00 p.m.</td></tr>'+
    '<tr><td>Price</td><td>800 yen for each student</td></tr>'+
    '<tr><td>Group size</td><td>up to forty students</td></tr></table>'+
    '<div class="note">Guide … Ms. Mori. (She has made Japanese paper for twenty years.)<br>'+
    'Bring … a small towel. Your hands will get wet.</div>',
    passage:
    '<span class="sp"><span class="who">Kaito:</span> Emi, look at this. Our group will visit this workshop next month.</span>'+
    '<span class="sp"><span class="who">Emi:</span> I know! Ms. Mori has made Japanese （　あ　） for twenty years.</span>'+
    '<span class="sp"><span class="who">Kaito:</span> That\'s a long time. What do you want to make there?</span>'+
    '<span class="sp"><span class="who">Emi:</span> I want to make a （　あ　） card for my grandmother. She will be happy.</span>'+
    '<span class="sp"><span class="who">Kaito:</span> That\'s a nice idea. Oh, we （　い　） bring a small towel, because our hands will get wet.</span>'+
    '<span class="sp"><span class="who">Emi:</span> Thank you for telling me. My sister <u>(う) go</u> to this workshop last year.</span>'+
    '<span class="sp"><span class="who">Kaito:</span> Really? What did she say about it?</span>'+
    '<span class="sp"><span class="who">Emi:</span> She said it was harder than she thought, but she was proud of her own paper.</span>',
    note:'語注：workshop 工房／be proud of 〜 〜をほこりに思う',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"2か所の（あ）に共通して入れるのに最も適当な英語1語を、案内の中から抜き出して書きなさい。",
      answers:["paper"], hint:"案内の中にある語" },
    { type:"fill", label:"(2)い", pt:3, stem:"（い）に入れるのに最も適当な2語の英語を書きなさい。", answers:["have to"], hint:"英語2語（〜しなければならない）" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う)の単語を、最も適当な形に変えて1語で書きなさい。", answers:["went"], hint:"My sister 〜 to this workshop last year." },
    { type:"mcq", label:"(4)", pt:3, stem:"案内から、1つの団体で参加できる人数として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("up to fourteen students"), E("up to forty students"),
                E("up to eighty students"), E("up to four hundred students") ], answer:1 },
    { type:"mcq", label:"(5)", pt:4, stem:"案内や会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Ms. Mori has made Japanese paper for twenty years."),
                E("Each student must pay eight thousand yen."),
                E("The afternoon course starts at three o'clock."),
                E("Students don't have to bring anything.") ], answer:0 } ]}
]},

/* ===== 大問3 会話の英作文（並べかえ2問） ===== */
{ no:3, title:"修学旅行中のカイト(Kaito)が、道にまよっている外国人観光客のアンナ(Anna)と話しています。次の①〜⑥はそのときの二人の会話です。二人が考えている内容に合うように、(1)(2)の語を正しく並べかえて、会話を完成させなさい。なお、会話は①〜⑥の順に行われています。", groups:[
  { sceneNote:"イラスト：①アンナが地図を持って「すみません。これは古い城への道ですか」とたずねている。②カイトが「はい。道をご案内します」と申し出ている。③アンナが「本当にありがとう」と喜んでいる。④カイトが「ここから歩いて10分ほどです」と説明している。⑤アンナが「この町は何で有名なのですか」と考えながらたずねている。⑥カイトが「美しい和紙で有名です」と答えている。",
    passage:
    '<span class="sp"><span class="who">Anna:</span> ① Excuse me. Is this the way to the old castle?</span>'+
    '<span class="sp"><span class="who">Kaito:</span> ② Yes. <u>(1)</u>.</span>'+
    '<span class="sp"><span class="who">Anna:</span> ③ Oh, thank you very much.</span>'+
    '<span class="sp"><span class="who">Kaito:</span> ④ It\'s about ten minutes from here.</span>'+
    '<span class="sp"><span class="who">Anna:</span> ⑤ <u>(2)</u>?</span>'+
    '<span class="sp"><span class="who">Kaito:</span> ⑥ It\'s famous for its beautiful paper.</span>',
    passageEn:true,
    note:'語注：castle 城／be famous for 〜 〜で有名である',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：カイトが「道をご案内します」と申し出る場面。次の語を正しく並べて英文を完成させなさい。",
      words:["show","I","you","will","the","way"], answer:"I will show you the way" },
    { type:"wordorder", label:"(2)", pt:5, stem:"イラスト：アンナが「この町は何で有名なのですか」とたずねる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["is","What","town","famous","this","for"], answer:"What is this town famous for" } ]}
]},

/* ===== 大問4 話し合い＋感想 ===== */
{ no:4, title:"ベル(Ms. Bell)先生の英語の授業で、Emi、Sora、Riko が、修学旅行で伝えたいことについて話し合いをしています。次の英文は、話し合いと、それを聞いて Kaito が書いた感想です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Ms. Bell:</span> Next month you will go on a school trip. What do you want to tell the people you meet there? Emi, please start.</span>'+
    '<span class="sp"><span class="who">Emi:</span> I want to <u>show our school life</u> to them. I made a small album of our club activities.</span>'+
    '<span class="sp"><span class="who">Ms. Bell:</span> That\'s a good plan. Why did you choose photos, Emi?</span>'+
    '<span class="sp"><span class="who">Emi:</span> Because I am not good at English yet. Photos can tell a story without many words.</span>'+
    '<span class="sp"><span class="who">Ms. Bell:</span> I understand. Sora, how about you?</span>'+
    '<span class="sp"><span class="who">Sora:</span> I want to teach them a Japanese song. My grandmother taught it to me when I was small.</span>'+
    '<span class="sp"><span class="who">Ms. Bell:</span> That sounds lovely. Do you often sing, Sora?</span>'+
    '<span class="sp"><span class="who">Sora:</span> Yes, singing with other people is the thing I like the most.</span>'+
    '<span class="sp"><span class="who">Ms. Bell:</span> Wonderful. Riko, what is your idea?</span>'+
    '<span class="sp"><span class="who">Riko:</span> I want to make a map of our town in English. Then visitors can find our best places easily.</span>'+
    '<span class="sp"><span class="who">Ms. Bell:</span> Writing a whole map in English is not （　あ　）, but I love the idea.</span>'+
    '<span class="sp"><span class="who">Riko:</span> I think so, too.</span>'+
    '<span class="sp"><span class="who">Ms. Bell:</span> Now let me tell you my own story. When I first came to Japan, I could not read any signs. A junior high school student drew a map for me on a piece of paper. I still keep it.</span>'+
    '<span class="sp"><span class="who">Riko:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Ms. Bell:</span> Good question. I keep it because it taught me that a small kindness can stay with a person for years.</span>'+
    '<span class="sp"><span class="who">Riko:</span> And now you teach us English in this town.</span>'+
    '<span class="sp"><span class="who">Ms. Bell:</span> Yes, and I am glad about that. I hope you will be kind to the people you meet.</span>',
    note:'語注：album アルバム／sign 標識／kindness 親切' },
  { passage:'<b>Kaito の感想</b><br>All of the ideas were good. Like Riko, I want to help visitors. '+
            'I （　X　）, too, so I will study English harder before the trip.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Emi の発言から抜き出して書きなさい。<br>"+E("Emi wants to show [　　] to the people she meets."),
      answers:["our school life"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("easy"),E("dark"),E("free"),E("wrong")], answer:0 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Where did you buy the paper?"), E("Why do you still keep it?"),
                E("How many signs did you read?"), E("Who taught you Japanese songs?") ], answer:1 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Sora learned the Japanese song from her grandmother."),
                E("Emi thinks she is very good at English now."),
                E("Ms. Bell could read Japanese signs at first."),
                E("Riko wants to make a map written in Japanese.") ], answer:0 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("want to be a singer someday"), E("want to help people from other places"),
                E("like taking photos of my club"), E("don't want to go on the trip") ], answer:1 } ]}
]},

/* ===== 大問5 スピーチ（長文読解） ===== */
{ no:5, title:"次の英文は、カイト(Kaito)が英語の授業で発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Kaito. Last month, we went on our school trip. '+
    'Before the trip, I thought English was only a subject for tests. '+
    'One short talk on a street changed my idea, and I want to share it with you.<br><br>'+
    '<b>②</b> On the second day, my group visited a paper workshop. On the way, a woman came to us with a map. '+
    'She spoke English, and my friends looked away. My heart began to beat fast. '+
    'I said only, "This way, please," and walked with her for five minutes. '+
    'When she said, "You saved my day," I felt <u>(お) ___</u>.<br><br>'+
    '<b>③</b> At the workshop, Ms. Mori taught us how to make Japanese paper. '+
    'My first paper broke, and I wanted to stop. Ms. Mori said, "My first paper broke, too. That was thirty years ago." '+
    'Then she showed me a small piece of her old paper. It was thick and not beautiful, but she still keeps it. '+
    'I made my paper again, and this time it did not break.<br><br>'+
    '<b>④</b> Some people say that one school trip cannot change a student. That may be true. '+
    '<u>④ Three days away from home cannot teach a student everything</u>. '+
    'But something did change in me on that street. <u>③ ( me / speaking / brave / made / English )</u>. '+
    'Now I raise my hand in English class, even when I am not sure. '+
    'So when someone asks you for help in English, please don\'t <u>(か) ___</u> away!',
    passageEn:true,
    note:'語注：beat （心臓が）鼓動する／save 〜を助ける／thick 厚い／raise 〜を上げる／brave 勇気のある',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お happy　か look"), E("お happy　か come"),
                E("お bored　か look"), E("お bored　か come") ], answer:0 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "カイトの最初の和紙はやぶれた。", "モリさんの最初の和紙もやぶれた。",
                "モリさんは自分の古い和紙を見せた。", "カイトは2枚目を作るのをあきらめた。" ], answer:3 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["me","speaking","brave","made","English"], answer:"Speaking English made me brave",
      display:"Speaking English made me brave" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語4語を、第2段落中から抜き出して書きなさい。<br>"+E("The woman told Kaito, \"（　え　）,\" and he was glad."),
      answers:["You saved my day"], hint:"第2段落の語・英語4語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>家をはなれた（　①　）日間で、生徒に（　②　）を教えることはできない。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "3","5","7","10" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "すべてのこと","英語の文法","地図の読み方","和紙の作り方" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Before the trip, Kaito thought English was only a subject for tests."),
                E("Kaito's friends talked to the woman with the map."),
                E("Ms. Mori still keeps the first paper she made."),
                E("Kaito never speaks in English class now."),
                E("The woman was angry because Kaito walked slowly.") ], answer:[0,2] } ]}
]}

]};
