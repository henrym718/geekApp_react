import { create } from 'zustand';

const useFormsStore = create((set) => ({
    form: "CATEGORY",
    step: 1,
    setForm: (form) => set({ form }),
    addStep: () => set((state) => state.currentStep + 1),
    decreaseStep: () => set((state) => state.currentStep - 1)
}))

export default useFormsStore