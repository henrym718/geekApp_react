import { LoginCredentialsUseCase } from "../../application/useCases/loginCredentialsUseCase.js";
import { RegisterCredentialsUseCase } from "../../application/useCases/registerCredentialsUseCase.js";
import { LogoutUseCase } from "../../application/useCases/logoutUseCase.js";
import { RefreshTokenUseCase } from "../../application/useCases/refreshTokenUseCase.js";
import { ChekIsAuthenticatedUseCase } from "../../application/useCases/chekIsAuthenticatedUseCase.js";

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
      const { refreshToken } = await this.loginCredentialsUseCase.execute({
        email,
        password,
      });
      const refreshTokenOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      };
      res
        .cookie("refreshToken", refreshToken, refreshTokenOptions)
        .status(200)
        .send(true);
    } catch (error) {
      next(error);
    }
  }

  async registerCredentials(req, res, next) {
    try {
      const { email, password } = req.body;
      const refreshTokenOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      };
      const { refreshToken } = await this.registerCredentialsUseCase.execute({
        email,
        password,
      });
      res
        .cookie("refreshToken", refreshToken, refreshTokenOptions)
        .status(200)
        .send(true);
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

      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      };

      //respondo si es web
      if (req.platform === "web") {
        res.cookie("refreshToken", refreshToken, options);
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
