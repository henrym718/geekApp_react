import { SubcaegoryService } from "../services/subcaegoryService.js";

export class GetSubcategoriesUseCase {
  constructor() {
    this.subcaegoryService = new SubcaegoryService();
  }

  async execute(categoryId) {
    const subcategories = await this.subcaegoryService.getAllByCategory(
      categoryId
    );

    return subcategories;
  }
}
