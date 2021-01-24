import Stage from "./stage";
import Splash from "./states/splash";
import GameOver from "./states/gameOver";
import KeyboardControls from "./controls/keyboardControls";
import TouchControls from "./controls/touchControls";
import GestureControls from "./controls/gestureControls";

export type GameState = "splash" | "playing" | "gameOver";
export type GameMode = "default";

export default class Tetris {
  gameState: GameState;
  gameMode: GameMode = "default";
  stage: Stage;

  constructor() {
    this.setGameState("splash");
    new KeyboardControls(this);
    new TouchControls(this);
    new GestureControls(this);
  }

  setGameState(gameState: GameState) {
    this.gameState = gameState;
    switch (gameState) {
      case "splash":
        return new Splash(this);
      case "playing":
        return (this.stage = new Stage({ width: 10 }, this));
      case "gameOver":
        return new GameOver(this);
    }
  }
}

new Tetris();
