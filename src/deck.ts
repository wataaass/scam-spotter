import type { Question } from "./types";

/** 1回のプレイの問題数と、その内訳 */
export const DECK_SIZE = { scam: 6, real: 4 } as const;

/** 0 以上 1 未満の数を返す関数。テストでは決まった並びを渡して、結果を毎回同じにする */
export type Random = () => number;

/**
 * 問題の置き場から、1回ぶんの問題を選ぶ。
 * - 詐欺6問・本物4問（全部疑うだけで満点にならないように、本物を必ずまぜる）
 * - やさしい問題から順に並べる（同じ難しさの中では順番を混ぜる）
 */
export function pickQuestions(pool: readonly Question[], random: Random = Math.random): Question[] {
  const take = (answer: Question["answer"], n: number) => shuffle(pool.filter((q) => q.answer === answer), random).slice(0, n);
  const picked = shuffle([...take("scam", DECK_SIZE.scam), ...take("real", DECK_SIZE.real)], random);
  // sort は同じ難しさのものの順番を保つので、混ぜた順番がそのまま残る
  return picked.sort((a, b) => a.level - b.level);
}

// フィッシャー–イェーツのシャッフル（どの並びも同じ確率で出る混ぜ方）
function shuffle<T>(items: readonly T[], random: Random): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j] as T, a[i] as T];
  }
  return a;
}
