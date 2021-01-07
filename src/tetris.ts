import constants from "./constants";
import Stage from './stage';

const myStage = new Stage({
  element: '.stage',
  width: constants.gridX,
  height: constants.gridY,
  blockSize: constants.blockSize,
  gridGutterSize: constants.gridLineWidth,
});
  
window.setInterval(() => {
  myStage.tick();
}, 1000)
