import { AuthService } from "../services/authService.js";
import { UserService } from "../../../user/application/services/userService.js";
import { TokenService } from "../services/tokenService.js";
import { PasswordService } from "../services/passwordService.js";
import createError from "http-errors";

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
      const user = await this.authService.getAuthByfield({ email });
      if (user) throw createError.NotFound("Usuario encontrado");

      /*encryptar contraseña*/
      const passwordEncrypted = this.passwordService.encryptPasswords(password);

      /*crear RefreshToken para el usuario*/
      const payload = { id: user._id };
      const refreshToken = this.tokenService.createRfereshToken(payload);

      /* agrego al registro su respectivo refreshtoken */
      const response = await this.authService.createNewRegisterAuth({
        email,
        password: passwordEncrypted,
        refreshToken,
      });
      if (!response) throw createError.BadGateway("Error al crear el registro");

      /*creo el nuevo usuario con su email y su rol en la db user*/
      const result = await this.userService.createNewUser({
        userId: user._id,
        email,
        rol: "BASICUSER",
      });
      if (!result) throw createError.BadGateway("Error al crear el registro");

      /*retornar el token*/
      return { refreshToken };
    } catch (err) {
      throw err;
    }
  }
}
