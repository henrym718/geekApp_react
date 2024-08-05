export class ProductFilterService {
  orderByField(queryParams) {
    /**Recomendado */ /** por counter si esta por defecto */
    /**Nuevos arrivos */ /** siempre de mayor a menor */
    const sortOrder = queryParams?.orderby || "counter";
    const sortField = -1;
    const optionOrder = { [sortOrder]: sortField };
    return optionOrder;
  }

  priceRange(queryParams) {
    // Inicializar el objeto price vacío
    const price = {};

    // Extraer min y max de queryParams y parsear a enteros si son válidos
    const qMin = Number.isInteger(parseInt(queryParams?.min))
      ? parseInt(queryParams.min)
      : undefined;
    const qMax = Number.isInteger(parseInt(queryParams?.max))
      ? parseInt(queryParams.max)
      : undefined;

    // Asignar $gte y $lte a price si qMin y qMax son válidos
    if (qMin !== undefined) price.$gte = qMin;
    if (qMax !== undefined) price.$lte = qMax;

    // Retornar el objeto price si tiene propiedades, de lo contrario undefined
    return Object.keys(price).length > 0 ? { price } : undefined;
  }

  location(queryParams) {
    if (queryParams?.location) {
      const locationQuery = { $regex: `^${queryParams.location}$`, $options: "i" };
      const location = { "location.city": locationQuery };
      return location;
    }
    return undefined;
  }

  pagination(queryParams) {
    const perPage = parseInt(process.env.GIGS_SHOW_BY_PAGE);
    const currentPage = parseInt(queryParams?.page) || 1;
    const skipCount = parseInt((currentPage - 1) * perPage);
    return { perPage, skipCount };
  }
}
