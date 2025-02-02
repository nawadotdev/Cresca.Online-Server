import e from "express";
import { AuthController } from "../controllers";


const r = e.Router();

// @POST /login
// access: public
// desc: login user
r.post("/login", AuthController.login)

// @POST /register
// access: public
// desc: register user
r.post("/register", AuthController.register)

export const AuthRoute = r;

