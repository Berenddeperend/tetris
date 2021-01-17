import Stage from './stage';
import Splash from './splash';
import GameOver from './gameOver';

export type GameState = "splash" | "playing" | "gameOver";

export function setGameState(gameState: GameState) {
  gameState = gameState; 
  switch (gameState) {
    case "splash": 
      return new Splash;
    case "playing":
      const stage = new Stage()
      break;
    case "gameOver": 
      return new GameOver;
  }
}

setGameState('splash')


