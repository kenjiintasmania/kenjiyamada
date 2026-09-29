/* data/fukuoka5.js ─ 福岡県スタイル 模擬テスト⑤（60点満点・26問）
   参照：factory/inputs/fukuoka_notes.md・factory/inputs/fukuoka_pattern.json
   （福岡県公立入試の「傾向のみ」を参照）。モデルは mogi/data/fukuoka1.js
   （大問1〜5・26問・60点・各小問の型と配点・日本語の言い回しを同じにしてある）。
   出題形式・問題数・配点バランスのみ踏襲し、本文・設問・選択肢はすべて新規創作。

   ★題材：祖父母の世代のくらしと昔の道具のインタビュー（探究：家事の時間の変化）。
   ★舞台：楠木町（Kusunoki Town・架空）。登場人物：マオ(Mao)・ソウタ(Sota)・
     ALT のベル先生(Mr. Bell)・マオの祖母の太田さん(Ms. Ota)。地名・人名・施設・行事はすべて架空。
   ★文法の軸：後置修飾（分詞・関係代名詞・不定詞の形容詞的用法）＋現在完了・受け身・比較。
   ★配点は 2点を基本単位、重い4問だけ4点（2点×22＋4点×4＝60）。
   ⚠ 小問ごとの配点は公式「正答及び配点」PDFが未確認のため**仮置き**（fukuoka1 と同一）。
     形式が確定したら fukuoka_pattern.json の対応表ごと差しかえる。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "福岡県スタイル 模擬テスト⑤",
fullMarks: 60,
sections: [

/* ===== 大問1 リスニング（問題1〜4・20点9問） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます。福岡県は問題1だけが1回読み、問題2〜4は2回読まれます）。", groups:[

  { intro:"問題1　放送を聞いて、内容に合うものをア〜エから1つ選びなさい。英文は1回だけ読まれます。",
    script:'(1) Look at the sign at Kusunoki Community Center. The talk about old tools starts at two fifteen.',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"放送に合うものはどれですか。",
      choices:["昔の道具についての話は2時15分に始まる。","昔の道具についての話は2時50分に始まる。",
               "昔の道具についての話は3時15分に始まる。","昔の写真についての話は2時15分に始まる。"], answer:0 } ] },
  { script:'(2) Look at the picture. Mao is washing clothes by hand, and Sota is carrying two bottles of water.',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"放送に合う絵はどれですか。",
      choices:["マオが手で服を洗い、ソウタが水の入ったボトルを2本運んでいる。","マオが手で服を洗い、ソウタが水の入ったボトルを1本運んでいる。",
               "マオが水の入ったボトルを2本運び、ソウタが手で服を洗っている。","マオが手で皿を洗い、ソウタが水の入ったボトルを2本運んでいる。"], answer:0 } ] },

  { intro:"問題2　マオ(Mao)とソウタ(Sota)が、下の案内を見ています。放送を聞いて、それぞれの問いに答えなさい。英文は2回読まれます。",
    passage:'<b>くすのき公民館　昔のくらし体験教室</b>'+
      '<table><tr><th>日</th><th>時こく</th><th>内容</th></tr>'+
      '<tr><td>Saturday</td><td>10:00 a.m.</td><td>Washing clothes by hand</td></tr>'+
      '<tr><td>Saturday</td><td>1:30 p.m.</td><td>Cooking rice in an old pot</td></tr>'+
      '<tr><td>Sunday</td><td>10:00 a.m.</td><td>Cooking rice in an old pot</td></tr>'+
      '<tr><td>Sunday</td><td>1:30 p.m.</td><td>Washing clothes by hand</td></tr></table>'+
      '<div class="note">Fee: 500 yen for one class</div>',
    script:'(1) Sota wants to try cooking rice in an old pot. He has soccer practice every Saturday, so he can go only on Sunday. Which one should he choose?',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"ソウタが選ぶのはどれですか。",
      choices:[ E("Saturday, 10:00 a.m."), E("Saturday, 1:30 p.m."),
                E("Sunday, 10:00 a.m."), E("Sunday, 1:30 p.m.") ], answer:2 } ] },
  { script:'(2) Look at the fee. Mao will join one class. She will also buy a book about old tools for three hundred yen. How much will she pay in all?',
    items:[
    { type:"mcq", label:"(2)", pt:2, stem:"マオが支払う合計金額はどれですか。",
      choices:[ E("300 yen"), E("500 yen"), E("800 yen"), E("1,000 yen") ], answer:2 } ] },

  { intro:"問題3　ALTのベル(Bell)先生が、自分の国のおばあさんの家について話しています。マオのメモの（あ）（い）に入る英語1語を書きなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, I\'m Mr. Bell. When I was a child, I often visited my grandmother\'s house. She didn\'t have a washing machine, so she washed clothes in the <b>river</b>.</span>'+
      '<span class="sp">She also made <b>bread</b> every morning. It took about two hours, but it was the best bread in the world.</span>',
    passage:'<b>マオのメモ</b><br>Mr. Bell のおばあさんの家<br>— no washing machine → washed clothes in the （　あ　）<br>'+
            '— made （　い　） every morning, about two hours',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）川", answers:["river"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）パン", answers:["bread"], hint:"英語1語" } ] },

  { intro:"問題4　太田さん(Ms. Ota)が、公民館で中学生に昔のくらしについて話しています。放送を聞いて(1)〜(3)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, everyone. I\'m Ota Yoshiko. I was born in Kusunoki Town seventy-five years ago.</span>'+
      '<span class="sp">When I was a child, my mother did all the housework by hand. Every morning, she got up at five and made a fire to cook rice. Washing clothes was the hardest work. She carried water from the river and washed everything with her hands. It took about two hours.</span>'+
      '<span class="sp">When I was twenty-five, my family bought a washing machine. My mother was very happy because she could use the time for other things. She started to read books in the afternoon.</span>'+
      '<span class="sp">Today I want to show you three old tools. Please touch them and think about the people who used them.</span>',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["太田さんの母は、毎朝5時に起きて火をおこしていた。","太田さんの母は、毎朝6時に起きて火をおこしていた。",
               "太田さんが10歳のとき、家族は洗濯機を買った。","太田さんは今日、昔の道具を5つ見せる。"], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"太田さんの母にとって最もたいへんだった仕事として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("making a fire"), E("washing clothes"),
                E("reading books"), E("carrying rice") ], answer:1 },
    { type:"fill", label:"(3)", pt:4,
      stem:"洗濯機を買ったとき、太田さんの母がうれしかった理由を、放送の中の語を使って英語3語で書きなさい。<br>"+
           E("Ms. Ota's mother was happy because she could use the time （　　）."),
      answers:["for other things"], hint:"英語3語（放送の中の言い方をそのまま使う）" } ] }
]},

/* ===== 大問2 短い対話の空所補充（8点4問） ===== */
{ no:2, title:"次の(1)〜(4)の対話について、それぞれの問いに答えなさい。", groups:[
  { note:"語注：interview インタビューする／project 学習の課題／pot なべ／tool 道具",
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: I hear you interviewed your grandmother for our project.<br>B: Yes. （　　）<br>A: That sounds interesting."),
      choices:[ E("She told me about her life as a child."), E("I will call her next week."),
                E("She has never lived in this town."), E("I forgot to ask her anything.") ], answer:0 },
    { type:"mcq", label:"(2)", pt:2,
      stem:"（　　）に入れるのに最も適当なのは、ア〜エのどれですか。<br>"+
           E("A: Which man in this old picture is your grandfather?<br>B: （　　）<br>A: The one with the hat? I see."),
      choices:[ E("The man who is wearing a hat."), E("He took it many years ago."),
                E("Yes, he is my grandfather."), E("I have no pictures of him.") ], answer:0 },
    { type:"fill", label:"(3)", pt:2,
      stem:"（　）内の語を、最も適当な形に変えて1語で書きなさい。<br>"+
           E("My grandmother has ( use ) this pot for fifty years."),
      answers:["used"], hint:"has のうしろ・1語" },
    { type:"wordorder", label:"(4)", pt:2,
      stem:"次の語を正しく並べかえて、『それは服を洗うのに使われる道具です。』という対話を完成させなさい。<br>"+
           E("A: What is this?<br>B: It is （　　）."),
      words:["used","a","tool","for","washing","clothes"], answer:"a tool used for washing clothes" } ]}
]},

