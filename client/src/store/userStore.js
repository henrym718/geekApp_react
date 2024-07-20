import { create } from "zustand"
import { getUserByCookie } from '../services/getUserByCookie'


export const useUserStore = create((set) => ({
    user: {
        rol: null
    },
    retryRequest: false,

    getUserByCookieApi: async () => {
        const dataUser = await getUserByCookie()
        set((state) => ({ ...state, user: { ...state.user, ...dataUser } }));
    },

    setRetryRequest: (value) => {
        set({ retryRequest: value })
    }

})) 