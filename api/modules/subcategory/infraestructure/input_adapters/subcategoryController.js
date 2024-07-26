import { CreateSubCategoryUseCase } from "../../application/useCases/createSubCategoryUseCase.js";

export class SubcategoryController {
  constructor() {
    this.createSubCategoryUseCase = new CreateSubCategoryUseCase();

    this.createSubcategory = this.createSubcategory.bind(this);
  }

  async createSubcategory(req, res, next) {
    try {
      const subCategory = await this.createSubCategoryUseCase.execute(req.body);
      res.status(200).json(subCategory);
    } catch (err) {
      next(err);
    }
  }
}
