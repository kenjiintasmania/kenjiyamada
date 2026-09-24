# -*- coding: utf-8 -*-
"""tools/make_trace.py ─ なぞり書きシート（先生の版組にそろえたもの）

使い方:
    python3 tools/make_trace.py tools/trace_sets/<名前>.json <出力先> [--test]

つくるもの:
    <name>_なぞり書き.docx        … 日本語｜うすい英語（なぞる）｜自分で書く
    <name>_テスト.docx  (--test)  … 日本語｜空欄　＝ 同じ並び・同じ番号

★中身のならべ方について（ここが要点）:
  「答えに出る語」と「類語」を分けて並べてはいけない。分けると
   ① 生徒は答えの列しか練習しない
   ② どれが答えかを先に教えることになる（カンニングと同じ）
  仲間の語にまぎれさせて混ぜる。曜日なら7つ、季節なら4つ、というように
  かたまりで並べると、語彙数も自然に増える。中身は tools/trace_sets/*.json。

版組は先生の見本（sj_phase3_trace_v1_1.docx）に合わせてある:
  A4縦・余白 上1.23/下1.06/左右1.59cm、1ページ27行
  3列 4.76 / 6.70 / 6.36 cm・見出し行なし
  日本語=游ゴシック10.5pt、英語=Comic Sans MS 16pt の薄いグレー(C0C0C0)
  罫線は各セルの下だけ 細いグレー(AAAAAA)
"""
import json, sys, os
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

EN_FONT, JP_FONT = "Comic Sans MS", "游ゴシック"
TRACE_GRAY = RGBColor(0xC0, 0xC0, 0xC0)
RULE_GRAY = "AAAAAA"
PER_PAGE = 27
MAX_EN = 28        # 英語の欄に1行で収まる目安（6.70cm・16pt）
MAX_JA = 15        # 日本語の欄に1行で収まる目安（4.76cm・10.5pt）
COLS = [Cm(4.7625), Cm(6.7028), Cm(6.3606)]


def setup(doc):
    s = doc.sections[0]
    s.page_width, s.page_height = Cm(21.0), Cm(29.7)
    s.top_margin, s.bottom_margin = Cm(1.23), Cm(1.06)
    s.left_margin = s.right_margin = Cm(1.5875)
    st = doc.styles["Normal"]
    st.font.name = JP_FONT
    st.font.size = Pt(10.5)
    st.element.rPr.rFonts.set(qn("w:eastAsia"), JP_FONT)
    st.paragraph_format.space_before = Pt(0)
    st.paragraph_format.space_after = Pt(0)
    return doc


def _fix_width(tbl, widths):
    """列幅を固定する。自動調整のままだと、セルに幅を入れても等分にされてしまう。"""
    tbl.autofit = False
    pr = tbl._tbl.tblPr
    lay = OxmlElement("w:tblLayout")
    lay.set(qn("w:type"), "fixed")
    pr.append(lay)
    grid = tbl._tbl.find(qn("w:tblGrid"))
    if grid is not None:
        for gc, w in zip(grid.findall(qn("w:gridCol")), widths):
            gc.set(qn("w:w"), str(int(w.cm * 567)))
    for row in tbl.rows:
        for c, w in zip(row.cells, widths):
            c.width = w


def _borders(tbl):
    """表そのものは枠線、セルは下だけ細いグレー（見本と同じ）。"""
    pr = tbl._tbl.tblPr
    b = OxmlElement("w:tblBorders")
    for side in ("top", "left", "bottom", "right", "insideH", "insideV"):
        e = OxmlElement("w:" + side)
        e.set(qn("w:val"), "single"); e.set(qn("w:sz"), "4")
        e.set(qn("w:space"), "0"); e.set(qn("w:color"), "auto")
        b.append(e)
    pr.append(b)
    m = OxmlElement("w:tblCellMar")
    for side in ("left", "right"):
        e = OxmlElement("w:" + side)
        e.set(qn("w:w"), "10"); e.set(qn("w:type"), "dxa")
        m.append(e)
    pr.append(m)


def _cell_rule(cell):
    tcPr = cell._tc.get_or_add_tcPr()
    b = OxmlElement("w:tcBorders")
    e = OxmlElement("w:bottom")
    e.set(qn("w:val"), "single"); e.set(qn("w:sz"), "1")
    e.set(qn("w:space"), "0"); e.set(qn("w:color"), RULE_GRAY)
    b.append(e)
    tcPr.append(b)


