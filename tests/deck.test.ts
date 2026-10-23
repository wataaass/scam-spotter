import { describe, expect, it } from "vitest";
import { DECK_SIZE, pickQuestions } from "../src/deck";
import { QUESTIONS } from "../src/questions";

// 決まった並びの「乱数」を作る（毎回同じ結果になり、テストがゆれない）
function seeded(seed: number) {
  let x = seed;
  return () => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return x / 2147483648;
  };
}

describe("pickQuestions", () => {
  const plays = Array.from({ length: 200 }, (_, i) => pickQuestions(QUESTIONS, seeded(i + 1)));

  it("毎回 詐欺6問・本物4問の10問で、同じ問題が2度出ない", () => {
    for (const deck of plays) {
      expect(deck).toHaveLength(DECK_SIZE.scam + DECK_SIZE.real);
      expect(deck.filter((q) => q.answer === "scam")).toHaveLength(DECK_SIZE.scam);
      expect(deck.filter((q) => q.answer === "real")).toHaveLength(DECK_SIZE.real);
      expect(new Set(deck.map((q) => q.id)).size).toBe(deck.length);
    }
  });

  it("やさしい問題から順に並ぶ", () => {
    for (const deck of plays) {
      const levels = deck.map((q) => q.level);
      expect(levels).toEqual([...levels].sort((a, b) => a - b));
    }
  });

  it("何度も遊べば、置き場のすべての問題が出てくる", () => {
    const seen = new Set(plays.flat().map((q) => q.id));
    expect(seen.size).toBe(QUESTIONS.length);
  });

  it("置き場の中身を書きかえない", () => {
    const before = QUESTIONS.map((q) => q.id);
    pickQuestions(QUESTIONS, seeded(42));
    expect(QUESTIONS.map((q) => q.id)).toEqual(before);
  });
});
