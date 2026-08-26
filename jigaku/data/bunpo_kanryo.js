/* jigaku/data/bunpo_kanryo.js ─ 文法レーンの教材：現在完了形
   ・基本文はここに固定で持つ。AIには作らせない（学年・教科書によらず同じものを教えるため）。
   ・語は中1のものだけ。過去分詞は words/data/katsuyo.js に入っている形にそろえてある。
     ただし already / yet / ever / never / since / for / just / twice など、
     現在完了形そのものに必要な語は例外として使う。
   ・データの形は challenge/data/compose.js にならった（jp / answer / words / tip）。 */
window.BUNPO_KANRYO = {
  key: "現在完了形",
  title: "現在完了形　have / has ＋ 過去分詞",
  lead: "「過去」ではなく「<b>いまにつながっている</b>」ことを言うための形です。"+
        "過去形が「そのとき起きたこと」を点で言うのに対して、現在完了形は"+
        "<b>そこから今までのつながり</b>を言います。",
  core: [
    {h:"形", t:"<b>have</b>（主語が he / she / it のときは <b>has</b>）＋ <b>過去分詞</b>。"+
              "過去分詞は「単語アプリ・活用編」で練習した3つめの形です（go → went → <b>gone</b>）。"},
    {h:"打ち消し", t:"have / has のうしろに <b>not</b> を置く。短くすると haven't / hasn't。"},
    {h:"たずねる", t:"<b>Have</b>（<b>Has</b>）を主語の前に出す。答えるときも have / has を使う。"+
                    "<span class='en'>Yes, I have. / No, I haven't.</span>"}
  ],
  uses: [
    {k:"継続", label:"ずっと〜している",
     t:"いつから、どれくらい続いているか。<b>for ＋ 期間</b>（for three years＝3年間）、"+
       "<b>since ＋ 始まった時</b>（since 2020／since this morning）。"},
    {k:"経験", label:"〜したことがある",
     t:"今までに何回あったか。<b>ever</b>（今までに）は たずねるとき、<b>never</b>（一度もない）は打ち消すとき。"+
       "回数は <b>once / twice / 〜 times</b>。「行ったことがある」は <b>have been to</b>（have gone to ではない）。"},
    {k:"完了", label:"〜したところだ・もう〜した",
     t:"いましがた終わったか。<b>just</b>（ちょうど）、<b>already</b>（もう）は言い切るとき、"+
       "<b>yet</b>（まだ・もう）は打ち消しとたずねるとき。"}
  ],
  /* 基本文：継続3・経験3・完了3 */
  sentences: [
    {id:1, use:"継続", en:"I have lived in this town for ten years.",
     ja:"わたしはこの町に10年間ずっと住んでいます。",
     tip:"for ＋ 期間。「10年間ずっと」で、いまも住んでいる。"},
    {id:2, use:"継続", en:"She has been busy since this morning.",
     ja:"彼女は今朝からずっといそがしい。",
     tip:"主語が She なので has。since ＋ 始まった時。been は be の過去分詞。"},
    {id:3, use:"継続", en:"We have known each other for a long time.",
     ja:"わたしたちは長い間おたがいを知っています。",
     tip:"know → knew → known。「知っている」状態が続いている。"},
    {id:4, use:"経験", en:"I have been to Kyoto twice.",
     ja:"わたしは京都に2回行ったことがあります。",
     tip:"「行ったことがある」は have been to。twice は2回。"},
    {id:5, use:"経験", en:"Have you ever seen a panda?",
     ja:"あなたは今までにパンダを見たことがありますか。",
     tip:"たずねるので Have を前に。ever は「今までに」。see → saw → seen。"},
    {id:6, use:"経験", en:"He has never eaten this food.",
     ja:"彼はこの食べ物を一度も食べたことがありません。",
     tip:"never だけで打ち消しになるので not はいらない。eat → ate → eaten。"},
    {id:7, use:"完了", en:"I have just eaten lunch.",
     ja:"わたしはちょうど昼食を食べたところです。",
     tip:"just は have と過去分詞の間に置く。"},
    {id:8, use:"完了", en:"She has already read the book.",
     ja:"彼女はもうその本を読みました。",
     tip:"already も have / has のうしろ。read は形が変わらないが、読み方は「レッド」。"},
    {id:9, use:"完了", en:"They have not come home yet.",
     ja:"彼らはまだ家に帰ってきていません。",
     tip:"打ち消しは have のうしろに not。yet は文の終わりで「まだ」。"}
  ]
};
