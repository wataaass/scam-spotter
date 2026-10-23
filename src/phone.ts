import { h } from "./dom";
import type { Part, Question } from "./types";

export interface PhoneOptions {
  /** 部品の id → 付ける印の番号。解説の画面で使う */
  markers?: Map<string, number[]>;
  onLinkTap?: () => void;
}

/** 問題のメッセージを、スマホの画面のような見た目で作る */
export function renderPhone(q: Question, opts: PhoneOptions = {}): HTMLElement {
  const header = q.parts.filter((p) => isHeader(q, p));
  const body = q.parts.filter((p) => !isHeader(q, p));

  return h(
    "figure",
    { class: `phone phone--${q.channel}`, attrs: { "aria-label": `${q.appName}の画面` } },
    h("div", { class: "phone__bar" }, h("span", {}, q.appName), h("span", {}, q.time)),
    h("div", { class: "phone__header" }, ...header.map((p) => renderPart(p, opts))),
    h("div", { class: "phone__body" }, ...body.map((p) => renderPart(p, opts))),
  );
}

// SMS とチャットは差出人だけを上に、メールは差出人・アドレス・件名・ロゴを上に出す
function isHeader(q: Question, p: Part): boolean {
  if (q.channel === "email") return ["badge", "sender", "address", "subject"].includes(p.kind);
  return p.kind === "sender" || p.kind === "address";
}

function renderPart(p: Part, opts: PhoneOptions): HTMLElement {
  const marks = opts.markers?.get(p.id) ?? [];
  const markEls = marks.map((n) => h("span", { class: "mark", attrs: { "aria-label": `印${n}` } }, String(n)));
  const cls = `part part--${p.kind}${marks.length ? " part--marked" : ""}`;

  if (p.kind === "link") {
    // ゲームの中のリンクは、本物の URL に見えてもどこにも行かない。押したことだけを記録する
    return h(
      "div",
      { class: cls },
      h("button", { class: "fake-link", attrs: { type: "button" }, on: { click: () => opts.onLinkTap?.() } }, p.text),
      ...markEls,
    );
  }
  if (p.kind === "badge") {
    return h("div", { class: cls }, h("span", { class: "badge-logo", attrs: { "aria-hidden": "true" } }, "✓"), p.text, ...markEls);
  }
  return h("div", { class: cls }, p.text, ...markEls);
}
