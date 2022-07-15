import express from "express";
import {
  createNewLand,
  createAllMap,
  getAllMap,
  getLand,
  updateLand,
  updateLandInCache
} from "../Controllers/LandController.js";
import { firestore } from "../index.js";

const router = express.Router();

router.get("/get", getLand);
router.get("/getAll", getAllMap);
router.post("/create", createNewLand);
router.post("/createMap", createAllMap);
router.post("/updateCache", updateLandInCache);
// router.get("/updateTest", getAllAndReplaceMap);
// router.put("/update", () => {
//   console.log("update land");
// });
router.put("/update", updateLand);
router.delete("/delete", () => {
  console.log("delete land");
});

export default router;
