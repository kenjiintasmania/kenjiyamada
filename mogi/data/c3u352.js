/* data/c3u352.js ─ 中3 単元テスト352（初見・自動採点のみ・先生が受付を開けた時だけ）
   … 構成・問題数・配点は data/chu3_352.js（中3 352）と同じ（連動）。文法は同じ・単語だけ入れかえ。
   先生指示：「問題構成や文法はほぼそのままで、単語だけ少し違う（でも同じ方向性の単語）」＝
   生徒は模試352を自習してから、授業でこの単元テストを初見で受ける。
   参照：factory/inputs/authoring_rules.md／骨格 mogi/data/chu3_352.js（大問1〜5・28問・100点）。
   題材：海外の姉妹校とのオンライン交流／時差・季節と文化のちがい・学校生活
        （架空の町 Kusano City／相手校は New Zealand の架空の Fern Lake School。
          日本の4〜9月＝ニュージーランドは標準時で日本より3時間進み、6〜8月が冬）。
   登場人物：Tomoya, Ayane, Ms. Scott（ALT・ニュージーランド出身）, Zoe（相手校の生徒）。
   ※過去問および既存の模試データとの内容重複なし。
   ロック式：先生が /admin で「スタート」するまで問題は表示されない（exam.html の unit:true）。 */
const E = s => '<span class="en">'+s+'</span>';

