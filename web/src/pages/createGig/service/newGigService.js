import axiosAuthenticated from "../../../api/axiosAuthenticated"

class NewGigService {

    async sendImageCover(file) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await axiosAuthenticated.post("/image/upload", formData)
        return data
    }

    async createGig(gig) {
        const { data } = await axiosAuthenticated.post("/product/create", gig)
        return data
    }


}

export default new NewGigService();
