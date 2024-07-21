import express from "express";
const router = express.Router();
import { checkRole } from "../../../../middleware/routes/checkRole.js";

import { UserController } from "./userController.js";

const userController = new UserController();

router.get("/api/user/getuserbycookie", userController.getCurrentUserByCookie);
router.post(
  "/api/user/createuser",
  checkRole(["BASICUSER", "COMPLETEUSER"]),
  userController.updateUser
);

export default router;
