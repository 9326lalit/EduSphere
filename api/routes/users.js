import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();


//for testing the authentication system
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello user, you are logedin");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user, you are logedin and you can delete your ac ....");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello user, you are logedin as a admin and you can delete all ac ....");
// });

//update
router.put("/:id", verifyUser ,updateUser);
//delete
router.delete("/:id", deleteUser);
//get
router.get("/:id", getUser);
//getAll
router.get("/", getAllUser);

export default router;
