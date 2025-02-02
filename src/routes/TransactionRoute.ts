import e from "express";
import { AuthMiddleware } from "../middlewares";
import { TransactionController } from "../controllers";


const r = e.Router();

// @POST /:
// access: private
// desc: deposit money
r.post("/", AuthMiddleware, TransactionController.deposit)

// @GET /
// access: private
// desc: get all transactions
r.get("/", AuthMiddleware, TransactionController.getTransactions)

export const TransactionRoute = r;

