import { EventModel } from "../models"

const EventCreate = async (owner: string, name: string, description: string, date: Date, imageUrl: string, featured: boolean, onSaleFrom: Date, onSaleTo: Date, price: number) => {

    return await EventModel.create({ owner, name, description, date, imageUrl, featured, onSaleFrom, onSaleTo, price })

}

const EventRead = async (id: string) => {

    return await EventModel.findById(id)

}

const EventReadByOwner = async (owner: string) => {

    return await EventModel.find({ owner })

}

const EventReadAll = async () => {

    return await EventModel.find({})

}

const EventReadFeatured = async () => {

    return await EventModel.find({ featured: true })

}

const EventUpdate = (
    id: string,
    updates: {
        name?: string,
        description?: string,
        date?: Date,
        imageUrl?: string,
        featured?: string,
        onSaleFrom?: Date,
        onSaleTo?: Date,
        price?: number
    },
    owner?: string
) => {

    const filter: { _id: string; owner?: string } = { _id: id };
    if (owner) filter.owner = owner;

    return EventModel.findOneAndUpdate(filter, updates, { new: true })
    

}

export const EventService = {
    EventCreate,
    EventRead,
    EventReadByOwner,
    EventReadAll,
    EventUpdate,
    EventReadFeatured
}