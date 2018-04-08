import React from 'react'
import {
  connect
} from 'react-redux'
import {
  Result,
  List,
  WhiteSpace,
  Modal
} from 'antd-mobile';
import browserCookie from 'browser-cookies'
import {
  logoutSubmit
} from '../../reducers/login' //这里虽然是引入login但是这里是引入注销  删除state信息
import {
  Redirect
} from 'react-router-dom'
@connect(
  state => state.user, {
    logoutSubmit
  })
class User extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout() {
    Modal.alert('退出登录', '确定退出登录吗?', [{
      text: '取消',
      onPress: () => console.log('cancel')
    }, {
      text: '确认',
      onPress: () => {
        browserCookie.erase('userid');
        this.props.logoutSubmit()
        window.location.href = window.location.href //刷新当前页
      }
    }, ])

  }

  render() {
    const Item = List.Item;
    const Brief = Item.Brief;
    //console.log(this.props)
    return this.props.user ? (
      <div>
        <Result 
          img={<img src={require(`../img/${this.props.avatar}.png`)} className="spe am-icon am-icon-md" alt="" />}
          title = {this.props.user}
          message={this.props.type==='boss'?this.props.company:null}
        >
        </Result>
        <List renderHeader={() => '个人信息'} className="my-list">
          <Item  multipleLine>
            {this.props.title}
            {this.props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)} 
            {this.props.money?<Brief>薪资:{this.props.money}</Brief>:null}
          </Item>
        
        </List>
        <WhiteSpace></WhiteSpace>
        <List className="my-list">
        
          <Item onClick={this.logout}>
            退出登录
          </Item>
          
        </List>
      </div>
    ) : <Redirect to={this.props.redirectTo}/>
  }
}
export default User;