import constants from "./constants";
import Stage from './stage';

export type GameState = "splash" | "playing" | "gameOver";
let gameState: GameState = "splash";

export function setGameState(gameState: GameState) {
  this.gameState = gameState; 
}

const stage = new Stage({
  // element: '.stage',
  width: constants.gridX,
  height: constants.gridY,
  blockSize: constants.blockSize,
  gridGutterSize: constants.gridLineWidth,
});
  
window.setInterval(() => {
  stage.tick();
}, 1000)
