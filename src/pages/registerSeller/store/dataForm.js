import { create } from "zustand";

const useDataForm = create((set) => ({
  selectedSubcategories: [],
  selectedCategory: "",
  subCategories: [],
  skills: [],
  tags: [],
  career: "",
  jobs: [],
  education: [],

  /**Subcategory */
  setSelectedSubcategory: (array) =>
    set((state) => ({ selectedSubcategories: [...state.selectedSubcategories, array] })),
  updateSelectedSubcategory: (selectedSubcategories) => set({ selectedSubcategories }),
  clearSelectedSubCategories: () => set({ selectedSubcategories: [] }),

  /**Category */
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setListCategories: (subCategories) => set({ subCategories }),

  /**Skill to DB */
  setListSkills: (skills) => set((state) => ({ skills: [...state.skills, ...skills] })),
  setSkill: (skills) => set((state) => ({ skills: [...state.skills, skills] })),
  updateSkills: (deleteSkills) =>
    set((state) => ({ skills: state.skills.filter((skill) => !deleteSkills.includes(skill)) })),
  cleanSkills: () => set({ skills: [] }),

  /**Tags */
  setTag: (tag) => set((state) => ({ tags: [...state.tags, tag] })),
  removeTag: (tag) => set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
  cleanTags: () => set({ tags: [] }),

  /**Career */
  setCareer: (career) => set({ career }),
  cleanCareer: () => set({ career: "" }),

  /**Jobs */
  setJobs: (job) => set((state) => ({ jobs: [...state.jobs, job] })),
  removeJob: (index) => set((state) => ({ jobs: state.jobs.filter((_, i) => i !== index) })),

  /**Education */
  setEducation: (education) => set((state) => ({ education: [...state.education, education] })),
  removeEducation: (index) => set((state) => ({ education: state.education.filter((_, i) => i !== index) })),
}));

export default useDataForm;
