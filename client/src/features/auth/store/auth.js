import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    email: null,
    accion: "CHECK_EMAIL",

    setEmail: (email) => {
        set({ email })
    },
    setAccion: (accion) => {
        set({ accion })
    }
}))


