export const endpoints = {
    auth: {
        checkEmailIsExist: (email) => `/auth/checkemail/${email}`,
        checkUsernameIsExists: (username) => `/auth/checkusername/${username}`,
        getRefreshToken: () => "/auth/refreshtoken",
        createAccount: () => "/auth/registercredentials"

    }
}
