export const endpoints = {
    auth: {
        checkEmailIsExist: (email) => `/auth/checkemail/${email}`,
        checkUsernameIsExists: (username) => `/auth/checkusername/${username}`,
        checkCredentialIsExists: (credential) => `/auth/checkcredential/${credential}`,
        loginCredentials: () => "/auth/logincredentials",
        getRefreshToken: () => "/auth/refreshtoken",
        createAccount: () => "/auth/registercredentials"
    },
    subcategory: {
        getSubcategoriesbyId: (id) => `/subcategory/get/${id}`,
    },
    skill: {
        getSkillsbyId: (id) => `/skill/get/${id}`
    }
}
