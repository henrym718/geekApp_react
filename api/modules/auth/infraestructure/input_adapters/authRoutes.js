// Importamos el módulo de Express para crear el router
import { Router } from "express"
import {AuthController} from "./authController.js"
import { validator } from '../../../../middleware/data/validatorData.js';
import * as data from "../../domain/authValidateData.js"

const router = Router();
const authController = new AuthController()


// Definimos la ruta de login y asociamos el método del controlador
router.post("/api/auth/logincredentials", validator(data.authDataValidateLogin),  authController.loginCredentials)
router.post("/api/auth/registercredentials", validator(data.authDataValidateRegister), authController.registerCredentials)
router.get("/api/auth/logout",authController.logout)
router.get("/api/auth/refreshtoken", authController.getNewRefreshToken)
router.post("/api/auth/isauthenticated", authController.chekIsAuthenticated)

export default router