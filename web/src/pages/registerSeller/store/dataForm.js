import { create } from 'zustand';

const useDataForm = create((set) => ({
    selectedSubcategories: [],
    selectedCategory: "",
    subCategories: [],
    skills: [],
    setSelectedSubcategory: (array) => set((state) => ({ selectedSubcategories: [...state.selectedSubcategories, array] })),
    updateSelectedSubcategory: (selectedSubcategories) => set({ selectedSubcategories }),
    clearSelectedSubCategories: () => set({ selectedSubcategories: [] }),
    setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
    setListCategories: (subCategories) => set({ subCategories }),
    setListSkills: (skills) => set((state) => ({ skills: [...state.skills, ...skills] })),
    updateSkills: (deleteSkills) => set((state) => ({ skills: state.skills.filter((skill) => !deleteSkills.includes(skill)) })),
    cleanSkills: () => set({ skills: [] })
}))

export default useDataForm