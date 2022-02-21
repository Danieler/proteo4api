
import MongooseService from "../Common/services/mongoose.service";
import { Schema, Model, Document } from "mongoose";
import {EStatus, IEvent} from "./event.interface";
import {UserDocument} from "../User/user.model";
export interface EventDocument extends Document {
    headline: string;
    description: string;
    startDate: Date;
    location: string,
    state: EStatus,
    creatorId: string
}

interface EventModel extends Model<EventDocument> {
    build(attrs: IEvent): UserDocument;
}

const EventSchema: Schema = new Schema(
    {
        headline: { type: String, required: true },
        description: { type: String, required: true },
        startDate: { type: Date, required: true },
        location: { type: String, required: true },
        state: { type: String, required: true },
        creatorId:  { type: String, required: true },
        subscribers: {
            type: Array,
            default: []
        }
    },
    {
        toObject: {
            transform: function (doc, ret) {},
        },
        toJSON: {
            transform: function (doc, ret) {},
        },
    }
);

EventSchema.statics.build = (attrs: IEvent) => {
    return new Event(attrs);
};

const Event = MongooseService.getInstance().model<EventDocument, EventModel>(
    "Event",
    EventSchema
);

export default Event;


