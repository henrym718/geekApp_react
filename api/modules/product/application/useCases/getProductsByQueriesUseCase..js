import {ProductFilterService} from "../services/productFilterService.js"
import {ProductService} from "../services/productService.js"


export class GetProductsByQueriesUseCase {
    constructor() {
        this.productService = new ProductService()
        this.productFilterService = new ProductFilterService()
    }

    async execute(queries) {
        console.log(queries)
        return 1

    }

}

