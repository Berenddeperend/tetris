import Stage from "./stage";
import { html, render, PreactNode } from "./dom";
import { Component, FunctionComponent } from "preact";
import animations, { Animation } from "./animations";
import { times } from "./utils";
import Tetris, { GameMode } from "./tetris";

export type ClientHighScore = {
  name: string;
  score: number;
  date: Date;
  v: string;
  mode: GameMode;
}

export type ServerHighScore = {
  name: string;
  score: number;
  date: Date;
  id?: number;
  v: string;
  mode: GameMode;
}
export default class HighScores {
  highScores = this.getAllHighScores();
  newClientScore: ClientHighScore;
  newServerScore: ServerHighScore;
  game: Tetris;

  constructor(newClientScore: ClientHighScore, game: Tetris) {
    this.newClientScore = newClientScore;
    const self = this; //blegh
    this.game = game;
    const newClientScoreId = null; //todo: remove
    this.newServerScore = this.setScore(newClientScore);
    this.removeDeprecatedHighScores();


    class Entries extends Component<{}, { limit: number }> {
      constructor() {
        super();
        this.state = {
          limit: 5,
        };
      }

      render = () => {
        return (
          self
            .getAllHighScores()
            // .filter((highScore, index) => index < this )
            .map((highScore, index) => {
              return (
                <tr class={highScore.id === newClientScoreId ? "current" : null}>
                  <td class="rank">{index + 1}</td>
                  <td class="name">{highScore.name}</td>
                  <td class="score">{highScore.score}</td>
                </tr>
              );
            })
        );
      };
    }

    const Placeholders = () => {
      return (
        <>
          {new Array(20).fill("").map((d, i) => {
            return (
              <tr class="placeholder">
                <td class="rank">
                  {i + this.getAllHighScores().length + 1}
                </td>
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
          <h3 className="highscore-title">Highscores</h3>
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
    document
      .querySelector(".highscore-list")
      .animate(...(animations.fadeIn as Animation));

    setTimeout(() => {
      document.querySelector(".highscore-title").classList.add("scroll");

      const rowHeight = 20;
      const rank = self
        .getAllHighScores()
        .findIndex((score) => score.id === newClientScore.id);
      const targetScrollDistance = Math.max(0, (rank - 9) * rowHeight);

      if (this.game.gameState === "highScore" && targetScrollDistance) {
        (document.querySelector(
          ".highscore-table"
        ) as HTMLElement).style.transform = `translateY(-${targetScrollDistance}px)`;
      }
    }, 2000);
  }

  removeDeprecatedHighScores() {
    const newHighScores = this.getAllHighScores().filter((score) =>
      score.hasOwnProperty("v")
    );

    window.localStorage.setItem("highScore", JSON.stringify(newHighScores));
  }

  removeHighScoreById(id: number) {
    const newHighScores = this.getAllHighScores().filter(
      (score) => score.id !== id
    );

    window.localStorage.setItem("highScore", JSON.stringify(newHighScores));
  }

  setScore(highScore: ClientHighScore): ServerHighScore {
    console.log("setscore called");
    fetch(`${process.env.API_URL}/score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(highScore),
    }).then((response) => {
      console.log("response from post score:", response);
      return response.json();
    }).then(score => {
      return score as ServerHighScore
    });

    // const prevScores = JSON.parse(window.localStorage.getItem("highScore"));
    // const newClientScores = prevScores
    //   ? [...(prevScores as ClientHighScore[]), highScore].sort(
    //       (a, b) => b.score - a.score
    //     )
    //   : [highScore];

    // window.localStorage.setItem("highScore", JSON.stringify(newClientScores));

    return;
  }

  getAllHighScores(): ServerHighScore[] {
    const scores = JSON.parse(window.localStorage.getItem("highScore"));

    return scores
      ? (JSON.parse(window.localStorage.getItem("highScore")) as ServerHighScore[])
      : [];
  }

  static getLocalHighScore(): ServerHighScore | null {
    const scores = JSON.parse(window.localStorage.getItem("highScore"));

    return scores
      ? (JSON.parse(window.localStorage.getItem("highScore")) as ServerHighScore[])[0]
      : null;
  }
}
