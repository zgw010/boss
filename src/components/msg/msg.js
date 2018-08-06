import React from 'react';
import {
  connect
} from 'react-redux'
import {
  List,
  Badge
} from 'antd-mobile'
@connect(state=>state)
class Msg extends React.Component {
  render() {
    if(!this.props.chat.chatmsg.length){
      return null;
    }
    const Item=List.Item;
    const Brief=Item.Brief;
    // 当前的登录用户id
    const userid = this.props.user._id
    // 按照聊天用户分组,根据唯一的chatid
    const msgGroup={};
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid]=msgGroup[v.chatid]||[];
      msgGroup[v.chatid].push(v)
    })
    const chatList=Object.values(msgGroup).sort((a,b)=>{console.log(b[b.length-1].create_time,a[a.length-1].create_time); return b[b.length-1].create_time-a[a.length-1].create_time})
    console.log(chatList)
    return (
      <div>
        
          {
            chatList.map(v=>{
              const vLast=v[v.length-1];
              const targetId = vLast.from===userid?vLast.to:vLast.from;
              const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
              return (
                <List key={vLast._id}>
                <Item 
                extra={<Badge text={unreadNum}></Badge>}
                thumb={require(`../img/${this.props.chat.users[targetId].avatar}.png`)}
                arrow="horizontal"
                onClick={()=>{
                  this.props.history.push(`/chat/${targetId}`)
                }}
                >
                {vLast.content}
                <Brief>{this.props.chat.users[targetId].name}</Brief>

                </Item>
                </List>
              )
            })
              
            
          }
      </div>
    );
  }
}

export default Msg;