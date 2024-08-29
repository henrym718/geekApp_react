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

	async updateUser(userid, dataToUpdate) {
		return await this.userModel.findByIdAndUpdate(userid, { $set: dataToUpdate }, { new: true });
	}

	async countDocuments(field) {
		return await this.userModel.countDocuments(field);
	}

	async getUserById(id) {
		return await this.userModel.findById(id)
	}
}
