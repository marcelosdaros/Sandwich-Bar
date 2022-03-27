import './style.css'
import { Component } from 'react';

class SelectedIngredientsMenu extends Component {

  render() {
    return (
      <div className='section-selected-ing'>
        <h2 className='selected-ing-title'>Ingredientes Selecionados</h2>
        <ul className='selected-ingredients'>
        </ul>
        <div className="end-section-selected-ing">
          <h3 className='total-value'>{`Total: R$${this.props.totalPrice}`}</h3>
          <div className='btn-wrapper'>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}

export default SelectedIngredientsMenu