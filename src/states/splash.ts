import Tetris from "../tetris";
import { html, render, PreactNode } from "../dom";
import { explodeText } from "../utils";
export default class Splash {
  game: Tetris;
  html: PreactNode;

  constructor(game: Tetris) {
    this.game = game;

    this.html = html`
      <div class="splash">
        <div class="title">Tetris</div>
        <div class="subtitle">By Berend</div>
        <div class="begin">
          ${game.isDesktop
            ? explodeText("Press space to start")
            : explodeText("Touch here to start")}
        </div>
        <a
          class="social"
          href="https://github.com/Berenddeperend/tetris"
          target="_blank"
          >Github</a
        >
      </div>
    `;

    render(this.html, document.body);
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
