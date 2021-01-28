export default class DOM {
  render(html: string) {
    const el = new HTMLElement;
    el.innerHTML = html;
    return el
  }
}

export function render(html: string) {
  const el = new HTMLElement();
  el.innerHTML = html;
  return el
}