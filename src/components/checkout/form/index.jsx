import './style.css'
import { Component } from 'react'
import Button from '../../custom-components/button'
import Modal from '../modal'

class Form extends Component {
  constructor() {
    super()
    this.state = {
      name: {value: "", error: "", isDirty: false},
      cardNumber: {value: "", error: "", isDirty: false},
      validityDate: {value: "", error: "", isDirty: false},
      cvv: {value: "", error: "", isDirty: false},
      cpf: {value: "", error: "", isDirty: false},
      formHasError: false,
      formErrorMessage: "",
      allowPayment: false,
      paymentWasSuccessful: false,
      payButtonText: "Refazer Sanduíche",
      payButtonDisabled: false,
      modalTitle: "",
      modalText: "",
      modalButtonText: "",
      displayModal: false,
      restart: false,
    }
    this.changeToDirty = this.changeToDirty.bind(this)
    this.contentValidation = this.contentValidation.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  changeToDirty($event) {
    switch($event.target.id) {
      case "name":
        this.setState({
          name: {
            ...this.state.name,
            isDirty: true
          }
        })
        break
      case "cardNumber":
        this.setState({
          cardNumber: {
            ...this.state.cardNumber,
            isDirty: true
          }
        })
        break
      case "validityDate":
        this.setState({
          validityDate: {
            ...this.state.validityDate,
            isDirty: true
          }
        })
        break
      case "cvv":
        this.setState({
          cvv: {
            ...this.state.cvv,
            isDirty: true
          }
        })
        break
      case "cpf":
        this.setState({
          cpf: {
            ...this.state.cpf,
            isDirty: true
          }
        })
        break
      default:
        return
    }
  }

  contentValidation($event) {
    let error = ""
    let formHasError = false
    let value = $event.target.value

    switch($event.target.id) {
      case "name":
        if (/\d/.test(value)) {
          error = "Um nome não pode conter números!"
          formHasError = true
        }
        this.setState({
          name: {
            ...this.state.name,
            value,
            error,
          },
          formHasError
        })
        break
      case "cardNumber":
        if (isNaN(value) || value.length !== 12) {
          error = "O cartão deve conter 12 dígitos e apenas números!"
          formHasError = true
        }
        this.setState({
          cardNumber: {
            ...this.state.cardNumber,
            value,
            error
          },
          formHasError
        })
        break
      case "validityDate":
        let currentDate = new Date();
        let currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0')
        let currentYear = String(currentDate.getFullYear())
        let informedMonth = value.substr(0, 2)
        let informedYear = value.substr(2, 4)
        
        console.log(informedYear === currentYear)
        if (informedYear < currentYear || (informedYear === currentYear && informedMonth < currentMonth) || value.length !== 6) {
          error = "A data deve conter 6 dígitos (ex: 032022) e não pode ser uma data anterior à atual!"
          formHasError = true
        }
        this.setState({
          validityDate: {
            ...this.state.validityDate,
            value,
            error,
          },
          formHasError
        })
        break
      case "cvv":
        if (isNaN(value) || value.length !== 3) {
          error = "O CVV deve conter 3 dígitos e apenas números!"
          formHasError = true
        }
        this.setState({
          cvv: {
            ...this.state.cvv,
            value,
            error
          },
          formHasError
        })
        break
      case "cpf":
        if (isNaN(value) || value.length !== 11) {
          error = "O CPF deve conter 11 dígitos e apenas números!"
          formHasError = true
        }
        this.setState({
          cpf: {
            ...this.state.cpf,
            value,
            error
          },
          formHasError
        })
        break
      default:
        return
    }
  }

  nextStep() {
    let allowPayment = true
    let formErrorMessage = ""

    if (this.state.formHasError) {
      formErrorMessage = "Por favor corrija o(s) erro(s) e tente novamente!"
      allowPayment = false
    } else {
      document.querySelectorAll('.input-content').forEach((element) => {
        if (element.value === "") {
          formErrorMessage = "Por favor preencha todos os campos e tente novamente!"
          allowPayment = false
        }
      })
    }
    if (allowPayment) {
      this.cardValidation()
    }
    this.setState({
      formErrorMessage,
      allowPayment,
    })
  }

  cardValidation() {
    let modalTitle = ""
    let modalText = ""
    let modalButtonText = ""
    let paymentWasSuccessful = false

    if (this.state.cardNumber.value === '111111111111') {
      modalTitle = "Pagamento Recusado"
      modalText = "Identificamos que você tentou inserir um número de cartão inválido para tentar nos enganar. Calote aqui não!"
      modalButtonText = "Me Desculpe!"
    } else {
      modalTitle = "Pagamento Aprovado com Sucesso"
      modalText = `Muito obrigado pela compra ${this.state.name.value}, ela foi computada no cartão de final ${this.state.cardNumber.value.substr(8)}. Esperamos que tenha um excelente lanche e que possamos vos atender mais vezes!`
      modalButtonText = "Ok"
      paymentWasSuccessful = true
    }
    this.setState({
      modalTitle,
      modalText,
      modalButtonText,
      paymentWasSuccessful,
      displayModal: true
    })
  }

  closeModal() {
    if (this.state.paymentWasSuccessful) {
      this.setState({
        displayModal: false,
        payButtonDisabled: true,
        payButtonText: "Novo Sanduíche"
      })
    } else {
      this.setState({
        displayModal: false
      })
    }
  }

  render() {
    return(
      <>
        <form className="payment-form">
          <fieldset className="form-group">
            <label className='label-name' htmlFor="name">Nome:</label>
            <input className='input-content'
              id="name"
              type="text"
              placeholder="Seu nome completo"
              onBlur={ this.changeToDirty }
              onChange={ this.contentValidation }
            />
            { (this.state.name.isDirty && this.state.name.error) &&
              <p className='error-message'>{this.state.name.error}</p> }
          </fieldset>
          <fieldset className="form-group">
            <label className='label-name' htmlFor="cardNumber">Número do Cartão:</label>
            <input className='input-content'
              id="cardNumber"
              type="text"
              placeholder="Somente números"
              onBlur={ this.changeToDirty }
              onChange={ this.contentValidation }
            />
            { (this.state.cardNumber.isDirty && this.state.cardNumber.error) &&
              <p className='error-message'>{this.state.cardNumber.error}</p> }
          </fieldset>
          <div className="card-flex-container">
            <fieldset className="form-group">
              <label className='label-name' htmlFor="validityDate">Data de Vencimento:</label>
              <input className='input-content'
                id="validityDate"
                type="number"
                placeholder="Mês e ano (ex: 032022)"
                onBlur={ this.changeToDirty }
                onChange={ this.contentValidation }
              />
              { (this.state.validityDate.isDirty && this.state.validityDate.error) &&
              <p className='error-message date-error'>{this.state.validityDate.error}</p> }
            </fieldset>
            <fieldset className="form-group">
              <label className='label-name' htmlFor="cvv">CVV:</label>
              <input className='input-content'
                id="cvv"
                type="number"
                placeholder="3 dígitos"
                onBlur={ this.changeToDirty }
                onChange={ this.contentValidation }
              />
              { (this.state.cvv.isDirty && this.state.cvv.error) &&
              <p className='error-message cvv-error'>{this.state.cvv.error}</p> }
            </fieldset>
          </div>
          <fieldset className="form-group">
            <label className='label-name' htmlFor="cpf">CPF:</label>
            <input className='input-content'
              id="cpf"
              type="text"
              placeholder="Somente números"
              onBlur={ this.changeToDirty }
              onChange={ this.contentValidation }
            />
            { (this.state.cpf.isDirty && this.state.cpf.error) &&
              <p className='error-message'>{this.state.cpf.error}</p> }
          </fieldset>
        </form>
        <section className='btn-section'>
          <Button className='clear-btn' handleclick={this.props.restartApp}>{this.state.payButtonText}</Button>
          <Button className='continue-btn' handleclick={this.nextStep} disabled={this.state.payButtonDisabled}>Pagar</Button>
        </section>
        { !(this.state.allowPayment) && 
          <p className='error-message form-error'>{this.state.formErrorMessage}</p>}
        { this.state.displayModal &&
          <Modal
            title={this.state.modalTitle}
            text={this.state.modalText}
          >
            <Button className='modal-button' handleclick={this.closeModal}>{this.state.modalButtonText}</Button>
          </Modal>
        }
      </>
    )
  }
}

export default Form