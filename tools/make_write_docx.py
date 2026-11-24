# tools/make_write_docx.py ─ 同じ動詞（write）を全文法で書き分けるプリント（A4 両面1枚：表＝問題、裏＝解答）
# 使い方: python3 tools/make_write_docx.py 出力.docx      （要 python-docx）
# 正本は mogi/print/docx/zenbunpo_write.docx（先生がレイアウトを調整した版・2026-11-24）。
# ★レイアウトの決め手：Word（游ゴシック＋Century）は LibreOffice より行が高く出るので、
#   下余白を 9mm のままだと表の38行目が2ページ目に落ちる。下余白 2.5mm でオモテ1ページに収まる（先生の調整）。
# 番号は「全文法 到達度テスト」（gojun/data/gojun_v1.js）の項目番号。
import sys
from docx import Document
from docx.shared import Pt, Mm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ROW_HEIGHT_RULE
from docx.enum.section import WD_ORIENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

OUT = sys.argv[1]
EN, JP = "Century", "游ゴシック"
B = "［　　　］"          # 1語ぶんの箱

# (英文 ※箱は {} , 意味, 文法名, 答え)
ROWS = [
    ("I {} the letter.",                        "書く",                 "1 一般動詞（現在形）",        "write"),
    ("Ken {} the letter every week.",           "書く",                 "1 一般動詞（3人称単数）",     "writes"),
    ("I {} {} the letter.",                     "書ける",               "2 助動詞 can",               "can write"),
    ("I {} the letter yesterday.",              "書いた",               "3 過去形",                   "wrote"),
    ("I {} {} the letter now.",                 "書いているところだ",   "4 現在進行形",               "am writing"),
    ("I {} {} the letter tomorrow.",            "書くだろう",           "5 未来 will",                "will write"),
    ("I have already {} the letter.",           "もう書き終えた",       "6 現在完了",                 "written"),
    ("I {} {} the letter then.",                "書いていた",           "7 過去進行形",               "was writing"),
    ("The letter {} {} by Ken.",                "ケンに書かれた",       "8 受け身",                   "was written"),
    ("This {} the letter from Ken.",            "〜です",               "9 be動詞の文",               "is"),
    ("I {} {} the letter today.",               "書かなければならない", "10 助動詞 must",             "must write"),
    ("You {} {} the letter in pencil.",         "書いてもよい",         "10 助動詞 may",              "may write"),
    ("You {} {} the letter to her.",            "書くべきだ",           "10 助動詞 should",           "should write"),
    ("I {} {} {} the letter.",                  "書かなければならない", "10 have to",                 "have to write"),
    ("I {} {} {} {} the letter.",               "書くつもりだ",         "11 be going to",             "am going to write"),
    ("I enjoy {} letters.",                     "書くこと",             "12 動名詞",                  "writing"),
    ("I {} {} {} the letter for an hour.",      "ずっと書いている",     "13 現在完了進行形",          "have been writing"),
    ("This letter is {} {} that one.",          "〜より長い",           "14 比較級",                  "longer than"),
    ("This is the {} letter of all.",           "いちばん長い",         "14 最上級",                  "longest"),
    ("It is hard for me {} {} the letter.",     "書くことは",           "15 It … for 〜 to …",        "to write"),
    ("This is the letter {} I {} yesterday.",   "私が書いた手紙",   "16 関係代名詞",              "which [that] ／ wrote"),
    ("I want {} {} a letter.",                  "書きたい",             "17 不定詞（名詞）",          "to write"),
    ("I have a letter {} {}.",                  "書くべき手紙",         "17 不定詞（形容詞）",        "to write"),
    ("I went to my room {} {} a letter.",       "書くために",           "17 不定詞（副詞）",          "to write"),
    ("Ken {} {} a letter.",                     "私に書いた",           "18 SVOO",                    "wrote me"),
    ("The letter {} {} happy.",                 "私をうれしくさせた",   "19 SVOC",                    "made me"),
    ("{} I {} the letter, I was sad.",          "書いたとき",           "20 接続詞 when",             "When ／ wrote"),
    ("Do you know {} {} the letter?",           "だれが書いたか",       "21 間接疑問文",              "who wrote"),
    ("This is a letter {} by Ken.",             "ケンに書かれた手紙",   "22 分詞（過去分詞）",        "written"),
    ("The boy {} a letter is Ken.",             "書いている少年",       "22 分詞（現在分詞）",        "writing"),
    ("There {} a letter on the desk.",          "〜がある",             "23 There is",                "is"),
    ("If I {} time, I {} {} a letter.",         "あれば書くのに", "24 仮定法",                  "had ／ would write"),
    ("{} you {} the letter yesterday?",         "書きましたか",         "26 疑問文",                  "Did ／ write"),
    ("{} the letter.",                          "書きなさい",           "27 命令文",                  "Write"),
    ("{} {} the letter.",                       "書いてはいけない",     "28 禁止の文",                "Don't write"),
    ("I {} {} the letter.",                     "書かなかった",         "29 否定文",                  "didn't write"),
    ("{} {} you {}?",                           "何を書いたのですか",   "32 疑問詞の疑問文",          "What did ／ write"),
    ("My mother {} me {} the letter.",          "書くのを手伝った",     "33 help＋人＋原形",          "helped ／ write"),
]

