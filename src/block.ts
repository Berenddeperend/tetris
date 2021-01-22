import { selectAll } from "d3-selection";
import { possibleForms } from "./possibleForms";
import { cloneDeep } from "./utils";
import Stage from "./stage";

export type Shape = number[][];
export default class Block {
  shape: Shape;
  color: string;
  x: number = 0;
  y: number = 0;
  id: number;
  d3Self: any;
  stage: Stage;

  constructor(id: number = 0, stage: Stage) {
    this.stage = stage;
    const randomBlock =
      possibleForms[Math.floor(Math.random() * possibleForms.length)];
    this.shape = cloneDeep(randomBlock.shape);
    this.color = randomBlock.color;
    this.x = Math.floor((this.stage.gridWidth - this.shape[0].length) / 2);
    this.id = id;

    this.init();
  }

  rotate() {
    //1: save original values
    const originalShape = cloneDeep(this.shape);
    const originalY = this.y;

    //2: try whatever


    //3: if it fails, reset it back to originalshape and originalY


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

    const shapeMayRotate = (shape: Shape): boolean => { 
      //todo: use 'blockPositionIsValid' method instead
      return shape
        .map((row, rowIndex) => {
          return row.map((atom, columnIndex) => {
            if (!atom) return true;
            return (
              this.stage.internalGrid[this.y + rowIndex][
                this.x + columnIndex
              ] === 0
            );
          });
        })
        .flat()
        .every((d) => d);
    };

    // const shapeMayRotate = this.shapeCollidesWithGrid(newShape)

    const amountOfAtomsThatWillRotateOutOfBounds = (shape: Shape): number => {
      return shape[0]
        .map((x, xIndex) => {
          return xIndex + this.x >= this.stage.gridWidth;
        })
        .reduce((acc, curr) => {
          return curr ? ++acc : acc;
        }, 0);
    };

    const newShape = buildRotatedShape(this.shape);

    if (shapeMayRotate(newShape)) {
      this.shape = newShape;
      return this.redraw();
    }

    const offset = amountOfAtomsThatWillRotateOutOfBounds(newShape);

    this.moveX(-offset, true);

    if (shapeMayRotate(newShape)) {
      this.shape = newShape;
      return this.redraw();
    } else {
      this.moveX(offset, true); //it still doesn't fit, move the block back from where it came.
    }
  }

  init() {
    this.d3Self = selectAll(".stage svg")
      .insert("g", this.stage.gridOverBlocks ? ":first-child" : null)
      .attr("class", `block ${this.color}`);
    this.redraw();
  }

  redraw() {
    this.d3Self.selectAll("rect").remove();
    this.d3Self.selectAll("g").remove();
    this.shape.map((y, yI) => {
      y.map((x, xI) => {
        if (x && y) {
          this.d3Self
            .append("g")
            .append("rect")
            .attr("width", this.stage.blockSize)
            .attr("height", this.stage.blockSize)
            .attr("x", xI * this.stage.blockSize)
            .attr("y", yI * this.stage.blockSize)
            .attr("class", "atom");

          // this.d3Self
          // .selectAll("g")
          // .append("text")
          // .attr("style", "fill: white;")
          // .attr("x", xI * this.stage.blockSize)
          // .attr("y", yI * this.stage.blockSize + 10)
          // .text(() => this.id);
        }
      });
    });

    this.updatePosition();
  }

  get blockPositionIsValid() { 
    return this.shape
        .map((row, rowIndex) => {
          return row.map((atom, columnIndex) => {
            if (!atom) return true;
            return (
              this.stage.internalGrid[this.y + rowIndex][
                this.x + columnIndex
              ] === 0
            );
          });
        })
        .flat()
        .every((d) => d);
  }

  static shapeCollidesWithGrid( //should this be here?
    shape: Shape,
    stage: Stage,
    x: number,
    y: number
  ): boolean {
    return shape
      .map((row, rowIndex) => {
        return row.map((atom, columnIndex) => {
          if (!atom) return true;
          return stage.internalGrid[y + rowIndex][x + columnIndex] === 0;
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
    this.redraw();
  }

  moveDown() {
    this.y++;
    this.updatePosition();
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
    this.updatePosition();
  }

  updatePosition() {
    this.d3Self.attr(
      "transform",
      `translate(${this.x * this.stage.blockSize}, ${
        this.y * this.stage.blockSize
      })`
    );
  }
}