window.EXAM = {
title: "中3 単元テスト352",
sections: [

/* ===== 大問1 リスニング（問題A〜D） ===== */
{ no:1, title:"リスニングテスト", lead:"放送文を読んで、内容に合うものを選びましょう（実際の試験では音声が流れます）。", groups:[

  /* 問題A：絵・表を選ぶ（英文1回読み・2問） */
  { intro:"問題A　放送を聞いて、内容に合う絵や表をア〜エから選びなさい。英文は1回読まれます。",
    script:'(1) Look at the picture. Tomoya is holding a map of Japan, and Ayane is pointing at the screen.',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"放送に合う絵はどれですか。",
      choices:["トモヤが日本地図を持ち、アヤネが画面を指さしている。","トモヤが日本地図を持ち、アヤネがノートに何かを書いている。",
               "トモヤが画面を指さし、アヤネが日本地図を持っている。","トモヤとアヤネが二人とも日本地図を持っている。"], answer:0 } ] },
  { script:'(2) Look at the table. When it is ten in the morning in Kusano City, it is one in the afternoon at Fern Lake School. New Zealand is three hours ahead of Japan.',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"放送に合う表（クサノ市とファーンレイク校の時刻）はどれですか。",
      choices:["クサノ市 午前10時／ファーンレイク校 午前7時","クサノ市 午前10時／ファーンレイク校 午後1時",
               "クサノ市 午前11時／ファーンレイク校 午前10時","クサノ市 午前10時／ファーンレイク校 午後11時"], answer:1 } ] },

  /* 問題B：チャイムの応答（対話の最後への応答・2回読み・2問） */
  { intro:"問題B　対話の最後にチャイムが鳴ります。チャイムの部分に入る応答を、ア〜エから選びなさい。英文は2回読まれます。",
    script:
      '<span class="sp"><span class="who">A:</span> The online talk will begin at ten. Have you finished your speech yet?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("No, I have never seen it."), E("Yes, I have. I practiced it last night."),
                E("Yes, it was very cold last night."), E("He lives near the park.") ], answer:1 } ] },
  { script:
      '<span class="sp"><span class="who">A:</span> Zoe says it\'s winter in New Zealand now. Isn\'t that strange?</span>'+
      '<span class="sp"><span class="who">B:</span> （チャイム）</span>',
    items:[
    { type:"mcq", label:"(2)", pt:3, stem:"チャイムの部分に入る応答は？",
      choices:[ E("Yes, I had curry for lunch."), E("No, he isn't my brother."),
                E("Really? It's very hot here in July."), E("I'll go there by train tomorrow.") ], answer:2 } ] },

  /* 問題C：メモの空所補充（英語1語×3・2回読み） */
  { intro:"問題C　トモヤ(Tomoya)が、ALT のスコット(Ms. Scott)先生からオンライン交流についての説明を聞いて、メモを取っています。（あ）〜（う）に適切な英語1語を入れなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Hello, everyone. Our first online meeting with Fern Lake School will be next weekend.</span>'+
      '<span class="sp">We will use the music room on the third floor, because it has a big screen and good speakers.</span>'+
      '<span class="sp">The meeting will be about sixty minutes long, so please prepare some questions about their school.</span>',
    passage:'<b>トモヤのメモ</b><br>Online meeting with Fern Lake School<br>'+
            '— will be next （　あ　）<br>'+
            '— place: the （　い　） room on the third floor<br>'+
            '— about （　う　） minutes long<br>'+
            '— prepare some questions about their school',
    items:[
    { type:"fill", label:"あ", pt:2, stem:"（あ）", answers:["weekend"], hint:"英語1語" },
    { type:"fill", label:"い", pt:2, stem:"（い）", answers:["music"], hint:"英語1語" },
    { type:"fill", label:"う", pt:2, stem:"（う）", answers:["sixty","60"], hint:"英語1語（数）" } ] },

  /* 問題D：説明＋人物発言（内容一致選択＋3語の英語） */
  { intro:"問題D　あなたとクラスメイトのアヤネ(Ayane)が、オンライン交流の活動についての説明を聞いて話しています。放送を聞いて(1)(2)に答えなさい。英文は2回読まれます。",
    script:
      '<span class="sp">Next month, our school will begin an online exchange program with Fern Lake School in New Zealand. Each of you will choose one of them.</span>'+
      '<span class="sp">Activity A is playing Japanese card games with the students there. Activity B is teaching Japanese origami to them. Activity C is making a short video about our school.</span>'+
      '<span class="sp">Each group will meet the New Zealand students on Wednesday morning. It is Wednesday afternoon there, because New Zealand is three hours ahead of Japan.</span>'+
      '<span class="sp">Please speak clearly and in a loud voice.</span>'+
      '<span class="sp"><span class="who">Ayane:</span> I love origami, but I\'m not good at making videos. Which one are you going to choose?</span>',
    items:[
    { type:"mcq", label:"(1)", pt:3, stem:"説明の内容と合っているものを、ア〜エから1つ選びなさい。",
      choices:["活動は3種類あり、2つを選ぶことができる。","各グループは水曜日の午前中にニュージーランドの生徒と会う。",
               "ニュージーランドは日本より1時間進んでいる。","生徒はできるだけ小さな声で話すように言われている。"], answer:1 },
    { type:"fill", label:"(2)", pt:3,
      stem:"アヤネの発言に対して、あなたはどのように答えますか。書き出しに続けて（　）に origami を含む3語の英語を書き、英文を完成させなさい。<br>"+
           E("That's a good activity for you. Let's （　　） together."),
      answers:["teach Japanese origami","make Japanese origami"], hint:"英語3語（説明の中の言い方を使う）" } ] }
]},

