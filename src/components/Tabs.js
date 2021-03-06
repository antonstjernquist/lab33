import React, { Component } from "react";
import "../css/tabs.css";
import { connect } from "react-redux";
import { selectTab } from "../actions/actions";
import Header from "./header.js";
import Products from './products.js';
import History from "./History.js";
import DisplayMessage from "./displaymessage.js";
import Cart from "./cart.js";
import Admin from "./admin.js";

function Tab(props) {
  const handleSelect = () => {
    props.onSelect(props.tab);
  };
  return (
    <button type={"button"} className={"tab"} onClick={handleSelect}>
      {props.tab}
    </button>
  );
}

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(item) {
    // console.log(item);
    const action = selectTab(item);
    this.props.dispatch(action);
  }

  render() {
    const tabs = ["products", "history", "cart", "admin"].map(
      (tab, index) => {
        // console.log(this.props);
        return <Tab tab={tab} key={index} onSelect={this.onSelect} />;
      }
    );

    let renderElement = null;

    switch (this.props.selectedTab) {
      case "products":
        renderElement = <Products />;
        break;
      case "history":
        renderElement = <History historyList={this.props.history}/>;
        break;
      case "cart":
        renderElement = <Cart />;
        break;
      case "admin":
        renderElement = <Admin />;
        break;
      default:
        renderElement = <Products />;
    }

    return (
      <div>
        <DisplayMessage />
        <Header />
        <div className={"flex-column"}>
          <div className={"flex"}>{tabs}</div>
          {renderElement}
        </div>
      </div>
    );
  }
}

let mapPropsFromStoreState = state => {
  return {
    selectedTab: state.selectedTab,
      history: state.history
  };
};

export default connect(mapPropsFromStoreState)(Tabs);
