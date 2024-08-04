import jwt from "jsonwebtoken"
import { env } from "../../../../config/env.js"

export class TokenService {
    createAccesToken(payload) {
        return jwt.sign(payload, process.env.KEY_TOKEN_SECRET, { expiresIn: env.EXPIRE_ACCESS_TOKEN })
    }

    createRfereshToken(payload) {
        return jwt.sign(payload, process.env.KEY_TOKEN_SECRET, { expiresIn: env.EXPIRE_REFRESH_TOKEN })
    }

    verifyToken(token) {
        return jwt.verify(token, process.env.KEY_TOKEN_SECRET)
    }

    decodeToken(token) {
        return jwt.decode(token)
    }

}

