import './style.css'
import { Component } from 'react'

class Modal extends Component {
  render() {
    return(
      <section className="modal-wrapper">
        <div className="modal">
          <h2 className='title'>{ this.props.title }</h2>
          <div className='text'>{ this.props.text }</div>
          { this.props.children }
        </div>
      </section>
    )
  }
}

export default Modal