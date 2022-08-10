import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const headerList = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {headerList.map((item, index) => <th key={ index }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {expenses.map((each) => (
            <tr key={ each }>
              <td>{each.description}</td>
              <td>{each.tag}</td>
              <td>{each.method}</td>
              <td>{Number(each.value).toFixed(2)}</td>
              <td>{each.exchangeRates[each.currency].name}</td>
              <td>{Number(each.exchangeRates[each.currency].ask).toFixed(2)}</td>
              <td>
                {
                  Number(each.value * each.exchangeRates[each.currency].ask).toFixed(2)
                }
              </td>
              <td>BRL</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
