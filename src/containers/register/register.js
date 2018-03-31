import React from "react";
import Logo from "../../components/logo/logo"
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from "antd-mobile";
import { connect } from 'react-redux'
import { register } from "../../reducers/login";
import { Redirect } from "react-router-dom"

@connect(
  state=>state.user,
  {register}
)
  
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
    this.props.register(this.state)
    console.log(this.state)
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <List>
            {this.props.msg ? <p className="error-msg">
                {this.props.msg}
              </p> : null}
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
          <Button onClick={this.handleRegister} type="primary">
            注册
          </Button>
        </WingBlank>
      </div>;
  }
}
export default Register;
