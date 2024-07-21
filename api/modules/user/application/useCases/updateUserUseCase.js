import { UserService } from "../services/userService.js";

export class UpdateUserUseCase {
  constructor() {
    this.userService = new UserService();
  }
  async execute(email, dataUser) {
    //si cambio el email por id en la cookie debere modificar esto a findbyid
    const dataUpdate = { ...dataUser, rol: "COMPLETEUSER" };
    const result = await this.userService.updateUser({ email }, { dataUpdate });
    if (!result) throw createError.BadGateway("Error al actualizar");

    return user;
  }
}
