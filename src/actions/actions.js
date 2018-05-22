import { LOGIN, LOGOUT, RETRIEVE_PRODUCTS, ADD_PRODUCT, REMOVE_PRODUCT, EDIT_PRODUCT, ADD_TO_CART, UNDO, REMOVE_FROM_CART, REMOVE_ALL_FROM_CART, SET_MESSAGE} from "./constants.js";

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

const actionRemoveProduct = item => {
  return {
    type: REMOVE_PRODUCT,
    item
  }
}

const actionEditProduct = item => {
  return {
    type: EDIT_PRODUCT,
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

const actionSetMessage = message => {
  return {
    type: SET_MESSAGE,
    data: message
  }
}
const actionRemoveMessage = message => {
  return {
    type: 'REMOVE_MESSAGE',
    data: message
  }
}

export { selectTab, actionUpdate, actionLogin, actionLogout, actionRetrieveProducts, actionAddProduct, actionAddToCart, actionUndo, actionRemoveFromCart, actionRemoveAllFromCart, actionSetMessage, actionRemoveMessage, actionRemoveProduct, actionEditProduct};
