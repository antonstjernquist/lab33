import React, { Component } from "react";
import Tabs from "./components/Tabs.js";
import { connect } from "react-redux";
import { onAuthStateChanged } from "./firebase/auth";
import { actionLogin } from "./actions/actions";

class App extends Component {
  componentDidMount() {
    onAuthStateChanged(this, actionLogin);
  }
  render() {
    return (
      <div>
        <Tabs />
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
