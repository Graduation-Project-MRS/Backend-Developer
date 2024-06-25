import express from 'express';
import { 
    getAllIngredients ,
    createIngredient,
    getIngredientById,
    updateIngredient,
    deleteIngredient } from './ingredientController.js';

import {validate} from '../../middleware/tipValidate.js';
import ingredientValidator from './ingredientValidator.js';   

const router = express.Router();


router.post('/addIngredient', validate(ingredientValidator), createIngredient);
router.get('/ingredients/:categoryId',getAllIngredients);
router.get('/getIngredient/:id', getIngredientById);
router.put('/updateIngredient/:id', updateIngredient);
router.delete('/deleteIngredient/:id', deleteIngredient);

export default router;
