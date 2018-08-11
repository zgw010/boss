import axios from 'axios'
import io from 'socket.io-client'


const socket = io('ws://localhost:9093')
//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读取消息
const MSG_RECV = 'MSG_RECV'
//标记消息是否已读
const MSG_READ = 'MSG_READ'

const initstate = {
  chatmsg: [],
  users:{},
  unread: 0
}

export function chat(state = initstate, action) {
  switch (action.type) {
    case MSG_LIST:
      return { ...state,
        users:action.payload.users,
        chatmsg: action.payload.msgs,
        unread: action.payload.msgs.filter(v => !v.read&&v.to===action.payload.userid).length
      }
    case MSG_RECV:
      const n=action.payload.to===action.userid?1:0;
      return { ...state,
        chatmsg: [...state.chatmsg, action.payload],
        unread:state.unread+n
      }
      case MSG_READ:
      console.log(state.chatmsg)
      const {from} = action.payload;
        return {...state,
          unread:state.unread-action.payload.num,
          // chatmsg:state.chatmsg.map(v=>{
          //   v.read=true;
          //   return v;
          // })
          chatmsg:state.chatmsg.map(v=>({
            ...v,read:v.from===from?true:v.read
          }))
        }
    default:
      return state;
  }
}
// msgs 是用户的未读消息 ,users是聊天用户的信息
function msgList(msgs,users,userid) {
  return {
    type: 'MSG_LIST',
    payload: {msgs,users,userid}
  }
}

export function getMsgList() {
  return (dispatch,getState) => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          const userid = getState().user._id;
          dispatch(msgList(res.data.msgs,res.data.users,userid))
        }
      })
  }
}
export function sendMsg({
  from,
  to,
  msg
}) {
  return dispatch => {
    socket.emit('sendmsg', {
      from,
      to,
      msg
    })
  }
}

function msgRecv(msg,userid) {
  return {
    type: 'MSG_RECV',
    payload: msg,
    userid
  }
} 
export function recvMsg() {
  return (dispatch,getState) => {
    socket.on('recvmsg', function(data) {
      const userid = getState().user._id;
      dispatch(msgRecv(data,userid))
    })
  }
}

// from 是发送者 to是接受者 num 是未读消息数
function msgRead({from,to,num}){
  return {
    type:'MSG_READ',
    payload:{from,to,num}
  }
}
// 把他人发给用户的信息标为已读
// async+await
export function readMsg(from){
  return async (dispatch,getState)=>{
    const res = await axios.post('/user/readmsg',{from});
    // const res2 = await axios.post('/user/xxx',{from});

    const userid = getState().user._id;
    if(res.status===200&&res.data.code===0){
      dispatch(msgRead({userid,from,num:res.data.num}))
    }
  }
}