/* ===== 大問2 ちらし（表）＋対話 ===== */
{ no:2, title:"中学生のトモヤ(Tomoya)とアヤネ(Ayane)が、姉妹校とのオンライン交流週間のちらしを見ながら会話をしています。次は、そのちらしと会話です。(1)〜(5)に答えなさい。", groups:[
  { flyer:
    '<h4>Fern Lake Week at Kusano Junior High School</h4>'+
    '<div class="note">Let\'s talk with the students at our sister school in New Zealand online!</div>'+
    '<table><tr><th>Day</th><th>Event</th><th>Place</th><th>Students</th></tr>'+
    '<tr><td>Monday</td><td>Online tour of Fern Lake School</td><td>computer room</td><td>25</td></tr>'+
    '<tr><td>Tuesday</td><td>Song time — learning a song from New Zealand</td><td>music room</td><td>18</td></tr>'+
    '<tr><td>Wednesday</td><td>Cooking online — New Zealand cookies</td><td>cooking room</td><td>12</td></tr>'+
    '<tr><td>Thursday</td><td>Talk with Fern Lake students in pairs</td><td>English room</td><td>20</td></tr></table>'+
    '<div class="note">Time … 10:00 a.m. – 10:50 a.m. (Japan time) = 1:00 p.m. – 1:50 p.m. (New Zealand time)<br>'+
    'Fee … The cooking event is 300 yen for the food. The online tour is 150 yen for the map of the school. You don\'t need money for the other two events.<br>'+
    'Bring … your own tablet.<br>'+
    'Please use easy words and gestures. The students there study Japanese, too.</div>',
    passage:
    '<span class="sp"><span class="who">Tomoya:</span> Ayane, look at this. Fern Lake Week begins next Monday. We can talk with the students in New Zealand online.</span>'+
    '<span class="sp"><span class="who">Ayane:</span> Nice! I want to join the online tour on Monday. And on Wednesday, we can learn how to make New Zealand cookies.</span>'+
    '<span class="sp"><span class="who">Tomoya:</span> Sounds good. Will you join both of them?</span>'+
    '<span class="sp"><span class="who">Ayane:</span> Yes. I have （　い　） for this week since Ms. Scott showed us the pictures of Fern Lake School. What about you?</span>'+
    '<span class="sp"><span class="who">Tomoya:</span> I\'ll join the talk on Thursday. I want to ask them about their school life. Have you ever <u>(う) meet</u> a person from New Zealand?</span>'+
    '<span class="sp"><span class="who">Ayane:</span> Only once, at the city festival last summer. She used （　あ　）, so I could understand her English.</span>'+
    '<span class="sp"><span class="who">Tomoya:</span> Then let\'s use （　あ　）, too. The students there study Japanese, so they will try hard to understand us.</span>'+
    '<span class="sp"><span class="who">Ayane:</span> Right. And I\'ll bring my own tablet. I want to show them some pictures of our town.</span>'+
    '<span class="sp"><span class="who">Tomoya:</span> Good idea. Let\'s tell Ms. Scott about our plans.</span>',
    note:'語注：sister school 姉妹校／tour 見学／song time 歌の時間／cookie クッキー／pair ペア／fee 料金／map 地図／tablet タブレット／festival 祭り／both 両方／gesture 身ぶり',
    items:[
    { type:"fill", label:"(1)あ", pt:3, stem:"2か所の（あ）に共通して入れるのに最も適当な英語1語を、ちらしの中から抜き出して書きなさい。",
      answers:["gestures"], hint:"ちらしの中にある語" },
    { type:"fill", label:"(2)い", pt:3, stem:"（い）に入れるのに最も適当な2語の英語を書きなさい。", answers:["been waiting"], hint:"英語2語（ずっと〜し続けている）" },
    { type:"fill", label:"(3)う", pt:3, stem:"下線部(う)の単語を、最も適当な形に変えて1語で書きなさい。", answers:["met"], hint:"Have you ever 〜 a person from New Zealand?" },
    { type:"mcq", label:"(4)", pt:3, stem:"ちらしから、アヤネが月曜日と水曜日の行事の両方に参加するとき、払う金額は全部でいくらですか。最も適当なのは、ア〜エのどれですか。",
      choices:[ E("150 yen"), E("300 yen"), E("450 yen"), E("600 yen") ], answer:2 },
    { type:"mcq", label:"(5)", pt:4, stem:"ちらしや会話から読み取れる内容として最も適当なのは、ア〜エのどれですか。",
      choices:[ E("Tomoya will join the cooking event on Wednesday."),
                E("The events begin at one in the afternoon in Japan."),
                E("Ayane talked with a girl from New Zealand last summer."),
                E("The students at Fern Lake School are learning French.") ], answer:2 } ]}
]},