/* ===== 大問3 対話文読解（10点5問） ===== */
{ no:3, title:"中学生のマオ(Mao)とソウタ(Sota)、ALTのベル(Bell)先生が、公民館の会の案内を見ながら話しています。次は、その案内と会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Kusunoki Community Center — Talk with Grandparents</h4>'+
    '<div class="note">Life in Kusunoki Town fifty years ago</div>'+
    '<table><tr><td>Date</td><td>November 15 (Sat)</td></tr>'+
    '<tr><td>Time</td><td>1:30 p.m. – 3:00 p.m.</td></tr>'+
    '<tr><td>Place</td><td>Kusunoki Community Center, Room 2</td></tr>'+
    '<tr><td>Speaker</td><td>Ms. Ota — housework and old tools</td></tr>'+
    '<tr><td>Students</td><td>The first 20 students</td></tr>'+
    '<tr><td>Sign-up</td><td>By November 10, at the teachers\' room</td></tr></table>'+
    '<div class="note">Bring … a notebook and a pencil. You can touch the old tools!</div>',
    passage:
    '<span class="sp"><span class="who">Mao:</span> Mr. Bell, look at this. There will be a talk at the community center. My grandmother will speak about housework fifty years ago.</span>'+
    '<span class="sp"><span class="who">Mr. Bell:</span> Really? That\'s great. I have wanted to learn about life in Japan in the past. What will she talk about?</span>'+
    '<span class="sp"><span class="who">Mao:</span> Fifty years ago, people （　あ　） clothes by hand. It took a long time. She will show us the tools she used.</span>'+
    '<span class="sp"><span class="who">Sota:</span> I want to go. My grandparents live far away, so I have never asked them about their old days. This is a good chance for me.</span>'+
    '<span class="sp"><span class="who">Mr. Bell:</span> When is it?</span>'+
    '<span class="sp"><span class="who">Sota:</span> On November fifteenth. It starts at one thirty and finishes at three.</span>'+
    '<span class="sp"><span class="who">Mr. Bell:</span> Can I join, too? In my country, my grandmother also （　あ　） clothes in the river when she was young.</span>'+
    '<span class="sp"><span class="who">Mao:</span> Of course. Everyone can come, but only twenty students can join. We should sign up by November tenth.</span>'+
    '<span class="sp"><span class="who">Sota:</span> Then let\'s go to the teachers\' room today. What should we bring?</span>'+
    '<span class="sp"><span class="who">Mao:</span> A notebook and a pencil. We can touch the old tools and take pictures of them, so let\'s write <u>(い) ( questions / the / want / we / to ask )</u> before the talk.</span>'+
    '<span class="sp"><span class="who">Mr. Bell:</span> Good idea. I want to ask how long it took to wash clothes without a machine.</span>'+
    '<span class="sp"><span class="who">Mao:</span> My grandmother says it took two hours every day. Now our washing machine does it in forty minutes.</span>'+
    '<span class="sp"><span class="who">Sota:</span> Wow. People had less free time then. I want to know how they spent their days.</span>'+
    '<span class="sp"><span class="who">Mr. Bell:</span> Let\'s ask her on that day. I\'m looking forward to it.</span>',
    note:'語注：housework 家事／sign up 申しこむ／far away 遠くに／community center 公民館',
    items:[
    { type:"mcq", label:"(1)", pt:2, stem:"2か所の（あ）に共通して入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("washed"), E("bought"), E("wore"), E("cut") ], answer:0 },
    { type:"mcq", label:"(2)", pt:2, stem:"申しこみについて、案内と会話から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Students should sign up at the teachers' room by November tenth."), E("Students can sign up on the day of the talk."),
                E("Only ten students can join the talk."), E("Students should sign up at the community center.") ], answer:0 },
    { type:"mcq", label:"(3)", pt:2, stem:"案内や会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Sota has never asked his grandparents about their old days."), E("Mr. Bell doesn't want to join the talk."),
                E("The talk finishes at one thirty."), E("Mao's grandmother will talk about school life.") ], answer:0 },
    { type:"fill", label:"(4)", pt:2,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、会話の中から抜き出して書きなさい。<br>"+
           E("Fifty years ago, washing clothes took （　　）, but now a washing machine does it in forty minutes."),
      answers:["two hours every day"], hint:"英語4語" },
    { type:"wordorder", label:"(5)", pt:2, stem:"下線部(い)の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["questions","the","want","we","to ask"], answer:"the questions we want to ask",
      display:"the questions we want to ask" } ]}
]},

