import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Too short product title'],
        maxlength: [100, 'Too long product title'],
     },
     quantity: {
        type: Number,
    //  required: [true, 'Product quantity is required'],
      },
    category: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Category', 
        required: true 
    }
});

export default mongoose.model('Ingredient', ingredientSchema);
