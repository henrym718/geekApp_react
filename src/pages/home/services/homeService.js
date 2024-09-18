import axiosUnauthenticated from "../../../api/axiosUnauthenticated.js";

class HomeService {
  async getOptionesSearch(query) {
    const { data } = await axiosUnauthenticated.get(`/product/search?input=${query}`);
    console.log(data);
    return data;
  }
}

export default new HomeService();
