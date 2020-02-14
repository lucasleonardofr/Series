import { SET_FIELD } from "../actions";

const INITIAL_STATE = {
  id: null,
  title: "",
  gender: "police",
  rate: 0,
  img: "",
  description: ""
};

export default function(state = { INITIAL_STATE }, action) {
  switch (action.type) {
    case SET_FIELD:
      const newState = { ...state };
      newState[action.field] = action.value;
      return newState;
      break;

    default:
      return state;
  }
}
