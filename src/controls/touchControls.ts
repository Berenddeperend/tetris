import Stage from "../stage";
import Tetris from "../tetris";

export default class TouchControls {
  deviceWidth: number;
  deviceHeight: number;
  interval: number;
  game: Tetris;

  constructor(game: Tetris) {
    this.deviceWidth = document.querySelector("body").clientWidth;
    this.deviceHeight = document.querySelector("body").clientHeight;
    this.game = game;

    this.init();
  }

  onTap: (e: any) => any = (e: TouchEvent) => {
    e.preventDefault();

    if (this.game.gameState === "splash") {
      this.game.splash.controls.continue();
    }

    if (this.game.gameState === "gameOver") {
      // this.game.gameOver.controls.retry();
    }

    if (this.game.gameState === "playing") {
      if (this.interval) {
        clearInterval(this.interval);
      }

      const action = () => {
        const x = e.touches[e.touches.length - 1].clientX;
        const y = e.touches[e.touches.length - 1].clientY;

        const xPercentage = (Math.round(x) / this.deviceWidth) * 100;
        const yPercentage = (Math.round(y) / this.deviceHeight) * 100;

        if (yPercentage > 80) {
          return this.game.stage.controls.down();
        }

        if (xPercentage < 25) {
          return this.game.stage.controls.left();
        }

        if (xPercentage > 75) {
          return this.game.stage.controls.right();
        }

        const activeBlockTapped = this.game.stage.activeBlock.d3Self
          .node()
          .contains(e.target);

        if (activeBlockTapped) {
          return this.game.stage.controls.rotate();
        }

        // return this.game.stage.controls.rotate();
      };

      const executedAction = action();

      if (["left", "right", "down"].includes(executedAction)) {
        this.interval = window.setInterval(action, 80);
      }
    }
  };

  onTapRelease: (e: any) => any = (e: TouchEvent) => {
    clearInterval(this.interval);
  };

  init() {
    document.addEventListener("touchstart", this.onTap);
    document.addEventListener("touchend", this.onTapRelease);
  }

  destroy() {
    document.removeEventListener("touchstart", this.onTap);
  }
}
