import axios from "axios";

const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR_MSG = "ERROR_MSG";

const initState={
  isAuth:'',
  msg:'',
  user:'',
  pwd:'',
  type:''
}
export function user (state,action){
  switch(action.type){
    case REGISTER_SUCCESS:
    case ERROR_MSG:
    default :
      return state;
  }
}
function errorMsg (msg){
  return { msg,type: ERROR_MSG };
}
export function register ({user,pwd,pwd2,type}){
  if(!user||!pwd||!pwd2){
    return errorMsg('请填写完整后提交！');
  }
  if(pwd!==pwd2){
    return errorMsg("两次输入密码不一致！");
  }
  return dispatch=>{
    axios.post("/user/register", { user, pwd, pwd2, type }).then(res => {
      if (res.state === 200 && res.data.code === 0) {
        dispatch(REGISTER_SUCCESS({ user, pwd, pwd2, type }));
      } else {
        dispatch(ERROR_MSG(res.data.msg));
      }
    });
  }
  
}