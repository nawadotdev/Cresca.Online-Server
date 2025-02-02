import e from "express";
import { UserController } from "../controllers";
import { AuthMiddleware } from "../middlewares";


const r = e.Router();

// @GET /
// access: private
// desc: get user details
r.get("/", AuthMiddleware, UserController.getMe)

export const UserRoute = r;

