import {LOGIN, SIGNUP, LOGOUT} from "../actions/actiontypes";

const initialState = {
  userInfo: null,
  lastLoggedIn: Date.now(),
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case SIGNUP:
      return {
        ...action.payload,
        lastLoggedIn: Date.now(),
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
