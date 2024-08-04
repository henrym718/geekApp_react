import { AuthService } from "../services/authService.js";
import { UserService } from "../../../user/application/services/userService.js";
import { TokenService } from "../services/tokenService.js";
import createError from "../../../../shared/httpError.js";

export class RefreshTokenUseCase {
  constructor() {
    this.authService = new AuthService();
    this.tokenService = new TokenService();
    this.userService = new UserService();
  }

  async execute(token) {
    /*verifico si no existe una cookie */
    if (!token) throw createError.BadRequest("Token no proporcionado");

    //Verifico si es valido
    const decode = this.tokenService.verifyToken(token);

    /* agrego al registro su respectivo accestoken */
    const user = await this.userService.getUserByField({ userId: decode.id });
    if (!user) throw createError.NotFound("Usuario no encontrado");

    /*crear RefreshToken*/
    const payloadrToken = { id: decode.id };
    const refreshToken = this.tokenService.createRfereshToken(payloadrToken);

    /*crear accessToken */
    const payloadaToken = { id: decode.id, rol: user.rol };
    const accessToken = this.tokenService.createAccesToken(payloadaToken);

    return { accessToken, refreshToken };
  }
}
