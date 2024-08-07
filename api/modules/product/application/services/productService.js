import { ProductRepository } from "../../infraestructure/output_adapters/productRepository.js";

export class ProductService {
	constructor() {
		this.productRepository = new ProductRepository();
	}

	async createProduct(product) {
		return await this.productRepository.createProduct(product);
	}

	async getProductsByTags(search) {
		return await this.productRepository.getProductsByTags(search);
	}

	async getProductsWithFilter(search, optionOrder, skipCount, perPage) {
		return await this.productRepository.getProductsWithFilter(search, optionOrder, skipCount, perPage);
	}
}
