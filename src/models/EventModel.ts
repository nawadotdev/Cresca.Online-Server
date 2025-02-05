import { model, Schema } from "mongoose";
import { IEvent } from "../types";

const eventSchema = new Schema<IEvent>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        required: true
    },
    onSaleFrom: {
        type: Date,
        required: true
    },
    onSaleTo: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })

export const EventModel = model<IEvent>("Event", eventSchema);