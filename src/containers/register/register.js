import React from "react";
import Logo from "../../components/logo/logo"
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from "antd-mobile";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pwd: "",
      pwd2: "",
      type: "condidate"
    };
    this.handleRegister=this.handleRegister.bind(this)
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }
  handleRegister(){
    console.log(this.state)
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return <div>
        <Logo />
        <WingBlank>
          <List>
            <InputItem onChange={v => this.handleChange("user", v)}>
              用户
            </InputItem>
            <InputItem type="password" onChange={v => this.handleChange("pwd", v)}>
              密码
            </InputItem>
            <InputItem type="password" onChange={v => this.handleChange("pwd2", v)}>
              确认密码
            </InputItem>
          </List>
          <WhiteSpace />
          <List>
            <RadioItem checked={this.state.type === "condidate"} onChange={() => this.handleChange("type", "condidate")}>
              condidate
            </RadioItem>
            <RadioItem checked={this.state.type === "boss"} onChange={() => this.handleChange("type", "boss")}>
              boss
            </RadioItem>
          </List>
          <WhiteSpace />
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>
            注册
          </Button>
        </WingBlank>
      </div>;
  }
}
export default Register;
