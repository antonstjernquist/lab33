import { LOGIN, LOGOUT } from "./constants.js";

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

export { selectTab, actionUpdate, actionLogin, actionLogout };
