import { AuthService } from "../services/authService.js";
import { UserService } from "../../../user/application/services/userService.js";
import { TokenService } from "../services/tokenService.js";
import createError from "http-errors";

export class RefreshTokenUseCase {
  constructor() {
    this.authService = new AuthService();
    this.tokenService = new TokenService();
    this.userService = new UserService();
  }

  async execute(token) {
    console.log(token)
    /*verifico si no existe una cookie */
    if (!token) throw createError.BadRequest("Token no proporcionado");

    //Verifico si es valido
    const decode = this.tokenService.verifyToken(token);
    console.log({ decode });

    /*crear RefreshToken*/
    const payloadrToken = { id: decode.id };
    const refreshToken = this.tokenService.createRfereshToken(payloadrToken);

    /* agrego al registro su respectivo accestoken */
    const user = await this.userService.getUserByField({ user: decode.id });
    if (!user) throw createError.NotFound("Usuario no encontrado");

    /*crear accessToken */
    const payloadaToken = { id: user._id, rol: user.rol };
    const accessToken = this.tokenService.createAccesToken(payloadaToken);

    return { accessToken, refreshToken };
  }
}