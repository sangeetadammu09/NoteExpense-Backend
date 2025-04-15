import Joi from 'joi';

const transactionSchema = Joi.object({
            name : Joi.string().required().messages({
                'any.required': `Name is required`
              }),
            category : Joi.string().required().messages({
                'any.required': `Category is required`
              }),  
            amount : Joi.number().required().min(0).max(1000000000).messages({
                'any.required': `Amount is required`
              }),
            date : Joi.date().greater(new Date("1940-01-01")).required().messages({
                'any.required': `Date is required`
              }),
            type : Joi.string().required().messages({
                'any.required': `Transaction type is required`
              }),
            userid : Joi.string().required().messages({
                'any.required': `UserId is required`
              }),
            
        })

const transactionValidateSchema =(payload) =>{  
    const result = transactionSchema.validate(payload, { abortEarly: false });
    return result;

}



export default transactionValidateSchema;


