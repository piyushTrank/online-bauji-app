import {AUTH_SKIP, LOGOUT} from "../actions/actiontypes";

const initialState = {
  authSkip: false,
};

export const metaDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SKIP:
      return {
        ...state,
        authSkip: action.payload,
      };

    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
