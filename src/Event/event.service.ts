import Event from "../Event/event.model";
import {EStatus, IEvent} from "../Event/event.interface";

class EventService {
    async countPublishedEvents(attrs: any, creatorId: string) {
        let countPublishedEvents = 0;
        if (attrs.state === EStatus.Public) {
            try {
                countPublishedEvents = await Event.count({ creatorId: creatorId, state: EStatus.Public });
            } catch (e) {
                throw new Error(e);
            }
        }
        return countPublishedEvents;
    }

    async createEvent(data: IEvent) {
        try {
            const event = Event.build(data);
            await event.save();
        } catch (e) {
            throw new Error(e);
        }
    }
    async updateEvent(id: string, attrs: object, creatorId: string) {
        try {
            const countPublishedEvents = await this.countPublishedEvents(attrs, creatorId);
            if (countPublishedEvents === 0 ) {
                const event = await Event.findOneAndUpdate({ _id: id }, attrs, { new: true });
                return event;
            } else {
                throw new Error("You can only have one event published");
            }

        } catch (e) {
            throw new Error(e);
        }
    }
    async getEvents() {
        try {
            return Event.find({}).exec();
        } catch (e) {
            throw new Error(e);
        }
    }
    async getEvent(id: string) {
        try {
            return Event.findById(id).exec();
        } catch (e) {
            throw new Error(e);
        }
    }
    async deleteEvent(id: string) {
        try {
            return await Event.deleteOne({_id: id});
        } catch (e) {
            throw new Error(e);
        }
    }
    async subscribeEvent(id: string, attrs: object, subscriptorId: string) {
        try {
           const countSubcribedEvents = await Event.count( { subscribers: subscriptorId });
            if (countSubcribedEvents < 3) {
                const event = await Event.findOneAndUpdate(
                    { _id: id },
                    { $addToSet: { subscribers: [subscriptorId]}},
                    { new: true });
                return event;
            } else {
                throw new Error("You can only have three event subscribed");
            }
        } catch (e) {
                throw new Error(e);
        }

    }
    async getEventsFromStartDate() {
        try {
            const minutesToStart = 15;
            const currentDate = new Date();
            const queryDate = new Date(currentDate.getTime() + minutesToStart*60000);
            queryDate.setSeconds(0);
            queryDate.setMilliseconds(0);
            console.log(queryDate);
            const events = await Event.find({
                'subscribers.0': { $exists: true},
                startDate: {
                    $eq: queryDate
                }
            });
            return events;
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default new EventService();
