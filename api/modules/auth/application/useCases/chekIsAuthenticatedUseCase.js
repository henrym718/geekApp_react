import { AuthService } from "../services/authService.js";

export class ChekIsAuthenticatedUseCase {
  constructor() {
    this.authService = new AuthService();
  }

  async execute(email) {
    const auth = await this.authService.getAuthByfield({ email });
    return { autheticate: !!auth };
  }
}

