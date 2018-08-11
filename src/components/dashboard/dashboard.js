import React from 'react';
import {
  connect
} from 'react-redux'
import {
  NavBar
} from 'antd-mobile'
import NavLinkBar from '../navlink/navlink'
import {
  Route
} from 'react-router-dom'
import Boss from '../boss/boss'
import Condidate from '../condidate/condidate'
import User from '../user/user'
import Msg from '../msg/msg'
import {
  Redirect
} from 'react-router-dom'
import {
  getMsgList,
  recvMsg
} from '../../reducers/chat'
import QueueAnim from 'rc-queue-anim';




@connect(state => state, {
  getMsgList,
  recvMsg
})
class Dashboard extends React.Component {
  componentDidMount() {
    if(!this.props.chat.chatmsg.length){
      //进入页面后接收消息列表
      this.props.getMsgList()
      //进入聊天页面后开始接收消息
      this.props.recvMsg()
    }

  }
  render() {
    const {
      pathname
    } = this.props.location
    const user = this.props.user
    const navList = [{
      path: '/boss',
      text: 'condidate',
      icon: 'boss',
      title: 'condidates',
      component: Boss,
      hide: user.type === 'condidate'
    }, {
      path: '/condidate',
      text: 'bosses',
      icon: 'condidate',
      title: '招聘信息',
      component: Condidate,
      hide: user.type === 'boss'
    }, {
      path: '/msg',
      text: 'msg',
      icon: 'msg',
      title: 'msgs',
      component: Msg,

    }, {
      path: '/me',
      text: 'me',
      icon: 'user',
      title: '个人信息',
      component: User,

    }]
    //console.log(navList.find(v => v.path === pathname))
    //console.log(navList.find(v=>v.path=pathname))
    const page = navList.find(v => v.path === pathname);
    return page ? (
      <div>
        <NavBar className="fixd-header" mode='dard'>{page.title}</NavBar>

        <div style={{marginTop:45,bottom:100}}>

        {/* <QueueAnim type='scaleX'> */}


          <Route key={page.path} path={page.path} component={page.component}/>

        {/* </QueueAnim> */}
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    ) : <Redirect to='/Login' />
  }
}
export default Dashboard;