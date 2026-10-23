import { describe, expect, it } from "vitest";
import { DECK_SIZE } from "../src/deck";
import { QUESTIONS, WORLD } from "../src/questions";

// 問題データが、作品の決まり（CLAUDE.md）を守っているかを毎回確かめる。

const allText = (q: (typeof QUESTIONS)[number]) =>
  [q.situation, q.appName, ...q.parts.map((p) => p.text), q.verify.action, q.verify.result].join("\n");

describe("問題の置き場", () => {
  it("1回ぶん（詐欺6・本物4）より多くあり、どちらも足りている", () => {
    expect(QUESTIONS.filter((q) => q.answer === "scam").length).toBeGreaterThanOrEqual(DECK_SIZE.scam);
    expect(QUESTIONS.filter((q) => q.answer === "real").length).toBeGreaterThanOrEqual(DECK_SIZE.real);
  });

  it("id が重ならない", () => {
    const ids = QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("SMS・メール・チャット・ブラウザの4種類と、難しさ1〜3がそろっている", () => {
    expect(new Set(QUESTIONS.map((q) => q.channel))).toEqual(new Set(["sms", "email", "chat", "browser"]));
    expect(new Set(QUESTIONS.map((q) => q.level))).toEqual(new Set([1, 2, 3]));
  });
});

describe("解説", () => {
  it.each(QUESTIONS)("$id: 印が2つ以上あり、すべて画面の部品を指している", (q) => {
    expect(q.points.length).toBeGreaterThanOrEqual(2);
    const ids = new Set(q.parts.map((p) => p.id));
    for (const point of q.points) expect(ids.has(point.target)).toBe(true);
  });

  it.each(QUESTIONS)("$id: 部品の id が重ならない", (q) => {
    const ids = q.parts.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(QUESTIONS)("$id: 出典が1つ以上あり、URL が正しい形", (q) => {
    expect(q.sources.length).toBeGreaterThanOrEqual(1);
    for (const s of q.sources) expect(() => new URL(s.url)).not.toThrow();
  });
});

describe("安全の決まり", () => {
  // 実在の会社・サービスの名前を、問題の画面に出さない
  const REAL_NAMES = [
    "ヤマト", "佐川", "日本郵便", "ゆうパック", "アマゾン", "楽天", "ドコモ", "ソフトバンク", "メルカリ",
    "三菱", "三井住友", "みずほ", "ゆうちょ", "りそな", "PayPay", "ペイペイ", "国税庁", "東京電力",
  ];
  const REAL_NAMES_LATIN = /\b(amazon|apple|google|docomo|softbank|rakuten|line|visa|jcb|mastercard|paypay|netflix|kuronekoyamato|sagawa)\b/i;

  it.each(QUESTIONS)("$id: 実在の会社名が出てこない", (q) => {
    const text = allText(q);
    for (const name of REAL_NAMES) expect(text).not.toContain(name);
    expect(text).not.toMatch(REAL_NAMES_LATIN);
  });

  it.each(QUESTIONS)("$id: ドメインは予約済みの .example だけ", (q) => {
    const text = allText(q);
    // URL とメールアドレスのドメイン
    const hosts = [...text.matchAll(/(?:https?:\/\/|@)([a-z0-9.-]+)/gi)].map((m) => m[1] ?? "");
    for (const host of hosts) expect(host.toLowerCase()).toMatch(/\.example$/);
    // URL の形でなくても、実在しうるドメインの形（〇〇.com など）を書かない
    expect(text).not.toMatch(/[a-z0-9-]+\.(com|net|org|jp|info|top|xyz|shop)\b/i);
  });

  it.each(QUESTIONS)("$id: 電話番号は伏せてある", (q) => {
    // 0 から始まり、ハイフンでつながる数字の並び（電話番号の形）が伏せずに出ていないか
    expect(allText(q)).not.toMatch(/0\d{1,4}-\d{2,4}-\d{3,4}/);
    for (const p of q.parts.filter((p) => p.kind === "address" && /^0/.test(p.text))) {
      expect(p.text).toContain("●");
    }
  });

  it("世界の会社のドメインも .example", () => {
    for (const c of WORLD.companies) expect(c.domain).toMatch(/\.example$/);
  });
});
