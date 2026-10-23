import type { PlayerType, Summary } from "./scoring";

// 結果の画像を、ブラウザの中だけで作る（canvas）。サーバーには何も送らない。
// 画像に入れるのは点数とタイプだけ。名前などの個人の情報は入れない。

const W = 1200;
const H = 630;

export function drawResultImage(summary: Summary, type: PlayerType): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.fillStyle = "#14213d";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#fca311";
  ctx.fillRect(0, 0, W, 16);

  const font = (size: number, weight = 700) =>
    `${weight} ${size}px "Hiragino Sans", "Noto Sans JP", "Yu Gothic", sans-serif`;

  ctx.fillStyle = "#e5e5e5";
  ctx.font = font(40, 500);
  ctx.fillText("それ、本物？ ― 詐欺メッセージを見抜く練習", 72, 110);

  ctx.fillStyle = "#ffffff";
  ctx.font = font(150);
  ctx.fillText(`${summary.score}`, 72, 310);
  const scoreWidth = ctx.measureText(`${summary.score}`).width;
  ctx.font = font(52, 500);
  ctx.fillText("点", 72 + scoreWidth + 12, 310);

  ctx.fillStyle = "#fca311";
  ctx.font = font(64);
  ctx.fillText(type.name, 72, 420);

  ctx.fillStyle = "#e5e5e5";
  ctx.font = font(32, 500);
  ctx.fillText(`${summary.total}問中 ${summary.correct}問正解 ／ 確かめた回数 ${summary.verified}`, 72, 490);

  ctx.font = font(26, 400);
  ctx.fillStyle = "#a8b2c8";
  ctx.fillText("出てくる会社・人はすべて架空です。手口は公的機関の注意喚起にもとづきます。", 72, 570);

  return canvas;
}

export async function canvasToFile(canvas: HTMLCanvasElement): Promise<File | null> {
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  return blob ? new File([blob], "sore-honmono-result.png", { type: "image/png" }) : null;
}

/** 端末の共有機能（Web Share API）で画像を共有できるか */
export function canShareFile(file: File): boolean {
  return typeof navigator.canShare === "function" && navigator.canShare({ files: [file] });
}
