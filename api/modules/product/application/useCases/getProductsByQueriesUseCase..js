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
		const city = this.productFilterService.city(query);
		const price = this.productFilterService.priceRange(query);
		const searchQuery = this.productFilterService.searchQuery(query);

		/** Construir el filtro completo */
		const search = { ...searchQuery, ...city, ...price };

		/** Determinar numero de paginas y productos */
		const ngigs = await this.productService.countProducts(search)
		const nPages = Math.ceil(ngigs / perPage);

		/**llamada a la bd */
		const gigs = ngigs ? await this.productService.getProductsWithFilter(search, optionOrder, skipCount, perPage): [];
		return { gigs, ngigs, nPages };
	}
}
