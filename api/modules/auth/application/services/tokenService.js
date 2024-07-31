import jwt from "jsonwebtoken"

export class TokenService {
    createAccesToken(payload) {
        return jwt.sign(payload, process.env.KEY_TOKEN_SECRET, { expiresIn: "1h" })
    }

    createRfereshToken(payload) {
        return jwt.sign(payload, process.env.KEY_TOKEN_SECRET, { expiresIn: "1d" })
    }

    verifyToken(token) {
        return jwt.verify(token, process.env.KEY_TOKEN_SECRET)
    }

    decodeToken(token) {
        return jwt.decode(token)
    }

}

