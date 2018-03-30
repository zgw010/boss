import React from "react";
import './logo.css'
import logoImg from './logo.png'
class Logo extends React.Component {
  render() {
    return (
      <div className="logo-container">
        <img src={logoImg} alt=""/>
      </div>
    )
  }
}
export default Logo;
