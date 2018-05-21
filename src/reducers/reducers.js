import { combineReducers } from "redux";
import { LOGIN, LOGOUT, RETRIEVE_PRODUCTS, ADD_PRODUCT, ADD_TO_CART, UNDO, REMOVE_FROM_CART, REMOVE_ALL_FROM_CART} from "../actions/constants.js";
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

const historyReducer = (state = [], action) => {
  return [...state, action];
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
        action.data[item].uid = item;
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

/* Cart reducer */
let cartReducer = (state = {past: [], present: [], future: []}, action) => {
  switch ( action.type ) {

    case ADD_TO_CART: {
      console.log('REDUCER. Added to cart. Current state: ', state);
      let list = state.present, found = false;

      let updateItem = list.find(x => x.uid === action.data.uid);

      return {

        /* Retrieve all the past and add present to last */
        past: [...state.past, state.present],

        /* Set the present */
        present: [...state.present, {...action.data, quantity: 1}],

        /* Define the future */
        future: []
      };



    }

    case REMOVE_FROM_CART: {
      console.log('Removing stuff!');
      let item = action.data;
      return {

        /* Retrieve all the past and add present to last */
        past: [...state.past, state.present],

        /* Set the present */
        present: state.present.filter(x => x !== item),

        /* Define the future */
        future: []
      };
    }

    case REMOVE_ALL_FROM_CART: {
      console.log('Removing stuff!');
      let item = action.data;
      return {

        /* Retrieve all the past and add present to last */
        past: [...state.past, state.present],

        /* Set the present */
        present: state.present.filter(x => x.uid !== item.uid),

        /* Define the future */
        future: []
      };
    }

    case UNDO:
      /* Is there a past to change back to? */
      if(state.past.length < 1)
        return state;

      /* Define last list in the past */
      let last = state.past[state.past.length - 1];

      /* Return the state again, the state should be a list with many objects in it. And these objects should not have a timeline, but the list in itself. */
      return {
        /* Return past as a list with all items except the last one. */
        past: state.past.filter(x => x !== last),
        present: last, /* This is a list inside the past list, but now we set it to the present. */
        future: [state.present, ...state.future]
      }

    default:
      return state;
  }
}

let rootReducer = combineReducers({
  value: valueReducer,
  user: userReducer,
  selectedTab: selectTabReducer,
  products: productReducer,
  history: historyReducer,
  cart: cartReducer
});

export default rootReducer;
