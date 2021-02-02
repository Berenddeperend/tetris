import { html, render } from "./dom";

export function uniq(arr:any[]):any[] {
  return [...new Set(arr)];
}

export function cloneDeep(o):any {
  return JSON.parse(JSON.stringify(o));
}

export function explodeText(text:string): preact.VNode<any> | preact.VNode<any>[] {
  return html`${text
  .split("")
  .map(
    (letter, index) =>
      html`
        <span class="letter" style="animation-delay: -${index * 2}s">${letter}</span>
      `
  )}`;
}

export function times(times:number, fn:()=>any) {
  const arr = []
  for (let i = 0; i < times; i++) {
    arr.push(fn())
  }
  return arr;
}