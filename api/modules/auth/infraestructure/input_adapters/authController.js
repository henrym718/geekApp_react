import { LoginCredentialsUseCase } from "../../application/useCases/loginCredentialsUseCase.js";
import { LogoutUseCase } from "../../application/useCases/logoutUseCase.js";
import { RefreshTokenUseCase } from "../../application/useCases/refreshTokenUseCase.js";
import { ChekIsAuthenticatedUseCase } from "../../application/useCases/chekIsAuthenticatedUseCase.js";
import { RegisterCredentialsUseCase } from "../../application/useCases/registerCredentialsUseCase.js";
import { CheckEmailIsExistsUseCase } from "../../application/useCases/checkEmailIsExistsUseCase.js"
import { CheckUsernameIsExistsUseCase } from './../../application/useCases/checkUsernameIsExistsUseCase.js';
import { CheckCredentialIsExistsUseCase } from '../../application/useCases/CheckCredentialIsExistsUseCase.js';
import { env } from "../../../../config/env.js";

export class AuthController {
  constructor() {
    this.loginCredentialsUseCase = new LoginCredentialsUseCase();
    this.registerCredentialsUseCase = new RegisterCredentialsUseCase();
    this.logoutUseCase = new LogoutUseCase();
    this.refreshTokenUseCase = new RefreshTokenUseCase();
    this.chekIsAuthenticatedUseCase = new ChekIsAuthenticatedUseCase();
    this.checkEmailIsExistsUseCase = new CheckEmailIsExistsUseCase();
    this.checkUernameIsExistsUseCase = new CheckUsernameIsExistsUseCase();
    this.checkCredentialIsExistsUseCase = new CheckCredentialIsExistsUseCase();

    this.loginCredentials = this.loginCredentials.bind(this);
    this.registerCredentials = this.registerCredentials.bind(this);
    this.logout = this.logout.bind(this);
    this.getRefreshToken = this.getRefreshToken.bind(this);
    this.checkIsAuthenticated = this.checkIsAuthenticated.bind(this);
    this.checkEmailIsExists = this.checkEmailIsExists.bind(this)
    this.checkUernameIsExists = this.checkUernameIsExists.bind(this)
    this.checkCredentialIsExists = this.checkCredentialIsExists.bind(this)
  }

  async loginCredentials(req, res, next) {
    try {
      const { email, password } = req.body;
      const { refreshToken, accessToken, user } =
        await this.loginCredentialsUseCase.execute({ email, password });

      if (req.platform === "web") {
        res
          .cookie("refreshToken", refreshToken, env.OPTIONS_COOKIE)
          .status(200).json({ accessToken, user });
      }

      if (req.platform === "mobile") {
        res
          .status(200)
          .json({ refreshToken, accessToken, user });
      }
    } catch (error) {
      next(error);
    }
  }

  async registerCredentials(req, res, next) {
    try {
      const { refreshToken, accessToken, user } = await this.registerCredentialsUseCase.execute(req.body);

      if (req.platform === "web") {
        res
          .status(200)
          .cookie("refreshToken", refreshToken, env.OPTIONS_COOKIE)
          .json({ accessToken, user });
      }

      if (req.platform === "mobile") {
        res.status(200).json({ refreshToken, accessToken, user });
      }
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      await this.logoutUseCase.execute(req?.cookies);
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logout exitoso" });
    } catch (error) {
      next(error);
    }
  }

  async getRefreshToken(req, res, next) {
    try {
      //Obtengo el refreshToken si es web o si es movil
      const token = req?.cookies?.refreshToken || req?.headers?.refreshToken;
      const { accessToken, refreshToken } = await this.refreshTokenUseCase.execute(token);

      //respondo si es web
      if (req.platform === "web") {
        res.cookie("refreshToken", refreshToken, env.OPTIONS_COOKIE);
        res.status(200).json({ accessToken });
      }

      //respondo si es mobile
      if (req.platform === "mobile") {
        res.status(200).json({ accessToken, refreshToken });
      }
    } catch (error) {
      next(error);
    }
  }

  async checkIsAuthenticated(req, res, next) {
    try {
      const email = req.body.email.toLowerCase();
      const { autheticate } = await this.chekIsAuthenticatedUseCase.execute(email);
      res.status(200).json(autheticate);
    } catch (error) {
      next(error);
    }
  }

  async checkEmailIsExists(req, res, next) {
    try {
      const existsEmail = await this.checkEmailIsExistsUseCase.execute(req.params.email);
      res.status(200).json(existsEmail)
    } catch (error) {
      next(error);
    }
  }
  async checkUernameIsExists(req, res, next) {
    try {
      const existsUsername = await this.checkUernameIsExistsUseCase.execute(req.params.username);
      res.status(200).json(existsUsername)
    } catch (error) {
      next(error)
    }
  }

  async checkCredentialIsExists(req, res, next) {
    try {
      const existsCredential = await this.checkCredentialIsExistsUseCase.execute(req.params.credential)
      res.status(200).json(existsCredential)
    } catch (error) {
      next(error)
    }
  }
}
