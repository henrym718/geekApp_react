import joi from "joi"


const email = joi.string().email().messages({
    "string.email": "El email ingresado no es válido.",
    "string.base": "El email debe ser una cadena de texto.",
    "any.required": "El email es obligatorio."
})

const password = joi.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/).required()
    .messages({
        'string.base': 'La contraseña debe ser una cadena de texto.',
        'string.min': 'La contraseña debe tener al menos {#limit} caracteres.',
        'string.pattern.base': "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
    })

const username = joi.string().alphanum().min(6).required().messages({
    "string.alphanum": "Intenta ingresar caracteres alfanumericos",
    'string.min': "Es demasiado corto. Un buen nombre de usuario debe tener al menos 6 caracteres.",
    'any.required': 'El nombre de usuario es un campo obligatorio.'


})

export const login = joi.object({
    email,
    password
})

export const register = joi.object({
    email,
    password,
    username
})

export const only_email = joi.object({ email })
export const ony_username = joi.object({ username })




