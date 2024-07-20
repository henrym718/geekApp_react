import axiosAuthenticated from '../../../api/axiosAuthenticated';

class profileServices {

    async uploadAvatar(file) {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const { data } = await axiosAuthenticated.post("/image/upload", formData);
            return data
        } catch (error) {
            console.log(error)

        }
    }

    async updateDataUser(dataUser) {
        const { data } = await axiosAuthenticated.post("/user/createuser", dataUser)
        return data
    }
}


export default new profileServices();