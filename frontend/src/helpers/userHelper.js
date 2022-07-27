import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
  updatePassword,
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

export const updateUser = async (name, newPassword) => {
  let resStatus;
  try {
    let currentUser = auth.currentUser;

    if (currentUser.displayName !== name) {
      await updateProfile(currentUser, {
        displayName: name,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error.message);
          resStatus = false;
        });

      let resUpdateUser = await fetch(`http://127.0.0.1:5000/user/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: currentUser.uid, name: name }),
      });
      if (!resUpdateUser.ok) throw new Error("User not found");
      resStatus = true;
    }

    if (newPassword.length >= 6) {
      await updatePassword(currentUser, newPassword)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error.message);
          resStatus = false;
        });
    }

    return resStatus;
  } catch (e) {
    console.error(e.message);
    return resStatus;
  }
};

export const getUser = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const getUserById = await fetch(
      `http://127.0.0.1:5000/user/get?id=${auth.currentUser.uid}`
    );
    const data = await getUserById.json();
    console.log(data);
    sessionStorage.setItem("user", data.id);
    return data;
  } catch (e) {
    console.error(e.message);
    return false;
  }
};

export const getAllUsers = async () => {
  try {
    const getAll = await fetch(
      `http://127.0.0.1:5000/user/getAll`
    );
    const data = await getAll.json();
    return data;
  } catch (e) {
    console.error(e.message);
    return false;
  }
};

export const getUserFromSession = async () => {
  try {
    const userID = sessionStorage.getItem("user");
    if (!userID) return null;
    const res = await fetch(`http://127.0.0.1:5000/user/get?id=${userID}`);
    if (!res.ok) throw new Error("User not found");
    return await res.json();
  } catch (e) {
    console.error(e.message);
    return false;
  }
};

// CONTINUE HERE
export const changeUserBalance = async (userId, landId, landPrice, action) => {
  try {
    // const userID = sessionStorage.getItem("user");
    // if (!userID) return null;
    const resGetUser = await fetch(
      `http://127.0.0.1:5000/user/get?id=${userId}`
    );
    if (!resGetUser.ok) throw new Error("User not found");
    const user = await resGetUser.json();
    // console.log(user.owndLands.push(`${landId}`));
    user.ownLands.push(`${landId}`);
    const resUpdateUser = await fetch(
      `http://127.0.0.1:5000/user/update?id=${userId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          balance:
            action === "add"
              ? user.balance + landPrice
              : user.balance - landPrice,
          ownLands: user.ownLands,
        }),
      }
    );
    if (!resUpdateUser.ok) throw new Error("Couldnt update user balance");

    return await resUpdateUser.json();
  } catch (e) {
    console.error(e.message);
    return false;
  }
};

export const userLogOut = () => {
  sessionStorage.removeItem("user");
  auth.signOut();
};
