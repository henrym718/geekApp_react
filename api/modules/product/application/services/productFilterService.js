export class ProductFilterService {
	orderByField(query) {
		const sortOrder = query?.orderby || "counter";
		const sortField = -1;
		const optionOrder = { [sortOrder]: sortField };
		return optionOrder;
	}
	priceRange(query) {
		const { min, max } = query;
		const price = {};
		if (!isNaN(min)) price.$gte = parseInt(min);
		if (!isNaN(max)) price.$lte = parseInt(max);
		return { price };
	}
	location(query) {
		const loc = { $regex: `^${query?.location}$`, $options: "i" };
		const location = { "location.city": loc };
		return location;
	}
	pagination(query) {
		const perPage = parseInt(process.env.GIGS_SHOW_BY_PAGE);
		const currentPage = parseInt(query?.page) || 1;
		const skipCount = parseInt((currentPage - 1) * perPage);
		return { perPage, skipCount };
	}
	searchQuery(query) {
		const str = query.search.replace(/-/g, "");
		const search = { $regex: str, $options: "i" };
		const searchQuery = { $or: [{ title: search }, { tags: search }] };
		return searchQuery;
	}
}
