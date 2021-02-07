import { Component } from "preact";
import animations, { Animation } from "./animations";

function Increment(props: {
  mode: string,
  active: boolean,
  moveLetter(index: number, amount: number): void,
  letterIndex: number;
}) {
  const value = this.props.mode === "increment" ? 1 : -1;
  return (
    <div
      class={this.props.mode}
      onClick={() => this.props.moveLetter(this.props.letterIndex, value)}
    >
      {/* {this.props.mode === 'increment' ? "↑" : "↓"} */}
      {this.props.mode === "increment" ? "▲" : "▼"}
    </div>
  );
}

function LetterInput(props: {
  char: string;
  letterIndex: number;
  active: boolean;
  moveLetter(index: number, amount: number): void;
}) {
  return (
    <div class={this.props.active ? "active letter-input" : "letter-input"}>
      <Increment
        mode={"increment"}
        active={this.props.active}
        moveLetter={this.props.moveLetter}
        letterIndex={this.props.letterIndex}
      />
      <span>{this.props.char}</span>
      <Increment
        mode={"decrement"}
        active={this.props.active}
        moveLetter={this.props.moveLetter}
        letterIndex={this.props.letterIndex}
      />
    </div>
  );
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

  moveLetter = (index: number, amount: number) => {
    const targetElement =
      amount > 0
        ? document.querySelector(".increment")
        : document.querySelector(".decrement"); //doe hier iets mee

    const newName = this.state.nickName
      .split("")
      .map((letter, letterIndex) => {
        if (index !== letterIndex) return letter;
        const alphabetIndex = this.chars.indexOf(letter);
        const mod_floor = (i: number, n: number) => {
          return ((i % n) + n) % n;
        };

        const output = this.chars[
          mod_floor(alphabetIndex + amount, this.chars.length)
        ];
        return output;
      })
      .join("");

    this.setState({
      nickName: newName,
      activeLetterIndex: this.state.activeLetterIndex,
    });
  };

  componentDidMount = () => {
    window.localStorage.setItem("lastUsedNickname", "aaa");
    document.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowDown":
          // @ts-ignore
          document.querySelector('.letter-input.active .decrement').animate(...animations.boop);
          return this.moveLetter(this.state.activeLetterIndex, 1);
          case "ArrowUp":
          // @ts-ignore
          document.querySelector('.letter-input.active .increment').animate(...animations.boop);
          return this.moveLetter(this.state.activeLetterIndex, -1);

        case "ArrowLeft":
          if (this.state.activeLetterIndex < 1) return;
          return this.setState({
            activeLetterIndex: this.state.activeLetterIndex - 1,
          });
        case "ArrowRight":
          if (this.state.activeLetterIndex === this.nicknameLength - 1) return;
          return this.setState({
            activeLetterIndex: this.state.activeLetterIndex + 1,
          });
      }
    });

    this.setState({
      nickName: window.localStorage.getItem("lastUsedNickname"),
    });
  };

  render() {
    return (
      <div class="three-letter-input">
        <h2>What's your name?</h2>

        <div class="input-group">
          {this.state.nickName.split("").map((letter, index) => {
            return (
              <LetterInput
                char={letter}
                active={index === this.state.activeLetterIndex}
                letterIndex={index}
                moveLetter={this.moveLetter}
              />
            );
          })}

          <div class="end">End</div>
        </div>
      </div>
    );
  }
}
