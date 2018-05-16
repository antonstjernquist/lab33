import React, { Component } from 'react';
import Header from './components/header.js';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <p> Value is: {this.props.value}</p>
        <h1> Lab33 for fuck sake mate </h1>
      </div>
    );
  }
}


/* Connect this component to redux Store */
let mapPropsFromStoreState = state => {
  return {
    value: state.value
  };
}

export default connect(mapPropsFromStoreState)(App);
