import Hammer from "hammerjs";
import Stage from "./stage";
export default class Gestures {
  stage: Stage;

  hasInstaFallen: boolean = false;
  sensitivity: number = 3; //higher is less sensitive;
  panCounter: number = 0;
  dir: string = "";

  constructor(stage: Stage) {
    const body = document.querySelector("body");
    const gestures = new Hammer(body, {});
    // gestures.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );

    gestures.on("panleft panright swipeup swipedown tap", (e) => {
      // gestures.on("pan", (e) => {
      console.log(e);
      switch (e.type) {
        case "panleft":
          return stage.controls.left();
          // return this.throttledFn("panleft", () => stage.controls.left());
        case "panright":
          return stage.controls.right();
          // return this.throttledFn("panright", () => stage.controls.right());
        case "swipedown":
          return stage.controls.down();
        case "swipeup":
          return stage.controls.instaFall();
        case "tap":
          return stage.controls.rotate();
        case "panend":
          return (this.hasInstaFallen = false);
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
