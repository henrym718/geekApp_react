import joi from "joi";

const title = joi.string().required().messages({
	"string.base": "El título debe ser un texto.",
	"string.empty": "El título es obligatorio.",
	"any.required": "El título es obligatorio.",
});

const urlCover = joi.string().uri().required().messages({
	"string.base": "La URL de la portada debe ser un texto.",
	"string.uri": "La URL de la portada no es válida.",
	"string.empty": "La URL de la portada es obligatoria.",
	"any.required": "La URL de la portada es obligatoria.",
});

const aboutGig = joi.string().required().messages({
	"string.base": "La descripción del gig debe ser un texto.",
	"string.empty": "La descripción del gig es obligatoria.",
	"any.required": "La descripción del gig es obligatoria.",
});

const phone = joi
	.string()
	.pattern(/^\d{10}$/)
	.required()
	.messages({
		"string.base": "El teléfono debe ser un texto.",
		"string.pattern.base": "El teléfono debe tener 10 dígitos.",
		"string.empty": "El teléfono es obligatorio.",
		"any.required": "El teléfono es obligatorio.",
	});

const price = joi.number().min(0).required().messages({
	"number.base": "El precio debe ser un número.",
	"number.min": "El precio debe ser mayor o igual a 0.",
	"any.required": "El precio es obligatorio.",
});

const location = joi
	.object({
		province: joi.string().required().messages({
			"string.base": "La provincia debe ser un texto.",
			"string.empty": "La provincia es obligatoria.",
			"any.required": "La provincia es obligatoria.",
		}),
		city: joi.string().required().messages({
			"string.base": "La ciudad debe ser un texto.",
			"string.empty": "La ciudad es obligatoria.",
			"any.required": "La ciudad es obligatoria.",
		}),
	})
	.required()
	.messages({
		"object.base": "La ubicación debe ser un objeto.",
		"any.required": "La ubicación es obligatoria.",
	});

const tags = joi
	.array()
	.items(
		joi.string().messages({
			"string.base": "Cada tag debe ser un texto.",
		})
	)
	.min(1)
	.max(5)
	.required()
	.messages({
		"array.base": "Los tags deben ser un array.",
		"array.min": "Debe haber al menos un tag.",
		"array.max": "No pueden haber más de 5 tags.",
		"any.required": "Los tags son obligatorios.",
	});

const faq = joi
	.array()
	.items(
		joi
			.object({
				question: joi.string().required().messages({
					"string.base": "La pregunta debe ser un texto.",
					"string.empty": "La pregunta es obligatoria.",
					"any.required": "La pregunta es obligatoria.",
				}),
				answer: joi.string().required().messages({
					"string.base": "La respuesta debe ser un texto.",
					"string.empty": "La respuesta es obligatoria.",
					"any.required": "La respuesta es obligatoria.",
				}),
			})
			.messages({
				"object.base": "Cada FAQ debe ser un objeto.",
			})
	)
	.required()
	.messages({
		"array.base": "FAQ debe ser un array.",
		"any.required": "FAQ es obligatorio.",
	});

const userId = joi
	.string()
	.regex(/^[0-9a-fA-F]{24}$/)
	.required()
	.messages({
		"string.base": "El userId debe ser un texto.",
		"string.pattern.base": "El userId debe ser un ObjectId válido.",
		"string.empty": "El userId es obligatorio.",
		"any.required": "El userId es obligatorio.",
	});

const subcategory = joi
	.string()
	.regex(/^[0-9a-fA-F]{24}$/)
	.required()
	.messages({
		"string.base": "El subcategory debe ser un texto.",
		"string.pattern.base": "El subcategory debe ser un ObjectId válido.",
		"string.empty": "El subcategory es obligatorio.",
		"any.required": "El subcategory es obligatorio.",
	});

const search = joi.string().required().messages({
	"string.base": "El parametro de busqueda debe ser un texto.",
	"string.empty": "El parametro search es obligatorio.",
	"any.required": "El parametro search es obligatorio.",
});

const productid = joi
	.string()
	.regex(/^[0-9a-fA-F]{24}$/)
	.required()
	.messages({
		"string.base": "El parametro de busqueda debe ser un texto.",
		"string.empty": "El id del producto es obligatorio",
		"string.pattern.base": "EL id del producto debe ser un ObjectId valido",
		"eny.required": "EL id del producto es obligatorio",
	});


const min = joi.string();
const max = joi.string();
const city = joi.string();
const orderby = joi.string();
const page = joi.string();

const productModelData = joi.object({
	title,
	urlCover,
	aboutGig,
	phone,
	price,
	location,
	tags,
	faq,
	userId,
	subcategory,
});

const paramsModelData = joi.object({
	subcategory,
});
const queryModelData = joi.object({
	search,
	min,
	max,
	orderby,
	page,
	city,
});

const productIdShema = joi.object({
	productid,
});

export { productModelData, paramsModelData, queryModelData, productIdShema };
