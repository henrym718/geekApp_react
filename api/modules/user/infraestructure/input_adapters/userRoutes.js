import express from "express";
const router = express.Router();
import { UserController } from "./userController.js";
import { protect } from "../../../../middleware/protect.js";
const userController = new UserController();

router.get("/api/user/getuserbycookie", userController.getCurrentUserByCookie);
router.post(
  "/api/user/createuser",
  protect(["BASICUSER", "COMPLETEUSER"]),
  userController.updateUser
);

export default router;
