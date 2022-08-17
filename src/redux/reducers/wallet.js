import { FETCH_CURRENCY, ADD_NEW_EXPENSE, DELETE_EXPENSE } from '../actions/types';

const INITIAL_STATE = {
  currencies: [],
  expenseId: 0,
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCY:
    return {
      ...state,
      currencies: Object.keys(action.currency).filter((element) => element !== 'USDT'),
    };
  case ADD_NEW_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...action.info,
          exchangeRates: action.data,
        },
      ],
      expenseId: state.expenseId + 1,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((e) => e.id !== action.param),
    };
  default:
    return state;
  }
};

export default walletReducer;
