import jwt from 'jsonwebtoken'

const TOKEN_SECRET = 'TOKENSECRET';

export function generateToken(uid: number | any, pwdhash: number | any) {
    let payload = {
        uid: uid,
        password: pwdhash
    };

    let token = jwt.sign(payload, TOKEN_SECRET);
    return token;
}

export function decodeToken(token: string | any) {
    try {
        return jwt.verify(token, TOKEN_SECRET);
    } catch (error) {
        throw error;
    }
}