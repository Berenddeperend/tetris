import { render } from "preact";
import { explodeText} from '../utils';

export default class Pause { // idea: Julian
  constructor() {
    const stage = document.querySelector(".stage");
    render(
      <div class="pause-container">
        <div class="pause">
          {explodeText('pause')}
        </div>
      </div>,
      stage
    );
    stage.classList.add("is-paused");
  }
  static removePause() {
    const stage = document.querySelector(".stage");
    document.querySelector(".stage .pause-container").remove();
    stage.classList.remove("is-paused");
  }
}
