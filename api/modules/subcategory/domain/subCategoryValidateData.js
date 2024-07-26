import joi from "joi";

const name = joi.string().required().messages({
  "string.base": "El nombre debe ser un texto.",
  "string.empty": "El nombre es un campo requerido.",
  "any.required": "El nombre es un campo requerido.",
});

const urlCover = joi.string().uri().required().messages({
  "string.base": "La URL de la portada debe ser un texto.",
  "string.uri": "La URL de la portada debe ser una URL válida.",
  "string.empty": "La URL de la portada es un campo requerido.",
  "any.required": "La URL de la portada es un campo requerido.",
});

const urlIcon = joi.string().uri().required().messages({
  "string.base": "La URL del ícono debe ser un texto.",
  "string.uri": "La URL del ícono debe ser una URL válida.",
  "string.empty": "La URL del ícono es un campo requerido.",
  "any.required": "La URL del ícono es un campo requerido.",
});
const category = joi.string().hex().length(24).messages({
  "string.hex.length": "La categoría debe ser un hexadecimal de 24 caracteres.",
  "string.empty": "La URL de la portada es un campo requerido.",
  "any.required": "El campo categoría es requerido.",
});

export const subCategoryModelData = joi.object({
  name,
  urlIcon,
  urlCover,
  category,
});
