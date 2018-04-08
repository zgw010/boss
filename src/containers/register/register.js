import React from "react";
import Logo from "../../components/logo/logo"
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio
} from "antd-mobile";
import {
  connect
} from 'react-redux'
import {
  register
} from "../../reducers/login";
import {
  Redirect
} from "react-router-dom"
import formhoc from '../../components/form-hoc/form-hoc'


@connect(
  state => state.user, {
    register
  }
)
@formhoc
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount() {
    this.props.handleChange('type', 'condidate')
  }
  handleRegister() {
    //console.log(this.props.state)
    this.props.register(this.props.state)
    console.log(this.props.state)
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
            <InputItem onChange={v => this.props.handleChange("user", v)}>
              用户
            </InputItem>
            <InputItem type="password" onChange={v => this.props.handleChange("pwd", v)}>
              密码
            </InputItem>
            <InputItem type="password" onChange={v => this.props.handleChange("pwd2", v)}>
              确认密码
            </InputItem>
          </List>
          <WhiteSpace />
          <List>
            <RadioItem checked={this.props.state.type === "condidate"} onChange={() => this.props.handleChange("type", "condidate")}>
              condidate
            </RadioItem>
            <RadioItem checked={this.props.state.type === "boss"} onChange={() => this.props.handleChange("type", "boss")}>
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