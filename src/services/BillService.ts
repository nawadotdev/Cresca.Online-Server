import { BillModel } from "../models"
import { IEvent } from "../types"

const BillRead = async (id: string) => {

    return await BillModel.findById(id)

}

const BillCreate = async (userId: string, amount: number, products: Array<IEvent>) => {

    return await BillModel.create({ userId, amount, products })

}


export const BillService = {
    BillRead,
    BillCreate
}