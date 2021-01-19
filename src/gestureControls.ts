import Hammer from "hammerjs";
import Stage from "./stage";

console.log("gestures called");

export default class Gestures {
  stage: Stage;

  sensitivity: number = 0; //higher is less sensitive;
  swipeCounter: number = 0;
  dir: string = "";

  constructor(stage: Stage) {
    const body = document.querySelector("body");
    const gestures = new Hammer(body, {});

    gestures.on("swipeleft swiperight swipeup swipedown tap ", (e) => {
      switch (e.type) {
        case "swipeleft":
          return stage.controls.left();
          // return this.throttledFn("swipeleft", () => stage.controls.left());
        case "swiperight":
          return stage.controls.right();
          // return this.throttledFn("swiperight", () => stage.controls.right());
        case "swipeup":
          return this.throttledFn("swipeup", () => stage.controls.instaFall());
        case "swipedown":
          return this.throttledFn("swipedown", () => stage.controls.down());
        case "tap":
          return stage.controls.rotate();
      }
    });
  }

  throttledFn(hammerEventType: string, fn: () => any) {
    if (this.dir === hammerEventType) {
      this.swipeCounter++;
    } else {
      this.dir = hammerEventType;
      this.swipeCounter = 0;
    }
    if (this.swipeCounter % this.sensitivity === 0) {
      return fn();
    }
  }

  destroy() {}
}

// export default class KeyboardControls {
//   stage: Stage;
//   onKeyDown:any;
//   constructor(stage: Stage) {
//     this.stage = stage;

//     this.onKeyDown = function (e: any) {
//       switch (e.code) {
//         case "ArrowRight":
//           return stage.controls.right();
//         case "ArrowLeft":
//           return stage.controls.left();
//         case "ArrowDown":
//           return stage.controls.down();
//         case "ArrowUp":
//           return stage.controls.instaFall();
//         case "Space":
//           return stage.controls.rotate();
//       }
//     }.bind(this.stage);

//     this.init();
//   }

//   init() {
//     document.addeentListener("keydown", this.onKeyDown);
//   }

//   destroy() {
//     console.log('removing controls')
//     document.removeeentListener("keydown", this.onKeyDown);
//   }
// }
