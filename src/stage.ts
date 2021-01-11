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
    if (this.blockWillCollideYOnNextTick(this.activeBlock)) {
      this.finishBlock(this.activeBlock);
    } else {
      this.activeBlock.moveDown();
    }
  }

  finishBlock(block: Block) {
    this.settledBlocks.push(this.activeBlock);
    this.placeBlockInGrid(this.activeBlock);
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
      const blocksThatShouldFall = uniq(this.internalGrid
        // .filter((row, i) => i < rowIndex)
        .filter((row, i) => i > rowIndex)
        .filter((blockId) => !uniqueBlockIdsInRow.includes(blockId)).flat());

      // console.log("blocksThatShouldFall: ", blocksThatShouldFall);

      // blocksThatShouldFall.forEach((blockId:number) =>
      //   this.settledBlocks[blockId].moveDown()
      // );


      // doe dit door alle blocken nog een tick te doen.
      // this.settledBlocks.forEach(block => {
      //   if (this.blockWillCollideYOnNextTick(block)) {
      //     this.finishBlock(block);
      //   } else {
      //     block.moveDown();
      //   }
      // })

      //todo: alle blokken die volledig boven de 'rowindex' vallen moeten ook Y++
      // optical only, het interne grid werkt al wel goed.
    });
    console.table(this.internalGrid);
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
      .map((row, rowIndex, shape) => {
        return row.map((atom, columnIndex) => {
          if (!atom) return false; //Empty atom in this slot

          if (block.y + rowIndex + 1 >= constants.gridY) {
            return true; //Block reached bottom of stage
          }

          return (
            this.internalGrid[block.y + rowIndex + 1] &&
            this.internalGrid[block.y + rowIndex + 1][block.x + columnIndex]
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