def font(run, size, bold=False, color=None):
    run.font.size = Pt(size); run.bold = bold
    run.font.name = EN
    rpr = run._element.get_or_add_rPr()
    rf = rpr.find(qn("w:rFonts"))
    if rf is None:
        rf = OxmlElement("w:rFonts"); rpr.append(rf)
    for k in ("w:ascii", "w:hAnsi"): rf.set(qn(k), EN)
    rf.set(qn("w:eastAsia"), JP)
    if color: run.font.color.rgb = RGBColor(*color)

def para(cell_or_doc, text="", size=10, bold=False, align=None, before=0, after=0, color=None):
    p = cell_or_doc.add_paragraph() if not hasattr(cell_or_doc, "paragraphs") or cell_or_doc.paragraphs[0].text or len(cell_or_doc.paragraphs) > 1 or not hasattr(cell_or_doc, "width") else cell_or_doc.paragraphs[0]
    pf = p.paragraph_format; pf.space_before = Pt(before); pf.space_after = Pt(after); pf.line_spacing = 1.0
    if align == "c": p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    if align == "r": p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    if text: font(p.add_run(text), size, bold, color)
    return p

def cell_borders(table, color="808080", size=4):
    tbl = table._tbl; tblPr = tbl.tblPr
    b = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        e = OxmlElement(f"w:{edge}"); e.set(qn("w:val"), "single"); e.set(qn("w:sz"), str(size)); e.set(qn("w:color"), color); b.append(e)
    tblPr.append(b)

def shade(cell, hexcolor):
    tcPr = cell._tc.get_or_add_tcPr(); s = OxmlElement("w:shd")
    s.set(qn("w:val"), "clear"); s.set(qn("w:color"), "auto"); s.set(qn("w:fill"), hexcolor); tcPr.append(s)

def cell_margins(table, top=0, bottom=0, left=60, right=60):
    tblPr = table._tbl.tblPr; m = OxmlElement("w:tblCellMar")
    for k, v in (("top", top), ("bottom", bottom), ("left", left), ("right", right)):
        e = OxmlElement(f"w:{k}"); e.set(qn("w:w"), str(v)); e.set(qn("w:type"), "dxa"); m.append(e)
    tblPr.append(m)

def widths(table, mm):
    """LibreOffice も Word も同じ幅で出るよう、tblW・固定レイアウト・tblGrid・各セル幅をそろえる"""
    table.autofit = False
    tbl = table._tbl; tblPr = tbl.tblPr
    tw = lambda v: str(int(round(v * 56.7)))          # mm → twip
    for tag in ("w:tblW", "w:tblLayout"):
        old = tblPr.find(qn(tag))
        if old is not None: tblPr.remove(old)
    tW = OxmlElement("w:tblW"); tW.set(qn("w:w"), tw(sum(mm))); tW.set(qn("w:type"), "dxa"); tblPr.append(tW)
    lay = OxmlElement("w:tblLayout"); lay.set(qn("w:type"), "fixed"); tblPr.append(lay)
    grid = tbl.tblGrid
    for gc, w in zip(grid.findall(qn("w:gridCol")), mm): gc.set(qn("w:w"), tw(w))
    for row in table.rows:
        for c, w in zip(row.cells, mm): c.width = Mm(w)

def vcenter(cell):
    tcPr = cell._tc.get_or_add_tcPr(); v = OxmlElement("w:vAlign"); v.set(qn("w:val"), "center"); tcPr.append(v)

doc = Document()
sec = doc.sections[0]
sec.page_width, sec.page_height = Mm(210), Mm(297)
sec.top_margin = Mm(9)
sec.bottom_margin = Mm(2.5)          # 先生の調整（これでオモテ1枚に収まる）
sec.left_margin = sec.right_margin = Mm(11)
st = doc.styles["Normal"]; st.font.name = EN; st.font.size = Pt(10)
st.element.rPr.rFonts.set(qn("w:eastAsia"), JP)
st.paragraph_format.space_after = Pt(0); st.paragraph_format.space_before = Pt(0)

