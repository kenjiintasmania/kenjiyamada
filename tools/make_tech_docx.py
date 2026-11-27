# tools/make_tech_docx.py ─ 読解道場のテクニックを確かめるプリント（A4 両面1枚：表＝テスト、裏＝解説と答え）
# 使い方: python3 tools/make_tech_docx.py 出力.docx      （要 python-docx）
# 正本: mogi/print/docx/dojo_tech_test.docx（先生がレイアウトを調整した版・2026-11-27。これを上書きしないこと）
# もとにしたもの: dojo/data/tech.js（テクカード T01〜T11・P10・G01〜G03）と dojo/data/drill_s2.js（印をつける文）。
# ★Word は LibreOffice より行が高く出るので、下余白 2.5mm にして、行の高さにも余裕を残してある。
# ★解答ページも生徒に配る。作り手向けの注記は紙に書かない。
import sys
from docx import Document
from docx.shared import Pt, Mm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_ROW_HEIGHT_RULE
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

OUT = sys.argv[1]
EN, JP = "Century", "游ゴシック"
BOX = "（　　　　　）"

# (見出し, [(文 ※答えの所は {} , [答え], 解説)])
PART_A = [
    ("読む前に", [
        ("本文より先に {} を読み、「何をさがすか」を決めてから読み始める。", ["設問"], "さがす物が決まると、速さも正確さも上がる。"),
        ("How many 〜? と聞かれたら、本文でまず {} をさがす。", ["数字"], "数字・人名・地名は目立つ目印。fifteen のような英語の数字にも注意。"),
        ("長文は、{} と最初の文で「何の話か」をつかむ。", ["タイトル"], "話題が分かると、細かい所も予想しやすい。"),
        ("段落の {} 文目には、その段落の話題が来ることが多い。", ["1"], "大意は、各段落の1文目をつないでつかむ。"),
    ]),
    ("読みながら", [
        ("it / they / that の中身は、{} の文の名詞からさがす。", ["直前"], "単数か複数かで候補をしぼり、当てはめて確かめる。"),
        ("but のうしろには、筆者の {} が来ることが多い。", ["言いたいこと"], "but で話の向きが変わる。うしろが大事。"),
        ("so のうしろには {} 、for example のうしろには {} が来る。", ["結果", "具体例"], "つなぎ語に印をつけると、次に何が来るか予想できる。"),
        ("意味のかたまりで区切って {} から読む。うしろから訳し直さない。", ["前"], "きれいな日本語にしなくてよい。かたまりごとに意味を取る。"),
    ]),
    ("答えをえらぶとき", [
        ("正解の選択肢は、本文と「同じ意味・{} の単語」で書かれていることが多い。", ["別"], "本文の単語を丸写しした選択肢は、ワナのことが多い。"),
        ("選択肢は「えらぶ」のではなく {} 。", ["消す"], "○をさがすより、×を消すほうが速い。"),
        ("消すのは「本文にない」「本文と {} 」「言いすぎ（all / always）」の3つ。", ["逆"], "×の理由（本文のどことちがうか）を確かめてから消す。"),
        ("ちらしや表の問題は、質問の {} （だれ・いつ・何人）を先に決めてから、その行だけを見る。", ["条件"], "最後に Note らん（割引・しめきり・雨のとき）も必ず見る。"),
        ("つまった問題は {} をつけて次へ進み、配点の大きい長文に時間を残す。", ["印"], "最後に、印をつけた問題へもどる。"),
        ("リスニングは、1回目に数字・名前・場所を {} し、2回目は答えの所だけを待ちぶせて聞く。", ["メモ"], "質問が読まれたら「何を聞かれたか」もメモする。"),
    ]),
    ("文に印をつける（図形分析）", [
        ("be動詞（am / is / are / was / were）には {} の印をつける。", ["＝"], "印の手前までが主語だと、目で分かる。"),
        ("look / sound / feel / become などには {} 、ふつうの動詞には {} の印をつける。", ["≒", "V"], "≒ は「イコールに近い」。"),
        ("前置詞（in / at / on など）を見つけたら、その {} に {} を書く。", ["前", "／"], "そこで目的語が終わる。かたまりの切れ目が見える。"),
        ("to には {} 、from には {} を書く。", ["→", "←"], "向きが図で分かる。"),
        ("and には {} 、but には {} 、than には {} を書く。", ["＆", "←→", "＞"], "and は、前後にある同じ種類のものをさがす。"),
        ("sometimes や today のように、前置詞のない時・場所・副詞は {} でくくる。", ["（　）"], "くくって残ったものが、主語・動詞・目的語の骨組み。"),
    ]),
]
# 印をつける文（drill_s2.js から）
PART_B = [
    ("My father is a doctor at the city hospital.", "My father ＝ a doctor ／at the city hospital."),
    ("Your idea sounds interesting.", "Your idea ≒ interesting."),
    ("She walked to the library from her house.", "She walked[V] →to the library ←from her house."),
    ("This book is difficult, but that one is easy.", "This book ＝ difficult, ←→but that one ＝ easy."),
    ("Soccer is more popular than baseball in my class.", "Soccer ＝ more popular ＞than baseball ／in my class."),
    ("They cleaned the classroom after lunch yesterday.", "They cleaned[V] the classroom ／after lunch （yesterday）."),
]


