import Stage from "./stage";
import { html, render, PreactNode } from "./dom";
import { Component, FunctionComponent } from "preact";
import animations, { Animation } from "./animations";
import { times } from "./utils";
import Tetris from "./tetris";

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
  game: Tetris;

  constructor(newScore: HighScore, game: Tetris) {
    this.newHighScore = newScore;
    const self = this; //blegh
    this.game = game;
    const newScoreId = this.getAllLocalHighScores().length + 1;
    this.newHighScore.id = newScoreId;
    this.setScore({ ...newScore, id: newScoreId });
    this.removeDeprecatedHighScores();
    class Entries extends Component<{}, { limit: number }> {
      constructor() {
        super();
        this.state = {
          limit: 5
        };
      }

      render = () => {
        return self
          .getAllLocalHighScores()
          // .filter((highScore, index) => index < this )
          .map((highScore, index) => {
            return (
              <tr class={highScore.id === newScoreId ? "current" : null}>
                <td class="rank">{index + 1}</td>
                <td class="name">{highScore.name}</td>
                <td class="score">{highScore.score}</td>
              </tr>
            );
          });
      };
    }

    const Placeholders = () => {
      return (
        <>
          {new Array(20).fill("").map((d, i) => {
            return (
              <tr class="placeholder">
                <td class="rank">{i + this.getAllLocalHighScores().length + 1}</td>
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
        <div class="highscore-title-container">
          <h3 className="highscore-title">
          Highscores
          </h3>
        </div>
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
    document.querySelector(".highscore-list").animate(...animations.fadeIn as Animation);

    setTimeout(() => {
      document.querySelector('.highscore-title').classList.add('scroll')

      const rowHeight = 20;
      const rank = self.getAllLocalHighScores().findIndex(score => score.id === newScore.id);
      const targetScrollDistance = Math.max(0, (rank - 9) * rowHeight);

      if(this.game.gameState === 'highScore' && targetScrollDistance) {
        (document.querySelector('.highscore-table') as HTMLElement).style.transform = `translateY(-${targetScrollDistance}px)`;
      }

    }, 2000);
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
