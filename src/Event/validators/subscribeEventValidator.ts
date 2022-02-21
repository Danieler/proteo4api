import Joi from 'joi'
const subscribeEventValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required()
}).required();
export default subscribeEventValidator;
