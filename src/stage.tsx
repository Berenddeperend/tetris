import Block, {blockMethods, BlockProps} from "./block";
import { select, selectAll } from "d3-selection";
import { uniq } from "./utils";
import Tetris, { GameSettings } from "./tetris";
import HighScores from "./highScores";
import setControls from "./controls/controls";
import { defaultGameSettings } from "./Defaults";


import { Component } from "preact";
import GridLines from "./GridLines";
import { reduce } from "d3";

// import { html, render, PreactNode } from "./dom";

type StageProps = {
  game: Tetris;
  settings: GameSettings;
};

type StageState = {
  internalGrid: number[][];
  activeBlock: BlockProps; //type Block fails, why?
  settledBlocks: Block[];
  queue: Block[];
  blockIndex: number;
  isGameOver: boolean;
  tickInterval: number;
  clearedLines: number;
};

export default class Stage extends Component<StageProps, StageState> {
  constructor(props: StageProps) {
    super(props);

    this.state = {
      internalGrid: null,
      activeBlock: {
        id: 2,
        stage: this,
        color: null,
        shape: null,
        settings: props.settings,
        x: 0,
        y: 0,
        methods: blockMethods
        // <Block settings={props.settings} stage={this} id={2} />
      },
      settledBlocks: [],
      queue: [],
      blockIndex: 1,
      isGameOver: false,
      tickInterval: window.setInterval(() => {
        this.tick();
      }, 1000),
      clearedLines: 0,
    };


    // this.initUI();
    this.initializeInternalGrid();

    setControls("playing", {
      right: this.controls.right,
      left: this.controls.left,
      down: this.controls.down,
      instaFall: this.controls.instaFall,
      rotate: this.controls.rotate,
    });


    document.documentElement.style.setProperty(
      "--stage-height",
      `${(props.settings.height * props.settings.blockSize) / 10}rem`
    );
    document.documentElement.style.setProperty(
      "--stage-width",
      `${(props.settings.width * props.settings.blockSize) / 10}rem`
    );


    // this.createNewBlock(); //once for the queue
    // this.createNewBlock(); //once for the stage
  }

  initializeInternalGrid() {
    const grid = [];
    for (let y = 0; y < this.props.settings.height; y++) {
      grid.push([]);
      for (let x = 0; x < this.props.settings.width; x++) {
        grid[y][x] = 0;
      }
    }
    this.setState({internalGrid: grid})
  }

  createNewBlock = () => {
    // this.setState((prevState) => ({
    //   blockIndex: prevState.blockIndex + 1,
    //   queue: [new Block(prevState.blockIndex + 1, this, 'queue')],
    //   activeBlock: prevState.queue[0],
    // }));


    // console.log(this.state)
    // this.state.activeBlock.init('stage') //probably not the correct way to do it
  };

  get controls() {
    return {
      left: () => {
        // if (!this.blockWillCollideXOnNextTick(this.state.activeBlock, -1)) {
        //   this.state.activeBlock.moveX(-1);
          return "left";
        // }
      },
      right: () => {
        // if (!this.blockWillCollideXOnNextTick(this.state.activeBlock, 1)) {
        //   this.state.activeBlock.moveX(1);
          return "right";
        // }
      },
      down: () => {
        console.log('down, from within stage')
        console.log(this.state.activeBlock)
        // this.tick();
        return "down";
      },
      instaFall: () => {
        // while (!this.blockWillCollideYOnNextTick(this.state.activeBlock)) {
        //   this.state.activeBlock.moveDown();
        // }
        // clearInterval(this.state.tickInterval);
        // this.setState({tickInterval: window.setInterval(() => {
        //   this.tick();
        // }, 1000)})
        // this.finishBlock(this.state.activeBlock);
        return "instaFall";
      },
      rotate: () => {
        // this.state.activeBlock.rotate();
        return "rotate";
      },
    };
  }

  tick() {
    if (this.state.isGameOver) {
      // this.beforeDestroy();
      this.props.game.setGameState("gameOver");
      return;
    }

    // if (this.blockWillCollideYOnNextTick(this.state.activeBlock)) {
    //   this.finishBlock(this.state.activeBlock);
    // } else {
      // console.log(this.state.activeBlock)
      // this.state.activeBlock.moveDown();
      // this.state.activeBlock.props.methods.down()
    // }
  }

