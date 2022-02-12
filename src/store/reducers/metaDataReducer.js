import {
  AUTH_SKIP,
  LOGOUT,
  RESETOTP,
  SENDOTP,
  SIGNUP,
  VERIFYOTP,
} from "../actions/actiontypes";

const initialState = {
  authSkip: false,
  authOptions: {
    authType: null,
    isOtpValid: null,
    shouldAllow: false,
    mobNum: null,
  },
};

export const metaDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SKIP:
      return {
        ...state,
        authSkip: action.payload,
      };

    case SENDOTP:
      return {
        ...state,
        authOptions: {
          ...state.authOptions,
          authType: "otp",
          mobNum: action.payload,
        },
      };

    case VERIFYOTP:
      let dataToMap = {
        ...state,
        authOptions: {
          ...state.authOptions,
          isOtpValid: action.payload.value,
        },
      };

      return {
        ...state,
        ...dataToMap,
      };

    case RESETOTP:
      return {
        ...state,
        authOptions: initialState.authOptions,
      };

    case SIGNUP:
      return {
        ...state,
        authOptions: initialState.authOptions,
      };

    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
