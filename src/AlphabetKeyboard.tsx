import { Component } from "preact";

export default class AlphabetKeyboard extends Component {

  chars:string = "abcdefghijklmnopqrstuvwxyz"

  render() {
    return <div class="input-name-standalone">
      {this.chars.split('').map(d => <span class="letter">{d}</span>)}
    </div>;
  }
}
