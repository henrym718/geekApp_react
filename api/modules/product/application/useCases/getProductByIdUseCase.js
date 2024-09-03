import { ProductService } from "../services/productService.js";
import createError from "../../../../shared/httpError.js";

export class GetProductByIdUseCase {
	constructor() {
		this.productService = new ProductService();
	}

	async execute(productid) {
		const product = await this.productService.getProductById(productid);
		if (!product) throw createError.NotFound("Producto no encontrado");
		return product;
	}
}
