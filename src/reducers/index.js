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
export default combineReducers({
  user,
  chatuser,
  chat
})