import { AuthService } from '../services/authService.js';

export class CheckEmailIsExistsUseCase {
    constructor() {
        this.authService = new AuthService();
    }
    async execute(email) {
        const emailLower = email.toLowerCase();
        const isExistsEmail = await this.authService.countDocuments({ email: emailLower });
        return isExistsEmail > 0
    }
}