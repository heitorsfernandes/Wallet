import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  validateLogin = () => {
    const { email, password } = this.state;
    const minPassword = 6;
    const validEmail = /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(validEmail) && password.length >= minPassword) {
      return false;
    }
    return true;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.setState({ isDisabled: this.validateLogin() });
    });
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(userEmail(email));
    history.push('/carteira');
  };

  render() {
    const { isDisabled, email, password } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            id="email"
            data-testid="email-input"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            data-testid="password-input"
            value={ password }
            name="password"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
