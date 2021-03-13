import Tetris from "../tetris";
// import { html, render, PreactNode } from "../dom";
import { render } from "preact";
import { explodeText, rollingText } from "../utils";
export default class Splash {
  game: Tetris;

  constructor(game: Tetris) {
    this.game = game;
        
    const html = (
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

        {/* {rollingText(['1', '2'])} */}

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

    render(html, document.querySelector('.tetris'));
  }

  get controls() {
    return {
      continue: () => {
        render("", document.querySelector('.tetris')); //this can be better
        this.game.setGameState("playing");
      },
    };
  }

  
}
