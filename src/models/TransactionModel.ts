import { model, Schema } from "mongoose"
import { ITransaction } from "../types"

const transactionSchema = new Schema<ITransaction>({
    userId: {
        type: String,
        required: true,
        ref: "User"
    },
    amount: {
        type: Number,
        required: true
    },
    billId: {
        type: String,
        required: false,
        ref: "Bill"
    },
    depositToken: {
        type: String,
        required: false
    }
}, { timestamps: true })

export const TransactionModel = model<ITransaction>("Transaction", transactionSchema)