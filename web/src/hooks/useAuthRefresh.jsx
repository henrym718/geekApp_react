import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import { getRefreshToken } from "../services/getRefreshToken";
import axiosAuthenticated from "../api/axiosAuthenticated";

const useAuthRefresh = () => {
  const getUserByCookieApi = useUserStore((state) => state.getUserByCookieApi);
  const retryRequest = useUserStore((state) => state.retryRequest);

  // Función asíncrona que se ejecuta cada vez que cambia retryRequest
  useEffect(() => {
    const request = async () => {
      // Obtiene el token de acceso a partir del token de refresco
      const token = await getRefreshToken();
      // Si el token existe, lo asigna al encabezado de autorización de axios
      if (token?.accessToken) {
        axiosAuthenticated.defaults.headers[
          "Authorization"
        ] = `Bearer ${token?.accessToken}`;
      }
      // Obtiene los datos del usuario mediante la API
      await getUserByCookieApi();
    };

    // Ejecuta la función request
    request();
  }, [retryRequest]);
};

// Exporta la función useAuthRefresh
export default useAuthRefresh;