/* ===== 大問3 会話の英作文（並べかえ2問） ===== */
{ no:3, title:"オンライン交流で、ファーンレイク校のゾーイ(Zoe)と中学生のトモヤ(Tomoya)が会話をしています。次の①〜⑥はそのときの二人の会話です。二人が考えている内容に合うように、(1)(2)の語を正しく並べかえて、会話を完成させなさい。なお、会話は①〜⑥の順に行われています。", groups:[
  { sceneNote:"イラスト：①ゾーイが手をこすりながら「今日はとても寒い。5度しかない」と言っている。②トモヤが「ニュージーランドではどの月がいちばん寒いのだろう」と考えながらたずねている。③ゾーイが「7月。ここでは冬は6月に始まる」と答えている。④トモヤが「日本では6月は夏の始まり」とおどろいている。⑤ゾーイが画面に映ったトモヤの後ろの絵を見て「その絵はどこで描かれたのだろう」と考えながらたずねている。⑥トモヤが「町の古い城で。姉が去年の春に描いた」と答えている。",
    passage:
    '<span class="sp"><span class="who">Zoe:</span> ① It\'s very cold here today. It\'s only five degrees!</span>'+
    '<span class="sp"><span class="who">Tomoya:</span> ② Really? <u>(1)</u>?</span>'+
    '<span class="sp"><span class="who">Zoe:</span> ③ July. Winter begins in June here.</span>'+
    '<span class="sp"><span class="who">Tomoya:</span> ④ Wow! In Japan, June is the beginning of summer.</span>'+
    '<span class="sp"><span class="who">Zoe:</span> ⑤ Interesting. By the way, I can see a nice picture on the wall behind you. <u>(2)</u>?</span>'+
    '<span class="sp"><span class="who">Tomoya:</span> ⑥ At the old castle in our town. My sister painted it last spring.</span>',
    passageEn:true,
    note:'語注：degree 度／beginning 始まり／castle 城／paint 〜を（絵の具で）描く',
    items:[
    { type:"wordorder", label:"(1)", pt:6, stem:"イラスト：トモヤが「ニュージーランドではどの月がいちばん寒いのですか」とたずねる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["Which month","is","the","coldest","in","New Zealand"], answer:"Which month is the coldest in New Zealand" },
    { type:"wordorder", label:"(2)", pt:5, stem:"イラスト：ゾーイが「その絵はどこで描かれたのですか」とたずねる場面。次の語を正しく並べて英文を完成させなさい。",
      words:["was","Where","that","picture","painted"], answer:"Where was that picture painted" } ]}
]},

/* ===== 大問4 話し合い＋日記 ===== */
{ no:4, title:"スコット(Ms. Scott)先生の英語の授業で、Tomoya と Ayane が、オンライン交流で相手校に見せるものについて話し合いをしています。次の英文は、話し合いと、その日に Ayane が書いた日記です。(1)〜(5)に答えなさい。", groups:[
  { passage:
    '<span class="sp"><span class="who">Ms. Scott:</span> Our second online meeting with Fern Lake School is next Thursday. This time, each of you will show the students there something about our school life. What would you like to show? Tomoya, you first.</span>'+
    '<span class="sp"><span class="who">Tomoya:</span> I want to <u>make Japanese lunch</u> in the cooking room and show it online. In the video Zoe sent us, the students were eating sandwiches in the garden, and nobody had a school lunch like ours.</span>'+
    '<span class="sp"><span class="who">Ms. Scott:</span> Good point. In New Zealand, most students bring a lunch box from home. What will you make, Tomoya?</span>'+
    '<span class="sp"><span class="who">Tomoya:</span> Miso soup. It is easy to make, and I can show the students how to make it.</span>'+
    '<span class="sp"><span class="who">Ms. Scott:</span> Nice. Ayane, how about you?</span>'+
    '<span class="sp"><span class="who">Ayane:</span> I want to show our school events, like the sports day in autumn. I also have one question. In the video, every student was wearing the same green sweater. Is it a school rule?</span>'+
    '<span class="sp"><span class="who">Ms. Scott:</span> Yes. Most schools there have a school uniform, so every student （　あ　） wear it. Some students even wear it in the city after school.</span>'+
    '<span class="sp"><span class="who">Ayane:</span> I see. Their school life is very different from ours.</span>'+
    '<span class="sp"><span class="who">Ms. Scott:</span> Right. Now let me tell you about my school days in New Zealand. Our school year began in early February, and we had a long summer vacation from the middle of December. I often went to the lake with my family.</span>'+
    '<span class="sp"><span class="who">Tomoya:</span> （　い　）</span>'+
    '<span class="sp"><span class="who">Ms. Scott:</span> Good question. My aunt lived in Japan, and she sent me Japanese comic books every year. I wanted to read them, so I started studying Japanese by myself.</span>'+
    '<span class="sp"><span class="who">Tomoya:</span> And now you teach English in Japan.</span>'+
    '<span class="sp"><span class="who">Ms. Scott:</span> Yes, and I love my life here. We can learn a lot from each other, so please ask the students many questions next Thursday.</span>',
    note:'語注：miso soup みそ汁／sandwich サンドイッチ／garden 庭／lunch box 弁当箱／sports day 運動会／sweater セーター／rule 規則／uniform 制服／even 〜でさえ／early February 2月の初めごろ／the middle of 〜 〜の中ごろ／aunt おば／comic book まんが本／by myself 自分で／each other おたがい' },
  { passage:'<b>Ayane の日記</b><br>Today we talked about the next online meeting. Tomoya will make miso soup, and I will show our school events. '+
            'I （　X　）, so I asked Ms. Scott about it. She also told us about her school days in New Zealand. '+
            'I want to ask Zoe a lot of questions next Thursday.', passageEn:true,
    items:[
    { type:"fill", label:"(1)", pt:4, stem:"下線部の内容になるように、次の文の[　　]に入る最も適当な英語3語を、話し合いの中の Tomoya の発言から抜き出して書きなさい。<br>"+E("Tomoya wants to [　　] and show it to the students at Fern Lake School."),
      answers:["make Japanese lunch"], hint:"英語3語" },
    { type:"mcq", label:"(2)あ", pt:3, stem:"（あ）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[E("has to"),E("doesn't have to"),E("must not"),E("is able to")], answer:0 },
    { type:"mcq", label:"(3)い", pt:3, stem:"（い）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("What did you do at the lake?"), E("How many comic books do you have?"),
                E("How did you start learning Japanese?"), E("When will you go back to New Zealand?") ], answer:2 },
    { type:"mcq", label:"(4)", pt:3, stem:"話し合いの内容と合っているのは、ア〜エのどれですか。",
      choices:[ E("Tomoya will make miso soup in the video Zoe sent."),
                E("Ms. Scott had her summer vacation in August."),
                E("Ayane wants to show the students some school events."),
                E("Students in New Zealand never wear a uniform at school.") ], answer:2 },
    { type:"mcq", label:"(5)X", pt:3, stem:"（X）に入れるのに最も適当なのは、ア〜エのどれですか。",
      choices:[ E("was good at making miso soup"), E("have been to New Zealand before"),
                E("wanted to make miso soup at home"), E("wanted to know about the sweater") ], answer:3 } ]}
]},

/* ===== 大問5 スピーチ（長文読解） ===== */
{ no:5, title:"次の英文は、トモヤ(Tomoya)が英語の授業で発表したスピーチです。(1)〜(6)に答えなさい。", groups:[
  { passage:
    '<b>①</b> Hello, everyone. I\'m Tomoya. Since April, our class has been talking with the students at Fern Lake School in New Zealand online. '+
    'Our school and Fern Lake School became sister schools two years ago. '+
    'Before the first meeting, I thought that making friends with people in other countries was very difficult. '+
    'Now my idea has changed, and I want to tell you the reason.<br><br>'+
    '<b>②</b> At the first meeting, I was so nervous that I could not say a word. Then a girl named Zoe waved her hand at the screen. '+
    'She spoke clearly and asked me easy questions, so I could answer them. She has been learning Japanese for three years, '+
    'and she showed me a card with the word "Arigato" on it. After the meeting, we began to send messages to each other. '+
    'Soon I found something interesting. When it is ten in the morning here, it is one in the afternoon at her school. '+
    'And in July, it is winter there! Zoe wrote, "We go skiing in the mountains in July." I was <u>(お) ___</u> to read that.<br><br>'+
    '<b>③</b> In June, I made a mistake. Zoe and I planned to talk online on Saturday at five in the afternoon, New Zealand time. '+
    'I forgot the time difference and turned on my computer at five, Japan time. It was already eight at night in New Zealand, and Zoe waited for thirty minutes. '+
    'I said sorry again and again, but she did not get angry. She just smiled and said, "It\'s OK. You will remember the time difference from now on." '+
    'She was right. Since then, I have always looked at the clock in New Zealand before I call her.<br><br>'+
    '<b>④</b> Some people say that we cannot be real friends with people we have never met. Maybe that is true. '+
    '<u>④ A short message cannot tell me everything about her town</u>. '+
    'But I learned something important through this program. <u>③ ( helped / Zoe / understand / me / her town )</u>. '+
    'Now I want to help her understand my town, too. When we learn how people on the other side of the world live, they become our friends. '+
    'So please come to the computer room next Thursday, and let\'s <u>(か) ___</u> the students at Fern Lake together!',
    passageEn:true,
    note:'語注：nervous 緊張して／named 〜という名前の／wave 〜をふる／card カード／message メッセージ／skiing スキー／mistake まちがい／New Zealand time ニュージーランドの時刻で／time difference 時差／turn on 〜の電源を入れる／get angry おこる／from now on これからは／the other side of the world 地球の反対側',
    items:[
    { type:"mcq", label:"(1)", pt:5, stem:"（お）・（か）に入る英語の組み合わせとして最も適当なのは、ア〜エのどれですか。",
      choices:[ E("お excited　か talk with"), E("お excited　か wait for"),
                E("お bored　か talk with"), E("お bored　か wait for") ], answer:0 },
    { type:"mcq", label:"(2)", pt:4, stem:"第3段落で述べられている内容として、当てはまらないものを、ア〜エから1つ選びなさい。",
      choices:[ "トモヤは日本時間の午後5時にコンピュータの電源を入れた。", "ゾーイは30分待った。",
                "ゾーイはトモヤに対しておこった。", "トモヤはそれ以来、電話をかける前にニュージーランドの時刻を確かめている。" ], answer:2 },
    { type:"wordorder", label:"(3)", pt:5, stem:"下線部③の語をすべて用いて、意味が通るように並べかえなさい。",
      words:["helped","Zoe","understand","me","her town"], answer:"Zoe helped me understand her town",
      display:"Zoe helped me understand her town" },
    { type:"fill", label:"(4)え", pt:4, stem:"次の文の（え）に入れるのに最も適当な英語3語を、第2段落中から抜き出して書きなさい。<br>"+E("After the first meeting, Tomoya and Zoe （　え　） messages to each other."),
      answers:["began to send"], hint:"第2段落の語・英語3語" },
    { type:"mcq", label:"(5)①", pt:4, stem:"下線部④の具体的内容を説明する次の文の①・②に入る日本語を考えます。<br>短い（　①　）は、彼女の（　②　）についてのすべてを私に伝えることはできない。<br>①に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "メッセージ","手紙","写真","電話" ], answer:0 },
    { type:"mcq", label:"(5)②", pt:4, stem:"②に入る最も適切なものを、ア〜エから選びなさい。",
      choices:[ "町","国","学校","家族" ], answer:0 },
    { type:"mcqMulti", label:"(6)", pt:7, stem:"本文の内容と合っているものを、ア〜オのうちから二つ選びなさい。",
      choices:[ E("Tomoya's class has been talking with the students in New Zealand since April."),
                E("Zoe could not say a word at the first meeting."),
                E("Zoe wrote that she goes skiing in the mountains in July."),
                E("Tomoya turned on his computer at five, New Zealand time."),
                E("Tomoya still thinks that making friends with people in other countries is difficult.") ], answer:[0,2] } ]}
]}

]};
