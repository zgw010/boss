import React from 'react';
import {
  List,
  InputItem,
  NavBar,
  Icon
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
import { getChatId } from '../../util.js';
const socket = io('ws://localhost:9093')
// socket.on('recvmsg', function(data) {
//   console.log(data);
// })
@connect(
  state => state, {
    getMsgList,
    sendMsg,
    recvMsg
  }
)


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
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text
    this.props.sendMsg({
      from,
      to,
      msg
    })
    // socket.emit('sendmsg', {
    //   text: this.state.text
    // })
    this.setState({
      text: ''
    })
  }
  componentDidMount() {
    //如果消息列表为空
    //这里有这判断是因为 获取消息放到了 dashboard 页面 ,可以把 getMsgList 拆分一下 未读消息数量显示和接收消息分开,然后把未读消息数量显示放在dashboard,把接受消息放在这里 就不用判断了

    if(!this.props.chat.chatmsg.length){
      //进入页面后接收消息列表
      this.props.getMsgList()
      //进入聊天页面后开始接收消息
      this.props.recvMsg()
    }
    

  }
  
  render() {
    // console.log(this.props.chat.chatmsg)
    const userid = this.props.match.params.user;
    const Item = List.Item;
    const users = this.props.chat.users;
    //console.log(this.props.match.params.user)
    // console.log(this.props.chat.users[userid])
    if(!users[userid]){
      return null;
    }
    // userid是和你聊天的用户id ,this,props.user._id 是你的id
    const chatId=getChatId(userid,this.props.user._id)
    //过滤chatmsg ,只显示和发给用户的信息
    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid===chatId);
    return (
      <div id="chat-page">
        <NavBar mode="dark" 
        className="chat-NavBar"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.goBack()}
        >{users[userid].name}</NavBar>
        <div style={{marginTop:45,marginBottom:45}}>
          {chatmsgs.map(v=>{
            // console.log(users)
            const avatar = require(`../img/${users[v.from].avatar}.png`)
            // return <p>ok</p>
            return v.from===userid?(
              <List key={v._id}>
                <Item thumb={avatar}>{v.content}</Item>
              </List>
            ):(
              <List key={v._id}>
                 <Item extra={<img src={avatar}/>} className="chat-me">{v.content}</Item>
              </List>
            )
           
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