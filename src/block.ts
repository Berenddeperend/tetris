import { selectAll } from "d3-selection";
import { possibleBlocks } from "./possibleBlocks";
import { cloneDeep } from "./utils";
import Stage from "./stage";
import animations, { Animation } from "./animations";

export type Shape = number[][];
export type renderBlockTo = "queue" | "stage";
export default class Block {
  shape: Shape;
  color: string;
  x: number = 0;
  y: number = 0;
  id: number;
  d3Self: any;
  d3Shadow: any;
  stage: Stage;
  renderTo: renderBlockTo;
  hasShadow: boolean;

  constructor(id: number = 0, stage: Stage, renderTo: renderBlockTo) {
    this.stage = stage;
    const randomBlock =
      possibleBlocks[Math.floor(Math.random() * possibleBlocks.length)];
    this.shape = cloneDeep(randomBlock.shape);
    this.color = randomBlock.color;
    this.id = id;

    this.init(renderTo);
  }

  init(renderTo: renderBlockTo) {
    this.renderTo = renderTo;
    let d3RenderTarget;
    if (renderTo === "stage") {
      this.hasShadow = true;
      this.x = Math.floor((this.stage.gridWidth - this.shape[0].length) / 2);
      d3RenderTarget = this.stage.d3Stage;
    } else if ((renderTo = "queue")) {
      this.hasShadow = false;
      this.x = (4 - this.shape[0].length) / 2; //align center
      // this.x = 4 - this.shape[0].length; //align right
      d3RenderTarget = this.stage.d3Queue;
    }

    if (this.d3Self) {
      this.d3Self.remove();
    }

    if (renderTo === "stage") {
      this.d3Shadow = d3RenderTarget
        .select("svg")
        .insert("g", this.stage.gridOverBlocks ? ".gridlines" : null)
        .attr("class", `block ${this.color} shadow`);
    }

    this.d3Self = d3RenderTarget
      .select("svg")
      .insert("g", this.stage.gridOverBlocks ? ".gridlines" : null)
      .attr("class", `block ${this.color}`);

    this.draw();
  }

  draw() {
    this.d3Self.selectAll("rect").remove();
    if (this.hasShadow) {
      this.d3Shadow.selectAll("rect").remove();
    }
    this.shape.map((y, yI) => {
      y.map((x, xI) => {
        if (x && y) {
          this.d3Self
            .append("rect")
            .attr("width", this.stage.blockSize)
            .attr("height", this.stage.blockSize)
            .attr("x", xI * this.stage.blockSize)
            .attr("y", yI * this.stage.blockSize)
            .attr("class", "atom");

          if (this.hasShadow) {
            this.d3Shadow
              .append("rect")
              .attr("width", this.stage.blockSize)
              .attr("height", this.stage.blockSize)
              .attr("x", xI * this.stage.blockSize)
              .attr("y", yI * this.stage.blockSize)
              .attr("class", "atom shadow");
          }
        }
      });
    });

    this.updateGroupPosition();
  }

  rotate() {
    const originalShape = cloneDeep(this.shape);
    const originalX = this.x;

    const buildRotatedShape = (shape: Shape): Shape => {
      const columnCount = shape[0].length;
      const rowCount = shape.length;
      let newShape: Shape = [];

      for (let x = 0; x < columnCount; x++) {
        newShape.push([]);
      }

      for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount; column++) {
          newShape[column][row] = shape[row][column];
        }
      }

      newShape.forEach((row) => row.reverse());
      return newShape;
    };

    const amountOfAtomsThatWillRotateOutOfBounds = (shape: Shape): number => {
      return shape[0]
        .map((x, xIndex) => {
          return xIndex + this.x >= this.stage.gridWidth;
        })
        .reduce((acc, curr) => {
          return curr ? ++acc : acc;
        }, 0);
    };

    this.shape = buildRotatedShape(this.shape);

    if (this.blockPositionIsValid) {
      return this.draw();
    }

    const offset = amountOfAtomsThatWillRotateOutOfBounds(this.shape);
    this.moveX(-offset, true);

    if (this.blockPositionIsValid) {
      return this.draw();
    } else {
      //it doesn't fit even after offsetting, return to what it was.
      this.shape = originalShape;
      this.x = originalX;
      this.draw();
    }
  }

  get blockPositionIsValid() {
    return this.shape
      .map((row, rowIndex) => {
        return row.map((atom, columnIndex) => {
          if (!atom) return true;
          return (
            this.stage.internalGrid[this.y + rowIndex] &&
            this.stage.internalGrid[this.y + rowIndex][this.x + columnIndex] ===
              0
          );
        });
      })
      .flat()
      .every((d) => d);
  }

  clearRow(rowIndex: number) {
    const targetShapeRowIndex = rowIndex - this.y;
    const rowLength = this.shape[0].length;

    const targetAtomsYValue = targetShapeRowIndex * this.stage.blockSize;

    const targetAtoms = this.d3Self
      .selectAll(`rect[y="${targetAtomsYValue}"]`)
      .attr("class", "atom clear");

    this.shape.splice(targetShapeRowIndex, 1);
    this.shape.unshift(new Array(rowLength).fill(0));


    setTimeout(() => {
      this.draw();
    }, this.stage.clearAnimationDuration);

  }

  moveDown() {
    this.y++;
    this.updateGroupPosition();
  }

  moveX(x: number, bypassCollision: boolean = false) {
    if (!bypassCollision) {
      if (
        this.x + x + this.shape[0].length > this.stage.gridWidth ||
        this.x + x < 0
      ) {
        return; //block moves out of bounds
      }
    }
    this.x = this.x + x;
    this.updateGroupPosition();
  }

  getShadowYPos(): number {
    let yOffsetFromShape = 0;
    const blockWillCollideYAfterNSteps = (yOffsetFromShape): boolean => {
      return this.shape
        .map((row, rowIndex) => {
          return row.map((atom, columnIndex) => {
            if (!atom) return false; //Empty atom in this slot

            if (this.y + rowIndex + yOffsetFromShape >= this.stage.gridHeight) {
              return true; //Block reached bottom of stage
            }

            return (
              //returns the value of the target spot in the internal grid for the atom
              this.stage.internalGrid[this.y + rowIndex + yOffsetFromShape] &&
              this.stage.internalGrid[this.y + rowIndex + yOffsetFromShape][
                this.x + columnIndex
              ]
            );
          });
        })
        .flat()
        .some((d) => d);
    };
    while (!blockWillCollideYAfterNSteps(yOffsetFromShape)) {
      yOffsetFromShape++;
    }

    return yOffsetFromShape;
  }

  removeShadow() {
    this.d3Shadow.remove();
  }

  updateGroupPosition() {
    const scale = this.renderTo === "queue" ? this.stage.queueScaleFactor : 1;
    this.d3Self.attr(
      "transform",
      `translate(${this.x * this.stage.blockSize * scale}, ${
        this.y * this.stage.blockSize * scale
      }) scale(${scale})`
    );

    if (this.hasShadow) {
      const targetYPos = this.getShadowYPos();

      this.d3Shadow.attr(
        "transform",
        `translate(${this.x * this.stage.blockSize * scale}, ${
          (this.y + targetYPos - 1) * this.stage.blockSize * scale //todo: improve
        }) scale(${scale})`
      );
    }
  }
}
