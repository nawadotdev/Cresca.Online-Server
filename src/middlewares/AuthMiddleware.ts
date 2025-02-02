import expressAsyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { ApiResponse, VerifyUserToken } from "../utils";
import { UserService } from "../services";

export const AuthMiddleware = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const header = req.headers.authorization

    if (!header) return ApiResponse.unauthorized(res)

    const token = header.split(" ")[1]

    if (!token) return ApiResponse.unauthorized(res)

    const verifyToken = VerifyUserToken(token)

    if (!verifyToken.success || !verifyToken.payload) return ApiResponse.unauthorized(res)

    const user = await UserService.UserRead(verifyToken.payload.userId)

    if (!user) return ApiResponse.unauthorized(res)

    if(user.passwordChangedAt && user.passwordChangedAt > verifyToken.payload.iat) return ApiResponse.unauthorized(res)

    req.user = user

    next()


})