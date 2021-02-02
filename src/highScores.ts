import Stage from "./stage";
import { html, render, PreactNode } from "./dom";
import { Component } from "preact";
import animations, { Animation } from "./animations";
import InputName from "./inputName";
import { times } from "./utils";

export type HighScore = {
  name: string;
  score: number;
  date: Date;
  id?: number;
};

export default class HighScores {
  highScores: HighScore[] = [];
  html: PreactNode;

  constructor(newScore: HighScore) {
    const self = this; //blegh
    const newScoreId = this.getAllLocalHighScores().length + 1;
    this.setScore({ ...newScore, id: newScoreId });

    // ${
    //   new Array(limit - this.getAllLocalHighScores().length).fill("").map(()=> {
    //   return html`
    //     <tr class="placeholder">
    //       <td class="rank">-</td>
    //       <td>-</td>
    //       <td class="score">-</td>
    //     </tr>
    //   `
    // }
    // )

    class Entries extends Component<{}, { limit: number }> {
      constructor() {
        super();
        this.state = {
          limit: 5,
        };
      }

      render = () => {
        return self
          .getAllLocalHighScores()
          .filter((highScore, index) => index < this.state.limit)
          .map((highScore, index) => {
            return html`
              <tr class="${highScore.id === newScoreId ? "current" : null}">
                <td class="rank">${index + 1}</td>
                <td class="name">
                  ${highScore.id === newScoreId ? html`<${InputName}/>` : highScore?.name}
                </td>
                <td class="score">${highScore.score}</td>
              </tr>
            `;
          });
      };
    }

    const Placeholders = () => html`
      ${new Array(4).fill("").map(
        () => html`
          <tr class="placeholder">
            <td class="rank">-</td>
            <td class="name">-</td>
            <td class="score">-</td>
          </tr>
        `
      )}
    `;

    this.html = html`
      <h3 class="highscore-title">Highscores</h3>
      <div class="highscore-table-container">
        <table class="highscore-table">
          <tbody>
            <${Entries} />
            <${Placeholders} />
          </tbody>
        </table>
      </div>
    `;

    render(this.html, document.querySelector(".highscore-list"));
    // @ts-ignore
    document.querySelector(".highscore-list").animate(...animations.fadeIn);
  }

  setScore(highScore: HighScore) {
    const prevScores = JSON.parse(window.localStorage.getItem("highScore"));
    const newScore = prevScores
      ? [...(prevScores as HighScore[]), highScore].sort(
          (a, b) => b.score - a.score
        )
      : [highScore];

    window.localStorage.setItem("highScore", JSON.stringify(newScore));
  }

  getAllLocalHighScores(): HighScore[] {
    const scores = JSON.parse(window.localStorage.getItem("highScore"));

    return scores
      ? (JSON.parse(window.localStorage.getItem("highScore")) as HighScore[])
      : [];
  }

  static getLocalHighScore(): HighScore | null {
    const scores = JSON.parse(window.localStorage.getItem("highScore"));

    return scores
      ? (JSON.parse(window.localStorage.getItem("highScore")) as HighScore[])[0]
      : null;
  }
}
