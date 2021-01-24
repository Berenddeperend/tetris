import Stage from "./stage";
import Splash from "./splash";
import GameOver from "./gameOver";

export type GameState = "splash" | "playing" | "gameOver";
export type GameMode = "default";

export default class Tetris {
  gameState: GameState;
  gameMode: GameMode = "default";
  stage: Stage;

  constructor() {
    this.setGameState("splash");
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
