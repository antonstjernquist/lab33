import React, { Component } from "react";
import { connect } from "react-redux";
import { database } from '../firebase';
import "../css/products.css";
import { actionRetrieveProducts, actionAddProduct } from "../actions/actions";

class Products extends Component {

  handleUpdateClick = () => {
    /* Defining the action */


    /* Starting to retrieve products */
    database.retrieveProducts()
    .then(result => {
      console.log('Success.');
      let data = result.val();
      let action = actionRetrieveProducts(data);
      this.props.dispatch(action)
    });
    console.log('Current products are: ', this.props.products);

    // if(!this.props.products) {
    //   let newProduct = {
    //     name: 'Skor',
    //     price: 799,
    //     categories: ['shoes', 'spring']
    //   }
    //   action = actionAddProduct(newProduct);
    //   /* Lets push something */
    //   this.props.dispatch(action);
    // }
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

  render() {
    let list = [];
    if(this.props.products.length){
      list = this.props.products.map((x, index) => {
        return (
          <div key={index + ':' + x.name } className="productItem">
            <img alt="item" src={x.imageURL} />
            <div className="productNameHolder">
              <h3> {x.name} </h3>
              <h5> {x.price},00 kr </h5>
            </div>
          </div>)
      });
    }

      return (
          <div className="shopWrapper">

            <div className="sortingDiv">
              <p> Updates the redux store with information from firebase </p>
              <button onClick={this.handleUpdateClick}> Update </button>
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
    products: state.products
  };
};

export default connect(mapPropsFromStoreState)(Products);
