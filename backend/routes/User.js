import express from "express"

const router = express.Router();

router.get('/get', () => {console.log("user")});
router.get('/getAll', () => {console.log("users")});
router.post('/create', () => {console.log("create user")});
router.put('/update', () => {console.log("update user")});
router.delete('/delete', () => {console.log("delete user")});
router.get('/validate', () => {console.log("validate user token")});

export default router;
