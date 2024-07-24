import axiosUnauthenticated from "../api/axiosUnauthenticated"

export const getRefreshToken = async () => {
    const { data } = await axiosUnauthenticated.get("/auth/refreshtoken")
    return data

}

