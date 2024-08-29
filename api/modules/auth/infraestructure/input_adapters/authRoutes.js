import { Router } from "express"
import { AuthController } from "./authController.js"
import { checkPlatform } from "../../../../middleware/checkPlatform.js";
import { validator } from '../../../../middleware/validatorData.js';
import * as schema from "../../domain/authValidateData.js"

const router = Router();
const authController = new AuthController()


/**testeada*/ router.get("/api/auth/checkemail/:email", validator("params", schema.only_email), authController.checkEmailIsExists)
/**testeada*/ router.get("/api/auth/checkusername/:username", validator("params", schema.ony_username), authController.checkUernameIsExists)
/**testeada*/ router.get("/api/auth/checkcredential/:credential", authController.checkCredentialIsExists)
/**testeada*/ router.post("/api/auth/registercredentials", checkPlatform(), validator("body", schema.register), authController.registerCredentials)
/**testeada*/ router.post("/api/auth/logincredentials", checkPlatform(), authController.loginCredentials)

router.get("/api/auth/logout", authController.logout)
router.get("/api/auth/refreshtoken", checkPlatform(), authController.getRefreshToken)
router.post("/api/auth/isauthenticated", authController.checkIsAuthenticated)

export default router