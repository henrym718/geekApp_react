import { LoginCredentialsUseCase } from "../../application/useCases/loginCredentialsUseCase.js";
import { RegisterCredentialsUseCase } from "../../application/useCases/registerCredentialsUseCase.js";
import { LogoutUseCase } from "../../application/useCases/logoutUseCase.js";
import { RefreshTokenUseCase } from "../../application/useCases/refreshTokenUseCase.js";
import { ChekIsAuthenticatedUseCase } from "../../application/useCases/chekIsAuthenticatedUseCase.js";
import { env } from "../../../../config/env.js";

export class AuthController {
  constructor() {
    this.loginCredentialsUseCase = new LoginCredentialsUseCase();
    this.registerCredentialsUseCase = new RegisterCredentialsUseCase();
    this.logoutUseCase = new LogoutUseCase();
    this.refreshTokenUseCase = new RefreshTokenUseCase();
    this.chekIsAuthenticatedUseCase = new ChekIsAuthenticatedUseCase();

    this.loginCredentials = this.loginCredentials.bind(this);
    this.registerCredentials = this.registerCredentials.bind(this);
    this.logout = this.logout.bind(this);
    this.getRefreshToken = this.getRefreshToken.bind(this);
    this.chekIsAuthenticated = this.chekIsAuthenticated.bind(this);
  }

  async loginCredentials(req, res, next) {
    try {
      const { email, password } = req.body;
      const { refreshToken, accessToken, user } =
        await this.loginCredentialsUseCase.execute({
          email,
          password,
        });

      if (req.platform === "web") {
        res
          .cookie("refreshToken", refreshToken, env.OPTIONS_COOKIE)
          .status(200)
          .json({ accessToken, user });
      }

      if (req.platform === "mobile") {
        res.status(200).json({ refreshToken, accessToken, user });
      }
    } catch (error) {
      next(error);
    }
  }

  async registerCredentials(req, res, next) {
    try {
      const { refreshToken, accessToken, user } =
        await this.registerCredentialsUseCase.execute(req.body);

      if (req.platform === "web") {
        res
          .cookie("refreshToken", refreshToken, env.OPTIONS_COOKIE)
          .status(200)
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
      const { accessToken, refreshToken } =
        await this.refreshTokenUseCase.execute(token);

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

  async chekIsAuthenticated(req, res, next) {
    try {
      const email = req.body.email.toLowerCase();
      const { autheticate } = await this.chekIsAuthenticatedUseCase.execute(
        email
      );
      res.status(200).json(autheticate);
    } catch (error) {
      next(error);
    }
  }
}
