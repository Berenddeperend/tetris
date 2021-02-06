import Tetris from "../tetris";
import { render } from "preact";
import { explodeText } from "../utils";
import animations, { Animation } from "../animations";
export default class Splash {
  game: Tetris;
  html;

  constructor(game: Tetris) {
    this.game = game;

    this.html = (
      <div class="splash">
        <div class="title">Tetris
         {/* <span class="version">{process.env.VERSION}</span> */}
        </div>
        <div class="subtitle">By Berend</div>
        <div class="begin">
          {game.isDesktop
            ? explodeText("Press space to start")
            : explodeText("Touch here to start")}
        </div>

        <div class="social-container">
          <a
            href="https://github.com/Berenddeperend/tetris"
            target="_blank"
          >
            Github
          </a>

          <span>version {process.env.VERSION}</span>
        </div>
      </div>
    );

    render(this.html, document.body);
  }

  get controls() {
    return {
      continue: () => {

        const animation = this.html.node().animate(...animations.fadeOut);
        animation.onfinish = () => {
          render("", document.body); //this can be better
          this.game.setGameState("playing");
        }

      },
    };
  }
}
