export function uniq(arr: any[]): any[] {
  return [...new Set(arr)];
}

export function cloneDeep(o): any {
  return JSON.parse(JSON.stringify(o));
}

export function explodeText(text: string) {
  function inlineStyle(index) {
    return {
      animationDelay: `-${index * 2}s`,
    };
  }
  return text.split("").map((letter, index) => (
    <span class="letter" style={inlineStyle(index)}>
      {letter}
    </span>
  ));
}

export function times(times: number, input:any) {
  const arr = [];
  for (let i = 0; i < times; i++) {
    arr.push(input);
  }
  return arr;
}