/* ===== 大問4 長文読解（14点5問・グラフつき） ===== */
{ no:4, title:"次の英文は、楠木中学校のソウタ(Sota)が、探究学習の発表で話した内容です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Sota. Last month, I listened to a talk by Ms. Ota, Mao\'s grandmother. '+
    'She said, "When I was a child, my mother worked in the house all day." I was surprised. '+
    'I wanted to know how much time people spent on housework in the past, so I started my research.<br><br>'+
    '<b>②</b> First, I interviewed Ms. Ota and four other people who are over seventy. '+
    'I asked them how long their mothers spent on washing clothes, cooking, and cleaning in one day. '+
    'It was not easy to find people over seventy, so Mao introduced her grandmother\'s friends to me. '+
    'Then I asked my mother and four other parents the same question about today. '+
    'I put the answers on one graph. The bars show the minutes for each kind of housework.<br><br>'+
    '<b>③</b> Look at the graph. Fifty years ago, people spent one hundred and eighty minutes on cooking. '+
    'It was the longest of the three. Washing clothes took one hundred and twenty minutes '+
    'because people had to carry water and wash everything by hand. '+
    'Today, washing clothes takes only forty minutes. That is one third of the time in the past. '+
    'Cleaning was the shortest of the three in both years. '+
    'In all, housework took three hundred and sixty minutes a day fifty years ago, but it takes one hundred and sixty minutes today.<br><br>'+
    '<b>④</b> Why did the time become shorter? Ms. Ota said, "Machines changed our lives." '+
    '<u>③ ( machines / the / invented / that / were ) after that time</u> did the hard work for us. '+
    'Washing machines, rice cookers, and vacuum cleaners are good examples. '+
    'Ms. Ota also told me something important. '+
    'After her family bought a washing machine, her mother started to read books and visit her friends in the afternoon. '+
    'Housework became easier, so people got more free time.<br><br>'+
    '<b>⑤</b> From my research, I learned two things. '+
    'First, the tools around us have a long history, and someone made them to help people. '+
    'For example, the rice cooker in my kitchen was born from the hard work of many people. '+
    'Second, our free time is a gift from the people who made those tools. '+
    'Now, I don\'t want to waste my time. I want to use it for something good, '+
    'like my grandparents\' generation did with their new free time. Thank you for listening.',
    passageEn:true,
    flyer:
    '<h4>グラフ：1日の家事にかかる時間（分）　50年前と現在</h4>'+
    '<table><tr><th>家事</th><th>洗濯</th><th>料理</th><th>そうじ</th><th>合計</th></tr>'+
    '<tr><td>50年前</td><td>120</td><td>180</td><td>60</td><td>360</td></tr>'+
    '<tr><td>現在</td><td>40</td><td>90</td><td>30</td><td>160</td></tr></table>',
    note:'語注：research 調査／invent 発明する／rice cooker 炊飯器／vacuum cleaner そうじ機／one third 3分の1／waste むだにする／generation 世代',
    items:[
    { type:"mcq", label:"(1)", pt:2,
      stem:"次の1文は、①〜⑤のどの段落の直後に入れるのが最も適当ですか。<br>"+
           E("In other words, people today spend less than half of that time on housework."),
      choices:["①の直後","②の直後","③の直後","④の直後"], answer:2 },
    { type:"mcq", label:"(2)", pt:2, stem:"グラフと本文から読み取れることとして最も適当なのは、ア〜エのどれですか。",
      choices:["50年前は料理にかかる時間が最も長く、1日180分だった。","現在は洗濯にかかる時間が3つの中で最も長い。",
               "50年前のそうじの時間は、現在の2倍より長かった。","現在の家事の合計は1日360分である。"], answer:0 },
    { type:"wordorder", label:"(3)", pt:2, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["machines","the","invented","that","were"],
      answer:"the machines that were invented",
      display:"the machines that were invented" },
    { type:"fill", label:"(4)", pt:4,
      stem:"次の文の（　）に入れるのに最も適当な英語4語を、第4段落から抜き出して書きなさい。<br>"+
           E("Because housework became easier, people （　　）."),
      answers:["got more free time"], hint:"第4段落の語・英語4語" },
    { type:"mcqMulti", label:"(5)", pt:4, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Sota interviewed five people who are over seventy."),
                E("Sota asked only his mother about housework today."),
                E("Fifty years ago, washing clothes took longer than cooking."),
                E("Ms. Ota said that machines changed people's lives."),
                E("Sota thinks that free time is not important.") ], answer:[0,3] } ]}
]},

