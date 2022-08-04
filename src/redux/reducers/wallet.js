import { FETCH_CURRENCY } from '../actions/types';

const INITIAL_STATE = { currencies: [] };

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCY:
    return {
      ...state,
      currencies: Object.keys(action.currency).filter((element) => element !== 'USDT'),
    };
  default:
    return state;
  }
};

export default walletReducer;
