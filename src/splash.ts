import { select } from "d3-selection";
import {setGameState} from './tetris';

export default class Splash {

  constructor() {
    select('body')
    .append('div')
    .attr('class', 'splash')
    .text('press space to begin')

    const onKeyDown = (e:any) => {
      if(e.code === 'Space') {
        window.removeEventListener('keydown', onKeyDown)
        select('.splash').remove();
        setGameState('playing')
      };
    };
    window.addEventListener('keydown', onKeyDown)
  }
}