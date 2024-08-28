
import { UserService } from '../../../user/application/services/userService.js'
import { UserFilterService } from '../../../user/application/services/userFilterService.js';


export class CheckUsernameIsExistsUseCase {
    constructor() {
        this.userService = new UserService()
        this.UserFilterService = new UserFilterService()
    }

    async execute(username) {
        const insensitiveRegexQuery = this.UserFilterService.insensitiveRegexQuery(username);
        const isExistsUsername = await this.userService.countDocuments({ username: insensitiveRegexQuery })
        return isExistsUsername > 0
    }
}

