import { html, render, PreactNode } from "./dom";
import { Component, createRef } from "preact";

export default class InputName extends Component<{}, { nickName:string }> {
  ref = createRef();
  
  constructor() {
    super();
    this.state = {
      nickName: ""
    }
  }

  setNickName(e) {
    console.log(e)
  }

  componentDidMount() {
    console.log(this.ref.current)
  }

  render() {
    return html`
      <input type="text"  onInput=${()=> this.setNickName} />
    `
  }
}
