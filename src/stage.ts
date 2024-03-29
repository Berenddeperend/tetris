import Block from "./block";
import { select, selectAll } from "d3-selection";
import { uniq } from "./utils";
import Tetris from "./tetris";
import HighScores from "./highScores";
import Pause from "./states/pause";
import VirtualClock from "virtual-clock";

import { html, render, PreactNode } from "./dom";

export default class Stage {
  game: Tetris;
  pause: Pause;

  clock: VirtualClock;

  gridWidth: number;
  gridHeight: number;
  blockSize: number;
  gridGutterSize: number;
  gridOverBlocks: boolean;
  queueScaleFactor: number;

  internalGrid: number[][];
  activeBlock: Block;
  settledBlocks: Block[] = [];
  queue: Block[] = [];
  blockIndex: number = 1;
  isGameOver: boolean = false;
  isPaused: boolean = false;
  tickInterval: number;
  clearedLines: number = 0;
  freezeInput: boolean = false;
  clearAnimationDuration: number = 400;
  // clearAnimationDuration: number = 4000;

  d3Stage: any; //todo: better typing
  d3UI: any; //todo: better typing
  d3Queue: any; //todo: better typing

  constructor(
    {
      width = 10,
      height = 20,
      blockSize = 24,
      gridGutterSize = 1,
      gridOverBlocks = true,
      queueScaleFactor = 0.75,
    } = {},
    game: Tetris
  ) {
    this.game = game;
    this.gridWidth = width;
    this.gridHeight = height;
    // this.blockSize = this.game.isDesktop ? blockSize : 18;
    this.blockSize = blockSize;
    this.gridGutterSize = gridGutterSize;
    this.gridOverBlocks = gridOverBlocks;
    this.queueScaleFactor = queueScaleFactor;
    this.initUI();
    this.initializeInternalGrid();

    this.activeBlock = new Block(this.blockIndex, this, "stage");
    this.queue.push(new Block(++this.blockIndex, this, "queue"));

    document.documentElement.style.setProperty(
      "--stage-height",
      `${(this.gridHeight * this.blockSize) / 10}rem`
    );
    document.documentElement.style.setProperty(
      "--stage-width",
      `${(this.gridWidth * this.blockSize) / 10}rem`
    );

    this.clock = new VirtualClock();
    this.clock.minimum = 0;
    this.clock.maximum = 1000;
    this.clock.loop = true;

    this.clock.alwaysAt(1000, () => {
      // this.clock.time = 0;
      this.tick();
    });
    this.clock.start();
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
        if (this.isPaused || this.freezeInput) return;
        if (!this.blockWillCollideXOnNextTick(this.activeBlock, -1)) {
          this.activeBlock.moveX(-1);
          return "left";
        }
      },
      right: () => {
        if (this.isPaused || this.freezeInput) return;
        if (!this.blockWillCollideXOnNextTick(this.activeBlock, 1)) {
          this.activeBlock.moveX(1);
          return "right";
        }
      },
      down: () => {
        if (this.isPaused || this.freezeInput) return;
        this.tick();
        return "down";
      },
      instaFall: () => {
        if (this.isPaused || this.freezeInput) return;
        while (!this.blockWillCollideYOnNextTick(this.activeBlock)) {
          this.activeBlock.moveDown();
        }

        this.clock.time = 0;

        this.finishBlock(this.activeBlock);
        return "instaFall";
      },
      rotate: () => {
        if (this.isPaused || this.freezeInput) return;
        this.activeBlock.rotate();
        return "rotate";
      },
      pause: () => {
        if (this.isPaused) {
          this.isPaused = false;
          this.clock.start();
          Pause.removePause();
        } else {
          this.isPaused = true;
          this.clock.stop();
          this.pause = new Pause();
        }
      },
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

