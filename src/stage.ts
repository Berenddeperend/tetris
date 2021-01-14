import Block, { Shape } from "./block";
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
  isGameOver: boolean = false;

  constructor({
    width = 10,
    height = 10,
    blockSize = 10,
    gridGutterSize = 1,
    // element = ".stage",
  } = {}) {
    selectAll('body')
    .append('div')
    .attr('class', 'stage')
    .append("svg");
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
          if (!this.blockWillCollideXOnNextTick(this.activeBlock, 1)) {
            return this.activeBlock.moveX(1);
          }
          break;
        case "ArrowLeft":
          if (!this.blockWillCollideXOnNextTick(this.activeBlock, -1)) {
            return this.activeBlock.moveX(-1);
          }
          break;
        case "ArrowDown":
          return this.tick();
        case "ArrowUp":
          while (!this.blockWillCollideYOnNextTick(this.activeBlock)) {
            this.activeBlock.moveDown();
          }
          return this.finishBlock(this.activeBlock);
        case "Space":
          return this.activeBlock.rotate();
      }
    });
  }

  tick() {
    if(this.isGameOver) {
      console.log('game over!')
      return;
    }

    if (this.blockWillCollideYOnNextTick(this.activeBlock)) {
      this.finishBlock(this.activeBlock);
    } else {
      this.activeBlock.moveDown();
    }
  }

  finishBlock(block: Block) {
    this.settledBlocks.push(block);
    this.placeBlockInGrid(block);
    this.activeBlock = new Block(++this.blockIndex);
    if(this.blockWillCollideYOnNextTick(this.activeBlock)) {
      return this.isGameOver = true;
    }

    this.completedRows.map((rowIndex) => {
      const uniqueBlockIdsInRow = uniq(this.internalGrid[rowIndex]);

      const blocksIdsThatShouldFall = uniq(
        this.internalGrid
          .filter((row, i) => i < rowIndex) //
          .flat()
          .filter((cell) => cell > 0)
          .filter((gridCel) => !uniqueBlockIdsInRow.includes(gridCel))
      );
      
      this.settledBlocks
      .filter((settledBlock) => uniqueBlockIdsInRow.includes(settledBlock.id))
      .forEach((blockWithClearedRow) =>
      blockWithClearedRow.clearRow(rowIndex)
      );
      
      blocksIdsThatShouldFall.forEach((blockId: number) =>
        this.settledBlocks[blockId -1].moveDown()
      );

      this.internalGrid.splice(rowIndex, 1);
      this.internalGrid.unshift(new Array(constants.gridX).fill(0));
    });
  }

  placeBlockInGrid(block: Block) {
    block.shape.map((y, yIndex) => {
      y.map((x, xIndex) => {
        if (x && y) {
          this.internalGrid[yIndex + block.y][xIndex + block.x] = block.id;
        }
      });
    });
  }

  blockWillCollideYOnNextTick(block: Block): boolean {
    return block.shape
      .map((row, rowIndex) => {
        return row.map((atom, columnIndex) => {
          if (!atom) return false; //Empty atom in this slot

          if (block.y + rowIndex + 1 >= constants.gridY) {
            return true; //Block reached bottom of stage
          }

          return (
            //returns the value of the target spot in the internal grid for the atom
            this.internalGrid[block.y + rowIndex + 1] &&
            this.internalGrid[block.y + rowIndex + 1][block.x + columnIndex]
          );
        });
      })
      .flat()
      .some((d) => d);
  }

  blockWillCollideXOnNextTick(block: Block, dir: number): boolean {
    return block.shape.map((row, rowIndex) => {
      return row.map((atom, columnIndex) => {
        if(!atom) return false;
        return (
          //returns the value of the target spot in the internal grid for the atom
          this.internalGrid[block.y + rowIndex] &&
          this.internalGrid[block.y + rowIndex][block.x + columnIndex + dir]
        );
      });
    }).flat().some((d) => d)
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
      .attr("style", `width: ${x * blockSize}px; height: ${y * blockSize}px`)
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
