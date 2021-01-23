import Stage from "./stage";

export default class TouchControls {
  stage: Stage;
  onTap: (e: any) => any;
  onTapRelease: (e: any) => any;
  deviceWidth: number;
  deviceHeight: number;
  interval: number;

  constructor(stage: Stage) {
    this.deviceWidth = document.querySelector("body").clientWidth;
    this.deviceHeight = document.querySelector("body").clientHeight;
    this.stage = stage;

    this.onTap = (e: TouchEvent) => {
      console.log('new event')
      if(this.interval) {
        clearInterval(this.interval);
      }

      const action = () => {

        const x = e.touches[e.touches.length - 1].clientX;
        const y = e.touches[e.touches.length - 1].clientY;

        const xPercentage = Math.round(x) / this.deviceWidth * 100;
        const yPercentage = Math.round(y) / this.deviceHeight * 100;


        if(yPercentage > 80 ) {
          return this.stage.controls.instaFall();
        }

        if (xPercentage < 25) {
          return stage.controls.left();
        }

        if (xPercentage > 75) {
          return stage.controls.right();
        }

        return stage.controls.rotate();
      };

      const executedAction = action();

      if(executedAction === "left" || executedAction === "right") {
        this.interval = window.setInterval(action, 80);
      }

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
