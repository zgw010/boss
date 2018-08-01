import {
  combineReducers
} from 'redux';
import {
  user
} from './login'
import {
  chatuser
} from './chatuser'
import {
  chat
} from './chat'
//合并所有reducer
export default combineReducers({
  user,
  chatuser,
  chat
})