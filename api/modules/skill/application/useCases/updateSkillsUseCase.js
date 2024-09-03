import { SkillService } from './../services/skillService.js';
import createError from "../../../../shared/httpError.js"



export class UpdateSkillsUseCase {
    constructor() {
        this.skillService = new SkillService()
    }

    async execute(id, skills) {
        const results = await this.skillService.update(id, skills)
        if (!results) createError.NotFound()
        return results
    }
}