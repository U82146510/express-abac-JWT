import Joi from "joi";

export const user_schema = Joi.object({
    name:Joi.string().required(),
    role:Joi.string().valid("admin","user").messages({"any.only":"Role must be either admin or user"})
});

export const login_schema = Joi.object({
    name:Joi.string().required()
});