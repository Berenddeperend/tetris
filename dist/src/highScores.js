export default class HighScores {
  constructor(newScore) {
    this.highScores = [];
  }
  setScore(highScore) {
    const prevScores = JSON.parse(window.localStorage.getItem("highScore"));
    const newScore = prevScores ? [...prevScores, highScore].sort((a, b) => b.score - a.score) : [highScore];
    window.localStorage.setItem("highScore", JSON.stringify(newScore));
  }
  getAllLocalHighScores() {
    const scores = JSON.parse(window.localStorage.getItem("highScore"));
    return scores ? JSON.parse(window.localStorage.getItem("highScore")) : null;
  }
  static getLocalHighScore() {
    const scores = JSON.parse(window.localStorage.getItem("highScore"));
    return scores ? JSON.parse(window.localStorage.getItem("highScore"))[0] : null;
  }
}
