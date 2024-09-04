import { SkillService } from '../services/skillService.js';
import crypto from "crypto";

export class GetSkillUseCase {
    constructor() {
        this.skillService = new SkillService()
    }

    async execute(id) {
        const { skills } = await this.skillService.get(id)
        return skills
    }

}