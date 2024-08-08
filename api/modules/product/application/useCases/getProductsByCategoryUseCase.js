import { convertToObjectId } from "../../../../shared/convertToObjectId.js";
import { ProductFilterService } from "../services/productFilterService.js";
import { ProductService } from "../services/productService.js";


export class GetProductsByCategoryUseCase {
	constructor() {
		this.productService = new ProductService();
		this.productFilterService = new ProductFilterService();
	}

	async execute(subcategoryid, query) {
		/** Lógica de filtrado y paginación */
		const { perPage, skipCount } = this.productFilterService.pagination(query);
		const optionOrder = this.productFilterService.orderByField(query);
		const city = this.productFilterService.city(query);
		const price = this.productFilterService.priceRange(query);
		const subcategory = { subcategory: convertToObjectId(subcategoryid) };
		

		/** Construir el filtro completo */
		const search = { ...subcategory, ...city, ...price };

		/** Determinar numero de paginas y productos */
		const ngigs = await this.productService.countProducts(search);
		const nPages = Math.ceil(ngigs / perPage);

		/**llamada a la bd */
		const gigs = ngigs ? await this.productService.getProductsWithFilter(search, optionOrder, skipCount, perPage) : [];

		return { gigs, ngigs, nPages };
	}
}
