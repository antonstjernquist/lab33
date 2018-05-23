import { auth, providerData } from "./firebase.js";
import { database } from "../firebase";

export const doLogInWithGoogle = () => {
  return auth.signInWithPopup(providerData.google);
};
//
// export const doLogInWithFacebook = (state) => {
//   return auth.signInWithPopup(providerData.facebook);
// }


export const onAuthStateChanged = (me, action) => {
    return auth.onAuthStateChanged((user) => {
      me.props.dispatch(action(user));
    });
};

export const logStuff = () => {
  console.log("I log stuff :)");
};

// Sign out
export const doSignOut = () => {
  auth.signOut();
  console.log("Logged out!");
};
