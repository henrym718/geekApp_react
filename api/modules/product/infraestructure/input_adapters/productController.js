import { CreateProductUseCase } from "../../application/useCases/createProductUseCase.js";
import { GetProductsTagsUseCase } from "../../application/useCases/getProductsTagsUseCase.js";
import { GetProductsByCategoryUseCase } from "../../application/useCases/getProductsByCategoryUseCase.js";
import { GetProductsByQueriesUseCase } from "./../../application/useCases/getProductsByQueriesUseCase..js";

class ProductController {
	constructor() {
		this.createProductUseCase = new CreateProductUseCase();
		this.getProductsTagsUseCase = new GetProductsTagsUseCase();
		this.getProductsByCategoryUseCase = new GetProductsByCategoryUseCase();
		this.getProductsByQueriesUseCase = new GetProductsByQueriesUseCase();

		this.createProduct = this.createProduct.bind(this);
		this.getProductsTags = this.getProductsTags.bind(this);
		this.getProductByCategory = this.getProductByCategory.bind(this);
		this.getProductByQuery = this.getProductByQuery.bind(this);
	}

	async createProduct(req, res, next) {
		try {
			const data = { ...req.body, user: req.user };
			const response = await this.createProductUseCase.execute(data);
			res.status(200).send(response);
		} catch (err) {
			next(err);
		}
	}

	async getProductsTags(req, res, next) {
		try {
			const { input } = req.query;
			const response = await this.getProductsTagsUseCase.execute(input);
			//            console.log(response)
			res.status(200).json(response);
		} catch (err) {
			next(err);
		}
	}

	async getProductByCategory(req, res, next) {
		try {
			const { gigs, ngigs, nPages } = await this.getProductsByCategoryUseCase.execute(req.params.subcategory, req?.query);
			res.status(200).json({ gigs, ngigs, nPages });
		} catch (err) {
			next(err);
		}
	}

	async getProductByQuery(req, res, next) {
		try {
			const { gigs, ngigs, nPages } = await this.getProductsByQueriesUseCase.execute(req.query);
			res.status(200).json({ gigs, ngigs, nPages });
		} catch (err) {
			next(err);
		}
	}
}

export default ProductController;
