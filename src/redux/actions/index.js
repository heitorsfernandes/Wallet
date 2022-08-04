import { USER_EMAIL, FETCH_CURRENCY } from './types';

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
  console.log(data);
  dispatch(currencyRequest(data));
};
