// import {rollingText, Animation} from './animations'

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

export function times(times: number, fn: () => any) {
  const arr = [];
  for (let i = 0; i < times; i++) {
    arr.push(fn());
  }
  return arr;
}

export function rollingText(texts: string[]) {
  const elementHeight = 30;
  const items = texts.map((item) => {
    return <div class="rolling-text-item">{item}</div>;
  });

  let i = 0;
  
  // Array.from(document.querySelectorAll('.rolling-text-item')).map((item, index, array) => {
  //   item.animate([
  //     {transform: 'translateY(0)'},
  //     {transform: `translateY(-${(array.length - 1) * 100}%)`},
  //   ], {
  //     duration: texts.length * 1000,
  //     fill: 'both',
  //     iterations: Infinity
  //   })
  // }, 400)

  setTimeout(() => {
    const domItems = Array.from(document.querySelectorAll(".rolling-text-item"));

    setInterval(() => {
      i++;
      if (i > texts.length) i = 0;
      domItems.map((item) => {
        (item as HTMLElement).style.transform = `translateY(-${
          i * elementHeight
        }px)`;
        // (item as HTMLElement).style.transition = "transform 1s";
      });
    }, 1000);
  }, 1000);

  return (
    <div className="rolling-text-container">
      {items}
      <div class="rolling-text-item">{texts[0]}</div>;
    </div>
  );
}
