import Tetris from "../tetris";
// import { html, render, PreactNode } from "../dom";
import { render } from "preact";
import { explodeText } from "../utils";
export default class Splash {
  game: Tetris;

  constructor(game: Tetris) {
    this.game = game;

    const html = (
      <div class="splash">
        <div class="title">Tetris</div>
        <div class="subtitle">By Berend</div>
        <div class="begin">
          {game.isDesktop
            ? explodeText("Press space to start")
            : explodeText("Touch here to start")}
        </div>
        <a
          class="social"
          href="https://github.com/Berenddeperend/tetris"
          target="_blank"
        >
          Github
        </a>
      </div>
    );

    render(html, document.body);
  }

  get controls() {
    return {
      continue: () => {
        render("", document.body); //this can be better
        this.game.setGameState("playing");
      },
    };
  }
}
