import React from 'react';
import {
  List,
  InputItem,
  NavBar,
  Icon,
  Grid
} from 'antd-mobile'
import io from 'socket.io-client'
import {
  connect
} from 'react-redux'
import {
  getMsgList,
  sendMsg,
  recvMsg,
  readMsg
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
    recvMsg,
    readMsg
  }
)


class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
			showEmoji:false
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
			text:'',
			showEmoji:false
		})
  }
  //修复emoji bug
  fixCarousel(){
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
	}
  componentDidMount() {
    //如果消息列表为空
    //这里有这判断是因为 获取消息放到了 dashboard 页面 ,可以把 getMsgList 拆分一下 未读消息数量显示和接收消息分开,然后把未读消息数量显示放在dashboard,把接受消息放在这里 就不用判断了
    //目前已知一个bug,当数据库中没有chat时 进入dashboard和chat组件会重复recvMsg
    if(!this.props.chat.chatmsg.length){
      //进入页面后接收消息列表
      this.props.getMsgList()
      //进入聊天页面后开始接收消息
      this.props.recvMsg()
    }


  }
  componentWillUnmount(){
    // to 是当前聊天用户id
    const to=this.props.match.params.user;
    this.props.readMsg(to)
    // 之所以放到componentWillUnmount() 中,而不是 componentDidMount()中 是因为,如果放在componentDidMount()中 ,那么用户在聊天界面时,收到消息不能更新未读消息数
  }
  render() {
    // console.log(this.props.chat.chatmsg)
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))

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
              extra={
                <div>
                <span
                style={{marginRight:15}}
                onClick={()=>{
                  this.setState({
                    showEmoji:!this.state.showEmoji
                  })
                  this.fixCarousel()
                }}
              >😃</span>
              <span onClick={()=>this.handleSubmit()}>发送</span>
              </div>
                }
            ></InputItem>
          </List>
          {this.state.showEmoji?<Grid 
						data={emoji}
						columnNum={9}
						carouselMaxRow={4}
						isCarousel={true}
						onClick={el=>{
							this.setState({
								text:this.state.text+el.text
							})
							
						}}
					/>:null}
        </div>
      </div>
    )
  }
}
export default Chat;