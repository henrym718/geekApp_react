import { create } from "zustand";

export const useAuthStore = create((set) => ({
	email: null,
	action: "LOGIN",
	isOpenModal: false,
	setEmail: (email) => set({ email }),
	setChangeAction: (action) => set({ action }),
	setOpenModal: () => set({ isOpenModal: true }),
	setCloseModal: () => set({ isOpenModal: false }),
}));
