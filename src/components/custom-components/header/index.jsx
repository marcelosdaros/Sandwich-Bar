import './style.css'
import { Component } from 'react'

class Header extends Component {

  render() {
    const {...props} = this.props

    return(
      <header className='header'>
        <h1 className='header-title'>{ props.children }</h1>
      </header>
    )
  }
}

export default Header