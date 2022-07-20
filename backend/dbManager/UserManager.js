import { firestore, auth } from "../index.js";
import { updateProfile } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
export const setUser = async (user) => {
  try {
    console.log(user.id);
    await firestore
      .collection("users")
      .doc(user.id + "")
      .set(Object.assign({}, user));
    console.log("user saved: ", user.id);
    return user.id;
  } catch (e) {
    console.log("user not saved: ", user.id, e);
  }
};

// 'http://127.0.0.1:5000/land/get?id=2'
export const getUserById = async (userId) => {
  try {
    const userRef = firestore.collection("users").doc(userId);
    const doc = await userRef.get();
    return doc.data();
  } catch (e) {
    console.log(e.message);
  }
};

// 'http://127.0.0.1:5000/land/getAll'

export const getAll = async () => {
  try {
    const userRef = firestore.collection("users");
    const snapshot = await userRef.get();
    const resArr = [];
    snapshot.forEach((doc) => {
      resArr.push(doc.data());
    });
    return resArr;
  } catch (e) {
    console.log(e.message);
  }
};

export const updateUserById = async (id, item) => {
  try {
    console.log("In updateUserById: ");
    console.log(item);
    const userRef = firestore.collection("users").doc(`${id}`);
    const res = await userRef.update({
      ...item,
    });
    return res;
  } catch (e) {
    console.log(e.message);
  }
};

// export const updateUserNameAndPassword = async(name, newPassword) => {
//   let resposnseStatus = false;
//   try {
//     const currrentUser = auth.currentUser;

//     const res = await updateUserById(userToUpdate);

//     return resposnseStatus;
//   } catch (e) {
//     console.log(e.message);
//   }
// };

export const updateCurUserInCache = async () => {
  try {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"));
    sessionStorage.setItem("user", sessionUser);
    return true;
  } catch (e) {
    console.log(e.message);
    return false;
  }
};
