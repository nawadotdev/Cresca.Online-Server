import { AuthTokenPayload, VerifyTokenResponse } from "../../types";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined")
}

export const CreateUserToken = (payload : AuthTokenPayload) => {

    return jwt.sign(payload, JWT_SECRET)

}

export const VerifyUserToken = (token: string) : VerifyTokenResponse => {

    if(!token){
        return {
            error: "No token provided",
            success: false,
        }
    }

    try{
        const payload = jwt.verify(token, JWT_SECRET) as AuthTokenPayload
        return {
            payload,
            success: true
        } 
    }catch(err){
        return {
            error: "Invalid token",
            success: false
        }
    }

}