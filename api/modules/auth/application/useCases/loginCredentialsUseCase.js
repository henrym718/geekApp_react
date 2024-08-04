import { AuthService } from "../services/authService.js";
import { TokenService } from "../services/tokenService.js";
import { PasswordService } from "../services/passwordService.js";
import createError from "../../../../shared/httpError.js";

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
    const payload = { id: auth._id };
    const refreshToken = this.tokenService.createRfereshToken(payload);

;

    return { refreshToken };
  }
}
