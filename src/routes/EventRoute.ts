import e from "express";
import { EventController } from "../controllers";

const r = e.Router();

// @GET /featured
// access: public
// desc: get all featured events
r.get("/featured", EventController.getFeatured)

export const EventRoute = r;

