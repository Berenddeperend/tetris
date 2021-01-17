import { selectAll } from "d3-selection";
import { possibleForms } from "./possibleForms";
import { cloneDeep } from "./utils";
import Stage from './stage';

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
    
    //push block away from wall if gonna overlap
    //sorta inefficient but ok
    this.shape[0].map((x, xIndex) => {
      if(xIndex + this.x >= this.stage.gridWidth ) {
        this.moveX(-1, true);
      }
    })

    this.redraw();
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

            // if(constants.debug) {
            //   this.d3Self
            //   .selectAll("g")
            //   .append("text")
            //   .attr("style", "fill: white;")
            //   .attr("x", xI * this.stage.blockSize)
            //   .attr("y", yI * this.stage.blockSize + 10)
            //   .text(() => this.id);
            // }
          
        }
      });
    });

    this.updatePosition();
  }

  clearRow(rowIndex: number) {
    const targetShapeRowIndex = rowIndex - this.y;
    this.shape.unshift(new Array(this.shape[0].length).fill(0));
    this.shape.splice(targetShapeRowIndex + 1, 1);
    this.redraw();
  }

  moveDown() {
    this.y++;
    this.updatePosition();
  }

  moveX(x: number, bypassCollision: boolean = false) {
    if (!bypassCollision) {
      if (this.x + x + this.shape[0].length > this.stage.gridWidth || this.x + x < 0) {
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
