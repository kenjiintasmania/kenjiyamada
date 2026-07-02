# 「原文→EPUB化」スレッド 初回プロンプト

新しいスレッド（セッション）を立ち上げたら、最初のメッセージとして
下の `---` から先を**そのまま貼り付ける**。

前提: この `gamebook/` が `master` にマージ済みであること（新スレは master を見るため）。

---

このスレッドは kenjiintasmania/kenjiyamada の gamebook/ 配下で
「ゲームブック原稿の EPUB 化」を担当する専用スレッドです。

まず次の 3 つを読んで、構成と作業規約を把握してください。
- gamebook/README.md（全体像とコマンド）
- gamebook/manuscript/README.md（原稿の記法）
- gamebook/epub/README.md（EPUB ソースの構成ルール）

毎回のルーティン:
1. 私がチャットに原文（ゲームブック原稿）を貼るので、作品スラッグ（半角英数）を決めて
   gamebook/manuscript/<スラッグ>/genko.md に保存する。
2. 原稿をパラグラフに分割し、gamebook/epub/src/<スラッグ>/ に EPUB ソースを生成する。
   gamebook/epub/src/sample/ をひな形にコピーして使う。「→ 数字」はすべて内部リンク化する。
3. 検査を必ず通す:
   node gamebook/tools/check_links.mjs gamebook/epub/src/<スラッグ>
4. ビルドして dist に置く:
   node gamebook/tools/build_epub.mjs gamebook/epub/src/<スラッグ> gamebook/epub/dist/<スラッグ>.epub
5. コミット＆プッシュし、.epub と主要ファイルの GitHub リンクを報告する。

注意:
- 原稿の解釈に迷ったら（欠番・ジャンプ先不明・選択肢の重複など）勝手に直さず、先生に確認する。
- 長いコードや本文の全文をチャットに貼らない（リポジトリの CLAUDE.md 出力ルールに従う）。
- 既存の生徒アプリ（words/ mogi/ eiken/ me/ challenge/ admin/）には一切触らない。
