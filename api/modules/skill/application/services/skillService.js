import { SkillRepository } from './../../infraestructure/output_adapter/skillRepository.js';

export class SkillService {
    constructor() {
        this.skillRepository = new SkillRepository();
    }
    async create(skill) {
        return await this.skillRepository.create(skill)
    }

    async update(id, skills) {
        return await this.skillRepository.update(id, skills)
    }

    async get(id) {
        return await this.skillRepository.get(id)
    }

}