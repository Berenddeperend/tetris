import { formatPrefix, json } from "d3";
import { select, selectAll } from "d3-selection";
import Stage from "./stage";

export type HighScore = {
  name: string;
  score: number;
  date: Date;
};

export default class HighScores {
  highScores: HighScore[] = [];

  constructor(newScore: HighScore) {
    // const body = select('body').append('div').attr('class', 'name-group')

    // const inputs = [
    // body.append('input').attr('type', 'text').attr('class','name name0'),
    // body.append('input').attr('type', 'text').attr('class','name name1'),
    // body.append('input').attr('type', 'text').attr('class','name name2'),
    // ];

    // inputs.forEach((input, index) => {
    //   window.addEventListener('input', (e)=> {
    //     // debugger;
    //     if(e.target === input.node()) {
    //       if(index === inputs.length -1) {
    //         (document.querySelector(`.name${index}`) as HTMLElement).blur();
    //       } else {
    //         (document.querySelector(`.name${index +1 }`) as HTMLElement).focus();
    //       }
    //     }
    //   });
    // });

    // window.setTimeout(()=> {
    //   (document.querySelector('.name0') as HTMLElement).focus();

    // }, 200)
    this.setScore(newScore);
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

  static getLocalHighScore():HighScore | null {
    const scores = JSON.parse(window.localStorage.getItem("highScore"));

    return scores ? (JSON.parse(window.localStorage.getItem("highScore")) as HighScore[])[0] : null;
  }
}
