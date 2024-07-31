import { CreateCategoryUseCase } from "../../application/useCases/createCategoryUseCase.js";
import { GetCategoriesUseCase } from "../../application/useCases/getCategoriesUseCase.js";

export class CategoryController {
  constructor() {
    this.createCategoryUseCase = new CreateCategoryUseCase();
    this.getCategoriesUseCase = new GetCategoriesUseCase();

    this.createCategory = this.createCategory.bind(this);
    this.getCategories = this.getCategories.bind(this)
  }

  async createCategory(req, res, next) {
    try {
      const createdCategory = await this.createCategoryUseCase.execute(
        req.body
      );

      res.status(200).json(createdCategory);
    } catch (err) {
      next(err);
    }
  }

  async getCategories(req, res, next) {
    try {
      const categories = await this.getCategoriesUseCase.execute();
      res.status(200).json(categories)
    } catch (err) {
      next(err);
    }
  }
}

//travelperking
