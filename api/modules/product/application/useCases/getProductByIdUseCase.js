import { ProductService } from "../services/productService.js";
import createERror from "../../../../shared/httpError.js";

export class GetProductByIdUseCase {
	constructor() {
		this.productService = new ProductService();
	}

	async execute(productid) {
		const product = await this.productService.getProductById(productid);
		if (!product) throw createERror.NotFound("Producto no encontrado");
		return product;
	}
}
