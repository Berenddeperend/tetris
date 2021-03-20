import Stage from "./stage";
import Splash from "./states/splash";
import GameOver from "./states/gameOver";
import KeyboardControls from "./controls/keyboardControls";
import TouchControls from "./controls/touchControls";
import GestureControls from "./controls/gestureControls";
import StarryBackground from './StarryBackground';
import { render } from "preact";
import { ServerHighScore } from './highScores';

export type GameState = "splash" | "playing" | "gameOver" | "highScore";
export type GameMode = "singlePlayer";

export default class Tetris {
  gameState: GameState;
  gameMode: GameMode = "singlePlayer";
  stage: Stage;
  splash: Splash;
  gameOver: GameOver;
  serverHighScore: ServerHighScore;

  constructor() {
    this.fetchHighScore();

    render(
    <div class="tetris-container">
      <StarryBackground />
      <div class="tetris"></div>
    </div>
    , document.body);
    this.setGameState("splash");
    new KeyboardControls(this);
    new TouchControls(this);
    new GestureControls(this);

    function setVH() {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`); //https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    }
    window.addEventListener('resize', setVH);
    setVH();
  }

  setGameState(gameState: GameState) {
    this.gameState = gameState;
    switch (gameState) {
      case "splash":
        return this.splash = new Splash(this);
      case "playing":
        return (this.stage = new Stage({ width: 10 }, this));
      case "gameOver":
        return this.gameOver = new GameOver(this);
    }
  }

  get isMobile() {
    const breakpoint = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--breakpoint"
      )
    );
    return window.innerWidth < breakpoint;
  }

  get isDesktop() {
    return !this.isMobile;
  }

  fetchHighScore() {
    fetch(`${process.env.API_URL}/scores`)
    // fetch(`https://berendswennenhuis.nl/scores`)
      .then((res) => res.json())
      .then((scores) => {
        this.serverHighScore = scores[0];
      });
  }

}



new Tetris();