def font(run, size, bold=False, color=None, underline=False):
    run.font.size = Pt(size); run.bold = bold; run.font.underline = underline
    run.font.name = EN
    rpr = run._element.get_or_add_rPr(); rf = rpr.find(qn("w:rFonts"))
    if rf is None:
        rf = OxmlElement("w:rFonts"); rpr.append(rf)
    for k in ("w:ascii", "w:hAnsi"): rf.set(qn(k), EN)
    rf.set(qn("w:eastAsia"), JP)
    if color: run.font.color.rgb = RGBColor(*color)


def borders(t, color="A0A0A0"):
    b = OxmlElement("w:tblBorders")
    for e in ("top", "left", "bottom", "right", "insideH", "insideV"):
        x = OxmlElement(f"w:{e}"); x.set(qn("w:val"), "single"); x.set(qn("w:sz"), "4"); x.set(qn("w:color"), color); b.append(x)
    t._tbl.tblPr.append(b)


def margins(t, top=0, bottom=0, left=70, right=50):
    m = OxmlElement("w:tblCellMar")
    for k, v in (("top", top), ("bottom", bottom), ("left", left), ("right", right)):
        e = OxmlElement(f"w:{k}"); e.set(qn("w:w"), str(v)); e.set(qn("w:type"), "dxa"); m.append(e)
    t._tbl.tblPr.append(m)


def shade(c, h):
    s = OxmlElement("w:shd"); s.set(qn("w:val"), "clear"); s.set(qn("w:color"), "auto"); s.set(qn("w:fill"), h); c._tc.get_or_add_tcPr().append(s)


def vcenter(c):
    v = OxmlElement("w:vAlign"); v.set(qn("w:val"), "center"); c._tc.get_or_add_tcPr().append(v)


def widths(t, mm):
    t.autofit = False; pr = t._tbl.tblPr
    tw = lambda v: str(int(round(v * 56.7)))
    for tag in ("w:tblW", "w:tblLayout"):
        o = pr.find(qn(tag))
        if o is not None: pr.remove(o)
    w = OxmlElement("w:tblW"); w.set(qn("w:w"), tw(sum(mm))); w.set(qn("w:type"), "dxa"); pr.append(w)
    lay = OxmlElement("w:tblLayout"); lay.set(qn("w:type"), "fixed"); pr.append(lay)
    for g, v in zip(t._tbl.tblGrid.findall(qn("w:gridCol")), mm): g.set(qn("w:w"), tw(v))
    for r in t.rows:
        for c, v in zip(r.cells, mm): c.width = Mm(v)


