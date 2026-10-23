import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

// 公開版のページに CSP（Content Security Policy）を付ける。
// connect-src 'none' で、ページから外へ通信する手段（fetch など）をブラウザに禁止させる。
// 「入力をどこにも送らない」を、約束だけでなくブラウザの設定でも守るため。
// 開発中のサーバーは自分の通信（画面の自動更新）を使うので、公開版の build のときだけ付ける。
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data: blob:",
  "connect-src 'none'",
  "form-action 'none'",
  "base-uri 'none'",
  "object-src 'none'",
].join("; ");

function cspPlugin(): Plugin {
  return {
    name: "csp-meta",
    apply: "build",
    transformIndexHtml(html) {
      // 文字コードの指定は先頭に置く決まりなので、その直後に入れる
      return html.replace(
        '<meta charset="UTF-8" />',
        `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`,
      );
    },
  };
}

export default defineConfig({
  // GitHub Pages ではリポジトリ名の下（/scam-spotter/）に置かれるので、相対パスで読み込む
  base: "./",
  plugins: [cspPlugin()],
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
