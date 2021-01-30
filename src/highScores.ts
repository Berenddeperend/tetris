import Stage from "./stage";
import { html, render, PreactNode } from "./dom";

export type HighScore = {
  name: string;
  score: number;
  date: Date;
};

export default class HighScores {
  highScores: HighScore[] = [];
  html: PreactNode;

  constructor(newScore: HighScore) {
    // this.setScore(newScore);

    this.html = html`
      <h3>High scores</h3>

      <table class="highscore-table">
        <tbody>
          ${this.getAllLocalHighScores()
            .filter((highScore) => highScore.score > 5)
            .map((highScore, index) => {
              return html`
                <tr>
                  <td class="rank">${index + 1}</td>
                  <td class="name">BER</td>
                  <td class="score">${highScore.score}</td>
                </tr>
              `;
            })}
        </tbody>
      </table>
    `;

    render(this.html, document.querySelector(".highscore"));
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

  getAllLocalHighScores(): HighScore[] | null {
    const scores = JSON.parse(window.localStorage.getItem("highScore"));

    return scores
      ? (JSON.parse(window.localStorage.getItem("highScore")) as HighScore[])
      : null;
  }

  static getLocalHighScore(): HighScore | null {
    const scores = JSON.parse(window.localStorage.getItem("highScore"));

    return scores
      ? (JSON.parse(window.localStorage.getItem("highScore")) as HighScore[])[0]
      : null;
  }
}
