import Ingredient from '../../../DB/model/ingredientModel.js';
import ingredientValidator from './ingredientValidator.js';

export const createIngredient = async (req, res) => {
    try {
        const { error } = ingredientValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const newIngredient = new Ingredient(req.body);
        const savedIngredient = await newIngredient.save();
        res.status(201).json(savedIngredient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.json(ingredients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getIngredientById = async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);
        if (!ingredient) return res.status(404).json({ message: 'Ingredient not found' });
        res.json(ingredient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateIngredient = async (req, res) => {
    try {
        const { error } = ingredientValidator.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedIngredient) return res.status(404).json({ message: 'Ingredient not found' });
        res.json(updatedIngredient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteIngredient = async (req, res) => {
    try {
        const deletedIngredient = await Ingredient.findByIdAndDelete(req.params.id);
        if (!deletedIngredient) return res.status(404).json({ message: 'Ingredient not found' });
        res.json({ message: 'Ingredient deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
