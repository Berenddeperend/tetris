import { select, selectAll } from "d3-selection";

export default class InputName {
  constructor() {
    const body = select("body").append("div").attr("class", "name-group");

    const nameLength = 6;

    let inputs = []
    for(let i = 0; i < nameLength; i++) {
      inputs.push(
      body
        .append("input")
        .attr("type", "text")
        .attr("class", `name name${i}` )
        .attr("placeholder", "-"),
      )
    }

    inputs.forEach((input, index) => {

      window.addEventListener('keydown', (e:KeyboardEvent) => {

        if(e.target === input.node()) {
          if(e.key === "Backspace") {
            const element = (document.querySelector(`.name${index}`) as HTMLInputElement);
            element.value = "";
  
            if(index > 0) {
              (document.querySelector(
                `.name${index -1}`
              ) as HTMLElement).focus();
            }
          }
        }
      })

      window.addEventListener("input", (e:InputEvent) => {
        if(e.inputType === "deleteContentBackward") return;
        if (e.target === input.node()) {
          const element = (document.querySelector(`.name${index}`) as HTMLInputElement);

          if (index === inputs.length - 1) {
            element.value = e.data;
          } else {
            (document.querySelector(
              `.name${index + 1}`
            ) as HTMLElement).focus();
          }
        }
      });
    });

    window.setTimeout(() => {
      (document.querySelector(".name0") as HTMLElement).focus();
    }, 200);
  }
}