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
    const { min, max } = queryParams;
    const price = {};
    if (!isNaN(min)) price.$gte = parseInt(min);
    if (!isNaN(max)) price.$lte = parseInt(max);
    return Object.keys(price).length ? { price } : undefined;
  }

  location(queryParams) {
    if (queryParams?.location) {
      const locationQuery = {
        $regex: `^${queryParams.location}$`,
        $options: "i",
      };
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
