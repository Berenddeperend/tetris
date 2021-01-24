import { select } from "d3-selection";
import { setGameState } from "./tetris";
import HighScores from './highScores';
import Stage from "./stage";


export default class GameOver {
  constructor(stage:Stage) {
    select(".stage")
      .attr("class", "stage is-game-over")
      .append("div")
      .attr("class", "game-over")
      .text("Game over");

    const onKeyDown = (e: any) => {
      if (e.code === "Space") {
        window.removeEventListener("keydown", onKeyDown);
        select(".stage").remove();
        select(".game-over").remove();
        select(".ui").remove();
        setGameState("playing");
      }
    };

    new HighScores({
      score: stage.score,
      name: "default",
      date: new Date
    })

    window.setTimeout(() => {
      // prevent user from closing gameover screen instantly while still trying to rotate
      window.addEventListener("keydown", onKeyDown);
    }, 500);
  }
}
