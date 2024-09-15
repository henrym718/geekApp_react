import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import AuthService from "../pages/auth/services/authService";
import axiosPrivate from "../api/axiosPrivate";

const useAuthRefresh = () => {
  const getUserByCookieApi = useUserStore((state) => state.getUserByCookieApi);
  const retryRequest = useUserStore((state) => state.retryRequest);

  // Función asíncrona que se ejecuta cada vez que cambia retryRequest
  useEffect(() => {
    const request = async () => {
      // Obtiene el token de acceso a partir del token de refresco
      const token = await AuthService.getRefreshToken();
      // Si el token existe, lo asigna al encabezado de autorización de axios
      if (token?.accessToken) {
        axiosPrivate.defaults.headers["Authorization"] = `Bearer ${token?.accessToken}`;
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
