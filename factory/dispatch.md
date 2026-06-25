# 🏭 工場ディスパッチ手順（定期セッション＝cron が読む指示書）

スケジュール起動された Claude セッションは、この手順に沿って「いま動かすべきスレッド」を進める。
**master へ直接 push しない。必ずブランチ＋PR。** 生成物は人のレビューでマージ。

## 0. 共通（毎回）
1. `git fetch origin && git checkout master && git pull`
2. `npm ci && npm run check` … 品質ゲートが緑か確認（赤なら ① を最優先）
3. 有効なスレッドだけ進める（下記）。1回のセッションでは**小さく1ステップ**だけ進めて PR。

## ① qa/loop（品質チェック）
- ブランチ：`qa/loop`（無ければ作成）
- やること：
  1. `npm run check`。赤があれば原因を特定して最小修正。
  2. AIレビュー：`mogi/data/*.js` を大問ごとに並行レビュー（論理・話者の連続・訳の文脈・難易度・誤答選択肢）。
  3. 反証検証：findings を別観点で偽検出つぶし（多数決で残ったものだけ採用）。
  4. 安全な不具合は修正、要判断はレポートに列挙。
- 出力：`[qa]` PR（修正 or レポート `factory/reports/qa-YYYYMMDD.md`）。

## ② gen/predict（予測モシ）— 要 `factory/inputs/annual_plan.*`
- 無ければスキップ（「年間予定 未提供」とだけ記録）。
- あれば：次回範囲を推定 → 既存フォーマットで新作1本生成 → `npm run check` 100点 → `[gen:predict]` PR。

## ③ gen/okayama（岡山・reference-only）
- 過去問の **verbatim 収録はしない**。傾向・難易度・配点の要約だけを `factory/inputs/okayama_notes.md` に蓄積。
- それを根拠に**オリジナル新作**を1本生成 → `npm run check` 100点 → `[gen:okayama]` PR。

## 報告
- 進めた内容・開いた PR・要判断事項を1〜3行で要約（必要時のみ通知）。
- 何も進められない場合（入力待ち等）は静かに終了。
