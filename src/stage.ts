import Block from "./block";
import { selectAll } from "d3-selection";
import constants from "./constants";

export default class Stage {
  width: number;
  height: number;
  blockSize: number;
  gridGutterSize: number;

  internalGrid: number[][];
  activeBlock: Block;
  settledBlocks: Block[] = [];

  constructor({
    width = 10,
    height = 10,
    blockSize = 10,
    gridGutterSize = 1,
  } = {}) {
    this.width = width;
    this.height = height;
    this.blockSize = blockSize;
    this.activeBlock = new Block();
    this.gridGutterSize = gridGutterSize;

    this.initializeInternalGrid();
    this.drawGridLines();
    this.setEventListeners();
  }

  initializeInternalGrid() {
    this.internalGrid = [];
    for (let y = 0; y < this.height; y++) {
      this.internalGrid.push([]);
      for (let x = 0; x < this.width; x++) {
        this.internalGrid[y][x] = 0;
      }
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", (e: any) => {
      switch (e.code) {
        case "ArrowRight":
          return this.activeBlock.moveX(1);
        case "ArrowLeft":
          return this.activeBlock.moveX(-1);
        case "ArrowDown":
          return this.activeBlock.moveDown();
        case "ArrowUp":
          this.activeBlock.instantFall();
          return this.tick();
        case "Space":
          return this.activeBlock.rotate();
      }
    });
  }

  tick() {
    if (this.activeBlockDoesCollide()) {
      this.settledBlocks.push(this.activeBlock);
      this.placeActiveBlockInGrid();
      this.activeBlock = new Block();
    } else {
      this.activeBlock.moveDown();
    }
  }

  // placeSettledBlocksInGrid() {
  //   this.settledBlocks.map((settledBlock) => {
  //     settledBlock.value.map((y, yIndex) => {
  //       y.map((x, xIndex) => {
  //         if (x && y) {
  //           this.internalGrid[yIndex + settledBlock.y][
  //             xIndex + settledBlock.x
  //           ] = 1;
  //         }
  //       });
  //     });
  //   });
  // }

  placeActiveBlockInGrid() {
    this.activeBlock.shape.map((y, yIndex) => {
      y.map((x, xIndex) => {
        if (x && y) {
          this.internalGrid[yIndex + this.activeBlock.y][
            xIndex + this.activeBlock.x
          ] = 1;
        }
      });
    });

    console.log(this.internalGrid)
  }

  activeBlockDoesCollide() {
    return (
      this.activeBlock.y + this.activeBlock.shape.length === constants.gridY
    );
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
