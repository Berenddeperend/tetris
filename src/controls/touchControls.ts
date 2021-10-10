import Stage from "../stage";
import Tetris from "../tetris";
import { select, selectAll } from "d3-selection";

// const buttons = ['left', 'right', 'up', 'down', 'rotate']
const actions = ['rotate'];
const directions = ['up', 'left', 'right', 'down']

export default class TouchControls {
  deviceWidth: number;
  deviceHeight: number;
  interval: number;
  game: Tetris;

  constructor(game: Tetris) {
    this.deviceWidth = document.querySelector("body").clientWidth;
    this.deviceHeight = document.querySelector("body").clientHeight;
    this.game = game;

    const uiContainer = select('body').append('div').attr('class', 'joypad');
    
    const directionsGroup = uiContainer.append('div').attr('class', 'directions')
    const actionsGroup = uiContainer.append('div').attr('class', 'actions')

    directions.map(direction => {
      directionsGroup
        .append('button')
        .attr('class', `joypad-btn ${direction}`)
        .text(direction)
        .attr('direction', direction)
    })

    actions.map(action => {
      actionsGroup
        .append('button')
        .attr('class', `joypad-btn ${action}`)
        .text(action)
        .attr('direction', action)
    })

    this.init();
  }

  onTap = (e: TouchEvent) => {
    // console.log('...args: ', ...args);
    console.log('e: ', e);
    // e.preventDefault();

    if (this.game.gameState === "splash") {
      this.game.splash.controls.continue();
    }
    
    if (this.game.gameState === "gameOver") {
      this.game.gameOver.controls.retry();
    }
    
    if (this.game.gameState === "playing") {
      console.log(e.target.getAttribute('direction'))
      switch (e.target.getAttribute('direction')) {
        case "right":
          return this.game.stage.controls.right();
        case "left":
          return this.game.stage.controls.left();
        case "down":
          return this.game.stage.controls.down();
        case "up":
          return this.game.stage.controls.instaFall();
        case "rotate":
          return this.game.stage.controls.rotate();
          // case "KeyP": {} //deliberate fallthrough
          // case "Escape": {
          //   return this.game.stage.controls.pause();
          }
    }
  };

  onTapRelease: (e: any) => any = (e: TouchEvent) => {
    clearInterval(this.interval);
  };

  init() {
    [...actions, ...directions].map(btn => document.querySelector(`.joypad-btn.${btn}`).addEventListener('click', this.onTap));
    // document.querySelector('.left').addEventListener('click', this.onTap);

    // document.querySelector('.left').addEventListener('click', () => this.game.stage.controls.left())
    // document.querySelector('.right').addEventListener('click', ()=> this.game.stage.controls.right())


    // document.addEventListener("touchstart", this.onTap);
    // document.addEventListener("touchend", this.onTapRelease);
  }

  destroy() {
    document.removeEventListener("touchstart", this.onTap);
  }
}
