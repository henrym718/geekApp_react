import { CreateSubCategoryUseCase } from "../../application/useCases/createSubCategoryUseCase.js";
import { GetSubcategoriesUseCase } from "../../application/useCases/getSubcategoriesUseCase.js";

export class SubcategoryController {
  constructor() {
    this.createSubCategoryUseCase = new CreateSubCategoryUseCase();
    this.getSubcategoriesUseCase = new GetSubcategoriesUseCase();

    this.createSubcategory = this.createSubcategory.bind(this);
    this.getSubcategories =
      this.getSubcategories.bind(this);
  }

  async createSubcategory(req, res, next) {
    try {
      const subCategory = await this.createSubCategoryUseCase.execute(req.body);
      res.status(200).json(subCategory);
    } catch (err) {
      next(err);
    }
  }

  async getSubcategories(req, res, next) {
    try {
      const { categoryid } = req.params;
      const subCategories = await this.getSubcategoriesUseCase.execute(categoryid);
      res.status(200).json(subCategories)
    } catch (err) {
      next(err);

    }
  }
}
