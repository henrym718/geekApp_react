import { skillModel } from './skillModel.js';


export class SkillRepository {
    constructor() {
        this.model = skillModel
    }

    async create(skill) {
        return await this.model.create(skill)
    }

    async update(id, skills) {
        return await this.model.findByIdAndUpdate(id, { $addToSet: { skills: { $each: skills } } }, { new: true })
    }

    async get(id) {
        return await this.model.findById(id)
    }
}

