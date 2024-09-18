import axios from "axios";
import { getRefreshToken } from "../services/getRefreshToken";

const axiosPrivate = axios.create();

axiosPrivate.interceptors.response.use(
  (response) => {
    // Código que se ejecuta cuando la petición es exitosa
    // Aquí puedes modificar la respuesta antes de que sea procesada
    return response;
  },
  async (error) => {
    // Código que se ejecuta cuando ocurre un error
    // Aquí puedes manejar el error de manera personalizada
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      const accessToken = await getRefreshToken();
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      // Actualiza el header para futuras solicitudes
      axiosPrivate.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      // Vuelvo hacer la peticion
      return axiosPrivate(originalRequest);
    }

    //Respuesta si existe response cuando se responde co un error controlado
    const serverErrorResponse = {
      error: error?.response?.data.error,
      message: error?.response?.data.message,
      status: error?.response?.status,
    };

    //Respuesta si existe un error no controlado, ejemplo servidor caido
    const serverError = {
      error: true,
      message: "Ha ocurrido un error, intentelo más tarde",
    };
    return Promise.reject(error?.response ? serverErrorResponse : serverError); // Rechaza la promesa con el error pero sin el
  }
);
export default axiosPrivate;
