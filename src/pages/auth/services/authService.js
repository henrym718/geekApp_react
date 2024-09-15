import axiosPublic from "../../../api/axiosPublic"
import { endpoints } from '../../../api/endpoints';


class AuthService {
    async isAuhenticated(email) {
        const { data } = await axiosPublic.post("/auth/isauthenticated", email)
        return data
    }

    async loginWithCredential(credentials) {
        const { data } = await axiosPublic.post(endpoints.auth.loginCredentials(), credentials);
        return data
    };

    async checkEmail(email) {
        const { data } = await axiosPublic.get(endpoints.auth.checkEmailIsExist(email));
        return data
    }

    async checkUsername(username) {
        const { data } = await axiosPublic.get(endpoints.auth.checkUsernameIsExists(username));
        return data
    }

    async createAccount(credentials) {
        const { data } = await axiosPublic.post(endpoints.auth.createAccount(), credentials);
        return data
    };

    async getRefreshToken() {
        const { data } = await axiosPublic.get(endpoints.auth.getRefreshToken())
        return data
    }

    async checkCredential(credential) {
        const { data } = await axiosPublic.get(endpoints.auth.checkCredentialIsExists(credential));
        return data

    }

}

export default new AuthService()






