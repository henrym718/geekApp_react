import createError from "http-errors";

export const checkPlatform = () => {
	return (req, _, next) => {
		try {
			//verifico si existe el header
			const platform = req?.headers?.platform;
			if (!platform) throw createError.BadRequest("Incluir el header platform");

			//verifico si la plataforma esta permitida
			if (!["mobile", "web"].includes(platform)) throw createError.BadRequest("Plataforma no permitida");

			//asigno al objeto req la plataforma
			req.platform = platform;
			next();
		} catch (err) {
			next(err);
		}
	};
};
