// http-errors/index.js
class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

// Crear errores específicos
const createError = (statusCode, message) => {
  class CustomError extends HttpError {
    constructor() {
      super(message, statusCode);
    }
  }
  return new CustomError();
};

// Funciones para crear errores específicos
const BadRequest = (message) =>
  createError(
    400,
    message || "Solicitud inválida. Revisa los datos y vuelve a intentarlo."
  );
const Unauthorized = () =>
  createError(
    401,
    message || "Se requiere autenticación para acceder al recurso solicitado."
  );
const NotFound = (message) =>
  createError(
    404,
    message || "El recurso solicitado no se encuentra en el servidor."
  );

// Exportar la clase HttpError y los errores específicos
export default {
  HttpError,
  NotFound,
  BadRequest,
  Unauthorized,
};
