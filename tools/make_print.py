# -*- coding: utf-8 -*-
"""tools/make_print.py ─ 模試の対策プリント（単語熟語集／問題集）をDOCXで作る

使い方:
    python3 tools/make_print.py <仕様JSON> <出力先ディレクトリ>

作るもの:
    ・<名前>_単語熟語集.docx … 語（学年別）＋熟語＋書き取りテスト欄
    ・<名前>_問題集.docx     … 同系統のドリル（解答は末尾にまとめる）

紙にするときの約束:
  ・チェック欄（□）を必ず置く。1回で覚える生徒はいないので、3回ぶん。
  ・答えは生徒用のページに出さない。問題集の解答は最後のページにまとめ、
    「ここから先は答え」と大きく書いて折り返せるようにする。
  ・英語は Century、日本語は 游ゴシック。混植で行がガタつかないよう明示指定する。
"""
import json, sys, os
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

EN_FONT, JP_FONT = "Century", "游ゴシック"


def setup(doc, title, landscape=False):
    s = doc.sections[0]
    s.top_margin = s.bottom_margin = Cm(1.4)
    s.left_margin = s.right_margin = Cm(1.5)
    st = doc.styles["Normal"]
    st.font.name = EN_FONT
    st.font.size = Pt(10.5)
    st.element.rPr.rFonts.set(qn("w:eastAsia"), JP_FONT)
    st.paragraph_format.space_before = Pt(0)
    st.paragraph_format.space_after = Pt(2)
    st.paragraph_format.line_spacing = 1.06
    return doc


def para(doc, text="", size=10.5, bold=False, align=None, before=0, after=2,
         en=False, color=None, cell=None, italic=False):
    p = (cell or doc).add_paragraph()
    p.paragraph_format.space_before = Pt(before)
    p.paragraph_format.space_after = Pt(after)
    r = p.add_run(text)
    r.font.size = Pt(size)
    r.bold = bold
    r.italic = italic
    r.font.name = EN_FONT if en else EN_FONT
    r._element.rPr.rFonts.set(qn("w:eastAsia"), JP_FONT)
    if color:
        r.font.color.rgb = RGBColor(*color)
    if align == "c":
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    elif align == "r":
        p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    return p


def rule(doc, before=4, after=4):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(before)
    p.paragraph_format.space_after = Pt(after)
    pPr = p._p.get_or_add_pPr()
    b = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "6")
    bottom.set(qn("w:color"), "999999")
    b.append(bottom)
    pPr.append(b)


def heading(doc, text, sub="", size=15):
    para(doc, text, size, bold=True, before=10, after=1)
    if sub:
        para(doc, sub, 9, color=(0x66, 0x66, 0x66), after=3)
    rule(doc, before=1, after=5)


def shade(cell, color):
    tcPr = cell._tc.get_or_add_tcPr()
    sh = OxmlElement("w:shd")
    sh.set(qn("w:val"), "clear")
    sh.set(qn("w:fill"), color)
    tcPr.append(sh)


def cell_text(cell, text, size=9.5, bold=False, align=None, en=False, color=None):
    cell.text = ""
    para(cell, text, size, bold=bold, align=align, en=en, after=0, cell=cell, color=color)


def word_table(doc, rows, cols=2):
    """語のリストを cols 列で組む。1語あたり [英語 | 意味 | □□□]"""
    per = (len(rows) + cols - 1) // cols
    t = doc.add_table(rows=per + 1, cols=cols * 3)
    t.style = "Table Grid"
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    for c in range(cols):
        for j, (txt, w) in enumerate([("英語", Cm(3.4)), ("意味", Cm(5.0)), ("✓", Cm(1.5))]):
            cell = t.cell(0, c * 3 + j)
            cell_text(cell, txt, 8.5, bold=True, align="c")
            shade(cell, "E8E8E8")
            for r in range(per + 1):
                t.cell(r, c * 3 + j).width = w
    for i, row in enumerate(rows):
        c, r = i // per, i % per + 1
        if c >= cols:
            break
        cell_text(t.cell(r, c * 3 + 0), row["en"], 10, en=True)
        cell_text(t.cell(r, c * 3 + 1), row["ja"], 8.5)
        cell_text(t.cell(r, c * 3 + 2), "□□□", 8.5, align="c")
    return t


def idiom_table(doc, rows):
    t = doc.add_table(rows=len(rows) + 1, cols=4)
    t.style = "Table Grid"
    heads = [("熟語", Cm(4.4)), ("意味", Cm(4.0)), ("使いかた", Cm(8.4)), ("✓", Cm(1.4))]
    for j, (txt, w) in enumerate(heads):
        cell_text(t.cell(0, j), txt, 8.5, bold=True, align="c")
        shade(t.cell(0, j), "E8E8E8")
        for r in range(len(rows) + 1):
            t.cell(r, j).width = w
    for i, row in enumerate(rows, 1):
        cell_text(t.cell(i, 0), row["en"], 9.5, en=True)
        cell_text(t.cell(i, 1), row["ja"], 8.5)
        cell_text(t.cell(i, 2), row.get("example", ""), 8.5, en=True)
        cell_text(t.cell(i, 3), "□□□", 8.5, align="c")
    return t


