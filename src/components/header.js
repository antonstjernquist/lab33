import React, { Component } from "react";
import { connect } from "react-redux";
import { actionLogin, actionLogout } from "../actions/actions.js";
import { selectTab } from "../actions/actions";
import "../css/header.css";
import { doSignOut, doLogInWithGoogle } from "../firebase/auth.js";
import {onAuthStateChanged} from "../firebase/auth";

/*
Material design icons example:

  <i className="material-icons">people</i>

*/

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }
  async handleLogin(event) {
    console.log(this);
    try {
        console.log("Logging in..");
        await doLogInWithGoogle();
        onAuthStateChanged(this, actionLogin);
    } catch (e) {
        throw new Error("Login failed", e);
    }
  }

  handleLogout = event => {
    let action = actionLogout();
    doSignOut();
    this.props.dispatch(action);
  };

  handleCartClick = event => {
    let action = selectTab("cart");
    this.props.dispatch(action);
  };

  render() {
    if (this.props.user) {
      return (
        <header>
          <div className="headerWrapper">
            <h1> Webshop </h1>
            <div className="userDiv">
              <button
                onClick={this.handleCartClick}
                disabled={!this.props.canClickCart}
              >
                {" "}
                Cart ({this.props.cart.length})
              </button>
              <button onClick={this.handleLogout}> Logout </button>
            </div>
          </div>
        </header>
      );
    } else {
      return (
        <header>
          <div className="headerWrapper">
            <h1> Webshop </h1>
            <div className="userDiv">
              <button
                onClick={this.handleCartClick}
                disabled={!this.props.canClickCart}
              >
                {" "}
                Cart ({this.props.cart.length})
              </button>
              <button onClick={this.handleLogin}> Login </button>
            </div>
          </div>
        </header>
      );
    }
  }
}

let mapPropsFromStoreState = state => {
  return {
    user: state.user,
    cart: state.cart.present,
    canClickCart: state.cart.present.length > 0
  };
};

export default connect(mapPropsFromStoreState)(Header);
