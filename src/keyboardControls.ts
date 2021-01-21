import Stage from './stage';

export default class KeyboardControls {
  stage: Stage;
  onKeyDown: (e:any) => any;
  constructor(stage: Stage) {
    this.stage = stage;

    this.onKeyDown = (e: any) => {
      switch (e.code) {
        case "ArrowRight":
          return stage.controls.right();
        case "ArrowLeft":
          return stage.controls.left();
        case "ArrowDown":
          return stage.controls.down();
        case "ArrowUp":
          return stage.controls.instaFall();
        case "Space":
          return stage.controls.rotate();
      }
    };

    this.init();
  }
  
  init() {
    document.addEventListener("keydown", this.onKeyDown);
  }
  
  destroy() {
    console.log('removing controls')
    document.removeEventListener("keydown", this.onKeyDown);
  }
}