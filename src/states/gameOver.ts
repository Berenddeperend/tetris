import { select } from "d3-selection";
import Tetris from "../tetris";
import HighScores from "../highScores";

export default class GameOver {
  game: Tetris;
  constructor(game: Tetris) {
    this.game = game;
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
        this.game.setGameState("playing");
      }
    };

    new HighScores({
      score: this.game.stage.score,
      name: "default",
      date: new Date(),
    });

    window.setTimeout(() => {
      // prevent user from closing gameover screen instantly while still trying to rotate
      window.addEventListener("keydown", onKeyDown);
    }, 500);
  }
}
