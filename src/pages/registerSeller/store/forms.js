import { create } from "zustand";

const useFormsStore = create((set) => ({
  form: "CATEGORY",
  currentStep: 1,
  setForm: (form) => set({ form }),
  addStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  decreaseStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
}));

export default useFormsStore;
