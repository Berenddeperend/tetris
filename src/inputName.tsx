import { Component, createRef } from "preact";

const lastUsedNickname = window.localStorage.getItem('lastUsedNickname');


export default class InputName extends Component<{}, { nickName:string }> {
  ref = createRef();
  
  constructor() {
    super();
    this.state = {
      nickName: lastUsedNickname
    }
  }

  setNickName = (e) => {
    this.setState({ nickName: e.target.value })
    window.localStorage.setItem('lastUsedNickname', e.target.value)
  }

  componentDidMount() {
    // console.log(this.ref)
    this.ref.current.focus();
  }

  render() {
    return <input maxlength="6" ref={this.ref} type="text" value={this.state.nickName} class="input-name" onInput={this.setNickName} />
  }
}
