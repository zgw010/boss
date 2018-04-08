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

class Condidate extends React.Component {
  componentDidMount() {
    this.props.getUserList('boss')
  }
  render() {
    //console.log(this.state)
    return <UserCard userlist={this.props.userlist}/>
  }
}
export default Condidate;