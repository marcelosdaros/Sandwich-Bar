import './style.css'
import { Component } from 'react'

class Summary extends Component {
  constructor() {
    super()
    this.buildOrderSummary = this.buildOrderSummary.bind(this)
  }

  buildOrderSummary() {
    let saladExists = false
    let complementExists = false
    let formattedSalads = ""
    let formattedComplements = ""
    let { salads, complements, selectedIngredients, totalPrice } = this.props

    if (selectedIngredients.length > 3) {
      for (let i = 3; i < selectedIngredients.length; i++) {
        if (salads.includes(selectedIngredients[i])) {
          if (!saladExists) {
            formattedSalads += `${selectedIngredients[i]}`
            saladExists = true
          } else {
            formattedSalads += `, ${selectedIngredients[i]}`
          }
        }
        else if (complements.includes(selectedIngredients[i])) {
          if (!complementExists) {
            formattedComplements += `${selectedIngredients[i]}`
            complementExists = true
          } else {
            formattedComplements += `, ${selectedIngredients[i]}`
          }
        }
      }
    }
    if (formattedSalads === "") {
      formattedSalads += '-'
    }
    if (formattedComplements === "") {
      formattedComplements += '-'
    }

    return (
      <ul className="ingredients-list">
        <li key={`${selectedIngredients[0]}`} className="ingredient">{`Pão: ${selectedIngredients[0]}`}</li>
        <li key={`${selectedIngredients[1]}`} className="ingredient">{`Carne: ${selectedIngredients[1]}`}</li>
        <li key={`${selectedIngredients[2]}`} className="ingredient">{`Queijo: ${selectedIngredients[2]}`}</li>
        <li key={`salads`} className="ingredient">{`Saladas: ${formattedSalads}`}</li>
        <li key={`complements`} className="ingredient">{`Complementos: ${formattedComplements}`}</li>
        <li key={`price`} className="price">{`Total: R$${totalPrice.toFixed(2)}`}</li>
      </ul>
    )
  }

  render() {
    return (
      <section className='order-summary'>
        <h2 className='thanks-message'>Obrigado pela Preferência!</h2>
        <h2 className='order-summary-title'>Resumo do Pedido:</h2>
        { this.buildOrderSummary() }
      </section>
    )
  }
}

export default Summary