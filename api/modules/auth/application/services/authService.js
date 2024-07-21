import { AuthRepository } from "../../infraestructure/output_adapters/authRepository.js";

export class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async getAuthByfield(field) {
    return await this.authRepository.getAuthByfield(field);
  }

  async updateRefreshToken(identifier, refreshToken) {
    return await this.authRepository.updateData(identifier, refreshToken);
  }

  async createNewRegisterAuth(data) {
    return await this.authRepository.createNewRegisterAuth(data);
  }
}

