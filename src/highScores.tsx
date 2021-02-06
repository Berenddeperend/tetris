import Stage from "./stage";
// import { html, render, PreactNode } from "./dom";
import { Component, FunctionComponent, render } from "preact";
import animations, { Animation } from "./animations";
import InputName from "./inputName";
import { times } from "./utils";

export type HighScore = {
  name: string;
  score: number;
  date: Date;
  id?: number;
  v: string;
};

export default class HighScores {
  highScores: HighScore[] = this.getAllLocalHighScores();
  newHighScore: HighScore;

  constructor(newScore: HighScore) {
    this.newHighScore = newScore;
    const self = this; //blegh
    const newScoreId = this.getAllLocalHighScores().length + 1;
    this.newHighScore.id = newScoreId;
    this.setScore({ ...newScore, id: newScoreId });
    this.removeDeprecatedHighScores();
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
            return (
              <tr class={highScore.id === newScoreId ? "current" : null}>
                <td class="rank">{index + 1}</td>
                <td class="name">
                  {highScore.id === newScoreId ? (
                    <InputName onNameChange={self.onNameChanged.bind(self)} />
                  ) : (
                    highScore?.name
                  )}
                </td>
                <td class="score">{highScore.score}</td>
              </tr>
            );
          });
      };
    }

    const Placeholders = () => {
      return (
        <>
          {new Array(4).fill("").map(() => {
            return (
              <tr class="placeholder">
                <td class="rank">-</td>
                <td class="name">-</td>
                <td class="score">-</td>
              </tr>
            );
          })}
        </>
      );
    };

    const html = (
      <>
        <h3 class="highscore-title">Highscores</h3>
        <div class="highscore-table-container">
          <table class="highscore-table">
            <tbody>
              <Entries />
              <Placeholders />
            </tbody>
          </table>
        </div>
      </>
    );

    render(html, document.querySelector(".highscore-list"));
    // @ts-ignore
    document.querySelector(".highscore-list").animate(...animations.fadeIn);
  }

  onNameChanged(e) {
    this.newHighScore.name = e.target.value;
    this.removeHighScoreById(this.newHighScore.id);
    this.setScore(this.newHighScore);
  }

  removeDeprecatedHighScores() {
    const newHighScores = this.getAllLocalHighScores().filter(
      (score) => score.hasOwnProperty('v')
    );

    window.localStorage.setItem("highScore", JSON.stringify(newHighScores));
  }

  removeHighScoreById(id:number) {
    const newHighScores = this.getAllLocalHighScores().filter(
      (score) => score.id !== id
    );

    window.localStorage.setItem("highScore", JSON.stringify(newHighScores));
  }

  setScore(highScore: HighScore) {
    const prevScores = JSON.parse(window.localStorage.getItem("highScore"));
    const newScores = prevScores
      ? [...(prevScores as HighScore[]), highScore].sort(
          (a, b) => b.score - a.score
        )
      : [highScore];

    window.localStorage.setItem("highScore", JSON.stringify(newScores));
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
