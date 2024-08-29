import { AuthService } from "../services/authService.js";
import { UserFilterService } from '../../../user/application/services/userFilterService.js';
import { UserService } from "../../../user/application/services/userService.js";
import { TokenService } from "../services/tokenService.js";
import { PasswordService } from "../services/passwordService.js";
import createError from "../../../../shared/httpError.js";


export class RegisterCredentialsUseCase {
  constructor() {
    this.authService = new AuthService();
    this.tokenService = new TokenService();
    this.userService = new UserService();
    this.passwordService = new PasswordService();
    this.userFilterService = new UserFilterService
  }

  async execute(credentials) {
    try {
      /*obtener la data*/
      const { email: emailUpper, password, username } = credentials;


      /*normalizo los datos */
      const email = emailUpper.toLowerCase();
      const usernameRegex = this.userFilterService.insensitiveRegexQuery(username);

      /*comprobar que el email no exista para poder continuar*/
      const existsEmail = await this.authService.countDocuments({ email });
      if (existsEmail) throw createError.BadRequest("Ya existe un usuario con este email");

      /*compruebo que no existe un username */
      const existsUsername = await this.userService.countDocuments({ username: usernameRegex })
      if (existsUsername) throw createError.BadRequest("Ya existe un usuario con este username");

      /*encryptar contraseña*/
      const passwordEncrypted = this.passwordService.encryptPasswords(password);

      /* agrego al registro su respectivo refreshtoken */
      const auth = await this.authService.createNewRegisterAuth({
        email,
        username,
        password: passwordEncrypted,
      });
      if (!auth) throw createError.ServiceUnavailable("Error al crear el registro");

      /*crear RefreshToken para el usuario*/
      const payloadrt = { id: auth._id };
      const refreshToken = this.tokenService.createRfereshToken(payloadrt);

      /*creo el nuevo usuario con su email y su rol en la db user*/
      const user = await this.userService.createNewUser({
        _id: auth._id,
        email,
        username,
        rol: "AUTHENTICATED",
      });
      if (!user) throw createError.ServiceUnavailable("Error al crear el registro en la base de datos");

      /*crear AccessToken para el usuario*/
      const payloadat = { id: auth._id, rol: user.rol };
      const accessToken = this.tokenService.createAccesToken(payloadat);

      /*retornar el token*/
      return { refreshToken, accessToken, user };
    } catch (err) {
      throw err;
    }
  }
}