def put(cell, text, size, en=False, color=None):
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(0)
    r = p.add_run(text)
    r.font.size = Pt(size)
    r.font.name = EN_FONT if en else JP_FONT
    if not en:
        r._element.rPr.rFonts.set(qn("w:eastAsia"), JP_FONT)
    if color is not None:
        r.font.color.rgb = color
    _cell_rule(cell)


def name_row(doc):
    t = doc.add_table(rows=1, cols=4)
    _fix_width(t, [Cm(2.4694), Cm(4.9389), Cm(2.1167), Cm(8.3009)])
    _borders(t)
    put(t.cell(0, 0), "出席番号", 10.5)
    put(t.cell(0, 1), " ", 10.5)
    put(t.cell(0, 2), "名前", 10.5)
    put(t.cell(0, 3), " ", 10.5)
    return t


def page_table(doc, rows, test):
    t = doc.add_table(rows=len(rows), cols=3)
    _fix_width(t, COLS)
    _borders(t)
    for i, (ja, en) in enumerate(rows):
        put(t.cell(i, 0), ja, 10.5)
        # なぞり書きは薄い英語、テストは空欄。3列目はどちらも自分で書く欄。
        put(t.cell(i, 1), "" if test else en, 16, en=True, color=None if test else TRACE_GRAY)
        put(t.cell(i, 2), "", 11)
    return t


def build(spec, path, test=False):
    doc = Document()
    setup(doc)
    pages = spec["pages"]
    for k, pg in enumerate(pages):
        if k:
            doc.add_page_break()
        name_row(doc)
        doc.add_paragraph()
        page_table(doc, [tuple(r) for r in pg["rows"]][:PER_PAGE], test)
    doc.save(path)
    return path, len(pages), sum(len(p["rows"]) for p in pages)


def style_check(spec):
    """日本語と英語のそろい方を見る。
       ・文には句点「。」、句や語にはつけない（英語の . ? ! とそろえる）
       ・英語に he / she / we などの主語があるなら、日本語にも対応する語が要る
         （「とても寒く感じた」に he felt very cold を当てると、he が浮く）"""
    bad = []
    SUBJ = {"he": ("彼", "かれ"), "she": ("彼女", "かのじょ"), "they": ("彼ら", "かれら", "они"),
            "we": ("わたし", "私", "ぼく", "僕"), "i": ("わたし", "私", "ぼく", "僕"),
            "you": ("あなた", "きみ", "君")}
    for pi, pg in enumerate(spec["pages"], 1):
        for ja, en in pg["rows"]:
            e_sent = en.rstrip().endswith((".", "?", "!"))
            j_sent = ja.rstrip().endswith(("。", "？", "！"))
            if e_sent != j_sent:
                bad.append(f"p{pi} 「{ja}」/ {en} … " +
                           ("英語は文なのに日本語に句点がない" if e_sent else "日本語に句点があるのに英語が文でない"))
            head = en.split()[0].lower().strip(".,?!") if en.split() else ""
            if head in SUBJ and not any(k in ja for k in SUBJ[head]):
                bad.append(f"p{pi} 「{ja}」/ {en} … 英語の {head} に当たる語が日本語にない")
            # 英語の欄は 6.70cm・16pt。長すぎると折り返して1ページ27行に収まらない
            if len(en) > MAX_EN:
                bad.append(f"p{pi} 「{ja}」/ {en} … 英語が長い（{len(en)}字・目安{MAX_EN}字まで）")
            if len(ja) > MAX_JA:
                bad.append(f"p{pi} 「{ja}」/ {en} … 日本語が長い（{len(ja)}字・目安{MAX_JA}字まで）")
    if bad:
        print("  ✗ 日本語と英語のそろい方:")
        for x in bad:
            print("     " + x)
    else:
        print("  ✓ 文には句点・句にはなし／主語も日本語と対応している")
    return not bad


