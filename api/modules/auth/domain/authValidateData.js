import joi from "joi"


const email = joi.string().email().messages({
    "string.email": "El email ingresado no es válido.",
    "string.base": "El email debe ser una cadena de texto.",
    "any.required": "El email es obligatorio."
})

const password = joi.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .messages({
        'string.base': 'La contraseña debe ser una cadena de texto.',
        'string.min': 'La contraseña debe tener al menos {#limit} caracteres.',
        'string.pattern.base': "La contraseña debe contener al menos una mayúscula, una minúscula y un número",
        'any.required': "La contraseña es requerida",
    })

const username = joi.string().alphanum().min(6).messages({
    "string.alphanum": "Intenta ingresar caracteres alfanumericos",
    'string.min': "Es demasiado corto. Un buen nombre de usuario debe tener al menos 6 caracteres.",
    'any.required': 'El nombre de usuario es un campo obligatorio.'


})

/** Esquemas */
export const login = joi.object({ email: email.required(), password: password.required() })
export const register = joi.object({ email: email.required(), password: password.required(), username: username.required() })
export const only_email = joi.object({ email: email.required() })
export const ony_username = joi.object({ username: username.required() })



