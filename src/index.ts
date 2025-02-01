import express, { NextFunction, Response, Request } from "express"
import "dotenv/config"
import { ApiResponse } from "./utils"
import { AuthRoute } from "./routes"
import { connectDB } from "./lib"

const app = express()
app.use(express.json({ limit: "16kb" }))
app.use((err: Error, req: Request, res: Response, next: NextFunction): any => {
    if ('type' in err && err.type === 'entity.too.large') {
        ApiResponse.badRequest(res, "The data provided is too large")
    }
    if ('type' in err && err.type === 'entity.parse.failed') {
        ApiResponse.badRequest(res, "Invalid JSON")
    }
    next(err)
})

app.use("/api/auth", AuthRoute)

//error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction): any => {
    console.error(err)
    ApiResponse.internalServerError(res)
})


const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/crescaonline"

connectDB(MONGO_URI).then((connected) => {
    if(connected){
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    }else{
        console.error("Failed to connect to database")
    }
})