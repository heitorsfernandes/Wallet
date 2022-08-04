import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchThunk, addNewExpense } from '../redux/actions';

const alimentacao = 'Alimentação';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao,
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { newExpense } = this.props;
    newExpense(this.state);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentacao });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor
            <input
              type="number"
              id="value"
              name="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="textArea"
              id="description"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              id="currency"
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((currencyName) => (
                <option
                  key={ currencyName }
                  value={ currencyName }
                >
                  { currencyName }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Pagamento
            <select
              id="method"
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria
            <select
              id="tag"
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  newExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchThunk()),
  newExpense: (infos) => dispatch(addNewExpense(infos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
