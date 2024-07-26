import { SubcategoryRepository } from "../../infraestructure/output_adapters/subcategoryRepository.js";

export class SubcaegoryService {
  constructor() {
    this.subcategoryRepository = new SubcategoryRepository();
  }

  async create(subcategory) {
    return await this.subcategoryRepository.create(subcategory);
  }

  async findByField(field) {
    return await this.subcategoryRepository.findByField(field);
  }
}
