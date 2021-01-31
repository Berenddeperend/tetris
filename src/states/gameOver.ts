import { select } from "d3-selection";
import Tetris from "../tetris";
import HighScores from "../highScores";
import InputName from "../inputName";

import { html, render, PreactNode } from "../dom";
import { explodeText } from '../utils';

export default class GameOver {
  game: Tetris;
  html: PreactNode;

  constructor(game: Tetris) {
    this.game = game;

    this.html = html`
      <div class="game-over-container">
        <div class="game-over">${explodeText('game over')}</div>
      </div>

      <div class="highscore"></div>
    `
    render(this.html, document.querySelector('.stage'));



    // game.stage.d3Stage
    //   .attr("class", "stage is-game-over") //moved to stage
    
      // .append('div').attr('class', 'game-over-container')
      // .append("div")
      // .attr("class", "game-over")
      // .selectAll("span")
      // .data(() => "Game over".split(""))
      // .enter()
      // .append("span")
      // .attr("class", "letter")
      // .attr("style", (d, i) => `animation-delay: -${i * 2}s`)
      // .text((d) => d);

      // select('.game-over-container').append('div').attr('class', 'highscore')

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
