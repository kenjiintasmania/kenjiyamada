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


# ---------- ③ なぞり書き／テスト（両面1枚＝おもてなぞり・うらテスト） ----------
# 印刷の約束：**おもて→うら→おもて→うら** の順に並べる。両面印刷（長辺とじ）にすると、
# 1枚の表裏がいつも「同じ20語のなぞり書き」と「そのテスト」になる。
# 最後に空白ページを作らない（表裏がずれると全部ずれるため）。
TRACE_GRAY = (0xBB, 0xBB, 0xBB)


def _trace_table(doc, rows, start, test=False):
    """test=False … 日本語｜なぞる（薄い字）｜書く　／　test=True … 日本語｜英語（空欄）"""
    heads = ([("#", Cm(0.9)), ("日本語", Cm(5.5)), ("英語を書く", Cm(11.5))] if test
             else [("#", Cm(0.9)), ("日本語", Cm(4.2)), ("なぞる", Cm(6.4)), ("自分で書く", Cm(6.4))])
    t = doc.add_table(rows=len(rows) + 1, cols=len(heads))
    t.style = "Table Grid"
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    for j, (txt, w) in enumerate(heads):
        cell_text(t.cell(0, j), txt, 8.5, bold=True, align="c")
        shade(t.cell(0, j), "E8E8E8")
        for r in range(len(rows) + 1):
            t.cell(r, j).width = w
    for i, row in enumerate(rows, 1):
        cell_text(t.cell(i, 0), str(start + i - 1), 8.5, align="c")
        cell_text(t.cell(i, 1), row.get("jaTest", row["ja"]) if test else row["ja"], 9)
        if test:
            cell_text(t.cell(i, 2), "", 13, en=True)
        else:
            # なぞる字は薄いグレー。上からペンでなぞらせる。
            cell_text(t.cell(i, 2), row["en"], 13, en=True, color=TRACE_GRAY)
            cell_text(t.cell(i, 3), "", 13, en=True)
        t.rows[i].height = Cm(1.0)
    return t


def build_trace(spec, path):
    doc = Document()
    setup(doc, spec["title"])
    # 語（学年別の表をぜんぶつなげる）と熟語を、それぞれ1ページぶんずつに割る
    # 見出しは学年ごとに分けたまま持つ（中2ぶんだけ配る、といった使い方ができるように）。
    blocks = [(sec["title"].replace("（模試に出たもの）", ""), sec.get("rows", []), 20)
              for sec in spec["wordSections"] if sec.get("rows")]
    if spec.get("idioms"):
        blocks.append(("熟語", [{"en": x["en"], "ja": x["ja"]} for x in spec["idioms"]], 14))

    pages = []          # [(見出し, その回ぶんの行, 通し番号の始まり)]
    for name, rows, per in blocks:
        no = 1          # 番号はブロックごとに1から。表裏で同じ番号がそろえばよい。
        for i in range(0, len(rows), per):
            pages.append((name, rows[i:i + per], no))
            no += len(rows[i:i + per])

    for k, (name, rows, start) in enumerate(pages):
        if k:
            doc.add_page_break()
        # --- おもて：なぞり書き ---
        para(doc, f"{spec['title']}　{name} なぞり書き（{start}〜{start + len(rows) - 1}）",
             13, bold=True, after=1)
        para(doc, "うすい字を上からなぞって、となりの欄にもう一度自分で書く。裏はこの{}語のテストです。"
                  .format(len(rows)), 8.5, color=(0x66, 0x66, 0x66), after=4)
        _trace_table(doc, rows, start, test=False)
        doc.add_page_break()
        # --- うら：テスト ---
        para(doc, f"{spec['title']}　{name} テスト（{start}〜{start + len(rows) - 1}）",
             13, bold=True, after=1)
        para(doc, "日本語だけを見て英語を書く。答えはこの紙の裏（なぞり書きの面）にあります。",
             8.5, color=(0x66, 0x66, 0x66), after=4)
        para(doc, "　　なまえ　＿＿＿＿＿＿＿＿＿＿　　　　　　　　　/ {}".format(len(rows)),
             9.5, after=4)
        _trace_table(doc, rows, start, test=True)
    # どの見出しが何ページ目にあたるか（必要なところだけ印刷できるように）
    breakdown, page = [], 1
    for name, rows, start in pages:
        if not breakdown or breakdown[-1][0] != name:
            breakdown.append([name, page, page + 1, len(rows)])
        else:
            breakdown[-1][2] = page + 1
            breakdown[-1][3] += len(rows)
        page += 2
    doc.save(path)
    return path, len(pages), breakdown



