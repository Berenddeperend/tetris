import Block from "./block";
import { selectAll } from "d3-selection";

export default class Stage {
  width: number;
  height: number;
  blockSize: number;
  gridGutterSize: number;

  grid: number[][];
  activeBlock: Block;

  constructor(width: number, height: number, blockSize: number, gridGutterSize: number) {
    this.width = width;
    this.height = height;
    this.blockSize = blockSize;
    this.grid = new Array(height).fill(new Array(width).fill(0));
    this.activeBlock = new Block();
    this.gridGutterSize = gridGutterSize;

    this.drawGrid();
    this.drawGridLines();
  }

  tick() {
    // this.drawActiveBlock();
    // this.drawGrid();
  }

  drawActiveBlock() {
    this.grid = this.grid.map((row, rowIndex) => {
      return row.map((cell, columnIndex) => {
        return this.activeBlock.value[rowIndex] &&
          this.activeBlock.value[rowIndex][columnIndex]
          ? this.activeBlock.value[rowIndex][columnIndex]
          : cell;
      });

      return row;
    });
  }

  drawGrid(
    x: number = this.width,
    y: number = this.height,
    blockSize: number = this.blockSize
  ) {
    const grid = selectAll(".stage svg")
      .append("g")
      .attr("class", "gridblocks")
      .attr("width", x * blockSize)
      .attr("height", y * blockSize)
      .attr("viewBox", `0 0 ${x * blockSize} ${y * blockSize}`);

    for (let i = 0; i < y; i++) {
      const row = grid.append("g");
      for (let j = 0; j < x; j++) {
        row
          .append("rect")
          .attr("width", blockSize)
          .attr("height", blockSize)
          .attr("x", j * blockSize - j + j)
          .attr("y", i * blockSize - i + i)
          // .attr("class", "gridBlock")
          .attr('class', ()=> {
            return this.grid[i][j] === 1 ? 'active' : null
          });
  
        // symbolSquare.draw(20);
      }
    }

  }

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
