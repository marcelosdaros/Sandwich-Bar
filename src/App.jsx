import './reset.css';
import './App.css';
import burgerImg from './images/hamburguer-icon.png';
import { Component } from 'react';
import Header from './components/custom-components/header';
import Button from './components/custom-components/button';
import IngredientsSelection from './components/sandwich-options/ingredients-selection';
import SelectedIngredientsMenu from './components/sandwich-options/selected-ingredients-menu';
import Summary from './components/checkout/summary';
import Payment from './components/checkout/payment';
import Form from './components/checkout/form';

class App extends Component {
  constructor() {
    super()
    this.breads = [
      {item: 'Australiano', price: 4},
      {item: 'Brioche', price: 5},
      {item: 'Gergelim', price: 3},
      {item: 'Sal', price: 2.5}
    ]
    this.meats = [
      {item: 'Bovina', price: 8},
      {item: 'Porco', price: 6},
      {item: 'Frango', price: 4},
      {item: 'Vegetariano', price: 6}
    ]
    this.cheeses = [
      {item: 'Molho Gorgonzola', price: 8},
      {item: 'Prato', price: 6},
      {item: 'Cheddar', price: 6},
      {item: 'Sem queijo', price: 0}
    ]
    this.salads = [
      {item: 'Alface', price: 1},
      {item: 'Tomate', price: 2},
      {item: 'Cebola', price: 2},
      {item: 'Picles', price: 4}
    ]
    this.complements = [
      {item: 'Bacon', price: 4},
      {item: 'Cebola Caramelizada', price: 2},
      {item: 'Molho Especial', price: 3},
      {item: 'Pimenta Jalapeño', price: 3}
    ]
    this.state = {
      appTitle: 'Monte seu Sanduíche',
      currentSelection: 'Pão',
      currentIngredients: this.breads,
      selectedIngredients: [],
      formattedIngredients: "",
      continueBtnDisabled: true,
      totalPrice: 0,
    }

    this.renderIngredients = this.renderIngredients.bind(this)
    this.addIngredient = this.addIngredient.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.buildSelectionTitle = this.buildSelectionTitle.bind(this)
    this.updateIngredientButton = this.updateIngredientButton.bind(this)
    this.restartApp = this.restartApp.bind(this)
  }

  renderIngredients() {
    return this.state.currentIngredients.map((ingredient, index) =>
          <Button key={index} className='ingredient-btn' handleclick={this.addIngredient}>{ingredient.item}</Button>)
  }

  addIngredient($event) {
    let { currentSelection, currentIngredients, selectedIngredients, totalPrice} = this.state
    const eventText = $event.target.innerText

    currentIngredients.forEach((ingredient) => {
      if (ingredient.item === eventText) {
        totalPrice += ingredient.price
      }
    })
    selectedIngredients.push(eventText)
    this.updateIngredientButton(currentSelection, $event.target)
    
    this.setState({
      selectedIngredients,
      totalPrice,
      continueBtnDisabled: false
    })

    const newIngredient = this.createIngredientHTML(eventText)
    document.querySelector('.selected-ingredients').appendChild(newIngredient)
  }

  updateIngredientButton(currentSelection, button) {
    if (currentSelection === 'Pão' || currentSelection === 'Carne' || currentSelection === 'Queijo') {
      document.querySelectorAll('.ingredient-btn').forEach((element) => {
        element.disabled = true
      })
    } else {
      button.disabled = true
    }
  }

  createIngredientHTML(ingredient) {
    const newIngredient = document.createElement('li')
    newIngredient.key = `Ingredient ${ingredient}`
    newIngredient.className = 'ingredients'
    newIngredient.textContent = `${this.state.currentSelection}: ${ingredient}`
    return newIngredient
  }

  restartApp() {
    this.setState({
      appTitle: 'Monte seu Sanduíche',
      currentSelection: 'Pão',
      currentIngredients: this.breads,
      selectedIngredients: [],
      continueBtnDisabled: true,
      totalPrice: 0
    })

    const ingredientsList = document.querySelector('.selected-ingredients')
    if (ingredientsList != null) {
      while (ingredientsList.firstChild) {
        ingredientsList.firstChild.remove()
      }
      document.querySelectorAll('.ingredient-btn').forEach((element) => {
        element.disabled = false
      })
    }
  }

  nextStep() {
    let { currentSelection, currentIngredients } = this.state
    switch (currentSelection) {
      case 'Pão':
        currentIngredients = this.meats
        currentSelection = 'Carne'
        this.setState({
          continueBtnDisabled: true
        })
        break
      case 'Carne':
        currentIngredients = this.cheeses
        currentSelection = 'Queijo'
        this.setState({
          continueBtnDisabled: true
        })
        break
      case 'Queijo':
        currentIngredients = this.salads
        currentSelection = 'Salada'
        break
      case 'Salada':
        currentIngredients = this.complements
        currentSelection = 'Complemento'
        break
      case 'Complemento':
        currentSelection = 'Checkout'
        this.setState({
          appTitle: 'Pague seu Sanduíche'
        })
        break
      default:
        currentIngredients = this.breads
        currentSelection = 'Pão'
        this.setState({
          continueBtnDisabled: true
        })
        break
    }

    this.setState({ currentSelection, currentIngredients })
    document.querySelectorAll('.ingredient-btn').forEach((element) => {
      element.disabled = false
    })
  }

  buildSelectionTitle(currentSelection) {
    if (currentSelection === 'Pão' || currentSelection === 'Queijo' || currentSelection === 'Complemento') {
      return `Escolha seu ${currentSelection.toLowerCase()}`
    } else {
      return `Escolha sua ${currentSelection.toLowerCase()}`
    }
  }

  render() {
    return (
      <div className='site-content'>
        <Header>{ this.state.appTitle }</Header>
        <section className='section-wrapper'>
          <section className="flex-container-1">
            <img src={burgerImg} className='burger-img' alt='Burger'/>
            { this.state.currentSelection !== "Checkout" &&
              <IngredientsSelection
                renderIngredients={this.renderIngredients}
                currentIngredients={this.state.currentIngredients}
              >
                {`${this.buildSelectionTitle(this.state.currentSelection)}`}
              </IngredientsSelection>}
            { this.state.currentSelection === "Checkout" &&
              <Summary
                salads={ this.salads.map((element) => {return element.item}) }
                complements={ this.complements.map((element) => {return element.item}) }
                selectedIngredients={ this.state.selectedIngredients }
                totalPrice={ this.state.totalPrice }
              />}
          </section>
          <section className="flex-container-2">
            { this.state.currentSelection !== "Checkout" &&
              <SelectedIngredientsMenu 
                totalPrice={ this.state.totalPrice.toFixed(2) }
              >
                <Button className='clear-btn' handleclick={this.restartApp}>Recomeçar</Button>
                <Button className='continue-btn' handleclick={this.nextStep} disabled={this.state.continueBtnDisabled}>Prosseguir</Button>
              </SelectedIngredientsMenu>}
            { this.state.currentSelection === "Checkout" &&
              <Payment >
                <Form restartApp={ this.restartApp }/>
              </Payment>}
          </section>
        </section>
      </div>
    )
  }
}

export default App;