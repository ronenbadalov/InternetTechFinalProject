import { firestore } from "../index.js";
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

export const updateUserById = async (item) => {
  try {
    const userRef = firestore.collection("users").doc(`${item.id}`);
    const res = await userRef.update({
      //   price: item.price,
      //   innerData: item.innerData,
    });
    return res;
  } catch (e) {
    console.log(e.message);
  }
};

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
