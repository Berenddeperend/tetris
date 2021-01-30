import Stage from "./stage.js";
import Splash from "./states/splash.js";
import GameOver from "./states/gameOver.js";
import KeyboardControls from "./controls/keyboardControls.js";
import TouchControls from "./controls/touchControls.js";
import GestureControls from "./controls/gestureControls.js";
export default class Tetris {
  constructor() {
    this.gameMode = "default";
    this.setGameState("splash");
    new KeyboardControls(this);
    new TouchControls(this);
    new GestureControls(this);
    function setVH() {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    }
    window.addEventListener("resize", setVH);
    setVH();
  }
  setGameState(gameState) {
    this.gameState = gameState;
    switch (gameState) {
      case "splash":
        return this.splash = new Splash(this);
      case "playing":
        return this.stage = new Stage({width: 10}, this);
      case "gameOver":
        return this.gameOver = new GameOver(this);
    }
  }
  get isMobile() {
    const breakpoint = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--breakpoint"));
    return window.innerWidth < breakpoint;
  }
  get isDesktop() {
    return !this.isMobile;
  }
}
new Tetris();
