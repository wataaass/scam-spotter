import { describe, expect, it } from "vitest";
import { decideType, summarize } from "../src/scoring";
import type { Answer, PlayRecord } from "../src/types";

const rec = (answer: Answer, choice: Answer, extra: Partial<PlayRecord> = {}): PlayRecord => ({
  questionId: "q",
  answer,
  choice,
  verified: false,
  linkTapped: false,
  ...extra,
});

describe("summarize", () => {
  it("正解数と100点満点の点数を出す", () => {
    const s = summarize([rec("scam", "scam"), rec("real", "real"), rec("scam", "real"), rec("real", "scam")]);
    expect(s.correct).toBe(2);
    expect(s.score).toBe(50);
  });

  it("だまされた数と疑いすぎた数を分けて数える", () => {
    const s = summarize([rec("scam", "real"), rec("scam", "real"), rec("real", "scam")]);
    expect(s.scamsMissed).toBe(2);
    expect(s.realsMissed).toBe(1);
  });

  it("確かめた数とリンクを押した数を数える", () => {
    const s = summarize([rec("scam", "scam", { verified: true }), rec("scam", "scam", { linkTapped: true })]);
    expect(s.verified).toBe(1);
    expect(s.linkTaps).toBe(1);
  });

  it("0問でも 0点（0で割らない）", () => {
    expect(summarize([]).score).toBe(0);
  });
});

describe("decideType", () => {
  const many = (n: number, answer: Answer, choice: Answer) => Array.from({ length: n }, () => rec(answer, choice));

  it("全問正解は かくにん名人", () => {
    expect(decideType(summarize([...many(6, "scam", "scam"), ...many(4, "real", "real")])).id).toBe("master");
  });

  it("9問正解は するどい観察眼", () => {
    expect(decideType(summarize([...many(6, "scam", "scam"), ...many(3, "real", "real"), rec("real", "scam")])).id).toBe("sharp");
  });

  it("詐欺を2問以上見逃したら、点数が高くても すなおすぎ注意", () => {
    expect(decideType(summarize([...many(4, "scam", "scam"), ...many(4, "real", "real"), ...many(2, "scam", "real")])).id).toBe("trusting");
  });

  it("本物を2問以上疑ったら うたがいすぎ注意", () => {
    expect(decideType(summarize([...many(6, "scam", "scam"), ...many(2, "real", "real"), ...many(2, "real", "scam")])).id).toBe("doubting");
  });

  it("両方の偏りがあるときは、だまされやすいほうを先に伝える", () => {
    expect(decideType(summarize([...many(4, "scam", "scam"), ...many(2, "scam", "real"), ...many(2, "real", "real"), ...many(2, "real", "scam")])).id).toBe("trusting");
  });

  it("半分以上まちがえたら、偏りより先に これから伸びる", () => {
    expect(decideType(summarize([...many(4, "scam", "scam"), ...many(2, "scam", "real"), ...many(3, "real", "scam"), ...many(1, "real", "real")])).id).toBe("growing");
  });

  it("どの正解数でも、5つのタイプのどれかになり、全部のタイプに届く", () => {
    const seen = new Set<string>();
    // 詐欺6問・本物4問で、見逃し数と疑いすぎ数のすべての組み合わせを試す
    for (let sm = 0; sm <= 6; sm++) {
      for (let rm = 0; rm <= 4; rm++) {
        const records = [...many(6 - sm, "scam", "scam"), ...many(sm, "scam", "real"), ...many(4 - rm, "real", "real"), ...many(rm, "real", "scam")];
        seen.add(decideType(summarize(records)).id);
      }
    }
    expect(seen).toEqual(new Set(["growing", "trusting", "doubting", "master", "sharp"]));
  });
});
