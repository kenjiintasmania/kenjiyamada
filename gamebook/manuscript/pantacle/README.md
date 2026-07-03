# パンタクル（pantacle）

ゾディアック群島を舞台にしたパラグラフ分岐型ゲームブック。主人公メスロンが
オフィユカス島を拠点に十二宮を攻略する。星読み表・カリスマ値・経験記号を
読者が手元で記録しながら進む形式。

## 原稿の出どころ

2026-07-03 に Google ドキュメント17件からテキストを取り込み、`genko/` に
**一字一句そのまま**保存した（誤植・メモ・未執筆の空番号も原文ママ）。

| ファイル | 元ドキュメント | 番号帯 | 備考 |
|---|---|---|---|
| genko/20-macro-machi-1.md | マクロの街１ | なし（■場所） | ステージ1の街。インテルメッツォⅠまで |
| genko/02-kingyukyu.md | 金牛宮 | 101〜107 | |
| genko/05-shishikyu.md | 獅子宮 | 201〜299 | **新版と判断して採用** |
| genko/05x-shishikyu-0108.md | 獅子宮0108 | 201〜299 | 旧版ドラフト。**EPUB非収録**（保管のみ） |
| genko/08-tenkatsukyu.md | 天蝎宮 | 301〜399 | フェイズ2はA〜Zの迷宮 |
| genko/11-hoheikyu.md | 宝瓶宮 | 401〜499 | |
| genko/21-macro-machi-2.md | マクロの街２ | なし（■場所） | 宿追加・後半はプロットメモ |
| genko/01-hakuyokyu.md | 白羊宮 | 501〜599 | 【単語】文字リンク迷宮 |
| genko/04-kyokaikyu.md | 巨蟹宮 | 601〜699 | |
| genko/07-tenbinkyu.md | 天秤宮 | 701〜799 | |
| genko/03-sojikyu.md | 双児宮 | 901〜999 | Ｂ面（９１１ーＢ等）あり |
| genko/06-shojokyu.md | 処女宮 | 1001〜1099 | 漢数字見出し（一〇一一〜）混在 |
| genko/09-jinbakyu.md | 人馬宮 | 1101〜1199 | |
| genko/12-sogyokyu.md | 双魚宮 | 1201〜1299 | |
| genko/30-shuban.md | パンタクル終盤 | なし（■節） | 最終決戦・エンディング。中核は未完成 |
| genko/00-settei.md | パンタクル設定 | — | 設定資料（ネタバレ含む）。**EPUB非収録** |
| genko/00-kako-memo.md | パンタクル過去メモ | — | 構想メモ。**EPUB非収録** |

- 番号の設計は原稿内の著者メモどおり「**百の位が宮殿番号**」。磨羯宮（8XX）だけ原稿が存在しない。
- オフィユカス島の基幹パラグラフ（１〜９９番台。「１へ進め」「５１へ進む」の行き先）も見つかっていない。

## EPUB 化

```sh
node gamebook/tools/pantacle/convert.mjs                                        # 原稿 → epub/src/pantacle
node gamebook/tools/check_links.mjs gamebook/epub/src/pantacle                  # 品質ゲート
node gamebook/tools/build_epub.mjs gamebook/epub/src/pantacle gamebook/epub/dist/pantacle.epub
```

変換の方針（原文は一切改変しない）:

- ジャンプ（→数字・【単語】・座標【蠍－獅子】・A〜Z・場所名）はすべて内部リンク化。
- 原稿に行き先が無いジャンプは **p000「執筆中」**へ、オフィユカス島の呪門系ジャンプは
  合成ページ **p001「呪門（転移の間）」**（基幹パラグラフ1の代役・章えらび）へ着地する。
- 各章とびら（part-*.xhtml）に原稿冒頭の術一覧・星読み表を収録。マクロの街は場所一覧つき。
- 全ノード索引（debug.xhtml・ネタバレ注意）を同梱。

## デバッグ

既知の問題・要判断事項は [`debug-list.md`](debug-list.md) に整理してある。
機械抽出の生データは `unresolved.json`（convert.mjs が再生成する）。
