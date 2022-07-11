import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../config/firebase.js";

export const addUser = async (newUser) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      newUser.email,
      newUser.password
    );
    if (res.error) return res;
    sendEmailVerification(auth.currentUser);
    console.log(res);
    newUser.uid = res.user.uid;
    const addNewUserRes = await fetch(`http://127.0.0.1:5000/user/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    console.log(addNewUserRes);
    const data = await addNewUserRes.json();
    console.log(data);
  } catch (e) {
    console.error(e.message);
  }
};

export const checkIfEmailExists = async (email) => {
  let isExists = false;
  try {
    await fetchSignInMethodsForEmail(auth, email).then((signInMethods) => {
      if (signInMethods.length) {
        isExists = true;
      }
    });
  } catch (e) {
    console.error(e.message);
  }
  return isExists;
};

export const getUser = async (email, password) => {
  let res;
  try {
    res = await signInWithEmailAndPassword(auth, email, password);
    const getUserById = await fetch(
      `http://127.0.0.1:5000/user/get?id=${auth.currentUser.uid}`
    );
    const data = await getUserById.json();
    sessionStorage.setItem("user", data.id);
    return data;
  } catch (e) {
    console.error(e.message);
    return res;
  }
};

export const getUserFromSession = async () => {
  const userID = sessionStorage.getItem("user");
  const userData = await fetch(`http://127.0.0.1:5000/user/get?id=${userID}`);
  return await userData.json();
};

export const userLogOut = () => {
  sessionStorage.removeItem("user");
  auth.signOut();
};
