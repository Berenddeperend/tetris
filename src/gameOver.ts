import { select } from "d3-selection";
import {setGameState} from './tetris';

export default class GameOver {
  constructor() {
    select('body')
    .append('div')
    .attr('class', 'gameOver')
    .text('u dea, press space to try again')

    const onKeyDown = (e:any) => {
      if(e.code === 'Space') {
        window.removeEventListener('keydown', onKeyDown)
        select('.stage').remove();
        select('.gameOver').remove();
        setGameState('playing');
      };
    };
    window.addEventListener('keydown', onKeyDown)
  }
}