  finishBlock(block: Block) {
    // if (this.isGameOver) {
    //   this.beforeDestroy();
    //   return this.game.setGameState("gameOver");
    // }
    // this.settledBlocks.push(block);
    // this.placeBlockInGrid(block);

    // this.activeBlock = this.queue.pop();
    // this.activeBlock.init("stage");
    // this.queue.push(new Block(++this.blockIndex, this, "queue"));

    // //if the block spawned invalidly, instant game over
    // if (!this.activeBlock.blockPositionIsValid) {
    //   this.isGameOver = true;
    //   this.beforeDestroy();
    //   return this.game.setGameState("gameOver");
    // }

    // this.completedRows.map((rowIndex) => {
    //   this.clearedLines++;
    //   this.updateScoreUI();

    //   const uniqueBlockIdsInRow = uniq(this.internalGrid[rowIndex]);

    //   const blocksIdsThatShouldFall = uniq(
    //     this.internalGrid
    //       .filter((row, i) => i < rowIndex) //
    //       .flat()
    //       .filter((cell) => cell > 0)
    //       .filter((gridCel) => !uniqueBlockIdsInRow.includes(gridCel))
    //   );

    //   this.settledBlocks
    //     .filter((settledBlock) => uniqueBlockIdsInRow.includes(settledBlock.id))
    //     .forEach((blockWithClearedRow) =>
    //       blockWithClearedRow.clearRow(rowIndex)
    //     );

    //   blocksIdsThatShouldFall.forEach((blockId: number) =>
    //     this.settledBlocks[blockId - 1].moveDown()
    //   );

    //   this.internalGrid.splice(rowIndex, 1);
    //   this.internalGrid.unshift(new Array(this.gridWidth).fill(0));
    // });
  }

  updateScoreUI() {
    // this.d3UI.select(".score .value").text(this.score);
  }

  placeBlockInGrid(block: Block) {
    // block.shape.map((y, yIndex) => {
    //   y.map((x, xIndex) => {
    //     if (x && y) {
    //       this.internalGrid[yIndex + block.y][xIndex + block.x] = block.id;
    //     }
    //   });
    // });
  }

  blockWillCollideYOnNextTick(block: Block): boolean {
    // return block.shape
    //   .map((row, rowIndex) => {
    //     return row.map((atom, columnIndex) => {
    //       if (!atom) return false; //Empty atom in this slot

    //       if (block.y + rowIndex + 1 >= this.gridHeight) {
    //         return true; //Block reached bottom of stage
    //       }

    //       return (
    //         //returns the value of the target spot in the internal grid for the atom
    //         this.internalGrid[block.y + rowIndex + 1] &&
    //         this.internalGrid[block.y + rowIndex + 1][block.x + columnIndex]
    //       );
    //     });
    //   })
    //   .flat()
    //   .some((d) => d);
    return false;
  }

  blockWillCollideXOnNextTick(block: Block, dir: number): boolean {
    // return block.shape
    //   .map((row, rowIndex) => {
    //     return row.map((atom, columnIndex) => {
    //       if (!atom) return false;
    //       return (
    //         //returns the value of the target spot in the internal grid for the atom
    //         this.internalGrid[block.y + rowIndex] &&
    //         this.internalGrid[block.y + rowIndex][block.x + columnIndex + dir]
    //       );
    //     });
    //   })
    //   .flat()
    //   .some((d) => d);
    return false
  }

  get completedRows(): number[] {
    // return this.internalGrid.reduce((acc, row, rowIndex) => {
    //   if (row.every((d) => d)) {
    //     acc.push(rowIndex);
    //   }
    //   return acc;
    // }, []);  
    return [1]
  }

  get score(): number {
    return 1
    // return this.clearedLines;
  }

  initUI() {
    // this.d3Stage = selectAll("body").append("div").attr("class", "stage");
    // this.d3Stage
    //   .append("svg")
    //   .attr(
    //     "style",
    //     `width: ${(this.gridWidth * this.blockSize) / 10}rem; height: ${
    //       (this.gridHeight * this.blockSize) / 10
    //     }rem`
    //   );

    // this.d3UI = select("body").append("div").attr("class", "ui");

    // const queue = this.d3UI.append("div").attr("class", "queue ui-block");
    // queue.append("div").attr("class", "label").text("Next");
    // queue
    //   .append("div")
    //   .attr("class", "value")
    //   .append("svg")
    //   // .attr('viewbox', "0 0 100 100")
    //   // .attr('perserveAspectRatio', true)
    //   .attr("width", this.blockSize * 4 * this.queueScaleFactor)
    //   .attr("height", this.blockSize * 2 * this.queueScaleFactor);

    // this.d3Queue = queue;

    // const score = this.d3UI.append("div").attr("class", "score ui-block");
    // score.append("div").attr("class", "label").text("Lines");
    // score.append("div").attr("class", "value").text(this.score);

    // const highScore = this.d3UI
    //   .append("div")
    //   .attr("class", "highscore ui-block");
    // highScore.append("div").attr("class", "label").text("Highscore");
    // highScore
    //   .append("div")
    //   .attr("class", "value")
    //   .text(HighScores.getLocalHighScore()?.score || 0);

    // this.updateScoreUI();
  }

  render(props:StageProps, state:StageState) {

    return (
      <>
        <div class="stage">
          <svg class="plx" style={{
            width: `${(props.settings.width * props.settings.blockSize) / 10}rem`, //don't work yet.. :()
            height: `${(props.settings.height * props.settings.blockSize) / 10}rem`,
          }}>

            {/* {state.settledBlocks.forEach(block => {
              <Block settings={props.settings} id={1} stage={this} />
            })} */}

            
            <Block {...this.state.activeBlock} />


            <GridLines settings={props.settings} />
          </svg>
        </div>
        <div class="ui">
        </div>
      </>
    );
  }

  beforeDestroy() {
    // this.d3Stage.attr("class", "stage is-game-over");
    // clearInterval(this.tickInterval);
  }
}
