import { LOGIN, LOGOUT } from './constants.js';

let actionUpdate = amount => {
  return {
    type: 'UPDATE',
    amount
  };
}

let actionLogin = user => {
  return {
    type: LOGIN,
    user
  }
}

let actionLogout = () => {
  return {
    type: LOGOUT
  }
}

export {actionUpdate, actionLogin, actionLogout};
