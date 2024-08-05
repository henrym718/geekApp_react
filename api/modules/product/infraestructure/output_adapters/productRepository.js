import { productModel } from "./productModel.js";
import {convertToObjectId} from "../../../../shared/convertToObjectId.js"

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

  async getProductsWithFilter(search, optionOrder, skipCount, perPage) {
    search.subcategory = convertToObjectId(search.subcategory ); 
    console.log(search.subcategory)

    return await this.productModel.aggregate([
      { $match: search },
      { $sort: optionOrder },
      { $skip: skipCount },
      { $limit: perPage },
    ]);
  }
}
