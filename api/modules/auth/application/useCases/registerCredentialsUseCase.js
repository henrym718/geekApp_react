import { AuthService } from "../services/authService.js";
import { UserService } from "../../../user/application/services/userService.js";
import { TokenService } from "../services/tokenService.js";
import { PasswordService } from "../services/passwordService.js";
//  import createError from "http-errors";
import createError from "../../../../shared/httpError.js";


export class RegisterCredentialsUseCase {
  constructor() {
    this.authService = new AuthService();
    this.tokenService = new TokenService();
    this.userService = new UserService();
    this.passwordService = new PasswordService();
  }

  async execute(credentials) {
    try {
      /*obtener la data*/
      const { email, password } = credentials;

      /*comprobar que el usuario no exista para poder continuar*/
      const existsAuth = await this.authService.getAuthByfield({ email });
      if (existsAuth)
        throw createError.BadRequest("Ya existe un usuario con este email");

      /*encryptar contraseña*/
      const passwordEncrypted = this.passwordService.encryptPasswords(password);

      /* agrego al registro su respectivo refreshtoken */
      const auth = await this.authService.createNewRegisterAuth({
        email,
        password: passwordEncrypted,
      });
      if (!auth) throw createError.BadRequest("Error al crear el registro");

      /*crear RefreshToken para el usuario*/
      const payloadrt = { id: auth._id };
      const refreshToken = this.tokenService.createRfereshToken(payloadrt);

      /*creo el nuevo usuario con su email y su rol en la db user*/
      const user = await this.userService.createNewUser({
        userId: auth._id,
        email,
        rol: "BASICUSER",
      });
      if (!user) throw createError.BadRequest("Error al crear el registro");

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
