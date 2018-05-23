import React, { Component } from "react";
import { connect } from "react-redux";
import { database } from '../firebase';
import "../css/products.css";
import { actionRetrieveProducts, actionAddToCart, actionUndo, actionSetMessage} from "../actions/actions";

class Products extends Component {

  handleUpdateClick = () => {
    /* Defining the action */
    this.props.dispatch(actionSetMessage('Updated redux store'));

    /* Starting to retrieve products */
    database.retrieveProducts()
    .then(result => {
      console.log('Success.');
      let data = result.val();
      let action = actionRetrieveProducts(data);
      this.props.dispatch(action)
    });
    console.log('Current products are: ', this.props.products);

  }
  componentDidMount(){
    database.retrieveProducts()
    .then(result => {
      console.log('Initial query.');
      let data = result.val();
      let action = actionRetrieveProducts(data);
      this.props.dispatch(action)
    });
  }

  handleAddToCartClick = (event, index) => {
    /* Insert test case here possibly to confirm this is the correct item. We should not trust indexes. */
    let item = {
      ...this.props.products[index]
    };
    let action = actionAddToCart(item);
    this.props.dispatch(action);
    this.props.dispatch(actionSetMessage(item.name + ' added!'));
  }

  handleUndoClick = event => {
    this.props.dispatch(actionSetMessage('Undo successful'));
    this.props.dispatch(actionUndo());
  }

  calculateItemsLeft = item => {
    return item.instore > this.props.cart.filter(x => x.uid === item.uid).length;
  }

  hoverMessage = name => {
    if(name.length > 20){
      return <span className="hoverMessage"> {name} </span>
    }
    return null;
  }

  render() {
    /* Displays the products */
    let list = [];
    if(this.props.products.length){
      list = this.props.products.map((x, index) => {
        return (
          <div key={index + ':' + x.name } className="productItem">
            <h5 className="inStore"> {x.instore} left </h5>
            <img alt="item" src={x.imageURL} />
            <button onClick={event => this.handleAddToCartClick(event, index)} disabled={!this.calculateItemsLeft(x)}> {this.calculateItemsLeft(x) ? 'Add to cart' : 'Out of stock'} </button>
            <div className="productNameHolder">
              <h3> {x.name} </h3>
              {this.hoverMessage(x.name)}
              <h5> {x.price},00 kr </h5>

            </div>
          </div>)
      });
    }
    /* Displays the cart */

      return (
          <div className="shopWrapper">

            <div className="sortingDiv">
              <p> Updates the redux store with information from firebase </p>
              <div>
                <button onClick={this.handleUpdateClick}> Update </button>
                <button onClick={this.handleUndoClick} disabled={!this.props.canUndoCart}> Undo </button>
              </div>
            </div>

            <div className="productHolder">
              {list ? list : null}
            </div>
          </div>
      );
  }
}

let mapPropsFromStoreState = state => {
  return {
    user: state.user,
    products: state.products,
    cart: state.cart.present,
    canUndoCart: state.cart.past.length > 0
  };
};

export default connect(mapPropsFromStoreState)(Products);
