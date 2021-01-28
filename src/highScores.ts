import { select, selectAll } from "d3-selection";
import Stage from "./stage";

export type HighScore = {
  name: string;
  score: number;
  date: Date;
};

export default class HighScores {
  highScores: HighScore[] = [];
  d3Self: any

  constructor(newScore: HighScore) {
    // this.setScore(newScore);

    // this.d3Self = select('.stage').append('div').attr('class', 'high-score')
    // this.d3Self.append('h2').text('High score list');
    // const table = this.d3Self.append('table')
    
    // table.node().insertAdjacentHTML('beforeend', `
    //   <tr><td>hi mom</td></tr>
    // `)

    // const tr = table
    // .selectAll("tr")
    // .data(() =>
    //   this.getAllLocalHighScores()
    // )
    // .enter()
    // .append("tr")
    // .append('td')
    // .text(d=> d.score)
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

  getAllLocalHighScores() {
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
