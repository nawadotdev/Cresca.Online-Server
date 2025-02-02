import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { ApiResponse } from "../utils";

const getMe = expressAsyncHandler(async (req: Request, res: Response) => {
    
    const user = req.user

    if (!user) return ApiResponse.unauthorized(res)

    return ApiResponse.success(res, { 
        user : {
            username: user.username,
            userRole: user.userRole,
            balance: user.balance
        }
     })

    

})

export const UserController = {
    getMe
}