import { Component, render } from "preact";
import animations, { Animation } from "./animations";
import { cloneDeep } from "./utils";
import GameOver from './states/gameOver';

function Increment(props: {
  mode: string;
  active: boolean;
  moveLetter(index: number, amount: number): void;
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
      <div class="letter">{this.props.char}</div>
      <Increment
        mode={"decrement"}
        active={this.props.active}
        moveLetter={this.props.moveLetter}
        letterIndex={this.props.letterIndex}
      />
    </div>
  );
}

let clonedThreeLetterInputState;

export default class ThreeLetterInput extends Component<
  { parent: GameOver},
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

    this.moveLetter = this.moveLetter.bind(this);
  }

  moveLetter(index: number, amount: number) {
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
      activeLetterIndex: index,
    });

    const targetElement =
      amount > 0
        ? document.querySelector(
            `.letter-input:nth-child(${index + 1}) .increment`
          )
        : document.querySelector(
            `.letter-input:nth-child(${index + 1}) .decrement`
          ); //doe hier iets mee

    targetElement.animate(...(animations.boop as Animation));
  }

  componentWillUnmount = () => {
    console.log("unmounted threeletterinput");
  };

  keydownListener = (e: KeyboardEvent) => {
    //this logic aint dry
    if (e.key >= "a" && e.key <= "z") {
      if (this.state.activeLetterIndex === this.state.nickName.length) return;

      document
        .querySelector(".letter-input.active .letter")
        .animate(...(animations.boop as Animation));

      this.setState({
        nickName: this.state.nickName
          .split("")
          .map((letter, index) => {
            return index === this.state.activeLetterIndex ? e.key : letter;
          })
          .join(""),
        activeLetterIndex: this.state.activeLetterIndex + 1,
      });
      return;
    }

    switch (e.code) {
      case "ArrowDown":
        return this.moveLetter(this.state.activeLetterIndex, -1);
      case "ArrowUp":
        return this.moveLetter(this.state.activeLetterIndex, 1);
      case "ArrowLeft":
        if (this.state.activeLetterIndex < 1) return;
        return this.setState({
          activeLetterIndex: this.state.activeLetterIndex - 1,
        });
      case "ArrowRight":
        if (this.state.activeLetterIndex === this.nicknameLength) return;
        return this.setState({
          activeLetterIndex: this.state.activeLetterIndex + 1,
        });

      case "Enter":
        this.setState({
          activeLetterIndex: this.nicknameLength,
        });

        clonedThreeLetterInputState = cloneDeep(this.state);

        const self = document.querySelector(".three-letter-input-container")
        const fadeOutAnimation = self.animate(...animations.fadeOut as Animation);
        
        fadeOutAnimation.onfinish = () => {
          self.remove();
          this.props.parent.showHighScores();
        }

        document.removeEventListener("keydown", this.keydownListener);

        // render(null ,document.querySelector('.three-letter-input'), null ) //unmount werkt niet goed :(
        return;
    }
  };

  componentDidMount = () => {
    document.addEventListener("keydown", this.keydownListener);

    const localStorageNickname = window.localStorage.getItem("lastUsedNickname");
    if( localStorageNickname ) {
      this.setState({
        nickName: localStorageNickname
      });
    }
  };

  render() {
    return (
      <div class="three-letter-input">
        <h2 class="title">What's your name?</h2>

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

          <div
            class={[
              "end",
              this.state.activeLetterIndex === 3 ? "active" : null,
            ].join(" ")}
          >
            End
          </div>
        </div>
      </div>
    );
  }
}