/* ===== 大問5 条件英作文（8点3問・骨組みを作る形） ===== */
{ no:5, title:"祖父母の世代のくらしについて学んだことを生かして、楠木中学校で新しい活動を始めます。次のA〜Cから1つ選び、始めたい活動とその理由を伝える英文を作ります。ここでは A を選んだものとして、(1)〜(3)に答えなさい。", groups:[
  { passage:
    '<b>3つの案</b><br>'+
    'A： 昔の道具を体験する会を開く　'+E("hold an event to try old tools")+'<br>'+
    'B： お年寄りへのインタビューを本にする　'+E("make a book of interviews with old people")+'<br>'+
    'C： 家族と家事を分け合う週を作る　'+E("start a week to share housework with our family")+'<br><br>'+
    '<b>作る英文の組み立て</b><br>'+
    '① どの活動を始めたいか　→　② その理由　→　③ 相手にどうなってほしいか',
    note:'語注：hold 開く／event 行事／share 分け合う',
    items:[
    { type:"wordorder", label:"(1)", pt:2,
      stem:"①「わたしたちは昔の道具を体験する会を開くべきだと思う。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["think","I","should","we","hold","an event to try old tools"],
      answer:"I think we should hold an event to try old tools",
      display:"I think we should hold an event to try old tools." },
    { type:"wordorder", label:"(2)", pt:2,
      stem:"②「なぜなら、わたしたちは50年前に使われていた道具について学べるからです。」という文になるように、次の語句を正しく並べかえなさい。",
      words:["because","we","can learn","about","the tools","used fifty years ago"],
      answer:"because we can learn about the tools used fifty years ago",
      display:"because we can learn about the tools used fifty years ago." },
    { type:"fill", label:"(3)", pt:4,
      stem:"③「わたしはみんなに、その道具を作った人々について考えてほしい。」という文にします。<br>"+
           "（　）に入れるのに最も適当な英語3語を書きなさい。<br>"+
           E("I want everyone （　　） the people who made those tools."),
      answers:["to think about","to think of"], hint:"英語3語（want＋人＋to 〜 の形）" } ]}
]}

]};
