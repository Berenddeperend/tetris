import constants from "./constants";

// import shape from "d3-shape"
import { symbolSquare } from "d3-shape";
import { selectAll } from "d3-selection";
import Stage from './stage';
import Block from './block';


const stage = selectAll(".stage").append('svg');

// const myStage = new Stage(10, 20, 20, 1);
const myStage = new Stage({
  
});
console.log('myStage: ', myStage);

function init() {
  // myStage.drawGridLines()
  // drawGridLines(constants.gridX, constants.gridY, constants.blockSize);
}


window.setInterval(() => {
  myStage.tick();
}, 1000)


init();
