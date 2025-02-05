import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { EventService } from "../services";
import { ApiResponse } from "../utils";

const getFeatured = expressAsyncHandler(async (req: Request, res: Response) => {

    const featuredEventgs = await EventService.EventReadFeatured()

    return ApiResponse.success(res, { events: featuredEventgs })

})

const getEvent = expressAsyncHandler(async (req: Request, res: Response) => {

    const { id } = req.params

    const event = await EventService.EventRead(id)

    if (!event) return ApiResponse.notFound(res)

    return ApiResponse.success(res, { event })

})

export const EventController = {
    getFeatured,
    getEvent
}