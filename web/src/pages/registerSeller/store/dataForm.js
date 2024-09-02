import { create } from 'zustand';

const useDataForm = create((set) => ({
    selectedSubcategories: [],
    selectedCategory: "",
    subCategories: [],
    setSelectedSubcategory: (array) => set((state) => ({ selectedSubcategories: [...state.selectedSubcategories, array] })),
    updateSelectedSubcategory: (selectedSubcategories) => set({ selectedSubcategories }),
    clearSelectedSubCategories: () => set({ selectedSubcategories: [] }),
    setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
    setListCategories: (subCategories) => set({ subCategories })
}))

export default useDataForm