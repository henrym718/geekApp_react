import express from "express";
const router = express.Router();
import { UserController } from "./userController.js";
import { protect } from "../../../../middleware/protect.js";
const userController = new UserController();


/** Devuelve el usuario logueado al abrir la app, por accesstoken */
router.get(
  "/api/user/getuserlogged",
  protect(["BASICUSER", "COMPLETEUSER"]),
  userController.getUserLogged
);


/** Hace un update del usuario logueado para pasasr a un usuario con permisos de publicar, o actualiza campos */
router.post(
  "/api/user/createuser",
  protect(["BASICUSER", "COMPLETEUSER"]),
  userController.updateUser
);

export default router;
