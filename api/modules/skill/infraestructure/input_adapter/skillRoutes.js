import { Router } from 'express';
import { SkillController } from './skillController.js';

const router = Router()
const controller = new SkillController()

router.post("/api/skill/update/:id", controller.update)
router.get("/api/skill/get/:id", controller.get)

export default router
