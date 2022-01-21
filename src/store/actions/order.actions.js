import {SAVE_ORDER} from "./actiontypes";

export const saveOrder = data => ({
  type: SAVE_ORDER,
  payload: data,
});
