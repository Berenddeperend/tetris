export default class DOM {
  render(html) {
    const el = new HTMLElement();
    el.innerHTML = html;
    return el;
  }
}
export function render(html) {
  const el = new HTMLElement();
  el.innerHTML = html;
  return el;
}
