import { UserService } from '../../../user/application/services/userService.js'
import { UserFilterService } from '../../../user/application/services/userFilterService.js'



export class CheckCredentialIsExistsUseCase {
    constructor() {
        this.userService = new UserService()
        this.userFilterService = new UserFilterService()

    }

    async execute(credential) {
        const insensitiveRegexQuery = this.userFilterService.insensitiveRegexQuery(credential)
        const createOrFindUser = this.userFilterService.createOrFindUser(insensitiveRegexQuery)
        const isExistsCredential = await this.userService.countDocuments(createOrFindUser)
        return isExistsCredential > 0
    }
}

