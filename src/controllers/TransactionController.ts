import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { ApiResponse } from "../utils";
import { BankingApi, TransactionService, UserService } from "../services";

const deposit = expressAsyncHandler(async (req: Request, res: Response) => {

    const { depositToken: token } = req.body

    if (!token) return ApiResponse.badRequest(res, "Token field is required")

    const user = req.user

    if (!user) return ApiResponse.unauthorized(res)

    const depositData = await BankingApi.CheckPayment(token)

    if (!depositData) return ApiResponse.badRequest(res, "Invalid token")

    if (!depositData.success) return ApiResponse.badRequest(res, depositData.error)

    await UserService.UserIncreaseBalance(user._id, depositData.payment)
    await TransactionService.TransactionCreate(user._id, depositData.payment, "Deposit", "Deposit", depositData.routing_from)

    return ApiResponse.success(res, { balance: user.balance + depositData.payment })

})

const getTransactions = expressAsyncHandler(async (req: Request, res: Response) => {

    const user = req.user

    if (!user) return ApiResponse.unauthorized(res)

    const transactions = await TransactionService.TransactionRead(user._id)

    return ApiResponse.success(res, { transactions })

})

export const TransactionController = {
    deposit,
    getTransactions
}