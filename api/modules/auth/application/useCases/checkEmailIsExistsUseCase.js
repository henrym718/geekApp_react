import { AuthService } from '../services/authService.js';
import { UserFilterService } from '../../../user/application/services/userFilterService.js';

export class CheckEmailIsExistsUseCase {
    constructor() {
        this.authService = new AuthService();
        this.userFilterService = new UserFilterService()
    }
    async execute(email) {
        const insensitiveRegexQuery = this.userFilterService.insensitiveRegexQuery(email)
        const isExistsEmail = await this.authService.countDocuments({ email: insensitiveRegexQuery });
        return isExistsEmail > 0
    }
}

