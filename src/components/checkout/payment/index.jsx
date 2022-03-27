import './style.css'
import { Component } from 'react'

class Payment extends Component {

  render() {
    return(
      <section className='payment-data'>
        <h2 className='payment-title'>Insira os dados do pagamento:</h2>
        { this.props.children }
      </section>
    )
  }
}

export default Payment