import Tetris from "../tetris";
import { createRef, Component, render } from "preact";
import { explodeText } from "../utils";
import animations, { Animation } from "../animations";
export default class Splash extends Component<{game:Tetris}, {}> {

  constructor() {
    super();
  }


  render(props, state) {
    return (
      <div class="splash">
        <div class="title">
          Tetris
        </div>
        <div class="subtitle">By Berend</div>
        <div class="begin">
          {this.props.game.isDesktop
            ? explodeText("Press space to start")
            : explodeText("Touch here to start")}
        </div>

        <div class="social-container">
          <a href="https://github.com/Berenddeperend/tetris" target="_blank">
            Github
          </a>

          <span>version {process.env.VERSION}</span>
        </div>
      </div>
    );
  }

  get controls() {
    return {
      continue: () => {
        const animation = document
          .querySelector(".splash") //todo: use ref instead
          .animate(...(animations.fadeOut as Animation));
        animation.onfinish = () => {
          document.querySelector(".splash").remove(); //can be better
          this.props.game.setGameState("playing");
        };
      },
    };
  }
}
