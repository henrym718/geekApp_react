import { ProductFilterService } from "../services/productFilterService.js";
import { ProductService } from "../services/productService.js";

export class GetProductsByQueriesUseCase {
  constructor() {
    this.productService = new ProductService();
    this.productFilterService = new ProductFilterService();
  }

  async execute(queries) {
    /**Paginacion */
    const { perPage, skipCount } =
      this.productFilterService.pagination(queries);

    /**Ordenacion */
    const optionOrder = this.productFilterService.orderByField(queries);

    /**FIltrar por ubicacion */
    const location = this.productFilterService.location(queries);

    /**Filtrar por rango de precio */
    const price = this.productFilterService.priceRange(queries);

    /** Parametro de busqueda principal */
    const str = queries.search.replace(/-/g, " ");
    const parameter = { $regex: str, $options: "i" };
    const filter = { $or: [{ title: parameter }, { tags: parameter }] };
    console.log(filter);

    /** Unificar criterios de busqueda y filtrado */
    const search = { ...filter, ...location, ...price };

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

    return { gigs, ngigs, nPages };
  }
}

