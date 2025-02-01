import mongoose from "mongoose"

export const connectDB = async (mongoURI: string) => {

    try{
        await mongoose.connect(mongoURI)
        return true
    }catch(err){
        console.log(err)
        return false
    }

}