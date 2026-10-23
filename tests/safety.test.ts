import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// 作品の決まり「入力させない・どこにも送らない」を、ソースコードの上でも確かめる。
// だれかが（未来の自分も）うっかり入力欄や通信を足したら、このテストが落ちる。

const SRC = join(import.meta.dirname, "..", "src");
const files = readdirSync(SRC).filter((f) => f.endsWith(".ts"));
const code = (f: string) =>
  readFileSync(join(SRC, f), "utf-8")
    // コメントの中の言葉は数えない
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");

describe.each(files)("%s", (file) => {
  const src = code(file);

  it("入力欄やフォームを作らない", () => {
    expect(src).not.toMatch(/["'](input|textarea|form|select)["']/);
    expect(src).not.toMatch(/contenteditable/i);
  });

  it("外へ通信しない", () => {
    expect(src).not.toMatch(/\bfetch\s*\(|XMLHttpRequest|WebSocket|sendBeacon|EventSource/);
  });

  it("ブラウザに遊んだ記録を残さない", () => {
    expect(src).not.toMatch(/localStorage|sessionStorage|indexedDB|document\.cookie/);
  });

  it("文字を HTML として入れない（XSS を防ぐ）", () => {
    expect(src).not.toMatch(/innerHTML|outerHTML|insertAdjacentHTML|document\.write/);
  });
});

describe("公開版の設定", () => {
  it("CSP で外への通信とフォームの送信を禁止している", () => {
    const config = readFileSync(join(import.meta.dirname, "..", "vite.config.ts"), "utf-8");
    expect(config).toContain(`"connect-src 'none'"`);
    expect(config).toContain(`"form-action 'none'"`);
  });
});
