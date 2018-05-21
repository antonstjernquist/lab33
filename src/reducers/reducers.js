import { combineReducers } from "redux";
import { LOGIN, LOGOUT, RETRIEVE_PRODUCTS, ADD_PRODUCT } from "../actions/constants.js";
import { database } from '../firebase';

/* Value reducer */
let valueReducer = (state = 0, action) => {
  switch (action.type) {
    case "UPDATE":
      return state + action.amount;

    default:
      return state;
  }
};

let selectTabReducer = (state = "home", action) => {
  switch (action.type) {
    case "SELECT":
      return (state = action.item);
    default:
      return state;
  }
};

/* User reducer */
let userReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN:
      return (state = action.user);

    case LOGOUT:
      return (state = null);

    default:
      return state;
  }
};

/* Product reducer */
let productReducer = (state = null, action) => {
  switch (action.type) {
    case RETRIEVE_PRODUCTS: {
      /* Defining list */
      let list = [];
      /* Pushing items */
      for(let item in action.data){
        list.push(action.data[item]);
      }
      /* Setting store to the list */
      return list;
    }

    case ADD_PRODUCT: {
      database.addProduct(action.item)
      return state;
    }

    default:
      return state;
  }
}


let rootReducer = combineReducers({
  value: valueReducer,
  user: userReducer,
  selectedTab: selectTabReducer,
  products: productReducer
});

export default rootReducer;
