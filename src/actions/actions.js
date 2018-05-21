import { LOGIN, LOGOUT, RETRIEVE_PRODUCTS, ADD_PRODUCT, ADD_TO_CART, UNDO, REMOVE_FROM_CART, REMOVE_ALL_FROM_CART} from "./constants.js";

let actionUpdate = amount => {
  return {
    type: "UPDATE",
    amount
  };
};

let actionLogin = user => {
  return {
    type: LOGIN,
    user
  };
};

let actionLogout = () => {
  return {
    type: LOGOUT
  };
};

const selectTab = item => {
  return {
    type: "SELECT",
    item
  };
};

const actionRetrieveProducts = data => {
  return {
    type: RETRIEVE_PRODUCTS,
    data
  }
}

const actionAddProduct = item => {
  return {
    type: ADD_PRODUCT,
    item
  }
}

const actionAddToCart = data => {
  return {
    type: ADD_TO_CART,
    data
  }
}

const actionUndo = () => {
  return {
    type: UNDO
  }
}

const actionRemoveFromCart = data => {
  return {
    type: REMOVE_FROM_CART,
    data
  }
}

const actionRemoveAllFromCart = data => {
  return {
    type: REMOVE_ALL_FROM_CART,
    data
  }
}

export { selectTab, actionUpdate, actionLogin, actionLogout, actionRetrieveProducts, actionAddProduct, actionAddToCart, actionUndo, actionRemoveFromCart, actionRemoveAllFromCart};
