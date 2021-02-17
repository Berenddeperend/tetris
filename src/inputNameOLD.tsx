import { Component, createRef } from "preact";

const lastUsedNickname = window.localStorage.getItem("lastUsedNickname");

export default class InputName extends Component<
  { onNameChange: (e:InputEvent) => void },
  { nickName: string }
> {
  ref = createRef();

  constructor() {
    super();
    this.state = {
      nickName: lastUsedNickname,
    };
  }

  setNickName = (e) => { //todo: typing
    this.setState({ nickName: e.target.value });
    this.props.onNameChange(e)
    window.localStorage.setItem("lastUsedNickname", e.target.value);
  };

  componentDidMount() {
    this.ref.current.focus();
  }

  render() {
    return (
      <input
        maxLength={6}
        ref={this.ref}
        type="text"
        value={this.state.nickName}
        class="input-name"
        spellcheck={false}
        onInput={this.setNickName}
      />
    );
  }
}
