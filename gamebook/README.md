# gamebook — ゲームブック原稿・EPUB 管理

ゲームブック（パラグラフ分岐型の読み物）の**原稿**と、パラグラフを内部リンクで
つないでジャンプできる**電子書籍（EPUB）**を、このディレクトリで一元管理する。

## 構成

```
gamebook/
├── manuscript/            # 原稿置き場（1作品 = 1フォルダ）
│   ├── README.md          #   原稿の記法・命名規則
│   └── sample/genko.md    #   サンプル原稿
├── epub/                  # EPUB の編集・保管
│   ├── README.md          #   EPUB ソースの構成ルール
│   ├── src/               #   編集用ソース（展開状態、1作品 = 1フォルダ）
│   │   └── sample/        #   サンプル作品のソース（ひな形として使う）
│   └── dist/              #   ビルド済み .epub（配布用。コミットして保管する）
├── tools/
│   ├── build_epub.mjs     # src → .epub を生成（Node だけで動く、依存なし）
│   └── check_links.mjs    # リンク切れ・到達不能パラグラフ・エンディング明示の検査
└── EPUB_THREAD_PROMPT.md  # 「原文→EPUB化」専用スレッドの初回プロンプト
```

## スレッド分担

- **このスレ（器づくり）**: ディレクトリ構成・ツール・サンプルの整備。
- **EPUB化スレ**: 先生が原文を貼る → `manuscript/` に保存 → `epub/src/` に変換 →
  検査 → ビルド → `epub/dist/` にコミット。初回プロンプトは
  [`EPUB_THREAD_PROMPT.md`](EPUB_THREAD_PROMPT.md) を貼る。

## コマンド（リポジトリ直下で実行）

```sh
# リンク検査（品質ゲート。EPUB ソースを触ったら必ず通す）
node gamebook/tools/check_links.mjs gamebook/epub/src/sample

# ビルド（.epub を生成して dist/ に置く）
node gamebook/tools/build_epub.mjs gamebook/epub/src/sample gamebook/epub/dist/sample.epub
```

## 配布

`master` にマージされると GitHub Pages からそのままダウンロードできる:

```
https://kenjiintasmania.github.io/kenjiyamada/gamebook/epub/dist/sample.epub
```

スマホ・タブレットの EPUB リーダー（Apple ブック、Google Play ブックス等）で
開けば、選択肢のリンクをタップしてパラグラフ間をジャンプしながら読める。
