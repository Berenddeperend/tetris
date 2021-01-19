import { select } from "d3-selection";
import { setGameState } from "./tetris";

export default class Splash {
  constructor() {
    const splash = select("body").append("div").attr("class", "splash");

    splash.append("div").attr("class", "title").text("Tetris");
    splash
      .append("div")
      .attr("class", "subtitle")
      .text("By Berend");

    splash
      .append("div")
      .attr("class", "begin")
      .selectAll("span")
      .data("press space to start".split(""))
      .enter()
      .append("span")
      .attr("class", "letter")
      .attr("style", (d, i) => `animation-delay: -${i * 2}s`)
      .text((d) => d);

    splash.append("a")
      .attr('class', 'social')
      .attr('href', "https://github.com/Berenddeperend/tetris")
      .attr('target', '_blank')
      .text('Github')

    const onKeyDown = (e: any) => {
      if (e.code === "Space") {
        window.removeEventListener("keydown", onKeyDown);
        select(".splash").remove();
        setGameState("playing");
      }
    };
    window.addEventListener("keydown", onKeyDown);
  }
}