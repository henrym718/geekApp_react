import axiosUnauthenticated from "../../../api/axiosUnauthenticated"

class AuthService {
    async isAuhenticated(email) {
        const { data } = await axiosUnauthenticated.post("/auth/isauthenticated", email)
        return data
    }

    async loginUser(credentials) {
        const { data } = await axiosUnauthenticated.post("/auth/logincredentials", credentials);
        return data
    };

    async createUser(credentials) {
        const { data } = await axiosUnauthenticated.post("/auth/registercredentials", credentials);
        return data
    };
}

export default new AuthService()






