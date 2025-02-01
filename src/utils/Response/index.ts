import { Response } from "express";

export class ApiResponse{

    constructor(res: Response, status: number, message: string, data: any){
        res.status(status).json({
            status: status,
            message: message,
            data: data
        })
    }

    public static success(res: Response, data: any, message: string = "Success"): void {
        new ApiResponse(res, 200, message, data)
    }

    public static created(res: Response, data: any, message: string = "Created"): void {
        new ApiResponse(res, 201, message, data)
    }

    public static badRequest(res: Response, message: string = "Bad Request"): void {
        new ApiResponse(res, 400, message, null)
    }

    public static unauthorized(res: Response, message: string = "Unauthorized"): void {
        new ApiResponse(res, 401, message, null)
    }

    public static forbidden(res: Response, message: string = "Forbidden"): void {
        new ApiResponse(res, 403, message, null)
    }

    public static notFound(res: Response, message: string = "Not Found"): void {
        new ApiResponse(res, 404, message, null)
    }

    public static internalServerError(res: Response, message: string = "Internal Server Error"): void {
        new ApiResponse(res, 500, message, null)
    }

}