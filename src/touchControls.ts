import Stage from "./stage";

export default class TouchControls {
  stage: Stage;
  onTap: (e: any) => any;
  onTapRelease: (e: any) => any;
  deviceWidth: number;
  // action : () => void;
  interval: number;

  constructor(stage: Stage) {
    this.deviceWidth = document.querySelector("body").clientWidth;
    this.stage = stage;

    this.onTap = (e: TouchEvent) => {
      if(this.interval) {
        clearInterval(this.interval);
      }

      const action = () => {
        e.touches[e.touches.length - 1].clientX > this.deviceWidth / 2
          ? stage.controls.right()
          : stage.controls.left();
      };

      action();
      this.interval = window.setInterval(action, 100);
    };

    this.onTapRelease = (e: TouchEvent) => {
      clearInterval(this.interval);
    };

    this.init();
  }

  init() {
    console.log("initialized touchcontrols");
    document.addEventListener("touchstart", this.onTap);
    document.addEventListener("touchend", this.onTapRelease);
  }

  destroy() {
    document.removeEventListener("touchstart", this.onTap);
  }
}
