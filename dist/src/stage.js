import Block from "./block.js";
import {select, selectAll} from "../_snowpack/pkg/d3-selection.js";
import {uniq} from "./utils.js";
import HighScores from "./highScores.js";
export default class Stage {
  constructor({
    width = 10,
    height = 20,
    blockSize = 24,
    gridGutterSize = 1,
    gridOverBlocks = true,
    queueScaleFactor = 0.75
  } = {}, game) {
    this.settledBlocks = [];
    this.queue = [];
    this.blockIndex = 1;
    this.isGameOver = false;
    this.clearedLines = 0;
    this.game = game;
    this.gridWidth = width;
    this.gridHeight = height;
    this.blockSize = blockSize;
    this.gridGutterSize = gridGutterSize;
    this.gridOverBlocks = gridOverBlocks;
    this.queueScaleFactor = queueScaleFactor;
    this.initUI();
    this.initializeInternalGrid();
    this.activeBlock = new Block(this.blockIndex, this, "stage");
    this.queue.push(new Block(++this.blockIndex, this, "queue"));
    this.tickInterval = window.setInterval(() => {
      this.tick();
    }, 1e3);
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
      left: () => {
        if (!this.blockWillCollideXOnNextTick(this.activeBlock, -1)) {
          this.activeBlock.moveX(-1);
          return "left";
        }
      },
      right: () => {
        if (!this.blockWillCollideXOnNextTick(this.activeBlock, 1)) {
          this.activeBlock.moveX(1);
          return "right";
        }
      },
      down: () => {
        this.tick();
        return "down";
      },
      instaFall: () => {
        while (!this.blockWillCollideYOnNextTick(this.activeBlock)) {
          this.activeBlock.moveDown();
        }
        clearInterval(this.tickInterval);
        this.tickInterval = window.setInterval(() => {
          this.tick();
        }, 1e3);
        this.finishBlock(this.activeBlock);
        return "instaFall";
      },
      rotate: () => {
        this.activeBlock.rotate();
        return "rotate";
      }
    };
  }
  tick() {
    if (this.isGameOver) {
      this.beforeDestroy();
      this.game.setGameState("gameOver");
      return;
    }
    if (this.blockWillCollideYOnNextTick(this.activeBlock)) {
      this.finishBlock(this.activeBlock);
    } else {
      this.activeBlock.moveDown();
    }
  }
  finishBlock(block) {
    if (this.isGameOver) {
      this.beforeDestroy();
      return this.game.setGameState("gameOver");
    }
    this.settledBlocks.push(block);
    this.placeBlockInGrid(block);
    this.activeBlock = this.queue.pop();
    this.activeBlock.init("stage");
    this.queue.push(new Block(++this.blockIndex, this, "queue"));
    if (!this.activeBlock.blockPositionIsValid) {
      this.isGameOver = true;
      this.beforeDestroy();
      return this.game.setGameState("gameOver");
    }
    this.completedRows.map((rowIndex) => {
      this.clearedLines++;
      this.updateScoreUI();
      const uniqueBlockIdsInRow = uniq(this.internalGrid[rowIndex]);
      const blocksIdsThatShouldFall = uniq(this.internalGrid.filter((row, i) => i < rowIndex).flat().filter((cell) => cell > 0).filter((gridCel) => !uniqueBlockIdsInRow.includes(gridCel)));
      this.settledBlocks.filter((settledBlock) => uniqueBlockIdsInRow.includes(settledBlock.id)).forEach((blockWithClearedRow) => blockWithClearedRow.clearRow(rowIndex));
      blocksIdsThatShouldFall.forEach((blockId) => this.settledBlocks[blockId - 1].moveDown());
      this.internalGrid.splice(rowIndex, 1);
      this.internalGrid.unshift(new Array(this.gridWidth).fill(0));
    });
  }
  updateScoreUI() {
    this.d3UI.select(".score .value").text(this.score);
  }
  placeBlockInGrid(block) {
    block.shape.map((y, yIndex) => {
      y.map((x, xIndex) => {
        if (x && y) {
          this.internalGrid[yIndex + block.y][xIndex + block.x] = block.id;
        }
      });
    });
  }
  blockWillCollideYOnNextTick(block) {
    return block.shape.map((row, rowIndex) => {
      return row.map((atom, columnIndex) => {
        if (!atom)
          return false;
        if (block.y + rowIndex + 1 >= this.gridHeight) {
          return true;
        }
        return this.internalGrid[block.y + rowIndex + 1] && this.internalGrid[block.y + rowIndex + 1][block.x + columnIndex];
      });
    }).flat().some((d) => d);
  }
  blockWillCollideXOnNextTick(block, dir) {
    return block.shape.map((row, rowIndex) => {
      return row.map((atom, columnIndex) => {
        if (!atom)
          return false;
        return this.internalGrid[block.y + rowIndex] && this.internalGrid[block.y + rowIndex][block.x + columnIndex + dir];
      });
    }).flat().some((d) => d);
  }
  get completedRows() {
    return this.internalGrid.reduce((acc, row, rowIndex) => {
      if (row.every((d) => d)) {
        acc.push(rowIndex);
      }
      return acc;
    }, []);
  }
  get score() {
    return this.clearedLines;
  }
  initUI() {
    this.d3Stage = selectAll("body").append("div").attr("class", "stage");
    this.d3Stage.append("svg");
    this.d3UI = select("body").append("div").attr("class", "ui");
    const queue = this.d3UI.append("div").attr("class", "queue ui-block");
    queue.append("div").attr("class", "label").text("Next");
    queue.append("div").attr("class", "value").append("svg").attr("width", this.blockSize * 4 * this.queueScaleFactor).attr("height", this.blockSize * 2 * this.queueScaleFactor);
    this.d3Queue = queue;
    const score = this.d3UI.append("div").attr("class", "score ui-block");
    score.append("div").attr("class", "label").text("Lines");
    score.append("div").attr("class", "value").text(this.score);
    const highScore = this.d3UI.append("div").attr("class", "highscore ui-block");
    highScore.append("div").attr("class", "label").text("Highscore");
    highScore.append("div").attr("class", "value").text(HighScores.getLocalHighScore()?.score || 0);
    this.drawGridLines();
    this.updateScoreUI();
  }
  drawGridLines(x = this.gridWidth, y = this.gridHeight, blockSize = this.blockSize) {
    document.documentElement.style.setProperty("--stage-height", `${y * blockSize / 10}rem`);
    document.documentElement.style.setProperty("--stage-width", `${x * blockSize / 10}rem`);
    const grid = selectAll(".stage svg").attr("style", `width: ${x * blockSize / 10}rem; height: ${y * blockSize / 10}rem`).append("g").attr("class", "gridlines").attr("width", x * blockSize).attr("height", y * blockSize).attr("style", `stroke-width: ${this.gridGutterSize / 10}rem`).attr("viewBox", `0 0 ${x * blockSize} ${y * blockSize}`);
    const rows = grid.append("g").attr("class", "rows");
    const columns = grid.append("g").attr("class", "columns");
    for (let i = 0; i < y + 1; i++) {
      rows.append("line").attr("x1", 0).attr("x2", x * blockSize).attr("y1", i * blockSize).attr("y2", i * blockSize);
    }
    for (let i = 0; i < x + 1; i++) {
      columns.append("line").attr("y1", 0).attr("y2", y * blockSize).attr("x1", i * blockSize).attr("x2", i * blockSize);
    }
  }
  beforeDestroy() {
    clearInterval(this.tickInterval);
  }
}
