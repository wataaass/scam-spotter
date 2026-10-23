import { describe, expect, it } from "vitest";
import { QUESTIONS, WORLD } from "../src/questions";

// 問題データが、作品の決まり（CLAUDE.md）を守っているかを毎回確かめる。

const allText = (q: (typeof QUESTIONS)[number]) =>
  [q.situation, q.appName, ...q.parts.map((p) => p.text), q.verify.action, q.verify.result].join("\n");

describe("問題の数と配分", () => {
  it("10問ある", () => {
    expect(QUESTIONS).toHaveLength(10);
  });

  it("id が重ならない", () => {
    const ids = QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("本物を3〜5問まぜる（全部疑うだけで満点にならないように）", () => {
    const real = QUESTIONS.filter((q) => q.answer === "real").length;
    expect(real).toBeGreaterThanOrEqual(3);
    expect(real).toBeLessThanOrEqual(5);
  });

  it("SMS・メール・チャットの3種類と、難しさ1〜3がそろっている", () => {
    expect(new Set(QUESTIONS.map((q) => q.channel))).toEqual(new Set(["sms", "email", "chat"]));
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
    const hosts = allText(q).match(/[a-z0-9-]+(?:\.[a-z0-9-]+)+/gi) ?? [];
    for (const host of hosts) expect(host.toLowerCase()).toMatch(/\.example$/);
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
