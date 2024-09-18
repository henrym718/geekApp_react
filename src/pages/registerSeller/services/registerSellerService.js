import axiosPublic from "./../../../api/axiosPublic";
import { endpoints } from "./../../../api/endpoints";

class RegisterSellerService {
  async getAllSubcategories(id) {
    const { data } = await axiosPublic.get(endpoints.subcategory.getSubcategoriesbyId(id));
    return data;
  }

  async getSkillsById(id) {
    const { data } = await axiosPublic.get(endpoints.skill.getSkillsbyId(id));
    return data;
  }
}

export default new RegisterSellerService();
