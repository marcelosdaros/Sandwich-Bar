import './style.css'
import { Component } from 'react'

class Button extends Component {
  render() {
    return(
      <button {...this.props} onClick={this.props.handleclick}>{this.props.children}</button>
    )
  }
}

export default Button