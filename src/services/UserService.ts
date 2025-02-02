import { UserModel } from "../models"

const UserRead = async (id: string) => {

    return await UserModel.findById(id)

}

const UserCreate = async (username: string, password: string, name: string, surname: string, phone: Number) => {

    return await UserModel.create({ username, password, name, surname, phone })

}

const UserUpdate = async (id: string, username: string, password: string) => {

    return await UserModel.findByIdAndUpdate(id, { username, password }, { new: true })

}

const UserDelete = async (id: string) => {

    return await UserModel.findByIdAndDelete(id)

}

const UserReadByUsername = async (username: string) => {

    return await UserModel.findOne({ username })

}

const UserIncreaseBalance = async (id: string, amount: number) => {

    return await UserModel.updateOne({ _id: id }, { $inc: { balance: amount } })

}

export const UserService = {
    UserRead,
    UserCreate,
    UserUpdate,
    UserDelete,
    UserReadByUsername,
    UserIncreaseBalance
}