def page(doc, back):
    title = "読解テクニック　たしかめテスト" + ("　解説と答え" if back else "")
    p = doc.add_paragraph(); font(p.add_run(title), 15, True)
    if not back: font(p.add_run("　　　　年　　組　　番　名前　　　　　　　　　　　"), 10.5)
    p.paragraph_format.space_after = Pt(2)
    if not back:          # 裏はこの1行を置かない（Word で2枚目があふれるため・先生の調整 2026-11-27）
        q = doc.add_paragraph(); q.paragraph_format.space_after = Pt(3)
        font(q.add_run("Ａ　（　　）に入ることばや印を書こう。"), 10, True)
    n = sum(len(x[1]) for x in PART_A) + len(PART_A)
    cols = 3 if back else 2
    t = doc.add_table(rows=n, cols=cols); borders(t); margins(t)
    i = 0; no = 0
    for head, items in PART_A:
        r = t.rows[i]; i += 1
        a = r.cells[0].merge(r.cells[cols - 1]); font(a.paragraphs[0].add_run(head), 9.5, True); shade(a, "E8E8E8"); vcenter(a)
        r.height = Mm(5.2); r.height_rule = WD_ROW_HEIGHT_RULE.EXACTLY
        for sent, ans, ex in items:
            no += 1; r = t.rows[i]; i += 1
            r.height = Mm(7.6 if not back else 7.2); r.height_rule = WD_ROW_HEIGHT_RULE.AT_LEAST
            for c in r.cells: vcenter(c)
            p0 = r.cells[0].paragraphs[0]; p0.alignment = WD_ALIGN_PARAGRAPH.CENTER; font(p0.add_run(str(no)), 9)
            p1 = r.cells[1].paragraphs[0]
            for k, seg in enumerate(sent.split("{}")):
                if k > 0:
                    if back: font(p1.add_run(" " + ans[k - 1] + " "), 10.5, True, underline=True)
                    else: font(p1.add_run(BOX), 10)
                if seg: font(p1.add_run(seg.strip() if not back else seg.strip()), 10 if not back else 9.5)
            if back: font(r.cells[2].paragraphs[0].add_run(ex), 8.5, color=(0x44, 0x44, 0x44))
    widths(t, [8, 180] if not back else [8, 112, 68])

    q = doc.add_paragraph(); q.paragraph_format.space_before = Pt(6); q.paragraph_format.space_after = Pt(3)
    font(q.add_run("Ｂ　次の文に、Ａの印（＝ ≒ V ／ → ← ＆ ←→ ＞ （　））を書き入れよう。" if not back
                   else "Ｂ　印をつけるとこうなる。（＝ ≒ は be動詞などと入れかえて書いてある。V は動詞のうしろ）"), 10, True)
    t2 = doc.add_table(rows=len(PART_B), cols=2); borders(t2); margins(t2)
    for k, (sent, marked) in enumerate(PART_B):
        r = t2.rows[k]; r.height = Mm(11 if not back else 7.6); r.height_rule = WD_ROW_HEIGHT_RULE.AT_LEAST
        for c in r.cells: vcenter(c)
        p0 = r.cells[0].paragraphs[0]; p0.alignment = WD_ALIGN_PARAGRAPH.CENTER; font(p0.add_run(str(k + 1)), 9)
        # 表は語の間を3つあける（／ などの印を書き入れやすいように・先生の調整）
        font(r.cells[1].paragraphs[0].add_run(marked if back else "   ".join(sent.split())), 12.5 if not back else 11.5)
    widths(t2, [8, 180])


doc = Document()
sec = doc.sections[0]
sec.page_width, sec.page_height = Mm(210), Mm(297)
sec.top_margin = Mm(9); sec.bottom_margin = Mm(2.5); sec.left_margin = sec.right_margin = Mm(11)
st = doc.styles["Normal"]; st.font.name = EN; st.font.size = Pt(10)
st.element.rPr.rFonts.set(qn("w:eastAsia"), JP)
st.paragraph_format.space_after = Pt(0); st.paragraph_format.space_before = Pt(0); st.paragraph_format.line_spacing = 1.0
for el in list(doc.element.body):
    if el.tag == qn("w:p"): doc.element.body.remove(el)
page(doc, False)
doc.add_page_break()
page(doc, True)
doc.save(OUT)
print("saved", OUT, "A:", sum(len(x[1]) for x in PART_A), "B:", len(PART_B))
