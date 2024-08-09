import { UserRepository } from "../../infraestructure/output_adapters/userRepository.js";

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createNewUser(user) {
    return await this.userRepository.createNewUser(user);
  }

  async updateUser(userid, dataToUpdate) {
    return await this.userRepository.updateUser(userid, dataToUpdate);
  }

  async getUserByField(field) {
    return await this.userRepository.getUserByField(field);
  }
}
