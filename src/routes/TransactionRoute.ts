import e from "express";
import { AuthMiddleware } from "../middlewares";
import { TransactionController } from "../controllers";


const r = e.Router();

// @GET /
// access: private
// desc: get all transactions
r.get("/", AuthMiddleware,TransactionController.getTransactions)

// @GET /:id
// access: private
// desc: get a transaction

r.get("/:id", AuthMiddleware, TransactionController.getTransaction)

// @POST /deposit
// access: private
// desc: create a transaction (deposit)
r.post("/", AuthMiddleware, TransactionController.deposit)

// @POST /pay
// access: private
// desc: create a transaction (pay)
r.post("/pay", AuthMiddleware, TransactionController.pay)

export const TransactionRoute = r;

