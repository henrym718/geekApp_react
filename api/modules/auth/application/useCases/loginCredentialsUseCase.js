import { AuthService } from "../services/authService.js";
import { TokenService } from "../services/tokenService.js";
import { PasswordService } from "../services/passwordService.js";
import createError from "http-errors";

export class LoginCredentialsUseCase {
  constructor() {
    this.authService = new AuthService();
    this.tokenService = new TokenService();
    this.passwordService = new PasswordService();
  }

  async execute(credentials) {
    const { email, password } = credentials;
    /*verifico si ya existe un usuario*/
    const auth = await this.authService.getAuthByfield({ email });
    if (!auth) throw createError.NotFound("Usuario no encontrado");

    /*valido la password*/
    const passwordsMatch = this.passwordService.validatePasswords(
      password,
      auth.password
    );
    if (!passwordsMatch) throw createError.BadRequest("Contraseña incorrecta");

    /*crear RefreshToken para el usuario*/
    const payload = { email: auth.email };
    const refreshToken = this.tokenService.createRfereshToken(payload);

    /*actualizo el refreshtoken en la db*/
    const response = await this.authService.updateRefreshToken(
      { email },
      { refreshToken }
    );
    if (response.acknowledged === false)
      throw createError(404, "Error al actualizar el refreshToken");

    return { refreshToken };
  }
}
