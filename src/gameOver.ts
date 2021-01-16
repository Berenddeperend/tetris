import { select } from "d3-selection";
import { setGameState } from "./tetris";

export default class GameOver {
  constructor() {
    select("body")
      .append("div")
      .attr("class", "gameOver")
      .attr('style', (d, i) => `animation-delay: ${i}`)
      .text("u dea, press space to try again");

    const onKeyDown = (e: any) => {
      if (e.code === "Space") {
        window.removeEventListener("keydown", onKeyDown);
        select(".stage").remove();
        select(".gameOver").remove();
        select(".score").remove();
        setGameState("playing");
      }
    };
    window.addEventListener("keydown", onKeyDown);
  }
}
