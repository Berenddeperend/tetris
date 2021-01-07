import constants from "./constants";

// import shape from "d3-shape"
import { symbolSquare } from "d3-shape";
import { selectAll } from "d3-selection";
import Stage from './stage';
import Block from './block';


const stage = selectAll(".stage").append('svg');

const myStage = new Stage({
  width: constants.gridX,
  height: constants.gridY,
  blockSize: constants.blockSize,
  gridGutterSize: constants.gridLineWidth,
});
  
window.setInterval(() => {
  myStage.tick();
}, 1000)
