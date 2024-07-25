import { categoryModel } from "./categoryModel.js";

export class CategoryRepository {
  constructor() {
    this.model = categoryModel;
  }

  async create(category) {
    return await this.model.create(category);
  }

  async findByField(field) {
    return await this.model.findOne(field);
  }
}
