import { Application, Request, Response } from "express";
import { RouteConfig } from "../Common/common.route.config";
import EventController from "./event.controller";
import JWT from "../Common/middlewares/JWT";
import checkJoi from '../Common/middlewares/JoiValidator'
import { createEventValidator, updateEventValidator, subscribeEventValidator } from "./validators";

export class EventRoutes extends RouteConfig {
    constructor(app: Application) {
        super(app, "EventRoutes");
    }

    configureRoutes() {
        this.app.route("/event").post([JWT.authenticateJWT, checkJoi(createEventValidator), EventController.createEvent]);
        this.app.route("/event").get(EventController.getEvents);
        this.app.route("/event/:eventId").get([JWT.authenticateJWT,EventController.getEvent]);
        this.app.route("/event/:eventId").patch([JWT.authenticateJWT, checkJoi(updateEventValidator),EventController.updateEvent]);
        this.app.route("/event/:eventId").delete([JWT.authenticateJWT,EventController.deleteEvent]);
        this.app.route("/event/:eventId/subscription").put([JWT.authenticateJWT, checkJoi(subscribeEventValidator),EventController.subscribeEvent]);
        return this.app;
    }
}
