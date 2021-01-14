import constants from "./constants";
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
      const stage = new Stage({
        width: constants.gridX,
        height: constants.gridY,
        blockSize: constants.blockSize,
        gridGutterSize: constants.gridLineWidth,
      })
      break;
    case "gameOver": 
      return new GameOver;
  }
}

setGameState('splash')


