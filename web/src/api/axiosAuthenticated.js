import axios from "axios";
import { getRefreshToken } from "../services/getRefreshToken";

const axiosAuthenticated = axios.create();
axiosAuthenticated.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401) {
            const newToken = await getRefreshToken();
            if (newToken?.accessToken) {
                originalRequest.headers.Authorization = `Bearer ${newToken?.accessToken}`;
                // Actualiza el header para futuras solicitudes
                axiosAuthenticated.defaults.headers.common["Authorization"] = `Bearer ${newToken?.accessToken}`;
                return axiosAuthenticated(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosAuthenticated;
