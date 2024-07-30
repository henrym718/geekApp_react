import { subcategoryModel } from "./subcategpryModel.js";

export class SubcategoryRepository {
  constructor() {
    this.model = subcategoryModel;
  }

  //Crea una nueva subcategoria
  async create(subcategory) {
    return await this.model.create(subcategory);
  }

  //Obtiene una categoria por un campo especfico
  async findByField(field){
    return await this.model.findOne(field)
  }

  //Obtiene todas la subcategorias de una categoria
  async getAllByCategory(categoryId) {
    return await this.model.find({ category: categoryId });
  }
}
