import { selectAll } from "d3-selection";
import constants from "./constants";
import { possibleForms } from "./possibleForms";
export default class Block {
  shape: number[][];
  color: string;
  x: number = 0;
  y: number = 0; // hoeveel rijen er boven de blok zijn
  id: number;
  d3Self: any;

  constructor(id: number = 0) {
    const randomBlock = 
        possibleForms[Math.floor(Math.random() * possibleForms.length)]
    this.shape = JSON.parse(JSON.stringify(randomBlock.shape));
    this.color = randomBlock.color;
    this.x = Math.floor((constants.gridX - this.shape[0].length) / 2);
    this.id = id;

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
    this.redraw();
  }

  init() {
    this.d3Self = selectAll(".stage svg")
      .insert("g", constants.gridOverBlocks ? ":first-child" : null)
      .attr("class", `block ${this.color}`);
    this.redraw();
  }

  redraw() {
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

    this.updatePosition();
  }

  clearRow(rowIndex: number) {
    const targetShapeRow = this.shape[this.y + this.shape.length - rowIndex];
    targetShapeRow.fill(0);
    this.redraw();
  }

  moveDown() {
    this.y++;
    this.updatePosition();
  }

  moveX(x: number) {
    if (this.x + x + this.shape[0].length > constants.gridX || this.x + x < 0) {
      return; //block moves out of bounds
    }
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
}
