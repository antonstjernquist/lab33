import { database } from "./firebase.js";
/* Databse functions */

export const editUser = (uid, newUser) => {
  database.ref("users/" + uid).set(newUser);
};

export const updateUser = (uid, state) => {
  console.log("Starting listener on user..");
  return database.ref("users/").on("child_changed", function(snapshot) {
    let data = snapshot.val();
    let key = snapshot.key;

    if (key === uid) {
      state.setState({ user: data });
    }
  });
};

export const retrieveProducts = () => {
  console.log('Retrieving products..');
  return database.ref('products/').once('value');
}

export const addProduct = item => {
  console.log('database.js: Adding product.. Item = ', item)
  return database.ref('products/').push(item);
}

export const editProduct = item => {
  console.log('database.js: Editing product.. Item = ', item)
  return database.ref('products/' + item.uid).set(item);
}

export const removeProduct = item => {
  console.log('database.js: Removing product.. Item = ', item)
  return database.ref('products/' + item.uid).remove();
}
