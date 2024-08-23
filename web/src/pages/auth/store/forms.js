import { create } from "zustand";

export const useFormsStore = create((set) => ({
	form: "",
	isOpenModal: false,
	setChangeAction: (form) => set({ form }),
	setOpenModal: () => set({ isOpenModal: true }),
	setCloseModal: () => set({ isOpenModal: false }),
}));
