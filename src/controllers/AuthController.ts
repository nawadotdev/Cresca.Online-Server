import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import validator from "validator"
import { ApiResponse, CreateUserToken } from "../utils";
import { UserService } from "../services";
import { IUser } from "../types";

const register = expressAsyncHandler(async (req: Request, res: Response) => {

    const { username, password, name, surname, phone } = req.body

    if (!name || !surname || !phone) return ApiResponse.badRequest(res, "Name, surname and phone fields are required")


    if (!validator.isAlphanumeric(username) || !password) return ApiResponse.badRequest(res, "Invalid username or password")

    const userExists = await UserService.UserReadByUsername(username)

    if (userExists) return ApiResponse.badRequest(res, "Username already exists")

    const user = await UserService.UserCreate(username, password, name, surname, phone);

    return ApiResponse.created(res, {
        username: user.username
    })

})

const login = expressAsyncHandler(async (req: Request, res: Response) => {

    const { username, password } = req.body

    if (!validator.isAlphanumeric(username) || !password) return ApiResponse.badRequest(res, "Invalid username or password")


    const user = await UserService.UserReadByUsername(username)

    if (!user) {
        return ApiResponse.unauthorized(res)
    }

    if (!(user as IUser).confirmPassword(password)) {
        return ApiResponse.unauthorized(res)
    }

    const token = CreateUserToken({
        username: user.username,
        userId: user._id.toString()
    })

    return ApiResponse.success(res, { token })

})

export const AuthController = {
    register,
    login
}