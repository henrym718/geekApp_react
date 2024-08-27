import { create } from "zustand";

const useFormsStore = create((set) => ({
	form: "",
	isOpenModal: false,
	setChangeAction: (form) => set({ form }),
	setOpenModal: () => set({ isOpenModal: true }),
	setCloseModal: () => set({ isOpenModal: false }),
}));

export default useFormsStore;