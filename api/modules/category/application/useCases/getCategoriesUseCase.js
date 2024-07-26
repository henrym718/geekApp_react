import { CategoryService } from "../services/caregoryService.js";

export class GetCategoriesUseCase {
  constructor() {
    this.categoryService = new CategoryService();
  }

  async execute() {
    const categpries = await this.categoryService.getCategories()
    return categpries
  }
}
