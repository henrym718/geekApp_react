import { create } from "zustand"

export const useProfileStore = create((set) => ({
    data: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        city: "",
        sector: "",
        levelOfEducation: "",
        profession: "",
        avatar: "",
        displayName: "",
        aboutMe: ""
    },
    setDataStoreFn: (fields) => {
        set((state) => ({ data: { ...state.data, ...fields } }))
    }
}))
