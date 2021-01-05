import { selectAll, select } from "d3-selection";
import constants from "./constants";
const possibleForms: number[][][] = [
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [1, 1],
    [1, 1],
  ],

  [
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  [
    [1, 1, 1, 1],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
];

export default class Block {
  value: number[][];
  x: number = 0;
  y: number = 0;
  d3Self: any;
  // d3Atoms: any;

  rotate() {
    const columnCount = this.value[0].length;
    const rowCount = this.value.length;

    let newVal = []
    for(let x = 0; x < columnCount; x++) { //create empty flipped placeholder arrays
      newVal.push([])
    }

    for(let row = 0; row < rowCount; row++) {
      for (let column = 0; column < columnCount; column++) {
        newVal[column][row] = this.value[row][column]
      }
    }
        
    this.value = newVal.map(row => row.reverse())
    this.draw();
  }

  init() {
    this.d3Self = selectAll(".stage svg").append("g").attr("class", "block");
    this.draw();
  }

  draw() {
    this.d3Self.selectAll('rect').remove();
    this.value.map((y, yI) => {
      y.map((x, xI) => {
        if(x&&y) {
          this.d3Self
            .append("rect")
            .attr("width", constants.blockSize)
            .attr("height", constants.blockSize)
            .attr('x', xI * constants.blockSize)
            .attr('y', yI * constants.blockSize)
            .attr("class", "atom");
        }
      });
    });
  }

  moveDown() {
    this.y++;
    this.updatePosition();
  }

  moveX(x:number) {
    this.x = this.x + x * constants.blockSize;
    this.updatePosition();
  }

  updatePosition() {
    this.d3Self.attr(
      "transform",
      `translate(${this.x}, ${this.y * constants.blockSize})`
    );
  }

  constructor() {
    this.value =
      possibleForms[Math.floor(Math.random() * possibleForms.length)];
    this.init();
  }
}
