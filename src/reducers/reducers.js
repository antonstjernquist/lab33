import { combineReducers } from "redux";
import { LOGIN, LOGOUT } from "../actions/constants.js";
import { doSignOut, doLogInWithGoogle } from "../firebase/auth.js";
let valueReducer = (state = 0, action) => {
  switch (action.type) {
    case "UPDATE":
      return state + action.amount;

    default:
      return state;
  }
};

let userReducer = (state = null, action) => {
  console.log("userReducer ran. Action = ", action);
  switch (action.type) {
    case LOGIN:
      doLogInWithGoogle();
      return action.user;

    case LOGOUT:
      doSignOut();
      return null;

    default:
      return state;
  }
};

let rootReducer = combineReducers({
  value: valueReducer,
  user: userReducer
});

export default rootReducer;
