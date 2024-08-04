import { GetUserLoggedUseCase } from "../../application/useCases/getUserLoggedUseCase.js";
import { UpdateUserUseCase } from "../../application/useCases/updateUserUseCase.js";

export class UserController {
  constructor() {
    this.updateUserUseCase = new UpdateUserUseCase();
    this.getUserLoggedUseCase = new GetUserLoggedUseCase()

    this.getUserLogged = this.getUserLogged.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  //Obtener el usuario logueado
  async getUserLogged(req, res, next) {
    try {
      const {user} = await this.getUserLoggedUseCase.execute(req.user)
      res.json(user)
    } catch (error) {
      next(error)
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
