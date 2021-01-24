import Hammer from "hammerjs";
import Tetris from "./tetris";

export default class GestureControls {
  hasInstaFallen: boolean = false;
  sensitivity: number = 3; //higher is less sensitive;
  panCounter: number = 0;
  dir: string = "";

  constructor(game: Tetris) {
    const body = document.querySelector("body");
    const gestures = new Hammer(body, {});

    gestures.on("panleft panright swipeup swipedown tap", (e) => {
      if (game.gameState === "playing") {
        switch (e.type) {
          // case "panleft":
          //   return stage.controls.left();
          //   // return this.throttledFn("panleft", () => stage.controls.left());
          // case "panright":
          //   return stage.controls.right();
          //   // return this.throttledFn("panright", () => stage.controls.right());
          case "swipedown":
            return game.stage.controls.down();
          case "swipeup":
            return game.stage.controls.instaFall();
          // case "tap":
          //   return stage.controls.rotate();
          case "panend":
            return (this.hasInstaFallen = false);
        }
      }
    });
  }

  throttledFn(hammerEventType: string, fn: () => any) {
    if (this.dir === hammerEventType) {
      this.panCounter++;
    } else {
      this.dir = hammerEventType;
      this.panCounter = 0;
    }
    if (this.panCounter % this.sensitivity === 0) {
      return fn();
    }
  }

  destroy() {}
}
