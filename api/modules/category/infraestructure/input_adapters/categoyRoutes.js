import { Router } from "express";
import { CategoryController } from "./categpryController.js";

import { validator } from "../../../../middleware/data/validatorData.js";
import * as data from "../../domain/categoryValidateData.js";

const router = Router();
const categoryController = new CategoryController();

//Routes
router.post("/api/category/create", validator("body",data.categoryModelData), categoryController.createCategory);
router.get("/api/category/getall", categoryController.getCategories)
export default router;
