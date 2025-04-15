import Joi from 'joi';

const transactionSchema = Joi.object({
            name : Joi.string().required().messages({
                'any.required': `Name is required`
              }),
            date : Joi.date().greater(new Date("1940-01-01")).required().messages({
                'any.required': `Date is required`
              }),      
        })

const transactionCategoryValidateSchema =(payload) =>{  
    const result = transactionSchema.validate(payload, { abortEarly: false });
    return result;

}



export default transactionCategoryValidateSchema;


