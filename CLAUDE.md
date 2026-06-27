# 作業の取り決め（kenjiyamada）

## 出力ルール
- **長いコードは Git で出す**：チャットに全文を貼らない。`master` にコミット＆プッシュし、
  GitHub のファイルリンク（必要なら「Copy raw contents」案内）で渡す。差分は PR ではなく
  コミットで示す（PR はユーザーが明示的に依頼したときだけ作る）。
- 短い断片（数行）や説明用の抜粋はチャットに貼ってよい。

## このリポジトリ
- 静的サイト（ビルドなし）。**GitHub Pages は `master` から配信** ＝ ライブ反映には `master` へ push。
  - 公開URL: https://kenjiintasmania.github.io/kenjiyamada/
- 生徒アプリ：`words/`（単語）・`mogi/`（模試）・`eiken/`（英検）・`me/`（マイページ）・
  `challenge/`（挑戦モード）・`admin/`（先生用）。
- 品質ゲート：`node tools/check_exams.mjs`（全模試100点・構造・話者連続・okayama横断重複・単語サニティ）。
  模試データを触ったら必ず通すこと。

## GAS（Google Apps Script）— 手動デプロイ
コードはリポジトリに置くが、**反映は先生が GAS エディタに貼って「新バージョン」で再デプロイ**する手動作業。
- `tools/score_gas.gs`：成績・単元テスト・学習方針・AI×成績相関。`SPREADSHEET_ID` は直書き済み
  （`1x3jpH6…dXNJs`）。`TEACHER_PIN` は先生の秘密値に変更し、`/admin` の PIN と一致させる。
  版番号 `GAS_VERSION` を上げると `/admin` 上部に表示され反映確認できる。
- `log_gas.gs`（**別スレ＝プロンプト設計が所有**・別プロジェクト/別URL）：AI練習ログを
  **同一ブックのタブ「AImodeログ」**へ追記。`score_gas` 側はタブ名ではなく列見出し
  「AI活用レベル(推定)」で検出するので、両者は見出し名で疎結合。
- 注意：プロキシが `script.google.com` を遮断するため、ライブGASの直接疎通確認はできない。

## 設計の土台
- 全体像は `ARCHITECTURE.md`（§8 にプロンプトモード＝AImodeログとの統合契約）。
