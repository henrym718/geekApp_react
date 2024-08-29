import { AuthService } from "../services/authService.js";
import { UserService } from "../../../user/application/services/userService.js";
import { UserFilterService } from '../../../user/application/services/userFilterService.js';

import { TokenService } from "../services/tokenService.js";
import { PasswordService } from "../services/passwordService.js";
import createError from "../../../../shared/httpError.js";

export class LoginCredentialsUseCase {
  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
    this.tokenService = new TokenService();
    this.passwordService = new PasswordService();
    this.userFilterService = new UserFilterService()
  }

  async execute(credentials) {
    const { credential, password } = credentials;
    /*verifico si ya existe un usuario*/
    const insensitiveRegexQuery = this.userFilterService.insensitiveRegexQuery(credential?.trim())
    const queyOrFind = this.userFilterService.createOrFindUser(insensitiveRegexQuery)
    const auth = await this.authService.getAuthByfield(queyOrFind);
    if (!auth) throw createError.NotFound("Parece que aun no tienes una cuenta creada");

    /*valido la password*/
    const passwordsMatch = this.passwordService.validatePasswords(password, auth.password);
    if (!passwordsMatch) throw createError.BadRequest("La contraseña ingresada es incorrecta");

    /**Obtengo el usuario para devolverlo en la respuesto */
    const user = await this.userService.getUserById(auth._id);
    if (!user) throw createError.NotFound("Uusario no encontrado");

    /*crear RefreshToken para el usuario*/
    const payloadrt = { id: auth._id };
    const refreshToken = this.tokenService.createRfereshToken(payloadrt);

    /**crear el accessToken */
    const payloadat = { id: auth._id, rol: user.rol };
    const accessToken = this.tokenService.createAccesToken(payloadat);

    return { refreshToken, accessToken, user };
  }
}
