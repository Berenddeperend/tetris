import { Component } from "preact";
import { GameSettings } from "./tetris";
import { times } from "./utils";

type GridLinesProps = {
  settings: GameSettings;
};

export default class GridLines extends Component<GridLinesProps> {
  constructor() {
    super();
  }

  // const argumentedSettings = { ...defaultGameSettings, settings };
  // const { width, blockSize, height } = { augumentedSettings };
  // const { width, blockSize, height, gridGutterSize } = {
  //   ...defaultGameSettings,
  //   ...settings,
  // };

  render(props: GridLinesProps) {
    const { width, blockSize, height, gridGutterSize } = {
      ...props.settings,
    };

    return (
      <g
        class="gridlines"
        width={width * blockSize}
        height={height * blockSize}
        style={{
          strokeWidth: `${gridGutterSize / 10}rem`,
        }}
        viewBox={`0 0 ${width * blockSize} ${height * blockSize}`}
      >
        <g class="rows">
          {new Array(height + 1).fill("").map((d, i) => {
            return (
              <line
                x1="0"
                x2={width * blockSize}
                y1={i * blockSize}
                y2={i * blockSize}
              ></line>
            );
          })}
        </g>

        <g class="columns">
          {new Array(width + 1).fill("").map((d, i) => {
            return (
              <line
                y1="0"
                y2={height * blockSize}
                x1={i * blockSize}
                x2={i * blockSize}
              ></line>
            );
          })}
        </g>
      </g>
    );
  }
}
