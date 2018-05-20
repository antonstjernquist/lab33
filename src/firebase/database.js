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
