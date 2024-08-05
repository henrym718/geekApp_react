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

  async getProductsWithFilter(search, optionOrder, skipCount, perPage) {
    if (search.subcategory) {
      search.subcategory = convertToObjectId(search.subcategory);
    }
    console.log(search);
    
    return await this.productModel.aggregate([
      { $match: search },
      { $sort: optionOrder },
      { $skip: skipCount },
      { $limit: perPage },
    ]);
  }
}
