import React from "react";
import {
  Grid,
  List
} from "antd-mobile";
import PropTypes from 'prop-types';

class AvatarSelect extends React.Component {


  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const avatarlist = "boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra"
      .split(",")
      .map(v => ({
        icon: require(`../img/${v}.png`),
        text: v
      }));
    const gridHeadr = this.state.icon ? <div>
        <span>已选择的头像</span>
        <img style={{ width: 20 }} src={this.state.icon} alt="" />
      </div> : <div>请选择头像</div>;
    return <div>
        <Grid data={avatarlist} columnNum={5} onClick={e => {
            console.log(e);
            this.setState(e);
            this.props.selectAvatar(e.text);
          }} />
        <List renderHeader={() => gridHeadr} />
        {}
      </div>;
  }
}
AvatarSelect.propTypes = {
  selectAvatar: PropTypes.func.isRequired
};
export default AvatarSelect;