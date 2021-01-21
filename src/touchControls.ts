import Stage from "./stage";

export default class TouchControls {
  stage: Stage;
  onTap: (e: any) => any;
  deviceWidth: number;

  constructor(stage: Stage) {
    this.deviceWidth = document.querySelector('body').clientWidth;
    this.stage = stage;

    this.onTap = (e: any) => {

      // switch (e.width) {
      //   case 2 > 2: 



      // }


      e.x > this.deviceWidth / 2
        ? stage.controls.right()
        : stage.controls.left()
    };

    this.init();
  }

  init() {
    console.log("initialized touchcontrols");
    // document.addEventListener("click", this.onTap);
    document.addEventListener("touchstart", this.onTap);
  }

  destroy() {
    document.removeEventListener("touchstart", this.onTap);
  }
}
