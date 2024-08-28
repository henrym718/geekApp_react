import { UserService } from '../../../user/application/services/userService.js'
import { UserFilterService } from '../../../user/application/services/userFilterService.js'



export class CheckCredentialIsExistsUseCase {
    constructor() {
        this.userService = new UserService()
        this.UserFilterService = new UserFilterService()

    }

    async execute(credential) {
        const insensitiveRegexQuery = this.UserFilterService.insensitiveRegexQuery(credential)
        const createOrFindUser = this.UserFilterService.createOrFindUser(insensitiveRegexQuery)
        const isExistsCredential = await this.userService.countDocuments(createOrFindUser)
        return isExistsCredential > 0
    }
}

