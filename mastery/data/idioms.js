/* mastery/data/idioms.js ─ 熟語200語 到達度テストの教材（20連語 × 10セット ＝ 200）
 *
 * ★セットは「軸になる動詞」で組む（先生の設計 2026-10-05）：
 *   「look 〜 ばかり連続で出題したあと、take 〜 ばかり出題する」ように、同じ軸の熟語をまとめて
 *   出すことで、動詞ごとの意味の広がり（look at／for／after／up…）を一気に身につける。
 *   セット1 look 系 → 2 take 系 → 3 get 系 → 4 make 系 → 5 go・come 系 → 6 have・give・keep 系
 *   → 7 be 系（be＋形容詞＋前置詞）→ 8 動詞＋副詞 → 9 動詞＋前置詞 → 10 その他（前置詞句・数量・つなぎ）
 *   1セットは必ず20（到達度テストの「覚えた数 N / 200語」の分母がそろうように）。
 *
 * ★出題は 2000語 到達度テストと同じ「訳→英語を打つ」。判定も同じ assets/wordjudge.js：
 *   ・...（…）  … 何語入ってもよい場所（take ... off ＝ take off／take it off のどちらも○）
 *   ・( )      … あってもなくてもよい（look back (on) ＝ look back／look back on）
 *   ・［ ］    … 直前の語と入れかえられる（have［has］to ＝ have to／has to）
 *   ・alt      … ほかに正解とする書きかた（a lot of ＝ lots of）
 *   訳の文字列は words.js と同じ流儀（「…を」「～」）。同じ意味の熟語が2つ以上あるときは
 *   出題時に手がかり（「w ではじまる」）が自動でつく（tools/check_exams.mjs が見張る）。
 *
 * ★中3までの頻出熟語に限る（教科書3社と公立入試の頻度から選定）。200でとめる＝入れたいものが出たら、
 *   いまの200のどれより上かで判断して入れかえる（先生 2026-10-05「言い出したらキリがない。優先度を吟味して」）。
 *   2026-10-05 の入れかえ：a lot of・a few・a little（2000語テストの基本編にある）・at the same time・look away・
 *   get hurt・make a wish・fill in・show up を外し、in time・on time・these days・according to（入試の本文・グラフ問題で頻出）・
 *   sound like・get to know・make a presentation・clean up・hold on を入れた。as soon as possible は these days／according to
 *   より入試頻度が低いので見送り。
 *   id は セット番号×100＋通し（101〜120, 201〜…）。words.js とは別の id 空間・別の控え。
 */
