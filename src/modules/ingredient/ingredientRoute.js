import express from 'express';
const router = express.Router();
import { 
    getAllIngredients ,
    createIngredient,
    getIngredientById,
    updateIngredient,
    deleteIngredient } from './ingredientController.js';

router.get('/', getAllIngredients);
router.post('/', createIngredient);
router.get('/:id', getIngredientById);
router.put('/:id', updateIngredient);
router.delete('/:id', deleteIngredient);

export default router;
