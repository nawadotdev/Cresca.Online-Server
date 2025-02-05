import { TransactionModel } from "../models"

const TransactionRead = async (id: string, userId: string) => {

    return await TransactionModel.findOne({ _id: id, userId })

}

const TransactionCreate = async (userId: string, amount: number, depositToken?: string, billId?: string) => {

    if (depositToken && billId) throw new Error("Transaction cannot have both depositToken and billId")

    return await TransactionModel.create({ userId, amount, depositToken, billId })

}

const TransactionReadByUserId = async (userId: string) => {

    return await TransactionModel.find({ userId })

}

export const TransactionService = {
    TransactionRead,
    TransactionCreate,
    TransactionReadByUserId
}