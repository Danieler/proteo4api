import { Request, Response, NextFunction } from "express";
import EventService from "./event.service";
import debug, {IDebugger} from "debug";
import {EStatus} from "./event.interface";

const log: IDebugger = debug("event:controller");

class EventController {
    constructor() {}

    async createEvent(req: any, res: Response, next: NextFunction) {
        try {
            const subscribers : string[] = [];
            const eventData = {
                headline: req.body.headline,
                description: req.body.description,
                startDate: req.body.startDate,
                location: req.body.location,
                state: EStatus.Draft,
                creatorId: req.currentUser._id,
                subscribers: subscribers
            }
            try {
                const newEvent = await EventService.createEvent(eventData);
                log("event", newEvent);

                return res.status(200).json({
                        success: true,
                        data: newEvent
                });
            } catch (e) {
                log("Controller capturing error", e);
                throw new Error("Error creating event");
            }
        } catch (e) {
            next(e);
        }
    }
    async updateEvent(req: any, res: Response, next: NextFunction) {
        try {
            const id = req.params.eventId;
            const currentUserId = req.currentUser._id;
            try {
                const updatedEvent = await EventService.updateEvent(id, req.body, currentUserId);
                log("updatedEvent", updatedEvent);

                return res.status(200).json({
                    success: true,
                    data: updatedEvent
                });
            } catch (e) {
                log("Controller capturing error", e);
                throw new Error("Error updating event");
            }
        } catch (e) {
            next(e);
        }
    }
    async getEvents(req: Request, res: Response, next: NextFunction) {
        try {
            const events = await EventService.getEvents();

            return res.status(200).json({
                success: true,
                data: events,
            });
        } catch (e) {
            next(e);
        }
    }
    async getEvent(req: Request, res: Response, next: NextFunction) {
        const id = req.params.eventId;
        try {
            const event = await EventService.getEvent(id);

            return res.status(200).json({
                success: true,
                data: event,
            });
        } catch (e) {
            next(e);
        }
    }
    async deleteEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.eventId;
            await EventService.deleteEvent(id);

            return res.status(200).json({
                success: true
            });
        } catch (e) {
            next(e);
        }
    }
    async subscribeEvent(req: any, res: Response, next: NextFunction) {
        try {
            const id = req.params.eventId;
            const currentUserId = req.currentUser._id;
            await EventService.subscribeEvent(id, req.body, currentUserId);

            return res.status(200).json({
                success: true
            });
        } catch (e) {
            next(e);
        }
    }
}

export default new EventController();
