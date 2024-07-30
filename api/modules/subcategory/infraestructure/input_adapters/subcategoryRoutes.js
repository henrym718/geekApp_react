import { Router } from "express";
import { SubcategoryController } from "./subcategoryController.js";
import { validator } from "../../../../middleware/data/validatorData.js";
import * as data from "../../domain/subCategoryValidateData.js";

const router = Router();
const subcategoryController = new SubcategoryController();

router.post("/api/subcategory/create", validator("body", data.subCategoryModelData),subcategoryController.createSubcategory);
router.get("/api/subcategory/get/:categoryid", validator("params", data.subCategoryParams),subcategoryController.getSubcategories);

export default router;
