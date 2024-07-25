import { ProductService } from "../services/productService.js";

export class CreateProductUseCase {
  constructor() {
    this.productService = new ProductService();
  }
  async execute(product) {
    const response = await this.productService.createProduct(product);
    return response;
  }
}
