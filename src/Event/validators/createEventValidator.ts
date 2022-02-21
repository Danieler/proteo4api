import Joi from 'joi'
const createEventValidator = Joi.object({
        headline: Joi.string().required(),
        description: Joi.string().required(),
        startDate: Joi.string().required(),
        location: Joi.string().required()
}).required();
export default createEventValidator;
