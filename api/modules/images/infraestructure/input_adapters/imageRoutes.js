import { Router } from "express"
import ImageController from './imageController.js'
import { upload } from './multer.js'
import { protect } from '../../../../middleware/protect.js'
const imageController = new ImageController()

const router = new Router()

router.post("/api/image/upload", protect(["BASICUSER", "COMPLETEUSER"]), upload.single("file"), imageController.uploadFile)


export default router
