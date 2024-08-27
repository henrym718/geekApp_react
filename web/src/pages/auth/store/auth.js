import { create } from "zustand";

const useAuthStore = create((set) => ({
	email: null,
	password: null,
	username: null,
	setEmail: (email) => set({ email }),
	setPassword: (password) => set({ password }),
	setUsername: (username) => set({ username })
}));

export default useAuthStore;