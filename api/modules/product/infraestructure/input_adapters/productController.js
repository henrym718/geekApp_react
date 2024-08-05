import { CreateProductUseCase } from "../../application/useCases/createProductUseCase.js";
import { GetProductsTagsUseCase } from "../../application/useCases/getProductsTagsUseCase.js";
import { GetProductsByCategoryUseCase } from "../../application/useCases/getProductsByCategoryUseCase.js";
import { GetProductsByQueriesUseCase } from "./../../application/useCases/getProductsByQueriesUseCase..js";
import httpError from "http-errors";

class ProductController {
  constructor() {
    this.createProductUseCase = new CreateProductUseCase();
    this.getProductsTagsUseCase = new GetProductsTagsUseCase();
    this.getProductsByCategoryUseCase = new GetProductsByCategoryUseCase();
    this.getProductsByQueriesUseCase = new GetProductsByQueriesUseCase();

    this.createProduct = this.createProduct.bind(this);
    this.getProductsTags = this.getProductsTags.bind(this);
    this.listProducts = this.listProducts.bind(this);
  }

  async createProduct(req, res, next) {
    try {
      const data = { ...req.body, user: req.user };
      const response = await this.createProductUseCase.execute(data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  }

  async getProductsTags(req, res, next) {
    try {
      const { input } = req.query;
      const response = await this.getProductsTagsUseCase.execute(input);
      //            console.log(response)
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async listProducts(req, res, next) {
    try {
      let response;
      /**Flujo por paramns, cuando seleccionan una subcategoria */
      if (req?.params.category) {
        response = await this.getProductsByCategoryUseCase.execute(
          req.params.category,
          req?.query
        );
      }
      /**Flujo por queries, cuando usan el buscador */
      if (req?.query.search) {
        response = await this.getProductsByQueriesUseCase.execute(req.query);
      }
      /**Flujo si no se envian params ni queriees */
      if (!(req?.params.category && req?.query.search)) {
        httpError.BadRequest("Error en solicitud");
      }
      /**Respuesta al cliente */
      const { gigs, ngigs, nPages } = response;
      res.status(200).json({ gigs, ngigs, nPages });
    } catch (err) {
      next(err);
    }
  }
}

export default ProductController;