def cover_check(spec, exam_ids):
    """答えがシートに入っているか確かめる。混ぜて並べるぶん、抜けに気づきにくいため。"""
    import re, subprocess
    body = " ".join(en.lower() for pg in spec["pages"] for _, en in pg["rows"])
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    missing = []
    for eid in exam_ids:
        src = open(os.path.join(root, "mogi", "data", eid + ".js"), encoding="utf-8").read()
        for m in re.finditer(r'"answers"\s*:\s*\[\s*"([^"]+)"|answers:\s*\[\s*"([^"]+)"', src):
            ans = (m.group(1) or m.group(2)).strip()
            if not re.search(r"[A-Za-z]", ans):
                continue                      # 数字だけの答え（2009 など）は対象外
            words = [w for w in re.findall(r"[A-Za-z]+", ans.lower())]
            if not all(w in body for w in words):
                missing.append(f"{eid}: {ans}")
    if missing:
        print("  ✗ シートに入っていない答え:")
        for x in missing:
            print("     " + x)
    else:
        print("  ✓ 空所補充の答えは、ぜんぶシートのどこかに入っている")

    # 答えとつながっていない行＝「ほんとうに解答欄に書くのか？」を先生が見直すため。
    # 消すかどうかは先生の判断なので、止めずに並べるだけにする。
    ans_words = set()
    for eid in exam_ids:
        src = open(os.path.join(root, "mogi", "data", eid + ".js"), encoding="utf-8").read()
        for m in re.finditer(r'answers"?\s*:\s*\[\s*"([^"]+)"', src):
            ans_words.update(w for w in re.findall(r"[A-Za-z]+", m.group(1).lower()))
    loose = []
    for pi, pg in enumerate(spec["pages"], 1):
        for ja, en in pg["rows"]:
            ws = [w for w in re.findall(r"[A-Za-z]+", en.lower()) if w not in
                  ("a", "an", "the", "of", "in", "on", "at", "to", "with", "it", "we", "is", "are", "very")]
            if ws and not any(w in ans_words for w in ws):
                loose.append(f"p{pi} 「{ja}」/ {en}")
    if loose:
        print(f"  ⓘ 答えに直接つながっていない行 {len(loose)}件（仲間としては要るが、多すぎないか確かめる）:")
        for x in loose:
            print("     " + x)
    return not missing


def verify_print(path, want):
    """★実際に刷って、ページ数が思ったとおりか確かめる。
       1行ずつは収まっていても、27行ぶんの高さが少し超えて2枚に割れることがある
       （文字数では測れない。字の幅がちがうため）。LibreOffice で PDF にして数える。"""
    import subprocess, re, tempfile, os as _os
    out = tempfile.mkdtemp()
    try:
        subprocess.run(["libreoffice", "--headless", "--convert-to", "pdf", path, "--outdir", out],
                       capture_output=True, timeout=240)
        pdf = _os.path.join(out, _os.path.splitext(_os.path.basename(path))[0] + ".pdf")
        if not _os.path.exists(pdf):
            print("  ⓘ 刷って確かめられませんでした（LibreOffice なし）")
            return True
        n = len(re.findall(rb"/Type\s*/Page[^s]", open(pdf, "rb").read()))
        if n == want:
            print(f"  ✓ 刷ると{n}枚（思ったとおり）")
            return True
        print(f"  ✗ 刷ると{n}枚になる（{want}枚のはず）。どこかの行が折り返して次の紙へあふれている。"
              f"行を減らすか、その行を短くすること")
        return False
    except Exception as e:
        print("  ⓘ 刷って確かめられませんでした（" + str(e)[:40] + "）")
        return True


def main():
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(1)
    spec = json.load(open(sys.argv[1], encoding="utf-8"))
    out = sys.argv[2]
    os.makedirs(out, exist_ok=True)
    name = spec.get("name", "trace")
    a, np_, nw = build(spec, os.path.join(out, f"{name}.docx"))
    print(f"✓ {a}")
    print(f"  {np_}ページ・{nw}語")
    if "--test" in sys.argv:
        b, _, _ = build(spec, os.path.join(out, f"{name}_テスト.docx"), test=True)
        print(f"✓ {b}（同じ並びの空欄版）")
    style_check(spec)                      # 日本語と英語のそろい方は毎回みる
    if "--verify" in sys.argv:
        verify_print(os.path.join(out, f"{name}.docx"), len(spec["pages"]))
    if "--cover" in sys.argv:
        ids = [a for a in sys.argv[sys.argv.index("--cover") + 1:] if not a.startswith("--")]
        cover_check(spec, ids)


if __name__ == "__main__":
    main()
