import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { expenses, email } = this.props;
    const totalValue = expenses.reduce((acc, cur) => (
      acc + Number(cur.value) * Number(cur.exchangeRates[cur.currency].ask)
    ), 0);
    const totalFixedValue = totalValue.toFixed(2);
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{totalFixedValue}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  expenses: store.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(Header);
