import axios from "axios";
import {getRedirectPath} from '../util'
import { stat } from "fs";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOAD_DATA="LOAD_DATA"
const initState={
  redirectTo:'',
  isAuth:false,
  msg:'',
  user:'',
  // pwd:'',
  type:''
}
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, msg: "", redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload };
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg };
    case LOGIN_SUCCESS:
      return { ...state, msg: "", redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload };
    
    case LOAD_DATA:
      return {...state,...action.payload};
    default:
      return state;
  }
}
function registerSuccess (data){
  return {type:REGISTER_SUCCESS,payload:data}
}
function errorMsg (msg){
  return { msg,type: ERROR_MSG };
}
function loginSuccess(data){
  return { type: LOGIN_SUCCESS, payload: data };
}
export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo };
}
// export function userinfo(){
//   // 获取用户信息
//   //return dispatch=>{
//     axios.get("/user/info").then(res => {
//         if (res.status == 200) {
//           if (res.data.code === 0) {
//             // 有登录信息de
//             //this.props.loadData(res.data.data);
//           } else {
//             this.props.history.push("/login");
//           }
//         }
//       });
//   //}
  
    
//     //console.log(this.props);
//     //获取登录信息
//     // 是否登录
//     // url地址
//     // boss还是candidate
//     // 信息是否完善
// }

export function register ({user,pwd,pwd2,type}){
  
  if(!user||!pwd||!pwd2){
    return errorMsg('请填写完整后提交！');
  }
  if(pwd!==pwd2){
    return errorMsg("两次输入密码不一致！");
  }
  return dispatch=>{
    axios.post("/user/register", { user, pwd, type }).then(res => {
      //console.log(res.status, res.data.code);
      if (res.status == 200 && res.data.code === 0) {
        dispatch(registerSuccess({ user, pwd, type }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  }
  
}
export function login ({user,pwd}){
  if(!user||!pwd){
    return errorMsg('请填写完整！')
  }
  return dispatch => {
    axios.post("/user/login", { user, pwd }).then(res => {
      //console.log(res.status, res.data.code);
      if (res.status == 200 && res.data.code === 0) {
        dispatch(loginSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}