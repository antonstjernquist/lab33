import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actionLogin, actionLogout} from '../actions/actions.js';
import '../css/header.css';

/*
Material design icons example:

  <i className="material-icons">people</i>

*/


class Header extends Component {

  handleLogin = event => {
    console.log('Logging in..');
    let user = {
      name: 'Anton',
      age: 23
    }
    let action = actionLogin(user);
    this.props.dispatch(action);
  }

  handleLogout = event => {
    let action = actionLogout();
    this.props.dispatch(action);
  }

  render() {
    <p> User is: {this.props.user ? this.props.user.name : 'none'} </p>
    if(this.props.user){
      return (
        <header>
          <div className="headerWrapper">
            <h1> Webshop </h1>
            <div className="userDiv">
              <button onClick={this.handleLogout}> Logout </button>
            </div>
          </div>
        </header>
      )
    } else {
      return (
        <header>
          <div className="headerWrapper">
            <h1> Webshop </h1>
            <div className="userDiv">
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
    user: state.user
  };
}

export default connect(mapPropsFromStoreState)(Header);
