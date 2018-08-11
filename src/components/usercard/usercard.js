import React from 'react'
import {
  Card,
  WhiteSpace,
  WingBlank
} from 'antd-mobile'
import PropTypes from 'prop-types'
import {
  withRouter
} from 'react-router-dom'


@withRouter
class UserCard extends React.Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
  handleClick(v) {
    //console.log(this.props.history)
    //console.log(v)
    this.props.history.push(`/chat/${v._id}`)
  }
  render() {
    return (
      <WingBlank>
        <WhiteSpace/>
        {this.props.userlist.map(v=>(
          v.avatar?(
            <Card 
              key={v._id}
              onClick={()=>this.handleClick(v)}
            >
              <Card.Header 
                title={v.user} 
                thumb={require(`../img/${v.avatar}.png`)} 
                extra={<span>{v.title}</span>}>
              </Card.Header>
              <Card.Body>
                {v.type==='boss'?<div>公司:{v.company}</div>:null}
                {v.desc?(v.desc.split('\n').map(d=>(
                  <div key={d}>{d}</div>
                ))):null}
                {v.type==='boss'?<div>薪资:{v.money}</div>:null}
              </Card.Body>
          </Card>
          ):null
        ))}
        <WhiteSpace/>
      </WingBlank>

    )
  }

}
export default UserCard