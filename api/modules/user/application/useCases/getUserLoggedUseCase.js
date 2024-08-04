import { UserService } from "../services/userService.js";
import createError from "../../../../shared/httpError.js";

export class GetUserLoggedUseCase {
  constructor() {
    this.userService = new UserService();
  }

  async execute(userId) {
    const user = await this.userService.getUserByField({ userId });
    if (!user) throw createError.NotFound("Uusario no encontrado");
    return { user };
  }
}
