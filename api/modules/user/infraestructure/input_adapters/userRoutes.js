import express from "express";
const router = express.Router();
import { UserController } from "./userController.js";
import { protect } from "../../../../middleware/protect.js";
import {validator} from "../../../../middleware/validatorData.js"
import { userSchema } from "../../domain/userValidateData.js";
const userController = new UserController();


router.get(  "/api/user/getuserlogged", protect(["BASICUSER", "COMPLETEUSER"]),userController.getUserLogged);
router.post("/api/user/update", protect(["BASICUSER", "COMPLETEUSER"]), validator("body", userSchema ), userController.updateUser);

export default router;
