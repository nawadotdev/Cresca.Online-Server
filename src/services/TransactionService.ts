import { TransactionModel } from "../models"

const TransactionCreate = async (userId: string, amount: number, reason: string, product: string, routingFrom: number) => {

    return await TransactionModel.create({ userId, amount, reason, product, routingFrom })

}

const TransactionGet = async (userId: string) => {

    return await TransactionModel.find({ userId })

}

export const TransactionService = {
    TransactionCreate,
    TransactionRead: TransactionGet
}