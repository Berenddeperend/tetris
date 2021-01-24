import Tetris from "./tetris";

export default class KeyboardControls {
  onKeyDown: (e: any) => any;
  constructor(game: Tetris) {
    this.onKeyDown = (e: any) => {
      if (game.gameState === "playing") {
        switch (e.code) {
          case "ArrowRight":
            return game.stage.controls.right();
          case "ArrowLeft":
            return game.stage.controls.left();
          case "ArrowDown":
            return game.stage.controls.down();
          case "ArrowUp":
            return game.stage.controls.instaFall();
          case "Space":
            return game.stage.controls.rotate();
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
