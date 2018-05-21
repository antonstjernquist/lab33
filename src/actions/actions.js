import { LOGIN, LOGOUT, RETRIEVE_PRODUCTS, ADD_PRODUCT} from "./constants.js";

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

export { selectTab, actionUpdate, actionLogin, actionLogout, actionRetrieveProducts, actionAddProduct };
