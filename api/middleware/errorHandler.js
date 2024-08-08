import joi from "joi";
import httpError from "../shared/httpError.js"
import jwt from "jsonwebtoken";

function errorLog(err, req, res, next) {
  console.error("An error occurred:");
  console.error(err?.details ?? err);
  next(err);
}

function errorHandler(err, req, res, next) {
  if (err instanceof httpError.HttpError) {
    return res.status(err.status).json({ error: true, message: err.message });
  }

  if (err instanceof joi.ValidationError) {
    return res
      .status(403)
      .json({ error: true, message: err.details[0].message });
  }

  if (err instanceof jwt.TokenExpiredError) {
    res.clearCookie("refreshToken");
    return res.status(401).json({ error: true, message: "Token expired" });
  }
  if (err instanceof jwt.JsonWebTokenError) {
    res.clearCookie("refreshToken");
    return res.status(401).json({ error: true, message: "Invalid token" });
  }
  if (err instanceof jwt.NotBeforeError) {
    res.clearCookie("refreshToken");
    return res.status(401).json({ error: true, message: "Invalid token" });
  }

  // Otros errores genéricos
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";
  res.status(status).json({ error: true, message });
}
export { errorLog, errorHandler };
