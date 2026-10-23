// 問題データの形。画面（main.ts）と採点（scoring.ts）とテストが同じ形を使う。

/** メッセージが届いた場所。画面の見た目を切り替える */
export type Channel = "sms" | "email" | "chat" | "browser";

/** 正解 */
export type Answer = "scam" | "real";

/**
 * メッセージの1つの部品。解説の「印」は、この id を指して付ける。
 * - sender: 差出人の表示名
 * - address: 差出人のメールアドレスや電話番号
 * - subject: 件名
 * - text: 本文の段落
 * - link: リンク（ゲームの中では開かない）
 * - badge: 認証済みのロゴなど、アプリが付ける印
 * - image: 画像（説明の文字だけを出す）
 */
export interface Part {
  id: string;
  kind: "sender" | "address" | "subject" | "text" | "link" | "badge" | "image";
  text: string;
}

/** 解説の印。どの部品の、何が手がかりか */
export interface Point {
  target: string;
  title: string;
  explain: string;
}

/** 解説の根拠にした公的機関などの資料 */
export interface Source {
  title: string;
  publisher: string;
  url: string;
}

export interface Question {
  id: string;
  /** 難しさ。1=URLや送り主で分かる、2=似せてある、3=見た目では分からない */
  level: 1 | 2 | 3;
  channel: Channel;
  /** 画面の上に出す、アプリの名前（架空） */
  appName: string;
  /** 状況の説明。同じ文面でも、心当たりがあるかで判断が変わるため */
  situation: string;
  /** 届いた時刻（表示用） */
  time: string;
  parts: Part[];
  answer: Answer;
  /** 「確かめる」を押したときの、公式アプリや本人への確認の結果 */
  verify: { action: string; result: string };
  points: Point[];
  /** 1問の学び（1文） */
  lesson: string;
  sources: Source[];
}

/** 1問ぶんのプレイの記録 */
export interface PlayRecord {
  questionId: string;
  answer: Answer;
  choice: Answer;
  verified: boolean;
  linkTapped: boolean;
}
