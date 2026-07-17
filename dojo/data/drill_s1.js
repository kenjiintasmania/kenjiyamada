/* dojo/data/drill_s1.js ─ 読解道場 S1「根拠さがし」（内容一致/不一致・自動採点）
   岡山県立入試 大問5（長文の内容一致・mcqMulti）対策の短段落訓練。 */
window.DOJO_S1 = {
  skill: "S1", name: "根拠さがし",
  desc: "本文と選択肢を照らし合わせ、言い換えを見抜いて根拠で選ぶ",
  items: [
    { id:"S1-01", tech:["T04","T07"], qtype:"match",
      passage:"Wakaba Town has an old Japanese garden. Many people visit it in spring because the flowers there are very beautiful. Last year, students at Wakaba Junior High School made an English map of the garden for visitors from other countries. Now the garden is becoming popular among them.",
      q:"本文の内容と一致するものを選びなさい。",
      choices:[
        "Visitors from other countries made an English map of the garden.",
        "Many people visit the garden in fall because the flowers are beautiful.",
        "Junior high school students created a map in English for foreign visitors.",
        "The garden was built by students at Wakaba Junior High School."
      ],
      answer:2,
      why:"本文の made an English map ... for visitors from other countries ↔ 選択肢の created a map in English for foreign visitors。作ったのは中学生。",
      trap:"0は主語のすり替え。地図を作ったのは生徒で、外国からの訪問者ではない。" },

    { id:"S1-02", tech:["T04","T07","T02"], qtype:"match",
      passage:"Mr. Tanaka grows peaches in Midori Town. Every summer, about two hundred people come to his farm to pick peaches. He started this event ten years ago because he wanted more people to learn about his town. Children can eat the peaches they pick, so the event is popular with families.",
      q:"本文の内容と一致するものを選びなさい。",
      choices:[
        "Mr. Tanaka began the event because he wanted people to know about his town.",
        "About two thousand people visit the farm every summer to pick peaches.",
        "Mr. Tanaka wanted to learn about other towns, so he started the event.",
        "Children grow peaches with Mr. Tanaka every summer in Midori Town."
      ],
      answer:0,
      why:"本文の started this event ... because he wanted more people to learn about his town ↔ 選択肢の began the event because he wanted people to know about his town。",
      trap:"1は数字ずらし。来る人は about two hundred（約200人）で、two thousand（2000人）ではない。" },

    { id:"S1-03", tech:["T04","T07"], qtype:"mismatch",
      passage:"Hikari City is famous for its sweet muscats. In fall, many families visit the farms there to enjoy picking them. Ms. Sato, a farmer, says that growing muscats is hard work because they need a lot of care. However, she feels happy when visitors smile and say the muscats are delicious.",
      q:"本文の内容と一致しないものを選びなさい。",
      choices:[
        "Hikari City is well known for its sweet muscats.",
        "Many families enjoy picking muscats in Hikari City in spring.",
        "Ms. Sato says muscats need much care, so growing them is not easy.",
        "Ms. Sato is glad when visitors like her muscats."
      ],
      answer:1,
      why:"本文の In fall, many families visit the farms ↔ 選択肢の in spring が食い違う。収穫体験は秋なので、これだけが本文と合わない。",
      trap:"2は hard work を not easy、a lot of care を much care と言い換えただけで、本文と一致する。" },

    { id:"S1-04", tech:["T04","T07"], qtype:"match",
      passage:"Wakaba Town has a small factory that makes denim bags. The workers there use old jeans to make new bags, so they don't waste cloth. These bags are sold at shops in the town, and young people like their cool designs. The factory also holds a class for people who want to make their own bags.",
      q:"本文の内容と一致するものを選びなさい。",
      choices:[
        "Young people in Wakaba Town make denim bags at the factory.",
        "Wakaba Town has a big factory that makes denim jackets.",
        "The factory sells its bags at shops in other towns.",
        "The factory makes bags from used jeans and doesn't throw away cloth."
      ],
      answer:3,
      why:"本文の use old jeans to make new bags / don't waste cloth ↔ 選択肢の makes bags from used jeans / doesn't throw away cloth。",
      trap:"2は場所のすり替え。かばんは町の中の店（shops in the town）で売られ、他の町とは書かれていない。" },

    { id:"S1-05", tech:["T04","T07","T02"], qtype:"match",
      passage:"A tram has run through Hikari City for more than fifty years. About three thousand people ride it every day, and many of them are students or old people. Last month, one tram was painted with pictures of flowers by high school students. Now many people take photos of it.",
      q:"本文の内容と一致するものを選びなさい。",
      choices:[
        "The tram has carried people in Hikari City for over fifty years.",
        "About three hundred people ride the tram every day.",
        "Old people painted one tram with pictures of flowers last month.",
        "The city will buy new trams for students next month."
      ],
      answer:0,
      why:"本文の A tram has run through Hikari City for more than fifty years ↔ 選択肢の has carried people ... for over fifty years。",
      trap:"1は数字ずらし。乗客は about three thousand（約3000人）で、three hundred（300人）ではない。" },

    { id:"S1-06", tech:["T04","T07"], qtype:"mismatch",
      passage:"Every year, Midori Town holds a summer festival by the river on the first Saturday of August. About fifty children carry a small mikoshi through the town in the afternoon. At night, people enjoy dancing together and watching fireworks. This year, junior high school students will sell ice cream to help the festival.",
      q:"本文の内容と一致しないものを選びなさい。",
      choices:[
        "The festival takes place near the river every August.",
        "People dance and see fireworks in the evening.",
        "Children carry a mikoshi through the town at night.",
        "Students are going to sell ice cream at this year's festival."
      ],
      answer:2,
      why:"本文の carry a small mikoshi ... in the afternoon ↔ 選択肢の at night が食い違う。夜にあるのは踊りと花火。",
      trap:"1は at night → in the evening、watching fireworks → see fireworks の言い換えで、本文と一致する。" },

    { id:"S1-07", tech:["T04","T07","T06"], qtype:"match",
      passage:"Once a month, students at Wakaba Junior High School pick up trash along the river near their school. They started this volunteer work three years ago because the river was dirty then. Thanks to their work, the river is now clean, and birds have come back to it. The students feel happy to see them.",
      q:"本文の内容と一致するものを選びなさい。",
      choices:[
        "The students started the volunteer work thirteen years ago.",
        "The students clean the area along the river every month.",
        "The students began the work because birds came back to the river.",
        "The river near the school is still dirty now."
      ],
      answer:1,
      why:"冒頭文の Once a month ... pick up trash along the river ↔ 選択肢の clean the area along the river every month。",
      trap:"2は因果の逆転。鳥が戻ったのは清掃活動の結果で、活動を始めた理由ではない。" },

    { id:"S1-08", tech:["T04","T07"], qtype:"mismatch",
      passage:"Yuki is a member of the library committee at Midori Junior High School. Every Tuesday, she reads picture books to first-year students during lunch time. At first she was nervous, but now she enjoys it because the students listen to her with smiles. Next month, the committee will make a newspaper about popular books.",
      q:"本文の内容と一致しないものを選びなさい。",
      choices:[
        "Yuki works as a library committee member at her school.",
        "Yuki felt nervous at first, but now she has fun reading.",
        "The committee is going to make a newspaper about books next month.",
        "First-year students read picture books to Yuki during lunch time."
      ],
      answer:3,
      why:"本文の she reads picture books to first-year students ↔ 選択肢の First-year students read ... to Yuki は主語が逆。読んであげているのはユキ。",
      trap:"1は was nervous → felt nervous、enjoys → has fun の言い換えで、本文と一致する。" },

    { id:"S1-09", tech:["T04","T07"], qtype:"match",
      passage:"Kenta had his work experience at a flower shop in Hikari City for three days. He learned that the staff get up early every morning to keep the flowers fresh. On the last day, a woman bought flowers for her mother, and Kenta chose them for her. He was glad when she thanked him.",
      q:"本文の内容と一致するものを選びなさい。",
      choices:[
        "The people at the shop wake up early so the flowers stay fresh.",
        "Kenta worked at the flower shop for three weeks.",
        "Kenta bought flowers for his mother on the last day.",
        "Kenta wants to work at a flower shop in the future."
      ],
      answer:0,
      why:"本文の the staff get up early every morning to keep the flowers fresh ↔ 選択肢の wake up early so the flowers stay fresh。",
      trap:"2は主語のすり替え。花を買ったのは女性の客で、ケンタはその花を選んだだけ。" },

    { id:"S1-10", tech:["T04","T07"], qtype:"mismatch",
      passage:"Last Sunday, Wakaba Town held a disaster drill at Wakaba Elementary School. About eighty people joined it and learned what to do when a big earthquake happens. Junior high school students helped old people walk to the school. After the drill, everyone ate rice balls made by volunteers.",
      q:"本文の内容と一致しないものを選びなさい。",
      choices:[
        "The drill was held at a school in Wakaba Town last Sunday.",
        "People learned what they should do in a big earthquake.",
        "Old people helped junior high school students walk to the school.",
        "People ate food made by volunteers after the drill."
      ],
      answer:2,
      why:"本文の students helped old people walk ↔ 選択肢の Old people helped ... students は、助けた側と助けられた側が逆。",
      trap:"3は rice balls made by volunteers を food made by volunteers と言い換えただけで、本文と一致する。" },

    { id:"S1-11", tech:["T04","T07"], qtype:"match",
      passage:"Midori Town is known for its pottery, and there is a pottery class for visitors every Saturday. Mr. Ono, the teacher, shows people how to make cups and dishes with their hands. Making a nice shape is difficult for beginners, but he helps them slowly and kindly. Many visitors come back again to make new works.",
      q:"本文の内容と一致するものを選びなさい。",
      choices:[
        "Visitors can take a pottery class in Midori Town every Sunday.",
        "It is not easy for new learners to make a good shape.",
        "Visitors show Mr. Ono how to make cups and dishes.",
        "Mr. Ono sells his cups and dishes to visitors every Saturday."
      ],
      answer:1,
      why:"本文の Making a nice shape is difficult for beginners ↔ 選択肢の It is not easy for new learners to make a good shape。",
      trap:"0は曜日ずらし。教室があるのは every Saturday で、Sunday ではない。" },

    { id:"S1-12", tech:["T04","T07"], qtype:"mismatch",
      passage:"Last month, fifteen students from Australia visited Hikari Junior High School. They stayed in the city for four days and went to classes with the Japanese students. On the last day, they made sushi together and talked about their school lives. Now the students of the two schools send e-mails to each other.",
      q:"本文の内容と一致しないものを選びなさい。",
      choices:[
        "Students from a foreign country came to Hikari Junior High School last month.",
        "The visitors made Japanese food with the students on the last day.",
        "The students of the two schools still write e-mails to each other.",
        "The students from Australia stayed in Hikari City for two weeks."
      ],
      answer:3,
      why:"本文の stayed in the city for four days ↔ 選択肢の for two weeks が食い違う。滞在は4日間。",
      trap:"1は made sushi を made Japanese food と言い換えただけで、本文と一致する。" }
  ]
};
