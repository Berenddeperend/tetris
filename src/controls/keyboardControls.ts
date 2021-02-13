import Tetris from "../tetris";
import { controls } from './controls';

export default class KeyboardControls {
  onKeyDown: (e: any) => any;
  constructor(game: Tetris) {
    this.onKeyDown = (e: any) => {
      if (game.state.gameState === "playing") {
        switch (e.code) {
          case "ArrowRight":
            // return game.stage.controls.right();
            return controls.playing.right();
          case "ArrowLeft":
            // return game.stage.controls.left();
            return controls.playing.left();
          case "ArrowDown":
            // return game.stage.controls.down();
            return controls.playing.down();
          case "ArrowUp":
            // return game.stage.controls.instaFall();
            return controls.playing.instaFall();
          case "Space":
            // return game.stage.controls.rotate();
            return controls.playing.rotate();
        }
      }
      else if (game.state.gameState === "splash") {
        switch (e.code) {
          case "Space":
            return controls.splash.continue();
        }
      }

      else if (game.state.gameState === "gameOver") {
        switch (e.code) {
          case "Space":
            // return game.gameOver.controls.retry();
        }
      }
    };

    this.init();
  }

  init() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  destroy() {
    document.removeEventListener("keydown", this.onKeyDown);
  }
}
