import { IBill } from "../types";
import { Schema, model } from "mongoose";

const billSchema = new Schema<IBill>({
    userId: {
        type: String,
        required: true,
        ref: "User"
    },
    amount: {
        type: Number,
        required: true
    },
    products: [
        {
            type: {
                name : {
                    type: String,
                    required: true,
                    trim: true
                },
                description : {
                    type: String,
                    required: true,
                    trim: true
                },
                price: {
                    type: Number,
                    required: true
                },
                imageUrl: {
                    type: String,
                    required: true
                },
                date: {
                    type: Date,
                    required: true
                }
            }
        }
    ]

}, { timestamps: true })

export const BillModel = model<IBill>("Bill", billSchema);