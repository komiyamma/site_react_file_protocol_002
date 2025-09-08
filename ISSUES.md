# 技術的な問題点

## ビルド設定とドキュメント間の矛盾

### 問題の概要

`README.md`には、「ビルド後、`dist/index.html`をブラウザで直接開くことができます」と記載されています。これは、ビルド成果物が `file://` プロトコルで正常に動作することを示唆しています。

しかし、現在の `vite.config.js` のビルド設定では、本番ビルド（`npm run build`）時に `base` オプションが `'/simple-landing-page/'` という絶対パスに設定されています。

```javascript
// vite.config.js
export default defineConfig({
  // ...
  base: process.env.NODE_ENV === 'production' ? '/simple-landing-page/' : './', // GitHub Pages対応
  // ...
})
```

この設定により、生成される `index.html` 内のJavaScriptやCSSファイルへの参照は、以下のようになります。

```html
<script type="module" crossorigin src="/simple-landing-page/assets/index-....js"></script>
<link rel="stylesheet" crossorigin href="/simple-landing-page/assets/index-....css">
```

### なぜ問題なのか

この絶対パス (`/simple-landing-page/...`) は、ウェブサーバーのルートディレクトリからのパスを前提としています。そのため、GitHub Pagesのような `https://[username].github.io/simple-landing-page/` というURLでホスティングした場合には正しく動作します。

一方で、ローカルの `dist/index.html` ファイルをブラウザで直接開いた場合（`file:///path/to/project/dist/index.html`）、ブラウザはアセットファイルを `file:///simple-landing-page/assets/...` というパスで探そうとしますが、そのようなディレクトリは存在しないため、ファイルの読み込みに失敗し、ページは正しく表示されません。

結果として、`README.md` の記述と実際のビルド成果物の挙動に食い違いが生じています。

### 提案される改善策

このプロジェクトの目的によりますが、2つの解決策が考えられます。

1.  **`file://` での閲覧を優先する場合:**
    `vite.config.js` の `base` 設定を `'./'` に変更します。これにより、生成されるパスが相対パスになり、`file://` で直接開いてもアセットを正しく読み込めるようになります。ただし、この変更を行うと、GitHub Pagesのサブディレクトリへのデプロイが正しく機能しなくなる可能性があります。

2.  **GitHub Pagesへのデプロイを優先する場合:**
    `README.md` の記述を修正し、「`dist/index.html` を直接開くのではなく、ローカルサーバーを立てて確認する必要がある」という旨を明記します。例えば、`npm run preview` コマンドの使用を推奨するなどの記述が考えられます。

現在の設定は、ドキュメントの記述とは裏腹に、後者（GitHub Pagesへのデプロイ）を優先した構成となっています。
