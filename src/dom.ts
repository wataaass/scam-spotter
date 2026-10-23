// 画面の部品を作る小さな道具。
// 文字は必ず textContent で入れ、innerHTML は使わない。
// 問題の文字に HTML のような文字列が混ざっても、ただの文字として表示される（XSS を防ぐ基本）。

type Child = Node | string | null | undefined | false;

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: { class?: string; attrs?: { [name: string]: string }; on?: { [event: string]: (e: Event) => void } } = {},
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (props.class) el.className = props.class;
  for (const [name, value] of Object.entries(props.attrs ?? {})) el.setAttribute(name, value);
  for (const [event, handler] of Object.entries(props.on ?? {})) el.addEventListener(event, handler);
  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    el.append(typeof child === "string" ? document.createTextNode(child) : child);
  }
  return el;
}

export function mount(root: HTMLElement, ...children: Node[]): void {
  root.replaceChildren(...children);
  window.scrollTo({ top: 0 });
}
