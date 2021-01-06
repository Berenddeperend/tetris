import { selectAll, select } from "d3-selection";
import constants from "./constants";

import { possibleForms } from "./possibleForms";

export default class Block {
  shape: number[][];
  color: string;
  x: number = Math.floor(constants.gridX / 2);
  y: number = 0;
  d3Self: any;

  constructor() {
    const randomBlock =
      possibleForms[Math.floor(Math.random() * possibleForms.length)];

    this.shape = randomBlock.shape;
    this.color = randomBlock.color;

    this.init();
  }

  rotate() {
    const columnCount = this.shape[0].length;
    const rowCount = this.shape.length;

    let newVal = [];
    for (let x = 0; x < columnCount; x++) {
      newVal.push([]);
    }

    for (let row = 0; row < rowCount; row++) {
      for (let column = 0; column < columnCount; column++) {
        newVal[column][row] = this.shape[row][column];
      }
    }

    this.shape = newVal.map((row) => row.reverse());
    this.draw();
  }

  init() {
    this.d3Self = selectAll(".stage svg")
      .append("g")
      .attr("class", `block ${this.color}`)
    this.draw();
  }

  draw() {
    this.d3Self.selectAll("rect").remove();
    this.shape.map((y, yI) => {
      y.map((x, xI) => {
        if (x && y) {
          this.d3Self
            .append("rect")
            .attr("width", constants.blockSize)
            .attr("height", constants.blockSize)
            .attr("x", xI * constants.blockSize)
            .attr("y", yI * constants.blockSize)
            .attr("class", "atom");
        }
      });
    });
  }

  moveDown() {
    this.y++;
    this.updatePosition();
  }

  instantFall() {
    this.y = constants.gridY - this.shape.length;
    this.updatePosition();
  }

  moveX(x: number) {
    this.x = this.x + x;
    this.updatePosition();
  }

  updatePosition() {
    this.d3Self.attr(
      "transform",
      `translate(${this.x * constants.blockSize}, ${
        this.y * constants.blockSize
      })`
    );
  }

  checkForCollision() {
    this.d3Self.selectAll("rect");
  }
}
