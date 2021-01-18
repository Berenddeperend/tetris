import { select } from "d3-selection";
import { setGameState } from "./tetris";

export default class GameOver {
  constructor() {
    select(".stage")
      .attr('class', 'stage is-game-over')
      .append("div")
      .attr("class", "game-over")
      .text("Game over");

    const onKeyDown = (e: any) => {
      if (e.code === "Space") {
        window.removeEventListener("keydown", onKeyDown);
        select(".stage").remove();
        select(".game-over").remove();
        select(".score").remove();
        setGameState("playing");
      }
    };
    window.addEventListener("keydown", onKeyDown);
  }
}
