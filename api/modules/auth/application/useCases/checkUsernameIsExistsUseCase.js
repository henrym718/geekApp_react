import { AuthService } from '../services/authService.js'
import { UserService } from '../../../user/application/services/userService.js'



class CheckUsernameIsExistsUseCase {
    constructor() {
        this.authService = new AuthService()
        this.userService = new UserService()
    }

    async execute(username) {
        const isExistsUsername = await this.userService.countDocuments({ username })
        return isExistsUsername > 0
    }
}

export default CheckUsernameIsExistsUseCase