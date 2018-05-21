import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/displaymessage.css";
import { actionRemoveMessage } from "../actions/actions.js";


class DisplayMessage extends Component {


  closeMessage = (event, message) => {
    let action = actionRemoveMessage(message);
    this.props.dispatch(action);
  }

  autoClose = message => {
    setTimeout(x => {
      let action = actionRemoveMessage(message);
      this.props.dispatch(action);
    }, 5000);
  }


  render() {

    let oldList = this.props.messages.sort((x, y) => {
      if(x.created > y.created ){
        return -1;
      } else {
        return 1;
      }
    })


    let list = oldList.map((x, index) => {
      /* Don't print old messages */
      this.autoClose(x);

      return (
        <div key={x.created} className="messageDiv">
          <p> {x.message} </p>
          <p> {x.message === 'Added to cart' ? '(' + this.props.cart.length + ')' : null } </p>
          <button className="stylishButton" onClick={event => this.closeMessage(event, x)}> Close </button>
        </div>)
    })

    if(this.props.messages.length){
      return(
        <div className="messageWrapper">
          {list}
        </div>
      )
    } else {
      return null;
    }
  }
}

let mapPropsFromStoreState = state => {
  return {
    user: state.user,
    cart: state.cart.present,
    messages: state.displayMessage
  };
};

export default connect(mapPropsFromStoreState)(DisplayMessage);
