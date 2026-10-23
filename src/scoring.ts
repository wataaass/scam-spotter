import type { PlayRecord } from "./types";

/** 1回のプレイで使える「確かめる」の回数 */
export const VERIFY_LIMIT = 3;

export interface Summary {
  total: number;
  correct: number;
  score: number;
  /** 詐欺なのに「本物」と答えた数（だまされた） */
  scamsMissed: number;
  /** 本物なのに「詐欺」と答えた数（疑いすぎ） */
  realsMissed: number;
  verified: number;
  linkTaps: number;
}

export function summarize(records: readonly PlayRecord[]): Summary {
  const correct = records.filter((r) => r.choice === r.answer).length;
  const total = records.length;
  return {
    total,
    correct,
    // 100点満点。問題数が変わっても同じ物差しで比べられるように割合で出す
    score: total === 0 ? 0 : Math.round((correct / total) * 100),
    scamsMissed: records.filter((r) => r.answer === "scam" && r.choice === "real").length,
    realsMissed: records.filter((r) => r.answer === "real" && r.choice === "scam").length,
    verified: records.filter((r) => r.verified).length,
    linkTaps: records.filter((r) => r.linkTapped).length,
  };
}

export interface PlayerType {
  id: "trusting" | "doubting" | "master" | "sharp" | "growing";
  name: string;
  description: string;
  advice: string;
}

export const PLAYER_TYPES: Record<PlayerType["id"], PlayerType> = {
  trusting: {
    id: "trusting",
    name: "すなおすぎ注意タイプ",
    description: "詐欺のメッセージを本物だと思ってしまうことが多めでした。",
    advice: "急がせる言葉や、お金・暗証番号の話が出たら、いったん止まって公式アプリで確かめましょう。",
  },
  doubting: {
    id: "doubting",
    name: "うたがいすぎ注意タイプ",
    description: "本物のお知らせまで詐欺だと思ってしまうことが多めでした。",
    advice: "全部を疑うと、本当に必要な連絡を見落とします。迷ったら捨てる前に、公式アプリで確かめましょう。",
  },
  master: {
    id: "master",
    name: "かくにん名人タイプ",
    description: "全問正解。本物と詐欺の両方を見分けられました。",
    advice: "本物の詐欺は毎日のように文面を変えます。見た目で分からないときは、今日と同じく確かめる習慣を。",
  },
  sharp: {
    id: "sharp",
    name: "するどい観察眼タイプ",
    description: "ほとんどの問題を見分けられました。",
    advice: "間違えた問題の印を見直すと、次は見抜ける場所が増えます。",
  },
  growing: {
    id: "growing",
    name: "これから伸びるタイプ",
    description: "見分けるのが難しい問題が多かったようです。",
    advice: "リンクを開かず、公式アプリやブックマークから確かめる。この1つだけで防げる被害がたくさんあります。",
  },
};

/**
 * タイプを決める。
 * 1. 半分以上まちがえたら、偏りより先に基本（確かめる習慣）を伝える
 * 2. 2問以上の偏りがあれば、危ないほう（だまされやすい）を先に伝える
 * 10問だと3問以上まちがえた時点でどちらかの偏りが2以上になるので、
 * 1 を先に見ないと「これから伸びる」に一度もならない（テストで見つかった）。
 */
export function decideType(s: Summary): PlayerType {
  if (s.score <= 50) return PLAYER_TYPES.growing;
  if (s.scamsMissed >= 2) return PLAYER_TYPES.trusting;
  if (s.realsMissed >= 2) return PLAYER_TYPES.doubting;
  if (s.correct === s.total) return PLAYER_TYPES.master;
  return PLAYER_TYPES.sharp;
}
