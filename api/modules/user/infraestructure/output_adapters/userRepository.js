import { userModel } from "./userModel.js";

export class UserRepository {
  constructor() {
    this.userModel = userModel;
  }

  async createNewUser(user) {
    return await this.userModel.create(user);
  }

  async getUserByField(field) {
    return await this.userModel.findOne(field);
  }

  async updateUser(identifier, dataToUpdate) {
    return await this.userModel.findOneAndUpdate(
      identifier,
      { $set: { dataToUpdate } },
      { new: true }
    );
  }

  async;
}
