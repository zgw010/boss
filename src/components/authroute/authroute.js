import React from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
@withRouter
class AuthRoute extends React.Component{
  componentDidMount(){

        //console.log(axios);

    const publicList=['/login','/register']
    const pathname = this.props.location.pathname
    //console.log(pathname);
    if(publicList.indexOf(pathname)===-1){
        axios.get("/user/info").then(res => {
          if (res.status === 200) {
            if (res.data.code === 0) {
              //有登录信息
            } else {
              //console.log(this.props.history);
              this.props.history.push("./login");
            }
            console.log(res.data);
          }
        });
    }
    
    //console.log(this.props);
    
    //获取登录信息
    // 是否登录
    // url地址
    // boss还是candidate
    // 信息是否完善
  }
  render(){
      return <h1>ok</h1>
    }
}
export default AuthRoute