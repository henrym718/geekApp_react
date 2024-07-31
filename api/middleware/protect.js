import createError from "http-errors";
import { TokenService } from "../modules/auth/application/services/tokenService.js";

const tokenService = new TokenService();

export const protect = (accessRol) => {
  return (req, res, next) => {
    try {
      //valido que exista un accessToken
      const header = req?.headers?.authorization || req?.headers?.Authorization;
      const token = header?.split(" ")[1];

      if (!token) throw createError.BadRequest("No existe token");

      //valido que sea valido el accessToken
      const { id, rol } = tokenService.verifyToken(token);

      //Verifico si el rol del usuario tiene permisos al recurso
      if (!accessRol.includes(req.rol))
        throw createError(401, "No tiene permisos para este recurso");

      //asigno al objeto req los valores del token
      req.user = id;
      req.rol = rol;
      next();
    } catch (err) {
      next(err);
    }
  };
};
