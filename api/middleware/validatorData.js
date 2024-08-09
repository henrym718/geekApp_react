import joi from "joi";

export const validator = (attribute, schema) => {
  return (req, res, next) => {
    try {
      req[attribute] = joi.attempt(req[attribute], schema, {
        abortEarly: true,
        stripUnknown: true,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

