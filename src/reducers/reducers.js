import {combineReducers} from 'redux';
import { LOGIN, LOGOUT } from '../actions/constants.js';
let valueReducer = (state = 0, action) => {
    switch( action.type ) {

        case 'UPDATE':
            return state + action.amount;

        default:
            return state;
    }
};

let userReducer = (state = null, action) => {
  console.log('userReducer ran. Action = ', action);
  switch ( action.type ) {
    case LOGIN:
      return action.user;

    case LOGOUT:
      return null;

    default:
      return state;
  }
}

let rootReducer = combineReducers({
  value: valueReducer,
  user: userReducer
});

export default rootReducer;
