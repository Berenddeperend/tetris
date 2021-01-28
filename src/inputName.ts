import { select, selectAll } from "d3-selection";

export default class InputName {
  d3Self;

  constructor() {
    this.d3Self = select("body").append("div").attr("class", "submit-name");
    const title = this.d3Self
      .append("h2")
      .attr("class", "title")
      .text("What's your name?");

    const nameGroup = this.d3Self.append("form").attr("class", "name-group").attr('autocomplete', 'off');

    const nameLength = 3;
    let inputs = [
      // nameGroup.append('input').attr('type', 'text').attr('name', 'hidden').style('display:none')
    ];
    for (let i = 0; i < nameLength; i++) {
      inputs.push(
        nameGroup
          .append("input")
          .attr("type", "text")
          .attr("class", `name name${i}`)
          .attr('maxlength', 1)
          .attr("placeholder", "-")
      );
    }

    inputs.forEach((input, index) => {
      window.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.target === input.node()) {
          if (e.key === "Backspace") {
            // debugger;
            const element = document.querySelector(
              `.name${index}`
            ) as HTMLInputElement;

            
            element.value = "";

            if (index > 1) {
              (document.querySelector(
                `.name${index - 1}`
              ) as HTMLElement).focus();
            }
          }
        }
      });

      window.addEventListener("input", (e: InputEvent) => {
        if (e.inputType === "deleteContentBackward") return;
        if (e.target === input.node()) {
          const element = document.querySelector(
            `.name${index}`
          ) as HTMLInputElement;

          // element.value = e.data;
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
