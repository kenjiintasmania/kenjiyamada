/* dojo/data/drill_s3.js ─ 読解道場 S3「図表突合」（ちらし×条件照合・自動採点）
   岡山県立入試 大問2（ちらし＋対話）対策。質問の条件を先に握ってから表を見る訓練（T10）。
   ちらしは6枚（F1〜F6）×各2問＝12問。同じ fly のちらし文字列は完全に同一。 */
window.DOJO_S3 = {
  skill: "S3", name: "図表突合",
  desc: "質問の条件（だれ・いつ・いくら）を先に決めてから、ちらしの該当行だけを見る",
  items: [

    /* ── F1: わかば果樹園の桃狩り（料金計算／集合時刻） ── */
    { id:"S3-01", fly:"F1", tech:["T10","T02"],
      flyer:'<div class="fly-t">Wakaba Fruit Farm — Peach Picking Day</div>'+
            '<table>'+
            '<tr><th>Date</th><td>Sunday, August 2</td></tr>'+
            '<tr><th>Time</th><td>9:30 a.m. – 12:00 p.m.</td></tr>'+
            '<tr><th>Place</th><td>Wakaba Fruit Farm (10 minutes by bus from Wakaba Station)</td></tr>'+
            '<tr><th>Fee</th><td>Adults: 1,000 yen<br>'+
            'Junior high school students: 600 yen<br>'+
            'Children (10 years old or under): free</td></tr>'+
            '</table>'+
            '<div class="fly-n">Note:<br>'+
            '・Please come to the farm gate by 9:15 a.m. You can eat two peaches at the farm and take one peach home.<br>'+
            '・Only the first 30 people can join. Please call the farm office by Thursday, July 30.<br>'+
            '・If it rains, the event will move to Sunday, August 9.</div>',
      q:"中学生2人と大人1人でこのイベントに参加します。参加費は全部でいくらですか。",
      choices:["1,600 yen","1,800 yen","2,200 yen","3,000 yen"],
      answer:2,
      why:"①条件を確認（中学生2人・大人1人）→②料金表の Junior high school students の行（600円）と Adults の行（1,000円）→③600×2＋1,000＝2,200円。",
      trap:"中学生を1人分しか数えないと1,600円、3人全員を大人料金で計算すると3,000円になる。" },

    { id:"S3-02", fly:"F1", tech:["T10","T02","T01"],
      flyer:'<div class="fly-t">Wakaba Fruit Farm — Peach Picking Day</div>'+
            '<table>'+
            '<tr><th>Date</th><td>Sunday, August 2</td></tr>'+
            '<tr><th>Time</th><td>9:30 a.m. – 12:00 p.m.</td></tr>'+
            '<tr><th>Place</th><td>Wakaba Fruit Farm (10 minutes by bus from Wakaba Station)</td></tr>'+
            '<tr><th>Fee</th><td>Adults: 1,000 yen<br>'+
            'Junior high school students: 600 yen<br>'+
            'Children (10 years old or under): free</td></tr>'+
            '</table>'+
            '<div class="fly-n">Note:<br>'+
            '・Please come to the farm gate by 9:15 a.m. You can eat two peaches at the farm and take one peach home.<br>'+
            '・Only the first 30 people can join. Please call the farm office by Thursday, July 30.<br>'+
            '・If it rains, the event will move to Sunday, August 9.</div>',
      q:"当日は、何時までに農園の入り口（farm gate）に行けばよいですか。",
      choices:["9:00 a.m.","9:15 a.m.","9:30 a.m.","12:00 p.m."],
      answer:1,
      why:"①条件は「集合時刻」→②Note の1行目「come to the farm gate by 9:15 a.m.」→③表の Time 欄（9:30開始）ではなく Note の集合時刻を選ぶ。",
      trap:"表の Time 欄の開始時刻 9:30 a.m. を集合時刻だと思い込みやすい。" },

    /* ── F2: みどり文化センターの陶芸体験（割引つき料金計算／持ち物） ── */
    { id:"S3-03", fly:"F2", tech:["T10","T02"],
      flyer:'<div class="fly-t">Midori Culture Center — Summer Art Class: Make Your Own Cup</div>'+
            '<table>'+
            '<tr><th>Date</th><td>Saturday, July 25</td></tr>'+
            '<tr><th>Time</th><td>1:30 p.m. – 3:30 p.m.</td></tr>'+
            '<tr><th>Place</th><td>Midori Culture Center, Room 2 (5 minutes on foot from Midori Station)</td></tr>'+
            '<tr><th>Fee</th><td>Adults: 1,200 yen<br>'+
            'Junior high school students: 800 yen<br>'+
            '★If three or more people join together, each person pays 200 yen less.</td></tr>'+
            '</table>'+
            '<div class="fly-n">Note:<br>'+
            '・You will make a cup with clay. Aprons and clay are ready for you at the center.<br>'+
            '・Please bring an old towel. You do not need to bring anything else.<br>'+
            '・Only 16 people can join. Please send an e-mail to the center by Wednesday, July 22. Your cup will be ready in four weeks.<br>'+
            '〔注〕clay ねん土　apron エプロン</div>',
      q:"大人2人と中学生1人がいっしょに申しこむと、参加費は全部でいくらですか。",
      choices:["2,600 yen","3,000 yen","3,200 yen","3,600 yen"],
      answer:0,
      why:"①条件を確認（大人2・中学生1＝3人でいっしょに申込）→②料金表で 1,200×2＋800＝3,200円→③★の「3人以上は1人200円引き」で3,200−200×3＝2,600円。",
      trap:"料金表の上2行だけ見て★の割引を見落とすと、3,200円を選んでしまう。" },

    { id:"S3-04", fly:"F2", tech:["T10","T02"],
      flyer:'<div class="fly-t">Midori Culture Center — Summer Art Class: Make Your Own Cup</div>'+
            '<table>'+
            '<tr><th>Date</th><td>Saturday, July 25</td></tr>'+
            '<tr><th>Time</th><td>1:30 p.m. – 3:30 p.m.</td></tr>'+
            '<tr><th>Place</th><td>Midori Culture Center, Room 2 (5 minutes on foot from Midori Station)</td></tr>'+
            '<tr><th>Fee</th><td>Adults: 1,200 yen<br>'+
            'Junior high school students: 800 yen<br>'+
            '★If three or more people join together, each person pays 200 yen less.</td></tr>'+
            '</table>'+
            '<div class="fly-n">Note:<br>'+
            '・You will make a cup with clay. Aprons and clay are ready for you at the center.<br>'+
            '・Please bring an old towel. You do not need to bring anything else.<br>'+
            '・Only 16 people can join. Please send an e-mail to the center by Wednesday, July 22. Your cup will be ready in four weeks.<br>'+
            '〔注〕clay ねん土　apron エプロン</div>',
      q:"この教室に自分で持っていく必要があるものはどれですか。",
      choices:["エプロン","飲み物","ねん土","古いタオル"],
      answer:3,
      why:"①条件は「持ち物」→②Note の bring の行「Please bring an old towel.」→③エプロンとねん土は「ready for you at the center」＝会場に用意ずみ。",
      trap:"Note に aprons の語があるので「エプロン持参」と誤解しやすい（実際は会場が用意する側）。" },

    /* ── F3: ひかり市の路面電車ツアー（料金計算／集合時刻・場所） ── */
    { id:"S3-05", fly:"F3", tech:["T10","T02"],
      flyer:'<div class="fly-t">Hikari City Tram Tour — Ride the Old Streetcar</div>'+
            '<table>'+
            '<tr><th>Date</th><td>Sunday, August 16</td></tr>'+
            '<tr><th>Tours</th><td>Morning Tour: 10:00 a.m. / Afternoon Tour: 2:00 p.m. (each tour is 90 minutes)</td></tr>'+
            '<tr><th>Meeting Place</th><td>East Gate of Hikari Station. Please come 15 minutes before your tour starts.</td></tr>'+
            '<tr><th>Fee</th><td>Adults: 800 yen<br>'+
            'Junior high school students: 500 yen<br>'+
            'Children (6 years old or under): free with an adult</td></tr>'+
            '</table>'+
            '<div class="fly-n">Note:<br>'+
            '・Each tour is for the first 20 people. Please buy your ticket at the Hikari Station Office by Friday, August 14.<br>'+
            '・The tour will run even if it rains.<br>'+
            '・A guide will tell you about the history of the town in easy English and Japanese.<br>'+
            '〔注〕streetcar／tram 路面電車</div>',
      q:"大人1人、中学生2人、6歳の子ども1人でツアーに参加します。料金は全部でいくらですか。",
      choices:["1,300 yen","1,800 yen","2,300 yen","2,400 yen"],
      answer:1,
      why:"①条件を確認（大人1・中学生2・6歳1）→②Adults 800円＋Junior high school students 500円×2→③6歳は「6 years old or under: free」で0円。合計1,800円。",
      trap:"6歳の子どもにも中学生料金の500円を足してしまうと2,300円になる。" },

    { id:"S3-06", fly:"F3", tech:["T10","T02","T01"],
      flyer:'<div class="fly-t">Hikari City Tram Tour — Ride the Old Streetcar</div>'+
            '<table>'+
            '<tr><th>Date</th><td>Sunday, August 16</td></tr>'+
            '<tr><th>Tours</th><td>Morning Tour: 10:00 a.m. / Afternoon Tour: 2:00 p.m. (each tour is 90 minutes)</td></tr>'+
            '<tr><th>Meeting Place</th><td>East Gate of Hikari Station. Please come 15 minutes before your tour starts.</td></tr>'+
            '<tr><th>Fee</th><td>Adults: 800 yen<br>'+
            'Junior high school students: 500 yen<br>'+
            'Children (6 years old or under): free with an adult</td></tr>'+
            '</table>'+
            '<div class="fly-n">Note:<br>'+
            '・Each tour is for the first 20 people. Please buy your ticket at the Hikari Station Office by Friday, August 14.<br>'+
            '・The tour will run even if it rains.<br>'+
            '・A guide will tell you about the history of the town in easy English and Japanese.<br>'+
            '〔注〕streetcar／tram 路面電車</div>',
      q:"午後のツアーに参加する人は、何時にどこへ集合しますか。",
      choices:["午後2時に、ひかり駅の東口","午後1時45分に、ひかり駅の事務室（Station Office）","午後2時15分に、ひかり駅の東口","午後1時45分に、ひかり駅の東口"],
      answer:3,
      why:"①条件は「午後ツアーの集合時刻・場所」→②Meeting Place の行「東口に開始15分前」→③午後の開始は2:00 p.m.なので、集合は1:45に東口。",
      trap:"「15 minutes before」を読み落として、開始時刻の午後2時ちょうどを選びやすい。" },

    /* ── F4: わかば市立図書館のイベント（参加可否／定員） ── */
    { id:"S3-07", fly:"F4", tech:["T10","T02"],
      flyer:'<div class="fly-t">Wakaba City Library — Summer Book Festival</div>'+
            '<table>'+
            '<tr><th>Date</th><td>Saturday, August 8</td></tr>'+
            '<tr><th>Time</th><td>10:00 a.m. – 3:00 p.m.</td></tr>'+
            '<tr><th>Place</th><td>Wakaba City Library, 2nd floor</td></tr>'+
            '<tr><th>Events</th><td>Book Talk (11:00 a.m.): free, about 40 seats<br>'+
            'Quiz Rally (all day): free<br>'+
            'Bookmark Making Workshop (1:00 p.m.)</td></tr>'+
            '<tr><th>Workshop Fee</th><td>Adults: 300 yen<br>'+
            'Junior high school students: 100 yen<br>'+
            'Elementary school students and younger: free</td></tr>'+
            '</table>'+
            '<div class="fly-n">Note:<br>'+
            '・The workshop is for the first 15 people. You will use a cutter knife, so it is for people who are 10 years old or older.<br>'+
            '・The first 30 people who finish the Quiz Rally will get a small present.<br>'+
            '・If you want to borrow books, please bring your library card. You can borrow up to 10 books on this day.<br>'+
            '〔注〕bookmark しおり　elementary school 小学校</div>',
      q:"次のうち、しおり作りワークショップに参加できないのはだれですか。",
      choices:["8歳の小学生","10歳の小学生","13歳の中学生","40歳の大人"],
      answer:0,
      why:"①条件は「ワークショップに参加できる人」→②Note の「10 years old or older」の行→③8歳はこの条件に合わないので参加できない（10歳の小学生は無料で参加できる）。",
      trap:"料金表の「小学生以下は無料」の行だけ見て、小学生ならだれでも参加できると思ってしまう。" },

    { id:"S3-08", fly:"F4", tech:["T10","T02"],
      flyer:'<div class="fly-t">Wakaba City Library — Summer Book Festival</div>'+
            '<table>'+
            '<tr><th>Date</th><td>Saturday, August 8</td></tr>'+
            '<tr><th>Time</th><td>10:00 a.m. – 3:00 p.m.</td></tr>'+
            '<tr><th>Place</th><td>Wakaba City Library, 2nd floor</td></tr>'+
            '<tr><th>Events</th><td>Book Talk (11:00 a.m.): free, about 40 seats<br>'+
            'Quiz Rally (all day): free<br>'+
            'Bookmark Making Workshop (1:00 p.m.)</td></tr>'+
            '<tr><th>Workshop Fee</th><td>Adults: 300 yen<br>'+
            'Junior high school students: 100 yen<br>'+
            'Elementary school students and younger: free</td></tr>'+
            '</table>'+
            '<div class="fly-n">Note:<br>'+
            '・The workshop is for the first 15 people. You will use a cutter knife, so it is for people who are 10 years old or older.<br>'+
            '・The first 30 people who finish the Quiz Rally will get a small present.<br>'+
            '・If you want to borrow books, please bring your library card. You can borrow up to 10 books on this day.<br>'+
            '〔注〕bookmark しおり　elementary school 小学校</div>',
      q:"しおり作りワークショップに参加できるのは、先着何人までですか。",
      choices:["10人","15人","30人","40人"],
      answer:1,
      why:"①条件は「ワークショップの定員」→②Note の workshop の行「for the first 15 people」→③クイズラリーの30人やブックトークの40席の数字と混同しない。",
      trap:"別の行の数字（プレゼント先着30人・座席約40・貸出10冊）を拾ってしまう。" },

    /* ── F5: みどり川の夏祭りと花火（締切／場所・アクセス） ── */
    { id:"S3-09", fly:"F5", tech:["T10","T02"],
      flyer:'<div class="fly-t">Midori River Summer Festival and Fireworks</div>'+
            '<table>'+
            '<tr><th>Date</th><td>Saturday, August 22</td></tr>'+
            '<tr><th>Time</th><td>4:00 p.m. – 9:00 p.m. (Fireworks: 8:00 p.m. – 8:45 p.m.)</td></tr>'+
            '<tr><th>Place</th><td>Midori River Park (10 minutes on foot from Midori Station)</td></tr>'+
            '<tr><th>Fee</th><td>Entry: free<br>'+
            'Special seats for the fireworks: Adults: 500 yen / Junior high school students: 300 yen<br>'+
            'Elementary school students and younger: free with an adult</td></tr>'+
            '</table>'+
            '<div class="fly-n">Note:<br>'+
            '・Special seat tickets: at Midori Town Office (in front of Midori Station), from Saturday, August 1 to Wednesday, August 19. Only 100 seats.<br>'+
            '・You cannot park your car at the park. Please walk from Midori Station.<br>'+
            '・If the weather is bad, the fireworks will move to Sunday, August 23.<br>'+
            '〔注〕fireworks 花火　Town Office 町役場</div>',
      q:"花火の特別席のチケットは、いつまでに買わなければなりませんか。",
      choices:["8月1日","8月19日","8月22日","8月23日"],
      answer:1,
      why:"①条件は「チケット購入の締切」→②Note のチケットの行「from August 1 to August 19」→③「to」の後ろの8月19日が締切。8月1日は販売開始日。",
      trap:"販売開始日の8月1日や、祭り当日の8月22日を締切と取りちがえやすい。" },

    { id:"S3-10", fly:"F5", tech:["T10","T02"],
      flyer:'<div class="fly-t">Midori River Summer Festival and Fireworks</div>'+
            '<table>'+
            '<tr><th>Date</th><td>Saturday, August 22</td></tr>'+
            '<tr><th>Time</th><td>4:00 p.m. – 9:00 p.m. (Fireworks: 8:00 p.m. – 8:45 p.m.)</td></tr>'+
            '<tr><th>Place</th><td>Midori River Park (10 minutes on foot from Midori Station)</td></tr>'+
            '<tr><th>Fee</th><td>Entry: free<br>'+
            'Special seats for the fireworks: Adults: 500 yen / Junior high school students: 300 yen<br>'+
            'Elementary school students and younger: free with an adult</td></tr>'+
            '</table>'+
            '<div class="fly-n">Note:<br>'+
            '・Special seat tickets: at Midori Town Office (in front of Midori Station), from Saturday, August 1 to Wednesday, August 19. Only 100 seats.<br>'+
            '・You cannot park your car at the park. Please walk from Midori Station.<br>'+
            '・If the weather is bad, the fireworks will move to Sunday, August 23.<br>'+
            '〔注〕fireworks 花火　Town Office 町役場</div>',
      q:"会場のみどり川公園への行き方として、ちらしの案内に合うものはどれですか。",
      choices:["みどり駅からバスで10分","車で行って、公園に駐車する","みどり駅から歩いて10分","みどり町役場から歩いて10分"],
      answer:2,
      why:"①条件は「会場への行き方」→②Place の行「10 minutes on foot from Midori Station」→③Note で「車は公園に駐車できない」ことも確認。",
      trap:"「10分」だけ見て手段（on foot＝徒歩）を取りちがえ、バスや車を選んでしまう。" },

    /* ── F6: ひかりビーチ清掃ボランティア（参加可否／申込方法） ── */
    { id:"S3-11", fly:"F6", tech:["T10","T02"],
      flyer:'<div class="fly-t">Hikari Beach Clean-up Day</div>'+
            '<table>'+
            '<tr><th>Date</th><td>Sunday, July 26</td></tr>'+
            '<tr><th>Time</th><td>8:00 a.m. – 10:00 a.m. (Please come to the beach gate by 7:50 a.m.)</td></tr>'+
            '<tr><th>Place</th><td>Hikari Beach, South Gate</td></tr>'+
            '<tr><th>Fee</th><td>Clean-up: free for everyone<br>'+
            'Barbecue lunch after the clean-up (10:30 a.m.):<br>'+
            'Adults: 700 yen / Junior high school students: 400 yen</td></tr>'+
            '</table>'+
            '<div class="fly-n">Note:<br>'+
            '・We will give you gloves and garbage bags. Please bring a hat, a towel and something to drink.<br>'+
            '・Anyone can join the clean-up, but elementary school students must come with an adult.<br>'+
            '・Barbecue lunch: please send an e-mail to the town office by Thursday, July 23. If you join only the clean-up, you do not need to tell us before the event. If it rains, we will stop the event, so please check the town website at 6:30 a.m.<br>'+
            '〔注〕garbage bag ごみぶくろ　town office 町役場</div>',
      q:"小学生がこの清掃活動に参加するための条件として正しいものはどれですか。",
      choices:["小学生は参加できない","1人でも参加できる","大人といっしょに来れば参加できる","中学生の兄や姉といっしょなら参加できる"],
      answer:2,
      why:"①条件は「小学生の参加条件」→②Note の「elementary school students must come with an adult」の行→③大人の同伴が必要（中学生の同伴では条件に合わない）。",
      trap:"行の前半「Anyone can join」だけ読んで、小学生も1人で参加できると答えてしまう。" },

    { id:"S3-12", fly:"F6", tech:["T10","T02"],
      flyer:'<div class="fly-t">Hikari Beach Clean-up Day</div>'+
            '<table>'+
            '<tr><th>Date</th><td>Sunday, July 26</td></tr>'+
            '<tr><th>Time</th><td>8:00 a.m. – 10:00 a.m. (Please come to the beach gate by 7:50 a.m.)</td></tr>'+
            '<tr><th>Place</th><td>Hikari Beach, South Gate</td></tr>'+
            '<tr><th>Fee</th><td>Clean-up: free for everyone<br>'+
            'Barbecue lunch after the clean-up (10:30 a.m.):<br>'+
            'Adults: 700 yen / Junior high school students: 400 yen</td></tr>'+
            '</table>'+
            '<div class="fly-n">Note:<br>'+
            '・We will give you gloves and garbage bags. Please bring a hat, a towel and something to drink.<br>'+
            '・Anyone can join the clean-up, but elementary school students must come with an adult.<br>'+
            '・Barbecue lunch: please send an e-mail to the town office by Thursday, July 23. If you join only the clean-up, you do not need to tell us before the event. If it rains, we will stop the event, so please check the town website at 6:30 a.m.<br>'+
            '〔注〕garbage bag ごみぶくろ　town office 町役場</div>',
      q:"バーベキュー昼食にも参加したい人は、どうすればよいですか。",
      choices:["7月26日の朝、ビーチの受付で申しこむ","当日の朝6時30分に、町のウェブサイトで申しこむ","7月23日までに町役場に電話をかける","7月23日までに町役場にメールを送る"],
      answer:3,
      why:"①条件は「バーベキュー昼食の申込方法」→②Note の Barbecue lunch の行「send an e-mail to the town office by July 23」→③「清掃だけなら連絡不要」の部分と区別する。",
      trap:"手段の取りちがえ。ウェブサイトは雨天中止の確認用、当日申込は清掃のみの場合の話。" }

  ]
};