  finishBlock(block: Block) {
    if (this.isGameOver) {
      this.beforeDestroy();
      return this.game.setGameState("gameOver");
    }
    this.settledBlocks.push(block);
    this.placeBlockInGrid(block);
    this.activeBlock.hasShadow = false;
    this.activeBlock.removeShadow();
    this.activeBlock.d3Shadow.selectAll("rect").remove(); //don't do this here

    const hasCompletedRow = !!this.completedRows.length;

    this.completedRows.map((rowIndex) => {
      this.freezeInput = true;
      this.clock.stop();
      this.clearedLines++;
      this.updateScoreUI();

      const level = Math.floor(this.clearedLines / 3);
      this.clock.rate = 1 + level / 2;

      const uniqueBlockIdsInRow = uniq(this.internalGrid[rowIndex]);

      const blocksIdsThatShouldFall = uniq(
        this.internalGrid
          .filter((row, i) => i < rowIndex) //
          .flat()
          .filter((cell) => cell > 0)
          .filter((gridCel) => !uniqueBlockIdsInRow.includes(gridCel))
      );

      this.settledBlocks
        .filter((settledBlock) =>
          uniqueBlockIdsInRow.includes(settledBlock.id)
        )
        .forEach((blockWithClearedRow) =>
          blockWithClearedRow.clearRow(rowIndex)
        );
      
      setTimeout(() => {
        blocksIdsThatShouldFall.forEach((blockId: number) =>
          this.settledBlocks[blockId - 1].moveDown()
        );
        this.internalGrid.splice(rowIndex, 1);
        this.internalGrid.unshift(new Array(this.gridWidth).fill(0));
        this.clock.start();
        this.freezeInput = false;
      }, this.clearAnimationDuration);
    });

    
    const generateNewBlock = ()=> {
      this.activeBlock = this.queue.pop();
      this.activeBlock.init("stage");
      this.queue.push(new Block(++this.blockIndex, this, "queue"));
    }
    
    if(hasCompletedRow) {
      setTimeout(() => {
        generateNewBlock()
      }, this.clearAnimationDuration)
    } else {
      generateNewBlock()
      //if the block spawned invalidly, instant game over
      if (!this.activeBlock.blockPositionIsValid) {
        this.isGameOver = true;
        this.beforeDestroy();
        return this.game.setGameState("gameOver");
      }
    }
  }

  updateScoreUI() {
    this.d3UI.select(".score .value").text(this.score);
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
    this.d3Stage
      .append("svg")
      .attr("class", "stage-svg")
      .attr(
        "style",
        `width: ${(this.gridWidth * this.blockSize) / 10}rem; height: ${
          (this.gridHeight * this.blockSize) / 10
        }rem`
      );

    this.d3UI = select("body").append("div").attr("class", "ui");

    const queue = this.d3UI.append("div").attr("class", "queue ui-block");
    queue.append("div").attr("class", "label").text("Next");
    queue
      .append("div")
      .attr("class", "value")
      .append("svg")
      .attr("width", this.blockSize * 4 * this.queueScaleFactor)
      .attr("height", this.blockSize * 2 * this.queueScaleFactor);

    this.d3Queue = queue;

    const score = this.d3UI.append("div").attr("class", "score ui-block");
    score.append("div").attr("class", "label").text("Lines");
    score.append("div").attr("class", "value").text(this.score);

    const highScore = this.d3UI
      .append("div")
      .attr("class", "highscore ui-block");
    highScore.append("div").attr("class", "label").text("Highscore");
    highScore
      .append("div")
      .attr("class", "value")
      .text(this.game.serverHighScore?.score);

    this.drawGridLines();
    this.updateScoreUI();
  }

  drawGridLines() {
    const grid = html`
      <g
        class="gridlines"
        width="${this.gridWidth * this.blockSize}"
        height="${this.gridHeight * this.blockSize}"
        style="stroke-width: ${this.gridGutterSize / 10}rem;"
        viewBox="0 0 ${this.gridWidth * this.blockSize} ${this.gridHeight *
        this.blockSize}"
      >
        <g class="rows"
          >${new Array(this.gridHeight - 1).fill("").map((d, i) => {
            return html`
              <line
                shape-rendering="crispEdges"
                x1="0"
                x2="${this.gridWidth * this.blockSize}"
                y1="${(i + 1) * this.blockSize}"
                y2="${(i + 1) * this.blockSize}"
              ></line>
            `;
          })}</g
        >

        <g class="columns"
          >${new Array(this.gridWidth - 1).fill("").map((d, i) => {
            return html`
              <line
                y1="0"
                shape-rendering="crispEdges"
                y2="${this.gridHeight * this.blockSize}"
                x1="${(i + 1) * this.blockSize}"
                x2="${(i + 1) * this.blockSize}"
              ></line>
            `;
          })}</g
        >
      </g>
    `;
    render(grid, document.querySelector(".stage svg"));
  }

  beforeDestroy() {
    this.d3Stage.attr("class", "stage is-game-over");
    this.clock.stop();
  }
}
