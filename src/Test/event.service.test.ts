import EventService from '../Event/event.service';
import Event from "../Event/event.model"
import {EStatus} from "../Event/event.interface";

jest.mock('../Event/event.model', ()=>({
    find: jest.fn(() => {
        return {
            exec: () => true
        }
    }),
    build: jest.fn(() => {
        return {
            save: () => true
        }
    }),
    count: jest.fn().mockReturnValue(0),
    findOneAndUpdate: jest.fn().mockReturnValue({})
}));
describe('EventService', () => {

    const event = {
        headline: 'headline',
        description: 'description',
        startDate: new Date(),
        location: 'location',
        state: EStatus.Draft,
        creatorId: 'creatorId',
        subscribers: []
    };

    it('getEvents: should call find method of Event model', async () => {
        await EventService.getEvents();
        expect(Event.find).toHaveBeenCalledTimes(1);
        expect(Event.find).toHaveBeenCalledWith({});
    })

    it('createEvent: should call build method of Event model', async () => {

        await EventService.createEvent(event);
        expect(Event.build).toHaveBeenCalledTimes(1);
        expect(Event.build).toHaveBeenCalledWith({
            headline: 'headline',
            description: 'description',
            startDate: expect.any(Date),
            location: 'location',
            state: EStatus.Draft,
            creatorId: 'creatorId',
            subscribers: []
        });
    })

    it('updateEvent: should call findOneAndUpdate method of Event model', async () => {

        await EventService.updateEvent('eventId', { headline: 'newHeadline'}, 'creatorId');
        expect(Event.findOneAndUpdate).toHaveBeenCalledTimes(1);
        expect(Event.findOneAndUpdate).toHaveBeenCalledWith(
            {_id: 'eventId'},
            { headline: 'newHeadline'},
            { new: true}
        );
    })
})
