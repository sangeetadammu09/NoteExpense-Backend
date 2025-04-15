import mongoose from "mongoose";

const transactionSchema =  new mongoose.Schema({
    name : {type:String, required:[true, 'Name is required']},
    date:{type:Date, required:[true, 'Date is required'],default: Date.now,},
},{timestamps:true, versionKey:false})

export const Transaction = mongoose.model("TransactionCategory", transactionSchema);