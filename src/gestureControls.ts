import Hammer from 'hammerjs';

console.log('gestures called')

export default class Gestures {
  constructor() {
    const body = document.querySelector('body');
    const gestures = new Hammer(body);
    
    gestures.on("panleft panright tap press", function(ev) {
      console.log(ev.type)
    });
  }
};
