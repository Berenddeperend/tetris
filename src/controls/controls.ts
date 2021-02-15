import { GameState } from "./../tetris";

export const controls = {
  splash: {
    continue: null
  },
  playing: {
    right: null,
    left: null,
    down: null,
    instaFall: null,
    rotate: null,
  },
  gameOver: {},
};

export default function setControls(state: GameState, stateControls: any) {
  controls[state] = stateControls;

  // setTimeout(() => {
  //   controls.splash.continue();
  // }, 1000);
}
