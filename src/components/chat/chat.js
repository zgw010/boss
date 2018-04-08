import React from 'react';
import {
  List,
  InputItem
} from 'antd-mobile'
import io from 'socket.io-client'
import {
  connect
} from 'react-redux'
import {
  getMsgList,
  sendMsg,
  recvMsg
} from '../../reducers/chat'
const socket = io('ws://localhost:9093')

// @connect(
//   state => state, {
//     getMsgList,
//     sendMsg,
//     recvMsg
//   }
// )


class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  handleSubmit() {
    console.log('ke yi dian ji')
    // console.log(this.state)
    // const from = this.props.user._id;
    // const to = this.props.match.params.user;
    // const msg = this.state.text
    // this.props.sendMsg({
    //   from,
    //   to,
    //   msg
    // })
    socket.emit('sendmsg', {
      text: this.state.text
    })
    this.setState({
      text: ''
    })
    //console.log(this.state)
  }
  componentDidMount() {
    socket.on('recvmsg', (data) => {
      this.setState({
        msg: [...this.state.msg, data.text]
      })
      console.log(data)
    })
    // this.props.getMsgList()
    // this.props.recvMsg()
    // socket.on('recvmsg', (data) => {
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   })
    // })
  }
  render() {
    //console.log(this.props.match.params.user)
    return (
      <div>
        <div>
          {this.state.msg.map(v=>{
            return <p key={v}>{v}</p>
          })}
        </div>
        <div className="stick-footer">
          <List>
            <InputItem
              focus='true'
              value={this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
            ></InputItem>
          </List>
        </div>
      </div>
    )
  }
}
export default Chat;