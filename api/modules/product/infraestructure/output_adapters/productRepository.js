import { productModel } from "./productModel.js";
import { convertToObjectId } from "../../../../shared/convertToObjectId.js";

export class ProductRepository {
	constructor() {
		this.productModel = productModel;
	}

	async createProduct(product) {
		return await this.productModel.create(product);
	}

	async getProductsByTags(field) {
		return await this.productModel.find(field).select("tags");
	}

	async countProducts(search) {
		return await this.productModel.countDocuments(search);
	}

	async getProductsWithFilter(search, optionOrder, skipCount, perPage) {
		return await this.productModel.aggregate([
			{ $match: search },
			{ $skip: skipCount },
			{ $sort: optionOrder },
			{ $limit: perPage },
		]);
	}

	async getProductById(productid) {
		return await this.productModel.findByIdAndUpdate(productid, { $inc: { counter: 1 } }, { new: true }).populate({
			path: "userId",
			model: "User",
			select: "-rol",
		});
	}
}
