import {SAVE_USER, CLEAR} from "./actiontypes";

export const saveUser = data => ({
  type: SAVE_USER,
  payload: data,
});

export const clear = () => ({
  type: CLEAR,
});
