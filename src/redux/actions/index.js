import { USER_EMAIL, FETCH_CURRENCY, ADD_NEW_EXPENSE } from './types';

export const userEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const currencyRequest = (currency) => ({
  type: FETCH_CURRENCY,
  currency,
});

export const fetchThunk = () => async (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = await response.json();
  dispatch(currencyRequest(data));
};

export const addNewExpense = (info) => async (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = await response.json();
  dispatch({ type: ADD_NEW_EXPENSE, info, data });
};
