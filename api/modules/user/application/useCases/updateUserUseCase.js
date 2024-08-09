import { UserService } from "../services/userService.js";
import createError from "../../../../shared/httpError.js";

export class UpdateUserUseCase {
	constructor() {
		this.userService = new UserService();
	}
	async execute(userid, dataUser) {
		dataUser.rol = "COMPLETEUSER";
		const updateUser = await this.userService.updateUser(userid, dataUser);
		if (!updateUser) throw createError.NotFound("Error al actualizar");

		return updateUser;
	}
}
