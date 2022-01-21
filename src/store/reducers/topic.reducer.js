import {CHANGE_TOPIC} from "../actions/actiontypes";

const INTIAL_STATE = {
  activeTopic: null,
};

const topicReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_TOPIC:
      return {
        ...state,
        activeTopic: action.payload,
      };

    default:
      return state;
  }
};

export default topicReducer;
