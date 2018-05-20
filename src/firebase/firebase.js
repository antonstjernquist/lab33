import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyClDppjcqe_LNQzfERUjc7eWXD6HPYeMko",
  authDomain: "sweetasswebshop-d0f26.firebaseapp.com",
  databaseURL: "https://sweetasswebshop-d0f26.firebaseio.com",
  projectId: "sweetasswebshop-d0f26",
  storageBucket: "sweetasswebshop-d0f26.appspot.com",
  messagingSenderId: "61887153442"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

/* Constants */
const auth = firebase.auth();
const database = firebase.database();

const providerData = {
  google: new firebase.auth.GoogleAuthProvider()
};

export { auth, database, firebase, providerData };
