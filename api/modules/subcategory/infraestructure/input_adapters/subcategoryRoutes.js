import { Router } from "express";
import { SubcategoryController } from "./subcategoryController.js";
import { validator } from "../../../../middleware/data/validatorData.js";
import { subCategoryModelData } from "../../domain/subCategoryValidateData.js";

const router = Router();
const subcategoryController = new SubcategoryController();

router.post("/api/subcategory/create", validator(subCategoryModelData),subcategoryController.createSubcategory);

export default router;
