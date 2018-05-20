import React, { Component } from "react";
import Tabs from "./components/Tabs.js";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <div>
        <Tabs />
        <p> Value from redux store is: {this.props.value}</p>
      </div>
    );
  }
}

/* Map redux store to the props of this components */
let mapPropsFromStoreState = state => {
  return {
    value: state.value
  };
};

export default connect(mapPropsFromStoreState)(App);
