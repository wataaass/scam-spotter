import "./style.css";
import { h, mount } from "./dom";
import { renderPhone } from "./phone";
import { DECK_SIZE, pickQuestions } from "./deck";
import { QUESTIONS } from "./questions";
import { decideType, summarize, VERIFY_LIMIT } from "./scoring";
import { canShareFile, canvasToFile, drawResultImage } from "./share";
import type { Answer, PlayRecord, Question } from "./types";

// ゲームの状態。サーバーにもブラウザの保存領域にも書かない（閉じれば消える）
interface State {
  /** このプレイで出す問題（置き場から選んだもの） */
  deck: Question[];
  index: number;
  records: PlayRecord[];
  verifiesLeft: number;
}

const root = document.getElementById("app") as HTMLElement;
let state: State = { deck: [], index: 0, records: [], verifiesLeft: VERIFY_LIMIT };

const LABEL: { [A in Answer]: string } = { real: "本物", scam: "詐欺" };

function showTitle(): void {
  mount(
    root,
    h(
      "section",
      { class: "screen title" },
      h("p", { class: "eyebrow" }, "詐欺メッセージを見抜く練習"),
      h("h1", {}, "それ、本物？"),
      h("p", { class: "lead" }, `届いた${DECK_SIZE.scam + DECK_SIZE.real}通のメッセージ。本物か、詐欺か。あなたなら見抜けますか？`),
      h(
        "ul",
        { class: "rules" },
        h("li", {}, `1問ずつ、メール・SMS・SNS などの画面が出ます。「本物」か「詐欺」を選んでください。問題は${QUESTIONS.length}問の中から毎回選ばれます。`),
        h("li", {}, `迷ったら「確かめる」で、公式アプリなどで確かめた結果が見られます（1回のプレイで${VERIFY_LIMIT}回まで）。`),
        h("li", {}, "答えたあと、見るべきだった場所に印が付きます。"),
      ),
      h(
        "p",
        { class: "note" },
        "出てくる会社・人・アドレスはすべて架空です。画面の中のリンクはどこにもつながりません。このゲームは何も入力させず、遊んだ記録をどこにも送りません。",
      ),
      h("button", { class: "btn btn--primary", attrs: { type: "button" }, on: { click: start } }, "はじめる"),
    ),
  );
}

function start(): void {
  state = { deck: pickQuestions(QUESTIONS), index: 0, records: [], verifiesLeft: VERIFY_LIMIT };
  showQuestion();
}

function showQuestion(): void {
  const q = state.deck[state.index];
  if (!q) return showResult();

  let verified = false;
  let linkTapped = false;

  const toast = h("p", { class: "toast", attrs: { role: "status" } });
  const verifyBox = h("div", { class: "verify", attrs: { hidden: "" } });
  const verifyBtn = h(
    "button",
    {
      class: "btn btn--ghost",
      attrs: { type: "button" },
      on: {
        click: () => {
          if (verified || state.verifiesLeft <= 0) return;
          verified = true;
          state.verifiesLeft -= 1;
          fillVerify(verifyBox, q);
          verifyBox.hidden = false;
          verifyBtn.disabled = true;
          verifyBtn.textContent = `確かめた（残り${state.verifiesLeft}回）`;
        },
      },
    },
    `確かめる（残り${state.verifiesLeft}回）`,
  );
  if (state.verifiesLeft <= 0) verifyBtn.disabled = true;

  const onLinkTap = () => {
    linkTapped = true;
    toast.textContent =
      "ゲームの中のリンクはどこにもつながりません。本物のメッセージでも、リンクより公式アプリやブックマークから確かめるのが安全です。";
  };

  const answer = (choice: Answer) => {
    state.records.push({ questionId: q.id, answer: q.answer, choice, verified, linkTapped });
    showFeedback(q, choice, verified);
  };

  mount(
    root,
    h(
      "section",
      { class: "screen question" },
      progress(),
      h("p", { class: "situation" }, h("span", { class: "situation__label" }, "状況"), q.situation),
      renderPhone(q, { onLinkTap }),
      toast,
      verifyBox,
      h(
        "div",
        { class: "actions" },
        verifyBtn,
        h(
          "div",
          { class: "choices" },
          h("button", { class: "btn btn--real", attrs: { type: "button" }, on: { click: () => answer("real") } }, "本物"),
          h("button", { class: "btn btn--scam", attrs: { type: "button" }, on: { click: () => answer("scam") } }, "詐欺"),
        ),
      ),
    ),
  );
}

function fillVerify(box: HTMLElement, q: Question): void {
  box.replaceChildren(
    h("p", { class: "verify__action" }, `確かめ方：${q.verify.action}`),
    h("p", { class: "verify__result" }, q.verify.result),
  );
}

function progress(): HTMLElement {
  const n = state.index + 1;
  return h(
    "div",
    { class: "progress" },
    h("span", {}, `第${n}問 / ${state.deck.length}`),
    h("progress", { attrs: { max: String(state.deck.length), value: String(n), "aria-label": "進み具合" } }),
  );
}

