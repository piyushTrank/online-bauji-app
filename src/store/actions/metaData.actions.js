import {AUTH_SKIP} from "./actiontypes";

export const changeAuthSkip = val => ({
  type: AUTH_SKIP,
  payload: val,
});
