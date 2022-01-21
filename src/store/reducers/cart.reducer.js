import {CLEAR_CART, GET_CART} from "../actions/actiontypes";

const INITIAL_STATE = {
  cartData: null,
  cartPrices: null,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        cartData: action.payload.cartProductArr,
        cartPrices: action.payload.cartPrices,
      };

    case CLEAR_CART:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default cartReducer;
