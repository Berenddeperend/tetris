import {select} from "../../_snowpack/pkg/d3-selection.js";
import HighScores from "../highScores.js";
export default class GameOver {
  constructor(game) {
    this.game = game;
    game.stage.d3Stage.attr("class", "stage is-game-over").append("div").attr("class", "game-over-container").append("div").attr("class", "game-over").selectAll("span").data(() => "Game over".split("")).enter().append("span").attr("class", "letter").attr("style", (d, i) => `animation-delay: -${i * 2}s`).text((d) => d);
    new HighScores({
      score: this.game?.stage?.score,
      name: "default",
      date: new Date()
    });
  }
  get controls() {
    return {
      retry: () => {
        select(".stage").remove();
        select(".game-over").remove();
        select(".ui").remove();
        this.game.setGameState("playing");
      }
    };
  }
}
