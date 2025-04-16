import express from "express";
import {allTransactions, addTransaction ,transactionById,transactionByUserId, 
    updateTransaction, deleteTransaction,allTransactionStatistics,allTransactionType} from '../controllers/transaction.controller.js';

const router = express.Router();

router.post('/add', addTransaction);
router.get('/id/:id', transactionById);
router.post('/user/:userid', transactionByUserId);
router.put('/update/:id',updateTransaction);
router.delete('/delete/:id',deleteTransaction);
router.post('/all', allTransactions);
router.post('/statistics/:year/:userid', allTransactionStatistics);
router.post('/type/:type', allTransactionType);

export default router;