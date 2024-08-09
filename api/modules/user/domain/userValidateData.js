import joi from "joi";

import Joi from 'joi';

const firstName = Joi.string().required().messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre no puede estar vacío",
    "any.required": "El nombre es requerido",
});

const lastName = Joi.string().required().messages({
    "string.base": "El apellido debe ser un texto",
    "string.empty": "El apellido no puede estar vacío",
    "any.required": "El apellido es requerido",
});

const displayName = Joi.string().required().messages({
    "string.base": "El nombre de usuario debe ser un texto",
    "string.empty": "El nombre de usuario no puede estar vacío",
    "any.required": "El nombre de usuario es requerido",
});

const gender = Joi.string().valid("M", "F", "O").required().messages({
    "string.base": "El género debe ser un texto",
    "any.only": "El género debe ser uno de los siguientes valores: M, F, O",
    "any.required": "El género es requerido",
    "string.empty": "El género no puede estar vacío",
});

const location = Joi.object({
    province: Joi.string().required().messages({
        "string.base": "La provincia debe ser un texto",
        "string.empty": "La provincia no puede estar vacía",
        "any.required": "La provincia es requerida",
    }),
    city: Joi.string().required().messages({
        "string.base": "La ciudad debe ser un texto",
        "string.empty": "La ciudad no puede estar vacía",
        "any.required": "La ciudad es requerida",
    }),
}).required().messages({
    "object.base": "La ubicación debe ser un objeto con provincia y ciudad",
    "any.required": "La ubicación es requerida",
});

const aboutMe = Joi.string().min(100).required().messages({
    "string.base": "La descripción debe ser un texto",
    "string.empty": "La descripción no puede estar vacía",
    "any.required": "La descripción es requerida",
    "string.min": "La descripción debe tener al menos 100 caracteres"
  })

const avatar = Joi.string().uri().required().messages({
    "string.base": "El avatar debe ser un texto",
    "string.uri": "El avatar debe ser una URL válida",
    "string.empty": "El avatar no puede estar vacío",
    "any.required": "El avatar es requerido",
});

const dateOfBirth = Joi.date().iso().required().messages({
    "date.base": "La fecha de nacimiento debe ser una fecha válida",
    "date.format": "La fecha de nacimiento debe estar en formato ISO",
    "date.empty": "La fecha de nacimiento no puede estar vacía",
    "any.required": "La fecha de nacimiento es requerida",
});

const levelOfEducation = Joi.string().valid("Primaria", "Secundaria", "Tercer nivel", "Cuarto Nivel").required().messages({
    "string.base": "El nivel de educación debe ser un texto",
    "any.only": "El nivel de educación debe ser uno de los siguientes: Primaria, Secundaria, Tercer nivel, Cuarto Nivel",
    "string.empty": "El nivel de educación no puede estar vacío",
    "any.required": "El nivel de educación es requerido",
});

const profession = Joi.string().required().messages({
    "string.base": "La profesión debe ser un texto",
    "string.empty": "La profesión no puede estar vacía",
    "any.required": "La profesión es requerida",
});




export const userSchema = joi.object({
	firstName,
    lastName,
    displayName,
    gender,
    location,
    aboutMe,
    avatar,
    dateOfBirth,
    levelOfEducation,
    profession

});
