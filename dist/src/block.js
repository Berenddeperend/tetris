import {possibleForms} from "./possibleForms.js";
import {cloneDeep} from "./utils.js";
export default class Block {
  constructor(id = 0, stage, renderTo) {
    this.x = 0;
    this.y = 0;
    this.renderTo = renderTo;
    this.stage = stage;
    const randomBlock = possibleForms[Math.floor(Math.random() * possibleForms.length)];
    this.shape = cloneDeep(randomBlock.shape);
    this.color = randomBlock.color;
    this.id = id;
    this.init(renderTo);
  }
  init(renderTo) {
    this.renderTo = renderTo;
    let d3RenderTarget;
    if (renderTo === "stage") {
      this.x = Math.floor((this.stage.gridWidth - this.shape[0].length) / 2);
      d3RenderTarget = this.stage.d3Stage;
    } else if (renderTo = "queue") {
      this.x = (4 - this.shape[0].length) / 2;
      d3RenderTarget = this.stage.d3Queue;
    }
    if (this.d3Self) {
      this.d3Self.remove();
    }
    this.d3Self = d3RenderTarget.select("svg").insert("g", this.stage.gridOverBlocks ? ".gridlines" : null).attr("class", `block ${this.color}`);
    this.draw();
  }
  draw() {
    this.d3Self.selectAll("rect").remove();
    this.shape.map((y, yI) => {
      y.map((x, xI) => {
        if (x && y) {
          this.d3Self.append("rect").attr("width", this.stage.blockSize).attr("height", this.stage.blockSize).attr("x", xI * this.stage.blockSize).attr("y", yI * this.stage.blockSize).attr("class", "atom");
        }
      });
    });
    this.updateGroupPosition();
  }
  rotate() {
    const originalShape = cloneDeep(this.shape);
    const originalX = this.x;
    const buildRotatedShape = (shape) => {
      const columnCount = shape[0].length;
      const rowCount = shape.length;
      let newShape = [];
      for (let x = 0; x < columnCount; x++) {
        newShape.push([]);
      }
      for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount; column++) {
          newShape[column][row] = shape[row][column];
        }
      }
      newShape.forEach((row) => row.reverse());
      return newShape;
    };
    const amountOfAtomsThatWillRotateOutOfBounds = (shape) => {
      return shape[0].map((x, xIndex) => {
        return xIndex + this.x >= this.stage.gridWidth;
      }).reduce((acc, curr) => {
        return curr ? ++acc : acc;
      }, 0);
    };
    this.shape = buildRotatedShape(this.shape);
    if (this.blockPositionIsValid) {
      return this.draw();
    }
    const offset = amountOfAtomsThatWillRotateOutOfBounds(this.shape);
    this.moveX(-offset, true);
    if (this.blockPositionIsValid) {
      return this.draw();
    } else {
      this.shape = originalShape;
      this.x = originalX;
      this.draw();
    }
  }
  get blockPositionIsValid() {
    return this.shape.map((row, rowIndex) => {
      return row.map((atom, columnIndex) => {
        if (!atom)
          return true;
        return this.stage.internalGrid[this.y + rowIndex][this.x + columnIndex] === 0;
      });
    }).flat().every((d) => d);
  }
  clearRow(rowIndex) {
    const targetShapeRowIndex = rowIndex - this.y;
    const rowLength = this.shape[0].length;
    this.shape.splice(targetShapeRowIndex, 1);
    this.shape.unshift(new Array(rowLength).fill(0));
    this.draw();
  }
  moveDown() {
    this.y++;
    this.updateGroupPosition();
  }
  moveX(x, bypassCollision = false) {
    if (!bypassCollision) {
      if (this.x + x + this.shape[0].length > this.stage.gridWidth || this.x + x < 0) {
        return;
      }
    }
    this.x = this.x + x;
    this.updateGroupPosition();
  }
  updateGroupPosition() {
    const scale = this.renderTo === "queue" ? this.stage.queueScaleFactor : 1;
    this.d3Self.attr("transform", `translate(${this.x * this.stage.blockSize * scale}, ${this.y * this.stage.blockSize * scale}) scale(${scale})`);
  }
}
