import axios from "axios"
import { getRefreshToken } from '../services/getRefreshToken';

const endPoint = "http://localhost:8000/api"

const axiosAuthenticated = axios.create({
    baseURL: endPoint,
    withCredentials: true,
})
axiosAuthenticated.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401) {
            const newToken = await getRefreshToken();
            if (newToken?.accessToken) {
                originalRequest.headers.Authorization = `Bearer ${newToken?.accessToken}`;
                // Actualiza el header para futuras solicitudes
                axiosAuthenticated.defaults.headers["Authorization"] = `Bearer ${newToken?.accessToken}`;
                return axiosAuthenticated(originalRequest);
            }
        }
        return Promise.reject(error);
    }
)

export default axiosAuthenticated;




