import { ProductFilterService } from "../services/productFilterService.js";
import { ProductService } from "../services/productService.js";

export class GetProductsByCategoryUseCase {
  constructor() {
    this.productService = new ProductService();
    this.productFilterService = new ProductFilterService();
  }

  async execute(idCategory, queryFilter) {
    /** paginacion */
    const { perPage, skipCount } =
      this.productFilterService.pagination(queryFilter);

    /** ordenacion */
    const optionOrder = this.productFilterService.orderByField(queryFilter);

    /** filtrar por ubicacion */
    const location = this.productFilterService.location(queryFilter);

    /**filtrar por rango de precio */
    const price = this.productFilterService.priceRange(queryFilter);

    /** filtrar por categoria */
    const category = { subcategory: idCategory };

    /** Unificar criterios de busqueda y filtrado */
    const search = { ...category, ...location, ...price };

    /**llamada a la bd */
    const gigs = await this.productService.getProductsWithFilter(
      search,
      optionOrder,
      skipCount,
      perPage
    );

    /**Saber numero de paginas de la query */
    const ngigs = gigs.length;
    const nPages = Math.ceil(ngigs / perPage);

    /**retornar los resultados */
    return { gigs, ngigs, nPages };
  }
}
