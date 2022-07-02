import express from "express";
import {
  createNewUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../Controllers/UserController.js";

const router = express.Router();

router.get("/get", getUser);
router.get("/getAll", getAllUsers);
router.post("/create", createNewUser);
router.put("/update", updateUser);
router.delete("/delete", () => {
  console.log("delete user");
});
router.get("/validate", () => {
  console.log("validate user token");
});

export default router;