function showFeedback(q: Question, choice: Answer, verified: boolean): void {
  const correct = choice === q.answer;

  // 印の番号を、どの部品に付けるかを決める（同じ部品に2つの印が付くこともある）
  const markers = new Map<string, number[]>();
  q.points.forEach((p, i) => markers.set(p.target, [...(markers.get(p.target) ?? []), i + 1]));

  const verifyBox = h("div", { class: "verify" });
  fillVerify(verifyBox, q);

  const isLast = state.index === state.deck.length - 1;

  mount(
    root,
    h(
      "section",
      { class: "screen feedback" },
      progress(),
      h(
        "div",
        { class: `verdict ${correct ? "verdict--ok" : "verdict--ng"}`, attrs: { role: "status" } },
        h("p", { class: "verdict__head" }, correct ? "正解！" : "ざんねん…"),
        h("p", {}, `正解は「${LABEL[q.answer]}」でした。あなたの答え：${LABEL[choice]}`),
      ),
      renderPhone(q, { markers }),
      h(
        "ol",
        { class: "points" },
        ...q.points.map((p, i) =>
          h("li", {}, h("span", { class: "mark" }, String(i + 1)), h("div", {}, h("strong", {}, p.title), h("p", {}, p.explain))),
        ),
      ),
      h("h2", { class: "sub" }, verified ? "確かめた結果" : "確かめていたら"),
      verifyBox,
      h("p", { class: "lesson" }, q.lesson),
      h(
        "details",
        { class: "sources" },
        h("summary", {}, "解説のもとにした資料"),
        h(
          "ul",
          {},
          ...q.sources.map((s) =>
            h(
              "li",
              {},
              h("a", { attrs: { href: s.url, target: "_blank", rel: "noopener noreferrer" } }, s.title),
              `（${s.publisher}）`,
            ),
          ),
        ),
      ),
      h(
        "button",
        {
          class: "btn btn--primary",
          attrs: { type: "button" },
          on: {
            click: () => {
              state.index += 1;
              showQuestion();
            },
          },
        },
        isLast ? "結果を見る" : "次の問題へ",
      ),
    ),
  );
}

function showResult(): void {
  const summary = summarize(state.records);
  const type = decideType(summary);
  const canvas = drawResultImage(summary, type);
  canvas.classList.add("result-image");
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", `結果の画像：${summary.score}点、${type.name}`);

  const shareArea = h("div", { class: "share" });
  void canvasToFile(canvas).then((file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    shareArea.append(
      h("a", { class: "btn btn--ghost", attrs: { href: url, download: file.name } }, "画像を保存"),
    );
    if (canShareFile(file)) {
      shareArea.append(
        h(
          "button",
          {
            class: "btn btn--primary",
            attrs: { type: "button" },
            on: { click: () => void navigator.share({ files: [file], text: "詐欺メッセージを見抜く練習「それ、本物？」の結果" }).catch(() => {}) },
          },
          "共有する",
        ),
      );
    }
  });

  const byId = new Map(state.deck.map((q) => [q.id, q]));

  mount(
    root,
    h(
      "section",
      { class: "screen result" },
      h("p", { class: "eyebrow" }, "結果"),
      h("p", { class: "score" }, h("span", { class: "score__num" }, String(summary.score)), "点"),
      h("h1", { class: "type" }, type.name),
      h("p", {}, type.description),
      h("p", { class: "lesson" }, type.advice),
      h(
        "dl",
        { class: "stats" },
        stat("詐欺を本物と思った", `${summary.scamsMissed}問`),
        stat("本物を詐欺と思った", `${summary.realsMissed}問`),
        stat("確かめた", `${summary.verified}回`),
        stat("リンクを押した", `${summary.linkTaps}回`),
      ),
      h("p", { class: "note" }, `ゲームでは「確かめる」を${VERIFY_LIMIT}回までにしましたが、現実のスマホでは回数の制限はありません。迷ったら何度でも、公式アプリやブックマークから確かめましょう。`),
      summary.linkTaps > 0
        ? h("p", { class: "note" }, "本物のスマホなら、リンクを押した時点で偽のサイトが開いていたかもしれません。")
        : null,
      canvas,
      shareArea,
      h(
        "details",
        { class: "review" },
        h("summary", {}, "問題をふりかえる"),
        h(
          "ol",
          {},
          ...state.records.map((r) => {
            const q = byId.get(r.questionId);
            const ok = r.choice === r.answer;
            return h("li", { class: ok ? "ok" : "ng" }, `${ok ? "○" : "×"} ${q?.lesson ?? ""}`);
          }),
        ),
      ),
      h("button", { class: "btn btn--primary", attrs: { type: "button" }, on: { click: start } }, "もう一度あそぶ"),
    ),
  );
}

function stat(label: string, value: string): HTMLElement {
  return h("div", {}, h("dt", {}, label), h("dd", {}, value));
}

showTitle();
