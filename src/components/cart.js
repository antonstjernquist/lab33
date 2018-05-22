import React, { Component } from "react";
import { connect } from "react-redux";
import { actionUndo, selectTab, actionRemoveFromCart, actionRemoveAllFromCart, actionAddToCart, actionSetMessage} from "../actions/actions.js";
import "../css/cart.css";

let Items = props => {

  let calculateItemsLeft = item => {
    return item.instore > props.cart.filter(x => x.uid === item.uid).length;
  }

  let handleClick = () => {
    let action = selectTab('produkter');
    props.dispatch(action);
  }

  let handleRemove = (event, index) => {
    console.log('Item at index: ' + index + ' is: ', props.cart[index]);
    let action = actionRemoveAllFromCart(props.cart[index]);
    props.dispatch(action);
  }

  let handleMinusOne = (event, index) => {
    let action = actionRemoveFromCart(props.cart[index]);
    props.dispatch(action);
  }

  let handlePlusOne = (event, index) => {
    let item = props.cart[index];
    if(calculateItemsLeft(item)){
      let action = actionAddToCart(item);
      props.dispatch(action);
    } else {
      props.dispatch(actionSetMessage('Out of stock!'));
    }
  }

  if(props.cart.length){
    let displayedItems = [];

    /* Displays the cart */
    let cartList = props.cart.map((x, index) => {
      /* Lets give the objet a quantity property */
      let quantity = 0;
      props.cart.forEach(y => {
        if(y.uid === x.uid) {
          quantity += 1;
        }
      });

      if(displayedItems.find(y => y === x.uid)){
        return null;
      } else {
        displayedItems.push(x.uid);
      }
      /* For every item in the cart, we need to define the categoryList aswell */
      let categoryList = x.categories.map((y, categoryIndex) => {
        return (<span className="categoryItem" key={y + ':' + x.price + ':' + x.name + ':' + categoryIndex}>{y}</span>)
      })
      return (
        <div className="cartItem" key={index + ':' + x.name }>

          <img alt="Item" src={x.imageURL} />

          <div className="cartItemInfo">

            <span className="spanTitle"> {x.name}</span>
            <br />
            <span> {x.price},00 kr </span>
            <br />
            <span className="spanTitle"> Details </span>
            <br />
            <span> {x.description} </span>
            <br />
            <div className="categoryList">
              {categoryList}
            </div>


          </div>
          <div className="buttonHolder">

            <i onClick={event => handlePlusOne(event, index)} className="material-icons">add</i>
            <span> {quantity} </span>
            <i onClick={event => handleMinusOne(event, index)} className="material-icons">remove</i>
            <i onClick={event => handleRemove(event, index)} className="material-icons">delete_outline</i>
          </div>

        </div>);
    });

    return (
      <div className="itemHolder">
        <h1> Items </h1>
        {cartList}
      </div>
    )

  /* Else if the cart is empty */
  } else {
    return (
      <div className="itemHolder">
        <h1> Items </h1>
        <p> Your cart is empty. Go to products to add something! </p>
        <button className="stylishButton" onClick={handleClick}> Go to products </button>
      </div>
    )
  }
}

class Cart extends Component {

  totalPrice = () => {
    let list = this.props.cart;
    let total = 0;
    list.forEach(x => total += Number(x.price));
    return total;
  }

  render() {
    let displayedItems = []
    let list = this.props.cart.map((x, index) => {

      let quantity = 0;
      this.props.cart.forEach(y => {
        if(y.uid === x.uid) {
          quantity += 1;
        }
      });

      if(displayedItems.find(y => y === x.uid)){
        return null;
      } else {
        displayedItems.push(x.uid);
      }

      return (
        <div key={x.uid}>
          <span className="spanTitle">{x.name} ({quantity})</span>
          <br />
          <span> {x.price * quantity},00 kr </span>
        </div>
      )
    })

    return (
      <div className="cartWrapper">
        <div className="itemsAndHeaderWrapper">
          <div>
            <div className="orderHeader">
              <h1> Cart </h1>
              <h1> ({this.props.cart.length} items) </h1>
            </div>
            <p> This is your cart. <br/> From this view you can edit or remove items from your order </p>
            <button className="stylishButton" onClick={event => this.props.dispatch(actionUndo())}> Undo </button>
          </div>

          <Items cart={this.props.cart} dispatch={this.props.dispatch}/>
        </div>

        <div className="paymentDivWrapper">
          <div className="paymentDiv">
            <h1> Checkout </h1>

            <div className="paymentProduct">
              {list.length ? list : 'Your items will appear here'}
            </div>
            <hr />
            <div className="totalPriceDisplay">
              <h4> Total: </h4> <h4> {this.totalPrice() + ',00 kr'} </h4>
            </div>
            <button className="stylishButton"> Checkout </button>
          </div>

        </div>
      </div>
    )
  }
}

let mapPropsFromStoreState = state => {
  return {
    cart: state.cart.present
  };
};

export default connect(mapPropsFromStoreState)(Cart);
