# epub — EPUB ソースの構成ルール

`src/<スラッグ>/` に展開状態の EPUB3 ソースを置いて編集し、
`tools/build_epub.mjs` で `dist/<スラッグ>.epub` に固める。
`src/sample/` が動くひな形なので、新作はこれをコピーして作るのが早い。

## ソースの構成（1作品ぶん）

```
src/<スラッグ>/
├── mimetype                 # 「application/epub+zip」20バイト・改行なし（触らない）
├── META-INF/container.xml   # OPF の場所を指す定型ファイル（触らない）
└── OEBPS/
    ├── content.opf          # 書誌情報＋ファイル一覧(manifest)＋読み順(spine)
    ├── nav.xhtml            # 目次（表紙とパラグラフ1だけ載せる。全部載せるとネタバレ）
    ├── style.css            # 共通スタイル
    └── text/
        ├── title.xhtml      # 表紙・遊び方・「冒険をはじめる → 1」
        └── pNNN.xhtml       # 1パラグラフ = 1ファイル（p001.xhtml, p002.xhtml, …）
```

## パラグラフファイルの書き方

- ファイル名は `p` ＋ 3桁ゼロ埋め番号（原稿の番号に対応）: 原稿の 12 → `p012.xhtml`
- 選択肢は `<ul class="choices">` 内のリンク、強制ジャンプは `<p class="jump">` のリンク:

```html
<ul class="choices">
  <li><a href="p002.xhtml">たいまつに火をつけて入る → 2</a></li>
</ul>
<p class="jump"><a href="p006.xhtml">→ 6</a></p>
```

- エンディング（ジャンプのないパラグラフ）は `<section class="paragraph end">` にして
  `<p class="fin">■ ハッピーエンド ■</p>` 等を入れる（`check_links.mjs` が強制する）。
- ファイルを増減したら `content.opf` の manifest と spine にも追加・削除する
  （食い違いは `check_links.mjs` が検出する）。

## 品質ゲートとビルド

```sh
node gamebook/tools/check_links.mjs gamebook/epub/src/<スラッグ>
node gamebook/tools/build_epub.mjs gamebook/epub/src/<スラッグ> gamebook/epub/dist/<スラッグ>.epub
```

- 検査内容: リンク切れ／到達不能パラグラフ／エンディング未明示／OPF と実ファイルの食い違い。
- `dist/` の .epub はバイナリだが**コミットして保管する**（配布物そのものなので）。
  ソースを直したら必ずビルドし直して dist も更新する。
