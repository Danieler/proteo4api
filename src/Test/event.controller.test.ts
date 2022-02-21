import {EStatus} from "../Event/event.interface";
import EventController from "../Event/event.controller";
import EventService  from "../Event/event.service";
import {mockRequest, mockResponse} from "mock-req-res";
import { Request, Response, NextFunction } from "express";
import Event from "../Event/event.model";

jest.mock('../Event/event.service', ()=>({
    getEvents: jest.fn(() => {
        return true
    }),
    createEvent: jest.fn(() => {
        return true
    }),
    updateEvent: jest.fn(() => {
        return true
    }),

}));


describe('EventController', () => {

    const event = {
        headline: 'headline',
        description: 'description',
        startDate: new Date(),
        location: 'location',
        state: EStatus.Draft,
        creatorId: 'creatorId',
        subscribers: []
    };

    it('getEvents: should call getEvents method from EventService', async () => {
        const req = mockRequest()
        const res = mockResponse()
        await EventController.getEvents(req as Request, res as Response,  () => ({}) as NextFunction);
        expect(EventService.getEvents).toHaveBeenCalledTimes(1)
    })

    it('createEvent: should call create method from EventService', async () => {

        const req = mockRequest(
            {
                body: {
                    headline: 'headline',
                    description: 'description',
                    startDate: new Date(),
                    location: 'location'
                },
                currentUser: {
                    _id: 'creatorId'
                }
            }
        )
        const res = mockResponse()
        const eventData = {
            headline: 'headline',
            description: 'description',
            startDate: expect.any(Date),
            location: 'location',
            state: EStatus.Draft,
            creatorId: 'creatorId',
            subscribers: []
        };

        await EventController.createEvent(req as Request, res as Response,  () => ({}) as NextFunction);
        expect(EventService.createEvent).toHaveBeenCalledTimes(1)
        expect(EventService.createEvent).toBeCalledWith(eventData)
    })

    it('updateEvent: should call updateEvent method from EventService', async () => {

        const req = mockRequest(
            {
                params: {
                    eventId: 'eventId'
                },
                currentUser: {
                    _id: 'creatorId'
                },
                body: {
                    headline: 'newHeadline',
                }
            }
        );
        const res = mockResponse();

        const eventData = {
            headline: 'newHeadline'
        };

        await EventController.updateEvent(req as Request, res as Response,  () => ({}) as NextFunction);
        expect(EventService.updateEvent).toHaveBeenCalledTimes(1)
        expect(EventService.updateEvent).toBeCalledWith('eventId', eventData, 'creatorId')
    })

})
