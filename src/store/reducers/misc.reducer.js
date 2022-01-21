import {FETCH_CATEGORIES, FETCH_LATEST_PRODUCTS} from "../actions/actiontypes";

const INITIAL_STATE = {
  categories: null,
  latestProducts: null,
};

const miscReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case FETCH_LATEST_PRODUCTS:
      return {
        ...state,
        latestProducts: action.payload,
      };

    default:
      return state;
  }
};

export default miscReducer;
