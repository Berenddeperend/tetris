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
    }

    
    const shapeMayRotate = (shape: Shape) : boolean  => {
      return shape
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

    const amountOfAtomsThatWillRotateOutOfBounds = (shape: Shape): number =>  {
      return shape[0]
        .map((x, xIndex) => {
          return xIndex + this.x >= this.stage.gridWidth;
        })
        .reduce((acc,curr) => {
          return curr ? ++acc : acc
        }, 0);
    }

    const newShape = buildRotatedShape(this.shape)
    
    if(shapeMayRotate(newShape)) {
     this.shape = newShape;
     return this.redraw(); 
    }

    const offset = amountOfAtomsThatWillRotateOutOfBounds(newShape);

    this.moveX(-offset, true);

    if( shapeMayRotate(newShape) ) {
      this.shape = newShape
      return this.redraw();
    } else {
        this.moveX(offset, true) //it still doesn't fit, move the block back from where it came.
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

  clearRow(rowIndex: number) {
    const targetShapeRowIndex = rowIndex - this.y;
    this.shape.splice(targetShapeRowIndex, 1);
    this.shape.unshift(new Array(this.shape[0].length).fill(0));
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