def build_words(spec, path):
    doc = Document()
    setup(doc, spec["title"])
    para(doc, spec["title"] + "　単語・熟語集", 17, bold=True, after=1)
    para(doc, spec.get("subtitle", ""), 9.5, color=(0x66, 0x66, 0x66), after=4)
    para(doc, "使いかた：□を3つ置いています。1回目は見ながら、2回目は隠して、3回目はテストのつもりで。"
              "3つ埋まった語は、もう出てきても止まりません。", 9, color=(0x44, 0x44, 0x44), after=6)

    for sec in spec["wordSections"]:
        heading(doc, sec["title"], sec.get("sub", ""))
        if sec.get("rows"):
            word_table(doc, sec["rows"], cols=sec.get("cols", 2))
        para(doc, "", 6)

    if spec.get("idioms"):
        doc.add_page_break()
        heading(doc, "熟語", "2語以上でひとかたまり。ここが読めないと、文の意味がまるごとずれます。")
        idiom_table(doc, spec["idioms"])

    if spec.get("dictation"):
        doc.add_page_break()
        heading(doc, "書き取りテスト", "日本語だけを見て、英語を書く。答えは前のページにあります。")
        rows = spec["dictation"]
        per = (len(rows) + 1) // 2
        t = doc.add_table(rows=per + 1, cols=6)
        t.style = "Table Grid"
        for c in range(2):
            for j, (txt, w) in enumerate([("#", Cm(1.0)), ("日本語", Cm(4.6)), ("英語", Cm(4.3))]):
                cell_text(t.cell(0, c * 3 + j), txt, 8.5, bold=True, align="c")
                shade(t.cell(0, c * 3 + j), "E8E8E8")
                for r in range(per + 1):
                    t.cell(r, c * 3 + j).width = w
        for i, row in enumerate(rows):
            c, r = i // per, i % per + 1
            if c >= 2:
                break
            cell_text(t.cell(r, c * 3 + 0), str(i + 1), 8.5, align="c")
            cell_text(t.cell(r, c * 3 + 1), row["ja"], 8.5)
            cell_text(t.cell(r, c * 3 + 2), "", 9.5)
    doc.save(path)
    return path


def build_drills(spec, path):
    doc = Document()
    setup(doc, spec["title"])
    para(doc, spec["title"] + "　問題集", 17, bold=True, after=1)
    para(doc, spec.get("subtitle", ""), 9.5, color=(0x66, 0x66, 0x66), after=4)
    para(doc, "この模試と同じ形の問題だけを集めています。答えはいちばん後ろにまとめてあります。"
              "先に見ないで、まず自分で書いてから開いてください。", 9, color=(0x44, 0x44, 0x44), after=6)

    for si, sec in enumerate(spec["drills"], 1):
        if si > 1:
            doc.add_page_break()
        heading(doc, f"{si}　{sec['title']}", sec.get("lead", ""))
        for it in sec["items"]:
            q = it["q"].replace("\n", "\n　　")
            para(doc, f"({it['no']}) {q}", 10.5, after=1, en=True)
            if it.get("hint"):
                para(doc, "　　" + it["hint"], 8.5, color=(0x77, 0x77, 0x77), after=1)
            para(doc, "　　答え " + "＿" * 26, 10.5, after=5)

    doc.add_page_break()
    para(doc, "　", 40)
    para(doc, "こ こ か ら 先 は 答 え", 22, bold=True, align="c", after=6)
    para(doc, "自分で書き終わってから開くこと。ここで折り返して使えます。", 10, align="c",
         color=(0x66, 0x66, 0x66))
    doc.add_page_break()
    para(doc, spec["title"] + "　問題集　解答と解説", 15, bold=True, after=5)
    for si, sec in enumerate(spec["drills"], 1):
        heading(doc, f"{si}　{sec['title']}", "", size=12)
        t = doc.add_table(rows=len(sec["items"]) + 1, cols=3)
        t.style = "Table Grid"
        for j, (txt, w) in enumerate([("#", Cm(1.0)), ("答え", Cm(6.2)), ("なぜそうなるか", Cm(10.6))]):
            cell_text(t.cell(0, j), txt, 8.5, bold=True, align="c")
            shade(t.cell(0, j), "E8E8E8")
            for r in range(len(sec["items"]) + 1):
                t.cell(r, j).width = w
        for i, it in enumerate(sec["items"], 1):
            cell_text(t.cell(i, 0), str(it["no"]), 8.5, align="c")
            cell_text(t.cell(i, 1), it["answer"], 9.5, bold=True, en=True)
            cell_text(t.cell(i, 2), it.get("why", ""), 8.5)
        para(doc, "", 5)
    doc.save(path)
    return path


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    spec = json.load(open(sys.argv[1], encoding="utf-8"))
    out = sys.argv[2]
    os.makedirs(out, exist_ok=True)
    name = spec.get("name", "print")
    a = build_words(spec, os.path.join(out, f"{name}_単語熟語集.docx"))
    b = build_drills(spec, os.path.join(out, f"{name}_問題集.docx"))
    nw = sum(len(s.get("rows", [])) for s in spec["wordSections"])
    nd = sum(len(s["items"]) for s in spec["drills"])
    print(f"✓ {a}")
    print(f"  語 {nw}／熟語 {len(spec.get('idioms', []))}／書き取り {len(spec.get('dictation', []))}")
    print(f"✓ {b}")
    print(f"  問題 {nd}（{'／'.join(s['title'] + str(len(s['items'])) + '問' for s in spec['drills'])}）")


if __name__ == "__main__":
    main()
