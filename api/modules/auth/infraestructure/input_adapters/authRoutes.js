import { Router } from "express"
import {AuthController} from "./authController.js"
import { checkPlatform } from "../../../../middleware/checkPlatform.js";
import { validator } from '../../../../middleware/validatorData.js';
import * as data from "../../domain/authValidateData.js"

const router = Router();
const authController = new AuthController()


// Definimos la ruta de login y asociamos el método del controlador
router.post("/api/auth/logincredentials", validator("body",data.authDataValidateLogin),  authController.loginCredentials)
router.post("/api/auth/registercredentials", checkPlatform(), validator("body",data.authDataValidateRegister), authController.registerCredentials)
router.get("/api/auth/logout",authController.logout)
router.get("/api/auth/refreshtoken",checkPlatform(), authController.getRefreshToken)
router.post("/api/auth/isauthenticated", authController.chekIsAuthenticated)

export default router