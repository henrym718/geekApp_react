import joi from "joi";

const title = joi.string().required().messages({
  "string.empty": "El título es obligatorio.",
  "any.required": "El título es obligatorio.",
});

const urlCover = joi.string().uri().required().messages({
  "string.uri": "La URL de la portada no es válida.",
  "any.required": "La URL de la portada es obligatoria.",
});

const aboutGig = joi.string().required().messages({
  "string.empty": "La descripción del gig es obligatoria.",
  "any.required": "La descripción del gig es obligatoria.",
});

const phone = joi
  .string()
  .pattern(/^\d{10}$/)
  .required()
  .messages({
    "string.pattern.base": "El teléfono debe tener 10 dígitos.",
    "any.required": "El teléfono es obligatorio.",
  });

const price = joi.number().min(0).messages({
  "number.base": "El precio debe ser un número.",
  "number.min": "El precio debe ser mayor o igual a 0.",
});

const location = joi.object({
  province: joi.string().required().messages({
    "string.empty": "La provincia es obligatoria.",
    "any.required": "La provincia es obligatoria.",
  }),
  city: joi.string().required().messages({
    "string.empty": "La ciudad es obligatoria.",
    "any.required": "La ciudad es obligatoria.",
  }),
});

const tags = joi.array().items(joi.string()).min(1).max(5).messages({
  "array.base": "Los tags deben ser un array.",
  "array.min": "Debe haber al menos un tag.",
  "array.max": "No pueden haber más de 5 tags.",
});

const faq = joi.array().items(
  joi.object({
    question: joi.string().required().messages({
      "string.empty": "La pregunta es obligatoria.",
      "any.required": "La pregunta es obligatoria.",
    }),
    answer: joi.string().required().messages({
      "string.empty": "La respuesta es obligatoria.",
      "any.required": "La respuesta es obligatoria.",
    }),
  })
);

const createdBy = joi
  .string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    "string.pattern.base": "El createdBy debe ser un ObjectId válido.",
    "any.required": "El createdBy es obligatorio.",
  });

const subcategory = joi
  .string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    "string.pattern.base": "El subcategory debe ser un ObjectId válido.",
    "any.required": "El subcategory es obligatorio.",
  });

export const productModelData = joi.object({
  title,
  urlCover,
  aboutGig,
  phone,
  price,
  location,
  tags,
  faq,
  createdBy,
  subcategory,
});
