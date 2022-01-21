import {SAVE_ORDER} from "../actions/actiontypes";

const orderReducer = (state = null, action) => {
  switch (action.type) {
    case SAVE_ORDER:
      return action.payload;

    default:
      return state;
  }
};

export default orderReducer;
