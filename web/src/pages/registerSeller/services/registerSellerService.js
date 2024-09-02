import axiosPublic from './../../../api/axiosPublic';
import { endpoints } from './../../../api/endpoints';



class RegisterSellerService {
    async getAllSubcategories(id) {
        const { data } = await axiosPublic(endpoints.subcategory.getAllSubcategories(id))
        return data
    }
}

export default new RegisterSellerService()