import axiosPrivate from "../../../api/axiosPrivate"

class NewGigService {

    async sendImageCover(file) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await axiosPrivate.post("/image/upload", formData)
        return data
    }

    async createGig(gig) {
        const { data } = await axiosPrivate.post("/product/create", gig)
        return data
    }


}

export default new NewGigService();
