import Stage from "./stage";
import Splash from "./splash";
import GameOver from "./gameOver";

export type GameState = "splash" | "playing" | "gameOver";

let stage: Stage;

export function setGameState(gameState: GameState) {
  gameState = gameState;
  switch (gameState) {
    case "splash":
      return new Splash();
    case "playing":
      return (stage = new Stage({ width: 10 }));
    case "gameOver":
      console.log('stage', stage)
      return new GameOver(stage );
  }
}

setGameState("splash");
