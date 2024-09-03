import { UpdateSkillsUseCase } from './../../application/useCases/updateSkillsUseCase.js';
import { GetSkillUseCase } from '../../application/useCases/getSkillUseCase.js';


export class SkillController {
    constructor() {
        this.updateSkillsUseCase = new UpdateSkillsUseCase()
        this.getSkillUseCase = new GetSkillUseCase()

        this.update = this.update.bind(this);
        this.get = this.get.bind(this);
    }

    async update(req, res, next) {
        try {
            const skills = await this.updateSkillsUseCase.execute(req.params.id, req.body.skills)
            res.status(200).json(skills)

        } catch (error) {
            next(error)
        }
    }

    async get(req, res, next) {
        try {
            const skills = await this.getSkillUseCase.execute(req.params.id)
            res.status(200).json(skills)
        } catch (error) {
            next(error)
        }
    }

}