import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { BankingApi, EventService, TransactionService, UserService } from "../services";
import { ApiResponse } from "../utils";
import { BillService } from "../services/BillService";

const getTransactions = expressAsyncHandler(async (req: Request, res: Response) => {

    const user = req.user

    if (!user) return ApiResponse.unauthorized(res)

    const data = await TransactionService.TransactionReadByUserId(user._id)

    const dataToSend = data.map((transaction) => {
        return {
            id: transaction._id,
            amount: transaction.amount,
            depositToken: transaction.depositToken,
            billId: transaction.billId
        }
    })

    return ApiResponse.success(res, { transactions: dataToSend })
})

const createTransaction = expressAsyncHandler(async (req: Request, res: Response) => {

    const user = req.user
    const { amount, depositToken, billId } = req.body

    if (!user) return ApiResponse.unauthorized(res)

    if (!amount) return ApiResponse.badRequest(res, "Amount is required")

    if (typeof amount !== "number") return ApiResponse.badRequest(res, "Amount must be a number")

    const data = await TransactionService.TransactionCreate(user._id, amount, depositToken, billId)

    return ApiResponse.created(res, {
        id: data._id
    })


})

const getTransaction = expressAsyncHandler(async (req: Request, res: Response) => {

    const user = req.user

    if (!user) return ApiResponse.unauthorized(res)

    const { id } = req.params

    const transaction = await TransactionService.TransactionRead(id, user._id)

    if (!transaction) return ApiResponse.notFound(res)

    return ApiResponse.success(res, {
        id: transaction._id,
        amount: transaction.amount,
        depositToken: transaction.depositToken,
        billId: transaction.billId
    })

})

const deposit = expressAsyncHandler(async (req: Request, res: Response) => {

    const user = req.user

    if (!user) return ApiResponse.unauthorized(res)

    const { token } = req.body

    if (!token) return ApiResponse.badRequest(res, "Token is required")

    const confirmToken = await BankingApi.CheckPayment(token)

    if (!confirmToken.success) return ApiResponse.badRequest(res, confirmToken.error)

    const data = await TransactionService.TransactionCreate(user._id, confirmToken.payment, token)

    const balance = await UserService.UserIncreaseBalance(user._id, confirmToken.payment)

    return ApiResponse.created(res, {
        id: data._id,
        newBalance: balance
    })
})

const pay = expressAsyncHandler(async (req: Request, res: Response) => {

    const user = req.user

    if (!user) return ApiResponse.unauthorized(res)

    const { events } = req.body

    if (!events) return ApiResponse.badRequest(res, "Events are required")

    const eventObjects = await Promise.all(events.map(async (event: string) => {
        const eventObject = await EventService.EventRead(event)
        if (!eventObject) return null
        if (new Date() < eventObject.onSaleFrom || new Date() > eventObject.onSaleTo) return null
        return eventObject
    }))

    if (eventObjects.includes(null)) return ApiResponse.badRequest(res, "Invalid event id")

    const amount = eventObjects.reduce((acc, event) => {
        return acc + event.price
    }, 0)

    const balance = await UserService.UserDecreaseBalance(user._id, amount)

    const bill = await BillService.BillCreate(user._id, amount, events) 

    const data = await TransactionService.TransactionCreate(user._id, amount, undefined, bill._id)

    return ApiResponse.created(res, {
        id: data._id,
        newBalance: balance
    })

})

export const TransactionController = {
    getTransactions,
    createTransaction,
    getTransaction,
    deposit,
    pay
}