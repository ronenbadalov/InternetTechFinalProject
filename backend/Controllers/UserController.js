import User from "../models/User.js";
import {
  getAll,
  getUserById,
  setUser,
  updateUserById
} from "../dbManager/UserManager.js";
import url from "url";

export const createNewUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = new User(
      req.body.uid,
      req.body.name,
      req.body.email,
      [],
      req.body.type ? 1000 : 0,
      req.body.type
    );
    console.log(user);
    const userId = await setUser(user);
    res.status(200).send(userId);
  } catch (err) {
    console.log(err);
    res.status(500).send("cant create user");
  }
};

export const getUser = async (req, res) => {
  try {
    const queryObject = url.parse(req.url, true).query;
    const user = await getUserById(queryObject.id);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("cant get user");
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userArr = await getAll();
    res.status(200).send(userArr);
  } catch (err) {
    console.log(err);
    res.status(500).send("cant get all users");
  }
};

export const updateUser = async (req, res) => {
  try {
    const response = await updateUserById(req.body);
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("cant update user");
  }
};

// export const updateUserNameAndPass = async (req, res) => {
//   try {
//     console.log(req.body);
//     const response = await updateUserNameAndPassword(req.body.name, req.body.password);
//     res.status(200).send(response);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("cant update user");
//   }
// };