window.IDIOMS = {
ver: "v1",
sets: [

{ title: "look 系", sub: "見る・聞く", emoji: "👀",
  items: [
  { w: "look at",            j: "…を見る" },
  { w: "look for",           j: "…をさがす" },
  { w: "look forward to",    j: "…を楽しみに待つ" },
  { w: "look like",          j: "…のように見える、…に似ている" },
  { w: "look after",         j: "…の世話をする、…の面倒を見る" },
  { w: "look around",        j: "（…を）見て回る、見回す" },
  { w: "look up",            j: "（辞書などで）…を調べる、見上げる" },
  { w: "look back (on)",     j: "（…を）振り返る、思い出す" },
  { w: "look out",           j: "気をつける、注意する" },
  { w: "look into",          j: "…をのぞきこむ、…を調べる" },
  { w: "look over",          j: "…を見渡す、…にざっと目を通す" },
  { w: "look up to",         j: "…を尊敬する" },
  { w: "look down on",       j: "…を見下す、…を軽べつする" },
  { w: "sound like",         j: "…のように聞こえる、…のようだ" },
  { w: "see ... off",        j: "…を見送る" },
  { w: "see a doctor",       j: "医者に診てもらう" },
  { w: "watch out",          j: "気をつける" },
  { w: "listen to",          j: "…を聞く、…に耳をかたむける" },
  { w: "hear from",          j: "…から便りがある、…から連絡がある" },
  { w: "hear of",            j: "…のことを耳にする、…のうわさを聞く" }
]},

{ title: "take 系", sub: "取る・連れていく", emoji: "✋",
  items: [
  { w: "take care of",       j: "…の世話をする、…をだいじにする" },
  { w: "take a picture (of)", j: "（…の）写真をとる", alt: ["take pictures (of)", "take a photo (of)", "take photos (of)"] },
  { w: "take a walk",        j: "散歩する" },
  { w: "take a bath",        j: "ふろに入る" },
  { w: "take a shower",      j: "シャワーを浴びる" },
  { w: "take a rest",        j: "ひと休みする、休息をとる" },
  { w: "take a look (at)",   j: "（…を）ちょっと見る" },
  { w: "take part in",       j: "…に参加する" },
  { w: "take place",         j: "行われる、開かれる、起こる" },
  { w: "take ... off",       j: "（服・くつなど）を脱ぐ、（飛行機が）離陸する" },
  { w: "take ... out",       j: "…を取り出す、…を持ち出す" },
  { w: "take ... to ～",     j: "…を～へ連れていく、…を～へ持っていく" },
  { w: "take a bus［train］", j: "バス［電車］に乗る、バス［電車］で行く" },
  { w: "take a seat",        j: "席につく、すわる" },
  { w: "take a trip (to)",   j: "（…へ）旅行する" },
  { w: "take turns",         j: "交代でする、順番にする" },
  { w: "take notes",         j: "メモをとる、ノートをとる" },
  { w: "take it easy",       j: "気楽にやる、のんびりする" },
  { w: "take a message",     j: "伝言を受ける、メッセージを預かる" },
  { w: "take an exam",       j: "試験を受ける", alt: ["take a test", "take the exam", "take the test", "take exams", "take tests"] }
]},

{ title: "get 系", sub: "着く・なる・手に入れる", emoji: "🧲",
  items: [
  { w: "get up",             j: "起きる、起床する" },
  { w: "get to",             j: "…に着く、…にたどり着く" },
  { w: "get on",             j: "（バス・電車などに）乗る" },
  { w: "get off",            j: "（バス・電車などから）降りる" },
  { w: "get home",           j: "帰宅する、家に着く" },
  { w: "get along with",     j: "…と仲よくやっていく、…とうまくやる" },
  { w: "get together",       j: "集まる、集合する" },
  { w: "get back",           j: "…を取り戻す、（家などに）もどる" },
  { w: "get out of",         j: "…から出る、…から外へ出る" },
  { w: "get in",             j: "（車などに）乗りこむ、中に入る" },
  { w: "get married (to)",   j: "（…と）結婚する" },
  { w: "get well",           j: "（病気が）よくなる、元気になる" },
  { w: "get angry",          j: "腹を立てる、怒る" },
  { w: "get lost",           j: "道に迷う、迷子になる" },
  { w: "get ready (for)",    j: "（…の）準備をする、用意をする" },
  { w: "get over",           j: "…を乗りこえる、（病気から）回復する" },
  { w: "get rid of",         j: "…を取り除く、…を処分する" },
  { w: "get in touch with",  j: "…と連絡をとる" },
  { w: "get used to",        j: "…に慣れる" },
  { w: "get to know",        j: "…と知り合いになる、…を知るようになる" }
]},

{ title: "make 系", sub: "作る・する", emoji: "🔨",
  items: [
  { w: "make friends (with)", j: "（…と）友達になる" },
  { w: "make a mistake",     j: "まちがえる、ミスをする" },
  { w: "make a speech",      j: "スピーチをする、演説をする" },
  { w: "make up one's mind", j: "決心する", alt: ["make up my mind", "make up your mind", "make up his mind", "make up her mind", "make up their mind", "make up our mind"] },
  { w: "make fun of",        j: "…をからかう、…をばかにする" },
  { w: "make sure (that)",   j: "…を確かめる、必ず…するようにする" },
  { w: "make money",         j: "お金をかせぐ、お金をもうける" },
  { w: "make a noise",       j: "音を立てる、さわぐ" },
  { w: "make a decision",    j: "決定する、決断する" },
  { w: "make a plan",        j: "計画を立てる" },
  { w: "make an effort",     j: "努力する" },
  { w: "make a promise",     j: "約束する" },
  { w: "make it",            j: "間に合う、うまくやる、成功する" },
  { w: "make sense",         j: "意味が通じる、理にかなう、なるほどと思える" },
  { w: "make a difference",  j: "ちがいを生む、重要である" },
  { w: "make a presentation", j: "発表をする、プレゼンをする" },
  { w: "make a reservation", j: "予約する" },
  { w: "make room for",      j: "…のために場所をあける" },
  { w: "make a phone call (to)", j: "（…に）電話をかける" },
  { w: "make the bed",       j: "ベッドを整える" }
]},

{ title: "go・come 系", sub: "行く・来る", emoji: "🚶",
  items: [
  { w: "go to bed",          j: "寝る、床につく" },
  { w: "go ...ing",          j: "…しに行く" },
  { w: "go shopping",        j: "買い物に行く" },
  { w: "go on",              j: "続く、続ける、（事が）起こる" },
  { w: "go out",             j: "外出する、出かける" },
  { w: "go back (to)",       j: "（…へ）帰る、（もとの場所へ）もどる" },
  { w: "go away",            j: "立ち去る、去る" },
  { w: "go abroad",          j: "外国へ行く、海外へ行く" },
  { w: "go ahead",           j: "（どうぞ）お先に、先へ進む" },
  { w: "go by",              j: "（時が）過ぎる、通り過ぎる" },
  { w: "go through",         j: "…を経験する、…を通りぬける" },
  { w: "go up",              j: "上がる、のぼる" },
  { w: "go well",            j: "うまくいく" },
  { w: "go for a walk",      j: "散歩に出かける" },
  { w: "come from",          j: "…の出身である、…から来る" },
  { w: "come back",          j: "帰ってくる、もどってくる" },
  { w: "come true",          j: "実現する、本当になる" },
  { w: "come up with",       j: "（考えなど）を思いつく" },
  { w: "come across",        j: "…をふと見つける、…に偶然出会う" },
  { w: "come out",           j: "出てくる、（本などが）出版される" }
]},

{ title: "have・give・keep 系", sub: "持つ・あたえる・保つ", emoji: "🤲",
  items: [
  { w: "have a good time",   j: "楽しい時を過ごす", alt: ["have a great time", "have a nice time", "have a wonderful time"] },
  { w: "have fun",           j: "楽しむ、楽しく過ごす" },
  { w: "have［has］to",      j: "…しなければならない" },
  { w: "have a cold",        j: "かぜをひいている" },
  { w: "have breakfast",     j: "朝食をとる、朝食を食べる", alt: ["eat breakfast"] },
  { w: "have been to",       j: "…に行ったことがある" },
  { w: "have no idea",       j: "（まったく）わからない" },
  { w: "have a chance to",   j: "…する機会がある" },
  { w: "have a party",       j: "パーティーを開く" },
  { w: "have a headache",    j: "頭が痛い、頭痛がする" },
  { w: "give up",            j: "…をあきらめる、やめる" },
  { w: "give ... a hand",    j: "…に手を貸す、…を手伝う" },
  { w: "give ... back",      j: "…を返す" },
  { w: "give ... a ride",    j: "…を車に乗せる" },
  { w: "give birth to",      j: "…を産む、…を生み出す" },
  { w: "keep ...ing",        j: "…し続ける" },
  { w: "keep in touch (with)", j: "（…と）連絡を取り合う" },
  { w: "keep ... in mind",   j: "…を心に留めておく、…を覚えておく" },
  { w: "keep a diary",       j: "日記をつける" },
  { w: "keep away from",     j: "…に近づかない、…を避ける" }
]},

{ title: "be 系", sub: "be ＋ 形容詞 ＋ 前置詞", emoji: "🟰",
  items: [
  { w: "be able to",         j: "…することができる" },
  { w: "be afraid of",       j: "…をおそれる、…がこわい" },
  { w: "be good at",         j: "…がじょうずだ、…が得意だ" },
  { w: "be interested in",   j: "…に興味がある、…に関心がある" },
  { w: "be famous for",      j: "…で有名である" },
  { w: "be full of",         j: "…でいっぱいである" },
  { w: "be late for",        j: "…に遅れる、…に遅刻する" },
  { w: "be proud of",        j: "…を誇りに思う" },
  { w: "be different from",  j: "…とちがう、…と異なる" },
  { w: "be known as",        j: "…として知られている" },
  { w: "be surprised at",    j: "…に驚く" },
  { w: "be covered with",    j: "…でおおわれている" },
  { w: "be made of",         j: "（材料）…でできている" },
  { w: "be made from",       j: "（原料）…から作られている" },
  { w: "be ready for",       j: "…の用意ができている、…の準備ができている" },
  { w: "be kind to",         j: "…に親切である、…にやさしい" },
  { w: "be busy with",       j: "…でいそがしい" },
  { w: "be absent from",     j: "…を欠席する、…を休む" },
  { w: "be popular among［with］", j: "…の間で人気がある" },
  { w: "be sure (that)",     j: "きっと…だと思う、…を確信している" }
]},

{ title: "動詞＋副詞", sub: "put・turn・pick …", emoji: "🔁",
  items: [
  { w: "put ... on",         j: "…を着る、…を身につける" },
  { w: "put ... off",        j: "…を延期する、…をあとまわしにする" },
  { w: "put ... away",       j: "…を片づける、…をしまう" },
  { w: "turn ... on",        j: "（スイッチなど）をつける、入れる" },
  { w: "turn ... off",       j: "（スイッチなど）を消す、切る" },
  { w: "turn around",        j: "振り向く、向きを変える" },
  { w: "pick ... up",        j: "…を拾い上げる、…を車で迎えに行く" },
  { w: "throw ... away",     j: "…を捨てる" },
  { w: "bring ... up",       j: "…を育てる、（話題）を持ち出す" },
  { w: "grow up",            j: "成長する、大人になる" },
  { w: "wake up",            j: "目を覚ます、起きる" },
  { w: "hurry up",           j: "急ぐ" },
  { w: "cheer ... up",       j: "…を元気づける" },
  { w: "hand ... in",        j: "…を提出する" },
  { w: "write ... down",     j: "…を書きとめる、…をメモする" },
  { w: "try ... on",         j: "…を試着する" },
  { w: "find ... out",       j: "…を見つけ出す、…がわかる" },
  { w: "clean ... up",       j: "…をきれいにそうじする" },
  { w: "hold on",            j: "（電話を）切らずに待つ、ちょっと待つ" },
  { w: "call ... back",      j: "…に電話をかけ直す" }
]},

{ title: "動詞＋前置詞", sub: "wait for・agree with …", emoji: "🔗",
  items: [
  { w: "wait for",           j: "…を待つ" },
  { w: "agree with",         j: "…に同意する、…に賛成する" },
  { w: "belong to",          j: "…に属する、…のものである" },
  { w: "depend on",          j: "…に頼る、…次第である" },
  { w: "think of",           j: "…のことを考える、…を思いつく" },
  { w: "think about",        j: "…について考える" },
  { w: "arrive at［in］",    j: "…に到着する" },
  { w: "ask for",            j: "…を求める、…を頼む" },
  { w: "worry about",        j: "…について心配する、…を気にする" },
  { w: "laugh at",           j: "…を笑う、…をばかにして笑う" },
  { w: "talk about",         j: "…について話す" },
  { w: "speak to［with］",   j: "…と話す、…に話しかける" },
  { w: "care about",         j: "…を気にかける、…を大切に思う" },
  { w: "pay for",            j: "…の代金を支払う" },
  { w: "succeed in",         j: "…に成功する" },
  { w: "suffer from",        j: "…に苦しむ、（病気）をわずらう" },
  { w: "dream of［about］",  j: "…を夢見る" },
  { w: "stay with",          j: "…の家に泊まる、…のところに滞在する" },
  { w: "graduate from",      j: "…を卒業する" },
  { w: "work on",            j: "…に取り組む" }
]},

{ title: "その他", sub: "前置詞句・時・つなぎ", emoji: "🧩",
  items: [
  { w: "each other",         j: "おたがい（に）" },
  { w: "of course",          j: "もちろん" },
  { w: "for example",        j: "たとえば" },
  { w: "at first",           j: "最初は、はじめのうちは" },
  { w: "at last",            j: "ついに、最後に" },
  { w: "in front of",        j: "…の前に［で］" },
  { w: "in the future",      j: "将来（に）、未来に" },
  { w: "for the first time", j: "はじめて" },
  { w: "one day",            j: "ある日" },
  { w: "in fact",            j: "実は、実際に" },
  { w: "such as",            j: "（例をあげて）…のような" },
  { w: "because of",         j: "…のために、…が原因で" },
  { w: "instead of",         j: "…のかわりに" },
  { w: "thanks to",          j: "…のおかげで" },
  { w: "all over the world", j: "世界中で［に］" },
  { w: "by the way",         j: "ところで" },
  { w: "in time",            j: "間に合って" },
  { w: "on time",            j: "時間どおりに" },
  { w: "these days",         j: "このごろ、最近は" },
  { w: "according to",       j: "…によれば、…にしたがって" }
]}

]};

/* 通しの id・品詞・セット番号をつけて、全語の平らな一覧（all）を作る。
   id＝セット×100＋通し。品詞は全部「熟語」（手がかりの計算は同じ品詞の中で相手をさがす）。 */
(function (D) {
  var all = [];
  D.sets.forEach(function (s, si) {
    s.n = si + 1;
    s.items.forEach(function (it, i) { it.id = (si + 1) * 100 + i + 1; it.p = "熟語"; it.s = si + 1; all.push(it); });
  });
  D.all = all;
})(window.IDIOMS);
