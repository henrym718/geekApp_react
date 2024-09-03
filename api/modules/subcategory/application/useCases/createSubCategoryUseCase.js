import { SubcaegoryService } from "../services/subcaegoryService.js";
import { SkillService } from './../../../skill/application/services/skillService.js';
import createError from "../../../../shared/httpError.js";

export class CreateSubCategoryUseCase {
  constructor() {
    this.subcaegoryService = new SubcaegoryService();
    this.skillService = new SkillService();
  }

  async execute({ name, urlIcon, urlCover, category }) {
    //Verifico sí ya existe el registro
    const nameFilter = { name: { $regex: `^${name}$` } };
    const exists = await this.subcaegoryService.findByField(nameFilter);
    if (exists)
      throw createError.BadRequest("Ya existe este recurso en nuestra db");

    //Creo el recurso en la db
    const subCategory = await this.subcaegoryService.create({
      name,
      urlIcon,
      urlCover,
      category,
    });

    //Creo el recurso en la db para skill
    await this.skillService.create({ _id: subCategory._id })

    //Respondo el recurso creado
    return subCategory;
  }
}
