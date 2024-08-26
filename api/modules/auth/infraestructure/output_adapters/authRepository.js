import { authModel } from "./authModel.js";

export class AuthRepository {
  constructor() {
    this.authModel = authModel;
  }

  async getAuthByfield(field) {
    return await this.authModel.findOne(field);
  }

  async updateData(identifier, dataToUpdate) {
    return await this.authModel.updateOne(identifier, { $set: dataToUpdate });
  }

  async createNewRegisterAuth(data) {
    return await this.authModel.create(data);
  }

  async countDocuments(field) {
    return await this.authModel.countDocuments(field);
  }
}


