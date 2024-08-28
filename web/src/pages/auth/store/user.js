import { create } from 'zustand';

const useUserStore = create((set) => ({
    user: {
        _id: null,
        email: null,
        firstName: null,
        lastName: null,
        username: null,
        gender: null,
        location: {
            province: null,
            city: null,
        },
        aboutMe: null,
        avatar: null,
        dateOfBirth: null,
        levelOfEducation: null,
        profession: null,
        memberSince: null,
        rol: null
    },

    setUser: (userData) => {
        const transformData = {
            ...userData,
            dateOfBirth: userData?.dateOfBirth ? new Date(userData.dateOfBirth) : null,
            memberSince: userData?.memberSince ? new Date(userData.memberSince) : null
        }
        set({ user: transformData })
    },
    setUpdateUser: (updateData) => set((state) => {
        const transformData = {
            ...updateData,
            dateOfBirth: updateData?.dateOfBirth ? new Date(updateData.dateOfBirth) : null,
            memberSince: updateData?.memberSince ? new Date(updateData.memberSince) : null
        }
        return {
            user: {
                ...state.user,
                ...transformData,
            }
        }
    }),
    cleanUser: () => set({
        user: {
            _id: null,
            email: null,
            firstName: null,
            lastName: null,
            username: null,
            gender: null,
            location: {
                province: null,
                city: null,
            },
            aboutMe: null,
            avatar: null,
            dateOfBirth: null,
            levelOfEducation: null,
            profession: null,
            memberSince: null,
            rol: null
        }
    })
}))



export default useUserStore;
