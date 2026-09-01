/* dojo/data/drill_s2.js ─ 読解道場 S2「図形分析」（文の骨組みを記号で見抜く・自動採点）
   先生の図形分析法（note「図形で理解させるリーディング指導」）の訓練。
   日本語に訳さずに、記号だけで主語・動詞・目的語・かたまりの切れ目をつかむ。
   sent   … 出題する英文（そのまま見せる）
   marked … 記号をつけた形（答え合わせで見せる）
   関連テク G01（動詞の印）／G02（つなぎの印）／G03（（ ）でくくる） */
window.DOJO_S2 = {
  skill: "S2", name: "図形分析",
  desc: "動詞に ＝ ≒ V、つなぎに ／ → ← ＆ ←→ ＞、前置詞のない副詞に（ ）。訳さずに骨組みを見抜く",
  items: [

    { id:"S2-01", tech:["G01"],
      sent:"The tall boy in the blue cap plays soccer every Sunday.",
      q:"V をつけるのはどの語ですか。",
      choices:["plays","boy","cap","every"], answer:0,
      marked:"The tall boy ／in the blue cap <b>plays</b>[V] soccer （every Sunday）.",
      why:"plays が動詞。V の手前 The tall boy in the blue cap までが丸ごと主語。",
      trap:"boy を選ぶと主語と動詞を取りちがえている。主語がどれだけ長くても、V の位置は動詞。" },

    { id:"S2-02", tech:["G01"],
      sent:"My father is a doctor at the city hospital.",
      q:"is につける印は？",
      choices:["＝","V","≒","／"], answer:0,
      marked:"My father <b>＝</b> a doctor ／at the city hospital.",
      why:"be動詞は ＝。My father ＝ a doctor と読めば、訳さなくても「父＝医者」だと分かる。",
      trap:"V は一般動詞につける印。be動詞と一般動詞は別の記号にして区別する。" },

    { id:"S2-03", tech:["G01"],
      sent:"Your idea sounds interesting.",
      q:"sounds につける印は？",
      choices:["≒","＝","V","＆"], answer:0,
      marked:"Your idea <b>≒</b> interesting.",
      why:"sound は「〜に聞こえる」＝ほぼイコールの働きなので ≒。look / feel / become も同じ仲間。",
      trap:"ふつうの動詞と同じ V にすると、うしろが目的語だと思ってしまう。≒ のうしろは「同じもの・ようす」。" },

    { id:"S2-04", tech:["G01"],
      sent:"Mr. Sato, our English teacher, lives near the station.",
      q:"Mr. Sato のうしろの「,」につける印は？",
      choices:["＝","／","＆","←→"], answer:0,
      marked:"Mr. Sato <b>＝</b> our English teacher ＝ <b>lives</b>[V] ／near the station.",
      why:"肩書を差しこむ「,」は ＝。Mr. Sato ＝ our English teacher。同じ人を言いかえている。",
      trap:"＆ だと「2人いる」と読んでしまう。カンマの前後が同じ人かどうかを見る。" },

    { id:"S2-05", tech:["G02"],
      sent:"We watched a movie in the living room.",
      q:"／ を入れるのはどこですか。",
      choices:["in の前","movie の前","watched の前","room の前"], answer:0,
      marked:"We <b>watched</b>[V] a movie <b>／</b>in the living room.",
      why:"前置詞の前に ／。そこで目的語 a movie が終わったと分かる。",
      trap:"room の前で切ると in the が宙に浮く。切るのは前置詞の直前。" },

    { id:"S2-06", tech:["G02"],
      sent:"She walked to the library from her house.",
      q:"to と from につける印の組み合わせは？",
      choices:["to → ／ from ←","to ← ／ from →","どちらも ／","どちらも ＝"], answer:0,
      marked:"She <b>walked</b>[V] <b>→</b>to the library <b>←</b>from her house.",
      why:"to は向かう先だから →、from は出どころだから ←。矢印の向きだけで移動が読める。",
      trap:"向きを逆にすると、どこから来てどこへ行ったのかが反対になる。" },

    { id:"S2-07", tech:["G02"],
      sent:"He ate breakfast and left for school.",
      q:"＆ がつないでいるのは何と何ですか。",
      choices:["ate と left（動詞×2）","breakfast と school（名詞×2）","He と school","ate と for"], answer:0,
      marked:"He <b>ate</b>[V] breakfast <b>＆</b> <b>left</b>[V] ／for school.",
      why:"and の前後で同じ種類をさがす。ate も left も動詞。単語の意味を知らなくても「動詞が2つ並んでいる」と分かる。",
      trap:"breakfast と school は and をはさんでいない。＆ のすぐ前とすぐあとを見る。" },

    { id:"S2-08", tech:["G02"],
      sent:"I bought apples and oranges at the shop.",
      q:"＆ がつないでいるのは何と何ですか。",
      choices:["apples と oranges（名詞×2）","bought と apples","I と apples","bought と at"], answer:0,
      marked:"I <b>bought</b>[V] apples <b>＆</b> oranges <b>／</b>at the shop.",
      why:"ここでは名詞が2つ並んでいる。＆ は「同じ種類が2つ」の合図で、名詞・動詞・文のどれかを見分ける。",
      trap:"動詞×2 と決めつけない。＆ の前後の品ぞろえを毎回たしかめる。" },

    { id:"S2-09", tech:["G02"],
      sent:"This book is difficult, but that one is easy.",
      q:"but につける印と、その意味は？",
      choices:["←→（前と後ろが逆向き）","＆（同じ向き）","＞（大小）","／（切れ目だけ）"], answer:0,
      marked:"This book <b>＝</b> difficult, <b>←→</b>but that one <b>＝</b> easy.",
      why:"but は ←→。前と後ろで向きが逆になる合図。difficult と easy が反対だと図で見える。",
      trap:"＆ にすると「両方むずかしい」と読んでしまう。逆接は必ず ←→。" },

    { id:"S2-10", tech:["G02"],
      sent:"Soccer is more popular than baseball in my class.",
      q:"than につける印は？",
      choices:["＞","＝","＆","→"], answer:0,
      marked:"Soccer <b>＝</b> more popular <b>＞</b>than baseball <b>／</b>in my class.",
      why:"than は ＞。どちらが上かが図で分かる。Soccer ＞ baseball。",
      trap:"＝ にすると同じくらいになってしまう。比べている文は ＞ で向きを残す。" },

    { id:"S2-11", tech:["G03"],
      sent:"My brother usually studies English here.",
      q:"（ ）でくくるのはどれとどれですか。",
      choices:["usually と here","English と here","My brother と English","studies と English"], answer:0,
      marked:"My brother <b>（usually）</b> <b>studies</b>[V] English <b>（here）</b>.",
      why:"usually は文中の副詞、here は前置詞の付かない場所。くくると My brother / studies / English の骨組みが残る。",
      trap:"English は目的語なのでくくらない。くくるのは「無くても文が成り立つ」ところ。" },

    { id:"S2-12", tech:["G03","G02"],
      sent:"They cleaned the classroom after lunch yesterday.",
      q:"after lunch と yesterday の扱い方の組み合わせは？",
      choices:["after lunch は ／、yesterday は（ ）","どちらも（ ）","どちらも ／","after lunch は（ ）、yesterday は ／"], answer:0,
      marked:"They <b>cleaned</b>[V] the classroom <b>／</b>after lunch <b>（yesterday）</b>.",
      why:"after は前置詞なので前に ／。yesterday は前置詞が付かないので（ ）。道具を使い分けるのがこの記号の要。",
      trap:"どちらも（ ）にすると前置詞のかたまりが見えなくなる。前置詞があるかどうかで決める。" }
  ]
};
