import axiosPublic from "../api/axiosPublic";
import { endpoints } from './../api/endpoints';


export const getRefreshToken = async () => {
    const { data } = await axiosPublic.get(endpoints.auth.getRefreshToken())
    return data

}

