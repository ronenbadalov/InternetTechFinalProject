import express from "express"
import {createNewLand, createAllMap} from "../Controllers/LandController.js";

const router = express.Router();

router.get('/get', () => {console.log("land")});
router.get('/getAll', () => {console.log("lands")});
router.post('/create', createNewLand);
router.post('/createMap', createAllMap);
router.put('/update', () => {console.log("update land")});
router.delete('/delete', () => {console.log("delete land")});

export default router;
