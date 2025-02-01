import { IUser } from "./IObjects";
import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: IUser;
  }
}