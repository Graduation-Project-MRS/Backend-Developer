import express from 'express';
import { 
    getAllCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
 } from './categoryController.js';


import {validate} from '../../middleware/tipValidate.js';
import categoryValidator from './categoryValidator.js';

const router = express.Router();


router.post('/addCategory', validate(categoryValidator),createCategory); //error
router.get('/getCategories', getAllCategories);
router.get('/getCategory/:id', getCategoryById);
router.put('/updateCategory/:id', updateCategory); //error
router.delete('/deleteCategory/:id', deleteCategory);

export default router;
