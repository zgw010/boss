import React from 'react'
import {
  connect
} from 'react-redux'
import {
  getUserList
} from '../../reducers/chatuser'
import UserCard from '../usercard/usercard'

@connect(
  state => state.chatuser, {
    getUserList
  }
)

class Boss extends React.Component {
  componentDidMount() {
    this.props.getUserList('condidate')
  }
  render() {
    //console.log(this.state)
    return <UserCard userlist={this.props.userlist}/>
  }
}
export default Boss;