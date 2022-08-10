import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  delete = (param) => {
    const { deleteAction } = this.props;
    deleteAction(param);
  };

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
            {headerList.map((item) => <th key={ item }>{item}</th>)}
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
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.delete(each.id) }
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleteAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteAction: (id) => dispatch(deleteExpense(id)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
