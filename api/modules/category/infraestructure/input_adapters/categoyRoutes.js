import { Router } from "express";
import { CategoryController } from "./categpryController.js";

import { validator } from "../../../../middleware/data/validatorData.js";
import { categoryModelData } from "../../domain/categoryValidateData.js";

const router = Router();
const categoryController = new CategoryController();

//Routes
router.post("/api/category/create", validator(categoryModelData), categoryController.createCategory);

export default router;
