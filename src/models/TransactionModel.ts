import { model, Schema } from "mongoose";
import { ITransaction } from "../types";

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
    reason: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    product: {
        type: String,
        required: true
    },
    routingFrom: {
        type: Number,
    }
}, { timestamps: true })

export const TransactionModel = model<ITransaction>("Transaction", transactionSchema)