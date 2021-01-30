import { select } from "d3-selection";
import Tetris from "../tetris";
import HighScores from "../highScores";
import InputName from "../inputName";

export default class GameOver {
  game: Tetris;
  constructor(game: Tetris) {
    this.game = game;
    game.stage.d3Stage
      .attr("class", "stage is-game-over")

    
      .append('div').attr('class', 'game-over-container')
      .append("div")
      .attr("class", "game-over")
      // .text("Game over");

      .selectAll("span")
      .data(() => "Game over".split(""))
      .enter()
      .append("span")
      .attr("class", "letter")
      .attr("style", (d, i) => `animation-delay: -${i * 2}s`)
      .text((d) => d);

      select('.game-over-container').append('div').attr('class', 'highscore')

    new HighScores({
      score: this.game?.stage?.score,
      name: "default",
      date: new Date(),
    });

    // new InputName();

    // window.setTimeout(() => {
    //   // prevent user from closing gameover screen instantly while still trying to rotate
    //   window.addEventListener("keydown", onKeyDown);
    // }, 500);
  }  

  get controls() {
    return {
      retry: () => {
        select(".stage").remove();
        select(".game-over").remove();
        select(".ui").remove();
        this.game.setGameState("playing");
      }
    }
  }
}
