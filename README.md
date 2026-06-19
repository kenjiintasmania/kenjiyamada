# 英語学習アプリ（山田先生）

ブラウザだけで動く英語学習アプリ集です。トップ（`index.html`）から2つのアプリを選べます。
GitHub Pages で公開され、スマホからも使えます。

- 公開URL: **https://kenjiintasmania.github.io/kenjiyamada/**

## 収録アプリ

| アプリ | 入口 | 内容 |
|---|---|---|
| 📕 **単語アプリ** | [`words/`](words/) | 英単語を品詞ごとに練習（基本編＋拡張編・合計2000語）。クリア状況は端末に保存。 |
| 📝 **模擬テスト** | [`mogi/`](mogi/) | 正進社 過去問ベースの模擬テスト。中2／中3（第1回・第2回）。リスニングは文字で再現・自動採点。答えの単語テストも収録。 |

各アプリの詳しい説明は、それぞれのフォルダ内 README を参照してください
（[words/README.md](words/README.md) ／ [mogi/README.md](mogi/README.md)）。

## 公開（GitHub Pages）

`master` への push で `.github/workflows/deploy-pages.yml` が走り、自動でビルド・公開されます。
ビルド時は教材データ（`*.xlsx`）・ビルドツール・依存パッケージなどを除外して `_site/` を作成します。

## ディレクトリ構成

```
index.html                統合トップ（単語アプリ / 模擬テスト を選ぶ）
words/                    単語アプリ（基本編＋拡張編 2000語）
mogi/                     模擬テスト（中2 / 中3 第1回・第2回 ＋ 答えの単語テスト）
.github/workflows/        GitHub Pages 自動公開ワークフロー
```

> メモ：このリポジトリは複数の作業ブランチから更新されることがあります。
> 競合を避けるため、同時編集時は片方ずつ master へ反映してください。
