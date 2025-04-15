import mongoose from "mongoose";

const transactionSchema =  new mongoose.Schema({
    name : {type:String, required:[true, 'Name is required']},
    category : {type:String, required:[true, 'Category is required']},
    amount:{type:Number, required:[true, 'Amount is required']},
    date:{type:Date, required:[true, 'Date is required'],default: Date.now,},
    type: {type:String, required:[true, 'Type is required'],default: 'income'},
    userid : {type:String, required:[true, 'UserId is required']},
},{timestamps:true, versionKey:false})

export const Transaction = mongoose.model("Transaction", transactionSchema);