# ---------- 表：問題 ----------
p = doc.paragraphs[0] if doc.paragraphs else doc.add_paragraph()
font(p.add_run("同じ動詞で全文法　write（書く）"), 15, True)
font(p.add_run("　　　　年　　組　　番　名前　　　　　　　　　　　"), 10.5)
p.paragraph_format.space_after = Pt(2)
q = doc.add_paragraph(); q.paragraph_format.space_after = Pt(3)
font(q.add_run("［　　］に1語ずつ入れて、（　）の意味の英文にしよう。右の文法名を見て形を決める。番号は「全文法 到達度テスト」の項目番号。"), 9.5)

t0 = doc.add_table(rows=1, cols=4); cell_borders(t0); cell_margins(t0, 20, 20)
for c, s in zip(t0.rows[0].cells, ["原形　write", "過去形　［　　　　　］", "過去分詞　［　　　　　］", "ing形　［　　　　　］"]):
    cp = c.paragraphs[0]; font(cp.add_run(s), 10.5); cp.alignment = WD_ALIGN_PARAGRAPH.CENTER; vcenter(c)
t0.rows[0].height = Mm(7.5); t0.rows[0].height_rule = WD_ROW_HEIGHT_RULE.AT_LEAST
widths(t0, [47, 47, 47, 47])
sp = doc.add_paragraph(); sp.paragraph_format.space_after = Pt(2); font(sp.add_run(" "), 3)

t = doc.add_table(rows=1 + len(ROWS), cols=3); cell_borders(t, "A0A0A0", 4); cell_margins(t, 0, 0, 70, 50)
t.alignment = WD_TABLE_ALIGNMENT.CENTER
W = [8, 141, 39]
hdr = ["", "英文（［　］に1語ずつ）　（　）は意味", "文法名"]
for c, s in zip(t.rows[0].cells, hdr):
    cp = c.paragraphs[0]; font(cp.add_run(s), 9, True); shade(c, "EDEDED"); vcenter(c)
t.rows[0].height = Mm(5.5); t.rows[0].height_rule = WD_ROW_HEIGHT_RULE.EXACTLY
for i, (en, ja, gram, _) in enumerate(ROWS, 1):
    r = t.rows[i]; r.height = Mm(6.2); r.height_rule = WD_ROW_HEIGHT_RULE.EXACTLY
    c0, c1, c2 = r.cells
    for c in (c0, c1, c2): vcenter(c)
    p0 = c0.paragraphs[0]; p0.alignment = WD_ALIGN_PARAGRAPH.CENTER; font(p0.add_run(str(i)), 9)
    p1 = c1.paragraphs[0]
    font(p1.add_run(en.replace("{}", B)), 11)
    font(p1.add_run("　（" + ja + "）"), 8.5, color=(0x55, 0x55, 0x55))
    p2 = c2.paragraphs[0]; font(p2.add_run(gram), 8.5)
widths(t, W)

# ---------- 裏：解答 ----------
doc.add_page_break()
p = doc.add_paragraph(); font(p.add_run("解答　同じ動詞で全文法　write（書く）"), 14, True); p.paragraph_format.space_after = Pt(4)
p = doc.add_paragraph(); font(p.add_run("write ― wrote ― written ― writing"), 11, True); p.paragraph_format.space_after = Pt(6)
n = len(ROWS); half = (n + 1) // 2
ta = doc.add_table(rows=half, cols=4); cell_borders(ta, "C8C8C8", 4); cell_margins(ta, 10, 10, 70, 50)
for k in range(half):
    for side in (0, 1):
        idx = k + side * half
        if idx >= n: continue
        en, ja, gram, ans = ROWS[idx]
        c = ta.rows[k].cells[side * 2]; c2 = ta.rows[k].cells[side * 2 + 1]
        cp = c.paragraphs[0]; cp.alignment = WD_ALIGN_PARAGRAPH.CENTER; font(cp.add_run(str(idx + 1)), 9)
        font(c2.paragraphs[0].add_run(ans), 11)
        font(c2.paragraphs[0].add_run("　" + gram), 8, color=(0x66, 0x66, 0x66))
    ta.rows[k].height = Mm(7); ta.rows[k].height_rule = WD_ROW_HEIGHT_RULE.AT_LEAST
widths(ta, [8, 86, 8, 86])
doc.save(OUT)
print("saved", OUT, "rows", n)
