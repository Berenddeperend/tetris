import Stage from "./stage";

export default class TouchControls {
  stage: Stage;
  onTap: (e: any) => any;
  onTapRelease: (e: any) => any;
  deviceWidth: number;
  interval: number;

  constructor(stage: Stage) {
    this.deviceWidth = document.querySelector("body").clientWidth;
    this.stage = stage;

    this.onTap = (e: TouchEvent) => {
      if(this.interval) {
        clearInterval(this.interval);
      }

      const action = () => {
        const x = e.touches[e.touches.length - 1].clientX;
        const y = e.touches[e.touches.length - 1].clientY;

        if(x > this.deviceWidth / 2) { stage.controls.right() } 
        if(x < this.deviceWidth / 2) { stage.controls.left() } 

        // switch (e.touches[e.touches.length - 1]) {
        //   case "ArrowRight":
        //     return stage.controls.right();
        //   case "ArrowLeft":
        //     return stage.controls.left();
        //   case "ArrowDown":
        //     return stage.controls.down();
        //   case "ArrowUp":
        //     return stage.controls.instaFall();
        //   case "Space":
        //     return stage.controls.rotate();
        // }

        // e.touches[e.touches.length - 1].clientX > this.deviceWidth / 2
        //   ? stage.controls.right()
        //   : stage.controls.left();
      };

      action();
      this.interval = window.setInterval(action, 80);
    };

    this.onTapRelease = (e: TouchEvent) => {
      clearInterval(this.interval);
    };

    this.init();
  }

  init() {
    document.addEventListener("touchstart", this.onTap);
    document.addEventListener("touchend", this.onTapRelease);
  }

  destroy() {
    document.removeEventListener("touchstart", this.onTap);
  }
}
