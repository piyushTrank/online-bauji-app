import {combineReducers} from "redux";
import cartReducer from "./cart.reducer";
import {metaDataReducer} from "./metaDataReducer";
import miscReducer from "./misc.reducer";
import orderReducer from "./order.reducer";
import topicReducer from "./topic.reducer";
import {userReducer} from "./userReducer";

export default combineReducers({
  user: userReducer,
  metaData: metaDataReducer,
  misc: miscReducer,
  cart: cartReducer,
  order: orderReducer,
  topic: topicReducer,
});
