
import { UserService } from '../../../user/application/services/userService.js'

class CheckUsernameIsExistsUseCase {
    constructor() {
        this.userService = new UserService()
    }

    async execute(username) {
        const usernameRegex = this.userService.regexUsername(username);

        const isExistsUsername = await this.userService.countDocuments({ username: usernameRegex })
        return isExistsUsername > 0
    }
}

export default CheckUsernameIsExistsUseCase