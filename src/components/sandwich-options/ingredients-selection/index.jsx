import './style.css';
import { Component } from 'react';

class IngredientsSelection extends Component {
  render() {
    const { children, renderIngredients, currentIngredients } = this.props
    
    return(
      <div className='selection-wrapper'>
        <h2 className='selection-title'>{ children }</h2>
        {renderIngredients(currentIngredients)}
      </div>
    )
  }
}

export default IngredientsSelection