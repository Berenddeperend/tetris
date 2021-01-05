import Block from "./block";
import { selectAll } from "d3-selection";

export default class Stage {
  width: number;
  height: number;
  blockSize: number;
  gridGutterSize: number;

  // grid: number[][];
  activeBlock: Block;

  constructor({ width = 10, height = 10, blockSize = 10, gridGutterSize = 1 } = {}) {
    this.width = width;
    this.height = height;
    this.blockSize = blockSize;
    this.activeBlock = new Block();
    this.gridGutterSize = gridGutterSize;

    this.drawGridLines();
    this.setEventListeners();
  }

  setEventListeners() {
    document.addEventListener('keydown', (e:any)=> {
      switch(e.code) {
        case "ArrowRight":
          return this.activeBlock.moveX(1);
        case "ArrowLeft":
          return this.activeBlock.moveX(-1);
        case "ArrowDown":
          return this.activeBlock.moveDown();
          
    })
  }



  tick() {
    this.activeBlock.moveDown();
  }
  // drawGrid(
  //   x: number = this.width,
  //   y: number = this.height,
  //   blockSize: number = this.blockSize
  // ) {
  //   const grid = selectAll(".stage svg")
  //     .append("g")
  //     .attr("class", "gridblocks")
  //     .attr("width", x * blockSize)
  //     .attr("height", y * blockSize)
  //     .attr("viewBox", `0 0 ${x * blockSize} ${y * blockSize}`);

  //   for (let i = 0; i < y; i++) {
  //     const row = grid.append("g");
  //     for (let j = 0; j < x; j++) {
  //       row
  //         .append("rect")
  //         .attr("width", blockSize)
  //         .attr("height", blockSize)
  //         .attr("x", j * blockSize - j + j)
  //         .attr("y", i * blockSize - i + i)
  //     }
  //   }
  // }

  drawGridLines(
    x: number = this.width,
    y: number = this.height,
    blockSize: number = this.blockSize
  ) {
    const grid = selectAll(".stage svg")
      .append("g")
      .attr("class", "gridlines")
      .attr("width", x * blockSize)
      .attr("height", y * blockSize)
      .attr("viewBox", `0 0 ${x * blockSize} ${y * blockSize}`);

    const rows = grid.append("g").attr("class", "rows");
    const columns = grid.append("g").attr("class", "columns");

    for (let i = 0; i < y + 1; i++) {
      rows
        .append("line")
        .attr("x1", 0)
        .attr("x2", x * blockSize)
        .attr("y1", i * blockSize)
        .attr("y2", i * blockSize);
    }

    for (let i = 0; i < x + 1; i++) {
      columns
        .append("line")
        .attr("y1", 0)
        .attr("y2", y * blockSize)
        .attr("x1", i * blockSize)
        .attr("x2", i * blockSize);
    }
  }
}
