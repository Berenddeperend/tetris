import { selectAll } from "d3-selection";
import { possibleForms } from "./possibleForms";
import { cloneDeep } from "./utils";
import Stage from "./stage";

export type Shape = number[][];
export type renderBlockTo = "queue" | "stage";
export default class Block {
  shape: Shape;
  color: string;
  x: number = 0;
  y: number = 0;
  id: number;
  d3Self: any;
  stage: Stage;
  renderTo: renderBlockTo;

  constructor(id: number = 0, stage: Stage, renderTo: renderBlockTo) {
    this.renderTo = renderTo;
    this.stage = stage;
    const randomBlock =
      possibleForms[Math.floor(Math.random() * possibleForms.length)];
    this.shape = cloneDeep(randomBlock.shape);
    this.color = randomBlock.color;
    this.id = id;

    this.init(renderTo);
  }

  init(renderTo: renderBlockTo) {
    this.renderTo = renderTo;
    let d3RenderTarget;
    if (renderTo === "stage") {
      this.x = Math.floor((this.stage.gridWidth - this.shape[0].length) / 2);
      d3RenderTarget = this.stage.d3Stage;
    } else if ((renderTo = "queue")) {
      this.x = (4 - this.shape[0].length) / 2; //align center
      // this.x = 4 - this.shape[0].length; //align right
      d3RenderTarget = this.stage.d3Queue;
    }

    if (this.d3Self) {
      this.d3Self.remove();
    }

    this.d3Self = d3RenderTarget
      .select("svg")
      .insert("g", this.stage.gridOverBlocks ? ".gridlines" : null)
      .attr("class", `block ${this.color}`);
    this.draw();
  }

  draw() {
    this.d3Self.selectAll("rect").remove();
    this.shape.map((y, yI) => {
      y.map((x, xI) => {
        if (x && y) {
          this.d3Self
            .append("rect")
            .attr("width", this.stage.blockSize)
            .attr("height", this.stage.blockSize)
            .attr("x", xI * this.stage.blockSize)
            .attr("y", yI * this.stage.blockSize)
            .attr("class", "atom");
        }
      });
    });

    this.updateGroupPosition();
  }

  rotate() {
    const originalShape = cloneDeep(this.shape);
    const originalX = this.x;

    const buildRotatedShape = (shape: Shape): Shape => {
      const columnCount = shape[0].length;
      const rowCount = shape.length;
      let newShape: Shape = [];

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

    const amountOfAtomsThatWillRotateOutOfBounds = (shape: Shape): number => {
      return shape[0]
        .map((x, xIndex) => {
          return xIndex + this.x >= this.stage.gridWidth;
        })
        .reduce((acc, curr) => {
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
      //it doesn't fit even after offsetting, return to what it was.
      this.shape = originalShape;
      this.x = originalX;
      this.draw();
    }
  }

  get blockPositionIsValid() {
    return this.shape
      .map((row, rowIndex) => {
        return row.map((atom, columnIndex) => {
          if (!atom) return true;
          return (
            this.stage.internalGrid[this.y + rowIndex][this.x + columnIndex] ===
            0
          );
        });
      })
      .flat()
      .every((d) => d);
  }

  clearRow(rowIndex: number) {
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

  moveX(x: number, bypassCollision: boolean = false) {
    if (!bypassCollision) {
      if (
        this.x + x + this.shape[0].length > this.stage.gridWidth ||
        this.x + x < 0
      ) {
        return; //block moves out of bounds
      }
    }
    this.x = this.x + x;
    this.updateGroupPosition();
  }

  updateGroupPosition() {
    const scale = this.renderTo === "queue" ? this.stage.queueScaleFactor : 1;
    this.d3Self.attr(
      "transform",
      `translate(${this.x * this.stage.blockSize * scale}, ${
        this.y * this.stage.blockSize * scale
      }) scale(${scale})`
    );
  }
}
