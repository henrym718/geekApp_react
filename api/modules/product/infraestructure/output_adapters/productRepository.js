import { productModel } from "./productModel.js";

export class ProductRepository {
  constructor() {
    this.productModel = productModel;
  }

  async createProduct(product) {
    return await this.productModel.create(product);
  }
  async countDocuments(search) {
    return await this.productModel.countDocuments(search);
  }

  async getProductsByTags(field) {
    return await this.productModel.find(field).select("tags");
  }

  async getProductsWithFilter(filter, optionOrder, skipCount, perPage) {
    return await this.productModel.aggregate([
      { $match: filter },
      { $sort: optionOrder },
      { $skip: skipCount },
      { $limit: perPage },
    ]);
    // .find(filter).sort(optionOrder).skip(0 * 2).limit(2)
  }
}
