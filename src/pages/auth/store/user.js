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
            ...(userData?.dateOfBirth && { dateOfBirth: new Date(userData.dateOfBirth) }),
            ...(userData?.memberSince && { memberSince: new Date(userData.memberSince) })
        }
        set({ user: transformData })
    },
    setUpdateUser: (updateData) => set((state) => {
        const transformData = {
            ...updateData,
            ...(updateData?.dateOfBirth && { dateOfBirth: new Date(updateData.dateOfBirth) }),
            ...(updateData?.memberSince && { memberSince: new Date(updateData.memberSince) })
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
