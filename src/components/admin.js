import React, { Component } from "react";
import { connect } from "react-redux";
import { actionRetrieveProducts, actionSetMessage, actionAddProduct, actionRemoveProduct, actionEditProduct} from "../actions/actions.js";
import "../css/admin.css";
import { database } from "../firebase";

function imageCheck(url) {
  console.log('Url is: ', url);
  let str = url.substring(url.length - 4, url.length);
  if(str.includes('.')){
    str = str.split('.')[1];
  }
  console.log('Splitted string = ' + str);

  return str.includes('jpg') || str.includes('jpeg') || str.includes('png')
}


class Editproduct extends Component {

  constructor(props){
    super(props);
    console.log('Props are:', props);
    console.log('This.props are:', this.props);

    this.state = {
      edit: this.props.edit,
      nameInput: '',
      priceInput: '',
      descriptionInput: '',
      imageInput: '',
      instoreInput: 0,
      uid: ''
    }

  }
  componentDidUpdate() {

    /* Dangerous stuff jaooo, legit code ? Idekkk */
    let item = this.props.item;
    if(item && this.state.uid !== item.uid){
      console.log('Updated. props = ', this.props);
      this.setState({nameInput: item.name, priceInput: item.price, imageInput: item.imageURL, instoreInput: item.instore, descriptionInput: item.description, uid: item.uid})
    }
  }
  componentDidMount(){
    console.log('Mounted editProduct. Props= ', this.props);
  }

  clearFields = () => {
    this.setState({
          nameInput: '',
          priceInput: '',
          descriptionInput: '',
          imageInput: '',
          instoreInput: 0,
          uid: ''
    });
  }

  checkProduct = item => {

    /* Some simple checks */
    if(!item.name){
      return false;
    } else if(!item.price){
      return false;
    } else if(!item.description){
      return false;
    } else if(item.instore < 1){
      return false;
    } else if(!item.uid) {
      return false;
    }

    /* Image check */
    if(!imageCheck(item.imageURL)) {
      this.props.dispatch(actionSetMessage('Invalid image.'));
      return false;
    }
    /* If there's not category specified we add general */
    if(!item.categories){
      item.categories = ['general']
    }
    return true;
  }

  handleRemoveClick = () => {
    this.props.dispatch(actionSetMessage('Removed product.'));
    let action = actionRemoveProduct(this.props.item);
    this.props.dispatch(action);
    this.props.setItem(null, null);
    this.props.retrieveProducts();
    this.clearFields();
  }

  handleSaveClick = () => {
    let productItem = {
      imageURL: this.state.imageInput,
      name: this.state.nameInput,
      price: Number(this.state.priceInput),
      description: this.state.descriptionInput,
      instore: this.state.instoreInput,
      uid: this.state.uid
    }

    /* Control the product */
    if(this.checkProduct(productItem)){
      if(this.props.edit){
        let action = null;
        this.props.dispatch(actionEditProduct(productItem));
        this.props.dispatch(actionSetMessage('Edited product'));
        this.props.retrieveProducts();
      } else {
        let action = actionAddProduct(productItem);
        this.props.dispatch(action);
        this.props.dispatch(actionSetMessage('Created new product'));
        this.props.retrieveProducts();
      }
    } else {
      this.props.dispatch(actionSetMessage('Could not add product.'));
      console.log('Could not add item. You need to fill out all the fields. ');
    }
  }

  handleChange = (event, type) => {
    switch (type) {
      case 'IMAGE_INPUT':
        return this.setState({imageInput: event.target.value});
      case 'NAME_INPUT':
        return this.setState({nameInput: event.target.value});
      case 'PRICE_INPUT':
        return this.setState({priceInput: event.target.value});
      case 'DESCRIPTION_INPUT':
        return this.setState({descriptionInput: event.target.value});
      case 'INSTORE_INPUT':
        return this.setState({instoreInput: event.target.value});
      default:
        return '';
    }
  }

  handleBackClick = e => {
    this.props.setItem(e, null)
    this.clearFields();
  }

