import Block from "./block";
import { select, selectAll } from "d3-selection";
import { uniq } from "./utils";
import { setGameState } from "./tetris";
import Gestures from "./gestureControls";
import KeyboardControls from "./keyboardControls";
import TouchControls from "./touchControls";

export default class Stage {
  gridWidth: number;
  gridHeight: number;
  blockSize: number;
  gridGutterSize: number;
  gridOverBlocks: boolean;

  internalGrid: number[][];
  activeBlock: Block;
  settledBlocks: Block[] = [];
  queue: Block[] = [];
  blockIndex: number = 1;
  isGameOver: boolean = false;
  tickInterval: number;
  clearedLines: number = 0;

  keyboardControls: KeyboardControls;
  gestureControls: Gestures;
  touchControls: TouchControls;

  d3Stage: any; //todo: better typing
  d3UI: any; //todo: better typing

  constructor({
    width = 10,
    height = 20,
    blockSize = 24,
    gridGutterSize = 1,
    gridOverBlocks = true,
  } = {}) {
    this.gridWidth = width;
    this.gridHeight = height;
    this.blockSize = blockSize;
    this.gridGutterSize = gridGutterSize;
    this.gridOverBlocks = gridOverBlocks;
    this.initUI();
    this.initializeInternalGrid();
    // this.initGestures();
    this.initKeyboardControls();
    this.initTouchControls();

    this.activeBlock = new Block(this.blockIndex, this, this.d3Stage);
    this.queue.push(new Block(++this.blockIndex, this));
    
    this.tickInterval = window.setInterval(() => {
      // this.tick();
    }, 1000);
  }

  initializeInternalGrid() {
    this.internalGrid = [];
    for (let y = 0; y < this.gridHeight; y++) {
      this.internalGrid.push([]);
      for (let x = 0; x < this.gridWidth; x++) {
        this.internalGrid[y][x] = 0;
      }
    }
  }

  get controls() {
    return {
      left: ()=> {
        if (!this.blockWillCollideXOnNextTick(this.activeBlock, -1)) {
          this.activeBlock.moveX(-1);
        }
      },
      right: () => {
        if (!this.blockWillCollideXOnNextTick(this.activeBlock, 1)) {
          this.activeBlock.moveX(1);
        }
      },
      down: () => {
        this.tick();
      },
      instaFall: () => {
        while (!this.blockWillCollideYOnNextTick(this.activeBlock)) {
          this.activeBlock.moveDown();
        }
        clearInterval(this.tickInterval);
        this.tickInterval = window.setInterval(() => {
          this.tick();
        }, 1000);
        this.finishBlock(this.activeBlock);
      },
      rotate: () => {
        this.activeBlock.rotate();
      }
    }
  }

  initKeyboardControls() {
    this.keyboardControls = new KeyboardControls(this);
  }
    
  initTouchControls() {
    this.touchControls = new TouchControls(this);
  }

  initGestures() {
    this.gestureControls = new Gestures(this);
  }

  tick() {
    if (this.isGameOver) {
      this.beforeDestroy();
      setGameState("gameOver");
      return;
    }

    if (this.blockWillCollideYOnNextTick(this.activeBlock)) {
      this.finishBlock(this.activeBlock);
    } else {
      this.activeBlock.moveDown();
    }
  }

  finishBlock(block: Block) {
    if(this.isGameOver) {
      this.beforeDestroy();
      return setGameState('gameOver')
    }
    this.settledBlocks.push(block);
    this.placeBlockInGrid(block);

    this.activeBlock = this.queue.pop();
    this.activeBlock.init(this.d3Stage)
    this.queue.push(new Block(++this.blockIndex, this));

    //if the block spawned invalidly, instant game over
    if(!this.activeBlock.blockPositionIsValid) {
      this.isGameOver = true;
      this.beforeDestroy();
      return setGameState("gameOver");  
    }
    
    this.completedRows.map((rowIndex) => {
      this.clearedLines++;
      this.updateScoreUI();

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
        this.settledBlocks[blockId - 1].moveDown()
      );

      this.internalGrid.splice(rowIndex, 1);
      this.internalGrid.unshift(new Array(this.gridWidth).fill(0));
    });
  }

  updateQueueUI() {
    // select('.queue').remove();
    // const ui = this.d3UI.append("div").attr("class", "queue ui-block")
    // ui.append('div').attr('class', 'label').text('Next')
    // ui.append('div').attr('class', 'value')//.text(this.queue[0]);
  }

  updateScoreUI() {
    this.d3UI.select('.score .value').text(this.score);
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

          if (block.y + rowIndex + 1 >= this.gridHeight) {
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
    return block.shape
      .map((row, rowIndex) => {
        return row.map((atom, columnIndex) => {
          if (!atom) return false;
          return (
            //returns the value of the target spot in the internal grid for the atom
            this.internalGrid[block.y + rowIndex] &&
            this.internalGrid[block.y + rowIndex][block.x + columnIndex + dir]
          );
        });
      })
      .flat()
      .some((d) => d);
  }

  get completedRows(): number[] {
    return this.internalGrid.reduce((acc, row, rowIndex) => {
      if (row.every((d) => d)) {
        acc.push(rowIndex);
      }
      return acc;
    }, []);
  }

  get score(): number {
    return this.clearedLines;
  }

  initUI() {
    this.d3Stage = selectAll("body").append("div").attr("class", "stage");
    this.d3Stage.append("svg");
    this.d3UI = select("body").append("div").attr("class", "ui");

    const queue = this.d3UI.append('div').attr('class', 'queue ui-block');
    queue.append('div').attr('class', 'label').text('Next');
    queue.append('div').attr('class', 'value').append('svg').attr('width', this.blockSize * 4);

    const score = this.d3UI.append("div").attr("class", "score ui-block");
    score.append('div').attr('class', 'label').text('Score')
    score.append('div').attr('class', 'value').text(this.score)

    this.drawGridLines();
    this.updateQueueUI(); //doesnt do anything
    this.updateScoreUI();
  }

  drawGridLines(
    x: number = this.gridWidth,
    y: number = this.gridHeight,
    blockSize: number = this.blockSize
  ) {
    document.documentElement.style.setProperty('--stage-height', `${y * blockSize}px`)
    document.documentElement.style.setProperty('--stage-width', `${x * blockSize}px`)
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

  beforeDestroy() {
    clearInterval(this.tickInterval);
    this.keyboardControls?.destroy();
    this.touchControls?.destroy();
    this.gestureControls?.destroy();
  }
}
