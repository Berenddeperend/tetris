import Stage from "./stage";

export default class TouchControls {
  stage: Stage;
  onTap: (e: any) => any;
  deviceWidth: number;

  constructor(stage: Stage) {
    this.deviceWidth = document.querySelector('body').clientWidth;
    this.stage = stage;

    this.onTap = (e:TouchEvent) => {
      console.log('e.touches[0].clientX: ', e.touches[0].clientX);

      e.touches[0].clientX > this.deviceWidth / 2
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
