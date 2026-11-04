# 炎上候補チェッカー

GitHub → Cloudflare Workers の単一デプロイ構成です。

- `public/index.html`: ニュース見出しの表示・分析・CSV出力
- `src/index.js`: GoogleニュースRSSを取得するAPI (`/rss`)
- `wrangler.toml`: Cloudflare Workers設定

## 公開手順

Cloudflare Dashboard → Workers & Pages → Create → GitHubリポジトリ `enjo-detector` を選択し、Workersとしてデプロイします。ビルド・デプロイコマンドを求められたら `npx wrangler deploy` を指定します。

公開後は `/health` で稼働確認し、トップページの「ニュースを取得して分析」を押します。

※ ニュース見出しに基づく試作の推定値です。SNS炎上の事実や情報の真偽を確定するものではありません。外部RSSの利用条件を確認してください。
