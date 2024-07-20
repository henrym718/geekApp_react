import axios from "axios"
const endPoint = "http://localhost:8000/api"

const axiosUnauthenticated = axios.create({
    baseURL: endPoint,
    withCredentials: true

})

export default axiosUnauthenticated








