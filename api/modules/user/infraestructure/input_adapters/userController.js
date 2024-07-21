import { GetCurrentUserByCookieUseCase } from "../../application/useCases/getCurrentUserByCookieUseCase.js";
import { UpdateUserUseCase } from "../../application/useCases/updateUserUseCase.js";

export class UserController {
  constructor() {
    this.getCurrentUserByCookieUseCase = new GetCurrentUserByCookieUseCase();
    this.updateUserUseCase = new UpdateUserUseCase();

    this.getCurrentUserByCookie = this.getCurrentUserByCookie.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  async getCurrentUserByCookie(req, res, next) {
    try {
      const result = await this.getCurrentUserByCookieUseCase.execute(
        req?.cookies
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const result = await this.updateUserUseCase.execute(req.email, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
