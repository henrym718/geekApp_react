import express from "express";
import ProductController from "./productController.js";
import { protect } from "../../../../middleware/protect.js";
import { validator } from "../../../../middleware/validatorData.js";
import { productModelData , paramsModelData, queryModelData, productIdShema} from "../../domain/productValidateData.js";

const router = express.Router();
const productController = new ProductController();
router.post("/api/product/create", protect(["BASICUSER", "COMPLETEUSER"]),validator("body", productModelData), productController.createProduct)
router.get("/api/product/search", productController.getProductsTags);
router.get("/api/product/list/query",validator("query", queryModelData) ,productController.getProductByQuery);
router.get("/api/product/list/params/:subcategory", validator("params", paramsModelData),productController.getProductByCategory);
router.get("/api/product/:productid", validator("params", productIdShema), productController.getProductById);

export default router;
