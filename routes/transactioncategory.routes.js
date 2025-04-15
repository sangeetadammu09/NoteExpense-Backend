import express from "express";
import {allTransactionCategories, addTransactionCategory ,transactionCategoryById, 
    updateTransactionCategory, deleteTransactionCategory} 
    from '../controllers/transactioncategory.controller.js';

const router = express.Router();

router.post('/add', addTransactionCategory);
router.get('/id/:id', transactionCategoryById);
router.put('/update/:id',updateTransactionCategory);
router.delete('/delete/:id',deleteTransactionCategory);
router.post('/all', allTransactionCategories);

export default router;