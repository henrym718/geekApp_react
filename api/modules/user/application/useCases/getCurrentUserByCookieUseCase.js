import jwt from "jsonwebtoken";
import { UserService } from "../services/userService.js";

export class GetCurrentUserByCookieUseCase {
  constructor() {
    this.userService = new UserService();
  }
  async execute(cookie) {
    const token = cookie?.refreshToken;
    if (!token) {
      return { rol: "PUBLICUSER" };
    }

    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.KEY_TOKEN_SECRET, async (err, payload) => {
        if (err) {
          reject({ rol: "PUBLICUSER" });
        } else {
          const user = await this.userService.getUserByField({
            email: payload.email,
          });
          resolve(user);
        }
      });
    });
  }
}
