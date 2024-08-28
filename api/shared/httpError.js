// http-errors/index.js
class HttpError extends Error {
  constructor(code, message) {
    super(message);
    this.status = code;
    this.name = this.constructor.name;
  }
}

// Crear errores específicos
const createError = (code, message) => {
  class CustomError extends HttpError {
    constructor() {
      super(code, message);
    }
  }
  return new CustomError();
};

// Funciones para crear errores específicos
const BadRequest = (message) => createError(400, message || "Solicitud inválida. Revisa los datos y vuelve a intentarlo.");
const Unauthorized = (message) => createError(401, message || "Se requiere autenticación para acceder al recurso solicitado.");
const NotFound = (message) => createError(404, message || "El recurso solicitado no se encuentra en el servidor.");
const ServiceUnavailable = (message) => createError(503, message || "El servidor no está en condiciones de manejar la solicitud.")

// Exportar la clase HttpError y los errores específicos
export default {
  HttpError,
  NotFound,
  BadRequest,
  Unauthorized,
  ServiceUnavailable
};