def build_answer_list(spec, path):
    """解答欄に書く語の一覧（どの問いで何を書くか＋類語）。答えが載っているので学習用。"""
    doc = Document()
    setup(doc, spec["title"])
    heading(doc, f'{spec["title"]}　解答欄に書く語 一覧',
            "空所補充の答えと、取りちがえやすい類語。★答えが載っています（テスト用紙ではありません）")

    rows = spec.get("answerList", [])
    heads = [("模試", Cm(2.2)), ("大問", Cm(1.6)), ("問", Cm(1.6)), ("種類", Cm(1.7)),
             ("解答欄に書くもの", Cm(5.6)), ("類語・いっしょに覚える語", Cm(6.5))]
    t = doc.add_table(rows=len(rows) + 1, cols=len(heads))
    t.style = "Table Grid"
    for j, (txt, w) in enumerate(heads):
        cell_text(t.cell(0, j), txt, 8.5, bold=True, align="c")
        shade(t.cell(0, j), "E8E8E8")
        for r in range(len(rows) + 1):
            t.cell(r, j).width = w
    for i, q in enumerate(rows, 1):
        cell_text(t.cell(i, 0), q.get("id", ""), 8)
        cell_text(t.cell(i, 1), q.get("sec", ""), 8, align="c")
        cell_text(t.cell(i, 2), q.get("q", ""), 8, align="c")
        cell_text(t.cell(i, 3), q.get("kind", ""), 8, align="c")
        cell_text(t.cell(i, 4), q.get("ans", ""), 9.5, en=True, bold=True)
        cell_text(t.cell(i, 5), q.get("kingo", ""), 8, en=True)
        if q.get("kind") == "並べかえ":
            for j in range(len(heads)):
                shade(t.cell(i, j), "F4F4F4")      # 語が問題に並ぶので、覚える対象ではない

    cj = spec.get("conjugations", [])
    if cj:
        para(doc, "", after=6)
        heading(doc, "形が変わる動詞（原形 — 過去形 — 過去分詞）",
                "空所補充はここから出ます。3つセットで声に出して覚える。", size=12)
        t2 = doc.add_table(rows=len(cj) + 1, cols=2)
        t2.style = "Table Grid"
        for j, (txt, w) in enumerate([("変化", Cm(9.0)), ("意味", Cm(9.0))]):
            cell_text(t2.cell(0, j), txt, 8.5, bold=True, align="c")
            shade(t2.cell(0, j), "E8E8E8")
            for r in range(len(cj) + 1):
                t2.cell(r, j).width = w
        for i, c in enumerate(cj, 1):
            cell_text(t2.cell(i, 0), c["en"], 10, en=True)
            cell_text(t2.cell(i, 1), c["ja"], 9)
    doc.save(path)
    return path, len(rows), len(cj)


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    spec = json.load(open(sys.argv[1], encoding="utf-8"))
    out = sys.argv[2]
    os.makedirs(out, exist_ok=True)
    name = spec.get("name", "print")

    # --answers … 解答欄に書く語の一覧（先生の下ごしらえ用）。
    # ★なぞり書きはここでは作らない。答えと類語を別の見出しに並べると、
    #   生徒は答えの列しか練習せず、どれが答えかを先に教えることにもなる。
    #   なぞり書きは tools/make_trace.py で、答えを仲間の語にまぜて作ること。
    if "--answers" in sys.argv:
        d, nq, ncj = build_answer_list(spec, os.path.join(out, f"{name}_一覧.docx"))
        print(f"✓ {d}")
        print(f"  設問 {nq}／形が変わる動詞 {ncj}")
        print("  なぞり書きは tools/make_trace.py を使う（答えを仲間の語にまぜるため）")
        return

    # --trace … なぞり書きテストだけ作る（問題集の材料が無い仕様でも回せる）
    if "--trace" in sys.argv:
        c, npage, bd = build_trace(spec, os.path.join(out, f"{name}_なぞり書きテスト.docx"))
        print(f"✓ {c}")
        print(f"  {npage}枚ぶん（両面{npage * 2}ページ・おもて なぞり書き／うら テスト）")
        print("  どこを刷ればよいか:")
        for nm, a1, b1, n in bd:
            print(f"    {nm}… {n}語　ページ {a1}〜{b1}")
        return

    a = build_words(spec, os.path.join(out, f"{name}_単語熟語集.docx"))
    b = build_drills(spec, os.path.join(out, f"{name}_問題集.docx"))
    c, npage, _bd = build_trace(spec, os.path.join(out, f"{name}_なぞり書きテスト.docx"))
    nw = sum(len(s.get("rows", [])) for s in spec["wordSections"])
    nd = sum(len(s["items"]) for s in spec["drills"])
    print(f"✓ {a}")
    print(f"  語 {nw}／熟語 {len(spec.get('idioms', []))}／書き取り {len(spec.get('dictation', []))}")
    print(f"✓ {b}")
    print(f"  問題 {nd}（{'／'.join(s['title'] + str(len(s['items'])) + '問' for s in spec['drills'])}）")
    print(f"✓ {c}")
    print(f"  {npage}枚ぶん（両面{npage * 2}ページ・おもて なぞり書き／うら テスト）")


if __name__ == "__main__":
    main()
