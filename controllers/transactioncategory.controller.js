import { Transaction } from '../models/transactioncategory.model.js';
import transactionValidateSchema from "../Helper/schemaCategoryValidator.js";
import paginatorHelper from "../Helper/paginator.js";

export const allTransactionCategories = async (req, res) => {

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



export const addTransactionCategory = async (req, res) => {
  console.log(req)
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

export const transactionCategoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Transaction.findById(id);
    return res.status(200).json({ status: 200, data: data })

  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message, error: true })
  }
}

export const updateTransactionCategory = async (req, res) => {
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

export const deleteTransactionCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Transaction.findByIdAndDelete(id);
    return res.status(200).json({ status: 200, message: 'Record deleted' })
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message, error: true })
  }



}

