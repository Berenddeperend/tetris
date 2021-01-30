import Hammer from "../../_snowpack/pkg/hammerjs.js";
export default class GestureControls {
  constructor(game) {
    this.hasInstaFallen = false;
    this.sensitivity = 3;
    this.panCounter = 0;
    this.dir = "";
    const body = document.querySelector("body");
    const gestures = new Hammer(body, {});
    gestures.on("panleft panright swipeup swipedown tap", (e) => {
      if (game.gameState === "playing") {
        switch (e.type) {
          case "swipedown":
            return game.stage.controls.down();
          case "swipeup":
            return game.stage.controls.instaFall();
          case "panend":
            return this.hasInstaFallen = false;
        }
      }
    });
  }
  throttledFn(hammerEventType, fn) {
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
  destroy() {
  }
}