  render() {
    if(this.props.edit){

      /* Render this if we should edit the item */
      if(this.props.item){
        return (
          <div className="editProduct">
            <div className="editTitle">
              <h1> Edit product </h1>
              <button onClick={this.handleBackClick} className="stylishButton"> Back </button>
            </div>

            <span>Image URL</span>
            <input onChange={event => this.handleChange(event, 'IMAGE_INPUT')} value={this.state.imageInput} type="text" placeholder="Product image url"/>
            <span>Name</span>
            <input onChange={event => this.handleChange(event, 'NAME_INPUT')} value={this.state.nameInput} type="text" placeholder="Product name"/>
            <span>Price</span>
            <input onChange={event => this.handleChange(event, 'PRICE_INPUT')} value={this.state.priceInput} type="number" placeholder="Product price, ex. 800, 500"/>
            <span>Description</span>
            <textarea onChange={event => this.handleChange(event, 'DESCRIPTION_INPUT')} value={this.state.descriptionInput} placeholder="Product description"/>
            <span>In store</span>
            <input onChange={event => this.handleChange(event, 'INSTORE_INPUT')} value={this.state.instoreInput} type="number"/>

            <button onClick={this.handleSaveClick} className="stylishButton">Save edited product</button>
            <button onClick={this.handleRemoveClick} className="stylishButton removeButton">Remove product</button>
          </div>
        )
      } else {
        return null;
      }

    } else {
      /* Render this if we should create a new item! */
      return (
        <div className="editProduct">
          <h1> New product</h1>
          <p> Add a new product here by filling in the fields then pressing the button at the bottom in this view</p>
          <span>Image URL</span>
          <input onChange={event => this.handleChange(event, 'IMAGE_INPUT')} value={this.state.imageInput} type="text" placeholder="Product image url"/>
          <span>Name</span>
          <input onChange={event => this.handleChange(event, 'NAME_INPUT')} value={this.state.nameInput} type="text" placeholder="Product name"/>
          <span>Price</span>
          <input onChange={event => this.handleChange(event, 'PRICE_INPUT')} value={this.state.priceInput} type="number" placeholder="Product price, ex. 800, 500"/>
          <span>Description</span>
          <textarea onChange={event => this.handleChange(event, 'DESCRIPTION_INPUT')} value={this.state.descriptionInput} placeholder="Product description"/>
          <span>In store</span>
          <input onChange={event => this.handleChange(event, 'INSTORE_INPUT')} value={this.state.instoreInput} type="number"/>
          <button onClick={this.handleSaveClick} className="stylishButton">Create new product</button>
        </div>
      )
    }
  }
}


class Admin extends Component {

  constructor(props){
    super(props);
    this.state = {
      editItem: null
    }
  }

  retrieveProducts = () => {
    database.retrieveProducts()
    .then(result => {

      let data = result.val();
      let action = actionRetrieveProducts(data);
      this.props.dispatch(action)
    });
  }

  componentDidMount(){
    this.retrieveProducts();
    console.log('Initial query.');
  }

  handleEditClick = (event, item) => {
    this.setState({editItem: item});
  }


  render() {

    /* Create the product List */
    let list = this.props.products.map(x => {
      return (
        <div className="cartItem" key={x.uid}>

          <img alt="Item" src={x.imageURL} />

          <div className="cartItemInfo">

            <span className="spanTitle"> {x.name}</span>
            <br />
            <span> {x.price},00 kr </span>
            <br />
            <span className="spanTitle"> Details </span>
            <br />
            <span> {x.description} </span>

            <div className="adminButtons">
              <button onClick={event => this.handleEditClick(event, x)} className="stylishButton">Edit product</button>
            </div>

          </div>
        </div>
      )
    })

    let renderElement = null;
    if(this.state.editItem){
      renderElement = <Editproduct edit={true} retrieveProducts={this.retrieveProducts} dispatch={this.props.dispatch} setItem={this.handleEditClick} item={this.state.editItem}/>
    } else {
      renderElement = <Editproduct edit={false} retrieveProducts={this.retrieveProducts} dispatch={this.props.dispatch} />
    }
    return (
      <div className="adminDiv">

        <div>
          <div>
            <h1> Admin Dashboard </h1>
            <p> This is the admin panel from where you can add new products, edit products and remove them. </p>
          </div>

          <div className="productList">
            <div className="orderHeader">
              <h1> Products </h1> <h1>({this.props.products.length} items)</h1>
            </div>
            {list}
          </div>

        </div>
        <div>
          {renderElement}
        </div>

      </div>
    )
  }
}

let mapPropsFromStoreState = state => {
  return {
    user: state.user,
    cart: state.cart.present,
    products: state.products
  };
};

export default connect(mapPropsFromStoreState)(Admin);
