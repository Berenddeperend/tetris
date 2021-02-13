// if(process.env.DEBUG === 'true') {
//   import("preact/debug");
// }

import Stage from "./stage";
import Splash from "./states/splash";
import GameOver from "./states/gameOver";
import KeyboardControls from "./controls/keyboardControls";
import TouchControls from "./controls/touchControls";
import GestureControls from "./controls/gestureControls";
import { Component, render } from 'preact';

import GridLines from './GridLines';

import "preact/debug";

// import AlphabetKeyboard from './AlphabetKeyboard';
import ThreeLetterInput from './ThreeLetterInput'

export type GameState = "splash" | "playing" | "gameOver";
export type GameMode = "default";
export type GameSettings = {
  width?: number,
  height?: number,
  blockSize?: number,
  gridGutterSize?: number,
  gridOverBlocks?: boolean,
  queueScaleFactor?: number,
}

export default class Tetris extends Component<{}, {gameState: GameState}> {
  gameState: GameState;
  gameMode: GameMode = "default";
  stage: Stage;
  splash: any;
  gameOver: GameOver;

  constructor() {
    super();

    this.state = {
      gameState: "splash"
    }

    // this.setGameState("splash");
    new KeyboardControls(this);
    new TouchControls(this);
    new GestureControls(this);

    function setVH() {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`); //https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    }
    window.addEventListener('resize', setVH);
    setVH();
  }

  setGameState(gameState: GameState) {
    this.setState({
      gameState: gameState
    })
    this.gameState = gameState;

    // switch (gameState) {
    //   case "splash":
    //     return this.splash = new Splash(this);
    //   case "playing":
    //     return (this.stage = new Stage({ width: 10 }, this));
    //   case "gameOver":
    //     return this.gameOver = new GameOver(this);
    // }


    
  }

  get isMobile() {
    const breakpoint = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--breakpoint"
      )
    );
    return window.innerWidth < breakpoint;
  }

  get isDesktop() {
    return !this.isMobile;
  }

  render() {
    // return <div>ja</div>
    switch (this.state.gameState) {
        case "splash":
          return this.splash = <Splash game={this}/>;
        case "playing":
          // return this.stage = <Stage />
          return  <Stage />
          return;
        case "gameOver":
          return this.gameOver = new GameOver(this);
   }
  }
}

render(<Tetris /> , document.body);
