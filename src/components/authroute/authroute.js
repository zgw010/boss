import React from 'react';
import axios from 'axios'
import {
  withRouter
} from 'react-router-dom'
import {
  loadData
} from '../../reducers/login'
import {
  connect
} from 'react-redux'
//用withRouter包裹下这个组件,为了使用this.props.history等属性
@withRouter
@connect(
  null, {
    loadData
  }
)
class AuthRoute extends React.Component {
  componentDidMount() {
    const publicList = ['/login', '/register'] //定义无需跳转的页面
    const pathname = this.props.location.pathname
    //如果是无需跳转的页面,不作任何操作
    if (publicList.indexOf(pathname) > -1) {
      return null;
    }
    // 获取用户信息
    axios.get("/user/info").then(res => {
      if (res.status === 200) {
        //console.log(this.props)
        if (res.data.code === 0) {
          // 有登录信息de
          this.props.loadData(res.data.data);
        } else {
          this.props.history.push("/login");
        }
      }
    });

    //console.log(this.props);
    //获取登录信息
    // 是否登录
    // url地址
    // boss还是candidate
    // 信息是否完善
  }
  render() {
    return null;
  }
}
export default AuthRoute