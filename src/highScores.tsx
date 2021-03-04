import { html, render, PreactNode } from "./dom";
import { Component } from "preact";
import animations, { Animation } from "./animations";
import Tetris, { GameMode } from "./tetris";

export type ClientHighScore = {
  name: string;
  score: number;
  timestamp: Date;
  v: string;
  mode: GameMode;
};

export type ServerHighScore = {
  name: string;
  score: number;
  timestamp: Date;
  id: string;
  v: string;
  mode: GameMode;
};

export default class HighScores {
  newClientScore: ClientHighScore;
  newServerScore: ServerHighScore;
  game: Tetris;
  highscoresLoaded = false;
  serverHighScores: ServerHighScore[];

  constructor(newClientScore: ClientHighScore, game: Tetris) {
    this.newClientScore = newClientScore;
    this.game = game;

    this.setScore(newClientScore)
      .then(()=> this.fetchHighScoresFromBackend())
      .then(()=> this.draw());
  }

  draw() {
    //please don't judge me for this naming...
    const html = (
      <>
        <div class="highscore-title-container">
          <h3 className="highscore-title">Highscores</h3>
        </div>
        <div class="highscore-table-container">
          <table class="highscore-table">
            <tbody class="highscore-table-body">
              <Entries
                entries={this.serverHighScores}
                newScore={this.newServerScore}
              />
              <Placeholders entries={this.serverHighScores} />
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
      const rank = this.serverHighScores.findIndex(
        (score) => score.id == this.newServerScore.id
      );
      const targetScrollDistance = Math.max(0, (rank - 9) * rowHeight);

      if (this.game.gameState === "highScore" && targetScrollDistance) {
        (document.querySelector(
          ".highscore-table"
        ) as HTMLElement).style.transform = `translateY(-${targetScrollDistance}px)`;
      }
    }, 2000);
  }

  setScore(highScore: ClientHighScore): Promise<null> {
    return new Promise((resolve) => {
      fetch(`${process.env.API_URL}/score`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(highScore),
      })
        .then((res) => res.json())
        .then((score) => {
          this.newServerScore = score;
          resolve(null);
        });
    });
  }

  fetchHighScoresFromBackend(): Promise<null> {
    return new Promise((resolve) => { 
      fetch(`${process.env.API_URL}/scores`)
        .then((res) => res.json())
        .then((scores) => {
          this.highscoresLoaded = true;
          this.serverHighScores = scores;
          resolve(null);
        });
    });
  }


  static getLocalHighScore(): ServerHighScore | null {
    const scores = JSON.parse(window.localStorage.getItem("highScore"));

    return scores
      ? (JSON.parse(
          window.localStorage.getItem("highScore")
        ) as ServerHighScore[])[0]
      : null;
  }
}

class Entries extends Component<
  { entries: ServerHighScore[]; newScore: ServerHighScore },
  { limit: number }
> {
  constructor() {
    super();
    this.state = {
      limit: 5,
    };
  }

  render = () => {
    return (
      this.props.entries
        // .filter((highScore, index) => index < this )
        .map((highScore, index) => {
          return (
            <tr
              class={highScore.id == this.props.newScore.id ? "current" : null}
            >
              <td class="rank">{index + 1}</td>
              <td class="name">{highScore.name}</td>
              <td class="score">{highScore.score}</td>
            </tr>
          );
        })
    );
  };
}

function Placeholders(props: { entries: ServerHighScore[] }) {
  return (
    <>
      {new Array(20).fill("").map((d, i) => {
        return (
          <tr class="placeholder">
            <td class="rank">{i + props.entries.length + 1}</td>
            <td class="name">-</td>
            <td class="score">-</td>
          </tr>
        );
      })}
    </>
  );
}
