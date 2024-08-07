import { ProductFilterService } from "../services/productFilterService.js";
import { ProductService } from "../services/productService.js";

export class GetProductsByQueriesUseCase {
	constructor() {
		this.productService = new ProductService();
		this.productFilterService = new ProductFilterService();
	}

	async execute(query) {
		/** Lógica de filtrado y paginación */
		const { perPage, skipCount } = this.productFilterService.pagination(query);
		const optionOrder = this.productFilterService.orderByField(query);
		const location = this.productFilterService.location(query);
		const price = this.productFilterService.priceRange(query);
		const searchQuery = this.productFilterService.searchQuery(query);

		/** Construir el filtro completo */
		const search = { ...searchQuery, ...location, ...price };

		/**llamada a la bd */
		const gigs = await this.productService.getProductsWithFilter(search, optionOrder, skipCount, perPage);

		/** Calcular el número de páginas */
		const ngigs = gigs.length;
		const nPages = Math.ceil(ngigs / perPage);

		return { gigs, ngigs, nPages };
	}
}
