import axiosPublic from "../../../api/axiosPublic"
import { endpoints } from '../../../api/endpoints';


class AuthService {
    async isAuhenticated(email) {
        const { data } = await axiosPublic.post("/auth/isauthenticated", email)
        return data
    }

    async loginUser(credentials) {
        const { data } = await axiosPublic.post("/auth/logincredentials", credentials);
        return data
    };

    async createUser(credentials) {
        const { data } = await axiosPublic.post("/auth/registercredentials", credentials);
        return data
    };

    async getRefreshToken() {
        const { data } = await axiosPublic.get(endpoints.auth.getRefreshToken())
        return data
    }
}

export default new AuthService()






