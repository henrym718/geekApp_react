import { AuthService } from '../services/authService.js';

export class CheckEmailIsExistsUseCase {
    constructor() {
        this.authService = new AuthService();
    }
    async execute(email) {
        const isExistsEmail = await this.authService.countDocuments({ email });
        return isExistsEmail > 0
    }
}