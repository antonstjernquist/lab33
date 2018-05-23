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
      if(x.created + 5000 < new Date().getTime()){
        this.closeMessage(null, x)
      } else if(oldList.length > 2){
        oldList.pop();
      }

      return (
        <div key={x.created + ':' + x.message } className="messageDiv">
          <p> {x.message} </p>
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
