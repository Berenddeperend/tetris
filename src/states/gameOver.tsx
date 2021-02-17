import Tetris from "../tetris";
import HighScores from "../highScores";
import ThreeLetterInput from './../ThreeLetterInput'

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
        <div className="three-letter-input-container"></div>
        {/* <ThreeLetterInput /> */}
        <div class="highscore-list"></div>
      </>
    );

    render(html, document.querySelector(".stage"));

    const gameOverContainer = document.querySelector(".game-over-container");

    gameOverContainer.animate(...animations.fadeIn as Animation);

    window.setTimeout(() => {
      const animation = gameOverContainer.animate(...animations.fadeOut as Animation);
      animation.onfinish = () => {
        gameOverContainer.remove();
        render(<ThreeLetterInput />, document.querySelector('.three-letter-input-container'));

        setTimeout(() => {
          new HighScores({
            score: this.game?.stage?.score,
            name: window.localStorage.getItem('lastUsedNickname'), //localstorage as store? lol sure
            date: new Date(),
            v: process.env.VERSION
          });
          
        }, 2000);
      };
    }, 200);


    // window.setTimeout(() => {
    //   // prevent user from closing gameover screen instantly while still trying to rotate
    //   window.addEventListener("keydown", onKeyDown);
    // }, 500);
  }

  get controls() {
    return {
      retry: () => {
        document.querySelector(".stage").remove(); //not sure if this works yet.
        document.querySelector(".game-over").remove(); //not sure if this works yet.
        document.querySelector(".ui").remove(); //not sure if this works yet.
        this.game.setGameState("playing");
      },
    };
  }
}
