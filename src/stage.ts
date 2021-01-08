import Block, {Shape} from "./block";
import { selectAll } from "d3-selection";
import constants from "./constants";
import { uniq } from "./utils";

export default class Stage {
  width: number;
  height: number;
  blockSize: number;
  gridGutterSize: number;

  internalGrid: number[][];
  activeBlock: Block;
  settledBlocks: Block[] = [];
  queue: Block[] = [];
  blockIndex: number = 1;

  constructor({
    width = 10,
    height = 10,
    blockSize = 10,
    gridGutterSize = 1,
    element = ".stage",
  } = {}) {
    selectAll(element).append("svg");
    this.width = width;
    this.height = height;
    this.blockSize = blockSize;
    this.gridGutterSize = gridGutterSize;
    this.drawGridLines();
    this.initializeInternalGrid();
    this.setEventListeners();

    this.activeBlock = new Block(this.blockIndex);
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
          if (!this.activeBlockWillCollideXOnNextTick(1)) {
            return this.activeBlock.moveX(1);
          }
          break;
        case "ArrowLeft":
          if (!this.activeBlockWillCollideXOnNextTick(-1)) {
            return this.activeBlock.moveX(-1);
          }
          break;
        case "ArrowDown":
          return this.tick();
        case "ArrowUp":
          while (!this.activeBlockWillCollideYOnNextTick()) {
            this.activeBlock.moveDown();
          }
          return this.finishCurrentBlock();
        case "Space":
          return this.activeBlock.rotate();
      }
    });
  }

  tick() {
    if (this.activeBlockWillCollideYOnNextTick()) {
      this.finishCurrentBlock();
    } else {
      this.activeBlock.moveDown();
    }
  }

  finishCurrentBlock() {
    this.settledBlocks.push(this.activeBlock);
    this.placeActiveBlockInGrid();
    this.activeBlock = new Block(++this.blockIndex);

    this.completedRows.map((rowIndex) => {
      const uniqueBlockIdsInRow = uniq(this.internalGrid[rowIndex]);

      const blockThatShouldRemoveSomeAtoms = this.settledBlocks.filter(
        (settledBlock) => {
          return uniqueBlockIdsInRow.includes(settledBlock.id);
        }
      );

      blockThatShouldRemoveSomeAtoms.forEach((block) =>
        block.clearRow(rowIndex)
      );

      this.internalGrid.splice(rowIndex, 1);
      this.internalGrid.unshift(new Array(constants.gridX).fill(0));

      //dit is het nog niet maar wel bijna.
      // const blockIds = uniq(
      //   this.internalGrid
      //     .filter((row, i) => i > rowIndex)
      // ).filter((blockId) => !uniqueBlockIdsInRow.includes(blockId));
      // blockIds.forEach((blockId) => this.settledBlocks[blockId].moveDown());


      //todo: alle blokken die volledig boven de 'rowindex' vallen moeten ook Y++
      // optical only, het interne grid werkt al wel goed.
    });
  }

  placeActiveBlockInGrid() {
    this.activeBlock.shape.map((y, yIndex) => {
      y.map((x, xIndex) => {
        if (x && y) {
          this.internalGrid[yIndex + this.activeBlock.y][
            xIndex + this.activeBlock.x
          ] = this.activeBlock.id;
        }
      });
    });
  }

  activeBlockWillCollideYOnNextTick(): boolean {
    return this.activeBlock.shape
      .map((row, rowIndex, shape) => {
        return row.map((atom, columnIndex) => {
          if (!atom) return false; //Empty atom in this slot

          if (this.activeBlock.y + rowIndex + 1 >= constants.gridY) {
            return true; //Block reached bottom of stage
          }

          return (
            this.internalGrid[this.activeBlock.y + rowIndex + 1] &&
            this.internalGrid[this.activeBlock.y + rowIndex + 1][
              this.activeBlock.x + columnIndex
            ]
          );
        });
      })
      .flat()
      .some((d) => d);
  }

  activeBlockWillCollideXOnNextTick(dir: number): boolean {
    return false;
  }

  get completedRows(): number[] {
    return this.internalGrid.reduce((acc, row, rowIndex) => {
      if (row.every((d) => d)) {
        acc.push(rowIndex);
      }
      return acc;
    }, []);
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
      .attr("style", `stroke-width: ${this.gridGutterSize}px`)
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
