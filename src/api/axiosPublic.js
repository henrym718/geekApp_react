import axios from "axios";

const axiosPublic = axios.create();

axiosPublic.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
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

export default axiosPublic;
