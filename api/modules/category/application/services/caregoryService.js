import { CategoryRepository } from "../../infraestructure/output_adaptars/categoryRepository.js";

export class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async create(category) {
    return await this.categoryRepository.create(category);
  }

  async findByField(field) {
    return await this.categoryRepository.findByField(field);
  }
}
