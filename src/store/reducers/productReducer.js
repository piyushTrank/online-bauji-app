import {FETCH_PRODUCTS} from "../actions/actiontypes";

const INITIAL_STATE = {
  productList: null,
};

const productReducer = (state, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        productList: [...state.productList, ...action.payload],
      };
    case CLEAR_PRODUCTS:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default productReducer;
