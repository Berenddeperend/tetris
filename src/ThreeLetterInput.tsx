import { tickIncrement } from "d3";
import { Component } from "preact";
import { times } from "./utils";

class LetterInput extends Component<{}, { currCharIndex: number }> {
  chars = "abcdefghijklmnopqrstuvwxyz";

  state = {
    currCharIndex: 0,
  };

  moveLetter(amount: number) {
    this.setState({ currCharIndex: this.state.currCharIndex + amount });
  }

  getLetter = () => {
    const mod_floor = (i: number, n: number) => {
      return ((i % n) + n) % n;
    };

    return this.chars[mod_floor(this.state.currCharIndex, this.chars.length)];
  };

  render() {
    return (
      <div class="letter-input">
        <div class="increment" onClick={() => this.moveLetter(1)}>
          ↑
        </div>
        <span>{this.getLetter()}</span>
        <div class="decrement" onClick={() => this.moveLetter(-1)}>
          ↓
        </div>
      </div>
    );
  }
}

export default class ThreeLetterInput extends Component<
  {},
  { nickName: string; activeLetterIndex: number }
> {
  chars = "abcdefghijklmnopqrstuvwxyz";
  nicknameLength = 3;

  constructor() {
    super();

    this.state = {
      nickName: "aaa",
      activeLetterIndex: 0,
    };
  }

  componentDidMount() {
    window.localStorage.setItem("lastUsedNickname", "berend");
    document.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowDown":
          // return game.stage.controls.down();

        case "ArrowUp":
          // return game.stage.controls.instaFall();
      }
    });

    this.setState({
      nickName: window.localStorage.getItem("lastUsedNickname"),
    });
  }

  render() {
    return (
      <div class="three-letter-input">
        <h2>What's your name?</h2>
        <p>{this.state.nickName}</p>

        {times(this.nicknameLength, <LetterInput />)}
      </div>
    );
  }
}
