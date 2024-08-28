export class UserFilterService {
    insensitiveRegexQuery(string) {
        return { $regex: `^${string}$`, $options: "i" }
    }

    createOrFindUser(text) {
        return { $or: [{ email: text }, { username: text }] }
    }

}