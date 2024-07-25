import { CategoryService } from "../services/caregoryService.js";
import createError from "http-errors";

export class CreateCategoryUseCase {
  constructor() {
    this.categoryService = new CategoryService();
  }

  async execute({ name, urlIcon, urlCover }) {
    const nameFilter = { name: { $regex: `^${name}$`, $options: "i" } };

    
    const categoryExists = await this.categoryService.findByField(nameFilter);
    
    if (categoryExists)
      throw createError.BadRequest("Esta categoría ya existe");

    const createdCategory = await this.categoryService.create({
      name,
      urlIcon,
      urlCover,
    });
    if (!createdCategory)
      throw createError.BadGateway("Error al crear el registro");

    return createdCategory;
  }
}
