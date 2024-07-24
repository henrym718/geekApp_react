import {AwsRepository} from '../../infraestructure/output_adapters/awsRepository.js';
import path from "path";

export class ImageService {
    constructor() {
        this.awsRepository = new AwsRepository();
    }

    async uploadFile(file) {
        return await this.awsRepository.uploadFile(file)
    }

    async deleteFile(src) {
        const filename = this.getPathNameUrl(src)
        return await this.awsRepository.deleteFile(filename)
    }

    getPathNameUrl(src) {
        const url = new URL(src)
        const pathArray = url.pathname.split('/')
        return pathArray[pathArray.length - 1]
    }

    setFileName(file) {
        return `${new Date().getTime()}${path.extname(file.originalname)}`
    }
}

