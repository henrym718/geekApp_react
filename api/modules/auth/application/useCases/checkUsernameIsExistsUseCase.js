
import { UserFilterService } from '../../../user/application/services/userFilterService.js';
import { AuthService } from '../services/authService.js';

export class CheckUsernameIsExistsUseCase {
    constructor() {
        this.authService = new AuthService()
        this.userFilterService = new UserFilterService()
    }

    async execute(username) {
        const insensitiveRegexQuery = this.userFilterService.insensitiveRegexQuery(username.trim());
        const isExistsUsername = await this.authService.countDocuments({ username: insensitiveRegexQuery })
        return isExistsUsername > 0
    }
}

