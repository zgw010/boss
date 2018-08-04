import React from 'react';
// 高阶组件（HOC）是react中对组件逻辑进行重用的高级技术。但高阶组件本身并不是React API。它只是一种模式，这种模式是由react自身的组合性质必然产生的。

// 具体而言，高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件
export default function formhoc(Comp) {
  return class WrapComp extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }
    // handleChange这个函数在很多组件中都用到了,所以用高阶组件来优化代码
    handleChange(key, val) {
      console.log(key, val)
      this.setState({
        [key]: val
      });
    }
    render() {
      return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
    }
  }
}