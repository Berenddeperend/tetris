import Tetris from "../tetris";
// import { html, render, PreactNode } from "../dom";
import { render } from "preact";
import { explodeText, rollingText } from "../utils";
export default class Splash {
  game: Tetris;
  selectedMenuItemIndex: number;
  html: any;

  constructor(game: Tetris) {
    this.game = game;
    this.selectedMenuItemIndex = 0;
    this.html =  (
      <div class="splash">
        <div class="title">Tetris
         {/* <span class="version">{process.env.VERSION}</span> */}
        </div>
        <div class="subtitle">By Berend</div>
        <ul class="menu">
          <li class="menu-item active">
            {
              this.modSelectedMenuItemIndex === 0 ?
              explodeText("Press space to start") : "Press space to start"

            }
            {this.modSelectedMenuItemIndex}
            
            </li>
          <li class="menu-item">highscores</li>
          {/* {game.isDesktop
            ? explodeText("Press space to start")
            : explodeText("Touch here to start")} */}
        </ul>
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

    render(this.html, document.querySelector('.tetris'));
  }

  setSelectedMenuItem() {
    document.querySelector('.menu-item.active').classList.remove('active');
    document.querySelector(`.menu-item:nth-of-type(${this.modSelectedMenuItemIndex + 1})`).classList.add('active')
    render(this.html, document.querySelector('.tetris'));
  }

  get modSelectedMenuItemIndex () {
    return this.selectedMenuItemIndex % document.querySelectorAll('.menu-item').length;
  }

  get controls() {
    return {
      continue: () => {
        render("", document.querySelector('.tetris')); //this can be better
        this.game.setGameState("playing");
      },
      up: () => {
        this.selectedMenuItemIndex--;
        this.setSelectedMenuItem();
      },
      down: () => {
        this.selectedMenuItemIndex++;
        this.setSelectedMenuItem();
      }
    };
  }

  
}
