import {select} from "../_snowpack/pkg/d3-selection.js";
export default class InputName {
  constructor() {
    this.d3Self = select("body").append("div").attr("class", "submit-name");
    const title = this.d3Self.append("h2").attr("class", "title").text("What's your name?");
    const nameGroup = this.d3Self.append("form").attr("class", "name-group").attr("autocomplete", "off");
    const nameLength = 3;
    let inputs = [];
    for (let i = 0; i < nameLength; i++) {
      inputs.push(nameGroup.append("input").attr("type", "text").attr("class", `name name${i}`).attr("maxlength", 1).attr("placeholder", "-"));
    }
    inputs.forEach((input, index) => {
      window.addEventListener("keydown", (e) => {
        if (e.target === input.node()) {
          if (e.key === "Backspace") {
            const element = document.querySelector(`.name${index}`);
            element.value = "";
            if (index > 1) {
              document.querySelector(`.name${index - 1}`).focus();
            }
          }
        }
      });
      window.addEventListener("input", (e) => {
        if (e.inputType === "deleteContentBackward")
          return;
        if (e.target === input.node()) {
          const element = document.querySelector(`.name${index}`);
          if (index === inputs.length - 1) {
            element.value = e.data;
          } else {
            document.querySelector(`.name${index + 1}`).focus();
          }
        }
      });
    });
    window.setTimeout(() => {
      document.querySelector(".name0").focus();
    }, 200);
  }
}
