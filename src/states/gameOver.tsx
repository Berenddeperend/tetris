import { select } from "d3-selection";
import Tetris from "../tetris";
import HighScores from "../highScores";

import { render } from "preact";
import { explodeText } from "../utils";
import animations, { Animation } from "../animations";

export default class GameOver {
  game: Tetris;

  constructor(game: Tetris) {
    this.game = game;

    const html = (
      <>
        <div class="game-over-container">
          <div class="game-over">{explodeText("game over")}</div>
        </div>
        <div class="highscore-list"></div>
      </>
    );

    render(html, document.querySelector(".stage"));

    const gameOverContainer = document.querySelector(".game-over-container");

    // @ts-ignore
    gameOverContainer.animate(...animations.fadeIn);

    window.setTimeout(() => {
      // @ts-ignore
      const animation = gameOverContainer.animate(...animations.fadeOut);
      animation.onfinish = () => {
        gameOverContainer.remove();
        new HighScores({
          score: this.game?.stage?.score,
          name: "default",
          date: new Date(),
        });
      };
    }, 2000);


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
      },
    };
  }
}
