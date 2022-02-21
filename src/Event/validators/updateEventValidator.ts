import Joi from 'joi'
import {EStatus} from "../event.interface";
const updateEventValidator = Joi.object({
    headline: Joi.string().optional(),
    description: Joi.string().optional(),
    startDate: Joi.string().optional(),
    location: Joi.string().optional(),
    state: Joi.string().valid(EStatus.Public, EStatus.Draft, EStatus.Private).optional(),
}).required();
export default updateEventValidator;
