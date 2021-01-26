import { formatPrefix, json } from "d3";
import { select, selectAll } from "d3-selection";
import Stage from "./stage";
import InputName from './inputName';

export type HighScore = {
  name: string;
  score: number;
  date: Date;
};

export default class HighScores {
  highScores: HighScore[] = [];

  constructor(newScore: HighScore) {
    // new InputName();
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

  static getLocalHighScore(): HighScore | null {
    const scores = JSON.parse(window.localStorage.getItem("highScore"));

    return scores
      ? (JSON.parse(window.localStorage.getItem("highScore")) as HighScore[])[0]
      : null;
  }
}
