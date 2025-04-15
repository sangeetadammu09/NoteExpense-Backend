import { Transaction } from '../models/transaction.model.js';
import transactionValidateSchema from "../Helper/schemaValidator.js";
import paginatorHelper from "../Helper/paginator.js";
import moment from "moment";

export const allTransactions = async (req, res) => {

  try {
    const data = await Transaction.find().sort({ createdAt: -1 });
    const result = paginatorHelper(req.body.pageNumber, req.body.pageSize, data);
    res.status(200).json(result);
  }
  catch (err) {
    console.log(err)
    return res.status(400).json({ status: 400, error: true })
  }
}




export const allTransactionStatistics = async (req, res) => {
  const userid = req.params.userid;
  const yearid = req.params.year;
 // console.log(yearid)
  try {
    const startOfYear = (`${yearid}-01-01T00:00:00.000Z`);
    const startOfNextYear = (`${Number(yearid) + 1}-01-01T00:00:00.000Z`);
  //  console.log(startOfYear, startOfNextYear)
    const data = await Transaction.find({ userid: userid,  date: {
      $gte: startOfYear,
      $lt: startOfNextYear}}).sort({ createdAt: 1 });

     const  groupedByMonth =  Object.values(
        data.reduce((acc, item) => {
          const date = new Date(item.date);
          const monthKey = date.toLocaleString('default', { month: 'short' });
      
          if (!acc[monthKey]) {
            acc[monthKey] = { month: monthKey, items: [],totalExpense:0, totalIncome :0};
          }
      
          acc[monthKey].items.push(item);
          acc[monthKey].totalExpense =  acc[monthKey].items.filter((x) => x.type === 'expense').map((x) => x.amount).reduce((a, b) => a + b, 0);
          acc[monthKey].totalIncome =  acc[monthKey].items.filter((x) => x.type === 'income').map((x) => x.amount).reduce((a, b) => a + b, 0);
      
          return acc;
     }, {}))
   //  let result = paginatorHelper(req.body.pageNumber, req.body.pageSize, groupedByMonth);
    return res.status(200).json({ status: 200, data: groupedByMonth })

  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message, error: true })
  }
}

export const addTransaction = async (req, res) => {
  try {
    const validateSchema = transactionValidateSchema(req.body)

    if (!validateSchema.error) {
      const data = await Transaction(req.body).save();
      return res.status(200).json({ status: 200, data: data })
    } else {
      return res.status(400).json({ status: 400, error: validateSchema.error.details })
    }

  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message, error: true })
  }
}

export const transactionById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Transaction.findById(id);
    return res.status(200).json({ status: 200, data: data })

  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message, error: true })
  }
}


export const transactionByUserId = async (req, res) => {
  const userid = req.params.userid;
  try {
    const data = await Transaction.find({ userid: userid });
    let expenseTransactionData = data.filter((x) => x.type === 'expense').map((x) => x.amount).reduce((a, b) => a + b, 0)
    let incomeTransactionData = data.filter((x) => x.type === 'income').map((x) => x.amount).reduce((a, b) => a + b, 0)

    let transactionData = {
      'totalIncome': incomeTransactionData,
      'totalExpense': expenseTransactionData,
      'totalBalance': incomeTransactionData - expenseTransactionData,
    }

    let result = paginatorHelper(req.body.pageNumber, req.body.pageSize, data);

    result.transactionData = transactionData;
    return res.status(200).json({ status: 200, data: result })

  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message, error: true })
  }
}

export const updateTransaction = async (req, res) => {
  const id = req.params.id;
  let payload = req.body;

  try {

    const data = await Transaction.findById(id);
    if (!data) {
      res.status(404).json({ status: 404, error: 'Transaction not found' });
      throw new Error('Transaction not found')
    } else {
      const data = await Transaction.findByIdAndUpdate(req.params.id, payload, { new: true })
      return res.status(200).json({ status: 200, data: data })
    }
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message, error: true })
  }

}

export const deleteTransaction = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Transaction.findByIdAndDelete(id);
    return res.status(200).json({ status: 200, message: 'Record deleted' })
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message, error: true })
  }



}

