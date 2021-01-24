import Stage from "./stage";

export default class TouchControls {
  stage: Stage;
  deviceWidth: number;
  deviceHeight: number;
  interval: number;

  constructor(stage: Stage) {
    this.deviceWidth = document.querySelector("body").clientWidth;
    this.deviceHeight = document.querySelector("body").clientHeight;
    this.stage = stage;

    this.init();
  }

  onTap: (e: any) => any = (e: TouchEvent) => {
    if(this.interval) {
      clearInterval(this.interval);
    }

    const action = () => {
      const x = e.touches[e.touches.length - 1].clientX;
      const y = e.touches[e.touches.length - 1].clientY;

      const xPercentage = Math.round(x) / this.deviceWidth * 100;
      const yPercentage = Math.round(y) / this.deviceHeight * 100;


      if(yPercentage > 80 ) {
        return this.stage.controls.down();
      }

      if (xPercentage < 25) {
        return this.stage.controls.left();
      }

      if (xPercentage > 75) {
        return this.stage.controls.right();
      }

      return this.stage.controls.rotate();
    };

    const executedAction = action();

    if( ['left', 'right', 'down'].includes(executedAction) ) {
      this.interval = window.setInterval(action, 80);
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
