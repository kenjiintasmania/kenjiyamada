/* eiken/data/bank2.js ─ 英検アプリの増量ぶん（フル判定テスト×3回分にするための問題）
 * 2026-10-16 先生指示「フル×3回分に問題数を増量したうえで、それを毎回ランダムに出す設計に」。
 * index.html の BANK／PASSAGES に連結される（index.html の merge を参照）。形は index.html の問題とまったく同じ。
 *   mc：ch は4つ・正解は ch[0]（a:0）・表示時に混ぜる／fill：a は文字列（ac に別解）／reading：p は PASSAGES の id
 * すべて自作（実際の英検の問題は使っていない）。検査は tools/check_eiken.mjs（npm run check）。
 * 1回分の出題数は index.html の FULL_PLAN。ここを増やしても1回のテストの長さは変わらない。 */
window.EIKEN_BANK2 = {
 "BANK": {
  "2": {
   "vocab": [
    {
     "t": "mc",
     "en": "The city plans to (   ) a new recycling program next spring.",
     "q": "(   ) に入る語は？",
     "ch": [
      "launch",
      "retire",
      "bury",
      "swallow"
     ],
     "a": 0,
     "ex": "launch＝開始する。launch a program＝事業を始める。"
    },
    {
     "t": "fill",
     "q": "「影響」を英語で（i で始まる）。",
     "a": "influence",
     "ac": [
      "impact"
     ],
     "ex": "influence＝影響。impact も可。"
    },
    {
     "t": "mc",
     "en": "The report (   ) that the number of tourists will double by 2040.",
     "q": "(   ) に入る語は？",
     "ch": [
      "predicts",
      "prevents",
      "pretends",
      "prefers"
     ],
     "a": 0,
     "ex": "predict＝予測する。will double を予測している。"
    },
    {
     "t": "mc",
     "en": "Many young people (   ) in volunteer activities after the disaster.",
     "q": "(   ) に入る語は？",
     "ch": [
      "participated",
      "hesitated",
      "complained",
      "disappeared"
     ],
     "a": 0,
     "ex": "participate in＝〜に参加する。"
    },
    {
     "t": "fill",
     "q": "「政府」を英語で（g で始まる）。",
     "a": "government",
     "ex": "government＝政府。"
    },
    {
     "t": "mc",
     "en": "The two countries finally reached an (   ) on trade.",
     "q": "(   ) に入る語は？",
     "ch": [
      "agreement",
      "argument",
      "apartment",
      "appointment"
     ],
     "a": 0,
     "ex": "reach an agreement＝合意に達する。"
    },
    {
     "t": "mc",
     "en": "Smoking is (   ) in all public buildings in this country.",
     "q": "(   ) に入る語は？",
     "ch": [
      "prohibited",
      "promoted",
      "polished",
      "purchased"
     ],
     "a": 0,
     "ex": "prohibit＝禁止する。公共の建物で禁煙。"
    },
    {
     "t": "fill",
     "q": "「人口」を英語で（p で始まる）。",
     "a": "population",
     "ex": "population＝人口。"
    },
    {
     "t": "mc",
     "en": "Solar power is a (   ) source of energy because the sun never runs out.",
     "q": "(   ) に入る語は？",
     "ch": [
      "renewable",
      "temporary",
      "ancient",
      "nervous"
     ],
     "a": 0,
     "ex": "renewable＝再生可能な。太陽は尽きないから。"
    },
    {
     "t": "mc",
     "en": "The scientist's theory was (   ) by later experiments.",
     "q": "(   ) に入る語は？",
     "ch": [
      "confirmed",
      "confused",
      "complained",
      "collected"
     ],
     "a": 0,
     "ex": "confirm＝確認する・裏づける。"
    },
    {
     "t": "fill",
     "q": "「消費者」を英語で（c で始まる）。",
     "a": "consumer",
     "ex": "consumer＝消費者。"
    },
    {
     "t": "mc",
     "en": "Volunteers (   ) food and blankets to the victims of the flood.",
     "q": "(   ) に入る語は？",
     "ch": [
      "distributed",
      "disturbed",
      "dismissed",
      "deserved"
     ],
     "a": 0,
     "ex": "distribute A to B＝AをBに配る。"
    },
    {
     "t": "mc",
     "en": "The museum was built to (   ) the history of the town.",
     "q": "(   ) に入る語は？",
     "ch": [
      "preserve",
      "persuade",
      "pretend",
      "punish"
     ],
     "a": 0,
     "ex": "preserve＝保存する。歴史を保存する博物館。"
    },
    {
     "t": "fill",
     "q": "「貧困」を英語で（p で始まる）。",
     "a": "poverty",
     "ex": "poverty＝貧困。"
    },
    {
     "t": "mc",
     "en": "It is (   ) that the company will move its head office abroad.",
     "q": "(   ) に入る語は？",
     "ch": [
      "likely",
      "alike",
      "lively",
      "lonely"
     ],
     "a": 0,
     "ex": "It is likely that ～＝〜しそうだ。"
    },
    {
     "t": "mc",
     "en": "The factory had to (   ) with the new safety standards.",
     "q": "(   ) に入る語は？",
     "ch": [
      "comply",
      "compare",
      "complete",
      "compete"
     ],
     "a": 0,
     "ex": "comply with＝（規則に）従う。"
    },
    {
     "t": "fill",
     "q": "「世代」を英語で（g で始まる）。",
     "a": "generation",
     "ex": "generation＝世代。"
    },
    {
     "t": "mc",
     "en": "The charity (   ) heavily on donations from local people.",
     "q": "(   ) に入る語は？",
     "ch": [
      "relies",
      "refuses",
      "retires",
      "regrets"
     ],
     "a": 0,
     "ex": "rely on＝〜に頼る。"
    },
    {
     "t": "mc",
     "en": "Doctors (   ) that people over 60 get the vaccine every year.",
     "q": "(   ) に入る語は？",
     "ch": [
      "recommend",
      "remind",
      "remove",
      "release"
     ],
     "a": 0,
     "ex": "recommend that＋原形＝〜することを勧める。"
    },
    {
     "t": "fill",
     "q": "「証拠」を英語で（e で始まる）。",
     "a": "evidence",
     "ex": "evidence＝証拠。"
    },
    {
     "t": "mc",
     "en": "The storm caused (   ) damage to the coastal villages.",
     "q": "(   ) に入る語は？",
     "ch": [
      "severe",
      "several",
      "separate",
      "secure"
     ],
     "a": 0,
     "ex": "severe＝深刻な。damage は不可算なので several は不可。"
    },
    {
     "t": "mc",
     "en": "Education helps people (   ) their full potential.",
     "q": "(   ) に入る語は？",
     "ch": [
      "achieve",
      "avoid",
      "abandon",
      "admire"
     ],
     "a": 0,
     "ex": "achieve one's potential＝能力を発揮する。"
    },
    {
     "t": "fill",
     "q": "「気候」を英語で（c で始まる）。",
     "a": "climate",
     "ex": "climate＝気候。"
    },
    {
     "t": "mc",
     "en": "The number of cars in the city has increased (   ) over the past decade.",
     "q": "(   ) に入る語は？",
     "ch": [
      "dramatically",
      "accidentally",
      "politely",
      "mentally"
     ],
     "a": 0,
     "ex": "dramatically＝劇的に。増え方を表す副詞。"
    }
   ],
   "grammar": [
    {
     "t": "mc",
     "en": "If I (   ) you, I would accept the offer.",
     "q": "(   ) に入る語は？",
     "ch": [
      "were",
      "am",
      "will be",
      "have been"
     ],
     "a": 0,
     "ex": "仮定法過去 If I were you＝もし私があなたなら。"
    },
    {
     "t": "mc",
     "en": "If she (   ) harder, she would have passed the exam.",
     "q": "(   ) に入る語は？",
     "ch": [
      "had studied",
      "studied",
      "has studied",
      "studies"
     ],
     "a": 0,
     "ex": "仮定法過去完了 If＋had＋過去分詞, would have ～。"
    },
    {
     "t": "mc",
     "en": "(   ) in a hurry, he forgot to lock the door.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Being",
      "Been",
      "Be",
      "To being"
     ],
     "a": 0,
     "ex": "分詞構文 Being in a hurry＝急いでいたので。"
    },
    {
     "t": "mc",
     "en": "(   ) from the hill, the town looks like a toy.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Seen",
      "Seeing",
      "To see",
      "Saw"
     ],
     "a": 0,
     "ex": "受け身の分詞構文 Seen from＝〜から見ると。"
    },
    {
     "t": "mc",
     "en": "This is the house (   ) my grandfather was born.",
     "q": "(   ) に入る語は？",
     "ch": [
      "where",
      "which",
      "what",
      "who"
     ],
     "a": 0,
     "ex": "場所＋完全な文 → 関係副詞 where。"
    },
    {
     "t": "mc",
     "en": "She is the only person (   ) opinion I trust.",
     "q": "(   ) に入る語は？",
     "ch": [
      "whose",
      "who",
      "whom",
      "which"
     ],
     "a": 0,
     "ex": "所有を表す関係代名詞 whose opinion。"
    },
    {
     "t": "mc",
     "en": "Never (   ) such a beautiful sunset.",
     "q": "(   ) に入る語は？",
     "ch": [
      "have I seen",
      "I have seen",
      "I saw",
      "have seen I"
     ],
     "a": 0,
     "ex": "否定語が文頭 → 倒置 Never have I seen。"
    },
    {
     "t": "mc",
     "en": "Not only (   ) the piano, but she also composes music.",
     "q": "(   ) に入る語は？",
     "ch": [
      "does she play",
      "she plays",
      "she does play",
      "plays she"
     ],
     "a": 0,
     "ex": "Not only が文頭 → 倒置 does she play。"
    },
    {
     "t": "mc",
     "en": "It is you (   ) are responsible for this.",
     "q": "(   ) に入る語は？",
     "ch": [
      "that",
      "which",
      "what",
      "whose"
     ],
     "a": 0,
     "ex": "強調構文 It is ～ that …＝…なのは〜だ。"
    },
    {
     "t": "mc",
     "en": "The man (   ) to be a doctor was actually a thief.",
     "q": "(   ) に入る語は？",
     "ch": [
      "pretending",
      "pretended",
      "pretends",
      "to pretend"
     ],
     "a": 0,
     "ex": "現在分詞の後置修飾 pretending＝〜のふりをしている男。"
    },
    {
     "t": "mc",
     "en": "I regret (   ) him the truth yesterday.",
     "q": "(   ) に入る語は？",
     "ch": [
      "not telling",
      "not to tell",
      "to not tell",
      "not told"
     ],
     "a": 0,
     "ex": "regret＋動名詞＝〜したことを後悔する。"
    },
    {
     "t": "mc",
     "en": "You (   ) have seen Tom at the party. He was abroad.",
     "q": "(   ) に入る語は？",
     "ch": [
      "can't",
      "must",
      "should",
      "needn't"
     ],
     "a": 0,
     "ex": "can't have＋過去分詞＝〜したはずがない。"
    },
    {
     "t": "mc",
     "en": "By the time we arrived, the concert (   ).",
     "q": "(   ) に入る語は？",
     "ch": [
      "had already started",
      "has already started",
      "already starts",
      "is starting"
     ],
     "a": 0,
     "ex": "過去のある時点より前の完了 → 過去完了 had started。"
    },
    {
     "t": "mc",
     "en": "The problem is too complicated (   ) in one meeting.",
     "q": "(   ) に入る語は？",
     "ch": [
      "to be solved",
      "to solve it",
      "solving",
      "solved"
     ],
     "a": 0,
     "ex": "too ～ to be＋過去分詞＝あまりに〜で…されえない。"
    },
    {
     "t": "mc",
     "en": "I would rather you (   ) smoke here.",
     "q": "(   ) に入る語は？",
     "ch": [
      "didn't",
      "don't",
      "won't",
      "not"
     ],
     "a": 0,
     "ex": "would rather＋S＋仮定法過去＝〜しないでほしい。"
    },
    {
     "t": "mc",
     "en": "It's about time we (   ) a decision.",
     "q": "(   ) に入る語は？",
     "ch": [
      "made",
      "make",
      "will make",
      "making"
     ],
     "a": 0,
     "ex": "It's (about) time＋仮定法過去 made。"
    },
    {
     "t": "mc",
     "en": "(   ) he is rich, he is not happy.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Though",
      "Despite",
      "Because of",
      "However"
     ],
     "a": 0,
     "ex": "Though＋節＝〜だけれども。Despite は名詞が続く。"
    },
    {
     "t": "mc",
     "en": "The book was so difficult that (   ) could understand it.",
     "q": "(   ) に入る語は？",
     "ch": [
      "few students",
      "a few students",
      "little students",
      "few of student"
     ],
     "a": 0,
     "ex": "few＋可算名詞＝ほとんど〜ない。難しくて理解できた生徒はほとんどいない。"
    },
    {
     "t": "mc",
     "en": "Little (   ) that he would become famous.",
     "q": "(   ) に入る語は？",
     "ch": [
      "did he dream",
      "he dreamed",
      "he did dream",
      "dreamed he"
     ],
     "a": 0,
     "ex": "Little が文頭 → 倒置 did he dream＝夢にも思わなかった。"
    },
    {
     "t": "mc",
     "en": "I'll lend you the book (   ) you return it by Friday.",
     "q": "(   ) に入る語は？",
     "ch": [
      "as long as",
      "as far as",
      "so that",
      "in case"
     ],
     "a": 0,
     "ex": "as long as＝〜する限りは（条件）。"
    },
    {
     "t": "mc",
     "en": "Hardly had I left the house (   ) it began to rain.",
     "q": "(   ) に入る語は？",
     "ch": [
      "when",
      "than",
      "that",
      "while"
     ],
     "a": 0,
     "ex": "Hardly had ～ when …＝〜するとすぐに。"
    },
    {
     "t": "mc",
     "en": "She kept me (   ) for an hour.",
     "q": "(   ) に入る語は？",
     "ch": [
      "waiting",
      "wait",
      "waited",
      "to wait"
     ],
     "a": 0,
     "ex": "keep＋O＋現在分詞＝〜させ続ける。"
    },
    {
     "t": "mc",
     "en": "(   ) what to do, she asked her teacher for advice.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Not knowing",
      "Not known",
      "Knowing not",
      "Not to know"
     ],
     "a": 0,
     "ex": "否定の分詞構文は Not＋分詞 → Not knowing。"
    },
    {
     "t": "mc",
     "en": "Had I known about the meeting, I (   ) there.",
     "q": "(   ) に入る語は？",
     "ch": [
      "would have been",
      "would be",
      "will be",
      "was"
     ],
     "a": 0,
     "ex": "if を省略した倒置 Had I known → 主節は would have＋過去分詞。"
    }
   ],
   "technique": [
    {
     "t": "mc",
     "en": "A: I'm thinking of quitting my part-time job. What would you do? B: (   )",
     "q": "【2級・聞く/話す】What would you do? への応答は？",
     "ch": [
      "I'd talk to my manager first before deciding.",
      "Yes, I quit.",
      "It's on the second floor.",
      "Nice to meet you."
     ],
     "a": 0,
     "ex": "What would you do? には「自分なら〜する」と答える。"
    },
    {
     "t": "mc",
     "q": "【2級・聞く】A: Did you hear the library is closing early today? B: Yes, at five instead of eight because of the storm. 質問: Why is the library closing early?",
     "ch": [
      "The weather is bad.",
      "Today is a national holiday.",
      "Staff are leaving at eight.",
      "It is closed on Sundays."
     ],
     "a": 0,
     "ex": "because of the storm＝嵐のため → 天気が悪い、と言いかえた選択肢を選ぶ。"
    },
    {
     "t": "mc",
     "q": "【2級・読む】長文: Although many cities have introduced bike-sharing systems, the number of users has not grown as expected. 質問: What is true about bike-sharing?",
     "ch": [
      "Fewer people use it than expected.",
      "It has not been introduced anywhere.",
      "Everyone uses it.",
      "It is banned in cities."
     ],
     "a": 0,
     "ex": "has not grown as expected＝期待ほど増えていない。"
    },
    {
     "t": "mc",
     "q": "【2級・書く】英作文「学校の制服は必要か」で、意見を書き始める最初の1文は？",
     "ch": [
      "I think school uniforms are necessary for two reasons.",
      "School uniforms are clothes that students wear at school every day.",
      "Yes.",
      "I like my friends very much."
     ],
     "a": 0,
     "ex": "まず立場と理由の数を示す。"
    },
    {
     "t": "mc",
     "en": "First, uniforms save time in the morning. (   ), they reduce bullying based on clothes.",
     "q": "【2級・書く】2つ目の理由を始める語は？",
     "ch": [
      "Second",
      "Because",
      "However",
      "For example"
     ],
     "a": 0,
     "ex": "理由を並べるときは First, Second。"
    },
    {
     "t": "mc",
     "en": "A: Do you think children should have smartphones? B: (   )",
     "q": "【2級・聞く/話す】意見を述べる応答は？",
     "ch": [
      "Not before junior high. They need time to learn self-control.",
      "Yes, I have one, and I bought it at the store near the station last week.",
      "It's next to the bank.",
      "You're welcome."
     ],
     "a": 0,
     "ex": "意見＋理由で答える。"
    },
    {
     "t": "mc",
     "q": "【2級・聞く】A: Excuse me, does this train stop at Minami Station? B: No, you need the local train on Platform 3. 質問: What should the passenger do?",
     "ch": [
      "Take the local train on Platform 3.",
      "Stay on this train until Minami Station.",
      "Buy a new ticket.",
      "Walk to Minami Station."
     ],
     "a": 0,
     "ex": "you need the local train on Platform 3 から。"
    },
    {
     "t": "mc",
     "q": "【2級・読む】長文: The city council rejected the plan to build a new stadium, mainly due to its cost. 質問: Why was the plan rejected?",
     "ch": [
      "It was too expensive.",
      "It was too small.",
      "Nobody liked sports.",
      "It was already built."
     ],
     "a": 0,
     "ex": "due to its cost＝費用のために。"
    },
    {
     "t": "mc",
     "en": "A: Would you mind if I opened the window? B: (   )",
     "q": "【2級・聞く/話す】許可を求められた応答は？",
     "ch": [
      "Not at all. It's hot in here.",
      "Yes, I open the window every morning.",
      "It's a window.",
      "See you."
     ],
     "a": 0,
     "ex": "Would you mind if ～? に「かまいません」は Not at all。"
    },
    {
     "t": "mc",
     "q": "【2級・聞く】A: How was the job interview, Ken? B: It went well, but they said they'd let me know by next week. 質問: What will happen by next week?",
     "ch": [
      "He will hear the result.",
      "He will start the job.",
      "He will have another interview.",
      "He will quit his job."
     ],
     "a": 0,
     "ex": "they'd let me know by next week＝来週までに結果を知らせる。"
    },
    {
     "t": "mc",
     "q": "【2級・読む】長文: Despite the rise in online courses, many students still prefer face-to-face classes, where they can ask questions easily. 質問: Why do many students prefer face-to-face classes?",
     "ch": [
      "It is easier to get help from the teacher.",
      "Online courses cost more.",
      "They can ask questions easily on the internet.",
      "There are no teachers in online courses."
     ],
     "a": 0,
     "ex": "where they can ask questions easily＝質問しやすい → 先生の助けを得やすい。本文の語句そのままの選択肢（online）はワナ。"
    },
    {
     "t": "mc",
     "q": "【2級・書く】英作文で、理由を述べたあと結論を始める語は？",
     "ch": [
      "Therefore",
      "Although",
      "Because",
      "Furthermore"
     ],
     "a": 0,
     "ex": "結論は Therefore / For these reasons で始める。"
    },
    {
     "t": "mc",
     "en": "A: I'm sorry, but I have to cancel our meeting tomorrow. B: (   )",
     "q": "【2級・聞く/話す】予定の取り消しへの応答は？",
     "ch": [
      "No problem. Shall we reschedule for Thursday?",
      "Yes, I met you at the meeting last Tuesday morning.",
      "It's at the station.",
      "Happy birthday."
     ],
     "a": 0,
     "ex": "取り消しには了解＋代案で応じる。"
    },
    {
     "t": "mc",
     "q": "【2級・聞く】A: Hello, I'd like to return this jacket. B: Do you have the receipt? A: I'm afraid I lost it. 質問: What is the customer's problem?",
     "ch": [
      "The receipt has been lost.",
      "The jacket is too small.",
      "The shop is closed.",
      "The jacket was left at home."
     ],
     "a": 0,
     "ex": "I lost it＝レシートを失くした。"
    },
    {
     "t": "mc",
     "q": "【2級・読む】長文: The study suggests that people who sleep less than six hours are more likely to gain weight. 質問: What does the study suggest?",
     "ch": [
      "Lack of sleep may lead to weight gain.",
      "Sleeping more than six hours makes people thin.",
      "Six hours is too much.",
      "Weight does not matter."
     ],
     "a": 0,
     "ex": "more likely to gain weight＝太りやすい。"
    },
    {
     "t": "mc",
     "en": "The company (   ) a survey to find out what customers want.",
     "q": "【2級・大問1】(   ) に合う語は？",
     "ch": [
      "conducted",
      "contained",
      "connected",
      "continued"
     ],
     "a": 0,
     "ex": "conduct a survey＝調査を行う。"
    },
    {
     "t": "mc",
     "en": "The flight was delayed (   ) to heavy fog.",
     "q": "【2級・大問1】(   ) に合う語は？",
     "ch": [
      "due",
      "because",
      "since",
      "as"
     ],
     "a": 0,
     "ex": "due to＋名詞＝〜のために。because は節が続く。"
    },
    {
     "t": "mc",
     "en": "A: What's the best way to reduce plastic waste? B: (   )",
     "q": "【2級・聞く/話す】方法を聞かれた応答は？",
     "ch": [
      "Carrying your own bottle and bag makes a big difference.",
      "Yes, it's plastic, so you can put it in the kitchen bin.",
      "It's in the kitchen.",
      "Good luck."
     ],
     "a": 0,
     "ex": "方法を聞かれたら具体的な行動を答える。"
    },
    {
     "t": "mc",
     "q": "【2級・聞く】A: Should we take the highway? B: The radio said there's a long traffic jam. Let's take the back roads instead. 質問: What will they do?",
     "ch": [
      "Use a different route.",
      "Take the highway as planned.",
      "Wait until the radio news ends.",
      "Stay home for the day."
     ],
     "a": 0,
     "ex": "Let's take the back roads instead＝裏道を使う → 別のルートを使う。"
    },
    {
     "t": "mc",
     "q": "【2級・読む】長文: While the new app is popular among teenagers, older users complain that its design is confusing. 質問: What do older users think of the app?",
     "ch": [
      "Its design is hard to understand.",
      "It is popular only among older people.",
      "It is for teenagers only.",
      "It is too cheap."
     ],
     "a": 0,
     "ex": "complain that its design is confusing。"
    },
    {
     "t": "mc",
     "en": "Some people say that homework should be abolished. (   ), I believe it helps students review what they learned.",
     "q": "【2級・書く】(   ) に合う語は？",
     "ch": [
      "However",
      "Therefore",
      "For example",
      "In addition"
     ],
     "a": 0,
     "ex": "反対の立場を示したあと自分の意見 → However。"
    },
    {
     "t": "mc",
     "en": "A: Thank you so much for helping me move. B: (   )",
     "q": "【2級・聞く/話す】感謝への応答は？",
     "ch": [
      "Don't mention it. That's what friends are for.",
      "Yes, I moved.",
      "It's over there.",
      "Nice to meet you."
     ],
     "a": 0,
     "ex": "感謝への応答 Don't mention it＝どうってことないよ。"
    }
   ],
   "practice": [
    {
     "t": "mc",
     "en": "Not until the 1990s (   ) widely used.",
     "q": "(   ) に入る語は？",
     "ch": [
      "were cell phones",
      "cell phones were",
      "cell phones are",
      "was cell phones"
     ],
     "a": 0,
     "ex": "Not until ～ が文頭 → 倒置 were cell phones。"
    },
    {
     "t": "mc",
     "en": "A number of students (   ) absent today.",
     "q": "(   ) に入る語は？",
     "ch": [
      "were",
      "was",
      "is",
      "has been"
     ],
     "a": 0,
     "ex": "a number of＝多くの → 複数扱い were。"
    },
    {
     "t": "mc",
     "en": "He is one of the (   ) players in the league.",
     "q": "(   ) に入る語は？",
     "ch": [
      "best",
      "better",
      "good",
      "most good"
     ],
     "a": 0,
     "ex": "one of the＋最上級＋複数名詞。"
    },
    {
     "t": "mc",
     "en": "(   ) the economy, the government lowered interest rates.",
     "q": "(   ) に入る語は？",
     "ch": [
      "In order to boost",
      "So that boost",
      "Because boost",
      "For boosting of"
     ],
     "a": 0,
     "ex": "目的を表す in order to＋原形。"
    },
    {
     "t": "mc",
     "en": "The results were (   ) from what we had expected.",
     "q": "(   ) に入る語は？",
     "ch": [
      "different",
      "same",
      "similar",
      "alike"
     ],
     "a": 0,
     "ex": "be different from＝〜と異なる。"
    },
    {
     "t": "mc",
     "en": "I'm looking forward to (   ) you again.",
     "q": "(   ) に入る語は？",
     "ch": [
      "seeing",
      "see",
      "have seen",
      "be seen"
     ],
     "a": 0,
     "ex": "look forward to＋動名詞。"
    },
    {
     "t": "mc",
     "en": "She spent the whole weekend (   ) her room.",
     "q": "(   ) に入る語は？",
     "ch": [
      "cleaning",
      "to clean",
      "clean",
      "cleaned"
     ],
     "a": 0,
     "ex": "spend＋時間＋動名詞＝〜して時間を過ごす。"
    },
    {
     "t": "mc",
     "en": "The company has (   ) its sales since last year.",
     "q": "(   ) に入る語は？",
     "ch": [
      "doubled",
      "twice",
      "double",
      "twin"
     ],
     "a": 0,
     "ex": "double＝2倍にする（動詞）。has doubled。"
    },
    {
     "t": "mc",
     "en": "He apologized (   ) being late.",
     "q": "(   ) に入る語は？",
     "ch": [
      "for",
      "to",
      "of",
      "about"
     ],
     "a": 0,
     "ex": "apologize for＝〜を謝る。"
    },
    {
     "t": "mc",
     "en": "(   ) the news, she burst into tears.",
     "q": "(   ) に入る語は？",
     "ch": [
      "On hearing",
      "Hear",
      "To heard",
      "Heard of"
     ],
     "a": 0,
     "ex": "On＋動名詞＝〜するとすぐに。"
    },
    {
     "t": "mc",
     "q": "英文: The festival, which usually attracts thousands, was held online this year because of safety concerns. 質問: Why was the festival held online?",
     "ch": [
      "To keep people safe.",
      "Because it attracts thousands of visitors.",
      "Because of heavy rain.",
      "To save money."
     ],
     "a": 0,
     "ex": "because of safety concerns＝安全上の心配 → 人々の安全を守るため。"
    },
    {
     "t": "mc",
     "q": "英文: Although sales rose in spring, profits fell due to higher material costs. 質問: What happened to profits?",
     "ch": [
      "They fell.",
      "They rose.",
      "They stayed the same.",
      "They doubled."
     ],
     "a": 0,
     "ex": "profits fell。sales と profits を混同しない。"
    },
    {
     "t": "mc",
     "en": "The teacher insisted that every student (   ) the report by Monday.",
     "q": "(   ) に入る語は？",
     "ch": [
      "submit",
      "submits",
      "to submit",
      "submitting"
     ],
     "a": 0,
     "ex": "insist that＋(should)＋原形 submit。"
    },
    {
     "t": "mc",
     "en": "This is (   ) more interesting than the last one.",
     "q": "(   ) に入る語は？",
     "ch": [
      "much",
      "very",
      "many",
      "most"
     ],
     "a": 0,
     "ex": "比較級の強調は much。very は不可。"
    },
    {
     "t": "mc",
     "en": "There is no (   ) what will happen next.",
     "q": "(   ) に入る語は？",
     "ch": [
      "telling",
      "tell",
      "to tell",
      "told"
     ],
     "a": 0,
     "ex": "There is no＋動名詞＝〜できない。"
    },
    {
     "t": "mc",
     "en": "The population of Tokyo is larger than (   ) of Osaka.",
     "q": "(   ) に入る語は？",
     "ch": [
      "that",
      "those",
      "it",
      "one"
     ],
     "a": 0,
     "ex": "前の単数名詞 population を受ける that。"
    }
   ],
   "reading": [
    {
     "t": "mc",
     "p": "g2_remote_work",
     "q": "質問: Why did remote work spread quickly?",
     "ch": [
      "Because many offices had to close for health reasons.",
      "Because trains stopped running.",
      "Because offices became larger.",
      "Because workers wanted higher pay."
     ],
     "a": 0,
     "ex": "第1段落 after many offices had to close for health reasons。"
    },
    {
     "t": "mc",
     "p": "g2_remote_work",
     "q": "質問: How does remote work help workers?",
     "ch": [
      "They save the time spent commuting.",
      "They get higher salaries than office workers.",
      "They work longer hours.",
      "They need bigger houses."
     ],
     "a": 0,
     "ex": "第2段落 no longer spend hours commuting。"
    },
    {
     "t": "mc",
     "p": "g2_remote_work",
     "q": "質問: Why can companies save money?",
     "ch": [
      "They can use less office space.",
      "They do not have to pay salaries.",
      "They sell their old computers.",
      "They close the office every week."
     ],
     "a": 0,
     "ex": "第2段落 they need smaller offices＝オフィスが小さくてすむ → スペースが少なくてよい。"
    },
    {
     "t": "mc",
     "p": "g2_remote_work",
     "q": "質問: What problem do young employees face?",
     "ch": [
      "They may lose chances to learn from experienced colleagues.",
      "They must commute every day.",
      "They cannot use computers.",
      "They are paid less than others."
     ],
     "a": 0,
     "ex": "第3段落 may miss the chance to learn from experienced colleagues。"
    },
    {
     "t": "mc",
     "p": "g2_remote_work",
     "q": "質問: What are many companies doing now?",
     "ch": [
      "Looking for a balance between the two styles.",
      "Closing all of their offices in the big cities.",
      "Banning remote work completely.",
      "Moving to big cities."
     ],
     "a": 0,
     "ex": "第3段落 searching for a balance between the two styles。"
    },
    {
     "t": "mc",
     "p": "g2_aging_society",
     "q": "質問: What is happening to Japan's working population?",
     "ch": [
      "It is getting smaller.",
      "It is growing faster than before.",
      "It is moving abroad.",
      "It has stopped changing."
     ],
     "a": 0,
     "ex": "第1段落 the working population is shrinking。"
    },
    {
     "t": "mc",
     "p": "g2_aging_society",
     "q": "質問: Why have some rural villages lost their bus services?",
     "ch": [
      "The young have left for the cities.",
      "The buses were too old to use.",
      "Many roads to the villages were closed.",
      "Fuel became free for everyone."
     ],
     "a": 0,
     "ex": "第2段落 so many young people have moved to cities＝若者が都市へ出た。"
    },
    {
     "t": "mc",
     "p": "g2_aging_society",
     "q": "質問: What do retired residents do in one town?",
     "ch": [
      "They run a cafe and teach children traditional crafts.",
      "They drive the school buses for all children in the town.",
      "They build hospitals.",
      "They sell their houses."
     ],
     "a": 0,
     "ex": "第3段落 run a small cafe where they teach children traditional crafts。"
    },
    {
     "t": "mc",
     "p": "g2_aging_society",
     "q": "質問: How do volunteer drivers help?",
     "ch": [
      "They take elderly people to hospitals.",
      "They deliver newspapers to elderly people.",
      "They teach driving.",
      "They repair roads."
     ],
     "a": 0,
     "ex": "第3段落 volunteer drivers to take elderly people to hospitals。"
    },
    {
     "t": "mc",
     "p": "g2_aging_society",
     "q": "質問: What do such efforts show about older people?",
     "ch": [
      "They can support others, not just receive care.",
      "They should move to cities.",
      "They no longer need help.",
      "They cannot work at all."
     ],
     "a": 0,
     "ex": "第3段落 not only receivers of care but also members who can support others。"
    },
    {
     "t": "mc",
     "p": "g2_fast_fashion",
     "q": "質問: Why do many people buy more clothes than they need?",
     "ch": [
      "New designs are released often at low prices.",
      "Clothes last a long time, so people collect them.",
      "Shops are closed.",
      "Clothes are expensive."
     ],
     "a": 0,
     "ex": "第1段落 release new designs every few weeks and sell them at low prices。"
    },
    {
     "t": "mc",
     "p": "g2_fast_fashion",
     "q": "質問: What is one hidden cost of making a cotton T-shirt?",
     "ch": [
      "It uses a large amount of water.",
      "It takes a few weeks to make just one.",
      "It needs no workers.",
      "It cleans rivers."
     ],
     "a": 0,
     "ex": "第2段落 requires about 2,700 liters of water。"
    },
    {
     "t": "mc",
     "p": "g2_fast_fashion",
     "q": "質問: What happens to most discarded clothes?",
     "ch": [
      "They end up in landfills.",
      "They are sold again abroad.",
      "They are burned at home.",
      "They become food."
     ],
     "a": 0,
     "ex": "第2段落 most discarded clothes end up in landfills。"
    },
    {
     "t": "mc",
     "p": "g2_fast_fashion",
     "q": "質問: What is growing in popularity among young people?",
     "ch": [
      "Second-hand shops and rental services.",
      "Buying brand-new clothes every single week.",
      "Throwing clothes away.",
      "Dyeing fabric at home."
     ],
     "a": 0,
     "ex": "第3段落 Second-hand shops and clothing rental services are growing in popularity。"
    },
    {
     "t": "mc",
     "p": "g2_fast_fashion",
     "q": "質問: What does the writer suggest as the simplest action?",
     "ch": [
      "Buying fewer but better clothes.",
      "Buying as many cheap clothes as possible.",
      "Starting a new fashion brand.",
      "Wearing the same clothes forever."
     ],
     "a": 0,
     "ex": "第3段落 Choosing quality over quantity＝量より質 → 少なくても良い服を買う。"
    },
    {
     "t": "mc",
     "p": "g2_cashless",
     "q": "質問: What have some cafes and buses done?",
     "ch": [
      "Stopped accepting cash completely.",
      "Started selling smartphones to customers.",
      "Lowered their prices.",
      "Closed on weekends."
     ],
     "a": 0,
     "ex": "第1段落 stopped accepting coins and bills altogether。"
    },
    {
     "t": "mc",
     "p": "g2_cashless",
     "q": "質問: Why is cashless payment good for shops?",
     "ch": [
      "They can serve customers faster.",
      "They do not have to pay any taxes.",
      "They need no staff.",
      "They get free goods."
     ],
     "a": 0,
     "ex": "第2段落 shops can serve people faster。"
    },
    {
     "t": "mc",
     "p": "g2_cashless",
     "q": "質問: How does recording every payment help the government?",
     "ch": [
      "It makes collecting taxes easier.",
      "It helps criminals hide their money.",
      "It lowers prices.",
      "It stops power failures."
     ],
     "a": 0,
     "ex": "第2段落 easier for the government to collect taxes。"
    },
    {
     "t": "mc",
     "p": "g2_cashless",
     "q": "質問: Who might be left behind in a cashless society?",
     "ch": [
      "People unfamiliar with technology or without a bank account.",
      "Young smartphone users.",
      "Shop owners only.",
      "Government workers."
     ],
     "a": 0,
     "ex": "第3段落 Elderly people unfamiliar with technology and those without a bank account。"
    },
    {
     "t": "mc",
     "p": "g2_cashless",
     "q": "質問: What have several governments decided to do?",
     "ch": [
      "Make sure people can still use cash.",
      "Ban coins and bills in all shops and buses.",
      "Close banks that accept cash.",
      "Stop collecting taxes from shops."
     ],
     "a": 0,
     "ex": "第3段落 protect the right to pay in cash＝現金で払う権利を守る → 現金を使い続けられるようにする。"
    }
   ]
  },
  "3": {
   "vocab": [
    {
     "t": "fill",
     "en": "He is good (   ) playing the guitar.",
     "q": "(   ) に入る1語。",
     "a": "at",
     "ex": "be good at ～＝「〜が得意だ」。"
    },
    {
     "t": "fill",
     "en": "Thank you (   ) inviting me to the party.",
     "q": "(   ) に入る1語。",
     "a": "for",
     "ex": "thank 人 for ～ing＝「〜してくれてありがとう」。"
    },
    {
     "t": "fill",
     "en": "He was absent (   ) school yesterday.",
     "q": "(   ) に入る1語。",
     "a": "from",
     "ex": "be absent from ～＝「〜を欠席する」。"
    },
    {
     "t": "fill",
     "en": "I agree (   ) you. That's a good plan.",
     "q": "(   ) に入る1語。",
     "a": "with",
     "ex": "agree with 人＝「（人）に賛成する」。"
    },
    {
     "t": "fill",
     "en": "Please take (   ) your shoes here.",
     "q": "(   ) に入る1語。",
     "a": "off",
     "ex": "take off＝「（くつ・服を）脱ぐ」。"
    },
    {
     "t": "fill",
     "en": "My father grew (   ) in a small village.",
     "q": "(   ) に入る1語。",
     "a": "up",
     "ex": "grow up＝「成長する・育つ」。"
    },
    {
     "t": "fill",
     "en": "We ran (   ) of milk, so I went to the store.",
     "q": "(   ) に入る1語。",
     "a": "out",
     "ex": "run out of ～＝「〜を使い切る・切らす」。"
    },
    {
     "t": "fill",
     "en": "I'm (   ) of swimming in the sea.",
     "q": "(   ) に入る1語（a で始まる）。",
     "a": "afraid",
     "ex": "be afraid of ～＝「〜が怖い」。"
    },
    {
     "t": "fill",
     "en": "At (   ), I didn't like natto, but now I love it.",
     "q": "(   ) に入る1語。",
     "a": "first",
     "ex": "at first＝「最初は」。but now との対比が根拠。"
    },
    {
     "t": "fill",
     "en": "A: May I use your pen? B: Sure, go (   ).",
     "q": "(   ) に入る1語。",
     "a": "ahead",
     "ex": "Go ahead.＝「どうぞ（やってください）」。許可するときの決まり文句。"
    },
    {
     "t": "fill",
     "en": "I have no (   ) what to do next.",
     "q": "(   ) に入る1語。",
     "a": "idea",
     "ex": "have no idea＝「まったくわからない」。"
    },
    {
     "t": "fill",
     "en": "I'm tired. Let's take a (   ).",
     "q": "(   ) に入る1語（b で始まる）。",
     "a": "break",
     "ac": [
      "rest",
      "nap"
     ],
     "ex": "take a break＝「休憩する」。take a rest も同じ意味。"
    },
    {
     "t": "fill",
     "en": "I (   ) the blue one because it was cheaper.",
     "q": "(   ) に入る1語（c で始まる）。意味は「選んだ」。",
     "a": "chose",
     "ex": "choose の過去形 chose＝「選んだ」。安かったから選んだ。"
    },
    {
     "t": "fill",
     "en": "Can I (   ) your dictionary? I left mine at home.",
     "q": "(   ) に入る1語（b で始まる）。意味は「借りる」。",
     "a": "borrow",
     "ex": "borrow＝「借りる」。lend は『貸す』なので×。"
    },
    {
     "t": "fill",
     "en": "My brother (   ) from high school last March.",
     "q": "(   ) に入る1語（g で始まる）。意味は「卒業した」。",
     "a": "graduated",
     "ex": "graduate from ～＝「〜を卒業する」。"
    },
    {
     "t": "fill",
     "en": "Could you (   ) me the salt, please?",
     "q": "(   ) に入る1語（p で始まる）。意味は「手渡す」。",
     "a": "pass",
     "ex": "pass 人 物＝「（人）に（物）を手渡す」。食卓の決まり文句。"
    },
    {
     "t": "fill",
     "en": "I (   ) three hours doing my homework yesterday.",
     "q": "(   ) に入る1語（s で始まる）。意味は「（時間を）過ごした・費やした」。",
     "a": "spent",
     "ex": "spend 時間 ～ing＝「〜して（時間）を過ごす」。"
    },
    {
     "t": "fill",
     "en": "Mika (   ) me to her birthday party, so I bought a present for her.",
     "q": "(   ) に入る1語（i で始まる）。意味は「招待した」。",
     "a": "invited",
     "ex": "invite 人 to ～＝「（人）を〜に招待する」。プレゼントを買った、が根拠。"
    },
    {
     "t": "fill",
     "en": "It is (   ) to swim in this river. The water is very fast.",
     "q": "(   ) に入る1語（d で始まる）。意味は「危険な」。",
     "a": "dangerous",
     "ex": "dangerous＝「危険な」。流れが速い → 危険。"
    },
    {
     "t": "fill",
     "en": "Kenta (   ) the race and got a gold medal.",
     "q": "(   ) に入る1語（w で始まる）。意味は「勝った」。",
     "a": "won",
     "ex": "win の過去形 won＝「勝った」。金メダルが根拠。"
    },
    {
     "t": "fill",
     "en": "The baby is (   ). Please be quiet.",
     "q": "(   ) に入る1語（a で始まる）。意味は「眠っている」。",
     "a": "asleep",
     "ex": "asleep＝「眠っている」。静かにして、が根拠。"
    },
    {
     "t": "fill",
     "en": "The sun (   ) in the east.",
     "q": "(   ) に入る1語（r で始まる）。意味は「のぼる」。",
     "a": "rises",
     "ex": "rise＝「のぼる」（自動詞）。raise は『〜を上げる』。"
    },
    {
     "t": "fill",
     "q": "「〜を信じる」を英語で（b で始まる）。",
     "a": "believe",
     "ex": "believe＝信じる。"
    },
    {
     "t": "fill",
     "q": "「〜を決める」を英語で（d で始まる）。",
     "a": "decide",
     "ex": "decide＝決める。decide to ～ の形も重要。"
    },
    {
     "t": "fill",
     "q": "「環境」を英語で（e で始まる）。",
     "a": "environment",
     "ex": "environment＝環境。"
    },
    {
     "t": "fill",
     "q": "「経験」を英語で（e で始まる）。",
     "a": "experience",
     "ex": "experience＝経験（する）。"
    },
    {
     "t": "fill",
     "q": "「〜を守る・保護する」を英語で（p で始まる）。",
     "a": "protect",
     "ex": "protect＝守る・保護する。"
    },
    {
     "t": "fill",
     "q": "「〜を受け取る」を英語で（r で始まる）。",
     "a": "receive",
     "ex": "receive＝受け取る。"
    },
    {
     "t": "fill",
     "q": "「〜を説明する」を英語で（e で始まる）。",
     "a": "explain",
     "ex": "explain＝説明する。"
    },
    {
     "t": "fill",
     "q": "「〜を建てる」を英語で（b で始まる）。",
     "a": "build",
     "ex": "build＝建てる。過去形・過去分詞は built。"
    },
    {
     "t": "fill",
     "q": "「違い」を英語で（d で始まる）。",
     "a": "difference",
     "ex": "difference＝違い。形容詞は different。"
    },
    {
     "t": "fill",
     "q": "「〜を続ける」を英語で（c で始まる）。",
     "a": "continue",
     "ex": "continue＝続ける。"
    },
    {
     "t": "fill",
     "q": "「〜を改善する・上達させる」を英語で（i で始まる）。",
     "a": "improve",
     "ex": "improve＝改善する・上達させる。"
    },
    {
     "t": "fill",
     "q": "「伝統的な」を英語で（t で始まる）。",
     "a": "traditional",
     "ex": "traditional＝伝統的な。名詞は tradition。"
    },
    {
     "t": "fill",
     "q": "「情報」を英語で（i で始まる）。",
     "a": "information",
     "ex": "information＝情報。数えられない名詞。"
    },
    {
     "t": "fill",
     "q": "「意見」を英語で（o で始まる）。",
     "a": "opinion",
     "ex": "opinion＝意見。In my opinion＝私の意見では。"
    },
    {
     "t": "mc",
     "en": "I can't hear you. Could you speak more (   )?",
     "q": "場面に合う語は？",
     "ch": [
      "loudly",
      "quietly",
      "easily",
      "quickly"
     ],
     "a": 0,
     "ex": "聞こえない → loudly（大きな声で）。"
    },
    {
     "t": "mc",
     "en": "This jacket is too (   ) for me. Do you have a bigger one?",
     "q": "場面に合う語は？",
     "ch": [
      "small",
      "cheap",
      "soft",
      "famous"
     ],
     "a": 0,
     "ex": "大きいのはある？ → 今のは small（小さい）。"
    },
    {
     "t": "mc",
     "en": "He always keeps his (   ). You can trust him.",
     "q": "場面に合う語は？",
     "ch": [
      "promises",
      "questions",
      "prices",
      "holidays"
     ],
     "a": 0,
     "ex": "keep one's promise＝約束を守る。信頼できる、が根拠。"
    },
    {
     "t": "mc",
     "en": "The (   ) of this mountain is about 3,000 meters.",
     "q": "場面に合う語は？",
     "ch": [
      "height",
      "weight",
      "price",
      "age"
     ],
     "a": 0,
     "ex": "height＝高さ。meters が根拠。"
    },
    {
     "t": "mc",
     "en": "Please (   ) your seat belt. The plane is going to take off.",
     "q": "場面に合う語は？",
     "ch": [
      "fasten",
      "forget",
      "follow",
      "finish"
     ],
     "a": 0,
     "ex": "fasten one's seat belt＝シートベルトを締める。"
    },
    {
     "t": "mc",
     "en": "We have to (   ) the garbage into plastic and paper.",
     "q": "場面に合う語は？",
     "ch": [
      "separate",
      "repeat",
      "receive",
      "return"
     ],
     "a": 0,
     "ex": "separate A into B＝AをBに分ける。ごみの分別。"
    },
    {
     "t": "mc",
     "en": "Our team lost the game, so everyone was (   ).",
     "q": "場面に合う語は？",
     "ch": [
      "disappointed",
      "excited",
      "proud",
      "delicious"
     ],
     "a": 0,
     "ex": "負けた → disappointed（がっかりした）。"
    },
    {
     "t": "mc",
     "en": "A: What's your (   )? B: It's 8 Sakura Street.",
     "q": "場面に合う語は？",
     "ch": [
      "address",
      "hobby",
      "job",
      "size"
     ],
     "a": 0,
     "ex": "通りの名前と番地 → address（住所）。"
    },
    {
     "t": "mc",
     "en": "She speaks English well because she lived (   ) for five years.",
     "q": "場面に合う語は？",
     "ch": [
      "abroad",
      "alone",
      "ago",
      "always"
     ],
     "a": 0,
     "ex": "abroad＝海外に。live abroad＝海外に住む。"
    },
    {
     "t": "mc",
     "en": "The Shinano River is the (   ) river in Japan. It is 367 kilometers long.",
     "q": "場面に合う語は？",
     "ch": [
      "longest",
      "highest",
      "oldest",
      "busiest"
     ],
     "a": 0,
     "ex": "kilometers long（長さ）→ longest（最も長い）。"
    },
    {
     "t": "mc",
     "en": "I don't have enough money. Can you (   ) me 500 yen?",
     "q": "場面に合う語は？",
     "ch": [
      "lend",
      "borrow",
      "spend",
      "save"
     ],
     "a": 0,
     "ex": "lend 人 お金＝（人）に貸す。borrow は『借りる』で向きが逆。"
    },
    {
     "t": "mc",
     "en": "He was in a (   ), so he didn't have time to eat lunch.",
     "q": "場面に合う語は？",
     "ch": [
      "hurry",
      "rest",
      "dream",
      "corner"
     ],
     "a": 0,
     "ex": "be in a hurry＝急いでいる。"
    }
   ],
   "grammar": [
    {
     "t": "mc",
     "en": "I have (   ) been to Hokkaido.",
     "q": "(   ) に入る語は？",
     "ch": [
      "never",
      "ever",
      "yet",
      "ago"
     ],
     "a": 0,
     "ex": "現在完了（経験）。never＝一度も〜ない。ever は疑問文で使う。"
    },
    {
     "t": "mc",
     "en": "Have you (   ) your homework yet?",
     "q": "(   ) に入る語は？",
     "ch": [
      "finished",
      "finish",
      "finishing",
      "finishes"
     ],
     "a": 0,
     "ex": "Have you＋過去分詞 ～ yet?＝もう〜した？（完了）。"
    },
    {
     "t": "mc",
     "en": "How (   ) have you known him?",
     "q": "(   ) に入る語は？",
     "ch": [
      "long",
      "often",
      "many",
      "much"
     ],
     "a": 0,
     "ex": "How long＋現在完了＝どのくらいの間〜？（継続）。"
    },
    {
     "t": "mc",
     "en": "She has just (   ) home.",
     "q": "(   ) に入る語は？",
     "ch": [
      "come",
      "came",
      "comes",
      "coming"
     ],
     "a": 0,
     "ex": "has just＋過去分詞。come の過去分詞は come。"
    },
    {
     "t": "mc",
     "en": "This picture (   ) taken by my uncle last year.",
     "q": "(   ) に入る語は？",
     "ch": [
      "was",
      "is",
      "were",
      "has"
     ],
     "a": 0,
     "ex": "last year＋受け身 → was taken。主語は単数。"
    },
    {
     "t": "mc",
     "en": "These cookies (   ) in France.",
     "q": "(   ) に入る語は？",
     "ch": [
      "were made",
      "made",
      "are making",
      "make"
     ],
     "a": 0,
     "ex": "受け身は be＋過去分詞。主語が複数 → were made。"
    },
    {
     "t": "mc",
     "en": "The letter was (   ) in English.",
     "q": "(   ) に入る語は？",
     "ch": [
      "written",
      "wrote",
      "write",
      "writing"
     ],
     "a": 0,
     "ex": "受け身 was＋過去分詞 written。"
    },
    {
     "t": "mc",
     "en": "(   ) this song sung in your country?",
     "q": "(   ) に入る語は？",
     "ch": [
      "Is",
      "Does",
      "Do",
      "Has"
     ],
     "a": 0,
     "ex": "受け身の疑問文は be動詞を前に出す。Is ～ sung?"
    },
    {
     "t": "mc",
     "en": "Please tell me how (   ) this machine.",
     "q": "(   ) に入る語は？",
     "ch": [
      "to use",
      "use",
      "using",
      "used"
     ],
     "a": 0,
     "ex": "how to＋原形＝〜の仕方。"
    },
    {
     "t": "mc",
     "en": "I want you (   ) me with my homework.",
     "q": "(   ) に入る語は？",
     "ch": [
      "to help",
      "help",
      "helping",
      "helped"
     ],
     "a": 0,
     "ex": "want 人 to＋原形＝（人）に〜してほしい。"
    },
    {
     "t": "mc",
     "en": "It is difficult (   ) me to get up early.",
     "q": "(   ) に入る語は？",
     "ch": [
      "for",
      "to",
      "of",
      "with"
     ],
     "a": 0,
     "ex": "It is … for 人 to ～＝（人）にとって…だ。"
    },
    {
     "t": "mc",
     "en": "She asked me (   ) the window.",
     "q": "(   ) に入る語は？",
     "ch": [
      "to open",
      "open",
      "opening",
      "opened"
     ],
     "a": 0,
     "ex": "ask 人 to＋原形＝（人）に〜するよう頼む。"
    },
    {
     "t": "mc",
     "en": "This box is (   ) heavy to carry.",
     "q": "(   ) に入る語は？",
     "ch": [
      "too",
      "so",
      "very",
      "enough"
     ],
     "a": 0,
     "ex": "too ～ to …＝…するには〜すぎる。"
    },
    {
     "t": "mc",
     "en": "I was happy (   ) the news.",
     "q": "(   ) に入る語は？",
     "ch": [
      "to hear",
      "hear",
      "hearing",
      "heard"
     ],
     "a": 0,
     "ex": "感情の原因を表す不定詞。happy to hear＝聞いてうれしい。"
    },
    {
     "t": "mc",
     "en": "The movie (   ) we saw last night was exciting.",
     "q": "(   ) に入る語は？",
     "ch": [
      "that",
      "who",
      "whose",
      "what"
     ],
     "a": 0,
     "ex": "物を説明する関係代名詞 that（which も可）。who は人。"
    },
    {
     "t": "mc",
     "en": "The girl (   ) is playing the piano is my cousin.",
     "q": "(   ) に入る語は？",
     "ch": [
      "that",
      "which",
      "what",
      "whose"
     ],
     "a": 0,
     "ex": "人を説明する関係代名詞は who か that。which は物に使う。"
    },
    {
     "t": "mc",
     "en": "This is the cake (   ) my sister made.",
     "q": "(   ) に入る語は？",
     "ch": [
      "which",
      "who",
      "whose",
      "what"
     ],
     "a": 0,
     "ex": "物を説明する関係代名詞 which（that も可）。"
    },
    {
     "t": "mc",
     "en": "I know (   ) she is from.",
     "q": "(   ) に入る語は？",
     "ch": [
      "where",
      "what",
      "which",
      "how"
     ],
     "a": 0,
     "ex": "間接疑問。where she is from＝彼女がどこの出身か。"
    },
    {
     "t": "mc",
     "en": "Do you know what time (   )?",
     "q": "(   ) に入る語は？",
     "ch": [
      "it is",
      "is it",
      "it does",
      "does it"
     ],
     "a": 0,
     "ex": "間接疑問は平叙文の語順（主語＋動詞）。"
    },
    {
     "t": "mc",
     "en": "I wonder (   ) he will come to the party.",
     "q": "(   ) に入る語は？",
     "ch": [
      "if",
      "that",
      "what",
      "where"
     ],
     "a": 0,
     "ex": "wonder if ～＝〜かどうかと思う。"
    },
    {
     "t": "mc",
     "en": "I think (   ) this movie is interesting.",
     "q": "(   ) に入る語は？",
     "ch": [
      "that",
      "what",
      "which",
      "if"
     ],
     "a": 0,
     "ex": "think that＋文＝〜だと思う。この that は省略できる。"
    },
    {
     "t": "mc",
     "en": "I will call you when I (   ) home.",
     "q": "(   ) に入る語は？",
     "ch": [
      "get",
      "will get",
      "got",
      "getting"
     ],
     "a": 0,
     "ex": "時・条件を表す副詞節では、未来のことも現在形で表す。"
    },
    {
     "t": "mc",
     "en": "(   ) it was raining, we played soccer outside.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Though",
      "Because",
      "If",
      "So"
     ],
     "a": 0,
     "ex": "though＝〜だけれども。雨なのに外で、という逆接。"
    },
    {
     "t": "mc",
     "en": "My brother is good at (   ) pictures.",
     "q": "(   ) に入る語は？",
     "ch": [
      "drawing",
      "draw",
      "to draw",
      "drew"
     ],
     "a": 0,
     "ex": "前置詞 at のあとは動名詞 ～ing。"
    },
    {
     "t": "mc",
     "en": "(   ) English every day is important.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Studying",
      "Study",
      "Studied",
      "Studies"
     ],
     "a": 0,
     "ex": "動名詞が主語になる形。〜することは。"
    },
    {
     "t": "mc",
     "en": "Look at the boy (   ) under the tree.",
     "q": "(   ) に入る語は？",
     "ch": [
      "sleeping",
      "sleeps",
      "slept",
      "sleep"
     ],
     "a": 0,
     "ex": "名詞を後ろから説明する現在分詞 sleeping。"
    },
    {
     "t": "mc",
     "en": "I have a dog (   ) Max.",
     "q": "(   ) に入る語は？",
     "ch": [
      "named",
      "naming",
      "names",
      "name"
     ],
     "a": 0,
     "ex": "過去分詞 named＝〜と名づけられた。名詞を後ろから説明。"
    },
    {
     "t": "mc",
     "en": "The news made us (   ).",
     "q": "(   ) に入る語は？",
     "ch": [
      "happy",
      "happily",
      "happiness",
      "to happy"
     ],
     "a": 0,
     "ex": "make 人 形容詞＝（人）を〜にする。"
    },
    {
     "t": "mc",
     "en": "Let me (   ) you with the boxes.",
     "q": "(   ) に入る語は？",
     "ch": [
      "help",
      "to help",
      "helping",
      "helped"
     ],
     "a": 0,
     "ex": "let 人 原形＝（人）に〜させる。"
    },
    {
     "t": "mc",
     "en": "You (   ) run in the hallway. It's dangerous.",
     "q": "(   ) に入る語は？",
     "ch": [
      "must not",
      "don't have to",
      "have to",
      "should"
     ],
     "a": 0,
     "ex": "must not＝〜してはいけない。don't have to は『〜しなくてよい』。"
    },
    {
     "t": "mc",
     "en": "Would you (   ) closing the door?",
     "q": "(   ) に入る語は？",
     "ch": [
      "mind",
      "like",
      "want",
      "have"
     ],
     "a": 0,
     "ex": "Would you mind ～ing?＝〜してくれませんか。"
    },
    {
     "t": "mc",
     "en": "Mt. Fuji is (   ) than any other mountain in Japan.",
     "q": "(   ) に入る語は？",
     "ch": [
      "higher",
      "highest",
      "high",
      "the highest"
     ],
     "a": 0,
     "ex": "比較級＋than any other＋単数名詞＝他のどの…より。"
    },
    {
     "t": "mc",
     "en": "This question is (   ) more difficult than that one.",
     "q": "(   ) に入る語は？",
     "ch": [
      "much",
      "very",
      "many",
      "more"
     ],
     "a": 0,
     "ex": "比較級を強めるのは much。very は比較級に使えない。"
    },
    {
     "t": "mc",
     "en": "She can speak French, (   ) she?",
     "q": "(   ) に入る語は？",
     "ch": [
      "can't",
      "can",
      "doesn't",
      "isn't"
     ],
     "a": 0,
     "ex": "付加疑問。肯定文 can → 否定の can't she?。"
    },
    {
     "t": "mc",
     "en": "What (   ) beautiful flower this is!",
     "q": "(   ) に入る語は？",
     "ch": [
      "a",
      "an",
      "the",
      "so"
     ],
     "a": 0,
     "ex": "感嘆文 What a＋形容詞＋名詞＋主語＋動詞!"
    },
    {
     "t": "mc",
     "en": "There is (   ) water in the bottle.",
     "q": "(   ) に入る語は？",
     "ch": [
      "little",
      "few",
      "many",
      "a few"
     ],
     "a": 0,
     "ex": "little＝ほとんどない（数えられない名詞）。few は数えられる名詞に。"
    }
   ],
   "technique": [
    {
     "t": "mc",
     "en": "A: Would you like to come to my birthday party on Saturday? B: (   )",
     "q": "【3級・大問2】会話に合う応答は？",
     "ch": [
      "I'd love to. What time?",
      "I'm glad you liked it.",
      "Yes, I was there yesterday.",
      "Here it is."
     ],
     "a": 0,
     "ex": "誘いには I'd love to.（ぜひ）で受け、時間をたずねるのが自然。"
    },
    {
     "t": "mc",
     "en": "A: What do you think of this movie? B: (   )",
     "q": "【3級・大問2】会話に合う応答は？",
     "ch": [
      "I think it's a little long.",
      "I'll be there by seven o'clock.",
      "No, thank you.",
      "Twice a month."
     ],
     "a": 0,
     "ex": "What do you think of ～?（どう思う？）には感想・意見で答える。"
    },
    {
     "t": "mc",
     "en": "A: Hello. May I speak to Ken, please? B: (   )",
     "q": "【3級・大問2】会話に合う応答は？",
     "ch": [
      "Sorry, he's out now.",
      "Nice to meet you, Ken.",
      "That's a good idea.",
      "I'm thirteen."
     ],
     "a": 0,
     "ex": "電話で May I speak to ～? → 不在なら he's out now.。"
    },
    {
     "t": "mc",
     "en": "A: Could you turn down the music? I'm studying. B: (   )",
     "q": "【3級・大問2】会話に合う応答は？",
     "ch": [
      "Oh, sorry. I didn't know.",
      "Yes, let's.",
      "Good luck!",
      "It's on the desk next to the window."
     ],
     "a": 0,
     "ex": "音を下げてという依頼 → あやまって受け入れる。"
    },
    {
     "t": "mc",
     "en": "A: Which do you like better, summer or winter? B: (   )",
     "q": "【3級・大問2】会話に合う応答は？",
     "ch": [
      "Winter. I like skiing.",
      "Yes, I do.",
      "It's very hot today, isn't it?",
      "Me too."
     ],
     "a": 0,
     "ex": "Which ～ better, A or B? には A か B を選んで理由を添える。"
    },
    {
     "t": "mc",
     "en": "A: Have you ever tried Japanese calligraphy? B: (   )",
     "q": "【3級・大問2】会話に合う応答は？",
     "ch": [
      "Yes, twice. It was fun.",
      "Yes, I will.",
      "No, it isn't.",
      "By train. It takes an hour."
     ],
     "a": 0,
     "ex": "Have you ever ～?（経験）には Yes/No＋回数などで答える。"
    },
    {
     "t": "mc",
     "en": "A: What's wrong? You look tired. B: (   )",
     "q": "【3級・聞く/話す】自然な応答は？",
     "ch": [
      "I stayed up late.",
      "Thank you very much.",
      "I'd love to.",
      "It's my pleasure."
     ],
     "a": 0,
     "ex": "What's wrong?（どうしたの？）には理由を答える。"
    },
    {
     "t": "mc",
     "en": "A: Thank you for helping me with my homework. B: (   )",
     "q": "【3級・聞く/話す】自然な応答は？",
     "ch": [
      "No problem. Anytime.",
      "That's too bad.",
      "Yes, I did.",
      "Have a nice trip to Kyoto."
     ],
     "a": 0,
     "ex": "お礼には No problem. / You're welcome. で返す。"
    },
    {
     "t": "mc",
     "en": "A: Excuse me. Is this seat taken? B: (   )",
     "q": "【3級・聞く/話す】自然な応答は？",
     "ch": [
      "No. Please sit down.",
      "Yes, I took it yesterday.",
      "It's sunny today.",
      "Happy birthday!"
     ],
     "a": 0,
     "ex": "Is this seat taken?（この席、空いてますか）→ No.＝空いている。"
    },
    {
     "t": "mc",
     "en": "A: How about going to the new café after school? B: (   )",
     "q": "【3級・聞く/話す】自然な応答は？",
     "ch": [
      "Sorry, I'm busy today.",
      "You're welcome. Anytime.",
      "Yes, I was.",
      "It's blue."
     ],
     "a": 0,
     "ex": "How about ～ing? の誘いを断るときは Sorry＋理由。"
    },
    {
     "t": "mc",
     "en": "A: Hello, this is Mika. Can I leave a message? B: (   )",
     "q": "【3級・聞く/話す】自然な応答は？",
     "ch": [
      "Sure. Go ahead.",
      "Nice to see you again.",
      "I'm fine, thanks.",
      "Take care."
     ],
     "a": 0,
     "ex": "伝言を頼まれたら Sure. Go ahead.（どうぞ）。"
    },
    {
     "t": "mc",
     "en": "A: I passed the exam! B: (   )",
     "q": "【3級・聞く/話す】自然な応答は？",
     "ch": [
      "Congratulations!",
      "That's too bad. Try again.",
      "No, I didn't.",
      "Here you are."
     ],
     "a": 0,
     "ex": "合格の報告には Congratulations!。"
    },
    {
     "t": "mc",
     "q": "【3級・読む】掲示: CITY POOL / Open: July 1 - August 31, 9:00 a.m. - 6:00 p.m. / Closed on Tuesdays / Children under 12 must come with an adult. 質問: What must children under 12 do?",
     "ch": [
      "Go with an adult.",
      "Pay 500 yen.",
      "Bring a towel.",
      "Come before 9:00."
     ],
     "a": 0,
     "ex": "掲示の Children under 12 must come with an adult を言いかえた「おとなと一緒に行く」が正解。"
    },
    {
     "t": "mc",
     "q": "【3級・読む】掲示: LOST: A black cat named Momo. Last seen near Sakura Park on May 3. If you find her, please call Yuki at 090-XXXX. 質問: What should you do if you find the cat?",
     "ch": [
      "Phone the owner.",
      "Take her to the park.",
      "Keep her at home.",
      "Send an e-mail."
     ],
     "a": 0,
     "ex": "please call Yuki＝飼い主の Yuki に電話する。phone＝電話をかける（call の言いかえ）。"
    },
    {
     "t": "mc",
     "q": "【3級・読む】Eメール（Daiki → Tom）: I'm going to the science museum next Saturday with my brother. Would you like to join us? We'll meet at the station at ten. 質問: What does Daiki ask Tom to do?",
     "ch": [
      "Go to the museum with them.",
      "Meet his brother at school.",
      "Buy a ticket for him.",
      "Call him at ten."
     ],
     "a": 0,
     "ex": "Would you like to join us? が誘いの文。"
    },
    {
     "t": "mc",
     "q": "【3級・読む】Eメール（Tom → Daiki）: Thanks for inviting me. I'd love to go, but I have a piano lesson until eleven. Can we meet at the museum at noon instead? 質問: Why can't Tom meet at ten?",
     "ch": [
      "He has a piano lesson.",
      "He has to help his brother.",
      "The museum is closed.",
      "He doesn't like science."
     ],
     "a": 0,
     "ex": "but I have a piano lesson until eleven から。"
    },
    {
     "t": "mc",
     "q": "【3級・読む】掲示: GREEN TOWN LIBRARY / New hours from April: Weekdays 9-7, Saturdays 9-5 / Books can be borrowed for two weeks. / When the library is closed, return books in the box by the door. 質問: How long can you borrow books?",
     "ch": [
      "For fourteen days.",
      "For one week.",
      "For two months.",
      "Until the end of April."
     ],
     "a": 0,
     "ex": "Books can be borrowed for two weeks＝2週間＝14日。"
    },
    {
     "t": "mc",
     "q": "【3級・読む】メモ: Mom, I'm at Hana's house. We're making a poster for the school festival. I'll be home by six. Please don't make dinner for me. I'll eat here. - Aya 質問: What does Aya ask her mother to do?",
     "ch": [
      "Not to make dinner for her.",
      "Pick her up at Hana's house at six.",
      "Bring a poster.",
      "Call Hana's mother."
     ],
     "a": 0,
     "ex": "Please don't make dinner for me から。"
    },
    {
     "t": "mc",
     "q": "【3級・読む】掲示: FREE ENGLISH SPEAKING CLUB / Every Wednesday, 4-5 p.m., Room 203 / For students who want to practice speaking / No sign-up needed. Just come! 質問: What do students need to do to join the club?",
     "ch": [
      "Just go to Room 203 on Wednesday.",
      "Sign up at the office by Tuesday.",
      "Pay 500 yen.",
      "Bring a textbook."
     ],
     "a": 0,
     "ex": "No sign-up needed. Just come! から。申し込み不要。"
    },
    {
     "t": "mc",
     "q": "【3級・読む】Eメール（Haruto → Ms. Brown）: Thank you for the great lesson yesterday. I didn't understand the last part about the past tense. Could you explain it again tomorrow? 質問: What does Haruto want Ms. Brown to do?",
     "ch": [
      "Explain the past tense again.",
      "Cancel tomorrow's lesson.",
      "Check his homework before tomorrow.",
      "Call his parents."
     ],
     "a": 0,
     "ex": "Could you explain it again の it＝the past tense。"
    },
    {
     "t": "mc",
     "q": "【3級・聞く】A: Excuse me, does this bus go to the city museum? B: No, you need the No. 5 bus. It leaves from the stop across the street. 質問: What will A probably do next?",
     "ch": [
      "Go to the bus stop across the street.",
      "Get on this bus.",
      "Walk to the museum from this bus stop.",
      "Buy a ticket."
     ],
     "a": 0,
     "ex": "5番のバスは across the street の停留所から出る。"
    },
    {
     "t": "mc",
     "q": "【3級・聞く】A: Dad, can you drive me to the station? B: Sorry, the car isn't working today. Why don't you take your bike? 質問: How will A probably go to the station?",
     "ch": [
      "By bike.",
      "By car.",
      "By bus.",
      "On foot."
     ],
     "a": 0,
     "ex": "Why don't you take your bike? が提案。車は使えない。"
    },
    {
     "t": "mc",
     "q": "【3級・聞く】A: Yumi, did you see the soccer game last night? B: No, I had to study for today's math test. How was it? A: Our team won 2-1! 質問: Why didn't Yumi watch the game?",
     "ch": [
      "She was studying for a test.",
      "She was playing soccer with her team.",
      "She went to bed early.",
      "She doesn't like soccer."
     ],
     "a": 0,
     "ex": "I had to study for today's math test から。"
    },
    {
     "t": "mc",
     "q": "【3級・聞く】A: Welcome to Sunny Café. What would you like? B: One hot chocolate, please. Oh, and a piece of apple pie. A: Sure. That's 650 yen. 質問: What did the customer order?",
     "ch": [
      "A hot chocolate and apple pie.",
      "Two hot chocolates and a sandwich.",
      "A coffee and a sandwich.",
      "Only apple pie."
     ],
     "a": 0,
     "ex": "hot chocolate ＋ apple pie の2点。"
    },
    {
     "t": "mc",
     "q": "【3級・聞く】A: Mike, you've been in Japan for three years, right? B: Actually, it's been five years. I came here when I was ten. 質問: How long has Mike been in Japan?",
     "ch": [
      "For five years.",
      "For three years.",
      "For ten years.",
      "Since last year."
     ],
     "a": 0,
     "ex": "Actually（実は）のあとが正しい情報。five years。"
    },
    {
     "t": "mc",
     "q": "【3級・聞く】A: Kana, this is for you. Happy birthday! B: Wow, a scarf! Did you make it yourself? A: Yes. It took me two weeks. 質問: What did Kana get?",
     "ch": [
      "A handmade scarf.",
      "A sweater.",
      "A birthday cake.",
      "A scarf from a shop."
     ],
     "a": 0,
     "ex": "a scarf ＋ Did you make it yourself? → Yes. 手作りのマフラー。"
    },
    {
     "t": "mc",
     "q": "【3級・聞く】A: Excuse me, what time does the movie start? B: The next one starts at 3:30, but it's sold out. There are seats for the 6 o'clock show. 質問: When will A probably see the movie?",
     "ch": [
      "In the evening.",
      "At 3:30 this afternoon.",
      "Tomorrow morning.",
      "At noon today."
     ],
     "a": 0,
     "ex": "3時半は売り切れ → 6時の回＝夕方（in the evening）に見ることになる。"
    },
    {
     "t": "mc",
     "q": "【3級・聞く】A: Ken, have you finished your history report? B: Not yet. I need to go to the library to find some books. A: You can use my books if you want. 質問: What does A offer to do?",
     "ch": [
      "Lend Ken some books.",
      "Go to the library with him.",
      "Write his report.",
      "Buy some books."
     ],
     "a": 0,
     "ex": "You can use my books＝本を貸してあげる、という申し出。"
    },
    {
     "t": "mc",
     "q": "【3級・書く】QUESTION: Do you like reading books? 答えの書き出しとして正しいのは？",
     "ch": [
      "Yes, I do. I have two reasons.",
      "Yes, I like. Two reasons.",
      "I do like reading, because.",
      "Yes, I'm. There are two reasons."
     ],
     "a": 0,
     "ex": "質問の動詞 Do に合わせて Yes, I do.。理由を2つ述べる予告をつけると書きやすい。"
    },
    {
     "t": "mc",
     "en": "I like summer. (   ), I can swim in the sea. (   ), there are many festivals.",
     "q": "【3級・書く】理由を2つ並べるつなぎ言葉は？",
     "ch": [
      "First / Second",
      "But / So",
      "Because / Because",
      "However / Finally"
     ],
     "a": 0,
     "ex": "理由を列挙するときは First, … Second, …。"
    },
    {
     "t": "mc",
     "en": "I think English is important (   ) we can talk with people from other countries.",
     "q": "【3級・書く】理由を続ける語は？",
     "ch": [
      "because",
      "so",
      "but",
      "however"
     ],
     "a": 0,
     "ex": "意見のあとに理由 → because。so は『だから』で結果に使う。"
    },
    {
     "t": "mc",
     "q": "【3級・書く】友だちのEメール「I went to a new restaurant yesterday!」への返事に入れる2つの質問としてふさわしい組は？",
     "ch": [
      "What did you eat? / Who did you go with?",
      "Do you like it? / Is it rain?",
      "Where you went? / What you ate?",
      "Did you went there? / Was it delicious."
     ],
     "a": 0,
     "ex": "過去の出来事は過去形の疑問文で。語順は 疑問詞＋did＋主語＋原形。"
    },
    {
     "t": "mc",
     "q": "【3級・話す】面接官: Please look at the picture. What is the boy doing?（絵: 男の子が木の下で本を読んでいる）答え方は？",
     "ch": [
      "He is reading a book under the tree.",
      "He reads a book.",
      "He read a book under the tree yesterday.",
      "The boy is a book."
     ],
     "a": 0,
     "ex": "絵の描写は現在進行形 be ～ing で。場所も添える。"
    },
    {
     "t": "mc",
     "q": "【3級・話す】面接官: What do you usually do on weekends? 自然な答えは？",
     "ch": [
      "I usually play basketball with my friends.",
      "Yes, I do.",
      "I'm going to the park with my friends now.",
      "It's Saturday."
     ],
     "a": 0,
     "ex": "What do you usually do → 習慣は現在形で具体的に。"
    },
    {
     "t": "mc",
     "q": "【3級・話す】面接官: Do you think students should study English every day? → Yes. のあとに続ける文は？",
     "ch": [
      "Because it helps them speak better.",
      "I study English on Mondays and Fridays.",
      "No, I don't think so.",
      "English is a language."
     ],
     "a": 0,
     "ex": "Yes/No のあとは理由を Because … で続ける。"
    },
    {
     "t": "mc",
     "q": "【3級・話す】音読のあと、面接官: Why do many people like traveling?（本文: Many people like traveling because they can see new places.）答えは？",
     "ch": [
      "Because they can go to new places.",
      "Because many people like traveling.",
      "Yes, they do.",
      "I like traveling, too."
     ],
     "a": 0,
     "ex": "本文の because they can see new places を自分の言葉で言いかえる（see → go to）。本文をそのまま読む「Many people like traveling」は理由になっていない。"
    }
   ],
   "practice": [
    {
     "t": "mc",
     "en": "My grandfather is eighty years old, but he is still very (   ). He swims every morning.",
     "q": "(   ) に入る語は？",
     "ch": [
      "active",
      "expensive",
      "absent",
      "narrow"
     ],
     "a": 0,
     "ex": "active＝活発な。毎朝泳ぐ元気な祖父の説明。"
    },
    {
     "t": "mc",
     "en": "I was (   ) to hear that our team won the game.",
     "q": "(   ) に入る語は？",
     "ch": [
      "glad",
      "heavy",
      "early",
      "cheap"
     ],
     "a": 0,
     "ex": "glad＝うれしい。be glad to hear ～＝〜と聞いてうれしい。"
    },
    {
     "t": "mc",
     "en": "This box is too (   ) to carry. Can you help me?",
     "q": "(   ) に入る語は？",
     "ch": [
      "heavy",
      "light",
      "easy",
      "soft"
     ],
     "a": 0,
     "ex": "heavy＝重い。too ～ to …＝〜すぎて…できない。"
    },
    {
     "t": "mc",
     "en": "A: What does this word (   )? B: It means \"quiet.\"",
     "q": "(   ) に入る語は？",
     "ch": [
      "mean",
      "say",
      "call",
      "speak"
     ],
     "a": 0,
     "ex": "mean＝意味する。B の It means がヒント。"
    },
    {
     "t": "mc",
     "en": "We should not (   ) food. Many people in the world don't have enough to eat.",
     "q": "(   ) に入る語は？",
     "ch": [
      "waste",
      "watch",
      "wear",
      "win"
     ],
     "a": 0,
     "ex": "waste＝むだにする。食べ物をむだにしてはいけない。"
    },
    {
     "t": "mc",
     "en": "Kumi (   ) up her hand and answered the question.",
     "q": "(   ) に入る語は？",
     "ch": [
      "put",
      "got",
      "gave",
      "took"
     ],
     "a": 0,
     "ex": "put up one's hand＝手を挙げる。"
    },
    {
     "t": "mc",
     "en": "I (   ) a cold last week, so I stayed home for two days.",
     "q": "(   ) に入る語は？",
     "ch": [
      "caught",
      "took",
      "made",
      "brought"
     ],
     "a": 0,
     "ex": "catch a cold＝かぜをひく。caught は catch の過去形。"
    },
    {
     "t": "mc",
     "en": "The movie was so (   ) that I fell asleep.",
     "q": "(   ) に入る語は？",
     "ch": [
      "boring",
      "exciting",
      "bored",
      "interesting"
     ],
     "a": 0,
     "ex": "boring＝退屈な。眠ってしまった理由。物が主語なので -ing 形。"
    },
    {
     "t": "mc",
     "en": "Thank you for (   ) me with my homework.",
     "q": "(   ) に入る語は？",
     "ch": [
      "helping",
      "help",
      "helped",
      "to help"
     ],
     "a": 0,
     "ex": "Thank you for ＋動名詞＝〜してくれてありがとう。前置詞 for のあとは -ing。"
    },
    {
     "t": "mc",
     "en": "Please (   ) off your shoes here. This is a Japanese house.",
     "q": "(   ) に入る語は？",
     "ch": [
      "take",
      "put",
      "get",
      "make"
     ],
     "a": 0,
     "ex": "take off＝（くつなどを）脱ぐ。put on（身につける）の反対。"
    },
    {
     "t": "mc",
     "en": "I have to (   ) a speech in English class tomorrow. I'm nervous.",
     "q": "(   ) に入る語は？",
     "ch": [
      "give",
      "play",
      "hold",
      "speak"
     ],
     "a": 0,
     "ex": "give a speech＝スピーチをする。"
    },
    {
     "t": "mc",
     "en": "Mr. Ito (   ) us that the test would be easy, but it was very difficult.",
     "q": "(   ) に入る語は？",
     "ch": [
      "promised",
      "asked",
      "believed",
      "hoped"
     ],
     "a": 0,
     "ex": "promise ＋人＋ that ～＝〜と約束する。but 以下との対比。"
    },
    {
     "t": "mc",
     "en": "The park is (   ) with people during the cherry blossom season.",
     "q": "(   ) に入る語は？",
     "ch": [
      "crowded",
      "empty",
      "careful",
      "clean"
     ],
     "a": 0,
     "ex": "crowded＝こんでいる。be crowded with ～＝〜でこんでいる。"
    },
    {
     "t": "mc",
     "en": "In Japan, the school year (   ) in April.",
     "q": "(   ) に入る語は？",
     "ch": [
      "begins",
      "arrives",
      "climbs",
      "sells"
     ],
     "a": 0,
     "ex": "begin＝始まる。日本の学年は4月に始まる。"
    },
    {
     "t": "mc",
     "en": "(   ) you are free tomorrow, let's go to the new shopping mall.",
     "q": "(   ) に入る語は？",
     "ch": [
      "If",
      "But",
      "So",
      "Or"
     ],
     "a": 0,
     "ex": "If＝もし〜なら。条件を表す接続詞。"
    },
    {
     "t": "mc",
     "en": "A: Would you like some more cake? B: (   )",
     "q": "応答として最も適切なものは？",
     "ch": [
      "No, thank you. I've had enough.",
      "Yes, I was.",
      "Here you are.",
      "I'm going to the station by bus."
     ],
     "a": 0,
     "ex": "Would you like ～?（すすめ）には No, thank you. などで答える。"
    },
    {
     "t": "mc",
     "en": "A: Excuse me. Is this seat taken? B: (   )",
     "q": "応答として自然なのは？",
     "ch": [
      "No, go ahead.",
      "Yes, I'm fourteen.",
      "It's cloudy today.",
      "I'm from Canada."
     ],
     "a": 0,
     "ex": "席が空いているかの問いに「どうぞ」と答える No, go ahead.。"
    },
    {
     "t": "mc",
     "en": "A: Whose notebook is this? B: (   )",
     "q": "応答として自然なのは？",
     "ch": [
      "It's Ken's. He left it here.",
      "It's on Monday.",
      "Yes, it is.",
      "I have two notebooks in my bag."
     ],
     "a": 0,
     "ex": "Whose ～?（だれの）には持ち主を答える。"
    },
    {
     "t": "mc",
     "en": "A: Hello. This is Mika. Is Jun there? B: (   )",
     "q": "電話での応答として自然なのは？",
     "ch": [
      "Just a minute, please. I'll get him.",
      "Nice to meet you.",
      "Yes, I did.",
      "It's two dollars. Here is your change."
     ],
     "a": 0,
     "ex": "電話で Is ～ there? と呼び出しを頼まれたら Just a minute.（少々お待ちください）でつなぐ。"
    },
    {
     "t": "mc",
     "en": "A: Which do you like better, cats or dogs? B: (   )",
     "q": "応答として自然なのは？",
     "ch": [
      "I like dogs better.",
      "Yes, I do.",
      "Two years ago.",
      "I'm a student."
     ],
     "a": 0,
     "ex": "Which ～ better, A or B? には like ～ better で答える。Yes/No では答えない。"
    },
    {
     "t": "mc",
     "en": "A: Why were you late for school today? B: (   )",
     "q": "応答として自然なのは？",
     "ch": [
      "Because I missed the bus.",
      "At eight thirty.",
      "Yes, I was.",
      "By bus."
     ],
     "a": 0,
     "ex": "Why には Because ～ で理由を答える。"
    },
    {
     "t": "mc",
     "en": "A: Can I try this jacket on? B: (   )",
     "q": "店員の応答として自然なのは？",
     "ch": [
      "Sure. The fitting room is over there.",
      "No, I'm not.",
      "It was fun.",
      "You're welcome."
     ],
     "a": 0,
     "ex": "try on＝試着する。許可して試着室を案内する。"
    },
    {
     "t": "mc",
     "en": "A: I passed the exam! B: (   )",
     "q": "応答として自然なのは？",
     "ch": [
      "Congratulations! I'm happy for you.",
      "That's too bad.",
      "Me neither.",
      "Here you are."
     ],
     "a": 0,
     "ex": "よい知らせには Congratulations!（おめでとう）。"
    },
    {
     "t": "mc",
     "en": "A: Could you say that again? I didn't hear you. B: (   )",
     "q": "応答として自然なのは？",
     "ch": [
      "OK. I said the meeting is at three.",
      "No, I haven't.",
      "Yes, you are.",
      "I like it very much."
     ],
     "a": 0,
     "ex": "もう一度言ってほしいと頼まれたので、同じ内容を言い直す。"
    },
    {
     "t": "mc",
     "en": "「私は彼女に何を買うべきかわからない。」 I don't know ( ① buy ② what ③ her ④ to ⑤ for ).",
     "q": "並べかえて正しい文にしたとき、2番目と4番目にくる語の組み合わせは？",
     "ch": [
      "④－⑤",
      "②－①",
      "④－③",
      "①－⑤"
     ],
     "a": 0,
     "ex": "what to buy for her（②④①⑤③）。what to ＋原形＝何を〜すべきか。"
    },
    {
     "t": "mc",
     "en": "「これは私の父が撮った写真です。」 This is ( ① taken ② a ③ picture ④ by ⑤ my father ).",
     "q": "並べかえて正しい文にしたとき、2番目と4番目にくる語の組み合わせは？",
     "ch": [
      "③－④",
      "①－④",
      "③－⑤",
      "②－①"
     ],
     "a": 0,
     "ex": "a picture taken by my father（②③①④⑤）。過去分詞が後ろから名詞を説明。"
    },
    {
     "t": "mc",
     "en": "「彼女は私にその本を読むように言った。」 She ( ① me ② read ③ told ④ to ⑤ the book ).",
     "q": "並べかえて正しい文にしたとき、2番目と4番目にくる語の組み合わせは？",
     "ch": [
      "①－②",
      "③－④",
      "①－⑤",
      "④－②"
     ],
     "a": 0,
     "ex": "told me to read the book（③①④②⑤）。tell ＋人＋ to ＋原形。"
    },
    {
     "t": "mc",
     "en": "「この問題は私には難しすぎて答えられない。」 This question ( ① too ② is ③ for ④ difficult ⑤ me ) to answer.",
     "q": "並べかえて正しい文にしたとき、2番目と4番目にくる語の組み合わせは？",
     "ch": [
      "①－③",
      "②－④",
      "④－⑤",
      "①－⑤"
     ],
     "a": 0,
     "ex": "is too difficult for me（②①④③⑤）。too ～ for 人 to …。"
    },
    {
     "t": "mc",
     "q": "英文: Saki wants to be a doctor, so she studies science very hard every night. 質問: Why does Saki study science hard?",
     "ch": [
      "Because she wants to be a doctor.",
      "Because she likes her teacher.",
      "Because she has a test tomorrow.",
      "Because her friend asked her to."
     ],
     "a": 0,
     "ex": "so の前が理由（wants to be a doctor）。"
    },
    {
     "t": "mc",
     "q": "英文: The city museum is open from 9 a.m. to 5 p.m., but it is closed on Tuesdays. 質問: When is the museum closed?",
     "ch": [
      "Every Tuesday.",
      "On Sundays.",
      "On weekends.",
      "In the morning."
     ],
     "a": 0,
     "ex": "closed on Tuesdays＝毎週火曜が休み（Every Tuesday）。開館時間 9 a.m.-5 p.m. と混同しない。"
    },
    {
     "t": "mc",
     "q": "会話: A: Where did you buy that bag? B: I didn't buy it. My aunt gave it to me for my birthday. 質問: How did B get the bag?",
     "ch": [
      "B's aunt gave it to B.",
      "B bought it at a shop.",
      "B found it at school.",
      "B made it."
     ],
     "a": 0,
     "ex": "My aunt gave it to me から。"
    },
    {
     "t": "mc",
     "q": "英文: Tomoya couldn't go to the concert last night because he had a fever. 質問: Why didn't Tomoya go to the concert?",
     "ch": [
      "Because he was sick.",
      "Because he had no ticket.",
      "Because it was raining.",
      "Because he was busy with homework."
     ],
     "a": 0,
     "ex": "had a fever（熱があった）＝ sick。言いかえに注意。"
    }
   ],
   "reading": [
    {
     "t": "fill",
     "p": "g3_speech_garden",
     "q": "空所(あ)に入る英語1語を本文からそのまま抜き出そう。ヒント：第2段落の、2週間後に見つけたもの。",
     "en": "And when you see the first small [ ___ ], you will feel very excited, just like me.",
     "a": "leaves",
     "ex": "第2段落 I found small green leaves の leaves（leaf の複数形）。初めて芽が出たときの喜び。"
    },
    {
     "t": "fill",
     "p": "g3_speech_garden",
     "q": "空所(い)に入る英語1語を本文からそのまま抜き出そう。ヒント：第2段落のおばあさんのことば。",
     "en": "If we use it, our school life will become [ ___ ].",
     "a": "better",
     "ex": "第2段落 Vegetables taste better when you grow them yourself の better。become better＝よりよくなる。"
    },
    {
     "t": "mc",
     "p": "g3_speech_garden",
     "q": "質問: What did Mio's grandmother give her one morning?",
     "ch": [
      "Seeds of a vegetable.",
      "A small garden.",
      "A book about vegetables.",
      "Some flowers."
     ],
     "a": 0,
     "ex": "第2段落 she gave me some tomato seeds。トマトは野菜なので「野菜の種」。"
    },
    {
     "t": "mc",
     "p": "g3_speech_garden",
     "q": "質問: Why did Mio almost give up?",
     "ch": [
      "Because nothing happened for a long time.",
      "Because the tomatoes were not sweet.",
      "Because she was too busy.",
      "Because her grandmother was angry."
     ],
     "a": 0,
     "ex": "第2段落 Nothing happened for a long time, so I almost gave up。"
    },
    {
     "t": "mc",
     "p": "g3_speech_garden",
     "q": "質問: What will students do in July?",
     "ch": [
      "Cook the vegetables and eat them with their teachers.",
      "Visit Mio's grandmother.",
      "Buy tomatoes at the supermarket.",
      "Clean the gym."
     ],
     "a": 0,
     "ex": "第3段落 In July ... We will cook the vegetables and eat them together with our teachers。"
    },
    {
     "t": "fill",
     "p": "g3_speech_letters",
     "q": "空所(あ)に入る英語1語を本文からそのまま抜き出そう。ヒント：第2段落の we could talk ～ の語。",
     "en": "Messages are useful when you want to tell something [ ___ ].",
     "a": "quickly",
     "ex": "第2段落 It was easy, and we could talk quickly の quickly。メッセージの長所＝速さ。"
    },
    {
     "t": "fill",
     "p": "g3_speech_letters",
     "q": "空所(い)に入る英語1語を本文からそのまま抜き出そう。ヒント：第2段落のお母さんのことば。",
     "en": "When you write a letter, you think about the person for a long [ ___ ].",
     "a": "time",
     "ex": "第2段落 Writing a letter takes time, but that time shows your feelings の time。for a long time＝長い間。"
    },
    {
     "t": "mc",
     "p": "g3_speech_letters",
     "q": "質問: Why did Haruto move to Hokkaido?",
     "ch": [
      "Because of his father's work.",
      "Because he wanted to see snow.",
      "Because he joined a new soccer team.",
      "Because his grandparents lived there."
     ],
     "a": 0,
     "ex": "第2段落 moved to Hokkaido because of his father's job。job＝work（仕事）。"
    },
    {
     "t": "mc",
     "p": "g3_speech_letters",
     "q": "質問: What did Ryota's mother tell him to do?",
     "ch": [
      "Write a letter to Haruto.",
      "Call Haruto every day.",
      "Visit Haruto in Hokkaido.",
      "Make new friends."
     ],
     "a": 0,
     "ex": "第2段落 Why don't you write him a letter?。"
    },
    {
     "t": "mc",
     "p": "g3_speech_letters",
     "q": "質問: How long did it take Ryota to write his first letter?",
     "ch": [
      "120 minutes.",
      "Two weeks.",
      "One month.",
      "Three days."
     ],
     "a": 0,
     "ex": "第3段落 It took me two hours＝2時間＝120分。Two weeks later は返事が来た時期。"
    },
    {
     "t": "mc",
     "p": "g3_email_cooking",
     "q": "質問: What time does the cooking class start?",
     "ch": [
      "At ten in the morning.",
      "At nine thirty in the morning.",
      "At twelve noon.",
      "At one in the afternoon."
     ],
     "a": 0,
     "ex": "Nana のメール The class starts at 10 a.m.＝午前10時。9:30 は Tom のサッカー練習が終わる時刻。"
    },
    {
     "t": "mc",
     "p": "g3_email_cooking",
     "q": "質問: What do people need to bring to the class?",
     "ch": [
      "Their own apron and towel.",
      "Rice, vegetables, and curry powder.",
      "500 yen.",
      "A cooking book."
     ],
     "a": 0,
     "ex": "Nana のメール you need to bring an apron and a towel。材料は持っていかないし、クラスは free。"
    },
    {
     "t": "mc",
     "p": "g3_email_cooking",
     "q": "質問: What will Tom do on Saturday morning before the class?",
     "ch": [
      "Practice soccer.",
      "Make curry at home.",
      "Go shopping with Emma.",
      "Help Nana's mother."
     ],
     "a": 0,
     "ex": "Tom のメール I have soccer practice on Saturday morning。"
    },
    {
     "t": "mc",
     "p": "g3_email_cooking",
     "q": "質問: What does Tom ask Nana to do?",
     "ch": [
      "Lend him an apron.",
      "Teach him how to make curry.",
      "Come to his soccer game.",
      "Call him on Thursday."
     ],
     "a": 0,
     "ex": "Tom のメール I don't have an apron. Can I borrow one from you?。"
    },
    {
     "t": "mc",
     "p": "g3_email_cooking",
     "q": "質問: Who is Emma?",
     "ch": [
      "Tom's sister.",
      "Nana's sister.",
      "Nana's mother.",
      "Tom's classmate."
     ],
     "a": 0,
     "ex": "Tom のメール my sister Emma。"
    },
    {
     "t": "mc",
     "p": "g3_notice_cycling",
     "q": "質問: When will the event be held if it rains on May 18?",
     "ch": [
      "One week later.",
      "On May 10.",
      "On the next Saturday.",
      "It will not be held."
     ],
     "a": 0,
     "ex": "If it rains, the event will be held on May 25＝5月18日の1週間後。May 10 は申し込みの締め切り。"
    },
    {
     "t": "mc",
     "p": "g3_notice_cycling",
     "q": "質問: What time will people start riding?",
     "ch": [
      "At nine in the morning.",
      "At half past eight in the morning.",
      "At one in the afternoon.",
      "At five in the afternoon."
     ],
     "a": 0,
     "ex": "We will start at 9:00 a.m.＝午前9時。8:30 は集合時刻、1:00 p.m. は戻る時刻。"
    },
    {
     "t": "mc",
     "p": "g3_notice_cycling",
     "q": "質問: How much does a junior high school student pay to join?",
     "ch": [
      "Three hundred yen.",
      "Five hundred yen.",
      "Eight hundred yen.",
      "Nothing. It is free."
     ],
     "a": 0,
     "ex": "Fee: 300 yen for students＝学生は300円。500円はおとな。昼食つき。"
    },
    {
     "t": "mc",
     "p": "g3_notice_cycling",
     "q": "質問: What must a 12-year-old child do to join the event?",
     "ch": [
      "Take part with an adult.",
      "Bring a letter from school.",
      "Rent a bike at the station.",
      "Pay 500 yen."
     ],
     "a": 0,
     "ex": "Children under 13 must come with an adult。12歳は under 13 なので、おとなと一緒に参加する。"
    },
    {
     "t": "mc",
     "p": "g3_notice_cycling",
     "q": "質問: How can people join the event?",
     "ch": [
      "By sending an e-mail by May 10.",
      "By calling the station.",
      "By coming to Sakura Park.",
      "By visiting the Sports Office on May 18."
     ],
     "a": 0,
     "ex": "Send an e-mail to the Midori City Sports Office by May 10。"
    },
    {
     "t": "mc",
     "p": "g3_email_host",
     "q": "質問: What does Mark do?",
     "ch": [
      "He is a nurse.",
      "He is a teacher.",
      "He is a basketball coach.",
      "He is a doctor."
     ],
     "a": 0,
     "ex": "My husband, Mark, is a nurse at the city hospital。"
    },
    {
     "t": "mc",
     "p": "g3_email_host",
     "q": "質問: Who is the same age as Kaito?",
     "ch": [
      "Linda's son.",
      "Linda's daughter.",
      "Linda's husband.",
      "Amy's friend."
     ],
     "a": 0,
     "ex": "Our son, Jack, is fourteen, the same age as you＝Linda の息子 Jack が同い年。"
    },
    {
     "t": "mc",
     "p": "g3_email_host",
     "q": "質問: Why should Kaito bring warm clothes?",
     "ch": [
      "Because mornings are still cold in April.",
      "Because it is always windy near the big lake.",
      "Because they will go skiing.",
      "Because the hospital is cold."
     ],
     "a": 0,
     "ex": "Please bring warm clothes because it is still cold in the morning in April＝4月の朝はまだ寒い。"
    },
    {
     "t": "mc",
     "p": "g3_email_host",
     "q": "質問: What does Linda want to know about Kaito?",
     "ch": [
      "His favorite food and things he can't eat.",
      "His birthday.",
      "The time his plane arrives.",
      "His Japanese school."
     ],
     "a": 0,
     "ex": "Could you tell me about your favorite food and anything you can't eat?。"
    },
    {
     "t": "mc",
     "p": "g3_story_bakery",
     "q": "質問: Why did Hinata help at the bakery?",
     "ch": [
      "Because Mr. Sato broke his leg.",
      "Because she wanted to get money.",
      "Because her grandmother was sick.",
      "Because the bakery was very busy in summer."
     ],
     "a": 0,
     "ex": "第1段落 because her helper, Mr. Sato, broke his leg。"
    },
    {
     "t": "mc",
     "p": "g3_story_bakery",
     "q": "質問: What was Hinata's job at the bakery?",
     "ch": [
      "Putting bread on the shelves and greeting customers.",
      "Baking milk bread.",
      "Washing the dishes.",
      "Delivering bread to houses."
     ],
     "a": 0,
     "ex": "第1段落 put the bread on the shelves and to say \"Good morning\" to the customers。"
    },
    {
     "t": "mc",
     "p": "g3_story_bakery",
     "q": "質問: What did Hinata decide to do on the first night?",
     "ch": [
      "Try every kind of bread and learn about it.",
      "Ask her grandmother which bread is the softest.",
      "Stop working at the bakery.",
      "Get up at five."
     ],
     "a": 0,
     "ex": "第2段落 I decided to taste all the bread in the shop and remember it＝全部のパンを食べてみて覚える。"
    },
    {
     "t": "mc",
     "p": "g3_story_bakery",
     "q": "質問: What time does Hinata's grandmother bake the milk bread?",
     "ch": [
      "At five in the morning.",
      "At nine in the morning.",
      "At noon.",
      "In the evening."
     ],
     "a": 0,
     "ex": "第3段落 My grandmother bakes it at five every morning。"
    },
    {
     "t": "mc",
     "p": "g3_story_bakery",
     "q": "質問: What does Hinata want to do in the future?",
     "ch": [
      "Do work that makes people happy.",
      "Open her own bakery near the station.",
      "Become a nurse like Mr. Sato.",
      "Travel to many countries."
     ],
     "a": 0,
     "ex": "第4段落 I want to have a job that makes people smile＝人を笑顔（happy）にする仕事。パン屋を開くとは言っていない。"
    },
    {
     "t": "mc",
     "p": "g3_story_lucas",
     "q": "質問: Why did the teacher ask Shun to sit next to Lucas?",
     "ch": [
      "Because Shun liked English.",
      "Because Shun played soccer.",
      "Because Shun was from Brazil.",
      "Because Shun was the class leader."
     ],
     "a": 0,
     "ex": "第1段落 asked me to sit next to him because I liked English。"
    },
    {
     "t": "mc",
     "p": "g3_story_lucas",
     "q": "質問: Why didn't Shun talk much to Lucas at first?",
     "ch": [
      "He was afraid of making mistakes in English.",
      "He didn't like Lucas.",
      "He was busy with club activities.",
      "Lucas couldn't speak any Japanese."
     ],
     "a": 0,
     "ex": "第2段落 I was afraid of making mistakes in English。"
    },
    {
     "t": "mc",
     "p": "g3_story_lucas",
     "q": "質問: What was Lucas doing when Shun saw him in the schoolyard?",
     "ch": [
      "Kicking a ball by himself.",
      "Eating lunch with his classmates.",
      "Reading a textbook.",
      "Talking with the teacher."
     ],
     "a": 0,
     "ex": "第3段落 I saw Lucas playing soccer alone＝ひとりでサッカー（ボールを蹴って）いた。alone＝by himself。"
    },
    {
     "t": "mc",
     "p": "g3_story_lucas",
     "q": "質問: What did Lucas teach Shun?",
     "ch": [
      "Words in his own language.",
      "How to play soccer better.",
      "Some Japanese words.",
      "Some English songs."
     ],
     "a": 0,
     "ex": "第3段落 He taught me some Portuguese words。ブラジル出身の Lucas の母語＝ポルトガル語。Japanese は Shun が教えたほう。"
    },
    {
     "t": "mc",
     "p": "g3_story_lucas",
     "q": "質問: What did Shun learn from Lucas?",
     "ch": [
      "You can make friends without perfect English.",
      "You need to speak perfect English to make friends.",
      "Soccer is popular in Brazil.",
      "Japanese is difficult for foreigners."
     ],
     "a": 0,
     "ex": "第4段落 you don't need perfect English to make friends＝完璧な英語がなくても友だちはできる。逆の内容の選択肢に注意。"
    }
   ]
  },
  "4": {
   "vocab": [
    {
     "t": "mc",
     "q": "「〜を忘れる」は？",
     "ch": [
      "forget",
      "remember",
      "follow",
      "finish"
     ],
     "a": 0,
     "ex": "forget＝忘れる。remember＝覚えている。"
    },
    {
     "t": "fill",
     "q": "「図書館」を英語で（l で始まる）。",
     "a": "library",
     "ex": "library＝図書館。"
    },
    {
     "t": "mc",
     "q": "「〜を終える」は？",
     "ch": [
      "finish",
      "begin",
      "start",
      "continue"
     ],
     "a": 0,
     "ex": "finish＝終える。finish ～ing の形も大切。"
    },
    {
     "t": "mc",
     "q": "「重い」は？",
     "ch": [
      "heavy",
      "light",
      "cheap",
      "soft"
     ],
     "a": 0,
     "ex": "heavy＝重い。light＝軽い。"
    },
    {
     "t": "fill",
     "q": "「〜を選ぶ」を英語で（c で始まる）。",
     "a": "choose",
     "ex": "choose＝選ぶ。過去形は chose。"
    },
    {
     "t": "mc",
     "q": "「〜を建てる」は？",
     "ch": [
      "build",
      "break",
      "bring",
      "burn"
     ],
     "a": 0,
     "ex": "build＝建てる。過去形は built。"
    },
    {
     "t": "mc",
     "q": "「有名な」は？",
     "ch": [
      "famous",
      "careful",
      "quiet",
      "strange"
     ],
     "a": 0,
     "ex": "famous＝有名な。be famous for＝〜で有名。"
    },
    {
     "t": "fill",
     "q": "「おなかがすいた」を英語で（h で始まる）。",
     "a": "hungry",
     "ex": "hungry＝おなかがすいた。"
    },
    {
     "t": "mc",
     "q": "「〜を受け取る」は？",
     "ch": [
      "receive",
      "send",
      "lend",
      "leave"
     ],
     "a": 0,
     "ex": "receive＝受け取る。send＝送る。"
    },
    {
     "t": "mc",
     "q": "「静かな」は？",
     "ch": [
      "quiet",
      "loud",
      "noisy",
      "busy"
     ],
     "a": 0,
     "ex": "quiet＝静かな。noisy＝うるさい。"
    },
    {
     "t": "fill",
     "q": "「医者」を英語で（d で始まる）。",
     "a": "doctor",
     "ex": "doctor＝医者。"
    },
    {
     "t": "mc",
     "q": "「〜を運ぶ」は？",
     "ch": [
      "carry",
      "catch",
      "cut",
      "call"
     ],
     "a": 0,
     "ex": "carry＝運ぶ。"
    },
    {
     "t": "mc",
     "q": "「すぐに・まもなく」は？",
     "ch": [
      "soon",
      "late",
      "ago",
      "already"
     ],
     "a": 0,
     "ex": "soon＝すぐに・まもなく。"
    },
    {
     "t": "fill",
     "q": "「〜を売る」を英語で（s で始まる）。",
     "a": "sell",
     "ex": "sell＝売る。過去形は sold。"
    },
    {
     "t": "mc",
     "q": "「ちがう・異なった」は？",
     "ch": [
      "different",
      "same",
      "special",
      "simple"
     ],
     "a": 0,
     "ex": "different＝ちがう。be different from＝〜とちがう。"
    },
    {
     "t": "mc",
     "q": "「〜を見つける」は？",
     "ch": [
      "find",
      "lose",
      "look",
      "hide"
     ],
     "a": 0,
     "ex": "find＝見つける。過去形は found。"
    },
    {
     "t": "fill",
     "q": "「お金」を英語で（m で始まる）。",
     "a": "money",
     "ex": "money＝お金。数えられない名詞。"
    },
    {
     "t": "mc",
     "q": "「〜を数える」は？",
     "ch": [
      "count",
      "correct",
      "connect",
      "cover"
     ],
     "a": 0,
     "ex": "count＝数える。"
    },
    {
     "t": "mc",
     "q": "「安い」は？",
     "ch": [
      "cheap",
      "expensive",
      "heavy",
      "high"
     ],
     "a": 0,
     "ex": "cheap＝安い。expensive＝高価な。"
    },
    {
     "t": "fill",
     "q": "「〜を返す・もどる」を英語で（r で始まる）。",
     "a": "return",
     "ex": "return＝返す・もどる。"
    },
    {
     "t": "mc",
     "q": "「〜に参加する・加わる」は？",
     "ch": [
      "join",
      "leave",
      "end",
      "jump"
     ],
     "a": 0,
     "ex": "join＝加わる。join the club＝クラブに入る。"
    },
    {
     "t": "mc",
     "q": "「ついに・最後に」は？",
     "ch": [
      "finally",
      "suddenly",
      "really",
      "easily"
     ],
     "a": 0,
     "ex": "finally＝ついに。suddenly＝突然。"
    },
    {
     "t": "fill",
     "q": "「じょうずに」を英語で（w で始まる）。",
     "a": "well",
     "ex": "well＝じょうずに（副詞）。good は形容詞。"
    },
    {
     "t": "mc",
     "q": "「〜を約束する」は？",
     "ch": [
      "promise",
      "protect",
      "produce",
      "prepare"
     ],
     "a": 0,
     "ex": "promise＝約束する。promise to＋原形。"
    },
    {
     "t": "mc",
     "q": "「のどがかわいた」は？",
     "ch": [
      "thirsty",
      "tired",
      "sleepy",
      "angry"
     ],
     "a": 0,
     "ex": "thirsty＝のどがかわいた。"
    },
    {
     "t": "fill",
     "q": "「山」を英語で（m で始まる）。",
     "a": "mountain",
     "ex": "mountain＝山。Mt. は mountain の略。"
    },
    {
     "t": "mc",
     "q": "「〜を待つ」は？",
     "ch": [
      "wait",
      "want",
      "wake",
      "walk"
     ],
     "a": 0,
     "ex": "wait＝待つ。wait for＝〜を待つ。"
    },
    {
     "t": "mc",
     "q": "「おそく・遅れて」は？",
     "ch": [
      "late",
      "early",
      "fast",
      "slow"
     ],
     "a": 0,
     "ex": "late＝おそく。be late for＝〜に遅れる。"
    }
   ],
   "grammar": [
    {
     "t": "mc",
     "en": "She (   ) a letter to her grandmother yesterday.",
     "q": "(   ) に入る語は？",
     "ch": [
      "wrote",
      "write",
      "writes",
      "writing"
     ],
     "a": 0,
     "ex": "yesterday → 過去形 wrote。"
    },
    {
     "t": "mc",
     "en": "We (   ) at home last Sunday.",
     "q": "(   ) に入る語は？",
     "ch": [
      "were",
      "are",
      "was",
      "be"
     ],
     "a": 0,
     "ex": "主語 We ＋過去 → were。"
    },
    {
     "t": "mc",
     "en": "(   ) you watch the game last night?",
     "q": "(   ) に入る語は？",
     "ch": [
      "Did",
      "Do",
      "Are",
      "Were"
     ],
     "a": 0,
     "ex": "last night の一般動詞の疑問文 → Did。"
    },
    {
     "t": "mc",
     "en": "I (   ) visit my uncle next Sunday.",
     "q": "(   ) に入る語は？",
     "ch": [
      "will",
      "did",
      "was",
      "am"
     ],
     "a": 0,
     "ex": "next Sunday（未来）→ will＋原形。"
    },
    {
     "t": "mc",
     "en": "It (   ) rain tomorrow.",
     "q": "(   ) に入る語は？",
     "ch": [
      "is going to",
      "was going to",
      "going",
      "went to"
     ],
     "a": 0,
     "ex": "be going to＋原形＝〜しそうだ・する予定。"
    },
    {
     "t": "mc",
     "en": "Tom runs (   ) than Mike.",
     "q": "(   ) に入る語は？",
     "ch": [
      "faster",
      "fast",
      "fastest",
      "more fast"
     ],
     "a": 0,
     "ex": "than があるので比較級 faster。"
    },
    {
     "t": "mc",
     "en": "This is the (   ) movie of the year.",
     "q": "(   ) に入る語は？",
     "ch": [
      "best",
      "better",
      "good",
      "most good"
     ],
     "a": 0,
     "ex": "the＋最上級。good の最上級は best。"
    },
    {
     "t": "mc",
     "en": "I like dogs (   ) than cats.",
     "q": "(   ) に入る語は？",
     "ch": [
      "better",
      "good",
      "well",
      "best"
     ],
     "a": 0,
     "ex": "like A better than B＝B より A が好き。"
    },
    {
     "t": "mc",
     "en": "Mt. Fuji is the (   ) mountain in Japan.",
     "q": "(   ) に入る語は？",
     "ch": [
      "highest",
      "higher",
      "high",
      "most high"
     ],
     "a": 0,
     "ex": "in Japan（範囲）→ 最上級 the highest。"
    },
    {
     "t": "mc",
     "en": "My bag is as (   ) as yours.",
     "q": "(   ) に入る語は？",
     "ch": [
      "heavy",
      "heavier",
      "heaviest",
      "more heavy"
     ],
     "a": 0,
     "ex": "as ＋原級＋ as＝〜と同じくらい。"
    },
    {
     "t": "mc",
     "en": "I went to the library (   ) some books.",
     "q": "(   ) に入る語は？",
     "ch": [
      "to borrow",
      "borrow",
      "borrowed",
      "borrowing"
     ],
     "a": 0,
     "ex": "目的を表す to＋原形（〜するために）。"
    },
    {
     "t": "mc",
     "en": "It is important (   ) breakfast every day.",
     "q": "(   ) に入る語は？",
     "ch": [
      "to eat",
      "eating",
      "ate",
      "eats"
     ],
     "a": 0,
     "ex": "It is ～ to＋原形＝…することは〜だ。"
    },
    {
     "t": "mc",
     "en": "I enjoyed (   ) with my friends.",
     "q": "(   ) に入る語は？",
     "ch": [
      "talking",
      "talk",
      "to talk",
      "talked"
     ],
     "a": 0,
     "ex": "enjoy ＋〜ing（動名詞）。"
    },
    {
     "t": "mc",
     "en": "(   ) soccer is a lot of fun.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Playing",
      "Play",
      "Played",
      "Plays"
     ],
     "a": 0,
     "ex": "主語になる動名詞 Playing。"
    },
    {
     "t": "mc",
     "en": "I was reading a book (   ) my mother came home.",
     "q": "(   ) に入る語は？",
     "ch": [
      "when",
      "if",
      "because",
      "that"
     ],
     "a": 0,
     "ex": "when＝〜したとき。"
    },
    {
     "t": "mc",
     "en": "(   ) it is sunny tomorrow, let's go to the beach.",
     "q": "(   ) に入る語は？",
     "ch": [
      "If",
      "But",
      "Because",
      "Or"
     ],
     "a": 0,
     "ex": "If＝もし〜なら（条件）。"
    },
    {
     "t": "mc",
     "en": "I think (   ) he is a good singer.",
     "q": "(   ) に入る語は？",
     "ch": [
      "that",
      "which",
      "who",
      "what"
     ],
     "a": 0,
     "ex": "I think that ＋文＝〜だと思う。"
    },
    {
     "t": "mc",
     "en": "We (   ) to wear uniforms at school.",
     "q": "(   ) に入る語は？",
     "ch": [
      "have",
      "must",
      "should",
      "can"
     ],
     "a": 0,
     "ex": "have to＋原形＝〜しなければならない。"
    },
    {
     "t": "mc",
     "en": "There (   ) many people in the park yesterday.",
     "q": "(   ) に入る語は？",
     "ch": [
      "were",
      "was",
      "are",
      "is"
     ],
     "a": 0,
     "ex": "many people（複数）＋過去 → were。"
    },
    {
     "t": "mc",
     "en": "My father bought a new bike (   ) me.",
     "q": "(   ) に入る語は？",
     "ch": [
      "for",
      "to",
      "at",
      "with"
     ],
     "a": 0,
     "ex": "buy 物 for 人。"
    },
    {
     "t": "mc",
     "en": "She (   ) happy when she heard the news.",
     "q": "(   ) に入る語は？",
     "ch": [
      "looked",
      "looks",
      "looking",
      "look"
     ],
     "a": 0,
     "ex": "look＋形容詞＝〜に見える。heard と同じ過去形。"
    },
    {
     "t": "mc",
     "en": "I (   ) swim well when I was a child.",
     "q": "(   ) に入る語は？",
     "ch": [
      "could",
      "can",
      "will",
      "may"
     ],
     "a": 0,
     "ex": "when I was a child（過去）→ could。"
    },
    {
     "t": "mc",
     "en": "(   ) don't you come with us?",
     "q": "(   ) に入る語は？",
     "ch": [
      "Why",
      "What",
      "How",
      "When"
     ],
     "a": 0,
     "ex": "Why don't you ～?＝〜しませんか。"
    },
    {
     "t": "mc",
     "en": "I want something (   ).",
     "q": "(   ) に入る語は？",
     "ch": [
      "to drink",
      "drink",
      "drinking",
      "drank"
     ],
     "a": 0,
     "ex": "something to＋原形＝〜するもの。"
    },
    {
     "t": "mc",
     "en": "A: How (   ) do you go to the library? B: Twice a week.",
     "q": "(   ) に入る語は？",
     "ch": [
      "often",
      "long",
      "many",
      "much"
     ],
     "a": 0,
     "ex": "Twice a week（回数）→ How often。"
    },
    {
     "t": "mc",
     "en": "Please show (   ) your pictures.",
     "q": "(   ) に入る語は？",
     "ch": [
      "me",
      "I",
      "my",
      "mine"
     ],
     "a": 0,
     "ex": "show 人 物。人は目的格 me。"
    },
    {
     "t": "mc",
     "en": "She didn't (   ) breakfast this morning.",
     "q": "(   ) に入る語は？",
     "ch": [
      "eat",
      "ate",
      "eats",
      "eating"
     ],
     "a": 0,
     "ex": "didn't のうしろは原形。"
    },
    {
     "t": "mc",
     "en": "I'm going to (   ) my grandmother next week.",
     "q": "(   ) に入る語は？",
     "ch": [
      "visit",
      "visiting",
      "visited",
      "visits"
     ],
     "a": 0,
     "ex": "be going to のうしろは原形。"
    },
    {
     "t": "mc",
     "en": "He can play the guitar (   ) than I.",
     "q": "(   ) に入る語は？",
     "ch": [
      "better",
      "well",
      "good",
      "best"
     ],
     "a": 0,
     "ex": "well の比較級は better。"
    },
    {
     "t": "mc",
     "en": "I was happy (   ) the present.",
     "q": "(   ) に入る語は？",
     "ch": [
      "to get",
      "get",
      "got",
      "getting"
     ],
     "a": 0,
     "ex": "感情の原因を表す to＋原形（〜して）。"
    },
    {
     "t": "mc",
     "en": "I have to (   ) up early tomorrow.",
     "q": "(   ) に入る語は？",
     "ch": [
      "get",
      "got",
      "getting",
      "gets"
     ],
     "a": 0,
     "ex": "have to のうしろは原形。"
    },
    {
     "t": "mc",
     "en": "A: Who (   ) this picture? B: My sister did.",
     "q": "(   ) に入る語は？",
     "ch": [
      "painted",
      "paint",
      "paints",
      "painting"
     ],
     "a": 0,
     "ex": "答えの did から過去形 painted。"
    }
   ],
   "technique": [
    {
     "t": "mc",
     "en": "I was late for school because I (   ) the bus.",
     "q": "【4級・大問1】(   ) に合う語は？",
     "ch": [
      "missed",
      "caught",
      "took",
      "rode"
     ],
     "a": 0,
     "ex": "miss the bus＝バスに乗りそこねる。"
    },
    {
     "t": "mc",
     "en": "It's (   ) outside. Take your umbrella.",
     "q": "【4級・大問1】(   ) に合う語は？",
     "ch": [
      "raining",
      "shining",
      "hot",
      "dry"
     ],
     "a": 0,
     "ex": "umbrella（かさ）が必要 → raining。"
    },
    {
     "t": "mc",
     "en": "My brother is a (   ) of the soccer team.",
     "q": "【4級・大問1】(   ) に合う語は？",
     "ch": [
      "member",
      "number",
      "letter",
      "corner"
     ],
     "a": 0,
     "ex": "a member of＝〜の一員。"
    },
    {
     "t": "mc",
     "en": "Please turn (   ) the light. It's dark.",
     "q": "【4級・大問1】(   ) に合う語は？",
     "ch": [
      "on",
      "off",
      "in",
      "at"
     ],
     "a": 0,
     "ex": "turn on＝（明かりなどを）つける。"
    },
    {
     "t": "mc",
     "en": "I'm looking (   ) my key. Have you seen it?",
     "q": "【4級・大問1】(   ) に合う語は？",
     "ch": [
      "for",
      "at",
      "after",
      "to"
     ],
     "a": 0,
     "ex": "look for＝〜をさがす。"
    },
    {
     "t": "mc",
     "en": "A: What's the (   ) today? B: It's October 16.",
     "q": "【4級・大問1】(   ) に合う語は？",
     "ch": [
      "date",
      "day",
      "time",
      "year"
     ],
     "a": 0,
     "ex": "日付をたずねる What's the date?。"
    },
    {
     "t": "mc",
     "en": "Kenta usually (   ) up at six, but today he got up at eight.",
     "q": "【4級・大問1】(   ) に合う語は？",
     "ch": [
      "gets",
      "get",
      "getting",
      "to get"
     ],
     "a": 0,
     "ex": "usually（習慣）＋三単現 → gets。"
    },
    {
     "t": "mc",
     "en": "A: Excuse me. How can I get to the city hall? B: (   )",
     "q": "【4級・大問2】道をたずねる",
     "ch": [
      "Go straight and turn left at the bank.",
      "It's ten dollars.",
      "I'm from Canada.",
      "Yes, I can."
     ],
     "a": 0,
     "ex": "How can I get to ～? には道順で答える。"
    },
    {
     "t": "mc",
     "en": "A: Would you like to come to my house tomorrow? B: (   ) What time?",
     "q": "【4級・大問2】さそいへの応答",
     "ch": [
      "I'd love to.",
      "No, thank you.",
      "I'm sorry.",
      "That's too bad."
     ],
     "a": 0,
     "ex": "あとに What time? と聞くので受け入れる I'd love to.。"
    },
    {
     "t": "mc",
     "en": "A: I have a headache. B: (   )",
     "q": "【4級・大問2】自然な応答は？",
     "ch": [
      "That's too bad. Take a rest.",
      "Congratulations on your new job!",
      "Me, too. Let's dance.",
      "Here you are."
     ],
     "a": 0,
     "ex": "悪い知らせには That's too bad.。"
    },
    {
     "t": "mc",
     "en": "A: May I speak to Ms. Green, please? B: (   )",
     "q": "【4級・大問2】電話での応答",
     "ch": [
      "Sorry, she's out now.",
      "Yes, I am.",
      "It's mine.",
      "See you later."
     ],
     "a": 0,
     "ex": "電話で本人がいないとき she's out。"
    },
    {
     "t": "mc",
     "en": "A: Which bus goes to the museum? B: (   )",
     "q": "【4級・大問2】自然な応答は？",
     "ch": [
      "Take the No. 5 bus.",
      "It's five o'clock.",
      "I like the museum.",
      "Yes, it does."
     ],
     "a": 0,
     "ex": "Which bus には具体的なバスで答える。"
    },
    {
     "t": "mc",
     "q": "【4級・大問3】語を正しく並べた文は？ ( is / this / than / bigger / box / that one )",
     "ch": [
      "This box is bigger than that one.",
      "This is box bigger than that one.",
      "This box bigger is than that one.",
      "Than this box is bigger that one."
     ],
     "a": 0,
     "ex": "主語＋be＋比較級＋than の順。"
    },
    {
     "t": "mc",
     "q": "【4級・大問3】語を正しく並べた文は？ ( to / want / I / be / a teacher )",
     "ch": [
      "I want to be a teacher.",
      "I want be to a teacher.",
      "I to want be a teacher.",
      "Want I to be a teacher."
     ],
     "a": 0,
     "ex": "want to＋原形。"
    },
    {
     "t": "mc",
     "q": "【4級・大問3】語を正しく並べた文は？ ( did / what / you / do / last night )",
     "ch": [
      "What did you do last night?",
      "What you did do last night?",
      "Did what you do last night?",
      "What did do you last night?"
     ],
     "a": 0,
     "ex": "疑問詞＋did＋主語＋原形。"
    },
    {
     "t": "mc",
     "q": "【4級・読む】掲示: SCHOOL FESTIVAL / Date: November 3 / Place: Midori Junior High School Gym / The chorus contest starts at 1:00 p.m. 質問: Where is the festival?",
     "ch": [
      "In the school gym.",
      "In the library.",
      "At the park.",
      "At the station."
     ],
     "a": 0,
     "ex": "Place: ... School Gym から。"
    },
    {
     "t": "mc",
     "q": "【4級・読む】Eメール: Hi Ken, Thank you for the birthday present. I love the blue cap! I'll wear it at the soccer game on Sunday. 質問: What did Ken give his friend?",
     "ch": [
      "A blue cap.",
      "A soccer ball.",
      "A book.",
      "A T-shirt."
     ],
     "a": 0,
     "ex": "I love the blue cap! がプレゼント。"
    },
    {
     "t": "mc",
     "q": "【4級・読む】掲示: COOKING CLASS FOR KIDS / Saturdays, 10:00-12:00 / 500 yen per class / Call Ms. Sato 質問: How often is the class?",
     "ch": [
      "Once a week.",
      "Every day.",
      "Once a month.",
      "Twice a week."
     ],
     "a": 0,
     "ex": "Saturdays（毎週土曜）＝週に1回 once a week。"
    },
    {
     "t": "mc",
     "q": "【4級・読む】Eメール: Hi Emi, I can't go to the movie tomorrow. My grandmother is coming to see us. Can we go next Saturday? 質問: Why can't the writer go to the movie tomorrow?",
     "ch": [
      "Her grandmother is coming.",
      "She is sick.",
      "She has a test.",
      "She has no money."
     ],
     "a": 0,
     "ex": "My grandmother is coming が理由。"
    },
    {
     "t": "mc",
     "q": "【4級・聞く】A: Did you finish your homework, Mike? B: Not yet, Mom. I'll do it when we finish eating tonight. 質問: When will Mike do his homework?",
     "ch": [
      "After dinner.",
      "Before dinner.",
      "Tomorrow morning.",
      "Right now."
     ],
     "a": 0,
     "ex": "when we finish eating tonight（今夜食べ終わったら）＝夕食のあと。"
    },
    {
     "t": "mc",
     "q": "【4級・聞く】A: How much is this notebook? B: It's 150 yen. A: I'll take two, please. 質問: How much will the boy pay?",
     "ch": [
      "Three hundred yen.",
      "One hundred fifty yen.",
      "Two hundred yen.",
      "Four hundred fifty yen."
     ],
     "a": 0,
     "ex": "150 yen × 2 冊＝300 yen（three hundred）。"
    },
    {
     "t": "mc",
     "q": "【4級・聞く】A: Hello, this is Nancy. Is Jun there? B: Sorry, he's not here. He went out to play tennis with Ken. 質問: What is Jun doing now?",
     "ch": [
      "Playing tennis with a friend.",
      "Talking with Nancy on the phone.",
      "Doing his homework.",
      "Eating dinner."
     ],
     "a": 0,
     "ex": "went out to play tennis with Ken ＝ 友だちとテニス中。電話に出たのは Jun ではない。"
    },
    {
     "t": "mc",
     "q": "【4級・聞く】Hi, I'm Yuta. Last Sunday I went fishing with my father. I caught two fish in the morning and one more in the afternoon, but my father caught nothing. 質問: How many fish did Yuta catch?",
     "ch": [
      "Three.",
      "Two.",
      "Only one.",
      "None at all."
     ],
     "a": 0,
     "ex": "朝2匹＋午後1匹＝3匹。父は nothing。"
    },
    {
     "t": "mc",
     "en": "A: I'm sorry I'm late. B: (   )",
     "q": "【4級・聞く/話す】自然な応答は？",
     "ch": [
      "That's all right.",
      "You're welcome.",
      "Me, too.",
      "Nice to meet you."
     ],
     "a": 0,
     "ex": "あやまりには That's all right.（いいよ）。"
    },
    {
     "t": "mc",
     "en": "A: Shall we go to the library after school? B: (   )",
     "q": "【4級・聞く/話す】さそいへの応答は？",
     "ch": [
      "Sounds good.",
      "Yes, I was.",
      "It's on the desk.",
      "Thank you for coming."
     ],
     "a": 0,
     "ex": "Shall we ～? には Sounds good. など。"
    },
    {
     "t": "mc",
     "en": "A: How do you go to school? B: (   )",
     "q": "【4級・聞く/話す】自然な応答は？",
     "ch": [
      "By bike.",
      "At eight.",
      "For two hours.",
      "Twice a week."
     ],
     "a": 0,
     "ex": "How（手段）には by＋乗り物。"
    }
   ],
   "practice": [
    {
     "t": "mc",
     "en": "My sister (   ) to music when I came home.",
     "q": "(   ) に入る語は？",
     "ch": [
      "was listening",
      "listens",
      "listen",
      "is listening"
     ],
     "a": 0,
     "ex": "when I came home（過去）→ 過去進行形 was listening。"
    },
    {
     "t": "mc",
     "en": "We (   ) have school tomorrow. It's a holiday.",
     "q": "(   ) に入る語は？",
     "ch": [
      "don't",
      "doesn't",
      "aren't",
      "didn't"
     ],
     "a": 0,
     "ex": "主語 We の一般動詞の否定 → don't。"
    },
    {
     "t": "mc",
     "en": "Tom is (   ) than his father.",
     "q": "(   ) に入る語は？",
     "ch": [
      "stronger",
      "strong",
      "strongest",
      "more strong"
     ],
     "a": 0,
     "ex": "than → 比較級 stronger。"
    },
    {
     "t": "mc",
     "en": "I'd like (   ) you to my birthday party.",
     "q": "(   ) に入る語は？",
     "ch": [
      "to invite",
      "invite",
      "inviting",
      "invited"
     ],
     "a": 0,
     "ex": "would like to＋原形。"
    },
    {
     "t": "mc",
     "en": "Thank you for (   ) me.",
     "q": "(   ) に入る語は？",
     "ch": [
      "helping",
      "help",
      "to help",
      "helped"
     ],
     "a": 0,
     "ex": "前置詞 for のうしろは〜ing（動名詞）。"
    },
    {
     "t": "mc",
     "en": "A: (   ) did you come to Japan? B: Two years ago.",
     "q": "(   ) に入る語は？",
     "ch": [
      "When",
      "Where",
      "How",
      "What"
     ],
     "a": 0,
     "ex": "Two years ago（時）→ When。"
    },
    {
     "t": "mc",
     "en": "I don't have (   ) friends in this town.",
     "q": "(   ) に入る語は？",
     "ch": [
      "many",
      "much",
      "a little",
      "little"
     ],
     "a": 0,
     "ex": "friends（数えられる名詞）→ many。"
    },
    {
     "t": "mc",
     "en": "(   ) is the most popular sport in your country?",
     "q": "(   ) に入る語は？",
     "ch": [
      "What",
      "How",
      "Where",
      "When"
     ],
     "a": 0,
     "ex": "「何のスポーツか」→ What。"
    },
    {
     "t": "mc",
     "en": "She can speak English as (   ) as her father.",
     "q": "(   ) に入る語は？",
     "ch": [
      "well",
      "good",
      "better",
      "best"
     ],
     "a": 0,
     "ex": "as＋原級＋as。副詞 well。"
    },
    {
     "t": "mc",
     "en": "I'll call you (   ) I get home.",
     "q": "(   ) に入る語は？",
     "ch": [
      "when",
      "that",
      "or",
      "so"
     ],
     "a": 0,
     "ex": "when＝〜したら・〜するとき。"
    },
    {
     "t": "mc",
     "en": "He went to the park (   ) soccer.",
     "q": "(   ) に入る語は？",
     "ch": [
      "to play",
      "play",
      "plays",
      "played"
     ],
     "a": 0,
     "ex": "目的の to＋原形＝〜するために。"
    },
    {
     "t": "mc",
     "q": "英文: Aya wanted to buy a new bag, but it was too expensive. So she decided to save money for three months. 質問: Why did Aya decide to save money?",
     "ch": [
      "To get the bag she liked.",
      "To travel abroad with her family.",
      "To buy a book.",
      "To help her mother."
     ],
     "a": 0,
     "ex": "wanted to buy a new bag（ほしいかばん）のためにお金をためた。"
    },
    {
     "t": "mc",
     "q": "英文: Mr. Brown moved to Japan five years ago. At first he couldn't read Japanese, but now he reads a Japanese newspaper every morning. 質問: What does Mr. Brown do every morning?",
     "ch": [
      "He reads the news in Japanese.",
      "He studies English.",
      "He writes letters to his family.",
      "He cleans his house."
     ],
     "a": 0,
     "ex": "now he reads a Japanese newspaper every morning ＝ 日本語でニュースを読む。"
    },
    {
     "t": "mc",
     "en": "A: Can I borrow your eraser? B: (   )",
     "q": "応答として自然なのは？",
     "ch": [
      "Sure. Here you are.",
      "Yes, you were.",
      "I'm fine.",
      "It's sunny."
     ],
     "a": 0,
     "ex": "Can I ～? の許可には Sure.。"
    },
    {
     "t": "mc",
     "en": "A: What were you doing at eight last night? B: (   )",
     "q": "応答として自然なのは？",
     "ch": [
      "I was taking a bath.",
      "I'm reading a book now.",
      "I will go.",
      "Yes, I did."
     ],
     "a": 0,
     "ex": "過去進行形でたずねられたら過去進行形で答える。"
    },
    {
     "t": "mc",
     "en": "A: Who is the tallest in your family? B: (   )",
     "q": "応答として自然なのは？",
     "ch": [
      "My father is.",
      "Yes, he is.",
      "In my grandfather's house.",
      "It's tall."
     ],
     "a": 0,
     "ex": "Who ～? には人で答える。"
    },
    {
     "t": "mc",
     "q": "掲示: LOST DOG / Name: Coco / A small white dog with a red ribbon / If you find her, please call Mika. 質問: What is this notice about?",
     "ch": [
      "A missing pet.",
      "A pet shop sale.",
      "A new ribbon shop.",
      "A dog show."
     ],
     "a": 0,
     "ex": "LOST DOG（迷子の犬）＝いなくなったペットのお知らせ。"
    },
    {
     "t": "mc",
     "q": "Eメール: Hi Taro, I'm going to visit Japan in August. Can you show me around Osaka? I want to try takoyaki! — Emma 質問: What does Emma want to do in Osaka?",
     "ch": [
      "Eat some Osaka food.",
      "Buy a camera.",
      "See a movie with Taro's family.",
      "Study Japanese."
     ],
     "a": 0,
     "ex": "I want to try takoyaki ＝ 大阪の食べものを食べたい。"
    },
    {
     "t": "mc",
     "en": "She was tired, (   ) she kept studying.",
     "q": "(   ) に入る語は？",
     "ch": [
      "but",
      "so",
      "because",
      "or"
     ],
     "a": 0,
     "ex": "反対の内容をつなぐ but。"
    },
    {
     "t": "mc",
     "q": "聞く: A: Excuse me, where is the post office? B: Go down this street and turn right. You'll see it beside the bank. 質問: Where is the post office?",
     "ch": [
      "Next to the bank.",
      "In front of the station.",
      "Across from the school.",
      "Behind the park."
     ],
     "a": 0,
     "ex": "beside the bank（銀行のそば）＝ next to the bank。"
    }
   ],
   "reading": [
    {
     "t": "mc",
     "p": "g4_camp_email",
     "q": "質問: Where is Sam's family going next weekend?",
     "ch": [
      "To Lake Hoshino.",
      "To the sea.",
      "To a mountain hotel.",
      "To Yuta's house."
     ],
     "a": 0,
     "ex": "Sam のメール going camping at Lake Hoshino。"
    },
    {
     "t": "mc",
     "p": "g4_camp_email",
     "q": "質問: What will Sam's father do?",
     "ch": [
      "Make dinner for them.",
      "Go swimming in the lake.",
      "Drive a boat.",
      "Buy a new tent."
     ],
     "a": 0,
     "ex": "My father will cook curry ＝ 夕食を作ってくれる。"
    },
    {
     "t": "mc",
     "p": "g4_camp_email",
     "q": "質問: Why should Yuta bring warm clothes?",
     "ch": [
      "Because the nights are cold.",
      "Because it will snow.",
      "Because they will swim in the lake.",
      "Because the bus is cold."
     ],
     "a": 0,
     "ex": "it gets cold at night（夜は冷える）が理由。"
    },
    {
     "t": "mc",
     "p": "g4_camp_email",
     "q": "質問: What doesn't Yuta have?",
     "ch": [
      "Something to sleep in.",
      "A rod for fishing.",
      "Warm clothes for the night.",
      "A camera."
     ],
     "a": 0,
     "ex": "Yuta のメール Do I need a sleeping bag? I don't have one.（寝袋を持っていない）。"
    },
    {
     "t": "mc",
     "p": "g4_flea_market",
     "q": "質問: When is the flea market?",
     "ch": [
      "On Sunday, May 12.",
      "On Saturday, May 5.",
      "On Sunday, May 5.",
      "On Saturday, May 12."
     ],
     "a": 0,
     "ex": "Date: Sunday, May 12 から。May 5 は申しこみ締め切り。"
    },
    {
     "t": "mc",
     "p": "g4_flea_market",
     "q": "質問: Where is Sakura Park?",
     "ch": [
      "Beside the library.",
      "In front of the station.",
      "Behind the town office.",
      "Near the school."
     ],
     "a": 0,
     "ex": "Sakura Park (next to the city library) ＝ 図書館のそば。"
    },
    {
     "t": "mc",
     "p": "g4_flea_market",
     "q": "質問: How much does a table cost for sellers?",
     "ch": [
      "Three hundred yen.",
      "Five hundred yen.",
      "One hundred yen a day.",
      "Nothing. It is free."
     ],
     "a": 0,
     "ex": "A table costs 300 yen（three hundred）。500 yen は品物の上限。"
    },
    {
     "t": "mc",
     "p": "g4_flea_market",
     "q": "質問: What will happen if it rains?",
     "ch": [
      "The market will be in the library hall.",
      "The market will stop.",
      "The market will be on May 5.",
      "The market will be in the gym."
     ],
     "a": 0,
     "ex": "If it rains, ... in the library hall。"
    },
    {
     "t": "mc",
     "p": "g4_lost_cat",
     "q": "質問: How was the weather that afternoon?",
     "ch": [
      "It was raining.",
      "It was sunny and hot.",
      "It was snowing.",
      "It was windy."
     ],
     "a": 0,
     "ex": "第1段落 One rainy afternoon ＝ 雨がふっていた。"
    },
    {
     "t": "mc",
     "p": "g4_lost_cat",
     "q": "質問: Where was the cat?",
     "ch": [
      "Under a seat.",
      "In a box by the door.",
      "On a bus.",
      "In a tree."
     ],
     "a": 0,
     "ex": "第1段落 sitting under a bench（ベンチの下）。"
    },
    {
     "t": "mc",
     "p": "g4_lost_cat",
     "q": "質問: What did Nana give the cat?",
     "ch": [
      "A drink.",
      "Some fish to eat.",
      "A red ribbon.",
      "A box of cookies."
     ],
     "a": 0,
     "ex": "第2段落 gave it some milk ＝ 飲みものをあげた。"
    },
    {
     "t": "mc",
     "p": "g4_lost_cat",
     "q": "質問: How did they find the cat's owner?",
     "ch": [
      "They called the number on the name tag.",
      "They put up a poster.",
      "They asked a neighbor.",
      "They went to the police."
     ],
     "a": 0,
     "ex": "第2段落 found a phone number on the name tag and called it。"
    },
    {
     "t": "mc",
     "p": "g4_lost_cat",
     "q": "質問: What did the old man give Nana?",
     "ch": [
      "Some sweets.",
      "Some money for the milk.",
      "A new cat.",
      "A book about cats."
     ],
     "a": 0,
     "ex": "第3段落 gave Nana a box of cookies ＝ おかし。"
    },
    {
     "t": "mc",
     "p": "g4_aki_speech",
     "q": "質問: Where does Aki's grandfather live?",
     "ch": [
      "Near the sea.",
      "In a big city.",
      "Near a mountain.",
      "Next to Aki's house."
     ],
     "a": 0,
     "ex": "第1段落 a small village by the sea ＝ 海のそば。"
    },
    {
     "t": "mc",
     "p": "g4_aki_speech",
     "q": "質問: How long does Aki stay at his house every summer?",
     "ch": [
      "Fourteen days.",
      "Two days.",
      "For the whole summer.",
      "Only a weekend."
     ],
     "a": 0,
     "ex": "第2段落 for two weeks ＝ 14日。"
    },
    {
     "t": "mc",
     "p": "g4_aki_speech",
     "q": "質問: What do Aki and her grandfather grow?",
     "ch": [
      "Vegetables.",
      "Apples and oranges.",
      "Rice and beans.",
      "Flowers for the garden."
     ],
     "a": 0,
     "ex": "第2段落 grow tomatoes and cucumbers ＝ 野菜。"
    },
    {
     "t": "mc",
     "p": "g4_aki_speech",
     "q": "質問: What did Aki do on the last day of fishing?",
     "ch": [
      "She caught a big fish.",
      "She lost her fishing rod.",
      "She swam in the sea.",
      "She cooked dinner."
     ],
     "a": 0,
     "ex": "第3段落 on the last day I caught a big fish。"
    },
    {
     "t": "mc",
     "p": "g4_tennis_club",
     "q": "質問: Where will the club practice this Friday?",
     "ch": [
      "In the gym at school.",
      "At the city tennis courts.",
      "At Kita Junior High School.",
      "In the park."
     ],
     "a": 0,
     "ex": "practice in the school gym instead。city tennis courts は使えない方。"
    },
    {
     "t": "mc",
     "p": "g4_tennis_club",
     "q": "質問: Why can't they use the city tennis courts?",
     "ch": [
      "The courts will be closed for cleaning.",
      "It will rain.",
      "The courts are too far.",
      "There is a game there."
     ],
     "a": 0,
     "ex": "closed for cleaning が理由。"
    },
    {
     "t": "mc",
     "p": "g4_tennis_club",
     "q": "質問: What should the members bring on Friday?",
     "ch": [
      "Shoes for the gym.",
      "Lunch for the bus trip.",
      "A new racket.",
      "A towel."
     ],
     "a": 0,
     "ex": "Please bring your indoor shoes ＝ 体育館用のくつ。"
    },
    {
     "t": "mc",
     "p": "g4_tennis_club",
     "q": "質問: What time does the bus leave on October 25?",
     "ch": [
      "At eight in the morning.",
      "At eight thirty in the morning.",
      "At noon.",
      "At one in the afternoon."
     ],
     "a": 0,
     "ex": "The bus leaves school at 8:00 a.m. ＝ 朝8時。"
    },
    {
     "t": "mc",
     "p": "g4_rina_relay",
     "q": "質問: Why didn't Rina like the school sports day?",
     "ch": [
      "She was not good at sports.",
      "She didn't have friends.",
      "It was too hot.",
      "She was always sick."
     ],
     "a": 0,
     "ex": "第1段落 not good at sports, so ...。"
    },
    {
     "t": "mc",
     "p": "g4_rina_relay",
     "q": "質問: When did Rina practice running?",
     "ch": [
      "Before school every day.",
      "After dinner with her brother.",
      "On weekends only.",
      "At lunch time."
     ],
     "a": 0,
     "ex": "第2段落 every morning before school ＝ 毎日学校の前。"
    },
    {
     "t": "mc",
     "p": "g4_rina_relay",
     "q": "質問: Who gave Rina advice?",
     "ch": [
      "Her brother.",
      "Her teacher.",
      "Her classmate.",
      "Her mother."
     ],
     "a": 0,
     "ex": "第2段落 Her older brother, Kazu, ... gave her advice。teacher はリレーをたのんだ人。"
    },
    {
     "t": "mc",
     "p": "g4_rina_relay",
     "q": "質問: How did Rina's team do in the race?",
     "ch": [
      "They finished second.",
      "They won.",
      "They finished last.",
      "They didn't run."
     ],
     "a": 0,
     "ex": "第3段落 finished second。"
    },
    {
     "t": "mc",
     "p": "g4_rina_relay",
     "q": "質問: What does Rina want to do next year?",
     "ch": [
      "Run with a school team.",
      "Stop running at school.",
      "Move to another school.",
      "Teach her brother to run."
     ],
     "a": 0,
     "ex": "第3段落 wants to join the track team ＝ 陸上部で走りたい。"
    }
   ]
  },
  "5": {
   "vocab": [
    {
     "t": "mc",
     "q": "「図書館」は？",
     "ch": [
      "library",
      "hospital",
      "station",
      "museum"
     ],
     "a": 0,
     "ex": "library＝図書館。"
    },
    {
     "t": "fill",
     "q": "「兄・弟」を英語で（b で始まる）。",
     "a": "brother",
     "ex": "brother＝兄・弟。"
    },
    {
     "t": "mc",
     "q": "「ねむい」は？",
     "ch": [
      "sleepy",
      "hungry",
      "angry",
      "happy"
     ],
     "a": 0,
     "ex": "sleepy＝ねむい。"
    },
    {
     "t": "mc",
     "q": "「あたたかい」は？",
     "ch": [
      "warm",
      "cold",
      "cool",
      "hot"
     ],
     "a": 0,
     "ex": "warm＝あたたかい。"
    },
    {
     "t": "fill",
     "q": "「夕方・晩」を英語で（e で始まる）。",
     "a": "evening",
     "ex": "evening＝夕方・晩。"
    },
    {
     "t": "mc",
     "q": "「窓」は？",
     "ch": [
      "window",
      "door",
      "wall",
      "floor"
     ],
     "a": 0,
     "ex": "window＝窓。"
    },
    {
     "t": "mc",
     "q": "「かばん」は？",
     "ch": [
      "bag",
      "cap",
      "box",
      "cup"
     ],
     "a": 0,
     "ex": "bag＝かばん。"
    },
    {
     "t": "fill",
     "q": "「金曜日」を英語で（F で始まる）。",
     "a": "Friday",
     "ex": "Friday＝金曜日。"
    },
    {
     "t": "mc",
     "q": "「泳ぐ」は？",
     "ch": [
      "swim",
      "run",
      "walk",
      "fly"
     ],
     "a": 0,
     "ex": "swim＝泳ぐ。"
    },
    {
     "t": "mc",
     "q": "「おなかがすいた」は？",
     "ch": [
      "hungry",
      "thirsty",
      "sleepy",
      "tired"
     ],
     "a": 0,
     "ex": "hungry＝おなかがすいた。"
    },
    {
     "t": "fill",
     "q": "「夏」を英語で（s で始まる）。",
     "a": "summer",
     "ex": "summer＝夏。"
    },
    {
     "t": "mc",
     "q": "「野菜」は？",
     "ch": [
      "vegetable",
      "fruit",
      "meat",
      "bread"
     ],
     "a": 0,
     "ex": "vegetable＝野菜。"
    },
    {
     "t": "mc",
     "q": "「鳥」は？",
     "ch": [
      "bird",
      "fish",
      "horse",
      "rabbit"
     ],
     "a": 0,
     "ex": "bird＝鳥。"
    },
    {
     "t": "fill",
     "q": "「英語」を英語で（E で始まる）。",
     "a": "English",
     "ex": "English＝英語。"
    },
    {
     "t": "mc",
     "q": "「小さい」は？",
     "ch": [
      "small",
      "big",
      "long",
      "tall"
     ],
     "a": 0,
     "ex": "small＝小さい。"
    },
    {
     "t": "mc",
     "q": "「新しい」は？",
     "ch": [
      "new",
      "old",
      "young",
      "clean"
     ],
     "a": 0,
     "ex": "new＝新しい。"
    },
    {
     "t": "fill",
     "q": "「冬」を英語で（w で始まる）。",
     "a": "winter",
     "ex": "winter＝冬。"
    },
    {
     "t": "mc",
     "q": "「電車」は？",
     "ch": [
      "train",
      "bus",
      "car",
      "bike"
     ],
     "a": 0,
     "ex": "train＝電車。"
    },
    {
     "t": "mc",
     "q": "「有名な」は？",
     "ch": [
      "famous",
      "kind",
      "cute",
      "rich"
     ],
     "a": 0,
     "ex": "famous＝有名な。"
    },
    {
     "t": "fill",
     "q": "「午後」を英語で（a で始まる）。",
     "a": "afternoon",
     "ex": "afternoon＝午後。"
    },
    {
     "t": "mc",
     "q": "「料理する」は？",
     "ch": [
      "cook",
      "eat",
      "drink",
      "wash"
     ],
     "a": 0,
     "ex": "cook＝料理する。"
    },
    {
     "t": "mc",
     "q": "「雨の」は？",
     "ch": [
      "rainy",
      "sunny",
      "cloudy",
      "snowy"
     ],
     "a": 0,
     "ex": "rainy＝雨の。"
    },
    {
     "t": "fill",
     "q": "「花」を英語で（f で始まる）。",
     "a": "flower",
     "ex": "flower＝花。"
    },
    {
     "t": "mc",
     "q": "「おじ」は？",
     "ch": [
      "uncle",
      "aunt",
      "grandfather",
      "cousin"
     ],
     "a": 0,
     "ex": "uncle＝おじ。aunt はおば。"
    },
    {
     "t": "mc",
     "q": "「体育館」は？",
     "ch": [
      "gym",
      "pool",
      "garden",
      "room"
     ],
     "a": 0,
     "ex": "gym＝体育館。"
    },
    {
     "t": "fill",
     "q": "「黒」を英語で（b で始まる）。",
     "a": "black",
     "ex": "black＝黒。"
    }
   ],
   "grammar": [
    {
     "t": "mc",
     "en": "She (   ) to school at eight.",
     "q": "(   ) に入る語は？",
     "ch": [
      "goes",
      "go",
      "going",
      "is go"
     ],
     "a": 0,
     "ex": "主語 She（三人称単数）→ goes。"
    },
    {
     "t": "mc",
     "en": "(   ) you a student? — Yes, I am.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Are",
      "Is",
      "Do",
      "Am"
     ],
     "a": 0,
     "ex": "主語 you の be動詞は are。答えの I am もヒント。"
    },
    {
     "t": "mc",
     "en": "I (   ) like carrots.",
     "q": "(   ) に入る語は？",
     "ch": [
      "don't",
      "doesn't",
      "am not",
      "isn't"
     ],
     "a": 0,
     "ex": "一般動詞 like の否定文、主語 I → don't。"
    },
    {
     "t": "mc",
     "en": "My father (   ) a doctor.",
     "q": "(   ) に入る語は？",
     "ch": [
      "is",
      "are",
      "am",
      "do"
     ],
     "a": 0,
     "ex": "主語 My father（単数）→ is。"
    },
    {
     "t": "mc",
     "en": "(   ) I open the window? — Sure.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Can",
      "Do",
      "Am",
      "Are"
     ],
     "a": 0,
     "ex": "Can I ～?＝〜してもいいですか（許可を求める）。Sure.（いいよ）で答えている。"
    },
    {
     "t": "mc",
     "en": "Ken (   ) play the guitar well.",
     "q": "(   ) に入る語は？",
     "ch": [
      "can",
      "cans",
      "is",
      "are"
     ],
     "a": 0,
     "ex": "can＝〜できる。主語が三人称でも can に s はつかない。"
    },
    {
     "t": "mc",
     "en": "These (   ) my pencils.",
     "q": "(   ) に入る語は？",
     "ch": [
      "are",
      "is",
      "am",
      "be"
     ],
     "a": 0,
     "ex": "These（複数）→ are。"
    },
    {
     "t": "mc",
     "en": "(   ) is your birthday? — It's October 3.",
     "q": "(   ) に入る語は？",
     "ch": [
      "When",
      "How",
      "Where",
      "Who"
     ],
     "a": 0,
     "ex": "日付をたずねる When。"
    },
    {
     "t": "mc",
     "en": "I have two (   ).",
     "q": "(   ) に入る語は？",
     "ch": [
      "dogs",
      "dog",
      "a dog",
      "dog's"
     ],
     "a": 0,
     "ex": "two のあとは複数形 dogs。"
    },
    {
     "t": "mc",
     "en": "Look at (   ) picture.",
     "q": "(   ) に入る語は？",
     "ch": [
      "this",
      "these",
      "those",
      "they"
     ],
     "a": 0,
     "ex": "picture（単数）→ this。these・those は複数名詞につける。"
    },
    {
     "t": "mc",
     "en": "Is that your bike? — No, it (   ).",
     "q": "(   ) に入る語は？",
     "ch": [
      "isn't",
      "aren't",
      "doesn't",
      "don't"
     ],
     "a": 0,
     "ex": "Is ～? には it isn't で答える。"
    },
    {
     "t": "mc",
     "en": "What time (   ) you go to bed?",
     "q": "(   ) に入る語は？",
     "ch": [
      "do",
      "does",
      "are",
      "is"
     ],
     "a": 0,
     "ex": "一般動詞 go の疑問文、主語 you → do。"
    },
    {
     "t": "mc",
     "en": "He (   ) TV every evening.",
     "q": "(   ) に入る語は？",
     "ch": [
      "watches",
      "watch",
      "watching",
      "is watch"
     ],
     "a": 0,
     "ex": "主語 He＋習慣 → 三単現 watches（ch で終わる語は es）。"
    },
    {
     "t": "mc",
     "en": "(   ) is your mother? — She is in the kitchen.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Where",
      "What",
      "Who",
      "How"
     ],
     "a": 0,
     "ex": "場所を答えている → Where。"
    },
    {
     "t": "mc",
     "en": "My brother and I (   ) studying now.",
     "q": "(   ) に入る語は？",
     "ch": [
      "are",
      "is",
      "am",
      "do"
     ],
     "a": 0,
     "ex": "My brother and I は複数 → are studying。"
    },
    {
     "t": "mc",
     "en": "Don't (   ) in the classroom.",
     "q": "(   ) に入る語は？",
     "ch": [
      "run",
      "runs",
      "running",
      "ran"
     ],
     "a": 0,
     "ex": "Don't ＋動詞の原形＝〜してはいけない。"
    },
    {
     "t": "mc",
     "en": "She (   ) a new bike.",
     "q": "(   ) に入る語は？",
     "ch": [
      "has",
      "have",
      "is have",
      "having"
     ],
     "a": 0,
     "ex": "主語 She → have の三単現は has。"
    },
    {
     "t": "mc",
     "en": "(   ) you busy now? — No, I'm not.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Are",
      "Do",
      "Is",
      "Does"
     ],
     "a": 0,
     "ex": "busy は形容詞 → be動詞の疑問文 Are you。"
    },
    {
     "t": "mc",
     "en": "I know (   ). She is kind.",
     "q": "(   ) に入る語は？",
     "ch": [
      "her",
      "she",
      "hers",
      "he"
     ],
     "a": 0,
     "ex": "動詞 know のあと（目的語）は her。"
    },
    {
     "t": "mc",
     "en": "Mike (   ) in Tokyo.",
     "q": "(   ) に入る語は？",
     "ch": [
      "lives",
      "live",
      "living",
      "is live"
     ],
     "a": 0,
     "ex": "主語 Mike（三人称単数）→ lives。"
    },
    {
     "t": "mc",
     "en": "Does your father (   ) coffee?",
     "q": "(   ) に入る語は？",
     "ch": [
      "drink",
      "drinks",
      "drinking",
      "drank"
     ],
     "a": 0,
     "ex": "Does のあとの動詞は原形 drink。"
    },
    {
     "t": "mc",
     "en": "How (   ) is this cap? — It's ten dollars.",
     "q": "(   ) に入る語は？",
     "ch": [
      "much",
      "many",
      "old",
      "long"
     ],
     "a": 0,
     "ex": "値段をたずねる How much。"
    },
    {
     "t": "mc",
     "en": "(   ) is my bag. Yours is over there.",
     "q": "(   ) に入る語は？",
     "ch": [
      "This",
      "These",
      "Those",
      "They"
     ],
     "a": 0,
     "ex": "is（単数）に合うのは This。"
    },
    {
     "t": "mc",
     "en": "Mary (   ) not singing now.",
     "q": "(   ) に入る語は？",
     "ch": [
      "is",
      "are",
      "am",
      "does"
     ],
     "a": 0,
     "ex": "現在進行形の否定文、主語 Mary → is not singing。"
    }
   ],
   "technique": [
    {
     "t": "mc",
     "en": "Let's (   ) a picture here.",
     "q": "【5級・大問1】(   ) に合う語は？",
     "ch": [
      "take",
      "look",
      "play",
      "go"
     ],
     "a": 0,
     "ex": "take a picture＝写真をとる。"
    },
    {
     "t": "mc",
     "en": "I (   ) to music after dinner.",
     "q": "【5級・大問1】(   ) に合う語は？",
     "ch": [
      "listen",
      "hear",
      "watch",
      "see"
     ],
     "a": 0,
     "ex": "listen to music＝音楽を聞く。to がつくのは listen。"
    },
    {
     "t": "mc",
     "en": "Ken (   ) his homework after school.",
     "q": "【5級・大問1】(   ) に合う語は？",
     "ch": [
      "does",
      "makes",
      "plays",
      "goes"
     ],
     "a": 0,
     "ex": "do one's homework＝宿題をする。"
    },
    {
     "t": "mc",
     "en": "A: What (   ) is it today? B: It's Friday.",
     "q": "【5級・大問1】(   ) に合う語は？",
     "ch": [
      "day",
      "time",
      "date",
      "week"
     ],
     "a": 0,
     "ex": "曜日をたずねる What day。"
    },
    {
     "t": "mc",
     "en": "My mother (   ) a car to work.",
     "q": "【5級・大問1】(   ) に合う語は？",
     "ch": [
      "drives",
      "reads",
      "walks",
      "runs"
     ],
     "a": 0,
     "ex": "drive a car＝車を運転する。"
    },
    {
     "t": "mc",
     "en": "I (   ) my hands before lunch.",
     "q": "【5級・大問1】(   ) に合う語は？",
     "ch": [
      "wash",
      "brush",
      "eat",
      "read"
     ],
     "a": 0,
     "ex": "wash my hands＝手を洗う。"
    },
    {
     "t": "mc",
     "en": "I (   ) a shower every morning.",
     "q": "【5級・大問1】(   ) に合う語は？",
     "ch": [
      "take",
      "make",
      "do",
      "go"
     ],
     "a": 0,
     "ex": "take a shower＝シャワーをあびる。"
    },
    {
     "t": "mc",
     "en": "A: Excuse me. Is this your pen? B: (   )",
     "q": "【5級・大問2】会話に合う応答は？",
     "ch": [
      "Yes, it is. Thank you.",
      "Yes, I do.",
      "You're welcome.",
      "See you."
     ],
     "a": 0,
     "ex": "Is this ～? には Yes, it is. で答える。"
    },
    {
     "t": "mc",
     "en": "A: How old is your brother? B: (   )",
     "q": "【5級・大問2】会話に合う応答は？",
     "ch": [
      "He's fifteen.",
      "He's fine.",
      "He's at home.",
      "Yes, he is."
     ],
     "a": 0,
     "ex": "How old ＝年齢をたずねる → 数で答える。"
    },
    {
     "t": "mc",
     "en": "A: What's the date today? B: (   )",
     "q": "【5級・大問2】会話に合う応答は？",
     "ch": [
      "It's June 5.",
      "It's Tuesday.",
      "It's sunny.",
      "It's three o'clock."
     ],
     "a": 0,
     "ex": "date＝日付。曜日（Tuesday）ではない。"
    },
    {
     "t": "mc",
     "en": "A: Can I use your eraser? B: (   )",
     "q": "【5級・大問2】会話に合う応答は？",
     "ch": [
      "Sure. Here you are.",
      "Yes, I can.",
      "You're welcome.",
      "Nice to meet you."
     ],
     "a": 0,
     "ex": "Can I ～?（〜してもいい？）への許可は Sure.。"
    },
    {
     "t": "mc",
     "en": "A: I'm sorry. I'm late. B: (   )",
     "q": "【5級・大問2】会話に合う応答は？",
     "ch": [
      "That's OK.",
      "You're welcome.",
      "Me, too.",
      "Good night."
     ],
     "a": 0,
     "ex": "あやまられたら That's OK.（いいよ）。"
    },
    {
     "t": "mc",
     "en": "A: Would you like some tea? B: (   )",
     "q": "【5級・大問2】会話に合う応答は？",
     "ch": [
      "Yes, please.",
      "Yes, I am.",
      "Here you are.",
      "See you."
     ],
     "a": 0,
     "ex": "Would you like ～?（〜はいかが？）には Yes, please.。"
    },
    {
     "t": "mc",
     "q": "【5級・大問3】正しい語順の文は？（お姉さんはどこに住んでいますか）",
     "ch": [
      "Where does your sister live?",
      "Where your sister does live?",
      "Where does live your sister?",
      "Does where your sister live?"
     ],
     "a": 0,
     "ex": "疑問詞＋does＋主語＋動詞の原形の順。"
    },
    {
     "t": "mc",
     "q": "【5級・大問3】正しい語順の文は？（あなたは何時に起きますか）",
     "ch": [
      "What time do you get up?",
      "What do time you get up?",
      "What time you do get up?",
      "Do what time you get up?"
     ],
     "a": 0,
     "ex": "What time のあとに do you ～? を続ける。"
    },
    {
     "t": "mc",
     "q": "【5級・大問3】正しい語順の文は？（私はあまり上手に泳げません）",
     "ch": [
      "I can't swim very well.",
      "I swim can't very well.",
      "Can't swim I very well.",
      "I can't very swim well."
     ],
     "a": 0,
     "ex": "主語＋can't＋動詞の原形＋very well。"
    },
    {
     "t": "mc",
     "en": "A: What time is it now?",
     "q": "【5級・聞く/話す】自然な応答は？",
     "ch": [
      "It's ten thirty.",
      "It's Monday.",
      "I'm fine.",
      "Yes, it is."
     ],
     "a": 0,
     "ex": "時刻をたずねられたら It's ＋時刻。"
    },
    {
     "t": "mc",
     "en": "A: Whose umbrella is this?",
     "q": "【5級・聞く/話す】自然な応答は？",
     "ch": [
      "It's Yumi's.",
      "It's blue.",
      "Yes, it is.",
      "On the desk."
     ],
     "a": 0,
     "ex": "Whose＝だれの → 持ち主（Yumi's）で答える。"
    },
    {
     "t": "mc",
     "en": "A: How's the weather today?",
     "q": "【5級・聞く/話す】自然な応答は？",
     "ch": [
      "It's sunny.",
      "It's Tuesday.",
      "It's mine.",
      "At six."
     ],
     "a": 0,
     "ex": "天気をたずねられたら It's sunny. など。"
    },
    {
     "t": "mc",
     "en": "A: Bye, Ken. I have to go now.",
     "q": "【5級・聞く/話す】自然な応答は？",
     "ch": [
      "See you.",
      "Here you are.",
      "Nice to meet you.",
      "Yes, I do."
     ],
     "a": 0,
     "ex": "別れのあいさつ（Bye / Goodbye）には See you.（またね）。"
    },
    {
     "t": "mc",
     "en": "A: How do you come to school?",
     "q": "【5級・聞く/話す】自然な応答は？",
     "ch": [
      "By bus.",
      "At eight.",
      "In the classroom.",
      "Yes, I do."
     ],
     "a": 0,
     "ex": "How＝どうやって → 手段 By bus.。"
    },
    {
     "t": "mc",
     "en": "A: Who is that woman?",
     "q": "【5級・聞く/話す】自然な応答は？",
     "ch": [
      "She's my aunt.",
      "It's a desk.",
      "Yes, she is.",
      "She's fine."
     ],
     "a": 0,
     "ex": "Who＝だれ → 人を答える。"
    }
   ],
   "practice": [
    {
     "t": "mc",
     "en": "I play the piano (   ) the evening.",
     "q": "(   ) に入る語は？",
     "ch": [
      "in",
      "on",
      "at",
      "by"
     ],
     "a": 0,
     "ex": "in the evening＝夕方に。朝・午後・夕方は in。"
    },
    {
     "t": "mc",
     "en": "(   ) do you go to bed? — At ten.",
     "q": "(   ) に入る語は？",
     "ch": [
      "When",
      "What",
      "Where",
      "Who"
     ],
     "a": 0,
     "ex": "時を答えている → When。"
    },
    {
     "t": "mc",
     "en": "This is (   ) book. It's not mine.",
     "q": "(   ) に入る語は？",
     "ch": [
      "his",
      "he",
      "him",
      "they"
     ],
     "a": 0,
     "ex": "名詞 book の前は所有を表す his（彼の）。"
    },
    {
     "t": "mc",
     "en": "We have lunch (   ) noon.",
     "q": "(   ) に入る語は？",
     "ch": [
      "at",
      "in",
      "on",
      "for"
     ],
     "a": 0,
     "ex": "at noon＝正午に。時刻は at。"
    },
    {
     "t": "mc",
     "en": "My cat is sleeping (   ) the sofa.",
     "q": "(   ) に入る語は？",
     "ch": [
      "on",
      "in",
      "to",
      "for"
     ],
     "a": 0,
     "ex": "on the sofa＝ソファの上で。"
    },
    {
     "t": "mc",
     "en": "(   ) color do you like? — I like blue.",
     "q": "(   ) に入る語は？",
     "ch": [
      "What",
      "Who",
      "Where",
      "When"
     ],
     "a": 0,
     "ex": "What color＝何色。"
    },
    {
     "t": "mc",
     "en": "Look (   ) the blackboard.",
     "q": "(   ) に入る語は？",
     "ch": [
      "at",
      "in",
      "of",
      "for"
     ],
     "a": 0,
     "ex": "look at ～＝〜を見る。"
    },
    {
     "t": "mc",
     "en": "Do you want some milk? — No, (   ).",
     "q": "(   ) に入る語は？",
     "ch": [
      "thank you",
      "please",
      "it is",
      "I am"
     ],
     "a": 0,
     "ex": "ことわるときは No, thank you.。"
    },
    {
     "t": "mc",
     "en": "This bag is Emi's. It is (   ).",
     "q": "(   ) に入る語は？",
     "ch": [
      "hers",
      "her",
      "she",
      "him"
     ],
     "a": 0,
     "ex": "hers＝彼女のもの。あとに名詞がないので hers。"
    },
    {
     "t": "mc",
     "en": "(   ) old is your school? — It's fifty years old.",
     "q": "(   ) に入る語は？",
     "ch": [
      "How",
      "What",
      "When",
      "Where"
     ],
     "a": 0,
     "ex": "How old＝どのくらい古い（何年）。"
    },
    {
     "t": "mc",
     "en": "We play basketball (   ) the gym.",
     "q": "(   ) に入る語は？",
     "ch": [
      "in",
      "on",
      "under",
      "to"
     ],
     "a": 0,
     "ex": "in the gym＝体育館の中で。"
    },
    {
     "t": "mc",
     "en": "I like dogs. (   ) are cute.",
     "q": "(   ) に入る語は？",
     "ch": [
      "They",
      "It",
      "She",
      "He"
     ],
     "a": 0,
     "ex": "dogs（複数）を受けるのは They。"
    },
    {
     "t": "mc",
     "en": "My school starts (   ) eight thirty.",
     "q": "(   ) に入る語は？",
     "ch": [
      "at",
      "in",
      "on",
      "for"
     ],
     "a": 0,
     "ex": "時刻の前は at。"
    },
    {
     "t": "mc",
     "en": "(   ) is this cake? — It's five hundred yen.",
     "q": "(   ) に入る語は？",
     "ch": [
      "How much",
      "How many",
      "How old",
      "How long"
     ],
     "a": 0,
     "ex": "値段をたずねる How much。"
    },
    {
     "t": "mc",
     "en": "I live (   ) Japan.",
     "q": "(   ) に入る語は？",
     "ch": [
      "in",
      "at",
      "on",
      "to"
     ],
     "a": 0,
     "ex": "国や町の中に住む → in。"
    },
    {
     "t": "mc",
     "en": "(   ) do you like soccer? — Because it's fun.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Why",
      "What",
      "When",
      "Where"
     ],
     "a": 0,
     "ex": "Because で答える → 理由をたずねる Why。"
    }
   ],
   "reading": [
    {
     "t": "mc",
     "p": "g5_yuta_family",
     "q": "質問: How old is Yuta?",
     "ch": [
      "13 years old.",
      "7 years old.",
      "12 years old.",
      "15 years old."
     ],
     "a": 0,
     "ex": "第1段落 I am thirteen years old → 13歳。7歳は弟の Sho。"
    },
    {
     "t": "mc",
     "p": "g5_yuta_family",
     "q": "質問: What is Yuta's father?",
     "ch": [
      "He cooks at a restaurant.",
      "He works at a hospital near the station.",
      "He is a teacher at Yuta's school.",
      "He drives a train."
     ],
     "a": 0,
     "ex": "第2段落 My father is a cook. He works at a restaurant → レストランで料理をする人。"
    },
    {
     "t": "mc",
     "p": "g5_yuta_family",
     "q": "質問: Who likes trains?",
     "ch": [
      "Yuta's little brother.",
      "Yuta's father.",
      "Yuta's mother, the nurse.",
      "Yuta's dog, Koro."
     ],
     "a": 0,
     "ex": "第2段落 Sho is seven. He likes trains。Sho は第1段落で my little brother と紹介されている。"
    },
    {
     "t": "mc",
     "p": "g5_yuta_family",
     "q": "質問: When does Yuta's family go to the park?",
     "ch": [
      "Every Sunday.",
      "On Saturdays.",
      "Every morning.",
      "After school."
     ],
     "a": 0,
     "ex": "第3段落 On Sundays, we go to the park＝毎週日曜日に。"
    },
    {
     "t": "mc",
     "p": "g5_yuta_family",
     "q": "質問: What does Yuta's mother do in the park?",
     "ch": [
      "She reads a book.",
      "She plays catch.",
      "She runs with the dog.",
      "She cooks."
     ],
     "a": 0,
     "ex": "第3段落 My mother reads a book under a big tree。"
    },
    {
     "t": "mc",
     "p": "g5_lucy_pet",
     "q": "質問: Where is Lucy from?",
     "ch": [
      "She comes from Canada.",
      "She comes from Japan.",
      "She comes from America.",
      "She comes from Australia."
     ],
     "a": 0,
     "ex": "第1段落 I'm from Canada → カナダ出身。Japan は今住んでいる国。"
    },
    {
     "t": "mc",
     "p": "g5_lucy_pet",
     "q": "質問: What color is Momo?",
     "ch": [
      "Black and white.",
      "Brown.",
      "White and gray.",
      "Black and orange."
     ],
     "a": 0,
     "ex": "第1段落 She is white and black＝白と黒（順番がちがっても同じ）。"
    },
    {
     "t": "mc",
     "p": "g5_lucy_pet",
     "q": "質問: Where does Momo sleep?",
     "ch": [
      "On Lucy's bed.",
      "In the garden.",
      "Under the table.",
      "In the kitchen."
     ],
     "a": 0,
     "ex": "第2段落 She sleeps on my bed every night。"
    },
    {
     "t": "mc",
     "p": "g5_lucy_pet",
     "q": "質問: What does Lucy do after school?",
     "ch": [
      "She plays with her cat.",
      "She gives Momo fish and milk.",
      "She sleeps on her bed.",
      "She goes to the park with Momo."
     ],
     "a": 0,
     "ex": "第3段落 After school, I play with Momo in the garden。Momo＝Lucy のネコ。"
    },
    {
     "t": "mc",
     "p": "g5_ryo_club",
     "q": "質問: How many members does the basketball club have?",
     "ch": [
      "20 students.",
      "12 students.",
      "6 students.",
      "4 students."
     ],
     "a": 0,
     "ex": "第1段落 We have twenty members → 20人。"
    },
    {
     "t": "mc",
     "p": "g5_ryo_club",
     "q": "質問: Where does the club practice?",
     "ch": [
      "At the school gym.",
      "In the park near the school.",
      "In the classroom.",
      "At Ryo's house."
     ],
     "a": 0,
     "ex": "第2段落 We practice in the gym＝体育館で。"
    },
    {
     "t": "mc",
     "p": "g5_ryo_club",
     "q": "質問: When doesn't the club practice?",
     "ch": [
      "On Sundays and Tuesdays.",
      "On Mondays and Saturdays.",
      "On Saturdays.",
      "After school every day."
     ],
     "a": 0,
     "ex": "第2段落 We don't practice on Tuesdays and Sundays。火曜と日曜＝日曜と火曜。"
    },
    {
     "t": "mc",
     "p": "g5_ryo_club",
     "q": "質問: Who is Mr. Mori?",
     "ch": [
      "Ryo's coach.",
      "Ryo's father.",
      "Ryo's teacher.",
      "Ryo's friend."
     ],
     "a": 0,
     "ex": "第2段落 Our coach is Mr. Mori。"
    },
    {
     "t": "mc",
     "p": "g5_ryo_club",
     "q": "質問: What does the club have next month?",
     "ch": [
      "An important game.",
      "A basketball party.",
      "A new coach.",
      "A big test."
     ],
     "a": 0,
     "ex": "第3段落 Next month, we have a big game＝大事な試合。"
    },
    {
     "t": "mc",
     "p": "g5_amy_sunday",
     "q": "質問: Who makes pancakes with Amy?",
     "ch": [
      "Her mother.",
      "Her brother Jack.",
      "Her friend Mika.",
      "Nobody."
     ],
     "a": 0,
     "ex": "第2段落 I … help my mother. We make pancakes together → お母さんと。Jack は手伝わない。"
    },
    {
     "t": "mc",
     "p": "g5_amy_sunday",
     "q": "質問: What does Jack do in the morning?",
     "ch": [
      "He plays games in his room.",
      "He cleans his room with Amy.",
      "He helps his mother.",
      "He goes to the library with Mika."
     ],
     "a": 0,
     "ex": "第2段落 He plays video games in his room。"
    },
    {
     "t": "mc",
     "p": "g5_amy_sunday",
     "q": "質問: Who goes to the library with Amy?",
     "ch": [
      "Her friend.",
      "Her brother Jack.",
      "Her mother.",
      "Nobody."
     ],
     "a": 0,
     "ex": "第3段落 I go to the library with my friend Mika → 友だち。"
    },
    {
     "t": "mc",
     "p": "g5_amy_sunday",
     "q": "質問: What time does Amy usually go home?",
     "ch": [
      "At 5:00.",
      "At 3:00.",
      "At 12:00.",
      "At 10:00."
     ],
     "a": 0,
     "ex": "第3段落 I usually go home at five → 5時。"
    }
   ]
  },
  "6": {
   "vocab": [
    {
     "t": "mc",
     "q": "「火曜日」は？",
     "ch": [
      "Tuesday",
      "Thursday",
      "Monday",
      "Sunday"
     ],
     "a": 0,
     "ex": "Tuesday＝火曜日。Thursday（木曜日）とまちがえやすい。"
    },
    {
     "t": "fill",
     "q": "「お母さん」を英語で（m で始まる）。",
     "a": "mother",
     "ac": [
      "mom"
     ],
     "ex": "mother＝お母さん。mom（ママ）でも正解。"
    },
    {
     "t": "mc",
     "q": "「昼食」は？",
     "ch": [
      "lunch",
      "breakfast",
      "dinner",
      "snack"
     ],
     "a": 0,
     "ex": "lunch＝昼食。"
    },
    {
     "t": "mc",
     "q": "「図書館」は？",
     "ch": [
      "library",
      "hospital",
      "station",
      "park"
     ],
     "a": 0,
     "ex": "library＝図書館。"
    },
    {
     "t": "fill",
     "q": "「兄・弟」を英語で（b で始まる）。",
     "a": "brother",
     "ex": "brother＝兄・弟。"
    },
    {
     "t": "mc",
     "q": "「金曜日」は？",
     "ch": [
      "Friday",
      "Thursday",
      "Sunday",
      "Tuesday"
     ],
     "a": 0,
     "ex": "Friday＝金曜日。"
    },
    {
     "t": "mc",
     "q": "「駅」は？",
     "ch": [
      "station",
      "school",
      "park",
      "kitchen"
     ],
     "a": 0,
     "ex": "station＝駅。"
    },
    {
     "t": "mc",
     "q": "「台所」は？",
     "ch": [
      "kitchen",
      "classroom",
      "garden",
      "bathroom"
     ],
     "a": 0,
     "ex": "kitchen＝台所。"
    },
    {
     "t": "fill",
     "q": "「姉・妹」を英語で（s で始まる）。",
     "a": "sister",
     "ex": "sister＝姉・妹。"
    },
    {
     "t": "mc",
     "q": "「病院」は？",
     "ch": [
      "hospital",
      "library",
      "station",
      "zoo"
     ],
     "a": 0,
     "ex": "hospital＝病院。"
    },
    {
     "t": "mc",
     "q": "「木曜日」は？",
     "ch": [
      "Thursday",
      "Tuesday",
      "Wednesday",
      "Saturday"
     ],
     "a": 0,
     "ex": "Thursday＝木曜日。"
    },
    {
     "t": "mc",
     "q": "「冬」は？",
     "ch": [
      "winter",
      "summer",
      "spring",
      "fall"
     ],
     "a": 0,
     "ex": "winter＝冬。"
    },
    {
     "t": "fill",
     "q": "「夏」を英語で（s で始まる）。",
     "a": "summer",
     "ex": "summer＝夏。"
    },
    {
     "t": "mc",
     "q": "「朝」は？",
     "ch": [
      "morning",
      "afternoon",
      "evening",
      "night"
     ],
     "a": 0,
     "ex": "morning＝朝。Good morning. の morning。"
    },
    {
     "t": "mc",
     "q": "「雨の（天気）」は？",
     "ch": [
      "rainy",
      "sunny",
      "cloudy",
      "snowy"
     ],
     "a": 0,
     "ex": "rainy＝雨の。It's rainy. で「雨です」。"
    },
    {
     "t": "mc",
     "q": "「大きい」は？",
     "ch": [
      "big",
      "small",
      "long",
      "short"
     ],
     "a": 0,
     "ex": "big＝大きい。反対は small。"
    },
    {
     "t": "fill",
     "q": "「水」を英語で（w で始まる）。",
     "a": "water",
     "ex": "water＝水。"
    },
    {
     "t": "mc",
     "q": "「うれしい」は？",
     "ch": [
      "happy",
      "sad",
      "busy",
      "sleepy"
     ],
     "a": 0,
     "ex": "happy＝うれしい。"
    },
    {
     "t": "mc",
     "q": "「日曜日」は？",
     "ch": [
      "Sunday",
      "Monday",
      "Saturday",
      "Friday"
     ],
     "a": 0,
     "ex": "Sunday＝日曜日。"
    },
    {
     "t": "mc",
     "q": "「泳ぐ」は？",
     "ch": [
      "swim",
      "run",
      "sing",
      "jump"
     ],
     "a": 0,
     "ex": "swim＝泳ぐ。"
    },
    {
     "t": "fill",
     "q": "「医者」を英語で（d で始まる）。",
     "a": "doctor",
     "ex": "doctor＝医者。"
    },
    {
     "t": "mc",
     "q": "「りんご」は？",
     "ch": [
      "apple",
      "orange",
      "banana",
      "grape"
     ],
     "a": 0,
     "ex": "apple＝りんご。"
    },
    {
     "t": "mc",
     "q": "「夜」は？",
     "ch": [
      "night",
      "morning",
      "noon",
      "afternoon"
     ],
     "a": 0,
     "ex": "night＝夜。Good night. の night。"
    },
    {
     "t": "mc",
     "q": "「春」は？",
     "ch": [
      "spring",
      "fall",
      "winter",
      "summer"
     ],
     "a": 0,
     "ex": "spring＝春。"
    },
    {
     "t": "fill",
     "q": "「お父さん」を英語で（f で始まる）。",
     "a": "father",
     "ex": "father＝お父さん。"
    },
    {
     "t": "mc",
     "q": "「歌う」は？",
     "ch": [
      "sing",
      "dance",
      "swim",
      "read"
     ],
     "a": 0,
     "ex": "sing＝歌う。"
    }
   ],
   "grammar": [
    {
     "t": "mc",
     "en": "I (   ) a student.",
     "q": "(   ) に入る語は？",
     "ch": [
      "am",
      "is",
      "are",
      "be"
     ],
     "a": 0,
     "ex": "主語 I の be 動詞は am。"
    },
    {
     "t": "mc",
     "en": "You (   ) very tall.",
     "q": "(   ) に入る語は？",
     "ch": [
      "are",
      "is",
      "am",
      "be"
     ],
     "a": 0,
     "ex": "主語 You の be 動詞は are。"
    },
    {
     "t": "mc",
     "en": "Tom (   ) my brother.",
     "q": "(   ) に入る語は？",
     "ch": [
      "is",
      "am",
      "are",
      "be"
     ],
     "a": 0,
     "ex": "主語 Tom（三人称・単数）の be 動詞は is。"
    },
    {
     "t": "mc",
     "en": "(   ) she play tennis?",
     "q": "(   ) に入る語は？",
     "ch": [
      "Does",
      "Do",
      "Is",
      "Are"
     ],
     "a": 0,
     "ex": "一般動詞 play の疑問文。主語 she には Does。"
    },
    {
     "t": "mc",
     "en": "They (   ) like fish.",
     "q": "否定文に",
     "ch": [
      "don't",
      "doesn't",
      "isn't",
      "aren't"
     ],
     "a": 0,
     "ex": "主語 They の一般動詞否定は don't。"
    },
    {
     "t": "mc",
     "en": "He is (   ) in the pool now.",
     "q": "(   ) に入る語は？",
     "ch": [
      "swimming",
      "swim",
      "swims",
      "swam"
     ],
     "a": 0,
     "ex": "now＋is → 現在進行形 swimming（m を重ねる）。"
    },
    {
     "t": "mc",
     "en": "I (   ) two cats.",
     "q": "(   ) に入る語は？",
     "ch": [
      "have",
      "has",
      "having",
      "had"
     ],
     "a": 0,
     "ex": "主語 I＋現在 → have。"
    },
    {
     "t": "mc",
     "en": "My father (   ) a car.",
     "q": "(   ) に入る語は？",
     "ch": [
      "has",
      "have",
      "having",
      "had"
     ],
     "a": 0,
     "ex": "主語 My father（三人称・単数）の現在形は has。"
    },
    {
     "t": "mc",
     "en": "(   ) is that boy? — He is Ken.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Who",
      "What",
      "Where",
      "When"
     ],
     "a": 0,
     "ex": "人をたずねる Who。"
    },
    {
     "t": "mc",
     "en": "(   ) is your bag? — It's under the desk.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Where",
      "Who",
      "What",
      "How"
     ],
     "a": 0,
     "ex": "場所をたずねる Where。答えが under the desk（場所）。"
    },
    {
     "t": "mc",
     "en": "(   ) many pencils do you have?",
     "q": "(   ) に入る語は？",
     "ch": [
      "How",
      "What",
      "Which",
      "Who"
     ],
     "a": 0,
     "ex": "数をたずねる How many。"
    },
    {
     "t": "mc",
     "en": "These are my (   ).",
     "q": "(   ) に入る語は？",
     "ch": [
      "books",
      "book",
      "a book",
      "bookes"
     ],
     "a": 0,
     "ex": "These are（複数）→ 名詞も複数形 books。"
    },
    {
     "t": "mc",
     "en": "This is (   ) apple. It's red.",
     "q": "(   ) に入る語は？",
     "ch": [
      "an",
      "a",
      "some",
      "any"
     ],
     "a": 0,
     "ex": "apple は母音で始まるので an。"
    },
    {
     "t": "mc",
     "en": "(   ) book is this? — It's mine.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Whose",
      "Who",
      "Where",
      "When"
     ],
     "a": 0,
     "ex": "持ち主をたずねる Whose。答えが mine（私のもの）。"
    },
    {
     "t": "mc",
     "en": "I can't (   ) the piano.",
     "q": "(   ) に入る語は？",
     "ch": [
      "play",
      "plays",
      "playing",
      "played"
     ],
     "a": 0,
     "ex": "can't のあとは原形 play。"
    },
    {
     "t": "mc",
     "en": "Please (   ) the door.",
     "q": "(   ) に入る語は？",
     "ch": [
      "open",
      "opens",
      "opening",
      "opened"
     ],
     "a": 0,
     "ex": "Please＋原形（命令文）。"
    },
    {
     "t": "mc",
     "en": "Don't (   ) in the library.",
     "q": "(   ) に入る語は？",
     "ch": [
      "run",
      "runs",
      "running",
      "ran"
     ],
     "a": 0,
     "ex": "Don't＋原形（禁止の命令文）。"
    },
    {
     "t": "mc",
     "en": "(   ) you busy now? — Yes, I am.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Are",
      "Do",
      "Is",
      "Does"
     ],
     "a": 0,
     "ex": "busy は形容詞なので be 動詞の疑問文。you には Are。"
    },
    {
     "t": "mc",
     "en": "My birthday is (   ) April.",
     "q": "(   ) に入る語は？",
     "ch": [
      "in",
      "on",
      "at",
      "to"
     ],
     "a": 0,
     "ex": "月の前は in。"
    },
    {
     "t": "mc",
     "en": "I get up (   ) six.",
     "q": "(   ) に入る語は？",
     "ch": [
      "at",
      "in",
      "on",
      "for"
     ],
     "a": 0,
     "ex": "時刻の前は at。"
    },
    {
     "t": "mc",
     "en": "This is my sister. (   ) is ten years old.",
     "q": "(   ) に入る語は？",
     "ch": [
      "She",
      "He",
      "It",
      "They"
     ],
     "a": 0,
     "ex": "my sister（女の人ひとり）を指すので She。"
    },
    {
     "t": "mc",
     "en": "That is (   ) bag.",
     "q": "(   ) に入る語は？",
     "ch": [
      "my",
      "I",
      "me",
      "mine"
     ],
     "a": 0,
     "ex": "名詞 bag の前は「私の」my。"
    },
    {
     "t": "mc",
     "en": "We (   ) watching TV now.",
     "q": "(   ) に入る語は？",
     "ch": [
      "are",
      "is",
      "am",
      "be"
     ],
     "a": 0,
     "ex": "主語 We＋now → are watching（現在進行形）。"
    },
    {
     "t": "mc",
     "en": "What (   ) you want? — A new bike.",
     "q": "(   ) に入る語は？",
     "ch": [
      "do",
      "does",
      "are",
      "is"
     ],
     "a": 0,
     "ex": "一般動詞 want の疑問文。主語 you には do。"
    }
   ],
   "technique": [
    {
     "t": "mc",
     "q": "【6級リーディング】“I have a big brown dog. It is three years old.” 内容に合う絵は？",
     "ch": [
      "大きい茶色の犬",
      "小さい黒い犬",
      "大きい白い犬",
      "茶色のねこ"
     ],
     "chJp": true,
     "a": 0,
     "ex": "大きさ（big）と色（brown）と動物（dog）がすべて合う絵。"
    },
    {
     "t": "mc",
     "en": "A: Happy birthday, Ken!",
     "q": "【6級リスニング】自然な応答は？",
     "ch": [
      "Thank you.",
      "Here you are.",
      "Yes, I can.",
      "It's Monday."
     ],
     "a": 0,
     "ex": "お祝いの言葉（Happy birthday!）には Thank you.（ありがとう）と返す。"
    },
    {
     "t": "mc",
     "q": "【6級リーディング】“My cap is red. My bag is green.” 内容に合う絵は？",
     "ch": [
      "赤いぼうしと緑のかばん",
      "緑のぼうしと赤いかばん",
      "赤いぼうしと青いかばん",
      "青いぼうしと緑のかばん"
     ],
     "chJp": true,
     "a": 0,
     "ex": "cap（ぼうし）が red、bag（かばん）が green。組み合わせを正確に。"
    },
    {
     "t": "mc",
     "en": "A: What's your name?",
     "q": "【6級リスニング】自然な応答は？",
     "ch": [
      "My name is Yuki.",
      "I'm fine.",
      "It's blue.",
      "Yes, I do."
     ],
     "a": 0,
     "ex": "名前をたずねられたら My name is ～. で答える。"
    },
    {
     "t": "mc",
     "q": "【6級リーディング】“I like apples. I eat three apples every day.” 内容に合う絵は？",
     "ch": [
      "りんご3個",
      "りんご1個",
      "オレンジ3個",
      "バナナ3個"
     ],
     "chJp": true,
     "a": 0,
     "ex": "くだもの（apples）と数（three）の両方が合う絵。"
    },
    {
     "t": "mc",
     "en": "A: Do you like soccer?",
     "q": "【6級リスニング】自然な応答は？",
     "ch": [
      "Yes, I do.",
      "Yes, I am.",
      "It's a ball.",
      "I'm ten."
     ],
     "a": 0,
     "ex": "Do you ～? には Yes, I do. / No, I don't.。"
    },
    {
     "t": "mc",
     "q": "【6級リーディング】“It is sunny today. I play soccer in the park.” 内容に合う絵は？",
     "ch": [
      "晴れた日に公園でサッカーをする男の子",
      "雨の日に家でテレビを見る男の子",
      "晴れた日に公園でテニスをする男の子",
      "雪の日にスキーをする男の子"
     ],
     "chJp": true,
     "a": 0,
     "ex": "天気（sunny）と場所（park）とスポーツ（soccer）をすべて確認。"
    },
    {
     "t": "mc",
     "en": "A: Where is my pen?",
     "q": "【6級リスニング】自然な応答は？",
     "ch": [
      "It's on the desk.",
      "It's Monday.",
      "I'm fine.",
      "You're welcome."
     ],
     "a": 0,
     "ex": "Where（どこ）には場所で答える。"
    },
    {
     "t": "mc",
     "q": "【6級リーディング】“My sister has a yellow umbrella. It is new.” 内容に合う絵は？",
     "ch": [
      "黄色いかさ",
      "黄色いぼうし",
      "赤いかさ",
      "青いかさ"
     ],
     "chJp": true,
     "a": 0,
     "ex": "umbrella（かさ）と色（yellow）が合う絵。"
    },
    {
     "t": "mc",
     "en": "A: How many dogs do you have?",
     "q": "【6級リスニング】自然な応答は？",
     "ch": [
      "I have two.",
      "I'm two.",
      "It's a dog.",
      "Yes, I can."
     ],
     "a": 0,
     "ex": "How many（いくつ）には数で答える。I'm two. は年齢なので不自然。"
    },
    {
     "t": "mc",
     "q": "【6級リーディング】“I have two pencils and one eraser in my pencil case.” 内容に合う絵は？",
     "ch": [
      "えんぴつ2本と消しゴム1個",
      "えんぴつ1本と消しゴム2個",
      "えんぴつ2本とペン1本",
      "えんぴつ3本"
     ],
     "chJp": true,
     "a": 0,
     "ex": "two pencils と one eraser。数と物の組み合わせを正確に。"
    },
    {
     "t": "mc",
     "en": "A: What day is it today?",
     "q": "【6級リスニング】自然な応答は？",
     "ch": [
      "It's Friday.",
      "It's seven o'clock.",
      "It's sunny.",
      "It's a cat."
     ],
     "a": 0,
     "ex": "What day（何曜日）には曜日で答える。時刻や天気ではない。"
    },
    {
     "t": "mc",
     "q": "【6級リーディング】“I get up at seven. I eat bread for breakfast.” 内容に合う絵は？",
     "ch": [
      "7時に起きてパンを食べる",
      "7時に起きてごはんを食べる",
      "6時に起きてパンを食べる",
      "8時に起きて牛乳を飲む"
     ],
     "chJp": true,
     "a": 0,
     "ex": "時刻（seven）と食べ物（bread）の両方が合う絵。"
    },
    {
     "t": "mc",
     "en": "A: How's the weather?",
     "q": "【6級リスニング】自然な応答は？",
     "ch": [
      "It's rainy.",
      "It's Monday.",
      "I'm fine.",
      "It's mine."
     ],
     "a": 0,
     "ex": "天気をたずねられたら天気で答える。"
    },
    {
     "t": "mc",
     "q": "【6級リーディング】“This is my room. There is a small table and a big bed.” 内容に合う絵は？",
     "ch": [
      "小さいテーブルと大きいベッドのある部屋",
      "大きいテーブルと小さいベッドのある部屋",
      "小さいテーブルといすのある部屋",
      "大きいベッドだけの部屋"
     ],
     "chJp": true,
     "a": 0,
     "ex": "small table と big bed。大小の組み合わせを逆にしない。"
    },
    {
     "t": "mc",
     "en": "A: Here you are.",
     "q": "【6級リスニング】自然な応答は？",
     "ch": [
      "Thank you.",
      "See you.",
      "Good night.",
      "Yes, I am."
     ],
     "a": 0,
     "ex": "物を渡されたら Thank you.。"
    },
    {
     "t": "mc",
     "en": "A: I'm sorry.",
     "q": "【6級リスニング】自然な応答は？",
     "ch": [
      "That's all right.",
      "You're welcome.",
      "Nice to meet you.",
      "Yes, I can."
     ],
     "a": 0,
     "ex": "あやまられたら That's all right.（いいですよ）。"
    },
    {
     "t": "mc",
     "q": "【6級リーディング】“Kenta can swim fast. He can't ride a bike.” 内容に合う絵は？",
     "ch": [
      "速く泳ぐ男の子",
      "自転車に乗る男の子",
      "速く走る男の子",
      "ピアノをひく男の子"
     ],
     "chJp": true,
     "a": 0,
     "ex": "can swim（泳げる）が内容。can't ride a bike なので自転車の絵は不可。"
    },
    {
     "t": "mc",
     "en": "A: What color do you like?",
     "q": "【6級リスニング】自然な応答は？",
     "ch": [
      "I like blue.",
      "I like dogs.",
      "It's Monday.",
      "Yes, I do."
     ],
     "a": 0,
     "ex": "What color（何色）には色で答える。"
    },
    {
     "t": "mc",
     "en": "A: Is this your cap?",
     "q": "【6級リスニング】自然な応答は？",
     "ch": [
      "Yes, it is.",
      "Yes, I do.",
      "Yes, I can.",
      "It's three."
     ],
     "a": 0,
     "ex": "Is this ～? には Yes, it is. / No, it isn't.。"
    },
    {
     "t": "mc",
     "en": "A: Let's play tennis.",
     "q": "【6級リスニング】自然な応答は？",
     "ch": [
      "Yes, let's.",
      "You're welcome.",
      "I'm eleven.",
      "It's a ball."
     ],
     "a": 0,
     "ex": "Let's ～. のさそいには Yes, let's.。"
    },
    {
     "t": "mc",
     "en": "A: Can I use your pen?",
     "q": "【6級リスニング】自然な応答は？",
     "ch": [
      "Sure. Here you are.",
      "Yes, I am.",
      "It's a pen.",
      "Good night."
     ],
     "a": 0,
     "ex": "Can I ～?（～してもいい？）には Sure.（いいよ）と渡す Here you are.。"
    }
   ],
   "practice": [
    {
     "t": "mc",
     "en": "A: (   ) is this? B: It's a pencil.",
     "q": "(   ) に入る語は？",
     "ch": [
      "What",
      "Who",
      "Where",
      "When"
     ],
     "a": 0,
     "ex": "物をたずねる What。答えが a pencil。"
    },
    {
     "t": "mc",
     "en": "There (   ) a cat under the chair.",
     "q": "(   ) に入る語は？",
     "ch": [
      "is",
      "are",
      "am",
      "be"
     ],
     "a": 0,
     "ex": "a cat（単数）→ There is。"
    },
    {
     "t": "mc",
     "en": "A: (   ) is your teacher? B: Ms. Sato.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Who",
      "What",
      "Where",
      "When"
     ],
     "a": 0,
     "ex": "人をたずねる Who。答えが Ms. Sato（人）。"
    },
    {
     "t": "mc",
     "en": "I (   ) tennis on Sundays.",
     "q": "(   ) に入る語は？",
     "ch": [
      "play",
      "plays",
      "playing",
      "played"
     ],
     "a": 0,
     "ex": "主語 I＋習慣（on Sundays）→ play。"
    },
    {
     "t": "mc",
     "en": "My mother (   ) cooking now.",
     "q": "(   ) に入る語は？",
     "ch": [
      "is",
      "are",
      "am",
      "be"
     ],
     "a": 0,
     "ex": "My mother（三人称・単数）＋now → is cooking。"
    },
    {
     "t": "mc",
     "en": "A: (   ) you have a pet? B: Yes, I have a dog.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Do",
      "Are",
      "Does",
      "Is"
     ],
     "a": 0,
     "ex": "一般動詞 have の疑問文。主語 you には Do。"
    },
    {
     "t": "mc",
     "en": "A: How (   ) is this hat? B: It's 500 yen.",
     "q": "(   ) に入る語は？",
     "ch": [
      "much",
      "many",
      "old",
      "long"
     ],
     "a": 0,
     "ex": "値段をたずねる How much。"
    },
    {
     "t": "mc",
     "en": "We (   ) speak English a little.",
     "q": "(   ) に入る語は？",
     "ch": [
      "can",
      "is",
      "am",
      "are"
     ],
     "a": 0,
     "ex": "「～できる」は can＋原形 speak。"
    },
    {
     "t": "mc",
     "en": "A: Whose bike is this? B: It's (   ).",
     "q": "(   ) に入る語は？",
     "ch": [
      "mine",
      "my",
      "I",
      "me"
     ],
     "a": 0,
     "ex": "「私のもの」は mine。my のあとには名詞が必要。"
    },
    {
     "t": "mc",
     "en": "Ken and I (   ) good friends.",
     "q": "(   ) に入る語は？",
     "ch": [
      "are",
      "is",
      "am",
      "be"
     ],
     "a": 0,
     "ex": "Ken and I（複数）の be 動詞は are。"
    },
    {
     "t": "mc",
     "en": "(   ) a good day! — You, too.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Have",
      "Has",
      "Having",
      "Had"
     ],
     "a": 0,
     "ex": "Have a good day!（よい一日を）。命令文は原形。"
    },
    {
     "t": "mc",
     "en": "A: (   ) is the station? B: Go straight.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Where",
      "What",
      "Who",
      "When"
     ],
     "a": 0,
     "ex": "場所をたずねる Where。答えが道案内。"
    },
    {
     "t": "mc",
     "en": "Look (   ) the picture.",
     "q": "(   ) に入る語は？",
     "ch": [
      "at",
      "in",
      "on",
      "to"
     ],
     "a": 0,
     "ex": "look at ～＝～を見る。"
    },
    {
     "t": "mc",
     "en": "A: Which do you want, tea (   ) coffee? B: Tea, please.",
     "q": "(   ) に入る語は？",
     "ch": [
      "or",
      "and",
      "but",
      "so"
     ],
     "a": 0,
     "ex": "A or B（AかBか）をえらばせる or。"
    },
    {
     "t": "mc",
     "en": "She (   ) a red umbrella.",
     "q": "(   ) に入る語は？",
     "ch": [
      "has",
      "have",
      "having",
      "is"
     ],
     "a": 0,
     "ex": "主語 She（三人称・単数）の現在形は has。"
    },
    {
     "t": "mc",
     "en": "I (   ) not hungry.",
     "q": "(   ) に入る語は？",
     "ch": [
      "am",
      "is",
      "are",
      "do"
     ],
     "a": 0,
     "ex": "hungry は形容詞なので be 動詞。主語 I には am。"
    }
   ]
  },
  "7": {
   "vocab": [
    {
     "t": "mc",
     "q": "🍊 これを表す英語は？",
     "ch": [
      "orange",
      "apple",
      "banana",
      "grape"
     ],
     "a": 0,
     "ex": "orange＝オレンジ。色の「オレンジ色」も同じ語だよ。"
    },
    {
     "t": "mc",
     "q": "🍌 これを表す英語は？",
     "ch": [
      "banana",
      "apple",
      "orange",
      "melon"
     ],
     "a": 0,
     "ex": "banana＝バナナ。"
    },
    {
     "t": "mc",
     "q": "「緑」を表す英語は？",
     "ch": [
      "green",
      "red",
      "blue",
      "black"
     ],
     "a": 0,
     "ex": "green＝緑。"
    },
    {
     "t": "mc",
     "q": "「白」を表す英語は？",
     "ch": [
      "white",
      "black",
      "yellow",
      "pink"
     ],
     "a": 0,
     "ex": "white＝白。"
    },
    {
     "t": "mc",
     "q": "「黒」を表す英語は？",
     "ch": [
      "black",
      "white",
      "brown",
      "red"
     ],
     "a": 0,
     "ex": "black＝黒。"
    },
    {
     "t": "mc",
     "q": "🐦 これを表す英語は？",
     "ch": [
      "bird",
      "fish",
      "cat",
      "dog"
     ],
     "a": 0,
     "ex": "bird＝鳥。"
    },
    {
     "t": "mc",
     "q": "🐟 これを表す英語は？",
     "ch": [
      "fish",
      "bird",
      "frog",
      "cow"
     ],
     "a": 0,
     "ex": "fish＝魚。"
    },
    {
     "t": "mc",
     "q": "🐰 これを表す英語は？",
     "ch": [
      "rabbit",
      "monkey",
      "mouse",
      "pig"
     ],
     "a": 0,
     "ex": "rabbit＝うさぎ。"
    },
    {
     "t": "mc",
     "q": "🐵 これを表す英語は？",
     "ch": [
      "monkey",
      "rabbit",
      "lion",
      "bear"
     ],
     "a": 0,
     "ex": "monkey＝さる。"
    },
    {
     "t": "mc",
     "q": "「ペン」を表す英語は？",
     "ch": [
      "pen",
      "book",
      "cup",
      "desk"
     ],
     "a": 0,
     "ex": "pen＝ペン。学校の持ち物の名前はよく出るよ。"
    },
    {
     "t": "mc",
     "q": "「つくえ」を表す英語は？",
     "ch": [
      "desk",
      "chair",
      "bag",
      "box"
     ],
     "a": 0,
     "ex": "desk＝つくえ。"
    },
    {
     "t": "mc",
     "q": "「かばん」を表す英語は？",
     "ch": [
      "bag",
      "hat",
      "cap",
      "pen"
     ],
     "a": 0,
     "ex": "bag＝かばん。"
    },
    {
     "t": "mc",
     "q": "🪑 これを表す英語は？",
     "ch": [
      "chair",
      "table",
      "bed",
      "door"
     ],
     "a": 0,
     "ex": "chair＝いす。"
    },
    {
     "t": "mc",
     "q": "🥚 これを表す英語は？",
     "ch": [
      "egg",
      "apple",
      "ball",
      "cup"
     ],
     "a": 0,
     "ex": "egg＝たまご。"
    },
    {
     "t": "mc",
     "q": "🥛（ぎゅうにゅう）これを表す英語は？",
     "ch": [
      "milk",
      "water",
      "juice",
      "tea"
     ],
     "a": 0,
     "ex": "milk＝牛乳。"
    },
    {
     "t": "mc",
     "q": "⚽ これを表す英語は？",
     "ch": [
      "ball",
      "box",
      "bag",
      "bat"
     ],
     "a": 0,
     "ex": "ball＝ボール。"
    },
    {
     "t": "mc",
     "q": "「ぼうし」を表す英語は？",
     "ch": [
      "hat",
      "bag",
      "shoe",
      "shirt"
     ],
     "a": 0,
     "ex": "hat＝ぼうし。"
    },
    {
     "t": "mc",
     "q": "数の「two」はいくつ？",
     "ch": [
      "2",
      "1",
      "3",
      "4"
     ],
     "chJp": true,
     "a": 0,
     "ex": "two＝2。"
    },
    {
     "t": "mc",
     "q": "数の「seven」はいくつ？",
     "ch": [
      "7",
      "6",
      "8",
      "9"
     ],
     "chJp": true,
     "a": 0,
     "ex": "seven＝7。"
    },
    {
     "t": "mc",
     "q": "数の「ten」はいくつ？",
     "ch": [
      "10",
      "1",
      "8",
      "6"
     ],
     "chJp": true,
     "a": 0,
     "ex": "ten＝10。"
    },
    {
     "t": "mc",
     "q": "あいさつ「おやすみ」にあう英語は？",
     "ch": [
      "Good night.",
      "Good morning.",
      "Thank you.",
      "Hello."
     ],
     "a": 0,
     "ex": "Good night.＝おやすみ。ねる前のあいさつだよ。"
    },
    {
     "t": "mc",
     "q": "あいさつ「こんにちは（お昼ごろ）」にあう英語は？",
     "ch": [
      "Good afternoon.",
      "Good night.",
      "Goodbye.",
      "I'm sorry."
     ],
     "a": 0,
     "ex": "Good afternoon.＝こんにちは。afternoon＝午後。"
    },
    {
     "t": "mc",
     "q": "「ごめんなさい」にあう英語は？",
     "ch": [
      "I'm sorry.",
      "Thank you.",
      "Good night.",
      "Hello."
     ],
     "a": 0,
     "ex": "I'm sorry.＝ごめんなさい。"
    },
    {
     "t": "mc",
     "q": "「はじめまして」にあう英語は？",
     "ch": [
      "Nice to meet you.",
      "Good night.",
      "Thank you.",
      "See you."
     ],
     "a": 0,
     "ex": "Nice to meet you.＝はじめまして（会えてうれしい）。"
    },
    {
     "t": "fill",
     "q": "「ぶた」を英語で書こう（p で始まる）。",
     "a": "pig",
     "ex": "pig＝ぶた。"
    },
    {
     "t": "fill",
     "q": "「牛」を英語で書こう（c で始まる）。",
     "a": "cow",
     "ex": "cow＝牛。"
    },
    {
     "t": "fill",
     "q": "「カップ」を英語で書こう（c で始まる）。",
     "a": "cup",
     "ex": "cup＝カップ。"
    },
    {
     "t": "fill",
     "q": "「ベッド」を英語で書こう（b で始まる）。",
     "a": "bed",
     "ex": "bed＝ベッド。"
    },
    {
     "t": "mc",
     "q": "🦁 これを表す英語は？",
     "ch": [
      "lion",
      "tiger",
      "cat",
      "dog"
     ],
     "a": 0,
     "ex": "lion＝ライオン。"
    },
    {
     "t": "mc",
     "q": "⭐ これを表す英語は？",
     "ch": [
      "star",
      "sun",
      "moon",
      "sky"
     ],
     "a": 0,
     "ex": "star＝星。"
    },
    {
     "t": "mc",
     "q": "🌸 これを表す英語は？",
     "ch": [
      "flower",
      "tree",
      "leaf",
      "grass"
     ],
     "a": 0,
     "ex": "flower＝花。"
    },
    {
     "t": "mc",
     "q": "🌳 これを表す英語は？",
     "ch": [
      "tree",
      "flower",
      "house",
      "car"
     ],
     "a": 0,
     "ex": "tree＝木。"
    }
   ],
   "grammar": [
    {
     "t": "mc",
     "en": "You (   ) my friend.",
     "q": "(   ) に入る語は？",
     "ch": [
      "are",
      "am",
      "is",
      "be"
     ],
     "a": 0,
     "ex": "主語が you のときは are。You are ～＝あなたは～です。"
    },
    {
     "t": "mc",
     "en": "He (   ) a teacher.",
     "q": "(   ) に入る語は？",
     "ch": [
      "is",
      "am",
      "are",
      "be"
     ],
     "a": 0,
     "ex": "主語 He＋is。"
    },
    {
     "t": "mc",
     "en": "We (   ) students.",
     "q": "「わたしたちは生徒です」",
     "ch": [
      "are",
      "am",
      "is",
      "be"
     ],
     "a": 0,
     "ex": "複数の主語 We＋are。"
    },
    {
     "t": "mc",
     "en": "This is (   ) orange.",
     "q": "(   ) に入る語は？",
     "ch": [
      "an",
      "a",
      "two",
      "×"
     ],
     "a": 0,
     "ex": "orange は母音の音で始まる → an。"
    },
    {
     "t": "mc",
     "en": "That is (   ) dog.",
     "q": "(   ) に入る語は？",
     "ch": [
      "a",
      "an",
      "×",
      "two"
     ],
     "a": 0,
     "ex": "dog は子音の音で始まる1つのもの → a。"
    },
    {
     "t": "mc",
     "en": "(   ) is a pen.",
     "q": "「あれはペンです」",
     "ch": [
      "That",
      "This",
      "These",
      "They"
     ],
     "a": 0,
     "ex": "That is ～＝あれは～です。遠くのものは that。"
    },
    {
     "t": "mc",
     "en": "(   ) are apples.",
     "q": "「これらはりんごです」",
     "ch": [
      "These",
      "This",
      "That",
      "It"
     ],
     "a": 0,
     "ex": "複数のものは These are ～。"
    },
    {
     "t": "mc",
     "en": "I (   ) cats.",
     "q": "「ねこが好き」",
     "ch": [
      "like",
      "have",
      "am",
      "is"
     ],
     "a": 0,
     "ex": "I like ～＝〜が好き。"
    },
    {
     "t": "mc",
     "en": "We (   ) a ball.",
     "q": "「ボールを持っている」",
     "ch": [
      "have",
      "has",
      "are",
      "like"
     ],
     "a": 0,
     "ex": "We have ～＝〜を持っている。"
    },
    {
     "t": "mc",
     "q": "「わたしは幸せです」にあう英語は？",
     "ch": [
      "I am happy.",
      "Am I happy.",
      "I happy am.",
      "Happy I am."
     ],
     "a": 0,
     "ex": "I am ～. の語順。主語→be動詞→様子のことば。"
    },
    {
     "t": "mc",
     "q": "「あれは犬です」にあう英語は？",
     "ch": [
      "That is a dog.",
      "That a dog is.",
      "Dog is that a.",
      "Is that a dog."
     ],
     "a": 0,
     "ex": "That is a ～. の語順を覚えよう。"
    },
    {
     "t": "mc",
     "en": "(   ) she a student?",
     "q": "「彼女は生徒ですか？」",
     "ch": [
      "Is",
      "Are",
      "Am",
      "Do"
     ],
     "a": 0,
     "ex": "she には Is。たずねる文は Is を前に出す。"
    },
    {
     "t": "mc",
     "en": "(   ) they cats?",
     "q": "「それらはねこですか？」",
     "ch": [
      "Are",
      "Is",
      "Am",
      "Does"
     ],
     "a": 0,
     "ex": "複数 they には Are。"
    },
    {
     "t": "mc",
     "en": "It (   ) a book.",
     "q": "(   ) に入る語は？",
     "ch": [
      "is",
      "am",
      "are",
      "be"
     ],
     "a": 0,
     "ex": "主語 It＋is。"
    },
    {
     "t": "mc",
     "q": "「これはペンではありません」にあう英語は？",
     "ch": [
      "This is not a pen.",
      "This not is a pen.",
      "Not this is a pen.",
      "This is a not pen."
     ],
     "a": 0,
     "ex": "is の後ろに not を置く。"
    },
    {
     "t": "mc",
     "en": "I (   ) not a cat.",
     "q": "「わたしはねこではない」",
     "ch": [
      "am",
      "is",
      "are",
      "do"
     ],
     "a": 0,
     "ex": "I には am。I am not ～＝わたしは～ではない。"
    },
    {
     "t": "mc",
     "en": "I have (   ) apple.",
     "q": "「りんごを1つ持っている」",
     "ch": [
      "an",
      "a",
      "two",
      "×"
     ],
     "a": 0,
     "ex": "apple は母音の音 → an。"
    },
    {
     "t": "mc",
     "en": "I have three (   ).",
     "q": "「3冊の本」",
     "ch": [
      "books",
      "book",
      "a book",
      "an book"
     ],
     "a": 0,
     "ex": "three books＝3冊の本。2つ以上は s をつける。"
    },
    {
     "t": "mc",
     "q": "「あなたは先生ですか？」にあう英語は？",
     "ch": [
      "Are you a teacher?",
      "You are a teacher?",
      "Is you a teacher?",
      "Do you a teacher?"
     ],
     "a": 0,
     "ex": "Are を前に出して Are you ～?。"
    },
    {
     "t": "mc",
     "en": "Hi, I (   ) Ken.",
     "q": "「わたしはケンです」",
     "ch": [
      "am",
      "is",
      "are",
      "be"
     ],
     "a": 0,
     "ex": "自分の名前を言うときは I am ～。"
    },
    {
     "t": "mc",
     "en": "(   ) is my mother.",
     "q": "「彼女はわたしの母です」",
     "ch": [
      "She",
      "He",
      "It",
      "They"
     ],
     "a": 0,
     "ex": "女の人1人は She。"
    },
    {
     "t": "mc",
     "en": "(   ) is my father.",
     "q": "「彼はわたしの父です」",
     "ch": [
      "He",
      "She",
      "They",
      "We"
     ],
     "a": 0,
     "ex": "男の人1人は He。"
    },
    {
     "t": "mc",
     "en": "I like (   ).",
     "q": "「牛乳が好き」",
     "ch": [
      "milk",
      "milks",
      "a milk",
      "an milk"
     ],
     "a": 0,
     "ex": "milk は数えない名詞なので s も a もつけない。"
    },
    {
     "t": "mc",
     "en": "Tom and I (   ) friends.",
     "q": "(   ) に入る語は？",
     "ch": [
      "are",
      "am",
      "is",
      "be"
     ],
     "a": 0,
     "ex": "Tom and I は2人（複数）→ are。"
    }
   ],
   "technique": [
    {
     "t": "mc",
     "q": "【7級リーディング】絵に合う英文をえらぼう。 🐦 とんでいる鳥",
     "ch": [
      "The bird is flying.",
      "The bird is swimming.",
      "The bird is sleeping.",
      "The bird is eating."
     ],
     "a": 0,
     "ex": "動作 flying（とんでいる）に合う文を選ぶ。"
    },
    {
     "t": "mc",
     "q": "【7級リーディング】絵:🍽️ 食べている女の子 に合う英文は？",
     "ch": [
      "The girl is eating.",
      "The girl is running.",
      "The girl is reading.",
      "The girl is sleeping."
     ],
     "a": 0,
     "ex": "動作 eating。"
    },
    {
     "t": "mc",
     "q": "【7級リーディング】☀️ 晴れている絵に合う英文は？",
     "ch": [
      "It is sunny.",
      "It is raining.",
      "It is snowing.",
      "It is cloudy."
     ],
     "a": 0,
     "ex": "天気の表現。sunny＝晴れ。"
    },
    {
     "t": "mc",
     "q": "【7級リーディング】❄️ 雪がふっている絵に合う英文は？",
     "ch": [
      "It is snowing.",
      "It is sunny.",
      "It is raining.",
      "It is windy."
     ],
     "a": 0,
     "ex": "天気の表現。snowing＝雪がふっている。"
    },
    {
     "t": "mc",
     "q": "【7級リーディング】絵:🖊️赤いペン に合う英文は？",
     "ch": [
      "This is a red pen.",
      "This is a blue pen.",
      "This is a red book.",
      "This is a red bag."
     ],
     "a": 0,
     "ex": "色（red）と物（pen）が両方合うもの。"
    },
    {
     "t": "mc",
     "q": "【7級リーディング】絵:🐰 ジャンプしているうさぎ に合う英文は？",
     "ch": [
      "The rabbit is jumping.",
      "The rabbit is sleeping.",
      "The rabbit is swimming.",
      "The rabbit is eating."
     ],
     "a": 0,
     "ex": "動作 jumping。"
    },
    {
     "t": "mc",
     "q": "【7級リーディング】絵:👧📖 本を読んでいる女の子 に合う英文は？",
     "ch": [
      "The girl is reading.",
      "The girl is singing.",
      "The girl is running.",
      "The girl is eating."
     ],
     "a": 0,
     "ex": "動作 reading（読んでいる）。"
    },
    {
     "t": "mc",
     "q": "【7級リーディング】絵:🎤 歌っている男の子 に合う英文は？",
     "ch": [
      "The boy is singing.",
      "The boy is sleeping.",
      "The boy is swimming.",
      "The boy is reading."
     ],
     "a": 0,
     "ex": "動作 singing（歌っている）。"
    },
    {
     "t": "mc",
     "q": "【7級リーディング】絵:🧢青いぼうし に合う英文は？",
     "ch": [
      "This is a blue hat.",
      "This is a red hat.",
      "This is a blue bag.",
      "This is a blue cup."
     ],
     "a": 0,
     "ex": "色（blue）と物（hat）が両方合うもの。"
    },
    {
     "t": "mc",
     "q": "【7級リーディング】絵:🐶🐶 2匹の犬 に合う英文は？",
     "ch": [
      "These are two dogs.",
      "This is a dog.",
      "These are two cats.",
      "These are three dogs."
     ],
     "a": 0,
     "ex": "数（two）と動物（dogs）が合うもの。複数は These are。"
    },
    {
     "t": "mc",
     "q": "【7級リーディング】絵:🚶 歩いている男の人 に合う英文は？",
     "ch": [
      "The man is walking.",
      "The man is sleeping.",
      "The man is swimming.",
      "The man is flying."
     ],
     "a": 0,
     "ex": "動作 walking（歩いている）。"
    },
    {
     "t": "mc",
     "q": "【7級リスニング】質問『What is this?』、絵は 🐰。あう答えは？",
     "ch": [
      "It's a rabbit.",
      "It's a cat.",
      "It's a dog.",
      "It's a bird."
     ],
     "a": 0,
     "ex": "絵についての質問。rabbit＝うさぎ。"
    },
    {
     "t": "mc",
     "q": "【7級リスニング】絵:🍌 質問『What fruit is this?』 答えは？",
     "ch": [
      "It's a banana.",
      "It's an apple.",
      "It's an orange.",
      "It's a pen."
     ],
     "a": 0,
     "ex": "絵についての質問。果物 banana。"
    },
    {
     "t": "mc",
     "q": "【7級リスニング】絵:🥚🥚 質問『How many eggs?』",
     "ch": [
      "Two.",
      "One.",
      "Three.",
      "Four."
     ],
     "a": 0,
     "ex": "数を答える。Two。"
    },
    {
     "t": "mc",
     "q": "【7級リスニング】絵:👧 ねむっている女の子 質問『What is the girl doing?』",
     "ch": [
      "She is sleeping.",
      "She is running.",
      "She is eating.",
      "She is swimming."
     ],
     "a": 0,
     "ex": "動作を答える。sleeping。女の子なので She。"
    },
    {
     "t": "mc",
     "q": "【7級リスニング】絵:🐱 質問『Is this a cat?』 答えは？",
     "ch": [
      "Yes, it is.",
      "No, it isn't.",
      "Yes, I am.",
      "No, I'm not."
     ],
     "a": 0,
     "ex": "絵はねこなので Yes, it is.。Is this ～? には it で答える。"
    },
    {
     "t": "mc",
     "q": "【7級リスニング】絵:🐘 質問『Is this a dog?』 答えは？",
     "ch": [
      "No, it isn't.",
      "Yes, it is.",
      "Yes, I am.",
      "No, I'm not."
     ],
     "a": 0,
     "ex": "絵はぞうで犬ではないので No, it isn't.。"
    },
    {
     "t": "mc",
     "q": "【7級リスニング】絵:🟦 質問『What color is this?』 答えは？",
     "ch": [
      "It's blue.",
      "It's red.",
      "It's green.",
      "It's yellow."
     ],
     "a": 0,
     "ex": "色を答える。blue＝青。"
    },
    {
     "t": "mc",
     "q": "【7級リスニング】絵:🐟🐟🐟🐟 質問『How many fish?』",
     "ch": [
      "Four.",
      "Three.",
      "Five.",
      "Two."
     ],
     "a": 0,
     "ex": "数を答える。Four＝4。"
    },
    {
     "t": "mc",
     "q": "【7級リスニング】絵:👦🏊 泳いでいる男の子 質問『What is the boy doing?』",
     "ch": [
      "He is swimming.",
      "He is running.",
      "He is sleeping.",
      "He is reading."
     ],
     "a": 0,
     "ex": "動作を答える。swimming。男の子なので He。"
    },
    {
     "t": "mc",
     "q": "【7級リスニング】絵:🥚 質問『What is this?』 答えは？",
     "ch": [
      "It's an egg.",
      "It's an apple.",
      "It's a ball.",
      "It's a cup."
     ],
     "a": 0,
     "ex": "絵についての質問。egg＝たまご。母音の音で始まるので an egg。"
    },
    {
     "t": "mc",
     "q": "【7級リスニング】絵:🍎 赤いりんご 質問『What color is the apple?』",
     "ch": [
      "It's red.",
      "It's blue.",
      "It's green.",
      "It's black."
     ],
     "a": 0,
     "ex": "色を答える。red。"
    }
   ],
   "practice": [
    {
     "t": "mc",
     "en": "(   ) is she? — She is my mother.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Who",
      "What",
      "Where",
      "How"
     ],
     "a": 0,
     "ex": "人をたずねる Who。"
    },
    {
     "t": "mc",
     "en": "(   ) are you? — I'm fine.",
     "q": "(   ) に入る語は？",
     "ch": [
      "How",
      "What",
      "Who",
      "When"
     ],
     "a": 0,
     "ex": "How are you?＝元気？"
    },
    {
     "t": "mc",
     "q": "絵:🐱 白いねこ に合う英文は？",
     "ch": [
      "This is a white cat.",
      "This is a black cat.",
      "This is a white dog.",
      "This is a white bird."
     ],
     "a": 0,
     "ex": "色（white）と動物（cat）が両方合うもの。"
    },
    {
     "t": "mc",
     "en": "(   ) old is he? — He is ten.",
     "q": "(   ) に入る語は？",
     "ch": [
      "How",
      "What",
      "Who",
      "Where"
     ],
     "a": 0,
     "ex": "年齢をたずねる How old。"
    },
    {
     "t": "mc",
     "q": "絵:📗 緑の本 に合う英文は？",
     "ch": [
      "This is a green book.",
      "This is a red book.",
      "This is a green bag.",
      "This is a green pen."
     ],
     "a": 0,
     "ex": "色（green）と物（book）が両方合うもの。"
    },
    {
     "t": "mc",
     "en": "(   ) many pens? — Five.",
     "q": "(   ) に入る語は？",
     "ch": [
      "How",
      "What",
      "Who",
      "Where"
     ],
     "a": 0,
     "ex": "数をたずねる How many。"
    },
    {
     "t": "mc",
     "q": "絵:🍊🍊🍊 3つのオレンジ に合う英文は？",
     "ch": [
      "These are three oranges.",
      "This is an orange.",
      "These are two oranges.",
      "These are three apples."
     ],
     "a": 0,
     "ex": "数（three）と物（oranges）が合うもの。複数 These are。"
    },
    {
     "t": "mc",
     "en": "(   ) you like cats? — No, I don't.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Do",
      "Are",
      "Is",
      "Am"
     ],
     "a": 0,
     "ex": "一般動詞 like の疑問文、主語 you → Do。答えの don't もヒント。"
    },
    {
     "t": "mc",
     "en": "What (   ) your name? — Ken.",
     "q": "(   ) に入る語は？",
     "ch": [
      "is",
      "am",
      "are",
      "do"
     ],
     "a": 0,
     "ex": "your name（名前）は1つ → is。"
    },
    {
     "t": "mc",
     "q": "絵:🐦 青い鳥 に合う英文は？",
     "ch": [
      "This is a blue bird.",
      "This is a blue fish.",
      "This is a yellow bird.",
      "This is a blue cat."
     ],
     "a": 0,
     "ex": "色（blue）と動物（bird）が両方合うもの。"
    },
    {
     "t": "mc",
     "en": "(   ) this a dog? — Yes, it's my dog.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Is",
      "Are",
      "Do",
      "Am"
     ],
     "a": 0,
     "ex": "主語が this（単数）なので be動詞は Is。Do はふつうの動詞の疑問文に使う。"
    },
    {
     "t": "mc",
     "en": "I (   ) ten years old.",
     "q": "「わたしは10歳です」",
     "ch": [
      "am",
      "is",
      "are",
      "have"
     ],
     "a": 0,
     "ex": "I には am。I am ～ years old.＝〜歳です。"
    },
    {
     "t": "mc",
     "q": "絵:🚶‍♀️ 歩いている女の子 に合う英文は？",
     "ch": [
      "The girl is walking.",
      "The girl is swimming.",
      "The girl is sleeping.",
      "The boy is walking."
     ],
     "a": 0,
     "ex": "人（girl）と動作（walking）が両方合うもの。"
    },
    {
     "t": "mc",
     "en": "(   ) you a student? — Yes, I am.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Are",
      "Is",
      "Do",
      "Am"
     ],
     "a": 0,
     "ex": "you には Are。答えの I am もヒント。"
    },
    {
     "t": "mc",
     "q": "絵:🐶🐶🐶 3匹の犬 に合う英文は？",
     "ch": [
      "These are three dogs.",
      "These are two dogs.",
      "This is a dog.",
      "These are three cats."
     ],
     "a": 0,
     "ex": "数（three）と動物（dogs）が合うもの。"
    },
    {
     "t": "mc",
     "en": "Nice to (   ) you.",
     "q": "「はじめまして」",
     "ch": [
      "meet",
      "play",
      "go",
      "eat"
     ],
     "a": 0,
     "ex": "Nice to meet you.＝はじめまして。"
    }
   ]
  },
  "pre2": {
   "vocab": [
    {
     "t": "mc",
     "en": "The city plans to (   ) a new bridge across the river next year.",
     "q": "(   ) に入る語は？",
     "ch": [
      "construct",
      "complain",
      "admire",
      "behave"
     ],
     "a": 0,
     "ex": "construct＝建設する。a new bridge を目的語にとる。"
    },
    {
     "t": "fill",
     "q": "「〜を避ける」を英語で（a で始まる）。",
     "a": "avoid",
     "ex": "avoid＝避ける。avoid ＋動名詞の形も重要。"
    },
    {
     "t": "mc",
     "en": "Please (   ) your seat belt before the plane takes off.",
     "q": "(   ) に入る語は？",
     "ch": [
      "fasten",
      "forgive",
      "spoil",
      "delay"
     ],
     "a": 0,
     "ex": "fasten one's seat belt＝シートベルトを締める。"
    },
    {
     "t": "mc",
     "en": "The old castle (   ) thousands of visitors every year.",
     "q": "(   ) に入る語は？",
     "ch": [
      "attracts",
      "avoids",
      "borrows",
      "retires"
     ],
     "a": 0,
     "ex": "attract＝引きつける。attract visitors＝観光客を集める。"
    },
    {
     "t": "fill",
     "q": "「〜を解決する」を英語で（s で始まる）。",
     "a": "solve",
     "ex": "solve＝解決する。solve a problem。"
    },
    {
     "t": "mc",
     "en": "She was deeply (   ) by the view from the top of the mountain.",
     "q": "(   ) に入る語は？",
     "ch": [
      "impressed",
      "exchanged",
      "delayed",
      "measured"
     ],
     "a": 0,
     "ex": "be impressed by＝〜に感動する。"
    },
    {
     "t": "mc",
     "en": "After a long discussion, the two sides finally reached an (   ).",
     "q": "(   ) に入る語は？",
     "ch": [
      "agreement",
      "accident",
      "ability",
      "average"
     ],
     "a": 0,
     "ex": "reach an agreement＝合意に達する。"
    },
    {
     "t": "fill",
     "q": "「増える・〜を増やす」を英語で（i で始まる）。",
     "a": "increase",
     "ex": "increase＝増える・増やす。反対は decrease。"
    },
    {
     "t": "mc",
     "en": "The teacher asked us to (   ) our essays by Friday.",
     "q": "(   ) に入る語は？",
     "ch": [
      "submit",
      "appear",
      "disappear",
      "retire"
     ],
     "a": 0,
     "ex": "submit＝提出する。by Friday（金曜までに）と相性がよい。"
    },
    {
     "t": "mc",
     "en": "This medicine will (   ) the pain in your back.",
     "q": "(   ) に入る語は？",
     "ch": [
      "relieve",
      "require",
      "remind",
      "remain"
     ],
     "a": 0,
     "ex": "relieve＝（痛みなどを）やわらげる。"
    },
    {
     "t": "fill",
     "q": "「〜を含む」を英語で（i で始まる）。",
     "a": "include",
     "ex": "include＝含む。The price includes tax.＝価格は税込み。"
    },
    {
     "t": "mc",
     "en": "The train is (   ) to arrive at seven, but it is often late.",
     "q": "(   ) に入る語は？",
     "ch": [
      "supposed",
      "capable",
      "afraid",
      "familiar"
     ],
     "a": 0,
     "ex": "be supposed to＝〜することになっている。"
    },
    {
     "t": "mc",
     "en": "We had to (   ) the picnic because of the heavy rain.",
     "q": "(   ) に入る語は？",
     "ch": [
      "postpone",
      "remind",
      "admire",
      "encourage"
     ],
     "a": 0,
     "ex": "postpone＝延期する（put off）。"
    },
    {
     "t": "fill",
     "q": "「〜を比べる」を英語で（c で始まる）。",
     "a": "compare",
     "ex": "compare＝比べる。compare A with B。"
    },
    {
     "t": "mc",
     "en": "Her parents (   ) her to study abroad after high school.",
     "q": "(   ) に入る語は？",
     "ch": [
      "encouraged",
      "refused",
      "delayed",
      "surrounded"
     ],
     "a": 0,
     "ex": "encourage 人 to＋原形＝人に〜するよう勧める。"
    },
    {
     "t": "mc",
     "en": "That shop sells good clothes at (   ) prices.",
     "q": "(   ) に入る語は？",
     "ch": [
      "reasonable",
      "ancient",
      "nervous",
      "polite"
     ],
     "a": 0,
     "ex": "reasonable＝（値段が）手ごろな。"
    },
    {
     "t": "fill",
     "q": "「〜を説明する」を英語で（e で始まる）。",
     "a": "explain",
     "ex": "explain＝説明する。explain A to B の語順に注意。"
    },
    {
     "t": "mc",
     "en": "The scientists did an (   ) to test their new idea.",
     "q": "(   ) に入る語は？",
     "ch": [
      "experiment",
      "example",
      "expression",
      "exhibition"
     ],
     "a": 0,
     "ex": "do an experiment＝実験をする。"
    },
    {
     "t": "mc",
     "en": "I'm so sorry. I (   ) forgot about our meeting.",
     "q": "(   ) に入る語は？",
     "ch": [
      "completely",
      "hardly",
      "occasionally",
      "politely"
     ],
     "a": 0,
     "ex": "completely＝完全に・すっかり。forgot を強める副詞。"
    },
    {
     "t": "fill",
     "q": "「地元の・その地域の」を英語で（l で始まる）。",
     "a": "local",
     "ex": "local＝地元の。local people＝地元の人々。"
    },
    {
     "t": "mc",
     "en": "The success of the festival (   ) on the weather.",
     "q": "(   ) に入る語は？",
     "ch": [
      "depends",
      "consists",
      "results",
      "belongs"
     ],
     "a": 0,
     "ex": "depend on＝〜しだいである・〜に左右される。"
    },
    {
     "t": "mc",
     "en": "I am (   ) with my new job because the people are friendly.",
     "q": "(   ) に入る語は？",
     "ch": [
      "satisfied",
      "disappointed",
      "crowded",
      "delayed"
     ],
     "a": 0,
     "ex": "be satisfied with＝〜に満足している。"
    },
    {
     "t": "fill",
     "q": "「社会」を英語で（s で始まる）。",
     "a": "society",
     "ex": "society＝社会。形容詞は social。"
    },
    {
     "t": "mc",
     "en": "In (   ), the test was much easier than I had expected.",
     "q": "(   ) に入る語は？",
     "ch": [
      "fact",
      "spite",
      "order",
      "front"
     ],
     "a": 0,
     "ex": "in fact＝実際は・実は。"
    }
   ],
   "grammar": [
    {
     "t": "mc",
     "en": "The girl (   ) the piano over there is my cousin.",
     "q": "(   ) に入る語は？",
     "ch": [
      "playing",
      "played",
      "plays",
      "play"
     ],
     "a": 0,
     "ex": "現在分詞の後置修飾：the girl playing the piano＝ピアノを弾いている少女。"
    },
    {
     "t": "mc",
     "en": "This is a letter (   ) in English by my grandfather.",
     "q": "(   ) に入る語は？",
     "ch": [
      "written",
      "writing",
      "wrote",
      "writes"
     ],
     "a": 0,
     "ex": "過去分詞の後置修飾：a letter written in English＝英語で書かれた手紙。"
    },
    {
     "t": "mc",
     "en": "I still remember the day (   ) we first met.",
     "q": "(   ) に入る語は？",
     "ch": [
      "when",
      "which",
      "where",
      "what"
     ],
     "a": 0,
     "ex": "時を表す先行詞 the day には関係副詞 when。"
    },
    {
     "t": "mc",
     "en": "This is the town (   ) I was born.",
     "q": "(   ) に入る語は？",
     "ch": [
      "where",
      "which",
      "when",
      "who"
     ],
     "a": 0,
     "ex": "場所を表す先行詞 the town には関係副詞 where。"
    },
    {
     "t": "mc",
     "en": "I wish I (   ) speak French like you.",
     "q": "(   ) に入る語は？",
     "ch": [
      "could",
      "can",
      "will",
      "am"
     ],
     "a": 0,
     "ex": "I wish＋仮定法過去：現在の事実に反する願望は could。"
    },
    {
     "t": "mc",
     "en": "If it (   ) tomorrow, the game will be canceled.",
     "q": "(   ) に入る語は？",
     "ch": [
      "rains",
      "will rain",
      "rained",
      "rain"
     ],
     "a": 0,
     "ex": "条件の if 節では未来のことも現在形で表す。"
    },
    {
     "t": "mc",
     "en": "My mother made me (   ) the dishes after dinner.",
     "q": "(   ) に入る語は？",
     "ch": [
      "wash",
      "to wash",
      "washing",
      "washed"
     ],
     "a": 0,
     "ex": "使役動詞 make＋人＋原形。"
    },
    {
     "t": "mc",
     "en": "My parents let me (   ) out late last Saturday.",
     "q": "(   ) に入る語は？",
     "ch": [
      "stay",
      "to stay",
      "staying",
      "stayed"
     ],
     "a": 0,
     "ex": "使役動詞 let＋人＋原形＝人に〜させてやる。"
    },
    {
     "t": "mc",
     "en": "I had my bike (   ) at the shop yesterday.",
     "q": "(   ) に入る語は？",
     "ch": [
      "repaired",
      "repair",
      "repairing",
      "repairs"
     ],
     "a": 0,
     "ex": "have＋物＋過去分詞＝物を〜してもらう。"
    },
    {
     "t": "mc",
     "en": "It is said (   ) he is one of the best doctors in the city.",
     "q": "(   ) に入る語は？",
     "ch": [
      "that",
      "which",
      "what",
      "who"
     ],
     "a": 0,
     "ex": "It is said that ～＝〜と言われている。"
    },
    {
     "t": "mc",
     "en": "The news made everyone (   ).",
     "q": "(   ) に入る語は？",
     "ch": [
      "happy",
      "happily",
      "happiness",
      "to be happy"
     ],
     "a": 0,
     "ex": "make＋人＋形容詞＝人を〜にする。"
    },
    {
     "t": "mc",
     "en": "I have no idea (   ) to do next.",
     "q": "(   ) に入る語は？",
     "ch": [
      "what",
      "that",
      "if",
      "because"
     ],
     "a": 0,
     "ex": "疑問詞＋to不定詞：what to do＝何をすべきか。"
    },
    {
     "t": "mc",
     "en": "I don't like coffee, and (   ) does my sister.",
     "q": "(   ) に入る語は？",
     "ch": [
      "neither",
      "so",
      "either",
      "too"
     ],
     "a": 0,
     "ex": "否定文を受けて「〜もまた…ない」は neither＋do＋主語。"
    },
    {
     "t": "mc",
     "en": "This is (   ) most exciting game I have ever watched.",
     "q": "(   ) に入る語は？",
     "ch": [
      "the",
      "an",
      "much",
      "very"
     ],
     "a": 0,
     "ex": "最上級には the。the most ～ I have ever ～。"
    },
    {
     "t": "mc",
     "en": "Nobody knows (   ) she will come to the party or not.",
     "q": "(   ) に入る語は？",
     "ch": [
      "whether",
      "that",
      "what",
      "because"
     ],
     "a": 0,
     "ex": "whether ～ or not＝〜かどうか。"
    },
    {
     "t": "mc",
     "en": "He kept (   ) at the painting for a long time.",
     "q": "(   ) に入る語は？",
     "ch": [
      "looking",
      "to look",
      "look",
      "looked"
     ],
     "a": 0,
     "ex": "keep＋動名詞＝〜し続ける。"
    },
    {
     "t": "mc",
     "en": "(   ) she was tired, she went on working until midnight.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Although",
      "Because of",
      "So",
      "In spite of"
     ],
     "a": 0,
     "ex": "although＝〜だけれども（譲歩）。Because of / In spite of のあとは名詞（節は置けない）。"
    },
    {
     "t": "mc",
     "en": "We were all surprised (   ) the result of the game.",
     "q": "(   ) に入る語は？",
     "ch": [
      "at",
      "on",
      "for",
      "in"
     ],
     "a": 0,
     "ex": "be surprised at＝〜に驚く。"
    },
    {
     "t": "mc",
     "en": "She has lived in this town (   ) she was a child.",
     "q": "(   ) に入る語は？",
     "ch": [
      "since",
      "for",
      "during",
      "until"
     ],
     "a": 0,
     "ex": "現在完了＋since＋過去の文＝〜以来。"
    },
    {
     "t": "mc",
     "en": "(   ) a strange sound behind him, the little boy ran away.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Hearing",
      "Heard",
      "Hear",
      "Hears"
     ],
     "a": 0,
     "ex": "分詞構文：Hearing ～＝〜を聞いて（＝When he heard ～）。"
    },
    {
     "t": "mc",
     "en": "(   ) I study, the better my scores become.",
     "q": "(   ) に入る語は？",
     "ch": [
      "The harder",
      "Harder",
      "The hard",
      "Hardest"
     ],
     "a": 0,
     "ex": "The＋比較級 ～, the＋比較級 …＝〜すればするほど…。"
    },
    {
     "t": "mc",
     "en": "I'll lend you the book as soon as I (   ) reading it.",
     "q": "(   ) に入る語は？",
     "ch": [
      "finish",
      "will finish",
      "finished",
      "finishing"
     ],
     "a": 0,
     "ex": "時を表す as soon as 節では未来を現在形で表す。"
    },
    {
     "t": "mc",
     "en": "He asked me (   ) I liked the movie.",
     "q": "(   ) に入る語は？",
     "ch": [
      "if",
      "that",
      "what",
      "whom"
     ],
     "a": 0,
     "ex": "ask＋人＋if ～＝〜かどうかたずねる。"
    },
    {
     "t": "mc",
     "en": "My father (   ) smoke, but he quit last year.",
     "q": "(   ) に入る語は？",
     "ch": [
      "used to",
      "is used to",
      "was used",
      "uses"
     ],
     "a": 0,
     "ex": "used to＋原形＝以前は〜していた（今はしていない）。"
    }
   ],
   "technique": [
    {
     "t": "mc",
     "en": "A: Excuse me, could you tell me how to get to the station? B: (   )",
     "q": "【準2級・聞く/話す】道をたずねられた応答は？",
     "ch": [
      "Sure. Go straight and turn left at the bank.",
      "Yes, I was.",
      "It's my pleasure to meet you.",
      "I'd rather not go there with you this weekend."
     ],
     "a": 0,
     "ex": "道案内の依頼には Sure. と承知して道順を答える。"
    },
    {
     "t": "mc",
     "en": "A: I'm sorry I'm late. The bus was delayed. B: (   )",
     "q": "【準2級・聞く/話す】謝罪への応答は？",
     "ch": [
      "That's all right. We've just started.",
      "Yes, I did.",
      "I'll take two of them, please. How much are they?",
      "No, I'm a student."
     ],
     "a": 0,
     "ex": "遅刻の謝罪には That's all right.（大丈夫）と返す。"
    },
    {
     "t": "mc",
     "en": "A: What do you think of the new cafeteria menu? B: (   )",
     "q": "【準2級・聞く/話す】意見を求められた応答は？",
     "ch": [
      "It's much better than before.",
      "At eleven thirty.",
      "Yes, I am.",
      "It's on the second floor, next to the library."
     ],
     "a": 0,
     "ex": "What do you think of ～? には感想・意見で答える。"
    },
    {
     "t": "mc",
     "en": "A: Shall I carry those bags for you? B: (   )",
     "q": "【準2級・聞く/話す】手伝いの申し出への応答は？",
     "ch": [
      "That's very kind of you.",
      "Yes, you are.",
      "It's two dollars.",
      "Turn left at the corner."
     ],
     "a": 0,
     "ex": "Shall I ～?（〜しましょうか）の申し出に感謝して受ける。"
    },
    {
     "t": "mc",
     "en": "A: I've got two tickets for the concert. Would you like to come? B: (   )",
     "q": "【準2級・聞く/話す】誘いへの応答は？",
     "ch": [
      "I'd love to. When is it?",
      "Yes, I was.",
      "It's near the park.",
      "No, I haven't seen him since last Friday."
     ],
     "a": 0,
     "ex": "Would you like to ～? の誘いに I'd love to. で応じ日時を確認する。"
    },
    {
     "t": "mc",
     "en": "A: How often do you go to the gym? B: (   )",
     "q": "【準2級・聞く/話す】自然な応答は？",
     "ch": [
      "Twice a week, usually.",
      "For two hours.",
      "By bus.",
      "Since last year, when I moved here."
     ],
     "a": 0,
     "ex": "How often（頻度）には twice a week などで答える。"
    },
    {
     "t": "mc",
     "en": "A: Excuse me, is this seat taken? B: (   )",
     "q": "【準2級・聞く/話す】自然な応答は？",
     "ch": [
      "No, go ahead.",
      "Yes, I'm sixteen.",
      "It takes ten minutes.",
      "No, I don't like it."
     ],
     "a": 0,
     "ex": "Is this seat taken?（この席は空いていますか）には No, go ahead.（どうぞ）。"
    },
    {
     "t": "mc",
     "en": "A: I failed my driving test again. B: (   )",
     "q": "【準2級・聞く/話す】落ち込む相手への応答は？",
     "ch": [
      "Don't give up. You'll pass next time.",
      "Congratulations!",
      "That's a good price.",
      "I'd like a window seat on the morning flight."
     ],
     "a": 0,
     "ex": "失敗した相手には励ましの言葉を返す。"
    },
    {
     "t": "mc",
     "q": "【準2級・聞く】店内放送: Attention, shoppers. The store will close in ten minutes. Please bring your items to the cashier. 質問: What should shoppers do?",
     "ch": [
      "Go to the cashier soon.",
      "Leave their items on the shelves.",
      "Come back tomorrow morning.",
      "Wait for the store to open."
     ],
     "a": 0,
     "ex": "Please bring your items to the cashier が指示。"
    },
    {
     "t": "mc",
     "q": "【準2級・聞く】A: Hi, this is Ken. Can I speak to Ms. Brown? B: I'm sorry, she's in a meeting now. Can I take a message? 質問: What is Ms. Brown doing?",
     "ch": [
      "Attending a meeting.",
      "Taking a message.",
      "Talking to Ken on the phone.",
      "Leaving the office."
     ],
     "a": 0,
     "ex": "she's in a meeting now から。"
    },
    {
     "t": "mc",
     "q": "【準2級・聞く】Yuki wanted to buy a sweater, but the store didn't have her size. The clerk said it would arrive next Tuesday. 質問: Why didn't Yuki buy the sweater?",
     "ch": [
      "Her size was not available.",
      "It was too expensive.",
      "The store was closed.",
      "She didn't like the color of the sweater."
     ],
     "a": 0,
     "ex": "the store didn't have her size が理由。"
    },
    {
     "t": "mc",
     "q": "【準2級・読む】掲示: Science Fair — Saturday, May 10, 1 p.m. to 4 p.m., in the gym. Students who want to show their projects must write their names on the list in the science room by May 1. 質問: What must students do to show a project?",
     "ch": [
      "Sign up by May 1.",
      "Come to the gym by 1 p.m. on May 1.",
      "Pay a fee at the gym.",
      "Bring a letter from a teacher."
     ],
     "a": 0,
     "ex": "must write their names on the list ... by May 1＝5月1日までに申し込む（sign up）。"
    },
    {
     "t": "mc",
     "q": "【準2級・読む】Eメール: Hi Mia, thanks for inviting me to your birthday party. Unfortunately, I have a piano recital that day, so I can't come. Let's have lunch together next week instead. Kana 質問: Why can't Kana go to the party?",
     "ch": [
      "She has a piano recital.",
      "She is going to lunch that day.",
      "She was not invited.",
      "She has to work."
     ],
     "a": 0,
     "ex": "I have a piano recital that day, so I can't come。"
    },
    {
     "t": "mc",
     "q": "【準2級・読む】長文: Many people think chocolate was first eaten as a sweet. In fact, it was first drunk as a bitter drink in Central America hundreds of years ago. 質問: What is true about early chocolate?",
     "ch": [
      "It was a bitter drink.",
      "It was a sweet snack.",
      "It came from Europe.",
      "It was eaten with bread."
     ],
     "a": 0,
     "ex": "In fact 以下が事実：a bitter drink。"
    },
    {
     "t": "mc",
     "en": "Ken wanted to improve his English, so he decided to (   ). Now he talks with a student from Canada online every evening.",
     "q": "【準2級・読む】文脈に合う語句は？",
     "ch": [
      "find a language partner",
      "stop studying English",
      "move to a bigger house",
      "buy a new bicycle"
     ],
     "a": 0,
     "ex": "次の文「カナダの学生と毎晩オンラインで話す」につながるのは language partner を見つけること。"
    },
    {
     "t": "mc",
     "q": "【準2級・読む】長文: The restaurant was so popular that we waited for an hour. However, the food was worth the wait. 質問: What does the writer think about the restaurant?",
     "ch": [
      "The food was good enough to wait for.",
      "It was not worth visiting because of the long wait.",
      "The service was fast.",
      "The food was cheap."
     ],
     "a": 0,
     "ex": "worth the wait＝待つ価値があった。"
    },
    {
     "t": "mc",
     "en": "I ran (   ) an old friend at the station yesterday.",
     "q": "【準2級・大問1】(   ) に合う語は？",
     "ch": [
      "into",
      "out",
      "off",
      "up"
     ],
     "a": 0,
     "ex": "run into＝〜に偶然出会う。"
    },
    {
     "t": "mc",
     "en": "She really takes (   ) her mother. They both love music.",
     "q": "【準2級・大問1】(   ) に合う語は？",
     "ch": [
      "after",
      "off",
      "over",
      "away"
     ],
     "a": 0,
     "ex": "take after＝（親などに）似ている。"
    },
    {
     "t": "mc",
     "en": "I think students should do volunteer work. (   ), they can learn how to help others.",
     "q": "【準2級・書く】意見の理由を導くつなぎ語は？",
     "ch": [
      "First of all",
      "However",
      "On the other hand",
      "In contrast"
     ],
     "a": 0,
     "ex": "意見のあとに1つ目の理由を述べるときは First of all。他は対比・逆接。"
    },
    {
     "t": "mc",
     "q": "【準2級・書く】意見文「学校の制服は必要か」の結論の文として自然なものは？",
     "ch": [
      "For these reasons, I think school uniforms are necessary.",
      "By the way, I like my uniform.",
      "Also, my school has many strict rules about clothes and hair.",
      "Do you like uniforms?"
     ],
     "a": 0,
     "ex": "結論は For these reasons, I think ～ で意見をまとめる。"
    },
    {
     "t": "mc",
     "en": "You asked me what I want to do in Japan. (   )",
     "q": "【準2級・書く】Eメール返信で、相手の質問に答える文として適切なものは？",
     "ch": [
      "I'd like to visit Kyoto and see old temples.",
      "Japan has four seasons, and each one is beautiful.",
      "What do you want to do?",
      "Thank you for your e-mail."
     ],
     "a": 0,
     "ex": "what I want to do に対して自分のしたいことを答える。"
    },
    {
     "t": "mc",
     "en": "I have two reasons. First, it is good for our health. (   ), it does not cost much money.",
     "q": "【準2級・書く】2つ目の理由を導く (   ) に合う語は？",
     "ch": [
      "Second",
      "However",
      "For example",
      "In conclusion"
     ],
     "a": 0,
     "ex": "First, … に続けて2つ目の理由は Second, …。However は逆接、In conclusion は結論。"
    }
   ],
   "practice": [
    {
     "t": "mc",
     "en": "He gave up (   ) because of his health.",
     "q": "(   ) に入る語は？",
     "ch": [
      "smoking",
      "to smoke",
      "smoke",
      "smoked"
     ],
     "a": 0,
     "ex": "give up＋動名詞＝〜をやめる。"
    },
    {
     "t": "mc",
     "en": "The report must (   ) by Monday morning.",
     "q": "(   ) に入る語は？",
     "ch": [
      "be finished",
      "finish",
      "finishing",
      "be finishing"
     ],
     "a": 0,
     "ex": "助動詞＋受動態：must be＋過去分詞。"
    },
    {
     "t": "mc",
     "en": "She is good (   ) solving difficult problems.",
     "q": "(   ) に入る語は？",
     "ch": [
      "at",
      "in",
      "on",
      "for"
     ],
     "a": 0,
     "ex": "be good at＋動名詞＝〜が得意。"
    },
    {
     "t": "mc",
     "en": "I'm afraid I can't (   ) with you on this point.",
     "q": "(   ) に入る語は？",
     "ch": [
      "agree",
      "accept",
      "allow",
      "admit"
     ],
     "a": 0,
     "ex": "agree with 人＝人に同意する。"
    },
    {
     "t": "mc",
     "q": "英文: Because of the heavy snow, all the trains stopped, so Daiki had to stay at a hotel near the station. 質問: Why did Daiki stay at a hotel?",
     "ch": [
      "The trains stopped because of the snow.",
      "He was on a business trip.",
      "He wanted to see the snow.",
      "His car broke down."
     ],
     "a": 0,
     "ex": "Because of the heavy snow, all the trains stopped が理由。"
    },
    {
     "t": "mc",
     "en": "The population of this city is much (   ) than that of my town.",
     "q": "(   ) に入る語は？",
     "ch": [
      "larger",
      "more",
      "largest",
      "much"
     ],
     "a": 0,
     "ex": "population（人口）の大小は large / small で表す。"
    },
    {
     "t": "mc",
     "en": "I would rather stay home (   ) go out tonight.",
     "q": "(   ) に入る語は？",
     "ch": [
      "than",
      "to",
      "but",
      "instead"
     ],
     "a": 0,
     "ex": "would rather A than B＝BよりむしろAしたい。"
    },
    {
     "t": "mc",
     "en": "This is the first time I (   ) sushi.",
     "q": "(   ) に入る語は？",
     "ch": [
      "have eaten",
      "was eating",
      "ate",
      "am eating"
     ],
     "a": 0,
     "ex": "This is the first time＋現在完了＝〜するのは初めてだ。"
    },
    {
     "t": "mc",
     "en": "She spent two hours (   ) her room.",
     "q": "(   ) に入る語は？",
     "ch": [
      "cleaning",
      "to clean",
      "clean",
      "cleaned"
     ],
     "a": 0,
     "ex": "spend＋時間＋動名詞＝〜して時間を過ごす。"
    },
    {
     "t": "mc",
     "q": "英文: The city built a new bike road along the river last year. Since then, the number of people who ride bikes to work has doubled. 質問: What happened after the bike road was built?",
     "ch": [
      "More people started riding bikes to work.",
      "The river became cleaner.",
      "Fewer people used bikes.",
      "The road was closed."
     ],
     "a": 0,
     "ex": "the number ... has doubled＝人数が2倍になった。"
    },
    {
     "t": "mc",
     "en": "It (   ) me three hours to finish the homework.",
     "q": "(   ) に入る語は？",
     "ch": [
      "took",
      "spent",
      "cost",
      "paid"
     ],
     "a": 0,
     "ex": "It takes 人 時間 to ～＝人が〜するのに時間がかかる。"
    },
    {
     "t": "mc",
     "en": "There is (   ) water left in the bottle, so let's buy some.",
     "q": "(   ) に入る語は？",
     "ch": [
      "little",
      "few",
      "a few",
      "many"
     ],
     "a": 0,
     "ex": "数えない名詞 water には little（ほとんどない）。"
    },
    {
     "t": "mc",
     "en": "Please let me know (   ) you need any help.",
     "q": "(   ) に入る語は？",
     "ch": [
      "if",
      "that",
      "what",
      "which"
     ],
     "a": 0,
     "ex": "let me know if ～＝もし〜なら知らせて。"
    },
    {
     "t": "mc",
     "q": "英文: At Midori High School, students can choose one of three foreign languages: French, Korean, or Chinese. This year, Korean was the most popular choice. 質問: What is true about Midori High School?",
     "ch": [
      "Students can learn Korean there.",
      "French is the most popular language.",
      "Students must study all three languages.",
      "Chinese is not taught."
     ],
     "a": 0,
     "ex": "3言語から1つ選べる。今年いちばん人気は Korean。"
    },
    {
     "t": "mc",
     "en": "The weather was (   ) cold that we stayed indoors all day.",
     "q": "(   ) に入る語は？",
     "ch": [
      "so",
      "such",
      "very",
      "too"
     ],
     "a": 0,
     "ex": "so＋形容詞＋that ～＝とても…なので〜。"
    },
    {
     "t": "mc",
     "en": "A: I've never been to Hokkaido. B: (   ) It's beautiful in winter.",
     "q": "自然な応答は？",
     "ch": [
      "You should go there.",
      "Yes, I did.",
      "It's on the first floor.",
      "It costs ten dollars."
     ],
     "a": 0,
     "ex": "行ったことがない相手に「行くべきだ」と勧め、理由を続ける流れ。"
    }
   ],
   "reading": [
    {
     "t": "mc",
     "p": "gpre2_bike_sharing",
     "q": "質問: How much does it cost to use a bike for twenty minutes?",
     "ch": [
      "Just 100 yen.",
      "Two hundred yen.",
      "It is free.",
      "One hundred yen for each ten minutes."
     ],
     "a": 0,
     "ex": "第1段落 The first thirty minutes cost only one hundred yen（20分は30分以内）。"
    },
    {
     "t": "mc",
     "p": "gpre2_bike_sharing",
     "q": "質問: What is one change the service has brought to the city?",
     "ch": [
      "The air in the city center has become cleaner.",
      "More cars come to the city center.",
      "Shops near the stations have closed.",
      "People stopped using bikes."
     ],
     "a": 0,
     "ex": "第2段落 fewer cars ... the air has become cleaner。"
    },
    {
     "t": "mc",
     "p": "gpre2_bike_sharing",
     "q": "質問: Why do shops near the stations have more customers?",
     "ch": [
      "Riders stop and look around the shops.",
      "The shops sell bikes.",
      "The shops give free bikes.",
      "The city pays the shops to put stations near them."
     ],
     "a": 0,
     "ex": "第2段落 because riders stop and look around。"
    },
    {
     "t": "mc",
     "p": "gpre2_bike_sharing",
     "q": "質問: What problem does the city have?",
     "ch": [
      "Some riders do not return their bikes to a station.",
      "The city cannot collect the bikes from the stations.",
      "The bikes are too expensive.",
      "Nobody uses the service."
     ],
     "a": 0,
     "ex": "第3段落 some bikes are left in parks or on the street＝ステーションに返さない人がいる。"
    },
    {
     "t": "mc",
     "p": "gpre2_bike_sharing",
     "q": "質問: What is the city planning to do?",
     "ch": [
      "Give discounts to people who return bikes to a station.",
      "Close some of the stations.",
      "Raise the price for the first thirty minutes to collect more money.",
      "Buy more cars."
     ],
     "a": 0,
     "ex": "第3段落 planning to give small discounts to people who always return their bikes。"
    },
    {
     "t": "mc",
     "p": "gpre2_shelter_email",
     "q": "質問: What does Emily do at the shelter on weekends?",
     "ch": [
      "She walks the dogs and cleans their rooms.",
      "She sells pet food.",
      "She teaches children.",
      "She cooks lunch for the staff and the visitors."
     ],
     "a": 0,
     "ex": "第1段落 I walk the dogs and clean their rooms。"
    },
    {
     "t": "mc",
     "p": "gpre2_shelter_email",
     "q": "質問: What kind of animals does the shelter take care of?",
     "ch": [
      "Dogs and cats without a home.",
      "Wild birds that have lost their homes.",
      "Horses from a farm.",
      "Fish from the river."
     ],
     "a": 0,
     "ex": "第1段落 dogs and cats that have lost their homes＝家のない犬や猫。"
    },
    {
     "t": "mc",
     "p": "gpre2_shelter_email",
     "q": "質問: When is the open day?",
     "ch": [
      "This coming Saturday.",
      "Next Sunday afternoon.",
      "This Friday.",
      "Every Saturday and Sunday."
     ],
     "a": 0,
     "ex": "第2段落 Next Saturday, the shelter is holding an open day。"
    },
    {
     "t": "mc",
     "p": "gpre2_shelter_email",
     "q": "質問: What must a volunteer do?",
     "ch": [
      "Visit the shelter two or more times a month.",
      "Sign up at the front desk at least twice a month.",
      "Be younger than fifteen.",
      "Bring a pet."
     ],
     "a": 0,
     "ex": "第2段落 come at least twice a month＝月に2回以上来る。"
    },
    {
     "t": "mc",
     "p": "gpre2_shelter_email",
     "q": "質問: What does Emily offer to do for Sora?",
     "ch": [
      "Go with her and introduce her to the staff.",
      "Give her a dog.",
      "Pay for her ticket.",
      "Write a report about the shelter for her school."
     ],
     "a": 0,
     "ex": "第3段落 We could go together, and I can introduce you to the staff。"
    },
    {
     "t": "mc",
     "p": "gpre2_sports_day_notice",
     "q": "質問: Why was Sports Day moved to another day?",
     "ch": [
      "A typhoon is expected.",
      "The gym is being repaired.",
      "Many students are sick.",
      "The teachers are busy."
     ],
     "a": 0,
     "ex": "第1段落 Because of the typhoon expected this week。"
    },
    {
     "t": "mc",
     "p": "gpre2_sports_day_notice",
     "q": "質問: When will Sports Day be held now?",
     "ch": [
      "On Wednesday, September 17.",
      "On Friday, September 12.",
      "On Wednesday, September 12.",
      "On Friday, September 17."
     ],
     "a": 0,
     "ex": "第1段落 moved to Wednesday, September 17。"
    },
    {
     "t": "mc",
     "p": "gpre2_sports_day_notice",
     "q": "質問: What time will the relay race start?",
     "ch": [
      "At half past nine in the morning.",
      "At 10 a.m., the same time as before.",
      "At 8:30 a.m., when students arrive.",
      "At noon."
     ],
     "a": 0,
     "ex": "第2段落 start at 9:30 a.m.（＝half past nine）instead of 10 a.m.。"
    },
    {
     "t": "mc",
     "p": "gpre2_sports_day_notice",
     "q": "質問: What should students who ordered lunch boxes do?",
     "ch": [
      "Nothing. They do not need to order again.",
      "Order again on the website.",
      "Pay at the gym.",
      "Bring their own lunch."
     ],
     "a": 0,
     "ex": "第2段落 do not need to order again。"
    },
    {
     "t": "mc",
     "p": "gpre2_sports_day_notice",
     "q": "質問: What will happen if it rains on September 17?",
     "ch": [
      "It will take place indoors, and the program will be shorter.",
      "Sports Day will be canceled, and classes will be held in the gym.",
      "Sports Day will be moved to October.",
      "Students will have normal classes."
     ],
     "a": 0,
     "ex": "第3段落 held in the gym with a shorter program＝屋内で短縮プログラム。"
    },
    {
     "t": "mc",
     "p": "gpre2_school_farm",
     "q": "質問: Who started the farm at Kitagawa High School?",
     "ch": [
      "Mr. Ueda, a teacher at the school.",
      "The school principal.",
      "A local farmer who lives behind the school.",
      "The students' parents."
     ],
     "a": 0,
     "ex": "第1段落 a science teacher, Mr. Ueda, started it。"
    },
    {
     "t": "mc",
     "p": "gpre2_school_farm",
     "q": "質問: How often are the vegetables used for school lunch?",
     "ch": [
      "One day every week.",
      "Every day.",
      "Once a month.",
      "Only at the school festival."
     ],
     "a": 0,
     "ex": "第2段落 used for school lunch once a week。"
    },
    {
     "t": "mc",
     "p": "gpre2_school_farm",
     "q": "質問: Why do students waste less food on Farm Day?",
     "ch": [
      "They have learned how hard growing vegetables is.",
      "The dishes are made by the older people in the town.",
      "They must pay for the lunch.",
      "Teachers watch them closely."
     ],
     "a": 0,
     "ex": "第2段落 they know how much work it takes to grow vegetables＝野菜を育てる苦労を知っている。"
    },
    {
     "t": "mc",
     "p": "gpre2_school_farm",
     "q": "質問: What do older people in the town do for the school?",
     "ch": [
      "They teach students how to grow vegetables.",
      "They buy the vegetables.",
      "They cook school lunch.",
      "They clean the school."
     ],
     "a": 0,
     "ex": "第3段落 come to teach students how to grow vegetables。"
    },
    {
     "t": "mc",
     "p": "gpre2_school_farm",
     "q": "質問: What does Mr. Ueda hope?",
     "ch": [
      "More schools will try the same kind of project.",
      "Other schools will send their students to his farm.",
      "Students will stop eating vegetables.",
      "The town will build a supermarket."
     ],
     "a": 0,
     "ex": "第3段落 hopes that other schools will start similar projects。"
    },
    {
     "t": "mc",
     "p": "gpre2_homestay_email",
     "q": "質問: How long has Riku been in Greenhill?",
     "ch": [
      "About half a month.",
      "For more than two months.",
      "For two days.",
      "For a year."
     ],
     "a": 0,
     "ex": "第1段落 for two weeks now＝2週間＝約半月。"
    },
    {
     "t": "mc",
     "p": "gpre2_homestay_email",
     "q": "質問: How does Riku go to school?",
     "ch": [
      "By bus with Chloe.",
      "By bike alone.",
      "On foot with his host parents.",
      "By train with his teacher."
     ],
     "a": 0,
     "ex": "第1段落 we go to school together by bus。"
    },
    {
     "t": "mc",
     "p": "gpre2_homestay_email",
     "q": "質問: What was Riku's problem at first?",
     "ch": [
      "People spoke too fast for him to understand.",
      "He did not like the food.",
      "The school was too far.",
      "Chloe was not kind to him."
     ],
     "a": 0,
     "ex": "第2段落 could not understand ... because they spoke so fast。"
    },
    {
     "t": "mc",
     "p": "gpre2_homestay_email",
     "q": "質問: What will Riku do next week?",
     "ch": [
      "Go camping by a lake with his class.",
      "Return to Japan.",
      "Move to another family.",
      "Take an English test."
     ],
     "a": 0,
     "ex": "第3段落 our class is going camping by a lake。"
    },
    {
     "t": "mc",
     "p": "gpre2_night_market",
     "q": "質問: When is the night market held?",
     "ch": [
      "On Saturday evenings in August.",
      "Every day in August, 5 p.m. to 9 p.m.",
      "Every Saturday in July.",
      "Only on August 31."
     ],
     "a": 0,
     "ex": "第1段落 Every Saturday in August, 5 p.m. to 9 p.m.。"
    },
    {
     "t": "mc",
     "p": "gpre2_night_market",
     "q": "質問: How do visitors pay for food?",
     "ch": [
      "With tickets bought at the main gate.",
      "With cash at each restaurant.",
      "With a school ID.",
      "They do not have to pay."
     ],
     "a": 0,
     "ex": "第2段落 Buy tickets at the main gate ... most dishes cost one to three tickets。"
    },
    {
     "t": "mc",
     "p": "gpre2_night_market",
     "q": "質問: What do volunteers receive?",
     "ch": [
      "A T-shirt and some tickets for food.",
      "Five free food tickets for each hour they work.",
      "Free dinner at a restaurant.",
      "A ticket to a concert."
     ],
     "a": 0,
     "ex": "第3段落 receive five free food tickets and a T-shirt。"
    },
    {
     "t": "mc",
     "p": "gpre2_night_market",
     "q": "質問: What should students do to apply as a volunteer?",
     "ch": [
      "Send an e-mail by July 25.",
      "Call the office on August 1.",
      "Go to the main gate on Saturday.",
      "Fill in a form at school."
     ],
     "a": 0,
     "ex": "第3段落 send an e-mail to the market office by July 25。"
    }
   ]
  },
  "pre2plus": {
   "vocab": [
    {
     "t": "mc",
     "en": "Many volunteers (   ) to the clean-up event every year.",
     "q": "(   ) に入る語は？",
     "ch": [
      "contribute",
      "compete",
      "complain",
      "concentrate"
     ],
     "a": 0,
     "ex": "contribute to＝〜に貢献する。"
    },
    {
     "t": "fill",
     "q": "「〜に参加する」を英語で（p で始まる1語）。",
     "a": "participate",
     "ex": "participate in＝〜に参加する。"
    },
    {
     "t": "mc",
     "en": "People in cities (   ) more energy than those in the countryside.",
     "q": "(   ) に入る語は？",
     "ch": [
      "consume",
      "construct",
      "consult",
      "contain"
     ],
     "a": 0,
     "ex": "consume＝消費する。energy を目的語にとる。"
    },
    {
     "t": "mc",
     "en": "Regular exercise has many (   ) for our health.",
     "q": "(   ) に入る語は？",
     "ch": [
      "benefits",
      "damages",
      "mistakes",
      "excuses"
     ],
     "a": 0,
     "ex": "benefit＝利益・恩恵。健康への良い点。"
    },
    {
     "t": "fill",
     "q": "「減る・減らす」を英語で（d で始まる）。",
     "a": "decrease",
     "ac": [
      "decline",
      "drop"
     ],
     "ex": "decrease＝減少する（⇔ increase）。"
    },
    {
     "t": "mc",
     "en": "Teachers should (   ) students to ask questions.",
     "q": "(   ) に入る語は？",
     "ch": [
      "encourage",
      "delay",
      "ignore",
      "measure"
     ],
     "a": 0,
     "ex": "encourage A to do＝Aに〜するよう促す。"
    },
    {
     "t": "mc",
     "en": "Experts (   ) that the population will fall by 2050.",
     "q": "(   ) に入る語は？",
     "ch": [
      "estimate",
      "celebrate",
      "decorate",
      "hesitate"
     ],
     "a": 0,
     "ex": "estimate＝見積もる・推定する。"
    },
    {
     "t": "fill",
     "q": "「維持する」を英語で（m で始まる）。",
     "a": "maintain",
     "ex": "maintain＝維持する。"
    },
    {
     "t": "mc",
     "en": "Washing your hands helps (   ) the spread of illness.",
     "q": "(   ) に入る語は？",
     "ch": [
      "prevent",
      "invent",
      "pretend",
      "attend"
     ],
     "a": 0,
     "ex": "prevent＝防ぐ。病気の広がりを防ぐ。"
    },
    {
     "t": "mc",
     "en": "The job (   ) good communication skills.",
     "q": "(   ) に入る語は？",
     "ch": [
      "requires",
      "repairs",
      "retires",
      "recognizes"
     ],
     "a": 0,
     "ex": "require＝必要とする。"
    },
    {
     "t": "fill",
     "q": "「重要な・著しい」を英語で（s で始まる）。",
     "a": "significant",
     "ex": "significant＝重要な・著しい。"
    },
    {
     "t": "mc",
     "en": "Fresh vegetables are not always (   ) in winter.",
     "q": "(   ) に入る語は？",
     "ch": [
      "available",
      "absent",
      "ancient",
      "awake"
     ],
     "a": 0,
     "ex": "available＝手に入る・利用できる。"
    },
    {
     "t": "mc",
     "en": "Housing in big cities is becoming less (   ) for young people.",
     "q": "(   ) に入る語は？",
     "ch": [
      "affordable",
      "flexible",
      "visible",
      "portable"
     ],
     "a": 0,
     "ex": "affordable＝手の届く価格の。"
    },
    {
     "t": "fill",
     "q": "「地域社会」を英語で（c で始まる）。",
     "a": "community",
     "ex": "community＝地域社会。"
    },
    {
     "t": "mc",
     "en": "The (   ) for electric cars is growing rapidly.",
     "q": "(   ) に入る語は？",
     "ch": [
      "demand",
      "damage",
      "danger",
      "debate"
     ],
     "a": 0,
     "ex": "demand＝需要。demand for ～。"
    },
    {
     "t": "mc",
     "en": "Many farmers (   ) on rain for their crops.",
     "q": "(   ) に入る語は？",
     "ch": [
      "rely",
      "carry",
      "hurry",
      "worry"
     ],
     "a": 0,
     "ex": "rely on＝〜に頼る。"
    },
    {
     "t": "fill",
     "q": "「目的」を英語で（p で始まる）。",
     "a": "purpose",
     "ex": "purpose＝目的。"
    },
    {
     "t": "mc",
     "en": "Animals must (   ) to changes in their environment to survive.",
     "q": "(   ) に入る語は？",
     "ch": [
      "adapt",
      "adopt",
      "admit",
      "attach"
     ],
     "a": 0,
     "ex": "adapt to＝〜に適応する（adopt＝採用する と区別）。"
    }
   ],
   "grammar": [
    {
     "t": "mc",
     "en": "(   ) in 1950, the bridge is still used today.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Built",
      "Building",
      "To build",
      "Builds"
     ],
     "a": 0,
     "ex": "過去分詞の分詞構文 Built＝建てられたが。"
    },
    {
     "t": "mc",
     "en": "I wish I (   ) more time to read books.",
     "q": "(   ) に入る語は？",
     "ch": [
      "had",
      "have",
      "will have",
      "having"
     ],
     "a": 0,
     "ex": "I wish＋仮定法過去 had。"
    },
    {
     "t": "mc",
     "en": "She talks (   ) she knew everything.",
     "q": "(   ) に入る語は？",
     "ch": [
      "as if",
      "even if",
      "so that",
      "as long as"
     ],
     "a": 0,
     "ex": "as if＋仮定法過去＝まるで〜のように。"
    },
    {
     "t": "mc",
     "en": "(   ) how busy you are, you should eat breakfast.",
     "q": "(   ) に入る語は？",
     "ch": [
      "No matter",
      "Even",
      "Whatever",
      "Although"
     ],
     "a": 0,
     "ex": "No matter how＝どんなに〜でも。"
    },
    {
     "t": "mc",
     "en": "I don't know (   ) he will come or not.",
     "q": "(   ) に入る語は？",
     "ch": [
      "whether",
      "that",
      "what",
      "which"
     ],
     "a": 0,
     "ex": "whether ～ or not＝〜かどうか。"
    },
    {
     "t": "mc",
     "en": "He spoke slowly (   ) everyone could understand him.",
     "q": "(   ) に入る語は？",
     "ch": [
      "so that",
      "in order",
      "because of",
      "in spite of"
     ],
     "a": 0,
     "ex": "so that＋S＋can/could＝〜できるように。"
    },
    {
     "t": "mc",
     "en": "The box was (   ) heavy for me to carry.",
     "q": "(   ) に入る語は？",
     "ch": [
      "too",
      "so",
      "very",
      "enough"
     ],
     "a": 0,
     "ex": "too ～ for 人 to …＝人が…するには〜すぎる。"
    },
    {
     "t": "mc",
     "en": "It is said (   ) the town was once a small fishing village.",
     "q": "(   ) に入る語は？",
     "ch": [
      "that",
      "what",
      "which",
      "whether"
     ],
     "a": 0,
     "ex": "It is said that ～＝〜と言われている。"
    },
    {
     "t": "mc",
     "en": "(   ) finished his homework, he went out to play.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Having",
      "Had",
      "Have",
      "Has"
     ],
     "a": 0,
     "ex": "完了形の分詞構文 Having＋過去分詞＝〜してから。"
    },
    {
     "t": "mc",
     "en": "She sat on the bench (   ) her eyes closed.",
     "q": "(   ) に入る語は？",
     "ch": [
      "with",
      "at",
      "by",
      "for"
     ],
     "a": 0,
     "ex": "with＋名詞＋過去分詞＝〜を…した状態で。"
    },
    {
     "t": "mc",
     "en": "Take an umbrella (   ) it rains.",
     "q": "(   ) に入る語は？",
     "ch": [
      "in case",
      "despite",
      "although",
      "so that"
     ],
     "a": 0,
     "ex": "in case＝〜する場合に備えて。"
    },
    {
     "t": "mc",
     "en": "(   ) she said made everyone laugh.",
     "q": "(   ) に入る語は？",
     "ch": [
      "What",
      "That",
      "Which",
      "Who"
     ],
     "a": 0,
     "ex": "関係代名詞 what＝〜すること（主語のまとまり）。"
    },
    {
     "t": "mc",
     "en": "This is the reason (   ) I was late.",
     "q": "(   ) に入る語は？",
     "ch": [
      "why",
      "which",
      "what",
      "how"
     ],
     "a": 0,
     "ex": "the reason why＝〜の理由（関係副詞）。"
    },
    {
     "t": "mc",
     "en": "My grandfather (   ) in a small village when he was young.",
     "q": "(   ) に入る語は？",
     "ch": [
      "used to live",
      "is used to live",
      "used to living",
      "is used to living"
     ],
     "a": 0,
     "ex": "used to＋原形＝以前は〜していた。"
    },
    {
     "t": "mc",
     "en": "The teacher made the students (   ) the room.",
     "q": "(   ) に入る語は？",
     "ch": [
      "clean",
      "to clean",
      "cleaning",
      "cleaned"
     ],
     "a": 0,
     "ex": "make＋人＋原形＝人に〜させる。"
    },
    {
     "t": "mc",
     "en": "You (   ) see a doctor before it gets worse.",
     "q": "(   ) に入る語は？",
     "ch": [
      "had better",
      "would better",
      "have better",
      "should better"
     ],
     "a": 0,
     "ex": "had better＋原形＝〜したほうがよい。"
    },
    {
     "t": "mc",
     "en": "You can stay here (   ) you keep quiet.",
     "q": "(   ) に入る語は？",
     "ch": [
      "as long as",
      "as far as",
      "as much as",
      "as well as"
     ],
     "a": 0,
     "ex": "as long as＝〜する限り（条件）。"
    },
    {
     "t": "mc",
     "en": "The movie was (   ) boring that I fell asleep.",
     "q": "(   ) に入る語は？",
     "ch": [
      "so",
      "such",
      "too",
      "very"
     ],
     "a": 0,
     "ex": "so＋形容詞＋that …＝とても〜なので…。"
    }
   ],
   "technique": [
    {
     "t": "mc",
     "en": "A: Do you think schools should start later in the morning? B: (   )",
     "q": "【準2+ 聞く/話す】意見を求められた応答は？",
     "ch": [
      "Yes. Students would get more sleep.",
      "No, the station is on the left side.",
      "I'm fine, thank you very much.",
      "Yes, it's a pen."
     ],
     "a": 0,
     "ex": "Do you think ～? には Yes/No＋理由で答える。"
    },
    {
     "t": "mc",
     "en": "A: What do you think about online classes? B: (   )",
     "q": "【準2+ 聞く/話す】意見を述べる応答は？",
     "ch": [
      "They're convenient, but I miss talking with friends.",
      "Yes, I took it.",
      "It's five dollars.",
      "Nice to meet you."
     ],
     "a": 0,
     "ex": "長所と短所の両面から意見を述べる。"
    },
    {
     "t": "mc",
     "en": "A: Should people use public transportation more? B: (   )",
     "q": "【準2+ 聞く/話す】意見への応答は？",
     "ch": [
      "I think so. It reduces traffic and pollution.",
      "Turn right at the second corner and go straight.",
      "No, I don't have one.",
      "Have a nice day."
     ],
     "a": 0,
     "ex": "賛成し、理由（渋滞と汚染を減らす）を添える。"
    },
    {
     "t": "mc",
     "q": "【準2+ 読む】長文: More and more companies allow their employees to work from home two days a week. 質問: What do many companies allow?",
     "ch": [
      "Working from home two days a week.",
      "Taking a two-week vacation every summer.",
      "Leaving work at noon.",
      "Working on weekends."
     ],
     "a": 0,
     "ex": "allow ～ to work from home two days a week が答え。"
    },
    {
     "t": "mc",
     "q": "【準2+ 聞く】A: Are you going to the volunteer event on Saturday? B: I'd like to, but I have a part-time job that day. 質問: Why can't B go to the event?",
     "ch": [
      "Because B has to work.",
      "Because B is sick.",
      "Because the event was canceled.",
      "Because B doesn't like volunteering."
     ],
     "a": 0,
     "ex": "I have a part-time job that day＝その日は仕事がある。"
    },
    {
     "t": "mc",
     "en": "A: I'm thinking of starting a recycling club at school. B: (   )",
     "q": "【準2+ 聞く/話す】自然な応答は？",
     "ch": [
      "Sounds great. How can I help?",
      "It's on the second floor of the building.",
      "Yes, I was.",
      "Not at all."
     ],
     "a": 0,
     "ex": "計画に賛同し、協力を申し出る応答。"
    },
    {
     "t": "mc",
     "q": "【準2+ 書く】「学校でスマートフォンの使用を許すべきか」の意見文。理由を述べる文として適切なのは？",
     "ch": [
      "I think so, because students can look up information quickly.",
      "I like my smartphone very much.",
      "Smartphones are sold at many shops.",
      "My brother has a new smartphone."
     ],
     "a": 0,
     "ex": "意見＋because で理由を述べる文が適切。他は話題とずれる。"
    },
    {
     "t": "mc",
     "q": "【準2+ 読む】長文: A city in the north has started a program that gives free bicycles to high school students to reduce the number of cars. 質問: What is the purpose of the program?",
     "ch": [
      "To cut down on car traffic.",
      "To sell more bicycles to students.",
      "To build new roads.",
      "To close high schools."
     ],
     "a": 0,
     "ex": "to reduce the number of cars（目的）＝車を減らす＝cut down on car traffic。"
    },
    {
     "t": "mc",
     "q": "【準2+ 聞く】A: The library is closing early today for a special event. B: Oh, then I'll return my books tomorrow instead. 質問: What will B do?",
     "ch": [
      "Return the books tomorrow.",
      "Go to the event.",
      "Buy new books.",
      "Stay at the library all day."
     ],
     "a": 0,
     "ex": "I'll return my books tomorrow instead から。"
    },
    {
     "t": "mc",
     "en": "A: Do you think zoos are good for animals? B: (   )",
     "q": "【準2+ 聞く/話す】意見を述べる応答は？",
     "ch": [
      "It depends. Some zoos protect endangered animals, but others don't care for them well.",
      "Yes, I went there.",
      "Zoos open at nine.",
      "Here is your ticket."
     ],
     "a": 0,
     "ex": "It depends.＝場合による、と両面を示す応答。"
    },
    {
     "t": "mc",
     "q": "【準2+ 書く】意見文の結論を述べる文の始め方として適切なのは？",
     "ch": [
      "For these reasons, …",
      "On the other hand, …",
      "First of all, …",
      "For example, …"
     ],
     "a": 0,
     "ex": "For these reasons＝これらの理由で（結論の導入）。"
    },
    {
     "t": "mc",
     "q": "【準2+ 読む】長文: Although the new shopping mall created many jobs, some local shop owners worry that they will lose customers. 質問: What are some local shop owners worried about?",
     "ch": [
      "Losing customers.",
      "Getting new jobs.",
      "Building a mall.",
      "Having too many customers."
     ],
     "a": 0,
     "ex": "worry that they will lose customers から。"
    },
    {
     "t": "mc",
     "en": "A: I failed my driving test again. B: (   )",
     "q": "【準2+ 聞く/話す】自然な応答は？",
     "ch": [
      "Don't give up. You'll pass next time.",
      "Congratulations! That's wonderful news.",
      "Yes, please.",
      "It's two o'clock."
     ],
     "a": 0,
     "ex": "落ち込む相手をはげます応答。"
    },
    {
     "t": "mc",
     "q": "【準2+ 聞く】A: Excuse me, does this bus go to the city museum? B: No, you need the number 12 bus. It leaves from the stop across the street. 質問: What should A do?",
     "ch": [
      "Catch the number 12 bus across the street.",
      "Stay on this bus until it reaches the museum.",
      "Walk to the museum.",
      "Take a taxi."
     ],
     "a": 0,
     "ex": "you need the number 12 bus ＋ the stop across the street。"
    },
    {
     "t": "mc",
     "en": "A: Which is better for the environment, paper bags or plastic bags? B: (   )",
     "q": "【準2+ 聞く/話す】意見を述べる応答は？",
     "ch": [
      "Neither is perfect, but reusable bags are the best choice.",
      "Yes, I have a bag.",
      "I bought one yesterday.",
      "The shop is closed."
     ],
     "a": 0,
     "ex": "Which is better? に比較して自分の考えを答える。"
    },
    {
     "t": "mc",
     "q": "【準2+ 読む】長文: Some schools have replaced paper textbooks with tablets. Teachers say students carry lighter bags, but some parents worry about screen time. 質問: What is one worry of some parents?",
     "ch": [
      "How long students look at screens.",
      "The weight of the bags students carry.",
      "The cost of paper textbooks.",
      "Students' handwriting."
     ],
     "a": 0,
     "ex": "parents worry about screen time＝画面を見る時間。lighter bags は良い点として先生が述べたこと。"
    },
    {
     "t": "mc",
     "q": "【準2+ 書く】Eメールの返信。相手の質問「What time should we meet?」への答えとして適切な文は？",
     "ch": [
      "How about meeting at ten in front of the station?",
      "I met him at ten in front of the station yesterday.",
      "The station is very big.",
      "Thank you for your time."
     ],
     "a": 0,
     "ex": "時間を聞かれたら具体的な時刻を提案する。"
    },
    {
     "t": "mc",
     "en": "A: I heard the city will build a new park near our school. B: (   )",
     "q": "【準2+ 聞く/話す】自然な応答は？",
     "ch": [
      "Really? That will be a nice place to relax after school.",
      "Yes, I built it.",
      "No, thank you.",
      "It's mine."
     ],
     "a": 0,
     "ex": "ニュースに関心を示し感想を述べる応答。"
    }
   ],
   "practice": [
    {
     "t": "mc",
     "en": "The number of foreign visitors (   ) increasing every year.",
     "q": "(   ) に入る語は？",
     "ch": [
      "is",
      "are",
      "were",
      "have been"
     ],
     "a": 0,
     "ex": "The number of ～ は単数扱い → is。"
    },
    {
     "t": "mc",
     "en": "Neither the teacher (   ) the students knew the answer.",
     "q": "(   ) に入る語は？",
     "ch": [
      "nor",
      "or",
      "and",
      "but"
     ],
     "a": 0,
     "ex": "neither A nor B＝AもBも〜ない。"
    },
    {
     "t": "mc",
     "en": "The meeting was put (   ) until next week because of the storm.",
     "q": "(   ) に入る語は？",
     "ch": [
      "off",
      "on",
      "up",
      "out"
     ],
     "a": 0,
     "ex": "put off＝延期する。"
    },
    {
     "t": "mc",
     "en": "In spite (   ) his age, he runs every morning.",
     "q": "(   ) に入る語は？",
     "ch": [
      "of",
      "for",
      "with",
      "to"
     ],
     "a": 0,
     "ex": "in spite of＝〜にもかかわらず。"
    },
    {
     "t": "mc",
     "en": "It took us three hours (   ) the top of the mountain.",
     "q": "(   ) に入る語は？",
     "ch": [
      "to reach",
      "reaching",
      "reach",
      "reached"
     ],
     "a": 0,
     "ex": "It takes 人 時間 to do＝人が〜するのに時間がかかる。"
    },
    {
     "t": "mc",
     "en": "Thanks to the new bridge, people can now (   ) the city center more easily.",
     "q": "(   ) に入る語は？",
     "ch": [
      "access",
      "allow",
      "afford",
      "attend"
     ],
     "a": 0,
     "ex": "access＝〜に行く・アクセスする。"
    },
    {
     "t": "mc",
     "en": "Students are (   ) to bring their own lunch on the field trip.",
     "q": "(   ) に入る語は？",
     "ch": [
      "supposed",
      "suggested",
      "supported",
      "surprised"
     ],
     "a": 0,
     "ex": "be supposed to＝〜することになっている。"
    },
    {
     "t": "mc",
     "en": "(   ) you hurry, you will miss the last train.",
     "q": "(   ) に入る語は？",
     "ch": [
      "Unless",
      "If",
      "Because",
      "Despite"
     ],
     "a": 0,
     "ex": "Unless＝〜しなければ（if ～ not）。"
    },
    {
     "t": "mc",
     "en": "The old building was (   ) into a museum last year.",
     "q": "(   ) に入る語は？",
     "ch": [
      "turned",
      "turning",
      "turn",
      "turns"
     ],
     "a": 0,
     "ex": "受動態 was turned into＝〜に変えられた。"
    },
    {
     "t": "mc",
     "en": "She has been working at the hospital (   ) ten years.",
     "q": "(   ) に入る語は？",
     "ch": [
      "for",
      "since",
      "during",
      "from"
     ],
     "a": 0,
     "ex": "for＋期間（since は起点）。"
    },
    {
     "t": "mc",
     "en": "I would rather stay home (   ) go out in this heat.",
     "q": "(   ) に入る語は？",
     "ch": [
      "than",
      "to",
      "that",
      "as"
     ],
     "a": 0,
     "ex": "would rather A than B＝BよりAしたい。"
    },
    {
     "t": "mc",
     "en": "He is one of the (   ) players on the team.",
     "q": "(   ) に入る語は？",
     "ch": [
      "best",
      "better",
      "good",
      "well"
     ],
     "a": 0,
     "ex": "one of the＋最上級＋複数名詞。"
    },
    {
     "t": "mc",
     "q": "英文: The city's new recycling rule requires residents to separate plastic from paper. 質問: What must residents do under the new rule?",
     "ch": [
      "Keep plastic and paper apart.",
      "Stop using plastic and paper.",
      "Pay more taxes for recycling.",
      "Move to another city."
     ],
     "a": 0,
     "ex": "requires residents to separate plastic from paper＝分ける＝keep ... apart。"
    },
    {
     "t": "mc",
     "q": "英文: Mr. Sato stopped driving to work and now takes the train, which saves him money and gives him time to read. 質問: What is one benefit Mr. Sato gets from taking the train?",
     "ch": [
      "He has time to read.",
      "He arrives earlier.",
      "He can drive faster.",
      "He meets his boss."
     ],
     "a": 0,
     "ex": "gives him time to read が利点のひとつ。"
    },
    {
     "t": "mc",
     "en": "A large (   ) of students want to study abroad.",
     "q": "(   ) に入る語は？",
     "ch": [
      "number",
      "amount",
      "deal",
      "piece"
     ],
     "a": 0,
     "ex": "a large number of＋複数名詞＝多くの〜。"
    },
    {
     "t": "mc",
     "en": "Please make (   ) that all the windows are closed before you leave.",
     "q": "(   ) に入る語は？",
     "ch": [
      "sure",
      "true",
      "real",
      "clear"
     ],
     "a": 0,
     "ex": "make sure that＝〜を確認する。"
    }
   ],
   "reading": [
    {
     "t": "mc",
     "p": "gpre2plus_cashless",
     "q": "質問: How did most people in Japan pay in the past?",
     "ch": [
      "In coins and bills.",
      "With cards or smartphones.",
      "Only at small food stands.",
      "With a special app."
     ],
     "a": 0,
     "ex": "第1段落 most people in Japan paid with cash。cash＝coins and bills。cards or smartphones は「今」の話。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_cashless",
     "q": "質問: What is one advantage of cashless payment?",
     "ch": [
      "Customers wait less time to pay.",
      "Shops spend more time counting money.",
      "People spend more money.",
      "Smartphones become cheaper."
     ],
     "a": 0,
     "ex": "第2段落 lines at the register move quickly＝レジの列が早く進む＝待ち時間が短い。shops spend less time（more ではない）。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_cashless",
     "q": "質問: What do some apps show users?",
     "ch": [
      "The total of their payments.",
      "Where the nearest bank or shop is.",
      "The weather for the coming week.",
      "The price of coins."
     ],
     "a": 0,
     "ex": "第2段落 show users how much they have spent＝使った金額の合計。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_cashless",
     "q": "質問: What may happen if a smartphone is lost?",
     "ch": [
      "The owner might lose some money.",
      "The shop has to close early that day.",
      "The owner gets a new one for free.",
      "Nothing happens."
     ],
     "a": 0,
     "ex": "第3段落 If a smartphone is lost, the owner may lose money。may＝might。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_cashless",
     "q": "質問: What do experts say?",
     "ch": [
      "People should keep both ways of paying.",
      "Cashless payment should be used in every shop.",
      "Only older people should use cash.",
      "Shops should refuse cards."
     ],
     "a": 0,
     "ex": "第3段落 cash and cashless payment should be used together＝両方の支払い方を残す。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_shopping_street",
     "q": "質問: What were shopping streets for a long time?",
     "ch": [
      "The heart of the community.",
      "Places visited mainly by tourists from abroad.",
      "Large shopping malls near the station.",
      "Train stations."
     ],
     "a": 0,
     "ex": "第1段落 these streets were the center of local life＝地域の中心＝the heart of the community。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_shopping_street",
     "q": "質問: Why have customers moved away from small shops?",
     "ch": [
      "Other stores are cheaper and open longer.",
      "Small shops moved to other towns near the station.",
      "The station was closed.",
      "Customers stopped eating fish."
     ],
     "a": 0,
     "ex": "第2段落 malls and online stores offer lower prices and longer opening hours, so customers have moved away。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_shopping_street",
     "q": "質問: What is true of some towns?",
     "ch": [
      "Over half the shops have closed.",
      "All the shops stay open until late.",
      "The shopping street was moved.",
      "The malls were closed."
     ],
     "a": 0,
     "ex": "第2段落 more than half of the shops now have their shutters down＝半分以上が閉店。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_shopping_street",
     "q": "質問: What have young people done?",
     "ch": [
      "Started cafes in shops that had closed.",
      "Built a large shopping mall near the station.",
      "Moved to big cities.",
      "Closed the weekend markets."
     ],
     "a": 0,
     "ex": "第3段落 young people have opened cafes in empty shops。empty shops＝閉店した店。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_shopping_street",
     "q": "質問: What do these efforts show?",
     "ch": [
      "A shopping street can be a place where people meet.",
      "Shopping streets are no longer needed.",
      "Online stores are the only choice.",
      "Music events are expensive."
     ],
     "a": 0,
     "ex": "第3段落 not only a place to buy things but also a place where people meet。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_bike_sharing",
     "q": "質問: How do users find a bike?",
     "ch": [
      "By using an app on their phone.",
      "By asking at the nearest station.",
      "By calling a taxi company.",
      "By reading a map in a book."
     ],
     "a": 0,
     "ex": "第1段落 Users find a bike with a smartphone app。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_bike_sharing",
     "q": "質問: What is one reason bike sharing is popular?",
     "ch": [
      "Bikes do not produce air pollution.",
      "Bikes are faster than trains.",
      "Bikes are free in every city.",
      "Bikes can carry many people."
     ],
     "a": 0,
     "ex": "第2段落 do not produce air pollution。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_bike_sharing",
     "q": "質問: What are shared bikes especially useful for?",
     "ch": [
      "Short rides, like station to office.",
      "Long trips between cities on the weekend.",
      "Carrying heavy furniture.",
      "Traveling in the rain."
     ],
     "a": 0,
     "ex": "第2段落 useful for short trips, such as going from a train station to an office。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_bike_sharing",
     "q": "質問: What problem is mentioned in the passage?",
     "ch": [
      "Bikes left on the sidewalk block walkers.",
      "Bikes are too expensive.",
      "The apps do not work.",
      "There are too few users."
     ],
     "a": 0,
     "ex": "第3段落 leave bikes on the sidewalk, where they block the way for walkers。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_bike_sharing",
     "q": "質問: What do cities need to do?",
     "ch": [
      "Make more places to park and clearer rules.",
      "Ban bicycles from sidewalks and the city center.",
      "Stop the service completely.",
      "Buy more buses for crowded cities."
     ],
     "a": 0,
     "ex": "第3段落 build more parking spaces and set clear rules＝駐輪場を増やし、ルールをはっきりさせる。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_hoshino",
     "q": "質問: What was Hoshino like forty years ago?",
     "ch": [
      "It had a busy school and many young families.",
      "It had no school.",
      "Most residents were over sixty-five.",
      "It was a large city."
     ],
     "a": 0,
     "ex": "第1段落 a busy elementary school and many young families。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_hoshino",
     "q": "質問: Why must older people travel to the next town?",
     "ch": [
      "Because the last supermarket in Hoshino closed.",
      "Because the school moved there.",
      "Because the buses are free.",
      "Because they like traveling."
     ],
     "a": 0,
     "ex": "第2段落 The last supermarket closed ..., so older people must travel to the next town。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_hoshino",
     "q": "質問: Why have bus services been cut?",
     "ch": [
      "Because not many people ride them.",
      "Because the roads are too narrow for buses.",
      "Because the drivers moved away.",
      "Because the town bought new buses."
     ],
     "a": 0,
     "ex": "第2段落 because there are fewer passengers＝乗客が減ったから。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_hoshino",
     "q": "質問: What do the high school students do?",
     "ch": [
      "They deliver food to elderly residents once a week.",
      "They teach the twenty students at the elementary school.",
      "They drive the town bus.",
      "They sell land to young families."
     ],
     "a": 0,
     "ex": "第3段落 collect orders ... and deliver food（once a week）。"
    },
    {
     "t": "mc",
     "p": "gpre2plus_hoshino",
     "q": "質問: What does the town offer to young families who move there?",
     "ch": [
      "Land at no cost.",
      "Free food every week.",
      "A new school.",
      "A bus pass."
     ],
     "a": 0,
     "ex": "第3段落 offers free land to young families who move there。free＝at no cost。食料を届けるのは高校生。"
    }
   ]
  },
  "prep": {
   "meta": [
    {
     "t": "mc",
     "q": "英和辞典で単語を探すとき、何の順にならんでいる？",
     "ch": [
      "アルファベット順（a→z）",
      "意味の大切な順（よく使う語が先）",
      "つづりの短い語から長い語の順",
      "教科書に出てくる順（1年→3年）"
     ],
     "chJp": true,
     "a": 0,
     "ex": "辞書はアルファベット順。最初の文字→2文字目→3文字目と見ていくと速く探せる。"
    },
    {
     "t": "mc",
     "q": "辞書を引いたら意味がいくつも書いてあった。どうする？",
     "ch": [
      "読んでいる文に合う意味を選ぶ",
      "いつも最初に書かれた意味を使う",
      "書いてある意味を全部書きうつす",
      "いちばん短く書かれた意味を選ぶ"
     ],
     "chJp": true,
     "a": 0,
     "ex": "単語の意味は文脈で決まる。文に当てはめて自然な意味を選ぼう。"
    },
    {
     "t": "mc",
     "q": "「『図書館』は英語で何？」と調べたいときに使う辞書は？",
     "ch": [
      "和英辞典",
      "英和辞典",
      "国語辞典",
      "漢字辞典"
     ],
     "chJp": true,
     "a": 0,
     "ex": "和英辞典＝日本語から英語を調べる。英和辞典は英語から日本語。"
    },
    {
     "t": "mc",
     "q": "辞書の単語の横にある「動」「名」「形」などの表示は何を表す？",
     "ch": [
      "品詞（動詞・名詞・形容詞）",
      "単語の難しさ（易しい・ふつう・難しい）",
      "その単語が出てくる学年（1年・2年・3年）",
      "単語の文字数（3文字・4文字・5文字）"
     ],
     "chJp": true,
     "a": 0,
     "ex": "品詞を知ると、その単語を文のどこに置くかがわかる。"
    },
    {
     "t": "mc",
     "q": "英文で大文字で書き始めるのは？",
     "ch": [
      "文の最初・I・人名や地名",
      "すべての動詞（go, like, play など）",
      "6文字以上の長い単語すべて",
      "文の最後の単語とピリオドの前"
     ],
     "chJp": true,
     "a": 0,
     "ex": "文頭・I・固有名詞（Tom, Japan）は必ず大文字。"
    },
    {
     "t": "mc",
     "q": "疑問文の終わりにつける記号は？",
     "ch": [
      "？（クエスチョンマーク）",
      "．（ピリオド・終止符）",
      "，（カンマ・読点）",
      "！（エクスクラメーションマーク）"
     ],
     "chJp": true,
     "a": 0,
     "ex": "ふつうの文はピリオド、質問の文はクエスチョンマークで終える。"
    },
    {
     "t": "mc",
     "q": "英文を手で書くとき気をつけることは？",
     "ch": [
      "単語と単語の間を少しあける",
      "単語を全部くっつけて切れ目なく書く",
      "1文字ずつ間を大きくあけて書く",
      "文字をななめにかたむけて書く"
     ],
     "chJp": true,
     "a": 0,
     "ex": "英語は単語の間のスペースで区切りを示す。くっつけると読めない。"
    },
    {
     "t": "mc",
     "q": "4線ノートで英語の文字を練習するときのポイントは？",
     "ch": [
      "文字ごとに決まった高さに合わせて書く",
      "自分の好きな大きさで自由に書く",
      "どの文字もすべて同じ高さにそろえて書く",
      "線は気にせずできるだけ速く書く"
     ],
     "chJp": true,
     "a": 0,
     "ex": "b と p、a と d などは線の上下の位置で区別される。高さが大事。"
    },
    {
     "t": "mc",
     "q": "まちがえた問題を次に生かすのに良い方法は？",
     "ch": [
      "まちがえた問題だけを集めたノートを作る",
      "正解した問題だけをきれいに書き写す",
      "まちがえたところは見直さず、そのまま忘れる",
      "答えだけを赤ペンで丸写しして終わる"
     ],
     "chJp": true,
     "a": 0,
     "ex": "まちがいノート＝自分専用の弱点集。テスト前にそこだけ見返せる。"
    },
    {
     "t": "mc",
     "q": "英作文で文を作るとき、良い考え方は？",
     "ch": [
      "確実に正しく書ける短い文を使う",
      "習っていない難しい文に挑戦する",
      "1文をできるだけ長くする",
      "文法は気にしないで書く"
     ],
     "chJp": true,
     "a": 0,
     "ex": "作文はまちがいのない短い文を積み重ねるのが基本。長さより正確さ。"
    },
    {
     "t": "mc",
     "q": "言いたい日本語をそのまま英語にできないとき、どうする？",
     "ch": [
      "知っている表現で言える内容に変える",
      "日本語の単語をその順番のまま英語に並べる",
      "日本語をローマ字で書いてごまかす",
      "その部分だけ空白にして次の文に進む"
     ],
     "chJp": true,
     "a": 0,
     "ex": "「言いたいこと」より「言えること」を書く。知っている表現で伝えればOK。"
    },
    {
     "t": "mc",
     "q": "英作文で自分の意見を書いたあとに続けると良いのは？",
     "ch": [
      "理由と具体例を1つ書く",
      "同じ意見を別の言い方でくり返す",
      "自分とは反対の意見だけを書く",
      "まったく新しい話題に変える"
     ],
     "chJp": true,
     "a": 0,
     "ex": "意見だけでは弱い。理由＋具体例があると説得力が出る。"
    },
    {
     "t": "mc",
     "q": "Do you like music? と聞かれたとき、会話が広がる答え方は？",
     "ch": [
      "Yes に好きな音楽を一言足す",
      "Yes. の一言だけで答えて終わる",
      "何も言わずにだまってうなずく",
      "聞こえなかったふりをして質問を無視する"
     ],
     "chJp": true,
     "a": 0,
     "ex": "Yes/No に一言足すと相手が次の質問をしやすくなる。"
    },
    {
     "t": "mc",
     "q": "相手の話を聞いていると伝えるのに役立つ表現は？",
     "ch": [
      "I see. / Really? などの相づち",
      "Goodbye. / See you later. などの別れのあいさつ",
      "I don't know. / No idea. と言って話を止める",
      "Stop. / Be quiet. と大きな声で言う"
     ],
     "chJp": true,
     "a": 0,
     "ex": "相づちは「聞いているよ」のサイン。会話が続きやすくなる。"
    },
    {
     "t": "mc",
     "q": "相手の英語が速くてついていけないときの一言は？",
     "ch": [
      "Could you speak more slowly?",
      "I can speak English very well.",
      "See you tomorrow at school, bye.",
      "Yes, I am. Thank you very much."
     ],
     "chJp": true,
     "a": 0,
     "ex": "ゆっくり話してもらうお願いは失礼ではない。遠慮せず頼もう。"
    },
    {
     "t": "mc",
     "q": "英語で伝えるとき、言葉以外で助けになるものは？",
     "ch": [
      "ジェスチャーや表情",
      "大声で日本語を言う",
      "目をそらす",
      "腕を組んで待つ"
     ],
     "chJp": true,
     "a": 0,
     "ex": "指さし・手の動き・笑顔は世界共通の伝え方。言葉を補ってくれる。"
    },
    {
     "t": "mc",
     "q": "相手の質問の意味がわからないときの良い対応は？",
     "ch": [
      "Sorry? と聞き返して確認する",
      "わかったふりをしてにこにこうなずく",
      "とりあえず Yes, yes. と適当に答える",
      "聞こえなかったことにして話題を変える"
     ],
     "chJp": true,
     "a": 0,
     "ex": "わかったふりは後で困る。確認するほうが会話はうまくいく。"
    },
    {
     "t": "mc",
     "q": "会話で次に何を話せばよいか困ったとき、良い方法は？",
     "ch": [
      "How about you? と質問を返す",
      "だまったまま相手が話し出すのをじっと待ち続ける",
      "今言ったことをもう一度そのままくり返す",
      "「もう帰ります」と言って話をやめる"
     ],
     "chJp": true,
     "a": 0,
     "ex": "質問を返せば相手が話してくれ、会話が続く。"
    },
    {
     "t": "mc",
     "q": "話したいことがすぐに英語で出てこないとき、間をつなぐ表現は？",
     "ch": [
      "Well... / Let me see.",
      "Good night. / Sweet dreams.",
      "Thank you very much.",
      "Nice to meet you. / Me too."
     ],
     "chJp": true,
     "a": 0,
     "ex": "つなぎ言葉を使えば、無言にならず考える時間が作れる。"
    },
    {
     "t": "mc",
     "q": "英語で自己紹介をするときのコツは？",
     "ch": [
      "名前と好きなことを短くはっきり言う",
      "時間いっぱいできるだけ長く話し続ける",
      "名前だけ言ってすぐに終わりにする",
      "全部暗記した文を早口で一気に言う"
     ],
     "chJp": true,
     "a": 0,
     "ex": "名前＋好きなこと1つで十分。短くてもはっきり伝わればよい。"
    },
    {
     "t": "mc",
     "q": "リスニング問題で音声が流れる前にすると良いことは？",
     "ch": [
      "設問と選択肢を見て聞くことを決める",
      "目を閉じて音声が始まるのを静かに待つ",
      "前の問題の答えが合っているか見直す",
      "聞く前に答えをカンで先に決めてしまう"
     ],
     "chJp": true,
     "a": 0,
     "ex": "何を聞くか決めておくと、必要な情報に集中できる。"
    },
    {
     "t": "mc",
     "q": "リスニングで全部は聞き取れないとき、何に注目する？",
     "ch": [
      "数字・時間・場所などのキーワード",
      "文の最初に聞こえた1つ目の単語だけ",
      "話している人の声の高さ・大きさ・速さ",
      "いちばん最後に聞こえた単語だけ"
     ],
     "chJp": true,
     "a": 0,
     "ex": "全部聞き取れなくても、キーワードがつかめれば答えは出せる。"
    },
    {
     "t": "mc",
     "q": "an apple が「アナポー」のように聞こえるのはなぜ？",
     "ch": [
      "単語の音がつながって発音されるから",
      "聞いている人の聞き方がまちがっているから",
      "録音の機械がこわれて音がゆがんでいるから",
      "an apple ではなく別の単語を言っているから"
     ],
     "chJp": true,
     "a": 0,
     "ex": "英語は単語どうしの音がつながる。慣れると聞き取りやすくなる。"
    },
    {
     "t": "mc",
     "q": "テスト中にわからない問題が出てきたら？",
     "ch": [
      "いったんとばして、あとで戻る",
      "解けるまでその問題を考え続ける",
      "そこでテストを解くのをやめる",
      "残りの問題もすべてとばして出す"
     ],
     "chJp": true,
     "a": 0,
     "ex": "時間配分が大切。解ける問題を先に片づけてから戻ろう。"
    },
    {
     "t": "mc",
     "q": "4択問題で答えに迷ったときの考え方は？",
     "ch": [
      "明らかにちがう選択肢を消していく",
      "迷ったときはいつも最初の選択肢を選ぶ",
      "文字数がいちばん長い選択肢を選ぶ",
      "目をつぶって指さしたものを選ぶ"
     ],
     "chJp": true,
     "a": 0,
     "ex": "消去法で選択肢をしぼると、正解の確率が上がる。"
    },
    {
     "t": "mc",
     "q": "マークシートのテストで問題をとばしたとき、特に確認することは？",
     "ch": [
      "解答欄の番号がずれていないか",
      "えんぴつの色がこくぬれているか",
      "となりの人と答えが同じかどうか",
      "問題用紙のページ数が合っているか"
     ],
     "chJp": true,
     "a": 0,
     "ex": "1問とばすと解答欄が全部ずれることがある。番号を確認しよう。"
    },
    {
     "t": "mc",
     "q": "テストで問題の指示文をよく読む理由は？",
     "ch": [
      "問われ方が変わることがあるから",
      "指示文を読んだかどうかも採点されるから",
      "読まないと解答時間がもらえないから",
      "指示文の中に正解が書いてあるから"
     ],
     "chJp": true,
     "a": 0,
     "ex": "正しいものか、合わないものか。指示を読みちがえると全問まちがう。"
    },
    {
     "t": "mc",
     "q": "テスト終了まぎわ、わからない4択問題が残っていたら？",
     "ch": [
      "空欄にせず、可能性の高いものを選ぶ",
      "わからない問題は空欄のまま提出する",
      "解いた答えもいっしょに全部消して出す",
      "となりの人に小さな声で答えを聞く"
     ],
     "chJp": true,
     "a": 0,
     "ex": "空欄は必ず0点。英検は減点がないので、選べば正解の可能性がある。"
    },
    {
     "t": "mc",
     "q": "音読の練習で、最初にすると良いことは？",
     "ch": [
      "お手本の音声を聞いてまねする",
      "自分の読み方で何度も読み続ける",
      "日本語訳を先に声に出して読む",
      "声を出さずに黙読だけをくり返す"
     ],
     "chJp": true,
     "a": 0,
     "ex": "お手本の音とリズムをまねることで、正しい発音が身につく。"
    },
    {
     "t": "mc",
     "q": "音読するときの声の出し方で良いのは？",
     "ch": [
      "口をはっきり動かし、聞こえる声で読む",
      "口をあまり動かさずぶつぶつ小声で読む",
      "声を出さず息だけでささやくように読む",
      "のどが痛くなるほど大声で叫ぶように読む"
     ],
     "chJp": true,
     "a": 0,
     "ex": "口をしっかり動かすと発音が良くなり、自分の耳にも入る。"
    },
    {
     "t": "mc",
     "q": "英単語を発音するとき意識すると良いのは？",
     "ch": [
      "強く読むところ（アクセント）",
      "すべての文字を同じ強さで読む",
      "できるだけ速く読む",
      "日本語のカタカナ読み"
     ],
     "chJp": true,
     "a": 0,
     "ex": "英語はアクセントの位置で通じやすさが変わる。banana は na を強く。"
    },
    {
     "t": "mc",
     "q": "単語を覚えたかどうかを確かめる良い方法は？",
     "ch": [
      "意味をかくして思い出せるかテストする",
      "単語帳を開いてゆっくりながめるだけにする",
      "音声をBGMのように聞き流すだけにする",
      "単語を色ペンで何回もなぞって書く"
     ],
     "chJp": true,
     "a": 0,
     "ex": "「思い出す」練習は、見るだけより記憶に残る。"
    },
    {
     "t": "mc",
     "q": "たくさんの単語を覚えるとき効果的な整理の方法は？",
     "ch": [
      "食べ物・色などの仲間ごとにまとめる",
      "意味は見ないでつづりだけを順に覚える",
      "単語の文字数ごとに分けてまとめる",
      "自分の好きな順にばらばらに並べる"
     ],
     "chJp": true,
     "a": 0,
     "ex": "仲間（カテゴリー）でまとめると、関連づけて思い出しやすい。"
    },
    {
     "t": "mc",
     "q": "big を覚えるとき、いっしょに覚えると効果的な単語は？",
     "ch": [
      "small（反対の意味の語）",
      "bag（つづりが似た語）",
      "dog（同じ文字数の語）",
      "blue（同じ文字で始まる語）"
     ],
     "chJp": true,
     "a": 0,
     "ex": "反対語はペアにすると2語いっしょに記憶に残る。"
    },
    {
     "t": "mc",
     "q": "日本語を1つの英文にするとき、まず決めると良いのは？",
     "ch": [
      "主語と動詞",
      "最後の単語",
      "使いたい難しい単語",
      "文の長さ"
     ],
     "chJp": true,
     "a": 0,
     "ex": "英語は「だれが＋どうする」が先頭。主語と動詞が決まれば文の骨ができる。"
    },
    {
     "t": "mc",
     "q": "習ったことを復習するのに効果的なタイミングは？",
     "ch": [
      "習ったその日のうちに短く",
      "1か月後に全部まとめて長い時間かけて",
      "テストの前日の夜に一気に全部",
      "忘れたころにゆっくり時間をかけて"
     ],
     "chJp": true,
     "a": 0,
     "ex": "忘れる前に復習すると、少ない時間で記憶が定着する。"
    },
    {
     "t": "mc",
     "q": "人前で英語を話すのがはずかしいと感じたら？",
     "ch": [
      "まちがえても気にせず話す回数を増やす",
      "完璧に話せるようになるまで話さない",
      "英語で聞かれても日本語で答えるようにする",
      "英語を話す場面をできるだけさける"
     ],
     "chJp": true,
     "a": 0,
     "ex": "話した回数が力になる。まちがいは上達の途中にあるもの。"
    },
    {
     "t": "mc",
     "q": "英語の歌で勉強するときのコツは？",
     "ch": [
      "歌詞の意味を確かめながら一緒に歌う",
      "歌詞は見ずにメロディーだけを聞く",
      "日本語訳の歌詞だけを読んで覚える",
      "歌詞を見ずに何度も聞き流すだけにする"
     ],
     "chJp": true,
     "a": 0,
     "ex": "意味を知って口に出すと、単語も発音もいっしょに身につく。"
    },
    {
     "t": "mc",
     "q": "先生に質問するとき、良い聞き方は？",
     "ch": [
      "どこがわからないかを具体的に言う",
      "「全部わかりません」とひとことだけ言う",
      "わからなくても質問せずにがまんする",
      "考えずに答えだけを教えてもらう"
     ],
     "chJp": true,
     "a": 0,
     "ex": "「この文の動詞がわからない」のように具体的だと、ぴったりの説明がもらえる。"
    },
    {
     "t": "mc",
     "q": "長めの英文を読むとき、理解しやすくなる読み方は？",
     "ch": [
      "意味のまとまりごとに区切って読む",
      "1単語ずつ止まって意味を確かめながら読む",
      "文の最後の単語から前に向かって読む",
      "日本語の語順に並べかえてから読む"
     ],
     "chJp": true,
     "a": 0,
     "ex": "I go to school / with my friend. のようにまとまりで読むと意味が追いやすい。"
    }
   ]
  }
 },
 "PASSAGES": {
  "g2_remote_work": {
   "title": "長文：テレワークの広がり",
   "paras": [
    "In recent years, more companies have allowed employees to work from home. This style, often called remote work, spread quickly after many offices had to close for health reasons. Today, some workers go to the office only two or three days a week.",
    "Remote work has benefits. Workers no longer spend hours commuting, which gives them more time for family and rest. Companies can save money because they need smaller offices. People who live far from big cities can now apply for jobs there.",
    "However, it also has disadvantages. Some workers feel lonely and find it hard to separate work from private life. Young employees, in particular, may miss the chance to learn from experienced colleagues. Many companies are therefore searching for a balance between the two styles."
   ]
  },
  "g2_aging_society": {
   "title": "長文：高齢化社会と地域の支え合い",
   "paras": [
    "Japan has one of the oldest populations in the world. Nearly one in three people is now over 65, and the number is still rising. At the same time, fewer babies are being born, so the working population is shrinking.",
    "This creates several challenges. Pension and medical costs are increasing, while there are fewer workers to pay taxes. Some rural villages have lost their schools, shops, and even bus services because so many young people have moved to cities.",
    "Communities are trying various solutions. In one town, retired residents run a small cafe where they teach children traditional crafts. Other towns use volunteer drivers to take elderly people to hospitals. Such efforts show that older people are not only receivers of care but also members who can support others."
   ]
  },
  "g2_fast_fashion": {
   "title": "長文：ファストファッションの代償",
   "paras": [
    "Clothes have never been cheaper. Fast fashion brands release new designs every few weeks and sell them at low prices. As a result, many people buy more clothes than they need and throw them away after wearing them a few times.",
    "This trend has a hidden cost. Making one cotton T-shirt requires about 2,700 liters of water, and dyeing fabric pollutes rivers in some countries. Moreover, most discarded clothes end up in landfills, where synthetic fibers take hundreds of years to break down.",
    "Fortunately, attitudes are slowly changing. Second-hand shops and clothing rental services are growing in popularity, especially among young people. Some brands now collect old clothes and turn them into new products. Choosing quality over quantity may be the simplest way to make a difference."
   ]
  },
  "g2_cashless": {
   "title": "長文：キャッシュレス社会の光と影",
   "paras": [
    "Paying with cash is becoming less common. In many countries, people now use cards or smartphone apps for most of their purchases. Some cafes and buses have even stopped accepting coins and bills altogether.",
    "Cashless payment offers many advantages. Customers do not have to carry a wallet, and shops can serve people faster. Every payment is recorded, which makes it easier for the government to collect taxes and harder for criminals to hide money.",
    "However, a fully cashless society may leave some people behind. Elderly people unfamiliar with technology and those without a bank account could struggle to buy daily necessities. A power failure or system error could also stop all payments at once. For these reasons, several governments have decided to protect the right to pay in cash."
   ]
  },
  "g3_speech_garden": {
   "title": "環境委員 Mio のスピーチ「学校の花だん」",
   "paras": [
    "Hello, everyone. I'm Mio from the environment committee. Today I'd like to tell you about our new project, \"Our School Garden.\" We are going to start it in April. We hope many students will join us and enjoy growing vegetables together.",
    "When I was in elementary school, my grandmother had a small garden behind her house. Every summer, I stayed with her for a week and helped her in the garden. One morning, she gave me some tomato seeds and said, \"These are yours. Take care of them.\" I watered them every day and waited. Nothing happened for a long time, so I almost gave up. But two weeks later, I found small green leaves. I was so excited. In August, I ate my first tomato. It was sweeter than any tomato from the supermarket. My grandmother said, \"Vegetables taste better when you grow them yourself.\" I think she was right.",
    "In our project, each class will have one small garden behind the gym. We will grow tomatoes, cucumbers, and some flowers. Members of the committee will teach you how to water the plants and take care of them. In July, we are going to have a \"Garden Lunch.\" We will cook the vegetables and eat them together with our teachers.",
    "Some students say they are too busy to take care of plants. I understand that. Club activities and homework take a lot of time. But watering the plants takes only five minutes a day. And when you see the first small [ あ ], you will feel very excited, just like me.",
    "Our school has a lot of green space, but we don't use it well. If we use it, our school life will become [ い ]. Please come to the first meeting next Friday after school. We are waiting for you. Thank you."
   ]
  },
  "g3_speech_letters": {
   "title": "Ryota のスピーチ「手書きの手紙」",
   "paras": [
    "Good afternoon, everyone. My name is Ryota. Today I want to talk about writing letters by hand. Many of you may think, \"Letters? We have smartphones!\" I thought so, too. But last year, something changed my mind.",
    "Last spring, my best friend, Haruto, moved to Hokkaido because of his father's job. We promised to keep in touch. At first, we sent messages to each other every day. It was easy, and we could talk quickly. But after a month, our messages became shorter and shorter. Soon we only sent short words like \"OK\" or \"Good.\" One day, I felt sad and said to my mother, \"Haruto and I are not good friends anymore.\" My mother listened to me and said, \"Why don't you write him a letter? When I was young, I wrote letters to my friends in other towns. Writing a letter takes time, but that time shows your feelings.\"",
    "That night, I sat at my desk and started writing. It was difficult. I wrote about my new class, our soccer team, and the ramen shop that we often visited together. It took me two hours to finish one letter. Two weeks later, I got a letter from Haruto. It was three pages long! He wrote about his new school and the snow in Hokkaido. He also drew a picture of his dog. I read his letter again and again. His handwriting was small and careful, and I could really feel his feelings in it.",
    "Now Haruto and I write to each other once a month. Of course, I still use my phone every day. Messages are useful when you want to tell something [ あ ]. But a letter is different. When you write a letter, you think about the person for a long [ い ]. That is the best present for your friend.",
    "So, this is my message to you. Choose one person and write a letter this month. Your parents, your grandparents, or an old friend will be happy to get it. Thank you for listening."
   ]
  },
  "g3_email_cooking": {
   "title": "メール：Nana と Tom のやりとり「料理教室」",
   "paras": [
    "From: Nana / To: Tom / Subject: Cooking class on Saturday — Hi Tom, my mother is going to teach a cooking class at the community center this Saturday. The class starts at 10 a.m. and ends at noon. We will make Japanese curry and rice. You said you wanted to learn how to cook Japanese food, so I thought you would be interested. The class is free, but you need to bring an apron and a towel. My brother Yuta and I will help my mother. If you can come, please tell me by Thursday. After the class, we can eat the curry together! Your friend, Nana",
    "From: Tom / To: Nana / Subject: Re: Cooking class on Saturday — Hi Nana, thank you for telling me about the class. I'd love to join! I have soccer practice on Saturday morning, but it finishes at 9:30, so I can get to the community center by ten. I don't have an apron. Can I borrow one from you? Also, is it OK if I bring my sister Emma? She is twelve and loves cooking. She says Japanese curry is her favorite food. See you on Saturday, Tom"
   ]
  },
  "g3_notice_cycling": {
   "title": "掲示：Midori 市サイクリングデーの案内",
   "paras": [
    "MIDORI CITY CYCLING DAY — Let's ride along the Midori River together! Date: Sunday, May 18 (If it rains, the event will be held on May 25.) Meeting place: Midori Station, North Exit. Time: Meet at 8:30 a.m. We will start at 9:00 a.m. and come back at about 1:00 p.m.",
    "Course: 20 kilometers along the river. We will stop at Sakura Park for a short rest. Who can join: Anyone who is 10 years old or older. Children under 13 must come with an adult. Fee: 500 yen for adults, 300 yen for students. (Lunch is included.)",
    "What to bring: Your own bike, a helmet, a drink, and a towel. If you don't have a bike, you can rent one at the station for 300 yen. How to join: Send an e-mail to the Midori City Sports Office by May 10. Please write your name, age, and phone number. Only the first 50 people can join. For more information, call the Sports Office on weekdays from 9:00 a.m. to 5:00 p.m."
   ]
  },
  "g3_email_host": {
   "title": "Eメール：ホストファミリーの Linda から Kaito へ",
   "paras": [
    "From: Linda Baker / To: Kaito Mori / Subject: Welcome to our home! — Dear Kaito, hello! My name is Linda Baker. My family and I are very happy that you will stay with us in Riverton next month. Let me tell you about our family. My husband, Mark, is a nurse at the city hospital. We have two children. Our son, Jack, is fourteen, the same age as you, and our daughter, Amy, is nine. Jack is a member of the school basketball team, and he wants to teach you how to play. Amy is a little shy, but she is very interested in Japan. She is learning some Japanese words from a book.",
    "Our house is near a big lake. On weekends, we often go fishing or have a picnic there. Please bring warm clothes because it is still cold in the morning in April.",
    "Could you tell me about your favorite food and anything you can't eat? I want to cook something you like on your first night. Also, Jack asked me, \"Does Kaito like basketball?\" Please tell him by e-mail! We are all looking forward to meeting you at the airport. Best wishes, Linda"
   ]
  },
  "g3_story_bakery": {
   "title": "Hinata の作文「おばあちゃんのパン屋」",
   "paras": [
    "My grandmother has a small bakery near the station. Last summer vacation, I helped her for two weeks because her helper, Mr. Sato, broke his leg. My job was to put the bread on the shelves and to say \"Good morning\" to the customers.",
    "On the first day, I was nervous and couldn't speak loudly. An old woman came in and asked me, \"Which bread is the softest?\" I didn't know, so I just looked at my grandmother. She smiled and answered for me. That night, I decided to taste all the bread in the shop and remember it.",
    "A few days later, the same woman came again. This time, I said, \"The milk bread is the softest. My grandmother bakes it at five every morning.\" She bought two and said, \"Thank you. You know your bread well.\" I was really happy.",
    "Now I understand why my grandmother gets up so early. She wants to make the customers happy with fresh bread. When I grow up, I want to have a job that makes people smile, like her."
   ]
  },
  "g3_story_lucas": {
   "title": "Shun の作文「転校生の Lucas」",
   "paras": [
    "In September, a new student came to our class. His name was Lucas, and he came from Brazil. He could speak a little Japanese, but he looked worried. Our teacher asked me to sit next to him because I liked English.",
    "At first, I didn't know what to say to him. I just said \"Hi\" and showed him the page in the textbook. At lunch time, he ate alone. I felt bad about it, but I was afraid of making mistakes in English.",
    "Then, one afternoon, I saw Lucas playing soccer alone in the schoolyard. I love soccer, so I ran to him and said, \"Can I join you?\" He smiled for the first time. We played until it got dark. After that, we talked a lot every day. He taught me some Portuguese words, and I taught him Japanese. His Japanese is much better now, and he has many friends.",
    "Last week, Lucas said to me, \"Shun, you were my first friend in Japan.\" I learned that you don't need perfect English to make friends. You just need to take the first step."
   ]
  },
  "g4_camp_email": {
   "title": "メール：Sam から Yuta へ（キャンプのさそい）",
   "paras": [
    "From: Sam — Hi Yuta! My family is going camping at Lake Hoshino next weekend. Do you want to come with us? We will leave on Saturday morning and come back on Sunday evening. My father will cook curry, and we can go fishing in the lake. Please bring warm clothes because it gets cold at night.",
    "From: Yuta — Hi Sam! Thank you for inviting me. I'd love to go! This will be my first camping trip, so I'm very excited. Do I need a sleeping bag? I don't have one."
   ]
  },
  "g4_flea_market": {
   "title": "ポスター「さくら町フリーマーケット」",
   "paras": [
    "SAKURA TOWN FLEA MARKET — Date: Sunday, May 12 / Time: 9:00 a.m. - 3:00 p.m. / Place: Sakura Park (next to the city library)",
    "You can buy used books, clothes, toys, and more. Everything is under 500 yen! There will be a food corner, too. Enjoy hot dogs and fresh juice.",
    "Do you want to sell your things? Please call the town office by May 5. A table costs 300 yen. If it rains, we will have the market in the library hall."
   ]
  },
  "g4_lost_cat": {
   "title": "Nana と迷子のネコ",
   "paras": [
    "One rainy afternoon, Nana was walking home from school. She heard a small sound. A gray cat was sitting under a bench. It looked hungry.",
    "Nana took the cat home and gave it some milk. Her mother said, \"This cat has a name tag. Someone is looking for it.\" They found a phone number on the name tag and called it.",
    "An hour later, an old man came to Nana's house. The cat was his, and its name was Momo. He was very happy and gave Nana a box of cookies."
   ]
  },
  "g4_aki_speech": {
   "title": "Aki のスピーチ「わたしのおじいちゃん」",
   "paras": [
    "Hello, everyone. I'm Aki. Today I want to talk about my grandfather. He is seventy years old and lives in a small village by the sea.",
    "Every summer, I stay at his house for two weeks. He has a big garden, and we grow tomatoes and cucumbers together. Picking fresh tomatoes is a lot of fun.",
    "Last summer, we went fishing together every morning. I couldn't catch anything on the first day, but on the last day I caught a big fish. My grandfather said, \"You did it!\" Thank you."
   ]
  },
  "g4_tennis_club": {
   "title": "メール：Lee 先生からテニス部へ",
   "paras": [
    "From: Mr. Lee — To: Tennis Club Members — Hello, everyone. Our practice this Friday will change. The city tennis courts will be closed for cleaning, so we will practice in the school gym instead. Please bring your indoor shoes.",
    "Also, the practice game with Kita Junior High School will be on Saturday, October 25. The bus leaves school at 8:00 a.m. Don't be late! If you have any questions, please come to the teachers' room at lunch time."
   ]
  },
  "g4_rina_relay": {
   "title": "Rina と体育祭のリレー",
   "paras": [
    "Rina was not good at sports, so she didn't like the school sports day. But this year, her teacher asked her to run in the relay race.",
    "Rina practiced running every morning before school. Her older brother, Kazu, ran with her and gave her advice. \"Don't look back. Just look at the goal,\" he said.",
    "On the sports day, Rina's team finished second. They didn't win, but her classmates said, \"You were great, Rina!\" She was happier than ever. Now she wants to join the track team next year."
   ]
  },
  "g5_yuta_family": {
   "title": "Yuta の家族",
   "paras": [
    "My name is Yuta. I am thirteen years old. I live in Minato Town with my father, my mother, and my little brother, Sho.",
    "My father is a cook. He works at a restaurant near the station. My mother is a nurse. She is very kind. Sho is seven. He likes trains.",
    "On Sundays, we go to the park. My father and I play catch. My mother reads a book under a big tree. Sho runs with our dog, Koro."
   ]
  },
  "g5_lucy_pet": {
   "title": "Lucy のペット",
   "paras": [
    "Hi, I'm Lucy. I'm from Canada, but I live in Japan now. I have a cat. Her name is Momo. She is white and black.",
    "Momo is two years old. She likes fish and milk. She sleeps on my bed every night. In the morning, she wakes me up at six.",
    "After school, I play with Momo in the garden. She runs very fast. Momo is my best friend."
   ]
  },
  "g5_ryo_club": {
   "title": "Ryo のクラブ活動",
   "paras": [
    "I am Ryo. I am a junior high school student in Sakura City. I am in the basketball club. We have twenty members.",
    "We practice in the gym from four to six after school. We don't practice on Tuesdays and Sundays. Our coach is Mr. Mori. He is tall and very good at basketball.",
    "Next month, we have a big game. I practice very hard. I want to win!"
   ]
  },
  "g5_amy_sunday": {
   "title": "Amy の日曜日",
   "paras": [
    "Hello, I'm Amy. I like Sundays very much. I don't go to school on Sundays.",
    "In the morning, I clean my room and help my mother. We make pancakes together. My brother Jack doesn't help us. He plays video games in his room.",
    "In the afternoon, I go to the library with my friend Mika. We read books there. I usually go home at five."
   ]
  },
  "gpre2_bike_sharing": {
   "title": "長文：ホシノ市のシェアサイクル",
   "paras": [
    "Two years ago, Hoshino City started a bike-sharing service. People can rent a bike at one of forty stations and return it at any other station. The first thirty minutes cost only one hundred yen, so many people use the bikes for short trips.",
    "The service has changed the city in several ways. There are fewer cars in the city center, and the air has become cleaner. Also, shops near the stations say they have more customers because riders stop and look around.",
    "However, some bikes are left in parks or on the street, and the city has to collect them. To solve this problem, the city is planning to give small discounts to people who always return their bikes to a station."
   ]
  },
  "gpre2_shelter_email": {
   "title": "Emily からの Eメール「動物シェルターのボランティア」",
   "paras": [
    "From: Emily Carter — To: Sora Nakamura — Hi Sora, thank you for asking about the animal shelter where I volunteer. We take care of dogs and cats that have lost their homes. On weekends, I walk the dogs and clean their rooms. It is hard work, but I love it.",
    "Next Saturday, the shelter is holding an open day from 10 a.m. to 3 p.m. Visitors can meet the animals and learn how to take care of them. If you want to volunteer, you can sign up at the front desk that day. You must be fifteen or older and come at least twice a month.",
    "Let me know if you want to come. We could go together, and I can introduce you to the staff. Your friend, Emily"
   ]
  },
  "gpre2_sports_day_notice": {
   "title": "掲示：体育祭の日程変更について",
   "paras": [
    "Notice to All Students — Change of Date for Sports Day. Because of the typhoon expected this week, Sports Day will not be held on Friday, September 12. It has been moved to Wednesday, September 17. Classes on that day will be canceled, and students should come to school at 8:30 a.m. in their P.E. clothes.",
    "Please note the following changes. The relay race will start at 9:30 a.m. instead of 10 a.m. Lunch will be served in the gym, not on the field. Students who ordered lunch boxes do not need to order again.",
    "If it rains on September 17, Sports Day will be held in the gym with a shorter program. Check the school website that morning for the final decision. — Student Council"
   ]
  },
  "gpre2_school_farm": {
   "title": "長文：キタガワ高校の学校農園",
   "paras": [
    "Kitagawa High School has a small farm behind the school building. Three years ago, a science teacher, Mr. Ueda, started it with only ten students. Today, more than sixty students grow vegetables there, such as tomatoes, potatoes, and onions.",
    "The vegetables are used for school lunch once a week. On 'Farm Day,' students eat dishes made with what they grew. According to the school, students waste less food on Farm Day because they know how much work it takes to grow vegetables.",
    "The project has also brought the school closer to the local community. Older people in the town come to teach students how to grow vegetables, and in return, students help them with their fields in summer. Mr. Ueda hopes that other schools will start similar projects."
   ]
  },
  "gpre2_homestay_email": {
   "title": "Riku からの Eメール「ホームステイの近況」",
   "paras": [
    "From: Riku Hayashi — To: Ms. Okada — Dear Ms. Okada, I have been in Greenhill for two weeks now. My host family is very kind. They have a daughter, Chloe, who is the same age as me, and we go to school together by bus every morning.",
    "At first, I could not understand what people were saying because they spoke so fast. I was too shy to ask them to repeat. However, Chloe told me that nobody minds being asked, so now I say 'Sorry?' whenever I don't understand. My listening is getting better little by little.",
    "Next week, our class is going camping by a lake. I have never been camping, so I am nervous but excited. I will write again after the trip. Best wishes, Riku"
   ]
  },
  "gpre2_night_market": {
   "title": "お知らせ：サクラ公園サマーナイトマーケット",
   "paras": [
    "Sakura Park Summer Night Market — Every Saturday in August, 5 p.m. to 9 p.m. Enjoy food from over twenty local restaurants, live music, and handmade goods by local artists. Entrance is free.",
    "Food tickets: Buy tickets at the main gate. One ticket costs 300 yen, and most dishes cost one to three tickets. Tickets cannot be used after August 31, so please use them all.",
    "Volunteers wanted: We need high school students to help with cleaning and guiding visitors. Volunteers work from 4:30 p.m. to 9:30 p.m. and receive five free food tickets and a T-shirt. To apply, send an e-mail to the market office by July 25. Please include your name, school, and the dates you can work."
   ]
  },
  "gpre2plus_cashless": {
   "title": "長文：キャッシュレス決済の広がり",
   "paras": [
    "In the past, most people in Japan paid with cash. Today, more and more people pay with cards or smartphones. This is called cashless payment, and it is becoming common in shops, restaurants, and even at small food stands.",
    "Cashless payment has several advantages. It is fast, so lines at the register move quickly. People do not need to carry many coins, and shops spend less time counting money. Some apps also show users how much they have spent, which helps them manage their money.",
    "On the other hand, some people worry about safety. If a smartphone is lost, the owner may lose money. Older people may also find the new systems difficult. For these reasons, experts say that cash and cashless payment should be used together."
   ]
  },
  "gpre2plus_shopping_street": {
   "title": "長文：商店街のこれから",
   "paras": [
    "Many towns in Japan have a shopping street near the station. For a long time, these streets were the center of local life. People bought vegetables, fish, and clothes from small family shops and chatted with the owners.",
    "In recent years, however, many of these shops have closed. Large shopping malls and online stores offer lower prices and longer opening hours, so customers have moved away. In some towns, more than half of the shops now have their shutters down.",
    "Some communities are trying to bring life back to their shopping streets. They hold weekend markets, and young people have opened cafes in empty shops. These efforts show that a shopping street is not only a place to buy things but also a place where people meet."
   ]
  },
  "gpre2plus_bike_sharing": {
   "title": "長文：自転車シェアリング",
   "paras": [
    "Bike sharing is a service that lets people rent a bicycle for a short time. Users find a bike with a smartphone app, ride it to their destination, and leave it at another station. The service has spread quickly in cities around the world.",
    "There are good reasons for its popularity. Bikes are cheaper than taxis and do not produce air pollution. They are also useful for short trips, such as going from a train station to an office. In crowded cities, a bike is often faster than a bus.",
    "However, bike sharing also has problems. Some users leave bikes on the sidewalk, where they block the way for walkers. Cities need to build more parking spaces and set clear rules so that the service can grow."
   ]
  },
  "gpre2plus_hoshino": {
   "title": "長文：高齢化する町 Hoshino の取り組み",
   "paras": [
    "Hoshino is a small town in the mountains. Forty years ago, it had a busy elementary school and many young families. Today, more than half of its residents are over sixty-five, and the school has only twenty students.",
    "This change has caused several problems. The last supermarket closed three years ago, so older people must travel to the next town to buy food. Bus services have also been cut because there are fewer passengers.",
    "The town is not giving up, however. A group of high school students started a shopping service. Once a week, they collect orders from elderly residents and deliver food from the next town. The town also offers free land to young families who move there. Thanks to these efforts, five new families arrived last year."
   ]
  }
 }
};
