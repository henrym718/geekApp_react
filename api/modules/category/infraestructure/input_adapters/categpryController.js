import { CreateCategoryUseCase } from "../../application/useCases/createCategoryUseCase.js";

export class CategoryController {
  constructor() {
    this.createCategoryUseCase = new CreateCategoryUseCase();

    this.createCategory = this.createCategory.bind(this);
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
}

//travelperking
