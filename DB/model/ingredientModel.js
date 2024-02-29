import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
     },
    category: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Category', 
        required: true 
    }
});

export default mongoose.model('Ingredient', ingredientSchema);
